import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, 
  Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, 
  Briefcase, Info, Box
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LongueDistanceParisRennes: React.FC = () => {
  const path = "/demenagement-paris-rennes";

  const faqs = [
    { 
      q: "Comment organiser un déménagement de Paris vers Rennes ?", 
      a: "Un déménagement de Paris vers Rennes demande d’anticiper le volume, les accès au départ et à l’arrivée, la distance, les cartons, les meubles volumineux, les objets fragiles et la formule souhaitée. Marne Transdem vous accompagne pour préparer une organisation adaptée à votre projet." 
    },
    { 
      q: "Marne Transdem propose-t-elle des déménagements depuis l’Île-de-France vers Rennes ?", 
      a: "Oui, Marne Transdem accompagne des projets de déménagement depuis Paris ou l’Île-de-France vers Rennes selon les besoins, le volume, les accès et l’organisation du projet." 
    },
    { 
      q: "Comment estimer le volume pour un déménagement Paris Rennes ?", 
      a: "Vous pouvez utiliser le calculateur de volume pour obtenir une première estimation indicative. Le volume réel peut ensuite être affiné selon votre inventaire, les dimensions des meubles, les cartons et les conditions d’accès." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement de Paris vers Rennes ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Peut-on prévoir un garde-meuble lors d’un déménagement Paris Rennes ?", 
      a: "Oui, une solution de stockage peut être utile si les dates de départ et d’arrivée ne coïncident pas, si vous réalisez des travaux ou si vous avez besoin d’une transition avant l’installation définitive." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement Paris Rennes ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Paris Rennes | Marne Transdem"
        description="Organisez votre déménagement de Paris vers Rennes avec Marne Transdem. Volume, emballage, transport longue distance, formules adaptées et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Longue distance", item: "/demenagement-longue-distance" },
            { name: "Paris Rennes", item: path }
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
              <Globe size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement longue distance</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Paris <span className="text-accent italic">Rennes</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic font-sans">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement depuis Paris ou l’Île-de-France vers Rennes, avec une organisation adaptée au volume, aux accès, à la distance et au niveau d’accompagnement souhaité.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline decoration-brand-900/10">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/10 underline-offset-8">
                Préparer un déménagement <br/><span className="text-accent italic">de Paris vers Rennes</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Un déménagement entre Paris et Rennes demande une organisation sérieuse, car il s’agit d’un trajet longue distance vers l’ouest de la France et la <span className="font-bold text-brand-900">Bretagne</span>. La liaison entre le bassin parisien et la métropole rennaise nécessite une gestion précise du volume, de la protection des biens et de la logistique de transport pour votre <span className="font-bold text-brand-900">déménagement Paris Rennes</span>.
                </p>
                <p>
                   Qu'il s'agisse d'un <span className="font-bold text-slate-700 tracking-tight">départ depuis Paris</span> ou au <span className="font-bold text-slate-700 tracking-tight italic">départ de la région parisienne</span>, Marne Transdem assure l'acheminement de vos <span className="font-bold text-slate-700 tracking-tight">meubles</span>, <span className="font-bold text-slate-700 tracking-tight">cartons</span> et objets fragiles vers l’<span className="font-bold text-brand-900 italic">ouest de la France</span>. Nous étudions chaque détail logistique, de la distance à parcourir aux contraintes d'accès à l'arrivée à <span className="font-bold text-brand-900 tracking-tight italic">Rennes</span>.
                </p>
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl grayscale-[20%] transition-all h-full aspect-square">
               <img src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800" alt="Paris Rennes Transport" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section “Pourquoi un déménagement Paris Rennes demande une bonne organisation” */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 mb-6">Logistique <span className="text-accent italic tracking-tight italic">Liaison Ouest</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto italic font-sans">
              Traverser la France vers la Bretagne nécessite une coordination rigoureuse du volume et une anticipation fine des accès au départ comme à l'arrivée.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic font-sans">
            {[
              { icon: Truck, t: "Trajet A11 / Ouest", d: "Gestion sécurisée du transport sur l'axe autoroutier reliant la capitale à la Bretagne." },
              { icon: Package, t: "Protection Objets", d: "Emballage spécifique et protection du mobilier pour garantir l'intégrité de vos biens durant la distance." },
              { icon: Ruler, t: "Accès & Étages", d: "Optimisation de la manutention selon vos étages, ascenseurs et escaliers au départ comme à l'arrivée." },
              { icon: Calculator, t: "Estimation Volume", d: "Évaluation du cubage nécessaire via notre calculateur pour adapter les moyens techniques de transport." },
              { icon: Zap, t: "Monte-meuble sur option", d: "Solution de levage extérieur à envisager si les accès par les parties communes sont restreints." },
              { icon: Calendar, t: "Suivi Planning", d: "Coordination des dates pour assurer la fluidité de votre transition vers votre nouveau logement rennais." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 group hover:border-accent transition-all h-full italic">
                 <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform grayscale-[20%]" size={36} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services pour votre déménagement Paris Rennes */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline">Services <span className="text-accent italic tracking-tight underline underline-offset-4">longue distance</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 italic">
          {[
            { t: "Particuliers", d: "Accompagnement des familles qui quittent Paris ou l’Île-de-France pour s’installer à Rennes.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Organisation des transferts professionnels entre Paris, l’Île-de-France et Rennes.", l: "/demenagement-entreprises-paris" },
            { t: "Emballage", d: "Protection des meubles, objets fragiles, cartons, selon la prestation choisie.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel utile pour préparer les cartons et protéger les biens avant le transport.", l: "/cartons-demenagement-paris" },
            { t: "Garde-meuble", d: "Solution de stockage temporaire en cas de transition différée.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Solution à envisager si certains meubles volumineux ne passent pas par les accès.", l: "/location-monte-meuble-paris" },
            { t: "Formules", d: "De l’Économique au Luxe selon votre budget et votre disponibilité.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Outil d’estimation indicative du volume avant la demande de devis.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full italic">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest italic">{s.t}</h3>
                <p className="text-slate-400 text-[10px] font-light leading-relaxed italic opacity-80">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors italic">
                En savoir plus <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement Paris Rennes pour les particuliers */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1 grayscale-[10%]">
               <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800" alt="Particulier Paris Rennes" className="w-full h-full object-cover italic grayscale-[10%]" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 italic font-sans">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">Particuliers de Paris vers Rennes</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs projets de mutation, rapprochement familial ou <span className="font-bold text-slate-700 tracking-tight italic">installation à Rennes</span> dépuis Paris ou l'Île-de-France.
                </p>
                <p>
                   Appartement, maison ou studio, nous gérons votre transport au <span className="font-bold text-slate-700 tracking-tight italic">départ vers l’ouest</span> avec une expertise sur la protection de vos meubles et objets fragiles. Nous intégrons vos besoins de stationnement et d'accès pour garantir une livraison sereine quel que soit votre quartier d'arrivée (Centre-ville, Thabor, Gare, Cesson-Sévigné, etc.).
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl italic">
                Demander mon devis Paris Rennes <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement Paris Rennes pour les entreprises */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative grayscale-[10%] italic">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" alt="Entreprise Paris Rennes" className="w-full h-full object-cover italic" />
             </div>
             <div className="lg:w-1/2 space-y-8 italic font-sans">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all underline decoration-accent/20 underline-offset-4">Transfert professionnel Paris Rennes</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Marne Transdem accompagne les entreprises, bureaux et agences dans leur <span className="font-bold text-brand-900 italic tracking-tight">transfert professionnel</span> de Paris ou l'Île-de-France vers Rennes.
                 </p>
                 <p>
                    Nous assurons le transport rigoureux de votre mobilier de bureau, <span className="font-bold text-slate-700 tracking-tight italic font-bold">archives</span> et matériel informatique. Notre planning est coordonné pour favoriser la continuité de vos activités lors de votre délocalisation vers la capitale bretonne.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all italic tracking-tight font-sans">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Départ depuis Paris ou l’Île-de-France */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 underline underline-offset-8">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all font-sans">Votre départ <span className="text-accent italic tracking-tight underline underline-offset-4">d'IDF ou de Paris</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 italic font-sans italic transition-colors transition-all focus:animate-none">
             <Link to="/demenagement-paris-20" className="hover:text-accent italic transition-all">Paris 20e</Link>
             <Link to="/demenagement-montreuil" className="hover:text-accent italic transition-all">Montreuil</Link>
             <Link to="/demenagement-vincennes" className="hover:text-accent italic transition-all">Vincennes</Link>
             <Link to="/demenagement-saint-mande" className="hover:text-accent italic transition-all">Saint-Mandé</Link>
             <Link to="/demenagement-bagnolet" className="hover:text-accent italic transition-all">Bagnolet</Link>
             <Link to="/demenagement-hauts-de-seine" className="hover:text-accent italic transition-all">Hauts-de-Seine</Link>
             <Link to="/demenagement-seine-saint-denis" className="hover:text-accent italic transition-all">Seine-Saint-Denis</Link>
             <Link to="/demenagement-val-de-marne" className="hover:text-accent italic transition-all">Val-de-Marne</Link>
             <Link to="/demenagement-yvelines" className="hover:text-accent italic transition-all">Yvelines</Link>
             <Link to="/demenagement-essonne" className="hover:text-accent italic transition-all">Essonne</Link>
             <Link to="/demenagement-val-d-oise" className="hover:text-accent italic transition-all">Val-d'Oise</Link>
             <Link to="/demenagement-seine-et-marne" className="hover:text-accent italic transition-all">Seine-et-Marne</Link>
             <Link to="/demenagement-ile-de-france" className="hover:text-brand-900 border-b border-accent/20 italic italic transition-all italic font-bold">Île-de-France Global</Link>
          </div>
        </div>
      </section>

      {/* 8. Arrivée à Rennes */}
      <section className="py-24 bg-brand-900 text-white font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic transition-all grayscale-[0%]">
             <div className="space-y-8 italic transition-all">
               <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all h-full underline decoration-accent/20 underline-offset-4">Préparer l’arrivée <br/><span className="text-accent italic transition-all">à Rennes</span></h2>
               <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic italic transition-all italic transition-all">
                 <p>
                   L’arrivée à <span className="text-white font-bold italic tracking-tight transition-all">Rennes</span> doit aussi être anticipée selon les spécificités de votre adresse de destination. Qu'il s'agisse d'un appartement en centre-ville historique ou d'un projet moderne dans la métropole, la configuration des accès conditionne notre organisation.
                 </p>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 italic font-sans transition-all italic">
                    {[
                      "Appartement ou maison", "Étage & Ascenseur", "Accès Cage d'Escalier", "Stationnement Rue", "Meubles Volumineux", "Option Monte-meuble"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs italic font-black uppercase tracking-widest text-slate-500 italic transition-colors transition-all">
                         <div className="w-1.5 h-1.5 bg-accent rounded-full transition-all"></div>
                         {item}
                      </li>
                    ))}
                 </ul>
               </div>
             </div>
             <div className="bg-white/5 rounded-[3.5rem] p-12 lg:p-20 border border-white/10 backdrop-blur-md shadow-2xl space-y-8 italic font-sans transition-all h-full text-brand-900 bg-white">
                <Info className="text-accent mb-4 grayscale-[20%] transition-all" size={32} />
                <p className="text-slate-500 italic font-light leading-relaxed text-sm transition-all italic">
                  Marne Transdem étudie la faisabilité technique à l'arrivée. Le besoin d'un monte-meuble sera confirmé selon les accès extérieurs et la configuration de la rue à Rennes selon la faisabilité.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 9. Formules adaptées à un déménagement Paris Rennes */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline underline-offset-8 decoration-accent/20 transition-all font-sans underline underline-offset-8">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all font-sans">Formules Paris Rennes</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto italic font-sans transition-all">
          {[
            { n: "Économique", d: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport sécurisé selon le projet." },
            { n: "Standard", d: "Une formule équilibrée pour déléguer certains éléments comme les objets fragiles, certains meubles ou certaines étapes." },
            { n: "Luxe", d: "Une formule plus complète pour déléguer davantage de préparation, d’emballage et d’organisation experte de votre trajet." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between transition-all h-full ${i === 1 ? 'border-accent shadow-xl scale-105 z-10 transition-all' : 'border-slate-200 transition-all'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight transition-all font-sans h-full italic">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10 transition-all font-sans h-full italic">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-[0.25em] border-b border-accent/20 pb-1 hover:border-accent transition-all">Comparer les formules</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20 italic font-sans transition-all">
           <Link to="/formules-demenagement" className="bg-brand-900 text-white px-12 py-6 rounded-full font-bold hover:shadow-2xl transition-all shadow-xl italic tracking-tight font-sans">
             Comparer les formules
           </Link>
        </div>
      </section>

      {/* 10. Volume, accès et organisation du transport */}
      <section className="py-24 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans transition-all italic">
           <div className="max-w-4xl mx-auto space-y-12 italic font-sans transition-all">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all underline font-sans italic">Volume & Transport <span className="text-accent italic transition-all border-b-4 border-accent italic shadow-sm">vers l'Ouest</span></h2>
             <p className="text-slate-500 text-lg font-light leading-relaxed italic transition-all">
                Le devis pour votre déménagement entre Paris et Rennes dépend notamment du <span className="font-bold text-brand-900 italic tracking-tight">volume</span>, des adresses, des étages, des ascenseurs, du stationnement et de la distance.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 italic font-sans">
                <Link to="/calculateur-volume" className="bg-slate-900 p-8 rounded-3xl group flex flex-col justify-between h-full transition-all hover:bg-black transition-all">
                   <Calculator className="text-accent mb-6 transition-all" size={32} />
                   <h4 className="text-white font-bold italic transition-all font-sans uppercase text-sm tracking-widest italic group-hover:text-accent transition-all">Calculateur Volume</h4>
                </Link>
                <Link to="/location-monte-meuble-paris" className="bg-slate-50 p-8 rounded-3xl group border border-slate-100 flex flex-col justify-between h-full transition-all hover:border-accent transition-all">
                   <Zap className="text-accent mb-6 transition-all" size={32} />
                   <h4 className="text-brand-900 font-bold italic transition-all font-sans uppercase text-sm tracking-widest italic transition-all">Location Monte-meuble</h4>
                </Link>
             </div>
           </div>
        </div>
      </section>

      {/* 11. Calculateur de volume Section */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center italic font-sans transition-all italic">
          <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all underline decoration-accent/10 transition-all font-sans underline underline-offset-4 decoration-accent tracking-[0.05em]">VOTRE VOLUME RENNES</h2>
          <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed transition-all italic">
            Avant de demander un devis pour votre déménagement de Paris vers Rennes, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux.
          </p>
          <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-xl italic tracking-tight font-sans">
            <Calculator size={28} className="text-accent" />
            Utiliser le calculateur de volume
          </Link>
        </div>
      </section>

      {/* 12. Notre méthode en 5 étapes */}
      <section className="py-24 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans transition-all italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 text-center uppercase tracking-tight italic underline decoration-accent/20 underline-offset-8 transition-all underline decoration-accent/10 transition-all font-sans">Méthode <span className="text-accent italic tracking-tight transition-all underline underline-offset-4 decoration-brand-900/10">Ouest Direct</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 text-center italic font-sans transition-all h-full italic">
            {[
              { icon: ClipboardCheck, t: "Analyse", d: "Analyse de votre projet de départ." },
              { icon: Ruler, t: "Estimation", d: "Volume, adresses et accès urbains." },
              { icon: Box, t: "Préparation", d: "Choix formule et préparation." },
              { icon: Truck, t: "Transport", d: "Transport sécurisé Paris Rennes." },
              { icon: Home, t: "Livraison", d: "Installation selon la prestation choisie." }
            ].map((step, i) => (
              <div key={i} className="space-y-6 group italic font-sans transition-all h-full italic">
                 <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto text-brand-900 border border-slate-100 group-hover:bg-accent transition-all duration-500 relative grayscale-[20%] group-hover:grayscale-0 transition-all">
                   <step.icon size={28} />
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-[10px] italic transition-all">{i+1}</div>
                 </div>
                 <div className="px-2 transition-all">
                    <h4 className="font-bold text-brand-900 mb-2 text-xs italic tracking-tight transition-all font-sans uppercase">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-light leading-relaxed italic opacity-80 transition-all">{step.d}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Autres destinations longue distance */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans transition-all italic">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 transition-all italic font-sans underline underline-offset-8 italic">
             <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all font-sans">Province <span className="text-accent italic tracking-tight underline italic underline-offset-4 italic">depuis Paris</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 italic font-sans transition-all">
            {[
               { n: "Lyon", l: "/demenagement-paris-lyon" },
               { n: "Marseille", l: "/demenagement-paris-marseille" },
               { n: "Bordeaux", l: "/demenagement-paris-bordeaux" },
               { n: "Toulouse", l: "/demenagement-paris-toulouse" },
               { n: "Nantes", l: "/demenagement-paris-nantes" },
               { n: "Lille", l: "/demenagement-paris-lille" },
               { n: "Strasbourg", l: "/demenagement-paris-strasbourg" },
               { n: "Montpellier", l: "/demenagement-paris-montpellier" }
            ].map((dest, i) => (
              <Link key={i} to={dest.l} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-center text-center group hover:border-accent hover:shadow-xl transition-all italic font-sans italic">
                 <span className="font-bold text-brand-900 group-hover:text-accent italic font-sans uppercase text-[10px] tracking-widest italic transition-all">Vers {dest.n}</span>
              </Link>
            ))}
            {[
              "Nice"
            ].map((dest, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-center text-center opacity-60 grayscale-[50%] italic font-sans transition-all">
                 <span className="font-bold text-slate-400 italic font-sans uppercase text-[10px] tracking-widest italic">Vers {dest}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 transition-all">
             <Link to="/demenagement-longue-distance" className="text-brand-900 font-bold border-b border-accent/20 hover:border-accent transition-all text-xs uppercase tracking-widest font-sans italic">Toutes les destinations longue distance</Link>
          </div>
        </div>
      </section>

      {/* 14. CTA intermédiaire */}
      <section className="py-24 bg-brand-900 relative overflow-hidden font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 transition-all">
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 font-display uppercase tracking-tight italic leading-tight transition-all h-full italic underline decoration-accent/20">PROJET DE DÉPART <br/><span className="text-accent italic tracking-tight border-b-4 border-accent shadow-sm transition-all font-display underline decoration-accent/20">PARIS RENNES ?</span></h2>
           <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed transition-all shadow-xl transition-all italic">
             Décrivez votre projet vers l'Ouest et recevez une estimation adaptée à votre volume, vos accès, votre distance et le niveau d’accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic shadow-2xl transition-all shadow-xl transition-all">
             <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] shadow-xl transition-all">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] shadow-md transition-all backdrop-blur-sm">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%] shadow-2xl transition-all"></div>
      </section>

      {/* 15. FAQ Paris Rennes */}
      <section className="py-24 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans transition-all">
           <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 transition-all font-sans underline underline-offset-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight transition-all font-sans underline decoration-accent/20 underline-offset-[12px] underline-offset-2">FAQ PARIS RENNES</h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans transition-all">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans transition-all selection:bg-accent italic">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase transition-all border-l-4 border-accent pl-6 transition-all font-display">
                   <HelpCircle className="text-accent shrink-0 mt-1 transition-all" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-12 transition-all underline decoration-brand-900/10 font-sans italic transition-all">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 16. Maillage interne final */}
      <section className="py-12 bg-slate-900 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans transition-all">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 transition-colors transition-all underline decoration-accent/10 font-sans italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all selection:bg-accent italic transition-all uppercase">Demande de devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all selection:bg-accent italic transition-all uppercase">Calculateur Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all selection:bg-accent italic transition-all uppercase">Formules de déménagement</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all selection:bg-accent italic transition-all uppercase font-bold">Déménagement longue distance</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all selection:bg-accent italic transition-all uppercase">Déménagement Île-de-France</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5 transition-colors transition-all underline decoration-white/10 font-sans italic transition-all Selection:bg-accent italic">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all selection:bg-accent italic transition-all uppercase">Déménagement particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all selection:bg-accent italic transition-all uppercase">Déménagement entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all selection:bg-accent italic transition-all uppercase">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all selection:bg-accent italic transition-all uppercase">Location monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all selection:bg-accent italic transition-all uppercase">Emballage et protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all selection:bg-accent italic transition-all uppercase">Cartons et matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all selection:bg-accent italic transition-all uppercase">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans transition-colors transition-all underline decoration-accent/10 font-sans italic transition-all selection:bg-accent italic">
            <Link to="/demenagement-paris-20" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris 20e</Link>
            <Link to="/demenagement-hauts-de-seine" className="hover:text-accent uppercase italic transition-all font-sans italic">Hauts-de-Seine</Link>
            <Link to="/demenagement-seine-saint-denis" className="hover:text-accent uppercase italic transition-all font-sans italic">Seine-Saint-Denis</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent uppercase italic transition-all font-sans italic">Val-de-Marne</Link>
            <Link to="/demenagement-yvelines" className="hover:text-accent uppercase italic transition-all font-sans italic">Yvelines</Link>
            <Link to="/demenagement-essonne" className="hover:text-accent uppercase italic transition-all font-sans italic">Essonne</Link>
            <Link to="/demenagement-val-d-oise" className="hover:text-accent uppercase italic transition-all font-sans italic">Val-d'Oise</Link>
            <Link to="/demenagement-seine-et-marne" className="hover:text-accent uppercase italic transition-all font-sans italic">Seine-et-Marne</Link>
            <Link to="/demenagement-paris-lyon" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Lyon</Link>
            <Link to="/demenagement-paris-marseille" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Marseille</Link>
            <Link to="/demenagement-paris-bordeaux" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Bordeaux</Link>
            <Link to="/demenagement-paris-toulouse" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Toulouse</Link>
            <Link to="/demenagement-paris-nantes" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Nantes</Link>
            <Link to="/demenagement-paris-lille" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Lille</Link>
            <Link to="/demenagement-paris-strasbourg" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Strasbourg</Link>
            <Link to="/demenagement-paris-montpellier" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Montpellier</Link>
            <Link to="/demenagement-paris-rennes" className="hover:text-accent uppercase italic transition-all font-sans italic">Paris-Rennes</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LongueDistanceParisRennes;
