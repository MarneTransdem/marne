import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, Briefcase, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalHautsDeSeine: React.FC = () => {
  const path = "/demenagement-hauts-de-seine";
  
  const faqs = [
    { 
      q: "Marne Transdem intervient-elle dans les Hauts-de-Seine ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement dans les Hauts-de-Seine selon les besoins, le volume, les accès et l’organisation du projet. L’entreprise intervient auprès des particuliers et des entreprises pour des déménagements locaux, régionaux ou longue distance selon les cas." 
    },
    { 
      q: "Comment organiser un déménagement dans les Hauts-de-Seine ?", 
      a: "Il faut anticiper le volume à transporter, les accès aux deux adresses, les étages, les ascenseurs, le stationnement, les cartons, les meubles volumineux et la formule souhaitée. Le calculateur de volume peut aider à préparer une première estimation avant la demande de devis." 
    },
    { 
      q: "Proposez-vous des déménagements entre Paris et les Hauts-de-Seine ?", 
      a: "Oui, Marne Transdem accompagne les déménagements entre Paris et les Hauts-de-Seine, dans les deux sens, selon les besoins du projet et les contraintes d’accès." 
    },
    { 
      q: "Peut-on demander un monte-meuble dans les Hauts-de-Seine ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement dans les Hauts-de-Seine ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement dans les Hauts-de-Seine ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const cities = [
    { n: "Boulogne-Billancourt", d: "Déménagements d'appartements, maisons, bureaux et locaux professionnels dans l'ouest parisien.", l: "/demenagement-boulogne-billancourt" },
    { n: "Neuilly-sur-Seine", d: "Accompagnement des projets résidentiels et professionnels avec une attention aux accès et à la protection.", l: "/demenagement-neuilly-sur-seine" },
    { n: "Levallois-Perret", d: "Organisation des déménagements de particuliers et d'entreprises dans une ville dense et proche de Paris.", l: "/demenagement-levallois-perret" },
    { n: "Issy-les-Moulineaux", d: "Déménagements de logements, résidences, bureaux et entreprises selon le volume et les accès.", l: "/demenagement-issy-les-moulineaux" },
    { n: "Clichy", d: "Solutions de déménagement pour particuliers et bureaux à proximité immédiate de la capitale.", l: "/demenagement-clichy" },
    { n: "Courbevoie", d: "Logistique adaptée aux quartiers résidentiels et aux zones d'affaires comme La Défense.", l: "/demenagement-courbevoie" },
    { n: "Nanterre", d: "Transferts de bureaux, locaux professionnels et déménagements familiaux en zone urbaine.", l: "/demenagement-nanterre" },
    { n: "Colombes", d: "Déménagements de maisons et appartements avec une gestion optimisée du volume." },
    { n: "Asnières-sur-Seine", d: "Accompagnement des projets de déménagement dans le nord des Hauts-de-Seine." },
    { n: "Puteaux", d: "Expertise pour les déménagements en immeubles modernes ou bureaux d'entreprises.", l: "/demenagement-puteaux" },
    { n: "Suresnes", d: "Déménagements sur les coteaux ou en centre-ville avec matériel adapté si nécessaire.", l: "/demenagement-suresnes" },
    { n: "Saint-Cloud", d: "Déménagements d'appartements, maisons et résidences avec une expertise des accès complexes.", l: "/demenagement-saint-cloud" },
    { n: "Meudon", d: "Gestion des accès pour maisons et résidences dans un cadre verdoyant.", l: "/demenagement-meudon" },
    { n: "Montrouge", d: "Déménagements de particuliers et entreprises dans une ville dense aux portes de Paris.", l: "/demenagement-montrouge" },
    { n: "Bagneux", d: "Déménagements d'appartements et maisons dans une ville résidentielle en mutation.", l: "/demenagement-bagneux" },
    { n: "Fontenay-aux-Roses", d: "Déménagements de maisons et résidences dans un cadre calme et verdoyant.", l: "/demenagement-fontenay-aux-roses" },
    { n: "Sceaux", d: "Service premium pour déménagements d'appartements de standing et résidences de qualité.", l: "/demenagement-sceaux" },
    { n: "Bourg-la-Reine", d: "Déménagements d'appartements, maisons et résidences dans une ville familiale et recherchée.", l: "/demenagement-bourg-la-reine" },
    { n: "Châtenay-Malabry", d: "Accompagnement des projets résidentiels et familiaux dans une zone verdoyante.", l: "/demenagement-chatenay-malabry" },
    { n: "Le Plessis-Robinson", d: "Solutions de déménagement premium dans une ville résidentielle et prisée.", l: "/demenagement-le-plessis-robinson" },
    { n: "Vanves", d: "Solutions locales pour appartements et studios proches de la Porte de Versailles.", l: "/demenagement-vanves" },
    { n: "Malakoff", d: "Organisation de déménagements pour particuliers et petites entreprises locales.", l: "/demenagement-malakoff" },
    { n: "Rueil-Malmaison", d: "Déménagements de grandes surfaces et transferts de sièges sociaux.", l: "/demenagement-rueil-malmaison" },
    { n: "Antony", d: "Accompagnement des logements familiaux dans le sud des Hauts-de-Seine.", l: "/demenagement-antony" },
    { n: "Châtillon", d: "Déménagements résidentiels avec une étude précise du stationnement.", l: "/demenagement-chatillon" },
    { n: "Clamart", d: "Solutions pour maisons et appartements selon la configuration du quartier.", l: "/demenagement-clamart" },
    { n: "Sèvres", d: "Déménagements d'appartements et maisons avec une gestion des accès caractéristiques.", l: "/demenagement-sevres" },
    { n: "Gennevilliers", d: "Logistique industrielle, transfert d'agences et déménagements de particuliers." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Hauts-de-Seine | Marne Transdem"
        description="Préparez votre déménagement dans les Hauts-de-Seine avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Hauts-de-Seine", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <MapPin size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement départemental 92</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8">Hauts-de-Seine</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement dans les Hauts-de-Seine, avec une organisation adaptée aux appartements, maisons, bureaux et résidences du 92.
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
                Votre déménagement <br/>dans le 92
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les déménagements dans les <span className="font-bold text-slate-700 tracking-tight">Hauts-de-Seine</span> pour les particuliers et les entreprises. Le <span className="font-bold text-slate-700 tracking-tight">département 92</span>, par sa proximité immédiate avec <span className="font-bold text-slate-700 tracking-tight">Paris</span>, présente une mixité de logements et d'activités exigeant une logistique experte.
                </p>
                <p>
                  Des résidences de prestige aux quartiers de bureaux, nous gérons vos projets pour <span className="font-bold text-slate-700 tracking-tight">appartements</span>, <span className="font-bold text-slate-700 tracking-tight">maisons</span>, <span className="font-bold text-slate-700 tracking-tight">bureaux</span>, commerces et <span className="font-bold text-slate-700 tracking-tight">locaux professionnels</span>. Nous maîtrisons les contraintes d'accès propres aux communes du département : étages, <span className="font-bold text-slate-700 tracking-tight">ascenseurs</span>, <span className="font-bold text-slate-700 tracking-tight">parkings</span> et <span className="font-bold text-slate-700 tracking-tight">stationnement</span> au cœur des zones urbaines denses.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-appartement-92.jpg" 
                  alt="Hauts-de-Seine Déménagement" 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement dans les Hauts-de-Seine demande une bonne organisation */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic">Une organisation <span className="text-accent">sur mesure</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto">
              La diversité des Hauts-de-Seine impose d'anticiper chaque contrainte pour un transfert serein.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: Building2, t: "Accès & Mobilité", d: "Gestion des immeubles collectifs, résidences avec parkings et centres-villes denses." },
               { icon: LayoutGrid, t: "Typologies Variées", d: "Adaptation aux appartements parisiens, maisons familiales et quartiers d'affaires." },
               { icon: Truck, t: "Monte-meuble & Logistique", d: "Utilisation possible de monte-meuble selon la configuration de la rue et de l'accès." },
               { icon: Package, t: "Protection & Emballage", d: "Protection rigoureuse des meubles et objets fragiles pour tout trajet en Île-de-France." },
               { icon: Briefcase, t: "Transferts Pro", d: "Coordination des déménagements de bureaux, archives et matériel informatique." },
               { icon: Ruler, t: "Validation Volume", d: "Étude précise du volume pour optimiser le temps de manutention et le transport." }
             ].map((item, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-accent transition-all group">
                 <item.icon className="text-accent mb-6 group-hover:rotate-12 transition-transform" size={40} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services dans les Hauts-de-Seine */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight">Nos services <span className="text-accent italic">dans le 92</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Particuliers", d: "Appartements, maisons, résidences et studios.", l: "/demenagement-particuliers-paris" },
            { t: "Entreprises", d: "Transferts de bureaux, commerces et agences.", l: "/demenagement-entreprises-paris" },
            { t: "Garde-meuble", d: "Stockage temporaire ou longue durée sécurisé.", l: "/garde-meuble-paris" },
            { t: "Monte-meuble", d: "Solution pour accès complexes ou meubles lourds.", l: "/location-monte-meuble-paris" },
            { t: "Emballage", d: "Protection experte de vos effets personnels.", l: "/emballage-protection-demenagement" },
            { t: "Cartons", d: "Matériel professionnel livré pour votre projet.", l: "/cartons-demenagement-paris" },
            { t: "Formules", d: "Économique, Standard et Luxe au choix.", l: "/formules-demenagement" },
            { t: "Calculateur", d: "Estimation de votre volume en quelques clics.", l: "/calculateur-volume" }
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

      {/* 5. Déménagement de particuliers dans les Hauts-de-Seine */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1">
               <img src="/images/demenagement-92-hauts-de-seine-camion.jpg" alt="Particulier 92" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-brand-900/10"></div>
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Déménagement particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les projets familiaux et individuels dans toutes les communes du département. Nous organisons vos transferts <span className="font-bold text-slate-700 tracking-tight">Paris vers Hauts-de-Seine</span>, inversement, ou entre deux villes du 92.
                </p>
                <p>
                   De la protection des meubles au choix de la <span className="font-bold text-slate-700 tracking-tight text-slate-700">formule</span>, chaque étape est étudiée selon votre <span className="font-bold text-slate-700 tracking-tight">volume</span> et vos accès (étages, ascenseur, parking). Garde-meuble disponible si votre transition nécessite un stockage temporaire.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises dans les Hauts-de-Seine */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative">
                <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Entreprise 92 Business" className="w-full h-full object-cover" />
             </div>
             <div className="lg:w-1/2 space-y-8">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Transferts professionnels</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Nous accompagnons les entreprises, bureaux et <span className="font-bold text-slate-700">locaux professionnels</span> dans les Hauts-de-Seine.
                 </p>
                 <p>
                    Manutention du <span className="font-bold text-slate-700 tracking-tight">mobilier de bureau</span>, des archives et du matériel informatique avec un planning rigoureux pour assurer la <span className="font-bold text-slate-700 tracking-tight">continuité de votre activité</span>. Proximité avec les grands pôles tertiaires du département pour une réactivité optimale.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Villes desservies dans les Hauts-de-Seine */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-widest tracking-tight">Villes desservies <span className="text-accent underline decoration-accent/20 italic tracking-tight uppercase underline-offset-8">dans le 92</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {cities.map((city, i) => {
              const Content = (
                <>
                  <div>
                     <h3 className="font-bold text-brand-900 mb-3 uppercase text-xs italic tracking-widest group-hover:text-accent transition-colors">{city.n}</h3>
                     <p className="text-slate-400 text-[11px] font-light italic leading-relaxed">{city.d}</p>
                  </div>
                  {city.l && (
                    <div className="mt-4 flex items-center justify-end text-accent group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </>
              );

              return city.l ? (
                <Link key={i} to={city.l} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group flex flex-col justify-between">
                  {Content}
                </Link>
              ) : (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group flex flex-col justify-between">
                  {Content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Déménagement entre Paris et les Hauts-de-Seine */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Axe Paris <br/>Hauts-de-Seine</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed italic">
                <p>
                  De nombreux projets concernent des flux entre la capitale et l'ouest parisien. Marne Transdem maîtrise parfaitement cet axe stratégique.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Départ Paris vers 92", "Départ 92 vers Paris", "Trajets intra-départementaux", "Départ 92 vers Province"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Zap size={14} className="text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                 <Link to="/demenagement-ile-de-france" className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">Île-de-France</Link>
                 <Link to="/demenagement-longue-distance" className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors">Longue Distance</Link>
              </div>
            </div>
            <div className="bg-white/5 rounded-[3.5rem] p-12 border border-white/10 backdrop-blur-xl shadow-inner italic font-light text-slate-300 text-sm leading-relaxed">
               <p className="mb-8">
                 Chaque trajet nécessite une étude du <span className="text-white font-bold tracking-tight">volume</span>, des <span className="text-white font-bold tracking-tight">accès</span> et du <span className="text-white font-bold tracking-tight">stationnement</span>. Que vous quittiez un appartement haussmannien ou une résidence moderne, nous adaptons les moyens nécessaires pour une transition sans encombre.
               </p>
               <Truck className="text-accent mb-4" size={32} />
               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40">Expertise Logistique IDF</span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* 9. Formules adaptées */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Nos formules</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { n: "Économique", d: "Vous préparez vos cartons, nous gérons la manutention et le transport sécurisé." },
            { n: "Standard", d: "Formule équilibrée : emballage des objets fragiles et protection du mobilier." },
            { n: "Luxe", d: "Sérénité totale : nous gérons la préparation, l'emballage et l'organisation globale." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[2.5rem] border shadow-sm flex flex-col justify-between ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase italic tracking-tight">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10 italic">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest hover:underline decoration-white/20">Voir les détails</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl">
             Choisir ma formule
          </Link>
        </div>
      </section>

      {/* 10. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8 tracking-tight italic uppercase italic">Logistique <br/>dans le 92</h2>
                 <p className="text-slate-400 font-light text-lg leading-relaxed italic">
                    Chaque projet nécessite une étude attentive des accès pour adapter les moyens techniques et humains au terrain.
                 </p>
                 <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/5">
                   {["Volume précis", "Gestion étages", "Ascenseurs", "Halls d'immeuble", "Parkings / Caves", "Monte-meuble"].map((check, i) => (
                     <div key={i} className="flex items-center gap-4 text-slate-300">
                       <Zap className="text-accent shrink-0" size={16} />
                       <span className="font-light text-xs italic">{check}</span>
                     </div>
                   ))}
                 </div>
                 <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                   Info Monte-meuble <ArrowRight size={14} />
                 </Link>
               </div>
               <div className="aspect-video bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 p-2">
                  <img src="/images/demenagement-longue-distance-camion.jpg" alt="Camion Déménagement 92" className="w-full h-full object-cover rounded-[2rem] grayscale-[30%]" />
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
              Avant de demander un devis, utilisez notre calculateur de volume. Cette estimation indicative est indispensable pour préparer la logistique de votre projet dans les Hauts-de-Seine.
           </p>
           <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group shadow-xl">
             <Calculator size={28} className="text-accent" />
             Accéder au calculateur
             <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 12. Déménagement longue distance depuis les Hauts-de-Seine */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.01]">
                   <img src="/images/demenagement-longue-distance.jpg" alt="Longue Distance depuis 92" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
             </div>
             <div className="order-1 lg:order-2 space-y-10">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight italic uppercase italic underline decoration-accent/20 underline-offset-8">Départ Province</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed">
                 <p>
                   Marne Transdem accompagne vos projets de déménagement <span className="font-bold text-slate-700 tracking-tight italic">depuis les Hauts-de-Seine vers toute la France</span>.
                 </p>
                 <p>
                   Organisation <span className="font-bold text-slate-700 tracking-tight">longue distance</span>, protection experte des biens et gestion des accès au départ et à l'arrivée. Devis personnalisé après étude de votre inventaire et du niveau d'accompagnement souhaité.
                 </p>
               </div>
               <Link to="/demenagement-longue-distance" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl">
                 Préparer un départ longue distance <Globe size={20} className="text-accent" />
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
               { icon: Truck, t: "Réalisation", d: "Transfert sécurisé de vos biens dans le 92." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative">
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
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic">Un projet de déménagement <br/>dans les Hauts-de-Seine ?</h2>
           <p className="text-brand-900/70 text-lg mb-10 max-w-2xl mx-auto italic font-light leading-relaxed">
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
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">FAQ Déménagement <br/>Hauts-de-Seine</h2>
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
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis personnalisé</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all">Longue Distance</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 italic pt-8 pb-8 border-b border-white/5">
            <Link to="/demenagement-particuliers-paris" className="hover:text-white transition-all">Particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-white transition-all">Entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-white transition-all">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-white transition-all">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-white transition-all">Emballage</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-white transition-all">Cartons</Link>
            <Link to="/contact" className="hover:text-white transition-all">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-8px font-black uppercase tracking-0.15em text-slate-700 italic pt-8">
            <Link to="/demenagement-paris-16" className="hover:text-accent">Paris 16</Link>
            <Link to="/demenagement-paris-17" className="hover:text-accent">Paris 17</Link>
            <Link to="/demenagement-paris-15" className="hover:text-accent">Paris 15</Link>
            <Link to="/demenagement-boulogne-billancourt" className="hover:text-accent">Boulogne</Link>
            <Link to="/demenagement-neuilly-sur-seine" className="hover:text-accent">Neuilly</Link>
            <Link to="/demenagement-levallois-perret" className="hover:text-accent">Levallois</Link>
            <Link to="/demenagement-clichy" className="hover:text-accent">Clichy</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent">Charenton</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent">Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent">Saint-Mandé</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent">Saint-Maur</Link>
            <Link to="/demenagement-courbevoie" className="hover:text-accent">Courbevoie</Link>
            <Link to="/demenagement-puteaux" className="hover:text-accent">Puteaux</Link>
            <Link to="/demenagement-nanterre" className="hover:text-accent">Nanterre</Link>
            <Link to="/demenagement-suresnes" className="hover:text-accent">Suresnes</Link>
            <Link to="/demenagement-rueil-malmaison" className="hover:text-accent">Rueil</Link>
            <Link to="/demenagement-saint-cloud" className="hover:text-accent">Saint-Cloud</Link>
            <Link to="/demenagement-meudon" className="hover:text-accent">Meudon</Link>
            <Link to="/demenagement-clamart" className="hover:text-accent">Clamart</Link>
            <Link to="/demenagement-sevres" className="hover:text-accent">Sèvres</Link>
            <Link to="/demenagement-vanves" className="hover:text-accent">Vanves</Link>
            <Link to="/demenagement-chatillon" className="hover:text-accent">Châtillon</Link>
            <Link to="/demenagement-malakoff" className="hover:text-accent">Malakoff</Link>
            <Link to="/demenagement-montrouge" className="hover:text-accent">Montrouge</Link>
            <Link to="/demenagement-bagneux" className="hover:text-accent">Bagneux</Link>
            <Link to="/demenagement-fontenay-aux-roses" className="hover:text-accent">Fontenay</Link>
            <Link to="/demenagement-sceaux" className="hover:text-accent">Sceaux</Link>
            <Link to="/demenagement-bourg-la-reine" className="hover:text-accent">Bourg-la-Reine</Link>
            <Link to="/demenagement-antony" className="hover:text-accent">Antony</Link>
            <Link to="/demenagement-chatenay-malabry" className="hover:text-accent">Châtenay-Malabry</Link>
            <Link to="/demenagement-le-plessis-robinson" className="hover:text-accent">Le Plessis-Robinson</Link>
            <Link to="/demenagement-issy-les-moulineaux" className="hover:text-accent">Issy</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalHautsDeSeine;
