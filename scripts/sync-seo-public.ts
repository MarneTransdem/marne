import fs from 'node:fs';
import { CANONICAL_ALIASES, getRobotsTxt, getSitemapXml } from '../src/lib/seo-routes.ts';

fs.writeFileSync('public/robots.txt', getRobotsTxt() + '\n');
fs.writeFileSync('public/sitemap.xml', getSitemapXml() + '\n');
const config = JSON.parse(fs.readFileSync('firebase.json', 'utf8'));
const generated = Object.entries(CANONICAL_ALIASES).map(([source, destination]) => ({ source, destination, type: 301 }));
const missing = generated.filter(alias => !(config.hosting.redirects || []).some((entry: { source: string; destination: string; type: number }) => entry.source === alias.source && entry.destination === alias.destination && entry.type === 301));
if (missing.length) throw new Error(`Hosting aliases must match seo-routes.ts: ${missing.map(x => x.source).join(', ')}`);
console.log('Canonical sitemap, robots and hosting redirects synchronized.');
