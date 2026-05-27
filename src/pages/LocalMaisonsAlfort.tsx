import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalMaisonsAlfort: React.FC = () => {
  const path = "/demenagement-maisons-alfort";
  
  const faqs = [
    { 
      q: "Comment préparer un déménagement à Maisons-Alfort avec de fortes contraintes d'étages ?", 
      a: "Pour les appartements situés dans des immeubles sans ascenseur ou dotés de cages d'escalier étroites à Maisons-Alfort (comme dans le quartier historique d'Alfort ou de Charentonneau), l'organisation nécessite une étude technique préalable. Marne Transdem évalue la largeur des passages, le poids des meubles et la possibilité d'installer un monte-meuble extérieur. Nous planifions l'emballage renforcé, le démontage stratégique du mobilier encombrant et mobilisons une équipe de déménageurs professionnels expérimentés pour le portage de charges lourdes en toute sécurité." 
    },
    { 
      q: "Quelles sont les formalités de stationnement pour déménager à Maisons-Alfort ?", 
      a: "Déménager à Maisons-Alfort impose d'obtenir une autorisation de stationnement temporaire auprès des services municipaux de la mairie de Maisons-Alfort. Cette démarche doit être effectuée au moins 15 jours avant la date du déménagement. Elle permet de réserver l'emplacement nécessaire pour le camion de déménagement et l'éventuel monte-meuble, évitant ainsi les obstructions de circulation sur les avenues fréquentées comme l'avenue du Général de Gaulle ou l'avenue Gambetta. Notre société de déménagement peut prendre en charge cette démarche administrative pour votre confort." 
    },
    { 
      q: "Comment s'organise le transfert de bureaux ou de locaux professionnels à Maisons-Alfort ?", 
      a: "Le transfert d'entreprise ou de bureaux à Maisons-Alfort exige une planification stricte pour minimiser l'impact sur votre activité. Nous réalisons un inventaire complet du parc informatique, des archives, du mobilier ergonomique et des documents sensibles. Nos équipes interviennent souvent en horaires décalés ou le week-end. Grâce à notre proximité avec les grands axes routiers comme l'autoroute A4 et le Val-de-Marne, nous assurons un transport ultra-sécurisé et un remontage rapide de vos espaces de travail." 
    },
    { 
      q: "Quel est le tarif moyen d'un déménagement résidentiel à Maisons-Alfort ?", 
      a: "Le coût d'un déménagement dépend de plusieurs critères précis : le volume total en mètres cubes (m³), la distance entre l'adresse de départ et d'arrivée, les conditions d'accès (nombre d'étages, présence ou non d'un ascenseur, distance de portage) et la formule d'accompagnement choisie (Économique, Standard ou Luxe). Marne Transdem propose des visites techniques gratuites, sur place ou à distance par visioconférence, pour vous délivrer un devis personnalisé, transparent et sans surcoût caché." 
    },
    { 
      q: "Est-il nécessaire d'utiliser un monte-meuble pour un déménagement en résidence ?", 
      a: "L'usage d'un monte-meuble est fortement recommandé lorsque les meubles volumineux ne passent pas par l'escalier ou l'ascenseur, ou si le règlement de copropriété de votre résidence à Maisons-Alfort interdit le portage de charges lourdes dans les parties communes. L'installation d'une échelle ou d'un monte-meuble dépend également de la configuration de la rue, de l'absence de câbles électriques aériens ou de arbres, et de l'autorisation de stationnement obtenue." 
    },
    { 
      q: "Proposez-vous une formule d'emballage complet pour les objets fragiles ?", 
      a: "Oui, notre formule Luxe prend en charge l'emballage intégral de vos biens, y compris la vaisselle fine, les verres en cristal, les objets d'art, les miroirs et les tableaux. Pour les formules intermédiaires comme la Standard, nos déménageurs professionnels se chargent uniquement de la mise en caisse et de la protection du mobilier fragile, tandis que vous préparez les cartons d'effets non fragiles (livres, vêtements, linge de maison)." 
    }
  ];

  const nearbySectors = [
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur-des-fosses" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Saint-Maurice", l: "/demenagement-saint-maurice" },
    { n: "Alfortville", l: "/demenagement-alfortville" },
    { n: "Joinville-le-Pont", l: "/demenagement-joinville-le-pont" },
    { n: "Ivry-sur-Seine", l: "/demenagement-ivry-sur-seine" },
    { n: "Vitry-sur-Seine", l: "/demenagement-vitry-sur-seine" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Maisons-Alfort | Résidences & Bureaux | Marne Transdem"
        description="Besoin d'un déménagement à Maisons-Alfort ? Expert du Val-de-Marne 94, Marne Transdem assure le transfert de résidences et de bureaux. Spécialiste des accès complexes et des étages élevés."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Maisons-Alfort", item: path }
          ])
        ]}
      />

      {/* 1. SECTION HERO */}
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménageur de Confiance - Val-de-Marne (94)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Maisons-Alfort</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Maisons-Alfort. Nous apportons une attention méticuleuse et une expertise logistique éprouvée pour surmonter les défis des accès difficiles, des étages supérieurs sans ascenseur, et des configurations complexes de copropriétés.
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

      {/* 2. MAJEUR CONTENU ÉCRIT - MINIMUM 1200 MOTS */}
      {/* Introduction locale & Présentation de la Ville */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Expertise de Proximité</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">
                L'art du déménagement <span className="text-accent italic">à Maisons-Alfort</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  Bordée par les eaux de la Marne, la charmante commune de <strong>Maisons-Alfort</strong> (94700) incarne un cadre de vie de premier plan au sein de la banlieue immobilière de l'Est parisien. Idéalement limitrophe du bois de Vincennes et particulièrement proche de Paris, elle séduit par son urbanisme équilibré, son dynamisme économique, et l'excellence de ses liaisons de transports. De sa célèbre <em>École nationale vétérinaire d'Alfort (ENVA)</em> au mythique Musée Fragonard, la ville se distingue par son riche patrimoine historique.
                </p>
                <p>
                  Mais déménager au sein d'une telle cité requiert une connaissance pointue de sa configuration. Des zones hautement résidentielles de <strong>Charentonneau</strong> aux quartiers d'habitat dense du <strong>Vert-de-Maisons</strong>, d'Alfort, du Centre-ville, ou des Planètes, chaque secteur offre des typologies de bâtis uniques. Que vous résidiez dans une majestueuse maison bourgeoise sur les bords de Marne ou dans une copropriété moderne d'immeubles collectifs, les exigences de manutention et de transport exigent un savoir-faire rigoureux et certifié.
                </p>
                <p>
                  C'est ici qu'interviennent les équipes de <strong>Marne Transdem</strong>, votre partenaire déménageur de référence dans tout le <Link to="/demenagement-val-de-marne" className="font-bold text-brand-900 hover:text-accent underline transition-colors">Val-de-Marne</Link>. Notre mission consiste à lever toutes les incertitudes liées à votre changement d'adresse pour assurer un déroulement fluide, serein, rigoureusement planifié et sécurisé de vos biens personnels.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenageur-professionnel-94.jpg" 
                  alt="Déménagement à Maisons-Alfort - Marne Transdem" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LE GRAND DEFI DES ACCES ET DES ETAGES (Focus principal) */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">La Logistique de Précision</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Le défi majeur des <span className="text-accent underline decoration-accent/20">accès complexes et des étages</span> à Maisons-Alfort</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Manœuvrer le mobilier familial, les cartons fragiles et l'équipement informatique de bureau dans un environnement urbain exige des dispositifs spécifiques de manutention.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Les spécificités architecturales de la ville</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Le tissu urbain de Maisons-Alfort est caractérisé par une grande mixité. D'un côté, le quartier pavillonnaire de <strong>Charentonneau</strong> rassemble de belles maisons disposant parfois d'entrées étroites, d'allées de garage sinueuses ou de sous-sols difficiles d'accès. De l'autre, les grands ensembles résidentiels et les immeubles modernes s'élèvent sur plusieurs étages, équipés ou non d'ascenseurs dont les limites de charge utile interdisent le transport des plus grands meubles.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Les cages d'escalier collectives ou individuelles de style ancien, fréquentes dans les quartiers historiques autour de la mairie, s'avèrent souvent trop étroites pour les canapés d'angle, les armoires en chêne, les pianos ou l'électroménager lourd. Forcer le passage expose au risque d'endommager gravement les parois de l'escalier, de briser ou déformer le mobilier, ou de blesser le personnel.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Plan d'accès personnalisé</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Repérage de la porte d'entrée, de l'embrasure de garage et de la configuration de voirie.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Optimisation d'équipe</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Équipe dimensionnée pour le portage manuel intensif avec sangles professionnelles de levage.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">La Solution: Le Monte-Meuble de Levage</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour pallier ces difficultés, <strong>Marne Transdem</strong> intègre de manière agile des solutions techniques innovantes, notamment la location de monte-meuble et monte-charge de déménagement. Installées en façade depuis la chaussée ou une zone de cour privée, nos plateformes élévatrices permettent de descendre ou de monter les affaires les plus volumineuses directement par les fenêtres ou les balcons, jusqu'au 8ème étage et plus.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Cette méthode offre un triple avantage : elle élimine la fatigue et la manutention dangereuse dans les escaliers étroits, elle garantit l'intégrité absolue du mobilier lourd, et elle accélère de manière spectaculaire le temps de chargement au camion. C'est également un gage de respect pour les parties communes de votre copropriété, évitant les nuisances sonores, les éraflures sur les peintures et les dégâts potentiels aux ascenseurs partagés.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Découvrir notre service Monte-Meuble <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DÉMÉNAGEMENT RÉSIDENTIEL À MAISONS-ALFORT */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/equipe-demenageur-94.jpg" 
                  alt="Déménageurs professionnels à Maisons-Alfort" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Services Résidentiels</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Le déménagement de votre <span className="text-accent italic">logement ou appartement</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Changer de logement est une affaire d'organisation rigoureuse. Qu'il s'agisse du déménagement complet d'une maison de famille près de la Marne ou du transfert d'un studio d'étudiant situé à proximité de l'École Vétérinaire, <strong>Marne Transdem</strong> adapte chaque étape mécanique et humaine aux particularités de votre vie. Notre engagement repose sur une prise en charge professionnelle et sereine.
                </p>
                <p>
                  Notre personnel qualifié se charge de la fourniture en quantité requise de matériel professionnel d'emballage : cartons spéciaux pour livres, cartons penderie pour vos vêtements sur cintres, housses de protection capitonnées pour canapés et ensembles literie, couvertures de protection pour le mobilier en bois précieux, et caisses alvéolées destinées à l'emballage sécurisé de la verrerie fragile et des assiettes.
                </p>
                <p>
                  Nous nous adaptons avec précision à votre budget à travers trois formules modulables : l'<strong>Économique</strong>, idéale si vous souhaitez vous-même mettre en cartons pour que nous gérions uniquement le portage et le transport sécurisé ; la formule <strong>Standard</strong>, notre option la plus populaire combinant la mise en carton par vos soins du linge et des livres, avec notre gestion intégrale du mobilier fragile et de la vaisselle ; et enfin la formule <strong>Luxe</strong>, un service clé en main où nous prenons en charge la totalité de l'emballage et du déballage à votre nouvelle adresse.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Détails Particuliers
                </Link>
                <Link to="/formules-demenagement" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Comparer nos formules
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRANSFERTS DE BUREAUX ET ENTREPRISES À MAISONS-ALFORT */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Solution B2B Corporate</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert de bureaux et <span className="text-accent italic">déménagement professionnel</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Les exigences logistiques d'un déménagement d'entreprise à Maisons-Alfort diffèrent fondamentalement de celles d'un projet de nature résidentielle. Afin de préserver la productivité et la continuité opérationnelle de votre établissement, il est crucial d'étudier la planification des tâches avec minutie, de gérer les archives avec ordre, d'assurer une manipulation impeccable du matériel informatique de pointe et de veiller à une réimplantation efficace des espaces.
                </p>
                <p>
                  Qu'il s'agisse du déménagement de bureaux administratifs d'une PME implantée sur l'avenue Gambetta, d'un cabinet professionnel médical, juridique ou comptable, ou d'une agence commerciale, <strong>Marne Transdem</strong> déploie un chef de projet dédié pour coordonner l'intégralité du processus. Nous concevons un plan concret d'étiquetage des bureaux, des ordinateurs et des cartons d'archives, permettant ainsi une réimplantation rapide et sans faille des équipes dans leurs nouveaux locaux professionnels.
                </p>
                <p>
                  Notre savoir-faire couvre également l'emballage rigide de vos parcs de serveurs et machines informatiques sensibles à l'aide de bacs en plastique scellables, le démontage méticuleux des postes de travail ergonomiques, et le portage de coffres-forts ou d'équipements lourds. Grâce à notre flexibilité opérationnelle, nous mettons en place des transferts par phases, de nuit ou durant le week-end, minimisant à l'extrême l'arrêt d'exploitation de votre structure.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-hover hover:scale-105 transition-all outline-none italic text-sm">
                  Planifier un transfert pro
                </Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Garde-meuble disponible
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Transfert de bureaux et structures professionnelles à Maisons-Alfort" 
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">La Rigueur Marne Transdem</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi nous confier votre <span className="text-accent underline decoration-accent/20">reconstitution de foyer</span> ?</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Marne Transdem garantit un engagement contractuel rigoureux basé sur l'efficacité, la sécurité et la clarté financière.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Flotte moderne labellisée</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nos camions de déménagement capitonnés de différents litrages s'adaptent avec polyvalence à tous les volumes de chargement et circulent facilement à Maisons-Alfort.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Fournitures d'emballage pro</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nous fournissons tout le matériel requis : cartons, scotchs silencieux, papier d'emballage bull-pack d'amortissement, penderies à vêtements et housses protectrices imperméables.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Couverture d'assurance totale</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Chaque contrat de déménagement inclut une assurance transport détaillée de vos biens personnels contre l'avarie ou l'imprévu, basée sur une déclaration préalable de valeur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREPARATION ERGONOMIQUE DU VOLUME */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation Cube & Volume</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Estimez votre volume de <br/><span className="text-accent italic font-sans italic">meubles et meubles lourds</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Le volume exact en m³ (mètres cubes) est le point pivot de tout devis de déménagement de précision. Évaluer de façon intuitive ou approximative vos cartons et votre immobilier expose au risque de surcoût ou de manque de place au camion le jour J.
                </p>
                <p>
                  Pour vous accompagner dans cette estimation indispensable, Marne Transdem met à votre entière disposition un outil calculateur de volume en ligne d'une haute précision technique. Répertoriez pièces par pièces l'agencement de vos buffets, lits, commodes, cartons indicatifs et canapés afin de préparer instantanément votre devis personnalisé.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Utiliser le calculateur de volume
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Chronologie d'un déménagement serein</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-90 : Planification admin</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Préavis de bail, pré-visite technique, choix de la formule idéale.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Livraison de vos cartons</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Emballage méthodique des effets non fragiles par vos soins.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Autorisation municipale</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Pose des barrières de stationnement au départ et à l'arrivée (Mairie).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Le Jour J : Prise en charge sécurisée</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Soin de manutention, démontage, arrimage camion et livraison sécurisée.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* 8. BREADCRUMBS MAILLAGE SECTEURS PROCHES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Le Réseau du Val-de-Marne</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs géographiques d'intervention <span className="text-accent italic font-sans italic">autour de Maisons-Alfort</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous couvrons l'ensemble des départements de la petite couronne et de la région IDF, avec des équipes de déménageurs de proximité disponibles de suite.
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

      {/* 9. NOUVEAU CALL-TO-ACTION MAJEUR DE CONVERSION */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous préparez un déménagement à Maisons-Alfort ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez de l'expertise de notre société pour un déménagement sans stress, parfaitement adapté au volume de votre mobilier, aux accès d'étages encombrés et aux formalités administratives.
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

      {/* 10. FOIRE AUX QUESTIONS LOCALES (FAQ) ENRICHIE */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Questions Légitimes</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic">Maisons-Alfort</span></h2>
            <p className="text-slate-500 font-light text-sm">Toutes les informations logistiques incontournables pour réussir votre projet sans surprises.</p>
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

      {/* 11. MAILLAGE INTERNE TECHNIQUE D'ANCRAGE */}
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
            <Link to="/demenagement-alfortville" className="hover:text-accent transition-all">Alfortville</Link>
            <Link to="/demenagement-joinville-le-pont" className="hover:text-accent transition-all">Joinville-le-Pont</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalMaisonsAlfort;
