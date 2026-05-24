import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalFontenaySousBois: React.FC = () => {
  const path = "/demenagement-fontenay-sous-bois";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement à Fontenay-sous-Bois dans les rues étroites ou à forte déclivité ?", 
      a: "Fontenay-sous-Bois comprend de fortes variations géographiques, notamment dans le quartier historique du Village ou sur les hauteurs. Les rues pentues ou serrées peuvent limiter d'emblée l'accès de camions gros volumes. Marne Transdem résout ce problème en déployant des camions de taille moyenne (20 m³ à 30 m³) adaptés à la voirie locale et en programmant, si nécessaire, un service de navette. De plus, nous étudions l'acheminement piétonnier pour sécuriser le portage du mobilier encombrant." 
    },
    { 
      q: "Quelles sont les démarches administratives de stationnement à Fontenay-sous-Bois ?", 
      a: "Pour pouvoir stationner votre véhicule de déménagement sur la voie publique à Fontenay-sous-Bois (94120), vous devez effectuer une demande d'autorisation de stationnement temporaire auprès de la direction de l'Espace Public de la mairie de Fontenay-sous-Bois. Cette formalité doit impérativement être déposée au minimum 15 jours calendaires avant le jour J. Marne Transdem peut vous accompagner ou prendre en charge intégralement cette démarche administrative pour un emménagement l'esprit tranquille." 
    },
    { 
      q: "Existe-t-il des particularités pour déménager une entreprise à Val-de-Fontenay ?", 
      a: "Val-de-Fontenay est le premier pôle de bureaux et d'activités tertiaires de l'Est parisien, hébergeant de grands sièges sociaux, des banques et des administrations majeures. Un transfert d'entreprise dans cette zone d'affaires dynamique requiert un protocole logistique pointu. Marne Transdem gère l’audit d'inventaire, le transfert d'ordinateurs et serveurs fragiles, le reconditionnement d’archives classées et le remontage ergonomique. Nous réalisons l’intervention en horaires décalés ou le week-end afin de préserver votre continuité opérationnelle." 
    },
    { 
      q: "Comment protéger les meubles brillants et les objets d'art lors du déménagement ?", 
      a: "Chaque meuble laqué, brillant ou pièce d'art bénéficie d'une attention sur-mesure de nos compagnons déménageurs. Nous employons du matériel de capitonnage haut de gamme : housses de protection matelassées, papier-bulle multicouche d'épaisseur supérieure, couvertures d'arrimage robustes et cartons télescopiques spécifiques pour les tableaux ou miroirs. Notre assurance contractuelle garantit par ailleurs une indemnisation totale à hauteur de la déclaration de valeur de vos biens." 
    },
    { 
      q: "Proposez-vous une solution de self-stockage ou garde-meubles proche de Fontenay-sous-Bois ?", 
      a: "Absolument. Si la date de libération de votre logement actuel ne coïncide pas avec la livraison du nouveau, Marne Transdem met à votre disposition ses espaces de stockage sécurisés. Situés dans des hangars sains, ventilés et secs à proximité du Val-de-Marne, nos garde-meubles individuels sont scellés et surveillés électroniquement (caméras infrarouge et alarmes 24h/24, 7j/7) afin de préserver vos affaires le temps désiré." 
    },
    { 
      q: "Quel délai prévoir pour réserver un déménagement de prestige avec Marne Transdem ?", 
      a: "Bien que nous fassions preuve d'une grande réactivité face aux demandes urgentes, nous vous recommandons de réserver votre date entre 1 et 2 mois à l'avance, particulièrement si votre déménagement se situe durant la haute saison (de mai à septembre) ou en fin de mois. Cela nous permet de mener à bien la visite technique gratuite (physique ou virtuelle) et de planifier l'arrêté de stationnement en mairie dans les temps impartis." 
    }
  ];

  const nearbySectors = [
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Nogent-sur-Marne", l: "/demenagement-nogent-sur-marne" },
    { n: "Saint-Mandé", l: "/demenagement-saint-mande" },
    { n: "Saint-Maurice", l: "/demenagement-saint-maurice" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Neuilly-sur-Marne", l: null },
    { n: "Le Perreux-sur-Marne", l: "/demenagement-le-perreux-sur-marne" },
    { n: "Champigny-sur-Marne", l: "/demenagement-champigny-sur-marne" },
    { n: "Rosny-sous-Bois", l: null },
    { n: "Montreuil", l: "/demenagement-montreuil" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Fontenay-sous-Bois | Résidentiel & Val de Fontenay | Marne Transdem"
        description="Besoin d'un déménageur de prestige à Fontenay-sous-Bois (94) ? Marne Transdem orchestre le déménagement soigné de résidences et de bureaux. Devis gratuit & sur-mesure."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Fontenay-sous-Bois", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Primacy Logistique - Val-de-Marne 94</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Fontenay-sous-Bois</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Bénéficiez du savoir-faire d’un déménageur de confiance à Fontenay-sous-Bois. Logements familiaux au Village, appartements sur les hauteurs des Rigollots ou transfert de sièges sociaux majeurs à Val-de-Fontenay : nous maîtrisons chaque aspect de votre projet.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Mon Devis sur-mesure gratuit
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
      {/* Introduction */}
      <section className="py-24 font-sans text-left">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Ancrage Territorial de l'Est Parisien</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Un déménagement d'excellence <span className="text-accent italic">à Fontenay-sous-Bois</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Idéalement ancrée dans l’Est parisien aux portes du <strong>Bois de Vincennes</strong>, la ville de <strong>Fontenay-sous-Bois</strong> (94120) est caractérisée par une formidable richesse sociologique, historique et urbanistique. Entre la quiétude résidentielle de son vieux <strong>Village</strong> aux ruelles pavées pittoresques, le dynamisme familial des quartiers comme les <strong>Rigollots</strong> et les <strong>Parapluies</strong>, et la puissance économique internationale du pôle de <strong>Val-de-Fontenay</strong>, la commune offre un cadre de vie de premier plan très recherché.
                </p>
                <p>
                  Toutefois, déménager dans cette partie du département présente des contraintes d'organisation singulières. Qu'il faille manier du mobilier d’époque ou de grands pianos de concert dans une maison de meulière du Village, emballer avec minutie un appartement du centre-ville, ou organiser le transfert logistique complet d’une entreprise du secteur tertiaire aux abords de la gare ferroviaire RER de Val-de-Fontenay, chaque opération nécessite des réponses logistiques techniques, calibrées et robustes.
                </p>
                <p>
                  Grâce à son expertise acquise en opérant chaque jour au cœur du <Link to="/demenagement-val-de-marne" className="font-bold text-brand-900 hover:text-accent underline transition-all">Val-de-Marne (94)</Link> et en Île-de-France, la société <strong>Marne Transdem</strong> étudie et dénoue ces contraintes de voirie et de manutention. Nous mettons un point d'honneur à soigner l'intégrité physique de votre patrimoine mobilier grâce à nos déménageurs de métier, s’appuyant sur des protocoles d'emballage d'excellence et une flotte de véhicules récents capitonnés et adaptés.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-fontenay-sous-bois-94.jpg" 
                  alt="Déménagement d'appartement et de résidence à Fontenay-sous-Bois" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGISTIQUE DE HAUTE ALTITUDE – ACCÈS COMPLIQUÉS ET ÉTAGES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-widest text-accent">Analyse Logistique</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Le défi des escaliers étroits, des pentes et <span className="text-accent underline decoration-accent/20">des accès limités</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Marne Transdem surmonte chaque barrière architecturale pour garantir une manutention fluide et rapide, sans frottement ni désagréments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Reconnaissance technique des accès à Fontenay</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Le relief de Fontenay-sous-Bois présente d'importantes déclivités entre le plateau et la plaine. Dans les vieux faubourgs résidentiels bordant Vincennes ou Montreuil, de charmantes ruelles pavées sinuent entre les propriétés individuelles. Le passage d’un lourd semi-remorque y est d’emblée à exclure. De même, les allées piétonnes arborées menant aux entrées de certaines copropriétés imposent des distances de portage importantes, rongeant le temps et fatiguant les corps sans un outillage de manutention approprié.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Dans les immeubles récents ou les collectifs des années 70 de la commune, l'usage des ascenseurs pour le transfert de charges lourdes (comme un lit king size, des armoires normandes ou de l'électroménager volumineux) est souvent réglementé ou interdit par les cahiers des charges de copropriété afin d’éviter les pannes préjudiciables.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Flotte de Navette Adaptée</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Utilisation de petits camions 20m³ maniables pour assurer le relais logistique dans les voies de voirie étroite.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Housses de Protection Matelassées</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Emballage systématique avant déplacement des angles de portes, meubles précieux et literie.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Le Service Monte-Meuble Extérieur Télescopique</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour surmonter ces écueils et sécuriser le transfert vertical de vos biens, nos équipes déploient d’authentiques solutions mécaniques de levage de dernière génération. En plaçant une échelle télescopique ou un monte-meuble motorisé sous la fenêtre, la logistique s’accélère drastiquement.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Disponibles pour tous les paliers dépourvus d'équipements d'ascenseurs corrects, nos nacelles de monte-meuble sont manœuvrées uniquement par des techniciens spécialisés qui veillent à l'équilibrage et au haubanage sécuritaire de la marchandise. Cette approche réduit également le bruit pour la copropriété tout en annulant toute éraflure contre les plinthes et murs peints des escaliers.
              </p>
              <div className="pt-4">
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:text-brand-900 transition-colors">
                  Notre Service Monte-Meuble Île-de-France <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DÉMÉNAGEMENT RÉSIDENTIEL POUR LES PARTICULIERS */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group order-last lg:order-first">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenageurs-professionnels-fontenay.jpg" 
                  alt="Déménageurs professionnels s'occupant d'un emballage de cartons à Fontenay-sous-Bois" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Prestations Résidentielles de Prestige</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Prestations sur-mesure pour <span className="text-accent italic font-sans italic">particuliers et familles</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Parce que le transfert de votre mobilier et de vos souvenirs intimes est le cœur de notre engagement d'artisan, nous soignons chaque étape pour qu'aucune anxiété ne vienne altérer votre plaisir d'emménagement. Qu'il s'agisse d'un pavillon d'époque au Village ou d'un bel appartement moderne aux Rigollots, Marne Transdem définit la méthode qui respecte votre budget.
                </p>
                <p>
                  Dans cette optique, notre agence vous propose trois formules contractuelles modifiables de déménagement. Notre formule <strong>Économique</strong> convient parfaitement aux familles désirant gérer eux-mêmes l'emballage complet de la vaisselle et des cartons de vêtements de manière anticipée. Notre formule <strong>Standard</strong>, la formule sérénité préférée de nos usagers, nous confère l'emballage minutieux des objets fragiles, le démontage et remontage des literies complexes. Enfin, notre formule <strong>Luxe</strong> prend en charge 100% des actions : nous trions, emballons vos livres et vêtements, décrochons vos luminaires et réinstallons tout à votre nouvelle adresse.
                </p>
                <p>
                  Toutes nos interventions mobilisent des fournitures d'emballage hautement protectrices : cartons d'archives épais, étuis spécifiques pour verres à pied, penderies verticales portatives adaptées aux vêtements sur cintre, films d'étanchéité écologiques et couvertures capitonnées doublées.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-particuliers-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Détail Déménagement Particulier
                </Link>
                <Link to="/calculateur-volume" className="border border-slate-200 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Calculateur de Volume (m³)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTEUR TERTIAIRE ET TRANSFERTS D'ENTREPRISES À VAL-DE-FONTENAY */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">Logistique Tertiaire de pointe</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Transfert d'entreprises et bureaux <span className="text-accent italic font-sans">à Val-de-Fontenay</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  La plateforme tertiaire de <strong>Val-de-Fontenay</strong> se positionne comme l’un des carrefours économiques majeurs de l’Est de l'Île-de-France. Regroupant des géants bancaires d’envergure mondiale, des centres informatiques d'affaires, des startups en pleine croissance et de grandes institutions d'État, elle engendre des exigences logistiques pointues. Un transfert professionnel dans ces ensembles immobiliers complexes ne laisse aucune place à l’incertitude.
                </p>
                <p>
                  Un déménagement d'entreprise réussi doit s'effectuer sans impacter la productivité de vos équipes de travail. C'est pourquoi un chef de projet dédié orchestre la planification méticuleuse du chantier : inventaire technique, étiquetage directionnel des flux de départ, emballage délicat du parc informatique et remontage ergonomique du mobilier de bureau.
                </p>
                <p>
                  Nous nous adaptons avec souplesse à vos particularités de calendrier d'exploitation. Les hommes de Marne Transdem interviennent en dehors de vos heures traditionnelles de travail (pendant les soirées de semaine ou tout au long des week-ends) afin de s'assurer que vos collaborateurs retrouvent leurs postes d'activité parfaitement fonctionnels et réinstallés dès le lundi matin.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic text-sm">
                  Nos solutions Professionnelles
                </Link>
                <Link to="/contact" className="bg-white text-brand-900 border border-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic text-sm">
                  Contacter un Chef de Projet
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/transfert-bureaux-fontenay-sous-bois.jpg" 
                  alt="Déménagement de parcs de serveurs et bureautique d'entreprise à Fontenay-sous-Bois" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GARANTIES CONFANCE MARNE TRANSDEM */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-accent">La Rigueur Professionnelle</span>
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Vos atouts confiance avec notre <span className="text-accent underline decoration-accent/20">agence de déménagement</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Marne Transdem met un point d’honneur à vous fournir des prestations caractérisées par la clarté, l'honnêteté et le soin du détail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Matériel performant moderne</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Nous exploitons notre propre flotte de véhicules capitonnés suspendus pneumatiquement, nos monte-meubles d'escalier et des chariots de manutention à bandage tendre qui préservent vos sols.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Cartons et fournitures inclus</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Nous mettons gracieusement à votre disposition de véritables fournitures adaptées pour l’emballage : caisses à livres, rubans d’étanchéité silencieux, housses imperméables et papier bulle d'époque.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic text-left">Assurances et garanties RC</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed text-left">
                Toutes nos opérations physiques d’emballage, de transit et de calage technique sont couvertes par notre assurance responsabilité civile d’entreprise couvrant l'aléa matériel de votre mobilier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALCUL DU VOLUME EN LIGNE */}
      <section className="py-24 bg-brand-900 text-white font-sans overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Estimation Précise</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">Estimez pièce par pièce le <br/><span className="text-accent italic font-sans italic">volume en m³ de votre ameublement</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed text-left">
                <p>
                  Afin de dépêcher le camion ideal (un utilitaire manœuvrable de 22m³ pour un appartement citadin ou un grand porteur de 50m³ pour une maison au Village), le calcul du volume total est impératif.
                </p>
                <p>
                  Pour éliminer le stress ou toute déconvenue tarifaire inattendue de dernière minute le jour J, utilisez notre calculateur de volume interactif en ligne. Simple et rapide, il détermine de façon fiable votre volume mobilier final indispensable pour asseoir une cotation précise.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl">
                  <Calculator size={24} />
                  Calculer mon cubage gratuitement
                </Link>
              </div>
            </div>

            <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10 space-y-8">
              <h3 className="text-2xl font-bold text-white uppercase italic tracking-tight">Le calendrier de votre déménagement réussi</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-45 : Audit technique et devis</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Évaluation des accès de la rue, détermination du cubage et remise de notre devis détaillé et sans engagement.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-30 : Réception gratuite des cartons d'emballage</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépôt soigné de vos penderies, rubans d’adhésifs, cartons à livres et papier bulle à votre domicile.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">J-15 : Affichage de l'autorisation municipale de voirie</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Réservation d'emplacement auprès de la mairie de Fontenay-sous-Bois pour placer le camion.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Le Jour J : Emménagement total</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Manutention prudente, protection capitonnée en camion, déchargement et pose soignée.</p>
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
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis en Île-de-France <span className="text-accent italic font-sans">autour de Fontenay-sous-Bois</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous couvrons l’ensemble des communes limitrophes pour vous assurer des équipes de déménageurs professionnels de proximité.
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

      {/* 9. HIGH CONVERSION CALL TO ACTION */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous préparez un déménagement à Fontenay-sous-Bois ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Profitez du savoir-faire chevronné de l’équipe de Marne Transdem pour un déménagement soigné, adapté à votre volume mobilier et aux particularités de votre nouvel immeuble ou entreprise.
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Foire Aux Questions <span className="text-accent italic font-sans italic">Fontenay-sous-Bois</span></h2>
            <p className="text-slate-500 font-light text-sm">Toutes nos réponses détaillées sur l'organisation de votre emménagement à Fontenay.</p>
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
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Devis Express</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur Cube</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all">Île-de-France</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all text-white underline decoration-accent/30 underline-offset-4">Val-de-Marne (94)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 pt-8">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all">Paris</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all">Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-all">Nogent-sur-Marne</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent transition-all">Saint-Mandé</Link>
            <Link to="/demenagement-saint-maurice" className="hover:text-accent transition-all">Saint-Maurice</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-all">Charenton</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all">Saint-Maur-des-Fossés</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all">Créteil</Link>
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-all">Maisons-Alfort</Link>
            <Link to="/demenagement-ivry-sur-seine" className="hover:text-accent transition-all">Ivry-sur-Seine</Link>
            <Link to="/demenagement-villejuif" className="hover:text-accent transition-all">Villejuif</Link>
            <Link to="/demenagement-champigny-sur-marne" className="hover:text-accent transition-all">Champigny-sur-Marne</Link>
            <Link to="/demenagement-le-perreux-sur-marne" className="hover:text-accent transition-all">Le Perreux-sur-Marne</Link>
            <Link to="/demenagement-montreuil" className="hover:text-accent transition-all">Montreuil</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalFontenaySousBois;
