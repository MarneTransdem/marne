import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

sharp.cache(false);

const root = process.cwd();
const srcDir = path.join(root, 'src');
const publicImagesDir = path.join(root, 'public', 'images');
const sourceExtensions = new Set(['.ts', '.tsx', '.css']);
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const maxWidth = 1600;
const shouldRecompressWebp = process.argv.includes('--recompress-webp');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(absolute));
    } else if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(absolute);
    }
  }

  return files;
}

function imageRefToPath(ref) {
  return path.join(root, 'public', ref.slice(1));
}

async function collectReferencedImages() {
  const files = await walk(srcDir);
  const refs = new Set();

  for (const file of files) {
    const text = await fs.readFile(file, 'utf8');
    for (const match of text.matchAll(/\/images\/[^"')\]\s}]+/g)) {
      refs.add(match[0]);
    }
  }

  return [...refs]
    .map((ref) => ({ ref, file: imageRefToPath(ref) }))
    .filter(({ ref, file }) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.has(ext) && ref.startsWith('/images/');
    });
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function getVariantPath(file, format) {
  return file.replace(/\.(jpe?g|png|webp)$/i, `.${format}`);
}

async function optimizeToFormat(source, target, format, metadata) {
  const pipeline = sharp(source)
    .rotate()
    .resize({
      width: metadata.width && metadata.width > maxWidth ? maxWidth : undefined,
      withoutEnlargement: true,
    });

  if (format === 'webp') {
    await pipeline.webp({ quality: 72, effort: 4 }).toFile(target);
  } else {
    await pipeline.avif({ quality: 48, effort: 4 }).toFile(target);
  }
}

async function maybeRecompressWebp(file, metadata) {
  const before = (await fs.stat(file)).size;
  if (before < 180 * 1024) return null;

  const temp = file.replace(/\.webp$/i, '.__optimized.webp');
  await optimizeToFormat(file, temp, 'webp', metadata);
  const after = (await fs.stat(temp)).size;

  if (after < before * 0.92) {
    await fs.rm(file, { force: true });
    await fs.rename(temp, file);
    return { file, before, after };
  }

  await fs.rm(temp, { force: true });
  return null;
}

const referenced = await collectReferencedImages();
const tasks = new Map();
const invalid = [];
const recompressed = [];

for (const item of referenced) {
  if (!await exists(item.file)) continue;

  const ext = path.extname(item.file).toLowerCase();
  let metadata;
  try {
    metadata = await sharp(item.file).metadata();
  } catch {
    invalid.push(item.ref);
    continue;
  }

  if (ext === '.webp' && shouldRecompressWebp) {
    const result = await maybeRecompressWebp(item.file, metadata);
    if (result) recompressed.push(result);
  } else {
    const webpTarget = getVariantPath(item.file, 'webp');
    if (!await exists(webpTarget)) {
      tasks.set(webpTarget, { source: item.file, target: webpTarget, format: 'webp', metadata });
    }
  }

  const avifTarget = getVariantPath(item.file, 'avif');
  if (!await exists(avifTarget)) {
    tasks.set(avifTarget, { source: item.file, target: avifTarget, format: 'avif', metadata });
  }
}

const generated = [];
for (const task of tasks.values()) {
  await optimizeToFormat(task.source, task.target, task.format, task.metadata);
  generated.push({
    source: path.relative(root, task.source),
    target: path.relative(root, task.target),
    bytes: (await fs.stat(task.target)).size,
  });
}

const availableVariants = { webp: 0, avif: 0 };
for (const item of referenced) {
  if (!await exists(item.file)) continue;

  if (await exists(getVariantPath(item.file, 'webp'))) {
    availableVariants.webp++;
  }

  if (await exists(getVariantPath(item.file, 'avif'))) {
    availableVariants.avif++;
  }
}

const report = {
  referenced: referenced.length,
  generated: generated.length,
  availableVariants,
  recompressed: recompressed.map((item) => ({
    file: path.relative(root, item.file),
    before: item.before,
    after: item.after,
    saved: item.before - item.after,
  })),
  invalid,
  generatedBytes: generated.reduce((sum, item) => sum + item.bytes, 0),
};

await fs.writeFile(
  path.join(publicImagesDir, 'optimization-report.json'),
  `${JSON.stringify(report, null, 2)}\n`,
  'utf8',
);

console.log(JSON.stringify(report, null, 2));
