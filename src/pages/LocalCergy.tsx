import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalCergy: React.FC = () => {
  const path = "/demenagement-cergy";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités d'un déménagement à Cergy ?", 
      a: "Cergy est une ville moderne et dynamique, associant des zones résidentielles denses à des zones d'affaires d'envergure. Nous adaptons parfaitement notre logistique (types de camions, monte-meubles, technicité) aux spécificités de votre adresse de départ et d'arrivée." 
    },
    { 
      q: "Comment gère-t-on le stationnement pour un déménagement à Cergy (95000) ?", 
      a: "Nous effectuons les demandes réglementaires d'Autorisation d'Occupation Temporaire (AOT) auprès de la Mairie de Cergy ou de la Communauté d'Agglomération de Cergy-Pontoise. La signalétique requise est déposée sous 48h afin de sécuriser l'emplacement de nos véhicules de déménagement." 
    },
    { 
      q: "Proposez-vous des services de transfert d'entreprise à Cergy-Pontoise ?", 
      a: "Oui, tout à fait. Qu'il s'agisse de bureaux de direction, d'un commerce, d'un parc informatique complexe ou de matériel lourd, nos équipes spécialisées en transfert industriel et de bureaux assurent une transition transparente avec un planning de transfert strict afin de maintenir votre activité." 
    },
    { 
      q: "Comment puis-je programmer une estimation gratuite pour mon projet à Cergy ?", 
      a: "Prenez contact avec nos conseillers par téléphone ou via notre formulaire de demande en ligne. Nous fixons rapidement une visite technique (sur site ou à distance en visio) afin d'évaluer le volume précis et les accès techniques, puis vous transmettons un devis ferme et définitif dans les 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Pontoise", l: "/demenagement-pontoise" },
    { n: "Argenteuil", l: "/demenagement-argenteuil" },
    { n: "Conflans-Sainte-Honorine", l: "/demenagement-conflans-sainte-honorine" },
    { n: "Val-d'Oise (95)", l: "/demenagement-val-d-oise" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Cergy | Particuliers & Bureaux | Marne Transdem"
        description="Cherchez-vous un déménageur à Cergy (95000) ? Marne Transdem accompagne vos projets de déménagement de maisons, d'appartements et de locaux d'entreprises à Cergy-Pontoise."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Cergy", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white font-sans">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <MapPin size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Cergy (95)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Cergy</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Accompagnement des projets de déménagement résidentiels et professionnels dans l’agglomération de Cergy-Pontoise. de l'emballage à la mise en place finale.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander mon chiffrage gratuit
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

      {/* Content Section */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre déménageur <span className="text-accent italic">à Cergy-Pontoise</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Avec un développement urbain soutenu et un écosystème commercial important, l'agglomération de **Cergy-Pontoise** attire constamment de nouvelles familles et entreprises. Pour que votre déménagement y soit synonyme d'efficacité, il est crucial de faire appel à un prestataire maîtrisant le territoire.
                </p>
                <p>
                  Chez **Marne Transdem**, nous prenons en charge l'ensemble des particularités de votre déménagement à Cergy : l'autorisation de stationnement auprès de la commune, l'utilisation de nos monte-meubles récents pour les résidences de grande hauteur, et la mise à disposition d'emballages professionnels de haute résistance.
                </p>
                <p>
                  Que vous réalisiez un déménagement de pavillon, d'un appartement de standing ou un transfert de locaux d'entreprises, nous nous adaptons à vos contraintes de temps, de volume et budgétaires grâce à nos formules de déménagement sur-mesure.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/camion-demenagement-95.jpg" 
                  alt="Déménagement à Cergy" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maillage / Santeé de liaison */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">       
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Cergy</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {nearbySectors.map((s, i) => (
              s.l ? (
                <Link key={i} to={s.l} className="bg-white p-6 rounded-2xl border border-slate-100 group hover:border-accent hover:shadow-lg transition-all text-center shadow-sm">
                  <span className="font-bold text-brand-900 group-hover:text-accent transition-colors text-xs uppercase tracking-wider">{s.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-white/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center opacity-60">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">{s.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Cergy</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
                <h4 className="text-lg font-bold text-brand-900 mb-4 flex items-start gap-4 tracking-tight uppercase">
                  <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-4 border-accent/20 text-justify">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalCergy;
