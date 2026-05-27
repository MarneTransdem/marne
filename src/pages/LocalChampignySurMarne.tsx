import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalChampignySurMarne: React.FC = () => {
  const path = "/demenagement-champigny-sur-marne";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement de maison (pavillon) dans les quartiers comme Coeuilly ou Le Plant à Champigny ?", 
      a: "Les déménagements de maisons particulières à Coeuilly, Le Plant ou au Village Parisien à Champigny requirent une étude d'accès minutieuse. Ces quartiers se caractérisent par des rues résidentielles parfois étroites, arborées, ou en forte pente sur les coteaux. Nos équipes Marne Transdem programment l'utilisation d'utilitaires de gabarits adaptés (camions de 20m³ à 50m³ capitonnés) équipés de rampes de chargement et de matériel de portage lourd pour surmonter les marches ou allées de jardin. Nous assurons un emballage soigné de vos verres précieux, tableaux et vaisselle en cartons renforcés." 
    },
    { 
      q: "Quelles sont les formalités de stationnement nécessaires à Champigny-sur-Marne (94500) ?", 
      a: "Pour réserver des places de stationnement devant votre appartement ou maison à Champigny, vous devez impérativement obtenir une autorisation d'occupation temporaire du domaine public (AOT). Cette demande doit être transmise à la Mairie de Champigny-sur-Marne au moins 15 jours ouvrés à l'avance. Dans le cadre de nos offres clés en main, Marne Transdem gère l'ensemble de la procédure administrative municipale et déploie les panneaux de signalisation requis 48 heures avant votre emménagement." 
    },
    { 
      q: "Utilisez-vous un monte-meuble pour les appartements avec accès complexes ou denses à Champigny ?", 
      a: "Tout à fait. Pour les immeubles collectifs situés dans le centre-ville, aux Boullereaux ou vers le Bois l'Abbé, où les cages d'escalier sont parfois exiguës et les ascenseurs interdits au transport de charges lourdes, nous préconisons l'usage de nos monte-meubles d'extérieur. Nos nacelles élévatrices professionnelles permettent d'extraire et monter vos meubles (pianos, canapés d'angle, électroménagers) directement par la fenêtre ou le balcon en toute sécurité, réduisant de moitié le temps de manutention globale." 
    },
    { 
      q: "Proposez-vous des formules économiques pour les étudiants ou petits volumes à Champigny ?", 
      a: "Oui, nous concevons des formules entièrement modulables adaptées à tous les projets. Notre formule 'Économique' ou notre service de transport 'Petit Volume' conviennent parfaitement pour les petits budgets. Nos déménageurs de confiance se chargent du chargement minutieux, de l'arrimage sécurisé dans le camion et du transport, tandis que vous vous réservez l'emballage préliminaire de vos cartons d'effets personnels." 
    },
    { 
      q: "Comment estimer précisément le volume de mon mobilier avant le déménagement ?", 
      a: "Marne Transdem met à votre disposition un calculateur de volume virtuel très simple d'utilisation pour modéliser le cubage de votre maison ou appartement à Champigny. De plus, nous réalisons systématiquement une visite d'estimation gratuite (sur site ou en visio-conférence selon vos disponibilités) afin d'évaluer fidèlement les détails logistiques (accès, volume précis) et vous communiquer un devis sous 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur-des-fosses" },
    { n: "Joinville-le-Pont", l: "/demenagement-joinville-le-pont" },
    { n: "Nogent-sur-Marne", l: "/demenagement-nogent-sur-marne" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Fontenay-sous-Bois", l: "/demenagement-fontenay-sous-bois" },
    { n: "Chennevières-sur-Marne", l: null },
    { n: "Bry-sur-Marne", l: null },
    { n: "Villiers-sur-Marne", l: null },
    { n: "Le Perreux-sur-Marne", l: "/demenagement-le-perreux-sur-marne" },
    { n: "Alfortville", l: "/demenagement-alfortville" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Champigny-sur-Marne | Maisons & Appartements (94) | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Champigny-sur-Marne (94500) ? Marne Transdem organise votre déménagement résidentiel (maisons, appartements) ou transfert de bureaux. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Champigny-sur-Marne", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Spécialiste Résidentiel (94) - Maisons &amp; Appartements</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Champigny-sur-Marne</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem orchestre vos transitions de vie à Champigny-sur-Marne. Spécialistes de l'accompagnement des projets de déménagement pour maisons individuelles et appartements, nous relevons tous les défis d'accès géographiques des bords de Marne aux hauteurs de Coeuilly.
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

      {/* 2. LOGISTIQUE DE PROXIMITÉ ET DÉFIS DES COTEAUX */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">La Rigueur Logistique Val-de-Marnaise</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                L'Accompagnement de votre projet <span className="text-accent italic">sur-mesure</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  S'étendant fièrement sur les plaines et les collines de l'Est parisien, la commune de <strong>Champigny-sur-Marne</strong> (94500) séduit par sa diversité paysagère remarquable. Des majestueux pavillons nichés sur les hauteurs de <strong>Coeuilly</strong> ou du <strong>Village Parisien</strong>, aux appartements conviviaux du Plant ou des Boullereaux, la ville offre un panorama résidentiel prisé combinant charme architectural et liaison pratique vers Paris RER E et A.
                </p>
                <p>
                  Réaliser un déménagement dans cette cité requiert toutefois une maîtrise aiguë de sa topographie complexe. L’étroitesse de certaines voies flanc de coteaux, les dénivelés abrupts, la gestion du stationnement à proximité immédiate des commerces du Centre-ville et la coexistence routière exigent une préparation irréprochable. Transporter des meubles volumineux de maisons spacieuses ou d'appartements de grande hauteur réclame des outils professionnels spécifiques.
                </p>
                <p>
                  Dans ce cadre exigeant, <strong>Marne Transdem</strong> étudie et résout chaque contrainte d'accès. Grâce à une planification précise, à une flotte de camions modulaires capitonnés et au savoir-faire de nos équipes d'artisans expérimentés, nous vous garantissons un déménagement à Champigny-sur-Marne efficace, sécurisé et totalement débarrassé du stress traditionnel.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-94-val-de-marne.jpg" 
                  alt="Camion de déménagement résidentiel à Champigny-sur-Marne" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGISTIQUE MAISONS ET APPARTEMENTS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Des Standards Logistiques Élevés</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Accompagnement de projets <span className="text-accent underline decoration-accent/20">pour maisons et appartements</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Qu'il s'agisse d'un grand pavillon familial ou d'un appartement cosy, nous adaptons notre matériel et nos emballages pour protéger durablement vos effets personnels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Spécificités des déménagements résidentiels</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Un déménagement de maison (pavillon) implique souvent la manutention de gros volumes de pièces de mobilier (buffets anciens, tables imposantes, outillages de jardin, objets précieux). Les accès extérieurs peuvent nécessiter le franchissement d'allées gravillonnées, de terrasses ou d'escaliers extérieurs étroits. Notre équipe conçoit un plan d'action de portage efficace réduisant Fatigue et Risques de chocs.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                En appartement, la problématique est différente : étages élevés sans ascenseur, limitations strictes sur l'utilisation des ascenseurs de copropriété ou interdiction d'encombrement du hall commun. Nous mettons en œuvre des stratégies d’élévation innovantes pour garantir le respect de vos espaces collectifs.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Planification rigoureuse et Sur-mesure</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Gabarits de véhicules modulaires circulant sans peine dans les rues sinueuses de Cœuilly ou du Village Parisien.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Formalités d'occupation temporaire (AOT)</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Transmission et gestion complète des dossiers d'AOT auprès des services techniques de la Mairie de Champigny.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">monte-meubles d'extérieur à Champigny</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour préserver la splendeur et la tranquillité de vos copropriétés et limiter les allers-retours fatigants de cage d'escalier, l'utilisation de nos monte-meubles d'extérieur est systématiquement analysée. Elle est requise dès lors que les meubles ne passent pas les structures communes.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Notre équipement de levage professionnel moderne (supportant jusqu'à 300 kg de charge) nous permet d'acheminer vos canapés massifs, vos bibliothèques imposantes ou vos appareils volumineux directement en passant par l'extérieur du bâtiment. Cela sécurise vos biens et vos parties communes.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Notre matériel élévateur professionnel <ArrowRight size={16} />
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
                  src="/images/equipe-demenageur-94.jpg" 
                  alt="Déménageurs qualifiés dé chargeant du mobilier à Champigny-sur-Marne" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L'Art de Déménager en Toute Quiétude</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Prestations particuliers <span className="text-accent italic">à Champigny</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  S'installer dans une nouvelle maison ou un nouvel appartement à Champigny-sur-Marne est synonyme de nouvelles perspectives. Pour que cet événement se déroule dans d'excellentes conditions physiques et mentales, l'équipe d'artisans de Marne Transdem déploie des prestations soignées répondant à toutes vos exigences.
                </p>
                <p>
                  Nous utilisons des matériels d'emballage hautement protecteurs : cartons double-cannelures à forte résistance, penderies debout pour vêtements fragiles, valises matelassées antichoc pour vaisselle fine, et housses épaisses préservant literies et canapés contre la poussière ou l'humidité durant le transport.
                </p>
                <p>
                  Notre accompagnement se décline en trois formules phares : la formule <strong>Économique</strong>, centrée sur la manutention lourde sécurisée et le transport routier direct ; la formule <strong>Standard</strong>, idéale pour les foyers incluant l'emballage et le déballage méticuleux de vos objets fragiles par nos soins ; et la formule <strong>Luxe</strong>, l'excellence clé en main où nos compagnons se chargent de l'intégralité du conditionnement méthodologique et du déballage à destination.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Déménagement Particulier
                </Link>
                <Link to="/formules-demenagement" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Découvrir nos formules
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
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Une Gestion Logistique Performante</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert de bureaux et <span className="text-accent italic">commerces locaux</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Forte de son tissu économique dense, la ville de Champigny-sur-Marne abrite de nombreuses entreprises, commerces de proximité et professions libérales. Un transfert professionnel ou industriel dans ce secteur réclame une planification chirurgicale pour préserver l'efficacité opérationnelle de vos équipes et l'accueil continuel de votre clientèle.
                </p>
                <p>
                  Qu'il s'agisse de déplacer des bureaux administratifs, des cabinets comptables, des officines de santé ou des locaux d'activités, Marne Transdem affecte un coordinateur logistique dédié. Ensemble, nous concevons une codification précise permettant à chaque poste de travail d'être réimplanté sans délai de recherche.
                </p>
                <p>
                  Nos compagnons assurent l'emballage sécurisé et antistatique de votre matériel informatique indispensable, le transfert confidentiel de vos archives et le démontage/remontage professionnel de vos mobiliers de bureau. Nous intervenons volontiers en dehors des horaires d'exploitation (soir et week-end) pour zéro impact sur votre chiffre d'affaires.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 hover:scale-105 transition-all outline-none italic text-sm">
                  Déménagement Entreprise
                </Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Garde-meubles Sûr 94
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Déménagement d'entreprise professionnelle à Champigny-sur-Marne" 
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">Une Exigence Continue de Performance</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi nous faire confiance <span className="text-accent underline decoration-accent/20">à Champigny ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous reposons sur des valeurs fortes d'organisation logistique locale, de discrétion pour votre voisinage et de respect des engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Réglementations maîtrisées</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Notre secrétariat se charge intégralement auprès des autorités locales du dépôt des demandes d'autorisation d'occupation temporaire à Champigny-sur-Marne.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Fournitures Protectrices</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nous sélectionnons des cartons doubles renforcés, des valises antichocs pour verrerie et des écrins de protection de matelas imperméables.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Assurance transport incluse</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Toutes nos offres incluent une garantie d'assurance complète de marchandises couvrant la valeur contractuellement déterminée de vos biens précieux.
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
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent font-semibold">Plateforme de Simulation</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Calculez exactement le cubage mobilier <br/><span className="text-accent italic font-sans italic">pour votre plan d'action</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Déterminer au mètre cube près la quantité de biens à déménager évite les surcoûts et permet d'acheminer le volume adéquat de matériel de protection (cartons, adhésifs, penderies).
                </p>
                <p>
                  Marne Transdem met à votre entière disposition son calculateur numérique de volume intuitif. En renseignant mobilier par mobilier votre agencement, vous obtenez sous 2 mintues une modélisation précise indispensable pour concevoir votre devis.
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
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Les Étapes Méthodiques d'une Transition Sereine</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Visite technique & Chiffrage</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Évaluation rigoureuse des accès à Champigny, détermination du volume mobilier et envoi du devis sous 24h.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Mise à disposition du matériel</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Fourniture à domicile ou en retrait de vos cartons, adhésifs et plastiques à bulles hautement résistants.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Réservations municipales</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt et validation réglementaire des places de stationnement devant le logement à Champigny.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Exécution le Jour J</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Arrivée des compagnons, conditionnement délicat de vos mobiliers, chargement, transit et emménagement.</p>
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
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Couverture Immédiate 94</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Champigny-sur-Marne</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous intervenons régulièrement aux portes de l'Est parisien pour toutes vos opérations résidentielles ou logistiques à destination professionnelle.
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
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous préparez votre déménagement à Champigny-sur-Marne ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed font-normal">
            Bénéficiez de toute l'expertise de Marne Transdem pour assurer un déménagement efficace, en toute sécurité, spécialement étudié pour l'accessibilité des maisons comme des appartements.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all min-w-[280px]">
              Estimer mon devis gratuit
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
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Conseils & Pratiques loquaces</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Champigny-sur-Marne</span></h2>
            <p className="text-slate-500 font-light text-sm">Découvrez nos analyses pour réussir sereinement chaque étape de vos projets.</p>
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
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Estimer Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Nos Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all text-white underline decoration-accent/30 underline-offset-4">Val-de-Marne (94)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 pt-8">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all">Paris</Link>
            <Link to="/demenagement-paris-12" className="hover:text-accent transition-all">Paris 12</Link>
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
            <Link to="/demenagement-joinville-le-pont" className="hover:text-accent transition-all">Joinville-le-Pont</Link>
            <Link to="/demenagement-le-perreux-sur-marne" className="hover:text-accent transition-all">Le Perreux-sur-Marne</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalChampignySurMarne;
