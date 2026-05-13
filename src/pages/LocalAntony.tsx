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

const LocalAntony: React.FC = () => {
  const path = "/demenagement-antony";

  const faqData = [
    {
      q: "How to organize a move to Antony?",
      a: "A move to Antony requires anticipating volume, access, floors, possible elevators, parking, and box preparation. In a residential city with both apartments and houses, it's important to evaluate cellars, garages, parking, bulky furniture, and fragile objects. Marne Transdem helps you define an organization adapted to your housing, your belongings, and the desired level of support."
    },
    {
      q: "Does Marne Transdem intervene in Antony and nearby cities?",
      a: "Yes, Marne Transdem supports moving projects in Antony and nearby sectors such as Sceaux, Bourg-la-Reine, Châtenay-Malabry, Massy, Fresnes, Verrières-le-Buisson, Wissous, Rungis, L’Haÿ-les-Roses, and more broadly in Hauts-de-Seine according to project needs."
    },
    {
      q: "Can we request a furniture lift in Antony?",
      a: "Yes, a furniture lift can be considered when bulky furniture doesn't easily pass through the stairs or elevator. Its setup depends on the street configuration, the facade, access, and technical feasibility."
    },
    {
      q: "Which formula to choose for a move to Antony?",
      a: "The formula depends on your budget, available time to prepare your boxes, and the desired level of support. The Economic formula is suitable if you prepare a large part of your belongings, the Standard formula offers a balance between autonomy and support, and the Luxury formula allows delegating more depending on the chosen service."
    },
    {
      q: "How to get a quote for a move to Antony?",
      a: "You can fill out the quote request form or contact Marne Transdem by phone. The estimate takes into account the volume, addresses, access, floors, desired formula, and specific needs such as packing, storage, or furniture lift."
    }
  ];

  // Translated FAQ back to French as requested in the structure
  const faqDataFR = [
    {
      q: "Comment organiser un déménagement à Antony ?",
      a: "Un déménagement à Antony demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Dans une ville résidentielle où l’on trouve aussi bien des appartements que des maisons, il est important d’évaluer les caves, garages, parkings, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Antony et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Antony et dans les secteurs proches comme Sceaux, Bourg-la-Reine, Châtenay-Malabry, Massy, Fresnes, Verrières-le-Buisson, Wissous, Rungis, L’Haÿ-les-Roses et plus largement dans les Hauts-de-Seine selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Antony ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Antony ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Antony ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Déménagement Antony | Marne Transdem" 
        description="Préparez votre déménagement à Antony avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Antony", item: path }
          ]),
          getFAQSchema(faqDataFR)
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
                <span className="text-accent uppercase font-black tracking-widest text-sm">Déménagement local</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                Déménagement <span className="text-accent">Antony</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Antony, avec une organisation adaptée aux appartements, maisons, résidences et bureaux du sud des Hauts-de-Seine.
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
      <div className="bg-white border-b border-slate-100 py-4 font-display italic">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex text-xs font-bold uppercase tracking-widest text-slate-400 italic">
            <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
            <span className="mx-3 text-slate-200">/</span>
            <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors">Secteurs</Link>
            <span className="mx-3 text-slate-200">/</span>
            <span className="text-brand-900 font-black">Antony</span>
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
                Votre déménagement à Antony
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80">
                <p>
                  Antony est une ville importante, résidentielle et familiale du sud des Hauts-de-Seine, idéalement située à proximité de Sceaux, Bourg-la-Reine, Châtenay-Malabry, Massy, Fresnes, Verrières-le-Buisson et Rungis.
                </p>
                <p>
                  Marne Transdem accompagne les déménagements à Antony pour les particuliers et les entreprises. Qu'il s'agisse d'un appartement en résidence, d'un pavillon, d'une maison familiale ou d'un studio d'étudiant, nous maîtrisons les contraintes d'accès d'immeubles, halls, ascenseurs, escaliers et stationnement.
                </p>
                <p>
                  Pour les professionnels, nous organisons les transferts de bureaux, commerces, cabinets et agences à Antony, avec une logistique adaptée pour assurer la continuité de votre activité au cœur des Hauts-de-Seine.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
                  <MapPin className="text-accent" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs">Antony (92160)</span>
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
                  alt="Déménagement Antony" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Antony demande une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 px-4 italic">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase text-center">Pourquoi un déménagement à Antony demande une bonne préparation</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 text-center">
            Ville résidentielle avec des profils de logements variés, Antony présente des spécificités d'accès que nous anticipons pour chaque mission.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Logements Variés",
                desc: "Des pavillons, maisons et logements familiaux aux résidences avec appartements et studios.",
                icon: Home
              },
              {
                title: "Accès & Étages",
                desc: "Ascenseurs parfois limités, cages d'escaliers étroites ou accès par cour : nous maîtrisons toutes les configurations.",
                icon: ArrowUpCircle
              },
              {
                title: "Protection du Mobilier",
                desc: "Emballage spécifique pour les biens fragiles, meubles de valeur et objets familiaux.",
                icon: Package
              },
              {
                title: "Manutention Tertiaire",
                desc: "Organisation méthodique pour les bureaux, cabinets, agences et commerces d'Antony.",
                icon: Building2
              },
              {
                title: "Préservation des Lieux",
                desc: "Protection des halls, parkings, garages et parties communes des résidences d'Antony.",
                icon: ShieldCheck
              },
              {
                title: "Monte-Meuble Adapté",
                desc: "Solution utile si les accès intérieurs sont restreints pour les meubles volumineux, selon faisabilité.",
                icon: ArrowUpCircle
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors italic">
                  <item.icon className="text-brand-900 group-hover:text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight uppercase font-display">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm italic opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Antony */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 px-4 text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic">Nos services de déménagement à Antony</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto italic font-medium opacity-80 text-slate-300">Un accompagnement expert pour tous vos projets de mobilité dans le sud du 92.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Appartements, studios, maisons, pavillons et logements familiaux.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement d'entreprises",
                desc: "Bureaux, commerces, cabinets, agences et professions libérales.",
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
                desc: "Solution à envisager pour les accès complexes selon faisabilité.",
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
                desc: "Préparation efficace avec du matériel professionnel et cartons adaptés.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules de déménagement",
                desc: "Économique, Standard, Luxe : trois solutions sur mesure.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de volume",
                desc: "Estimation indicative préalable pour affiner votre besoin.",
                link: "/calculateur-volume",
                icon: Calculator
              }
            ].map((service, idx) => (
              <Link 
                key={idx} 
                to={service.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-brand-900 transition-all group active:scale-[0.98]"
              >
                <service.icon size={32} className="text-accent group-hover:text-brand-900 mb-6 italic" />
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight italic">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic opacity-80">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors uppercase">
                  Détails <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Antony */}
      <section className="py-24 bg-white font-display italic overflow-hidden px-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1 relative">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10">
                  <img 
                    src="/images/demenagement-appartement-92.jpg" 
                    alt="Déménagement particuliers Antony" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic">Déménagement de particuliers à Antony</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs déménagements à Antony : d'appartements en centre-ville, studios, maisons familiales ou pavillons individuels.
                </p>
                <p>
                  D'Antony vers Paris, ou de Paris vers Antony, nous gérons chaque étape de votre mobilité locale ou longue distance. Organisation des cartons, protection du mobilier, transport sécurisé et gestion des accès urbains (ascenseur, cave, garage, parking) : nous adaptons nos moyens à votre logement.
                </p>
              </div>
              <div className="pt-8">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic"
                >
                  Demander mon devis
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Antony */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm px-4 shadow-2xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic">
             <div className="lg:w-1/2">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-sm font-display italic">
                  <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Déménagement Entreprise Antony" className="w-full h-full object-cover rounded-[2.5rem]" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic">Déménagement d'entreprises à Antony</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic">
                 <p>
                   Nous accompagnons les professionnels d'Antony (bureaux, commerces, cabinets, agences, professions libérales et indépendants) dans leurs transferts et locaux professionnels.
                 </p>
                 <p>
                    Transfert de bureaux, mobilier professionnel, archives ou matériel informatique : nous organisons le planning pour garantir la continuité de votre activité. Notre expertise couvre Antony et les secteurs proches comme Sceaux, Bourg-la-Reine, Châtenay-Malabry et Massy.
                 </p>
               </div>
               <div className="pt-8">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic"
                 >
                   Organiser un transfert professionnel
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform italic" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm px-4 shadow-2xl">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display px-4 shadow-sm italic">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline-offset-4">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic">
            {[
              {
                name: "Économique",
                desc: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport selon le projet.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Une formule équilibrée pour déléguer certains éléments comme les objets fragiles ou certains meubles.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Sérénité totale : nous déléguons davantage de préparation, d'emballage et d'organisation.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6 italic shadow-sm hover:scale-105" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 px-4 uppercase">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 px-4 italic">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors px-4 italic"
                >
                  Détails <ArrowRight size={14} className="italic shadow-sm" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center italic font-display px-4 shadow-sm italic">
             <Link 
              to="/formules-demenagement" 
              className="inline-flex items-center gap-4 bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-2xl group shadow-brand-900/10 italic"
             >
               Comparer les formules <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform italic shadow-sm" />
             </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 italic shadow-2xl overflow-hidden italic font-display">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic shadow-sm">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/5 transition-transform hover:scale-[1.01]">
               <img src="/images/camion-demenagement-val-de-marne.jpg" alt="Logistique à Antony" className="w-full h-full object-cover" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 underline-offset-4 italic">Volume, accès et monte-meuble à Antony</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic">
                 <p>
                    Certains déménagements à Antony nécessitent une étude attentive du volume à déménager, de l'étage, de la présence d'ascenseurs ou d'escaliers étroits, ainsi que des accès depuis la rue pour le stationnement. 
                 </p>
                 <p>
                    Pour les meubles volumineux ou les objets fragiles ne passant pas par l'intérieur, nous étudions le besoin éventuel d'un monte-meuble extérieur, selon la faisabilité technique de votre adresse à Antony.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic shadow-brand-900/20"
                  >
                    Voir la location monte-meuble <ArrowRight size={18} className="italic shadow-sm" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculer votre volume avant de demander un devis */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl underline-offset-4 italic shadow-black/20 italic">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm px-4 italic font-display">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 shadow-sm font-display italic font-display">
             <div className="lg:w-2/3 space-y-8 italic px-4 font-display">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase">Estimez le volume de votre déménagement</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 italic underline-offset-4">
                  Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cela permettra d'affiner votre étude tarifaire.
                </p>
                <div className="pt-4 shadow-sm px-4 shadow-white/5 transition-transform hover:scale-105">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic shadow-sm"
                  >
                    Utiliser le calculateur de volume
                    <Calculator size={20} className="group-hover:rotate-12 transition-transform italic" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3 flex justify-center shadow-sm px-4 italic font-display">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden italic shadow-2xl">
                    <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 italic"></div>
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-700 font-display italic shadow-sm italic shadow-2xl shadow-accent/20" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic font-display">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4 shadow-sm italic font-display">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight shadow-sm px-4 uppercase tracking-tight">Notre méthode en 4 étapes</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 shadow-sm px-4 shadow-sm">Préparer sereinement votre projet de déménagement à Antony.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 shadow-brand-900/5">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 shadow-sm font-display italic">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-2xl italic font-display"></div>
             {[
               { id: "01", title: "Analyse projet", desc: "Étude globale de votre volume, de vos adresses et de votre calendrier cible." },
               { id: "02", title: "Audit technique", desc: "Évaluation physique ou à distance des accès et de la logistique à Antony." },
               { id: "03", title: "Organisation", desc: "Choix de la formule, planification des équipes et préparation du matériel." },
               { id: "04", title: "Réalisation", desc: "Prise en charge de la manutention experte et transport local sécurisé." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-transform hover:-translate-y-2 duration-300 italic">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all font-display italic shadow-brand-900/5 hover:scale-105 transition-transform">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight px-4 uppercase tracking-tighter shadow-sm">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 px-4 shadow-sm italic">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches d'Antony */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 italic">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/5 italic">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/10 italic">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic font-display">Réseau Expert</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase tracking-tighter italic">Autres secteurs proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic">
                Nous intervenons dans toute la zone sud des Hauts-de-Seine et à Paris, assurant une prestation de proximité pour les particuliers et les entreprises.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 shadow-brand-900/5 italic font-display">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm px-4 shadow-sm italic">
                Secteurs desservis <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm italic" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 shadow-brand-900/5 italic font-display">
            {[
              { name: "Sceaux", link: "/demenagement-sceaux" },
              { name: "Bourg-la-Reine", link: "/demenagement-bourg-la-reine" },
              { name: "Châtenay", link: "/demenagement-chatenay-malabry" },
              { name: "Le Plessis-Robinson", link: "/demenagement-le-plessis-robinson" },
              { name: "Fontenay-aux-Roses", link: "/demenagement-fontenay-aux-roses" },
              { name: "Bagneux", link: "/demenagement-bagneux" },
              { name: "Clamart", link: "/demenagement-clamart" },
              { name: "Massy", link: null },
              { name: "Fresnes", link: null },
              { name: "Wissous", link: null },
              { name: "Rungis", link: null },
              { name: "L’Haÿ", link: null },
              { name: "92 / HDS", link: "/demenagement-hauts-de-seine" },
              { name: "IDF / Région", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-colors group shadow-sm active:scale-95 transition-all shadow-brand-900/5 italic font-display"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 shadow-sm" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 shadow-brand-900/5 italic">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase tracking-tighter shadow-sm font-display">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 shadow-sm" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic shadow-brand-900/5 italic">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/10 italic">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/5 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 shadow-brand-900/5 font-display">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/20 italic font-display"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 shadow-brand-900/20 font-display">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm underline-offset-4 italic">
                Vous préparez un déménagement à Antony ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display">
                Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm underline-offset-4 font-display">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/20 shadow-brand-900/10 transition-transform font-display italic"
                >
                  Demander mon devis gratuit
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform italic" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/5 italic"
                >
                  <Phone size={20} className="shadow-sm font-display shadow-sm font-display" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 shadow-brand-900/5 italic">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/20 font-display italic">
          <div className="max-w-4xl mx-auto space-y-12 px-4 shadow-sm shadow-brand-900/20 italic px-4 shadow-2xl font-display shadow-brand-900/5 italic">
            <div className="text-center mb-16 shadow-sm shadow-brand-900/10 italic font-display">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display">CONSEILS LOCAUX</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 underline-offset-4 italic">FAQ Déménagement Antony</h2>
               <p className="text-slate-500 font-medium italic opacity-80 shadow-sm italic font-display underline-offset-4 italic">Les réponses à vos questions pour un déménagement sans stress dans le sud du 92.</p>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/5 italic font-display">
              {faqDataFR.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-sm font-display italic shadow-sm">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic shadow-sm font-black italic">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 shadow-sm font-display italic shadow-brand-900/5 shadow-sm font-display italic">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/5 shadow-sm font-display">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/20 font-display italic">
        <div className="container mx-auto px-4 md:px-6 shadow-sm shadow-brand-900/20 font-display italic">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic shadow-brand-900/5 font-display italic">
             <div className="space-y-6 shadow-sm shadow-brand-900/5 font-display italic shadow-sm font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/20 italic">Nos Services</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/5 font-display italic shadow-sm font-display">
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Déménagement particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Déménagement entreprises</Link></li>
                  <li><Link to="/garde-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Location monte-meuble</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/5 font-display italic shadow-sm font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/20 italic">Outils & Conseils</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/5 font-display italic shadow-sm font-display">
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Calculateur de volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Formules de déménagement</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Emballage et protection</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Cartons et matériel</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/5 font-display italic shadow-sm font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/20 italic">Zones Hauts-de-Seine</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/5 font-display italic shadow-sm font-display">
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Île-de-France</Link></li>
                  <li><Link to="/demenagement-92-hauts-de-seine" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Hauts-de-Seine (92)</Link></li>
                  <li><Link to="/longue-distance" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Longue distance</Link></li>
                  <li><Link to="/secteurs-desservis" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Tous nos secteurs</Link></li>
                </ul>
             </div>
             <div className="space-y-6 shadow-sm shadow-brand-900/5 font-display italic shadow-sm font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 shadow-sm shadow-accent/20 italic">Antony & Proches</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/5 font-display italic shadow-sm font-display">
                  <li><Link to="/demenagement-sceaux" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Sceaux</Link></li>
                  <li><Link to="/demenagement-bourg-la-reine" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Bourg-la-Reine</Link></li>
                  <li><Link to="/demenagement-bagneux" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Bagneux</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium shadow-sm">Contact direct</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only">
        <p>
          Marne Transdem, expert du déménagement à Antony (92160) et dans les Hauts-de-Seine, vous accompagne pour tous vos projets : transfert de bureaux Antony, déménagement appartement, studio, maison de ville, pavillon, résidence, location monte-meuble et garde-meuble. Devis gratuit pour particuliers et entreprises. Proximité Sceaux, Bourg-la-Reine, Châtenay-Malabry, Massy, Fresnes, Verrières-le-Buisson, Wissous, Rungis et Paris sud.
        </p>
      </div>
    </div>
  );
};

export default LocalAntony;
