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
  Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalMarlyLeRoi: React.FC = () => {
  const path = "/demenagement-marly-le-roi";

  const faqData = [
    {
      q: "Comment préparer un déménagement à Marly-le-Roi ?",
      a: "Un déménagement à Marly-le-Roi nécessite d'anticiper les spécificités de la ville : dénivelés, rues étroites du Vieux Marly et accès aux résidences forestières. Il est essentiel d'évaluer le volume, le type d'accès (maison, étage, ascenseur) et le besoin éventuel de stationnement. Marne Transdem vous aide à planifier chaque détail, de la protection de votre mobilier à la logistique du jour J."
    },
    {
      q: "Marne Transdem intervient-elle dans le quartier du Vieux Marly ?",
      a: "Oui, nous intervenons dans tout Marly-le-Roi, y compris le cœur historique, les secteurs proches du Parc de Marly et les zones résidentielles plus récentes. Nous adaptons la taille de nos camions et nos équipes selon l'étroitesse des rues et les contraintes d'accès."
    },
    {
      q: "Faut-il une autorisation de stationnement à Marly-le-Roi ?",
      a: "Pour garantir l'accès du camion de déménagement et la sécurité des opérations, il est fortement recommandé de réserver des places de stationnement auprès des services municipaux de Marly-le-Roi. Nos conseillers peuvent vous guider dans ces démarches administratives."
    },
    {
      q: "Proposez-vous des formules pour les petits et gros volumes ?",
      a: "Absolument. Nous proposons trois formules (Économique, Standard, Luxe) qui s'adaptent aussi bien au déménagement d'un studio qu'à celui d'une grande propriété familiale ou de bureaux professionnels."
    },
    {
      q: "Quelles sont les solutions pour les meubles qui ne passent pas par l'escalier ?",
      a: "Si un meuble volumineux ne passe pas par l'escalier ou l'ascenseur, nous pouvons mettre en place un monte-meuble extérieur, sous réserve de faisabilité technique et d'accès en façade."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Marly-le-Roi | Marne Transdem" 
        description="Préparez votre déménagement à Marly-le-Roi avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Marly-le-Roi", item: path }
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
                Déménagement <br/><span className="text-accent italic">Marly-le-Roi</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-90 shadow-sm">
                Marne Transdem assure vos projets de déménagement à Marly-le-Roi, la ville royale. Une expertise sur-mesure pour vos maisons de ville, appartements de standing et locaux professionnels dans les Yvelines.
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
            <span className="text-brand-900 font-black italic uppercase">Marly-le-Roi</span>
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
                Déménager à Marly-le-Roi (78160)
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic">
                <p>
                  Marly-le-Roi, célèbre pour son parc dessiné par Le Nôtre et son passé de villégiature royale, est une commune prisée des Yvelines offrant un cadre de vie exceptionnel. Marne Transdem accompagne les résidents et les entreprises dans leurs projets de déménagement au cœur de cette ville chargée d'histoire.
                </p>
                <p>
                  Qu'il s'agisse des ruelles escarpées du Vieux Marly, des résidences forestières ou des quartiers pavillonnaires plus récents, nous maîtrisons les spécificités logistiques locales. Notre proximité avec Saint-Germain-en-Laye, Louveciennes, Le Pecq et Versailles nous permet d'intervenir avec une grande réactivité.
                </p>
                <p>
                  Nous prenons en compte les contraintes d'accès (pentes, rues étroites, étages sans ascenseur) et assurons la protection optimale de vos biens les plus précieux, dans le respect du calme et de l'harmonie de votre environnement.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Marly-le-Roi (78160)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Crown className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Ville Royale & Patrimoine</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-maison-versailles-78.jpg" 
                  alt="Déménagement Marly-le-Roi - Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Savoir-faire local */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner text-brand-900 shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display underline decoration-accent/10 sm:underline-offset-8">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">L'excellence au service de Marly</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 italic shadow-sm hover:opacity-100 transition-opacity">
            La topographie et le charme historique de Marly-le-Roi exigent une organisation logistique experte que Marne Transdem met à votre disposition.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic">
            {[
              {
                title: "Centre Historique",
                desc: "Expertise spécifique pour les accès étroits et les rues du Vieux Marly nécessitant des véhicules adaptés.",
                icon: MapPin
              },
              {
                title: "Villas & Résidences",
                desc: "Logistique soignée pour les grandes propriétés et les appartements de standing avec accès jardin ou forêt.",
                icon: Home
              },
              {
                title: "Protection & Art",
                desc: "Emballage haute performance pour vos objets de collection, tableaux et mobilier d'époque.",
                icon: ShieldCheck
              },
              {
                title: "Transferts Professionnels",
                desc: "Accompagnement des entreprises, agences et cabinets libéraux de la boucle de la Seine.",
                icon: Building2
              },
              {
                title: "Solutions de Stockage",
                desc: "Service de garde-meuble sécurisé à proximité pour vos transitions immobilières ou travaux.",
                icon: Warehouse
              },
              {
                title: "Monte-meuble Haute Performance",
                desc: "Utilisation d'équipements spécialisés pour les étages ou les configurations de façades difficiles.",
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

      {/* 4. Prestations à Marly-le-Roi */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent opacity-5 rotate-12 translate-x-1/2 italic shadow-accent/20 transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 font-display italic transition-all">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase shadow-sm">Services à Marly-le-Roi</h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto italic font-medium opacity-80 shadow-sm italic transition-all">Une gamme complète de prestations pour un déménagement sans compromis.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic uppercase">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display">
            {[
              {
                title: "Déménagement Particuliers",
                desc: "Pour les familles et résidents choisissant la qualité de vie de Marly.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement Entreprises",
                desc: "Transferts de bureaux et locaux professionnels dans l'ouest francilien.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble Sécurisé",
                desc: "Une solution de stockage flexible pour vos meubles en toute sérénité.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Monte-meuble Expert",
                desc: "Accès technique par la fenêtre pour vos pièces les plus imposantes.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage & Protection",
                desc: "Matériel professionnel et savoir-faire pour une mise en sécurité totale.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Fournitures de Déménagement",
                desc: "Vente de cartons et d'accessoires de qualité professionnelle.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules Flexibles",
                desc: "Le choix entre trois niveaux de service : Éco, Standard ou Luxe.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur de Volume",
                desc: "Évaluez vos besoins en quelques clics avant votre devis gratuit.",
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
                    alt="Déménagement particuliers Marly-le-Roi - Marne Transdem" 
                    className="w-full h-full object-cover shadow-sm font-display italic transition-transform"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic font-display shadow-accent/40"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic shadow-sm transition-all text-brand-900">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Familles & Résidents</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display transition-all hover:opacity-100">
                <p>
                  S'installer à Marly-le-Roi, c'est choisir un environnement paisible et historique. Marne Transdem accompagne les particuliers dans leurs projets de déménagement d'appartements, maisons de ville et propriétés familiales.
                </p>
                <p>
                  Nous gérons votre déménagement avec le souci du détail, assurant une protection optimale de votre mobilier, de vos objets fragiles et de vos souvenirs. Notre équipe s'adapte aux fortes pentes de la ville et à l'étroitesse des accès du centre pour garantir une manutention fluide et sécurisée, quelle que soit la configuration de votre logement au départ ou à l'arrivée.
                </p>
              </div>
              <div className="pt-8 shadow-sm italic transition-all">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic font-display shadow-2xl transition-transform"
                >
                  Estimation personnalisée
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
                  <img src="/images/transfert-entreprise-78-yvelines.jpg" alt="Déménagement Entreprise Marly-le-Roi" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic transition-transform" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic decoration-accent/10 transition-all text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Services aux Professionnels</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100">
                 <p>
                   Marne Transdem assure les transferts de bureaux, agences et commerces à Marly-le-Roi. Nous comprenons l'importance de minimiser l'interruption de votre activité professionnelle.
                 </p>
                 <p>
                    Notre équipe experte prend en charge le mobilier de bureau, le parc informatique et les archives avec une organisation rigoureuse. Qu'il s'agisse d'un transfert local au sein de Marly ou vers Paris, nos déménageurs garantissent une transition sans couture pour votre entreprise.
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

      {/* 7. Nos Formules */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm shadow-black/5 transition-all text-brand-900 italic font-display">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display transition-all underline decoration-accent/20 sm:underline-offset-8 uppercase tracking-widest">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic">Vos formules sur-mesure</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic text-brand-900 transition-all duration-500">
            {[
              {
                name: "Économique",
                desc: "La solution pour optimiser votre budget. Vous effectuez vos cartons, nous gérons le chargement et le transport sécurisé.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Le meilleur rapport confort/prix. Nous emballons vos objets fragiles et protégeons votre mobilier pour un transfert serein.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Prestation clé en main. Nos professionnels gèrent l'emballage intégral et l'installation complète dans votre nouveau logement.",
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
                  Voir les détails <ArrowRight size={14} className="italic shadow-sm transition-transform group-hover:translate-x-1 font-display" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Logistique & Accès */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm overflow-hidden italic font-display shadow-inner shadow-brand-900/5 text-brand-900">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display transition-all text-brand-900">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/20 transition-all hover:scale-[1.01]">
               <img src="/images/demenagement-yvelines-camion.jpg" alt="Logistique déménageur Marly-le-Roi" className="w-full h-full object-cover font-display italic shadow-inner transition-transform" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm underline decoration-accent/20 underline-offset-8 italic transition-colors hover:text-accent font-display">Rues & Accès complexes</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100 font-display">
                 <p>
                    Marly-le-Roi présente des défis logistiques liés à sa topographie : dénivelés importants et rues parfois étroites dans le centre villageois. Marne Transdem évalue rigoureusement les accès (portails, allées, escaliers, parkings) avant chaque intervention.
                 </p>
                 <p>
                    Pour les accès difficiles en étage dans les immeubles du Vieux Marly ou les mobiliers très lourds, l'utilisation d'un monte-meuble peut s'avérer nécessaire. Nous assurons la mise en place de la signalisation et des protections indispensables le jour J.
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
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic hover:text-accent transition-colors">Maîtrisez votre volume</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display">
                  Avant de solliciter votre devis gratuit à Marly-le-Roi, utilisez notre calculateur de volume interactif. Listez vos meubles et cartons pour obtenir une première estimation fiable de vos besoins logistiques.
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

      {/* 11. Secteurs proches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-brand-900/5 text-brand-900 shadow-inner italic font-display shadow-brand-900/10">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/20 italic font-display transition-all underline decoration-accent/10">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic transition-all underline decoration-accent/10">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic select-none hover:opacity-100 transition-all font-display italic">Zones Yvelines Ouest</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm hover:text-accent transition-colors underline decoration-accent/10 font-display">Villes Desservies</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display">
                Marne Transdem intervient également dans toutes les communes limitrophes de Marly-le-Roi.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 italic font-display shadow-sm underline decoration-brand-900/20 hover:decoration-brand-900 transition-all">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-[10px] px-4 shadow-sm font-display hover:translate-x-1 select-none transition-all underline decoration-accent/10 font-display italic">
                Tous nos secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm underline decoration-accent/10" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 font-display italic shadow-sm transition-all duration-500 text-brand-900 shadow-brand-900/5 transition-all">
            {[
              { name: "Louveciennes", link: "/demenagement-louveciennes" },
              { name: "Le Pecq", link: "/demenagement-le-pecq" },
              { name: "Bougival", link: "/demenagement-bougival" },
              { name: "Saint-Germain", link: null },
              { name: "Le Port-Marly", link: null },
              { name: "Le Vésinet", link: "/demenagement-le-vesinet" },
              { name: "La Celle-St-Cloud", link: "/demenagement-la-celle-saint-cloud" },
              { name: "Versailles", link: "/demenagement-versailles" },
              { name: "Noisy-le-Roi", link: null },
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
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 shadow-sm transition-all duration-300 font-display italic" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 italic font-display select-none transition-all grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm italic">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 shadow-sm transition-all duration-500 font-display italic" />
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
                Préparez votre déménagement à Marly
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display underline-offset-4 transition-all italic decoration-brand-900/10 transition-all font-display hover:opacity-100 uppercase tracking-widest italic">
                Confiez votre projet à des experts du déménagement dans les Yvelines. Devis gratuit et sans engagement sous 48h.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm font-display italic shadow-sm transition-all italic px-4 shadow-2xl transition-all font-display uppercase tracking-widest">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/40 select-none transition-all duration-300 font-display italic"
                >
                  Demander un devis
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
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display select-none transition-all font-display italic">FAQ Marly-le-Roi</span>
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
                  <li><Link to="/devis-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Devis en ligne</Link></li>
                  <li><Link to="/calculateur-volume" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display">Nos Formules</Link></li>
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Particuliers</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display italic transition-all">Prestations</h4>
                <ul className="space-y-4 transition-all text-slate-400 font-display italic">
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Déménagement Bureaux</Link></li>
                  <li><Link to="/garde-meuble-paris" className="hover:text-white transition-colors text-sm font-medium uppercase underline-offset-4 italic transition-all font-display">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Monte-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic">Emballage Expert</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic">Zones 78</h4>
                <ul className="space-y-4 italic transition-all text-slate-400 font-display italic">
                  <li><Link to="/demenagement-yvelines" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 font-display">Yvelines (78)</Link></li>
                  <li><Link to="/demenagement-louveciennes" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display">Louveciennes</Link></li>
                  <li><Link to="/demenagement-bougival" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display">Bougival</Link></li>
                  <li><Link to="/demenagement-versailles" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display">Versailles</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100 font-display italic tracking-widest">Plus</h4>
                <ul className="space-y-4 text-slate-400 font-display">
                  <li><Link to="/demenagement-le-pecq" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display uppercase tracking-widest italic">Le Pecq</Link></li>
                  <li><Link to="/demenagement-la-celle-saint-cloud" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic">La Celle-St-Cloud</Link></li>
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
          Marne Transdem, entreprise de déménagement intervenant à Marly-le-Roi (78160) et dans les Yvelines (78), assure vos projets de déménagement pour particuliers et entreprises. Services pour maisons de ville, appartements de standing et bureaux. Expertise en protection de mobilier, emballage d'objets fragiles, location de monte-meuble et garde-meuble sécurisé. Intervention à Marly-le-Roi, Louveciennes, Le Pecq, Bougival, Saint-Germain-en-Laye, Versailles et toute l'Île-de-France. Devis gratuit, calculateur de volume en ligne et formules adaptées (Économique, Standard, Luxe).
        </p>
      </div>
    </div>
  );
};

export default LocalMarlyLeRoi;
