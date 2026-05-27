import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalKremlinBicetre: React.FC = () => {
  const path = "/demenagement-le-kremlin-bicetre";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement au Kremlin-Bicêtre à proximité de l'Hôpital Bicêtre ?", 
      a: "Déménager aux abords de l'Hôpital de Bicêtre (CHÉ Paris-Saclay) requiert une logistique sans faille. En effet, la présence continue d'ambulances, d'usagers, de bus et de personnels de santé sur l'avenue de Fontainebleau et l'avenue du Général Leclerc impose des contraintes de voirie strictes. Nos équipes de Marne Transdem mettent en place un balisage réglementaire soigné pour éviter tout encombrement des voies réservées aux urgences. Nous privilégions l'utilisation d'un monte-meuble extérieur et d'équipements de manutention silencieux pour respecter le calme du secteur hospitalier." 
    },
    { 
      q: "Quelles sont les formalités de stationnement à réaliser auprès de la Mairie du Kremlin-Bicêtre ?", 
      a: "Pour garer un véhicule de déménagement au Kremlin-Bicêtre (94270), l'obtention d'une autorisation d'occupation temporaire du domaine public est requise. La demande doit être déposée auprès des services de police municipale et de voirie de la ville au moins 15 jours ouvrés à l'avance. Dans le cadre de nos offres clés en main, Marne Transdem se charge de toutes les étapes de réservation de stationnement et de pose des panneaux de signalisation requis 48 heures avant le début des opérations." 
    },
    { 
      q: "Proposez-vous des formules adaptées pour le transfert de cabinets médicaux ou professionnels au Kremlin-Bicêtre ?", 
      a: "Absolument. Grâce à notre proximité directe avec le pôle médical de Bicêtre, nous avons développé une expertise solide dans le transfert de cabinets médicaux, de professions libérales et de bureaux administratifs. Nous gérons l'emballage sécurisé du matériel de santé délicat, la manutention d'équipements lourds ou d'examens (tables de consultation, autoclaves) et le transfert confidentiel d'archives patientèles. Ces opérations peuvent être planifiées en horaires décalés (soir ou week-end) pour ne pas perturber la réception de vos patients." 
    },
    { 
      q: "Quels sont les avantages de la proximité du Kremlin-Bicêtre avec Paris 13e pour mon déménagement ?", 
      a: "La situation géographique du Kremlin-Bicêtre, accolée au 13ème arrondissement de Paris (Porte d'Italie/Porte de Choisy), permet d'optimiser considérablement les coûts de transport pour les déménagements de et vers la capitale. Nos liaisons de transit rapides via le Boulevard Périphérique facilitent des rotations fluides le jour de votre emménagement. Nos chauffeurs professionnels connaissent parfaitement ce maillage géographique afin d'éviter les embouteillages des heures de pointe." 
    },
    { 
      q: "Comment puis-je estimer gratuitement le volume de mes biens pour ce déménagement ?", 
      a: "Marne Transdem met à votre entière disposition un outil calculateur de volume en ligne interactif. Simple et ergonomique, il vous permet d'évaluer fidèlement le cubage en m³ de votre appartement, pavillon ou bureau au Kremlin-Bicêtre. Pour une totale tranquillité d'esprit, nous organisons également une visite de contrôle (à domicile ou en visio-diagnostic) pour vous proposer sous 24h un devis ferme et définitif." 
    }
  ];

  const nearbySectors = [
    { n: "Paris 13e", l: "/demenagement-paris-13" },
    { n: "Paris 14e", l: "/demenagement-paris-14" },
    { n: "Ivry-sur-Seine", l: "/demenagement-ivry-sur-seine" },
    { n: "Villejuif", l: "/demenagement-villejuif" },
    { n: "Gentilly", l: null },
    { n: "Arcueil", l: null },
    { n: "Vitry-sur-Seine", l: "/demenagement-vitry-sur-seine" },
    { n: "Alfortville", l: "/demenagement-alfortville" },
    { n: "Maisons-Alfort", l: "/demenagement-maisons-alfort" },
    { n: "Montrouge", l: "/demenagement-montrouge" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Le Kremlin-Bicêtre | Logistique Proche Paris 13e et Hôpital | Marne Transdem"
        description="Besoin d'un déménageur de confiance au Kremlin-Bicêtre (94270) ? Marne Transdem organise votre déménagement résidentiel ou de bureaux proche de l'hôpital et Paris 13e. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Le Kremlin-Bicêtre", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Spécialiste Logistique - Val-de-Marne (94)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Le Kremlin-Bicêtre</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem orchestre vos transitions de vie et déménagements professionnels au Kremlin-Bicêtre. Grâce à notre expertise pointue, nous relevons les spécificités logistiques du secteur, que ce soit à proximité immédiate de l’hôpital Bicêtre ou à la lisière de Paris 13e.
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

      {/* 2. LOGISTIQUE DE PROXIMITÉ ET PRÉSENTATION DU KREMLIN-BICÊTRE */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L’Expertise Aux Marches de la Capitale</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Déménager au Kremlin-Bicêtre <span className="text-accent italic">sans stress</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  Idéalement nichée aux portes de Paris, la commune du <strong>Kremlin-Bicêtre</strong> (94270) bénéficie d’un dynamisme exceptionnel et d'une connexion de premier plan avec le 13ème arrondissement de la capitale. Traversée par de grands axes comme l'avenue de Fontainebleau, elle est le berceau d'un ensemble de quartiers de caractère particulièrement vivants et d'institutions majeures, à l'image du célèbre <strong>Centre Hospitalier Universitaire de Bicêtre</strong> ou de la faculté de médecine Paris-Saclay.
                </p>
                <p>
                  Toutefois, réaliser un déménagement dans ce secteur exige une préparation logistique stricte. Le flux de circulation constant vers Paris, la proximité du tramway T3a, les stations de la ligne 7 et de la nouvelle ligne 14, ainsi que le passage incessant de véhicules prioritaires à proximité de l'hôpital réclament une vigilance extrême. Entre les collectifs denses de la ZAC de l'Entrée de Ville et les ruelles pavillonnaires escarpées d’arrière-coteaux, l'accessibilité requiert un savoir-faire professionnel.
                </p>
                <p>
                  Depuis de nombreuses années, <strong>Marne Transdem</strong> étudie et apprivoise ces contraintes urbaines. Nous concevons des plans d'action sur-mesure pour que votre installation et vos transferts (résidentiels ou d'entreprises) se déroulent dans une sérénité totale, en réduisant au minimum les ralentissements de parcours et en garantissant la préservation de vos biens.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-94-val-de-marne.jpg" 
                  alt="Déménagement professionnel au Kremlin-Bicêtre, proche de l’hôpital de Bicêtre" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGISTIQUE HÔPITAL ET PARIS 13E */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Défis Urbains Résolus</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Déménagement proche de Paris 13e <span className="text-accent underline decoration-accent/20">et du complexe hospitalier</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              La proximité directe des infrastructures hospitalières et routières du Kremlin-Bicêtre dicte des standards d'organisation bien plus hauts que la moyenne.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Coexistence hospitalière et voies d’urgence</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Stationner un véhicule de déménagement près de l'Hôpital de Bicêtre requiert une coordination parfaite avec les services de voirie de la ville. Les passages réservés aux transports sanitaires ne doivent sous aucun prétexte être obstrués et le volume sonore doit être drastiquement contenu. Nos compagnons déménageurs sont spécialement sensibilisés à ces enjeux et veillent au plus grand respect de la tranquillité publique.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                De plus, de l’autre côté des Portes d’Italie et de Choisy, le 13ème arrondissement parisien présente d'importants défis d'embouteillage, de stationnement payant et d'étroitesse de halls d'immeubles. Nous élaborons des liaisons directes via le Boulevard Périphérique et étudions en amont la configuration des deux adresses pour fluidifier le trajet logistique globale.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Planification Acoustique & Discrétion</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Utilisation de bacs de manutention de dernière génération et de rolls équipés de roues souples en gomme insonorisante.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Liaisons Métropolitaines Optimisées</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Départs planifiés aux heures idéales pour éviter le trafic dense de la Porte d'Italie et de l'A6b.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Solutions Hauteur : Monte-Meubles Grand Déploiement</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour surmonter les problématiques d'ascenseurs inaccessibles ou trop limités au sein des grands immeubles collectifs de l'avenue de Fontainebleau ou de la rue Roger Salengro, Marne Transdem installe des monte-meubles d'extérieur performants (capacité jusqu'à 300 kg, montée jusqu'au 11e étage).
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                En extrayant ou réintroduisant directement vos canapés, pianos ou mobiliers volumineux par les fenêtres et balcons, nous préservons intégralement les cages d'escalier, évitons les frottements sur les murs de copropriété et réduisons la fatigue ainsi que le temps d’immobilisation de voirie par deux.
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

      {/* 4. CHALET RÉSIDENTIEL */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/equipe-demenageur-94.jpg" 
                  alt="Déménageurs qualifiés emballant et chargeant du mobilier au Kremlin-Bicêtre" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Au Service des Habitants du 94</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Déménagement particulier <span className="text-accent italic">au Kremlin-Bicêtre</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  S'installer dans une nouvelle demeure au Kremlin-Bicêtre, que ce soit dans un appartement moderne et spacieux à proximité immédiate du métro ou dans un pavillon calme des coteaux, symbolise un nouveau départ de vie. Afin de surmonter le stress physique et l’épuisement inhérents à ces transferts complexes, l’équipe d’artisans passionnés de Marne Transdem conçoit des prestations impeccables.
                </p>
                <p>
                  Nous mettons à votre service des fournitures professionnelles d'emballage hautement protectrices : cartons d’archives renforcés, bacs en plastique scellables, penderies pour vêtements fragiles, valises alvéolées pour vaisselle délicate et housses à forte épaisseur pour protéger vos matelas et mobiliers laqués des frottements et de la météo.
                </p>
                <p>
                  Selon vos aspirations et votre budget, nous modulons notre accompagnement de déménagement en trois niveaux d’excellence : la formule <strong>Économique</strong>, centrée sur la manutention lourde et le transport par route routier ; la formule <strong>Standard</strong>, l'alliée privilégiée des foyers avec l'emballage sécurisé de vos objets délicats par nos soins ; et la formule <strong>Luxe</strong>, l'excellence clé en main où nous emballons et déballons l'intégralité de vos pièces.
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

      {/* 5. LOCAUX PROFESSIONNELS, MÉDICAUX OU ENTREPRISES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Secteur Médical, Libéral & Tertiaire</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert d'entreprises et <span className="text-accent italic">cabinets médicaux</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Le Kremlin-Bicêtre est renommé pour son importance dans les secteurs des technologies médicales, de la recherche scientifique et de l'enseignement académique de la santé. Un transfert professionnel dans cette aire requiert une expertise logistique radicalement différente de celle requise en milieu résidentiel.
                </p>
                <p>
                  Qu'il s'agisse de déplacer des bureaux de direction, un laboratoire d'études, un cabinet médical spécialisé ou des locaux administratifs à proximité du boulevard Périphérique, Marne Transdem affecte un chef de projet dédié pour concevoir une planification rigoureuse d'étiquetage et de synchronisation pour assurer une reprise immédiate de vos activités.
                </p>
                <p>
                  Nos déménageurs de confiance garantissent le traitement confidentiel de vos archives et dossiers, l’emballage sous sachet antistatique de votre matériel informatique indispensable et le déplacement précautionneux des instruments d’examens délicats. Afin de garantir l’excellence de votre productivité, nous programmons les interventions lors des horaires de fermeture, de nuit, comme en week-ends.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 hover:scale-105 transition-all outline-none italic text-sm">
                  Déménagement Professionnel
                </Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Garde-meuble Sûr
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Déménagement de bureaux et matériel médical au Kremlin-Bicêtre" 
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">L'Engagement Qualité</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi choisir Marne Transdem <span className="text-accent underline decoration-accent/20">au Kremlin-Bicêtre ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous mettons l'exigence réglementaire, le soin d'emballage et le respect du calendrier au cœur de nos engagements de performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Réglementation municipale</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Notre cellule administrative effectue l'intégralité des formalités et demandes d'arrêtés municipaux de déménagement auprès de la Mairie du Kremlin-Bicêtre.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Maîtrise du bruit & Discrétion</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nous adaptons nos horaires de passage et nos techniques de roulage pour préserver le silence dû aux établissements de soins et aux résidents proches.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Garantie & Contrats clairs</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nos prestations s'accompagnent systématiquement d'une assurance contractuelle détaillée pour prémunir votre patrimoine de tout imprévu logistique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALCULATEUR EN LIGNE ET PLANNING */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation Précise</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Simulez le cubage exact de <br/><span className="text-accent italic font-sans italic">votre projet en m³</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Afin de configurer au plus juste nos ressources matérielles (capacité du camion logistique, volume nécessaire de fournitures de protection et cartons d’emballages), l’estimation rigoureuse de votre volume mobilier est cruciale.
                </p>
                <p>
                  Pour y faire face sans contraintes, Marne Transdem déploie un outil interactif intuitif et réactif d’évaluation de volume en mètres cubes directement accessible sur notre plateforme. Indiquez la liste de vos meubles pièce par pièce pour obtenir une estimation complète.
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
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Le Cheminement Méthodique du Déménagement</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Visite technique & Estimations</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Évaluation du cubage, contrôle des accès aux escaliers / ascenseur et choix des outils.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Réception de fournitures</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Mise à disposition ou livraison à domicile de vos cartons de déménagement et éléments protecteurs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Autorisations du Kremlin-Bicêtre</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt du dossier de réservation d'emplacement de voirie 15 jours à l'avance auprès des forces locales.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Le Jour J : Exécution</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Arrivée des compagnons, emballage minutieux, arrimage délicat dans le véhicule et acheminement routier.</p>
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">Maillage Régional 94</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Villes et Secteurs à proximité <span className="text-accent italic font-sans italic">du Kremlin-Bicêtre</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous opérons quotidiennement à l'orée parisienne et sur l'ensemble du département du Val-de-Marne avec des camions parfaitement équipés.
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
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous planifiez un déménagement au Kremlin-Bicêtre ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez du savoir-faire logistique de Marne Transdem pour organiser votre déplacement en toute sérénité, sécurisé par une gestion réglementaire de l'occupation temporaire du domaine public.
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
            <span className="text-xs font-black uppercase tracking-widest text-accent">L'Information Pratique</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Réponses <span className="text-accent italic">Kremlin-Bicêtre</span></h2>
            <p className="text-slate-500 font-light text-sm">Découvrez nos solutions adaptées aux contraintes géographiques du Val-de-Marne.</p>
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
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all text-white underline decoration-accent/30 underline-offset-4">Val-de-Marne (94)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 pt-8">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all">Paris</Link>
            <Link to="/demenagement-paris-13" className="hover:text-accent transition-all">Paris 13</Link>
            <Link to="/demenagement-paris-14" className="hover:text-accent transition-all">Paris 14</Link>
            <Link to="/demenagement-ivry-sur-seine" className="hover:text-accent transition-all">Ivry-sur-Seine</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all">Saint-Maur-des-Fossés</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all">Créteil</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all">Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-all">Nogent-sur-Marne</Link>
            <Link to="/demenagement-fontenay-sous-bois" className="hover:text-accent transition-all">Fontenay-sous-Bois</Link>
            <Link to="/demenagement-villejuif" className="hover:text-accent transition-all">Villejuif</Link>
            <Link to="/demenagement-vitry-sur-seine" className="hover:text-accent transition-all">Vitry-sur-Seine</Link>
            <Link to="/demenagement-alfortville" className="hover:text-accent transition-all">Alfortville</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalKremlinBicetre;
