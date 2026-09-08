import assert from 'node:assert/strict';
import http from 'node:http';
import https from 'node:https';
const base = process.argv[2] || 'http://localhost:3121';
const cases = [
  ['/', 200], ['/services', 200], ['/services/', 301], ['/services.html', 301], ['/index.html', 301],
  ['/demenagement-92-hauts-de-seine', 301], ['/devis?source=test', 301],
  ['/page-seo-inexistante', 404], ['/blog/page-seo-inexistante', 404], ['/login', 200], ['/signature-devis/seo-test', 200],
];
for (const [url, status] of cases) {
  const response = await fetch(base + url, {redirect:'manual'});
  assert.equal(response.status, status, url);
  const html = await response.text();
  if (status === 404 || url === '/login' || url.startsWith('/signature-devis/')) assert.match(html,/noindex/,url);
  if (url === '/devis?source=test') assert.equal(response.headers.get('location'),'/demande-de-devis?source=test');
  if (url === '/') { assert.match(html,/data-ssr="true"/); assert.ok((html.match(/<a\b/g)||[]).length > 50); }
}
const host = await new Promise((resolve, reject) => {
  (base.startsWith('https:') ? https : http).get(base + '/services', {headers:{host:'devisdemenagement-paris.com'}}, response => {
    response.resume(); resolve({status:response.statusCode, location:response.headers.location});
  }).on('error', reject);
});
assert.equal(host.status,301); assert.equal(host.location,'https://www.devisdemenagement-paris.com/services');
console.log(`${cases.length + 1} HTTP checks passed: pages, redirects, query preservation, private noindex and real 404.`);
