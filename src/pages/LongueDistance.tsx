import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, TrendingUp, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LongueDistance: React.FC = () => {
  const path = "/demenagement-longue-distance";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement longue distance depuis Paris ?", 
      a: "Un déménagement longue distance depuis Paris demande d'anticiper le volume, les accès au départ et à l'arrivée, la distance, les cartons, les meubles volumineux, les objets fragiles et la formule souhaitée. Marne Transdem vous accompagne pour préparer une organisation adaptée à votre projet." 
    },
    { 
      q: "Marne Transdem propose-t-elle des déménagements depuis l’Île-de-France vers une autre région ?", 
      a: "Oui, Marne Transdem accompagne des projets de déménagement depuis Paris ou l’Île-de-France vers d'autres destinations en France selon les besoins, le volume, les accès et l’organisation du projet." 
    },
    { 
      q: "Comment estimer le volume pour un déménagement longue distance ?", 
      a: "Vous pouvez utiliser le calculateur de volume pour obtenir une première estimation indicative. Le volume réel peut ensuite être affiné selon votre inventaire, les dimensions des meubles, les cartons et les conditions d'accès." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement longue distance ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Peut-on prévoir un garde-meuble lors d’un déménagement longue distance ?", 
      a: "Oui, une solution de stockage peut être utile si les dates de départ et d'arrivée ne coïncident pas, si vous réalisez des travaux ou si vous avez besoin d'une transition avant l'installation définitive." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement longue distance ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const destinations = [
    "Lyon", "Marseille", "Bordeaux", "Nice", "Toulouse", "Nantes", "Lille", "Strasbourg", "Montpellier", "Rennes", "Grenoble", "Toulon"
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement longue distance depuis Paris | Marne Transdem"
        description="Organisez votre déménagement longue distance depuis Paris ou l’Île-de-France avec Marne Transdem. Volume, emballage, transport, formules adaptées et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Longue distance", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Globe size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement longue distance</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Depuis Paris <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic">vers la France</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement longue distance depuis Paris ou l'Île-de-France vers une autre destination en France.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all">
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic">
                Préparer votre départ <br/><span className="text-accent italic">de la région parisienne</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Quitter la capitale pour une nouvelle région est une étape majeure. Marne Transdem accompagne les <span className="font-bold text-slate-700">déménagements longue distance</span> au départ de <span className="font-bold text-slate-700">Paris</span> ou de l'<span className="font-bold text-slate-700">Île-de-France</span>.
                </p>
                <p>
                  Du <span className="font-bold text-slate-700">transport des meubles</span> à la gestion des <span className="font-bold text-slate-700 text-slate-700">cartons</span> et <span className="font-bold text-slate-700">objets fragiles</span>, notre équipe organise chaque étape. Nous prenons en compte le <span className="font-bold text-slate-700">volume</span>, les <span className="font-bold text-slate-700 text-slate-700 font-bold">accès au départ</span> comme les <span className="font-bold text-slate-700">accès à l'arrivée</span>, ainsi que la <span className="font-bold text-slate-700">distance</span> pour vous fournir une <span className="font-bold text-slate-700">demande de devis</span> personnalisée et transparente.
                </p>
              </div>
            </div>
            <div className="relative group">
               <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                 <img 
                   src="/images/demenagement-longue-distance.jpg" 
                   alt="Déménagement longue distance" 
                   className="w-full h-full object-cover"
                 />
               </div>
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement longue distance demande une organisation spécifique */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight">Une logistique <span className="text-accent italic">sans frontières</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto">
              La distance impose une rigueur absolue dans la préparation et le chargement de votre patrimoine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { t: "Trajet & Sécurité", d: "Coordination du planning de transport sur plusieurs centaines de kilomètres." },
               { t: "Protection Renforcée", d: "Calage spécifique des meubles et objets fragiles pour résister aux vibrations de la route." },
               { t: "Accès multi-sites", d: "Anticipation des étages, ascenseurs et stationnement au départ et à l'arrivée." },
               { icon: Package, t: "Cartons & Inventaire", d: "Organisation du chargement pour optimiser l'espace et faciliter le déchargement." },
               { icon: Ruler, t: "Validation Volume", d: "Estimation précise pour adapter le véhicule longue distance et éviter tout imprévu." },
               { icon: Truck, t: "Moyens techniques", d: "Besoin éventuel de monte-meuble si les accès d'arrivée sont complexes." }
             ].map((item, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-accent transition-all group">
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight border-b border-slate-100 pb-4 group-hover:border-accent/20 transition-colors uppercase italic">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services pour votre déménagement longue distance */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 tracking-tight uppercase italic">Services Longue Distance</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Particuliers", d: "Déménagements depuis Paris/IDF vers une nouvelle ville.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Transferts professionnels longue distance selon vos besoins.", l: "/demenagement-entreprises-paris" },
            { t: "Emballage", d: "Protection experte des meubles et objets fragiles.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel utile pour préparer vos biens avant le départ.", l: "/cartons-demenagement-paris" },
            { t: "Garde-meuble", d: "Solution utile si vos dates ne coïncident pas.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Solution pour accès difficiles au départ ou à l'arrivée.", l: "/location-monte-meuble-paris" },
            { t: "Formules", d: "Économique, Standard et Luxe selon votre projet.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Estimation indicative du volume avant le devis.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest">{s.t}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed italic">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                Info Service <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement de particuliers longue distance */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative">
               <img src="/images/equipe-demenageur-longue-distance.jpg" alt="Particulier Longue Distance" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic">Déménagement de particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les familles, actifs et retraités qui quittent <span className="font-bold text-slate-700 tracking-tight">Paris</span> ou l'<span className="font-bold text-slate-700 tracking-tight">Île-de-France</span> pour une nouvelle vie en province.
                </p>
                <p>
                   Que vous déménagiez d'un <span className="font-bold text-slate-700 tracking-tight">appartement</span>, d'une <span className="font-bold text-slate-700 tracking-tight">maison</span> ou d'un <span className="font-bold text-slate-700 tracking-tight">logement familial</span>, nous gérons la logistique de votre projet. Mutation professionnelle, rapprochement familial ou changement de résidence, nous adaptons la <span className="font-bold text-slate-700 tracking-tight">formule</span> à vos besoins (cartons, protection des meubles, volume, accès).
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
                Demander mon devis longue distance <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises longue distance */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2">
               <div className="aspect-video bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white p-2">
                  <img src="/images/demenagement-longue-distance-camion.jpg" alt="Entreprise Longue Distance" className="w-full h-full object-cover rounded-[2rem]" />
               </div>
             </div>
             <div className="lg:w-1/2 space-y-8">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic">Transferts d'entreprises</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Nous accompagnons les transferts longue distance pour les <span className="font-bold text-slate-700">bureaux</span>, <span className="font-bold text-slate-700">agences</span> et <span className="font-bold text-slate-700">professions libérales</span>.
                 </p>
                 <p>
                    Manutention du <span className="font-bold text-slate-700">mobilier de bureau</span>, des archives et du matériel informatique avec un planning rigoureux pour assurer la <span className="font-bold text-slate-700 tracking-tight">continuité de votre activité</span> lors du transfert vers une nouvelle région. Stockage temporaire possible si besoin.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Depuis Paris ou l’Île-de-France vers la France */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative font-sans">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Vers les grandes villes de France</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            <Link to="/demenagement-paris-lyon" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Lyon</span>
            </Link>
            <Link to="/demenagement-paris-marseille" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Marseille</span>
            </Link>
            <Link to="/demenagement-paris-bordeaux" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Bordeaux</span>
            </Link>
            <Link to="/demenagement-paris-toulouse" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Toulouse</span>
            </Link>
            <Link to="/demenagement-paris-nantes" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Nantes</span>
            </Link>
            <Link to="/demenagement-paris-lille" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Lille</span>
            </Link>
            <Link to="/demenagement-paris-strasbourg" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Strasbourg</span>
            </Link>
            <Link to="/demenagement-paris-montpellier" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Montpellier</span>
            </Link>
            <Link to="/demenagement-paris-rennes" className="bg-white/10 border border-accent p-6 rounded-2xl hover:bg-white/20 transition-all group">
              <span className="text-accent text-[10px] font-bold block mb-2 uppercase tracking-[0.2em]">Départ Paris vers</span>
              <span className="font-black text-lg tracking-tight uppercase italic text-white group-hover:text-accent transition-colors">Rennes</span>
            </Link>
            {destinations.filter(d => d !== "Lyon" && d !== "Marseille" && d !== "Bordeaux" && d !== "Toulouse" && d !== "Nantes" && d !== "Lille" && d !== "Strasbourg" && d !== "Montpellier" && d !== "Rennes").map((city, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-accent transition-all group">
                <span className="text-white/40 text-[10px] font-bold block mb-2 uppercase tracking-[0.2em] group-hover:text-accent transition-colors">Départ Paris vers</span>
                <span className="font-black text-lg tracking-tight uppercase italic">{city}</span>
              </div>
            ))}
          </div>
          <p className="mt-16 text-slate-500 text-sm font-light italic max-w-2xl mx-auto">
             Marne Transdem organise vos déménagements au départ de Paris ou de l'Île-de-France vers n'importe quelle destination en France continentale selon le projet.
          </p>
        </div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* 8. Formules adaptées */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase">Solutions & Formules</h2>
            <p className="text-slate-500 mt-4 italic font-light italic">Le bon niveau d’accompagnement pour votre trajet.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {[
               { name: "Économique", desc: "Vous préparez vos cartons, nous gérons la manutention et le transport." },
               { name: "Standard", desc: "Une formule équilibrée pour déléguer les objets fragiles et le mobilier encombrant." },
               { name: "Luxe", desc: "Une prestation complète pour une organisation totale de votre départ longue distance." }
             ].map((formule, i) => (
               <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
                 <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase tracking-tight">{formule.name}</h3>
                 <p className="text-slate-500 font-light text-sm italic mb-10 leading-relaxed italic">{formule.desc}</p>
                 <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest hover:underline decoration-white/20">Comparer</Link>
               </div>
             ))}
          </div>
          <div className="text-center mt-20">
            <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
              Préciser vos besoins
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Volume, accès et organisation du transport */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
               <div className="space-y-8">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8 tracking-tight italic uppercase">Organisation & Logistique</h2>
                 <div className="space-y-4 text-slate-400 font-light text-lg italic leading-relaxed font-sans">
                   <p>Le devis longue distance dépend de plusieurs facteurs clés :</p>
                   <div className="grid grid-cols-2 gap-x-12 gap-y-4 pt-6 border-t border-white/5">
                     {["Volume total", "Accès départ & arrivée", "Nombre d'étages", "Besoin monte-meuble", "Niveau d'emballage", "Distance (km)"].map((item, i) => (
                       <div key={i} className="flex items-center gap-4 text-slate-300">
                         <Zap size={14} className="text-accent" />
                         <span className="text-xs font-light">{item}</span>
                       </div>
                     ))}
                   </div>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-6 pt-8">
                   <Link to="/calculateur-volume" className="inline-flex items-center gap-3 bg-accent text-brand-900 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all transition-colors group">
                     Calculateur <Calculator size={14} className="group-hover:scale-110 transition-transform" />
                   </Link>
                   <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-brand-900 transition-all transition-colors group">
                     Monte-meuble <Truck size={14} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                 </div>
               </div>
               <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md shadow-inner text-slate-300 italic font-light leading-relaxed text-sm">
                  <p className="mb-0">
                    Chaque trajet longue distance est planifié pour garantir une livraison fluide. Les accès au départ (Paris/IDF) et à l'arrivée (partout en France) sont étudiés pour adapter les moyens humains et techniques. Pas de tarif automatique : chaque projet mérite une étude personnalisée selon vos contraintes réelles.
                  </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 10. Calculateur de volume */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-12">
           <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight italic uppercase italic">Estimez votre volume</h2>
           <p className="text-slate-500 text-lg font-light leading-relaxed italic">
             Avant de demander un devis longue distance, utilisez notre calculateur de volume. Cette estimation indicative est la base de notre étude logistique.
           </p>
           <Link to="/calculateur-volume" className="inline-flex items-center gap-6 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group shadow-xl">
             <Calculator size={28} className="text-accent" />
             Accéder au calculateur de volume
             <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 11. Notre méthode en 5 étapes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Méthode <span className="text-accent italic">Longue Distance</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative">
             <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-slate-100 -z-10"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse projet", d: "Premier échange pour comprendre vos besoins." },
               { icon: Ruler, t: "Volume & Accès", d: "Estimation sur place ou à distance de la logistique." },
               { icon: Calendar, t: "Formule & Préparation", d: "Choix de la formule et organisation du départ." },
               { icon: Globe, t: "Transport Longue Distance", d: "Trajet sécurisé vers votre nouvelle adresse." },
               { icon: CheckCircle2, t: "Livraison & Installation", d: "Mise en place selon la prestation choisie." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs">{i+1}</div>
                 </div>
                 <div className="px-2">
                    <h4 className="font-bold text-brand-900 mb-3 text-sm italic tracking-tight">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider leading-relaxed italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
          <p className="mt-20 text-slate-400 text-sm font-light italic max-w-3xl mx-auto">
             Une méthode claire pour préparer votre déménagement longue distance depuis Paris ou l’Île-de-France, adapter les moyens nécessaires et choisir le niveau d’accompagnement correspondant à votre situation.
          </p>
        </div>
      </section>

      {/* 12. Déménagement depuis Paris et l’Île-de-France */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-black text-brand-900 font-display tracking-tight uppercase tracking-widest italic">Départs de la région parisienne</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center text-slate-500 mb-16">
            <Link to="/demenagement-paris-20" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Paris 20e</Link>
            <Link to="/demenagement-montreuil" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Montreuil</Link>
            <Link to="/demenagement-vincennes" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Saint-Mandé</Link>
            <Link to="/demenagement-bagnolet" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Bagnolet</Link>
            <Link to="/demenagement-hauts-de-seine" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Hauts-de-Seine</Link>
            <Link to="/demenagement-seine-saint-denis" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Seine-Saint-Denis</Link>
            <Link to="/demenagement-val-de-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Val-de-Marne</Link>
            <Link to="/demenagement-yvelines" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Yvelines</Link>
            <Link to="/demenagement-essonne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Essonne</Link>
            <Link to="/demenagement-val-d-oise" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Val-d'Oise</Link>
            <Link to="/demenagement-seine-et-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Seine-et-Marne</Link>
            <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent italic">Île-de-France</Link>
          </div>
        </div>
      </section>

      {/* 13. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic">Préparez votre départ <span className="italic underline decoration-white/20">vers votre nouvelle région</span></h2>
           <p className="text-brand-900/70 text-lg mb-10 max-w-2xl mx-auto italic font-light italic leading-relaxed">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès, votre distance et le niveau d'accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px]">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px]">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* 14. FAQ longue distance */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display uppercase tracking-tight italic">FAQ Longue Distance</h2>
           </div>
           <div className="grid grid-cols-1 gap-8">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 group hover:border-accent/40 shadow-sm transition-all italic font-sans">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight">
                   <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 15. Maillage interne final */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-6 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Demande de devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules de déménagement</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Déménagement Île-de-France</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pt-6">
            <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-all">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-all">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-all">Location monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-all">Emballage et protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-all">Cartons et matériel</Link>
            <Link to="/contact" className="hover:text-accent transition-all">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LongueDistance;
