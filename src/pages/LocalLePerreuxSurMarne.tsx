import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalLePerreuxSurMarne: React.FC = () => {
  const path = "/demenagement-le-perreux-sur-marne";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement premium de villa ou maison bourgeoise au Perreux-sur-Marne ?", 
      a: "Les villas de caractère, meulières, et grandes propriétés du Perreux-sur-Marne (le long des quais d'Artois, de Champagne, ou des boulevards résidentiels) abritent souvent du mobilier de grande valeur, des œuvres d'art, et de la verrerie précieuse. Marne Transdem met en œuvre un protocole d'exception : emballage de vos effets fragiles sous valises antichocs, protection renforcée des boiseries et lustres, utilisation de housses matelassées sur-mesure pour mobiliers d'art, et chargement ordonné dans des véhicules capitonnés. Chaque manutention est effectuée par des compagnons certifiés sous la supervision d'un chef d'équipe dédié." 
    },
    { 
      q: "Quelle est la procédure administrative de stationnement à la Mairie du Perreux-sur-Marne (94170) ?", 
      a: "Pour réserver l'espace de stationnement nécessaire au camion de déménagement et éventuellement au monte-meubles, il est obligatoire d'obtenir un arrêté municipal d'occupation temporaire du domaine public (AOT). La demande doit être déposée auprès de la Mairie du Perreux au minimum 15 jours francs avant la date de l'opération. Pour vous garantir un confort absolu, nos équipes gèrent la totalité de cette démarche administrative publique et installent les panneaux d'interdiction de stationnement réglementaires 48h à l'avance." 
    },
    { 
      q: "Proposez-vous une formule clé en main d'emballage et déballage intégral pour les familles ?", 
      a: "Tout à fait. Notre formule Prestige (Luxe) est particulièrement plébiscitée par les familles habitant Le Perreux-sur-Marne. Dans ce cadre, vous n'avez absolument rien à préparer : nos déménageurs professionnels s'occupent d'emballer l'intégralité de vos objets (vêtements sur cintres en penderies verticales, livres, jouets, vaisselle fine mise sous valises de protection) et effectuent à destination le déballage complet ainsi que la mise en place méticuleuse de vos affaires dans vos nouveaux rangements." 
    },
    { 
      q: "Quel est le matériel utilisé pour manutentionner des meubles volumineux ou lourds ?", 
      a: "Nous disposons d'équipements logistiques de pointe : chariots élévateurs de forte capacité, monte-meubles d'extérieur à nacelle télescopique (idéals pour passer canapés, tables massives ou pianos par fenêtres ou balcons), et l'indispensable outillage de démontage et remontage de mobilier. Vos pièces fragiles et oeuvres d'art sont emballées sous bull-pack kraft multicouche haut de gamme." 
    },
    { 
      q: "Comment planifier une visite technique d'estimation gratuite de mes volumes mobiliers ?", 
      a: "Il vous suffit de nous contacter par téléphone ou de compléter notre formulaire web. Un conseiller technique de Marne Transdem organisera à votre convenance une visite physique à votre domicile au Perreux-sur-Marne (ou une visio-conférence) pour examiner les spécificités d'accès, évaluer le cubage réel avec précision, et vous adresser un devis commercial ferme et contractuel sous 24 heures." 
    }
  ];

  const nearbySectors = [
    { n: "Nogent-sur-Marne", l: "/demenagement-nogent-sur-marne" },
    { n: "Bry-sur-Marne", l: null },
    { n: "Neuilly-sur-Marne", l: null },
    { n: "Fontenay-sous-Bois", l: "/demenagement-fontenay-sous-bois" },
    { n: "Joinville-le-Pont", l: "/demenagement-joinville-le-pont" },
    { n: "Champigny-sur-Marne", l: "/demenagement-champigny-sur-marne" },
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur-des-fosses" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Saint-Mandé", l: "/demenagement-saint-mande" },
    { n: "Paris 12e", l: "/demenagement-paris-12" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Le Perreux-sur-Marne | Logements Familiaux & Villas | Marne Transdem"
        description="Besoin d'un déménageur de confiance au Perreux-sur-Marne (94170) ? Marne Transdem réalise vos déménagements premium de villas, pavillons et appartements familiaux. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Le Perreux-sur-Marne", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Déménagement Premium - Villas et Logements Familiaux</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Le Perreux-sur-Marne</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem orchestre vos projets de déménagement premium d'appartements familiaux et belles villas au Perreux-sur-Marne. Bénéficiez d'un savoir-faire artisanal de haute technicité, adapté au charme singulier et aux contraintes géographiques des « Perles de la Marne ».
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

      {/* 2. LE CADRE RESIDENTIEL ET EXIGENT DU PERREUX */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L'Art de Vivre en Bords de Marne</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Un déménagement d'exception <span className="text-accent italic">pour votre patrimoine</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  Surnommée avec élégance la « Perle de la Marne », la charmante commune d'art du <strong>Perreux-sur-Marne</strong> (94170) captive par la douceur paisible de ses avenues verdoyantes et sa majestueuse façade fluviale. Bordée par Nogent-sur-Marne et Bry-sur-Marne, cette ville d’Île-de-France abrite un patrimoine architectural d’exception constitué d'élégantes villas en briques meulières datant du début du XXe siècle, de remarquables maisons bourgeoises, ainsi que de copropriétés résidentielles modernes et arborées.
                </p>
                <p>
                  Conduire un déménagement dans ces décors raffinés exige un professionnalisme chirurgical. L’organisation logistique au sein de ces propriétés de prestige réclame non seulement des précautions physiques de pointe pour les sols précieux (parquets anciens, pierres naturelles) et d’élégants halls d'immeubles, mais également une maîtrise délicate des problématiques d'orientation routière : avenues fleuries parfois exiguës, limitation de tonnage le long des berges, et zones de stationnement denses proches des commerces de l'avenue Ledru-Rollin.
                </p>
                <p>
                  Pour répondre à ce haut niveau d'exigence, <strong>Marne Transdem</strong> conçoit des protocoles de manutention sur-mesure. En déployant des artisans compagnons hautement qualifiés, un matériel moderne d’élévation extérieure et des emballages certifiés hautement techniques, nous vous offrons la garantie d'une transition sereine et parfaitement protectrice pour vos biens les plus précieux.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-le-perreux-sur-marne-94.jpg" 
                  alt="Déménagement haut de gamme de villa au Perreux-sur-Marne" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Services de déménagement premium <span className="text-accent underline decoration-accent/20">villas &amp; appartements familiaux</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous adaptons chacun de nos gestes professionnels pour sécuriser les volumes spacieux, les configurations complexes de berges fluviales et les accès en hauteur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Les clés de la protection de votre patrimoine</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Une villa meulière ou une grande maison familiale au Perreux-sur-Marne possède fréquemment des spécificités intérieures sensibles : escaliers étroits en colimaçon, lustres fragiles de grande envergure, œuvres d’art complexes et objets de collection lourds. Notre équipe élabore une stratégie d'emballage individuel renforcé assurant l'intégrité de chaque élément. 
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Nos artisans compagnons utilisent des techniques de protection sélective : pose de housses matelassées matelassées sur-mesure pour mobiliers d'art, valises de transport capitonnées pour miroirs et tableaux d'époque, et emballage étanche sous film bul-kraft étirable pour protéger durablement canapés d'angle et de style.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Flotte locale de pointe</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Fourgons capitonnés et véhicules légers de moins de 3.5 tonnes préservant totalement les abords paysagers et berges de la commune.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Autorisations administratives totales</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Coordination totale avec les services techniques de la Mairie du Perreux-sur-Marne pour vos réservations de stationnement.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Élévation extérieure par Monte-meubles</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Qu'il s'agisse d'un appartement cossu à proximité du pont de Mulhouse ou d'une somptueuse bâtisse d'époque sur l'avenue de Gaulle, les intérieurs précieux ne doivent souffrir d'aucun frottement lié au transport manuel.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Notre service emploie des monte-meubles d'extérieur télescopiques modernes pour extraire vos objets imposants directement par balcon ou fenêtre. Ce dispositif hautement sécurisé évite la fatigue de manutention excessive tout en garantissant un respect absolu de la vie d'immeuble et des copropriétés de prestige.
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
                  src="/images/demenageurs-professionnels-le-perreux.jpg" 
                  alt="Compagnons déménageurs emballant des mobiliers d'art au Perreux-sur-Marne" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Des Formules Étudiées pour Votre Tranquillité</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Des offres modulables <span className="text-accent italic">au service de l'excellence</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Chaque foyer possède des attentes distinctes au moment de concevoir son projet de vie. Marne Transdem vous propose des chiffrages construits sous forme d'offres modulables pour répondre fidèlement à toutes vos dispositions organisationnelles.
                </p>
                <p>
                  La formule <strong>Économique</strong> convient aux petits volumes d'appartement ou aux budgets réfléchis : elle se focalise sur la manutention lourde sécurisée et le transit. La formule <strong>Standard (Confort)</strong> prend en charge l'emballage méthodique de l'ensemble de vos pièces fragiles d'art de la table, lustres et bibelots.
                </p>
                <p>
                  La formule <strong>Prestige (Luxe)</strong> incarne le haut de gamme de la conciergerie de déménagement au Perreux-sur-Marne. Nos experts de confiance organisent la totalité des opérations : de l'emballage minutieux de vos effets personnels sous penderies debout et valises exclusives de protection, à la remise en place complète sur votre lieu d’emménagement pour vous assurer un confort moderne immédiat.
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
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Haute Performance Technologique</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transferts d'entreprises et <span className="text-accent italic">cabinets médicaux</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Le panorama d'activité commerciale et de professions indépendantes (médicales, juridiques, notariales) au Perreux-sur-Marne bénéficie d'une forte dynamique de proximité. Le déménagement d'un cabinet professionnel local exige un timing chirurgical afin d'interrompre le moins possible l'accueil d'usagers ou de patients.
                </p>
                <p>
                  Qu'il s'agisse du transfert de bureaux administratifs d'entreprises, du conditionnement de dossiers confidentiels notariés ou du déménagement complet d'instruments et fauteuils de cabinets dentaires ou médicaux, Marne Transdem déploie un cahier des charges d'une haute précision.
                </p>
                <p>
                  Nos collaborateurs formés se chargent de l'emballage antistatique étanche des réseaux serveurs et terminaux informatiques, du repérage d'archivage au code couleur et de la manutention lourde sécurisée de matériels de diagnostic. Nos interventions se planifient également hors plages ouvrées pour sauvegarder de façon pérenne votre chiffre d'affaires.
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
                  src="/images/transfert-entreprises-le-perreux.jpg" 
                  alt="Déménagement professionnel de locaux d'activités au Perreux-sur-Marne" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi nous confier votre transition <span className="text-accent underline decoration-accent/20">au Perreux-sur-Marne ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous combinons la performance technique d'un grand réseau logistique à la proximité méticuleuse d'artisans d'art engagés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Autorisations techniques</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Notre secrétariat logistique effectue l'intégralité du dépôt administratif de vos arrêtés d'occupation de voirie auprès des services de police municipale du Perreux.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Emballages Spécifiques</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nous fournissons et mettons en place des penderies debout étanches, des valises antichocs capitonnées pour verres et porcelaines, et des housses épaisses imperméabilisées.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Garanties de premier rang</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Toutes nos opérations de déménagement bénéficient d'une assurance contractuelle multirisque transport couvrant la valeur fixée de vos œuvres d'art et biens précieux.
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
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Estimez au mètre cube près <br/><span className="text-accent italic font-sans italic">votre configuration d'emballage</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  L'étalonnage précis du volume de vos mobiliers évite d'éventuels écarts logistiques et garantit la mise à disposition de fournitures enveloppantes optimales.
                </p>
                <p>
                  Marne Transdem met à votre disposition sur son portail web un calculateur digital intuitif de cubage mobilier. Renseignez pièce par pièce votre liste de mobilier et concevez rapidement une base parfaite de calcul.
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
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Visite technique</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Analyse approfondie à votre domicile au Perreux ou par visio-conférence de vos accès, cubage et envoi de chiffrage contractuel sous 24h.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Acheminement de fournitures</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Distribution à demeure ou à disposition de vos cartons renforcés, protections, adhésifs de qualité supérieure.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Sécurisation de voirie</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt réglementaire du dossier d'AOT auprès de la Mairie du Perreux-sur-Marne et pose de signalétiques.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Emballage & Transit le jour J</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Prise en charge professionnelle de vos meubles par nos artisans, emballage à bulles sélectif, arrimage et emménagement.</p>
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
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Territoire Val-de-Marne</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">du Perreux-sur-Marne</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous intervenons quotidiennement dans l'Est Parisien et en bord de Seine pour toutes vos exigences de transfert privé ou d'organisation d'activité de bureaux professionnels.
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
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous préparez un déménagement de prestige au Perreux-sur-Marne ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed font-normal">
            Bénéficiez d'une prestation premium, spécifiquement étudiée pour l'agencement et la protection des grandes villas familiales.
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
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Vos interrogations résolues</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Le Perreux-sur-Marne</span></h2>
            <p className="text-slate-500 font-light text-sm">Nos réponses détaillées pour préparer au mieux chaque détail d'aménagement.</p>
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
            <Link to="/demenagement-champigny-sur-marne" className="hover:text-accent transition-all">Champigny-sur-Marne</Link>
            <Link to="/demenagement-le-perreux-sur-marne" className="hover:text-accent transition-all">Le Perreux-sur-Marne</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalLePerreuxSurMarne;
