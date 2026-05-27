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
  Waves
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalLeVesinet: React.FC = () => {
  const path = "/demenagement-le-vesinet";

  const faqData = [
    {
      q: "Comment organiser un déménagement au Vésinet ?",
      a: "Un déménagement au Vésinet demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Selon qu'il s'agit d'un appartement, d'une maison, d'une villa ou d'un local professionnel, il est important d'évaluer les caves, garages, parkings, jardins, portails, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle au Vésinet et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement au Vésinet et dans les secteurs proches comme Chatou, Croissy-sur-Seine, Le Pecq, Saint-Germain-en-Laye, Montesson, Rueil-Malmaison, Le Port-Marly, Bougival, Carrières-sur-Seine et plus largement en Île-de-France selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble au Vésinet ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement au Vésinet ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement au Vésinet ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone au 01 44 93 54 86. L'estimation prend en compte le volume, les adresses, les accès, les étages, le stationnement, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Le Vésinet | Marne Transdem" 
        description="Préparez votre déménagement au Vésinet avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Le Vésinet", item: path }
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
                Déménagement <br/><span className="text-accent italic">Le Vésinet</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-90 shadow-sm">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement au Vésinet, avec une organisation adaptée aux appartements, villas, maisons et bureaux de l’ouest francilien.
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
            <span className="text-brand-900 font-black italic uppercase">Le Vésinet</span>
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
                Votre déménagement au Vésinet
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic">
                <p>
                  Le Vésinet, cité-jardin des Yvelines au cœur de l'Île-de-France, est une destination résidentielle d'exception. Marne Transdem accompagne les particuliers et les professionnels dans leur installation ou leur départ de cette commune verdoyante.
                </p>
                <p>
                  Que vous habitiez une villa remarquable, un pavillon avec jardin, un appartement en résidence ou un studio, nous maîtrisons les contraintes locales : accès de maisons, portails, allées, escaliers et stationnement en zone résidentielle. Notre expertise s'étend également aux villes proches comme Chatou, Croissy-sur-Seine, Le Pecq, Saint-Germain-en-Laye, Montesson, Rueil-Malmaison et Bougival.
                </p>
                <p>
                  De l'estimation du volume à la réalisation finale, nous planifions chaque étape avec soin pour garantir la protection de votre mobilier, de vos objets fragiles et de vos équipements professionnels.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Le Vésinet (78110)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Trees className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Ville-Jardin & Préservée</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-yvelines-78.jpg" 
                  alt="Déménagement Le Vésinet - Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display underline decoration-accent/10 sm:underline-offset-8">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">L'exigence d'un déménagement au Vésinet</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 italic shadow-sm hover:opacity-100 transition-opacity">
            La configuration résidentielle et verdoyante du Vésinet demande une organisation logistique sans faille.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic px-4 shadow-sm shadow-brand-900/5 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic decoration-accent/10">
            {[
              {
                title: "Villas & Pavillons",
                desc: "Gestion des accès spécifiques : portails, allées, jardins et dépendances de maisons.",
                icon: Home
              },
              {
                title: "Rues Résidentielles",
                desc: "Anticipation du stationnement et des accès camions dans les quartiers calmes et arborés.",
                icon: Truck
              },
              {
                title: "Objets de Valeur",
                desc: "Protection soignée de votre mobilier familial, vaisselle, livres, tableaux et archives.",
                icon: ShieldCheck
              },
              {
                title: "Transferts Pro",
                desc: "Accompagnement des bureaux, agences et cabinets libéraux pour un déménagement maîtrisé.",
                icon: Building2
              },
              {
                title: "Stockage & Transition",
                desc: "Besoin de garde-meuble temporaire en cas de travaux de rénovation ou de délai de vente.",
                icon: Warehouse
              },
              {
                title: "Monte-meuble Expert",
                desc: "Solution technique indispensable selon la configuration des accès et l'étage.",
                icon: ArrowUpCircle
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-brand-900/5 decoration-accent/10">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors shadow-sm italic transition-all font-display">
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
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20 transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 font-display italic transition-all">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase shadow-sm">Prestations au Vésinet</h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto italic font-medium opacity-80 shadow-sm italic transition-all">Des services de déménagement complets et adaptés à vos exigences.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display shadow-sm">
            {[
              {
                title: "Déménagement Particuliers",
                desc: "Villas, maisons, appartements et pavillons de standing.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement Entreprises",
                desc: "Bureaux, commerces, agences et locaux professionnels.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble Sécurisé",
                desc: "Solution de stockage utile pendant une transition ou des travaux.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Monte-meuble",
                desc: "Solution à envisager pour le mobilier volumineux et les accès complexes.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage & Protection",
                desc: "Protection des meubles, objets fragiles et matériel adapté.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons & Fournitures",
                desc: "Préparation du déménagement avec du matériel professionnel.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules Adaptées",
                desc: "Économique, Standard ou Luxe selon votre projet.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de Volume",
                desc: "Estimation indicative du volume avant votre devis personnalisé.",
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
      <section className="py-24 bg-white font-display italic overflow-hidden shadow-sm text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="flex flex-col lg:flex-row gap-20 items-center italic shadow-sm shadow-brand-900/10">
            <div className="lg:w-1/2 order-2 lg:order-1 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10 italic border-8 border-slate-50 shadow-brand-900/10">
                  <img 
                    src="/images/demenagement-maison-yvelines.jpg" 
                    alt="Déménagement particuliers Le Vésinet - Marne Transdem" 
                    className="w-full h-full object-cover shadow-sm font-display italic transition-transform"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic font-display shadow-accent/40"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic shadow-sm transition-all text-brand-900">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Résidents du Vésinet</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display transition-all hover:opacity-100">
                <p>
                  S'installer au Vésinet, c'est choisir un environnement privilégié. Marne Transdem accompagne les particuliers dans leurs projets de déménagement d'appartements, maisons, villas et pavillons familiaux.
                </p>
                <p>
                  Nous gérons les transferts du Vésinet vers Paris, de Paris vers Le Vésinet, ainsi que les destinations longue distance. Notre prestation inclut la protection rigoureuse de vos meubles, objets fragiles, livres, vaisselle et effets personnels. Nous analysons les accès spécifiques par le jardin, le portail ou l'ascenseur pour garantir une manutention fluide et sécurisée.
                </p>
              </div>
              <div className="pt-8 shadow-sm italic transition-all">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic font-display shadow-2xl transition-transform"
                >
                  Estimation gratuite
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform italic shadow-sm" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm italic font-display shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic font-display shadow-sm shadow-brand-900/10 transition-all text-brand-900">
             <div className="lg:w-1/2 shadow-sm italic font-display transition-transform hover:scale-[1.01]">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic font-display shadow-brand-900/10 transition-transform">
                  <img src="/images/transfert-entreprise-78-yvelines.jpg" alt="Déménagement Entreprise Le Vésinet" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic transition-transform" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic decoration-accent/10 transition-all text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Solutions Professionnelles</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100">
                 <p>
                   Marne Transdem assure les transferts de bureaux, cabinets médicaux, agences et commerces au Vésinet. Nous minimisons l'impact sur votre activité grâce à un planning rigoureux.
                 </p>
                 <p>
                    Notre équipe prend en charge le mobilier professionnel, les archives et le matériel informatique avec une organisation précise. Profitez de notre proximité avec Chatou, Le Pecq, Saint-Germain-en-Laye et Rueil-Malmaison pour vos transferts locaux dans les Yvelines.
                 </p>
               </div>
               <div className="pt-8 shadow-sm italic px-4 transition-all uppercase tracking-widest font-display">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic font-display shadow-2xl select-none"
                 >
                   Planifier un transfert
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform italic shadow-sm" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm shadow-black/5 transition-all text-brand-900 italic font-display">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display transition-all underline decoration-accent/20 sm:underline-offset-8">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic">Votre formule sur-mesure</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic text-brand-900 transition-all duration-500">
            {[
              {
                name: "Économique",
                desc: "Vous preparez vos cartons, Marne Transdem assure la manutention et le transport sécurisé.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Un équilibre parfait : vous emballez le non-fragile, nous sécurisons vos meubles et objets fragiles.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Déménagement clé en main : nous gérons l'ensemble de l'emballage et de l'organisation pour vous.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic shadow-brand-900/10 font-display transition-transform hover:-translate-y-1">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6 italic hover:scale-110 transition-transform font-display" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 px-4 uppercase italic shadow-sm font-display">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 px-4 italic underline-offset-2 font-display">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors px-4 italic shadow-sm font-display hover:translate-x-1 underline underline-offset-4"
                >
                  Comparer les offres <ArrowRight size={14} className="italic shadow-sm transition-transform group-hover:translate-x-1 font-display" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm overflow-hidden italic font-display shadow-inner shadow-brand-900/5 text-brand-900">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display transition-all text-brand-900">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/20 transition-all hover:scale-[1.01]">
               <img src="/images/demenagement-yvelines-camion.jpg" alt="Logistique déménagement Le Vésinet" className="w-full h-full object-cover font-display italic shadow-inner transition-transform" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm underline decoration-accent/20 underline-offset-8 italic transition-colors hover:text-accent">Détails Logistiques</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100">
                 <p>
                    Chaque déménagement au Vésinet nécessite une étude attentive du volume et des accès : étage, ascenseur, escalier, hall d'immeuble, résidence, maison, villa ou pavillon. Nous évaluons les contraintes de jardins, portails, garages et stationnement avant l'intervention.
                 </p>
                 <p>
                    Pour le mobilier volumineux ou les accès par l'étage difficiles, un monte-meuble peut être proposé selon la faisabilité technique. Nous assurons la gestion des accès depuis la rue pour un chargement fluide.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic font-display transition-all underline decoration-brand-900/20 hover:decoration-brand-900">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic shadow-brand-900/10 font-display underline underline-offset-4 select-none hover:translate-x-1"
                  >
                    En savoir plus sur le monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic shadow-sm underline font-display transition-all" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl italic font-display shadow-md shadow-brand-900/60 shadow-black/40">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm italic font-display transition-all shadow-black/20 text-white">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 italic font-display text-white transition-all text-center md:text-left">
             <div className="lg:w-2/3 space-y-8 italic px-4 shadow-sm shadow-black/10 select-none transition-all">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic hover:text-accent transition-colors">Préparez votre inventaire</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 shadow-sm italic font-display transition-all hover:opacity-100">
                  Avant de demander votre devis au Vésinet, utilisez notre calculateur de volume en ligne pour lister vos meubles, cartons et objets principaux. Un outil simple pour une estimation affinée.
                </p>
                <div className="pt-4 shadow-sm px-4 transition-transform hover:scale-105 italic shadow-brand-900/10">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic transition-all shadow-accent/40"
                  >
                    Estimer mon volume
                    <Calculator size={20} className="group-hover:rotate-12 transition-transform italic shadow-sm" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3 flex justify-center shadow-sm px-4 italic transition-transform hover:scale-110 duration-700">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden italic shadow-2xl shadow-black/20">
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-700 font-display italic shadow-md" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/5 text-brand-900 border-b border-slate-50 italic transition-all underline decoration-brand-900/10">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4 shadow-sm italic underline decoration-accent/10 sm:underline-offset-8 transition-all">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight shadow-sm px-4 uppercase italic font-display hover:text-accent transition-colors">Déménager au Vésinet sans stress</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 px-4 italic shadow-sm transition-all">Un accompagnement en 4 étapes pour une réussite totale.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 shadow-brand-900/5 transition-all underline decoration-accent/5">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 shadow-sm font-display italic shadow-brand-900/10">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-brand-900/5 transition-all"></div>
             {[
               { id: "01", title: "Analyse", desc: "Étude personnalisée de votre volume et des accès de votre logement au Vésinet." },
               { id: "02", title: "Évaluation", desc: "Définition de la formule idéale et des moyens techniques (monte-meuble ou autre)." },
               { id: "03", title: "Planification", desc: "Choix de la date et organisation de l'emballage de vos biens fragiles." },
               { id: "04", title: "Réalisation", desc: "Chargement, transport et installation par nos déménageurs professionnels." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-transform hover:-translate-y-2 duration-300 italic shadow-sm font-display select-none transition-all duration-300">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all font-display italic hover:shadow-accent/40 shadow-sm transition-all duration-300">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight px-4 uppercase italic group-hover:text-accent transition-colors transition-all duration-300">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 px-4 italic shadow-sm transition-all duration-300">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-brand-900/5 text-brand-900 shadow-inner italic font-display shadow-brand-900/10">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/20 italic font-display transition-all underline decoration-accent/10">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic transition-all underline decoration-accent/10">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic select-none hover:opacity-100 transition-all font-display">Zones Yvelines Ouest</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm hover:text-accent transition-colors underline decoration-accent/10">Secteurs Proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display transition-all hover:opacity-100">
                Marne Transdem assure vos projets dans les communes limitrophes du Vésinet.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 italic font-display shadow-sm underline decoration-brand-900/20 hover:decoration-brand-900 transition-all">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm px-4 shadow-sm font-display hover:translate-x-1 select-none transition-all underline decoration-accent/10">
                Nos autres secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm underline decoration-accent/10" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 font-display italic shadow-sm transition-all duration-500 text-brand-900 shadow-brand-900/5">
            {[
              { name: "Chatou", link: "/demenagement-chatou" },
              { name: "Croissy-sur-Seine", link: "/demenagement-croissy-sur-seine" },
              { name: "Le Pecq", link: "/demenagement-le-pecq" },
              { name: "Houilles", link: "/demenagement-houilles" },
              { name: "Saint-Germain", link: null },
              { name: "Montesson", link: null },
              { name: "Rueil-Malmaison", link: "/demenagement-rueil-malmaison" },
              { name: "Le Port-Marly", link: null },
              { name: "Marly-le-Roi", link: "/demenagement-marly-le-roi" },
              { name: "Bougival", link: "/demenagement-bougival" },
              { name: "Carrières/Seine", link: null },
              { name: "Yvelines (78)", link: "/demenagement-yvelines" },
              { name: "Hauts-de-Seine", link: "/demenagement-hauts-de-seine" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-all group shadow-sm active:scale-95 shadow-brand-900/10 italic font-display shadow-sm italic hover:shadow-md transition-all select-none transition-transform duration-300"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic font-display shadow-sm group-hover:text-brand-900 transition-colors uppercase italic">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 shadow-sm transition-all duration-300 font-display" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 italic font-display select-none transition-all grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm italic">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 shadow-sm transition-all duration-500 font-display" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/10 italic shadow-md text-brand-900 transition-all border-b border-slate-50 italic font-display shadow-brand-900/5 italic underline decoration-accent/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/20 font-display italic shadow-sm px-4 shadow-2xl italic transition-all decoration-accent/10 underline-offset-8 transition-all">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/20 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 transition-all italic px-4 shadow-2xl shadow-brand-900/30 decoration-accent/10 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/20 group-hover:scale-125 transition-all duration-1000 font-display"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 font-display italic shadow-sm underline-offset-4 italic transition-all italic decoration-accent/10 transition-all">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm italic font-display uppercase italic text-brand-900 underline decoration-accent/20 transition-all hover:text-accent hover:decoration-accent/40 sm:underline-offset-[12px] font-display">
                Votre projet de déménagement au Vésinet
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display underline-offset-4 transition-all italic decoration-brand-900/10 transition-all font-display hover:opacity-100">
                Recevez une estimation personnalisée sous 48h, adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm font-display italic shadow-sm transition-all italic px-4 shadow-2xl transition-all font-display">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/40 select-none transition-all duration-300 font-display"
                >
                  Devis personnalisé
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform font-display duration-300" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/10 italic shadow-sm select-none transition-all duration-300 font-display"
                >
                  <Phone size={20} className="shadow-sm font-display shadow-sm transition-transform hover:scale-110 duration-300" />
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
            <div className="text-center mb-16 shadow-sm shadow-brand-900/10 italic transition-all underline decoration-accent/20 sm:underline-offset-8 transition-all font-display duration-500">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display select-none transition-all font-display">FAQ Le Vésinet</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 uppercase italic hover:text-accent transition-colors italic transition-all text-brand-900 font-display duration-500">Réponses Clés</h2>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/10 italic font-display shadow-sm transition-all duration-500 font-display">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-sm transition-all duration-500 font-display shadow-brand-900/5 transition-all">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm font-display transition-all group-hover:text-accent text-brand-900 duration-300 font-display transition-all">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic transition-all select-none group-hover:bg-brand-900 group-hover:text-white font-display duration-300">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 shadow-sm font-display italic transition-all duration-500 italic font-display shadow-sm underline decoration-accent/5 transition-all font-display">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/10 shadow-sm font-display transition-all duration-500 font-display">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic shadow-sm px-4 shadow-2xl shadow-black/40 italic font-display shadow-sm transition-all shadow-black/50 font-display underline decoration-white/5 transition-all">
        <div className="container mx-auto px-4 md:px-6 shadow-sm shadow-brand-900/40 font-display italic font-display shadow-sm transition-all italic underline decoration-white/5 hover:decoration-white/10 transition-all duration-500 font-display">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic transition-all italic duration-500 font-display shadow-black/20 text-white transition-all underline decoration-white/5 transition-all duration-500">
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display">Déménager</h4>
                <ul className="space-y-4 text-slate-400 font-display">
                  <li><Link to="/devis-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Devis en ligne</Link></li>
                  <li><Link to="/calculateur-volume" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display">Offres & Formules</Link></li>
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Particuliers</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display">Prestations</h4>
                <ul className="space-y-4 transition-all text-slate-400 font-display">
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Déménagement Bureaux</Link></li>
                  <li><Link to="/garde-meuble-paris" className="hover:text-white transition-colors text-sm font-medium uppercase underline-offset-4 italic transition-all font-display">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Monte-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Emballage Expert</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display">Zones 78</h4>
                <ul className="space-y-4 italic transition-all text-slate-400 font-display">
                  <li><Link to="/demenagement-yvelines" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 font-display">Yvelines</Link></li>
                  <li><Link to="/demenagement-chatou" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display">Chatou</Link></li>
                  <li><Link to="/demenagement-croissy-sur-seine" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Croissy/Seine</Link></li>
                  <li><Link to="/demenagement-versailles" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Versailles</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display">Plus</h4>
                <ul className="space-y-4 text-slate-400 font-display">
                  <li><Link to="/demenagement-rueil-malmaison" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Rueil-Malmaison</Link></li>
                  <li><Link to="/demenagement-bougival" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Bougival</Link></li>
                  <li><Link to="/secteurs-desservis" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 select-none font-display">Tous nos secteurs</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors text-sm font-medium transition-colors uppercase italic shadow-sm select-none hover:text-accent transition-all text-accent font-black tracking-widest font-display">Contact</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only select-none transition-all duration-1000">
        <p>
          Marne Transdem, entreprise de déménagement intervenant au Vésinet (78110) et dans les Yvelines (78), propose des services de déménagement pour particuliers et entreprises. Solutions pour villas, maisons de standing, appartements et bureaux. Expertise en protection de mobilier, emballage d'objets fragiles, location de monte-meuble et garde-meuble sécurisé. Intervention au Vésinet, Chatou, Croissy-sur-Seine, Le Pecq, Saint-Germain-en-Laye, Montesson, Rueil-Malmaison, Bougival et l'ensemble de l'Île-de-France. Devis gratuit, calculateur de volume en ligne et formules de déménagement adaptées (Économique, Standard, Luxe).
        </p>
      </div>
    </div>
  );
};

export default LocalLeVesinet;
