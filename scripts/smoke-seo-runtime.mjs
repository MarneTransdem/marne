// Use native Node resolution, as `node server.ts` does in App Hosting.
// Vite/tsx can resolve extensionless imports that fail in production.
import assert from 'node:assert/strict';
import { getSeoRoute, getSitemapXml, getPublicCanonicalRoutes, getCanonicalPath } from '../src/lib/seo-routes.ts';
import contentUpdatedAt from '../src/constants/contentUpdatedAt.json' with { type: 'json' };

const route = getSeoRoute('/demenagement-paris-montpellier');
assert.equal(route.status, 200);
assert.equal(route.h1, 'Déménagement Paris–Montpellier');
for (const legacyPath of ['/demenagement-luxe', '/demenagement-luxe/']) {
  assert.equal(getCanonicalPath(legacyPath), '/formules-demenagement');
  assert.equal(getSeoRoute(legacyPath).status, 200);
}
const sitemap = getSitemapXml();
const publicRoutes = new Set(getPublicCanonicalRoutes());
for (const [path, date] of Object.entries(contentUpdatedAt)) {
  assert.ok(publicRoutes.has(path), `Unknown content update route: ${path}`);
  assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(date).toISOString().slice(0, 10), date);
  const entry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find(m => m[1].includes(`<loc>https://www.devisdemenagement-paris.com${path === '/' ? '' : path}</loc>`));
  assert.ok(entry?.[1].includes(`<lastmod>${date}</lastmod>`));
}
assert.equal([...sitemap.matchAll(/<lastmod>/g)].length, Object.keys(contentUpdatedAt).length);
console.log('Native Node SEO imports passed.');
