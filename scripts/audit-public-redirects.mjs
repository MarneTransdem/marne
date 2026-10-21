import fs from 'node:fs/promises';
import { SITE_URL, CANONICAL_ALIASES, getPublicCanonicalRoutes } from '../src/lib/seo-routes.ts';

// Read-only HEAD requests: check the HTTP behaviour, not just the alias table.
const query = '?utm_source=seo-audit&utm_medium=validation';
const canonicalPaths = new Set(getPublicCanonicalRoutes());
const cases = Object.entries(CANONICAL_ALIASES).flatMap(([from, to]) =>
  [from, `${from}/`, `${from}.html`].map(path => ({ source: `${SITE_URL}${path}`, target: to, maxHops: 1 })),
);
for (const [source, target] of [
  ['/index.html', '/'], ['/index.html/', '/'],
  ['/demande-de-devis/', '/demande-de-devis'],
  ['/demande-de-devis///', '/demande-de-devis'],
  ['/demande-de-devis.html', '/demande-de-devis'],
  ['/blog/combien-coute-demenagement-paris.html', '/blog/combien-coute-demenagement-paris'],
]) cases.push({ source: `${SITE_URL}${source}`, target, maxHops: 1 });
// App Hosting first canonicalizes the apex host; an old path can then need its alias hop.
cases.push({ source: 'https://devisdemenagement-paris.com/', target: '/', maxHops: 1 });
cases.push({ source: 'https://devisdemenagement-paris.com/devis', target: '/demande-de-devis', maxHops: 2 });

const allowedOrigins = new Set([SITE_URL, 'https://devisdemenagement-paris.com']);
const results = [];
let cursor = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (cursor < cases.length) {
    const test = cases[cursor++];
    const hops = [];
    try {
      if (!canonicalPaths.has(test.target)) throw new Error('Target is not a registered canonical page');
      const expected = new URL(`${test.target}${query}`, SITE_URL).href;
      let current = `${test.source}${query}`;
      const seen = new Set();
      for (;;) {
        if (seen.has(current)) throw new Error('Redirect loop');
        seen.add(current);
        const response = await fetch(current, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(20000) });
        if (response.status === 200) {
          if (current !== expected) throw new Error('Final URL differs from the expected canonical URL');
          if (!hops.length) throw new Error('Expected a redirect but received 200');
          results.push({ source: test.source, target: test.target, hops, ok: true });
          break;
        }
        if (![301, 308].includes(response.status)) throw new Error(`Expected permanent redirect, received HTTP ${response.status}`);
        if (hops.length >= test.maxHops) throw new Error(`More than ${test.maxHops} redirect hops`);
        const location = response.headers.get('location');
        if (!location) throw new Error('Missing Location header');
        const next = new URL(location, current);
        if (!allowedOrigins.has(next.origin)) throw new Error('Redirect leaves the expected site');
        if (next.search !== query || next.hash) throw new Error('Tracking parameters changed or unexpected fragment');
        hops.push({ status: response.status, location: next.href });
        current = next.href;
      }
    } catch (error) {
      results.push({ source: test.source, target: test.target, hops, ok: false, error: error.message });
    }
  }
}));
results.sort((a, b) => a.source.localeCompare(b.source));
const errors = results.filter(result => !result.ok);
const report = { checkedAt: new Date().toISOString(), cases: results.length, errors, results };
await fs.mkdir('build', { recursive: true });
await fs.writeFile('build/public-redirect-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ checkedAt: report.checkedAt, cases: report.cases, errors, twoHopCases: results.filter(result => result.ok && result.hops.length === 2).map(result => result.source) }, null, 2));
if (errors.length) process.exitCode = 1;
