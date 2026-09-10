import fs from 'node:fs/promises';
import sharp from 'sharp';
const raw = await fs.readFile('src/constants/sectorsData.ts', 'utf8');
const dataStart = raw.indexOf('[', raw.indexOf('= ', raw.indexOf('export const sectorsData:')));
const data = JSON.parse(raw.slice(dataStart).trim().replace(/;$/, ''));
// Keep the editorial source together, but ship only the requested sector to browsers.
const sectorDirectory = 'src/generated/sectors';
await fs.mkdir(sectorDirectory, { recursive: true });
const sectorFiles = new Set();
for (const sector of data) {
  if (!/^[a-z0-9-]+$/.test(sector.slug) || sectorFiles.has(`${sector.slug}.json`)) {
    throw new Error(`Invalid or duplicate sector slug: ${sector.slug}`);
  }
  const filename = `${sector.slug}.json`;
  sectorFiles.add(filename);
  await fs.writeFile(`${sectorDirectory}/${filename}`, JSON.stringify(sector) + '\n');
}
// Remove obsolete generated entries so a deleted sector cannot remain reachable.
for (const filename of await fs.readdir(sectorDirectory)) {
  if (/^[a-z0-9-]+\.json$/.test(filename) && !sectorFiles.has(filename)) {
    await fs.unlink(`${sectorDirectory}/${filename}`);
  }
}
await fs.writeFile('src/constants/sectorMetadata.json', JSON.stringify(data.map(({slug,name,type,seoTitle,seoDescription,seoImage}) => ({slug,name,type,seoTitle,seoDescription,seoImage})), null, 2) + '\n');
const images = ['demenagement-paris.webp','demenagement-charenton-le-pont.webp','demenagement-longue-distance-camion.jpg','demenagement-longue-distance.webp','demenagement-appartement-93.jpg','equipe-demenageur-longue-distance.jpg','equipe-demenagement-93.jpg','transfert-bureaux-entreprise-paris.jpg'];
const manifest = {};
for (const name of images) {
  const input = 'public/images/' + name;
  const { width, height } = await sharp(input).metadata();
  const stem = name.replace(/\.[^.]+$/, '');
  const sizes = [...new Set([480, 800, 1200, Math.min(1600, width)].filter(w => w <= width))];
  for (const size of sizes) {
    for (const format of ['avif', 'webp']) {
      const target = `public/images/${stem}-${size}.${format}`;
      try { await fs.access(target); } catch { await sharp(input).resize({width:size,withoutEnlargement:true}).toFormat(format, { quality: format === 'avif' ? 48 : 76 }).toFile(target); }
    }
  }
  manifest['/images/' + name] = { width, height, avif: sizes.map(w=>`/images/${stem}-${w}.avif ${w}w`).join(', '), webp:sizes.map(w=>`/images/${stem}-${w}.webp ${w}w`).join(', ') };
}
await fs.writeFile('src/constants/responsiveImages.json',JSON.stringify(manifest,null,2)+'\n');
console.log('SEO metadata and responsive images prepared.');
