import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalSaintDenis: React.FC = () => {
  const path = "/demenagement-saint-denis";
  
  const faqs = [
    { 
      q: "Comment Marne Transdem gère-t-elle les accès complexes à Saint-Denis ?", 
      a: "Saint-Denis présente une grande diversité architecturale, des résidences modernes avec ascenseurs aux secteurs anciens avec escaliers étroits ou rues piétonnes. Nos équipes réalisent une visite technique d'estimation gratuite pour valider les accès, anticiper les interdictions de stationnement en centre-ville et définir si l'usage d'un monte-meuble est requis pour sécuriser votre déménagement." 
    },
    { 
      q: "Quelle est la procédure pour l'autorisation de stationnement à Saint-Denis (93200) ?", 
      a: "L'occupation de la voirie (camion et/ou monte-meuble) nécessite une Autorisation d'Occupation Temporaire (AOT) délivrée par les services de voirie de la Mairie de Saint-Denis. Cette demande doit être déposée dans un délai suffisant (souvent 10 à 15 jours). Marne Transdem prend en charge l'intégralité du dossier administratif et installe la signalétique réglementaire 48h avant votre opération." 
    },
    { 
      q: "Proposez-vous des services de transfert pour les bureaux et locaux professionnels à Saint-Denis ?", 
      a: "Tout à fait. Nous sommes spécialisés dans le transfert de bureaux, commerces et locaux industriels à Saint-Denis. Nous adaptons la logistique pour garantir une continuité d'activité, en planifiant les interventions sur vos horaires de fermeture ou en week-end si nécessaire, avec une protection spécifique pour votre matériel informatique et mobilier professionnel." 
    },
    { 
      q: "Comment obtenir un devis gratuit pour mon projet de déménagement à Saint-Denis ?", 
      a: "Contactez-nous directement par téléphone ou via notre formulaire de demande en ligne. Un expert Marne Transdem se déplacera à votre adresse à Saint-Denis (ou via visio-conférence) pour évaluer précisément le volume, la fragilité des biens et les conditions d'accès, afin de vous remettre un chiffrage contractuel sous 24h, sans aucun engagement." 
    }
  ];

  const nearbySectors = [
    { n: "Paris 18e", l: "/demenagement-paris-18" },
    { n: "Aubervilliers", l: "/demenagement-aubervilliers" },
    { n: "St-Ouen", l: "/demenagement-saint-ouen" },
    { n: "Pantin", l: "/demenagement-pantin" },
    { n: "La Courneuve", l: "/demenagement-la-courneuve" },
    { n: "Seine-Saint-Denis (93)", l: "/demenagement-seine-saint-denis" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Saint-Denis | Bureaux & Locaux Pros | Marne Transdem"
        description="Besoin d'un déménageur à Saint-Denis (93200) ? Marne Transdem gère vos déménagements de bureaux et locaux professionnels avec expertise. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Saint-Denis", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Saint-Denis (93)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Saint-Denis</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Déménagements de bureaux et locaux professionnels à Saint-Denis. Expertise logistique pour gérer le volume et sécuriser vos accès en toute sérénité.
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
                Votre déménageur <span className="text-accent italic">à Saint-Denis</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Ville en pleine transformation, Saint-Denis est un pôle majeur de l'économie francilienne, avec une forte densité de bureaux, d'activités commerciales et un riche tissu résidentiel.
                </p>
                <p>
                  Réussir son déménagement à Saint-Denis exige une parfaite connaissance du terrain : anticipation des zones de circulation réglementées, gestion des stationnements lors des grands événements, et sécurisation des accès pour les immeubles tertiaires ou résidentiels.
                </p>
                <p>
                  <strong>Marne Transdem</strong> met à votre service son expertise des déménagements de bureaux et de particuliers. Nous étudions avec minutie le volume et les accès spécifiques de votre site pour vous proposer une solution de transport sécurisée, rapide et optimisée.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-saint-denis-93.jpg" 
                  alt="Déménagement à Saint-Denis" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Saint-Denis</span></h2>
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Saint-Denis</span></h2>
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

export default LocalSaintDenis;
