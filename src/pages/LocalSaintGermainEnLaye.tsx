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
  History,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalSaintGermainEnLaye: React.FC = () => {
  const path = "/demenagement-saint-germain-en-laye";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Saint-Germain-en-Laye ?",
      a: "Un déménagement à Saint-Germain-en-Laye demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Selon qu'il s'agit d'un appartement, d'une maison, d'une résidence ou d'un local professionnel, il est important d'évaluer les caves, garages, parkings, jardins, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Saint-Germain-en-Laye et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Saint-Germain-en-Laye et dans les secteurs proches comme Le Pecq, Le Vésinet, Chatou, Croissy-sur-Seine, Marly-le-Roi, Le Port-Marly, Montesson, Fourqueux, Chambourcy, Poissy, Maisons-Laffitte et plus largement en Île-de-France selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Saint-Germain-en-Laye ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Saint-Germain-en-Laye ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Saint-Germain-en-Laye ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, le stationnement, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Saint-Germain-en-Laye | Marne Transdem" 
        description="Préparez votre déménagement à Saint-Germain-en-Laye avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Saint-Germain-en-Laye", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display text-white">
        <div className="absolute inset-0 bg-[url('/images/demenagement-maison-versailles-78.jpg')] bg-cover bg-center opacity-20 transition-transform duration-1000 scale-105"></div>
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
                Déménagement <br/><span className="text-accent italic">Saint-Germain-en-Laye</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-90 shadow-sm">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Saint-Germain-en-Laye, avec une organisation adaptée aux appartements, maisons, résidences, bureaux, commerces et contraintes d'accès de l'ouest francilien.
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
            <span className="text-brand-900 font-black italic uppercase">Saint-Germain-en-Laye</span>
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
                Votre déménagement à Saint-Germain-en-Laye
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic">
                <p>
                  Marne Transdem accompagne les déménagements à Saint-Germain-en-Laye pour les particuliers et les entreprises. Ville majeure des Yvelines en Île-de-France, Saint-Germain-en-Laye offre un cadre de vie prestigieux et dynamique, à proximité immédiate de communes comme Le Pecq, Le Vésinet, Chatou et Croissy-sur-Seine.
                </p>
                <p>
                  Qu'il s'agisse d'un appartement de standing en centre-ville, d'un studio, d'une maison ancienne ou d'un pavillon contemporain, nous maîtrisons les contraintes de l'ouest francilien. Notre expertise s'tend également aux professionnels (bureaux, commerces, cabinets et agences) vers Paris ouest ou les secteurs de Poissy, Chambourcy et Maisons-Laffitte.
                </p>
                <p>
                  De l'estimation du volume à la demande de devis, nous prenons en compte chaque détail : ascenseurs, escaliers étroits des biens anciens, parkings et autorisations de stationnement pour une logistique fluide et sans stress.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Saint-Germain-en-Laye (78100)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <History className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Ville Royale & Patrimoine</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-maison-versailles-78.jpg" 
                  alt="Déménagement Saint-Germain-en-Laye - Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Préparation spécifique */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display underline decoration-accent/10 sm:underline-offset-8">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Une préparation sur-mesure</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 italic shadow-sm hover:opacity-100 transition-opacity">
            La diversité des profils de logements à Saint-Germain-en-Laye (ancien, moderne, centre-ville ou résidences) impose une organisation rigoureuse.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic">
            {[
              {
                title: "Logements Variés",
                desc: "Gestion adaptée pour appartements, studios, pavillons et grandes demeures familiales avec jardins ou allées.",
                icon: Home
              },
              {
                title: "Accès & Patrimoine",
                desc: "Protection spécifique pour les immeubles anciens, escaliers étroits et préservation des parties communes.",
                icon: ShieldCheck
              },
              {
                title: "Centre-Ville & Stationnement",
                desc: "Anticipation des rues commerçantes fréquentées et gestion des accès depuis la rue ou via cour intérieure.",
                icon: MapPin
              },
              {
                title: "Professionnels & Bureaux",
                desc: "Organisation méthodique pour les cabinets libéraux, agences et commerces du centre-ville et des zones tertiaires.",
                icon: Building2
              },
              {
                title: "Transitions Immobilières",
                desc: "Solutions de garde-meuble sécurisées en cas de travaux, vente ou décalage d'emménagement.",
                icon: Warehouse
              },
              {
                title: "Monte-meuble Technique",
                desc: "Solution à envisager pour les pièces volumineuses ou les étages sans ascenseur, selon faisabilité technique.",
                icon: ArrowUpCircle
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-brand-900/5">
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

      {/* 4. Services Section */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20 transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 font-display italic transition-all">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase shadow-sm">Nos services à Saint-Germain-en-Laye</h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto italic font-medium opacity-80 shadow-sm italic transition-all">Une expertise complète pour tous types de profils et de projets.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic uppercase">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display">
            {[
              {
                title: "Déménagement Particuliers",
                desc: "Accompagnement pour appartements, studios, maisons et résidences familiales.",
                link: "/demenagement-particuliers-paris",
                icon: Users
              },
              {
                title: "Déménagement Entreprises",
                desc: "Transferts de bureaux, cabinets, agences et commerces pour les professionnels.",
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
                desc: "Solution à envisager pour les accès complexes par la fenêtre selon faisabilité.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage & Protection",
                desc: "Protection experte des meubles, objets fragiles, vaisselle et objets de valeur.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons & Matériel",
                desc: "Préparation optimale avec des fournitures et cartons de qualité professionnelle.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules de Déménagement",
                desc: "Choisissez entre nos formules Économique, Standard ou Luxe selon vos besoins.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de Volume",
                desc: "Estimez le volume de vos biens avant de solliciter votre devis gratuit.",
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
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent group-hover:text-brand-900 transition-colors uppercase italic shadow-sm underline underline-offset-4 font-display">
                  En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement Particuliers */}
      <section className="py-24 bg-white font-display italic overflow-hidden shadow-sm text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="flex flex-col lg:flex-row gap-20 items-center italic shadow-sm shadow-brand-900/10">
            <div className="lg:w-1/2 order-2 lg:order-1 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10 italic border-8 border-slate-50 shadow-brand-900/10 transition-transform">
                  <img 
                    src="/images/demenagement-maison-yvelines.jpg" 
                    alt="Déménagement particuliers Saint-Germain-en-Laye" 
                    className="w-full h-full object-cover shadow-sm font-display italic transition-transform"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic font-display shadow-accent/40"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic shadow-sm transition-all text-brand-900">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Particuliers & Familles</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display transition-all hover:opacity-100">
                <p>
                  Marne Transdem accompagne les résidents de Saint-Germain-en-Laye pour leurs déménagements d'appartements, maisons de ville et pavillons familiaux. Que vous quittiez Saint-Germain vers Paris ou que vous vous installiez dans les Yvelines depuis une autre région, nous gérons votre projet avec le plus grand soin.
                </p>
                <p>
                  Nous prenons en charge la protection de vos meubles, de vos livres, de votre vaisselle et de vos souvenirs. Notre équipe s'adapte aux accès spécifiques (ascenseur, cave, garage, parking ou jardin avec portail) pour assurer une manutention sécurisée de vos effets personnels.
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

      {/* 6. Déménagement Entreprises */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm italic font-display shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic font-display shadow-sm shadow-brand-900/10 transition-all text-brand-900">
             <div className="lg:w-1/2 shadow-sm italic font-display transition-transform hover:scale-[1.01]">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic font-display shadow-brand-900/10 transition-transform">
                  <img src="/images/transfert-entreprise-78-yvelines.jpg" alt="Déménagement Entreprise Saint-Germain-en-Laye" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic transition-transform" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic decoration-accent/10 transition-all text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Transferts Professionnels</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100">
                 <p>
                   Marne Transdem assure les transferts de bureaux, agences et cabinets à Saint-Germain-en-Laye. Nous organisons le déménagement de votre matériel informatique, de vos archives et de votre mobilier professionnel avec une logistique rigoureuse pour garantir la continuité de votre activité.
                 </p>
                 <p>
                    Notre proximité avec Le Pecq, Le Vésinet, Chatou, Maisons-Laffitte et Paris ouest nous permet d'intervenir avec réactivité pour les petites et moyennes entreprises de la boucle de la Seine.
                 </p>
               </div>
               <div className="pt-8 shadow-sm italic px-4 transition-all uppercase tracking-widest font-display">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic font-display shadow-2xl select-none"
                 >
                   Organiser un transfert professionnel
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform italic shadow-sm" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm shadow-black/5 transition-all text-brand-900 italic font-display">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display transition-all underline decoration-accent/20 sm:underline-offset-8 uppercase tracking-widest">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic text-brand-900 transition-all duration-500">
            {[
              {
                name: "Économique",
                desc: "La solution pour optimiser votre budget. Vous effectuez vos cartons, Marne Transdem prend en charge la manutention et le transport selon le projet.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "L'équilibre parfait. Une formule adaptée pour déléguer certains éléments comme les objets fragiles ou certains meubles selon les besoins.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Sérénité absolue. Une formule complète pour déléguer davantage de préparation, d'emballage et d'organisation selon la prestation choisie.",
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
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-[10px] hover:text-accent transition-colors px-4 italic shadow-sm font-display hover:translate-x-1 underline underline-offset-4"
                >
                  Comparer les formules <ArrowRight size={14} className="italic shadow-sm transition-transform group-hover:translate-x-1 font-display" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Logistique Technique */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm overflow-hidden italic font-display shadow-inner shadow-brand-900/5 text-brand-900">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display transition-all text-brand-900">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/20 transition-all hover:scale-[1.01]">
               <img src="/images/location-monte-meuble-idf.jpg" alt="Logistique déménageur Saint-Germain-en-Laye" className="w-full h-full object-cover font-display italic shadow-inner transition-transform" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm underline decoration-accent/20 underline-offset-8 italic transition-colors hover:text-accent font-display">Volume, accès & monte-meuble</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100 font-display">
                 <p>
                    Certains déménagements à Saint-Germain-en-Laye nécessitent une étude attentive du volume et des accès (halls d'immeubles, ascenseurs limités, escaliers des bâtiments anciens). Nous anticipons les besoins en stationnement et les accès de plain-pied ou en étage pour vos maisons et pavillons.
                 </p>
                 <p>
                    Pour les meubles volumineux ou les accès difficiles depuis la rue, un monte-meuble peut être envisagé. Sa mise en place dépend de la faisabilité technique et de la configuration de votre adresse à Saint-Germain-en-Laye.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic font-display transition-all underline decoration-brand-900/20 hover:decoration-brand-900 font-display">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest text-[10px] hover:text-accent transition-colors italic shadow-brand-900/10 font-display underline underline-offset-4 select-none hover:translate-x-1"
                  >
                    En savoir plus sur le monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic shadow-sm underline font-display transition-all" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculateur de Volume */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl italic font-display shadow-md shadow-brand-900/60 shadow-black/40">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm italic font-display transition-all shadow-black/20 text-white">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 italic font-display text-white transition-all text-center md:text-left">
             <div className="lg:w-2/3 space-y-8 italic px-4 shadow-sm shadow-black/10 select-none transition-all">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic hover:text-accent transition-colors">Estimez le volume de votre déménagement</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display">
                  Avant de solliciter votre devis gratuit, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation indicative pourra être affinée selon les accès et les caractéristiques de votre projet à Saint-Germain-en-Laye.
                </p>
                <div className="pt-4 shadow-sm px-4 transition-transform hover:scale-105 italic shadow-brand-900/10">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic transition-all shadow-accent/40"
                  >
                    Utiliser le calculateur de volume
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

      {/* 10. Méthode en 4 Étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl italic font-display shadow-brand-900/5 text-brand-900 shadow-inner italic font-display">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic text-center">Notre méthode en 4 étapes</h2>
          <p className="text-slate-600 text-lg text-center mt-6 max-w-2xl mx-auto italic">Une organisation claire pour un déménagement sans imprévu à Saint-Germain-en-Laye.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Analyse du projet", desc: "Écoute de vos besoins et définition des dates clés." },
            { step: "2", title: "Évaluation volume/accès", desc: "Prise en compte des étages, ascenseurs et stationnement." },
            { step: "3", title: "Choix de formule", desc: "Organisation personnalisée selon le niveau de service choisi." },
            { step: "4", title: "Réalisation", desc: "Prise en charge experte par nos déménageurs professionnels." }
          ].map((item, id) => (
            <div key={id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm relative italic">
              <span className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-brand-900 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">{item.step}</span>
              <h4 className="text-xl font-bold mb-4 mt-4 uppercase tracking-tight">{item.title}</h4>
              <p className="text-slate-600 text-sm italic font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-brand-900/10 shadow-brand-900/5 text-brand-900 shadow-inner italic font-display shadow-brand-900/10 transition-all">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/20 italic font-display transition-all underline decoration-accent/10 border-b border-brand-900/5 pb-16">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic transition-all underline decoration-accent/10">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic select-none hover:opacity-100 transition-all font-display italic">Zones Yvelines</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm hover:text-accent transition-colors underline decoration-accent/10 font-display">Autres secteurs proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display">
                Marne Transdem intervient également dans toutes les communes limitrophes de Saint-Germain-en-Laye et dans l'ouest francilien.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 italic font-display shadow-sm underline decoration-brand-900/20 hover:decoration-brand-900 transition-all">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-[10px] px-4 shadow-sm font-display hover:translate-x-1 select-none transition-all underline decoration-accent/10 font-display italic">
                Tous nos secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm underline decoration-accent/10" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 font-display italic shadow-sm transition-all duration-500 text-brand-900 shadow-brand-900/5">
            {[
              { name: "Le Pecq", link: "/demenagement-le-pecq" },
              { name: "Le Vésinet", link: "/demenagement-le-vesinet" },
              { name: "Chatou", link: "/demenagement-chatou" },
              { name: "Croissy/Seine", link: "/demenagement-croissy-sur-seine" },
              { name: "Marly-le-Roi", link: "/demenagement-marly-le-roi" },
              { name: "Nogent-sur-Marne", link: "/demenagement-nogent-sur-marne" },
              { name: "Louveciennes", link: "/demenagement-louveciennes" },
              { name: "Fourqueux", link: null },
              { name: "Poissy", link: "/demenagement-poissy" },
              { name: "Sartrouville", link: "/demenagement-sartrouville" },
              { name: "Mantes-la-Jolie", link: "/demenagement-mantes-la-jolie" },
              { name: "Maisons-Laffitte", link: "/demenagement-maisons-laffitte" },
              { name: "Chambourcy", link: null },
              { name: "Montesson", link: null },
              { name: "Le Port-Marly", link: null },
              { name: "Yvelines (78)", link: "/demenagement-yvelines" },
              { name: "Île-de-France", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-all group shadow-sm active:scale-95 shadow-brand-900/10 italic font-display overflow-hidden"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic group-hover:text-brand-900 transition-colors uppercase">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 transition-all duration-300" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 italic font-display select-none transition-all grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm italic">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 shadow-sm font-display italic" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/10 italic shadow-md text-brand-900 transition-all border-b border-slate-50 italic font-display shadow-brand-900/5 italic underline decoration-accent/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/20 font-display italic shadow-sm px-4 shadow-2xl italic transition-all decoration-accent/10 underline-offset-8 transition-all">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/20 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 transition-all italic px-4 shadow-2xl shadow-brand-900/30 decoration-accent/10 transition-all font-display">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/20 group-hover:scale-125 transition-all duration-1000 font-display italic"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 font-display italic shadow-sm underline-offset-4 italic transition-all italic decoration-accent/10 transition-all">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm italic font-display uppercase italic text-brand-900 underline decoration-accent/20 transition-all hover:text-accent hover:decoration-accent/40 sm:underline-offset-[12px] font-display italic">
                Vous préparez un déménagement à Saint-Germain-en-Laye ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display underline-offset-4 transition-all italic decoration-brand-900/10 transition-all font-display hover:opacity-100 uppercase tracking-widest italic">
                Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm font-display italic shadow-sm transition-all italic px-4 shadow-2xl transition-all font-display uppercase tracking-widest">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/40 select-none transition-all duration-300 font-display italic"
                >
                  Demander mon devis gratuit
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform font-display duration-300 italic" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/10 italic shadow-sm select-none transition-all duration-300 font-display italic"
                >
                  <Phone size={20} className="shadow-sm font-display shadow-sm transition-transform hover:scale-110 duration-300 italic" />
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
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display select-none transition-all font-display italic">FAQ Saint-Germain-en-Laye</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 uppercase italic hover:text-accent transition-colors italic transition-all text-brand-900 font-display duration-500 uppercase tracking-widest italic">Questions Fréquentes</h2>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/10 italic font-display shadow-sm transition-all duration-500 font-display">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-sm transition-all duration-500 font-display shadow-brand-900/5 transition-all italic">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm font-display transition-all group-hover:text-accent text-brand-900 duration-300 font-display transition-all font-display italic">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic transition-all select-none group-hover:bg-brand-900 group-hover:text-white font-display duration-300 italic">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 shadow-sm font-display italic transition-all duration-500 italic font-display shadow-sm underline decoration-accent/5 transition-all font-display italic">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/10 shadow-sm font-display transition-all duration-500 font-display italic">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic shadow-sm px-4 shadow-2xl shadow-black/40 italic font-display shadow-sm transition-all shadow-black/50 font-display underline decoration-white/5 transition-all selection:bg-accent">
        <div className="container mx-auto px-4 md:px-6 shadow-sm shadow-black/40 font-display italic font-display shadow-sm transition-all italic underline decoration-white/5 hover:decoration-white/10 transition-all duration-500 font-display">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic transition-all italic duration-500 font-display shadow-black/20 text-white transition-all underline decoration-white/5 transition-all duration-500 italic">
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display italic">Déménager</h4>
                <ul className="space-y-4 text-slate-400 font-display italic">
                  <li><Link to="/devis-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Demande de devis</Link></li>
                  <li><Link to="/calculateur-volume" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display">Nos Formules</Link></li>
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Particuliers</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display italic transition-all">Prestations</h4>
                <ul className="space-y-4 transition-all text-slate-400 font-display italic">
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Déménagement Entreprises</Link></li>
                  <li><Link to="/garde-meuble-paris" className="hover:text-white transition-colors text-sm font-medium uppercase underline-offset-4 italic transition-all font-display">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Monte-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic">Emballage & Protection</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic">Villes</h4>
                <ul className="space-y-4 italic transition-all text-slate-400 font-display italic">
                  <li><Link to="/demenagement-yvelines" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 font-display">Yvelines (78)</Link></li>
                  <li><Link to="/demenagement-ile-de-france" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display">Île-de-France</Link></li>
                  <li><Link to="/demenagement-le-pecq" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Le Pecq</Link></li>
                  <li><Link to="/demenagement-le-vesinet" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Le Vésinet</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic tracking-widest">Plus</h4>
                <ul className="space-y-4 text-slate-400 font-display">
                  <li><Link to="/demenagement-chatou" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display uppercase tracking-widest italic">Chatou</Link></li>
                  <li><Link to="/demenagement-marly-le-roi" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic">Marly-le-Roi</Link></li>
                  <li><Link to="/secteurs-desservis" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 select-none font-display italic">Tous nos secteurs</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors text-sm font-medium transition-colors uppercase italic shadow-sm select-none hover:text-accent transition-all text-accent font-black tracking-widest font-display italic uppercase">Contact</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Content */}
      <div className="sr-only select-none transition-all duration-1000">
        <p>
          Marne Transdem, entreprise de déménagement intervenant à Saint-Germain-en-Laye (78100) et dans les Yvelines (78), assure vos projets de déménagement pour particuliers et entreprises. Services pour maisons de ville, appartements de standing, résidences et locaux professionnels. Expertise en protection de mobilier, emballage d'objets fragiles, location de monte-meuble et garde-meuble sécurisé. Intervention à Saint-Germain-en-Laye, Le Pecq, Le Vésinet, Chatou, Croissy-sur-Seine, Marly-le-Roi, Le Port-Marly, Montesson, Fourqueux, Chambourcy, Poissy, Maisons-Laffitte et toute l'Île-de-France. Devis gratuit, calculateur de volume en ligne et formules adaptées (Économique, Standard, Luxe).
        </p>
      </div>
    </div>
  );
};

export default LocalSaintGermainEnLaye;
