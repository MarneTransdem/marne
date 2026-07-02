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
import helmet from "helmet";
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

type PdfDocumentType = 'devis' | 'facture' | 'lettre_voiture' | 'declaration_valeur' | 'fiche_equipe';
type PdfHelperModule = {
  generatePdfBuffer: (type: PdfDocumentType, data: unknown) => Promise<Buffer>;
};

let pdfHelperPromise: Promise<PdfHelperModule> | null = null;

async function loadPdfHelper(): Promise<PdfHelperModule> {
  pdfHelperPromise ??= import("./functions/lib/pdf-helper.js").then((module: any) => {
    const helper = module.generatePdfBuffer ? module : module.default;
    if (!helper?.generatePdfBuffer) {
      throw new Error("Module PDF compilé indisponible.");
    }
    return helper as PdfHelperModule;
  });

  return pdfHelperPromise;
}

async function generateServerPdfBuffer(type: PdfDocumentType, data: unknown): Promise<Buffer> {
  const { generatePdfBuffer } = await loadPdfHelper();
  return generatePdfBuffer(type, data);
}

function getGeneratedDocsRoot(): string {
  return path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? "dist/generated_docs" : "public/generated_docs",
  );
}

type CrmRoleKey = 'gerant' | 'secretaire' | 'commercial' | 'chef_equipe';

type AdminActor = {
  uid: string;
  email?: string;
  role: CrmRoleKey;
};

function normalizeCrmRole(role: unknown): CrmRoleKey | null {
  const normalized = String(role ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, '_');

  if (normalized === 'gerant') return 'gerant';
  if (normalized === 'secretaire') return 'secretaire';
  if (normalized === 'commercial') return 'commercial';
  if (normalized === 'chef_equipe') return 'chef_equipe';
  return null;
}

function getBearerToken(req: any): string | null {
  const header = req.headers?.authorization;
  if (typeof header !== 'string') return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

function getAdminEmailRoles(type: unknown): CrmRoleKey[] | null {
  if (type === 'admin-doc') return ['gerant', 'secretaire', 'commercial'];
  if (type === 'invoice-reminder') return ['gerant', 'secretaire'];
  if (type === 'quote-reminder') return ['gerant', 'secretaire', 'commercial'];
  if (type === 'devis-tracking') return ['gerant', 'secretaire', 'commercial'];
  return null;
}

function getAdminPdfRoles(type: unknown): CrmRoleKey[] | null {
  if (type === 'devis') return ['gerant', 'secretaire', 'commercial'];
  if (type === 'facture') return ['gerant', 'secretaire'];
  if (type === 'declaration_valeur' || type === 'fiche_equipe') return ['gerant', 'secretaire', 'chef_equipe'];
  return null;
}

async function requireCrmRole(req: any, res: any, allowedRoles: CrmRoleKey[]): Promise<AdminActor | null> {
  const token = getBearerToken(req);
  if (!token) {
    res.status(401).json({ error: 'Authentification admin requise.' });
    return null;
  }

  if (admin.apps.length === 0) {
    res.status(503).json({ error: 'Service d authentification admin indisponible.' });
    return null;
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const email = decoded.email?.toLowerCase();
    const role = email === 'contact@marnetransdem.com'
      ? 'gerant'
      : normalizeCrmRole((decoded as any).role);

    if (!role || !allowedRoles.includes(role)) {
      res.status(403).json({ error: 'Droits backoffice insuffisants.' });
      return null;
    }

    return { uid: decoded.uid, email: decoded.email, role };
  } catch (error) {
    console.warn('Invalid admin token:', error);
    res.status(401).json({ error: 'Session admin invalide ou expiree.' });
    return null;
  }
}
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const negotiableImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const firebaseAuthHelperOrigin = "https://marnetransdem20.firebaseapp.com";
const imageVariantPreference = [
  { extension: "avif", mimeType: "image/avif" },
  { extension: "webp", mimeType: "image/webp" },
] as const;

function readRequestBody(req: express.Request): Promise<Buffer | undefined> {
  if (req.method === "GET" || req.method === "HEAD") return Promise.resolve(undefined);

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function proxyFirebaseAuthHelper(req: express.Request, res: express.Response) {
  try {
    const targetUrl = new URL(req.originalUrl, firebaseAuthHelperOrigin);
    const headers = new Headers();

    Object.entries(req.headers).forEach(([key, value]) => {
      if (!value) return;
      const lowerKey = key.toLowerCase();
      if (["host", "connection", "content-length"].includes(lowerKey)) return;
      if (Array.isArray(value)) {
        value.forEach((item) => headers.append(key, item));
      } else {
        headers.set(key, value);
      }
    });

    headers.set("host", "marnetransdem20.firebaseapp.com");

    const body = await readRequestBody(req);
    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: "manual"
    } as RequestInit);

    res.status(upstream.status);
    upstream.headers.forEach((value, key) => {
      if (["content-encoding", "transfer-encoding", "connection"].includes(key.toLowerCase())) return;
      res.setHeader(key, value);
    });

    const payload = Buffer.from(await upstream.arrayBuffer());
    res.send(payload);
  } catch (error) {
    console.error("Firebase auth helper proxy failed:", error);
    res.status(502).send("Firebase Auth helper unavailable");
  }
}

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

  // Security Headers: Content Security Policy & XSS protections
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://unpkg.com",
            "https://maps.googleapis.com",
            "https://apis.google.com",
            "https://www.googletagmanager.com",
            "https://www.google-analytics.com",
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
            "https://unpkg.com",
          ],
          fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
          imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "https://unpkg.com",
            "https://*.tile.openstreetmap.org",
            "https://*.basemaps.cartocdn.com",
            "https://maps.googleapis.com",
            "https://maps.gstatic.com",
            "https://*.ggpht.com",
            "https://*.googleusercontent.com",
            "https://firebasestorage.googleapis.com",
            "https://www.google-analytics.com",
            "https://www.google.com",
            "https://www.google.fr",
            "https://*.doubleclick.net",
          ],
          connectSrc: [
            "'self'",
            "https://*.googleapis.com",
            "https://*.firebaseio.com",
            "https://*.tile.openstreetmap.org",
            "https://*.basemaps.cartocdn.com",
            "https://firebasestorage.googleapis.com",
            "https://api-adresse.data.gouv.fr",
            "https://router.project-osrm.org",
            "https://identitytoolkit.googleapis.com",
            "https://securetoken.googleapis.com",
            "wss://*.firebaseio.com",
            "https://www.google-analytics.com",
            "https://*.google-analytics.com",
            "https://*.analytics.google.com",
            "https://*.googletagmanager.com",
            "https://*.doubleclick.net",
          ],
          frameSrc: [
            "'self'",
            "https://*.firebaseapp.com",
            "https://accounts.google.com",
          ],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  app.all("/__/auth/*", proxyFirebaseAuthHelper);

  // Middleware for parsing JSON with increased limit for base64 images/videos
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Reusable email template (global helper accessible by all routes)
  const createMailTransporter = () => nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'contact@marnetransdem.com',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
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

  // API Route: Send Email
  app.post("/api/send-email", async (req, res) => {
    const { type, data, website } = req.body;

    // Honeypot spam prevention
    if (website) {
      const ip = req.ip || "unknown";
      console.warn(`Honeypot anti-spam triggered from IP: ${ip}`);
      return res.status(400).json({ error: "Requête invalide" });
    }

    const emailRoles = getAdminEmailRoles(type);
    if (emailRoles) {
      const actor = await requireCrmRole(req, res, emailRoles);
      if (!actor) return;

      if (isRateLimited(`admin-email:${actor.uid}:${type}`, 60, 60 * 60 * 1000)) {
        return res.status(429).json({ error: 'Trop d actions admin envoyees. Veuillez reessayer plus tard.' });
      }
    } else {
      const ip = req.ip || "unknown";
      if (isRateLimited(ip, 5, 60 * 60 * 1000)) {
        return res.status(429).json({ error: "Trop de demandes envoyees. Veuillez reessayer plus tard." });
      }
    }

    const transporter = createMailTransporter();


    // Handle Admin Document Email Sending
    if (type === 'admin-doc') {
      const { clientName, clientEmail, pdfName, pdfBase64, id, docData } = data;
      const documentTypeName = req.body.documentType === 'devis' ? 'Devis' : 'Facture';

      let base64Attachment = pdfBase64;
      if (!base64Attachment && docData) {
        try {
          const buffer = await generateServerPdfBuffer(req.body.documentType, docData);
          base64Attachment = buffer.toString('base64');
        } catch (pdfErr) {
          console.error("Failed to generate PDF for local dev email attachment:", pdfErr);
        }
      }

      const origin = req.headers.origin || 'https://marnetransdem.com';
      const signUrl = `${origin}/signature-devis/${id}`;

      const emailHtml = `
        <p>Bonjour <strong>${clientName}</strong>,</p>
        <p>Veuillez trouver ci-joint votre <strong>${documentTypeName.toLowerCase()} N° ${id}</strong> concernant votre déménagement avec Marne Transdem.</p>
        ${req.body.documentType === 'devis' ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${signUrl}" style="background-color: #f59e0b; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            ✍️ Consulter & Signer mon devis en ligne
          </a>
        </div>
        ` : ''}
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

        const buffer = await generateServerPdfBuffer('lettre_voiture', finalMoveData);
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

    if (type === 'quote-reminder') {
      const { quote, reminderStage } = data;
      if (!quote) {
        return res.status(400).json({ error: "Données du devis manquantes" });
      }

      const clientName = quote.clientName || "Client";
      const clientEmail = quote.email || quote.clientEmail || "";
      if (!clientEmail) {
        return res.status(400).json({ error: "Adresse email du client manquante" });
      }

      try {
        const buffer = await generateServerPdfBuffer('devis', quote);
        const base64Attachment = buffer.toString('base64');

        const formatDateFr = (dateStr?: string) => {
          if (!dateStr) return 'non précisée';
          const parts = dateStr.split('T')[0].split('-');
          if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
          return dateStr;
        };

        const isExpiringReminder = reminderStage === 'quote_reminder_expiring';
        const routeLabel = [quote.fromCity, quote.toCity].filter(Boolean).join(' vers ') || 'votre déménagement';
        const amountLabel = `${Math.round(Number(quote.price || 0)).toLocaleString('fr-FR')} €`;
        const subject = isExpiringReminder
          ? `Votre devis Marne Transdem N° ${quote.id} arrive bientôt à expiration`
          : `Suite à votre devis Marne Transdem N° ${quote.id}`;
        const emailHtml = isExpiringReminder ? `
          <p>Bonjour <strong>${clientName}</strong>,</p>
          <p>Votre devis <strong>N° ${quote.id}</strong> pour ${routeLabel} arrive bientôt à expiration${quote.expiresAt ? ` le <strong>${formatDateFr(quote.expiresAt)}</strong>` : ''}.</p>
          <p>Pour garantir la disponibilité de l'équipe et du véhicule à la date souhaitée, nous vous invitons à nous confirmer votre accord dès que possible.</p>
          <p>Le devis d'un montant de <strong>${amountLabel}</strong> est joint à ce message.</p>
          <p style="margin-top: 24px;">Cordialement,<br/><strong>L'équipe Marne Transdem</strong></p>
        ` : `
          <p>Bonjour <strong>${clientName}</strong>,</p>
          <p>Je me permets de revenir vers vous concernant le devis <strong>N° ${quote.id}</strong> transmis pour ${routeLabel}.</p>
          <p>Avez-vous pu en prendre connaissance ? Nous restons disponibles pour répondre à vos questions, ajuster certains points ou bloquer la date dès votre validation.</p>
          <p>Le devis d'un montant de <strong>${amountLabel}</strong> est de nouveau joint à ce message.</p>
          <p style="margin-top: 24px;">Cordialement,<br/><strong>L'équipe Marne Transdem</strong></p>
        `;

        if (!process.env.GMAIL_APP_PASSWORD || !process.env.GMAIL_USER) {
          return res.status(500).json({ error: "Configuration email manquante" });
        }

        await transporter.sendMail({
          from: `"Marne Transdem" <${process.env.GMAIL_USER}>`,
          to: clientEmail,
          cc: process.env.GMAIL_USER,
          subject,
          html: getEmailContainer(`Relance Devis N° ${quote.id}`, emailHtml),
          attachments: [
            {
              filename: `Devis_${quote.id}.pdf`,
              content: base64Attachment,
              encoding: 'base64'
            }
          ]
        });

        return res.json({ success: true });
      } catch (error: any) {
        console.error("Quote Reminder Email Error:", error);
        return res.status(500).json({ error: "Échec de l'envoi de la relance devis", details: error.message || error });
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
        const buffer = await generateServerPdfBuffer('facture', invoice);
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


    const pdfRoles = getAdminPdfRoles(type);
    if (pdfRoles) {
      const actor = await requireCrmRole(req, res, pdfRoles);
      if (!actor) return;

      if (isRateLimited(`admin-pdf:${actor.uid}:${type}`, 120, 60 * 60 * 1000)) {
        return res.status(429).json({ error: 'Trop de generations PDF admin. Veuillez reessayer plus tard.' });
      }
    }
    try {
      const buffer = await generateServerPdfBuffer(type, data);

      const crypto = await import("crypto");
      const hash = crypto.createHash("sha256").update(buffer).digest("hex");

      const fs = await import("fs");
      const dir = getGeneratedDocsRoot();
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const localFileName = `${type}_${data.id}_${hash.substring(0, 10)}.pdf`;
      const localFilePath = path.join(dir, localFileName);
      fs.writeFileSync(localFilePath, buffer);

      const url = `/generated_docs/${localFileName}`;
      res.json({
        success: true,
        url,
        hash,
        fileName: localFileName,
        mimeType: "application/pdf",
        contentBase64: buffer.toString("base64"),
      });
    } catch (error: any) {
      console.error("Local PDF Generation Error:", error);
      res.status(500).json({ error: "Échec de la génération du document PDF en local.", details: error.message || error });
    }
  });

  // API Route: Virtual Commercial Agent (Chatbot/Voicebot)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      if (isRateLimited(req.ip || "unknown", 30, 60000)) {
        return res.status(429).json({ error: "Trop de requêtes au Chatbot." });
      }

      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "L'historique des messages est requis." });
      }

      const client = getGeminiClient();

      const systemInstruction = `Tu es l'assistant vocal et textuel de Marne Transdem, une entreprise de déménagement haut de gamme à Paris.
Ton objectif est de qualifier les prospects et de générer des demandes de devis.
Pose des questions de manière conversationnelle pour obtenir :
- Nom et prénom
- Numéro de téléphone
- Email (optionnel)
- Ville de départ
- Ville d'arrivée
- Volume estimé (ou description de l'appartement si le client ne sait pas)
- Date souhaitée

Dès que tu as assez d'informations (Nom, Téléphone, Villes de départ et arrivée), utilise l'outil "create_quote_request" pour enregistrer la demande.
Ne dis jamais que tu as utilisé un outil, dis juste "Votre demande a bien été enregistrée et un conseiller va vous rappeler".
Sois concis, professionnel et chaleureux. Ne fais pas de grosses listes à puces.`;

      const tools = [{
        functionDeclarations: [{
          name: "create_quote_request",
          description: "Crée une demande de devis dans le CRM. Appeler cet outil dès que le nom, téléphone, et villes de départ/arrivée sont connus.",
          parameters: {
            type: Type.OBJECT,
            properties: {
              fullName: { type: Type.STRING, description: "Nom complet du client" },
              phone: { type: Type.STRING, description: "Numéro de téléphone" },
              email: { type: Type.STRING, description: "Adresse e-mail du client" },
              fromCity: { type: Type.STRING, description: "Ville de départ" },
              toCity: { type: Type.STRING, description: "Ville d'arrivée" },
              volume: { type: Type.STRING, description: "Volume estimé en m3 ou description du logement" },
              date: { type: Type.STRING, description: "Date souhaitée pour le déménagement" }
            },
            required: ["fullName", "phone", "fromCity", "toCity"]
          }
        }]
      }];

      let response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: messages,
        config: { tools, systemInstruction },
      });

      let updatedMessages = [...messages];

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        let toolResult = {};

        if (call.name === 'create_quote_request') {
          try {
            const args = call.args as any;
            await admin.firestore().collection('quotes').add({
              fullName: args.fullName || '',
              phone: args.phone || '',
              email: args.email || '',
              fromCity: args.fromCity || '',
              toCity: args.toCity || '',
              volume: args.volume || '',
              date: args.date || '',
              status: 'Nouveau',
              source: 'chatbot',
              createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
            toolResult = { success: true, message: "Devis généré avec succès dans le CRM." };
          } catch (e: any) {
            console.error("Chatbot Tool Error:", e);
            toolResult = { success: false, error: e.message };
          }
        }

        // Add the model's function call to history
        updatedMessages.push({
          role: "model",
          parts: [{ functionCall: call }]
        });

        // Add the tool execution result
        updatedMessages.push({
          role: "user",
          parts: [{ functionResponse: { name: call.name, response: toolResult } }]
        });

        // Re-call Gemini to get the final text response based on the tool success
        response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: updatedMessages,
          config: { tools, systemInstruction },
        });
      }

      res.json({
        text: response.text,
        history: [...updatedMessages, { role: "model", parts: [{ text: response.text }] }]
      });

    } catch (error: any) {
      console.error("Chatbot API Error:", error);
      res.status(500).json({ error: "Erreur de l'assistant virtuel." });
    }
  });

  // AI Auto-Followup Logic
  async function runAutoFollowups() {
    try {
      const db = admin.firestore();

      const now = Date.now();
      const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

      const devisSnapshot = await db.collection('devis')
        .where('status', '==', 'Envoyé')
        .get();

      const eligibleDevis: any[] = [];
      devisSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.reminderCount && data.reminderCount > 0) return;
        if (!data.sentAt) return;

        const sentDate = new Date(data.sentAt).getTime();
        if (now - sentDate > FORTY_EIGHT_HOURS) {
          eligibleDevis.push({ id: doc.id, ...data });
        }
      });

      if (eligibleDevis.length === 0) return { processed: 0, sent: 0 };

      const movesSnapshot = await db.collection('demenagements')
        .where('status', 'in', ['Programmé', 'À planifier'])
        .get();

      const plannedMoves: any[] = [];
      movesSnapshot.forEach(doc => plannedMoves.push({ id: doc.id, ...doc.data() }));

      const client = getGeminiClient();
      let sentCount = 0;

      for (const devis of eligibleDevis) {
        if (!devis.email) continue;

        const devisDate = new Date(devis.date).getTime();

        let matchingMove = null;
        for (const move of plannedMoves) {
           if (!move.date) continue;
           const moveDate = new Date(move.date).getTime();
           const daysDiff = Math.abs(devisDate - moveDate) / (1000 * 60 * 60 * 24);

           // Same cities, opposite direction within 2 days
           if (daysDiff <= 2 && move.toCity === devis.fromCity && move.fromCity === devis.toCity) {
              matchingMove = move;
              break;
           }
        }

        let aiPrompt = `Tu es le commercial de Marne Transdem. Rédige un e-mail de relance TRÈS CONVAINCANT et professionnel à un prospect (Nom: ${devis.clientName}) dont le devis pour le déménagement ${devis.fromCity} -> ${devis.toCity} prévu le ${devis.date} est en attente de signature depuis 48h.`;

        if (matchingMove) {
          aiPrompt += `\n\nEXCELLENTE NOUVELLE (l'argument massue) : Dis-lui que nous avons justement un de nos camions qui fera le trajet inverse (${matchingMove.fromCity} -> ${matchingMove.toCity}) le ${matchingMove.date} et qui rentrera à vide.
          Pour optimiser ce retour à vide, propose-lui UNE REMISE FLASH DE 5% s'il valide son devis dans les 24 heures.`;
        } else {
          aiPrompt += `\n\nDemande simplement au client s'il a bien reçu le devis, s'il a la moindre question, et rappelle que notre équipe est à sa disposition pour l'accompagner.`;
        }

        aiPrompt += `\n\nFormate ton e-mail pour qu'il soit directement lisible, n'ajoute pas d'objet dans le texte, commence par "Bonjour ${devis.clientName}".`;

        const response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: aiPrompt,
        });

        const emailContent = response.text || "Bonjour, avez-vous des questions sur votre devis ?";

        await createMailTransporter().sendMail({
          from: '"Marne Transdem" <contact@marnetransdem.com>',
          to: devis.email,
          subject: matchingMove ? "Une opportunité à saisir pour votre devis Marne Transdem" : "Suivi de votre devis Marne Transdem",
          html: getEmailContainer("Votre Devis Marne Transdem", emailContent.replace(/\n/g, '<br>'))
        });

        await db.collection('devis').doc(devis.id).update({
          reminderCount: admin.firestore.FieldValue.increment(1),
          lastReminderAt: new Date().toISOString()
        });

        const dId = devis.dossierKey || devis.dossierId;
        if (dId) {
           await db.collection('dossiers').doc(dId).collection('notes').add({
              author: 'IA Marne Transdem',
              content: `Relance automatique envoyée par email.${matchingMove ? ' Remise 5% proposée (retour à vide détecté).' : ''}`,
              createdAt: new Date().toISOString()
           });
        }
        sentCount++;
      }
      return { processed: eligibleDevis.length, sent: sentCount };
    } catch (e) {
      console.error("Auto Follow-up error:", e);
      throw e;
    }
  }

  // Run automatically every 12 hours
  setInterval(() => {
    runAutoFollowups().catch(console.error);
  }, 12 * 60 * 60 * 1000);

  // API endpoint to trigger manually
  app.post("/api/cron/auto-followup", async (req, res) => {
    try {
      const actor = await requireCrmRole(req, res, ['gerant', 'commercial', 'secretaire']);
      if (!actor) return;

      const result = await runAutoFollowups();
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(500).json({ error: "Erreur lors de la relance IA", details: error.message });
    }
  });

  // API Route: Get Quote for Public Signature
  app.get("/api/public/devis/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const db = admin.firestore();
      const devisDoc = await db.collection('devis').doc(id).get();

      if (!devisDoc.exists) {
        return res.status(404).json({ error: "Devis introuvable." });
      }

      const data = devisDoc.data();
      // We only return public fields
      res.json({
        success: true,
        devis: {
          id: devisDoc.id,
          clientName: data?.clientName,
          fromCity: data?.fromCity,
          toCity: data?.toCity,
          volume: data?.volume,
          price: data?.price,
          date: data?.date,
          status: data?.status,
          clientSignature: data?.clientSignature
        }
      });
    } catch (error: any) {
      console.error("Public Devis Fetch Error:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });

  // API Route: Submit Quote Signature
  app.post("/api/public/devis/:id/sign", async (req, res) => {
    try {
      const { id } = req.params;
      const { signatureBase64 } = req.body;

      if (!signatureBase64) {
        return res.status(400).json({ error: "Signature manquante." });
      }

      const db = admin.firestore();
      const devisRef = db.collection('devis').doc(id);
      const devisDoc = await devisRef.get();

      if (!devisDoc.exists) {
        return res.status(404).json({ error: "Devis introuvable." });
      }

      if (devisDoc.data()?.status === 'Signé' || devisDoc.data()?.clientSignature) {
        return res.status(400).json({ error: "Ce devis est déjà signé." });
      }

      await devisRef.update({
        status: 'Signé',
        clientSignature: signatureBase64,
        acceptedAt: new Date().toISOString()
      });

      // Add note in the dossier if possible
      const dId = devisDoc.data()?.dossierKey || devisDoc.data()?.dossierId;
      if (dId) {
         await db.collection('dossiers').doc(dId).collection('notes').add({
            author: 'Système',
            content: `Le devis a été signé électroniquement par le client.`,
            createdAt: new Date().toISOString()
         });
      }

      // Notify admins via email about the signed quote
      try {
        await createMailTransporter().sendMail({
          from: '"Marne Transdem Web" <contact@marnetransdem.com>',
          to: 'contact@marnetransdem.com',
          subject: `[Devis Signé] ${devisDoc.data()?.clientName} a signé son devis !`,
          html: getEmailContainer(
            '<span style="background-color: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 12px; text-transform: uppercase;">Devis Signé</span>',
            `<p>Excellente nouvelle, le client <strong>${devisDoc.data()?.clientName}</strong> vient de signer son devis (N° ${id}) électroniquement en ligne !</p>
             <p>Montant : ${devisDoc.data()?.price} €</p>
             <p>Trajet : ${devisDoc.data()?.fromCity} -> ${devisDoc.data()?.toCity}</p>`
          )
        });
      } catch(e) {}

      res.json({ success: true });
    } catch (error: any) {
      console.error("Public Devis Sign Error:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });



  // ─────────────────────────────────────────────────────────────────────────────
  // STRIPE PAYMENT ROUTES
  // ─────────────────────────────────────────────────────────────────────────────

  function getStripeClient() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key.startsWith('sk_test_REMPLACEZ')) {
      throw new Error('Stripe non configuré : ajoutez STRIPE_SECRET_KEY dans votre fichier .env');
    }
    const Stripe = require('stripe');
    return new Stripe(key, { apiVersion: '2025-05-28.basil' });
  }

  // API Route: Create Stripe Checkout Session for acompte
  app.post('/api/public/devis/:id/create-checkout-session', async (req, res) => {
    try {
      const { id } = req.params;
      const db = admin.firestore();
      const devisDoc = await db.collection('devis').doc(id).get();

      if (!devisDoc.exists) {
        return res.status(404).json({ error: 'Devis introuvable.' });
      }

      const data = devisDoc.data()!;

      if (data.status !== 'Signé') {
        return res.status(400).json({ error: 'Le devis doit être signé avant de payer l\'acompte.' });
      }

      if (data.paymentStatus === 'Acompte Payé') {
        return res.status(400).json({ error: 'L\'acompte a déjà été payé.' });
      }

      const stripe = getStripeClient();
      const acomptePercent = parseInt(process.env.STRIPE_ACOMPTE_PERCENT || '30', 10);
      const acompteAmount = Math.round(data.price * (acomptePercent / 100) * 100); // en centimes

      const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'http://localhost:5173';

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        currency: 'eur',
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'eur',
              unit_amount: acompteAmount,
              product_data: {
                name: `Acompte de réservation - Déménagement Marne Transdem`,
                description: `${acomptePercent}% d'acompte sur votre devis N° ${id} (${data.fromCity} → ${data.toCity}). Solde à régler le jour du déménagement.`,
              },
            },
          },
        ],
        customer_email: data.email || undefined,
        metadata: {
          devisId: id,
          clientName: data.clientName,
          acomptePercent: String(acomptePercent),
        },
        success_url: `${origin}/signature-devis/${id}?payment=success`,
        cancel_url: `${origin}/signature-devis/${id}?payment=cancel`,
        payment_intent_data: {
          description: `Acompte devis ${id} - ${data.clientName}`,
        },
      });

      // Store session ID on the devis document
      await db.collection('devis').doc(id).update({
        stripeSessionId: session.id,
        paymentStatus: 'En attente',
        acompteAmount: acompteAmount / 100,
      });

      res.json({ success: true, url: session.url });
    } catch (error: any) {
      console.error('Stripe Checkout Session Error:', error);
      const msg = error.message?.includes('non configuré')
        ? error.message
        : 'Erreur lors de la création de la session de paiement.';
      res.status(500).json({ error: msg });
    }
  });

  // API Route: Stripe Webhook - payment confirmation
  // NOTE: This route requires the raw body, so it must be registered BEFORE express.json()
  // Since express.json() is already set up above, we use express.raw() here for this route
  app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;

    try {
      if (webhookSecret && sig && !webhookSecret.startsWith('whsec_REMPLACEZ')) {
        const stripe = getStripeClient();
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        // In development without webhook secret, parse body directly
        event = JSON.parse(req.body.toString());
      }
    } catch (err: any) {
      console.error('Stripe Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const devisId = session.metadata?.devisId;

      if (devisId && session.payment_status === 'paid') {
        try {
          const db = admin.firestore();
          const devisRef = db.collection('devis').doc(devisId);
          const devisDoc = await devisRef.get();
          const devisData = devisDoc.data();

          await devisRef.update({
            paymentStatus: 'Acompte Payé',
            acomptePayedAt: new Date().toISOString(),
          });

          // Notify admin
          if (devisData) {
            const acompteAmt = (session.amount_total / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            await createMailTransporter().sendMail({
              from: '"Marne Transdem Paiement" <contact@marnetransdem.com>',
              to: 'contact@marnetransdem.com',
              subject: `[Acompte Reçu 💰] ${devisData.clientName} - ${acompteAmt}`,
              html: getEmailContainer(
                '<span style="background-color:#dcfce7;color:#166534;padding:4px 10px;border-radius:6px;font-weight:800;font-size:12px;text-transform:uppercase;">Acompte Reçu</span>',
                `<p>Le client <strong>${devisData.clientName}</strong> vient de payer son acompte de <strong>${acompteAmt}</strong> pour le devis N° ${devisId}.</p>
                 <p>Trajet : ${devisData.fromCity} → ${devisData.toCity}</p>
                 <p>La réservation est confirmée.</p>`
              )
            }).catch(e => console.error('Admin notification email failed:', e));

            // Confirm to client
            if (devisData.email) {
              await createMailTransporter().sendMail({
                from: '"Marne Transdem" <contact@marnetransdem.com>',
                to: devisData.email,
                subject: `Confirmation de votre acompte - Marne Transdem`,
                html: getEmailContainer(
                  'Votre acompte a bien été reçu ✅',
                  `<p>Bonjour <strong>${devisData.clientName}</strong>,</p>
                   <p>Nous confirmons la bonne réception de votre acompte de <strong>${acompteAmt}</strong>.</p>
                   <p>Votre déménagement est maintenant officiellement réservé. Vous serez recontacté par notre équipe pour confirmer les derniers détails.</p>
                   <p>Merci de votre confiance !</p>
                   <p>Cordialement,<br/>L'équipe Marne Transdem</p>`
                )
              }).catch(e => console.error('Client confirmation email failed:', e));
            }
          }

          console.log(`✅ Acompte payé pour le devis ${devisId}`);
        } catch (dbErr) {
          console.error('Error updating devis after payment:', dbErr);
        }
      }
    }

    res.json({ received: true });
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

  app.use("/generated_docs", express.static(getGeneratedDocsRoot(), {
    fallthrough: false,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "private, no-store");
      res.setHeader("Content-Type", "application/pdf");
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
