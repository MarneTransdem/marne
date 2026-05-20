import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

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

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware for parsing JSON with increased limit for base64 images/videos
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API Route: Send Email
  app.post("/api/send-email", async (req, res) => {
    const { type, data } = req.body;
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'contact@marnetransdem.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const isQuote = type === 'quote';
    const clientName = isQuote ? data.fullName : data.name;
    const clientEmail = data.email;
    const adminEmail = "contact@marnetransdem.com";

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
        html: getEmailContainer(isQuote ? "Nouvelle demande de devis" : "Nouveau message de contact", adminHtml)
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

  // API Route: AI-powered image/video analysis for volume calculations
  app.post("/api/gemini/analyze-images", async (req, res) => {
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

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Bind to 0.0.0.0 and process.env.PORT for Cloud Run compatibility
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
