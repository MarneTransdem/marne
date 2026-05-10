import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, Briefcase, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalSeineEtMarne: React.FC = () => {
  const path = "/demenagement-seine-et-marne";
  
  const faqs = [
    { 
      q: "Marne Transdem intervient-elle en Seine-et-Marne ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement en Seine-et-Marne selon les besoins, le volume, les accès et l’organisation du projet. L’entreprise intervient auprès des particuliers et des entreprises pour des déménagements locaux, régionaux ou longue distance selon les cas." 
    },
    { 
      q: "Comment organiser un déménagement en Seine-et-Marne ?", 
      a: "Il faut anticiper le volume à transporter, les accès aux deux adresses, la distance, les étages, les ascenseurs, le stationnement, les cartons, les meubles volumineux et la formule souhaitée. Le calculateur de volume peut aider à préparer une première estimation avant la demande de devis." 
    },
    { 
      q: "Proposez-vous des déménagements entre Paris et la Seine-et-Marne ?", 
      a: "Oui, Marne Transdem accompagne les déménagements entre Paris et la Seine-et-Marne, dans les deux sens, selon les besoins du projet, les accès, le volume et la distance entre les adresses." 
    },
    { 
      q: "Peut-on demander un monte-meuble en Seine-et-Marne ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement en Seine-et-Marne ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement en Seine-et-Marne ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const cities = [
    { n: "Meaux", d: "Déménagements d’appartements, maisons, bureaux et locaux professionnels selon le volume et les accès." },
    { n: "Melun", d: "Accompagnement des projets de déménagement résidentiels et professionnels dans le sud de la Seine-et-Marne." },
    { n: "Chelles", d: "Organisation des déménagements de particuliers et d’entreprises à proximité de Paris et de l’est francilien." },
    { n: "Fontainebleau", d: "Déménagements de logements familiaux, appartements, maisons et locaux professionnels avec soin extrême." },
    { n: "Torcy", d: "Solutions de proximité pour pavillons et résidences proches de Marne-la-Vallée." },
    { n: "Pontault-Combault", d: "Déménagements de particuliers et pros entre la Seine-et-Marne, Paris et les communes limitrophes." },
    { n: "Bussy-Saint-Georges", d: "Accompagnement des déménagements de maisons, appartements et bureaux selon le volume." },
    { n: "Lagny-sur-Marne", d: "Expertise pour les déménagements résidentiels en bord de Marne avec gestion rigoureuse des accès." },
    { n: "Serris / Val d'Europe", d: "Services adaptés au dynamisme du secteur Marne-la-Vallée pour particuliers et entreprises." },
    { n: "Champs-sur-Marne", d: "Organisation des transferts résidentiels et universitaires proche de la Cité Descartes." },
    { n: "Coulommiers", d: "Déménagements de maisons et projets longue distance depuis l'est de la Seine-et-Marne." },
    { n: "Provins", d: "Accompagnement des projets en grande couronne avec une logistique adaptée aux distances." },
    { n: "Nemours", d: "Expertise pour les déménagements de maisons et appartements dans le sud-est francilien." },
    { n: "Montereau", d: "Logistique de proximité pour pavillons et résidences collectives en bord de Seine et Yonne." },
    { n: "Dammarie-les-Lys", d: "Services pour particuliers et bureaux proches du pôle Melun-Sénart." },
    { n: "Noisiel", d: "Déménagements familiaux avec gestion des stationnements et accès résidentiels." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Seine-et-Marne | Marne Transdem"
        description="Préparez votre déménagement en Seine-et-Marne avec Marne Transdem. Services pour particuliers et entreprises, maisons, appartements, formules adaptées et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Seine-et-Marne", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement départemental 77</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic">Seine-et-Marne</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement en Seine-et-Marne, avec une organisation adaptée aux maisons, appartements et bureaux du 77.
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

      {/* 2. Introduction départementale */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre déménagement <br/><span className="text-accent italic tracking-tight italic">en Seine-et-Marne</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les déménagements en <span className="font-bold text-slate-700 tracking-tight italic">Seine-et-Marne</span> pour les particuliers et les entreprises. Le <span className="font-bold text-slate-700 tracking-tight">département 77</span>, poumon vert de l'Île-de-France situé en grande couronne est, se caractérise par ses territoires étendus et sa proximité privilégiée avec <span className="text-brand-900 font-bold italic tracking-tight">Paris</span> et l'est francilien.
                </p>
                <p>
                  Qu'il s'agisse de transférer une <span className="font-bold text-slate-700 tracking-tight italic tracking-tight">maison</span> familiale, un <span className="font-bold text-slate-700 tracking-tight italic">pavillon</span> en lotissement, un <span className="font-bold text-slate-700 tracking-tight italic">appartement</span> résidentiel ou des <span className="font-bold text-slate-700 tracking-tight italic text-slate-700">bureaux</span> et commerces, nous adaptons notre logistique aux distances. De l'estimation rigoureuse du <span className="font-bold text-slate-700 tracking-tight text-slate-700">volume</span> à la gestion des accès (garages, caves, parkings), notre <span className="font-bold text-slate-700 tracking-tight font-bold italic">demande de devis</span> intègre toutes les spécificités du 77.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01] grayscale-[20%]">
                <img 
                  src="https://images.unsplash.com/photo-1549416878-b9ca35c2d4ac?auto=format&fit=crop&q=80&w=800" 
                  alt="Seine-et-Marne Déménagement" 
                  className="w-full h-full object-cover grayscale-[30%]"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section “Pourquoi un déménagement en Seine-et-Marne demande une bonne organisation” */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 text-brand-900">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic underline underline-offset-8 italic mb-6 tracking-tight">Logistique <span className="text-accent underline decoration-accent/20 italic tracking-tight italic">Est Francilien</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto italic">
              L'étendue du département 77 impose une rigueur d'organisation, notamment sur les temps de transport et l'évaluation du volume.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: Home, t: "Logements Familiaux", d: "Volumes souvent plus importants en maison ou pavillon nécessitant des véhicules de grande capacité et une équipe renforcée." },
               { icon: Truck, t: "Distances Étendues", d: "Optimisation des trajets entre les communes de Seine-et-Marne ou vers Paris pour une logistique sans faille." },
               { icon: Ruler, t: "Accès & Stockage", d: "Prise en compte des accès garage, cave et étage avec solutions de garde-meuble si besoin pendant votre transition." },
               { icon: Package, t: "Protection Totale", d: "Emballage méticuleux du mobilier, objets fragiles et protection des sols/murs lors de la manutention." },
               { icon: Briefcase, t: "Transferts Pros", d: "Expertise dédiée aux bureaux, cabinets et agences du 77 avec planification stricte pour la continuité d'activité." },
               { icon: Info, t: "Conseils & Coaching", d: "Accompagnement sur le choix de la formule et l'estimation indicative via notre calculateur de volume." }
             ].map((item, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-accent transition-all group italic">
                 <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform grayscale-[20%]" size={40} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement en Seine-et-Marne */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline italic">Nos services <span className="text-accent italic tracking-tight italic underline italic underline-offset-4">dans le 77</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 italic">
          {[
            { t: "Particuliers", d: "Maisons, appartements, pavillons et logements familiaux.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Transferts de bureaux, commerces et professions libérales.", l: "/demenagement-entreprises-paris" },
            { t: "Garde-meuble", d: "Solution de stockage temporaire pendant votre transition.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Solution pour meubles volumineux ou accès difficiles.", l: "/location-monte-meuble-paris" },
            { t: "Emballage", d: "Protection experte du mobilier et des objets délicats.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel professionnel pour préparer vos pièces.", l: "/cartons-demenagement-paris" },
            { t: "Formules", d: "De l'économique au luxe selon votre budget et besoin.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Estimation indicative du volume de mobilier à prévoir.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full italic">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest italic">{s.t}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed italic opacity-80 italic">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors italic">
                En savoir plus <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement de particuliers en Seine-et-Marne */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1 grayscale-[10%] transition-all italic">
               <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" alt="Particulier Seine-et-Marne" className="w-full h-full object-cover italic transition-all" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 italic font-sans italic">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all">Déménagement particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic italic">
                <p>
                  Marne Transdem accompagne les foyers pour leurs projets de <span className="font-bold text-slate-700 tracking-tight italic tracking-tight">maisons</span>, <span className="font-bold text-slate-700 tracking-tight italic">pavillons</span>, appartements et <span className="font-bold text-slate-700 tracking-tight italic">résidences</span> dans toute la Seine-et-Marne.
                </p>
                <p>
                   Nous maîtrisons les projets <span className="font-bold text-slate-700 tracking-tight italic font-bold">Paris vers Seine-et-Marne</span>, inversement, ou entre deux villes du 77. Notre logistique prend en compte les volumes importants et les distances spécifiques de la grande couronne est, incluant la gestion des <span className="font-bold text-slate-700 tracking-tight italic text-slate-700">garages</span>, caves et stationnements.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl italic tracking-tight italic">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises en Seine-et-Marne */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative grayscale-[10%] italic transition-all h-full">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Entreprise Seine-et-Marne" className="w-full h-full object-cover italic transition-all" />
             </div>
             <div className="lg:w-1/2 space-y-8 italic font-sans italic italic">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all">Transferts professionnels</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic italic">
                 <p>
                   Nous sommes le partenaire des entreprises du 77 : <span className="font-bold text-slate-700 tracking-tight italic">bureaux</span>, commerces, agences, <span className="font-bold text-slate-700 tracking-tight italic">cabinets</span> et pôles d'activité tertiaire.
                 </p>
                 <p>
                    Transfert sécurisé du mobilier, des <span className="font-bold text-slate-700 tracking-tight italic text-slate-700 font-bold italic">archives</span> et du matériel informatique avec une attention portée à la <span className="font-bold text-slate-700 tracking-tight italic font-bold">continuité opérationnelle</span> de votre structure entre Paris et l'est de l'Île-de-France.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all italic tracking-tight italic italic">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Villes desservies en Seine-et-Marne */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all font-sans italic">Villes desservies <span className="text-accent italic tracking-tight italic italic underline italic">dans le 77</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto italic font-sans transition-all italic h-full">
            {cities.map((city, i) => (
              <div key={i} className="bg-white/70 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between group hover:border-accent hover:shadow-xl transition-all h-full italic">
                <div>
                  <h3 className="font-bold text-brand-900 mb-3 uppercase text-xs italic tracking-widest group-hover:text-accent transition-colors italic italic">{city.n}</h3>
                  <p className="text-slate-400 text-[11px] font-light italic leading-relaxed opacity-80 italic italic italic">{city.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Déménagement entre Paris et la Seine-et-Marne */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden font-sans italic">
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic transition-all italic">
            <div className="space-y-10 italic">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic italic">Axe Paris <br/>Seine-et-Marne</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic italic">
                <p>
                  Les flux entre Paris (notamment <span className="text-white font-bold italic tracking-tight">le 12e, 13e, 20e</span>) et le 77 sont fréquents. Marne Transdem gère ces interventions de grande couronne avec une logistique adaptée aux distances significatives.
                </p>
                <ul className="space-y-4 italic font-sans italic italic italic">
                  {["Flux Paris Est vers le 77", "Déménagements 77 vers Paris Intra-muros", "Trajets entre communes de Seine-et-Marne", "Départ Seine-et-Marne vers la Province"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm italic font-light italic">
                      <CheckCircle2 size={16} className="text-accent shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10 uppercase font-black text-[10px] tracking-widest italic font-sans italic">
                 <Link to="/demenagement-paris" className="text-accent hover:text-white transition-colors italic italic">Paris</Link>
                 <Link to="/demenagement-ile-de-france" className="text-accent hover:text-white transition-colors italic italic">Île-de-France</Link>
                 <Link to="/demenagement-longue-distance" className="text-accent hover:text-white transition-colors italic italic">Longue Distance</Link>
              </div>
            </div>
            <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl space-y-8 italic font-sans italic grayscale-[10%] transition-all">
               <h3 className="text-brand-900 font-black uppercase text-xl leading-tight italic italic underline underline-offset-4 italic italic">Logistique <br/><span className="text-accent italic tracking-tight italic italic underline underline-offset-4 italic">Maîtrisée</span></h3>
               <p className="text-slate-500 italic font-light leading-relaxed text-sm italic italic italic italic">
                 Qu'il s'agisse d'un pavillon à Chelles ou d'un projet résidentiel à Fontainebleau, nous adaptons les moyens : volume de chargement, équipe et matériel spécifique selon la distance.
               </p>
               <div className="grid grid-cols-2 gap-6 pb-2 italic font-sans italic italic">
                 <div className="text-brand-900 border-l border-accent/20 pl-4 italic">
                    <Zap size={24} className="text-accent mb-2 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest block italic opacity-60 italic italic transition-all">Réactivité</span>
                 </div>
                 <div className="text-brand-900 border-l border-accent/20 pl-4 italic">
                    <Truck size={24} className="text-accent mb-2 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest block italic opacity-60 italic italic transition-all">Expertise</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-[30%] translate-y-[-20%] italic italic"></div>
      </section>

      {/* 9. Formules adaptées au 77 */}
      <section className="py-24 bg-slate-50 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-sans underline underline-offset-8 decoration-accent/20 italic transition-all">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all italic underline italic italic underline-offset-8">Nos formules de déménagement</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto italic font-sans italic italic transition-all h-full">
          {[
            { n: "Économique", d: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport." },
            { n: "Standard", d: "La formule équilibrée pour déléguer les objets fragiles et la protection experte du mobilier." },
            { n: "Luxe", d: "Délégation totale : nous assurons la préparation, l'emballage et l'organisation complète." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between italic transition-all h-full ${i === 1 ? 'border-accent shadow-xl scale-105 z-10 italic italic' : 'border-slate-200 italic italic'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight italic italic italic italic transition-all">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10 italic italic italic italic italic transition-all">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-[0.25em] border-b border-accent/20 pb-1 hover:border-accent transition-all italic italic italic transition-all font-sans">Prestations détaillées</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20 italic font-sans">
          <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl italic tracking-tight italic italic underline decoration-white/10 transition-all">
            Comparer les formules
          </Link>
        </div>
      </section>

      {/* 10. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all">
          <div className="bg-brand-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl italic transition-all">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic italic italic italic transition-all">
               <div className="space-y-8 italic italic italic transition-all h-full font-sans">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8 tracking-tight italic uppercase italic italic italic transition-all italic italic underline italic underline-offset-8 transition-all">Étude Logistique <br/>dans le 77</h2>
                 <p className="text-slate-400 font-light text-lg leading-relaxed italic italic italic italic transition-all italic">
                    Chaque projet en Seine-et-Marne demande une étude attentive des accès et des distances pour adapter les moyens techniques.
                 </p>
                 <div className="grid grid-cols-2 gap-6 italic italic italic transition-all h-full">
                   {["Volume à déménager", "Nombre d'étages", "Distance trajet", "Gestion Ascenseur", "Stationnement Rue", "Monte-meuble"].map((check, i) => (
                     <div key={i} className="flex items-center gap-4 text-slate-300 italic italic transition-all italic tracking-tight">
                       <CheckCircle2 className="text-accent shrink-0" size={16} />
                       <span className="font-light text-xs italic italic tracking-tight italic italic transition-all italic">{check}</span>
                     </div>
                   ))}
                 </div>
                 <div className="pt-8 italic italic italic transition-all h-full">
                    <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] hover:text-white transition-all underline decoration-accent/20 italic italic underline-offset-4 transition-all italic transition-all italic">
                      Info Monte-meuble <ArrowRight size={14} />
                    </Link>
                 </div>
               </div>
               <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md shadow-inner text-slate-300 italic font-light leading-relaxed text-sm italic italic italic italic grayscale-[20%] transition-all h-full">
                  <p className="mb-0 italic font-sans opacity-80 italic italic italic transition-all italic italic transition-all italic">
                    L'utilisation d'un monte-meuble peut être pertinente lorsque les meubles ne passent pas par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration technique et de la faisabilité sur site.
                  </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 11. Calculateur de volume */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-12 italic font-sans italic italic underline underline-offset-8 decoration-accent/10 transition-all italic font-sans italic">
           <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all italic underline italic italic transition-all italic transition-all italic">Estimez votre mobilier</h2>
           <p className="text-slate-500 text-lg font-light italic leading-relaxed italic italic italic italic italic transition-all italic">
              Avant de solliciter votre devis en Seine-et-Marne, utilisez notre calculateur de volume. Cette estimation indicative permet de mieux préparer la logistique de votre projet.
           </p>
           <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group shadow-xl italic tracking-tight italic italic italic transition-all italic font-sans italic transition-all">
             <Calculator size={28} className="text-accent" />
             Calculateur en ligne
             <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 12. Déménagement longue distance depuis la Seine-et-Marne */}
      <section className="py-24 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic italic italic italic transition-all italic h-full transition-all italic">
             <div className="order-2 lg:order-1 relative grayscale-[20%] italic transition-all h-full shadow-2xl transition-all h-full italic transition-all">
                <div className="aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white p-2 italic transition-all italic h-full transition-all italic transition-all">
                   <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200" alt="Déménagement longue distance Seine-et-Marne" className="w-full h-full object-cover rounded-[2rem] italic transition-all h-full transition-all italic grayscale-[10%] transition-all h-full" />
                </div>
                <div className="absolute top-6 left-6 bg-brand-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 italic italic italic transition-transform transition-all italic transition-all">
                   <Globe size={14} className="text-accent" /> Longue Distance
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-10 italic italic italic transition-all italic h-full italic transition-all italic transition-all italic">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic transition-all italic underline italic italic transition-all italic underline-offset-8 transition-all font-sans italic">Départ Province</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed italic italic italic italic italic transition-all italic italic transition-all italic">
                 <p>
                   Marne Transdem accompagne vos projets de déménagement depuis la Seine-et-Marne vers d’autres régions en France selon vos besoins.
                 </p>
                 <p>
                   De l'<span className="font-bold text-slate-700 tracking-tight italic text-slate-700 font-bold italic transition-all">organisation longue distance</span> au choix de la <span className="font-bold text-slate-700 tracking-tight italic transition-all font-bold">formule</span>, nous assurons la protection de vos biens lors du trajet province.
                 </p>
               </div>
               <Link to="/demenagement-longue-distance" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl italic tracking-tight italic italic italic transition-all italic h-full transition-all italic transition-all italic transition-all">
                 Organiser un départ province <ArrowRight size={18} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 13. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all italic underline-offset-8 transition-all italic transition-all">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all italic underline italic italic underline-offset-[12px] transition-all underline-offset-8 transition-all italic underline-offset-8 transition-all italic font-sans">Méthode <span className="text-accent italic tracking-tight italic italic italic underline underline-offset-8 transition-all transition-all italic transition-all italic">Marne Transdem</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative font-sans italic italic transition-all transition-all italic transition-all italic transition-all italic">
             <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-slate-200 -z-10 italic italic transition-all transition-all italic transition-all italic transition-all italic transition-all"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse Projet", d: "Prise en compte de vos besoins réels." },
               { icon: Ruler, t: "Évaluation", d: "Volume, adresses, accès et organisation." },
               { icon: Calendar, t: "Planification", d: "Choix de la formule et planning." },
               { icon: Truck, t: "Réalisation", d: "Transfert sécurisé de vos biens dans le 77." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group italic italic transition-all h-full transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative grayscale-[30%] group-hover:grayscale-0 italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">{i+1}</div>
                 </div>
                 <div className="px-4 italic italic transition-all h-full italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic font-sans">
                    <h4 className="font-bold text-brand-900 mb-3 text-sm italic tracking-tight italic uppercase italic italic italic transition-colors font-sans italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed italic opacity-60 italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 14. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans italic transition-all italic transition-all italic">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic leading-tight italic italic underline underline-offset-8 decoration-brand-900/10 italic transition-all italic transition-all italic transition-all italic transition-all italic">VOTRE PROJET <br/>EN SEINE-ET-MARNE ?</h2>
           <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
             Particuliers ou entreprises, décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau de prestation souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic italic transition-all italic transition-all italic transition-all italic shadow-2xl transition-all transition-all italic transition-all italic transition-all italic shadow-xl transition-all font-sans italic">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] italic italic italic shadow-xl transition-all italic transition-all underline decoration-white/10 transition-all font-sans italic transition-all">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] italic italic italic transition-all italic transition-all underline decoration-brand-900/10 transition-all font-sans italic transition-all">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-900/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%] italic italic italic transition-all italic transition-all italic transition-all italic shadow-2xl transition-all transition-all italic transition-all italic transition-all italic"></div>
      </section>

      {/* 15. FAQ départementale */}
      <section className="py-24 font-sans italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
           <div className="text-center mb-16 italic font-sans underline decoration-accent/10 underline-offset-8 italic transition-all italic transition-all italic transition-all italic underline underline-offset-8 italic transition-all transition-all italic transition-all italic transition-all italic font-sans">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic italic italic italic underline underline-offset-8 italic transition-all italic transition-all italic underline-offset-8 transition-all transition-all italic transition-all italic transition-all italic">FAQ SEINE-ET-MARNE</h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic italic transition-all italic transition-all transition-all italic transition-all italic transition-all italic">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic italic italic italic italic transition-colors italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all">
                   <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic italic italic italic italic italic transition-all italic transition-all italic transition-all underline decoration-brand-900/10 transition-all font-sans italic transition-all italic transition-all italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 16. Maillage interne final */}
      <section className="py-12 bg-slate-900 font-sans italic transition-all italic transition-all">
        <div className="container mx-auto px-4 md:px-6 font-sans italic italic transition-all transition-all italic transition-all transition-all italic transition-all italic transition-all italic transition-all italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 italic italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic">Devis Gratuit</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic">Calculateur Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic">Île-de-France</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all italic italic transition-all italic transition-all italic">Province</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5 italic italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-white/10 transition-all font-sans italic transition-all italic transition-all italic">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all italic italic transition-all italic transition-all italic">Emballage</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all italic italic transition-all italic transition-all italic">Matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all italic italic transition-all italic transition-all italic">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans italic italic transition-colors transition-all italic transition-all italic transition-all italic transition-all italic transition-all underline decoration-accent/10 transition-all font-sans italic transition-all italic transition-all italic">
            <Link to="/demenagement-paris-12" className="hover:text-accent uppercase italic italic italic transition-all italic transition-all italic">Paris 12e</Link>
            <Link to="/demenagement-paris-13" className="hover:text-accent uppercase italic italic italic transition-all italic transition-all italic">Paris 13e</Link>
            <Link to="/demenagement-paris-20" className="hover:text-accent uppercase italic italic italic transition-all italic transition-all italic uppercase italic">Paris 20e</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent uppercase italic italic italic transition-all italic transition-all italic">Val-de-Marne</Link>
            <Link to="/demenagement-seine-saint-denis" className="hover:text-accent uppercase italic italic italic transition-all italic transition-all italic">Seine-Saint-Denis</Link>
            {["Meaux", "Melun", "Fontainebleau", "Serris", "CHELLES", "Pontault-Combault"].map(c => <span key={c} className="cursor-default uppercase italic italic italic italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic transition-all italic">{c}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalSeineEtMarne;
