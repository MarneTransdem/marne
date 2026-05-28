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

const LongueDistanceParisBordeaux: React.FC = () => {
  const path = "/demenagement-paris-bordeaux";

  const faqs = [
    { 
      q: "Comment organiser un déménagement de Paris vers Bordeaux ?", 
      a: "Un déménagement de Paris vers Bordeaux demande d’anticiper le volume, les accès au départ et à l’arrivée, la distance, les cartons, les meubles volumineux, les objets fragiles et la formule souhaitée. Marne Transdem vous accompagne pour préparer une organisation adaptée à votre projet." 
    },
    { 
      q: "Marne Transdem propose-t-elle des déménagements depuis l’Île-de-France vers Bordeaux ?", 
      a: "Oui, Marne Transdem accompagne des projets de déménagement depuis Paris ou l’Île-de-France vers Bordeaux selon les besoins, le volume, les accès et l’organisation du projet." 
    },
    { 
      q: "Comment estimer le volume pour un déménagement Paris Bordeaux ?", 
      a: "Vous pouvez utiliser le calculateur de volume pour obtenir une première estimation indicative. Le volume réel peut ensuite être affinée selon votre inventaire, les dimensions des meubles, les cartons et les conditions d’accès." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement de Paris vers Bordeaux ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Peut-on prévoir un garde-meuble lors d’un déménagement Paris Bordeaux ?", 
      a: "Oui, une solution de stockage peut être utile si les dates de départ et d’arrivée ne coïncident pas, si vous réalisez des travaux ou si vous avez besoin d’une transition avant l’installation définitive." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement Paris Bordeaux ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Paris Bordeaux | Marne Transdem"
        description="Organisez votre déménagement de Paris vers Bordeaux avec Marne Transdem. Volume, emballage, transport longue distance, formules adaptées et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Longue distance", item: "/demenagement-longue-distance" },
            { name: "Paris Bordeaux", item: path }
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
              Paris <span className="text-accent italic">Bordeaux</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic font-sans">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement depuis Paris ou l’Île-de-France vers Bordeaux, avec une organisation adaptée à la distance.
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
                Préparer un déménagement <br/><span className="text-accent italic">de Paris vers Bordeaux</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Un déménagement entre Paris et Bordeaux demande une organisation précise. Marne Transdem accompagne votre <span className="font-bold text-brand-900 italic tracking-tight">départ depuis Paris</span> ou l’Île-de-France pour une installation sereine à <span className="font-bold text-brand-900 italic tracking-tight italic">Bordeaux</span>.
                </p>
                <p>
                   Qu'il s'agisse de transporter votre mobilier, vos <span className="font-bold text-slate-700 tracking-tight italic">cartons</span> ou vos objets fragiles, notre logistique s'adapte à la <span className="font-bold text-slate-700 tracking-tight italic">distance</span>. Nous étudions avec soin les accès au départ en région parisienne et à l'arrivée en Gironde pour garantir une prestation sans faille quelle que soit la formule choisie.
                </p>
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl grayscale-[20%] transition-all h-full aspect-square">
               <img src="/images/demenagement-longue-distance-camion.jpg" alt="Paris Bordeaux Transport" width="800" height="800" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section “Pourquoi un déménagement Paris Bordeaux demande une bonne organisation” */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 mb-6">Logistique <span className="text-accent italic tracking-tight italic">Liaison Sud-Ouest</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto italic font-sans italic">
              La coordination du planning et la protection des biens sont les piliers de notre accompagnement longue distance entre la capitale et Bordeaux.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic font-sans">
            {[
              { icon: Truck, t: "600 km sécurisés", d: "Gestion rigoureuse du trajet sur l'axe A10 pour assurer l'acheminement de vos biens vers la Gironde." },
              { icon: Package, t: "Protection Renforcée", d: "Emballage spécifique pour les meubles et objets fragiles afin de sécuriser le transport longue distance." },
              { icon: Ruler, t: "Accès & Étages", d: "Anticipation des contraintes au départ (Paris/IDF) et à l'arrivée (Bordeaux) pour une manutention fluide." },
              { icon: Calculator, t: "Maîtrise du Volume", d: "Évaluation précise de la capacité de chargement nécessaire via notre calculateur de volume dédié." },
              { icon: Briefcase, t: "Mutation Pro", d: "Solution pour salariés et entreprises transférant leurs activités ou collaborateurs vers la métropole bordelaise." },
              { icon: ClipboardCheck, t: "Suivi & Planning", d: "Coordination des dates de chargement et de livraison pour une transition sereine vers votre nouveau foyer." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 group hover:border-accent transition-all h-full italic">
                 <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform grayscale-[20%]" size={36} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic font-sans">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic italic font-sans">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services pour votre déménagement Paris Bordeaux */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline italic">Services <span className="text-accent italic tracking-tight italic underline italic underline-offset-4">longue distance</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 italic">
          {[
            { t: "Particuliers", d: "Accompagnement des familles quittant l’Île-de-France pour s’installer à Bordeaux.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Transferts professionnels et bureaux de Paris vers la métropole bordelaise.", l: "/demenagement-entreprises-paris" },
            { t: "Emballage", d: "Protection experte du mobilier et des objets fragiles pour le trajet.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel professionnel utile pour préparer votre départ.", l: "/cartons-demenagement-paris" },
            { t: "Garde-meuble", d: "Solution de stockage temporaire pendant votre transition.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Location au départ ou à l'arrivée selon la configuration des lieux.", l: "/location-monte-meuble-paris" },
            { t: "Formules", d: "De l’Économique au Luxe selon votre niveau d’accompagnement.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Outil d'estimation indicative du volume avant votre devis.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full italic">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest italic">{s.t}</h3>
                <p className="text-slate-400 text-[10px] font-light leading-relaxed italic opacity-80 italic italic">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors italic">
                En savoir plus <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement Paris Bordeaux pour les particuliers */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1 grayscale-[10%]">
               <img src="/images/demenagement-maison-appartement-particulier.jpg" alt="Particulier Paris Bordeaux" width="800" height="600" loading="lazy" decoding="async" className="w-full h-full object-cover italic transition-all h-full grayscale-[10%]" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 italic font-sans italic">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all">Déménagement particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic italic">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs projets de mutation, changement de résidence ou <span className="font-bold text-slate-700 tracking-tight italic tracking-tight tracking-tight">installation à Bordeaux</span>.
                </p>
                <p>
                   Qu'il s'agisse d'un <span className="font-bold text-slate-700 tracking-tight italic text-slate-700">appartement</span> bordelais ou d'une <span className="font-bold text-slate-700 tracking-tight italic">échoppe</span> girondine, nous gérons le transport depuis l’Île-de-France avec une attention particulière aux <span className="font-bold text-slate-700 tracking-tight italic font-bold">meubles</span> et objets fragiles.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl italic tracking-tight italic h-full transition-all italic">
                Demander mon devis Paris Bordeaux <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement Paris Bordeaux pour les entreprises */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative grayscale-[10%] italic transition-all h-full transition-all italic grayscale-[10%]">
                <img src="/images/transfert-bureaux-entreprise-paris.jpg" alt="Entreprise Paris Bordeaux" width="800" height="600" loading="lazy" decoding="async" className="w-full h-full object-cover italic transition-all h-full" />
             </div>
             <div className="lg:w-1/2 space-y-8 italic font-sans italic italic">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all italic h-full underline decoration-accent/20 underline-offset-4 italic">Transferts professionnels</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic italic italic">
                 <p>
                   Notre expertise s'adresse aux bureaux, agences et cabinets souhaitant opérer un <span className="font-bold text-brand-900 italic tracking-tight">transfert d'entreprise</span> entre Paris/IDF et Bordeaux.
                 </p>
                 <p>
                    Transfert sécurisé du mobilier de bureau, des <span className="font-bold text-slate-700 tracking-tight italic text-slate-700 font-bold italic">archives</span> et du matériel informatique avec une coordination stricte du planning pour assurer la <span className="font-bold text-brand-900 italic tracking-tight font-bold italic font-bold">continuité de vos activités</span>.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all italic tracking-tight italic italic font-sans italic">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Départ depuis Paris ou l’Île-de-France */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic font-sans italic underline underline-offset-8 italic underline transition-all">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all font-sans italic">Votre départ <span className="text-accent italic tracking-tight italic italic underline italic underline-offset-4 italic">depuis l'IDF</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 italic font-sans italic italic italic transition-colors transition-all focus:animate-none">
             <Link to="/demenagement-paris-20" className="hover:text-accent italic transition-all italic transition-all italic">Paris 20e</Link>
             <Link to="/demenagement-montreuil" className="hover:text-accent italic transition-all italic transition-all italic">Montreuil</Link>
             <Link to="/demenagement-vincennes" className="hover:text-accent italic transition-all italic transition-all italic">Vincennes</Link>
             <Link to="/demenagement-saint-mande" className="hover:text-accent italic transition-all italic transition-all italic">Saint-Mandé</Link>
             <Link to="/demenagement-bagnolet" className="hover:text-accent italic transition-all italic transition-all italic">Bagnolet</Link>
             <Link to="/demenagement-hauts-de-seine" className="hover:text-accent italic transition-all italic transition-all italic">Hauts-de-Seine</Link>
             <Link to="/demenagement-seine-saint-denis" className="hover:text-accent italic transition-all italic transition-all italic">Seine-Saint-Denis</Link>
             <Link to="/demenagement-val-de-marne" className="hover:text-accent italic transition-all italic transition-all italic">Val-de-Marne</Link>
             <Link to="/demenagement-yvelines" className="hover:text-accent italic transition-all italic transition-all italic">Yvelines</Link>
             <Link to="/demenagement-essonne" className="hover:text-accent italic transition-all italic transition-all italic">Essonne</Link>
             <Link to="/demenagement-val-d-oise" className="hover:text-accent italic transition-all italic transition-all italic">Val-d'Oise</Link>
             <Link to="/demenagement-seine-et-marne" className="hover:text-accent italic transition-all italic transition-all italic">Seine-et-Marne</Link>
             <Link to="/demenagement-ile-de-france" className="hover:text-brand-900 border-b border-accent/20 italic italic transition-all italic transition-all italic font-bold">Île-de-France Global</Link>
          </div>
        </div>
      </section>

      {/* 8. Arrivée à Bordeaux */}
      <section className="py-24 bg-brand-900 text-white font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic transition-all italic grayscale-[0%] transition-all">
             <div className="space-y-8 italic transition-all transition-all italic transition-all">
               <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all italic h-full underline decoration-accent/20 underline-offset-4 italic">Préparer l’arrivée <br/><span className="text-accent italic transition-all italic transition-all italic">à Bordeaux</span></h2>
               <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic italic italic italic transition-all italic italic transition-all italic transition-all italic transition-all italic">
                 <p>
                   L’arrivée à <span className="text-white font-bold italic tracking-tight transition-all">Bordeaux</span> doit être anticipée selon la configuration de votre nouvelle adresse. Chaque projet fait l'objet d'une étude selon le type de logement.
                 </p>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 italic font-sans italic italic transition-all italic transition-all italic transition-all transition-all italic transition-all">
                    {[
                      "Echoppe ou appartement", "Étage & Accès", "Stationnement Rue", "Zone Piétonne (selon accès)", "Meubles Volumineux", "Option Monte-meuble"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs italic font-black uppercase tracking-widest text-slate-500 italic transition-colors italic transition-all italic transition-all transition-all italic transition-all">
                         <div className="w-1.5 h-1.5 bg-accent rounded-full italic transition-all italic transition-all transition-all italic transition-all"></div>
                         {item}
                      </li>
                    ))}
                 </ul>
               </div>
             </div>
             <div className="bg-white/5 rounded-[3.5rem] p-12 lg:p-20 border border-white/10 backdrop-blur-md shadow-2xl space-y-8 italic font-sans italic transition-all italic transition-all transition-all italic transition-all italic font-sans italic transition-all h-full text-brand-900 bg-white">
                <Info className="text-accent mb-4 grayscale-[20%] transition-all italic transition-all italic" size={32} />
                <p className="text-slate-500 italic font-light italic leading-relaxed text-sm italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all">
                  Marne Transdem accompagne votre installation bordelaise avec rigueur. La faisabilité d'un monte-meuble dépendra de la configuration technique constatée à l'arrivée (façade, rue, accès, autorisations).
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 9. Formules adaptées à un déménagement Paris Bordeaux */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline underline-offset-8 decoration-accent/20 italic transition-all italic font-sans italic transition-all underline underline-offset-8 italic transition-all">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all italic font-sans italic transition-all italic transition-all">Formules Paris Bordeaux</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all">
          {[
            { n: "Économique", d: "Manutention et transport sécurisé sur 600km. Vous assurez la préparation intégrale de vos cartons." },
            { n: "Standard", d: "Une formule équilibrée avec délégation des objets fragiles et protection complète du mobilier." },
            { n: "Luxe", d: "Délégation totale incluant préparation, emballage et organisation experte de votre trajet." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between italic transition-all h-full ${i === 1 ? 'border-accent shadow-xl scale-105 z-10 italic italic transition-all italic transition-all' : 'border-slate-200 italic italic transition-all italic transition-all'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight italic italic italic italic transition-all italic transition-all font-sans italic transition-all italic h-full italic transition-all italic transition-all italic transition-all italic">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10 italic italic italic italic italic transition-all italic transition-all italic transition-all font-sans italic transition-all italic transition-all h-full italic transition-all italic">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-[0.25em] border-b border-accent/20 pb-1 hover:border-accent transition-all italic italic italic transition-all italic transition-all italic transition-all italic transition-all">Détails des prestations</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20 italic font-sans transition-all">
           <Link to="/formules-demenagement" className="bg-brand-900 text-white px-12 py-6 rounded-full font-bold hover:shadow-2xl transition-all shadow-xl italic tracking-tight italic italic italic italic transition-all italic transition-all underline decoration-white/10 transition-all font-sans italic transition-all">
             Comparer les formules
           </Link>
        </div>
      </section>

      {/* 10. Volume, accès et organisation du transport */}
      <section className="py-24 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic font-sans italic transition-all italic transition-all italic">
           <div className="max-w-4xl mx-auto space-y-12 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all italic underline italic italic transition-all font-sans italic">Organisation <span className="text-accent italic transition-all italic transition-all transition-all italic font-sans italic transition-all italic border-b-4 border-accent italic">du transport</span></h2>
             <p className="text-slate-500 text-lg font-light leading-relaxed italic italic italic italic italic transition-all italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
                Le devis pour votre déménagement <span className="font-bold text-brand-900 italic tracking-tight">Paris Bordeaux</span> dépend notamment de l'étude rigoureuse du volume, des adresses et de la formule choisie.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 italic font-sans">
                <Link to="/calculateur-volume" className="bg-slate-900 p-8 rounded-3xl group flex flex-col justify-between h-full italic transition-all hover:bg-black transition-all italic transition-all h-full italic transition-all transition-all italic transition-all italic transition-all italic transition-all">
                   <Calculator className="text-accent mb-6 italic transition-all italic transition-all transition-all italic transition-all" size={32} />
                   <h4 className="text-white font-bold italic transition-all italic transition-all italic transition-all italic transition-all font-sans uppercase text-sm tracking-widest italic group-hover:text-accent transition-all italic transition-all italic transition-all">Estimer Volume</h4>
                </Link>
                <Link to="/location-monte-meuble-paris" className="bg-slate-50 p-8 rounded-3xl group border border-slate-100 flex flex-col justify-between h-full italic transition-all hover:border-accent transition-all italic transition-all h-full italic transition-all transition-all italic transition-all italic transition-all italic transition-all">
                   <Zap className="text-accent mb-6 italic transition-all italic transition-all transition-all italic transition-all" size={32} />
                   <h4 className="text-brand-900 font-bold italic transition-all italic transition-all italic transition-all italic transition-all font-sans uppercase text-sm tracking-widest italic transition-all italic transition-all italic transition-all">Info Monte-meuble</h4>
                </Link>
             </div>
           </div>
        </div>
      </section>

      {/* 11. Calculateur de volume */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center italic font-sans italic transition-all font-sans italic transition-all italic transition-all italic">
          <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all italic underline italic italic transition-all underline-offset-8 decoration-accent/10 transition-all font-sans italic transition-all underline underline-offset-4 decoration-accent tracking-[0.05em]">L'ESTIMATION DU VOLUME</h2>
          <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all transition-all">
            Avant de solliciter votre devis personnalisé Paris Bordeaux, utilisez notre calculateur de volume. Cette estimation indicative sera affinée selon les accès et les caractéristiques de votre projet.
          </p>
          <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-xl italic tracking-tight italic italic italic italic transition-all italic transition-all underline decoration-white/10 transition-all font-sans italic transition-all">
            <Calculator size={28} className="text-accent" />
            Accéder au calculateur
          </Link>
        </div>
      </section>

      {/* 12. Notre méthode en 5 étapes */}
      <section className="py-24 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all font-sans italic transition-all italic transition-all italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 text-center uppercase tracking-tight italic underline decoration-accent/20 underline-offset-8 transition-all italic underline italic italic transition-all underline-offset-8 decoration-accent/10 transition-all font-sans italic transition-all">Méthode <span className="text-accent italic tracking-tight italic italic transition-all underline-offset-8 italic transition-all transition-all italic font-sans underline underline-offset-4 decoration-brand-900/10">Bordeaux Direct</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 text-center italic font-sans transition-all italic transition-all transition-all italic h-full transition-all">
            {[
              { icon: ClipboardCheck, t: "Analyse", d: "Étude de vos besoins spécifiques." },
              { icon: Ruler, t: "Estimation", d: "Volume, adresses et accès." },
              { icon: Box, t: "Préparation", d: "Choix de formule et cartons." },
              { icon: Truck, t: "Transport", d: "Acheminement sécurisé vers Bordeaux." },
              { icon: Home, t: "Livraison", d: "Installation selon la prestation." }
            ].map((step, i) => (
              <div key={i} className="space-y-6 group italic font-sans italic italic transition-all italic transition-all h-full italic transition-all">
                 <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto text-brand-900 border border-slate-100 group-hover:bg-accent transition-all duration-500 relative grayscale-[20%] group-hover:grayscale-0 italic transition-all">
                   <step.icon size={28} />
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-[10px] italic transition-all">{i+1}</div>
                 </div>
                 <div className="px-2 italic transition-all">
                    <h4 className="font-bold text-brand-900 mb-2 text-xs italic tracking-tight transition-all font-sans uppercase italic italic italic transition-all font-display">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-light leading-relaxed italic opacity-80 italic italic transition-all italic transition-all italic">{step.d}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Autres destinations longue distance */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all font-sans italic transition-all italic transition-all italic">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all italic font-sans italic transition-all underline underline-offset-8 italic transition-all">
             <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all font-sans italic">Autres <span className="text-accent italic tracking-tight italic italic underline italic underline-offset-4 italic">destinations</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 italic font-sans transition-all italic">
            {[
               { n: "Lyon", l: "/demenagement-paris-lyon" },
               { n: "Marseille", l: "/demenagement-paris-marseille" },
               { n: "Toulouse", l: "/demenagement-paris-toulouse" },
               { n: "Nantes", l: "/demenagement-paris-nantes" },
               { n: "Lille", l: "/demenagement-paris-lille" },
               { n: "Strasbourg", l: "/demenagement-paris-strasbourg" },
               { n: "Montpellier", l: "/demenagement-paris-montpellier" },
               { n: "Rennes", l: "/demenagement-paris-rennes" }
            ].map((dest, i) => (
              <Link key={i} to={dest.l} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-center text-center group hover:border-accent hover:shadow-xl transition-all italic font-sans italic transition-all">
                 <span className="font-bold text-brand-900 group-hover:text-accent italic font-sans uppercase text-[10px] tracking-widest italic transition-all">Vers {dest.n}</span>
              </Link>
            ))}
            {[
              "Nice"
            ].map((dest, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-center text-center opacity-60 grayscale-[50%] italic font-sans italic transition-all">
                 <span className="font-bold text-slate-400 italic font-sans uppercase text-[10px] tracking-widest italic">Vers {dest}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. CTA intermédiaire */}
      <section className="py-24 bg-brand-900 relative overflow-hidden font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic transition-all">
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 font-display uppercase tracking-tight italic leading-tight italic transition-all italic h-full">VOTRE PROJET <br/><span className="text-accent italic tracking-tight italic italic border-b-4 border-accent shadow-sm transition-all italic font-display underline decoration-accent/20">PARIS BORDEAUX ?</span></h2>
           <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos adresses et le niveau d’accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic italic transition-all italic transition-all italic transition-all italic shadow-2xl transition-all transition-all italic transition-all italic transition-all italic shadow-xl transition-all">
             <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] italic shadow-xl transition-all transition-all italic transition-all italic transition-all">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] italic shadow-md transition-all transition-all italic transition-all italic transition-all backdrop-blur-sm">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%] italic transition-all italic italic transition-all italic transition-all italic shadow-2xl transition-all transition-all italic transition-all italic transition-all italic"></div>
      </section>

      {/* 15. FAQ Paris Bordeaux */}
      <section className="py-24 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
           <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all italic font-sans italic transition-all underline underline-offset-8 italic transition-all">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight transition-all font-sans italic underline decoration-accent/20 underline-offset-[12px] italic transition-all underline italic transition-all underline-offset-2">FAQ PARIS BORDEAUX</h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic selection:bg-accent italic">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic transition-all border-l-4 border-accent pl-6 italic italic italic transition-all italic h-full transition-all font-display">
                   <HelpCircle className="text-accent shrink-0 mt-1 italic transition-all italic transition-all transition-all italic transition-all" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-12 italic italic italic italic italic italic transition-all italic transition-all italic transition-all underline decoration-brand-900/10 transition-all font-sans italic transition-all italic transition-all italic transition-all">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 16. Maillage interne final */}
      <section className="py-12 bg-slate-900 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 italic italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic transition-all uppercase">Devis Gratuit</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic transition-all uppercase">Calculateur</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic transition-all uppercase">Formules</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic transition-all uppercase font-bold">Longue Distance</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all italic transition-all uppercase">Île-de-France</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5 italic italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-white/10 transition-all font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic selection:bg-accent italic">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all uppercase">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all uppercase">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all uppercase">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all uppercase">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all uppercase">Emballage</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all uppercase">Matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all italic italic transition-all italic transition-all italic selection:bg-accent italic transition-all uppercase">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic selection:bg-accent italic">
            <Link to="/demenagement-paris-20" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Paris 20e</Link>
            <Link to="/demenagement-hauts-de-seine" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Hauts-de-Seine</Link>
            <Link to="/demenagement-seine-saint-denis" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Seine-Saint-Denis</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Val-de-Marne</Link>
            <Link to="/demenagement-yvelines" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Yvelines</Link>
            <Link to="/demenagement-essonne" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Essonne</Link>
            <Link to="/demenagement-val-d-oise" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Val-d'Oise</Link>
            <Link to="/demenagement-seine-et-marne" className="hover:text-accent uppercase italic transition-all font-sans italic transition-all">Seine-et-Marne</Link>
            <Link to="/demenagement-paris-lyon" className="hover:text-accent uppercase transition-all">Paris-Lyon</Link>
            <Link to="/demenagement-paris-marseille" className="hover:text-accent uppercase transition-all">Paris-Marseille</Link>
            <Link to="/demenagement-paris-toulouse" className="hover:text-accent uppercase transition-all">Paris-Toulouse</Link>
            <Link to="/demenagement-paris-nantes" className="hover:text-accent uppercase transition-all">Paris-Nantes</Link>
            <Link to="/demenagement-paris-lille" className="hover:text-accent uppercase transition-all">Paris-Lille</Link>
            <Link to="/demenagement-paris-strasbourg" className="hover:text-accent uppercase transition-all">Paris-Strasbourg</Link>
            <Link to="/demenagement-paris-montpellier" className="hover:text-accent uppercase transition-all">Paris-Montpellier</Link>
            <Link to="/demenagement-paris-rennes" className="hover:text-accent uppercase transition-all">Paris-Rennes</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LongueDistanceParisBordeaux;
