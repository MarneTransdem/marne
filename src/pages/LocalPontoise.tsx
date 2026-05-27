import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalPontoise: React.FC = () => {
  const path = "/demenagement-pontoise";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités d'un déménagement à Pontoise ?", 
      a: "Pontoise est une ville historique d'art et d'histoire, caractérisée par ses ruelles pittoresques, ses voies pavées et ses bâtiments anciens. Cela nécessite une excellente planification logistique : repérages des stationnements étroits, usage de monte-meubles adaptés et protection rigoureuse de l'environnement lors de la manutention." 
    },
    { 
      q: "Comment gère-t-on le stationnement pour un déménagement à Pontoise (95300) ?", 
      a: "Nous prenons en charge les demandes d'Autorisation d'Occupation Temporaire (AOT) auprès des services municipaux de la Mairie de Pontoise. Nous posons les panneaux de réservation d'emplacement réglementaires 48h à l'avance afin de sécuriser l'accès pour nos techniciens et camions." 
    },
    { 
      q: "Proposez-vous du transfert de bureaux et de commerces à Pontoise ?", 
      a: "Oui, Marne Transdem dispose d'un pôle dédié aux transferts d'entreprises, locaux commerciaux, et administrations à Pontoise. Nous établissons un calendrier d'intervention précis pour minimiser au mieux l'inactivité de vos collaborateurs." 
    },
    { 
      q: "Comment programmer une estimation ou visite technique gratuite à Pontoise ?", 
      a: "Contactez notre équipe par téléphone ou via notre formulaire de contact dédié. Nous programmons une visite technique gratuite (sur place ou en visio-conférence selon vos préférences) pour évaluer le volume de mobilier et relever les accès techniques, afin de vous remettre votre devis définitif sous 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Cergy", l: "/demenagement-cergy" },
    { n: "Conflans-Sainte-Honorine", l: "/demenagement-conflans-sainte-honorine" },
    { n: "Val-d'Oise (95)", l: "/demenagement-val-d-oise" },
    { n: "Yvelines (78)", l: "/demenagement-yvelines" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Pontoise | Particuliers & Entreprises | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Pontoise (95300) ? Marne Transdem gère vos déménagements résidentiels et transferts de locaux pro à Pontoise. Devis Offert."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Pontoise", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Pontoise (95)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Pontoise</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Organisation des déménagements de particuliers et d’entreprises à Pontoise selon les accès, le volume et la formule. l'assurance d'un service soigné.
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
                Votre déménageur <span className="text-accent italic">à Pontoise</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Pontoise, ville d’art et d'histoire, offre un cadre de vie prestigieux tout en présentant des caractéristiques d'accès spécifiques : ruelles pavées, habitations anciennes, immeubles dépourvus d'ascenseur... Confier son projet de transport de biens à un déménageur qualifié est capital.
                </p>
                <p>
                  Chez **Marne Transdem**, nous préparons méticuleusement votre aménagement à Pontoise. Nous anticipons toutes les composantes techniques : demande d'autorisation d'occupation temporaire pour le stationnement, déploiement d’un monte-meuble si nécessaire, et sélection d'un véhicule adapté de taille compacte pour les accès contraints.
                </p>
                <p>
                  Nous proposons plusieurs formules personnalisées (économique, standard ou luxe) s'adaptant à l'ensemble des besoins des particuliers et des professionnels, facilitant votre transition en Île-de-France.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/camion-demenagement-95.jpg" 
                  alt="Déménagement à Pontoise" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobilité Connexe / Maillage */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">       
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Pontoise</span></h2>
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Pontoise</span></h2>
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

export default LocalPontoise;
