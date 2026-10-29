import manifest from '../constants/responsiveImages.json';
import { ARTICLE_BODY_IMAGE_SIZES } from './responsive-image-sizes';

const escapeAttribute = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Describe the verified photo, rather than deriving its contents from a filename.
const articleImageAlts: Record<string, string> = {
  '/images/transfert-bureaux-entreprise-paris.jpg': 'Cartons de déménagement et éléments emballés devant un immeuble',
  '/images/camion-demenagement-stationnement-paris.jpg': 'Contenants rouges empilés sur un diable à l’intérieur d’un logement',
  '/images/cartons-demenagement-paris.jpg': 'Camion Marne Transdem et matériel de manutention dans une rue',
  '/images/cartons-preparation-demenagement.jpg': 'Éléments emballés dans du carton et maintenus par des sangles',
  '/images/equipe-demenageurs-marne-transdem.jpg': 'Biens emballés et sanglés dans une pièce avant leur transport',
  '/images/transfert-entreprise-78-yvelines.jpg': 'Meuble emballé dans une protection noire et maintenu par des sangles',
  '/images/equipe-demenagement-93.jpg': 'Meuble enveloppé de carton de protection et sanglé près d’une fenêtre',
  '/images/emballage-demenagement.webp': 'Mobilier et objets emballés dans une pièce pendant la préparation d’un déménagement',
  '/images/transfert-entreprise-essonne.jpg': 'Vue arrière d’un camion de déménagement dans une rue',
  '/images/camion-marne-transdem-93.jpg': 'Éléments emballés dans du carton, sanglés et posés contre un mur',
  '/images/monte-meuble-demenagement.webp': 'Monte-meuble installé devant la façade d’un immeuble',
};

export function getArticleImageAlt(src: string, fallback: string): string {
  return articleImageAlts[src] ?? fallback;
}

/** Render the five trusted editorial image placements inside static article HTML.
 * This is not an HTML parser or sanitizer; it accepts only explicit image data.
 */
export function articleImage(src: string, width: number, height: number, alt = getArticleImageAlt(src, '')): string {
  const item = manifest[src as keyof typeof manifest];
  const sizes = escapeAttribute(ARTICLE_BODY_IMAGE_SIZES);
  const img = `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}" width="${width}" height="${height}" loading="lazy" decoding="async" class="w-full object-cover aspect-video" referrerpolicy="no-referrer" />`;
  if (!item) return img;
  return `<picture><source type="image/avif" srcset="${escapeAttribute(item.avif)}" sizes="${sizes}" /><source type="image/webp" srcset="${escapeAttribute(item.webp)}" sizes="${sizes}" />${img}</picture>`;
}
