import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalIvrySurSeine: React.FC = () => {
  const path = "/demenagement-ivry-sur-seine";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Ivry-sur-Seine avec des accès piétonniers complexes ?", 
      a: "À Ivry-sur-Seine, de nombreuses résidences modernes et d'anciens ensembles industriels réhabilités (comme la Manufacture des Oeillets ou les lofts d'Ivry-Port) disposent de cours intérieures pavées, de zones piétonnières ou de halls d'entrée en retrait de la rue principale. Marne Transdem prévoit dans ces situations un équipement de roulage adapté (plateaux à roulettes, chariots, diables pneumatiques) et un renfort de personnel professionnel pour supporter les distances de portage importantes. Nous déterminons également si l'installation d'un monte-meuble extérieur est requise pour assurer la fluidité de la manutention." 
    },
    { 
      q: "Quelles sont les obligations de stationnement pour déménager à Ivry-sur-Seine ?", 
      a: "Pour réserver une place de stationnement pour un camion de déménagement à Ivry-sur-Seine (94200), il convient d'effectuer une demande d'arrêté temporaire d'occupation du domaine public auprès de la mairie d'Ivry-sur-Seine. Cette demande officielle doit être déposée et enregistrée au minimum 15 jours francs avant la date prévue pour votre déménagement. Elle permet de s'assurer que notre équipe logistique dispose de l'emplacement le plus proche possible du hall d'accès pour optimiser le temps et la sécurité." 
    },
    { 
      q: "Comment se déroule un transfert de bureaux ou de locaux professionnels à Ivry-sur-Seine ?", 
      a: "Devenu un pôle tertiaire et de recherche majeur à la lisière du 13ème arrondissement de Paris, Ivry-sur-Seine héberge de nombreuses startups, PME et grandes institutions. Nos transferts d'entreprises comprennent un audit d'agencement préalable, un inventaire chiffré des postes informatiques complexes, le transfert sécurisé des archives physiques avec boîtiérs numérotés, et le démontage/remontage du mobilier ergonomique. Nous intervenons en horaires spéciaux pour garantir une reprise d'activité immédiate à vos collaborateurs." 
    },
    { 
      q: "Quel est le prix moyen d'une prestation de déménagement à Ivry-sur-Seine ?", 
      a: "Le tarif d'une prestation de déménagement sur-mesure dépend de plusieurs variables factuelles : le volume des biens calculé précisément en mètres cubes (m³), l'accessibilité physique des adresses de départ et de destination (étages à franchir, cages d'escalier étroites, présence d'un ascenseur ou nécessité d'un monte-meuble), et la formule choisie (formules Économique, Standard ou Luxe). Marne Transdem propose des devis transparents et détaillés sans engagement, calculés au prix le plus juste." 
    },
    { 
      q: "Quelles options de garde-meubles proposez-vous pour les résidents d'Ivry-sur-Seine ?", 
      a: "Si vous faites face à un décalage de dates entre la sortie d'un logement et l'entrée dans le nouveau, ou si vous manquez d'espace, nous mettons à votre disposition notre service de garde-meubles hautement sécurisé à proximité. Vos biens et votre mobilier sont stockés dans des conteneurs individuels scellés en bois de haute qualité, entreposés dans un hangar ventilé, sous surveillance électronique permanente (caméras 24/7, alarmes)." 
    },
    { 
      q: "Comment sécurisez-vous les objets d'art et la vaisselle fragile le jour J ?", 
      a: "Pour toute notre verrerie et objets d'art, nous employons du matériel d'emballage professionnel ultra-performant. Nos déménageurs disposent de coffres capitonnés spécifiques pour la vaisselle, de cartons alvéolés pour les verres délicats, de housses de protection multicouches pour le mobilier d'époque et de papier bulle haute résistance. De plus, notre assurance incluse garantit une protection financière de la valeur de chacun de vos objets précieux." 
    }
  ];

  const nearbySectors = [
    { n: "Paris 13e", l: "/demenagement-paris-13" },
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Maisons-Alfort", l: "/demenagement-maisons-alfort" },
    { n: "Saint-Maurice", l: "/demenagement-saint-maurice" },
    { n: "Vitry-sur-Seine", l: "/demenagement-vitry-sur-seine" },
    { n: "Alfortville", l: "/demenagement-alfortville" },
    { n: "Villejuif", l: "/demenagement-villejuif" },
    { n: "Le Kremlin-Bicêtre", l: "/demenagement-le-kremlin-bicetre" },
    { n: "Choisy-le-Roi", l: null }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Ivry-sur-Seine | Résidences & Transerts | Marne Transdem"
        description="Besoin d'un déménageur professionnel à Ivry-sur-Seine ? Spécialiste du Val-de-Marne (94), Marne Transdem gère le déménagement de particuliers et de bureaux. Devis gratuit & sans engagement."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Ivry-sur-Seine", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménageur de Prestige - Val-de-Marne IP (94)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Ivry-sur-Seine</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Particuliers et professionnels, déléguez l’intégralité de vos projets de transfert et déménagement à Ivry-sur-Seine. Marne Transdem conjugue force humaine, rigueur organisationnelle et outils de levage de dernière génération pour vous offrir un déménagement d'exception, d’un bord de Seine à l’autre.
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

      {/* 2. MAIN SEO TEXT CONTENT - MINIMUM 1200 WORDS */}
      {/* Introduction locale & Spécificités d'Ivry-sur-Seine */}
      <section className="py-24 font-sans animate-fade-in">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Ancrage Territorial du 94</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Un accompagnement d'exception <span className="text-accent italic">à Ivry-sur-Seine</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Aux portes immédiates de la capitale, la ville d'<strong>Ivry-sur-Seine</strong> (94200) présente une physionomie urbaine unique résultant d'un passé industriel florissant et d'une modernisation ambitieuse. Ceinturée par le périphérique parisien, la Seine d'un côté et les collines du Val-de-Marne de l'autre, elle offre un contraste captivant entre des faubourgs résidentiels calmes, des quartiers historiques pleins de charme et des zones d'affaires avant-gardistes. De la place Gambetta aux rives réaménagées d'<strong>Ivry-Port</strong>, la commune vit à un rythme dynamique inédit.
                </p>
                <p>
                  Pourtant, cette double identité complexe (architecture ouvrière traditionnelle, usines reconverties en magnifiques ateliers d'artistes d'une part, et grands programmes immobiliers verticaux d'autre part) complique considérablement les opérations logistiques. Déménager d'une ancienne imprimerie transformée en loft sur le quartier du <strong>Petit-Ivry</strong> ou s'installer dans une résidence contemporaine le long des berges exige une fine maîtrise des réalités géographiques, des réglementations locales d'urbanisme de voirie et des techniques de manutention modernes.
                </p>
                <p>
                  Les experts de <strong>Marne Transdem</strong>, forts de plusieurs décennies de présence et de chantiers réussis dans tout le <Link to="/demenagement-val-de-marne" className="font-bold text-brand-900 hover:text-accent underline transition-all">Val-de-Marne (94)</Link>, développent des plans de déménagement sur-mesure pour s'ajuster à chaque typologie immobilière. Nous croyons qu'un déménagement réussi à Ivry-sur-Seine repose sur l'alliance rigoureuse d’une planification minutieuse en amont, d'équipes formées aux charges lourdes, et de matériels adaptés.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-94-val-de-marne.jpg" 
                  alt="Déménagement d'appartement à Ivry-sur-Seine" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRANSITION & LOGISTIQUE EN HAUTEUR ET ACCES COMPLEXES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Sélection des Solutions de Levage</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Vaincre le défi des <span className="text-accent underline decoration-accent/20">escaliers étroits et des longs couloirs</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              La géographie urbaine d’Ivry-sur-Seine présente des contraintes particulières d'accessibilité qu'il convient de contourner avec professionnalisme et agilité.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Les spécificités des immeubles d'Ivry-sur-Seine</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Les différentes époques de construction se mélangent harmonieusement à Ivry. Aux briques rouges ouvrières succèdent de grands complexes d’habitation des années 1970 avec des halls larges mais des ascenseurs calibrés pour seulement 3 ou 4 personnes. De plus, les quartiers neufs en bordure du boulevard Lénine ou de l’avenue de Verdun regroupent des édifices aux critères énergétiques élevés mais dont les règles intérieures de copropriété interdisent l’usage des monte-charges collectifs pour le transport de meubles individuels volumineux.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour d'autres lofts et bâtiments industriels rénovés près de la gare d'Ivry, l'entrée donne parfois sur des impasses de faible largeur, des cours communes à verrière ou d’anciennes voies ferrées industrielles, rendant l'approche du camion du déménagement particulièrement difficile, imposant de longues distances de portage à pied pour nos techniciens professionnels.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Équipes de Portage Agile</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Personnel renforcé muni de sangles de levage professionnelles pour objets lourds (frigo américain, piano).</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Réservation d'emplacement de voirie</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Gestion complète des formalités auprès de la mairie d'Ivry-sur-Seine sous quinzaine.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Le Service Monte-Meuble Extérieur</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Lorsque la cage d’escalier s’avère infranchissable ou que les distances internes de l'immeuble rallongent inutilement la journée, l'utilisation d'une plateforme élévatrice ou d'un monte-meuble tracté constitue une réponse technique et économique incontournable. Positionné de façon sécurisée sous la fenêtre ou le balcon, le monte-meuble monte et descend vos affaires les plus volumineuses en quelques fractions de secondes.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Notre équipement est manœuvré exclusivement par un technicien hautement qualifié qui veille à la répartition du poids, supervise les fixations de sécurité et s'assure du strict respect des consignes contre le vent et les lignes électriques environnantes. Cela préserve également la tranquillité des voisins d'immeuble en protégeant les murs de la copropriété de tout impact mécanique fortuit.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Voir nos solutions Monte-Meuble <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHANTIER RESIDENTIEL - PARTICULIERS */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/equipe-demenageur-94.jpg" 
                  alt="Déménageurs professionnels à Ivry-sur-Seine en plein portage" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Réponses Résidentielles Clés en Main</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Un déménagement de particuliers <span className="text-accent italic font-sans italic">en toute quiétude</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Pour un particulier, un foyer recèle une infinité de souvenirs matériels et d'objets sentimentaux précieux. Que vous quittiez une demeure unifamiliale à l'orée d'Alfortville ou preniez possession d'un sublime appartement moderne disposant d'un toit-terrasse dans le quartier d'Ivry Confluences, <strong>Marne Transdem</strong> prend la mesure de la confiance que vous lui portez.
                </p>
                <p>
                  Afin de satisfaire chaque besoin spécifique, nous commercialisons trois formules d’interventions modulaires dont la souplesse d'exercice s'adapte à de multiples budgets. Du simple chargement sécurisé avec acheminement routier au service de luxe d'emballage total avec démontage et réinstallation intégrale des penderies et armoires de cuisine, vous choisissez le périmètre d'action de nos hommes sur le terrain.
                </p>
                <p>
                  Nous prenons le plus grand soin de votre patrimoine grâce à des protections modernes adaptées : de solides caisses de transport dotées de cloisons amortissantes pour emballer la porcelaine précieuse et le cristal, des housses hydrofuges étanches destinées au mobilier de jardin et aux canapés fragiles, ainsi qu’un large catalogue de fournitures pour l'emballage à votre disposition en amont (cartons à livres, adhésifs écologiques, rouleaux de film étirable).
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Détail Déménagement Particulier
                </Link>
                <Link to="/calculateur-volume" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Calculer mon volume (m³)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE - TRANSFERT DE BUREAUX À IVRY */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Solutions Administratives & Tertiaires</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert de bureaux et <span className="text-accent italic font-sans">implantation d'entreprises</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Au cœur de la restructuration du Sud-Est de la métropole, Ivry-sur-Seine séduit massivement les créateurs d’entreprises, les centres de R&D technologiques et les institutions cherchant de grands espaces fonctionnels à coût maîtrisé en limite de Paris 13e. Cette vitalité commerciale engendre un turnover permanent d’entreprises dont la réimplantation est un enjeu temporel et financier critique pour les managers d'exploitation.
                </p>
                <p>
                  Un déménagement d'entreprise à Ivry-sur-Seine ne supporte pas l’approximation ni le retard. Notre division <em>Enterprise Logistics</em> pilote votre transfert professionnel à l'aide d'un protocole extrêmement codifié : étude minutieuse des charges à transporter (parcs informatiques, tables de réunion, fauteuils ergonomiques, serveurs cloud locaux, armoires d'archives), création d'un plan rigoureux d’étiquetage des pièces de départ et d’arrivée, et emballage de haute technicité.
                </p>
                <p>
                  Ayant une parfaite conscience des nécessités de conservation de votre productivité commerciale, de la sécurité de vos fichiers de serveurs de données et de vos obligations face aux usagers ou clients, Marne Transdem intervient en dehors de vos plages de travail régulières. Nous orchestrons votre déménagement les nuits de semaine ou tout au long des week-ends pour que vos collaborateurs reprennent leur service le lundi matin, opérationnels et installés à leurs nouveaux postes d'activité.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Nos solutions Professionnelles
                </Link>
                <Link to="/contact" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Contacter notre Chef de Projet
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Déménagement de bureaux professionnels et de parcs d'ordinateurs à Ivry-sur-Seine" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. POURQUOI DESIGNER MARNE TRANSDEM ? */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Engagement de Confiance</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Vos atouts confiance avec <span className="text-accent underline decoration-accent/20">Marne Transdem</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              En nous confiant vos effets familiaux ou professionnels, vous optez pour la sérénité contractuelle et la transparence tarifaire d'une grande enseigne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Ressources logistiques propres</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Pas de sous-traitance opaque. Nous possédons nos propres véhicules capitonnés, nos matériels d’emballage de technologie de pointe et nos plateformes de levage.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Visites techniques offertes</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Qu’elle soit réalisée physiquement à domicile ou virtuellement par visioconférence, notre évaluation technique du cubage ne vous engage à rien et est totalement gratuite.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Garanties financières étendues</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Toutes nos actions de déménagement sont couvertes par notre assurance contractuelle complète garantissant vos objets de valeur et votre immobilier contre l'aléa matériel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALCULATEUR EN LIGNE INTUITIF */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Calculateur Expert</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Calculez avec exactitude le <br/><span className="text-accent italic font-sans italic">volume en m³ de votre mobilier</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Pour que nous puissions affréter le véhicule idéal (camion de 20m³ pour un appartement, remorque poids lourds pour une grande maison), la détermination du cubage global est indispensable.
                </p>
                <p>
                  Afin d'éviter tout stress ou les désaccords tarifaires de dernière minute le jour J, utilisez notre calculateur de volume en ligne. Intuitif et rapide, il liste vos meubles par catégories (lits, tables, armoires, chaises, appareils électroménagers) et vous extrait instantanément le volume virtuel final à renseigner dans votre formulaire de cotation.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Utiliser l'outil de calcul gratuit
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">L'agenda de votre déménagement réussi</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-60 : Devis et Visioconférence</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Visite technique offerte, estimation précise et validation de la formule de choix.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Livraison à domicile du matériel</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt gratuit des cartons, adhésifs, penderies et papier-bulle à votre porte.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Affichage de l'autorisation de stationnement</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Pose des panonceaux légaux réglementant les zones réservées devant la mairie.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Le Jour J : Exécution technique et Transport</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Manutention prudente, protection capitonnée en camion, déchargement et pose soignée.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* 8. MAILLAGE SECTEURS ET BREADCRUMBS AUTOUR D'IVRY */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Le Maillage de Proximité</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis en Île-de-France <span className="text-accent italic font-sans">autour d'Ivry-sur-Seine</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous intervenons régulièrement dans toute l'agglomération pour vous garantir un déménageur de confiance à l'écoute de vos consignes de sécurité.
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

      {/* 9. MAIN CALL-TO-ACTION FOR HIGH CONVERSION */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Envie de déménager à Ivry-sur-Seine l'esprit serein ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez de nos compétences d’artisans déménageurs dans le 94 pour un déménagement maîtrisé de bout en bout, de l'emballage de vos verres au transport de vos meubles lourds.
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">L'expertise à votre écoute</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic font-sans italic">Ivry-sur-Seine</span></h2>
            <p className="text-slate-500 font-light text-sm">Tout ce qu'il faut assimiler pour concrétiser sereinement votre déménagement de bureaux ou de foyer.</p>
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

      {/* 11. ANCHOR LINK FOOTER SECTION */}
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
            <Link to="/demenagement-paris-13" className="hover:text-accent transition-all">Paris 13</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-all">Charenton</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all">Saint-Maur-des-Fossés</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all">Créteil</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all">Vincennes</Link>
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-all">Maisons-Alfort</Link>
            <Link to="/demenagement-fontenay-sous-bois" className="hover:text-accent transition-all">Fontenay-sous-Bois</Link>
            <Link to="/demenagement-villejuif" className="hover:text-accent transition-all">Villejuif</Link>
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

export default LocalIvrySurSeine;
