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
  Clock,
  Phone,
  FileText,
  MapPin,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalChatillon: React.FC = () => {
  const path = "/demenagement-chatillon";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Châtillon ?",
      a: "Un déménagement à Châtillon demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Dans une ville dense et proche de Paris, il est important d'évaluer les accès de l'immeuble, les caves, les parkings et les meubles volumineux. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Châtillon et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Châtillon et dans les secteurs proches comme Montrouge, Malakoff, Clamart, Bagneux, Fontenay-aux-Roses, Vanves, Paris 14e, Paris 15e et plus largement dans les Hauts-de-Seine selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Châtillon ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Châtillon ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Châtillon ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Déménagement Châtillon | Marne Transdem" 
        description="Préparez votre déménagement à Châtillon avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Châtillon", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/demenagement-paris-intra-muros.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6 text-white">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent uppercase font-black tracking-widest text-sm italic">Déménagement local</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
                Déménagement <span className="text-accent">Châtillon</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Châtillon, avec une organisation adaptée aux appartements, maisons et commerces du sud parisien.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-accent text-brand-900 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group"
                >
                  Demander un devis gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <Phone size={20} className="text-accent" />
                  {CONTACT.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-4">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
            <span className="mx-3 text-slate-200">/</span>
            <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors">Secteurs</Link>
            <span className="mx-3 text-slate-200">/</span>
            <span className="text-brand-900">Déménagement Châtillon</span>
          </nav>
        </div>
      </div>

      {/* 2. Introduction locale */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">
                Votre déménagement à Châtillon
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  Châtillon est une ville résidentielle, urbaine et familiale des Hauts-de-Seine, située à proximité immédiate de Montrouge, Malakoff, Clamart, Bagneux, Fontenay-aux-Roses, Vanves, Paris 14e et Paris 15e. Ce secteur dense du sud parisien demande une préparation rigoureuse des accès et de la logistique.
                </p>
                <p>
                  Marne Transdem accompagne vos projets à Châtillon, qu'il s'agisse d'un appartement en résidence urbaine, d'un studio, d'une maison ou d'un logement familial spacieux. Nous maîtrisons les contraintes d'accès propres aux immeubles avec étages (halls, ascenseurs, escaliers) et anticipons les besoins en stationnement dans ces quartiers souvent fréquentés.
                </p>
                <p>
                  Pour les professionnels, nous organisons les transferts de bureaux, commerces, cabinets et agences de professions libérales à Châtillon, avec une rigueur garantissant la continuité de votre activité locale.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
                  <MapPin className="text-accent" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs">Châtillon (92320)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
                  <ShieldCheck className="text-brand-900" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs">Service Premium</span>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
                <img 
                  src="/images/demenagement-appartement-92.jpg" 
                  alt="Déménagement Châtillon" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Châtillon demande une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight">Pourquoi un déménagement à Châtillon demande une bonne préparation</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium">
            Ville urbaine et résidentielle, Châtillon présente des caractéristiques qui nécessitent une logistique parfaitement huilée.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Logistique Urbaine",
                desc: "La densité de Châtillon et sa proximité avec Paris imposent une anticipation précise du stationnement et des flux de circulation le jour J.",
                icon: Truck
              },
              {
                title: "Gestion des Étages",
                desc: "Les résidences châtillonnaises disposent souvent d'escaliers ou d'ascenseurs dont les dimensions doivent être vérifiées pour les meubles volumineux.",
                icon: ArrowUpCircle
              },
              {
                title: "Protection des Halls",
                desc: "La préservation des halls d'entrée, des cages d'escaliers et des parties communes est primordiale pour respecter le voisinage et les règlements.",
                icon: Building2
              },
              {
                title: "Accès de Maison",
                desc: "Pour les maisons individuelles, nous évaluons les accès spécifiques : caves, garages, cours ou jardins pour optimiser la manutention.",
                icon: MapPin
              },
              {
                title: "Meubles Volumineux",
                desc: "L'emballage et la protection spécifique de vos biens volumineux sont assurés pour garantir leur intégrité durant tout le transport.",
                icon: Package
              },
              {
                title: "Solution Monte-Meuble",
                desc: "En cas d'accès complexe par l'intérieur, la solution du monte-meuble extérieur peut être envisagée selon la faisabilité technique à l'adresse.",
                icon: ArrowUpCircle
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors">
                  <item.icon className="text-brand-900 group-hover:text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Châtillon */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative font-display">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-accent opacity-5 skew-x-12 -translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Nos services de déménagement à Châtillon</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto italic font-medium">Une offre complète et sur-mesure pour votre mobilité locale.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Appartements, studios, maisons, résidences et logements familiaux.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement d'entreprises",
                desc: "Bureaux, commerces, cabinets, agences, indépendants et professions libérales.",
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
                desc: "Solution à envisager selon les accès et la faisabilité technique.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage et protection",
                desc: "Protection des meubles, objets fragiles, cartons et effets personnels.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons et matériel",
                desc: "Préparation du déménagement avec du matériel professionnel adapté.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules de déménagement",
                desc: "Économique, Standard, Luxe : trois niveaux d'accompagnement.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de volume",
                desc: "Estimation indicative du volume avant la demande de devis personnalisé.",
                link: "/calculateur-volume",
                icon: Calculator
              }
            ].map((service, idx) => (
              <Link 
                key={idx} 
                to={service.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-brand-900 transition-all group active:scale-[0.98]"
              >
                <service.icon size={32} className="text-accent group-hover:text-brand-900 mb-6" />
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors">
                  Détails <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Châtillon */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1 relative">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02]">
                  <img 
                    src="/images/demenagement-appartement-92.jpg" 
                    alt="Déménagement particuliers Châtillon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 font-display">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">Déménagement de particuliers à Châtillon</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic">
                <p>
                  Marne Transdem accompagne les particuliers (familles, actifs, étudiants, cadres) pour tous les types de déménagement à Châtillon : appartements, studios, maisons ou résidences.
                </p>
                <p>
                  De Châtillon vers Paris, ou de Paris vers Châtillon, nous assurons chaque étape de votre mobilité en Île-de-France ou sur de longues distances. Tri avant déménagement, préparation des cartons, protection des meubles et objets fragiles, manutention complexe et stockage en garde-meuble si besoin : nous adaptons nos moyens à votre logement et à vos accès (ascenseur, cave, garage, parking).
                </p>
              </div>
              <div className="pt-8">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20"
                >
                  Demander mon devis
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Châtillon */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2">
               <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2">
                 <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Déménagement Entreprise Châtillon" className="w-full h-full object-cover rounded-[2.5rem]" />
               </div>
             </div>
             <div className="lg:w-1/2 space-y-8 font-display">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">Déménagement d'entreprises à Châtillon</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic">
                 <p>
                   Nous accompagnons les professionnels de Châtillon (bureaux, entreprises, cabinets, agences, professions libérales, commerces) dans leurs transferts locaux.
                 </p>
                 <p>
                    Transfert de bureaux, mobilier professionnel, archives, matériel informatique : nous gérons la manutention et la logistique urbaine pour assurer la continuité de votre activité. Notre proximité avec Montrouge, Malakoff, Clamart et Paris nous permet une réactivité optimale et une organisation sans faille.
                 </p>
               </div>
               <div className="pt-8">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group"
                 >
                   Organiser un transfert professionnel
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-white relative font-display">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
          <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block italic tracking-[0.2em] opacity-80">Nos Options</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Économique",
                desc: "Vous préparez vos cartons, Marne Transdem assure la manutention et le transport selon le projet.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Une formule équilibrée pour déléguer certains éléments comme les objets fragiles ou certains meubles.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Sérénité totale : nous prenons en charge la majeure partie de la préparation et de l'emballage.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors"
                >
                  Comparer les formules <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
             <Link 
              to="/formules-demenagement" 
              className="inline-flex items-center gap-4 bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-2xl"
             >
               Voir le comparatif complet <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
               <img src="/images/camion-demenagement-val-de-marne.jpg" alt="Logistique à Châtillon" className="w-full h-full object-cover" />
             </div>
             <div className="space-y-8 font-display">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">Volume, accès et monte-meuble à Châtillon</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80">
                 <p>
                    Certains déménagements à Châtillon nécessitent une étude attentive de l'environnement : volume à déménager, étage, hall d'immeuble, cave, garage, parking et stationnement public. 
                 </p>
                 <p>
                    Lorsque le mobilier volumineux ou les objets fragiles ne peuvent être acheminés par les accès intérieurs, nous pouvons envisager le recours à un monte-meuble extérieur, sous réserve de faisabilité technique à votre adresse.
                 </p>
               </div>
               <div className="pt-6">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors"
                  >
                    Solutions monte-meuble <ArrowRight size={18} />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculer votre volume avant de demander un devis */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative font-display italic">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 font-display">
             <div className="lg:w-1/2 space-y-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">Estimez le volume de votre déménagement</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed">
                  Avant de solliciter un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation indicative sera affinée par nos experts selon les accès de votre adresse à Châtillon.
                </p>
                <div className="pt-4 font-display">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group"
                  >
                    Utiliser le calculateur
                    <Calculator size={20} className="ml-3 group-hover:rotate-12 transition-transform" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/2 flex justify-center">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700"></div>
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-700" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24 bg-white font-display">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight">Une méthode claire et structurée</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70">Nous vous accompagnons pas à pas pour votre déménagement à Châtillon.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 font-display italic">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display"></div>
             {[
               { id: "01", title: "Analyse du projet", desc: "Étude de votre besoin, de la destination et du calendrier." },
               { id: "02", title: "Cadrage technique", desc: "Estimation du volume et analyse des accès urbains à Châtillon." },
               { id: "03", title: "Planification", desc: "Choix de la formule, organisation logistique et préparation." },
               { id: "04", title: "Réalisation", desc: "Prise en charge de la manutention et transport sécurisé." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-all duration-300 hover:-translate-y-2">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches de Châtillon */}
      <section className="py-24 bg-slate-50 font-display italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4">
            <div className="lg:w-2/3 space-y-6">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block italic tracking-[0.2em] opacity-80">Maillage Territorial</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">Secteurs proches de Châtillon</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6">
                Nous intervenons dans toute la zone sud des Hauts-de-Seine et à Paris, assurant une prestation de proximité pour les particuliers et les entreprises.
              </p>
            </div>
            <div className="lg:w-1/3">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm">
                Tous nos secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 font-display italic">
            {[
              { name: "Montrouge", link: null },
              { name: "Malakoff", link: null },
              { name: "Clamart", link: "/demenagement-clamart" },
              { name: "Bagneux", link: null },
              { name: "Fontenay", link: null },
              { name: "Vanves", link: "/demenagement-vanves" },
              { name: "Paris 14e", link: "/demenagement-paris-14" },
              { name: "Paris 15e", link: "/demenagement-paris-15" },
              { name: "Issy", link: "/demenagement-issy-les-moulineaux" },
              { name: "Meudon", link: "/demenagement-meudon" },
              { name: "Hauts-de-Seine", link: "/demenagement-92-hauts-de-seine" },
              { name: "Île-de-France", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-colors group shadow-sm active:scale-95 transition-all"
                >
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{city.name}</span>
                  <MapPin size={14} className="text-slate-300" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 font-display">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight">
                Vous préparez un déménagement à Châtillon ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 font-display">
                Décrivez votre projet en quelques clics et recevez une estimation personnalisée tenant compte du volume, des accès et du niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 font-display">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/20"
                >
                  Demander un devis
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-brand-50 text-brand-900 border border-brand-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl"
                >
                  <Phone size={20} />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12 px-4 shadow-sm">
            <div className="text-center mb-16 font-display italic">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] italic block mb-4 italic tracking-[0.2em] opacity-80">Besoin d'informations ?</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight mb-4 tracking-tight leading-tight">FAQ Châtillon</h2>
               <p className="text-slate-500 font-medium italic opacity-80">Retrouvez les réponses aux questions les plus fréquentes pour préparer votre mobilité à Châtillon.</p>
            </div>
            
            <div className="space-y-6">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14">
                      <p className="text-slate-600 leading-relaxed font-medium italic opacity-80">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display">
             <div className="space-y-6 font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80">Services Experts</h4>
                <ul className="space-y-4">
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Déménagement particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Déménagement entreprises</Link></li>
                  <li><Link to="/garde-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Location monte-meuble</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80">Logistique</h4>
                <ul className="space-y-4">
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Calculateur de volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Formules de déménagement</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Emballage et protection</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Cartons et matériel</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80">Missions</h4>
                <ul className="space-y-4">
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Île-de-France</Link></li>
                  <li><Link to="/demenagement-92-hauts-de-seine" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Hauts-de-Seine</Link></li>
                  <li><Link to="/longue-distance" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Longue distance</Link></li>
                  <li><Link to="/secteurs-desservis" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Quartiers desservis</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80">Expertise Sud</h4>
                <ul className="space-y-4">
                  <li><Link to="/demenagement-clamart" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Clamart (proche)</Link></li>
                  <li><Link to="/demenagement-vanves" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Vanves (proche)</Link></li>
                  <li><Link to="/demenagement-issy-les-moulineaux" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Issy (proche)</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Nous contacter</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only">
        <p>
          Marne Transdem, expert du déménagement Châtillon et dans les Hauts-de-Seine (92), vous accompagne pour tous vos projets : transfert de bureaux Châtillon, déménagement appartement en résidence, studio, accès urbain complexe, location monte-meuble et garde-meuble. Devis gratuit pour particuliers et entreprises. Proximité Montrouge, Malakoff, Clamart, Bagneux, Fontenay-aux-Roses, Vanves, Paris 14e et Paris 15e.
        </p>
      </div>
    </div>
  );
};

export default LocalChatillon;
