import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, 
  Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, 
  Briefcase, Info, Box, Anchor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LongueDistanceParisNantes: React.FC = () => {
  const path = "/demenagement-paris-nantes";

  const faqs = [
    { 
      q: "Comment organiser un déménagement de Paris vers Nantes ?", 
      a: "Un déménagement de Paris vers Nantes demande d’anticiper le volume, les accès au départ et à l’arrivée, la distance, les cartons, les meubles volumineux, les objets fragiles et la formule souhaitée. Marne Transdem vous accompagne pour préparer une organisation adaptée à votre projet." 
    },
    { 
      q: "Marne Transdem propose-t-elle des déménagements depuis l’Île-de-France vers Nantes ?", 
      a: "Oui, Marne Transdem accompagne des projets de déménagement depuis Paris ou l’Île-de-France vers Nantes selon les besoins, le volume, les accès et l’organisation du projet." 
    },
    { 
      q: "Comment estimer le volume pour un déménagement Paris Nantes ?", 
      a: "Vous pouvez utiliser le calculateur de volume pour obtenir une première estimation indicative. Le volume réel peut ensuite être affiné selon votre inventaire, les dimensions des meubles, les cartons et les conditions d’accès." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement de Paris vers Nantes ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Peut-on prévoir un garde-meuble lors d’un déménagement Paris Nantes ?", 
      a: "Oui, une solution de stockage peut être utile si les dates de départ et d’arrivée ne coïncident pas, si vous réalisez des travaux ou si vous avez besoin d’une transition avant l’installation définitive." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement Paris Nantes ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans italic">
      <SEO 
        title="Déménagement Paris Nantes | Marne Transdem"
        description="Organisez votre déménagement de Paris vers Nantes avec Marne Transdem. Volume, emballage, transport longue distance, formules adaptées et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Longue distance", item: "/demenagement-longue-distance" },
            { name: "Paris Nantes", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white italic">
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
              Paris <span className="text-accent italic">Nantes</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement depuis Paris ou l’Île-de-France vers Nantes, avec une organisation adaptée au volume, aux accès et à la distance.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic tracking-tighter decoration-brand-900/10">
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
      <section className="py-24 italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/10 underline-offset-8">
                Préparer un déménagement <br/><span className="text-accent italic">de Paris vers Nantes</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Un déménagement entre Paris et Nantes demande une préparation sérieuse, car il s’agit d’un trajet longue distance vers l’ouest de la France. Entre la capitale et la cité des Ducs, près de 400 km séparent vos adresses, nécessitant une logistique éprouvée.
                </p>
                <p>
                  Qu'il s'agisse de transporter votre mobilier, vos <span className="font-bold text-slate-700 tracking-tight">cartons</span> ou vos objets fragiles, Marne Transdem gère votre <span className="font-bold text-brand-900">départ depuis Paris</span> ou l’Île-de-France pour une arrivée structurée à <span className="font-bold text-brand-900">Nantes</span>. Notre équipe étudie les accès, le volume à transporter et les contraintes de stationnement pour vous proposer un devis ajusté.
                </p>
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl grayscale-[20%] transition-all h-full aspect-square">
               <img src="https://images.unsplash.com/photo-1549416878-b9ca35c2d4ac?auto=format&fit=crop&q=80&w=800" alt="Paris Nantes Transport" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement Paris Nantes demande une bonne organisation */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 underline decoration-accent/10 underline-offset-8">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 mb-6">Logistique <span className="text-accent tracking-tight">Cap à l'Ouest</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto">
              La réussite d'un trajet longue distance vers l'Atlantique repose sur une anticipation rigoureuse des accès au départ et à l'arrivée.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
            {[
              { icon: Truck, t: "Liaison A11 / Océane", d: "Acheminement sécurisé entre l'Île-de-France et la Loire-Atlantique." },
              { icon: Package, t: "Conditionnement Expert", d: "Protection des meubles et objets fragiles adaptée à un transport de près de 400km." },
              { icon: Ruler, t: "Analyse des Accès", d: "Étude des étages, ascenseurs et escaliers tant à Paris qu'au centre-ville de Nantes." },
              { icon: Calculator, t: "Volume Indicatif", d: "Estimation du cubage nécessaire pour optimiser le transport et le coût de la prestation." },
              { icon: Calendar, t: "Coordination Planning", d: "Synchronisation des dates de chargement et de livraison pour une transition fluide." },
              { icon: ClipboardCheck, t: "Méthode Longue Distance", d: "Une approche professionnelle pour sécuriser votre patrimoine durant tout le trajet vers l'Ouest." }
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

      {/* 4. Nos services pour votre déménagement Paris Nantes */}
      <section className="py-24 italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline">Prestations <span className="text-accent tracking-tight underline-offset-4">Loire-Atlantique</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 italic">
          {[
            { t: "Particuliers", d: "Accompagnement des familles qui quittent Paris ou l’Île-de-France pour s’installer à Nantes.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Organisation des transferts professionnels et bureaux vers le bassin nantais.", l: "/demenagement-entreprises-paris" },
            { t: "Emballage", d: "Protection experte du mobilier et des objets fragiles pour le trajet.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Fourniture de matériel utile pour préparer vos effets personnels.", l: "/cartons-demenagement-paris" },
            { t: "Garde-meuble", d: "Solution de stockage temporaire en cas de décalage entre les dates.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Location au départ ou à l'arrivée pour les accès complexes.", l: "/location-monte-meuble-paris" },
            { t: "Formules", d: "De l’Économique au Luxe selon votre budget et l'aide souhaitée.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Outil d'estimation indicatif du volume de votre déménagement.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full italic">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest italic">{s.t}</h3>
                <p className="text-slate-400 text-[10px] font-light leading-relaxed italic opacity-80">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors italic">
                Voir le service <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement Paris Nantes pour les particuliers */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1 grayscale-[10%]">
               <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" alt="Particulier Paris Nantes" className="w-full h-full object-cover transition-all h-full grayscale-[10%]" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 italic">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Déménagement particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les projets de changement de résidence, mutation ou <span className="font-bold text-slate-700">installation à Nantes</span>.
                </p>
                <p>
                   Qu’il s’agisse d’un appartement, d’une maison de famille ou d’un studio d'étudiant, nous gérons votre transport au départ vers l’ouest avec une protection optimale de vos meubles et cartons. Nous vous aidons à choisir la formule de déménagement qui correspond le mieux à votre situation et à votre budget.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl italic tracking-tight">
                Demander mon devis Paris Nantes <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement Paris Nantes pour les entreprises */}
      <section className="py-24 italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative grayscale-[10%] italic transition-all h-full transition-all grayscale-[10%]">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Entreprise Paris Nantes" className="w-full h-full object-cover italic transition-all h-full" />
             </div>
             <div className="lg:w-1/2 space-y-8 italic">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic h-full underline decoration-accent/20 underline-offset-4">Transfert d'entreprise</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Marne Transdem met son expertise au service des bureaux et agences souhaitant organiser un <span className="font-bold text-brand-900">transfert professionnel</span> entre Paris/IDF et Nantes.
                 </p>
                 <p>
                    Nous assurons le transport sécurisé du mobilier de bureau, des <span className="font-bold text-slate-700 italic font-bold">archives</span> et du matériel informatique. Une coordination rigoureuse du planning permet de garantir la continuité d'activité de votre entreprise durant son installation en Loire-Atlantique.
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
      <section className="py-24 bg-slate-50 border-y border-slate-100 italic">
        <div className="container mx-auto px-4 md:px-6 italic text-center">
          <div className="mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all">Départ <span className="text-accent underline underline-offset-4">Paris & Région</span></h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 italic">
             <Link to="/demenagement-paris-20" className="hover:text-accent transition-all italic">Paris 20e</Link>
             <Link to="/demenagement-montreuil" className="hover:text-accent transition-all italic">Montreuil</Link>
             <Link to="/demenagement-vincennes" className="hover:text-accent transition-all italic">Vincennes</Link>
             <Link to="/demenagement-saint-mande" className="hover:text-accent transition-all italic">Saint-Mandé</Link>
             <Link to="/demenagement-bagnolet" className="hover:text-accent transition-all italic">Bagnolet</Link>
             <Link to="/demenagement-hauts-de-seine" className="hover:text-accent transition-all italic">Hauts-de-Seine</Link>
             <Link to="/demenagement-seine-saint-denis" className="hover:text-accent transition-all italic">Seine-Saint-Denis</Link>
             <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all italic">Val-de-Marne</Link>
             <Link to="/demenagement-yvelines" className="hover:text-accent transition-all italic">Yvelines</Link>
             <Link to="/demenagement-essonne" className="hover:text-accent transition-all italic">Essonne</Link>
             <Link to="/demenagement-val-d-oise" className="hover:text-accent transition-all italic">Val-d'Oise</Link>
             <Link to="/demenagement-seine-et-marne" className="hover:text-accent transition-all italic">Seine-et-Marne</Link>
             <Link to="/demenagement-ile-de-france" className="hover:text-brand-900 border-b border-accent/20 italic font-bold">Île-de-France Global</Link>
          </div>
        </div>
      </section>

      {/* 8. Arrivée à Nantes */}
      <section className="py-24 bg-brand-900 text-white italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
             <div className="space-y-8 italic">
               <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic h-full underline decoration-accent/20 underline-offset-4">Arrivée <br/><span className="text-accent italic transition-all">à Nantes</span></h2>
               <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic">
                 <p>
                   L’arrivée à <span className="text-white font-bold italic tracking-tight">Nantes</span> doit faire l'objet d'une anticipation selon la configuration de votre adresse de destination. Chaque projet est étudié selon le type de logement et les accès spécifiques.
                 </p>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 italic">
                    {[
                      "Appartement ou maison", "Étage & Cage d'escalier", "Accès centre-ville", "Stationnement réservé", "Meubles volumineux", "Faisabilité Monte-meuble"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs italic font-black uppercase tracking-widest text-slate-500">
                         <div className="w-1.5 h-1.5 bg-accent rounded-full italic transition-all"></div>
                         {item}
                      </li>
                    ))}
                 </ul>
               </div>
             </div>
             <div className="bg-white/5 rounded-[3.5rem] p-12 lg:p-20 border border-white/10 backdrop-blur-md shadow-2xl space-y-8 italic text-brand-900 bg-white">
                <Info className="text-accent mb-4 grayscale-[20%]" size={32} />
                <p className="text-slate-500 italic font-light leading-relaxed text-sm">
                  Marne Transdem accompagne votre installation nantaise avec rigueur. La mise en place d'un monte-meuble sera préconisée selon la configuration constatée à l'adresse d'arrivée et les possibilités techniques offertes par l'accès extérieur.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 9. Formules adaptées à un déménagement Paris Nantes */}
      <section className="py-24 bg-slate-50 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline underline-offset-8 decoration-accent/20 transition-all">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">Formules Paris Nantes</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto italic">
          {[
            { n: "Économique", d: "Vous préparez vos cartons, Marne Transdem assure la manutention et le transport sécurisé vers l'Ouest." },
            { n: "Standard", d: "Formule équilibrée déléguant la protection des meubles et objets fragiles selon vos besoins." },
            { n: "Luxe", d: "Délégation maximale incluant préparation, emballage et organisation experte de votre projet." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between italic transition-all h-full ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-[0.25em] border-b border-accent/20 pb-1 hover:border-accent transition-all">Détails des offres</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20 italic">
           <Link to="/formules-demenagement" className="bg-brand-900 text-white px-12 py-6 rounded-full font-bold hover:shadow-2xl transition-all shadow-xl italic tracking-tight">
             Comparer les formules
           </Link>
        </div>
      </section>

      {/* 10. Volume, accès et organisation du transport */}
      <section className="py-24 italic transition-all text-center">
        <div className="container mx-auto px-4 md:px-6 italic">
           <div className="max-w-4xl mx-auto space-y-12 italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">Organisation <span className="text-accent italic border-b-4 border-accent">du transport</span></h2>
             <p className="text-slate-500 text-lg font-light leading-relaxed italic">
                Le devis de votre <span className="font-bold text-brand-900 italic tracking-tight">Paris Nantes</span> dépend de l'étude rigoureuse du volume, des adresses, des étages et de la formule choisie pour ce trajet longue distance vers l’ouest de la France.
             </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 italic">
                <Link to="/calculateur-volume" className="bg-slate-900 p-8 rounded-3xl group flex flex-col justify-between h-full italic transition-all hover:bg-black">
                   <Calculator className="text-accent mb-6 transition-all" size={32} />
                   <h4 className="text-white font-bold italic font-sans uppercase text-sm tracking-widest italic group-hover:text-accent transition-all">Calculateur Volume</h4>
                </Link>
                <Link to="/location-monte-meuble-paris" className="bg-slate-50 p-8 rounded-3xl group border border-slate-100 flex flex-col justify-between h-full italic transition-all hover:border-accent">
                   <Zap className="text-accent mb-6 transition-all" size={32} />
                   <h4 className="text-brand-900 font-bold italic font-sans uppercase text-sm tracking-widest italic transition-all">Monte-meuble</h4>
                </Link>
             </div>
           </div>
        </div>
      </section>

      {/* 11. Calculateur de volume */}
      <section className="py-24 bg-brand-900 text-white italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center italic font-sans">
          <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">VOLUME ESTIMATIF</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed">
            Avant de solliciter votre devis personnalisé de Paris vers Nantes, utilisez notre calculateur de volume. Cette estimation reste indicative et pourra être affinée selon les conditions réelles de votre projet.
          </p>
          <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-accent text-brand-900 px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all shadow-xl italic tracking-tight text-brand-900">
            <Calculator size={28} className="text-brand-900" />
            Lancer le calculateur
          </Link>
        </div>
      </section>

      {/* 12. Notre méthode en 5 étapes */}
      <section className="py-24 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 text-center uppercase tracking-tight italic underline decoration-accent/20 underline-offset-8 transition-all">Méthode <span className="text-accent italic font-sans">Paris Nantes</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 text-center italic h-full transition-all">
            {[
              { icon: ClipboardCheck, t: "Analyse", d: "Analyse de votre projet spécifique." },
              { icon: Ruler, t: "Estimation", d: "Cubage, accès et contraintes." },
              { icon: Box, t: "Préparation", d: "Choix de formule et emballage." },
              { icon: Truck, t: "Transport", d: "Acheminement sécurisé vers Nantes." },
              { icon: Home, t: "Livraison", d: "Dénouement et installation du projet." }
            ].map((step, i) => (
              <div key={i} className="space-y-6 group h-full">
                 <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto text-brand-900 border border-slate-100 group-hover:bg-accent transition-all duration-500 relative grayscale-[20%] group-hover:grayscale-0 italic transition-all">
                   <step.icon size={28} />
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-[10px] italic transition-all">{i+1}</div>
                 </div>
                 <div className="px-2 italic transition-all">
                    <h4 className="font-bold text-brand-900 mb-2 text-xs italic tracking-tight transition-all uppercase">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-light leading-relaxed italic opacity-80 transition-all">{step.d}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Autres destinations longue distance */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center italic">
          <div className="mb-16 italic transition-all">
             <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all">Province <span className="text-accent underline underline-offset-4 italic">depuis Paris</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 italic transition-all">
            {[
               { n: "Lyon", l: "/demenagement-paris-lyon" },
               { n: "Marseille", l: "/demenagement-paris-marseille" },
               { n: "Bordeaux", l: "/demenagement-paris-bordeaux" },
               { n: "Toulouse", l: "/demenagement-paris-toulouse" },
               { n: "Lille", l: "/demenagement-paris-lille" },
               { n: "Strasbourg", l: "/demenagement-paris-strasbourg" },
               { n: "Montpellier", l: "/demenagement-paris-montpellier" },
               { n: "Rennes", l: "/demenagement-paris-rennes" }
            ].map((dest, i) => (
              <Link key={i} to={dest.l} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-center text-center group hover:border-accent hover:shadow-xl transition-all">
                 <span className="font-bold text-brand-900 group-hover:text-accent font-sans uppercase text-[10px] tracking-widest italic transition-all">Vers {dest.n}</span>
              </Link>
            ))}
            {[
              "Nice"
            ].map((dest, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-center text-center opacity-60 grayscale-[50%] italic transition-all">
                 <span className="font-bold text-slate-400 uppercase text-[10px] tracking-widest italic">Vers {dest}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 transition-all">
             <Link to="/demenagement-longue-distance" className="text-brand-900 font-black uppercase text-[10px] tracking-[0.25em] border-b-2 border-accent pb-1 hover:text-accent transition-all italic">Toutes nos destinations longue distance</Link>
          </div>
        </div>
      </section>

      {/* 14. CTA intermédiaire */}
      <section className="py-24 bg-brand-900 relative overflow-hidden italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic">
           <h2 className="text-3xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight italic leading-tight h-full font-display">PRÉPARER MON <br/><span className="text-accent italic border-b-4 border-accent shadow-sm transition-all italic underline decoration-accent/20 underline-offset-8">PARIS NANTES ?</span></h2>
           <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto italic font-light leading-relaxed">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d’accompagnement souhaité vers la Loire-Atlantique.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic shadow-2xl transition-all">
             <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] italic shadow-xl">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] italic shadow-md backdrop-blur-sm">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%] italic transition-all shadow-2xl"></div>
      </section>

      {/* 15. FAQ Paris Nantes */}
      <section className="py-24 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic transition-all">
           <div className="text-center mb-16 italic underline decoration-accent/10 underline-offset-8 transition-all">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-[12px] italic transition-all underline outline-offset-2">FAQ PARIS NANTES</h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic transition-all">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic transition-all selection:bg-accent font-sans">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic transition-all border-l-4 border-accent pl-6 italic transition-all font-display">
                   <HelpCircle className="text-accent shrink-0 mt-1 italic transition-all" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-12 italic transition-all underline decoration-brand-900/10 transition-all">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 16. Maillage interne final */}
      <section className="py-12 bg-slate-900 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic transition-all">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 transition-all mb-8">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all uppercase">Demande de Devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all uppercase">Calculateur Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all uppercase">Nos Formules</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all uppercase font-bold">Longue Distance</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all uppercase">Île-de-France</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5 transition-all">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all uppercase">Déménagement Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all uppercase">Déménagement Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all uppercase">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all uppercase">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all uppercase">Emballage & Protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all uppercase">Cartons & Matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all uppercase">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 transition-all">
            <Link to="/demenagement-paris-20" className="hover:text-accent uppercase transition-all">Paris 20e</Link>
            <Link to="/demenagement-hauts-de-seine" className="hover:text-accent uppercase transition-all">Hauts-de-Seine</Link>
            <Link to="/demenagement-seine-saint-denis" className="hover:text-accent uppercase transition-all">Seine-Saint-Denis</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent uppercase transition-all">Val-de-Marne</Link>
            <Link to="/demenagement-yvelines" className="hover:text-accent uppercase transition-all">Yvelines</Link>
            <Link to="/demenagement-essonne" className="hover:text-accent uppercase transition-all">Essonne</Link>
            <Link to="/demenagement-val-d-oise" className="hover:text-accent uppercase transition-all">Val-d'Oise</Link>
            <Link to="/demenagement-seine-et-marne" className="hover:text-accent uppercase transition-all">Seine-et-Marne</Link>
            <Link to="/demenagement-paris-lyon" className="hover:text-accent uppercase transition-all">Paris-Lyon</Link>
            <Link to="/demenagement-paris-marseille" className="hover:text-accent uppercase transition-all">Paris-Marseille</Link>
            <Link to="/demenagement-paris-bordeaux" className="hover:text-accent uppercase transition-all">Paris-Bordeaux</Link>
            <Link to="/demenagement-paris-toulouse" className="hover:text-accent uppercase transition-all">Paris-Toulouse</Link>
            <Link to="/demenagement-paris-lille" className="hover:text-accent uppercase transition-all">Paris-Lille</Link>
            <Link to="/demenagement-paris-strasbourg" className="hover:text-accent uppercase transition-all">Paris-Strasbourg</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LongueDistanceParisNantes;
