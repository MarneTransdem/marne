import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalSaintMaurice: React.FC = () => {
  const path = "/demenagement-saint-maurice";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement à Saint-Maurice avec des accès délicats sur le Plateau ou la Gravelle ?", 
      a: "Le plateau de Saint-Maurice et les quartiers attenants au bois de Vincennes (comme le secteur de la Gravelle ou de l'ancien canal de Saint-Maurice) possèdent des ruelles typiques, des voies vallonnées ou des copropriétés résidentielles arborées d'accès parfois ardu. Marne Transdem gère ces difficultés d'accès en mobilisant de petits utilitaires maniables pour effectuer les navettes intermédiaires et en déployant un monte-meuble si les escaliers sont exigus. Chaque configuration fait l'objet d'un examen minutieux lors de notre visite technique gratuite préalable." 
    },
    { 
      q: "Quelles sont les réglementations et demandes de stationnement à Saint-Maurice ?", 
      a: "Afin de réserver l'emplacement nécessaire pour un camion de déménagement à Saint-Maurice (94410), il est requis d'effectuer une demande officielle d'autorisation temporaire de voirie auprès des services techniques de la mairie de Saint-Maurice. Ce dépôt administratif doit être impérativement effectué au minimum 15 jours ouvrés à l'avance. Notre entreprise de déménagement peut s'occuper de coordonner ces modalités avec les arrêtés municipaux pour garantir une place libre et sécurisée le jour J." 
    },
    { 
      q: "Quelle formule de déménagement choisir pour un appartement en résidence à Saint-Maurice ?", 
      a: "Tout dépend de votre budget et de votre souhait d'implication. Notre formule Économique comprend uniquement le chargement, le calage en camion capitonné et le transport à destination. La formule Standard, la plus demandée, inclut la mise en carton et l'emballage complet du mobilier délicat ainsi que de la vaisselle fragile. Notre formule Luxe propose quant à elle une prestation haut de gamme 100% clé en main, où nos déménageurs de métier s'occupent de tout emballer, démonter et remonter au déballage." 
    },
    { 
      q: "Proposez-vous le transfert de bureaux et de structures d'entreprises implantées à Saint-Maurice ?", 
      a: "Oui, Saint-Maurice abrite un tissu dynamique de professionnels de santé, d'institutions hospitalières et de sièges administratifs. Nous réalisons des transferts d'ateliers, de cabinets médicaux ou de bureaux tertiaires complets. Notre méthodologie intègre l'identification des flux à déplacer, le repérage technique, le conditionnement des archives confidentielles et des connectiques informatiques, avec des interventions de nuit ou le week-end." 
    },
    { 
      q: "Comment estimer à coup sûr le volume en mètres cubes de mes meubles à Saint-Maurice ?", 
      a: "Pour garantir un chiffrage rigoureux et transparent, nous vous offrons notre calculateur de volume en ligne. En reportant pièce par pièce votre ameublement (buffets, lits, commodes, cartons à livres), vous obtiendrez un cubage précis permettant d'affecter le véhicule adéquat. Nous réalisons également des visites à domicile et des visio-expertises rapides pour valider ces métrages." 
    },
    { 
      q: "Mes meubles de valeur sont-ils couverts par une assurance durant le transport ?", 
      a: "Absolument. Chez Marne Transdem, la confiance et la sécurité contractuelle sont indispensables. Chaque déménagement est accompagné d’une assurance de responsabilité civile professionnelle de haut niveau couvrant intégralement la valeur déclarée de votre patrimoine. Nous élaborons avec vous une déclaration de valeur détaillée pour garantir une protection totale contre tout aléa de manutention." 
    }
  ];

  const nearbySectors = [
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Maisons-Alfort", l: "/demenagement-maisons-alfort" },
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur-des-fosses" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Saint-Mandé", l: "/demenagement-saint-mande" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Joinville-le-Pont", l: "/demenagement-joinville-le-pont" },
    { n: "Alfortville", l: "/demenagement-alfortville" },
    { n: "Nogent-sur-Marne", l: "/demenagement-nogent-sur-marne" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Saint-Maurice (94) | Résidentiel & Professionnel"
        description="Besoin d'un déménageur de confiance à Saint-Maurice ? Marne Transdem vous propose des prestations soignées et sur-mesure pour appartements, maisons et bureaux."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Saint-Maurice", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Partenaire Local - Val-de-Marne 94</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Saint-Maurice</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Artisan du déménagement haut de gamme en Île-de-France, Marne Transdem assure la manutention méticuleuse de vos résidences et bureaux sur le secteur de Saint-Maurice. Découvrez des formules adaptées à votre budget pour un emménagement serein.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Devez un devis en ligne
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

      {/* 2. RICH TEXT LAYOUT - OVER 1200 WORDS FOR ADVANCED LOCAL SEO */}
      {/* Introduction */}
      <section className="py-24 font-sans text-left">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Ancrage Territorial</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                L'excellence logistique <span className="text-accent italic">à Saint-Maurice</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  S'étendant en lisière immédiate du <strong>Bois de Vincennes</strong> et dominée par la Marne, la sublime commune de <strong>Saint-Maurice</strong> (94410) représente l'un des joyaux du Val-de-Marne. Célèbre pour avoir vu naître le célèbre peintre Eugène Delacroix, cette ville conjugue avec brio le charme bucolique de ses bords de fleuve et le confort de vie urbain d'une localité résidentielle huppée de la petite couronne. Sa proximité stratégique avec les grands axes autoroutiers, notamment l'autoroute A4, en fait une destination d'habitation et d'implantation d'affaires privilégiée.
                </p>
                <p>
                  Cependant, déménager dans cette magnifique commune implique des défis logistiques singuliers. Qu'il s'agisse des élégantes demeures nichées sur le <strong>Plateau</strong>, des immeubles résidentiels cernant le secteur de l'<strong>Hôpital National de Saint-Maurice</strong>, ou des lofts entourant l'ancien tracé du canal, les configurations d'accès sont aussi riches que variées. Les montées d'escaliers souvent étroites, la topographie vallonnée de certaines rues, et la densité du stationnement urbain exigent de s'en remettre à des professionnels aguerris du déménagement.
                </p>
                <p>
                  C'est précisément dans ce cadre exigeant et minutieux que la société <strong>Marne Transdem</strong> intervient. Spécialistes reconnus de l'accompagnement des particuliers et des professionnels dans le <Link to="/demenagement-val-de-marne" className="font-bold text-brand-900 hover:text-accent underline transition-all">Val-de-Marne (94)</Link>, nos compagnons déménageurs de métier déploient tout leur savoir-faire. Nous élaborons des réponses techniques sur-mesure pour soustraire votre projet de toute source de tracas, d'imprévus ou de fatigue inutile.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-appartements-saint-maurice-94.jpg" 
                  alt="Prestation de déménagement à Saint-Maurice - Marne Transdem" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LES COMPLICATIONS ARCHITECTURALES (Focus Accès & Étages) */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Analyse Logistique</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Accessibilité, escaliers complexes et <span className="text-accent underline decoration-accent/20">altitudes résidentielles</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Pour Marne Transdem, la préservation de l'intégrité de votre patrimoine mobilier est un enjeu primordial, même au sein des configurations urbaines les plus serrées.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Reconnaissance de terrain et défis d'accès</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Le relief de Saint-Maurice est caractérisé par un dénivelé notable entre le plateau longeant le Bois de Vincennes et la vallée de la Marne. De ce fait, l'architecture locale rassemble de nombreuses voies à forte déclivité, des ruelles d'accès sinueuses et des zones de stationnement particulièrement réglementées. Les résidences anciennes, d'un côté, séduisent par leur cachet architectural mais présentent de réelles difficultés lorsque l'on tente d'y faire pivoter des buffets lourds ou des canapés précieux dans des volées d'escalier à colimaçon.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Les copropriétés modernes construites le long de la rue du Maréchal Leclerc disposent généralement d'ascenseurs dont les limites dimensionnelles restreignent l'introduction d'ameublements massifs. De plus, les règles intérieures des syndics de copropriété interdisent formellement le portage intensif d'objets lourds dans les couloirs ou parties communes afin de préserver les revêtements muraux.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Plan d'implantation rigoureux</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Sondage précis de la largeur des accès, des ouvertures de fenêtres et des distances de voirie.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Matériels de protection capitonnée</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Utilisation de housses de protection haut de gamme élastiques et de couvertures d'arrimage.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Le Service Monte-Meuble de Haute Précision</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour pallier et sécuriser ces manipulations acrobatiques ou risquées, <strong>Marne Transdem</strong> intègre l'usage d'un monte-meuble moderne. En installant notre plateforme télescopique ou notre remorque de levage sous l'embrasure de votre fenêtre ou de votre balcon, nous créons un accès direct et vertical menant au camion garé en contrebas.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Recommandé pour tous les niveaux habités sans ascenseur ou pour le levage de votre piano, de l'ameublement bois délicat ou de l'électroménager (lave-linge, réfrigérateur américain), le monte-meuble accélère considérablement la journée de travail. Cette technologie prévient tout risque de fatigue corporelle, d'éraflure sur les murs de l'immeuble et garantit une quiétude maximale pour votre voisinage de copropriété.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Notre Service Monte-Meuble complet <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DÉMÉNAGEMENT PARTICULIER ET MAISON À SAINT-MAURICE */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenageurs-professionnels-saint-maurice.jpg" 
                  alt="Déménageurs professionnels Marne Transdem à Saint-Maurice" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Reconstitution de Foyer</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Des offres de choix pour le <span className="text-accent italic font-sans italic">mobilier des particuliers</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  Chaque déménagement résidentiel est à l'évidence une aventure de vie singulière qui s'accompagne d'un besoin de tranquillité et de sécurité. Que vous vous installiez dans une authentique demeure d'époque à deux pas du parc ou que vous rationalisiez votre espace dans un appartement coquet du centre de Saint-Maurice, nos équipes conçoivent une formule conforme à vos impératifs.
                </p>
                <p>
                  Nous mettons à votre service trois modes rigoureux de prise en charge contractuelle. La formule <strong>Économique</strong> convient parfaitement aux personnes souhaitant s'impliquer activement en gérant l'emballage complet de leurs cartons d'effets personnels d'avance. Notre formule <strong>Standard</strong>, de son côté, rassemble le meilleur rapport investissement-confort : nous conditionnons toute votre vaisselle en caisses alvéolées et protégeons les meubles les plus délicats. Enfin, notre formule <strong>Luxe</strong> vous soulage de toutes les actions : nos déménageurs s'occupent de trier, d'emballer vos verres à vin précieux et de replacer méthodiquement vos garde-robes.
                </p>
                <p>
                  Toutes ces étapes de déménagement intègrent l'usage d'équipements de capitonnage haute résistance à l'abrasion : cartons dédiés aux livres, valises à verres, adhésifs de scellement silencieux, boîtes penderies rigides et sangles de portage lestées pour assurer la manutention de charges très lourdes sans risques pour vos parquets de bois précieux.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Détail Particuliers
                </Link>
                <div className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm cursor-pointer">
                  Garanties Marne Transdem
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRANSFERT CORPORATE ET BUREAUX À SAINT-MAURICE */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Logistique Professionnelle</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert d'entreprises, cabinets de <span className="text-accent italic font-sans">médecins et bureaux</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Saint-Maurice n'est pas uniquement un havre résidentiel paisible ; c'est un pôle de santé publique renommé qui rassemble des cabinets libéraux de premier plan et des infrastructures administratives de grande ampleur. Pour les dirigeants d'entreprises, de PME-PMI tertiaires ou d’agences commerciales de quartier, opérer un changement de locaux professionnels dans ce département exige une logistique impeccable et chirurgicale.
                </p>
                <p>
                  La moindre interruption d’activité ou la déformation d'un mobilier informatique sensible se traduisant par un manque à gagner, Marne Transdem assure une planification coordonnée rigoureuse. Guidée par un conducteur de travaux dédié, notre équipe réalise un repérage technique complet des deux sites professionnels de départ et d'arrivée. Nous marquons de façon ordonnée vos fichiers d’archives physiques, vos ordinateurs écrans plats et vos ensembles de réunions ergonomiques.
                </p>
                <p>
                  Pour préserver l'activité de vos équipes et ne pas perturber vos obligations opérationnelles hebdomadaires, nous faisons preuve d'une agilité complète sur le calendrier. Nos déménageurs de métier interviennent de nuit ou durant vos fermetures de fin de semaine, ce qui vous offre l'assurance d'une réimplantation fonctionnelle complète sans arrêt de vos activités administratives ou financières courantes.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  En savoir plus sur nos offres Pro
                </Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Service Stockage & Garde-Meubles
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprises-saint-maurice.jpg" 
                  alt="Déménagement de parcs informatiques et bureaux professionnels à Saint-Maurice" 
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">La Rigueur de l'Artisan</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Vos avantages avec notre <span className="text-accent underline decoration-accent/20">agence de déménagement</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Marne Transdem est membre certifié et s'engage à vous fournir des chiffrages précis, transparents et un accompagnement attentionné de bout en bout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Chariots et véhicules capitonnés</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Notre parc de camions de déménagement étanches s'associe à de multiples outillages de chargement (diables pneumatiques, monte-charges d'escalier, plateaux lourds).
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Matériel spécial et cartons</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Nous deponsons à votre porte, dès signature, l'intégralité des cartons (penderies à vêtements, boîtes à vaisselle fragile, papiers d'emballage bull-pack).
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Sécurités et Garanties RC</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Tout projet fait l'objet d'une couverture d'assurance contractuelle garantissant la valeur déclarée de l'intégralité de vos meubles contre l'avarie fortuite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREPARATION MECANIQUE DU VOLUME */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation du Volume</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Préparez le volume réel en <br/><span className="text-accent italic font-sans italic">mètres cubes (m³) de vos biens</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Pour que vos déménageurs professionnels à Saint-Maurice puissent travailler de manière efficace le jour de l’intervention, la détermination exacte de la volumétrie en m³ de votre appartement ou maison est une étape clé.
                </p>
                <p>
                  Afin de faciliter cette démarche primordiale, notre calculateur en ligne interactif estime en quelques clics le cubage virtuel global de votre déménagement. Listez vos fauteuils, canapés d'angle, tables basses, penderies d'armoires et literies, et obtenez une valeur fiable indispensable pour établir un devis conforme.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Calculer le cubage gratuitement
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Le calendrier pratique du déménagement</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-45 : Évaluation et Devis Gratuit</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Sondage technique, définition de la formule, estimation de la place nécessaire.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Livraison à domicile de votre matériel</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt soigné des cartons réutilisables, du papier-bulle d'emballage et des films extensibles.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Déclaration de Stationnement local</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Réservation d'emplacement auprès des services techniques de la mairie sous quinzaine.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Le Jour J : Emménagement Séparé</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Conditionnement protecteur, manutention, transport routier, livraison soignée.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* 8. MAILLAGE DES SECTEURS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Le Réseau du Val-de-Marne</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs couverts en Île-de-France <span className="text-accent italic font-sans">autour de Saint-Maurice</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous couvrons l'ensemble des communes du Val-de-Marne pour vous garantir des équipes d'emballage disponibles rapidement.
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

      {/* 9. PREMIUM CALL TO ACTION */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous planifiez un déménagement à Saint-Maurice ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez du savoir-faire artisanal de l'équipe Marne Transdem pour un déménagement soigné, adapté à votre volume mobilier et aux particularités de votre nouvelle adresse.
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

      {/* 10. FOIRE AUX QUESTIONS LOCALES (FAQ) */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Vos interrogations fréquentes</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic font-sans">Saint-Maurice</span></h2>
            <p className="text-slate-500 font-light text-sm">Toutes nos réponses détaillées sur l'organisation de votre emménagement à Saint-Maurice.</p>
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

      {/* 11. EXTRA INTERLINKS MAP OR ANCHOR */}
      <section className="py-12 bg-slate-900 font-sans text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 pb-8 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis Express</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur Cube</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules</Link>
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
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-all">Maisons-Alfort</Link>
            <Link to="/demenagement-ivry-sur-seine" className="hover:text-accent transition-all">Ivry-sur-Seine</Link>
            <Link to="/demenagement-fontenay-sous-bois" className="hover:text-accent transition-all">Fontenay-sous-Bois</Link>
            <Link to="/demenagement-villejuif" className="hover:text-accent transition-all">Villejuif</Link>
            <Link to="/demenagement-alfortville" className="hover:text-accent transition-all">Alfortville</Link>
            <Link to="/demenagement-joinville-le-pont" className="hover:text-accent transition-all">Joinville-le-Pont</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalSaintMaurice;
