import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase, ShieldAlert, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalVitrySurSeine: React.FC = () => {
  const path = "/demenagement-vitry-sur-seine";

  const faqs = [
    { 
      q: "Comment s'organise un déménagement à Vitry-sur-Seine face aux contraintes de stationnement ?", 
      a: "La ville de Vitry-sur-Seine, en pleine restructuration urbaine, combine de grands axes comme l'avenue de l'Abbé-Roger-Derry et des voies résidentielles plus étroites ou vallonnées. Marne Transdem gère ces spécificités de voirie en planifiant la taille de camion idéale (de 20 m³ à 50 m³ ou avec hayon) et en mettant en œuvre des monte-meubles d'extérieur si vos cages d'escalier ou ascenseurs sont inaccessibles. Nous assurons un repérage technique en amont pour éviter tout blocage le jour J." 
    },
    { 
      q: "Quelles sont les formalités administratives de voirie auprès de la Mairie de Vitry-sur-Seine ?", 
      a: "Pour effectuer votre déménagement en toute sérénité à Vitry-sur-Seine (94400), une autorisation temporaire d'occupation du domaine public est indispensable. La demande d'arrêté municipal doit être adressée officiellement aux services administratifs de la Mairie de Vitry au minimum 15 jours calendaires avant la date d'intervention. Dans le cadre de nos services, l'équipe de Marne Transdem prend fréquemment en charge cette logistique de dépôt et installe les panneaux réglementaires d'interdiction de stationner 48 heures à l'avance." 
    },
    { 
      q: "Proposez-vous des formules adaptées aux entreprises en plein développement à Vitry-sur-Seine ?", 
      a: "Absolument. Vitry-sur-Seine connaît un essor économique majeur, particulièrement dans les secteurs d'activité des Ardoines, du Port à l'Anglais ou de Seine Gare. Nous accompagnons ce dynamisme via des transferts de bureaux sur-mesure : étiquetage rationnel des postes de travail, emballage sécurisé des parcs informatiques sous sachets antistatiques, transfert d'archives et de mobiliers lourds, et planification en dehors de vos heures opérationnelles (nuits et week-ends) afin de préserver votre productivité globale." 
    },
    { 
      q: "Comment sont protégés mes objets fragiles et mon mobilier lors d'un déménagement résidentiel ?", 
      a: "La protection de vos effets personnels est notre priorité d'artisans. Nous utilisons des fournitures de qualité industrielle : couvertures de déménagement à fort grammage, housses imperméables en polyéthylène pour sommiers et matelas, cartons télescopiques renforcés pour les miroirs ou cadres, coffres de penderie verticaux pour vos textiles de valeur, et valises capitonnées individuelles pour la vaisselle délicate." 
    },
    { 
      q: "Puis-je louer un garde-meubles sécurisé à proximité de Vitry-sur-Seine ?", 
      a: "Oui, notre société propose des solutions de stockage temporaire ou de longue durée dans nos garde-meubles sécurisés situés à proximité immédiate dans le Val-de-Marne. Vos biens sont entreposés dans des conteneurs plombés, s'insérant au sein d'un entrepôt ventilé, protégé des variations thermiques et sous télésurveillance par alarme vidéo active 24h/24 et 7j/7." 
    },
    { 
      q: "Comment obtenir un devis de déménagement précis et gratuit pour Vitry-sur-Seine ?", 
      a: "Pour obtenir une estimation rigoureuse, vous pouvez utiliser notre calculateur de volume interactif disponible directement en ligne ou compléter notre formulaire de contact express. Nous planifierons ensuite une visite technique d'évaluation (sur place à votre domicile de Vitry ou par visioconférence) pour vous adresser sous 24h un devis détaillé, ferme et d'une clarté tarifaire irréprochable." 
    }
  ];

  const nearbySectors = [
    { n: "Ivry-sur-Seine", l: "/demenagement-ivry-sur-seine" },
    { n: "Villejuif", l: "/demenagement-villejuif" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Maisons-Alfort", l: "/demenagement-maisons-alfort" },
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Saint-Maurice", l: "/demenagement-saint-maurice" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Fontenay-sous-Bois", l: "/demenagement-fontenay-sous-bois" },
    { n: "Le Kremlin-Bicêtre", l: "/demenagement-le-kremlin-bicetre" },
    { n: "Alfortville", l: "/demenagement-alfortville" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Vitry-sur-Seine | Particuliers & Entreprises | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Vitry-sur-Seine (94) ? Marne Transdem réalise le transfert d'appartements, maisons et bureaux en plein développement."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Vitry-sur-Seine", item: path }
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
              <Sparkles size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Logistique Urbaine & Stratégique - Val-de-Marne</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Vitry-sur-Seine</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Accompagner la mutation de la plus grande ville du Val-de-Marne (94400) exige un savoir-faire artisanal de premier ordre. Marne Transdem orchestre vos déménagements de logements familiaux, d'appartements contemporains et de bureaux ou de hubs logistiques en plein développement, alliant rigueur technique et sérénité.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Mon Devis Gratuit & Sur-Mesure
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

      {/* 2. RICH TEXT LAYOUT - OVER 1200 WORDS FOR LOCAL SEO */}
      <section className="py-24 font-sans text-left">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Ancrage Territorial du 94</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                La logistique urbaine <span className="text-accent italic">au cœur de Vitry-sur-Seine</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Plus grande commune du département du Val-de-Marne en termes de superficie et de population, <strong>Vitry-sur-Seine</strong> (94400) se distingue par une identité singulière, oscillant entre un passé industriel prestigieux, un ancrage artistique exceptionnel (illustré de manière éclatante par le <strong>MAC VAL</strong>, musée d'art contemporain de renommée internationale et les innombrables fresques de street art) et des quartiers résidentiels particulièrement verdoyants répartis sur les coteaux.
                </p>
                <p>
                  Aujourd'hui, la commune traverse une phase d'expansion et de rénovation urbaine sans précédent. De nouveaux éco-quartiers modernes émergent le long des rives de la Seine et de l'avenue Jean-Jaurès, attirant continuellement de nouvelles familles en quête de logements durables et connectés. Parallèlement, des projets emblématiques de transport — de la ligne de tramway T9 connectée au métro parisien au passage imminent de la ligne 15 Sud du Grand Paris Express en gares de <i>Vitry Centre</i> et des <i>Ardoines</i> — métamorphosent la fluidité des déplacements de cette ville clef en petite couronne.
                </p>
                <p>
                  Cette topographie multiple, alliant de grandes avenues passantes à des rues résidentielles plus escarpées sur les reliefs du plateau, crée un écosystème où chaque déménagement possède ses propres contraintes de hauteur sous voûte, de stationnement ou de portage. Marne Transdem met à votre disposition l'excellence de son expérience opérationnelle en Île-de-France pour concevoir des interventions d'une fluidité parfaite.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-94-val-de-marne.jpg" 
                  alt="Déménagement d'appartement et logistique urbaine à Vitry-sur-Seine" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRANSFERS D'ENTREPRISES ET BUREAUX EN PLEIN DÉVELOPPEMENT */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Croissance Économique & Logistique</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Déménagements d'entreprises & <span className="text-accent underline decoration-accent/20">bureaux en plein développement</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Marne Transdem accompagne le dynamisme économique de Vitry-sur-Seine en proposant des solutions de transfert de bureaux agiles, sécurisées et planifiées avec précision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic text-left">Une expertise pour les parcs d'activités tertiaires et industriels</h3>
              <p className="text-slate-600 font-light leading-relaxed text-left text-justify">
                Le renouveau économique de Vitry-sur-Seine se cristallise notamment au sein de la gigantesque <strong>ZAC des Ardoines</strong> ou des parcs d’activités de Seine Gare, qui accueillent chaque année de nouveaux sièges sociaux, des laboratoires innovants, des startups créatives et des espaces de coworking ultra-connectés.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-left text-justify">
                Marne Transdem comprend l'importance cruciale de limiter au maximum toute perte de productivité ou d'inactivité de vos collaborateurs lors de ces phases indispensables de développement commercial. C'est pourquoi un chef de projet dédié planifie méticuleusement chaque étape du transfert de vos locaux professionnels : diagnostic technique des infrastructures, cartographie de transfert, étiquetage rationnel des implantations et emballage renforcé du matériel lourd et informatique délicat.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 text-left">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <Building2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Plan d'Implantation Précis</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Repérage rigoureux de chaque carton et mobilier professionnel pour une remise en place immédiate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-left">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <Briefcase className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Emballage Informatique Protégé</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Boîtiers de protection spécifiques, sachets antistatiques pour serveurs et écrans d'ordinateurs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 space-y-8 text-left">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Continuité de service et flexibilité d'intervention</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Qu'il s'agisse d'un cabinet juridique libéral, d'un atelier d'artisan créateur ou d'une multinationale implantée sur les rives de Seine, notre grande souplesse organisationnelle nous permet d’agir en dehors de vos plages de présence habituelles.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Nous orchestrons des transferts de bureaux de nuit ou durant le week-end, de manière à ce que vos équipes retrouvent un espace immédiatement fonctionnel le lundi dès la première heure. Cette adaptabilité fait de Marne Transdem le partenaire privilégié des décideurs et dirigeants d'entreprises soucieux de leur fluidité opérationnelle.
              </p>
              <div className="pt-4">
                <Link to="/demenagement-entreprises-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Découvrir nos solutions de transfert pro <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DÉMÉNAGEMENT DE LOGEMENTS ET RESIDENTIELS À VITRY-SUR-SEINE */}
      <section className="py-24 font-sans text-left">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/equipe-demenageur-94.jpg" 
                  alt="Compagnons déménageurs chevronnés lors de la protection de meubles à Vitry-sur-Seine" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Sérénité Résidentielle</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Des prestations soignées pour vos <span className="text-accent italic font-sans italic">appartements et pavillons</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  L’emménagement dans une nouvelle demeure, qu'il s'agisse d'un chaleureux pavillon en pierre meulière sur les hauteurs de Vitry ou d'un appartement flambant neuf surplombant les berges de Seine, marque le début d'un nouveau chapitre de vie. Pour vous épargner la fatigue physique et mentale inhérente à ces transitions importantes, l'équipe d'artisans de Marne Transdem déploie des prestations d'excellence adaptables.
                </p>
                <p>
                  Dans les immeubles d'appartements d'époque ou dénués de monte-charges adaptés, l'extraction de certains meubles anciens massifs peut se révéler périlleuse pour l'état des escaliers et la sécurité des biens. Grâce à notre gamme d’équipements performants — dont des monte-meubles d'extérieur de pointe manipulant des charges allant jusqu'à 300 kg jusqu'au 8ème étage —, nous réalisons l'extraction par les fenêtres, le balcon ou les terrasses en préservant l'intégrité de la copropriété.
                </p>
                <p>
                  Pour coller exactement à vos attentes matérielles et financières, nous déclinons trois formules modulables. La formule <strong>Économique</strong> offre l’essentiel du transport de base, vous laissant piloter l'emballage complet de vos cartons. Notre formule <strong>Standard</strong> prend en charge l'empaquetage de l'ensemble de vos objets fragiles, miroirs et bibelots. Enfin, notre formule <strong>Luxe ou Clé En Main</strong> gère l'intégralité du chantier — du démontage à l'emballage complet et à la remise en place finale — pour un confort idéal.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Détail Déménagement Résidentiel
                </Link>
                <Link to="/calculateur-volume" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Calculateur Volume en m³
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GESTION ADMINISTRATIVE DE VOIRIE INTERNEL */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans text-left">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Réglementation de Secrétariat Local</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Réglementation & stationnement <span className="text-accent italic font-sans">à Vitry-sur-Seine</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Stationner un utilitaire de grand gabarit de manière prolongée sur les voies de circulation denses ou à fort passage de Vitry-sur-Seine interdit d'agir à la hâte. Les services administratifs de la <strong>Mairie de Vitry-sur-Seine</strong> encadrent rigoureusement l’occupation temporaire du domaine public pour les flux logistiques.
                </p>
                <p>
                  Il est indispensable de formuler une demande officielle de réservation de places au minimum 15 jours calendaires complets avant la date d’intervention souhaitée. Le non-respect de cette contrainte expose à d'importantes amendes de stationnement ou, plus grave, à l'impossibilité de stationner notre véhicule à proximité directe de votre hall d’entrée ou porche de cour.
                </p>
                <p>
                  Marne Transdem propose de s'occuper entièrement de cet aspect administratif chronophage. Notre équipe gère le dépôt des dossiers, assure les liaisons nécessaires avec la police municipale pour l'obtention des arrêtés techniques officiels et procède à l'implantation réglementaire des panneaux de signalisation de chantier temporaire afin de garantir une zone de manutention pleinement sécurisée le jour J.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/contact" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Prendre Contact pour Planifier
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Déménagement d'entreprise et manutention de bureaux à Vitry-sur-Seine" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TROIS FORCES */}
      <section className="py-24 font-sans text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Garantie & Savoir-Faire</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi choisir Marne Transdem <span className="text-accent underline decoration-accent/20">à Vitry-sur-Seine ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous allions la réactivité locale d'un artisan expert à la puissance de matériels logistiques professionnels pour une exécution parfaite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group text-left">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Flotte de camions adaptée</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Des fourgons urbains maniables de 20 m³ jusqu’aux camions-remorques routiers capitonnés, nous adaptons toujours le véhicule aux accès spécifiques de Vitry.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group text-left">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Cartons et adhésifs offerts</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Pas besoin de courir après les fournitures : l'intégralité des enveloppes d'emballage, caisses renforcées et rubans vous est livrée gracieusement à domicile.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group text-left">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Sécurité & assurances d'artisan</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Tous nos chantiers de déménagement de particuliers ou d'entreprises bénéficient de l'implication d’assurances professionnelles complètes pour une sécurité absolue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALENDRIER ET PHASES */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative text-left">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation de volume instantanée</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Mesurez le cubage de votre <br/><span className="text-accent italic font-sans italic">mobilier en quelques clics</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed">
                <p>
                  Savoir estimer son volume est crucial pour recevoir un devis rigoureux et calfeutrer au mieux la logistique de votre changement d'adresse.
                </p>
                <p>
                  Marne Transdem vous propose un calculateur en ligne performant pour vous aider à inventorier pièce par pièce vos commodes, tables, canapés et cartons. C'est l'assurance d'une équipe de déménagement parfaitement dimensionnée le jour de notre intervention physique.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Estimer mon volume gratuitement
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Le Calendrier Marne Transdem</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Diagnostic métrique initial</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Visite technique sur place ou à distance par visioconférence et validation immédiate de votre devis fixe.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-21 : Mise à disposition des contenants</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Fourniture de cartons, papier bulle renforcé, rouleaux d'adhésif et matériel de calage à domicile.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Obtention de l'arrêté de voirie</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Gestion administrative et réglementaire complète auprès de la Mairie de Vitry-sur-Seine.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Jour J : Manutention méticuleuse</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Chargement sous couvertures lourdes, transit par conducteur qualifié et emménagement soigné.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* 8. MAILLAGE DES SECTEURS DESSERVIS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Territoires du Val-de-Marne</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis en Île-de-France <span className="text-accent italic font-sans">autour de Vitry</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous opérons quotidiennement au cœur de la petite couronne parisienne pour offrir des services de déménagement haut de gamme aux particuliers et entreprises.
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

      {/* 9. HIGH CONVERSION CTA */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans text-center">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous préparez un déménagement à Vitry-sur-Seine ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez dès aujourd'hui de l'expertise reconnue et des conseils personnalisés des artisans déménageurs de Marne Transdem pour un emménagement en toute sérénité.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all min-w-[280px]">
              Faire ma demande de devis express
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
      <section className="py-24 font-sans text-left">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 col-span-full">
            <span className="text-xs font-black uppercase tracking-widest text-accent">La clarté avant tout</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic font-sans italic">Vitry-sur-Seine</span></h2>
            <p className="text-slate-500 font-light text-sm text-center">Toutes nos réponses professionnelles pour réussir sereinement votre déménagement de bureaux ou résidentiel.</p>
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

      {/* 11. ANCHOR FOOTER INTERLINKS */}
      <section className="py-12 bg-slate-900 font-sans text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 pb-8 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis en ligne</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Nos Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all text-white underline decoration-accent/30 underline-offset-4">Val-de-Marne (94)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 pt-8">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all">Paris</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all">Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-all">Nogent-sur-Marne</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent transition-all">Saint-Mandé</Link>
            <Link to="/demenagement-saint-maurice" className="hover:text-accent transition-all">Saint-Maurice</Link>
            <Link to="/demenagement-fontenay-sous-bois" className="hover:text-accent transition-all">Fontenay-sous-Bois</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-all">Charenton</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all">Saint-Maur-des-Fossés</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all">Créteil</Link>
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-all">Maisons-Alfort</Link>
            <Link to="/demenagement-ivry-sur-seine" className="hover:text-accent transition-all">Ivry-sur-Seine</Link>
            <Link to="/demenagement-villejuif" className="hover:text-accent transition-all">Villejuif</Link>
            <Link to="/demenagement-alfortville" className="hover:text-accent transition-all">Alfortville</Link>
            <Link to="/demenagement-le-kremlin-bicetre" className="hover:text-accent transition-all">Le Kremlin-Bicêtre</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalVitrySurSeine;
