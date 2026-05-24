import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase, ShieldAlert, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalVillejuif: React.FC = () => {
  const path = "/demenagement-villejuif";

  const faqs = [
    { 
      q: "Comment s'organise un déménagement à Villejuif face aux difficultés de voirie et de stationnement ?", 
      a: "La topographie de Villejuif, jalonnée par la colline du plateau de Longboyau et de nombreuses petites ruelles historiques adjacentes au centre-ville, impose quelques contraintes de gabarit. Un camion de déménagement de grand volume ne peut pas toujours stationner à moins de 20 mètres du porche d'entrée. Marne Transdem résout ces écueils en planifiant des véhicules capitonnés de 20 m³ à 30 m³ parfaitement maniables pour les accès complexes, combinés à des monte-meubles d'extérieur si l'accès par escalier ou ascenseur est trop étroit. Nous gérons également l'étude de portage piétonnier." 
    },
    { 
      q: "Quelles sont les démarches d'autorisation de stationnement auprès de la Mairie de Villejuif ?", 
      a: "Pour garer un ou plusieurs camions de déménagement sur la voie publique à Villejuif (94800), une demande d'autorisation de stationnement temporaire (occuper temporairement l'espace public) est obligatoire. Elle doit être déposée auprès des services techniques de la Mairie de Villejuif au moins 15 jours calendaires à l'avance. Cette réservation est cruciale pour sanctuariser l'espace et éviter les contraventions de voirie. À la demande de nos clients, Marne Transdem peut coordonner et soumettre cette demande en s'assurant de la conformité avec la réglementation locale pour vous libérer de tout souci le jour du déménagement." 
    },
    { 
      q: "Quelles solutions logistiques appliquez-vous pour les transferts de laboratoires scientfiques ou médicaux à Villejuif ?", 
      a: "Villejuif est un hub mondial de recherche biomédicale et d'oncologie grâce à Gustave Roussy, au pôle Cancer Campus et aux installations du CNRS. Marne Transdem collabore avec les centres de recherche et cliniques en mettant en œuvre des protocoles extrêmement rigoureux : emballage de verrerie scientifique dans des caisses en polystyrène thermo-régulées, transfert de serveurs et d'instruments d'analyse sous châssis suspendus anti-vibrations, conditionnement en cartons d'archives ignifugés et sécurisation du mobilier de laboratoire. Ces transferts sont exécutés sous la supervision d'un chef de projet expert en sciences et santé." 
    },
    { 
      q: "Proposez-vous différentes formules tarifaires adaptées aux particuliers à Villejuif ?", 
      a: "Oui, notre agence d'artisans décline trois formules modulables pour s'adapter à votre budget et à vos souhaits : la formule Économique (le client emballe l'intégralité de ses affaires, nous chargeons, transportons et livrons), la formule Standard (notre équipe prend en charge l'emballage de tous les objets fragiles, vaisselle, verres fins, ainsi que le démontage-remontage de vos meubles volumineux) et la formule Prestige ou Luxe (nous prenons soin de l'intégralité du travail, de l'emballage complet de tous les vêtements et livres jusqu'à la remise en place finale)." 
    },
    { 
      q: "Comment garantissez-vous la protection de nos meubles haut de gamme et objets fragiles ?", 
      a: "Nous employons des techniques d'emballage et de calage de qualité industrielle : housses d'épaisseur supérieure pour matelas et canapés, papier bulle à double couche renforcé pour les miroirs et les œuvres d'art, cadres capitonnés spécifiques et couvertures de transport d'un grammage élevé. De plus, notre entreprise est couverte par une assurance Responsabilité Civile Professionnelle complète protégeant vos biens d'éventuels aléas matériels à hauteur d'une déclaration de valeur personnalisée réalisée en amont." 
    },
    { 
      q: "Où se situent vos garde-meubles sécurisés par rapport à Villejuif ?", 
      a: "Si vous faites face à un décalage entre la remise des clés de votre ancien logement et la disponibilité du nouveau à Villejuif, nous disposons d'unités de stockage saines, sèches et ventilées à proximité immédiate dans le Val-de-Marne. Nos garde-meubles sont placés dans des conteneurs plombés individuels, continuellement surveillés par un système d'alarme électronique et de télésurveillance vidéo 24h/24 et 7j/7 pour préserver vos affaires de l’humidité et de toute intrusion." 
    }
  ];

  const nearbySectors = [
    { n: "Ivry-sur-Seine", l: "/demenagement-ivry-sur-seine" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Maisons-Alfort", l: "/demenagement-maisons-alfort" },
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Saint-Maurice", l: "/demenagement-saint-maurice" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Saint-Mandé", l: "/demenagement-saint-mande" },
    { n: "L'Haÿ-les-Roses", l: null },
    { n: "Le Kremlin-Bicêtre", l: "/demenagement-le-kremlin-bicetre" },
    { n: "Vitry-sur-Seine", l: "/demenagement-vitry-sur-seine" },
    { n: "Alfortville", l: "/demenagement-alfortville" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Villejuif | Logements, Recherche & Médical | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Villejuif (94) ? Marne Transdem réalise le déménagement soigné d'appartements, maisons, laboratoires de recherche et cliniques."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Villejuif", item: path }
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
              <FlaskConical size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Logistique Spécialisée & Résidentielle - Val-de-Marne</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Villejuif</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Confiez votre projet à un artisan déménageur de renom à Villejuif (94800). Déménagement de résidences familiales, appartements citadins ou transfert logistique d'instituts de recherche biomédicale et de cabinets médicaux : notre rigueur fait toute la différence.
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
                L'artisanat logistique <span className="text-accent italic">au service de Villejuif</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Située sur le plateau de Longboyau, la commune de <strong>Villejuif</strong> (94800) s'est imposée au fil des décennies comme une cité majeure de la petite couronne parisienne. Elle allie un tissu pavillonnaire historique très recherché à des quartiers modernes dotés de résidences de standing à haute efficacité énergétique. Son attrait s'enrichit également d'une connectivité réseau remarquable s'appuyant historiquement sur la ligne 7 du métro, étendue par les dessertes de la ligne 14 et le projet d'interconnexion du Grand Paris Express (notamment autour de la nouvelle gare emblématique <strong>Villejuif - Gustave Roussy</strong>).
                </p>
                <p>
                  Mais au-delà de sa dimension résidentielle en pleine mutation, Villejuif est internationalement réputée pour être une place forte de l’innovation scientifique et du secteur de la santé. Ville scientifique par excellence, elle abrite le célèbre <strong>Institut de cancérologie Gustave Roussy</strong> (premier centre de lutte contre le cancer en Europe), plusieurs pôles de recherche majeurs du <strong>CNRS</strong>, l'hôpital de jour Paul-Brousse ainsi qu’un écosystème florissant d'entreprises de biotechnologie, de laboratoires pharmaceutiques et de cabinets libéraux gravitant autour de la dynamique vallée de la bio-santé <i>Cancer Campus</i>.
                </p>
                <p>
                  Un tel profil de ville induit des exigences de déménagement doubles. D’un côté, la manutention soignée des appartements familiaux et des pavillons de charme réclame une grande flexibilité et un équipement d'accès performant. De l’autre côté, le transfert de bureaux d'instituts, de documents confidentiels ou de matériel d’analyse de pointe nécessite des qualifications très rigoureuses que seule une équipe aguerrie peut apporter. La société <Link to="/demenagement-val-de-marne" className="font-bold text-brand-900 hover:text-accent underline transition-all">Marne Transdem</Link> s'engage à vous fournir des prestations irréprochables pour répondre à ces enjeux.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-villejuif-94.jpg" 
                  alt="Déménagement d'appartement et logistique pour les résidents de Villejuif" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS DE DÉMÉNAGEMENT SCIENTIFIQUE ET MÉDICAL */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Spécialisation Sectorielle</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Déménagement de laboratoires & <span className="text-accent underline decoration-accent/20">centres de recherche ou médicaux</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Marne Transdem maîtrise les protocoles techniques d'emballage et de manutention requis pour le transfert sécurisé de vos matériels scientifiques délicats, salles de soins et serveurs informatiques.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Une méthodologie sans faille pour la santé & la recherche</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Le transfert de cliniques, de cabinets médicaux ou d’unités de recherche rattachées au pôle hospitalo-universitaire de Villejuif ne peut d'aucune façon souffrir l'improvisation. La manipulation d’instruments de précision, de microscopes optiques électroniques, de centrifugeuses haut de gamme ou de matériel de diagnostic sensible exige des compétences spécifiques et rigoureuses.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Nos techniciens qualifiés sont formés au conditionnement délicat de la verrerie de laboratoire, à la mise en œuvre de caissons thermo-régulés ou antichocs et au calage dans nos véhicules à suspension pneumatique d’appareillages de haute technologie. De surcroît, nous assurons l'archivage rigoureux de vos dossiers de patients ou de données d'essais cliniques sous charte de confidentialité absolue, de la mise en boîte scellée jusqu'au classement ordonné à destination.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <FlaskConical className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Conditionnement Spécifique</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Utilisation de bacs plastiques scellés et de valises d'emballage garnies de mousses techniques pour le matériel sensible.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <Building2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Transfert Informatique & Serveurs</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Déconnexion, étiquetage directionnel, emballage antistatique et réinstallation de vos architectures réseaux.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Planification et continuité d'activité médicale</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Qu'il s'agisse d'un cabinet dentaire libéral, d'un laboratoire de biologie moléculaire ou d'un service d'urgence hospitalière, nous planifions nos interventions pour réduire à néant l'interruption des soins et de vos travaux d'innovation.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Un conducteur de projet étudie le séquençage méthodique de vos services. Ainsi, nous réalisons l'essentiel du déménagement physique durant des plages horaires adaptées (en soirée, de nuit ou le week-end) pour que vos praticiens, scientifiques et secrétaires retrouvent leur environnement opérationnel fonctionnel immédiatement à la reprise d'activité.
              </p>
              <div className="pt-4">
                <Link to="/demenagement-entreprises-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Nos Services de Transfert de Bureaux & Cliniques <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DÉMÉNAGEMENT DE LOGEMENTS ET RESIDENTIELS À VILLEJUIF */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenageurs-professionnels-villejuif.jpg" 
                  alt="Déménageurs de métier en cours d'emballage d'objets précieux à Villejuif" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Divertitude et Sérénité Résidentielle</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Des déménagements soignés pour <span className="text-accent italic font-sans italic">maisons et appartements</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  S'installer dans une nouvelle résidence est un grand pas dans la vie d'un ménage qui requiert écoute et sécurité. De votre premier carton d’emballage jusqu'au remontage soigné de vos têtes de lits, les compagnons de Marne Transdem déploient des trésors de minutie.
                </p>
                <p>
                  Dans les immeubles récents de Villejuif, notamment ceux situés autour de la ligne 7 et de la liaison de la ligne 14, les accès de stationnement en sous-sol ou l’exiguïté des halls d’entrée nous poussent à concevoir l'usage de matériels agiles. Nous disposons d'appareillages de levage, dont des monte-meubles d'extérieur de pointe, idéaux pour évacuer par la fenêtre ou la terrasse les grands buffets lourds ou les canapés précieux d’angle sans endommager les espaces communs de la copropriété.
                </p>
                <p>
                  Pour correspondre parfaitement aux besoins de chacun, notre agence vous propose des formules à la carte. La formule <strong>Économique</strong> convient aux budgets modérés qui souhaitent gérer de manière anticipée la fabrication de leurs cartons d’objets personnels. Notre formule <strong>Standard</strong> prend en charge l'emballage sécurisé de la vaisselle précieuse, des objets d'art et d'éclairage. Enfin, notre formule <strong>Luxe ou Clé En Main</strong> gère l’intégralité des préparatifs pour vous offrir un emménagement d'un confort absolu.
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

      {/* 5. GESTION ADMINISTRATIVE ET EXPÉRIENCE TECHNIQUE DU 94 */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Réglementation de Voirie Locale</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Autorisations de stationnement <span className="text-accent italic font-sans">à la Mairie de Villejuif</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Chaque déménagement dans un centre-ville dense ou à proximité de grands axes de transit nécessite l'obtention d'un arrêté municipal auprès des services techniques de la <strong>Mairie de Villejuif</strong>. Cette autorisation permet la réservation légale de places de stationnement devant votre domicile afin que notre camion spécialisé de déménagement ou notre monte-meuble puisse y être positionné en toute sécurité réglementaire.
                </p>
                <p>
                  Il faut scrupuleusement anticiper ces démarches administratives. La Ville de Villejuif exige que le dossier soit impérativement constitué et officiellement déposé au moins 15 jours calendaires avant l’intervention physique.
                </p>
                <p>
                  Notre secrétariat prend en charge, si vous le souhaitez, l'ensemble de ces formalités. Nous transmettons les dimensions des véhicules, gérons le lien avec les services de voirie municipaux et organisons la pose et dépose réglementaire des panneaux d'interdiction de stationner temporaires à l’emplacement préalablement délimité.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/contact" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Planifier un Déménagement
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-cliniques-bureaux-villejuif.jpg" 
                  alt="Manutention et emballage technique pour administrations et bureaux à Villejuif" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TROIS FORCES MARNE TRANSDEM */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Savoir-Faire Garanti</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi nous confier votre déménagement <span className="text-accent underline decoration-accent/20">à Villejuif ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Marne Transdem allie l'exigence d'une entreprise structurée à la proximité réactive d'une équipe locale à taille humaine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Matériel Technique Premium</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Nous possédons notre propre flotte d’utilitaires et porteurs capitonnés et mettons en œuvre des chariots à roulettes souples anti-salissures et des sangles à ancrage sécuritaire.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Fournitures Professionnelles Offertes</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Tous nos cartons de déménagement (caisses à livres renforcées, adhésifs de qualité, penderies à vêtements suspendus sur cintres et bulles à bulles de protection d'époque) sont compris.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Assurance Contractuelle RC</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Chaque pièce de mobilier confiée fait l'objet d'une protection par notre assurance responsabilité civile d'entreprise, garantissant sa valeur en cas d'imprévu durant la manutention ou le transport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALCULATEUR EN LIGNE ET PHASES */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation Cube Instantanée</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Calculez avec justesse le <br/><span className="text-accent italic font-sans italic">volume en m³ de vos effets</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Savoir estimer son cubage exact de mobilier est la clé pour déterminer avec exactitude le modèle de camion adéquat ainsi que la force de main-d'œuvre requise pour le jour J.
                </p>
                <p>
                  Notre outil de calcul de volume interactif élimine toute approximation. Rapide et disponible en libre accès sur notre site, il vous aide à lister l'ameublement de vos pièces de vie pour formuler instantanément une cotation claire et transparente.
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
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-45 : Visite technique de reconnaissance</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Audit minutieux des volumes physiques chez vous ou en visioconférence, et remise de notre devis ferme.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Livraison des cartons d'emballage</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Fourniture gratuite de cartons, rubans d'adhésif solides et penderies livrés directement chez vous à Villejuif.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Affichage de l'arrêté municipal</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Gestion administrative de l'arrêté auprès de la Mairie de Villejuif pour réserver l’emplacement de voirie.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Le Jour J : Manutention & Emménagement</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Emballage, portage sécurisé, transit, déchargement et mise en place méticuleuse par nos compagnons de confiance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* 8. MAILLAGE DES SECTEURS DESSERVIS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Territoires du Val-de-Marne</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis en Île-de-France <span className="text-accent italic font-sans">autour de Villejuif</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous opérons quotidiennement dans l'ensemble de la région pour assurer le déménagement d'appartements de prestige et d'équipements de cabinets médicaux.
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
      <section className="py-24 bg-accent relative overflow-hidden font-sans">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous planifiez un déménagement à Villejuif ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez de l'expérience reconnue et rigoureuse des compagnons déménageurs de Marne Transdem pour un emménagement serein et sans friction, à votre propre rythme.
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
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">La clarté au quotidien</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic font-sans italic">Villejuif</span></h2>
            <p className="text-slate-500 font-light text-sm">Toutes nos réponses à vos interrogations sur la logistique résidentielle et médicale de Villejuif.</p>
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
            <Link to="/demenagement-vitry-sur-seine" className="hover:text-accent transition-all">Vitry-sur-Seine</Link>
            <Link to="/demenagement-alfortville" className="hover:text-accent transition-all">Alfortville</Link>
            <Link to="/demenagement-le-kremlin-bicetre" className="hover:text-accent transition-all">Le Kremlin-Bicêtre</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalVillejuif;
