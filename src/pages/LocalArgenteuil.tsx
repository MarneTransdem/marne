import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalArgenteuil: React.FC = () => {
  const path = "/demenagement-argenteuil";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités d'un déménagement à Argenteuil ?", 
      a: "Argenteuil est une ville dense, riche en habitations diverses, de l'ancien au moderne. Nous adaptons notre logistique en fonction de l'accessibilité de votre adresse, avec une expertise dans la gestion des parkings et des accès complexes notamment pour les résidences." 
    },
    { 
      q: "Comment Marne Transdem gère le stationnement à Argenteuil (95100) ?", 
      a: "Nous effectuons les démarches administratives pour l'Autorisation d'Occupation Temporaire (AOT) à la Mairie d'Argenteuil et installons la signalétique 48h à l'avance pour garantir l'emplacement de nos véhicules et monte-meubles." 
    },
    { 
      q: "Proposez-vous des services pour le transfert de locaux professionnels à Argenteuil ?", 
      a: "Oui, nous accompagnons les entreprises, bureaux et commerces pour leur déménagement à Argenteuil, en proposant une logistique rigoureuse pour minimiser l'interruption de votre activité." 
    },
    { 
      q: "Comment planifier mon chiffrage gratuit pour un projet à Argenteuil ?", 
      a: "Contactez-nous par téléphone ou via notre formulaire de demande en ligne. Nous organiserons rapidement une visite technique (sur site ou en visio) afin d'évaluer vos besoins et les contraintes d'accès, et vous transmettrons un devis ferme sous 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Bezons", l: "/demenagement-bezons" },
    { n: "Sartrouville", l: "/demenagement-sartrouville" },
    { n: "Val-d'Oise (95)", l: "/demenagement-val-d-oise" },
    { n: "Hauts-de-Seine (92)", l: "/demenagement-hauts-de-seine" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Argenteuil | Appartements & Bureaux | Marne Transdem"
        description="Besoin d'un déménageur à Argenteuil (95100) ? Marne Transdem gère vos déménagements de maisons, appartements, bureaux et commerces. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Argenteuil", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Argenteuil (95)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Argenteuil</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Déménagements d’appartements, maisons, bureaux et commerces à proximité de Paris et des Hauts-de-Seine. expertise locale pour une transition sereine.
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
                Votre déménageur <span className="text-accent italic">à Argenteuil</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Argenteuil est une ville en pleine mutation, offrant un cadre de vie dynamique à deux pas de Paris et des Hauts-de-Seine. Qu'il s'agisse de quartiers historiques ou de zones d'activités, votre déménagement dans cette commune demande une préparation rigoureuse.
                </p>
                <p>
                  Chez <strong>Marne Transdem</strong>, nous connaissons le terrain argenteuillais. Nous anticipons les contraintes d'accès propres à chaque adresse pour vous proposer des solutions de déménagement personnalisées : véhicules adaptés, usage de monte-meubles, gestion administrative du stationnement.
                </p>
                <p>
                  Que vous soyez un particulier emménageant dans un nouvel appartement ou une entreprise transférant ses locaux, nos équipes assurent une transition sans faille, de l'emballage sécurisé à l'installation finale.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/camion-demenagement-95.jpg" 
                  alt="Déménagement à Argenteuil" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">d'Argenteuil</span></h2>
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

      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Argenteuil</span></h2>
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

export default LocalArgenteuil;
