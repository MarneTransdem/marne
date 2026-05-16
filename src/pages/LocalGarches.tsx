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
  Trees,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalGarches: React.FC = () => {
  const path = "/demenagement-garches";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Garches ?",
      a: "Un déménagement à Garches demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Selon qu’il s’agit d’une maison, d’un appartement ou d’un local professionnel, il est important d’évaluer les caves, garages, parkings, jardins, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Garches et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Garches et dans les secteurs proches comme Saint-Cloud, Vaucresson, Marnes-la-Coquette, Ville-d’Avray, Le Chesnay-Rocquencourt, Rueil-Malmaison, Suresnes, La Celle-Saint-Cloud, Bougival, Boulogne-Billancourt et plus largement en Île-de-France selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Garches ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Garches ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Garches ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Garches | Marne Transdem" 
        description="Préparez votre déménagement à Garches avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Garches", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display">
        <div className="absolute inset-0 bg-[url('/images/demenagement-garches-92.jpg')] bg-cover bg-center opacity-20"></div>
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
                Déménagement <span className="text-accent underline-offset-4">Garches</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-80 font-display">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Garches, avec une organisation adaptée aux maisons, appartements, résidences, bureaux, commerces et contraintes d’accès de l’ouest parisien.
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
            <span className="text-brand-900 font-black italic">Garches</span>
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
                Votre déménagement à Garches
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic font-display">
                <p>
                  Garches est une ville résidentielle, familiale et recherchée des Hauts-de-Seine, offrant un cadre de vie privilégié en Île-de-France. Située à proximité immédiate de Saint-Cloud, Vaucresson, Marnes-la-Coquette, Le Chesnay-Rocquencourt et Ville-d’Avray, elle est également proche de Rueil-Malmaison, Suresnes, La Celle-Saint-Cloud et Bougival, tout en restant facilement accessible depuis Paris ouest.
                </p>
                <p>
                  Marne Transdem accompagne les déménagements à Garches pour les particuliers et les entreprises. Qu'il s'agisse de maisons spacieuses, de pavillons individuels, d'appartements familiaux ou de studios en résidence, nous maîtrisons les contraintes d'accès locales. Nous organisons également les transferts professionnels pour les bureaux, commerces, cabinets professionnels et professions libérales.
                </p>
                <p>
                  Nos équipes assurent une prestation complète : estimation du volume, protection des meubles, emballage soigné et gestion rigoureuse des accès d'immeubles, ascenseurs, escaliers et stationnement. Que vous déménagiez vers une autre ville des Hauts-de-Seine ou que vous prépariez une installation à Garches, nous vous proposons un devis personnalisé adapté à vos besoins.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Garches (92380)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Trees className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Cadre de vie premium</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-garches-92.jpg" 
                  alt="Déménagement Garches 92 - Service premium Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Garches demande une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase px-4 italic">Réussir son installation à Garches</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 px-4 italic font-display">
            Ville résidentielle proche de Paris ouest, Garches impose une logistique précise pour garantir la sécurité de vos biens.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic shadow-sm">
            {[
              {
                title: "Volumes Importants",
                desc: "Gestion des maisons, pavillons et logements familiaux avec caves, garages et jardins nécessitant un inventaire exhaustif.",
                icon: Home
              },
              {
                title: "Logistique Accès",
                desc: "Anticipation des rues résidentielles, des halls, des ascenseurs limités ou des escaliers selon la configuration de l'immeuble.",
                icon: Truck
              },
              {
                title: "Protection Premium",
                desc: "Emballage spécifique pour le mobilier familial, la vaisselle, les livres, les tableaux et les objets de valeur.",
                icon: Package
              },
              {
                title: "Secteur Professionnel",
                desc: "Transfert de bureaux, cabinets et commerces organisés avec méthode pour assurer votre continuité d'activité.",
                icon: Building2
              },
              {
                title: "Solutions de Levage",
                desc: "Option monte-meuble à étudier pour les meubles volumineux selon les accès et la faisabilité technique de l'adresse.",
                icon: ArrowUpCircle
              },
              {
                title: "Garde-Meuble Sécurisé",
                desc: "Solutions de stockage temporaire en cas de transition, travaux ou décalage de dates immobilières.",
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

      {/* 4. Nos services de déménagement à Garches */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 px-4 text-white font-display italic">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase underline-offset-4">Nos services à Garches</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto italic font-medium opacity-80 text-slate-300 shadow-sm">L'expertise Marne Transdem pour les résidents et entreprises du 92.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display shadow-2xl shadow-black/20">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Maisons, pavillons, appartements, résidences et logements familiaux.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement d'entreprises",
                desc: "Bureaux, commerces, cabinets, indépendants et professions libérales.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble / stockage",
                desc: "Solution utile pendant une transition immobilière, des travaux ou un décalage de dates.",
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
                desc: "Protection des meubles, objets fragiles, cartons, vaisselle et effets personnels.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons et matériel",
                desc: "Préparation efficace avec du matériel professionnel adapté.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules de déménagement",
                desc: "Économique, Standard, Luxe : des offres adaptées à votre budget.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de volume",
                desc: "Estimation indicative pour affiner votre étude personnalisée avant devis.",
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

      {/* 5. Déménagement de particuliers à Garches */}
      <section className="py-24 bg-white font-display italic overflow-hidden px-4 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center italic shadow-sm">
            <div className="lg:w-1/2 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10 italic">
                  <img 
                    src="/images/camion-demenagement-val-de-marne.jpg" 
                    alt="Déménagement particuliers Garches" 
                    className="w-full h-full object-cover shadow-sm"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic shadow-accent/40"></div>
            </div>
            <div className="lg:w-1/2 space-y-8 px-4 font-display italic shadow-sm">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm">Maisons & Appartements familiaux</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display">
                <p>
                  Marne Transdem accompagne les familles et les particuliers pour leurs déménagements à Garches. Que vous habitiez une maison avec jardin, un pavillon individuel ou un appartement en résidence, nous adaptons nos moyens logistiques à votre environnement.
                </p>
                <p>
                  De Garches vers Paris, ou d'une destination longue distance vers Garches, nous prenons en charge le tri, l'emballage des cartons, la protection spécifique des objets fragiles (vaisselle, tableaux, livres) et la manutention de vos meubles volumineux. Nous gérons les accès complexes (étages sans ascenseur, caves, garages, parkings) pour une installation sereine dans votre nouveau lieu de vie.
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

      {/* 6. Déménagement d'entreprises à Garches */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm px-4 italic font-display">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic font-display shadow-sm">
             <div className="lg:w-1/2 shadow-sm italic">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic">
                  <img src="/images/transfert-bureaux-entreprise-paris.jpg" alt="Déménagement Entreprise et transfert de bureaux Garches" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic shadow-sm">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm italic">Transferts de Bureaux & Commerces</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-2">
                 <p>
                    Transfert industriel ou mobilité de bureaux : nous intervenons auprès des professionnels de Garches (PME, cabinets, commerçants, indépendants) pour assurer le déménagement de leurs locaux professionnels.
                 </p>
                 <p>
                    Mobilier de bureau, archives, matériel informatique et stocks : nous planifions chaque intervention pour minimiser l'impact sur votre continuité d'activité. Notre proximité avec Saint-Cloud, Vaucresson, Marnes-la-Coquette et Rueil-Malmaison facilite l'organisation logistique de vos transferts dans l'ouest parisien.
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
                desc: "Manutention et transport assurés par nos équipes, vous préparez vos cartons selon votre rythme.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Une solution équilibrée incluant la protection des objets fragiles et de certains meubles selon vos besoins.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Accompagnement complet pour déléguer la préparation, l'emballage et l'organisation de votre déménagement.",
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
               <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Logistique à Garches" className="w-full h-full object-cover font-display italic shadow-sm" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display underline-offset-4 italic">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm" id="volume-garches">Volume & Monte-meuble à Garches</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-2 text-brand-900">
                 <p>
                    Certains déménagements à Garches — que ce soit pour des maisons, des pavillons ou des appartements en étage — nécessitent une étude attentive du volume et des accès (ascenseurs étroits, escaliers abrupts, halls d'immeuble, caves, garages).
                 </p>
                 <p>
                    Pour les meubles volumineux ou les configurations d'accès complexes, un monte-meuble peut être une solution technique pertinente selon la faisabilité de votre adresse et l'accès depuis la rue ou la cour. Nous évaluons également vos besoins en stationnement et les spécificités de votre résidence.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic font-display">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic shadow-brand-900/10 font-display underline underline-offset-4"
                  >
                    Voir l'offre monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic shadow-sm" />
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
                  Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation reste indicative et pourra être affinée selon les accès et les caractéristiques de votre projet à Garches.
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
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-700 font-display italic shadow-sm italic shadow-2xl shadow-accent/40" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic font-display shadow-sm shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4 shadow-sm italic font-display shadow-sm font-display italic shadow-sm">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight shadow-sm px-4 uppercase tracking-tighter italic">Notre méthode en 4 étapes</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 shadow-sm px-4 shadow-sm italic font-display shadow-sm">Un accompagnement structuré pour votre déménagement à Garches.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 shadow-brand-900/5 italic font-display italic shadow-sm px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 shadow-sm font-display italic shadow-brand-900/10">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-2xl shadow-brand-900/5"></div>
             {[
               { id: "01", title: "Analyse projet", desc: "Étude globale de votre volume, de vos adresses et de votre calendrier." },
               { id: "02", title: "Audit technique", desc: "Évaluation du volume, des moyens logistiques et des accès au 92." },
               { id: "03", title: "Organisation", desc: "Choix de la formule, planification des équipes et préparation du matériel." },
               { id: "04", title: "Réalisation", desc: "Manutention experte et transport sécurisé vers votre nouveau lieu." }
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
                Une méthode claire pour préparer votre déménagement à Garches, adapter les moyens nécessaires et choisir le niveau d’accompagnement correspondant à votre situation.
              </p>
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches de Garches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 italic font-display shadow-sm shadow-brand-900/5 underline-offset-4">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/10 italic shadow-sm font-display italic">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/10 italic font-display">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic shadow-accent/20">Paris Ouest & Hauts-de-Seine</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase tracking-tighter italic shadow-sm">Autres secteurs proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display shadow-sm underline-offset-2">
                Marne Transdem assure votre mobilité dans tout l'ouest parisien et les Yvelines limitrophes.
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
              { name: "Saint-Cloud", link: "/demenagement-saint-cloud" },
              { name: "Vaucresson", link: "/demenagement-vaucresson" },
              { name: "Marnes-la-Coquette", link: "/demenagement-marnes-la-coquette" },
              { name: "Ville-d’Avray", link: "/demenagement-ville-d-avray" },
              { name: "Le Vésinet", link: "/demenagement-le-vesinet" },
              { name: "Rueil-Malmaison", link: "/demenagement-rueil-malmaison" },
              { name: "Suresnes", link: "/demenagement-suresnes" },
              { name: "Le Chesnay", link: "/demenagement-le-chesnay-rocquencourt" },
              { name: "La Celle-Saint-Cloud", link: "/demenagement-la-celle-saint-cloud" },
              { name: "Louveciennes", link: "/demenagement-louveciennes" },
              { name: "Bougival", link: "/demenagement-bougival" },
              { name: "Marly-le-Roi", link: "/demenagement-marly-le-roi" },
              { name: "Le Pecq", link: "/demenagement-le-pecq" },
              { name: "Boulogne", link: "/demenagement-boulogne-billancourt" },
              { name: "Levallois", link: "/demenagement-levallois-perret" },
              { name: "Versailles", link: "/demenagement-versailles" },
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
                Vous préparez un déménagement à Garches ?
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
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 underline-offset-4 italic font-display font-display font-display italic uppercase shadow-sm text-brand-900">Garches & Mobilité</h2>
               <p className="text-slate-500 font-medium italic opacity-80 shadow-sm italic font-display underline-offset-4 italic font-display italic underline shadow-sm italic underline-offset-8">Tout savoir pour votre installation dans les Hauts-de-Seine.</p>
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
                  <li><Link to="/demenagement-saint-cloud" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none underline italic">Saint-Cloud</Link></li>
                  <li><Link to="/demenagement-louveciennes" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Louveciennes</Link></li>
                  <li><Link to="/demenagement-vaucresson" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Vaucresson</Link></li>
                  <li><Link to="/demenagement-marnes-la-coquette" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic font-bold">Marnes-la-Coquette</Link></li>
                  <li><Link to="/demenagement-ville-d-avray" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Ville-d’Avray</Link></li>
                  <li><Link to="/demenagement-rueil-malmaison" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none italic">Rueil-Malmaison</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic shadow-sm font-display italic shadow-sm font-display shadow-sm underline-offset-4 shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic shadow-sm font-display italic underline tracking-[0.2em]">Outils & Proximité</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display shadow-sm font-display shadow-sm font-display italic shadow-sm font-display italic shadow-sm">
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none underline italic">Calculateur</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none italic">Formules</Link></li>
                  <li><Link to="/demenagement-suresnes" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none italic">Suresnes</Link></li>
                  <li><Link to="/demenagement-boulogne-billancourt" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none italic shadow-sm font-display underline-offset-4 italic shadow-sm">Boulogne</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm font-display italic shadow-sm font-display italic shadow-sm font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic underline shadow-sm italic">Contact</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display shadow-sm font-display shadow-sm font-display italic shadow-sm italic font-display italic shadow-sm font-display italic">
                  <li><Link to="/devis-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none underline italic">Demander un devis</Link></li>
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic">Île-de-France</Link></li>
                  <li><Link to="/demenagement-nogent-sur-marne" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic">Nogent-sur-Marne (proche)</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic shadow-sm font-display underline-offset-4 italic shadow-sm underline font-display">Contactez-nous</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only font-display italic font-display shadow-sm font-display italic font-display shadow-sm font-display italic font-display shadow-sm font-display font-display italic font-display shadow-sm font-display italic font-display underline shadow-sm italic font-display italic">
        <p>
          Marne Transdem, expert du déménagement à Garches (92380) et Hauts-de-Seine, vous accompagne pour tous vos projets : transfert de bureaux Garches, déménagement d'entreprises, déménagement particuliers, maison, pavillon, appartement, studio, résidence, location monte-meuble et garde-meuble. Devis gratuit pour professionnels et particuliers. Proximité Saint-Cloud, Vaucresson, Marnes-la-Coquette, Ville-d’Avray, Rueil-Malmaison, Suresnes, La Celle-Saint-Cloud, Bougival, Boulogne-Billancourt, Paris ouest. Estimation volume, protection meubles, emballage cartons et transport sécurisé.
        </p>
      </div>
    </div>
  );
};

export default LocalGarches;
