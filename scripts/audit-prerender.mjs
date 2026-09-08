import fs from 'node:fs/promises';
import path from 'node:path';

const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x => new URL(x[1]));
const paths = new Set(urls.map(x => x.pathname));
const errors = [];
const pages = [];
for (const url of urls) {
  const html = await fs.readFile(path.join('dist', url.pathname === '/' ? 'index.html' : url.pathname.slice(1) + '.html'), 'utf8');
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)].map(x => x[1]);
  const titles = [...html.matchAll(/<title[^>]*>(.*?)<\/title>/g)];
  const h1 = [...html.matchAll(/<h1\b/g)].length;
  if (canonicals.length !== 1 || new URL(canonicals[0]).href !== url.href) errors.push(`${url.pathname}: canonical ${canonicals.join(', ')}`);
  if (titles.length !== 1 || h1 !== 1) errors.push(`${url.pathname}: ${titles.length} titles, ${h1} h1`);
  if (/name="robots" content="noindex/.test(html)) errors.push(`${url.pathname}: noindex`);
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(x => x[1].replaceAll('&amp;', '&'));
  const internal = [...new Set(links.filter(x => x.startsWith('/') && !x.startsWith('//')).map(x => new URL(x, url).pathname))];
  for (const target of internal) if (!paths.has(target)) errors.push(`${url.pathname} -> ${target}`);
  for (const script of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(script[1]); } catch { errors.push(`${url.pathname}: invalid JSON-LD`); }
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
