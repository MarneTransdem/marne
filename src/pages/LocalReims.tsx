import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, Info, HelpCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT, MARNE_CITIES } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalReims: React.FC = () => {
  const path = "/demenagement-reims";
  
  const faqs = [
    { 
      q: "Quel est le prix d'un déménagement à Reims ?", 
      a: "Le prix varie selon le volume, l'accessibilité et la formule choisie. Marne Transdem propose des devis gratuits et précis sous 24-48h pour vos projets à Reims et dans la Marne." 
    },
    { 
      q: "Intervenez-vous dans toute l'agglomération de Reims ?", 
      a: "Oui, nous couvrons Reims (51100) ainsi que les communes membres du Grand Reims comme Tinqueux, Bétheny, Cormontreuil, Saint-Brice-Courcelles et Bezannes." 
    },
    { 
      q: "Proposez-vous un service de monte-meuble à Reims ?", 
      a: "Oui, pour les immeubles sans ascenseur ou les accès étroits en centre-ville de Reims, nous mettons à disposition des monte-meubles avec technicien." 
    },
    { 
      q: "Comment réserver une place de stationnement à Reims pour mon déménagement ?", 
      a: "Marne Transdem s'occupe des démarches administratives auprès de la mairie de Reims pour obtenir les autorisations de stationnement nécessaires le jour J." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Reims (51) | Devis Gratuit | Marne Transdem"
        description="Spécialiste du déménagement à Reims et dans la Marne. Déménageur pour particuliers et entreprises. Devis gratuit en ligne, garde-meuble et monte-meuble."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Reims", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors text-slate-300">Secteurs</Link>
              <span>/</span>
              <span className="text-accent">Reims</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm mb-8 border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-900">Déménagement Reims & Grand Reims</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-8 leading-[1.1] tracking-tight">
              Déménageur à <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Reims (51)</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl">
              Marne Transdem accompagne votre installation ou votre départ de la Cité des Sacres. Une expertise reconnue pour un déménagement sans stress dans toute la Marne.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/demande-de-devis" 
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-lg flex items-center justify-center gap-3 group transition-all"
              >
                Calculer mon devis Reims
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections - Simplified for briefness but SEO rich */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Votre partenaire de confiance pour déménager à Reims
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Réussir son déménagement à <span className="font-bold text-slate-700">Reims</span> demande une connaissance parfaite du terrain. Des quartiers historiques du centre-ville, comme la Cathédrale ou Saint-Remi, aux zones plus accessibles de <span className="font-bold text-slate-700">Bezannes</span> ou Cormontreuil, nous adaptons nos moyens logistiques à chaque situation.
                </p>
                <p>
                  Notre équipe gère pour vous les spécificités rémoises : demandes d'autorisation de stationnement auprès de la voirie, gestion des rues pavées du centre, et utilisation de <span className="font-bold text-slate-700">monte-meuble</span> si votre cage d'escalier ne permet pas le passage de vos biens les plus volumineux.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1590059239841-a9c049008985?auto=format&fit=crop&q=80&w=800" 
                alt="Vue de Reims" 
                className="rounded-[3rem] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Marne focus */}
      <section className="py-24 bg-brand-900 text-white text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Déménagez à Reims en toute sérénité</h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">Contactez Marne Transdem pour une estimation gratuite et personnalisée.</p>
          <div className="flex flex-wrap justify-center gap-6">
             <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all">
               Devis gratuit en ligne
             </Link>
             <Link to="/secteurs-desservis" className="bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/10">
               Tous nos secteurs
             </Link>
          </div>
        </div>
      </section>

      {/* Maillage local */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Nous intervenons aussi à :</h3>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500">
             {MARNE_CITIES.filter(c => c.name !== 'Reims').map(c => (
               <Link key={c.name} to={c.path} className="hover:text-accent transition-colors">Déménagement {c.name}</Link>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalReims;
