import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, Briefcase, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalYvelines: React.FC = () => {
  const path = "/demenagement-yvelines";
  
  const faqs = [
    { 
      q: "Marne Transdem intervient-elle dans les Yvelines ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement dans les Yvelines selon les besoins, le volume, les accès et l’organisation du projet. L’entreprise intervient auprès des particuliers et des entreprises pour des déménagements locaux, régionaux ou longue distance selon les cas." 
    },
    { 
      q: "Comment organiser un déménagement dans les Yvelines ?", 
      a: "Il faut anticiper le volume à transporter, les accès aux deux adresses, les étages, les ascenseurs, le stationnement, les cartons, les meubles volumineux et la formule souhaitée. Le calculateur de volume peut aider à préparer une première estimation avant la demande de devis." 
    },
    { 
      q: "Proposez-vous des déménagements entre Paris et les Yvelines ?", 
      a: "Oui, Marne Transdem accompagne les déménagements entre Paris et les Yvelines, dans les deux sens, selon les besoins du projet et les contraintes d’accès." 
    },
    { 
      q: "Peut-on demander un monte-meuble dans les Yvelines ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement dans les Yvelines ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement dans les Yvelines ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const cities = [
    { n: "Versailles", d: "Déménagements de maisons, appartements, résidences et bureaux selon le volume et les accès.", l: "/demenagement-versailles" },
    { n: "Vélizy-Villacoublay", d: "Déménagements professionnels et résidentiels à proximité du pôle aéronautique.", l: "/demenagement-velizy-villacoublay" },
    { n: "Saint-Germain-en-Laye", d: "Accompagnement des projets de déménagement résidentiels et pros dans l'ouest francilien.", l: null },
    { n: "Mantes-la-Jolie", d: "Organisation des déménagements de particuliers et d'entreprises dans les Yvelines.", l: null },
    { n: "Poissy", d: "Déménagements de logements familiaux, appartements, maisons et locaux professionnels.", l: null },
    { n: "Sartrouville", d: "Déménagements entre Paris, les Yvelines, le Val-d'Oise et les communes voisines.", l: null },
    { n: "Rambouillet", d: "Accompagnement des déménagements de particuliers et projets longue distance depuis le sud 78.", l: null },
    { n: "Houilles", d: "Solutions de proximité pour les familles et actifs travaillant sur Paris ou La Défense.", l: null },
    { n: "Maisons-Laffitte", d: "Déménagements premium pour pavillons, appartements de standing et résidences.", l: null },
    { n: "Chatou", d: "Accompagnement des projets résidentiels dans les boucles de la Seine.", l: null },
    { n: "Le Vésinet", d: "Expertise pour les déménagements de maisons et propriétés avec accès spécifiques.", l: null },
    { n: "Conflans-Sainte-Honorine", d: "Déménagements pour particuliers et entreprises dans le confluent Seine-Oise.", l: null },
    { n: "Montigny-le-Bretonneux", d: "Transferts de bureaux et logements collectifs dans la zone de Saint-Quentin-en-Yvelines.", l: null },
    { n: "Guyancourt", d: "Logistique adaptée aux quartiers d'affaires et résidences de standing.", l: null },
    { n: "Plaisir", d: "Accompagnement des déménagements de maisons et logements familiaux en zone commerciale.", l: null },
    { n: "Le Chesnay-Rocquencourt", d: "Services pour appartements et pavillons proche de Versailles.", l: null }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Yvelines | Marne Transdem"
        description="Préparez votre déménagement dans les Yvelines avec Marne Transdem. Services pour particuliers et entreprises, maisons, appartements, formules adaptées et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Yvelines", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <MapPin size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement départemental 78</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Yvelines</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement dans les Yvelines, avec une organisation adaptée aux maisons, appartements et bureaux du 78.
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

      {/* 2. Introduction départementale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center font-sans">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre déménagement <br/><span className="text-accent italic tracking-tight italic">dans les Yvelines</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les déménagements dans les <span className="font-bold text-slate-700 tracking-tight">Yvelines</span> pour les particuliers et les entreprises. Le <span className="font-bold text-slate-700 tracking-tight">département 78</span>, situé en grande couronne, se caractérise par ses nombreux quartiers résidentiels et sa proximité stratégique avec <span className="text-brand-900 font-bold italic tracking-tight">Paris</span> et l'ouest francilien.
                </p>
                <p>
                  Que vous prépariez le transfert d'une <span className="font-bold text-slate-700 tracking-tight italic tracking-tight">maison</span> avec <span className="font-bold text-slate-700 tracking-tight">jardin</span>, d'un <span className="font-bold text-slate-700 tracking-tight">pavillon</span>, d'un <span className="font-bold text-slate-700 tracking-tight italic">appartement</span> en résidence ou d'un transfert de <span className="font-bold text-slate-700 tracking-tight text-slate-700">bureaux</span> et <span className="font-bold text-slate-700 tracking-tight tracking-tight">commerces</span>, nous maîtrisons les contraintes d'accès (garages, caves, étages). De l'estimation rigoureuse du <span className="font-bold text-slate-700 tracking-tight">volume</span> à la gestion du stationnement, notre <span className="font-bold text-slate-700 tracking-tight font-bold">demande de devis</span> s'adapte à chaque configuration du 78.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-maison-versailles-78.jpg" 
                  alt="Yvelines Déménagement" 
                  className="w-full h-full object-cover grayscale-[30%]"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement dans les Yvelines demande une bonne organisation */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic">Logistique <span className="text-accent underline decoration-accent/20 italic tracking-tight">adaptée au 78</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto italic">
              Les Yvelines présentent des défis logistiques variés, entre centres urbains denses et zones pavillonnaires étendues.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: Home, t: "Maisons & Pavillons", d: "Volumes souvent plus importants nécessitant des véhicules adaptés et une gestion des accès garage/jardin." },
               { icon: Truck, t: "Accès & Stationnement", d: "Anticipation rigoureuse du stationnement, que ce soit en rue ou dans les allées privatives." },
               { icon: Ruler, t: "Volumes Étendus", d: "Logements familiaux avec caves, garages et combles demandant une estimation précise pour le devis." },
               { icon: Package, t: "Protection Absolue", d: "Emballage soigné du mobilier, des objets fragiles et protection des parties communes en résidence." },
               { icon: Briefcase, t: "Transferts Pros", d: "Expertise pour les bureaux, commerces et agences de l'ouest francilien avec planning optimisé." },
               { icon: Trees, t: "Grande Couronne", d: "Trajets maîtrisés entre Paris et le 78 ou vers la France entière en longue distance." }
             ].map((item, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-accent transition-all group">
                 <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform grayscale-[20%]" size={40} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services dans les Yvelines */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight">Nos services <span className="text-accent">dans le 78</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {[
            { t: "Particuliers", d: "Maisons, appartements, pavillons et résidences familiales.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Transferts de bureaux, commerces et professions libérales.", l: "/demenagement-entreprises-paris" },
            { t: "Garde-meuble", d: "Solution de stockage temporaire pendant votre transition.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Solution pour meubles volumineux ou accès difficiles.", l: "/location-monte-meuble-paris" },
            { t: "Emballage", d: "Protection experte du mobilier et des objets précieux.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel professionnel pour préparer vos pièces.", l: "/cartons-demenagement-paris" },
            { t: "Formules", d: "De l'économique au luxe selon votre niveau d'autonomie.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Estimation indicative du volume de mobilier à prévoir.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest">{s.t}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed italic opacity-80">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                En savoir plus <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement de particuliers dans les Yvelines */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center font-sans">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1 grayscale-[10%]">
               <img src="/images/demenagement-maison-yvelines.jpg" alt="Particulier Yvelines" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 italic font-sans">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Déménagement particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les familles pour leurs transferts de <span className="font-bold text-slate-700 tracking-tight italic tracking-tight">maisons</span>, <span className="font-bold text-slate-700 tracking-tight">pavillons</span>, appartements et <span className="font-bold text-slate-700 tracking-tight">résidences</span> dans l'ensemble des Yvelines.
                </p>
                <p>
                   Nous gérons vos projets <span className="font-bold text-slate-700 tracking-tight italic">Paris vers Yvelines</span>, inversement, ou entre deux communes du 78. Notre organisation prend en compte les volumes souvent plus importants en grande couronne, avec une attention portée aux <span className="font-bold text-slate-700 tracking-tight">garages</span>, caves et parkings.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl italic tracking-tight">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises dans les Yvelines */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center font-sans">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative grayscale-[10%]">
                <img src="/images/transfert-entreprise-78-yvelines.jpg" alt="Entreprise Yvelines" className="w-full h-full object-cover" />
             </div>
             <div className="lg:w-1/2 space-y-8 italic font-sans">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Transferts professionnels</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Nous accompagnons les professionnels du 78 : <span className="font-bold text-slate-700 tracking-tight">bureaux</span>, commerces, agences, <span className="font-bold text-slate-700 tracking-tight">cabinets</span> et locaux d'activités.
                 </p>
                 <p>
                    Transfert du mobilier professionnel, des <span className="font-bold text-slate-700 tracking-tight">archives</span> et du matériel informatique avec un planning millimétré pour assurer la <span className="font-bold text-slate-700 tracking-tight italic">continuité d'activité</span> de votre entreprise dans l'ouest parisien.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all italic tracking-tight">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Villes desservies dans les Yvelines */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 italic">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 font-sans transition-all">Villes desservies <span className="text-accent italic tracking-tight">dans le 78</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {cities.map((city, i) => (
              city.l ? (
                <Link key={i} to={city.l} className="bg-white/70 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between group hover:border-accent hover:shadow-xl transition-all">
                  <div>
                    <h3 className="font-bold text-brand-900 mb-3 uppercase text-xs italic tracking-widest group-hover:text-accent transition-colors">{city.n}</h3>
                    <p className="text-slate-400 text-[11px] font-light italic leading-relaxed opacity-80 italic">{city.d}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Voir la page <ArrowRight size={10} />
                  </div>
                </Link>
              ) : (
                <div key={i} className="bg-white/70 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between group hover:border-slate-300 transition-all">
                  <div>
                    <h3 className="font-bold text-brand-900 mb-3 uppercase text-xs italic tracking-widest opacity-60">{city.n}</h3>
                    <p className="text-slate-400 text-[11px] font-light italic leading-relaxed opacity-80 italic">{city.d}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 8. Déménagement entre Paris et les Yvelines */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden font-sans italic">
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-10 italic">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic">Axe Paris <br/>Yvelines</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic">
                <p>
                  De nombreux projets concernent les flux entre la capitale (<span className="text-white font-bold italic tracking-tight">Paris 15e, 16e, 17e</span>) et le département 78. Marne Transdem gère ces interventions de grande couronne avec une logistique adaptée aux distances et volumes.
                </p>
                <ul className="space-y-4 font-sans italic">
                  {["Flux Paris Ouest vers le 78", "Déménagements 78 vers Paris Intra-muros", "Trajets entre communes des Yvelines", "Départ Yvelines vers la Province"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm italic font-light">
                      <CheckCircle2 size={16} className="text-accent shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10 uppercase font-black text-[10px] tracking-widest italic">
                 <Link to="/demenagement-paris" className="text-accent hover:text-white transition-colors italic">Paris</Link>
                 <Link to="/demenagement-ile-de-france" className="text-accent hover:text-white transition-colors italic">Île-de-France</Link>
                 <Link to="/demenagement-longue-distance" className="text-accent hover:text-white transition-colors italic">Longue Distance</Link>
              </div>
            </div>
            <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl space-y-8 font-sans italic grayscale-[10%]">
               <h3 className="text-brand-900 font-black uppercase text-xl leading-tight italic">Logistique <br/><span className="text-accent italic tracking-tight">Maîtrisée</span></h3>
               <p className="text-slate-500 italic font-light leading-relaxed text-sm italic italic">
                 Qu'il s'agisse d'une maison de ville à Versailles ou d'un pavillon avec jardin, nous adaptons les moyens nécessaires : volume de chargement, équipe de manutention et matériel spécifique.
               </p>
               <div className="grid grid-cols-2 gap-6 pb-2">
                 <div className="text-brand-900 border-l border-accent/20 pl-4">
                    <Zap size={24} className="text-accent mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest block italic opacity-60">Réactivité</span>
                 </div>
                 <div className="text-brand-900 border-l border-accent/20 pl-4">
                    <Truck size={24} className="text-accent mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest block italic opacity-60">Expertise</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-[30%] translate-y-[-20%]"></div>
      </section>

      {/* 9. Formules adaptées aux Yvelines */}
      <section className="py-24 bg-slate-50 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Nos formules de déménagement</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto font-sans italic">
          {[
            { n: "Économique", d: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport." },
            { n: "Standard", d: "La formule équilibrée pour déléguer les objets fragiles et la protection experte du mobilier." },
            { n: "Luxe", d: "Délégation totale : nous assurons la préparation, l'emballage et l'organisation complète." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight italic">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10 italic italic">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-[0.25em] border-b border-accent/20 pb-1 hover:border-accent transition-all italic">Prestations détaillées</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl italic tracking-tight">
            Comparer les formules
          </Link>
        </div>
      </section>

      {/* 10. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl italic">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
               <div className="space-y-8 italic">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8 tracking-tight italic uppercase italic italic">Étude Logistique <br/>dans le 78</h2>
                 <p className="text-slate-400 font-light text-lg leading-relaxed italic italic">
                    Chaque trajet en Yvelines demande une étude attentive des accès pour adapter les moyens techniques nécessaires.
                 </p>
                 <div className="grid grid-cols-2 gap-6 italic">
                   {["Volume à déménager", "Nombre d'étages", "Accès Garage / Jardin", "Gestion Ascenseur", "Stationnement Rue", "Monte-meuble"].map((check, i) => (
                     <div key={i} className="flex items-center gap-4 text-slate-300 italic">
                       <CheckCircle2 className="text-accent shrink-0" size={16} />
                       <span className="font-light text-xs italic italic tracking-tight">{check}</span>
                     </div>
                   ))}
                 </div>
                 <div className="pt-8 italic">
                    <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] hover:text-white transition-all underline decoration-accent/20 italic">
                      Info Monte-meuble <ArrowRight size={14} />
                    </Link>
                 </div>
               </div>
               <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md shadow-inner text-slate-300 italic font-light leading-relaxed text-sm italic italic">
                  <p className="mb-0 italic font-sans opacity-80 italic">
                    L'utilisation d'un monte-meuble peut être pertinente lorsque les meubles ne passent pas par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration technique et de la faisabilité sur site.
                  </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 11. Calculateur de volume */}
      <section className="py-24 bg-slate-50 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-12 italic">
           <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic">Estimez votre mobilier</h2>
           <p className="text-slate-500 text-lg font-light italic leading-relaxed italic italic">
              Avant de solliciter votre devis dans les Yvelines, utilisez notre calculateur de volume. Cette estimation indicative permet de mieux préparer la logistique de votre projet.
           </p>
           <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group shadow-xl italic tracking-tight">
             <Calculator size={28} className="text-accent" />
             Calculateur en ligne
             <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 12. Déménagement longue distance depuis les Yvelines */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
             <div className="order-2 lg:order-1 relative grayscale-[20%]">
                <div className="aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white p-2 italic transition-all">
                   <img src="/images/demenagement-longue-distance-camion.jpg" alt="Déménagement longue distance Yvelines" className="w-full h-full object-cover rounded-[2rem] italic" />
                </div>
                <div className="absolute top-6 left-6 bg-brand-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 italic">
                   <Globe size={14} className="text-accent" /> Longue Distance
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-10 italic">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic">Départ Province</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed italic italic">
                 <p>
                   Marne Transdem accompagne vos projets de déménagement depuis les Yvelines vers d'autres destinations en France selon vos besoins.
                 </p>
                 <p>
                   De l'<span className="font-bold text-slate-700 tracking-tight text-slate-700">organisation longue distance</span> au choix de la <span className="font-bold text-slate-700 tracking-tight">formule</span>, nous assurons la protection de vos biens. Estimation personnalisée après étude du volume et des accès au départ comme à l'arrivée.
                 </p>
               </div>
               <Link to="/demenagement-longue-distance" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl italic tracking-tight">
                 Organiser un départ province <ArrowRight size={18} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 13. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Méthode <span className="text-accent italic tracking-tight italic">Marne Transdem</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative font-sans italic">
             <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-slate-200 -z-10 italic"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse Projet", d: "Prise en compte de vos besoins réels." },
               { icon: Ruler, t: "Évaluation", d: "Volume, adresses, accès et organisation." },
               { icon: Calendar, t: "Planification", d: "Choix de la formule et planning." },
               { icon: Truck, t: "Réalisation", d: "Transfert sécurisé de vos biens dans le 78." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group italic">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative grayscale-[30%] group-hover:grayscale-0 italic">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs italic">{i+1}</div>
                 </div>
                 <div className="px-4 italic">
                    <h4 className="font-bold text-brand-900 mb-3 text-sm italic tracking-tight italic uppercase italic">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed italic opacity-60 italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 14. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic leading-tight italic">VOTRE PROJET <br/>DANS LES YVELINES ?</h2>
           <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic italic">
             Particuliers ou entreprises, décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau de prestation souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] italic">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] italic">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-900/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%]"></div>
      </section>

      {/* 15. FAQ départementale */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic">
           <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic italic">FAQ YVELINES</h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic italic italic">
                   <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 16. Maillage interne final */}
      <section className="py-12 bg-slate-900 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 font-sans italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic">Devis Gratuit</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all italic">Calculateur Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all italic">Île-de-France</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all italic">Province</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5 italic">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all italic">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all italic">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all italic">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all italic">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all italic">Emballage</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all italic">Matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all italic">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans italic">
            <Link to="/demenagement-paris-15" className="hover:text-accent uppercase italic italic">Paris 15e</Link>
            <Link to="/demenagement-paris-16" className="hover:text-accent uppercase italic italic">Paris 16e</Link>
            <Link to="/demenagement-hauts-de-seine" className="hover:text-accent uppercase italic italic">Hauts-de-Seine</Link>
            <Link to="/demenagement-val-d-oise" className="hover:text-accent uppercase italic italic">Val-d'Oise</Link>
            {["Versailles", "Saint-Germain", "Mantes", "Poissy", "Sartrouville", "Rambouillet"].map(c => <span key={c} className="cursor-default uppercase italic italic">{c}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalYvelines;
