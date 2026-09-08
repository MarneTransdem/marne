import fs from 'node:fs/promises';
import sharp from 'sharp';
const raw = await fs.readFile('src/constants/sectorsData.ts', 'utf8');
const dataStart = raw.indexOf('[', raw.indexOf('= ', raw.indexOf('export const sectorsData:')));
const data = JSON.parse(raw.slice(dataStart).trim().replace(/;$/, ''));
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
