import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Home, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalMontreuil: React.FC = () => {
  const path = "/demenagement-montreuil";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement premium d'appartement, maison de ville ou loft à Montreuil ?", 
      a: "Les lofts contemporains du Bas-Montreuil, les maisons bourgeoises du quartier des Beaumonts ou les appartements anciens près de Mairie de Montreuil abritent fréquemment des collections d'art, du mobilier précieux ou du matériel de bureaux de start-up d'artistes. Marne Transdem met en œuvre un protocole d'exception : emballage de vos effets précieux sous valises antichocs, protection rigoureuse des surfaces de réception et passages d'immeuble, utilisation de housses capitonnées exclusives pour mobiliers délicats, et transport sécurisé dans des camions capitonnés. Nos compagnons déménageurs agissent avec une minutie artisanale totale." 
    },
    { 
      q: "Quelle est la procédure administrative de stationnement auprès de la Mairie de Montreuil (93100) ?", 
      a: "Pour réserver l'emplacement nécessaire au camion de déménagement et au monte-meubles d'extérieur, il est requis d'obtenir une autorisation administrative d'occupation temporaire (AOT). Cette demande doit être transmise aux autorités locales de la Mairie de Montreuil au minimum 15 jours francs avant l'intervention. Marne Transdem prend en charge la gestion complète de ces formalités obligatoires de voirie et installe la signalisation réglementaire d'interdiction de stationnement 48 heures à l'avance pour sécuriser le périmètre." 
    },
    { 
      q: "Proposez-vous une formule clés en main avec emballage et déballage intégral ?", 
      a: "Tout à fait. Notre formule Prestige (Luxe) est le choix d'excellence pour les familles et professionnels exigeants de Montreuil. Vous n'avez aucune préparation physique à effectuer : nos experts se chargent d'emballer l'intégralité de vos biens (vêtements délicats sur cintres dans des penderies verticales rigides, livres, vaisselle fine dans des valises antichocs capitonnées) et d'effectuer le déballage méthodique à votre nouvelle adresse." 
    },
    { 
      q: "Dans quels cas le recours à un monte-meubles est-il indispensable à Montreuil ?", 
      a: "Montreuil possède un patrimoine urbain varié incluant de nombreux appartements anciens sans ascenseur ou accessibles par des cages d'escalier étroites (notamment dans le Bas-Montreuil et la Croix de Chavaux). Lorsque des canapés d'angle, des pianos, ou des tables volumineuses ne s'insèrent pas dans les accès intérieurs, nous mettons en place un monte-meubles télescopique d'extérieur, sous réserve de faisabilité technique relative au réseau de lignes aériennes et à la largeur de la voie." 
    },
    { 
      q: "Comment planifier une visite technique d'estimation gratuite de mes volumes mobiliers ?", 
      a: "Vous pouvez nous joindre par téléphone ou remplir notre demande de devis en ligne. Un expert logistique de Marne Transdem conviendra d'une visite physique d'évaluation à votre domicile à Montreuil (ou d'une visio-conférence) afin de calibrer fidèlement le cubage, valider les contraintes d'accès techniques et vous remettre sous 24 heures un chiffrage contractuel gratuit." 
    }
  ];

  const nearbySectors = [
    { n: "Paris 20e", l: "/demenagement-paris-20" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Saint-Mandé", l: "/demenagement-saint-mande" },
    { n: "Bagnolet", l: "/demenagement-bagnolet" },
    { n: "Pantin", l: "/demenagement-pantin" },
    { n: "Fontenay-sous-Bois", l: "/demenagement-fontenay-sous-bois" },
    { n: "Nogent-sur-Marne", l: "/demenagement-nogent-sur-marne" },
    { n: "Joinville-le-Pont", l: "/demenagement-joinville-le-pont" },
    { n: "Paris 11e", l: "/demenagement-paris-11" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Val-de-Marne (94)", l: "/demenagement-val-de-marne" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Montreuil | Logements, Ateliers & lofts | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Montreuil (93100) ? Marne Transdem réalise vos déménagements de haut niveau pour lofts, appartements familiaux et bureaux. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Montreuil", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Déménagement de Haut Niveau - Lofts, Ateliers & Pavillons</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Montreuil</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem orchestre vos projets de déménagement de haut niveau pour appartements familiaux, lofts contemporains et locaux professionnels à Montreuil. Profitez d'un savoir-faire artisanal de haute technicité, parfaitement adapté au tissu urbain contrasté de la petite couronne.
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

      {/* 2. LE CADRE RESIDENTIEL ET EXIGENT DE MONTREUIL */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-xs font-black uppercase tracking-widest text-accent">L'Art de Vivre de l'Est Parisien</span>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Un déménagement d'exception <span className="text-accent italic">adapté à chaque quartier</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-left">
                <p>
                  Idéalement connectée aux lisières de <strong>Paris 20e</strong> et de <strong>Vincennes</strong>, la ville de <strong>Montreuil</strong> (93100) séduit par sa fascinante dynamique culturelle, son histoire horticole d'exception (les célèbres Murs à Pêches) et la stupéfiante diversité de son architecture. Du Bas-Montreuil, caractérisé par ses lofts réhabilités et d'anciens ateliers d'artistes denses, aux plateaux verdoyants du parc des Beaumonts abritant de délicats pavillons individuels et des résidences contemporaines, la ville affiche un paysage de contrastes intenses.
                </p>
                <p>
                  Mener un déménagement dans ces configurations exige une précision logistique chirurgicale. Les ruelles pavées de l'Est parisien, les impasses pittoresques mais resserrées, et l'absence récurrente d'ascenseur en immeubles de faubourgs imposent aux professionnels de configurer judicieusement chaque moyen technique : sélection minutieuse du gabarit des fourgons capitonnés de transit, recours raisonné à nos monte-meubles d'extérieur et dépose de signalisations administratives en temps voulu.
                </p>
                <p>
                  Pour répondre au plus haut niveau d'exigence des familles, artisans et indépendants montreuillois, <strong>Marne Transdem</strong> étudie des solutions logistiques rigoureuses. En planifiant nos parcours avec soin et en emballant méthodiquement chaque meuble d'art et pièce informatique fragile, nous garantissons l'intégrité absolue de vos transitions géographiques.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-appartement-93.jpg" 
                  alt="Déménagement haut de gamme d'appartement à Montreuil" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Services de déménagement de haut niveau <span className="text-accent underline decoration-accent/20">lofts, ateliers &amp; pavillons</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous faisons évoluer nos méthodologies de transport pour sécuriser les volumes spacieux de vos lofts, les accès complexes et d'étroits escaliers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Les clés de la protection de vos objets d'art et d'ateliers</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Qu'il s'agisse de déplacer des canapés monumentaux, des œuvres d'art créées dans les quartiers culturels de la ville ou du matériel technique sensible, les accès intérieurs exigent un soin irréprochable. Notre équipe élabore un plan d'emballage individuel optimal : protection renforcée de vos cadres et toiles sous valises antichocs capitonnées, et pose de couvertures épaisses imperméables sur-mesure pour vos boiseries de style.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Nos artisans compagnons ont une maîtrise innée des configurations montreuilloises : de l'avenue de la Résistance aux ruelles denses du quartier Signac. Nous délimitons par zone de portage les difficultés et prévenons tout glissement de charges par d'excellents arrimages en véhicules.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Flotte moderne d'Est Parisien</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Gamme complète de fourgons de capitonnage et véhicules légers respectueux des contraintes de gabarit et de tonnage en hypercentre.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                    <CheckCircle2 className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-900 uppercase text-xs tracking-wider">Arrêtés administratifs de A à Z</h4>
                    <p className="text-sm text-slate-500 font-light mt-1">Gestion transparente auprès des services de voirie de la Mairie de Montreuil pour préserver le stationnement en rue.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-2xl font-bold text-brand-900 uppercase italic">Élévation extérieure par Monte-meubles</h3>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Pour acheminer du mobilier lourd ou encombrant au sein de lofts convertis en étages ou raccordés sous combles, l'utilisation d'une échelle de levage ou d'un monte-meuble d'extérieur s'avère la clé d'un déménagement serein.
              </p>
              <p className="text-slate-600 font-light leading-relaxed text-justify">
                Nous analysons drastiquement l'entourage paysager de la Mairie de Montreuil et de la Belgique pour sécuriser le positionnement de notre plateau de chargement afin de passer vos effets précieux d'art en douceur par balcon et huisserie, prévenant l'usure de cages d'escalier complexes.
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
                  alt="Compagnons déménageurs de Marne Transdem préparant des objets fragiles à Montreuil" 
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
                  Chaque transition représente pour vous un nouveau jalon personnel ou d'activité professionnelle. Marne Transdem vous propose des chiffrages rigoureux construits sous forme d'offres adaptées à toutes les configurations de préparation.
                </p>
                <p>
                  La formule <strong>Économique</strong> convient parfaitement pour les livraisons simplifiées : elle intègre la manutention sécurisée de vos emballages préparés et le transport. La formule <strong>Standard (Confort)</strong> prend en charge l'emballage délicat des éléments fragiles (vaisselle d'art de la table, lustres et porcelaine).
                </p>
                <p>
                  La formule <strong>Prestige (Luxe)</strong> incarne le haut de gamme de notre service d'Est Parisien. De la mise en cartons de vos vêtements sur cintres aux protections multicouches de vos livres et tableaux, nos compagnons assurent l'intégralité du pack logistique à demeure et la réinstallation de confort requise à destination.
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
                Transfert d'entreprises et <span className="text-accent italic">ateliers d'art créatif</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Montreuil concentre de brillants créateurs d'animations, agences de design, institutions technologiques et artisans. Marne Transdem sait que l'interruption d'une activité d'entreprise doit se limiter au strict minimum opérationnel possible.
                </p>
                <p>
                  Qu'il s'agisse de déplacer des postes de serveurs complexes d'agences numériques, d'emballer de volumineux rouleaux de tissus d'ateliers de design ou de transférer le mobilier médical d'un cabinet près de Croix de Chavaux, nous gérons l'ensemble de la logistique d'inventaire.
                </p>
                <p>
                  Nos collaborateurs effectuent des dalles de transit, des repérages minutieux sous code couleur, et enveloppent le matériel informatique sous enveloppes antistatiques. Nos interventions se déploient également lors de plages horaires décalées de week-end pour garantir votre sérénité économique.
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
                  alt="Transfert professionnel de bureaux à Montreuil" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-6 uppercase tracking-tight">Pourquoi nous confier votre transition <span className="text-accent underline decoration-accent/20">à Montreuil ?</span></h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Nous fusionnons la méticulosité d'un grand architecte de transport à la proximité immédiate d'équipes de confiance établies en Est Parisien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Réglementation locale</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nos conseillers s'occupent de la totalité de la constitution de vos arrêtés d'occupation de voirie auprès des services administratifs de Montreuil.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Protections d'excellence</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Utilisation exclusive de penderies rigides debout pour lingeries et de bull-pack kraft multicouche certifié pour œuvres créatives d'ateliers.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">Garantie sur-mesure d'art</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Nous incluons des assurances ad-valorem performantes adaptées aux œuvres artisanales et structures haut de gamme de créateurs locaux.
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
                  Faire estimer correctement le volume de mobilier de votre pavillon ou loft évite tout désagrément organisationnel et prépare de manière optimale les fournitures nécessaires.
                </p>
                <p>
                  Marne Transdem met à votre entière disposition son calculateur virtuel de cubage de dernière génération. Renseignez à votre rythme meuble par meuble et préparez la base solide de votre devis express de déménagement.
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
                    <p className="text-xs text-slate-400 font-light mt-1">Analyse approfondie sur place à Montreuil ou par visio-conférence de vos accès routiers, ascenseurs et calcul de cubage rigoureux.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Acheminement de fournitures</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Distribution rapide de vos cartons double cannelure haute résistance, bull-pack, papier d'emballage et penderies.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Réservation de stationnement</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Dépose de votre dossier d'AOT auprès de la Mairie et pose des panneaux de restriction officielle de voirie.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-accent text-brand-900 font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">Réalisation le Jour J</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Soin absolu lors du chargement de vos biens par nos artisans compagnons, arrimage technique et installation finale fluide.</p>
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
            <span className="text-xs font-black uppercase tracking-widest text-accent font-semibold">Territoires Limitrophes</span>
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Montreuil</span></h2>
            <p className="text-slate-500 text-sm font-light max-w-2xl mx-auto">
              Nous opérons quotidiennement dans l'Est Parisien et en bordure immédiate de Seine-Saint-Denis pour toutes vos volontés de transfert privé ou professionnel.
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
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase tracking-tight leading-tight">Vous organisez un déménagement de prestige à Montreuil ?</h2>
          <p className="text-brand-900/80 text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed font-normal">
            Profitez de prestations d'Est Parisien de haut niveau, spécifiquement étudiées pour la préservation de vos lofts et pavillons familiaux.
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Montreuil</span></h2>
            <p className="text-slate-500 font-light text-sm">Nos explications méticuleuses pour programmer chaque étape d'emménagement.</p>
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

export default LocalMontreuil;
