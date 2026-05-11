import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware for parsing JSON
  app.use(express.json());

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
      if (!process.env.GMAIL_APP_PASSWORD) {
        console.warn("GMAIL_APP_PASSWORD is not set. Skipping real email send for demo.");
        return res.json({ success: true, message: "Simulation réussie (Pas de pass)" });
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
