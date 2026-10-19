import fs from 'node:fs/promises';
import { SITE_URL, getPublicCanonicalRoutes } from '../src/lib/seo-routes.ts';

// Read-only production audit, deliberately separate from the offline build.
// Four concurrent requests keep the check gentle on the public server.
const errors = [];
const pages = [];
async function read(url) {
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  return { status: response.status, headers: response.headers, html: await response.text() };
}
const sitemap = await read(`${SITE_URL}/sitemap.xml`);
if (sitemap.status !== 200) throw new Error(`Sitemap HTTP ${sitemap.status}`);
const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
const expected = new Set(getPublicCanonicalRoutes());
const paths = new Set(urls.map(url => url.pathname));
if (!urls.length) throw new Error('Empty sitemap');
if (paths.size !== urls.length) errors.push('Duplicate sitemap URLs');
for (const route of expected) if (!paths.has(route)) errors.push(`Missing deployed route: ${route}`);
for (const url of urls) {
  if (url.origin !== SITE_URL || url.search || url.hash) throw new Error(`Unexpected sitemap URL: ${url.href}`);
  if (!expected.has(url.pathname)) errors.push(`Unexpected deployed route: ${url.pathname}`);
}

let cursor = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    try {
      const { status, headers, html } = await read(url);
      const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map(m => m[1]);
      const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/g)].map(m => m[1]);
      const descriptions = [...html.matchAll(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/g)].map(m => m[1]);
      const robots = [...html.matchAll(/<meta\b[^>]*name="(?:robots|googlebot)"[^>]*content="([^"]*)"/g)].map(m => m[1]);
      if (status !== 200) errors.push(`${url.pathname}: HTTP ${status}`);
      if (!headers.get('content-type')?.includes('text/html')) errors.push(`${url.pathname}: not HTML`);
      if (canonical.length !== 1 || canonical[0] !== url.href) errors.push(`${url.pathname}: wrong absolute canonical`);
      if (titles.length !== 1 || !titles[0].trim()) errors.push(`${url.pathname}: missing/duplicate title`);
      if (descriptions.length !== 1 || !descriptions[0].trim()) errors.push(`${url.pathname}: missing/duplicate description`);
      if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${url.pathname}: expected one H1`);
      if (/\b(noindex|none)\b/i.test([...robots, headers.get('x-robots-tag') || ''].join(','))) errors.push(`${url.pathname}: indexing forbidden`);
      if (!html.includes('data-ssr="true"')) errors.push(`${url.pathname}: missing initial rendered content`);
      const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)]
        .map(m => new URL(m[1].replaceAll('&amp;', '&'), url))
        .filter(target => target.origin === SITE_URL)
        .map(target => ({ path: target.pathname, hash: decodeURIComponent(target.hash.slice(1)) }));
      const ids = [...html.matchAll(/\bid="([^"]*)"/g)].map(m => m[1]);
      pages.push({ path: url.pathname, status, title: titles[0], description: descriptions[0], links, ids });
    } catch (error) { errors.push(`${url.pathname}: ${error.message}`); }
  }
}));

const byPath = new Map(pages.map(page => [page.path, page]));
for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const page of pages) {
    if (seen.has(page[key])) errors.push(`${page.path}: duplicate ${key} with ${seen.get(page[key])}`);
    seen.set(page[key], page.path);
  }
}
for (const page of pages) for (const target of page.links) {
  if (target.path === '/sitemap.xml') continue;
  if (!paths.has(target.path)) errors.push(`${page.path}: link outside canonical pages: ${target.path}`);
  if (target.hash && byPath.has(target.path) && !byPath.get(target.path).ids.includes(target.hash)) {
    errors.push(`${page.path}: missing anchor ${target.path}#${target.hash}`);
  }
}
const reachable = new Set(['/']);
const queue = ['/'];
for (let i = 0; i < queue.length; i++) for (const link of byPath.get(queue[i])?.links || []) {
  if (!reachable.has(link.path)) { reachable.add(link.path); queue.push(link.path); }
}
for (const page of pages) if (!reachable.has(page.path)) errors.push(`Orphan page: ${page.path}`);

const report = {
  checkedAt: new Date().toISOString(), site: SITE_URL,
  sitemapPages: urls.length, checkedPages: pages.length,
  errors: [...new Set(errors)], pages: pages.sort((a, b) => a.path.localeCompare(b.path)),
};
await fs.mkdir('build', { recursive: true });
await fs.writeFile('build/public-seo-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ checkedAt: report.checkedAt, pages: pages.length, errors: report.errors }, null, 2));
if (report.errors.length) process.exitCode = 1;
