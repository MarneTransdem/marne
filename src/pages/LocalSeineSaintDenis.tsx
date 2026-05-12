import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, Briefcase, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalSeineSaintDenis: React.FC = () => {
  const path = "/demenagement-seine-saint-denis";
  
  const faqs = [
    { 
      q: "Marne Transdem intervient-elle en Seine-Saint-Denis ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement en Seine-Saint-Denis selon les besoins, le volume, les accès et l’organisation du projet. L’entreprise intervient auprès des particuliers et des entreprises pour des déménagements locaux, régionaux ou longue distance selon les cas." 
    },
    { 
      q: "Comment organiser un déménagement en Seine-Saint-Denis ?", 
      a: "Il faut anticiper le volume à transporter, les accès aux deux adresses, les étages, les ascenseurs, le stationnement, les cartons, les meubles volumineux et la formule souhaitée. Le calculateur de volume peut aider à préparer une première estimation avant la demande de devis." 
    },
    { 
      q: "Proposez-vous des déménagements entre Paris et la Seine-Saint-Denis ?", 
      a: "Oui, Marne Transdem accompagne les déménagements entre Paris et la Seine-Saint-Denis, dans les deux sens, selon les besoins du projet et les contraintes d’accès." 
    },
    { 
      q: "Peut-on demander un monte-meuble en Seine-Saint-Denis ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement en Seine-Saint-Denis ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement en Seine-Saint-Denis ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const cities = [
    { n: "Montreuil", d: "Déménagements d'appartements, maisons et locaux professionnels à proximité de Paris 20e.", l: "/demenagement-montreuil" },
    { n: "Bagnolet", d: "Organisation des déménagements de particuliers et d'entreprises limitrophes de Paris.", l: "/demenagement-bagnolet" },
    { n: "Pantin", d: "Accompagnement des projets de déménagement résidentiels et pros dans l'est parisien." },
    { n: "Les Lilas", d: "Solutions de déménagement pour logements familiaux et commerces de proximité." },
    { n: "Saint-Denis", d: "Déménagements de bureaux et locaux professionnels selon le volume et les accès." },
    { n: "Aubervilliers", d: "Déménagements pour particuliers et commerces avec attention aux accès urbains." },
    { n: "Romainville", d: "Logistique adaptée aux nouveaux quartiers résidentiels et logements familiaux." },
    { n: "Noisy-le-Sec", d: "Transferts de bureaux et déménagements d'appartements en zone urbaine." },
    { n: "Bondy", d: "Accompagnement des projets de déménagement dans le centre du département." },
    { n: "Bobigny", d: "Expertise pour les déménagements administratifs et logements collectifs." },
    { n: "Drancy", d: "Déménagements de maisons et résidences avec gestion optimisée du volume." },
    { n: "Saint-Ouen-sur-Seine", d: "Solutions de proximité pour les quartiers en pleine mutation proche de Paris 18e." },
    { n: "La Courneuve", d: "Déménagements pour particuliers et zones d'activités professionnelles." },
    { n: "Rosny-sous-Bois", d: "Déménagements résidentiels et transferts de commerces en zone commerciale." },
    { n: "Noisy-le-Grand", d: "Gestion des accès pour bureaux et logements en ville nouvelle." },
    { n: "Aulnay-sous-Bois", d: "Accompagnement des logements familiaux et locaux industriels." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Seine-Saint-Denis | Marne Transdem"
        description="Préparez votre déménagement en Seine-Saint-Denis avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Seine-Saint-Denis", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement départemental 93</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Seine-Saint-Denis</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement en Seine-Saint-Denis, avec une organisation adaptée aux appartements, maisons, bureaux et commerces du 93.
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
                Votre déménagement <br/><span className="text-accent italic tracking-tight">dans le 93</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les projets de déménagement en <span className="font-bold text-slate-700 tracking-tight">Seine-Saint-Denis</span> pour les particuliers et les entreprises. Le <span className="font-bold text-slate-700 tracking-tight">département 93</span>, limitrophe de <span className="font-bold text-slate-700 tracking-tight">Paris</span>, offre une diversité urbaine unique entre zones résidentielles et pôles d'activités tertiaires et artisanaux.
                </p>
                <p>
                  Que vous déménagiez d'un <span className="font-bold text-slate-700 tracking-tight">appartement</span>, d'une <span className="font-bold text-slate-700 tracking-tight">maison</span>, d'un <span className="font-bold text-slate-700 tracking-tight">logement familial</span> ou d'un transfert de <span className="font-bold text-slate-700 tracking-tight">bureaux</span>, <span className="font-bold text-slate-700 tracking-tight">commerces</span> ou <span className="font-bold text-slate-700 tracking-tight">ateliers</span>, nous maîtrisons les contraintes locales. De l'estimation du <span className="font-bold text-slate-700 tracking-tight">volume</span> à la gestion des <span className="font-bold text-slate-700 tracking-tight font-bold">accès</span> (étages, ascenseurs, parkings), nous vous proposons une <span className="font-bold text-slate-700 tracking-tight">demande de devis</span> sur mesure.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="https://images.unsplash.com/photo-1549416878-b9ca35c2d4ac?auto=format&fit=crop&q=80&w=800" 
                  alt="Seine-Saint-Denis Déménagement" 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement en Seine-Saint-Denis demande une bonne organisation */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic">Logistique <span className="text-accent underline decoration-accent/20 italic tracking-tight">départementale</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto">
              Chaque ville de Seine-Saint-Denis possède ses propres caractéristiques architecturales et de stationnement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: Building2, t: "Milieu Urbain & Dense", d: "Gestion des immeubles avec étages, ascenseurs parfois limités et accès sur rue passante." },
               { icon: Home, t: "Quartiers Pavillonnaires", d: "Logistique adaptée aux maisons avec accès particuliers, cours ou jardins." },
               { icon: Truck, t: "Stationnement & Accès", d: "Anticipation des zones de stationnement et besoin éventuel de monte-meuble selon la configuration." },
               { icon: Package, t: "Protection des Biens", d: "Protection rigoureuse du mobilier et emballage soigné des objets fragiles avant le transfert." },
               { icon: Briefcase, t: "Locaux Professionnels", d: "Expertise pour les déménagements de bureaux, archives, ateliers et commerces du 93." },
               { icon: Ruler, t: "Estimation Volume", d: "Une étude précise indispensable pour adapter la taille du véhicule et l'équipe nécessaire." }
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

      {/* 4. Nos services en Seine-Saint-Denis */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight">Nos services <span className="text-accent">dans le 93</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Particuliers", d: "Appartements, maisons, résidences et studios.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Transferts de bureaux, commerces et ateliers.", l: "/demenagement-entreprises-paris" },
            { t: "Garde-meuble", d: "Solution de stockage temporaire pendant votre transition.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Solution pour meubles volumineux ou accès complexes.", l: "/location-monte-meuble-paris" },
            { t: "Emballage", d: "Protection experte des meubles et objets fragiles.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel professionnel pour préparer vos biens.", l: "/cartons-demenagement-paris" },
            { t: "Formules", d: "Économique, Standard et Luxe selon vos besoins.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Estimation indicative du volume de mobilier.", l: "/calculateur-volume" }
          ].map((s, i) => (
            <Link key={i} to={s.l} className="group bg-slate-900 p-8 rounded-[2rem] border border-white/5 hover:border-accent hover:shadow-2xl transition-all flex flex-col justify-between h-full">
              <div>
                <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors uppercase text-sm tracking-widest">{s.t}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed italic">{s.d}</p>
              </div>
              <div className="mt-8 text-white/20 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                En savoir plus <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Déménagement de particuliers en Seine-Saint-Denis */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1">
               <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" alt="Particulier 93" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Déménagement particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les familles et les particuliers pour leurs transferts d'<span className="font-bold text-slate-700 tracking-tight tracking-tight">appartements</span>, <span className="font-bold text-slate-700 tracking-tight">maisons</span>, studios et <span className="font-bold text-slate-700 tracking-tight">logements familiaux</span> dans tout le 93.
                </p>
                <p>
                   Nous organisons vos projets <span className="font-bold text-slate-700 tracking-tight italic">Paris vers Seine-Saint-Denis</span>, inversement, ou entre deux communes du département. Du <span className="font-bold text-slate-700 tracking-tight">choix de la formule</span> à la gestion des <span className="font-bold text-slate-700 tracking-tight text-slate-700">accès</span> (ascenseurs, parkings, caves), nous adaptons nos moyens à votre volume réel.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises en Seine-Saint-Denis */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Entreprise 93" className="w-full h-full object-cover" />
             </div>
             <div className="lg:w-1/2 space-y-8">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Transferts professionnels</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Nous accompagnons les professionnels de Seine-Saint-Denis : <span className="font-bold text-slate-700 tracking-tight">bureaux</span>, <span className="font-bold text-slate-700 tracking-tight">commerces</span>, agences, <span className="font-bold text-slate-700 tracking-tight">ateliers</span> et locaux industriels.
                 </p>
                 <p>
                    Gestion du <span className="font-bold text-slate-700 tracking-tight">mobilier professionnel</span>, des archives et du matériel informatique avec un planning optimisé pour garantir la <span className="font-bold text-slate-700 tracking-tight">continuité de votre activité</span>. Stockage temporaire et logistique de manutention adaptée à chaque secteur d'activité.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Villes desservies en Seine-Saint-Denis */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Villes desservies <span className="text-accent italic tracking-tight">dans le 93</span></h2>
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
                    <span className="text-[9px] font-black uppercase tracking-tighter">Voir la page</span>
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

      {/* 8. Déménagement entre Paris et la Seine-Saint-Denis */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Axe Paris <br/>Seine-Saint-Denis</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic">
                <p>
                  De nombreux projets concernent les flux entre la capitale et les communes du 93. Marne Transdem, basée à Paris 20e, est idéalement placée pour ces interventions de proximité.
                </p>
                <ul className="space-y-4">
                  {["Flux Paris (18e, 19e, 20e) vers le 93", "Flux 93 vers Paris Centre & Est", "Trajets entre communes du département", "Départ Seine-Saint-Denis vers la Province"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm">
                      <CheckCircle2 size={16} className="text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                 <Link to="/demenagement-ile-de-france" className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">Île-de-France</Link>
                 <Link to="/demenagement-longue-distance" className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">Longue Distance</Link>
              </div>
            </div>
            <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl space-y-8">
               <h3 className="text-brand-900 font-black uppercase text-xl leading-tight">Logistique <br/><span className="text-accent italic tracking-tight">Maîtrisée</span></h3>
               <p className="text-slate-500 italic font-light leading-relaxed text-sm">
                 Chaque trajet nécessite une étude du volume, des accès et du stationnement. Que vous quittiez un appartement compact ou une maison avec jardin, nous adaptons les moyens nécessaires pour une transition sans encombre.
               </p>
               <div className="grid grid-cols-2 gap-6 pb-8">
                 <div className="text-brand-900">
                    <Zap size={24} className="text-accent mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest block">Réactivité</span>
                 </div>
                 <div className="text-brand-900">
                    <Truck size={24} className="text-accent mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest block">Proximité</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

      {/* 9. Formules adaptées */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Nos formules</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { n: "Économique", d: "Vous gérez vos cartons, nous assurons la manutention et le transport." },
            { n: "Standard", d: "La formule équilibrée : protection du mobilier et objets fragiles incluse." },
            { n: "Luxe", d: "Délégation totale : nous organisons la préparation, l'emballage et le transfert." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10 italic">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest hover:underline decoration-white/20">Voir les prestations</Link>
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
                 <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8 tracking-tight italic uppercase italic">Logistique <br/>dans le 93</h2>
                 <p className="text-slate-400 font-light text-lg leading-relaxed italic">
                    Chaque projet nécessite une étude attentive des accès pour adapter les moyens techniques et humains.
                 </p>
                 <div className="grid grid-cols-2 gap-6">
                   {["Volume à déménager", "Nombre d'étages", "Gestion d'ascenseur", "Hall d'immeuble", "Maison / Cour", "Monte-meuble"].map((check, i) => (
                     <div key={i} className="flex items-center gap-4 text-slate-300">
                       <CheckCircle2 className="text-accent shrink-0" size={16} />
                       <span className="font-light text-xs italic">{check}</span>
                     </div>
                   ))}
                 </div>
                 <div className="pt-8">
                    <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                      Info Monte-meuble <ArrowRight size={14} />
                    </Link>
                 </div>
               </div>
               <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md shadow-inner text-slate-300 italic font-light leading-relaxed text-sm">
                  <p className="mb-0">
                    L'utilisation d'un monte-meuble peut être envisagée lorsque les meubles ne passent pas par les accès classiques (escalier, ascenseur). Sa mise en place dépend de la configuration technique et de la faisabilité sur site.
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
              Avant de demander un devis en Seine-Saint-Denis, utilisez notre calculateur de volume. Cette estimation indicative est indispensable pour préparer la logistique de votre projet.
           </p>
           <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group shadow-xl">
             <Calculator size={28} className="text-accent" />
             Accéder au calculateur
             <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 12. Déménagement longue distance depuis la Seine-Saint-Denis */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white p-2">
                   <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200" alt="Déménagement longue distance 93" className="w-full h-full object-cover rounded-[2rem] grayscale-[30%]" />
                </div>
                <div className="absolute top-4 right-4 bg-brand-900 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                   <Globe size={14} className="text-accent" /> Longue Distance
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-10">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 italic">Départ Province</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed">
                 <p>
                   Marne Transdem accompagne vos projets de déménagement depuis la Seine-Saint-Denis vers d'autres destinations en France.
                 </p>
                 <p>
                   De l'<span className="font-bold text-slate-700 tracking-tight text-slate-700">organisation longue distance</span> au choix de la <span className="font-bold text-slate-700 tracking-tight">formule</span>, nous assurons la protection de vos biens lors du trajet. Estimation personnalisée après étude du volume et des accès au départ et à l'arrivée.
                 </p>
               </div>
               <Link to="/demenagement-longue-distance" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl">
                 Préparer un départ longue distance <ArrowRight size={18} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 13. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Méthode <span className="text-accent italic tracking-tight">Marne Transdem</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative">
             <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-slate-200 -z-10"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse projet", d: "Compréhension fine de vos besoins réels." },
               { icon: Ruler, t: "Évaluation terrain", d: "Validation du volume, des accès et logistique." },
               { icon: Calendar, t: "Organisation", d: "Choix de la formule et planning de réalisation." },
               { icon: Truck, t: "Réalisation", d: "Transfert sécurisé de vos biens dans le 93." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative text-brand-900">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs">{i+1}</div>
                 </div>
                 <div className="px-4">
                    <h4 className="font-bold text-brand-900 mb-3 text-sm italic tracking-tight">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider leading-relaxed italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 14. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic">Un projet de déménagement <br/>en Seine-Saint-Denis ?</h2>
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
      </section>

      {/* 15. FAQ départementale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">FAQ Déménagement <br/>Seine-Saint-Denis</h2>
           </div>
           <div className="grid grid-cols-1 gap-8">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic underline decoration-accent/10">
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
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis en ligne</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Nos formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all">Longue Distance</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all">Emballage</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all">Cartons et Matériel</Link>
            <Link to="/contact" className="hover:text-white transition-all">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8">
            <Link to="/demenagement-paris-20" className="hover:text-accent">Paris 20</Link>
            <Link to="/demenagement-paris-19" className="hover:text-accent">Paris 19</Link>
            <Link to="/demenagement-paris-18" className="hover:text-accent">Paris 18</Link>
            <Link to="/demenagement-paris-11" className="hover:text-accent">Paris 11</Link>
            <Link to="/demenagement-montreuil" className="hover:text-accent">Montreuil</Link>
            <Link to="/demenagement-bagnolet" className="hover:text-accent">Bagnolet</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent">Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent">Saint-Mandé</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent">Charenton</Link>
            <Link to="/demenagement-val-d-oise" className="hover:text-accent">Val-d'Oise</Link>
            <Link to="/demenagement-seine-et-marne" className="hover:text-accent">Seine-et-Marne</Link>
            {["Pantin", "Les Lilas", "Bobigny", "Saint-Denis", "Aubervilliers"].map(c => <span key={c} className="cursor-default">{c}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalSeineSaintDenis;
