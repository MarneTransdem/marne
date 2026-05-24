import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalJoinvilleLePont: React.FC = () => {
  const path = "/demenagement-joinville-le-pont";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Joinville-le-Pont face aux contraintes de l'Île de Fanac ou des quais de la Marne ?", 
      a: "Déménager à Joinville-le-Pont comporte des défis uniques, notamment si vous résidez sur la célèbre Île de Fanac (accessible uniquement par escalier et ascenseur piéton depuis le pont de Joinville) ou le long des quais de la Marne (Quai de la Marne, Quai de Polangis). Chez Marne Transdem, nous maîtrisons ces configurations fluviales spécifiques. Nous planifions l'utilisation de véhicules légers de moins de 3.5 tonnes ou l'acheminement de monte-meubles d'extérieur. Pour l'Île de Fanac, nos compagnons coordonnent une logistique de portage soignée ou des solutions fluviales adaptées si nécessaire." 
    },
    { 
      q: "Quelles sont les démarches administratives indispensables auprès de la Mairie de Joinville-le-Pont ?", 
      a: "Pour stationner un utilitaire de déménagement sur la voie publique à Joinville-le-Pont (94340), un arrêté d'autorisation temporaire d'occupation du domaine public est légalement requis. La demande doit être déposée auprès des services techniques de la Mairie de Joinville au minimum 15 jours calendaires avant la date prévue. Marne Transdem prend intégralement en charge le montage administratif de ce dossier et procède à la pose obligatoire des panneaux d'interdiction de stationner à l'emplacement réservé 48h à l'avance." 
    },
    { 
      q: "Proposez-vous des prestations de transfert d'entreprises ou de bureaux à Joinville-le-Pont ?", 
      a: "Parfaitement. Joinville-le-Pont profite d'un tissu économique actif, notamment autour du quartier d'affaires de Palissy ou de la zone industrielle. Nous accompagnons les professionnels, commerces et libéraux locaux avec des formules de transfert de bureaux prêtes à l'emploi : emballage méthodique des archives, étiquetage précis des postes de travail, conditionnement étanche et antistatique du parc informatique, et manutention de charges lourdes. Pour garantir votre continuité opérationnelle, nos équipes interviennent volontiers de nuit ou durant le week-end." 
    },
    { 
      q: "Quelles garanties offrez-vous pour la sécurité de mon mobilier précieux ?", 
      a: "Toutes nos opérations de déménagement incluent une assurance contractuelle complète garantissant vos biens. Pour une sécurité absolue, nous utilisons du matériel de protection haut de gamme : couvertures d'emballage épaisses pour protéger le mobilier en bois, housses capitonnées sur-mesure pour canapés et matelas, cartons télescopiques pour tableaux sous cadres, et valises en mousse antichoc pour la vaisselle délicate et la verrerie." 
    },
    { 
      q: "Comment obtenir un devis de déménagement ferme et gratuit pour Joinville-le-Pont ?", 
      a: "Afin de vous fournir une proposition tarifaire transparente et définitive, vous pouvez utiliser notre calculateur de volume interactif disponible sur notre site. Nous organisons également à votre convenance une visite technique gratuite à votre domicile à Joinville-le-Pont (ou à distance par visioconférence) pour analyser précisément les accès, le volume réel à déménager, et vous envoyer un chiffrage contractuel sous 24 heures." 
    }
  ];

  const nearbySectors = [
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur-des-fosses" },
    { n: "Saint-Maurice", l: "/demenagement-saint-maurice" },
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Nogent-sur-Marne", l: "/demenagement-nogent-sur-marne" },
    { n: "Champigny-sur-Marne", l: null },
    { n: "Maisons-Alfort", l: "/demenagement-maisons-alfort" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Paris 13e", l: "/demenagement-paris-13" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Joinville-le-Pont | Entre Ville et Nature (94) | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Joinville-le-Pont (94340) ? Marne Transdem réalise vos déménagements résidentiels et professionnels en bords de Marne. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Joinville-le-Pont", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Logistique Territoriale - Val-de-Marne (94)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Joinville-le-Pont</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem orchestre vos déménagements de particuliers et transferts de bureaux à Joinville-le-Pont. Bénéficiez d'un accompagnement haut de gamme et d'une logistique sur-mesure adaptée aux bords de Marne et à son cadre unique entre ville et nature.
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

      {/* 2. LOGISTIQUE LOCALE - CADRE ENTRE VILLE ET NATURE */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L'Art de Vivre Fluvial</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre déménagement à Joinville <span className="text-accent italic">entre ville et nature</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  Réputée pour sa douceur de vivre légendaire et son glorieux héritage de guinguettes, la charmante commune de <strong>Joinville-le-Pont</strong> (94340) s'étend majestueusement de part et d'autre d'une boucle somptueuse de la Marne. Limitrophe de Nogent-sur-Marne, de Saint-Maur-des-Fossés, de Saint-Maurice et du Bois de Vincennes, cette ville offre un équilibre parfait entre dynamisme urbain connecté via le RER A et calme préservé.
                </p>
                <p>
                  Cependant, ce cadre recherché amène des contraintes logistiques singulières. Les habitations pittoresques isolées sur l'<strong>Île de Fanac</strong>, les demeures historiques du quartier de Polangis et les bords de quai partagés avec pistes cyclables et promeneurs exigent des solutions de circulation hautement précises. De plus, la topographie vallonnée et l'étroitesse de certaines voies anciennes pavillonnaires proscrivent l'accès des semi-remorques traditionnels.
                </p>
                <p>
                  Pour répondre à cette complexité technique, <strong>Marne Transdem</strong> étudie et planifie chaque étape de votre intervention. Nous mettons en place des protocoles stricts de sécurisation de voirie et déployons exclusivement des compagnons d'expérience rompus aux manœuvres de précision afin de vous garantir une transition vers Joinville-le-Pont fluide, rapide et sereine.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-joinville-le-pont-94.jpg" 
                  alt="Déménagement résidentiel en bords de Marne à Joinville-le-Pont" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGISTIQUE ENTRE VILLE ET NATURE ET CONTRAINTES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">L'Ingénierie du Déménagement</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Relever le challenge des accès <span className="text-accent underline decoration-accent/20">en bords de Marne</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Déménager en milieu fluvial et verdoyant nécessite un équipement technique spécialisé et de solides accréditations réglementaires.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Des accès restreints sous contrôle</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Les résidences cossues de Polangis et les appartements modernes surplombant le port de plaisance de Joinville profitent de perspectives ravissantes mais de voies souvent denses ou à fort trafic piéton. Nos équipes préparent l'agencement matériel en amont pour éviter toute perturbation du flux urbain.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour l'Île de Fanac, la logistique de manutention et de transport par bras nécessite une force de portage de premier plan ou la mise en place de chariots spéciaux et de bâches étanches pour protéger le mobilier des embruns et de l'humidité naturelle. Nous adaptons la taille de nos camions pour garantir le franchissement aisé des différents ponts d'accès.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Flotte Réduite et Véhicules Modulaires</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Utilisation d'utilitaires agiles de 20 m³ à 30 m³ pour circuler sans encombre dans le Polangis résidentiel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Arrêtés de Stationnement Fluviaux</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Coordination administrative rigoureuse avec les services de police municipale et de voirie de Joinville.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Soin Matériel : L'Élévation monte-meubles extérieure</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Au sein des élégantes copropriétés joinvillaises proches du pont de Joinville ou sur l'avenue Gallieni, les halls sont fréquemment décorés de marbre et de miroirs. Les syndics protègent rigoureusement ces parties communes précieux contre les chocs de manutention.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Marne Transdem installe à cet effet un monte-meuble extérieur (capacité de levage de 300 kg) de dernière génération. En évitant d’utiliser les ascenseurs communs et les escaliers étroits, nous réduisons le temps d’immobilisation de moitié et garantissons un transfert sans embûches en passant directement par vos fenêtres ou terrasses.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Louer un monte-meuble pro <ArrowRight size={16} />
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
                  src="/images/demenageurs-professionnels-joinville.jpg" 
                  alt="Déménageurs qualifiés emballant et chargeant du mobilier à Joinville-le-Pont" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Services Privés d'Excellence</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Déménagement résidentiel <span className="text-accent italic">à Joinville-le-Pont</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  S'installer à Joinville-le-Pont représente un projet de vie axé sur l'équilibre entre dynamisme et détente au fil de l'eau. Quel que soit le caractère de votre logement — qu'il s'agisse de l'agencement complet d'une ravissante villa en briques meulières à Polangis ou d'un appartement meublé contemporain en plein cœur de ville — l'équipe d'artisans de Marne Transdem déploie des prestations d'excellence adaptables.
                </p>
                <p>
                  Nous sélectionnons des matériels d'emballage hautement professionnels et robustes : des cartons double-cannelure à haute résistance, des penderies verticales pour vos costumes et vêtements fins, des valises matelassées en mousse antichoc pour votre vaisselle fine, et des housses imperméables de protection pour matelas et ensembles de literie.
                </p>
                <p>
                  Pour répondre fidèlement à vos exigences financières et logistiques, notre accompagnement s'ajuste autour de nos trois formules éprouvées : la formule <strong>Économique</strong>, centrée sur la manutention soignée et le transport sécurisé ; la formule <strong>Standard</strong>, l'alliée incontournable des familles gérant l'emballage de vos contenus fragiles ; et enfin la formule <strong>Luxe</strong>, l'expérience clé en main haut de gamme où nos compagnons s’occupent d’emballer et de déballer l'intégralité de vos pièces.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Déménagement Particulier
                </Link>
                <Link to="/formules-demenagement" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Découvrir les formules
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
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Prestations Professionnelles & B2B</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert d'entreprises et <span className="text-accent italic">locaux professionnels</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Les contraintes liées à un transfert d'activité d'une entité professionnelle à Joinville-le-Pont se distinguent fortement d'une opération d'ordre privé. Sauvegarder l'intégrité de vos performances et l'accueil de vos clients commande une précision de planification totale, un archivage méthodique de vos pièces documentaires et le conditionnement sécurisé du réseau informatique.
                </p>
                <p>
                  Pour le déménagement de vos bureaux administratifs, de boutiques locales, ou d'espaces de coworking à Joinville-le-Pont, Marne Transdem affecte un chef de projet dédié. Nous élaborons un cahier des charges d'étiquetage précis pour garantir une réimplantation ultra-rapide des collaborateurs.
                </p>
                <p>
                  Nos déménageurs de confiance assurent le transport soigné de vos serveurs informatiques sous emballages spécifiques et antistatiques, le démontage minutieux du mobilier et la manutention d'équipements lourds. Grâce à notre grande flexibilité temporelle, nous réalisons ces transferts en dehors de vos horaires opérationnels (nuit et week-end) pour préserver la réactivité de votre entreprise.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 hover:scale-105 transition-all outline-none italic text-sm">
                  Service Professionnel
                </Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Garde-meuble de Proximité
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-entreprises-joinville.jpg" 
                  alt="Transfert de locaux professionnels et bureaux à Joinville-le-Pont" 
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">La Rigueur d'Artisans</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi choisir Marne Transdem <span className="text-accent underline decoration-accent/20">à Joinville-le-Pont ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous construisons notre service sur l'engagement, la transparence et le respect absolu des délais contractuels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Réglementation locale</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Notre secrétariat logistique effectue toutes les démarches et demandes d'arrêtés réglementaires de voirie auprès de la Mairie de Joinville.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Soin Matériel d'Excellence</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Emballages spécifiques renforcés : couvertures épaisses, coffres à vaisselle en mousse et penderies verticales rigides.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Sécurité & Assurance</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Toutes nos manutentions sont garanties par une couverture d'assurance transport détaillée de premier choix pour prémunir vos possessions de tout imprévu.
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
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation Précise en m³</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Évaluez la volumétrie de <br/><span className="text-accent italic font-sans italic">votre projet en quelques clics</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Près de 90% des imprévus d'un déménagement résultent d'une mauvaise estimation du cubage de mobilier à transporter. Choisir un utilitaire trop compact ou commander des cartons en quantité inadaptée peut ralentir l'organisation le jour J.
                </p>
                <p>
                  Pour vous prémunir de cette inquiétude, l'équipe de Marne Transdem met à votre disposition un module interactif intuitif d'évaluation de volume en mètres cubes directement accessible sur le site. Répertoriez pas à pas votre agencement d'ameublement pour obtenir une simulation rigoureuse.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Estimer mon volume mobilier
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Le Calendrier Guide du Déménagement</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-90 : Résiliation & Planification</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Préavis de bail de logement, pré-visite technique d'évaluation de cubage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Réception d'Emballages</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Fourniture à domicile du matériel de conditionnement et d'emballage.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Dépôt municipal</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt du dossier d'arrêté d'occupation temporaire auprès de la Mairie de Joinville.</p>
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

      {/* 8. BREADCRUMBS MAILLAGE GEOGRAPHY */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Maillage Régional 94</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs géographiques d'intervention <span className="text-accent italic font-sans italic">autour de Joinville</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous couvrons l'ensemble des communes du Val-de-Marne avec des équipes locales qualifiées et réactives.
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
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous préparez un déménagement à Joinville-le-Pont ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez de toute l'expertise de nos compagnons expérimentés pour garantir un déménagement efficace, en toute sécurité, et respectueux du cadre naturel des bords de Marne.
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">L'Information Logistique</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic">Joinville-le-Pont</span></h2>
            <p className="text-slate-500 font-light text-sm">Toutes nos réponses pratiques pour garantir l'efficacité à chaque étape de votre projet.</p>
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
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur Volume</Link>
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
            <Link to="/demenagement-alfortville" className="hover:text-accent transition-all">Alfortville</Link>
            <Link to="/demenagement-le-kremlin-bicetre" className="hover:text-accent transition-all">Le Kremlin-Bicêtre</Link>
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-all">Maisons-Alfort</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalJoinvilleLePont;
