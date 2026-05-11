import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, Building2, Truck, Calculator, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT, MARNE_CITIES } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalEpernay: React.FC = () => {
  const path = "/demenagement-epernay";
  
  const faqs = [
    { 
      q: "Déménagez-vous dans les vignobles autour d'Épernay ?", 
      a: "Oui, Marne Transdem intervient à Épernay mais aussi dans toutes les communes environnantes comme Ay-Champagne, Pierry, Avize et Magenta." 
    },
    { 
      q: "Quel est le délai pour obtenir un devis de déménagement à Épernay ?", 
      a: "Nous nous engageons à vous fournir un devis gratuit sous 24h à 48h après une visite technique ou une évaluation à distance." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Épernay (51) | Marne Transdem"
        description="Votre déménageur à Épernay. Services professionnels pour particuliers et transferts de bureaux. Demandez votre devis gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Épernay", item: path }
          ])
        ]}
      />

      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-8 leading-[1.1] tracking-tight">
              Déménagement à <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Épernay (51)</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-500 mb-12 font-light">
              Marne Transdem est votre partenaire local pour un déménagement réussi dans la capitale du Champagne. Professionnalisme et rigueur au service de votre projet.
            </p>
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-lg inline-flex items-center gap-3 transition-all">
              Obtenir mon devis Épernay
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-12">Expertise locale à Épernay</h2>
           <div className="prose prose-lg prose-slate max-w-none text-slate-500 font-light leading-relaxed">
             <p>
               Situé au cœur de la Marne, Épernay présente des spécificités liées à son relief et à son architecture. Que vous déménagiez dans le centre historique ou dans les quartiers résidentiels, Marne Transdem adapte ses services.
             </p>
             <p>
               Nous gérons la protection de vos objets fragiles et le démontage de vos meubles. Pour les accès complexes, nos monte-meubles assurent un transfert sécurisé même pour les étages élevés.
             </p>
           </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">Autres secteurs :</h3>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500">
             {MARNE_CITIES.filter(c => c.name !== 'Épernay').map(c => (
               <Link key={c.name} to={c.path} className="hover:text-accent transition-colors">Déménagement {c.name}</Link>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalEpernay;
