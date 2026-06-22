import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import compression from "compression";
import admin from "firebase-admin";
import fs from "fs";
import {
  CANONICAL_ALIASES,
  getRobotsTxt,
  getSeoRoute,
  getSitemapXml,
  renderPrerenderBody,
  renderSeoHead,
} from "./src/lib/seo-routes.ts";

dotenv.config();

// Simple in-memory rate limiter to prevent spam/abuse
interface RateLimitEntry {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + windowMs;
    return false;
  }
  
  if (entry.count >= limit) {
    return true;
  }
  
  entry.count++;
  return false;
}

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const negotiableImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const imageVariantPreference = [
  { extension: "avif", mimeType: "image/avif" },
  { extension: "webp", mimeType: "image/webp" },
] as const;

function clientAcceptsMime(acceptHeader: string | undefined, mimeType: string): boolean {
  if (!acceptHeader) return false;

  return acceptHeader.split(",").some((entry) => {
    const [type, ...params] = entry.trim().split(";");
    if (type !== mimeType) return false;

    const quality = params
      .map((param) => param.trim())
      .find((param) => param.startsWith("q="));

    return quality !== "q=0" && quality !== "q=0.0";
  });
}

function isInsideDirectory(filePath: string, rootDir: string): boolean {
  const relative = path.relative(rootDir, filePath);
  return !!relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function getNegotiatedImageVariant(
  requestedImagePath: string,
  imagesRoot: string,
  acceptHeader: string | undefined,
) {
  const originalPath = path.resolve(imagesRoot, requestedImagePath);
  if (!isInsideDirectory(originalPath, imagesRoot)) return null;

  const extension = path.extname(originalPath).toLowerCase();
  if (!negotiableImageExtensions.has(extension)) return null;

  for (const variant of imageVariantPreference) {
    if (!clientAcceptsMime(acceptHeader, variant.mimeType)) continue;

    const variantPath = originalPath.replace(/\.(jpe?g|png|webp)$/i, `.${variant.extension}`);
    if (path.normalize(variantPath) === path.normalize(originalPath)) continue;
    if (fs.existsSync(variantPath)) {
      return { path: variantPath, mimeType: variant.mimeType };
    }
  }

  return null;
}

function renderHtmlDocument(template: string, requestUrl: string) {
  const pathname = new URL(requestUrl, "http://localhost").pathname;
  const route = getSeoRoute(pathname);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title data-rh="true">${escapeHtml(route.title)}</title>`)
    .replace("</head>", `    ${renderSeoHead(route)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderPrerenderBody(route)}</div>`);

  return { html, status: route.status || 200 };
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  if (admin.apps.length === 0) {
    try {
      admin.initializeApp();
    } catch (err) {
      console.warn("Firebase Admin failed to initialize locally (will fallback to request body data):", err);
    }
  }

  // Enable gzip/deflate compression for all text-based responses (HTML, CSS, JS)
  app.use(compression());

  // Middleware for parsing JSON with increased limit for base64 images/videos
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API Route: Send Email
  app.post("/api/send-email", async (req, res) => {
    const { type, data, website } = req.body;

    // Honeypot spam prevention
    if (website) {
      const ip = req.ip || "unknown";
      console.warn(`Honeypot anti-spam triggered from IP: ${ip}`);
      return res.status(400).json({ error: "Requête invalide" });
    }

    // Skip rate limiting for admin documents and reminders to allow multiple invoices/quotes/reminders to be sent
    if (type !== 'admin-doc' && type !== 'invoice-reminder') {
      const ip = req.ip || "unknown";
      if (isRateLimited(ip, 5, 60 * 60 * 1000)) {
        return res.status(429).json({ error: "Trop de demandes envoyées. Veuillez réessayer plus tard." });
      }
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'contact@marnetransdem.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Reusable Style Template
    const getEmailContainer = (title: string, content: string) => `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #0c1c3d; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">MARNE TRANSDEM</h1>
          <p style="color: #F5A400; margin: 8px 0 0; font-size: 14px; font-weight: 500;">Déménageur Professionnel</p>
        </div>
        <div style="padding: 32px; color: #1e293b;">
          <h2 style="color: #0c1c3d; font-size: 20px; margin-top: 0; border-bottom: 2px solid #ef4444; padding-bottom: 12px; display: inline-block;">${title}</h2>
          <div style="margin-top: 24px; line-height: 1.6;">
            ${content}
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #64748b; font-size: 13px;">© ${new Date().getFullYear()} Marne Transdem. Tous droits réservés.</p>
          <p style="margin: 8px 0 0; color: #64748b; font-size: 13px;">43 rue des Maraîchers, 75020 Paris</p>
        </div>
      </div>
    `;

    // Handle Admin Document Email Sending
    if (type === 'admin-doc') {
      const { clientName, clientEmail, pdfName, pdfBase64, id, docData } = data;
      const documentTypeName = req.body.documentType === 'devis' ? 'Devis' : 'Facture';

      let base64Attachment = pdfBase64;
      if (!base64Attachment && docData) {
        try {
          const { generatePdfBuffer } = await import("./functions/src/pdf-helper.tsx");
          const buffer = await generatePdfBuffer(req.body.documentType, docData);
          base64Attachment = buffer.toString('base64');
        } catch (pdfErr) {
          console.error("Failed to generate PDF for local dev email attachment:", pdfErr);
        }
      }

      const emailHtml = `
        <p>Bonjour <strong>${clientName}</strong>,</p>
        <p>Veuillez trouver ci-joint votre <strong>${documentTypeName.toLowerCase()} N° ${id}</strong> concernant votre déménagement avec Marne Transdem.</p>
        <p>Nous restons à votre entière disposition pour tout renseignement complémentaire.</p>
        <p>Cordialement,<br/>L'équipe Marne Transdem</p>
      `;

      try {
        if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
          console.error("Email Configuration Missing:", {
            hasUser: !!process.env.GMAIL_USER,
            hasPass: !!process.env.GMAIL_APP_PASSWORD
          });
          return res.status(500).json({ 
            error: "Configuration email manquante", 
            details: "Veuillez configurer GMAIL_USER et GMAIL_APP_PASSWORD" 
          });
        }

        await transporter.sendMail({
          from: `"Marne Transdem" <${process.env.GMAIL_USER}>`,
          to: clientEmail,
          cc: process.env.GMAIL_USER,
          subject: `${documentTypeName} Marne Transdem N° ${id}`,
          html: getEmailContainer(`${documentTypeName} N° ${id}`, emailHtml),
          attachments: [
            {
              filename: pdfName,
              content: base64Attachment,
              encoding: 'base64'
            }
          ]
        });

        return res.json({ success: true });
      } catch (error: any) {
        console.error("Admin Email Error:", error);
        return res.status(500).json({ error: "Échec de l'envoi de l'email", details: error.message || error });
      }
    }

    if (type === 'devis-tracking') {
      const { clientName, clientEmail, id, trackingToken } = data;
      const origin = req.headers.origin || 'http://localhost:3000';
      const trackingUrl = `${origin}/suivi/${id}?token=${trackingToken}`;

      const emailHtml = `
        <p>Bonjour <strong>${clientName}</strong>,</p>
        <p>Votre dossier de déménagement est désormais enregistré et validé dans notre système.</p>
        <p>Vous pouvez suivre l'avancement de votre prestation en temps réel (affectation des équipes, étapes du transport et émargement de livraison) directement sur votre espace de suivi client dédié :</p>
        <div style="margin: 32px 0; text-align: center;">
          <a href="${trackingUrl}" style="background-color: #ef4444; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 15px; display: inline-block;">Accéder à mon Espace de Suivi</a>
        </div>
        <p>Si le bouton ci-dessus ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur :</p>
        <p style="font-size: 12px; font-family: monospace; word-break: break-all; color: #64748b;">${trackingUrl}</p>
        <p>Nous restons à votre entière disposition pour tout renseignement logistique.</p>
        <p style="margin-top: 24px;">Cordialement,<br/>L'équipe Marne Transdem</p>
      `;

      try {
        if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
          return res.status(500).json({ error: "Configuration email manquante" });
        }

        await transporter.sendMail({
          from: `"Marne Transdem" <${process.env.GMAIL_USER}>`,
          to: clientEmail,
          subject: `Suivi de votre déménagement Marne Transdem N° ${id}`,
          html: getEmailContainer(`Espace Suivi & Signature Client`, emailHtml)
        });

        return res.json({ success: true });
      } catch (error: any) {
        console.error("Tracking Email Error:", error);
        return res.status(500).json({ error: "Échec de l'envoi de l'email de suivi", details: error.message || error });
      }
    }

    if (type === 'signed-lettre-voiture') {
      const { id, moveData } = data;
      
      try {
        let finalMoveData = moveData;
        
        if (admin.apps.length > 0) {
          try {
            const dbAdmin = admin.firestore();
            const moveDoc = await dbAdmin.collection('demenagements').doc(id).get();
            if (moveDoc.exists) {
              finalMoveData = { id, ...moveDoc.data() };
            }
          } catch (dbErr) {
            console.warn("Could not query Firestore for signed PDF locally, falling back to payload:", dbErr);
          }
        }

        if (!finalMoveData) {
          return res.status(400).json({ error: "Données du chantier manquantes" });
        }

        const clientName = finalMoveData.clientName || "Client";
        const clientEmail = finalMoveData.clientEmail || finalMoveData.email || "";

        const { generatePdfBuffer } = await import("./functions/src/pdf-helper.tsx");
        const buffer = await generatePdfBuffer('lettre_voiture', finalMoveData);
        const base64Attachment = buffer.toString('base64');

        const emailHtml = `
          <p>Bonjour <strong>${clientName}</strong>,</p>
          <p>Votre déménagement a été livré avec succès et votre émargement de décharge électronique a été enregistré.</p>
          <p>Veuillez trouver ci-joint l'exemplaire signé de votre <strong>Lettre de voiture nationale N° ${id}</strong> servant d'attestation de livraison conforme.</p>
          <p>Nous vous remercions pour votre confiance et restons à votre entière disposition.</p>
          <p style="margin-top: 24px;">Cordialement,<br/>L'équipe Marne Transdem</p>
        `;

        if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
          return res.status(500).json({ error: "Configuration email manquante" });
        }

        await transporter.sendMail({
          from: `"Marne Transdem" <${process.env.GMAIL_USER}>`,
          to: clientEmail,
          cc: process.env.GMAIL_USER,
          subject: `Lettre de voiture signée Marne Transdem N° ${id}`,
          html: getEmailContainer(`Livraison validée & Document émargé`, emailHtml),
          attachments: [
            {
              filename: `Lettre_de_Voiture_Signee_${id}.pdf`,
              content: base64Attachment,
              encoding: 'base64'
            }
          ]
        });

        return res.json({ success: true });
      } catch (error: any) {
        console.error("Signed PDF Email Error:", error);
        return res.status(500).json({ error: "Échec de l'envoi de la Lettre de voiture signée", details: error.message || error });
      }
    }

    if (type === 'invoice-reminder') {
      const { invoice } = data;
      if (!invoice) {
        return res.status(400).json({ error: "Données de la facture manquantes" });
      }

      const clientName = invoice.clientName || "Client";
      const clientEmail = invoice.email || invoice.clientEmail || "";
      if (!clientEmail) {
        return res.status(400).json({ error: "Adresse email du client manquante" });
      }

      try {
        const { generatePdfBuffer } = await import("./functions/src/pdf-helper.tsx");
        const buffer = await generatePdfBuffer('facture', invoice);
        const base64Attachment = buffer.toString('base64');

        const formatDateFr = (dateStr?: string) => {
          if (!dateStr) return '';
          const parts = dateStr.split('-');
          if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
          }
          return dateStr;
        };

        const emailHtml = `
          <p>Bonjour <strong>${clientName}</strong>,</p>
          <p>Nous vous contactons aujourd'hui pour vous rappeler que le règlement de votre <strong>facture N° ${invoice.id}</strong> d'un montant de <strong>${invoice.amount.toLocaleString('fr-FR')} €</strong>, émise le ${formatDateFr(invoice.date)}, est en attente.</p>
          ${invoice.status === 'En retard' ? `
          <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 20px 0; border-radius: 8px;">
            <p style="margin: 0; color: #991b1b; font-weight: bold;">Rappel : Cette facture a dépassé sa date d'échéance (${formatDateFr(invoice.dueDate)}).</p>
            <p style="margin: 8px 0 0; color: #7f1d1d; font-size: 13px;">Nous vous prions de bien vouloir régulariser ce paiement dans les plus brefs délais.</p>
          </div>
          ` : `
          <p>Cette facture arrive à échéance le <strong>${formatDateFr(invoice.dueDate)}</strong>. Si vous n'avez pas encore effectué le paiement, nous vous invitons à le faire d'ici cette date.</p>
          `}
          <p>Vous trouverez ci-joint la facture correspondante au format PDF contenant toutes les informations détaillées ainsi que nos coordonnées bancaires pour effectuer le virement.</p>
          <p>Si vous avez déjà procédé au règlement de cette facture, nous vous remercions de ne pas tenir compte de ce rappel.</p>
          <p>Pour toute question ou si vous rencontrez des difficultés de paiement, notre équipe reste à votre entière disposition.</p>
          <p style="margin-top: 24px;">Cordialement,<br/><strong>L'équipe Marne Transdem</strong></p>
        `;

        if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
          return res.status(500).json({ error: "Configuration email manquante" });
        }

        await transporter.sendMail({
          from: `"Marne Transdem" <${process.env.GMAIL_USER}>`,
          to: clientEmail,
          cc: process.env.GMAIL_USER,
          subject: `Rappel de paiement : Facture Marne Transdem N° ${invoice.id}`,
          html: getEmailContainer(`Rappel de Paiement — Facture N° ${invoice.id}`, emailHtml),
          attachments: [
            {
              filename: `Facture_${invoice.id}.pdf`,
              content: base64Attachment,
              encoding: 'base64'
            }
          ]
        });

        return res.json({ success: true });
      } catch (error: any) {
        console.error("Invoice Reminder Email Error:", error);
        return res.status(500).json({ error: "Échec de l'envoi du rappel de facture", details: error.message || error });
      }
    }

    const isQuote = type === 'quote';
    const clientName = isQuote ? data.fullName : data.name;
    const clientEmail = data.email;
    const adminEmail = "contact@marnetransdem.com";

    // Internal Notification Content
    let adminHtml = "";
    if (isQuote) {
      adminHtml = `
        <p>Une nouvelle demande de devis a été soumise via le site web.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Nom :</td><td>${data.fullName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Téléphone :</td><td>${data.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email :</td><td>${data.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Date :</td><td>${data.date}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Formule :</td><td>${data.formula}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Surface :</td><td>${data.surface} m²</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Volume :</td><td>${data.volume || 'Non précisé'}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f1f5f9; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: bold; color: #475569; text-transform: uppercase; font-size: 11px;">Itinéraire :</p>
          <p style="margin: 0;"><strong>DE :</strong> ${data.fromAddress}, ${data.fromCity} (${data.fromZip})</p>
          <p style="margin: 4px 0 0;"><strong>À :</strong> ${data.toAddress}, ${data.toCity} (${data.toZip})</p>
        </div>
        <div style="margin-top: 20px;">
          <p style="font-weight: bold;">Message du client :</p>
          <p style="font-style: italic; color: #475569;">"${data.message || 'Aucun message particulier.'}"</p>
        </div>
      `;
    } else {
      adminHtml = `
        <p>Vous avez reçu un nouveau message via le formulaire de contact.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Nom :</td><td>${data.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Téléphone :</td><td>${data.phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email :</td><td>${data.email}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Sujet :</td><td>${data.subject}</td></tr>
        </table>
        <div style="margin-top: 20px;">
          <p style="font-weight: bold;">Message :</p>
          <div style="padding: 16px; background-color: #f1f5f9; border-radius: 8px; color: #475569;">
            ${data.message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `;
    }

    // Client Confirmation Content
    const clientHtml = `
      <p>Bonjour <strong>${clientName}</strong>,</p>
      <p>Nous avons bien reçu votre ${isQuote ? 'demande de devis' : 'message'} et nous vous en remercions.</p>
      <p>Un conseiller de <strong>Marne Transdem</strong> étudiera votre dossier dans les plus brefs délais afin de vous apporter une réponse personnalisée.</p>
      <div style="margin: 32px 0; text-align: center;">
        <a href="https://devisdemenagement-paris.com" style="background-color: #ef4444; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 15px; display: inline-block;">Visiter notre site web</a>
      </div>
      <p>À bientôt,<br/>L'équipe Marne Transdem</p>
    `;

    try {
      if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
        console.error("Email Configuration Missing:", {
          hasUser: !!process.env.GMAIL_USER,
          hasPass: !!process.env.GMAIL_APP_PASSWORD
        });
        return res.status(500).json({ 
          error: "Configuration email manquante", 
          details: "Veuillez configurer GMAIL_USER et GMAIL_APP_PASSWORD" 
        });
      }

      // 1. Send Notification to Admin
      await transporter.sendMail({
        from: `"Marne Transdem Web" <${process.env.GMAIL_USER}>`,
        to: adminEmail,
        subject: isQuote ? `[Urgent Devis] ${clientName}` : `[Contact Site] ${data.subject}`,
        html: getEmailContainer(
          isQuote 
            ? '<span style="background-color: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 6px; margin-right: 8px; display: inline-block; vertical-align: middle; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2;">[Urgent Devis]</span> Nouvelle demande de devis' 
            : 'Nouveau message de contact', 
          adminHtml
        )
      });

      // 2. Send Confirmation to Client
      await transporter.sendMail({
        from: `"Marne Transdem" <${adminEmail}>`,
        to: clientEmail,
        subject: isQuote ? "Confirmation de votre demande de devis - Marne Transdem" : "Nous avons bien reçu votre message - Marne Transdem",
        html: getEmailContainer("Accusé de réception", clientHtml)
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ error: "Échec de l'envoi de l'email" });
    }
  });

  // API Route: Generate PDF (Devis or Facture)
  app.post("/api/pdf/generate", async (req, res) => {
    const { type, data } = req.body;
    if (!type || !data || !data.id) {
      return res.status(400).json({ error: "Paramètres 'type' et 'data' requis." });
    }
    
    const validTypes = ['devis', 'facture', 'lettre_voiture', 'declaration_valeur', 'fiche_equipe'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Type de document invalide (doit être 'devis', 'facture', 'lettre_voiture', 'declaration_valeur' ou 'fiche_equipe')." });
    }


    try {
      const { generatePdfBuffer } = await import("./functions/src/pdf-helper.tsx");
      const buffer = await generatePdfBuffer(type, data);
      
      const crypto = await import("crypto");
      const hash = crypto.createHash("sha256").update(buffer).digest("hex");

      const fs = await import("fs");
      const dir = path.resolve(__dirname, "./public/generated_docs");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      const localFileName = `${type}_${data.id}_${hash.substring(0, 10)}.pdf`;
      const localFilePath = path.join(dir, localFileName);
      fs.writeFileSync(localFilePath, buffer);

      const url = `/generated_docs/${localFileName}`;
      res.json({ success: true, url, hash });
    } catch (error: any) {
      console.error("Local PDF Generation Error:", error);
      res.status(500).json({ error: "Échec de la génération du document PDF en local.", details: error.message || error });
    }
  });

  // API Route: AI-powered image/video analysis for volume calculations
  app.post("/api/gemini/analyze-images", async (req, res) => {
    const ip = req.ip || "unknown";
    // Limit to 10 image uploads per hour to prevent Gemini API quota exhaustion
    if (isRateLimited(ip, 10, 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Trop d'analyses d'images demandées. Veuillez réessayer plus tard." });
    }

    try {
      const { images } = req.body; // Array of { data: string (base64 data), mimeType: string }

      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: "Aucune image fournie pour l'analyse." });
      }

      const client = getGeminiClient();

      const parts = images.map(img => {
        let cleanData = img.data;
        if (cleanData.includes("base64,")) {
          cleanData = cleanData.split("base64,")[1];
        }
        return {
          inlineData: {
            data: cleanData,
            mimeType: img.mimeType || "image/jpeg"
          }
        };
      });

      const textPrompt = `Analyse l'image (ou les images) d'une pièce ou d'un lot d'objets à déménager et dresse un inventaire précis des meubles, cartons, et objets visibles pour estimer leur volume en mètres cubes (m³).

Vous devez retourner les résultats strictement au format JSON selon le schéma demandé.
Pour chaque objet détecté :
1. Essayez de le faire de manière optimale correspondre à l'un des éléments standards de notre catalogue (fournissez le "itemId" correspondant) :
- "sofa2" (Canapé 2 places, 1.20 m³)
- "sofa3" (Canapé 3 places, 1.80 m³)
- "armchair" (Fauteuil, 0.40 m³)
- "coffee-table" (Table basse, 0.30 m³)
- "tv-stand" (Meuble TV, 0.60 m³)
- "tv" (Télévision, 0.15 m³)
- "shelf-small" (Bibliothèque petite, 0.80 m³)
- "shelf-large" (Bibliothèque grande, 1.50 m³)
- "rug" (Tapis, 0.10 m³)
- "table4" (Table 4 personnes, 0.80 m³)
- "table6" (Table 6 personnes, 1.20 m³)
- "chair" (Chaise, 0.15 m³)
- "sideboard" (Buffet, 0.80 m³)
- "china-cabinet" (Vaisselier, 1.20 m³)
- "bed-single" (Lit simple, 0.80 m³)
- "bed-double" (Lit double, 1.20 m³)
- "mattress-single" (Matelas simple, 0.40 m³)
- "mattress-double" (Matelas double, 0.70 m³)
- "nightstand" (Table de chevet, 0.15 m³)
- "dresser" (Commode, 0.80 m³)
- "wardrobe2" (Armoire 2 portes, 1.50 m³)
- "wardrobe3" (Armoire 3 portes, 2.20 m³)
- "fridge" (Réfrigérateur, 1.00 m³)
- "freezer" (Congélateur, 0.80 m³)
- "washing-machine" (Lave-linge, 0.50 m³)
- "dishwasher" (Lave-vaisselle, 0.50 m³)
- "oven" (Four, 0.20 m³)
- "microwave" (Micro-ondes, 0.05 m³)
- "desk" (Bureau, 0.80 m³)
- "desk-chair" (Chaise de bureau, 0.25 m³)
- "filing-cabinet" (Caisson, 0.20 m³)
- "monitor" (Écran, 0.05 m³)
- "printer" (Imprimante, 0.10 m³)
- "bike" (Vélo, 0.60 m³)
- "metal-shelf" (Étagère métallique, 0.50 m³)
- "suitcase" (Valise, 0.10 m³)
- "box-std" (Carton standard, 0.05 m³)
- "box-books" (Carton livres, 0.03 m³)
- "box-wardrobe" (Carton penderie, 0.20 m³)
- "box-fragile" (Carton vaisselle, 0.05 m³)

2. Si l'objet n'est pas précisément dans ce catalogue standard, vous devez configurer un item personnalisé en indiquant "itemId": null (ou "custom-xxx"), son nom clair en français (ex: "Table d'appoint ronde", "Vélo elliptique", "Plante verte moyenne", "Gros carton"), et un volume estimé réaliste en m³ (ex: petite table d'appoint = 0.2 m³, gros miroir = 0.1 m³, etc.).`;

      parts.push({
        text: textPrompt
      } as any);

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: parts as any },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              detectedRoomName: { type: Type.STRING },
              summary: { type: Type.STRING },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    itemId: { type: Type.STRING },
                    volume: { type: Type.NUMBER },
                    quantity: { type: Type.INTEGER },
                    confidence: { type: Type.INTEGER }
                  },
                  required: ["name", "volume", "quantity"]
                }
              }
            },
            required: ["detectedRoomName", "summary", "items"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("L'assistant Gemini a retourné une réponse vide.");
      }

      const cleanJson = JSON.parse(responseText.trim());
      res.json(cleanJson);

    } catch (error: any) {
      console.error("Gemini Image Analysis Error:", error);
      res.status(500).json({ 
        error: "Échec de l'analyse visuelle par l'IA", 
        details: error.message || error 
      });
    }
  });

  // API Route: AI-powered voice recording analysis to structure tasks & reports
  app.post("/api/gemini/speech-to-task", async (req, res) => {
    const ip = req.ip || "unknown";
    if (isRateLimited(ip, 20, 60 * 60 * 1000)) {
      return res.status(429).json({ error: "Trop de dictées vocales demandées. Veuillez réessayer plus tard." });
    }

    try {
      const { audioData, mimeType } = req.body;

      if (!audioData) {
        return res.status(400).json({ error: "Aucun fichier audio fourni pour la transcription." });
      }

      const client = getGeminiClient();

      let cleanData = audioData;
      if (cleanData.includes("base64,")) {
        cleanData = cleanData.split("base64,")[1];
      }

      const parts = [
        {
          inlineData: {
            data: cleanData,
            mimeType: mimeType || "audio/webm"
          }
        },
        {
          text: `Vous êtes un assistant logistique expert pour l'entreprise de déménagement Marne Transdem.
Analyse l'audio dicté par le chef d'équipe (chauffeur) et extrait de manière structurée :
1. Le statut du chantier (doit être l'un des suivants : "À planifier", "Programmé", "En cours", "Terminé").
2. Les notes ou commentaires mentionnés concernant le déroulement de la livraison (ex: mobilier endommagé, cartons en plus, accès difficile, etc. rédigé en bon français professionnel).
3. Si un incident, dommage ou litige a été signalé (reportedIssues: true ou false).

Retournez les résultats strictement au format JSON selon le schéma demandé.`
        }
      ];

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: parts as any },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING },
              notes: { type: Type.STRING },
              reportedIssues: { type: Type.BOOLEAN }
            },
            required: ["status", "notes", "reportedIssues"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("L'assistant Gemini a retourné une transcription vide.");
      }

      const cleanJson = JSON.parse(responseText.trim());
      res.json(cleanJson);

    } catch (error: any) {
      console.error("Gemini Speech Analysis Error:", error);
      res.status(500).json({ 
        error: "Échec de l'analyse vocale par l'IA", 
        details: error.message || error 
      });
    }
  });

  // API Route: Smart Fleet Auto-Routing & Optimization
  app.post("/api/route/optimize", async (req, res) => {
    const { moves, trucks, teamLeaders } = req.body;
    if (!moves || !Array.isArray(moves)) {
      return res.status(400).json({ error: "Paramètre 'moves' (tableau) requis." });
    }

    const availableTrucks = trucks && Array.isArray(trucks) && trucks.length > 0
      ? trucks
      : ['Camion 20m³ (A)', 'Camion 12m³ (B)'];
      
    const availableLeaders = teamLeaders && Array.isArray(teamLeaders) && teamLeaders.length > 0
      ? teamLeaders
      : ['Hervé Le Gall', 'Ahmed Bensalah'];

    const depotCoords = { lat: 48.8560, lng: 2.3995 }; // 43 rue des Maraîchers, 75020 Paris

    interface Coords { lat: number; lng: number }

    function getCoordinates(address: string, city: string): Coords {
      const cleanStr = ((address || '') + ' ' + (city || '')).toLowerCase();
      const zipMatch = cleanStr.match(/\b\d{5}\b/);
      if (zipMatch) {
        const zip = zipMatch[0];
        const dept = zip.substring(0, 2);
        if (dept === '75') return { lat: 48.8566, lng: 2.3522 };
        if (dept === '77') return { lat: 48.6000, lng: 2.9000 };
        if (dept === '78') return { lat: 48.8000, lng: 2.0000 };
        if (dept === '91') return { lat: 48.5000, lng: 2.2500 };
        if (dept === '92') return { lat: 48.8300, lng: 2.2000 };
        if (dept === '93') return { lat: 48.9000, lng: 2.4500 };
        if (dept === '94') return { lat: 48.7800, lng: 2.4500 };
        if (dept === '95') return { lat: 49.0300, lng: 2.0600 };
      }
      if (cleanStr.includes('lyon') || cleanStr.includes('6900')) return { lat: 45.7640, lng: 4.8357 };
      if (cleanStr.includes('marseille') || cleanStr.includes('1300')) return { lat: 43.2965, lng: 5.3698 };
      if (cleanStr.includes('bordeaux') || cleanStr.includes('3300')) return { lat: 44.8378, lng: -0.5792 };
      return { lat: 48.8566, lng: 2.3522 };
    }

    function haversineDistance(c1: Coords, c2: Coords): number {
      const R = 6371;
      const dLat = (c2.lat - c1.lat) * Math.PI / 180;
      const dLon = (c2.lng - c1.lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    try {
      const truckAssignments: { [truck: string]: any[] } = {};
      availableTrucks.forEach(t => { truckAssignments[t] = []; });
      const unassignedMoves: any[] = [];

      moves.forEach(m => {
        if (m.assignedTruck && truckAssignments[m.assignedTruck]) {
          truckAssignments[m.assignedTruck].push(m);
        } else {
          unassignedMoves.push(m);
        }
      });

      unassignedMoves.sort((a, b) => (b.volume || 0) - (a.volume || 0));
      
      unassignedMoves.forEach(m => {
        let bestTruck = availableTrucks[0];
        let minVolume = Infinity;

        availableTrucks.forEach(t => {
          const totalVol = truckAssignments[t].reduce((sum, item) => sum + (item.volume || 0), 0);
          if (totalVol < minVolume) {
            minVolume = totalVol;
            bestTruck = t;
          }
        });

        const truckIndex = availableTrucks.indexOf(bestTruck);
        const assignedLeader = availableLeaders[truckIndex % availableLeaders.length];

        const updatedMove = {
          ...m,
          assignedTruck: bestTruck,
          teamLeader: m.teamLeader || assignedLeader,
          status: m.status === 'À planifier' ? 'Programmé' : m.status
        };

        truckAssignments[bestTruck].push(updatedMove);
      });

      const optimizedMoves: any[] = [];

      for (const truck of availableTrucks) {
        const truckMoves = [...truckAssignments[truck]];
        if (truckMoves.length === 0) continue;

        const orderedMoves: any[] = [];
        let currentLocation = depotCoords;

        while (truckMoves.length > 0) {
          let closestIndex = 0;
          let minDistance = Infinity;

          for (let i = 0; i < truckMoves.length; i++) {
            const move = truckMoves[i];
            const moveCoords = getCoordinates(move.fromAddress || '', move.fromCity || '');
            const dist = haversineDistance(currentLocation, moveCoords);
            if (dist < minDistance) {
              minDistance = dist;
              closestIndex = i;
            }
          }

          const [nextMove] = truckMoves.splice(closestIndex, 1);
          orderedMoves.push(nextMove);
          currentLocation = getCoordinates(nextMove.toAddress || '', nextMove.toCity || '');
        }

        optimizedMoves.push(...orderedMoves);
      }

      const optimizedIds = new Set(optimizedMoves.map(m => m.id));
      moves.forEach(m => {
        if (!optimizedIds.has(m.id)) {
          optimizedMoves.push(m);
        }
      });

      res.json({ success: true, moves: optimizedMoves });
    } catch (err: any) {
      console.error("Auto-routing Error:", err);
      res.status(500).json({ error: "Échec de l'optimisation des itinéraires.", details: err.message || err });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  Object.entries(CANONICAL_ALIASES).forEach(([from, to]) => {
    app.get(from, (req, res) => {
      const query = req.originalUrl.includes("?")
        ? req.originalUrl.slice(req.originalUrl.indexOf("?"))
        : "";
      res.redirect(301, `${to}${query}`);
    });
  });

  app.get("/sitemap.xml", (req, res) => {
    const xml = getSitemapXml();
    if (!xml) {
      return res.status(500).send("Error generating sitemap");
    }
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(getRobotsTxt());
  });

  [
    ["/societe-demenagement-paris/", "/"],
    ["/demenagement-particuliers/", "/demenagement-particuliers-paris"],
    ["/services-demenagement/", "/services"],
    ["/location-de-monte-meuble-ou-de-monte-charge-a-paris-et-en-ile-de-france/", "/location-monte-meuble-paris"],
    ["/demenagement-dentreprises-a-paris-et-en-ile-de-france/", "/demenagement-entreprises-paris"],
    ["/devisdemenagement/", "/demande-de-devis"],
    ["/emballage-demenagement/", "/cartons-demenagement-paris"],
  ].forEach(([from, to]) => {
    app.get(from, (req, res) => {
      const query = req.originalUrl.includes("?")
        ? req.originalUrl.slice(req.originalUrl.indexOf("?"))
        : "";
      res.redirect(301, `${to}${query}`);
    });
  });

  const imagesRoot = path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? "dist/images" : "public/images",
  );

  app.get("/images/*", (req, res, next) => {
    const requestedImagePath = req.params[0];
    const variant = getNegotiatedImageVariant(
      requestedImagePath,
      imagesRoot,
      req.get("accept"),
    );

    if (!variant) {
      return next();
    }

    res.vary("Accept");
    res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
    res.type(variant.mimeType);
    return res.sendFile(variant.path, (error) => {
      if (error) next(error);
    });
  });

  app.use("/images", express.static(imagesRoot, {
    fallthrough: true,
    maxAge: "7d",
    setHeaders: (res) => {
      res.setHeader("Vary", "Accept");
      res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
    },
  }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "custom",
    });
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      try {
        const templatePath = path.join(process.cwd(), "index.html");
        const template = await vite.transformIndexHtml(
          req.originalUrl,
          fs.readFileSync(templatePath, "utf8")
        );
        const rendered = renderHtmlDocument(template, req.originalUrl);
        res.status(rendered.status).type("html").send(rendered.html);
      } catch (error) {
        next(error);
      }
    });
  } else {
    // Serve static files in production with optimized browser caching
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      index: false,
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        if (filePath.includes('/assets/')) {
          // Compiled assets in Vite include long hashes and are completely immutable
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.html')) {
          // HTML files must always be checked for updates
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
      }
    }));

    app.get('*', (req, res) => {
      const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
      const rendered = renderHtmlDocument(template, req.originalUrl);
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.status(rendered.status).type('html').send(rendered.html);
    });
  }

  // Bind to 0.0.0.0 and process.env.PORT for Cloud Run compatibility
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
