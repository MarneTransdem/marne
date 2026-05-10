import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Box, Shield, Info, Zap, Building2, User, ClipboardCheck, Package, LayoutGrid, Truck, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const Emballage: React.FC = () => {
  const path = "/emballage-protection-demenagement";

  const faqs = [
    { 
      q: "Pourquoi protéger ses meubles avant un déménagement ?", 
      a: "La protection des meubles permet de limiter les risques de rayures, de chocs et de poussière lors des manipulations dans les escaliers, le chargement et le transport en camion. C'est une étape essentielle pour préserver l'état de votre mobilier." 
    },
    { 
      q: "Proposez-vous l’emballage des objets fragiles ?", 
      a: "Oui, selon la formule choisie (notamment nos formules Standard et Luxe), nos déménageurs s'occupent de l'emballage de votre vaisselle, verrerie et autres objets délicats avec du matériel professionnel adapté." 
    },
    { 
      q: "Quels objets doivent être emballés avec attention ?", 
      a: "Tous les objets fragiles (verres, assiettes, cadres), l'électroménager, les écrans, ainsi que les meubles aux surfaces fragiles ou laqués nécessitent une attention particulière et une protection spécifique lors d'un déménagement." 
    },
    { 
      q: "Puis-je choisir une formule avec emballage inclus ?", 
      a: "Oui, selon la formule choisie, vous pouvez déléguer tout ou partie de l’emballage." 
    },
    { 
      q: "Comment obtenir un devis pour l’emballage et la protection ?", 
      a: "La prestation d'emballage est généralement intégrée à votre devis global de déménagement. Lors de notre évaluation, nous prenons en compte le volume et la nature des biens pour vous proposer la solution de protection la plus cohérente." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Emballage déménagement Paris | Marne Transdem"
        description="Protégez vos meubles, objets fragiles et cartons avec les solutions d’emballage et de protection proposées par Marne Transdem."
        canonical={path}
        schema={[
          getServiceSchema("Emballage et protection pour déménagement", "Marne Transdem accompagne les particuliers et les entreprises dans la préparation, l’emballage et la protection des biens avant leur transport."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Emballage et protection", item: path }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <Package size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Soin & Préservation</span>
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Emballage et <br/>
              <span className="text-accent">protection</span> pour déménagement
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Marne Transdem accompagne les particuliers et les entreprises dans la préparation, l’emballage et la protection des biens avant leur transport à Paris et en Île-de-France.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20">
                Demander un devis gratuit
                <ArrowRight size={20} />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                <Phone size={20} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bloc de réassurance */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Sparkles size={24} />, title: "Objets fragiles" },
              { icon: <Shield size={24} />, title: "Meubles protégés" },
              { icon: <Box size={24} />, title: "Cartons adaptés" },
              { icon: <ClipboardCheck size={24} />, title: "Devis personnalisé" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="text-accent">{item.icon}</div>
                <span className="text-sm font-bold text-brand-900 uppercase tracking-wider">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 & 4. Introduction SEO & Pourquoi bien emballer ses biens ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
            <h2 className="text-3xl font-bold text-brand-900">La protection : l'étape clé d'un déménagement serein</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              Que ce soit pour du mobilier imposant, des objets fragiles comme de la vaisselle ou des appareils électroménagers délicats, un emballage soigné contribue à mieux protéger vos biens pendant le transport. Marne Transdem met à votre disposition son expertise et du matériel professionnel pour assurer la protection de vos biens lors de votre déménagement à Paris.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Limiter les risques de casse", d: "Une protection adaptée aide à limiter les risques de chocs pendant la manutention et le transport." },
              { t: "Faciliter la manutention", d: "Des cartons bien préparés et dimensionnés permettent une manipulation plus sûre et rapide." },
              { t: "Organiser les cartons", d: "Un étiquetage clair et un emballage structuré simplifient le déballage dans votre nouveau lieu." },
              { t: "Protéger les meubles", d: "L'utilisation de couvertures et de protections spécifiques évite les rayures sur votre mobilier." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-slate-50 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">{item.t}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ce que comprend notre accompagnement */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900">Ce que comprend notre accompagnement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ClipboardCheck size={32} />, title: "Conseil matériel", desc: "Orientation vers le matériel d'emballage le plus adapté à votre projet." },
              { icon: <Box size={32} />, title: "Fourniture de cartons", desc: "Mise à disposition de cartons de qualité selon votre volume." },
              { icon: <Shield size={32} />, title: "Protection meubles", desc: "Utilisation de couvertures professionnelles et housses spécifiques." },
              { icon: <Sparkles size={32} />, title: "Objets fragiles", desc: "Emballage soigné de la vaisselle et des objets délicats selon votre formule." },
              { icon: <LayoutGrid size={32} />, title: "Vaisselle et verrerie", desc: "Protection renforcée pour vos éléments de cuisine les plus sensibles." },
              { icon: <Package size={32} />, title: "Préparation cartons", desc: "Mise en carton et étiquetage structuré si prévu dans votre prestation." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-6 items-start hover:shadow-lg transition-all">
                <div className="text-accent shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-brand-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pour les particuliers et les entreprises */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-brand-900 p-12 rounded-[2.5rem] text-white">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                   <User size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-6">Particuliers</h3>
                <p className="text-slate-300 leading-relaxed font-light mb-6 text-lg">
                  Sécurisez vos effets personnels. De l'emballage de vos souvenirs à la protection de votre canapé ou literie.
                </p>
                <ul className="space-y-4 text-slate-300 mb-10">
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Vaisselle et bibelots</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Meubles et bibliothèques</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Textiles et électroménager</li>
                </ul>
             </div>
             <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent mb-8">
                   <Building2 size={32} />
                </div>
                <h3 className="text-3xl font-bold text-brand-900 mb-6">Entreprises</h3>
                <p className="text-slate-500 leading-relaxed font-light mb-6 text-lg">
                  Protégez vos outils de travail. Transfert sécurisé de votre mobilier de bureau, matériel informatique et archives.
                </p>
                <ul className="space-y-4 text-slate-500 mb-10">
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Archives et dossiers</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Matériel et informatique</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Mobilier professionnel</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-900 mb-16">Notre méthode en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { t: "Analyse des biens", d: "Identification des objets nécessitant un emballage spécifique." },
              { t: "Choix du matériel", d: "Sélection des cartons et protections adaptés à la nature des biens." },
              { t: "Préparation et protection", d: "Mise sous protection soignée de votre mobilier et cartons." },
              { t: "Transport organisé", d: "Acheminement de vos biens dans le cadre du déménagement." }
            ].map((step, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-brand-900 text-accent rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 tracking-tight">{step.t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section Locale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-900">Emballage déménagement à Paris : anticiper pour déménager sereinement</h2>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                Déménager à Paris implique souvent des accès par escaliers parfois étroits ou des ascenseurs réduits. Dans ce contexte urbain, la protection des bords des meubles et la bonne fermeture des cartons sont primordiaux.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Une préparation soignée en amont du jour J permet de gagner un temps précieux lors du chargement. Marne Transdem vous conseille sur l'organisation de vos cartons et sur les techniques de protection adaptées à la configuration de votre logement parisien, pour que votre transition se déroule dans les meilleures conditions.
              </p>
            </div>
            <div className="bg-slate-50 p-10 md:p-14 rounded-[3rem] border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent mb-8">
                  <Package size={28} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 mb-6">Conseil préparation</h3>
                <p className="text-slate-500 leading-relaxed font-light text-lg">
                  Préparez vos cartons pièce par pièce, évitez de trop les charger et indiquez clairement leur contenu ainsi que leur pièce de destination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Intermédiaire */}
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">Besoin d’aide pour emballer et protéger vos biens ?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez votre projet et choisissez la formule la plus adaptée à votre niveau d’accompagnement.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20">
              Demander mon devis
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              Appeler le {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 10. Pourquoi choisir Marne Transdem ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Pourquoi choisir Marne Transdem ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Accompagnement professionnel", d: "Un suivi de proximité et une expertise dédiée à la protection de vos biens." },
              { t: "Protection soignée", d: "Protection soignée de votre mobilier et de vos effets personnels." },
              { t: "Organisation claire", d: "Une planification étape par étape pour un emballage efficace." },
              { t: "Formules adaptées", d: "Plusieurs niveaux de service selon vos besoins réels d'emballage." },
              { t: "Savoir-faire technique", d: "Maîtrise des techniques de protection pour chaque type d'objet." },
              { t: "Intervention IDF", d: "Intervention à Paris et en Île-de-France selon votre projet." }
            ].map((reason, i) => (
              <div key={i} className="flex gap-4 items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="text-accent shrink-0 mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">{reason.t}</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{reason.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Questions fréquentes emballage</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all">
                  <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-3">
                    <Zap size={18} className="text-accent" />
                    {faq.q}
                  </h4>
                  <p className="text-slate-500 leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Maillage interne */}
      <section className="py-24 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-6 gap-8 text-center md:text-left">
              <Link to="/demande-de-devis" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Devis</h4>
                <p className="text-xs text-slate-500 font-light">Estimation personnalisée.</p>
              </Link>
              <Link to="/formules-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Formules</h4>
                <p className="text-xs text-slate-500 font-light">Toutes nos prestations.</p>
              </Link>
              <Link to="/demenagement-particuliers-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Particuliers</h4>
                <p className="text-xs text-slate-500 font-light">Accompagnement foyer.</p>
              </Link>
              <Link to="/demenagement-entreprises-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Entreprises</h4>
                <p className="text-xs text-slate-500 font-light">Transfert professionnel.</p>
              </Link>
              <Link to="/cartons-demenagement-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Cartons</h4>
                <p className="text-xs text-slate-500 font-light">Matériel adapté.</p>
              </Link>
              <Link to="/contact" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Contact</h4>
                <p className="text-xs text-slate-500 font-light">Parlons de votre projet.</p>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Emballage;

