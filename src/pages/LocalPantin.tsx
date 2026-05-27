import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalPantin: React.FC = () => {
  const path = "/demenagement-pantin";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement de lofts, ateliers ou anciens entrepôts réhabilités à Pantin ?", 
      a: "Pantin est célèbre pour ses magnifiques réhabilitations industrielles, notamment le long du Canal de l'Ourcq et dans le quartier des Quatre-Chemins. Ces lofts et ateliers d'artistes présentent souvent de très grandes hauteurs sous plafond, des mezzanines, mais aussi parfois des accès complexes (escaliers industriels, absence d'ascenseur adapté). Marne Transdem est spécialiste de ces configurations atypiques. Nous dépêchons des équipes formées aux passages difficiles, utilisons des chariots d'élévation d'intérieur et, si nécessaire, déployons nos monte-meubles télescopiques d'extérieur pour sécuriser la manutention de vos verrières, tableaux de grand format ou mobiliers design." 
    },
    { 
      q: "Quelles sont les formalités de stationnement auprès de la Mairie de Pantin (93500) ?", 
      a: "Pour pouvoir stationner légalement un camion de déménagement et installer un monte-meubles sur la voirie publique à Pantin, il est impératif d'obtenir une autorisation d'occupation temporaire (AOT) du domaine public. Cette demande doit être minutieusement déposée auprès des services techniques de la Mairie de Pantin au moins 15 jours francs avant l'opération. Pour vous libérer de ce fardeau logistique, Marne Transdem prend en charge la gestion complète des démarches administratives locales et pose la signalétique réglementaire 48h à l'avance." 
    },
    { 
      q: "Est-il possible de louer un monte-meuble d'extérieur pour un emménagement le long du Canal de l'Ourcq ?", 
      a: "Tout à fait. Les résidences modernes et lofts situés sur les quais de l'Ourcq à Pantin bénéficient souvent de balcons ou fenêtres larges propices à l'utilisation d'un monte-meubles. C'est l'option la plus sûre et rapide pour hisser des pièces massives (canapés, pianos, électroménager américain) sans aucun risque de détérioration dans les parties communes d'immeubles. Notre équipe technique évalue la faisabilité (absence de câbles haute tension, largeur de trottoir suffisante) lors de la visite d'estimation gratuite." 
    },
    { 
      q: "Proposez-vous une formule clé en main avec emballage et déballage complet pour les familles ?", 
      a: "Oui, notre formule Prestige (Luxe) est précisément conçue pour vous décharger de toute contrainte. Nos compagnons déménageurs professionnels s'occupent de tout : emballage individuel sous valises protectrices de votre vaisselle fine, vêtements suspendus sous penderies verticales protégées, mise en cartons de vos livres et objets décoratifs, démontage/remontage minutieux de vos lits et mobiliers complexes. À destination, nous réalisons le déballage total de vos biens et la disposition ordonnée selon vos directives." 
    },
    { 
      q: "Comment planifier l'estimation gratuite de mon volume à déménager à Pantin ?", 
      a: "Il vous suffit de nous contacter par téléphone ou de compléter le formulaire en ligne sur notre site. Un conseiller technique de Marne Transdem organisera de manière très réactive une visite à votre domicile (ou une visio-conférence dynamique) pour mesurer avec précision votre cubage, analyser les accès de rue et d'immeuble, et vous faire parvenir votre devis commercial ferme et gratuit sous 24 heures." 
    }
  ];

  const nearbySectors = [
    { n: "Paris 19e", l: "/demenagement-paris-19" },
    { n: "Paris 20e", l: "/demenagement-paris-20" },
    { n: "Les Lilas", l: null },
    { n: "Bagnolet", l: "/demenagement-bagnolet" },
    { n: "Montreuil", l: "/demenagement-montreuil" },
    { n: "Fontenay-sous-Bois", l: "/demenagement-fontenay-sous-bois" },
    { n: "Aubervilliers", l: null },
    { n: "Bobigny", l: null },
    { n: "Romainville", l: null },
    { n: "Seine-Saint-Denis (93)", l: "/demenagement-seine-saint-denis" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Pantin | Logements, Lofts & Bureaux | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Pantin (93500) ? Marne Transdem réalise vos déménagements de haut niveau pour lofts, pavillons et locaux professionnels. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Pantin", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Déménagement de Haut Niveau - Lofts, Lofts & Pavillons</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Pantin</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem orchestre vos projets de déménagement de haut niveau pour appartements familiaux, lofts atypiques et locaux professionnels à Pantin. Bénéficiez d’un savoir-faire logistique d'excellence, spécifiquement adapté aux particularités de la petite couronne.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander mon chiffrage gratuit
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

      {/* 2. LE CADRE URBAIN ET CHARMANT DE PANTIN */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L'Énergie des Portes de Paris</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Un déménagement d'exception <span className="text-accent italic">au service de votre sérénité</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left text-justify">
                <p>
                  Aux portes immédiates de <strong>Paris 19e</strong>, la ville de <strong>Pantin</strong> (93500) est devenue un pôle incontournable de créativité et de qualité de vie en Île-de-France. Traversée par le pittoresque Canal de l'Ourcq et bordée par les communes d'Aubervilliers, de Bobigny, de Romainville et de Bagnolet, Pantin conjugue à la perfection son dynamisme urbain et son important passé industriel. On y trouve aujourd'hui de magnifiques lofts d’architecte et d’anciens ateliers reconvertis, ainsi que de spacieux appartements familiaux dans des résidences contemporaines de standing ou de jolis pavillons à l'identité préservée.
                </p>
                <p>
                  Piloter un projet de déménagement dans cette ville en pleine effervescence requiert d'anticiper d'importantes contraintes locales : passages d'immeubles singuliers, ruelles parfois piétonnes ou de gabarit réduit, et une forte densité de circulation aux abords de la Porte de Pantin et de l'avenue Jean Lolive. La préservation de vos structures fragiles d'art et d'ateliers réclame une planification chirurgicale.
                </p>
                <p>
                  Pour répondre avec justesse et rigueur aux attentes des résidents et professionnels de Pantin, <strong>Marne Transdem</strong> étudie des plans de transport d'une grande fluidité. Grâce à l’utilisation d’équipements sélectifs d’élévation, d'emballages haute technicité et d’une flotte de camions modernes capitonnés, notre entreprise assure la sécurité complète de votre patrimoine.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-appartement-93.jpg" 
                  alt="Déménagement haut de gamme d'appartement ou loft le long du canal à Pantin" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGISTIQUE VILLAS ET LOGEMENTS FAMILIAUX */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">L'Excellence Opérationnelle</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Services de déménagement de haut niveau <span className="text-accent underline decoration-accent/20">résidentiel &amp; professionnel</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous adaptons nos gestes professionnels et nos véhicules capitonnés pour surmonter tous les défis géographiques et d'accès en hauteur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">La protection minutieuse de vos intérieurs et mobiliers d'art</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Un loft industriel ou un atelier créatif à Pantin héberge fréquemment d’importantes pièces de créateurs, des toiles sensibles ou du mobilier volumineux de designer d'une grande fragilité. Notre équipe d'artisans compagnons utilise des emballages certifiés haut de gamme pour garantir l'intégrité de chacun de vos objets.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Nous déployons des solutions de protection adaptées aux sols délicats (parquets massifs, résines) et pour les couloirs d'immeubles. Chaque table monumentale, lustre précieux, ou luminaire fait l'objet d’un emballage individuel sous drapage bull-kraft multicouches renforcé et est sanglé avec délicatesse à bord de nos véhicules capitonnés de transit.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Flotte moderne d'Est Parisien</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Des fourgons de capitonnage ergonomiques de gabarits variés parfaitement compatibles avec l'accès des canaux urbains.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Planification administrative complète</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Arrêtés municipaux et permis de stationnement gérés entièrement par notre bureau logistique auprès de la Mairie de Pantin.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Élévation extérieure par Monte-meubles</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Les cages d’escalier rustiques ou d'anciens monte-charges industriels ne permettent pas toujours le passage sécurisé de charges volumineuses ou lourdes.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Notre service met en œuvre des monte-meubles d'extérieur à nacelle télescopique pour déplacer de façon chirurgicale vos canapés massifs, pianos ou bibliothèques directement par fenêtre ou terrasse. Ce dispositif prévient durablement l'usure physique de nos confrères tout en préservant le calme de votre voisinage de copropriété.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Voir nos solutions d'élévation extérieure <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DETAILS DEMENAGEMENT PARTICULIER ET FORMULES */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/equipe-demenagement-93.jpg" 
                  alt="Équipe de déménageurs professionnels à l'œuvre à Pantin" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L'Art de Vous Accompagner</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Des offres étudiées <span className="text-accent italic">pour chaque projet</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Parce que chaque foyer a des besoins logistiques précis au moment de programmer son emménagement, Marne Transdem propose des calculs tarifaires reposant sur des offres modulables et transparentes.
                </p>
                <p>
                  La formule <strong>Économique</strong> convient parfaitement pour les livraisons simplifiées : elle se concentre sur la manutention lourde sécurisée de vos cartons préparés et le transport. La formule <strong>Standard (Confort)</strong> prend en charge avec précaution l'emballage délicat des éléments fragiles (vaisselle d'art de la table, miroirs et porcelaine).
                </p>
                <p>
                  La formule <strong>Prestige (Luxe)</strong> est la référence d'excellence pour un déménagement clé en main sans aucune contrainte physique. Nos compagnons emballent la totalité de vos affaires sous coffres hermétiques et remettent en place de façon ordonnée vos gardes-robes et meubles à destination pour vous assurer une installation immédiate de grand confort.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Déménagement Particulier
                </Link>
                <Link to="/formules-demenagement" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Découvrir nos 3 offres
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCAUX PROFESSIONNELS ET BUREAUX */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Haute Performance Logistique</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transferts d'entreprises et <span className="text-accent italic">bureaux de création</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Pantin abrite de talentueuses entreprises, showrooms d'art de luxe, industries des industries créatives ainsi que des cabinets de professions libérales. Mener un déménagement d'entreprise locale exige de restreindre autant que possible le temps d'interruption fonctionnelle de votre personnel.
                </p>
                <p>
                  Qu'il s'agisse du déplacement complet d'archives confidentielles de notaires, du démontage de showrooms d'habillement ou du transit de postes serveurs d'agences numériques, Marne Transdem maîtrise chaque étape opérationnelle.
                </p>
                <p>
                  Nos techniciens formés emballent votre parc de terminaux informatiques sous sachets antistatiques hermétiques, effectuent un marquage de signalation de couleur et coordonnent la manutention lourde. Nos interventions se planifient volontiers en plages de soirées ou de week-ends pour sécuriser votre continuité économique.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Déménagement National Entr.
                </Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Garde-meubles Île-de-France
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Déménagement de bureaux professionnels et locaux d'activités à Pantin" 
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">Des Valeurs Indéniables</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi nous confier votre transition <span className="text-accent underline decoration-accent/20">à Pantin ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous combinons toute la performance organisationnelle d'un grand réseau de transport à la proximité attentionnée d’une structure locale d'Est Parisien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Gestion municipale</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Notre secrétariat prend en charge le dépôt complet de votre dossier d'AOT de voirie auprès des services techniques de la Mairie de Pantin pour un accès serein.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Cartonnages Haute Densité</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Fourniture exclusive de cartons double cannelure rigides, penderies debout de transit et valises antichocs capitonnées d’excellence.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Assurances Ad Valorem</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Vos mobiliers design et équipements de valeur d'atelier sont protégés par un contrat d’assurance transport de premier plan de bout en bout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ENGIN ET CALCULATEUR VOLUME */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent font-semibold">Simulateur Mobilier En Ligne</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Évaluez au décimètre cube près <br/><span className="text-accent italic font-sans italic">votre gabarit d'emballage</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  La détermination exacte du volume mobilier de votre appartement ou loft de l'Est Parisien garantit des préparatifs parfaits et prévient toute complication organisationnelle le jour J.
                </p>
                <p>
                  Marne Transdem met à votre disposition son calculateur de cubage de dernière génération. Renseignez à votre convenance les pièces de votre mobilier actuel et posez d'excellentes bases de chiffrage.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Calculateur virtuel gratuit
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Le Cheminement Méthodique de notre Prestation</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Visite technique logistique</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Analyse approfondie à votre domicile de Pantin, des circulations ou par visio-conférence de vos accès routiers et estimation de volume contractuel.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Fourniture de matériels</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Mise à disposition ou emballage direct de vos cartons double cannelure haute résistance, bull-pack de protection d’art, et adhésifs renforcés.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Sécurisation administrative</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Élaboration de vos dossiers d'AOT auprès des services de voirie de Pantin et dispositifs visuels de sécurisation de zone.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Réalisation le Jour J</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Manutention d'une extrême minutie de vos mobiliers par nos artisans compagnons, arrimage de transit, transit et emménagement.</p>
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
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Est Île-de-France (93 / 94)</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Pantin</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous intervenons régulièrement dans le nord-est parisien et en Seine-Saint-Denis pour toutes vos volontés de transfert privé ou professionnel.
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
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous organisez un déménagement de prestige à Pantin ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed font-normal">
            Profitez de prestations d’Est Parisien de haut niveau, spécifiquement étudiées pour la préservation de vos biens précieux et lofts familiaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all min-w-[280px]">
              Faire ma demande de devis
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
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Vos questions résolues</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Pantin</span></h2>
            <p className="text-slate-500 font-light text-sm">Nos explications détaillées pour planifier sereinement chaque étape d’emménagement.</p>
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
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis Express</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Estimer Cubage</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Les 3 Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-seine-saint-denis" className="hover:text-accent transition-all text-white underline decoration-accent/30 underline-offset-4 font-black">Seine-Saint-Denis (93)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 pt-8">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all">Paris</Link>
            <Link to="/demenagement-paris-19" className="hover:text-accent transition-all">Paris 19</Link>
            <Link to="/demenagement-paris-20" className="hover:text-accent transition-all">Paris 20</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all">Vincennes</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-all">Charenton</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all">Saint-Maur-des-Fossés</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all">Créteil</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-all">Nogent-sur-Marne</Link>
            <Link to="/demenagement-fontenay-sous-bois" className="hover:text-accent transition-all">Fontenay-sous-Bois</Link>
            <Link to="/demenagement-joinville-le-pont" className="hover:text-accent transition-all">Joinville-le-Pont</Link>
            <Link to="/demenagement-champigny-sur-marne" className="hover:text-accent transition-all">Champigny-sur-Marne</Link>
            <Link to="/demenagement-le-perreux-sur-marne" className="hover:text-accent transition-all">Le Perreux-sur-Marne</Link>
            <Link to="/demenagement-montreuil" className="hover:text-accent transition-all">Montreuil</Link>
            <Link to="/demenagement-pantin" className="hover:text-accent transition-all">Pantin</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalPantin;
