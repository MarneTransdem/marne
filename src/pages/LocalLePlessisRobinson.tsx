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
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalLePlessisRobinson: React.FC = () => {
  const path = "/demenagement-le-plessis-robinson";

  const faqData = [
    {
      q: "Comment organiser un déménagement au Plessis-Robinson ?",
      a: "Un déménagement au Plessis-Robinson demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Dans une ville résidentielle où l’on trouve aussi bien des appartements que des maisons, il est important d’évaluer les caves, garages, parkings, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle au Plessis-Robinson et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement au Plessis-Robinson et dans les secteurs proches comme Châtenay-Malabry, Clamart, Fontenay-aux-Roses, Sceaux, Antony, Meudon, Verrières-le-Buisson, Vélizy-Villacoublay, Bourg-la-Reine et plus largement dans les Hauts-de-Seine selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble au Plessis-Robinson ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement au Plessis-Robinson ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement au Plessis-Robinson ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Le Plessis-Robinson | Marne Transdem" 
        description="Préparez votre déménagement au Plessis-Robinson avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Le Plessis-Robinson", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display">
        <div className="absolute inset-0 bg-[url('/images/demenagement-paris-intra-muros.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6 shadow-sm">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent uppercase font-black tracking-widest text-sm italic">Déménagement local</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white uppercase italic">
                Déménagement <span className="text-accent underline-offset-4">Le Plessis-Robinson</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-80 font-display">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement au Plessis-Robinson, avec une organisation adaptée aux appartements, maisons, résidences et bureaux du sud des Hauts-de-Seine.
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
            <span className="text-brand-900 font-black italic">Le Plessis-Robinson</span>
          </nav>
        </div>
      </div>

      {/* 2. Introduction locale */}
      <section className="py-24 bg-white overflow-hidden relative shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 font-display italic"
            >
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4">
                Votre déménagement au Plessis-Robinson
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic font-display">
                <p>
                  Le Plessis-Robinson est une ville résidentielle, familiale et recherchée des Hauts-de-Seine, offrant une qualité de vie remarquable à proximité de Châtenay-Malabry, Clamart, Fontenay-aux-Roses, Sceaux, Antony, Meudon et Vélizy-Villacoublay.
                </p>
                <p>
                  Marne Transdem accompagne les déménagements au Plessis-Robinson pour les particuliers et les entreprises. Qu'il s'agisse de résidences récentes, d'appartements spacieux, de maisons de ville ou de pavillons, nous maîtrisons les contraintes d'accès d'immeubles, halls, ascenseurs, escaliers, parkings, caves ou jardins.
                </p>
                <p>
                  Pour les professionnels, nous organisons les transferts de bureaux, commerces, cabinets et agences au Plessis-Robinson ou vers Paris sud, avec une logistique adaptée pour garantir la continuité de votre activité locale.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Le Plessis-Robinson (92350)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <ShieldCheck className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Expertise Locale</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-appartement-92.jpg" 
                  alt="Déménagement Le Plessis-Robinson" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement au Plessis-Robinson demande une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase px-4 italic">Pourquoi organiser votre déménagement au Plessis-Robinson avec soin</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 px-4 italic font-display">
            Ville résidentielle moderne et qualitative, Le Plessis-Robinson impose une logistique précise pour respecter les accès, les parties communes et vos biens fragiles.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic shadow-sm">
            {[
              {
                title: "Résidences Qualitatives",
                desc: "Des habitats récents et soignés nécessitant une protection rigoureuse des halls, ascenseurs et communs.",
                icon: Home
              },
              {
                title: "Accès & Parkings",
                desc: "Gestion des accès souterrains, parkings et zones de stationnement pour une manutention fluide.",
                icon: ArrowUpCircle
              },
              {
                title: "Biens & Fragiles",
                desc: "Emballage technique pour le mobilier familial, écrans, objets de valeur et effets personnels.",
                icon: Package
              },
              {
                title: "Secteur Tertiaire",
                desc: "Transferts de bureaux, agences et commerces organisés avec rigueur pour limiter l'interruption d'activité.",
                icon: Building2
              },
              {
                title: "Manutention experte",
                desc: "Maîtrise des cages d'escalier et des mezzanines pour les meubles volumineux ou pièces spécifiques.",
                icon: ShieldCheck
              },
              {
                title: "Monte-Meuble de ville",
                desc: "Solution extérieure envisageable selon la configuration de la rue et l'étage pour les accès difficiles.",
                icon: ArrowUpCircle
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

      {/* 4. Nos services de déménagement au Plessis-Robinson */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 px-4 text-white font-display italic">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase underline-offset-4">Nos services au Plessis-Robinson</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto italic font-medium opacity-80 text-slate-300 shadow-sm underline-offset-2">Une accompagnement complet pour vos projets de mobilité dans le sud du 92.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Appartements, studios, maisons, pavillons et résidences familiales.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement d'entreprises",
                desc: "Bureaux, commerces, cabinets, agences et indépendants.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble / stockage",
                desc: "Solution temporaire utile pendant une transition ou des travaux.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Location monte-meuble",
                desc: "Étude de faisabilité pour les accès complexes par l'extérieur.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage et protection",
                desc: "Protection premium de vos meubles, objets fragiles et effets personnels.",
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
                desc: "Économique, Standard, Luxe : des solutions sur mesure.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de volume",
                desc: "Estimation indicative pour affiner votre étude tarifaire.",
                link: "/calculateur-volume",
                icon: Calculator
              }
            ].map((service, idx) => (
              <Link 
                key={idx} 
                to={service.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-brand-900 transition-all group active:scale-[0.98] italic font-display shadow-2xl shadow-black/20"
              >
                <service.icon size={32} className="text-accent group-hover:text-brand-900 mb-6 italic shadow-sm" />
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight italic uppercase">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic opacity-80">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors uppercase italic shadow-sm">
                  Détails <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shadow-sm" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers au Plessis-Robinson */}
      <section className="py-24 bg-white font-display italic overflow-hidden px-4 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="flex flex-col lg:flex-row gap-20 items-center italic shadow-sm">
            <div className="lg:w-1/2 order-2 lg:order-1 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10 italic">
                  <img 
                    src="/images/demenagement-appartement-92.jpg" 
                    alt="Déménagement particuliers Le Plessis-Robinson" 
                    className="w-full h-full object-cover shadow-sm transition-all"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic shadow-accent/40"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic shadow-sm">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm">Déménagement de particuliers</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display shadow-sm">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs déménagements au Plessis-Robinson : appartements de standing, résidences récentes, maisons de ville ou pavillons familiaux.
                </p>
                <p>
                  Du Plessis-Robinson vers Paris, ou de Paris vers Le Plessis-Robinson, nous gérons chaque étape de votre mobilité locale ou longue distance. Tri, emballage, protection du mobilier, transport sécurisé et prise en compte des accès (ascenseur, cave, garage, parking) : nos équipes adaptent leurs moyens à votre logement.
                </p>
              </div>
              <div className="pt-8 shadow-sm">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic font-display shadow-2xl"
                >
                  Demander mon devis
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform italic shadow-sm" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises au Plessis-Robinson */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm px-4 shadow-inner italic font-display">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic font-display shadow-sm px-4 shadow-brand-900/5">
             <div className="lg:w-1/2 shadow-sm italic">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic transition-transform hover:scale-[1.02]">
                  <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Déménagement Entreprise Le Plessis-Robinson" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic shadow-sm">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm italic">Déménagement d'entreprises</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-2">
                 <p>
                   Nous intervenons auprès des professionnels du Plessis-Robinson (bureaux, commerces, cabinets, agences) pour leurs transferts et locaux professionnels.
                 </p>
                 <p>
                    Mobilier de bureau, informatique, archives : nous planifions chaque intervention pour garantir la continuité de votre activité au sud des Hauts-de-Seine. Notre expertise couvre également Châtenay-Malabry, Clamart, Sceaux, Antony et Paris 15e/14e.
                 </p>
               </div>
               <div className="pt-8 shadow-sm">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic font-display shadow-2xl"
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
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic font-display italic shadow-sm">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display px-4 shadow-sm italic font-display shadow-sm italic">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline-offset-4 shadow-sm italic">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic shadow-brand-900/5">
            {[
              {
                name: "Économique",
                desc: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention lourde et le transport sécurisé.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Une formule équilibrée pour déléguer l'emballage de vos objets fragiles et la protection de vos meubles.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Une prestation complète pour déléguer la majeure partie de la préparation et de l'organisation logistique.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic shadow-brand-900/10 font-display">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6 italic shadow-sm hover:scale-105 transition-transform" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 px-4 uppercase italic shadow-sm font-display">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 px-4 italic underline-offset-2 font-display">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors px-4 italic shadow-sm font-display hover:translate-x-1"
                >
                  Détails <ArrowRight size={14} className="italic shadow-sm" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center italic font-display px-4 shadow-sm italic font-display shadow-sm">
             <Link 
              to="/formules-demenagement" 
              className="inline-flex items-center gap-4 bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-2xl group shadow-brand-900/20 italic font-display shadow-2xl shadow-brand-900/10"
             >
               Comparer les formules <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform italic shadow-sm" />
             </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 italic shadow-2xl overflow-hidden italic font-display shadow-inner">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic shadow-sm italic font-display">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display shadow-sm">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/10 transition-transform hover:scale-[1.01] shadow-brand-900/5">
               <img src="/images/camion-demenagement-val-de-marne.jpg" alt="Logistique au Plessis-Robinson" className="w-full h-full object-cover font-display italic shadow-sm shadow-black/5" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display underline-offset-4 italic">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm">Volume, accès et monte-meuble</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-2">
                 <p>
                    Certains déménagements au Plessis-Robinson nécessitent une étude attentive du volume, des étages ou des ascenseurs. Nous évaluons chaque contrainte d'accès depuis la rue pour le stationnement et la sécurité des opérations.
                 </p>
                 <p>
                    Pour les meubles volumineux ou les objets fragiles ne passant pas par l'escalier, nous étudions la faisabilité technique d'un monte-meuble extérieur, selon la configuration de votre adresse au Plessis-Robinson.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic font-display">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic shadow-brand-900/10 font-display underline underline-offset-4"
                  >
                    Étudier la solution monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic shadow-sm" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculer votre volume avant de demander un devis */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl underline-offset-4 italic shadow-black/40 italic font-display italic shadow-md">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic shadow-accent/20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm px-4 italic font-display shadow-sm font-display">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 shadow-sm font-display italic font-display italic shadow-sm">
             <div className="lg:w-2/3 space-y-8 italic px-4 font-display italic shadow-sm">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic shadow-sm text-white">Estimez le volume de votre déménagement</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 italic underline-offset-4 shadow-sm font-display">
                  Avant de solliciter un devis, utilisez notre calculateur de volume pour obtenir une estimation indicative de vos meubles, cartons et objets principaux.
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
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 shadow-sm px-4 shadow-sm italic font-display shadow-sm">Un accompagnement structuré pour votre déménagement au Plessis-Robinson.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 shadow-brand-900/5 italic font-display italic shadow-sm px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 shadow-sm font-display italic shadow-brand-900/10">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-2xl shadow-brand-900/5"></div>
             {[
               { id: "01", title: "Analyse projet", desc: "Étude globale de votre volume, de vos adresses et de votre calendrier cible." },
               { id: "02", title: "Audit technique", desc: "Évaluation physique ou à distance des accès et de la logistique au Plessis-Robinson." },
               { id: "03", title: "Organisation", desc: "Planification des équipes, de la formule et préparation du matériel de protection." },
               { id: "04", title: "Réalisation", desc: "Prise en charge de la manutention experte et transport local sécurisé." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-transform hover:-translate-y-2 duration-300 italic shadow-sm font-display italic shadow-md">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all font-display italic shadow-brand-900/5 hover:scale-105 transition-transform italic shadow-sm shadow-brand-900/10">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight px-4 uppercase tracking-tighter shadow-sm font-display italic">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 px-4 shadow-sm italic font-display">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches du Plessis-Robinson */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 italic font-display shadow-sm shadow-brand-900/5 underline-offset-4">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/10 italic shadow-sm font-display italic">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/10 italic font-display">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic shadow-accent/20">Réseau Expert Sud 92</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase tracking-tighter italic shadow-sm">Autres secteurs proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display shadow-sm underline-offset-2">
                Nous assurons une prestation de proximité dans toute la zone sud des Hauts-de-Seine, vous accompagnant pour vos projets locaux ou nationaux vers l'Île-de-France.
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
              { name: "Châtenay", link: "/demenagement-chatenay-malabry" },
              { name: "Clamart", link: null },
              { name: "Fontenay", link: "/demenagement-fontenay-aux-roses" },
              { name: "Sceaux", link: "/demenagement-sceaux" },
              { name: "Antony", link: "/demenagement-antony" },
              { name: "Meudon", link: null },
              { name: "Verrières", link: null },
              { name: "Vélizy", link: "/demenagement-velizy-villacoublay" },
              { name: "Bourg-la-Reine", link: "/demenagement-bourg-la-reine" },
              { name: "92 / HDS", link: "/demenagement-hauts-de-seine" },
              { name: "IDF / Région", link: "/demenagement-ile-de-france" },
              { name: "Vaucresson", link: "/demenagement-vaucresson" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-colors group shadow-sm active:scale-95 transition-all shadow-brand-900/10 italic font-display shadow-sm shadow-brand-900/5"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic font-display shadow-sm">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 shadow-sm transition-colors" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 shadow-brand-900/10 italic shadow-sm font-display">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase tracking-tighter shadow-sm font-display italic">{city.name}</span>
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
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/10 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 shadow-brand-900/20 font-display italic shadow-brand-900/5 shadow-brand-900/5 italic px-4 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/40 italic font-display font-display italic shadow-sm italic shadow-accent/20 shadow-md"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 shadow-brand-900/20 font-display italic shadow-sm underline-offset-4 italic">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm underline-offset-4 italic font-display uppercase italic">
                Vous préparez un déménagement au Plessis-Robinson ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display italic font-display italic shadow-sm">
                Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm underline-offset-4 font-display italic shadow-sm font-display italic shadow-sm underline-offset-4 italic px-4 shadow-2xl">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/20 shadow-brand-900/10 transition-transform font-display italic shadow-sm italic shadow-sm shadow-brand-900/30 italic shadow-sm italic"
                >
                  Demander un devis gratuit
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform italic font-display italic shadow-sm italic shadow-sm" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/10 italic shadow-sm font-display italic shadow-sm italic shadow-sm italic"
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
            <div className="text-center mb-16 shadow-sm shadow-brand-900/10 italic font-display italic font-display italic shadow-sm uppercase underline-offset-8 italic">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display italic font-display underline-offset-4 italic underline shadow-accent/20">Questions Fréquentes</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 underline-offset-4 italic font-display font-display font-display italic uppercase shadow-sm">FAQ Déménagement Le Plessis-Robinson</h2>
               <p className="text-slate-500 font-medium italic opacity-80 shadow-sm italic font-display underline-offset-4 italic font-display italic underline shadow-sm italic underline-offset-8">Vos interrogations pour une mobilité sereine et maîtrisée dans le sud du 92.</p>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/10 italic font-display shadow-sm italic font-display italic font-display shadow-sm shadow-brand-900/10 italic shadow-md">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-sm font-display italic shadow-sm shadow-brand-900/10 italic shadow-sm font-display italic shadow-sm">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm font-display font-display shadow-sm italic font-display shadow-sm underscore underline-offset-4 italic shadow-sm shadow-brand-900/5">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic shadow-sm font-black italic shadow-sm font-display italic shadow-sm shadow-brand-900/10">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 shadow-sm font-display italic shadow-brand-900/10 shadow-sm font-display italic font-display shadow-sm italic shadow-sm font-display">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/10 shadow-sm font-display shadow-brand-900/10 italic font-display italic shadow-sm underscore underline-offset-4 italic shadow-sm">
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
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm font-display italic shadow-sm font-display italic shadow-sm font-display italic shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display italic shadow-sm underline shadow-sm">Marne Transdem</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic shadow-sm font-display italic shadow-sm italic shadow-sm font-display italic">
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Entreprises</Link></li>
                  <li><Link to="/garde-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Monte-meuble</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic shadow-sm underline">Outils Pratiques</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic shadow-sm font-display italic shadow-sm font-display">
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Calculateur de volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Formules de déménagement</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Emballage & protection</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display italic shadow-sm underline-none">Cartons & matériel</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic shadow-sm font-display italic shadow-sm font-display shadow-sm underline-offset-4 shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic shadow-sm font-display italic underline">Hauts-de-Seine (92)</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display shadow-sm font-display shadow-sm font-display italic shadow-sm">
                  <li><Link to="/demenagement-hauts-de-seine" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none">Déménagement 92</Link></li>
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none">Île-de-France</Link></li>
                  <li><Link to="/longue-distance" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none">Longue distance</Link></li>
                  <li><Link to="/secteurs-desservis" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm underline-none italic">Nos secteurs</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm font-display italic shadow-sm font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/40 italic font-display shadow-sm italic underline shadow-sm italic">Secteurs Sud 92</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display shadow-sm font-display shadow-sm font-display italic shadow-sm italic font-display italic shadow-sm">
                  <li><Link to="/demenagement-chatenay-malabry" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none">Châtenay-Malabry</Link></li>
                  <li><Link to="/demenagement-antony" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none">Antony</Link></li>
                  <li><Link to="/demenagement-sceaux" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic">Sceaux</Link></li>
                  <li><Link to="/demenagement-nogent-sur-marne" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic">Nogent-sur-Marne (proche)</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm font-display shadow-sm italic underline-none italic shadow-sm font-display underline-offset-4 italic shadow-sm underline">Contact</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only font-display italic font-display shadow-sm font-display italic font-display shadow-sm font-display italic font-display shadow-sm font-display font-display italic font-display shadow-sm font-display italic font-display underline shadow-sm italic font-display italic">
        <p>
          Marne Transdem, expert du déménagement au Plessis-Robinson (92350) et dans les Hauts-de-Seine, vous accompagne pour tous vos projets : transfert de bureaux Le Plessis-Robinson, déménagement appartement, studio, maison de ville, pavillon, résidence, location monte-meuble et garde-meuble. Devis gratuit pour particuliers et entreprises. Proximité Châtenay-Malabry, Clamart, Fontenay-aux-Roses, Sceaux, Antony, Meudon, Verrières-le-Buisson, Vélizy-Villacoublay, Bourg-la-Reine et Paris sud. Estimation volume, protection meubles, emballage cartons et transport sécurisé.
        </p>
      </div>
    </div>
  );
};

export default LocalLePlessisRobinson;
