import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, ArrowRight, Truck, Building2, Globe, Phone, CheckCircle2, 
  Home, Briefcase, Box, Ruler, Calculator, Package, HelpCircle, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const SecteursDesservis: React.FC = () => {
  const path = "/secteurs-desservis";

  const faqs = [
    { 
      q: "Dans quelles zones Marne Transdem intervient-elle ?", 
      a: "Marne Transdem accompagne les projets de déménagement à Paris, en Île-de-France et depuis la région parisienne vers d’autres destinations en France selon les besoins, le volume, les accès et l’organisation du projet." 
    },
    { 
      q: "Intervenez-vous dans tous les arrondissements de Paris ?", 
      a: "Marne Transdem accompagne les déménagements dans Paris selon les besoins du projet. Les contraintes peuvent varier selon les arrondissements : accès, étages, ascenseurs, stationnement, volume et besoin éventuel de monte-meuble." 
    },
    { 
      q: "Intervenez-vous en petite et grande couronne ?", 
      a: "Oui, Marne Transdem accompagne des déménagements en petite couronne et en grande couronne, notamment dans les départements franciliens, selon les besoins, les accès, le volume et l’organisation souhaitée." 
    },
    { 
      q: "Pouvez-vous organiser un déménagement depuis l’Île-de-France vers une autre région ?", 
      a: "Oui, certains projets de déménagement longue distance peuvent être organisés depuis Paris ou l’Île-de-France vers d’autres destinations en France selon les besoins du projet, le volume, les accès et la formule choisie." 
    },
    { 
      q: "Comment savoir si mon secteur est desservi ?", 
      a: "Vous pouvez consulter les pages locales et départementales du site, ou contacter Marne Transdem directement. Le plus simple est de remplir une demande de devis en indiquant vos adresses de départ et d’arrivée." 
    },
    { 
      q: "Comment obtenir un devis pour mon secteur ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou appeler Marne Transdem. L’estimation prend en compte vos adresses, votre volume, les accès, les étages, la distance, la formule souhaitée et les besoins complémentaires comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const secteursParis = [
    { n: "Paris 9e", p: "/demenagement-paris-9", e: true },
    { n: "Paris 10e", p: "/demenagement-paris-10", e: true },
    { n: "Paris 11e", p: "/demenagement-paris-11", e: true },
    { n: "Paris 12e", p: "/demenagement-paris-12", e: true },
    { n: "Paris 13e", p: "/demenagement-paris-13", e: true },
    { n: "Paris 14e", p: "/demenagement-paris-14", e: true },
    { n: "Paris 15e", p: "/demenagement-paris-15", e: true },
    { n: "Paris 16e", p: "/demenagement-paris-16", e: true },
    { n: "Paris 17e", p: "/demenagement-paris-17", e: true },
    { n: "Paris 18e", p: "/demenagement-paris-18", e: true },
    { n: "Paris 19e", p: "/demenagement-paris-19", e: true },
    { n: "Paris 20e", p: "/demenagement-paris-20", e: true }
  ];

  const villesProches = [
    { n: "Montreuil", p: "/demenagement-montreuil", e: true },
    { n: "Pantin", p: "/demenagement-pantin", e: true },
    { n: "Les Lilas", p: "/demenagement-les-lilas", e: true },
    { n: "Saint-Denis", p: "/demenagement-saint-denis", e: true },
    { n: "Bondy", p: "/demenagement-bondy", e: true },
    { n: "Romainville", p: "/demenagement-romainville", e: true },
    { n: "Noisy-le-Sec", p: "/demenagement-noisy-le-sec", e: true },
    { n: "Aulnay-sous-Bois", p: "/demenagement-aulnay-sous-bois", e: true },
    { n: "Drancy", p: "/demenagement-drancy", e: true },
    { n: "Bobigny", p: "/demenagement-bobigny", e: true },
    { n: "Saint-Ouen", p: "/demenagement-saint-ouen", e: true },
    { n: "Argenteuil", p: "/demenagement-argenteuil", e: true },
    { n: "Vincennes", p: "/demenagement-vincennes", e: true },
    { n: "Saint-Mandé", p: "/demenagement-saint-mande", e: true },
    { n: "Bagnolet", p: "/demenagement-bagnolet", e: true },
    { n: "Charenton-le-Pont", p: "/demenagement-charenton-le-pont", e: true },
    { n: "Nogent-sur-Marne", p: "/demenagement-nogent-sur-marne", e: true },
    { n: "Fontenay-sous-Bois", p: "/demenagement-fontenay-sous-bois", e: true },
    { n: "Créteil", p: "/demenagement-creteil", e: true },
    { n: "Maisons-Alfort", p: "/demenagement-maisons-alfort", e: true },
    { n: "Ivry-sur-Seine", p: "/demenagement-ivry-sur-seine", e: true },
    { n: "Saint-Maur-des-Fossés", p: "/demenagement-saint-maur-des-fosses", e: true },
    { n: "Saint-Maurice", p: "/demenagement-saint-maurice", e: true },
    { n: "Villejuif", p: "/demenagement-villejuif", e: true },
    { n: "Vitry-sur-Seine", p: "/demenagement-vitry-sur-seine", e: true },
    { n: "Alfortville", p: "/demenagement-alfortville", e: true },
    { n: "Le Kremlin-Bicêtre", p: "/demenagement-le-kremlin-bicetre", e: true },
    { n: "Joinville-le-Pont", p: "/demenagement-joinville-le-pont", e: true },
    { n: "Champigny-sur-Marne", p: "/demenagement-champigny-sur-marne", e: true },
    { n: "Le Perreux-sur-Marne", p: "/demenagement-le-perreux-sur-marne", e: true },
    { n: "Boulogne-Billancourt", p: "/demenagement-boulogne-billancourt", e: true },
    { n: "Neuilly-sur-Seine", p: "/demenagement-neuilly-sur-seine", e: true },
    { n: "Levallois-Perret", p: "/demenagement-levallois-perret", e: true },
    { n: "Issy-les-Moulineaux", p: "/demenagement-issy-les-moulineaux", e: true },
    { n: "Clichy", p: "/demenagement-clichy", e: true },
    { n: "Saint-Ouen", p: "/demenagement-saint-ouen", e: false },
    { n: "Courbevoie", p: "/demenagement-courbevoie", e: true },
    { n: "Puteaux", p: "/demenagement-puteaux", e: true },
    { n: "Nanterre", p: "/demenagement-nanterre", e: true },
    { n: "Suresnes", p: "/demenagement-suresnes", e: true },
    { n: "Rueil-Malmaison", p: "/demenagement-rueil-malmaison", e: true },
    { n: "Saint-Cloud", p: "/demenagement-saint-cloud", e: true },
    { n: "Meudon", p: "/demenagement-meudon", e: true },
    { n: "Clamart", p: "/demenagement-clamart", e: true },
    { n: "Châtillon", p: "/demenagement-chatillon", e: true },
    { n: "Malakoff", p: "/demenagement-malakoff", e: true },
    { n: "Montrouge", p: "/demenagement-montrouge", e: true },
    { n: "Bagneux", p: "/demenagement-bagneux", e: true },
    { n: "Fontenay-aux-Roses", p: "/demenagement-fontenay-aux-roses", e: true },
    { n: "Sceaux", p: "/demenagement-sceaux", e: true },
    { n: "Bourg-la-Reine", p: "/demenagement-bourg-la-reine", e: true },
    { n: "Antony", p: "/demenagement-antony", e: true },
    { n: "Châtenay-Malabry", p: "/demenagement-chatenay-malabry", e: true },
    { n: "Le Plessis-Robinson", p: "/demenagement-le-plessis-robinson", e: true },
    { n: "Vélizy-Villacoublay", p: "/demenagement-velizy-villacoublay", e: true },
    { n: "Viroflay", p: "/demenagement-viroflay", e: true },
    { n: "Vaucresson", p: "/demenagement-vaucresson", e: true },
    { n: "Garches", p: "/demenagement-garches", e: true },
    { n: "Marnes-la-Coquette", p: "/demenagement-marnes-la-coquette", e: true },
    { n: "Bougival", p: "/demenagement-bougival", e: true },
    { n: "Louveciennes", p: "/demenagement-louveciennes", e: true },
    { n: "Croissy-sur-Seine", p: "/demenagement-croissy-sur-seine", e: true },
    { n: "Chatou", p: "/demenagement-chatou", e: true },
    { n: "Le Vésinet", p: "/demenagement-le-vesinet", e: true },
    { n: "Le Pecq", p: "/demenagement-le-pecq", e: true },
    { n: "Marly-le-Roi", p: "/demenagement-marly-le-roi", e: true },
    { n: "Saint-Germain-en-Laye", p: "/demenagement-saint-germain-en-laye", e: true },
    { n: "Maisons-Laffitte", p: "/demenagement-maisons-laffitte", e: true },
    { n: "Houilles", p: "/demenagement-houilles", e: true },
    { n: "Conflans-Sainte-Honorine", p: "/demenagement-conflans-sainte-honorine", e: true },
    { n: "Poissy", p: "/demenagement-poissy", e: true },
    { n: "Plaisir", p: "/demenagement-plaisir", e: true },
    { n: "Guyancourt", p: "/demenagement-guyancourt", e: true },
    { n: "Sartrouville", p: "/demenagement-sartrouville", e: true },
    { n: "Rambouillet", p: "/demenagement-rambouillet", e: true },
    { n: "Mantes-la-Jolie", p: "/demenagement-mantes-la-jolie", e: true },
    { n: "Le Chesnay-Rocquencourt", p: "/demenagement-le-chesnay-rocquencourt", e: true },
    { n: "Chaville", p: "/demenagement-chaville", e: true },
    { n: "Ville-d’Avray", p: "/demenagement-ville-d-avray", e: true },
    { n: "Versailles", p: "/demenagement-versailles", e: true },
    { n: "Sèvres", p: "/demenagement-sevres", e: true },
    { n: "Vanves", p: "/demenagement-vanves", e: true }
  ];

  const departements = [
    { h: "Paris", d: "Déménagements d’appartements, studios, logements familiaux, bureaux et commerces avec une attention aux accès.", p: "/demenagement-paris", e: true },
    { h: "Hauts-de-Seine", d: "Déménagements de particuliers et d’entreprises dans les villes résidentielles de l’ouest parisien.", p: "/demenagement-hauts-de-seine", e: true },
    { h: "Seine-Saint-Denis", d: "Déménagements dans les villes proches de Paris pour appartements, maisons et bureaux.", p: "/demenagement-seine-saint-denis", e: true },
    { h: "Val-de-Marne", d: "Déménagements entre Paris, le sud-est parisien, les résidences et les locaux professionnels.", p: "/demenagement-val-de-marne", e: true },
    { h: "Yvelines", d: "Déménagements en grande couronne, avec des maisons, appartements et volumes plus importants.", p: "/demenagement-yvelines", e: true },
    { h: "Essonne", d: "Déménagements dans le sud francilien pour maisons, pavillons et projets longue distance.", p: "/demenagement-essonne", e: true },
    { h: "Val-d’Oise", d: "Déménagements dans le nord francilien, entre Paris et les communes de grande couronne.", p: "/demenagement-val-d-oise", e: true },
    { h: "Seine-et-Marne", d: "Déménagements dans l’est francilien pour maisons, familles et transferts immobiliers.", p: "/demenagement-seine-et-marne", e: true }
  ];

  const destinationsLongueDistance = [
    "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Lille", "Strasbourg", "Montpellier", "Rennes"
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Secteurs desservis | Marne Transdem"
        description="Découvrez les secteurs desservis par Marne Transdem pour votre déménagement à Paris, en Île-de-France et longue distance depuis la région parisienne."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs desservis", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white font-sans italic">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <MapPin size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Zones d’intervention</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Secteurs <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic">desservis</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les particuliers et les entreprises pour leurs projets de déménagement à Paris, en Île-de-France et depuis la région parisienne vers toute la France.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander un devis gratuit
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

      {/* 2. Introduction */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/10 underline-offset-8">
              Une entreprise de déménagement à Paris, <br/><span className="text-accent italic">active en Île-de-France</span>
            </h2>
            <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
              <p>
                Marne Transdem, basée au <span className="font-bold text-brand-900 italic tracking-tight">43 rue des Maraîchers à Paris 20e</span>, accompagne les déménagements de particuliers et d’entreprises à <span className="font-bold text-brand-900 italic tracking-tight">Paris</span>, dans les villes proches, dans les départements d’Île-de-France et pour certains projets longue distance depuis la région parisienne.
              </p>
              <p>
                Qu'il s'agisse de transférer des <span className="font-bold text-slate-700 tracking-tight italic">appartements</span>, de vastes <span className="font-bold text-slate-700 tracking-tight italic">maisons</span> ou des locaux professionnels (<span className="font-bold text-slate-700 tracking-tight italic">bureaux</span>, commerces), nous maîtrisons toutes les contraintes urbaines : gestion du volume, accès difficiles, étages élevés et stationnement complexe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section “Déménagement à Paris” */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic transition-all italic">
            <div className="space-y-8 italic transition-all transition-all">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all italic underline underline-offset-8 transition-all">Déménagement à Paris</h2>
              <p className="text-slate-500 text-lg font-light italic leading-relaxed italic italic italic italic transition-all italic italic transition-all italic transition-all">
                Marne Transdem intervient dans tout Paris, avec une expertise spécifique des contraintes urbaines propres aux immeubles anciens, escaliers étroits, ascenseurs limités et problématiques de stationnement.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 italic font-sans">
                {secteursParis.map((item, i) => (
                  <Link 
                    key={i} 
                    to={item.p}
                    className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 group hover:shadow-xl hover:border-accent transition-all italic transition-all h-full italic"
                  >
                    <span className="font-bold text-brand-900 group-hover:text-accent transition-colors italic uppercase text-xs italic tracking-widest italic italic">{item.n}</span>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[3.5rem] overflow-hidden shadow-2xl relative grayscale-[20%] transition-all h-full italic">
                <img src="/images/demenagement-paris.webp" width="600" height="800" alt="Paris Déménagement" className="w-full h-full object-cover italic transition-all grayscale-[10%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section “Déménagement dans les villes proches de Paris” */}
      <section className="py-24 font-sans italic transition-all italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic transition-all italic underline decoration-accent/20 underline-offset-8 italic transition-all font-sans italic">Villes limitrophes <span className="text-accent italic tracking-tight italic underline underline-offset-8 transition-all italic">est parisien</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto italic italic italic transition-all italic transition-all">
              Accompagnement des déménagements dans les communes proches de Paris, notamment autour du Val-de-Marne, de la Seine-Saint-Denis et de l'Est parisien.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 italic font-sans transition-all italic">
            {villesProches.map((v, i) => (
              <div key={i} className="h-full italic font-sans">
                {v.e ? (
                  <Link 
                    to={v.p}
                    className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:border-accent transition-all h-full italic transition-all font-sans text-center transition-all"
                  >
                    <span className="font-bold text-brand-900 group-hover:text-accent transition-colors italic uppercase text-[10px] tracking-widest italic italic">{v.n}</span>
                  </Link>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 bg-white/50 rounded-2xl border border-slate-50 h-full italic transition-all font-sans text-center opacity-60 grayscale-[50%] transition-all italic">
                    <span className="font-bold text-slate-400 italic uppercase text-[10px] tracking-widest italic italic">{v.n}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section “Déménagement dans les départements d’Île-de-France” */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic font-sans italic">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all italic font-sans italic transition-all">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 lowercase italic tracking-tight italic italic italic italic underline underline-offset-8 transition-all italic underline italic italic underline-offset-8 transition-all transition-all italic font-sans">Départements <span className="text-accent italic tracking-tight italic italic underline underline-offset-8 transition-all transition-all italic font-sans italic">franciliens</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
            {departements.map((d, i) => (
              <Link 
                key={i} 
                to={d.p}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-accent hover:shadow-2xl transition-all group flex flex-col justify-between h-full italic font-sans italic italic transition-all italic transition-all"
              >
                <div>
                   <h3 className="text-xl font-black text-brand-900 mb-4 uppercase italic tracking-tight italic italic italic italic transition-all italic transition-all italic group-hover:text-accent transition-colors italic font-sans italic transition-all">{d.h}</h3>
                   <p className="text-slate-500 text-[11px] font-light leading-relaxed italic opacity-80 mb-8 italic italic italic transition-all italic transition-all font-sans italic transition-all italic">{d.d}</p>
                </div>
                <div className="text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic italic transition-all italic italic transition-all font-sans italic transition-all italic">
                   Voir le secteur <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section “Déménagement longue distance depuis Paris ou l’Île-de-France” */}
      <section className="py-24 bg-brand-900 text-white font-sans italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic font-sans italic transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic italic italic italic transition-all italic h-full transition-all italic transition-all italic transition-all italic transition-all">
            <div className="space-y-10 italic transition-all transition-all italic transition-all">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic italic italic transition-all italic transition-all transition-all italic transition-all italic">Province <br/><span className="text-accent italic transition-all italic transition-all italic">Longue distance</span></h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic italic italic italic italic transition-all italic italic transition-all italic transition-all italic transition-all italic">
                <p>
                  Marne Transdem accompagne vos projets de déménagement depuis <span className="text-white font-bold italic tracking-tight transition-all">Paris ou l'Île-de-France</span> vers toute la province selon vos besoins.
                </p>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-6 italic font-sans italic italic transition-all italic transition-all italic transition-all transition-all italic transition-all">
                  {[
                    { n: "Lyon", l: "/demenagement-paris-lyon" },
                    { n: "Marseille", l: "/demenagement-paris-marseille" },
                    { n: "Bordeaux", l: "/demenagement-paris-bordeaux" },
                    { n: "Toulouse", l: "/demenagement-paris-toulouse" },
                    { n: "Nantes", l: "/demenagement-paris-nantes" },
                    { n: "Lille", l: "/demenagement-paris-lille" },
                    { n: "Strasbourg", l: "/demenagement-paris-strasbourg" },
                    { n: "Montpellier", l: "/demenagement-paris-montpellier" },
                    { n: "Rennes", l: "/demenagement-paris-rennes" }
                  ].map((dest, i) => (
                    <Link 
                      key={i}
                      to={dest.l}
                      className="flex items-center justify-between p-6 bg-slate-900 rounded-2xl border border-white/5 group hover:border-accent shadow-2xl transition-all italic"
                    >
                      <div className="flex items-center gap-3 italic">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full italic transition-all"></div>
                        <span className="font-bold text-white group-hover:text-accent transition-colors italic uppercase text-[10px] tracking-widest italic">Au départ vers {dest.n}</span>
                      </div>
                      <ArrowRight size={14} className="text-slate-500 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
              {["Nice"].map((dest, i) => (
                <div key={i} className="flex items-center gap-3 text-xs italic font-black uppercase tracking-widest text-slate-500 italic transition-colors italic transition-all italic transition-all transition-all italic opacity-40 grayscale-[100%] italic">
                  <div className="w-1.5 h-1.5 bg-slate-800 rounded-full italic transition-all italic"></div>
                  Au départ vers {dest}
                </div>
              ))}
            </div>
              </div>
              <div className="pt-10 italic transition-all transition-all italic transition-all italic transition-all italic transition-all">
                 <Link to="/demenagement-longue-distance" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-white transition-all shadow-xl italic tracking-tight italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all font-sans italic transition-all">
                    Déménagement province <ArrowRight size={18} className="inline ml-2" />
                 </Link>
              </div>
            </div>
            <div className="bg-white/5 rounded-[3.5rem] p-12 border border-white/10 backdrop-blur-md shadow-2xl space-y-8 italic font-sans italic transition-all italic transition-all transition-all italic transition-all italic">
               <h3 className="text-white font-black uppercase text-xl leading-tight italic italic transition-all transition-all italic italic transition-all underline decoration-accent/20 underline-offset-4 italic transition-all transition-all italic grayscale-[30%] italic transition-all">Organisation <br/>longue distance</h3>
               <ul className="space-y-4 italic font-sans italic italic transition-all italic transition-all transition-all italic transition-all transition-all italic font-sans">
                  {["Départ de Paris ou IDF", "Estimation précise du volume", "Accès départ & arrivée", "Formule adaptée au trajet"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm text-slate-300 italic italic transition-all transition-all italic transition-all transition-all italic font-sans italic transition-all">
                      <CheckCircle2 size={16} className="text-accent shrink-0 italic transition-all italic transition-all transition-all italic transition-all transition-all" /> {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section “Services disponibles selon votre secteur” */}
      <section className="py-24 font-sans italic transition-all italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic font-sans italic transition-all italic transition-all italic">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all italic transition-all italic transition-all italic underline underline-offset-8 italic transition-all transition-all italic transition-all italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic transition-all italic underline decoration-accent/20 underline-offset-8 transition-all italic underline italic italic underline-offset-8 transition-all font-sans italic transition-all italic">Services <span className="text-accent italic tracking-tight italic italic underline underline-offset-8 transition-all italic transition-all italic transition-all italic font-sans italic transition-all">sur-mesure</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all">
            {[
              { t: "Particuliers", d: "Déménagement de maisons, appartements et logements familiaux.", l: "/demenagement-particuliers-paris" },
              { t: "Entreprises", d: "Transferts de bureaux, commerces et locaux professionnels.", l: "/demenagement-entreprises-paris" },
              { t: "Garde-meuble", d: "Stockage sécurisé pendant votre transition ou travaux.", l: "/garde-meuble-paris" },
              { t: "Monte-meuble", d: "Solution pour accès difficiles ou meubles volumineux.", l: "/location-monte-meuble-paris" },
              { t: "Emballage", d: "Protection experte de vos biens et objets fragiles.", l: "/emballage-protection-demenagement" },
              { t: "Cartons", d: "Matériel professionnel pour votre préparation.", l: "/cartons-demenagement-paris" },
              { t: "Formules", d: "Économique, Standard ou Luxe selon vos besoins.", l: "/formules-demenagement" },
              { t: "Calculateur", d: "Estimation indicative du volume de mobilier.", l: "/calculateur-volume" }
            ].map((s, i) => (
              <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full italic transition-all selection:bg-accent italic">
                <div>
                  <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest italic italic transition-all italic transition-all italic">{s.t}</h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed italic opacity-80 italic italic italic transition-all italic transition-all italic transition-all italic transition-all">{s.d}</p>
                </div>
                <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors italic transition-all italic transition-all italic transition-all">
                  Voir le service <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section “Comment choisir la bonne page selon votre projet ?” */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic font-sans italic transition-all italic transition-all italic">
          <div className="max-w-4xl mx-auto space-y-12 italic font-sans italic italic transition-all italic transition-all italic transition-all">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight italic italic italic italic underline underline-offset-8 transition-all italic underline italic italic transition-all font-sans italic">Quel secteur choisir <span className="text-accent italic transition-all italic transition-all transition-all italic font-sans italic transition-all">pour votre devis ?</span></h2>
            <div className="grid grid-cols-1 gap-6 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all">
               {[
                 { t: "Déménagement dans Paris", d: "Choisissez votre arrondissement pour une étude spécifique des accès parisiens.", l: "/demenagement-paris" },
                 { t: "Déménagement en Île-de-France", d: "Consultez la page dédiée à l'ensemble de la région francilienne.", l: "/demenagement-ile-de-france" },
                 { t: "Déménagement Longue Distance", d: "Pour tout départ depuis Paris/IDF vers une autre région en province.", l: "/demenagement-longue-distance" }
               ].map((item, i) => (
                 <Link 
                   key={i} 
                   to={item.l}
                   className="bg-white p-8 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-accent hover:shadow-xl transition-all italic font-sans italic italic transition-all italic transition-all italic transition-all italic"
                 >
                   <div className="space-y-1 italic transition-all transition-all italic transition-all italic transition-all">
                      <h4 className="font-bold text-brand-900 group-hover:text-accent transition-colors italic transition-all italic transition-all italic transition-all italic transition-all font-sans italic">{item.t}</h4>
                      <p className="text-slate-400 text-xs italic opacity-80 italic italic italic transition-all italic transition-all italic transition-all italic transition-all transition-all font-sans italic transition-all">{item.d}</p>
                   </div>
                   <ArrowRight size={20} className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all italic transition-all italic transition-all italic transition-all italic transition-all transition-all italic transition-all" />
                 </Link>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Calculer votre volume avant de demander un devis */}
      <section className="py-24 font-sans italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic font-sans italic transition-all italic transition-all italic">
          <div className="bg-brand-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl italic transition-all italic transition-all italic transition-all">
            <div className="max-w-3xl space-y-10 relative z-10 italic transition-all transition-all italic transition-all italic transition-all">
               <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all italic underline italic italic underline-offset-8 transition-all font-sans italic transition-all italic transition-all italic transition-all">Estimez votre <br/><span className="text-accent italic transition-all italic transition-all italic font-sans italic transition-all italic transition-all">volume</span></h2>
               <p className="text-slate-400 text-lg font-light leading-relaxed italic italic italic italic italic transition-all italic italic transition-all italic transition-all italic transition-all italic transition-all">
                 Avant de solliciter votre devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation reste indicative et pourra être affinée par nos experts.
               </p>
               <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-accent text-brand-900 px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-xl italic tracking-tight italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all transition-all italic transition-all">
                 <Calculator size={28} className="text-brand-900" />
                 Calculer mon volume
                 <ArrowRight size={24} className="ml-2" />
               </Link>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-[40%] translate-y-[-40%] italic transition-all italic italic transition-all italic transition-all italic shadow-2xl transition-all transition-all italic transition-all italic transition-all italic"></div>
          </div>
        </div>
      </section>

      {/* 10. CTA intermédiaire */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center italic transition-all italic transition-all italic transition-all">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 lowercase italic tracking-tight italic italic italic italic underline underline-offset-8 transition-all italic underline italic italic transition-all font-sans italic underline-offset-8 decoration-accent/10 transition-all transition-all italic transition-all italic transition-all italic">Vous préparez <br/><span className="text-accent italic tracking-tight italic italic italic italic transition-all transition-all italic transition-all italic underline underline-offset-8 transition-all transition-all italic transition-all italic transition-all italic">un déménagement ?</span></h2>
           <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès, votre distance et le niveau d’accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center italic italic transition-all italic transition-all italic transition-all italic shadow-2xl transition-all transition-all italic transition-all italic transition-all italic shadow-xl transition-all transition-all italic transition-all italic transition-all italic">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all italic shadow-xl transition-all transition-all italic transition-all italic transition-all italic transition-all italic selection:bg-accent transition-all italic transition-all italic">
                Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-900 hover:text-white transition-all italic selection:bg-accent italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all transition-all italic">
                <Phone size={22} className="inline mr-2" />
                Appeler le {CONTACT.phone}
             </a>
           </div>
        </div>
      </section>

      {/* 11. FAQ “Secteurs desservis” */}
      <section className="py-24 font-sans italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
           <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all italic transition-all italic transition-all italic underline underline-offset-8 italic transition-all transition-all italic transition-all italic transition-all italic transition-all italic font-sans">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic italic italic italic underline underline-offset-8 italic transition-all italic transition-all italic transition-all italic underline-offset-8 transition-all transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic font-sans">FAQ Secteurs</h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic selection:bg-accent italic">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic italic italic italic italic transition-colors italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 mt-1 italic transition-all italic transition-all transition-all italic transition-all transition-all italic" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic italic italic italic italic italic transition-all italic transition-all italic transition-all underline decoration-brand-900/10 transition-all font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 12. Maillage interne final */}
      <section className="py-12 bg-slate-900 font-sans italic transition-all italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 italic italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic">Devis Gratuit</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic">Calculateur</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic">Île-de-France</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic">Longue Distance</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5 italic italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-white/10 transition-all font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic selection:bg-accent italic">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic">Emballage</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic">Matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic selection:bg-accent italic">
            {secteursParis.map(s => <Link key={s.n} to={s.p} className="hover:text-accent transition-all italic uppercase transition-all italic">{s.n}</Link>)}
            {departements.map(d => <Link key={d.h} to={d.p} className="hover:text-accent transition-all italic uppercase transition-all italic">{d.h}</Link>)}
            {villesProches.filter(v => v.e).map(v => <Link key={v.n} to={v.p} className="hover:text-accent transition-all italic uppercase transition-all italic">{v.n}</Link>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecteursDesservis;
