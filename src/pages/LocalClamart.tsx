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

const LocalClamart: React.FC = () => {
  const path = "/demenagement-clamart";

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Déménagement Clamart | Marne Transdem" 
        description="Préparez votre déménagement à Clamart avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Clamart", item: path }
          ]),
          getFAQSchema([
            {
              q: "Comment organiser un déménagement à Clamart ?",
              a: "Un déménagement à Clamart demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Pour une maison ou un logement familial, il est important d'évaluer précisément les meubles, les cartons, les caves, les garages et les accès. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
            },
            {
              q: "Marne Transdem intervient-elle à Clamart et dans les villes proches ?",
              a: "Oui, Marne Transdem accompagne les projets de déménagement à Clamart et dans les secteurs proches comme Meudon, Issy-les-Moulineaux, Vanves, Châtillon, Malakoff, Fontenay-aux-Roses, Le Plessis-Robinson, Vélizy-Villacoublay, Paris 15e et plus largement dans les Hauts-de-Seine selon les besoins du projet."
            },
            {
              q: "Peut-on demander un monte-meuble à Clamart ?",
              a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
            },
            {
              q: "Quelle formule choisir pour un déménagement à Clamart ?",
              a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
            },
            {
              q: "Comment obtenir un devis pour un déménagement à Clamart ?",
              a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
            }
          ])
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
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent uppercase font-black tracking-widest text-sm italic">Déménagement local</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                Déménagement <span className="text-accent">Clamart</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Clamart, avec une organisation adaptée aux appartements, maisons, résidences, bureaux et commerces du sud-ouest parisien.
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
            <span className="text-brand-900">Déménagement Clamart</span>
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
                Votre déménagement à Clamart
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  Ville résidentielle et familiale très prisée des Hauts-de-Seine, Clamart offre un cadre de vie privilégié à proximité immédiate de Paris 15e, Meudon, Issy-les-Moulineaux, Vanves, Châtillon, Malakoff, Fontenay-aux-Roses, Le Plessis-Robinson et Vélizy-Villacoublay.
                </p>
                <p>
                  Que vous déménagiez d'un appartement situé dans une résidence moderne, d'un studio d'étudiant ou d'une maison familiale, Marne Transdem assure une prestation sur mesure. Nous prenons en compte les accès spécifiques (escaliers, halls, ascenseurs, caves, parkings, garages, cours ou jardins) pour garantir une manutention fluide et sécurisée.
                </p>
                <p>
                  Pour les professionnels, nous organisons les transferts de bureaux, commerces, cabinets d'agences et locaux de professions libérales à Clamart, avec une rigueur permettant la continuité de votre activité.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
                  <MapPin className="text-accent" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs">Clamart (92140)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
                  <ShieldCheck className="text-brand-900" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs">Services Premium</span>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
                <img 
                  src="/images/demenagement-appartement-92.jpg" 
                  alt="Déménagement Clamart" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Clamart demande une bonne préparation */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 px-4">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight">Pourquoi un déménagement à Clamart demande une bonne préparation</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium">
            Ville résidentielle aux configurations variées, Clamart impose certaines contraintes qu'il convient d'anticiper pour un déménagement serein.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Logements familiaux & Volumes",
                desc: "Clamart abrite de nombreux logements familiaux et maisons. L'estimation du volume (meubles, cartons, cave, garage) est donc une étape cruciale.",
                icon: Home
              },
              {
                title: "Accès et Parties Communes",
                desc: "Les résidences disposent souvent de halls, parkings et parties communes qu'il faut préserver lors du passage des déménageurs.",
                icon: Building2
              },
              {
                title: "Configuration des Immeubles",
                desc: "Ascenseurs limités ou escaliers étroits dans certains quartiers de Clamart peuvent rendre la manutention plus complexe sans équipement adapté.",
                icon: ArrowUpCircle
              },
              {
                title: "Stationnement & Rue",
                desc: "Les accès depuis la rue ou via des parkings souterrains doivent être anticipés pour positionner le camion de déménagement au plus proche.",
                icon: MapPin
              },
              {
                title: "Monte-Meuble",
                desc: "Selon la faisabilité technique (configuration rue/façade), la location d'un monte-meuble peut s'avérer nécessaire pour les biens volumineux.",
                icon: ArrowUpCircle
              },
              {
                title: "Transition & Stockage",
                desc: "En cas de décalage de dates d'entrée, un besoin de garde-meuble temporaire peut surgir pendant vos travaux ou votre transition immobilière.",
                icon: Warehouse
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors">
                  <item.icon className="text-brand-900 group-hover:text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Clamart */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Nos services de déménagement à Clamart</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto italic font-medium">Une offre complète pour tous vos besoins de mobilité locale et nationale.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Maisons, appartements, studios, résidences et logements familiaux.",
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
                desc: "Sert à envisager les accès selon les contraintes et la faisabilité technique.",
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
                desc: "Économique, Standard, Luxe : des services adaptés à chaque budget.",
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
                  En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Clamart */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                   <img src="/images/demenagement-appartement-92.jpg" alt="Déménagement Particulier Clamart" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">Déménagement de particuliers à Clamart</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic">
                <p>
                  Marne Transdem accompagne les particuliers pour tous leurs projets de déménagement d'appartements, de studios, de maisons ou de logements familiaux à Clamart.
                </p>
                <p>
                  Que votre projet soit un déménagement de Clamart vers Paris, de Paris vers Clamart, ou vers n'importe quelle ville d'Île-de-France (voire une destination longue distance), nous vous proposons une organisation rigoureuse. De la préparation des cartons à la protection des meubles et objets fragiles, nous adaptons nos moyens aux accès (ascenseurs, caves, garages, parkings) et au volume estimé.
                </p>
              </div>
              <div className="pt-8">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group"
                >
                  Demander mon devis
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Clamart */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2">
               <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Déménagement Entreprise Clamart" className="w-full h-full object-cover" />
               </div>
             </div>
             <div className="lg:w-1/2 space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight">Déménagement d'entreprises à Clamart</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                 <p>
                   Nous accompagnons les professionnels de Clamart (bureaux, entreprises, cabinets, agences, professions libérales, indépendants, commerces) dans leur transfert d'activité.
                 </p>
                 <p>
                    Transfert de bureaux, mobilier professionnel, archives, matériel informatique : nous gérons la manutention et l'organisation pour assurer la continuité de votre activité. Notre proximité avec Meudon, Issy-les-Moulineaux, Vanves, Châtillon, Malakoff et Paris 15e nous permet d'intervenir rapidement avec une logistique maîtrisée.
                 </p>
               </div>
               <div className="pt-8">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-xl shadow-brand-900/5 transition-all duration-300"
                 >
                   Organiser un transfert professionnel
                   <Building2 className="ml-3" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight italic uppercase tracking-[0.2em] text-sm text-slate-500 mb-2">Nos Options</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight">Formules adaptées à votre projet</h3>
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Économique",
                desc: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport selon le projet.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Une formule équilibrée pour déléguer certains éléments comme les objets fragiles ou certains meubles selon les besoins.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Une formule plus complète pour déléguer davantage de préparation, d'emballage et d'organisation selon la prestation choisie.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all border-t-4 border-t-accent">
                <formula.icon size={40} className="text-accent mb-6" />
                <h4 className="text-2xl font-black text-brand-900 mb-4">{formula.name}</h4>
                <p className="text-slate-600 mb-8 font-medium leading-relaxed italic">{formula.desc}</p>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-[0.2em] text-xs hover:text-accent transition-colors"
                >
                  Détails de la formule <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
             <Link 
              to="/formules-demenagement" 
              className="inline-flex items-center gap-4 bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-2xl"
             >
               Comparer les formules <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl">
               <img src="/images/camion-demenagement-val-de-marne.jpg" alt="Camion de déménagement à Clamart" className="w-full h-full object-cover" />
             </div>
             <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Volume, accès et monte-meuble à Clamart</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic">
                 <p>
                   L'organisation d'un déménagement à Clamart nécessite une étude attentive du volume à déménager ainsi que des accès. Étages, ascenseurs, escaliers étroits, halls d'immeuble, caves, garages ou parkings sont autant de paramètres à intégrer.
                 </p>
                 <p>
                   Le stationnement devant les résidences ou maisons à Clamart doit également être anticipé. Lorsque la configuration technique le permet et que les meubles volumineux ou objets fragiles ne peuvent passer par l'intérieur, nous vous proposerons la location d'un monte-meuble avec technicien.
                 </p>
               </div>
               <div className="pt-6">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors"
                  >
                    Voir nos services monte-meuble <ArrowRight size={18} />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculer votre volume avant de demander un devis */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
             <div className="lg:w-2/3 space-y-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white mb-6">Estimez le volume de votre déménagement</h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                  Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation reste indicative et pourra être affinée selon les accès et les caractéristiques spécifiques de votre projet de déménagement à Clamart.
                </p>
                <div className="pt-4">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group"
                  >
                    Utiliser le calculateur de volume
                    <Calculator className="ml-3 group-hover:rotate-12 transition-transform" size={20} />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3">
                <div className="aspect-square bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent/20 blur-[80px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Calculator size={120} className="text-accent group-hover:scale-110 transition-transform duration-700" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24 bg-white font-display">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight">Une méthode claire pour votre déménagement</h2>
          <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto font-medium italic">Nous préparons chaque étape avec rigueur pour assurer la sécurité de vos biens à Clamart.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
             <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-px bg-slate-100 -z-10"></div>
             {[
               { id: "01", title: "Analyse du projet", desc: "Étude de votre besoin, de la destination et du timing." },
               { id: "02", title: "Évaluation technique", desc: "Indication du volume et analyse des accès spécifiques à Clamart." },
               { id: "03", title: "Organisation", desc: "Choix de la formule, planification et préparation du matériel." },
               { id: "04", title: "Déménagement", desc: "Réalisation de la manutention et du transport sécurisé." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center">
                 <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-4xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight font-display">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm font-medium leading-relaxed italic">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches de Clamart */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight mb-6 italic italic tracking-[0.2em] text-sm text-slate-500 mb-2">Expertise Hauts-de-Seine</h2>
              <h3 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight">Secteurs proches de Clamart</h3>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 font-medium italic italic">
                Nous intervenons dans toute la zone sud-ouest des Hauts-de-Seine, assurant une prestation de proximité pour les particuliers et les entreprises.
              </p>
            </div>
            <div className="lg:w-1/3">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm">
                Tous nos secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Meudon", link: "/demenagement-meudon" },
              { name: "Issy-les-Moulineaux", link: "/demenagement-issy-les-moulineaux" },
              { name: "Vanves", link: null },
              { name: "Louveciennes", link: "/demenagement-louveciennes" },
              { name: "Vaucresson", link: "/demenagement-vaucresson" },
              { name: "Châtillon", link: null },
              { name: "Malakoff", link: null },
              { name: "Fontenay-aux-Roses", link: null },
              { name: "Le Plessis-Robinson", link: "/demenagement-le-plessis-robinson" },
              { name: "Vélizy", link: "/demenagement-velizy-villacoublay" },
              { name: "Paris 15e", link: "/demenagement-paris-15" },
              { name: "Hauts-de-Seine", link: "/demenagement-92-hauts-de-seine" },
              { name: "Île-de-France", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-colors group"
                >
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{city.name}</span>
                  <MapPin size={14} className="text-slate-300" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/5 opacity-50 -z-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="max-w-3xl mx-auto space-y-10 relative z-10">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight">
                Vous préparez un déménagement à Clamart ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
                Décrivez votre projet et recevez une estimation personnalisée adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl shadow-brand-900/20 active:scale-95 group flex items-center justify-center gap-3"
                >
                  Demander mon devis gratuit
                  <FileText className="group-hover:rotate-12 transition-transform" size={20} />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                  <Phone size={20} className="text-brand-900" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight mb-4">FAQ Déménagement Clamart</h2>
              <p className="text-slate-500 font-medium italic">Tout ce qu'il faut savoir pour bien préparer votre projet à Clamart.</p>
            </div>
            
            <div className="space-y-6">
              {[
                { 
                  q: "Comment organiser un déménagement à Clamart ?", 
                  a: "Un déménagement à Clamart demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Pour une maison ou un logement familial, il est important d'évaluer précisément les meubles, les cartons, les caves, les garages et les accès. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
                },
                { 
                  q: "Marne Transdem intervient-elle à Clamart et dans les villes proches ?", 
                  a: "Oui, Marne Transdem accompagne les projets de déménagement à Clamart et dans les secteurs proches comme Meudon, Issy-les-Moulineaux, Vanves, Châtillon, Malakoff, Fontenay-aux-Roses, Le Plessis-Robinson, Vélizy-Villacoublay, Paris 15e et plus largement dans les Hauts-de-Seine selon les besoins du projet."
                },
                { 
                  q: "Peut-on demander un monte-meuble à Clamart ?", 
                  a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
                },
                { 
                  q: "Quelle formule choisir pour un déménagement à Clamart ?", 
                  a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
                },
                { 
                  q: "Comment obtenir un devis pour un déménagement à Clamart ?", 
                  a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic">Q</span>
                    {faq.q}
                   </h3>
                   <p className="text-slate-600 leading-relaxed font-medium italic pl-14">
                    {faq.a}
                   </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. Maillage interne final */}
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
             <div className="space-y-6">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest">Nos Services</h4>
                <ul className="space-y-4">
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Déménagement particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Déménagement entreprises</Link></li>
                  <li><Link to="/garde-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Location monte-meuble</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest">Outils & Matériel</h4>
                <ul className="space-y-4">
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Calculateur de volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Formules de déménagement</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Emballage et protection</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Cartons et matériel</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest">Zones & Distances</h4>
                <ul className="space-y-4">
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Déménagement Île-de-France</Link></li>
                  <li><Link to="/demenagement-92-hauts-de-seine" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Déménagement Hauts-de-Seine</Link></li>
                  <li><Link to="/longue-distance" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Déménagement longue distance</Link></li>
                  <li><Link to="/secteurs-desservis" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Tous les secteurs</Link></li>
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest">Expertise Clamart</h4>
                <ul className="space-y-4">
                  <li><Link to="/demenagement-meudon" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic">À Meudon (proche)</Link></li>
                  <li><Link to="/demenagement-issy-les-moulineaux" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic">À Issy (proche)</Link></li>
                  <li><Link to="/demenagement-paris-15" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic">À Paris 15e (proche)</Link></li>
                  <li><Link to="/demenagement-nogent-sur-marne" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic">À Nogent-sur-Marne (proche)</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Nous contacter</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Final SEO Text Paragraph for Semantic Richness */}
      <div className="sr-only">
        <p>
          Marne Transdem, expert du déménagement Clamart et dans les Hauts-de-Seine, vous accompagne pour tous types de prestations : transfert de bureaux à Clamart, déménagement maison Clamart Sud, appartement Clamart Centre, avec option monte-meuble et garde-meuble. Devis gratuit pour particuliers et professionnels. Proximité Meudon, Issy, Vanves et Vélizy-Villacoublay.
        </p>
      </div>
    </div>
  );
};

export default LocalClamart;
