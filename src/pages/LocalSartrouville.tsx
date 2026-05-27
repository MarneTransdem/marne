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
  Waves,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalSartrouville: React.FC = () => {
  const path = "/demenagement-sartrouville";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Sartrouville ?",
      a: "Un déménagement à Sartrouville demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Selon qu'il s'agit d'un appartement, d'une maison, d'une résidence ou d'un local professionnel, il est important d'évaluer les caves, garages, parkings, jardins, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Sartrouville et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Sartrouville et dans les secteurs proches comme Maisons-Laffitte, Houilles, Montesson, Carrières-sur-Seine, Bezons, Argenteuil, Cormeilles-en-Parisis, Le Mesnil-le-Roi, Saint-Germain-en-Laye et plus largement en Île-de-France selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Sartrouville ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Sartrouville ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Sartrouville ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone au 01 44 93 54 86. L'estimation prend en compte le volume, les adresses, les accès, les étages, le stationnement, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Sartrouville | Marne Transdem" 
        description="Préparez votre déménagement à Sartrouville avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Sartrouville", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display text-white">
        <div className="absolute inset-0 bg-[url('/images/demenagement-yvelines-78.jpg')] bg-cover bg-center opacity-20 transition-transform duration-1000 scale-105"></div>
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
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Déménagement <br/><span className="text-accent italic">Sartrouville</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-90 shadow-sm">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Sartrouville, avec une organisation adaptée aux appartements, maisons, résidences, bureaux, commerces et contraintes d’accès de l’ouest francilien.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 italic font-display">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-accent text-brand-900 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group font-display italic shadow-brand-900/40"
                >
                  Demander un devis gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 font-display italic"
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
      <div className="bg-white border-b border-slate-100 py-4 font-display italic shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex text-xs font-bold uppercase tracking-widest text-slate-400 italic">
            <Link to="/" className="hover:text-brand-900 transition-colors uppercase">Accueil</Link>
            <span className="mx-3 text-slate-200">/</span>
            <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors uppercase">Secteurs</Link>
            <span className="mx-3 text-slate-200">/</span>
            <span className="text-brand-900 font-black italic uppercase">Sartrouville</span>
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
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8">
                Votre déménagement à Sartrouville
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic text-brand-900">
                <p>
                  Marne Transdem accompagne les déménagements à Sartrouville pour les particuliers et les entreprises. Ville majeure des Yvelines située dans le secteur de la boucle de Seine, Sartrouville offre un cadre de vie dynamique au cœur de l'ouest francilien.
                </p>
                <p>
                  Qu'il s'agisse d'un appartement en résidence avec ascenseur, d'un studio, d'une maison familiale ou d'un pavillon avec jardin, nous maîtrisons les contraintes spécifiques du secteur. Notre expertise s'tend également aux zones professionnelles (bureaux, commerces, cabinets et agences) à proximité de Maisons-Laffitte, Houilles, Montesson et Carrières-sur-Seine.
                </p>
                <p>
                  De l'estimation du volume à la demande de devis, nous planifions chaque intervention en tenant compte des accès (halls, escaliers, parkings, garages) et du stationnement en centre-ville ou dans les rues résidentielles. Notre présence dans le secteur nous permet d'assurer vos transferts vers Bezons, Argenteuil, Cormeilles-en-Parisis, Le Mesnil-le-Roi, Saint-Germain-en-Laye et Paris ouest avec une parfaite connaissance du terrain.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display transition-all">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Sartrouville (78500)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Waves className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Boucle de Seine</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic transition-all group">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-yvelines-78.jpg" 
                  alt="Déménagement Sartrouville - Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20 transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner text-brand-900 shadow-brand-900/5 transition-all">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display underline decoration-accent/10 sm:underline-offset-8 font-display">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">L'exigence d'un déménagement à Sartrouville</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 italic shadow-sm hover:opacity-100 transition-opacity">
            La diversité des profils de logements à Sartrouville impose une organisation rigoureuse pour s'adapter aux différents quartiers et contraintes d'accès.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic decoration-accent/10">
            {[
              {
                title: "Logements Variés",
                desc: "Gestion adaptée pour appartements avec étages, studios, maisons, pavillons et résidences familiales.",
                icon: Home
              },
              {
                title: "Accès & Résidences",
                desc: "Anticipation des halls, ascenseurs parfois limités, escaliers et parties communes à préserver.",
                icon: ShieldCheck
              },
              {
                title: "Espaces de Stockage",
                desc: "Prise en compte des caves, parkings, garages, cours ou jardins pour l'évacuation des biens.",
                icon: MapPin
              },
              {
                title: "Logistique Urbaine",
                desc: "Anticipation du stationnement en centre-ville, rues fréquentées ou zones résidentielles plus calmes.",
                icon: Truck
              },
              {
                title: "Tertiaire & Commerces",
                desc: "Organisation méthodique pour les bureaux, cabinets, agences et commerces de proximité.",
                icon: Building2
              },
              {
                title: "Solutions Techniques",
                desc: "Besoin éventuel de monte-meuble selon les accès ou garde-meuble temporaire pendant une transition.",
                icon: Warehouse
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-brand-900/5 decoration-accent/10">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors shadow-sm italic transition-all font-display">
                  <item.icon className="text-brand-900 group-hover:text-accent shadow-sm transition-all" size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight uppercase italic">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm italic opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-2xl transition-all">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20 transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 font-display italic transition-all">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase shadow-sm">Prestations à Sartrouville</h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto italic font-medium opacity-80 shadow-sm italic transition-all">Des services de déménagement complets pour particuliers et entreprises.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display shadow-sm">
            {[
              {
                title: "Déménagement Particuliers",
                desc: "Appartements, studios, maisons, pavillons, résidences et logements familiaux.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement Entreprises",
                desc: "Bureaux, commerces, cabinets, agences, indépendants et professions libérales.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble / Stockage",
                desc: "Solution utile pendant une transition, des travaux ou une vente immobilière.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Location Monte-meuble",
                desc: "Solution à envisager selon les accès et la faisabilité technique sur place.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage & Protection",
                desc: "Protection des meubles, objets fragiles, cartons, vaisselle et effets personnels.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons & Matériel",
                desc: "Préparation du déménagement avec du matériel de qualité professionnelle.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules Adaptées",
                desc: "Offres Économique, Standard ou Luxe pour s'adapter à votre budget.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de Volume",
                desc: "Estimation indicative du volume de vos biens avant votre devis personnalisé.",
                link: "/calculateur-volume",
                icon: Calculator
              }
            ].map((service, idx) => (
              <Link 
                key={idx} 
                to={service.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-brand-900 transition-all group active:scale-[0.98] italic font-display shadow-2xl transition-transform"
              >
                <service.icon size={32} className="text-accent group-hover:text-brand-900 mb-6 italic transition-colors font-display" />
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight italic uppercase shadow-sm">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic opacity-80">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors uppercase italic shadow-sm underline underline-offset-4 font-display">
                  En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers */}
      <section className="py-24 bg-white font-display italic overflow-hidden shadow-sm text-brand-900 shadow-brand-900/5 transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="flex flex-col lg:flex-row gap-20 items-center italic shadow-sm shadow-brand-900/10">
            <div className="lg:w-1/2 order-2 lg:order-1 relative italic font-display transition-all group">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02] shadow-brand-900/10 italic border-8 border-slate-50 shadow-brand-900/10">
                  <img 
                    src="/images/demenagement-maison-yvelines.jpg" 
                    alt="Déménagement particuliers Sartrouville - Marne Transdem" 
                    className="w-full h-full object-cover shadow-sm font-display italic transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic font-display shadow-accent/40 group-hover:scale-125 transition-transform duration-1000"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic shadow-sm transition-all text-brand-900">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Déménagement de particuliers à Sartrouville</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display transition-all hover:opacity-100">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs déménagements d'appartements, maisons et résidences à Sartrouville. Qu'il s'agisse d'un transfert vers Paris, d'une arrivée dans les Yvelines ou d'un changement de quartier local, nous adaptons nos moyens à votre situation.
                </p>
                <p>
                  Nous assurons la protection de votre mobilier, de vos objets fragiles, vaisselle, livres et tableaux. Notre équipe planifie chaque intervention en tenant compte des accès (étages, ascenseurs, caves, parkings, jardins) pour garantir une manutention fluide et sécurisée. Faites confiance à notre expertise pour une demande de devis personnalisée.
                </p>
              </div>
              <div className="pt-8 shadow-sm italic transition-all">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic font-display shadow-2xl transition-transform"
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
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm italic font-display shadow-brand-900/5 transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic font-display shadow-sm shadow-brand-900/10 transition-all text-brand-900">
             <div className="lg:w-1/2 shadow-sm italic font-display transition-transform hover:scale-[1.01] group">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic font-display shadow-brand-900/10 transition-transform">
                  <img src="/images/transfert-entreprise-78-yvelines.jpg" alt="Déménagement Entreprise Sartrouville" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic transition-transform duration-700 group-hover:scale-105" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic decoration-accent/10 transition-all text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Déménagement d'entreprises à Sartrouville</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100">
                 <p>
                   Marne Transdem accompagne les professionnels à Sartrouville : bureaux, entreprises, cabinets libéraux, agences et commerces de proximité. Nous organisons votre transfert d'activité avec méthode pour limiter l'impact sur votre travail.
                 </p>
                 <p>
                    Nous gérons le mobilier de bureau, les archives, le matériel informatique et la manutention spécifique. Proximité avec Maisons-Laffitte, Houilles, Bezons, Argenteuil et Paris ouest pour une logistique réactive et efficace.
                 </p>
               </div>
               <div className="pt-8 shadow-sm italic px-4 transition-all uppercase tracking-widest font-display">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic font-display shadow-2xl select-none"
                 >
                   Organiser un transfert pro
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform italic shadow-sm" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm shadow-black/5 transition-all text-brand-900 italic font-display">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display transition-all underline decoration-accent/20 sm:underline-offset-8 transition-all">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic">Des formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic text-brand-900 transition-all duration-500 hover:scale-[1.01]">
            {[
              {
                name: "Économique",
                desc: "Optimisez votre budget. Vous préparez vos cartons, Marne Transdem assure la manutention et le transport le jour J.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Le bon compromis. Nous gérons certains éléments comme les objets fragiles ou le mobilier volumineux pour plus de sérénité.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Service clé en main. Déléguez la préparation, l'emballage de vos biens et l'organisation complète de votre déménagement.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic shadow-brand-900/10 font-display transition-transform duration-500 hover:-translate-y-2 group">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6 italic group-hover:scale-110 transition-transform font-display duration-500" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 px-4 uppercase italic shadow-sm font-display group-hover:text-accent transition-colors">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 px-4 italic underline-offset-2 font-display">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors px-4 italic shadow-sm font-display hover:translate-x-1 underline underline-offset-4"
                >
                  Comparer les formules <ArrowRight size={14} className="italic shadow-sm font-display italic transition-transform group-hover:translate-x-1 font-display" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Logistique Technique */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm overflow-hidden italic font-display shadow-inner shadow-brand-900/5 transition-all text-brand-900">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display transition-all text-brand-900">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display transition-all">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/20 transition-all hover:scale-[1.01] group">
               <img src="/images/demenagement-yvelines-camion.jpg" alt="Volume et accès déménagement Sartrouville" className="w-full h-full object-cover font-display italic shadow-inner transition-transform duration-700 group-hover:scale-105" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display text-brand-900 transition-all">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm underline decoration-accent/20 underline-offset-8 italic transition-all hover:text-accent font-display uppercase tracking-tight">Volume, accès & monte-meuble</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100 font-display transition-all">
                 <p>
                    Certains déménagements à Sartrouville nécessitent une étude attentive du volume à déménager et des accès : étages, ascenseurs, escaliers, halls d'immeubles ou pavillons avec jardins et parkings. Nous évaluons chaque contrainte pour adapter les moyens humains et techniques à votre logement.
                 </p>
                 <p>
                    Pour le mobilier volumineux ou les accès complexes, un monte-meuble peut être proposé selon la faisabilité technique du site. Nous anticipons également les zones de stationnement et les accès spécifiques aux locaux professionnels en centre-ville.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic font-display transition-all underline decoration-brand-900/20 hover:decoration-brand-900 font-display transition-all">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest text-[10px] hover:text-accent transition-colors italic shadow-brand-900/10 font-display underline underline-offset-4 select-none hover:translate-x-1 transition-all"
                  >
                    En savoir plus sur le monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic shadow-sm underline font-display transition-all" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculateur de Volume */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl italic font-display shadow-md shadow-brand-900/60 transition-all shadow-inner italic font-display shadow-brand-900/10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm italic font-display transition-all shadow-black/30 text-white shadow-2xl transition-all">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 italic font-display text-white transition-all text-center md:text-left shadow-sm">
             <div className="lg:w-2/3 space-y-8 italic px-4 shadow-sm shadow-black/10 select-none transition-all font-display">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic hover:text-accent transition-colors shadow-sm italic transition-all">Estimez le volume de votre déménagement</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display italic transition-all">
                  Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation indicative pourra être affinée selon les accès et les particularités de votre projet à Sartrouville.
                </p>
                <div className="pt-4 shadow-sm px-4 transition-transform hover:scale-105 italic shadow-brand-900/10 font-display transition-all duration-500">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic transition-all shadow-accent/40 shadow-sm transition-all"
                  >
                    Utiliser le calculateur de volume
                    <Calculator size={20} className="group-hover:rotate-12 transition-transform italic shadow-sm transition-all duration-500" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3 flex justify-center shadow-sm px-4 italic transition-transform hover:scale-110 duration-1000 font-display shadow-2xl">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden italic shadow-2xl shadow-black/30">
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-1000 font-display italic shadow-md transition-all shadow-accent/20" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Méthode en 4 Étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl italic font-display shadow-brand-900/5 text-brand-900 shadow-inner italic font-display transition-all">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic text-center">Notre méthode en 4 étapes</h2>
          <p className="text-slate-600 text-lg text-center mt-6 max-w-2xl mx-auto italic opacity-80 underline-offset-4 decoration-accent/5">Une organisation rigoureuse pour votre projet à Sartrouville, étape par étape.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 transition-all">
          {[
            { step: "01", title: "Analyse du projet", desc: "Étude de vos besoins, du volume et des spécificités du logement à Sartrouville." },
            { step: "02", title: "Évaluation technique", desc: "Étude des accès, étages, stationnement et moyens logistiques nécessaires." },
            { step: "03", title: "Organisation", desc: "Choix de la formule adaptée et planification rigoureuse de l'intervention le jour J." },
            { step: "04", title: "Réalisation", desc: "Déménagement sécurisé et efficace réalisé par nos équipes professionnelles." }
          ].map((item, id) => (
            <div key={id} className="relative bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 italic font-display select-none transition-all shadow-brand-900/5">
              <span className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-brand-900 rounded-xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-500 shadow-accent/20 italic">{item.step}</span>
              <h4 className="text-xl font-bold mb-4 mt-4 uppercase tracking-tight group-hover:text-accent transition-colors duration-500 italic">{item.title}</h4>
              <p className="text-slate-600 text-sm italic font-medium opacity-80 leading-relaxed shadow-sm transition-all duration-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-brand-900/5 text-brand-900 shadow-inner italic font-display transition-all shadow-brand-900/10">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/20 italic font-display transition-all underline decoration-accent/10 sm:border-b sm:border-brand-900/5 pb-16">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic transition-all">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic select-none hover:opacity-100 transition-all font-display italic">Zones Yvelines</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm hover:text-accent transition-colors font-display italic uppercase">Autres secteurs proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display italic">
                Marne Transdem assure vos projets dans les communes limitrophes de Sartrouville et dans tout l'ouest francilien.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 italic font-display shadow-sm underline decoration-brand-900/20 hover:decoration-brand-900 transition-all group">
              <Link to="/secteurs-desservis" className="flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-[10px] px-4 shadow-sm font-display hover:translate-x-1 select-none transition-all duration-300 font-display italic">
                Tous nos secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm duration-300 transition-all" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 font-display italic shadow-sm transition-all duration-500 text-brand-900 shadow-brand-900/5">
            {[
              { name: "S-Germain-en-Laye", link: "/demenagement-saint-germain-en-laye" },
              { name: "Maisons-Laffitte", link: "/demenagement-maisons-laffitte" },
              { name: "Houilles", link: "/demenagement-houilles" },
              { name: "Poissy", link: "/demenagement-poissy" },
              { name: "Conflans-S-H", link: "/demenagement-conflans-sainte-honorine" },
              { name: "Montesson", link: null },
              { name: "Carrières-sur-Seine", link: null },
              { name: "Bezons", link: null },
              { name: "Argenteuil", link: null },
              { name: "Cormeilles-en-P.", link: null },
              { name: "Yvelines (78)", link: "/demenagement-yvelines" },
              { name: "Val-d'Oise (95)", link: "/demenagement-val-d-oise" },
              { name: "Île-de-France", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-all group shadow-sm active:scale-95 shadow-brand-900/10 italic font-display duration-300 overflow-hidden"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic group-hover:text-brand-900 transition-colors uppercase italic transition-all">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 transition-all duration-300 italic" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 italic font-display select-none transition-all grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 group">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm italic transition-all group-hover:text-slate-600">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 shadow-sm font-display italic transition-all group-hover:text-accent shadow-sm" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/10 italic shadow-md text-brand-900 transition-all border-b border-slate-50 italic font-display shadow-brand-900/5 italic underline decoration-accent/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/20 font-display italic shadow-sm px-4 shadow-2xl italic transition-all decoration-accent/10 underline-offset-8 transition-all">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/20 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 transition-all italic px-4 shadow-2xl shadow-brand-900/30 decoration-accent/10 transition-all font-display duration-1000">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/20 group-hover:scale-125 transition-all duration-1000 font-display italic"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 font-display italic shadow-sm underline-offset-4 italic transition-all italic decoration-accent/10 transition-all duration-1000">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm italic font-display uppercase italic text-brand-900 underline decoration-accent/20 transition-all hover:text-accent hover:decoration-accent/40 sm:underline-offset-[12px] font-display italic transition-all duration-1000">
                Vous préparez un déménagement à Sartrouville ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display underline-offset-4 transition-all italic decoration-brand-900/10 transition-all font-display hover:opacity-100 uppercase tracking-widest italic transition-all duration-1000">
                Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm font-display italic shadow-sm transition-all italic px-4 shadow-2xl transition-all font-display uppercase tracking-widest transition-all duration-1000">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/40 select-none transition-all duration-300 font-display italic shadow-black/20"
                >
                  Demander mon devis gratuit
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform font-display duration-300 italic" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/10 italic shadow-sm select-none transition-all duration-300 font-display italic shadow-black/5"
                >
                  <Phone size={20} className="shadow-sm font-display shadow-sm transition-transform hover:scale-110 duration-300 italic transition-all" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-brand-900/10 shadow-brand-900/5 font-display shadow-sm underline decoration-accent/10 sm:underline-offset-8 transition-all shadow-inner font-display underline transition-all">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/20 font-display italic shadow-sm transition-all duration-500 font-display underline decoration-accent/5 transition-all">
          <div className="max-w-4xl mx-auto space-y-12 px-4 shadow-sm shadow-brand-900/20 italic px-4 shadow-2xl transition-all duration-500 font-display underline decoration-accent/10 transition-all">
            <div className="text-center mb-16 shadow-sm shadow-brand-900/10 italic transition-all underline decoration-accent/20 sm:underline-offset-8 transition-all font-display duration-500 uppercase tracking-widest">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display select-none hover:opacity-100 transition-all font-display italic">FAQ Sartrouville</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 uppercase italic hover:text-accent transition-colors italic transition-all text-brand-900 font-display duration-500 uppercase tracking-widest italic transition-all">Questions Fréquentes</h2>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/10 italic font-display shadow-sm transition-all duration-500 font-display">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-sm transition-all duration-500 font-display shadow-brand-900/5 transition-all outline outline-transparent hover:outline-accent/5 duration-500">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm font-display transition-all group-hover:text-accent text-brand-900 duration-300 font-display transition-all font-display italic">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic transition-all select-none group-hover:bg-brand-900 group-hover:text-white font-display duration-300 transition-all">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 shadow-sm font-display italic transition-all duration-500 italic font-display shadow-sm underline decoration-accent/5 transition-all font-display italic transition-all">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/10 shadow-sm font-display transition-all duration-500 font-display italic transition-all">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic shadow-sm px-4 shadow-2xl shadow-black/40 italic font-display shadow-sm transition-all shadow-black/50 font-display underline decoration-white/5 transition-all selection:bg-accent duration-1000">
        <div className="container mx-auto px-4 md:px-6 shadow-sm shadow-black/40 font-display italic font-display shadow-sm transition-all italic underline decoration-white/5 hover:decoration-white/10 transition-all duration-500 font-display duration-1000 transition-all">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic transition-all italic duration-500 font-display shadow-black/20 text-white transition-all underline decoration-white/5 transition-all duration-500 italic transition-all duration-1000">
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display italic transition-all">Déménager</h4>
                <ul className="space-y-4 text-slate-400 font-display italic transition-all">
                  <li><Link to="/devis-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display transition-all">Devis gratuit</Link></li>
                  <li><Link to="/calculateur-volume" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic">Volume indicatif</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display transition-all italic">Offres & Formules</Link></li>
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display transition-all italic">Particuliers</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic transition-all transition-all">Services</h4>
                <ul className="space-y-4 transition-all text-slate-400 font-display italic">
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic">Transfert Bureaux</Link></li>
                  <li><Link to="/garde-meuble-paris" className="hover:text-white transition-colors text-sm font-medium uppercase underline-offset-4 italic transition-all font-display transition-all italic">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic">Monte-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic transition-all italic">Emballage Expert</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic transition-all transition-all">Secteurs</h4>
                <ul className="space-y-4 italic transition-all text-slate-400 font-display italic shadow-black/5">
                  <li><Link to="/demenagement-yvelines" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 font-display transition-all italic">Yvelines (78)</Link></li>
                  <li><Link to="/demenagement-ile-de-france" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display transition-all italic">Île-de-France</Link></li>
                  <li><Link to="/demenagement-poissy" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display transition-all italic">Poissy</Link></li>
                  <li><Link to="/demenagement-saint-germain-en-laye" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic uppercase tracking-widest">St-Germain-en-Laye</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic transition-all transition-all shadow-black/5">Réseau</h4>
                <ul className="space-y-4 text-slate-400 font-display italic">
                  <li><Link to="/demenagement-versailles" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display uppercase tracking-widest italic transition-all shadow-black/5">Versailles</Link></li>
                  <li><Link to="/demenagement-louveciennes" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic transition-all">Louveciennes</Link></li>
                  <li><Link to="/secteurs-desservis" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 select-none font-display italic transition-all">Secteurs desservis</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors text-sm font-medium transition-colors uppercase italic shadow-sm select-none hover:text-accent transition-all text-accent font-black tracking-widest font-display italic uppercase transition-all duration-300">Contact</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic/Accessibility Summary */}
      <div className="sr-only select-none transition-all duration-1000 font-display italic shadow-none opacity-0">
        <p>
          Marne Transdem, entreprise de déménagement intervenant à Sartrouville (78500) et dans les Yvelines (78), assure vos projets de déménagement pour particuliers et entreprises. Services pour maisons, appartements, résidences et locaux professionnels. Expertise en protection de mobilier, emballage d'objets fragiles, location de monte-meuble et garde-meuble sécurisé. Intervention à Sartrouville, Maisons-Laffitte, Houilles, Montesson, Carrières-sur-Seine, Bezons, Argenteuil, Cormeilles-en-Parisis, Saint-Germain-en-Laye et toute l'Île-de-France. Devis gratuit, calculateur de volume en ligne et formules adaptées (Économique, Standard, Luxe).
        </p>
      </div>
    </div>
  );
};

export default LocalSartrouville;
