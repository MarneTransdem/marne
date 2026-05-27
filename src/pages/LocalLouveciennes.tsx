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
  Trees
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalLouveciennes: React.FC = () => {
  const path = "/demenagement-louveciennes";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Louveciennes ?",
      a: "Un déménagement à Louveciennes demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Selon qu’il s’agit d’un appartement, d’une maison ou d’un local professionnel, il est important d’évaluer les caves, garages, parkings, jardins, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Louveciennes et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Louveciennes et dans les secteurs proches comme Bougival, La Celle-Saint-Cloud, Croissy-sur-Seine, Le Vésinet, Le Port-Marly, Marly-le-Roi, Le Chesnay-Rocquencourt, Versailles, Rueil-Malmaison, Saint-Germain-en-Laye et plus largement en Île-de-France selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Louveciennes ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Louveciennes ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Louveciennes ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, le stationnement, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Louveciennes | Marne Transdem" 
        description="Préparez votre déménagement à Louveciennes avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Louveciennes", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display text-white">
        <div className="absolute inset-0 bg-[url('/images/demenagement-louveciennes-yvelines.jpg')] bg-cover bg-center opacity-20 transition-transform duration-1000 scale-105"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white text-brand-900">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6 text-white text-brand-900">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent uppercase font-black tracking-widest text-sm italic">Déménagement local</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white uppercase italic">
                Déménagement <br/><span className="text-accent underline-offset-4">Louveciennes</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-80 font-display">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Louveciennes, avec une organisation adaptée aux appartements, maisons, résidences, bureaux, commerces et contraintes d'accès de l'ouest francilien.
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
            <span className="text-brand-900 font-black italic">Louveciennes</span>
          </nav>
        </div>
      </div>

      {/* 2. Introduction locale */}
      <section className="py-24 bg-white overflow-hidden relative shadow-sm">
        <div className="container mx-auto px-4 md:px-6 text-brand-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 font-display italic"
            >
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4">
                Votre déménagement à Louveciennes
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic font-display">
                <p>
                  Marne Transdem accompagne les déménagements à Louveciennes pour les particuliers et les entreprises. Cette ville résidentielle, familiale et recherchée des Yvelines, située dans l'ouest francilien, offre un cadre de vie d'exception.
                </p>
                <p>
                  Sa proximité avec Bougival, La Celle-Saint-Cloud, Croissy-sur-Seine, Le Port-Marly, Marly-le-Roi, Le Chesnay-Rocquencourt, Versailles, Rueil-Malmaison et Saint-Germain-en-Laye en fait un secteur d'intervention privilégié pour nos équipes. Nous maîtrisons les spécificités des quartiers résidentiels de Louveciennes, qu'il s'agisse de maisons anciennes, de pavillons contemporains ou d'appartements en résidence avec halls, ascenseurs et accès parfois contraints.
                </p>
                <p>
                  Qu'il s'agisse d'un déménagement de particuliers, de familles, de cadres ou de professionnels (bureaux, cabinets, agences), chaque projet bénéficie d'une attention particulière. De l'estimation précise du volume à la demande de devis, nous analysons vos besoins en tenant compte de la configuration de votre adresse : stationnement, étages, accès aux jardins, caves, parkings ou garages.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Louveciennes (78430)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Trees className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Cadre résidentiel haut de gamme</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-louveciennes-yvelines.jpg" 
                  alt="Déménagement Louveciennes - Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Louveciennes demande une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display text-brand-900 text-brand-900">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase px-4 italic underline decoration-accent/20 underline-offset-8">Une expertise locale indispensable</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 px-4 italic font-display">
            Louveciennes se caractérise par des profils de logements variés et des environnements résidentiels qui exigent une logistique millimétrée.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic shadow-sm shadow-brand-900/5 text-brand-900">
            {[
              {
                title: "Logements Exclusifs",
                desc: "Maisons de standing, pavillons familiaux et appartements en résidences sécurisées aux accès variés.",
                icon: Home
              },
              {
                title: "Accès complexes",
                desc: "Rues résidentielles, halls, ascenseurs limités ou escaliers étroits à anticiper selon l'adresse.",
                icon: Truck
              },
              {
                title: "Objets de Valeur",
                desc: "Protection soignée du mobilier de famille, tableaux, objets fragiles, vaisselle et archives sensibles.",
                icon: ShieldCheck
              },
              {
                title: "Professionnels locaux",
                desc: "Transferts de bureaux, cabinets médicaux et petits locaux professionnels organisés avec planning précis.",
                icon: Building2
              },
              {
                title: "Solution Stockage",
                desc: "Garde-meuble disponible pour vos transitions immobilières, travaux ou décalages d'emménagement.",
                icon: Warehouse
              },
              {
                title: "Monte-meuble",
                desc: "Option indispensable pour le mobilier lourd ou volumineux, sous réserve de faisabilité technique.",
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

      {/* 4. Nos services */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 font-display italic">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase underline-offset-4 shadow-sm">Nos prestations à Louveciennes</h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto italic font-medium opacity-80 shadow-sm italic">Une gamme complète de services pour répondre à chaque exigence de déménagement.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display shadow-sm">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Maisons, pavillons, résidences et logements familiaux de standing.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement d'entreprises",
                desc: "Bureaux, cabinets, agences et commerces de l'ouest francilien.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble / stockage",
                desc: "Solution sécurisée pendant une transition, des travaux ou une vente.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Location monte-meuble",
                desc: "Faisabilité technique étudiée pour vos meubles volumineux ou accès hauts.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage et protection",
                desc: "Sécurisation experte de vos meubles, objets fragiles et effets personnels.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons et matériel",
                desc: "Équipement professionnel complet pour préparer vos cartons efficacement.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules sur-mesure",
                desc: "Économique, Standard, Luxe : des options adaptées à votre budget.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de volume",
                desc: "Estimez vos besoins en quelques clics avant votre demande de devis.",
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
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight italic uppercase shadow-sm">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic opacity-80 underline-offset-2">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors uppercase italic shadow-sm underline underline-offset-4">
                  En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shadow-sm" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers */}
      <section className="py-24 bg-white font-display italic overflow-hidden shadow-sm text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="flex flex-col lg:flex-row gap-20 items-center italic shadow-sm shadow-brand-900/10">
            <div className="lg:w-1/2 order-2 lg:order-1 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10 italic border-8 border-slate-50 shadow-brand-900/10">
                  <img 
                    src="/images/demenagement-maison-yvelines.jpg" 
                    alt="Déménagement particuliers Louveciennes - Marne Transdem" 
                    className="w-full h-full object-cover shadow-sm font-display italic"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic shadow-accent/40 font-display"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic text-brand-900 shadow-sm underline-offset-4 transition-all">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm italic hover:text-accent transition-colors">Particuliers & Familles</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display shadow-sm underline-offset-2 italic">
                <p>
                  Marne Transdem accompagne les familles et particuliers pour leurs déménagements à Louveciennes. Que vous quittiez un appartement en résidence, un studio ou que vous emménagiez dans une maison familiale ou un pavillon, nous adaptons notre logistique à chaque situation.
                </p>
                <p>
                  Louveciennes vers Paris, Paris vers Louveciennes, ou vers toute autre destination en Île-de-France ou longue distance, nous gérons chaque étape avec rigueur : tri, emballage soigné des livres, vaisselle, tableaux et effets personnels, protection du mobilier et manutention sécurisée via ascenseur, escalier, cave ou garage.
                </p>
              </div>
              <div className="pt-8 shadow-sm italic underline-offset-4">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic font-display shadow-2xl shadow-brand-900/10"
                >
                  Demander mon devis
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform italic shadow-sm" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm italic font-display text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic font-display shadow-sm shadow-brand-900/10 underline-offset-4 text-brand-900">
             <div className="lg:w-1/2 shadow-sm italic font-display transition-transform hover:scale-[1.01]">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic transition-all group active:scale-[0.99] font-display italic shadow-brand-900/10">
                  <img src="/images/transfert-entreprise-78-yvelines.jpg" alt="Déménagement Entreprise Louveciennes" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic text-brand-900 shadow-sm underline-offset-4 italic transition-all">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline-offset-4 shadow-sm italic hover:text-accent transition-colors">Transferts Professionnels</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-2 italic">
                 <p>
                   Nous intervenons auprès des professionnels de Louveciennes (bureaux, cabinets médicaux, agences, commerces, professions libérales et indépendants) pour assurer leurs déménagements de locaux sans interrompre leur activité.
                 </p>
                 <p>
                    Mobilier professionnel, matériel informatique, archives sensibles ou stocks : notre organisation millimétrée garantit un transfert efficace vers Bougival, Rueil-Malmaison, La Celle-Saint-Cloud, Versailles ou Paris ouest, avec des solutions de stockage temporaire si nécessaire.
                 </p>
               </div>
               <div className="pt-8 shadow-sm italic underline-offset-4">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic font-display shadow-2xl shadow-brand-900/5 select-none"
                 >
                   Organiser un transfert professionnel
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform italic shadow-sm" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm underline-offset-4 shadow-black/5 italic font-display italic shadow-sm text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display shadow-sm italic shadow-brand-900/10 underline-offset-8 italic underline transition-all">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline-offset-4 shadow-sm italic">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display shadow-sm shadow-brand-900/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic shadow-brand-900/10">
            {[
              {
                name: "Économique",
                desc: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport sécurisé.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Une formule équilibrée pour déléguer les objets fragiles ou certains meubles selon vos besoins.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Solution complète pour déléguer la préparation, l'emballage et l'organisation globale de votre projet.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic shadow-brand-900/10 font-display transition-transform hover:-translate-y-1">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6 italic shadow-sm font-display hover:scale-105 transition-transform" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 px-4 uppercase italic shadow-sm font-display">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 px-4 italic underline-offset-2 font-display">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors px-4 italic shadow-sm font-display hover:translate-x-1 underline underline-offset-4"
                >
                  Découvrir la formule <ArrowRight size={14} className="italic shadow-sm transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center italic font-display px-4 shadow-sm italic font-display shadow-sm underline-offset-4 underline decoration-accent/20 transition-all hover:decoration-accent">
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
      <section className="py-24 bg-slate-50 font-display italic shadow-sm overflow-hidden italic font-display shadow-inner text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display shadow-brand-900/10 transition-all text-brand-900">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display shadow-sm underline-offset-4 italic">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/20 transition-all hover:scale-[1.01]">
               <img src="/images/camion-demenageur-marne-transdem.jpg" alt="Volumes et accès à Louveciennes - Marne Transdem" className="w-full h-full object-cover font-display italic shadow-inner" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display underline-offset-4 italic text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm hover:text-accent transition-colors italic">Volume, accès et monte-meuble</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-2 italic">
                 <p>
                    Certains déménagements à Louveciennes nécessitent une étude attentive du volume, des accès et du stationnement. Qu'il s'agisse de résidences, de maisons familiales, de pavillons avec jardin ou de locaux commerciaux, nous analysons chaque contrainte d'étage, d'ascenseur ou d'accès via cave et garage.
                 </p>
                 <p>
                    Pour les meubles les plus volumineux ou les accès complexes par la façade, la location d'un monte-meuble peut être intégrée au projet après vérification de la faisabilité technique par nos experts.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic font-display underline-offset-4 transition-all">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic shadow-brand-900/10 font-display underline underline-offset-4 select-none hover:translate-x-1"
                  >
                    Voir la solution monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic shadow-sm underline" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl underline-offset-4 italic shadow-black/40 italic font-display italic shadow-md">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic shadow-accent/20 transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm italic font-display shadow-sm font-display italic underline-offset-4 italic transition-all shadow-black/20 text-white">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 shadow-sm font-display italic font-display italic shadow-sm text-white">
             <div className="lg:w-2/3 space-y-8 italic px-4 font-display italic shadow-sm shadow-black/10 select-none">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic shadow-sm hover:text-accent transition-colors italic">Estimez votre volume à déménager</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 italic underline-offset-4 shadow-sm font-display">
                  Utilisez notre calculateur pour évaluer vos meubles et cartons avant de demander un devis. Une estimation indicative précieuse pour préparer votre projet à Louveciennes.
                </p>
                <div className="pt-4 shadow-sm px-4 shadow-white/10 transition-transform hover:scale-105 italic">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic shadow-sm shadow-accent/20"
                  >
                    Démarrer le calcul de volume
                    <Calculator size={20} className="group-hover:rotate-12 transition-transform italic shadow-sm" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3 flex justify-center shadow-sm px-4 italic font-display italic font-display italic shadow-sm transition-transform hover:scale-110 duration-700">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden italic shadow-2xl shadow-black/20">
                    <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 italic shadow-accent/40"></div>
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-700 font-display italic shadow-sm italic shadow-2xl shadow-accent/40" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic font-display shadow-sm shadow-brand-900/5 text-brand-900 shadow-brand-900/5 transition-all italic font-display shadow-sm text-brand-900 shadow-brand-900/5 border-b border-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4 shadow-sm italic font-display shadow-sm font-display italic shadow-sm underline-offset-8 italic underline decoration-accent/10">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight shadow-sm px-4 uppercase tracking-tighter italic font-display hover:text-accent transition-colors">Notre méthode en 4 étapes</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 shadow-sm px-4 shadow-sm italic font-display shadow-sm underline-offset-2">Un processus clair pour un déménagement sans imprévu à Louveciennes.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 shadow-brand-900/5 italic font-display italic shadow-sm px-4 shadow-brand-900/10 transition-all font-display shadow-sm text-brand-900 underline-offset-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 shadow-sm font-display italic shadow-brand-900/10">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-2xl shadow-brand-900/5 shadow-brand-900/10 italic"></div>
             {[
               { id: "01", title: "Analyse Projet", desc: "Étude personnalisée de votre volume, de vos adresses et de vos contraintes." },
               { id: "02", title: "Audit Technique", desc: "Évaluation sur place ou à distance du volume et de la configuration des accès." },
               { id: "03", title: "Planification", desc: "Choix de la formule, organisation des équipes et mise à disposition du matériel." },
               { id: "04", title: "Réalisation", desc: "Déménagement sécurisé et mise en place de vos biens à votre nouvelle adresse." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-transform hover:-translate-y-2 duration-300 italic shadow-sm font-display italic shadow-md shadow-brand-900/5 select-none transition-all">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all font-display italic shadow-brand-900/5 hover:scale-105 transition-transform italic shadow-sm shadow-brand-900/10 select-none shadow-brand-900/10 group-hover:shadow-accent/40">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight px-4 uppercase tracking-tighter shadow-sm font-display italic group-hover:text-accent transition-colors">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 px-4 shadow-sm italic font-display underline-offset-4">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 italic font-display shadow-sm shadow-brand-900/5 underline-offset-4 text-brand-900 shadow-brand-900/5 shadow-inner">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/10 italic shadow-sm font-display italic shadow-brand-900/10 text-brand-900">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/10 italic font-display text-brand-900 shadow-brand-900/5 transition-all">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic underline-offset-4 italic transition-all">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic shadow-accent/20 select-none hover:opacity-100 italic transition-all">Proximité Yvelines</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase tracking-tighter italic shadow-sm hover:text-accent transition-colors italic underline-offset-8 underline decoration-accent/10">Secteurs à proximité</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display shadow-sm underline-offset-2 italic">
                Nous accompagnons également vos projets de déménagement dans les communes voisines de Louveciennes et dans tout l'ouest parisien.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 shadow-brand-900/5 italic font-display shadow-sm underline-offset-4 italic transition-all underline decoration-brand-900/20 hover:decoration-brand-900">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm px-4 shadow-sm italic shadow-sm font-display italic hover:translate-x-1 underline shadow-brand-900/10 transition-all select-none">
                Voir tous les secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm italic shadow-sm underline underline-offset-4 italic transition-all select-none" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 shadow-brand-900/10 italic font-display shadow-sm font-display italic shadow-sm text-brand-900 shadow-brand-900/5 transition-all text-brand-900">
            {[
              { name: "Bougival", link: "/demenagement-bougival" },
              { name: "La Celle-St-Cloud", link: "/demenagement-la-celle-saint-cloud" },
              { name: "Chatou", link: "/demenagement-chatou" },
              { name: "Croissy-sur-Seine", link: "/demenagement-croissy-sur-seine" },
              { name: "Le Vésinet", link: "/demenagement-le-vesinet" },
              { name: "Le Port-Marly", link: null },
              { name: "Le Pecq", link: "/demenagement-le-pecq" },
              { name: "Marly-le-Roi", link: "/demenagement-marly-le-roi" },
              { name: "Le Chesnay", link: "/demenagement-le-chesnay-rocquencourt" },
              { name: "Versailles", link: "/demenagement-versailles" },
              { name: "Rueil-Malmaison", link: "/demenagement-rueil-malmaison" },
              { name: "Saint-Germain", link: null },
              { name: "Yvelines", link: "/demenagement-yvelines" },
              { name: "Île-de-France", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-all group shadow-sm active:scale-95 shadow-brand-900/10 italic font-display shadow-sm shadow-brand-900/10 italic hover:shadow-md transition-all select-none transition-transform"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic font-display shadow-sm group-hover:text-brand-900 transition-colors uppercase italic shadow-sm">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 shadow-sm transition-all font-display italic" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 shadow-brand-900/10 italic shadow-sm font-display select-none transition-all grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase tracking-tighter shadow-sm font-display italic transition-colors italic">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 shadow-sm font-display italic" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/5 italic shadow-brand-900/10 italic shadow-md text-brand-900 shadow-brand-900/5 transition-all border-b border-slate-50 italic font-display shadow-sm">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/20 italic font-display shadow-sm px-4 shadow-2xl underline-offset-4 italic transition-all">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/10 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 shadow-brand-900/20 font-display italic shadow-brand-900/5 shadow-brand-900/20 transition-all italic px-4 shadow-2xl shadow-brand-900/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/40 italic font-display font-display italic shadow-sm italic shadow-accent/20 shadow-md transition-all duration-1000 group-hover:scale-125"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 shadow-brand-900/20 font-display italic shadow-sm underline-offset-4 italic transition-all italic">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm underline-offset-4 italic font-display uppercase italic text-brand-900 underline decoration-accent/20 transition-all hover:text-accent hover:decoration-accent/40">
                Préparer votre déménagement à Louveciennes
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display italic font-display italic shadow-sm underline-offset-4 italic transition-all italic">
                Décrivez votre projet et recevez une estimation personnalisée selon votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm underline-offset-4 font-display italic shadow-sm font-display italic shadow-sm underline-offset-4 italic px-4 shadow-2xl transition-all">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/20 shadow-brand-900/10 transition-transform font-display italic shadow-sm italic shadow-sm shadow-brand-900/30 italic shadow-sm underline decoration-white/20 select-none shadow-brand-900/40"
                >
                  Estimation Gratuite
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform italic font-display italic shadow-sm italic shadow-sm transition-all shadow-white/20" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/10 italic shadow-sm font-display italic shadow-sm italic shadow-sm underline decoration-brand-900/10 hover:decoration-brand-900/40 transition-all select-none"
                >
                  <Phone size={20} className="shadow-sm font-display shadow-sm font-display shadow-sm italic shadow-sm underline font-display transition-transform hover:scale-110" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-black/5 shadow-brand-900/10 italic font-display shadow-sm font-display italic underline-offset-4 shadow-inner text-brand-900 transition-all shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/20 font-display italic shadow-sm font-display italic shadow-sm underline-offset-4 transition-all">
          <div className="max-w-4xl mx-auto space-y-12 px-4 shadow-sm shadow-brand-900/20 italic px-4 shadow-2xl font-display shadow-brand-900/10 italic shadow-sm font-display italic font-display shadow-sm shadow-brand-900/10 transition-all underline decoration-accent/5">
            <div className="text-center mb-16 shadow-sm shadow-brand-900/10 italic font-display italic font-display italic shadow-sm uppercase underline-offset-10 italic underline decoration-accent/20 transition-all hover:decoration-accent/40">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display italic font-display underline-offset-4 italic underline shadow-accent/20 transition-all select-none">Questions Fréquentes</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 underline-offset-4 italic font-display font-display font-display italic uppercase shadow-sm hover:text-accent transition-colors italic transition-all">Déménager à Louveciennes</h2>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/10 italic font-display shadow-sm italic font-display italic font-display shadow-sm shadow-brand-900/10 italic shadow-md transition-all">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-sm font-display italic shadow-sm shadow-brand-900/10 italic shadow-sm font-display italic shadow-sm underline decoration-slate-100 hover:decoration-accent/10 transition-all">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm font-display font-display shadow-sm italic font-display shadow-sm underscore underline-offset-4 italic shadow-sm shadow-brand-900/5 transition-all group-hover:text-accent">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic shadow-sm font-black italic shadow-sm font-display italic shadow-sm shadow-brand-900/10 group-hover:bg-brand-900 group-hover:text-white transition-all select-none">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 shadow-sm font-display italic shadow-brand-900/10 shadow-sm font-display italic font-display shadow-sm italic shadow-sm font-display underline underline-offset-4 transition-all italic">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/10 shadow-sm font-display shadow-brand-900/10 italic font-display italic shadow-sm underscore underline-offset-4 italic shadow-sm underline transition-all">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic shadow-sm px-4 shadow-2xl underline-offset-4 shadow-black/40 font-display italic shadow-sm font-display italic font-display shadow-sm shadow-black/20 italic font-display italic transition-all shadow-black/50">
        <div className="container mx-auto px-4 md:px-6 shadow-sm shadow-brand-900/40 font-display italic font-display shadow-sm font-display italic font-display shadow-sm shadow-black/40 italic font-display italic shadow-sm transition-all italic underline decoration-white/5 hover:decoration-white/10 transition-all">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic shadow-brand-900/20 font-display italic shadow-sm font-display italic font-display italic shadow-sm text-white transition-all italic underline decoration-white/5 transition-all">
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100">Déménagement</h4>
                <ul className="space-y-4 shadow-sm italic shadow-brand-900/20 font-display italic shadow-sm font-display shadow-sm italic shadow-sm font-display italic shadow-sm italic shadow-sm font-display italic transition-all italic underline decoration-white/5 transition-all">
                  <li><Link to="/devis-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all underline decoration-white/0 hover:decoration-white/20 select-none">Demande de devis</Link></li>
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all underline-offset-4">Calculer le volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium uppercase italic underline-offset-4 italic transition-all select-none">Nos Formules</Link></li>
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all underline decoration-white/0 hover:decoration-white/20 select-none">Particuliers</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100">Logistique</h4>
                <ul className="space-y-4 transition-all">
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all underline decoration-white/0 hover:decoration-white/20">Professionnels</Link></li>
                  <li><Link to="/garde-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium uppercase underline-offset-4 italic transition-all">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all">Monte-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all">Emballage & Soin</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase font-bold tracking-tight transition-all italic hover:opacity-100">Zones</h4>
                <ul className="space-y-4 italic transition-all">
                  <li><Link to="/demenagement-yvelines" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all">Yvelines</Link></li>
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium uppercase italic transition-all underline decoration-white/0 hover:decoration-white/20">Île-de-France</Link></li>
                  <li><Link to="/demenagement-longue-distance" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all select-none">Longue distance</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all">Cartons & Stock</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100">Périphérie</h4>
                <ul className="space-y-4">
                  <li><Link to="/demenagement-bougival" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic underline decoration-white/0 hover:decoration-white/20 underline-offset-4 transition-all">Bougival</Link></li>
                  <li><Link to="/demenagement-la-celle-saint-cloud" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all">La Celle-St-Cloud</Link></li>
                  <li><Link to="/demenagement-rueil-malmaison" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic transition-all">Rueil-Malmaison</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium underline underline-offset-10 transition-colors uppercase italic shadow-sm select-none hover:text-accent transition-all">Contact</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only select-none transition-all duration-1000">
        <p>
          Marne Transdem, expert du déménagement à Louveciennes (78430) et dans les Yvelines, vous accompagne pour tous vos projets : déménagement particulier, maison de standing, pavillon familial, appartement en résidence, studio, ainsi que le transfert de bureaux et locaux professionnels. Expertise en emballage, protection meubles, objets fragiles, vaisselle, livres et tableaux de valeur. Location monte-meuble, garde-meuble sécurisé. Proximité Bougival, La Celle-Saint-Cloud, Croissy-sur-Seine, Le Port-Marly, Marly-le-Roi, Le Chesnay-Rocquencourt, Versailles, Rueil-Malmaison, Saint-Germain-en-Laye et Paris ouest. Devis gratuit et personnalisé.
        </p>
      </div>
    </div>
  );
};

export default LocalLouveciennes;
