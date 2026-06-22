import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pagesDir = path.join(root, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.startsWith('Local') || f.startsWith('LongueDistance') || f === 'CharentonLePont.tsx');

console.log(`Found ${files.length} sector files to parse.`);

const getAttrValue = (content: string, attrName: string) => {
  const doubleQuoteMatch = content.match(new RegExp(`${attrName}\\s*=\\s*"([^"]*)"`));
  if (doubleQuoteMatch) return doubleQuoteMatch[1];
  
  const singleQuoteMatch = content.match(new RegExp(`${attrName}\\s*=\\s*'([^']*)'`));
  if (singleQuoteMatch) return singleQuoteMatch[1];

  const braceMatch = content.match(new RegExp(`${attrName}\\s*=\\s*{\\s*['"\`]([\\s\\S]*?)['"\`](?:\\s*})?`));
  if (braceMatch) return braceMatch[1];

  return null;
};

const parseFile = (filename: string) => {
  const filePath = path.join(pagesDir, filename);
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Extract path/slug
  const pathMatch = content.match(/const path\s*=\s*['"]([^'"]+)['"]/);
  if (!pathMatch) {
    console.log(`[Warning] No path match in ${filename}`);
    return null;
  }
  const fullPath = pathMatch[1];
  const slug = fullPath.replace('/demenagement-', '');

  // 2. Extract SEO details
  const seoTitle = getAttrValue(content, 'title') || '';
  const seoDescription = getAttrValue(content, 'description') || '';
  const seoImage = getAttrValue(content, 'image');

  // 3. Extract FAQs
  let faqs: any[] = [];
  const faqMatch = content.match(/(?:const faqs|const faqData)\s*=\s*(\[[\s\S]*?\]);/);
  if (faqMatch) {
    try {
      const arrStr = faqMatch[1].replace(/CONTACT\.phone/g, '"01 44 93 54 86"');
      faqs = new Function(`return ${arrStr}`)();
    } catch (err) {
      console.log(`[Error] Parsing FAQs in ${filename}:`, err);
    }
  }

  // 4. Extract Nearby Sectors by finding all links to local sectors
  const nearbySectors: { n: string; l: string }[] = [];
  const linkMatches = [...content.matchAll(/<Link[^>]*to=["']\/demenagement-([^"']+)["'][^>]*>([\s\S]*?)<\/Link>/g)];
  
  const excludedSlugs = new Set([
    'particuliers-paris', 'entreprises-paris', 'longue-distance',
    'oeuvres-art', 'etudiant', 'militaire', 'senior',
    'mutation-professionnelle', 'petit-volume', 'piano-objets-lourds',
    slug
  ]);

  const seenSlugs = new Set<string>();

  for (const match of linkMatches) {
    const linkSlug = match[1];
    let nameText = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (nameText.startsWith('Déménagement ')) {
      nameText = nameText.replace('Déménagement ', '');
    }

    if (!excludedSlugs.has(linkSlug) && !seenSlugs.has(linkSlug)) {
      seenSlugs.add(linkSlug);
      nearbySectors.push({
        n: nameText || linkSlug,
        l: `/demenagement-${linkSlug}`
      });
    }
  }

  // Fallback: check if nearbySectors is still empty and we have a variable
  if (nearbySectors.length === 0) {
    const nearbyMatch = content.match(/(?:const nearbySectors|const nearbyDestinations)\s*=\s*(\[[\s\S]*?\]);/);
    if (nearbyMatch) {
      try {
        const parsedNearby = new Function(`return ${nearbyMatch[1]}`)();
        for (const item of parsedNearby) {
          if (item && item.l && !seenSlugs.has(item.l.replace('/demenagement-', ''))) {
            nearbySectors.push({
              n: item.n,
              l: item.l
            });
          }
        }
      } catch (err) {
        // ignore
      }
    }
  }

  // 5. Extract Intro Paragraphs
  const sectionMatches = [...content.matchAll(/<section[\s\S]*?<\/section>/g)];
  let introParagraphs: string[] = [];
  let heroSubtitle = '';

  if (sectionMatches.length > 0) {
    // Hero Subtitle
    const heroSection = sectionMatches[0][0];
    const heroSubtitleMatch = heroSection.match(/<p[^>]*>([\s\S]*?)</);
    if (heroSubtitleMatch) {
      heroSubtitle = heroSubtitleMatch[1].replace(/\s+/g, ' ').trim();
    }

    // Intro Section (usually the second section)
    if (sectionMatches.length > 1) {
      const introSection = sectionMatches[1][0];
      const pMatches = [...introSection.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
      
      introParagraphs = pMatches
        .map(m => m[1].replace(/\s+/g, ' ').trim())
        // Filter out short styling/classes paragraphs
        .filter(p => p.length > 60 && !p.includes('text-xs') && !p.includes('CONTACT.phone') && !p.includes('Marne Transdem accompagne'));
    }
  }

  const type = filename.startsWith('LongueDistance') ? 'longue-distance' : 'local';

  return {
    slug,
    name: filename.replace('Local', '').replace('LongueDistance', '').replace('.tsx', '').replace(/([A-Z0-9])/g, ' $1').trim(),
    type,
    seoTitle,
    seoDescription,
    seoImage,
    heroSubtitle,
    introParagraphs,
    faqs,
    nearbySectors
  };
};

const parsed = files.map(parseFile).filter(Boolean);

const tsContent = `export interface Sector {
  slug: string;
  name: string;
  type: 'local' | 'longue-distance';
  seoTitle: string;
  seoDescription: string;
  seoImage: string | null;
  heroSubtitle: string;
  introParagraphs: string[];
  faqs: { q: string; a: string }[];
  nearbySectors: { n: string; l: string }[];
}

export const sectorsData: Sector[] = ${JSON.stringify(parsed, null, 2)};
`;

const destFile = path.join(root, 'src', 'constants', 'sectorsData.ts');
const destDir = path.dirname(destFile);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.writeFileSync(destFile, tsContent, 'utf8');
console.log(`Successfully generated sectorsData.ts with ${parsed.length} sectors.`);
