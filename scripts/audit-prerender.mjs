import fs from 'node:fs/promises';
import path from 'node:path';
import { auditBreadcrumbNames } from './breadcrumb-audit.mjs';

const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x => new URL(x[1]));
const paths = new Set(urls.map(x => x.pathname));
const errors = [];
const pages = [];
const seenTitles = new Map();
const seenDescriptions = new Map();
const commercialServices = new Map([
  ['/demenagement-particuliers-paris', 'Déménagement particuliers à Paris'],
  ['/demenagement-entreprises-paris', 'Déménagement entreprises à Paris'],
  ['/garde-meuble-paris', 'Garde-meuble et stockage'],
  ['/location-monte-meuble-paris', 'Location de monte-meuble'],
  ['/transfert-bureaux-paris', 'Transfert de bureaux à Paris'],
]);
for (const url of urls) {
  const html = await fs.readFile(path.join('dist', url.pathname === '/' ? 'index.html' : url.pathname.slice(1) + '.html'), 'utf8');
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)].map(x => x[1]);
  const titles = [...html.matchAll(/<title[^>]*>(.*?)<\/title>/g)];
  const h1 = [...html.matchAll(/<h1\b/g)].length;
  if (canonicals.length !== 1 || new URL(canonicals[0]).href !== url.href) errors.push(`${url.pathname}: canonical ${canonicals.join(', ')}`);
  if (titles.length !== 1 || h1 !== 1) errors.push(`${url.pathname}: ${titles.length} titles, ${h1} h1`);
  const description = html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/);
  for (const [value, seen, label] of [[titles[0]?.[1], seenTitles, 'title'], [description?.[1], seenDescriptions, 'description']]) {
    if (!value?.trim()) errors.push(`${url.pathname}: missing ${label}`);
    else if (seen.has(value)) errors.push(`${url.pathname}: duplicate ${label} with ${seen.get(value)}`);
    else seen.set(value, url.pathname);
  }
  if (/name="robots" content="noindex/.test(html)) errors.push(`${url.pathname}: noindex`);
  if (/<link\b[^>]*\bto\s*=/i.test(html)) errors.push(`${url.pathname}: React Link markup rendered as HTML instead of a crawlable anchor`);
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(x => x[1].replaceAll('&amp;', '&'));
  const internal = [...new Set(links.filter(x => x.startsWith('/') && !x.startsWith('//')).map(x => new URL(x, url).pathname))];
  // The sitemap is a valid static resource, read and parsed above, not an HTML page.
  for (const target of internal) if (!paths.has(target) && target !== '/sitemap.xml') errors.push(`${url.pathname} -> ${target}`);
  const schemas = [];
  for (const script of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(script[1]);
      schemas.push(data);
      errors.push(...auditBreadcrumbNames(data).map(error => `${url.pathname}: ${error}`));
    } catch { errors.push(`${url.pathname}: invalid JSON-LD`); }
  }
  if (commercialServices.has(url.pathname)) {
    const services = schemas.filter(schema => schema['@type'] === 'Service');
    const service = services[0];
    if (services.length !== 1 || service.url !== url.href || service['@id'] !== `${url.href}#service`
      || service.mainEntityOfPage !== url.href || service.serviceType !== commercialServices.get(url.pathname)) {
      errors.push(`${url.pathname}: inconsistent commercial Service schema`);
    }
    const providerId = service?.provider?.['@id'];
    if (!providerId || !schemas.some(schema => schema['@type'] === 'MovingCompany' && schema['@id'] === providerId)) {
      errors.push(`${url.pathname}: unresolved Service provider`);
    }
    if (!internal.includes('/demande-de-devis')) errors.push(`${url.pathname}: missing crawlable quote link`);
    const serviceAreas = html.match(/<nav\b[^>]*aria-label="Secteurs pour cette prestation"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? '';
    const areaLinks = [...serviceAreas.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]);
    for (const target of ['/secteurs-desservis', '/demenagement-hauts-de-seine', '/demenagement-seine-saint-denis', '/demenagement-val-de-marne']) {
      if (!areaLinks.includes(target)) errors.push(`${url.pathname}: missing contextual area link to ${target}`);
    }
  }
  if (links.length <= 4) errors.push(`${url.pathname}: incomplete HTML`);
  pages.push({ path: url.pathname, links: internal, bytes: Buffer.byteLength(html) });
}
const reachable = new Set(['/']);
for (let changed = true; changed;) {
  changed = false;
  for (const page of pages) if (reachable.has(page.path)) for (const target of page.links) if (!reachable.has(target)) { reachable.add(target); changed = true; }
}
for (const page of pages) if (!reachable.has(page.path)) errors.push(`Orphan page: ${page.path}`);
await fs.mkdir('build', { recursive: true });
await fs.writeFile('build/seo-validation.json', JSON.stringify({ pages, errors }, null, 2));
if (errors.length) throw new Error(`Prerender SEO audit failed:\n${errors.join('\n')}`);
console.log(`SEO verified: ${pages.length} complete HTML pages, unique metadata, valid internal links, no orphan pages.`);
