import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';

const manifest = JSON.parse(await fs.readFile('dist/.vite/manifest.json', 'utf8'));
const metadata = JSON.parse(await fs.readFile('src/constants/sectorMetadata.json', 'utf8'));
const template = manifest['src/pages/SectorPage.tsx'];
assert.ok(template, 'Missing sector page build entry');
const templateBytes = await fs.readFile(`dist/${template.file}`);
assert.ok(templateBytes.length < 150_000, 'Sector template contains too much data; check eager imports');
const dynamicImports = new Set(template.dynamicImports);
let largest = 0;
for (const sector of metadata) {
  const key = `src/generated/sectors/${sector.slug}.json`;
  assert.ok(dynamicImports.has(key), `Sector is not loaded independently: ${sector.slug}`);
  const entry = manifest[key];
  assert.ok(entry, `Missing sector chunk: ${sector.slug}`);
  const bytes = await fs.readFile(`dist/${entry.file}`);
  largest = Math.max(largest, gzipSync(bytes).length);
  const html = await fs.readFile(`dist/demenagement-${sector.slug}.html`, 'utf8');
  assert.ok(html.includes('<h1'), `Missing prerendered sector content: ${sector.slug}`);
}
console.log(`Sector splitting verified: ${metadata.length} independent data chunks; template ${templateBytes.length} bytes (${gzipSync(templateBytes).length} gzip), largest data chunk ${largest} gzip bytes.`);
