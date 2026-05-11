import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, Building2, Truck, Star, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT, MARNE_CITIES } from '../constants';

const LocalMarne: React.FC = () => {
  const path = "/demenagement-marne";
  
  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Marne (51) | Reims, Châlons, Épernay | Marne Transdem"
        description="Besoin d'un déménageur dans la Marne ? Reims, Épernay, Châlons-en-Champagne. Devis gratuit sous 24h. Marne Transdem vous accompagne pour votre projet."
        canonical={path}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590059239841-a9c049008985?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménageur <br/>
              <span className="text-accent italic">Marne (51)</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light italic leading-relaxed max-w-3xl">
              Marne Transdem est le spécialiste du déménagement dans le 51. De Reims à Châlons, en passant par Épernay et Vitry-le-François, nous assurons une prestation premium pour vos biens.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
               <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 transition-all italic">
                 Devis gratuit Marne
                 <ArrowRight size={22} />
               </Link>
               <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 backdrop-blur-sm italic">
                 {CONTACT.phone}
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Villes Main Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-6xl font-black text-brand-900 mb-6 uppercase italic underline decoration-accent/20 underline-offset-8">Villes desservies dans le 51</h2>
             <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto italic">Nous intervenons dans toutes les communes de la Marne pour vos déménagements locaux ou vers d'autres régions.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MARNE_CITIES.map((city, i) => (
              <Link 
                key={i} 
                to={city.path}
                className="group p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-brand-900 group-hover:bg-accent transition-colors">
                      <MapPin size={24} />
                   </div>
                   <ArrowRight size={20} className="text-slate-300 group-hover:text-accent group-hover:translate-x-2 transition-all" />
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-2 uppercase italic tracking-tight">{city.name}</h3>
                <p className="text-slate-500 text-sm italic font-light">Estimation gratuite pour votre déménagement à {city.name} et environs.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Pourquoi choisir Marne Transdem ?</h2>
               <div className="space-y-8">
                  {[
                    { t: "Réactivité Marne", d: "Une équipe mobile capable d'intervenir rapidement dans tout le 51.", i: Clock },
                    { t: "Expertise Technique", d: "Monte-meubles et matériel de protection de pointe pour vos biens.", i: ShieldCheck },
                    { t: "Accompagnement local", d: "Connaissance parfaite du Grand Reims et des zones rurales de la Marne.", i: Star }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                       <div className="shrink-0 w-14 h-14 bg-brand-900 text-accent rounded-2xl flex items-center justify-center">
                          <item.i size={28} />
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-brand-900 mb-2 italic tracking-tight uppercase">{item.t}</h4>
                          <p className="text-slate-500 font-light italic leading-relaxed">{item.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative">
               <img src="https://images.unsplash.com/photo-1541819172233-ea843c08cd49?auto=format&fit=crop&q=80&w=800" alt="Déménagement professionnel Marne" className="rounded-[4rem] shadow-2xl grayscale-[20%]" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-accent text-brand-900 text-center">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl md:text-6xl font-black mb-8 italic uppercase tracking-tight underline decoration-white/20 underline-offset-8">Prêt à déménager ?</h2>
           <p className="text-xl mb-12 max-w-2xl mx-auto italic font-light">Contactez-nous pour une visite technique gratuite et sans engagement dans la Marne.</p>
           <Link to="/demande-de-devis" className="bg-brand-900 text-white px-12 py-6 rounded-full font-black text-xl hover:shadow-2xl transition-all italic">
              Demander mon devis gratuit
           </Link>
        </div>
      </section>
    </div>
  );
};

export default LocalMarne;
