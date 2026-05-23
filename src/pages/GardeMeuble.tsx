import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Warehouse, Shield, Info, Zap, MapPin, Building2, User, ClipboardCheck, Clock, Package, Truck, ArrowUpDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const faqs = [
  { 
    q: "Quand utiliser un garde-meuble lors d’un déménagement ?", 
    a: "Un garde-meuble est particulièrement utile lors d'un déménagement en deux temps, par exemple si vous devez quitter votre ancien logement avant que le nouveau ne soit disponible, ou si vous réalisez des travaux de rénovation avant de vous installer." 
  },
  { 
    q: "Peut-on stocker des meubles entre deux logements ?", 
    a: "Oui, c'est l'une des utilisations les plus fréquentes. Nous organisons le transport de vos meubles depuis votre domicile actuel vers l'espace de stockage, puis la livraison vers votre nouveau logement une fois celui-ci prêt." 
  },
  { 
    q: "Le garde-meuble convient-il aux entreprises ?", 
    a: "Tout à fait. Les entreprises utilisent nos solutions pour stocker du mobilier de bureau inutilisé, du matériel événementiel ou des archives, permettant ainsi d'optimiser l'espace de travail de leurs locaux parisiens." 
  },
  { 
    q: "Comment estimer le volume à stocker ?", 
    a: "L'estimation du volume dépend de la quantité de mobilier et de cartons. Lors de notre échange, nous évaluons ensemble vos besoins pour vous orienter vers la solution la plus adaptée à votre inventaire." 
  },
  { 
    q: "Comment obtenir un devis pour une solution de stockage ?", 
    a: "Il vous suffit de nous contacter ou de remplir notre formulaire en ligne. Nous vous fournirons une estimation personnalisée incluant, selon votre projet, le transport et le stockage de vos biens." 
  }
];

const REASONS_WHY = [
  { t: "Entre deux logements", d: "Vous devez quitter votre domicile actuel mais votre nouveau logement n'est pas encore prêt." },
  { t: "Pendant des travaux", d: "Libérez de l'espace pour protéger vos meubles des poussières et faciliter l'accès aux artisans." },
  { t: "Meubles volumineux", d: "Solution idéale pour stocker du mobilier imposant dont vous n'avez pas l'usage immédiat." },
  { t: "Stockage entreprise", d: "Pour les professionnels manquant d'espace pour leurs archives ou leur matériel." }
];

const ACCOMPAGNEMENT_OFFER = [
  { icon: <ClipboardCheck size={32} />, title: "Évaluation du volume", desc: "Étude précise du volume à stocker pour optimiser l'espace." },
  { icon: <Info size={32} />, title: "Conseil personnalisé", desc: "Orientation vers la solution adaptée à votre projet." },
  { icon: <Truck size={32} />, title: "Transport des biens", desc: "Acheminement professionnel vers l'espace de stockage." },
  { icon: <Package size={32} />, title: "Protection soignée", desc: "Protection des meubles et cartons durant le stockage." },
  { icon: <Clock size={32} />, title: "Stockage temporaire", desc: "Solution flexible selon la durée de votre projet." },
  { icon: <ArrowUpDown size={32} />, title: "Restitution des biens", desc: "Livraison de vos affaires selon votre planning." }
];

const METHODS = [
  { t: "Analyse de votre besoin", d: "Étude personnalisée de votre projet de stockage." },
  { t: "Estimation du volume", d: "Calcul précis de l'espace nécessaire pour vos biens." },
  { t: "Préparation et transport", d: "Chargement et acheminement professionnel de vos affaires." },
  { t: "Stockage et restitution", d: "Stockage organisé et restitution selon votre projet." }
];

const WHY_CHOOSE_US = [
  { t: "Entreprise basée à Paris 20e", d: "Une connaissance logistique du terrain à Paris et en Île-de-France." },
  { t: "Accompagnement professionnel", d: "Un suivi de proximité et une expertise dédiée à votre projet." },
  { t: "Organisation claire", d: "Une planification étape par étape sans mauvaise surprise." },
  { t: "Protection soignée des biens", d: "Protection soignée de votre mobilier et de vos effets personnels." },
  { t: "Solution adaptée selon le projet", d: "Des solutions pensées pour répondre à vos besoins réels." },
  { t: "Intervention IDF", d: "Intervention à Paris et en Île-de-France selon votre projet." }
];

const GardeMeuble: React.FC = () => {
  const path = "/garde-meuble-paris";

  return (
    <div className="bg-white">
      <SEO 
        title="Garde-meuble Paris | Marne Transdem"
        description="Besoin d’une solution de garde-meuble ou de stockage à Paris ? Marne Transdem vous accompagne pour stocker vos biens selon votre projet."
        canonical={path}
        schema={[
          getServiceSchema("Garde-meuble et stockage", "Marne Transdem accompagne les particuliers et les entreprises qui ont besoin d’une solution de stockage temporaire ou plus longue durée à Paris et en Île-de-France."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Garde-meuble", item: `https://marnetransdem.com${path}` }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/demenagement-paris-intra-muros.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <Warehouse size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest">Espace & Stockage</span>
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Garde-meuble et <br/>
              <span className="text-accent">stockage</span> à Paris
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Marne Transdem accompagne les particuliers et les entreprises qui ont besoin d’une solution de stockage temporaire ou plus longue durée à Paris et en Île-de-France.
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
              { icon: <Shield size={24} />, title: "Solution adaptée" },
              { icon: <Clock size={24} />, title: "Stockage temporaire" },
              { icon: <Star size={24} />, title: "Accompagnement professionnel" },
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

      {/* 3 & 4. Introduction SEO & Pourquoi utiliser un garde-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
            <h2 className="text-3xl font-bold text-brand-900">Le partenaire de votre stockage professionnel et particulier</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              Que ce soit pour un déménagement en deux temps, des travaux de rénovation, ou simplement par manque de place, le besoin d'un espace de stockage à Paris est une situation courante. Marne Transdem vous aide à stocker vos meubles, cartons, archives ou matériel professionnel en attendant la livraison de votre nouveau logement ou local.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Entre deux logements", d: "Vous devez quitter votre domicile actuel mais votre nouveau logement n'est pas encore prêt." },
              { t: "Pendant des travaux", d: "Libérez de l'espace pour protéger vos meubles des poussières et faciliter l'accès aux artisans." },
              { t: "Meubles volumineux", d: "Solution idéale pour stocker du mobilier imposant dont vous n'avez pas l'usage immédiat." },
              { t: "Stockage entreprise", d: "Pour les professionnels manquant d'espace pour leurs archives ou leur matériel." }
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
              { icon: <ClipboardCheck size={32} />, title: "Évaluation du volume", desc: "Étude précise du volume à stocker pour optimiser l'espace." },
              { icon: <Info size={32} />, title: "Conseil personnalisé", desc: "Orientation vers la solution adaptée à votre projet." },
              { icon: <Truck size={32} />, title: "Transport des biens", desc: "Acheminement professionnel vers l'espace de stockage." },
              { icon: <Package size={32} />, title: "Protection soignée", desc: "Protection des meubles et cartons durant le stockage." },
              { icon: <Clock size={32} />, title: "Stockage temporaire", desc: "Solution flexible selon la durée de votre projet." },
              { icon: <ArrowUpDown size={32} />, title: "Restitution des biens", desc: "Livraison de vos affaires selon votre planning." }
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
                <h3 className="text-3xl font-bold mb-6 text-white">Particuliers</h3>
                <p className="text-slate-300 leading-relaxed font-light mb-6 text-lg">
                  Simplifiez votre transition entre deux logements. Marne Transdem stocke vos meubles, cartons et objets personnels en toute sérénité.
                </p>
                <ul className="space-y-4 text-slate-300 mb-10">
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Meubles et bibliothèques</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Cartons et textiles</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Transition immobilière</li>
                </ul>
             </div>
             <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent mb-8">
                   <Building2 size={32} />
                </div>
                <h3 className="text-3xl font-bold text-brand-900 mb-6">Entreprises</h3>
                <p className="text-slate-500 leading-relaxed font-light mb-6 text-lg">
                  Libérez vos espaces de travail. Nous accompagnons les professionnels pour le stockage d'archives, de mobilier ou de matériel lors de transitions de locaux.
                </p>
                <ul className="space-y-4 text-slate-500 mb-10">
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Archives et documents</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Mobilier de bureau</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Temps d'attente aménagement</li>
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
              { t: "Analyse de votre besoin", d: "Étude personnalisée de votre projet de stockage." },
              { t: "Estimation du volume", d: "Calcul précis de l'espace nécessaire pour vos biens." },
              { t: "Préparation et transport", d: "Chargement et acheminement professionnel de vos affaires." },
              { t: "Stockage et restitution", d: "Stockage organisé et restitution selon votre projet." }
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
              <h2 className="text-3xl font-bold text-brand-900">Garde-meuble à Paris : une solution utile en cas de transition</h2>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                Vivre ou travailler à Paris implique souvent de gérer des espaces restreints. En cas de déménagement, de travaux ou simplement pour libérer un appartement parfois petit, le recours à un garde-meuble est une solution stratégique.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Le manque d’espace, les délais entre la remise des clés de deux logements ou les imprévus de chantier sont autant de situations où Marne Transdem intervient pour faciliter votre transition. Nous gérons la logistique pour que vous puissiez vous concentrer sur l'essentiel de votre projet.
              </p>
            </div>
            <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="/images/garde-meuble.webp" 
                alt="Box de stockage Marne Transdem" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Intermédiaire */}
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight text-white focus:outline-none">Besoin d’une solution de stockage à Paris ?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez votre besoin et recevez une estimation adaptée à votre situation.
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
              { t: "Entreprise basée à Paris 20e", d: "Une connaissance logistique du terrain à Paris et en Île-de-France." },
              { t: "Accompagnement professionnel", d: "Un suivi de proximité et une expertise dédiée à votre projet." },
              { t: "Organisation claire", d: "Une planification étape par étape sans mauvaise surprise." },
              { t: "Protection soignée des biens", d: "Protection soignée de votre mobilier et de vos effets personnels." },
              { t: "Solution adaptée selon le projet", d: "Des solutions pensées pour répondre à vos besoins réels." },
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
            <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Questions fréquentes stockage</h2>
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
           <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <Link to="/demande-de-devis" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Devis</h4>
                <p className="text-xs text-slate-500 font-light">Demande de devis personnalisée.</p>
              </Link>
              <Link to="/demenagement-particuliers-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Particuliers</h4>
                <p className="text-xs text-slate-500 font-light">Accompagnement foyer.</p>
              </Link>
              <Link to="/demenagement-entreprises-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Entreprises</h4>
                <p className="text-xs text-slate-500 font-light">Transfert professionnel.</p>
              </Link>
              <Link to="/formules-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Formules</h4>
                <p className="text-xs text-slate-500 font-light">Toutes nos prestations.</p>
              </Link>
              <Link to="/contact" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Contact</h4>
                <p className="text-xs text-slate-500 font-light">Parlons de votre projet.</p>
              </Link>
           </div>
           <div className="mt-12 flex justify-center gap-8 text-sm font-bold text-slate-400">
              <Link to="/demande-de-devis" className="hover:text-accent">Demande de devis</Link>
              <Link to="/contact" className="hover:text-accent">Contact</Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default GardeMeuble;
