import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Home, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Plus,
  Package,
  Box,
  Layout,
  Calculator,
  Warehouse,
  ArrowUpCircle,
  Phone,
  FileText,
  MapPin,
  CheckCircle2,
  Gem
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalMarnesLaCoquette: React.FC = () => {
  const path = "/demenagement-marnes-la-coquette";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Marnes-la-Coquette ?",
      a: "Un déménagement à Marnes-la-Coquette demande d’anticiper le volume, les accès, le stationnement et la préparation des cartons. Selon qu’il s’agit d’une maison, d’une villa, d’un appartement ou d’un local professionnel, il est important d’évaluer les caves, garages, parkings, jardins, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Marnes-la-Coquette et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Marnes-la-Coquette et dans les secteurs proches comme Garches, Vaucresson, Ville-d’Avray, Saint-Cloud, Le Chesnay-Rocquencourt, Versailles, La Celle-Saint-Cloud, Bougival, Rueil-Malmaison et plus largement en Île-de-France selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Marnes-la-Coquette ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par les accès classiques. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Marnes-la-Coquette ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Marnes-la-Coquette ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, le stationnement, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Marnes-la-Coquette | Marne Transdem" 
        description="Préparez votre déménagement à Marnes-la-Coquette avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Marnes-la-Coquette", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display">
        <div className="absolute inset-0 bg-[url('/images/demenagement-marnes-la-coquette-92.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent uppercase font-black tracking-widest text-sm italic">Déménagement local</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white uppercase italic">
                Déménagement <span className="text-accent underline-offset-4">Marnes-la-Coquette</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-80 font-display">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Marnes-la-Coquette, avec une organisation adaptée aux maisons, villas, résidences, appartements, biens familiaux et contraintes d’accès de l’ouest parisien.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 italic font-display">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-accent text-brand-900 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group font-display italic shadow-brand-900/40"
                >
                  Demander un devis gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform italic" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 font-display italic"
                >
                  <Phone size={20} className="text-accent shadow-sm" />
                  {CONTACT.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-4 font-display italic shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex text-xs font-bold uppercase tracking-widest text-slate-400 italic font-display">
            <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
            <span className="mx-3 text-slate-200">/</span>
            <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors">Secteurs</Link>
            <span className="mx-3 text-slate-200">/</span>
            <span className="text-brand-900 font-black italic">Marnes-la-Coquette</span>
          </nav>
        </div>
      </div>

      {/* 2. Introduction locale */}
      <section className="py-24 bg-white overflow-hidden relative shadow-sm text-brand-900 italic font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 font-display italic"
            >
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4">
                Votre déménagement à Marnes-la-Coquette
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic font-display">
                <p>
                  Marnes-la-Coquette est une commune résidentielle, calme et très recherchée des Hauts-de-Seine, offrant un cadre de vie exceptionnel en Île-de-France. Située à proximité immédiate de Garches, Vaucresson, Ville-d’Avray et Saint-Cloud, elle bénéficie également de la proximité de Versailles, Le Chesnay-Rocquencourt, La Celle-Saint-Cloud et Rueil-Malmaison, aux portes de Paris ouest.
                </p>
                <p>
                  Marne Transdem accompagne les déménagements à Marnes-la-Coquette pour les particuliers et les professionnels. Qu'il s'agisse de vastes propriétés, de villas de prestige, de pavillons ou d'appartements familiaux en résidence, nous maîtrisons les contraintes d'accès spécifiques de la commune. Nous intervenons également pour les bureaux, cabinets, professions libérales et locaux professionnels locaux.
                </p>
                <p>
                  Nos équipes assurent une prestation premium : estimation rigoureuse du volume, protection renforcée du mobilier et des objets fragiles, gestion des dépendances, parkings, jardins et accès de maison complexes. Que vous déménagiez de Versailles vers Marnes-la-Coquette ou que vous prépariez une installation depuis Paris, nous définissons une organisation sur mesure pour votre projet.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Marnes-la-Coquette (92430)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Gem className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Prestation Haute Qualité</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-marnes-la-coquette-92.jpg" 
                  alt="Déménagement Marnes-la-Coquette 92 - Excellence Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Marnes-la-Coquette demande une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase px-4 italic">Réussir son projet à Marnes-la-Coquette</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 px-4 italic font-display">
            Commune résidentielle privilégiée, Marnes-la-Coquette demande une logistique experte pour manipuler vos biens précieux et gérer des environnements de prestige.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic shadow-sm">
            {[
              {
                title: "Propriétés d'Exception",
                desc: "Gestion des maisons, villas et résidences de standing avec jardins, garages, caves et dépendances nécessitant une manutention soignée.",
                icon: Home
              },
              {
                title: "Allées & Portails",
                desc: "Anticipation des accès spécifiques : portails motorisés, allées de gravier, jardins et entrées de maison à prendre en compte.",
                icon: Truck
              },
              {
                title: "Objets Précieux",
                desc: "Emballage sur-mesure pour le mobilier de famille, la vaisselle fragile, les œuvres d'art, livres et effets personnels de valeur.",
                icon: Gem
              },
              {
                title: "Bureaux & Cabinets",
                desc: "Transfert de bureaux, cabinets libéraux et petits locaux professionnels organisés pour garantir votre continuité d'activité.",
                icon: Building2
              },
              {
                title: "Accès de Manutention",
                desc: "Étude rigoureuse des escaliers, couloirs et parkings pour optimiser le temps d'intervention et la sécurité des biens.",
                icon: Box
              },
              {
                title: "Garde-Meuble Sécurisé",
                desc: "Solutions de stockage temporaire idéales en cas de transition, travaux de rénovation ou décalage de signature immobilière.",
                icon: Warehouse
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-brand-900/5">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors shadow-sm italic">
                  <item.icon className="text-brand-900 group-hover:text-accent shadow-sm" size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight uppercase italic">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm italic opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Marnes-la-Coquette */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 px-4 text-white font-display italic">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase underline-offset-4">Nos services à Marnes-la-Coquette</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto italic font-medium opacity-80 text-slate-300 shadow-sm">L'expertise Marne Transdem pour une mobilité sereine dans le 92.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display shadow-2xl shadow-black/20">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Maisons, villas, pavillons, appartements, résidences et logements familiaux.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement d'entreprises",
                desc: "Bureaux, cabinets, professions libérales, indépendants et petits locaux professionnels.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble / stockage",
                desc: "Solution utile pendant une transition, des travaux ou un décalage de dates.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Location monte-meuble",
                desc: "Solution technique à envisager selon les accès et la faisabilité technique.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage et protection",
                desc: "Protection des meubles de valeur, objets fragiles, vaisselle et effets personnels.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons et matériel",
                desc: "Préparation efficace avec du matériel professionnel et cartons adaptés.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules de déménagement",
                desc: "Économique, Standard, Luxe : des offres adaptées à votre niveau de confort.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de volume",
                desc: "Estimation indicative pour affiner votre étude personnalisée avant signature.",
                link: "/calculateur-volume",
                icon: Calculator
              }
            ].map((service, idx) => (
              <Link 
                key={idx} 
                to={service.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-brand-900 transition-all group active:scale-[0.98] italic font-display"
              >
                <service.icon size={32} className="text-accent group-hover:text-brand-900 mb-6 italic shadow-sm" />
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight italic uppercase">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic opacity-80">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors uppercase italic shadow-sm border-b border-transparent group-hover:border-brand-900 pb-1 w-fit">
                  Détails <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shadow-sm" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Marnes-la-Coquette */}
      <section className="py-24 bg-white font-display italic overflow-hidden px-4 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center italic shadow-sm">
            <div className="lg:w-1/2 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10 italic">
                  <img 
                    src="/images/demenagement-marnes-la-coquette-maison.jpg" 
                    alt="Déménagement maison et villa de prestige à Marnes-la-Coquette - Marne Transdem" 
                    className="w-full h-full object-cover shadow-sm"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic shadow-accent/40"></div>
            </div>
            <div className="lg:w-1/2 space-y-8 px-4 font-display italic shadow-sm">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm">Maisons, Villas & Logements Familiaux</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display">
                <p>
                  Marne Transdem accompagne les résidents de Marnes-la-Coquette pour leurs projets de déménagement. Que vous habitiez une villa de standing, une maison avec grand jardin ou un appartement familial, nous adaptons nos moyens logistiques à votre cadre de vie.
                </p>
                <p>
                  De Marnes-la-Coquette vers Paris, de Paris vers Marnes-la-Coquette, ou vers une autre destination en Île-de-France, nous prenons en charge le tri, la préparation des cartons et la protection spécifique des objets précieux (mobilier de valeur, tableaux, vaisselle, livres). Nous gérons les accès exigeants (allées, portails, garages, dépendances) pour une transition sans stress.
                </p>
              </div>
              <div className="pt-8 transition-transform hover:scale-105 italic">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic font-display"
                >
                  Demander mon devis
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform italic shadow-sm" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Marnes-la-Coquette */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm px-4 italic font-display">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic font-display shadow-sm">
             <div className="lg:w-1/2 shadow-sm italic">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic">
                  <img src="/images/transfert-bureaux-entreprise-paris.jpg" alt="Déménagement Entreprise et transfert de bureaux Marnes-la-Coquette" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic shadow-sm">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm italic">Bureaux & Cabinets Professionnels</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-2">
                 <p>
                    Transfert industriel ou mobilité de bureaux : nous intervenons auprès des professionnels de Marnes-la-Coquette (cabinets, commerçants de proximité, professions libérales, indépendants) pour assurer le déménagement de leurs structures.
                 </p>
                 <p>
                    Mobilier professionnel, archives, matériel informatique : nous planifions chaque intervention pour minimiser l'impact sur votre activité. Notre connaissance de l'ouest parisien et la proximité de Garches, Vaucresson, Ville-d’Avray et Versailles garantissent une logistique fluide et réactive.
                 </p>
               </div>
               <div className="pt-8 shadow-sm">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic font-display"
                 >
                   Organiser un transfert professionnel
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform italic shadow-sm" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm px-4 shadow-2xl italic font-display italic shadow-sm text-brand-900">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display px-4 shadow-sm italic font-display shadow-sm italic shadow-sm">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline-offset-4 shadow-sm italic">Des formules sur mesure</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic shadow-brand-900/5">
            {[
              {
                name: "Économique",
                desc: "Manutention et transport assurés par nos experts, vous gérez la mise en carton à votre rythme.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Une solution équilibrée incluant la protection du mobilier fragile et des pièces spécifiques.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Accompagnement premium pour déléguer la préparation, l'emballage et toute l'organisation logistique.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic shadow-brand-900/10 font-display">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6 italic shadow-sm hover:scale-110 transition-transform" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 px-4 uppercase italic shadow-sm font-display">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 px-4 italic underline-offset-2 font-display">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors px-4 italic shadow-sm font-display group"
                >
                  Détails <ArrowRight size={14} className="italic shadow-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center italic font-display px-4 shadow-sm italic font-display shadow-sm">
             <Link 
              to="/formules-demenagement" 
              className="inline-flex items-center gap-4 bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-2xl group shadow-brand-900/20 italic font-display"
             >
               Comparer les formules <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform italic shadow-sm" />
             </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 italic shadow-2xl overflow-hidden italic font-display shadow-inner">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-sm italic font-display">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/10 transition-transform hover:scale-[1.01]">
               <img src="/images/location-monte-meuble-idf.jpg" alt="Solution monte-meuble Marnes-la-Coquette pour mobilier lourd et accès maison" className="w-full h-full object-cover font-display italic shadow-sm" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display underline-offset-4 italic">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm">Volume & Monte-meuble à Marnes</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-2 text-brand-900">
                 <p>
                    Certains projets à Marnes-la-Coquette — qu'il s'agisse de propriétés de prestige ou de résidences — demandent une étude attentive du volume et des accès (portails, allées, jardins, escaliers, garages).
                 </p>
                 <p>
                    Pour le mobilier volumineux ou les objets lourds, un monte-meuble peut être une solution technique à envisager selon la faisabilité de l'adresse et l'accès depuis la rue. Nous évaluons vos contraintes de stationnement pour une intervention fluide.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic font-display">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic shadow-brand-900/10 font-display underline underline-offset-4"
                  >
                    Étudier l'option monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic shadow-sm" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculer votre volume avant de demander un devis */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl underline-offset-4 italic shadow-black/40 italic font-display italic">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic shadow-accent/20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm px-4 italic font-display shadow-sm font-display">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 shadow-sm font-display italic font-display italic shadow-sm">
             <div className="lg:w-2/3 space-y-8 italic px-4 font-display italic shadow-smText text-white">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic shadow-sm text-white underline-offset-8">Estimez le volume de votre déménagement</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 italic underline-offset-4 shadow-sm font-display">
                  Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et pièces principales. Cette estimation indicative sera affinée avec nos experts selon la configuration de votre bien à Marnes-la-Coquette.
                </p>
                <div className="pt-4 shadow-sm px-4 shadow-white/10 transition-transform hover:scale-105 italic">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic shadow-sm shadow-accent/20"
                  >
                    Utiliser le calculateur de volume
                    <Calculator size={20} className="group-hover:rotate-12 transition-transform italic shadow-sm" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3 flex justify-center shadow-sm px-4 italic font-display italic font-display italic shadow-sm">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden italic shadow-2xl shadow-black/20">
                    <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 italic"></div>
                    <Box size={100} className="text-accent group-hover:scale-110 transition-transform duration-700 font-display italic shadow-sm italic shadow-2xl shadow-accent/40" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic font-display shadow-sm shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4 shadow-sm italic font-display shadow-sm font-display italic shadow-sm">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight shadow-sm px-4 uppercase tracking-tighter italic">Notre méthode en 4 étapes</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 shadow-sm px-4 shadow-sm italic font-display shadow-sm">Une organisation maîtrisée pour votre installation à Marnes-la-Coquette.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 shadow-brand-900/5 italic font-display italic shadow-sm px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 shadow-sm font-display italic shadow-brand-900/10">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-2xl shadow-brand-900/5"></div>
             {[
               { id: "01", title: "Analyse projet", desc: "Étude globale de votre volume, de vos adresses et de votre calendrier spécifique." },
               { id: "02", title: "Audit technique", desc: "Évaluation du volume, des moyens logistiques et des accès au 92." },
               { id: "03", title: "Planification", desc: "Choix de la formule, réservation des équipes et préparation du matériel de protection." },
               { id: "04", title: "Intervention", desc: "Manutention experte et transport hautement sécurisé vers votre nouveau domicile." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-transform hover:-translate-y-2 duration-300 italic shadow-sm font-display italic shadow-md">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all font-display italic shadow-brand-900/5 transition-transform italic shadow-sm shadow-brand-900/10">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight px-4 uppercase tracking-tighter shadow-sm font-display italic">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 px-4 shadow-sm italic font-display">{step.desc}</p>
               </div>
             ))}
           </div>
           <div className="mt-16 text-center italic font-display px-4">
              <p className="text-slate-400 text-sm max-w-2xl mx-auto italic">
                Une méthode claire pour préparer votre déménagement à Marnes-la-Coquette, adapter les moyens nécessaires et choisir le niveau d’accompagnement correspondant à votre situation.
              </p>
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches de Marnes-la-Coquette */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 italic font-display shadow-sm shadow-brand-900/5 underline-offset-4">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/10 italic shadow-sm font-display italic">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/10 italic font-display">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic shadow-accent/20">Paris Ouest & Hauts-de-Seine</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase tracking-tighter italic shadow-sm">Autres secteurs proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display shadow-sm underline-offset-2">
                Marne Transdem assure votre mobilité dans les communes résidentielles de l'ouest parisien.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 shadow-brand-900/5 italic font-display shadow-sm underline-offset-4 italic">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm px-4 shadow-sm italic shadow-sm font-display italic">
                Tous les secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm italic shadow-sm underline underline-offset-4 italic" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 shadow-brand-900/10 italic font-display shadow-sm font-display italic shadow-sm">
            {[
              { name: "Garches", link: "/demenagement-garches" },
              { name: "Vaucresson", link: "/demenagement-vaucresson" },
              { name: "Ville-d’Avray", link: "/demenagement-ville-d-avray" },
              { name: "Saint-Cloud", link: "/demenagement-saint-cloud" },
              { name: "Versailles", link: "/demenagement-versailles" },
              { name: "Viroflay", link: "/demenagement-viroflay" },
              { name: "Le Chesnay", link: "/demenagement-le-chesnay-rocquencourt" },
              { name: "Suresnes", link: "/demenagement-suresnes" },
              { name: "Rueil", link: "/demenagement-rueil-malmaison" },
              { name: "Boulogne", link: "/demenagement-boulogne-billancourt" },
              { name: "92 / HDS", link: "/demenagement-hauts-de-seine" },
              { name: "IDF / Région", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-colors group shadow-sm active:scale-95 transition-all shadow-brand-900/10 italic font-display shadow-sm shadow-brand-900/5"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic font-display shadow-sm leading-tight">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 shadow-sm transition-colors" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 shadow-brand-900/10 italic shadow-sm font-display">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase tracking-tighter shadow-sm font-display italic leading-tight">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 shadow-sm" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic shadow-brand-900/10 italic shadow-md">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/20 italic font-display shadow-sm px-4 shadow-2xl underline-offset-4 italic">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/10 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 shadow-brand-900/20 font-display italic shadow-brand-900/5 shadow-brand-900/5 italic px-4 shadow-2xl text-brand-900">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/40 italic font-display font-display italic shadow-sm italic shadow-accent/20 shadow-md"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 shadow-brand-900/20 font-display italic shadow-sm underline-offset-4 italic">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm underline-offset-4 italic font-display uppercase italic text-brand-900 underline-offset-8">
                Vous préparez un déménagement à Marnes-la-Coquette ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display italic font-display italic shadow-sm text-slate-500">
                Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm underline-offset-4 font-display italic shadow-sm font-display italic shadow-sm underline-offset-4 italic px-4 shadow-2xl">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/20 shadow-brand-900/10 transition-transform font-display italic shadow-sm italic shadow-sm shadow-brand-900/30 italic shadow-sm italic transition-transform group-hover:translate-y-[-2px]"
                >
                  Demander mon devis gratuit
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform italic font-display italic shadow-sm italic shadow-sm" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/10 italic shadow-sm font-display italic shadow-sm italic shadow-sm italic transition-transform hover:translate-y-[-2px]"
                >
                  <Phone size={20} className="shadow-sm font-display shadow-sm font-display shadow-sm italic shadow-sm underline" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 shadow-brand-900/10 italic font-display shadow-sm font-display italic underline-offset-4 shadow-inner">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/20 font-display italic shadow-sm font-display italic shadow-sm underline-offset-4">
          <div className="max-w-4xl mx-auto space-y-12 px-4 shadow-sm shadow-brand-900/20 italic px-4 shadow-2xl font-display shadow-brand-900/10 italic shadow-sm font-display italic font-display shadow-sm shadow-brand-900/10">
            <div className="text-center mb-16 shadow-sm shadow-brand-900/10 italic font-display italic font-display italic shadow-sm uppercase underline-offset-8 italic text-brand-900">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display italic font-display underline-offset-4 italic underline shadow-accent/20">Questions Fréquentes</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 underline-offset-4 italic font-display font-display font-display italic uppercase shadow-sm text-brand-900">Marnes-la-Coquette & Mobilité</h2>
               <p className="text-slate-500 font-medium italic opacity-80 shadow-sm italic font-display underline-offset-4 italic font-display italic underline shadow-sm italic underline-offset-8">Tout savoir pour votre installation dans cette commune privilégiée.</p>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/10 italic font-display shadow-sm italic font-display italic font-display shadow-sm shadow-brand-900/10 italic shadow-md">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-sm font-display italic shadow-sm shadow-brand-900/10 italic shadow-sm font-display italic shadow-sm group">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm font-display font-display shadow-sm italic font-display shadow-sm underscore underline-offset-4 italic shadow-sm shadow-brand-900/5 text-brand-900">
                    <CheckCircle2 className="text-accent shrink-0 italic shadow-sm font-display italic shadow-sm shadow-brand-900/10 group-hover:scale-110 transition-transform" size={24} />
                    {faq.q}
                   </h3>
                   <div className="pl-10 shadow-sm font-display italic shadow-brand-900/10 shadow-sm font-display italic font-display shadow-sm italic shadow-sm font-display">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/10 shadow-sm font-display shadow-brand-900/10 italic font-display italic shadow-sm underscore underline-offset-4 italic shadow-sm opacity-80">
                        {faq.a}
                      </p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. Maillage interne final */}
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/40 font-display italic shadow-sm font-display italic font-display shadow-sm shadow-black/20 italic font-display italic">
        <div className="container mx-auto px-4 md:px-6 shadow-sm shadow-brand-900/40 font-display italic font-display shadow-sm font-display italic font-display shadow-sm shadow-black/40 italic font-display italic shadow-sm">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display italic shadow-sm">
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm font-display italic shadow-sm font-display italic shadow-sm font-display italic shadow-sm font-display italic shadow-sm font-display italic shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display italic shadow-sm underline shadow-sm italic">Solutions</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic shadow-sm font-display italic shadow-sm italic shadow-sm font-display italic">
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Entreprises</Link></li>
                  <li><Link to="/garde-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Monte-meuble</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic shadow-sm underline italic">Déménager au 92</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic shadow-sm font-display italic shadow-sm font-display">
                  <li><Link to="/demenagement-garches" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none underline italic">Garches</Link></li>
                  <li><Link to="/demenagement-vaucresson" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Vaucresson</Link></li>
                  <li><Link to="/demenagement-ville-d-avray" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Ville-d’Avray</Link></li>
                  <li><Link to="/demenagement-le-chesnay-rocquencourt" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Le Chesnay</Link></li>
                  <li><Link to="/demenagement-saint-cloud" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Saint-Cloud</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic shadow-sm font-display italic shadow-sm font-display shadow-sm underline-offset-4 shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic shadow-sm font-display italic underline tracking-[0.2em]">Outils & Proximité</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display shadow-sm font-display shadow-sm font-display italic shadow-sm font-display italic shadow-sm">
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none underline italic">Calculateur</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none italic">Formules</Link></li>
                  <li><Link to="/demenagement-versailles" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none italic">Versailles</Link></li>
                  <li><Link to="/demenagement-rueil-malmaison" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none italic shadow-sm font-display underline-offset-4 italic shadow-sm">Rueil</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm font-display italic shadow-sm font-display italic shadow-sm font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic underline shadow-sm italic">Contact</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display shadow-sm font-display shadow-sm font-display italic shadow-sm italic font-display italic shadow-sm font-display italic">
                  <li><Link to="/devis-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none underline italic">Demander un devis</Link></li>
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic">Île-de-France</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic shadow-sm font-display underline-offset-4 italic shadow-sm underline font-display">Contactez-nous</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only font-display italic font-display shadow-sm font-display italic font-display shadow-sm font-display italic font-display shadow-sm font-display font-display italic font-display shadow-sm font-display italic font-display underline shadow-sm italic font-display italic">
        <p>
          Marne Transdem, expert du déménagement à Marnes-la-Coquette (92430) et Hauts-de-Seine, vous accompagne pour tous vos projets : transfert de bureaux, déménagement d'entreprises, déménagement particuliers, maison, villa de standing, pavillon, appartement familial, résidence, location monte-meuble et garde-meuble. Devis gratuit pour professionnels et particuliers. Proximité Garches, Vaucresson, Ville-d’Avray, Saint-Cloud, Versailles, Le Chesnay-Rocquencourt, La Celle-Saint-Cloud, Bougival, Rueil-Malmaison, Paris ouest. Estimation volume, protection meubles de valeur, emballage cartons et transport hautement sécurisé.
        </p>
      </div>
    </div>
  );
};

export default LocalMarnesLaCoquette;
