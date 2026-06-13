import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Firestore } from '@google-cloud/firestore';

admin.initializeApp();
const db = admin.firestore();

const api = express();
api.use(helmet());
api.use(cors({ origin: true }));
api.use(express.json());

// Simple Firestore-backed rate limiter store
class FirestoreStore {
  async incr(key: string) {
    const docRef = db.collection('rateLimits').doc(key);
    const doc = await docRef.get();
    const now = admin.firestore.Timestamp.now();
    let count = 1;
    if (doc.exists) {
      const data = doc.data();
      const created = data?.created?.toDate?.() ?? new Date();
      const diff = (now.toDate().getTime() - created.getTime()) / 1000;
      if (diff < 60) {
        count = (data?.count ?? 0) + 1;
      }
    }
    await docRef.set({ count, created: now }, { merge: true });
    return { totalHits: count, resetTime: new Date(now.toDate().getTime() + 60000) };
  }
}

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.ip,
  store: new FirestoreStore() as any,
});

api.use(limiter);

// Honeypot middleware
api.use((req, res, next) => {
  if (req.body && typeof req.body === 'object' && 'website' in req.body && req.body.website) {
    return res.status(400).json({ error: 'Spam detected' });
  }
  next();
});

// Contact endpoint
api.post('/api/contact', async (req, res) => {
  try {
    await db.collection('contacts').add({ ...req.body, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal error' });
  }
});

// Placeholder for gemini analysis route (keep existing logic imported if needed)
api.post('/api/gemini/analyze-images', async (req, res) => {
  // TODO: integrate existing Gemini analysis code here
  res.status(501).json({ error: 'Not implemented yet' });
});

// Sitemap generation (reuse logic from previous server.ts if available)
api.get('/sitemap.xml', (req, res) => {
  // Simple static example – replace with dynamic route extraction if needed
  const urls = [
    '/',
    '/contact',
    '/quote',
    '/volume-calculator',
  ];
  const xmlns = 'http://www.sitemaps.org/schemas/sitemap/0.9';
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${xmlns}">\n`;
  urls.forEach((u) => {
    xml += `  <url><loc>https://marnetransdem20.web.app${u}</loc></url>\n`;
  });
  xml += '</urlset>';
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

api.get('/robots.txt', (req, res) => {
  res.type('text/plain').send('User-agent: *\nAllow: /');
});

api.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

export const app = functions.https.onRequest(api);
