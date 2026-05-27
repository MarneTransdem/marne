import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Box,
  Calculator,
  Calendar,
  Clock,
  Lightbulb,
  PhoneCall,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { MovingChecklist } from '../components/conseils/MovingChecklist';

type BlogCategory =
  | 'Tous'
  | 'Prix & devis'
  | 'Conseils'
  | 'Guide'
  | 'Réglementation'
  | 'Professionnels';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  category: Exclude<BlogCategory, 'Tous'>;
  featured?: boolean;
  featuredEyebrow?: string;
  featuredTitle?: string;
  primaryCtaLabel?: string;
};

const imageDimensions: Record<string, { width: number; height: number }> = {
  '/images/monte-meuble-paris-haussmannien.jpg': { width: 1152, height: 2048 },
  '/images/transfert-bureaux-entreprise-paris.jpg': { width: 1513, height: 2017 },
  '/images/camion-demenagement-stationnement-paris.jpg': { width: 1152, height: 2048 },
  '/images/cartons-demenagement-paris.jpg': { width: 1897, height: 1423 },
  '/images/cartons-preparation-demenagement.jpg': { width: 1152, height: 2048 },
  '/images/equipe-demenageurs-marne-transdem.jpg': { width: 1513, height: 2017 },
};

function getImageDimensions(image: string) {
  return imageDimensions[image] || { width: 1600, height: 1200 };
}

type ExpertTip = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const categories: BlogCategory[] = [
  'Tous',
  'Prix & devis',
  'Conseils',
  'Guide',
  'Réglementation',
  'Professionnels',
];

const posts: BlogPost[] = [
  {
    id: 'demenagement-monte-meuble-paris',
    slug: 'demenagement-monte-meuble-paris',
    title: 'Déménagement avec monte-meuble à Paris : quand est-ce indispensable ?',
    excerpt:
      'Étage élevé, ascenseur trop petit, escalier étroit, meuble volumineux ou copropriété exigeante : découvrez quand le monte-meuble devient la solution la plus sûre pour déménager à Paris.',
    date: '18 mai 2026',
    readTime: '15 min',
    image: '/images/monte-meuble-paris-haussmannien.jpg',
    imageAlt: 'Monte-meuble extérieur utilisé pour un déménagement dans un immeuble parisien',
    category: 'Guide',
    featured: true,
    featuredEyebrow: 'Nouveau guide pratique',
    featuredTitle: 'Accès difficiles, meuble qui ne passe pas, étage élevé',
    primaryCtaLabel: 'Lire le guide monte-meuble',
  },
  {
    id: 'demenagement-entreprise-paris-checklist',
    slug: 'demenagement-entreprise-paris-checklist',
    title: 'Déménagement d’entreprise à Paris : checklist pour transférer vos bureaux',
    excerpt:
      'Planification, mobilier, informatique, archives, accès, stationnement et continuité d’activité : la checklist complète pour réussir un transfert de bureaux à Paris.',
    date: '17 mai 2026',
    readTime: '18 min',
    image: '/images/transfert-bureaux-entreprise-paris.jpg',
    imageAlt: 'Réunion de planification pour un déménagement d’entreprise à Paris',
    category: 'Professionnels',
  },
  {
    id: 'combien-coute-demenagement-paris',
    slug: 'combien-coute-demenagement-paris',
    title: 'Combien coûte un déménagement à Paris ? Prix, critères et exemples de devis',
    excerpt:
      'Volume, étage, ascenseur, stationnement, monte-meuble, distance et formule choisie : découvrez les critères qui influencent le prix d’un déménagement à Paris.',
    date: '16 mai 2026',
    readTime: '13 min',
    image: '/images/camion-demenagement-stationnement-paris.jpg',
    imageAlt:
      'Appartement parisien avec cartons pour illustrer le prix d’un déménagement à Paris',
    category: 'Prix & devis',
  },
  {
    id: 'comment-estimer-volume-demenagement',
    slug: 'comment-estimer-volume-demenagement',
    title: 'Comment estimer le volume de son déménagement ?',
    excerpt:
      'Méthode pièce par pièce, estimation selon la surface, cartons, cave, meubles volumineux : apprenez à calculer votre volume en m³ avant de demander un devis.',
    date: '14 mai 2026',
    readTime: '10 min',
    image: '/images/cartons-demenagement-paris.jpg',
    imageAlt: 'Cartons et mobilier pour calculer le volume d’un déménagement en mètres cubes',
    category: 'Guide',
  },
  {
    id: 'formalites-administratives-demenagement',
    slug: 'formalites-administratives-demenagement',
    title: 'Les formalités administratives indispensables avant un déménagement',
    excerpt:
      'Énergie, courrier, assurance, impôts, CAF, CPAM, carte grise, internet : la checklist complète des organismes à prévenir avant de changer d’adresse.',
    date: '12 mai 2026',
    readTime: '14 min',
    image: '/images/cartons-preparation-demenagement.jpg',
    imageAlt: 'Documents administratifs et checklist de changement d’adresse avant un déménagement',
    category: 'Réglementation',
  },
  {
    id: '10-conseils-demenagement-sans-stress-paris',
    slug: '10-conseils-demenagement-sans-stress-paris',
    title: '10 conseils pour un déménagement sans stress à Paris',
    excerpt:
      'Stationnement, cartons, accès difficiles, monte-meuble et organisation : nos conseils d’experts pour réussir votre déménagement parisien en toute sérénité.',
    date: '10 mai 2026',
    readTime: '12 min',
    image: '/images/equipe-demenageurs-marne-transdem.jpg',
    imageAlt: 'Déménageurs professionnels préparant un déménagement sans stress à Paris',
    category: 'Conseils',
  },
];

const expertTips: ExpertTip[] = [
  {
    icon: Box,
    title: "Le carton 'première nuit'",
    description:
      'Préparez un carton séparé avec chargeurs, documents importants, médicaments, nécessaire de toilette, café, snacks et vêtements de rechange.',
  },
  {
    icon: Lightbulb,
    title: 'Étiquetage intelligent',
    description:
      'Indiquez la pièce de destination sur le dessus et sur deux côtés de chaque carton. Le déchargement devient plus rapide et plus précis.',
  },
  {
    icon: ShieldCheck,
    title: 'Déclaration de valeur',
    description:
      'Listez les biens importants avant le jour J. C’est une étape essentielle pour mieux protéger vos meubles, objets fragiles et équipements sensibles.',
  },
];

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('Tous');

  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const featuredImageDimensions = getImageDimensions(featuredPost.image);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Tous') return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const regularPosts = useMemo(() => {
    if (activeCategory === 'Tous' && featuredPost) {
      return filteredPosts.filter((post) => post.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [activeCategory, featuredPost, filteredPosts]);

  const phoneHref = `tel:${CONTACT.phone.split(' ').join('')}`;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Blog déménagement Paris : prix, monte-meuble, conseils et guides | Marne Transdem"
        description="Guides Marne Transdem pour préparer votre déménagement à Paris : prix, devis, volume, formalités, stationnement, monte-meuble, transfert de bureaux et checklist pratique."
        keywords="blog déménagement Paris, conseils déménagement Paris, prix déménagement Paris, devis déménagement Paris, monte-meuble Paris, déménagement entreprise Paris, checklist déménagement, formalités déménagement, volume déménagement"
        canonical="/blog"
      />

      <section className="relative overflow-hidden bg-brand-900 pt-48 pb-32 text-white">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 translate-x-1/4 -skew-x-12 bg-accent/5" />
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6 md:text-left">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md"
            >
              <BookOpen size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase italic tracking-[0.3em]">
                Centre de ressources
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10 text-5xl font-black italic leading-[1] tracking-tight md:text-8xl"
            >
              Réussir son <br />
              <span className="font-sans italic text-accent underline decoration-white/10 underline-offset-8">
                déménagement
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-xl font-light italic leading-relaxed text-slate-400 md:text-2xl"
            >
              Prix, devis, volume, formalités, cartons, stationnement, monte-meuble et transfert de bureaux : nos guides vous aident à préparer votre déménagement à Paris avec méthode.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-16 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <MovingChecklist />
          </div>
        </div>
      </section>

      {activeCategory === 'Tous' && featuredPost && (
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-sm font-black uppercase italic tracking-[0.3em] text-accent">
                {featuredPost.featuredEyebrow || 'Article à lire en priorité'}
              </h2>
              <p className="text-4xl font-black uppercase italic tracking-tight text-brand-900 md:text-5xl">
                {featuredPost.featuredTitle || 'Guide expert Marne Transdem'}
              </p>
            </div>

            <article className="group overflow-hidden rounded-[3rem] border border-slate-100 bg-slate-50 shadow-2xl md:rounded-[4rem]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <Link to={`/blog/${featuredPost.slug}`} className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    width={featuredImageDimensions.width}
                    height={featuredImageDimensions.height}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-brand-900/20 transition-colors group-hover:bg-brand-900/10" />
                  <div className="absolute top-8 left-8 rounded-full bg-accent px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-900 shadow-lg">
                    {featuredPost.category}
                  </div>
                </Link>

                <div className="flex flex-col justify-center p-8 md:p-14 lg:p-16">
                  <div className="mb-6 flex flex-wrap items-center gap-4 text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} className="text-accent" /> {featuredPost.date}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="inline-flex items-center gap-2">
                      <Clock size={14} className="text-accent" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="mb-6 text-3xl font-black uppercase italic leading-tight tracking-tight text-brand-900 transition-colors group-hover:text-accent md:text-5xl">
                    {featuredPost.title}
                  </h3>
                  <p className="mb-10 text-base font-light italic leading-relaxed text-slate-500 md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-900 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-brand-800 hover:shadow-xl"
                    >
                      {featuredPost.primaryCtaLabel || 'Lire le guide'} <ArrowRight size={18} className="text-accent" />
                    </Link>
                    <Link
                      to="/demande-de-devis"
                      className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-900 transition-all hover:border-accent hover:text-accent"
                    >
                      Demander un devis
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-sm font-black uppercase italic tracking-[0.3em] text-accent">
              Les secrets de pro
            </h2>
            <p className="text-4xl font-black uppercase italic tracking-tight text-brand-900 md:text-5xl">
              Le savoir-faire en <span className="text-accent">3 cartes</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {expertTips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-[2.5rem] border border-slate-100 bg-white p-10 italic shadow-xl transition-colors hover:border-accent"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-brand-900 transition-all duration-500 group-hover:bg-accent group-hover:text-white">
                  <tip.icon size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-black uppercase italic tracking-tight text-brand-900">
                  {tip.title}
                </h3>
                <p className="font-light leading-relaxed text-slate-500">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-900 py-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-12 rounded-[3rem] bg-accent p-10 shadow-2xl md:p-12 lg:flex-row lg:p-16">
            <div className="max-w-xl text-brand-900">
              <h2 className="mb-4 text-4xl font-black uppercase italic leading-none tracking-tighter md:text-5xl">
                Besoin de chiffrer <br /> votre déménagement ?
              </h2>
              <p className="mb-8 text-lg font-bold italic leading-relaxed text-brand-900/70">
                Utilisez notre calculateur de volume ou demandez une estimation personnalisée en quelques minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/calculateur-volume"
                  className="inline-flex items-center gap-3 rounded-full bg-brand-900 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-brand-800"
                >
                  Calculer mon volume <Calculator size={18} />
                </Link>
                <Link
                  to="/demande-de-devis"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-900 transition-all hover:bg-slate-50"
                >
                  Devis express <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="flex h-80 w-80 animate-pulse items-center justify-center rounded-full border-2 border-brand-900/10 bg-brand-900/10">
                <Calculator size={100} className="text-brand-900 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" id="articles">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-sm font-black uppercase italic tracking-[0.3em] text-accent">
                Le Mag Transdem
              </h2>
              <p className="text-4xl font-black uppercase italic tracking-tight text-brand-900 md:text-5xl">
                Nos dossiers <span className="text-accent">expertise</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeCategory === category
                      ? 'bg-accent text-brand-900 shadow-lg'
                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => {
              const dimensions = getImageDimensions(post.image);

              return (
              <article key={post.id} className="group flex h-full flex-col">
                <Link
                  to={`/blog/${post.slug}`}
                  className="relative mb-8 block aspect-[4/3] overflow-hidden rounded-[3rem] shadow-xl transition-all duration-700 hover:shadow-2xl"
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    width={dimensions.width}
                    height={dimensions.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-900/10 transition-colors group-hover:bg-transparent" />
                  <div className="absolute top-8 left-8 rounded-full bg-accent px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-900 shadow-lg">
                    {post.category}
                  </div>
                </Link>

                <div className="flex flex-grow flex-col px-2">
                  <div className="mb-6 flex flex-wrap items-center gap-4 text-[10px] font-black uppercase italic tracking-widest text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={14} className="text-accent" /> {post.date}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="inline-flex items-center gap-2">
                      <Clock size={14} className="text-accent" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-6 text-2xl font-black uppercase italic leading-tight tracking-tight text-brand-900 underline decoration-accent/0 decoration-2 underline-offset-4 transition-colors group-hover:text-accent group-hover:decoration-accent/20 md:text-3xl">
                    {post.title}
                  </h3>
                  <p className="mb-8 text-sm font-light italic leading-relaxed text-slate-500">{post.excerpt}</p>

                  <div className="mt-auto border-t border-slate-100 pt-6">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-brand-900 transition-all hover:gap-5 group-hover:text-accent"
                    >
                      Lire l’article <ArrowRight size={18} className="text-accent" />
                    </Link>
                  </div>
                </div>
              </article>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="mt-16 rounded-[3rem] border border-slate-100 bg-slate-50 p-10 text-center">
              <p className="font-light italic text-slate-500">Aucun article disponible dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand-900 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] border border-white bg-white p-10 text-center italic shadow-2xl md:p-16 lg:p-20">
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl" />
            <Tag className="mx-auto mb-8 text-accent" size={60} />
            <h2 className="mb-6 text-4xl font-black uppercase italic tracking-tighter text-brand-900 md:text-6xl">
              Prêt à préparer <br /> votre déménagement ?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-slate-500">
              Nos guides vous aident à comprendre. Notre équipe vous aide à organiser. Demandez un devis clair selon votre volume, vos accès, votre étage et votre date souhaitée.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/demande-de-devis"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-900 px-10 py-5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-brand-800 hover:shadow-2xl"
              >
                Demander un devis <ArrowRight size={18} className="text-accent" />
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-10 py-5 text-xs font-black uppercase tracking-widest text-brand-900 transition-all hover:border-accent hover:text-accent"
              >
                <PhoneCall size={18} /> {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
