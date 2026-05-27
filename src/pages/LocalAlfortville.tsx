import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalAlfortville: React.FC = () => {
  const path = "/demenagement-alfortville";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement à Alfortville avec les contraintes d'accès en bords de Seine ?", 
      a: "Déménager à Alfortville comporte des spécificités géographiques de voirie, notamment à cause de la proximité du fleuve et de la Seine, de la voie ferrée qui sépare la ville et des rues parfois étroites comme la rue Seine ou la rue Paul Vaillant-Couturier. Nos équipes de Marne Transdem gèrent parfaitement ces contraintes en évaluant au préalable le gabarit idéal du camion de déménagement et en sécurisant le stationnement. Pour les appartements en bords de Seine ou dans les nouveaux quartiers comme la ZAC Grand-Ensemble, l'utilisation d'un monte-meuble extérieur est fréquemment recommandée pour faciliter les transferts directs par balcon ou fenêtre." 
    },
    { 
      q: "Quelles sont les démarches administratives de voirie auprès de la Mairie d'Alfortville ?", 
      a: "Pour stationner un camion de déménagement de façon temporaire sur les voies publiques de la commune d'Alfortville (94140), vous devez impérativement obtenir un arrêté municipal d'autorisation d'occupation temporaire du domaine public. Cette demande officielle doit être soumise au service de voirie de la Mairie d'Alfortville au moins 15 jours calendaires avant la date d'intervention. Pour simplifier vos démarches, la société Marne Transdem prend intégralement en charge le dépôt de ce dossier et l'installation des panneaux d'interdiction réglementaires 48h à l'avance." 
    },
    { 
      q: "Proposez-vous des formules de transfert adaptées aux entreprises d'Alfortville ?", 
      a: "Tout à fait. Alfortville est une ville en plein renouvellement urbain et économique, proche du parc d'activités Val-de-Seine. Nous proposons des services sur-mesure de transfert d'entreprises, de bureaux administratifs, de cabinets de santé et de commerces locaux. Nos compagnons déménageurs réalisent le démontage des mobiliers ergonomiques, l'emballage sécurisé du parc informatique dans des bacs étanches anti-statiques, et l'archivage méthodique de vos dossiers. Pour minimiser l'impact opérationnel, nous pouvons intervenir en horaires décalés, la nuit ou le week-end." 
    },
    { 
      q: "Quelle méthode utilisez-vous pour protéger les meubles précieux lors du transport ?", 
      a: "Chez Marne Transdem, la sécurité de vos biens est notre priorité absolue. Nous enveloppons systématiquement l'intégralité de vos meubles sous des couvertures capitonnées et épaisses. Pour les éléments ultra-sensibles ou laqués, nous utilisons des housses de protection matelassées sur-mesure ou du film bull-pack à triple couche d'amortissement. Les objets particulièrement fragiles (miroirs, tableaux, vaisselle d'art) font l'objet d'un emballage individuel dans des bacs renforcés ou des valises spécifiques." 
    },
    { 
      q: "Comment estimer précisément le volume de mon déménagement à Alfortville ?", 
      a: "Afin de vous délivrer un devis d'une clarté tarifaire irréprochable et parfaitement adapté à votre mobilier, nous mettons à votre disposition un calculateur de volume virtuel ultra-précis directement en ligne. En quelques clics, listez vos affaires pièce par pièce (buffets, lits, fauteuils, appareils électroménagers...). Nous pouvons également planifier une visioconférence technique ou une pré-visite gratuite sur place à votre domicile alfortvillais pour valider le cubage final." 
    }
  ];

  const nearbySectors = [
    { n: "Maisons-Alfort", l: "/demenagement-maisons-alfort" },
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Ivry-sur-Seine", l: "/demenagement-ivry-sur-seine" },
    { n: "Vitry-sur-Seine", l: "/demenagement-vitry-sur-seine" },
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur-des-fosses" },
    { n: "Saint-Maurice", l: "/demenagement-saint-maurice" },
    { n: "Villejuif", l: "/demenagement-villejuif" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Paris 13e", l: "/demenagement-paris-13" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Alfortville | En bords de Seine (94) | Marne Transdem"
        description="Besoin d'un déménageur à Alfortville (94140) ? Marne Transdem réalise votre déménagement résidentiel ou transfert professionnel en bords de Seine. Devis gratuit sous 24h."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Alfortville", item: path }
          ])
        ]}
      />

      {/* 1. HERO SECTION */}
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Spécialiste du Déménagement - Bords de Seine (94)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Alfortville</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem orchestre vos projets de déménagement de résidences privées et de locaux professionnels à Alfortville (94). Forts d'un savoir-faire logistique éprouvé sur l'ensemble du Val-de-Marne, nous maîtrisons les contraintes spécifiques des bords de Seine et du centre urbain.
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

      {/* 2. CHALET LOGISTIQUE ET INTRODUCTION LOCALE */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Votre Partenaire de Proximité</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">
                Déménager à Alfortville <span className="text-accent italic">en toute sérénité</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  Surnommée affectueusement l'île verte ou la presqu'île du Val-de-Marne, la dynamique commune de <strong>Alfortville</strong> (94140) s'organise harmonieusement tout le long du confluent de la Marne et de la Seine. Limitrophe de Saint-Maurice, de Charenton-le-Pont, de Vitry-sur-Seine ou encore de Maisons-Alfort, cette cité fluviale connaît un attrait démographique exponentiel grâce à sa situation géographique d'exception et son cadre paysager rehaussé d'élégants quais.
                </p>
                <p>
                  Pourtant, la géographie si particulière de cette commune façonne d'importants défis d'organisation. Les grandes copropriétés et résidences récentes en <strong>bords de Seine</strong> côtoient des ruelles pavillonnaires plus anciennes et denses. Par ailleurs, la voie ferroviaire majeure traversant Alfortville nécessite une logistique irréprochable pour la circulation et le stationnement de camions de grand volume. Les accès d'escaliers confinés et la hauteur de certains immeubles contraignent régulièrement le choix des véhicules logistiques.
                </p>
                <p>
                  Expert des flux de mobilité dans l'Est Parisien, <strong>Marne Transdem</strong> étudie minutieusement l'environnement de chaque déménagement. Nous apportons des prestations clé en main qui allient la rigueur de planification d'un réseau structuré au pragmatisme protecteur d'une écurie d'artisans expérimentés. Notre objectif : faire de votre emménagement à Alfortville un projet d'une absolue fluidité.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-94-val-de-marne.jpg" 
                  alt="Déménagement d'appartement en bords de Seine à Alfortville" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOCUS SPECIFICITES LOGISTIQUES ET STATIONNEMENT */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">La Logistique de Précision</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Le défi des accès urbains <span className="text-accent underline decoration-accent/20">en bords de Seine</span> à Alfortville</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Manœuvrer du mobilier lourd, des ensembles de literie ou des fournitures d'archivage d'entreprise près de quais animés demande de solides compétences techniques et administratives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Des conditions géographiques uniques</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Les rues qui bordent la Seine à Alfortville, particulièrement attrayantes, exigent une manutention et un arrimage parfaits en raison d'un trafic routier important et de zones piétonnes ou cyclables de plus en plus développées. Nos compagnons déménageurs étudient toujours l'accès à votre immeuble ou maison individuelle en amont.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Les ascenseurs des résidences à Alfortville possèdent parfois des charges maximales restreintes ou des cabines trop exiguës pour accueillir de grands mobiliers lourds ou canapés d'angle. En de telles situations, forcer le passage mettrait en péril vos parties communes et endommagerait l'intégrité de vos biens.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Flotte de véhicules modulaires</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Utilisation d'utilitaires agiles de 20m³ pour le centre historique ou de grands porteurs routiers capitonnés de 50m³ et au-delà.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Signalétique et sécurité urbaine</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Balisage de sécurité, pose de cônes de signalisation réglementaires et préservation attentive des trottoirs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">La Solution Technique : Le Monte-Meubles Porté</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour faire face aux configurations les plus compliquées, <strong>Marne Transdem</strong> intègre des échelles élévatrices ou monte-meubles d'extérieur performants. Déployés par nos conducteurs certifiés, ces appareils permettent de franchir l'obstacle des étages supérieurs sans occasionner la moindre gêne sonore ni dégradation des escaliers de copropriété.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Le transfert direct via le balcon ou une grande fenêtre augmente la rapidité d'exécution de moitié, permettant un chargement instantané sous bâche protectrice. C'est également un dispositif respecteux recommandé par les syndics les plus exigeants de la presqu'île.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Notre parc de Monte-Meubles <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALET RESIDENTIEL */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/equipe-demenageur-94.jpg" 
                  alt="Déménageurs qualifiés emballant un meuble lourd à Alfortville" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Déménagements de Particuliers</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Déménagement résidentiel <span className="text-accent italic">au cœur d'Alfortville</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Changer de logement est synonyme d'étapes de transition majeures. Qu'il s'agisse de déplacer l'agencement complet d'un splendide pavillon meulier ou de déménager un appartement moderne d'une résidence récente en bord de Seine, Marne Transdem façonne des prestations rigoureuses fondées sur la confiance et l'empathie.
                </p>
                <p>
                  Nos artisans fournissent une large gamme de matériels professionnels hautement protecteurs : cartons double-cannelure à haute résistance, adhésifs silencieux écologiques, valises en mousse à alvéoles pour votre vaisselle en cristal, penderies debout pour vêtements fragiles et housses imperméables épaisses pour sommiers et canapés en tissu.
                </p>
                <p>
                  Pour correspondre fidèlement à vos attentes, nous structurons notre intervention autour de nos trois formules éprouvées : la formule <strong>Économique</strong>, idéale pour la manutention de charges lourdes et le transport sécurisé par route ; la formule <strong>Standard</strong>, offrant le meilleur rapport simplicité-confort avec l'emballage de vos contenus fragiles par nos compagnons ; et enfin la formule <strong>Luxe</strong>, un service d'excellence clé en main où nous gérons l'emballage et le déballage intégral de vos possessions.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Service aux Particuliers
                </Link>
                <Link to="/formules-demenagement" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Voir nos formules
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRANSFERTS ENTREPRISES ET LOCAUX PROFESSIONNELS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Solutions B2B & Transfert Pro</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert d'entreprises et <span className="text-accent italic">locaux professionnels</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Les exigences logistiques d'un transfert d'activité d'une entité professionnelle à Alfortville diffèrent foncièrement d'une opération d'ordre privé. Préserver votre productivité opérationnelle exige une planification rigoureuse qui intègre la sécurité matérielle, le transfert ordonné de documents archivés, et la gestion soignée de vos outils informatiques critiques.
                </p>
                <p>
                  Pour le déménagement de vos bureaux administratifs, de commerces de proximité ou d'activités tertiaires en Val-de-Marne, Marne Transdem met à votre disposition un chef de projet dédié. Nous élaborons un plan complet et précis d'étiquetage pour garantir une réimplantation ultra-rapide des collaborateurs.
                </p>
                <p>
                  Notre savoir-faire englobe le transport de serveurs informatiques sous emballages spécifiques, le démontage méticuleux des espaces de travail individuels et collectifs, et la manutention hautement sécurisée de charges spécifiques lourdes. De plus, nous offrons une flexibilité temporelle de premier plan (interventions nocturnes et le week-end) pour sauvegarder la continuité des performances opérationnelles de votre organisation.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 hover:scale-105 transition-all outline-none italic text-sm">
                  Prestation d'Entreprise
                </Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Garde-meuble de proximité
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Transfert de locaux professionnels et bureaux à Alfortville" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POURQUOI CHOISIR MARNE TRANSDEM ? */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">La Rigueur Contractuelle</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi choisir Marne Transdem <span className="text-accent underline decoration-accent/20">à Alfortville ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous fondons notre relation commerciale sur l'engagement, la transparence et le strict respect des délais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Gestion municipale intégrale</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Notre secrétariat logistique effectue l'intégralité des requêtes d'arrêtés temporaires de voirie auprès des services de la Mairie d'Alfortville.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Protections d'excellence</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Utilisation exclusive de matériels protecteurs de haute qualité : couvertures d'emballage épaisses, housses literie, et coffres d'archivage renforcés.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Savoir-faire et assurance</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Toutes nos manutentions sont garanties par une couverture d'assurance transport détaillée de premier choix pour prémunir vos effets personnels de tout dommage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREPARATION CALCULATEUR DU VOLUME */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation du volume en m³</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Estimez la volumétrie de <br/><span className="text-accent italic font-sans italic">vos biens personnels</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Près de 90% des aléas d'un déménagement proviennent d'une mauvaise estimation du cubage de mobilier à transporter. Choisir un utilitaire trop compact ou commander des cartons en quantité insuffisante peut bloquer l'organisation mécanique le jour J.
                </p>
                <p>
                  Pour vous affranchir de cette inquiétude, l'équipe de Marne Transdem met à votre disposition un module interactif intuitif d'évaluation de volume en mètres cubes directement accessible sur le site. Répertoriez pas à pas votre agencement d'ameublement pour obtenir une simulation rigoureuse.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Démarrer le calculateur de volume
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Le Calendrier Rétro-actif Pratique</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-90 : Résiliation & Visite</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Préavis de bail de logement, pré-visite technique d'évaluation de cubage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Livraison de cartons</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Fourniture à domicile du matériel de conditionnement et d'emballage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Dépôt municipal</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt du dossier d'arrêté d'occupation temporaire auprès de la Mairie d'Alfortville.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Jour J : Manutention experte</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Prise en charge de vos cartons d'effets personnels, emballage de mobilier et chargement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* 8. BREADCRUMBS MAILLAGE CLOSE GEOGRAPHY */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Maillage Val-de-Marne</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs géographiques proches <span className="text-accent italic font-sans italic">autour d'Alfortville</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous couvrons l'ensemble des communes de la petite couronne avec la réactivité et la force logistique de nos équipes de proximité.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {nearbySectors.map((s, i) => (
              s.l ? (
                <Link key={i} to={s.l} className="bg-white p-6 rounded-2xl border border-slate-100 group hover:border-accent hover:shadow-lg transition-all text-center shadow-sm">
                  <span className="font-bold text-brand-900 group-hover:text-accent transition-colors text-xs uppercase tracking-wider">{s.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-white/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center opacity-60">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">{s.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL-TO-ACTION CONVERSION */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous préparez un déménagement à Alfortville ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez de toute l'expertise logistique de nos compagnons expérimentés pour garantir un déménagement efficace, en toute quiétude et parfaitement encadré par les arrêtés de voirie de bords de Seine.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all min-w-[280px]">
              Demander mon devis gratuit
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px]">
              <Phone size={22} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-900/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%]"></div>
      </section>

      {/* 10. FOIRE AUX QUESTIONS */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Questions Fréquentes</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic">Alfortville</span></h2>
            <p className="text-slate-500 font-light text-sm">Toutes les informations logistiques de notre société pour mener à bien votre projet sans surprises.</p>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 group hover:border-accent transition-all shadow-sm">
                <h4 className="text-lg font-bold text-brand-900 mb-4 flex items-start gap-4 tracking-tight uppercase">
                  <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-4 border-accent/20 text-justify">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NAV PIEDS DE MAILLAGE INTERNE */}
      <section className="py-12 bg-slate-900 font-sans text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 pb-8 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis Rapide</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur Cube</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all text-white underline decoration-accent/30 underline-offset-4">Val-de-Marne (94)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 pt-8">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all">Paris</Link>
            <Link to="/demenagement-paris-12" className="hover:text-accent transition-all">Paris 12</Link>
            <Link to="/demenagement-paris-13" className="hover:text-accent transition-all">Paris 13</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-all">Charenton</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all">Saint-Maur-des-Fossés</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all">Créteil</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all">Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-all">Nogent-sur-Marne</Link>
            <Link to="/demenagement-fontenay-sous-bois" className="hover:text-accent transition-all">Fontenay-sous-Bois</Link>
            <Link to="/demenagement-villejuif" className="hover:text-accent transition-all">Villejuif</Link>
            <Link to="/demenagement-vitry-sur-seine" className="hover:text-accent transition-all">Vitry-sur-Seine</Link>
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-all">Maisons-Alfort</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalAlfortville;
