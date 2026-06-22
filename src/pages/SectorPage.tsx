import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, 
  Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, 
  Briefcase, Info, ShieldCheck, Clock, Quote, Star, ChevronRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';
import { sectorsData, Sector } from '../constants/sectorsData';
import NotFound from './NotFound';

export const SectorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <NotFound />;
  }

  const sector = sectorsData.find(s => s.slug === slug);
  if (!sector) {
    return <NotFound />;
  }

  const path = `/demenagement-${slug}`;

  // Default fallback images
  const heroImage = sector.seoImage || (sector.type === 'longue-distance' 
    ? '/images/demenagement-longue-distance-camion.jpg' 
    : '/images/demenagement-paris.webp');

  const introImage = sector.type === 'longue-distance'
    ? '/images/demenagement-longue-distance.webp'
    : '/images/demenagement-appartement-93.jpg';

  const secondBlockImage = sector.type === 'longue-distance'
    ? '/images/equipe-demenageur-longue-distance.jpg'
    : '/images/equipe-demenagement-93.jpg';

  const defaultHeroSubtitle = sector.type === 'longue-distance'
    ? `Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement depuis Paris ou l’Île-de-France vers ${sector.name}, avec une organisation adaptée à la distance.`
    : `Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à ${sector.name}, dans les arrondissements voisins et en Île-de-France.`;

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={sector.seoTitle || `Déménagement ${sector.name} | Devis gratuit | Marne Transdem`}
        description={sector.seoDescription || `Préparez votre déménagement à ${sector.name} avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées et devis gratuit.`}
        canonical={path}
        schema={[
          getFAQSchema(sector.faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { 
              name: sector.type === 'longue-distance' ? "Longue distance" : "Secteurs", 
              item: sector.type === 'longue-distance' ? "/demenagement-longue-distance" : "/secteurs-desservis" 
            },
            { name: sector.name, item: path }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={`Déménagement professionnel à ${sector.name}`} 
            className="w-full h-full object-cover opacity-20 grayscale-[10%]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-linear-to-b from-brand-900/80 via-brand-900/40 to-brand-900/90" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              {sector.type === 'longue-distance' ? (
                <Globe size={16} className="text-accent" />
              ) : (
                <MapPin size={16} className="text-accent" />
              )}
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {sector.type === 'longue-distance' ? 'Déménagement longue distance' : `Service de Proximité - ${sector.name}`}
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic uppercase">
              {sector.type === 'longue-distance' ? 'Paris ' : 'Déménagement '} 
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic">{sector.name}</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              {sector.heroSubtitle || defaultHeroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm italic">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction Section */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L'exigence Marne Transdem</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                {sector.type === 'longue-distance' ? `Votre projet Paris - ${sector.name}` : `Votre déménagement à ${sector.name}`}
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                {sector.introParagraphs && sector.introParagraphs.length > 0 ? (
                  sector.introParagraphs.map((para, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
                  ))
                ) : (
                  <>
                    <p>
                      Marne Transdem accompagne votre installation ou départ à <strong>{sector.name}</strong> avec le plus grand soin logistique. Nos compagnons déménageurs disposent d'un savoir-faire artisanal de haute technicité, parfaitement adapté aux spécificités architecturales et routières de ce secteur.
                    </p>
                    <p>
                      Que vous habitiez un appartement dans des résidences denses ou une maison pavillonnaire, nous analysons drastiquement l'entourage pour sécuriser le positionnement de nos véhicules et le passage de vos meubles.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src={introImage} 
                  alt={`Déménagement haut de gamme à ${sector.name}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Logistics & Challenges Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">L'Excellence Opérationnelle</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">
              {sector.type === 'longue-distance' ? 'Logistique Grand Axe' : `Les défis logistiques à ${sector.name}`}
            </h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              {sector.type === 'longue-distance' 
                ? `La coordination et la protection des biens sont les piliers de notre accompagnement longue distance vers ${sector.name}.`
                : `Une organisation rigoureuse permet de surmonter les contraintes de stationnement et d'accès aux étages dans la région.`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">
                {sector.type === 'longue-distance' ? 'Protection renforcée sur la distance' : 'Maîtrise absolue des accès urbains'}
              </h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Chaque transition représente une étape de vie importante. Marne Transdem gère l'intégralité des contraintes techniques : sélection minutieuse de la taille du fourgon capitonné, mise en place réglementaire d'arrêtés municipaux de stationnement, et utilisation d'équipements de manutention de dernière génération.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Nos équipes de compagnons possèdent une connaissance innée de la configuration locale. De l'emballage minutieux de votre vaisselle fine à la protection sous housses de vos meubles laqués, rien n'est laissé au hasard.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Flotte moderne de véhicules</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Utilisation de fourgons capitonnés agiles ou de grands porteurs routiers adaptés aux restrictions de tonnage locales.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Autorisations de stationnement</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Gestion complète des arrêtés d'occupation temporaire (AOT) de voirie auprès des autorités de la commune.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Élévation extérieure par Monte-meubles</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Lorsque des canapés d'angle, des pianos ou des armoires massives ne passent pas par les ascenseurs ou les escaliers étroits, nous mettons en place un monte-meubles d'extérieur performant.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Cette solution technique protège l'intégrité de vos biens et évite la dégradation des parties communes de votre copropriété. Nous analysons préalablement la faisabilité technique liée aux arbres et lignes électriques de la rue.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Découvrir nos monte-meubles <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Nos services grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Nos services de déménagement à {sector.name}</h2>
            <p className="text-slate-500 font-light text-lg">Une gamme complète de solutions sur-mesure pour chaque besoin.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Particuliers", path: "/demenagement-particuliers-paris", desc: "Logement complet, studio ou grand appartement familial." },
              { title: "Entreprises", path: "/demenagement-entreprises-paris", desc: "Bureaux, commerces, agences et transferts professionnels." },
              { title: "Garde-meuble", path: "/garde-meuble-paris", desc: "Stockage sécurisé temporaire ou longue durée." },
              { title: "Monte-meuble", path: "/location-monte-meuble-paris", desc: "Location de monte-meubles télescopiques avec technicien." },
              { title: "Emballage", path: "/emballage-protection-demenagement", desc: "Matériel et protections premium pour vos objets fragiles." },
              { title: "Matériel", path: "/cartons-demenagement-paris", desc: "Livraison de cartons solides et fournitures professionnelles." },
              { title: "Formules", path: "/formules-demenagement", desc: "3 offres adaptées à votre budget et à vos besoins." },
              { title: "Sur mesure", path: "/contact", desc: "Une configuration personnalisée pour les projets atypiques." }
            ].map((service, i) => (
              <Link 
                key={i} 
                to={service.path}
                className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:border-accent/10 transition-all duration-500"
              >
                <h4 className="text-xl font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors">{service.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 italic">{service.desc}</p>
                <div className="flex items-center gap-2 text-brand-900 font-black text-[10px] uppercase tracking-widest">
                  Découvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Particuliers Detail */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src={secondBlockImage} 
                  alt="Déménagement résidentiel de particulier" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-3xl -z-0"></div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Déménagement particuliers à {sector.name}</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Marne Transdem accompagne les particuliers pour les déménagements de villas, d'appartements, de studios ou de résidences secondaires à {sector.name} ou vers une autre destination nationale.
                </p>
                <p>
                  Nous prenons en charge la manutention sécurisée, la mise en cartons de vos affaires et la fourniture de penderies rigides debout pour vos vêtements précieux. Nous vous orientons vers la formule d'accompagnement idéale pour simplifier votre changement de vie.
                </p>
              </div>
              <Link 
                to="/demande-de-devis" 
                className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl transition-all group"
              >
                Demander mon devis
                <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Entreprises Detail */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Transfert d'entreprises et bureaux à {sector.name}</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Les exigences logistiques d'un transfert professionnel à {sector.name} nécessitent une coordination infaillible. Marne Transdem minimise l'impact opérationnel sur vos équipes pour garantir la continuité de votre activité.
                </p>
                <p>
                  Nous prenons en charge le démontage des espaces de travail collectifs, le transfert sécurisé de vos serveurs informatiques sous emballages antistatiques, et l'archivage méthodique de vos dossiers professionnels. Nos équipes peuvent également intervenir de nuit ou pendant le week-end.
                </p>
              </div>
              <Link 
                to="/demande-de-devis" 
                className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl transition-all group"
              >
                Organiser un transfert professionnel
                <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Transfert d'entreprise et bureaux à Paris" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Formules Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Nos formules adaptées à votre budget</h2>
            <p className="text-slate-500 text-lg font-light">Trois niveaux de services pour répondre précisément à vos attentes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { name: "Économique", desc: "La formule essentielle : vous préparez vos cartons, nos compagnons effectuent la manutention sécurisée et le transport routier." },
              { name: "Standard", desc: "Le meilleur compromis : nos équipes emballent et déballent toute votre vaisselle, verres et objets fragiles." },
              { name: "Luxe", desc: "Tranquillité absolue : nous gérons la mise en cartons intégrale de l'ensemble de vos effets et la réinstallation de vos biens." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-brand-900 mb-4">{f.name}</h3>
                  <p className="text-slate-500 font-light text-sm italic mb-8 leading-relaxed">{f.desc}</p>
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent font-black">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/formules-demenagement" className="inline-flex items-center gap-3 text-brand-900 font-black uppercase text-xs tracking-[0.3em] hover:text-accent transition-colors">
              Comparer toutes nos formules <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Notre méthode en 4 étapes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Notre méthode pour une transition sereine</h2>
            <p className="text-slate-500 text-lg font-light">Un parcours balisé et professionnel de A à Z.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Analyse & Devis", icon: ClipboardCheck, desc: "Échange sur vos besoins, dates clés et calcul précis du volume." },
              { title: "Visite technique", icon: Ruler, desc: "Validation sur site ou en visioconférence des contraintes routières et d'accès." },
              { title: "Formalités administratives", icon: Calendar, desc: "Réservation de votre stationnement de voirie par nos soins." },
              { title: "Exécution le Jour J", icon: Truck, desc: "Chargement, transport et installation par nos compagnons déménageurs." }
            ].map((step, i) => (
              <div key={i} className="relative group text-center">
                <div className="w-20 h-20 bg-brand-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500 shadow-xl">
                  <step.icon size={32} />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent text-brand-900 rounded-full flex items-center justify-center font-black text-sm border-4 border-white">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-4">{step.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Calculator block */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-100 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black text-brand-900 mb-6 font-display leading-tight">Estimez précisément votre volume en m³</h2>
              <p className="text-slate-500 font-light leading-relaxed italic">
                Utilisez notre simulateur de cubage interactif en ligne pour évaluer la capacité nécessaire au transport de vos biens.
              </p>
            </div>
            <Link 
              to="/calculateur-volume" 
              className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl flex items-center gap-3 shrink-0"
            >
              <Calculator size={22} className="text-accent" />
              Accéder au simulateur de volume
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Middle CTA */}
      <section className="py-24 bg-accent relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black/5 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight">Vous préparez un déménagement à {sector.name} ?</h2>
          <p className="text-brand-900/70 text-xl font-light mb-12 max-w-2xl mx-auto italic leading-relaxed">
            Obtenez rapidement une offre tarifaire chiffrée adaptée à vos besoins et contraintes d'accès.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-hover transition-all flex items-center gap-3 shadow-2xl">
              Demander mon devis gratuit
              <ArrowRight size={24} />
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-brand-900 font-black text-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <Phone size={24} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      {sector.faqs && sector.faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">FAQ Déménagement {sector.name}</h2>
              <p className="text-slate-500 font-light italic opacity-70">Les questions fréquentes sur la logistique de votre projet.</p>
            </div>

            <div className="space-y-6">
              {sector.faqs.map((faq, i) => (
                <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-4">
                    <HelpCircle className="text-accent shrink-0 mt-1" size={22} />
                    {faq.q}
                  </h4>
                  <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-2 border-accent/20 opacity-80 text-justify">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. Neighbouring sectors Section */}
      {sector.nearbySectors && sector.nearbySectors.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-900/30">Autres secteurs à proximité</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-center">
              {sector.nearbySectors.map((ns, idx) => (
                <Link 
                  key={idx} 
                  to={ns.l} 
                  className="text-slate-400 hover:text-accent font-bold text-xs transition-colors italic uppercase tracking-wider"
                >
                  Déménagement {ns.n}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SectorPage;
