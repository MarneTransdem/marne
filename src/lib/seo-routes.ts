export const SITE_URL = 'https://devisdemenagement-paris.com';
export const SITE_NAME = 'Marne Transdem';
export const DEFAULT_OG_IMAGE = '/images/demenagement-paris-9.webp';
export const DEFAULT_OG_IMAGE_WIDTH = 1600;
export const DEFAULT_OG_IMAGE_HEIGHT = 899;
export const DEFAULT_OG_IMAGE_ALT = 'Marne Transdem - déménagement professionnel à Paris';

export type SeoRoute = {
  path: string;
  canonicalPath: string;
  title: string;
  description: string;
  h1: string;
  status?: number;
  robots?: string;
  image?: string;
  priority?: string;
  changefreq?: string;
  schema?: Record<string, unknown>[];
};

export const CANONICAL_ALIASES: Record<string, string> = {
  '/devis': '/demande-de-devis',
  '/particuliers': '/demenagement-particuliers-paris',
  '/entreprises': '/demenagement-entreprises-paris',
  '/garde-meuble': '/garde-meuble-paris',
  '/monte-meuble': '/location-monte-meuble-paris',
  '/emballage': '/emballage-protection-demenagement',
  '/formules': '/formules-demenagement',
  '/blog/2': '/blog/comment-estimer-volume-demenagement',
  '/blog/estimer-volume-demenagement': '/blog/comment-estimer-volume-demenagement',
  '/blog/demenagement-entreprise-paris': '/blog/demenagement-entreprise-paris-checklist',
};

const MAIN_ROUTES = [
  '/',
  '/services',
  '/demande-de-devis',
  '/secteurs-desservis',
  '/demenagement-particuliers-paris',
  '/demenagement-entreprises-paris',
  '/garde-meuble-paris',
  '/location-monte-meuble-paris',
  '/emballage-protection-demenagement',
  '/cartons-demenagement-paris',
  '/calculateur-volume',
  '/formules-demenagement',
  '/a-propos',
  '/contact',
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/blog',
  '/demenagement-longue-distance',
  '/demenagement-oeuvres-art',
  '/demenagement-etudiant',
  '/demenagement-militaire',
  '/demenagement-senior',
  '/demenagement-mutation-professionnelle',
  '/demenagement-petit-volume',
  '/demenagement-piano-objets-lourds',
  '/transfert-bureaux-paris',
  '/transfert-informatique-paris',
  '/transfert-industriel-paris',
  '/transfert-laboratoire-paris',
  '/gestion-archives-paris',
];

const LOCAL_ROUTES = [
  '/demenagement-paris-20',
  '/demenagement-paris-19',
  '/demenagement-paris-18',
  '/demenagement-paris-17',
  '/demenagement-paris-16',
  '/demenagement-paris-15',
  '/demenagement-paris-14',
  '/demenagement-paris-13',
  '/demenagement-paris-12',
  '/demenagement-paris-11',
  '/demenagement-paris-10',
  '/demenagement-paris-9',
  '/demenagement-montreuil',
  '/demenagement-romainville',
  '/demenagement-noisy-le-sec',
  '/demenagement-aulnay-sous-bois',
  '/demenagement-bobigny',
  '/demenagement-drancy',
  '/demenagement-saint-ouen',
  '/demenagement-argenteuil',
  '/demenagement-cergy',
  '/demenagement-pontoise',
  '/demenagement-saint-gratien',
  '/demenagement-enghien-les-bains',
  '/demenagement-montmorency',
  '/demenagement-franconville',
  '/demenagement-saint-denis',
  '/demenagement-bondy',
  '/demenagement-les-lilas',
  '/demenagement-pantin',
  '/demenagement-vincennes',
  '/demenagement-saint-mande',
  '/demenagement-bagnolet',
  '/demenagement-boulogne-billancourt',
  '/demenagement-neuilly-sur-seine',
  '/demenagement-levallois-perret',
  '/demenagement-clichy',
  '/demenagement-courbevoie',
  '/demenagement-puteaux',
  '/demenagement-nanterre',
  '/demenagement-suresnes',
  '/demenagement-rueil-malmaison',
  '/demenagement-saint-cloud',
  '/demenagement-meudon',
  '/demenagement-issy-les-moulineaux',
  '/demenagement-clamart',
  '/demenagement-sevres',
  '/demenagement-vanves',
  '/demenagement-chatillon',
  '/demenagement-malakoff',
  '/demenagement-montrouge',
  '/demenagement-bagneux',
  '/demenagement-fontenay-aux-roses',
  '/demenagement-sceaux',
  '/demenagement-bourg-la-reine',
  '/demenagement-antony',
  '/demenagement-chatenay-malabry',
  '/demenagement-le-plessis-robinson',
  '/demenagement-velizy-villacoublay',
  '/demenagement-viroflay',
  '/demenagement-chaville',
  '/demenagement-ville-d-avray',
  '/demenagement-versailles',
  '/demenagement-le-chesnay-rocquencourt',
  '/demenagement-la-celle-saint-cloud',
  '/demenagement-vaucresson',
  '/demenagement-garches',
  '/demenagement-marnes-la-coquette',
  '/demenagement-bougival',
  '/demenagement-louveciennes',
  '/demenagement-croissy-sur-seine',
  '/demenagement-chatou',
  '/demenagement-le-vesinet',
  '/demenagement-le-pecq',
  '/demenagement-marly-le-roi',
  '/demenagement-saint-germain-en-laye',
  '/demenagement-poissy',
  '/demenagement-sartrouville',
  '/demenagement-rambouillet',
  '/demenagement-mantes-la-jolie',
  '/demenagement-maisons-laffitte',
  '/demenagement-houilles',
  '/demenagement-plaisir',
  '/demenagement-guyancourt',
  '/demenagement-conflans-sainte-honorine',
  '/demenagement-ile-de-france',
  '/demenagement-hauts-de-seine',
  '/demenagement-seine-saint-denis',
  '/demenagement-val-de-marne',
  '/demenagement-yvelines',
  '/demenagement-essonne',
  '/demenagement-val-d-oise',
  '/demenagement-seine-et-marne',
  '/demenagement-charenton-le-pont',
  '/demenagement-saint-maur-des-fosses',
  '/demenagement-creteil',
  '/demenagement-maisons-alfort',
  '/demenagement-ivry-sur-seine',
  '/demenagement-saint-maurice',
  '/demenagement-fontenay-sous-bois',
  '/demenagement-villejuif',
  '/demenagement-vitry-sur-seine',
  '/demenagement-alfortville',
  '/demenagement-le-kremlin-bicetre',
  '/demenagement-joinville-le-pont',
  '/demenagement-champigny-sur-marne',
  '/demenagement-le-perreux-sur-marne',
  '/demenagement-nogent-sur-marne',
  '/demenagement-paris-lyon',
  '/demenagement-paris-marseille',
  '/demenagement-paris-bordeaux',
  '/demenagement-paris-toulouse',
  '/demenagement-paris-nantes',
  '/demenagement-paris-lille',
  '/demenagement-paris-strasbourg',
  '/demenagement-paris-montpellier',
  '/demenagement-paris-rennes',
];

export const BLOG_POST_ROUTES: Array<Omit<SeoRoute, 'canonicalPath' | 'status'>> = [
  {
    path: '/blog/demenagement-monte-meuble-paris',
    title: 'Déménagement avec monte-meuble à Paris : quand l’utiliser ? | Marne Transdem',
    h1: 'Déménagement avec monte-meuble à Paris : quand est-ce indispensable ?',
    description:
      'Meuble qui ne passe pas, étage élevé, escalier étroit, ascenseur trop petit : découvrez quand utiliser un monte-meuble pour un déménagement à Paris, quelles autorisations prévoir et comment éviter les mauvaises surprises.',
  },
  {
    path: '/blog/demenagement-entreprise-paris-checklist',
    title: 'Déménagement d’entreprise à Paris : checklist bureaux & transfert | Marne Transdem',
    h1: 'Déménagement d’entreprise à Paris : checklist pour transférer vos bureaux',
    description:
      'Préparez votre déménagement d’entreprise à Paris sans interruption d’activité : planning, mobilier, informatique, archives, accès, stationnement, équipes et devis professionnel.',
  },
  {
    path: '/blog/combien-coute-demenagement-paris',
    title: 'Combien coûte un déménagement à Paris ? Prix, critères et devis | Marne Transdem',
    h1: 'Combien coûte un déménagement à Paris ?',
    description:
      'Découvrez le prix d’un déménagement à Paris selon le volume, l’étage, l’ascenseur, le monte-meuble, la distance, la formule choisie et les contraintes d’accès.',
  },
  {
    path: '/blog/comment-estimer-volume-demenagement',
    title: 'Comment estimer le volume de son déménagement ? | Guide Marne Transdem',
    h1: 'Comment estimer le volume de son déménagement ?',
    description:
      'Découvrez comment calculer le volume de votre déménagement en m³ : méthode pièce par pièce, estimation selon la surface, meubles volumineux, cartons et conseils de déménageur professionnel.',
  },
  {
    path: '/blog/formalites-administratives-demenagement',
    title: 'Formalités déménagement : organismes à prévenir et démarches indispensables | Marne Transdem',
    h1: 'Les formalités administratives indispensables avant un déménagement',
    description:
      'Électricité, gaz, internet, assurance, impôts, CAF, CPAM, banque, carte grise et courrier : découvrez toutes les formalités administratives à faire avant et après un déménagement.',
  },
  {
    path: '/blog/10-conseils-demenagement-sans-stress-paris',
    title: 'Déménagement sans stress à Paris : 10 conseils d’experts | Marne Transdem',
    h1: '10 conseils pour un déménagement sans stress à Paris',
    description:
      'Préparez votre déménagement à Paris sans stress : autorisation de stationnement, monte-meuble, cartons, volume, accès, formule adaptée et conseils Marne Transdem.',
  },
];

const EXPLICIT_ROUTES: Record<string, Omit<SeoRoute, 'path' | 'canonicalPath'>> = {
  '/': {
    title: 'Déménageur Paris | Île-de-France | Devis Gratuit | Marne Transdem',
    h1: 'Entreprise de déménagement à Paris',
    description:
      'Marne Transdem : expert du déménagement à Paris 20e et en Île-de-France. Particuliers & Entreprises. Devis gratuit sous 24h.',
    priority: '1.0',
    changefreq: 'weekly',
  },
  '/services': {
    title: 'Services de déménagement à Paris | Marne Transdem',
    h1: 'Services de déménagement',
    description:
      'Découvrez les services Marne Transdem : déménagement particuliers, entreprises, garde-meuble, monte-meuble, emballage, cartons et transferts spécialisés à Paris.',
    priority: '0.8',
  },
  '/demande-de-devis': {
    title: 'Demande de Devis Déménagement Paris | Estimation gratuite | Marne Transdem',
    h1: 'Demande de devis déménagement à Paris',
    description:
      'Obtenez votre devis de déménagement gratuit à Paris et en Île-de-France. Formulaire rapide, réponse sous 24h et étude personnalisée de votre projet.',
    priority: '0.9',
    changefreq: 'weekly',
  },
  '/secteurs-desservis': {
    title: 'Secteurs desservis en Île-de-France | Marne Transdem',
    h1: 'Secteurs desservis',
    description:
      'Retrouvez les zones d’intervention Marne Transdem à Paris, dans les Hauts-de-Seine, le Val-de-Marne, les Yvelines, l’Essonne et toute l’Île-de-France.',
    priority: '0.8',
  },
  '/blog': {
    title: 'Blog déménagement Paris : prix, monte-meuble, conseils et guides | Marne Transdem',
    h1: 'Réussir son déménagement',
    description:
      'Guides Marne Transdem pour préparer votre déménagement à Paris : prix, devis, volume, formalités, stationnement, monte-meuble, transfert de bureaux et checklist pratique.',
    priority: '0.8',
    changefreq: 'weekly',
  },
  '/contact': {
    title: 'Contact déménageur Paris | Marne Transdem',
    h1: 'Contact Marne Transdem',
    description:
      'Contactez Marne Transdem pour votre déménagement à Paris et en Île-de-France. Téléphone, email, adresse et formulaire de contact.',
    priority: '0.6',
  },
  '/a-propos': {
    title: 'À propos de Marne Transdem | Déménageur Paris',
    h1: 'À propos de Marne Transdem',
    description:
      'Découvrez Marne Transdem, entreprise de déménagement basée à Paris 20e, spécialisée dans les projets particuliers et professionnels en Île-de-France.',
    priority: '0.5',
  },
  '/mentions-legales': {
    title: 'Mentions légales | Marne Transdem',
    h1: 'Mentions légales',
    description: 'Consultez les mentions légales du site Marne Transdem.',
    priority: '0.3',
  },
  '/politique-de-confidentialite': {
    title: 'Politique de confidentialité | Marne Transdem',
    h1: 'Politique de confidentialité',
    description: 'Consultez la politique de confidentialité du site Marne Transdem.',
    priority: '0.3',
  },
  '/demenagement-charenton-le-pont': {
    title: 'Déménageur Charenton-le-Pont (94220) | Devis gratuit | Marne Transdem',
    h1: 'Déménagement à Charenton-le-Pont',
    description:
      'Préparez votre déménagement à Charenton-le-Pont avec Marne Transdem : particuliers, entreprises, garde-meuble, monte-meuble et devis gratuit pour le 94220.',
    image: '/images/demenagement-charenton-le-pont.webp',
    priority: '0.7',
  },
};

const SERVICE_TITLES: Record<string, string> = {
  '/demenagement-particuliers-paris': 'Déménagement particuliers Paris | Marne Transdem',
  '/demenagement-entreprises-paris': 'Déménagement entreprises Paris | Marne Transdem',
  '/garde-meuble-paris': 'Garde-meuble Paris | Stockage sécurisé | Marne Transdem',
  '/location-monte-meuble-paris': 'Location monte-meuble Paris | Marne Transdem',
  '/emballage-protection-demenagement': 'Emballage et protection déménagement | Marne Transdem',
  '/cartons-demenagement-paris': 'Cartons déménagement Paris | Marne Transdem',
  '/calculateur-volume': 'Calculateur de volume déménagement | Marne Transdem',
  '/formules-demenagement': 'Formules de déménagement | Marne Transdem',
  '/demenagement-longue-distance': 'Déménagement longue distance depuis Paris | Marne Transdem',
  '/demenagement-oeuvres-art': 'Déménagement œuvres d’art | Marne Transdem',
  '/demenagement-etudiant': 'Déménagement étudiant Paris | Marne Transdem',
  '/demenagement-militaire': 'Déménagement militaire et gendarmerie | Marne Transdem',
  '/demenagement-senior': 'Déménagement senior Paris | Marne Transdem',
  '/demenagement-mutation-professionnelle': 'Déménagement mutation professionnelle | Marne Transdem',
  '/demenagement-petit-volume': 'Déménagement petit volume Paris | Marne Transdem',
  '/demenagement-piano-objets-lourds': 'Déménagement piano et objets lourds | Marne Transdem',
  '/transfert-bureaux-paris': 'Transfert de bureaux Paris | Marne Transdem',
  '/transfert-informatique-paris': 'Transfert informatique Paris | Marne Transdem',
  '/transfert-industriel-paris': 'Transfert industriel Paris | Marne Transdem',
  '/transfert-laboratoire-paris': 'Transfert de laboratoire Paris | Marne Transdem',
  '/gestion-archives-paris': 'Gestion d’archives Paris | Marne Transdem',
};

function normalizePath(pathname: string): string {
  const clean = pathname.split('?')[0].split('#')[0] || '/';
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1);
  return clean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function labelFromDemenagementPath(pathname: string): string {
  const slug = pathname.replace(/^\/demenagement-/, '');
  const parisMatch = slug.match(/^paris-(\d+)$/);
  if (parisMatch) return `Paris ${parisMatch[1]}e`;

  const special: Record<string, string> = {
    'ile-de-france': 'Île-de-France',
    'hauts-de-seine': 'Hauts-de-Seine',
    'seine-saint-denis': 'Seine-Saint-Denis',
    'val-de-marne': 'Val-de-Marne',
    yvelines: 'Yvelines',
    essonne: 'Essonne',
    'val-d-oise': "Val-d’Oise",
    'seine-et-marne': 'Seine-et-Marne',
    'oeuvres-art': 'œuvres d’art',
    etudiant: 'étudiant',
    militaire: 'militaire',
    senior: 'senior',
    'mutation-professionnelle': 'mutation professionnelle',
    'petit-volume': 'petit volume',
    'piano-objets-lourds': 'piano et objets lourds',
  };
  if (special[slug]) return special[slug];

  return slug
    .split('-')
    .map((part) => {
      if (part.length <= 2) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ')
    .replace(/\bD Avray\b/, "d’Avray")
    .replace(/\bSous Bois\b/g, 'sous-Bois')
    .replace(/\bSur\b/g, 'sur')
    .replace(/\bLe\b/g, 'Le')
    .replace(/\bLa\b/g, 'La');
}

function defaultSeoForPath(pathname: string): Omit<SeoRoute, 'path' | 'canonicalPath'> {
  if (SERVICE_TITLES[pathname]) {
    const h1 = SERVICE_TITLES[pathname].replace(' | Marne Transdem', '');
    return {
      title: SERVICE_TITLES[pathname],
      h1,
      description: `${SITE_NAME} accompagne votre projet : ${h1.toLowerCase()} à Paris et en Île-de-France. Demandez une estimation personnalisée et gratuite.`,
      priority: '0.8',
      changefreq: 'monthly',
    };
  }

  if (pathname.startsWith('/transfert-') || pathname === '/gestion-archives-paris') {
    const h1 = labelFromDemenagementPath(pathname.replace(/^\/transfert-/, '/demenagement-'));
    return {
      title: `${h1} | ${SITE_NAME}`,
      h1,
      description: `${SITE_NAME} organise vos transferts professionnels à Paris et en Île-de-France avec une logistique soignée, un planning maîtrisé et un devis personnalisé.`,
      priority: '0.7',
      changefreq: 'monthly',
    };
  }

  if (pathname.startsWith('/demenagement-')) {
    const label = labelFromDemenagementPath(pathname);
    return {
      title: `Déménagement ${label} | Devis gratuit | ${SITE_NAME}`,
      h1: `Déménagement ${label}`,
      description: `Préparez votre déménagement à ${label} avec ${SITE_NAME}. Particuliers, entreprises, formules adaptées et devis gratuit.`,
      priority: '0.7',
      changefreq: 'monthly',
    };
  }

  return {
    title: `${SITE_NAME} | Déménageur Île-de-France & Province`,
    h1: SITE_NAME,
    description:
      'Marne Transdem accompagne les particuliers et les entreprises pour leurs déménagements à Paris, en Île-de-France et partout en France.',
    priority: '0.5',
    changefreq: 'monthly',
  };
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    logo: `${SITE_URL}/logo.png`,
    telephone: '+33144935486',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '43 rue des Maraîchers',
      addressLocality: 'Paris',
      postalCode: '75020',
      addressCountry: 'FR',
    },
    areaServed: 'Île-de-France',
  };
}

export function getCanonicalPath(pathname: string): string {
  const normalized = normalizePath(pathname);
  return CANONICAL_ALIASES[normalized] || normalized;
}

export function getPublicCanonicalRoutes(): string[] {
  const routes = [...MAIN_ROUTES, ...LOCAL_ROUTES, ...BLOG_POST_ROUTES.map((post) => post.path)];
  return [...new Set(routes.map(normalizePath))];
}

export function getSeoRoute(pathname: string): SeoRoute {
  const normalized = normalizePath(pathname);
  const canonicalPath = getCanonicalPath(normalized);
  const blogPost = BLOG_POST_ROUTES.find((post) => post.path === canonicalPath);
  const isKnown = getPublicCanonicalRoutes().includes(canonicalPath);

  if (normalized === '/admin' || normalized === '/login' || normalized.startsWith('/admin/')) {
    return {
      path: normalized,
      canonicalPath: normalized,
      title: `${SITE_NAME} | Espace privé`,
      h1: 'Espace privé',
      description: 'Espace privé Marne Transdem.',
      robots: 'noindex, nofollow',
      status: 200,
      priority: '0.0',
      changefreq: 'yearly',
    };
  }

  if (!isKnown) {
    return {
      path: normalized,
      canonicalPath: normalized,
      title: `Page non trouvée | ${SITE_NAME}`,
      h1: 'Page introuvable',
      description: "La page demandée n'existe pas ou a été déplacée.",
      robots: 'noindex, nofollow',
      status: 404,
      priority: '0.0',
      changefreq: 'yearly',
    };
  }

  const route = blogPost || EXPLICIT_ROUTES[canonicalPath] || defaultSeoForPath(canonicalPath);
  return {
    ...route,
    path: normalized,
    canonicalPath,
    status: 200,
    robots: route.robots || 'index, follow',
    image: route.image || DEFAULT_OG_IMAGE,
    schema: route.schema || [organizationSchema()],
  };
}

export function absoluteUrl(pathname: string): string {
  return pathname === '/' ? SITE_URL : `${SITE_URL}${pathname}`;
}

export function getSitemapXml(date = new Date().toISOString().slice(0, 10)): string {
  const urls = getPublicCanonicalRoutes()
    .map((path) => getSeoRoute(path))
    .filter((route) => route.robots !== 'noindex, nofollow');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((route) => {
      const loc = route.canonicalPath === '/' ? SITE_URL : `${SITE_URL}${route.canonicalPath}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${date}</lastmod>`,
        `    <changefreq>${route.changefreq || 'monthly'}</changefreq>`,
        `    <priority>${route.priority || '0.6'}</priority>`,
        '  </url>',
      ].join('\n');
    }),
    '</urlset>',
  ].join('\n');
}

export function getRobotsTxt(): string {
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /login',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ].join('\n');
}

export function renderSeoHead(route: SeoRoute): string {
  const canonicalUrl = route.status === 404 ? `${SITE_URL}${route.path}` : absoluteUrl(route.canonicalPath);
  const defaultImageUrl = `${SITE_URL}${DEFAULT_OG_IMAGE}`;
  const imageUrl = route.image?.startsWith('http') ? route.image : `${SITE_URL}${route.image || DEFAULT_OG_IMAGE}`;
  const usesDefaultImage = imageUrl === defaultImageUrl;
  const schema = route.schema || [];

  return [
    `<meta data-rh="true" name="description" content="${escapeHtml(route.description)}" />`,
    `<link data-rh="true" rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta data-rh="true" name="robots" content="${escapeHtml(route.robots || 'index, follow')}" />`,
    '<meta data-rh="true" name="geo.region" content="FR-75" />',
    '<meta data-rh="true" name="geo.placename" content="Paris" />',
    '<meta data-rh="true" property="og:locale" content="fr_FR" />',
    '<meta data-rh="true" property="og:type" content="website" />',
    `<meta data-rh="true" property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta data-rh="true" property="og:image:alt" content="${escapeHtml(DEFAULT_OG_IMAGE_ALT)}" />`,
    ...(usesDefaultImage
      ? [
          `<meta data-rh="true" property="og:image:width" content="${DEFAULT_OG_IMAGE_WIDTH}" />`,
          `<meta data-rh="true" property="og:image:height" content="${DEFAULT_OG_IMAGE_HEIGHT}" />`,
        ]
      : []),
    `<meta data-rh="true" property="og:site_name" content="${SITE_NAME}" />`,
    '<meta data-rh="true" name="twitter:card" content="summary_large_image" />',
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta data-rh="true" name="twitter:image:alt" content="${escapeHtml(DEFAULT_OG_IMAGE_ALT)}" />`,
    ...schema.map((item) => `<script data-rh="true" type="application/ld+json">${JSON.stringify(item)}</script>`),
  ].join('\n    ');
}

export function renderPrerenderBody(route: SeoRoute): string {
  const quickLinks = [
    ['Demander un devis', '/demande-de-devis'],
    ['Services', '/services'],
    ['Secteurs desservis', '/secteurs-desservis'],
    ['Contact', '/contact'],
  ];

  return `
    <main data-prerender="true" style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:960px;margin:0 auto;padding:48px 20px;color:#061A33;background:#fff;">
      <img src="/images/logo-clair.webp" alt="${SITE_NAME}" width="220" height="73" style="height:auto;margin-bottom:32px;" />
      <p style="font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#F5A400;margin:0 0 12px;">Déménagement Paris & Île-de-France</p>
      <h1 style="font-size:42px;line-height:1.08;margin:0 0 20px;">${escapeHtml(route.h1)}</h1>
      <p style="font-size:18px;line-height:1.6;margin:0 0 28px;color:#475569;">${escapeHtml(route.description)}</p>
      <nav aria-label="Liens principaux" style="display:flex;flex-wrap:wrap;gap:12px;">
        ${quickLinks
          .map(([label, href]) => `<a href="${href}" style="color:#061A33;font-weight:700;">${label}</a>`)
          .join('')}
      </nav>
    </main>
  `;
}
