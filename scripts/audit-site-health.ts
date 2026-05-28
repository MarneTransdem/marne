import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  getPublicCanonicalRoutes,
  getRobotsTxt,
  getSeoRoute,
} from '../src/lib/seo-routes.ts';

type Check = {
  name: string;
  ok: boolean;
  detail: string;
};

const root = process.cwd();
const checks: Check[] = [];
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');

function addCheck(name: string, ok: boolean, detail: string) {
  checks.push({ name, ok, detail });
}

function walk(dir: string, matcher: RegExp): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(absolute, matcher));
    } else if (matcher.test(entry.name)) {
      files.push(absolute);
    }
  }

  return files;
}

function publicPathToFile(publicPath: string) {
  return path.join(publicDir, publicPath.replace(/^\//, ''));
}

function getVariantPath(file: string, format: 'avif' | 'webp') {
  return file.replace(/\.(jpe?g|png|webp)$/i, `.${format}`);
}

function collectImageRefs() {
  const refs = new Set<string>();
  for (const file of walk(srcDir, /\.(ts|tsx|css)$/)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const match of text.matchAll(/\/images\/[^"')\]\s}]+/g)) {
      refs.add(match[0]);
    }
  }
  return [...refs].filter((ref) => /\.(jpe?g|png|webp)$/i.test(ref));
}

function collectExternalStockImageRefs() {
  const refs = new Set<string>();
  for (const file of walk(srcDir, /\.(ts|tsx|css)$/)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const match of text.matchAll(/https:\/\/images\.unsplash\.com\/[^"')\]\s}]+/g)) {
      refs.add(`${path.relative(root, file)} -> ${match[0]}`);
    }
  }
  return [...refs];
}

function getTrackedFiles() {
  const output = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' });
  return output.split(/\r?\n/).filter(Boolean);
}

const canonicalRoutes = getPublicCanonicalRoutes();
const uniqueRoutes = new Set(canonicalRoutes);
addCheck(
  'canonical routes',
  canonicalRoutes.length === uniqueRoutes.size && canonicalRoutes.length > 0,
  `${uniqueRoutes.size} public canonical routes`,
);

const routesWithMetadataProblems = canonicalRoutes.filter((routePath) => {
  const route = getSeoRoute(routePath);
  return !route.title || !route.description || !route.h1 || route.status !== 200;
});
addCheck(
  'route metadata',
  routesWithMetadataProblems.length === 0,
  routesWithMetadataProblems.length === 0
    ? 'all public routes have title, description and h1'
    : `missing metadata: ${routesWithMetadataProblems.slice(0, 8).join(', ')}`,
);

const sitemapFile = path.join(publicDir, 'sitemap.xml');
const sitemapXml = fs.existsSync(sitemapFile) ? fs.readFileSync(sitemapFile, 'utf8') : '';
const sitemapLocs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const sitemapPaths = sitemapLocs.map((loc) => loc.replace(SITE_URL, '') || '/');
const missingFromSitemap = canonicalRoutes.filter((routePath) => !sitemapPaths.includes(routePath));
const unexpectedSitemapUrls = sitemapPaths.filter((routePath) => !uniqueRoutes.has(routePath));
addCheck(
  'sitemap coverage',
  missingFromSitemap.length === 0 && unexpectedSitemapUrls.length === 0,
  missingFromSitemap.length === 0 && unexpectedSitemapUrls.length === 0
    ? `${sitemapPaths.length} URLs match public routes`
    : `missing: ${missingFromSitemap.slice(0, 5).join(', ') || 'none'}; unexpected: ${unexpectedSitemapUrls.slice(0, 5).join(', ') || 'none'}`,
);

const robotsFile = path.join(publicDir, 'robots.txt');
const robotsTxt = fs.existsSync(robotsFile) ? fs.readFileSync(robotsFile, 'utf8').trim() : '';
addCheck(
  'robots.txt',
  robotsTxt === getRobotsTxt().trim(),
  robotsTxt === getRobotsTxt().trim() ? 'robots.txt matches server output' : 'robots.txt differs from server output',
);

const imageRefs = collectImageRefs();
const missingImages: string[] = [];
const missingAvif: string[] = [];
const missingWebp: string[] = [];
for (const ref of imageRefs) {
  const file = publicPathToFile(ref);
  if (!fs.existsSync(file)) {
    missingImages.push(ref);
    continue;
  }
  if (!fs.existsSync(getVariantPath(file, 'avif'))) missingAvif.push(ref);
  if (!fs.existsSync(getVariantPath(file, 'webp'))) missingWebp.push(ref);
}
addCheck(
  'image references',
  missingImages.length === 0,
  missingImages.length === 0 ? `${imageRefs.length} local image refs exist` : `missing: ${missingImages.slice(0, 8).join(', ')}`,
);
addCheck(
  'image variants',
  missingAvif.length === 0 && missingWebp.length === 0,
  missingAvif.length === 0 && missingWebp.length === 0
    ? 'all local image refs have AVIF and WebP coverage'
    : `missing AVIF: ${missingAvif.slice(0, 5).join(', ') || 'none'}; missing WebP: ${missingWebp.slice(0, 5).join(', ') || 'none'}`,
);

const externalStockImageRefs = collectExternalStockImageRefs();
addCheck(
  'external stock images',
  externalStockImageRefs.length === 0,
  externalStockImageRefs.length === 0
    ? 'no external Unsplash image URLs in src'
    : externalStockImageRefs.slice(0, 8).join(', '),
);

const ogImageFile = publicPathToFile(DEFAULT_OG_IMAGE);
addCheck(
  'default OG image',
  fs.existsSync(ogImageFile) && fs.existsSync(getVariantPath(ogImageFile, 'avif')),
  fs.existsSync(ogImageFile) ? `${DEFAULT_OG_IMAGE} exists with negotiated variants` : `${DEFAULT_OG_IMAGE} is missing`,
);

const trackedFiles = getTrackedFiles();
const trackedEnvFiles = trackedFiles.filter((file) => /^\.env($|\.)/.test(file) && file !== '.env.example');
addCheck(
  'tracked env files',
  trackedEnvFiles.length === 0,
  trackedEnvFiles.length === 0 ? 'no secret env files are tracked' : `tracked env files: ${trackedEnvFiles.join(', ')}`,
);

const placeholderFiles = trackedFiles.filter((file) => {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).size > 1024 * 1024) return false;
  const text = fs.readFileSync(absolute, 'utf8');
  return text.includes('YOUR_PROJECT_ID');
});
addCheck(
  'tracked placeholders',
  placeholderFiles.length === 0,
  placeholderFiles.length === 0 ? 'no YOUR_PROJECT_ID placeholder in tracked files' : placeholderFiles.join(', '),
);

console.log('\nSite health audit\n');
for (const check of checks) {
  console.log(`${check.ok ? 'OK ' : 'ERR'} ${check.name} - ${check.detail}`);
}

const failures = checks.filter((check) => !check.ok);
if (failures.length > 0) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}

console.log('\nAll checks passed.');
