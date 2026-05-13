import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Box, 
  Package, 
  ShieldCheck, 
  Zap, 
  Info, 
  LayoutGrid, 
  Truck, 
  ClipboardCheck, 
  Sparkles,
  Tally4,
  Warehouse,
  User,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const Cartons: React.FC = () => {
  const path = "/cartons-demenagement-paris";

  const faqs = [
    { 
      q: "Quels cartons utiliser pour un déménagement ?", 
      a: "L’utilisation de cartons de qualité professionnelle peut s’avérer utile pour assurer une meilleure résistance lors de l’empilage. Nous recommandons de varier les formats : des cartons standards pour le linge et les objets légers, et des cartons renforcés plus petits pour les livres et objets lourds afin de faciliter la manutention." 
    },
    { 
      q: "Combien de cartons prévoir pour déménager ?", 
      a: "Le nombre de cartons est une estimation générale qui dépend du volume de vos biens et de votre mode de vie. En moyenne, on compte environ 10 à 15 cartons par pièce, mais cela reste une indication. Lors de notre évaluation, nous pouvons vous fournir une estimation plus adaptée à votre projet." 
    },
    { 
      q: "Proposez-vous des cartons pour objets fragiles ?", 
      a: "Oui, selon la nature de votre projet, l’utilisation de matériels spécifiques peut être envisagée, comme des cartons croisillons pour la vaisselle ou des protections à bulles pour les objets délicats." 
    },
    { 
      q: "Comment organiser ses cartons avant le jour du déménagement ?", 
      a: "Une méthode efficace consiste à préparer les cartons pièce par pièce, à répartir le poids de manière homogène et à étiqueter systématiquement chaque carton avec son contenu et sa pièce de destination pour faciliter l'emménagement." 
    },
    { 
      q: "Comment obtenir un devis avec cartons et matériel inclus ?", 
      a: "La fourniture de matériel peut être intégrée selon la formule de déménagement choisie. Contactez-nous pour obtenir une estimation adaptée à votre projet." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Cartons déménagement Paris | Marne Transdem"
        description="Cartons, protections, adhésifs et matériel d’emballage pour préparer votre déménagement à Paris avec Marne Transdem."
        canonical={path}
        schema={[
          getServiceSchema("Cartons et matériel de déménagement", "Marne Transdem accompagne les particuliers et les entreprises dans la préparation de leur déménagement avec des cartons, protections et matériels adaptés."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Cartons et matériel", item: path }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <Package size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Préparation & Logistique</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              Cartons et <br/>
              <span className="text-accent underline decoration-white/10 underline-offset-8">matériel</span> de déménagement
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Marne Transdem accompagne les particuliers et les entreprises dans la préparation de leur déménagement avec des cartons, protections et matériels adaptés à chaque projet à Paris et en Île-de-France.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
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
              { icon: <Box size={24} />, title: "Cartons adaptés" },
              { icon: <ShieldCheck size={24} />, title: "Protection des biens" },
              { icon: <Zap size={24} />, title: "Préparation facilitée" },
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

      {/* 3 & 4. Introduction SEO & Pourquoi bien choisir ses cartons ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center md:text-left">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
            <h2 className="text-3xl font-bold text-brand-900">Le bon matériel pour une préparation bien organisée</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              L'utilisation d'un matériel de déménagement adapté contribue à une meilleure organisation de votre projet. Des cartons solides permettent de sécuriser vos biens, tandis que des protections spécifiques pour objets fragiles, des adhésifs résistants et des penderies mobiles aident à préserver l'intégrité de vos effets personnels. Une préparation méthodique avec un étiquetage clair facilite l'organisation des pièces et réduit le stress avant le jour J.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { t: "Protéger les biens", d: "Un matériel adapté aide à mieux protéger vos biens lors des manipulations et du transport." },
              { t: "Faciliter le rangement", d: "Des formats de cartons uniformes permettent un empilage mieux organisé dans le camion." },
              { t: "Gérer le poids", d: "Bien choisir la taille de ses cartons évite les charges trop lourdes et facilite la manutention." },
              { t: "Organiser le déballage", d: "Un matériel adapté et un bon marquage permettent de gagner un temps précieux à l'arrivée." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-slate-50 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Tally4 size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">{item.t}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Matériel utile pour préparer votre déménagement */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900">Matériel utile pour préparer votre déménagement</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-light">Matériel pouvant être prévu selon la prestation choisie et les besoins spécifiques de votre projet.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Box size={28} />, title: "Cartons standards", desc: "Formats polyvalents pour le linge et les objets courants." },
              { icon: <Package size={28} />, title: "Cartons renforcés", desc: "Plus robustes pour les livres, dossiers et objets lourds." },
              { icon: <Warehouse size={28} />, title: "Cartons penderie", desc: "Pour transporter vos vêtements sur cintres sans les froisser." },
              { icon: <Sparkles size={28} />, title: "Protections fragiles", desc: "Papier bulle ou mousse pour la vaisselle et les objets délicats." },
              { icon: <CheckCircle2 size={28} />, title: "Adhésifs et rubans", desc: "Rubans adhésifs professionnels pour une fermeture sécurisée." },
              { icon: <ShieldCheck size={28} />, title: "Couvertures", desc: "Protection du mobilier contre les rayures durant le transport." },
              { icon: <LayoutGrid size={28} />, title: "Housses matelas", desc: "Protection hygiénique pour vos matelas et canapés." },
              { icon: <Info size={28} />, title: "Étiquettes", desc: "Marquage clair pour organiser le contenu et les pièces." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-all group">
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-sm font-bold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pour les particuliers et les entreprises */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent mb-8">
                   <User size={32} />
                </div>
                <h3 className="text-3xl font-bold text-brand-900 mb-6">Particuliers</h3>
                <p className="text-slate-600 leading-relaxed font-light mb-6">
                  Une gamme complète de cartons pour vos effets personnels, de la vaisselle fragile à votre garde-robe.
                </p>
                <ul className="grid grid-cols-2 gap-4">
                   {[
                     "Cartons vêtements",
                     "Cartons vaisselle",
                     "Objets personnels",
                     "Livres",
                     "Textiles",
                     "Électroménager"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                       <CheckCircle2 size={16} className="text-accent" />
                       {item}
                     </li>
                   ))}
                </ul>
             </div>
             <div className="bg-brand-900 p-12 rounded-[2.5rem] text-white">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                   <Building2 size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white">Entreprises</h3>
                <p className="text-slate-300 leading-relaxed font-light mb-6">
                  Solutions spécifiques pour le transfert de vos équipements professionnels et l'organisation de vos services.
                </p>
                <ul className="grid grid-cols-2 gap-4">
                   {[
                     "Archives",
                     "Dossiers",
                     "Matériel de bureau",
                     "Fournitures",
                     "Équipements pro",
                     "Organisation"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                       <CheckCircle2 size={16} className="text-accent" />
                       {item}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900">Notre méthode en 4 étapes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { t: "Analyse des besoins", d: "Évaluation du volume et de la nature des biens à emballer." },
              { t: "Choix du matériel", d: "Sélection des cartons et protections les plus adaptés." },
              { t: "Préparation", d: "Organisation méthodique des cartons et protection du mobilier." },
              { t: "Transport", d: "Acheminement de vos biens dans le cadre du déménagement." }
            ].map((step, i) => (
              <div key={i} className="relative p-8 bg-white rounded-3xl border border-slate-100 group hover:bg-brand-900 transition-colors duration-500">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-accent font-black text-xl mb-6 group-hover:bg-accent group-hover:text-white transition-colors mx-auto">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 group-hover:text-white transition-colors">{step.t}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed group-hover:text-slate-300 transition-colors">{step.d}</p>
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
              <h2 className="text-3xl font-bold text-brand-900">Cartons de déménagement à Paris : préparer son projet avec méthode</h2>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                Déménager à Paris présente des défis logistiques uniques. Le manque d'espace fréquent dans les appartements parisiens impose une organisation méthodique. Nous vous conseillons de trier vos biens avant d'emballer et de bien répartir le poids dans vos cartons pour faciliter le passage par les étages ou ascenseurs réduits.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Une préparation progressive avant le jour J reste la meilleure stratégie pour un déménagement sans stress. Marne Transdem vous accompagne pour que chaque carton soit prêt selon les besoins de votre projet.
              </p>
            </div>
            <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img 
                src="/images/cartons-demenagement-paris.jpg" 
                alt="Préparation de cartons Paris" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Intermédiaire */}
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-accent/10 blur-[100px]"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">Besoin de cartons ou de matériel ?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez votre projet et choisissez une solution adaptée à votre volume, vos biens et votre niveau d’accompagnement.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20">
              Demander mon devis
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
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
              { t: "Accompagnement pro", d: "Un suivi de proximité et une expertise dédiée à la protection de vos biens." },
              { t: "Conseil sur la préparation", d: "Nous vous guidons sur les meilleures méthodes d'emballage." },
              { t: "Organisation claire", d: "Une planification étape par étape pour une transition sereine." },
              { t: "Protection soignée", d: "Utilisation rigoureuse de matériels de protection professionnels." },
              { t: "Formules adaptées", d: "Des formules adaptées selon votre budget et vos besoins." },
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
            <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center text-balance">Questions fréquentes cartons et matériel</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
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
           <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-center md:text-left">
              <Link to="/demande-de-devis" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2 text-sm">Devis</h4>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Estimation personnalisée.</p>
              </Link>
              <Link to="/formules-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2 text-sm">Formules</h4>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Toutes nos prestations.</p>
              </Link>
              <Link to="/demenagement-particuliers-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2 text-sm">Particuliers</h4>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Accompagnement foyer.</p>
              </Link>
              <Link to="/demenagement-entreprises-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2 text-sm">Entreprises</h4>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Transfert professionnel.</p>
              </Link>
              <Link to="/emballage-protection-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2 text-sm text-balance">Emballage et protection</h4>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Soin et préservation.</p>
              </Link>
              <Link to="/contact" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2 text-sm">Contact</h4>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Parlons de votre projet.</p>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Cartons;
