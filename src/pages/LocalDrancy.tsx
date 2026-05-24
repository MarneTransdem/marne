import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalDrancy: React.FC = () => {
  const path = "/demenagement-drancy";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités d'un déménagement résidentiel à Drancy ?", 
      a: "Drancy offre un habitat varié, avec de nombreux pavillons et résidences. La gestion du volume et des accès est primordiale. Marne Transdem réalise une visite technique pour optimiser le chargement et anticiper les contraintes de circulation ou de stationnement." 
    },
    { 
      q: "Comment Marne Transdem gère la demande de stationnement à Drancy (93700) ?", 
      a: "Nous prenons en charge la demande d'Autorisation d'Occupation Temporaire (AOT) auprès de la Mairie de Drancy pour votre véhicule de déménagement ou votre monte-meuble. Nous posons également la signalétique nécessaire 48h avant le jour J." 
    },
    { 
      q: "Proposez-vous une gestion optimisée du volume pour mon déménagement à Drancy ?", 
      a: "Oui, c'est notre spécialité. Grâce à notre visite technique, nous évaluons précisément le volume de vos biens pour vous proposer le véhicule le plus adapté, évitant les allers-retours inutiles et optimisant le coût de votre déménagement." 
    },
    { 
      q: "Comment réserver une estimation gratuite pour mon projet à Drancy ?", 
      a: "Appelez-nous directement ou utilisez notre formulaire de demande en ligne. Nous organiserons rapidement une visite technique (sur site ou en visio) afin d'étudier les particularités de votre logement et accès, et vous transmettre une offre précise sous 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Bobigny", l: "/demenagement-bobigny" },
    { n: "Le Blanc-Mesnil", l: "/demenagement-le-blanc-mesnil" },
    { n: "Bondy", l: "/demenagement-bondy" },
    { n: "Aulnay-sous-Bois", l: "/demenagement-aulnay-sous-bois" },
    { n: "Noisy-le-Sec", l: "/demenagement-noisy-le-sec" },
    { n: "Seine-Saint-Denis (93)", l: "/demenagement-seine-saint-denis" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Drancy | Maisons & Résidences | Marne Transdem"
        description="Besoin d'un déménageur à Drancy (93700) ? Marne Transdem gère vos déménagements de maisons et résidences avec une gestion optimisée du volume. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Drancy", item: path }
          ])
        ]}
      />

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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Drancy (93)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Drancy</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Gestion optimisée du volume pour vos déménagements de maisons et résidences à Drancy. Un service expert pour une transition maîtrisée.
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

      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre déménageur <span className="text-accent italic">à Drancy</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Drancy est une commune dynamique en pleine transformation urbaine, avec une mosaïque d'habitats allant du pavillonnaire historique aux grands ensembles résidentiels modernes. Cette diversité demande une approche personnalisée pour chaque déménagement.
                </p>
                <p>
                  Déménager à Drancy implique de jongler entre rues historiques parfois étroites et grandes voies de circulation. Notre expertise réside dans notre capacité à optimiser le volume pour limiter les trajets et sécuriser le chargement, quel que soit votre type de logement.
                </p>
                <p>
                  <strong>Marne Transdem</strong> intervient avec des moyens logistiques adaptés et une connaissance fine du terrain drancéen. Nous assurons la protection minutieuse de vos biens, depuis l'emballage jusqu'à l'installation dans votre nouveau foyer, en respectant les contraintes logistiques inhérentes à votre adresse.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-drancy-93.jpg" 
                  alt="Déménagement à Drancy" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">       
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Drancy</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
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

      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Drancy</span></h2>
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

export default LocalDrancy;
