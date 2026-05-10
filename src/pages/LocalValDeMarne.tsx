import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalValDeMarne: React.FC = () => {
  const path = "/demenagement-val-de-marne";
  
  const faqs = [
    { 
      q: "Marne Transdem intervient-elle dans le Val-de-Marne ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement dans le Val-de-Marne selon les besoins, le volume, les accès et l’organisation du projet. L’entreprise intervient auprès des particuliers et des entreprises pour des déménagements locaux, régionaux ou longue distance selon les cas." 
    },
    { 
      q: "Comment organiser un déménagement dans le Val-de-Marne ?", 
      a: "Il faut anticiper le volume à transporter, les accès aux deux adresses, les étages, les ascenseurs, le stationnement, les cartons, les meubles volumineux et la formule souhaitée. Le calculateur de volume peut aider à préparer une première estimation avant la demande de devis." 
    },
    { 
      q: "Proposez-vous des déménagements entre Paris et le Val-de-Marne ?", 
      a: "Oui, Marne Transdem accompagne les déménagements entre Paris et le Val-de-Marne, dans les deux sens, selon les besoins du projet et les contraintes d’accès." 
    },
    { 
      q: "Peut-on demander un monte-meuble dans le Val-de-Marne ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement dans le Val-de-Marne ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement dans le Val-de-Marne ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const cities = [
    { n: "Vincennes", d: "Déménagements d'appartements, maisons et bureaux à proximité de Paris 12e et 20e.", l: "/demenagement-vincennes" },
    { n: "Saint-Mandé", d: "Accompagnement des projets résidentiels et pros proche de Paris.", l: "/demenagement-saint-mande" },
    { n: "Charenton-le-Pont", d: "Organisation des déménagements entre Paris, le 94 et les communes voisines." },
    { n: "Nogent-sur-Marne", d: "Déménagements de logements familiaux, maisons et locaux professionnels." },
    { n: "Maisons-Alfort", d: "Déménagements de résidences et bureaux avec attention aux accès et étages." },
    { n: "Créteil", d: "Accompagnement des logements, bureaux et commerces dans le chef-lieu du département." },
    { n: "Ivry-sur-Seine", d: "Déménagements de particuliers et pros à proximité immédiate de Paris 13e." },
    { n: "Saint-Maur-des-Fossés", d: "Expertise pour les déménagements de maisons et résidences familiales." },
    { n: "Fontenay-sous-Bois", d: "Logistique adaptée aux quartiers résidentiels et zones d'activités." },
    { n: "Vitry-sur-Seine", d: "Déménagements urbains pour particuliers et entreprises en plein développement." },
    { n: "Villejuif", d: "Solutions de déménagement pour logements et centres de recherche ou médicaux." },
    { n: "Alfortville", d: "Déménagements résidentiels et locaux professionnels en bords de Seine." },
    { n: "Le Kremlin-Bicêtre", d: "Organisation logistique proche de Paris 13e et de l'hôpital." },
    { n: "Champigny-sur-Marne", d: "Accompagnement des projets de déménagement pour maisons et appartements." },
    { n: "Joinville-le-Pont", d: "Déménagements résidentiels dans un cadre entre ville et nature." },
    { n: "Le Perreux-sur-Marne", d: "Services de déménagement premium pour logements familiaux et villas." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Val-de-Marne | Marne Transdem"
        description="Préparez votre déménagement dans le Val-de-Marne avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Val-de-Marne", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement départemental 94</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Val-de-Marne</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement dans le Val-de-Marne, avec une organisation adaptée aux appartements, maisons, bureaux et commerces du 94.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre déménagement <br/><span className="text-accent italic tracking-tight">dans le Val-de-Marne</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les déménagements dans le <span className="font-bold text-slate-700 tracking-tight">Val-de-Marne</span> pour les particuliers et les entreprises. Le <span className="font-bold text-slate-700 tracking-tight">département 94</span> offre une proximité privilégiée avec <span className="font-bold text-slate-700 tracking-tight font-bold">Paris 12e</span>, <span className="font-bold text-slate-700 tracking-tight">Paris 13e</span> et <span className="font-bold text-slate-700 tracking-tight">Paris 20e</span>, en faisant une zone résidentielle et économique très attractive.
                </p>
                <p>
                  Que vous emménagiez dans un <span className="font-bold text-slate-700 tracking-tight italic">appartement</span>, une <span className="font-bold text-slate-700 tracking-tight">maison</span>, un <span className="font-bold text-slate-700 tracking-tight">logement familial</span> ou que vous transfériez des <span className="font-bold text-slate-700 tracking-tight text-slate-700">bureaux</span>, <span className="font-bold text-slate-700 tracking-tight tracking-tight">commerces</span> ou <span className="font-bold text-slate-700 tracking-tight">cabinets professionnels</span>, nous maîtrisons les accès urbains. De l'estimation du <span className="font-bold text-slate-700 tracking-tight">volume</span> à la gestion des <span className="font-bold text-slate-700 tracking-tight font-bold">étages</span>, <span className="font-bold text-slate-700 tracking-tight">ascenseurs</span> et <span className="font-bold text-slate-700 tracking-tight">parkings</span>, notre <span className="font-bold text-slate-700 tracking-tight">demande de devis</span> est personnalisée pour chaque projet du 94.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="https://images.unsplash.com/photo-1549416878-b9ca35c2d4ac?auto=format&fit=crop&q=80&w=800" 
                  alt="Val-de-Marne Déménagement" 
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement dans le Val-de-Marne demande une bonne organisation */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic">Logistique <span className="text-accent underline decoration-accent/20 italic tracking-tight">départementale 94</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto">
              La diversité architecturale du Val-de-Marne nécessite une expertise logistique spécifique.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: Building2, t: "Diversité des Logements", d: "Gestion des immeubles collectifs, résidences avec halls et quartiers pavillonnaires." },
               { icon: Truck, t: "Accès & Stationnement", d: "Anticipation des zones de stationnement urbaines et accès parfois complexes en rue." },
               { icon: Ruler, t: "Volume & Manutention", d: "Une étude du volume précise indispensable pour adapter la taille du véhicule et l'équipe." },
               { icon: Package, t: "Protection Rigoureuse", d: "Emballage soigné du mobilier, des objets fragiles et des archives professionnelles." },
               { icon: Home, t: "Maisons & Pavillons", d: "Logistique adaptée aux maisons avec cours, caves ou accès par jardins." },
               { icon: Zap, t: "Monte-meuble Éventuel", d: "Solution à envisager pour les étages élevés ou meubles ne passant pas par les accès classiques." }
             ].map((item, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-accent transition-all group">
                 <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services dans le Val-de-Marne */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight italic">Nos services <span className="text-accent underline decoration-accent/20">dans le 94</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Particuliers", d: "Appartements, maisons, résidences et studios.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Transferts de bureaux, commerces et cabinets.", l: "/demenagement-entreprises-paris" },
            { t: "Garde-meuble", d: "Solution de stockage temporaire pendant une transition.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Solution pour accès difficiles ou meubles volumineux.", l: "/location-monte-meuble-paris" },
            { t: "Emballage", d: "Protection experte du mobilier et des objets fragiles.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel professionnel pour préparer vos pièces.", l: "/cartons-demenagement-paris" },
            { t: "Formules", d: "Économique, Standard et Luxe selon vos besoins.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Estimation indicative du volume avant votre devis.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest">{s.t}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed italic">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                Détails <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement de particuliers dans le Val-de-Marne */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1">
               <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" alt="Particulier Val-de-Marne" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Déménagement particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs transferts d'<span className="font-bold text-slate-700 tracking-tight italic">appartements</span>, <span className="font-bold text-slate-700 tracking-tight tracking-tight">maisons</span>, studios et <span className="font-bold text-slate-700 tracking-tight">logements familiaux</span> dans tout le Val-de-Marne.
                </p>
                <p>
                   Nous organisons vos flux <span className="font-bold text-slate-700 tracking-tight italic">Paris vers Val-de-Marne</span>, inversement, ou entre deux villes du 94. Protection du mobilier, emballage des <span className="font-bold text-slate-700 tracking-tight text-slate-700">objets fragiles</span> et gestion logistique des accès (ascenseurs, parkings, caves) sont au cœur de notre prestation.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises dans le Val-de-Marne */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Entreprise Val-de-Marne" className="w-full h-full object-cover" />
             </div>
             <div className="lg:w-1/2 space-y-8">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Transferts professionnels</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Nous accompagnons les professionnels du Val-de-Marne : <span className="font-bold text-slate-700 tracking-tight">bureaux</span>, commerces, agences, <span className="font-bold text-slate-700 tracking-tight">cabinets</span> et professions libérales.
                 </p>
                 <p>
                    Gestion du matériel informatique, des <span className="font-bold text-slate-700 tracking-tight">archives</span> et du mobilier professionnel avec un planning adapté pour minimiser l'impact sur votre <span className="font-bold text-slate-700 tracking-tight italic">continuité d'activité</span>. Stockage temporaire possible en cas de transition de locaux.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Villes desservies dans le Val-de-Marne */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Villes desservies <span className="text-accent italic tracking-tight">dans le 94</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {cities.map((city, i) => (
              city.l ? (
                <Link key={i} to={city.l} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-brand-900 mb-3 uppercase text-xs italic tracking-widest group-hover:text-accent transition-colors">{city.n}</h3>
                    <p className="text-slate-400 text-[11px] font-light italic leading-relaxed">{city.d}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-black uppercase tracking-tighter italic">Consulter</span>
                    <ArrowRight size={10} />
                  </div>
                </Link>
              ) : (
                <div key={i} className="bg-white/50 p-8 rounded-[2rem] border border-slate-50 opacity-80 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-500 mb-3 uppercase text-xs italic tracking-widest">{city.n}</h3>
                    <p className="text-slate-400 text-[11px] font-light italic leading-relaxed">{city.d}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 8. Déménagement entre Paris et le Val-de-Marne */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Axe Paris <br/>Val-de-Marne</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic">
                <p>
                  De nombreux projets concernent les flux entre la capitale (<span className="text-white font-bold italic tracking-tight">Paris 12e, 13e, 20e</span>) et les communes du 94. Marne Transdem gère ces interventions de proximité avec une logistique parfaitement adaptée.
                </p>
                <ul className="space-y-4">
                  {["Flux Paris Sud-Est vers le 94", "Déménagements 94 vers Paris Centre", "Trajets entre communes du Val-de-Marne", "Départ Val-de-Marne vers la Province"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-light italic">
                      <CheckCircle2 size={16} className="text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10 uppercase font-bold text-[10px] tracking-widest">
                 <Link to="/demenagement-paris" className="text-accent hover:text-white transition-colors">Paris</Link>
                 <Link to="/demenagement-ile-de-france" className="text-accent hover:text-white transition-colors">Île-de-France</Link>
                 <Link to="/demenagement-longue-distance" className="text-accent hover:text-white transition-colors">Province</Link>
              </div>
            </div>
            <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl space-y-8">
               <h3 className="text-brand-900 font-black uppercase text-xl leading-tight italic">Accès <br/><span className="text-accent tracking-tight underline decoration-accent/20">Maîtrisés</span></h3>
               <p className="text-slate-500 italic font-light leading-relaxed text-sm italic">
                 Que vous quittiez un appartement compact ou une résidence familiale avec jardin, chaque trajet nécessite une étude du volume, des accès et du stationnement pour garantir une transition sans encombre.
               </p>
               <div className="grid grid-cols-2 gap-6 pb-4">
                 <div className="text-brand-900 grayscale">
                    <Zap size={24} className="text-accent mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest block italic">Réactivité</span>
                 </div>
                 <div className="text-brand-900 grayscale">
                    <Truck size={24} className="text-accent mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest block italic">Proxmité</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-[-20%] translate-y-[-20%]"></div>
      </section>

      {/* 9. Formules adaptées aux projets 94 */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 font-display">Nos formules d'accompagnement</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { n: "Économique", d: "Vous préparez vos cartons, Marne Transdem assure la manutention et le transport." },
            { n: "Standard", d: "Formule équilibrée incluant la protection du mobilier et des objets fragiles." },
            { n: "Luxe", d: "Délégation maximale : préparation, emballage et transfert complet de vos biens." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10 italic">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-[0.2em] border-b border-accent/20 pb-1 hover:border-accent">Voir les prestations</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl">
            Comparer les formules
          </Link>
        </div>
      </section>

      {/* 10. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8 tracking-tight italic uppercase italic">Logistique <br/>dans le 94</h2>
                 <p className="text-slate-400 font-light text-lg leading-relaxed italic">
                    Chaque trajet en Val-de-Marne nécessite une étude attentive des accès pour adapter les moyens techniques.
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                   {["Volume à déménager", "Nombre d'étages", "Gestion d'ascenseur", "Hall d'immeuble", "Maison / Pavillon", "Monte-meuble"].map((check, i) => (
                     <div key={i} className="flex items-center gap-4 text-slate-300">
                       <CheckCircle2 className="text-accent shrink-0" size={16} />
                       <span className="font-light text-xs italic tracking-tight">{check}</span>
                     </div>
                   ))}
                 </div>
                 <div className="pt-8">
                    <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] hover:text-white transition-all underline underline-offset-4 decoration-accent/20">
                      Infos Monte-meuble <ArrowRight size={14} />
                    </Link>
                 </div>
               </div>
               <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md shadow-inner text-slate-300 italic font-light leading-relaxed text-sm italic">
                  <p className="mb-0">
                    L'utilisation d'un monte-meuble peut être pertinente lorsque les meubles ne passent pas par l'escalier ou l'ascenseur. Sa faisabilité technique dépend de la configuration de la rue et de la façade au départ comme à l'arrivée.
                  </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 11. Calculateur de volume */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-12">
           <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Estimez votre mobilier</h2>
           <p className="text-slate-500 text-lg font-light italic leading-relaxed italic">
              Avant de solliciter votre devis dans le Val-de-Marne, utilisez notre calculateur de volume. Cette estimation indicative permet de mieux préparer la logistique de votre projet.
           </p>
           <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group shadow-xl">
             <Calculator size={28} className="text-accent" />
             Accéder au calculateur
             <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 12. Déménagement longue distance depuis le Val-de-Marne */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white p-2 grayscale-[20%]">
                   <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200" alt="Déménagement longue distance Val-de-Marne" className="w-full h-full object-cover rounded-[2rem]" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-accent text-brand-900 p-8 rounded-[2.5rem] shadow-xl">
                   <Globe size={40} />
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-10">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Départ Province</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed italic">
                 <p>
                   Marne Transdem accompagne vos projets de déménagement depuis le Val-de-Marne vers d'autres destinations en France selon vos besoins.
                 </p>
                 <p>
                   De l'<span className="font-bold text-slate-700 tracking-tight text-slate-700">organisation longue distance</span> au choix de votre <span className="font-bold text-slate-700 tracking-tight">formule</span>, nous assurons la protection de vos biens. Estimation personnalisée après étude du volume et des accès au départ comme à l'arrivée.
                 </p>
               </div>
               <Link to="/demenagement-longue-distance" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl italic tracking-tight">
                 Préparer un départ longue distance <ArrowRight size={18} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 13. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Méthode <span className="text-accent italic tracking-tight">Marne Transdem</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative font-sans">
             <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-slate-200 -z-10"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse Projet", d: "Prise en compte de vos contraintes réelles." },
               { icon: Ruler, t: "Évaluation", d: "Validation du volume, des accès et logistique." },
               { icon: Calendar, t: "Organisation", d: "Choix de la formule et planning de réalisation." },
               { icon: Truck, t: "Réalisation", d: "Transfert sécurisé de vos biens dans le 94." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs">{i+1}</div>
                 </div>
                 <div className="px-4">
                    <h4 className="font-bold text-brand-900 mb-3 text-sm italic tracking-tight uppercase italic">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider leading-relaxed italic opacity-70 italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 14. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
           <Heart className="mx-auto mb-10 text-brand-900/40" size={48} />
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic leading-tight">VOTRE DÉMÉNAGEMENT <br/>DANS LE VAL-DE-MARNE ?</h2>
           <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed">
             Particuliers ou entreprises, bénéficiez d'un accompagnement adapté à votre volume, vos accès et le niveau de prestation souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Link to="/demande-de-devis" className="bg-brand-900 shadow-brand-900/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px]">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px]">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
      </section>

      {/* 15. FAQ départementale */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16 underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic">FAQ VAL-DE-MARNE</h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic italic">
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

      {/* 16. Maillage interne final */}
      <section className="py-12 bg-slate-900 text-sans">
        <div className="container mx-auto px-4 md:px-6 text-sans">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis Gratuit</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all">Province</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all">Emballage</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all">Cartons & Matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans">
            <Link to="/demenagement-paris-12" className="hover:text-accent uppercase italic">Paris 12e</Link>
            <Link to="/demenagement-paris-13" className="hover:text-accent uppercase italic">Paris 13e</Link>
            <Link to="/demenagement-paris-20" className="hover:text-accent uppercase italic">Paris 20e</Link>
            <Link to="/demenagement-essonne" className="hover:text-accent uppercase italic">Essonne</Link>
            <Link to="/demenagement-seine-et-marne" className="hover:text-accent uppercase italic">Seine-et-Marne</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent uppercase italic">Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent uppercase italic">Saint-Mandé</Link>
            {["Charenton", "Nogent", "Créteil", "Maisons-Alfort", "Ivry", "Villejuif", "Fontenay"].map(c => <span key={c} className="cursor-default uppercase italic">{c}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalValDeMarne;
