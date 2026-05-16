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
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalRambouillet: React.FC = () => {
  const path = "/demenagement-rambouillet";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Rambouillet ?",
      a: "Un déménagement à Rambouillet demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement, la distance depuis l'adresse de départ et la préparation des cartons. Selon qu'il s'agit d'un appartement, d'une maison, d'une résidence ou d'un local professionnel, il est important d'évaluer les caves, garages, parkings, jardins, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Rambouillet et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Rambouillet et dans les secteurs proches comme Le Perray-en-Yvelines, Gazeran, Les Essarts-le-Roi, Auffargis, Clairefontaine-en-Yvelines, Saint-Arnoult-en-Yvelines, Ablis, Épernon, Maurepas, Coignières et plus largement en Île-de-France selon les besoins du projet."
    },
    {
      q: "Peut-on organiser un déménagement de Paris vers Rambouillet ?",
      a: "Oui, Marne Transdem peut accompagner un déménagement depuis Paris ou l'Île-de-France vers Rambouillet selon le volume, les adresses, les accès, le niveau d'emballage souhaité et les contraintes du projet. Une étude personnalisée permet d'adapter l'organisation et les moyens nécessaires."
    },
    {
      q: "Peut-on demander un monte-meuble à Rambouillet ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Rambouillet ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone au 01 44 93 54 86. L'estimation prend en compte le volume, les adresses, les accès, les étages, le stationnement, la distance, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Rambouillet | Marne Transdem" 
        description="Préparez votre déménagement à Rambouillet avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Rambouillet", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display text-white">
        <div className="absolute inset-0 bg-[url('/images/demenagement-rambouillet.jpg')] bg-cover bg-center opacity-20 transition-transform duration-1000 scale-105"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent uppercase font-black tracking-widest text-sm italic">Déménagement local et Île-de-France</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Déménagement <br/><span className="text-accent italic">Rambouillet</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-90 shadow-sm">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Rambouillet, avec une organisation adaptée aux appartements, maisons, résidences, bureaux, commerces et contraintes d’accès du sud des Yvelines.
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
            <span className="text-brand-900 font-black italic uppercase">Rambouillet</span>
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
                Votre déménagement à Rambouillet
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic text-brand-900">
                <p>
                  Marne Transdem accompagne les déménagements à Rambouillet pour les particuliers et les entreprises. Ville phare du sud des Yvelines en Île-de-France, Rambouillet offre un cadre privilégié dans le sud-ouest francilien, combinant patrimoine historique et dynamisme résidentiel.
                </p>
                <p>
                  Qu'il s'agisse d'un appartement en résidence, d'un studio, d'une maison familiale ou d'un pavillon avec jardin, nous maîtrisons les contraintes spécifiques du sud-ouest francilien. Notre expertise s'tend aux professionnels (bureaux, commerces, cabinets et agences) à proximité de Maurepas, Coignières et même Chartres pour certains projets.
                </p>
                <p>
                  De l'estimation du volume à la demande de devis, nous planifions chaque étape : accès d'immeubles, ascenseurs, escaliers ou accès depuis la rue. Notre proximité avec Le Perray-en-Yvelines, Gazeran, Les Essarts-le-Roi et Saint-Arnoult-en-Yvelines nous permet d'assurer vos transferts vers Paris ou l'Île-de-France avec sérénité.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display transition-all">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Rambouillet (78120)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Trees className="text-brand-900 shadow-sm" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Sud Yvelines</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic transition-all group">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-rambouillet-local.jpg" 
                  alt="Déménagement Rambouillet - Marne Transdem" 
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
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display underline decoration-accent/10 sm:underline-offset-8">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">L'importance d'une préparation à Rambouillet</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 italic shadow-sm hover:opacity-100 transition-opacity">
            La situation de Rambouillet au sud des Yvelines exige une planification rigoureuse du volume et des moyens.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic decoration-accent/10">
            {[
              {
                title: "Diversité Résidentielle",
                desc: "Gestion adaptée pour appartements avec étages, studios, maisons de charme ou pavillons contemporains.",
                icon: Home
              },
              {
                title: "Logistique Longue Portée",
                desc: "Planification précise pour les distances vers Paris ou la petite couronne, plus importantes que pour les villes proches.",
                icon: Navigation
              },
              {
                title: "Accès & Environnement",
                desc: "Prise en compte des accès de maison, garage, cave, jardin, portail ou cour intérieure selon le quartier.",
                icon: MapPin
              },
              {
                title: "Centre-Ville & Stationnement",
                desc: "Anticipation du stationnement dans les rues commerçantes ou résidentielles selon la configuration de l'adresse.",
                icon: Truck
              },
              {
                title: "Tertiaire & Libéral",
                desc: "Organisation experte pour les bureaux, agences, cabinets professionnels et commerces locaux.",
                icon: Building2
              },
              {
                title: "Services Techniques",
                desc: "Besoin éventuel de monte-meuble selon les accès ou garde-meuble temporaire en cas de transition immobilière.",
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
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase shadow-sm text-accent">Services à Rambouillet</h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto italic font-medium opacity-80 shadow-sm italic transition-all">Une expertise premium pour tous vos besoins de mobilité dans le 78.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display shadow-sm">
            {[
              {
                title: "Déménagement Particuliers",
                desc: "Appartements, studios, maisons, pavillons et logements familiaux.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Déménagement Entreprises",
                desc: "Bureaux, commerces, cabinets, agences et locaux d'activités.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble / Stockage",
                desc: "Solution utile pendant une transition, des travaux ou un décalage de dates.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Location Monte-meuble",
                desc: "Solution technique selon les accès complexes et la faisabilité technique.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage & Protection",
                desc: "Protection de vos meubles, objets fragiles, vaisselle et effets personnels.",
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
                title: "Formules de Déménagement",
                desc: "Économique, Standard ou Luxe pour s'adapter à votre budget.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Estimation du Volume",
                desc: "Calculateur en ligne pour une estimation indicative avant votre devis.",
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
                  Explorer <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
                    src="/images/demenagement-particuliers-rambouillet.jpg" 
                    alt="Déménagement particuliers Rambouillet - Marne Transdem" 
                    className="w-full h-full object-cover shadow-sm font-display italic transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic font-display shadow-accent/40 group-hover:scale-125 transition-transform duration-1000"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic shadow-sm transition-all text-brand-900">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Déménagement de particuliers à Rambouillet</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display transition-all hover:opacity-100">
                <p>
                  Marne Transdem accompagne les familles et les actifs pour leurs projets de déménagement à Rambouillet : appartements, pavillons, maisons de caractère et résidences. Que vous quittiez Paris pour vous installer dans le sud-ouest francilien ou que vous déménagiez depuis Rambouillet vers une autre ville d'Île-de-France, nous gérons chaque étape.
                </p>
                <p>
                  Nous assurons la protection de votre mobilier, de vos objets fragiles et de vos effets personnels. Notre équipe s'adapte à chaque accès (ascenseur, cave, garage, parking ou jardin) pour une intervention sécurisée. Profitez d'un accompagnement premium pour votre installation familiale ou votre mutation professionnelle.
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
                  <img src="/images/transfert-bureau-rambouillet.jpg" alt="Déménagement Entreprise Rambouillet" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic transition-transform duration-700 group-hover:scale-105" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic decoration-accent/10 transition-all text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Déménagement d'entreprises dans le sud des Yvelines</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100">
                 <p>
                   Marne Transdem accompagne les professionnels à Rambouillet : bureaux, entreprises et cabinets. Nous organisons votre transfert professionnel avec méthode pour garantir la continuité de votre activité dans le sud-ouest de l'Île-de-France.
                 </p>
                 <p>
                    Nous gérons le mobilier professionnel, les archives, le matériel informatique et la manutention de qualité. Notre proximité avec Le Perray, Les Essarts-le-Roi et Maurepas est un atout pour les entreprises locales.
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

      {/* 7. Un départ depuis Paris ou l’Île-de-France vers Rambouillet */}
      <section className="py-24 bg-white font-display italic shadow-sm transition-all text-brand-900">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="max-w-4xl mx-auto space-y-8 text-center italic font-display shadow-sm">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 italic transition-all">Un déménagement organisé depuis Paris ou l’Île-de-France vers Rambouillet</h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 shadow-sm transition-all">
              <p>
                Marne Transdem structure vos projets au départ de Paris, des hauts-de-Seine, du Val-de-Marne ou de la Seine-Saint-Denis vers Rambouillet. Selon la distance, le volume et les accès de vos adresses franciliennes, nous adaptons notre planning de chargement et de livraison.
              </p>
              <p>
                Qu'il s'agisse d'un départ depuis l'Essonne ou d'un transfert intra-Yvelines, nous assurons une logistique fluide. Demandez votre devis pour un transport maîtrisé vers le sud des Yvelines.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-8 italic font-display">
              <Link to="/demenagement-paris" className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-900 hover:bg-brand-900 hover:text-white transition-all shadow-sm italic transition-all">Paris</Link>
              <Link to="/demenagement-ile-de-france" className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-900 hover:bg-brand-900 hover:text-white transition-all shadow-sm italic transition-all">Île-de-France</Link>
              <Link to="/demenagement-yvelines" className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-900 hover:bg-brand-900 hover:text-white transition-all shadow-sm italic transition-all">Yvelines</Link>
              <Link to="/demenagement-hauts-de-seine" className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-900 hover:bg-brand-900 hover:text-white transition-all shadow-sm italic transition-all">Hauts-de-Seine</Link>
              <Link to="/demenagement-val-de-marne" className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest text-brand-900 hover:bg-brand-900 hover:text-white transition-all shadow-sm italic transition-all">Val-de-Marne</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Formules adaptées */}
      <section className="py-24 bg-slate-50 relative font-display italic overflow-hidden shadow-sm shadow-black/5 transition-all text-brand-900 italic font-display">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display transition-all underline decoration-accent/20 sm:underline-offset-8 transition-all">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic">Des formules adaptées aux projets du sud 78</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic text-brand-900 transition-all duration-500 hover:scale-[1.01]">
            {[
              {
                name: "Économique",
                desc: "Optimisez votre budget pour votre projet à Rambouillet. Vous gérez l'emballage de vos cartons, nous gérons la manutention et le transport.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "Le service équilibré. Nous prenons en charge les objets fragiles et le mobilier encombrant pour un déménagement sans stress.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Déménagement clé en main. Déléguez la préparation complète, l'emballage et l'organisation rigoureuse de votre transfert.",
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
                  Découvrir les offres <ArrowRight size={14} className="italic shadow-sm font-display italic transition-transform group-hover:translate-x-1 font-display" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Logistique Technique */}
      <section className="py-24 bg-white font-display italic shadow-sm overflow-hidden italic font-display shadow-inner shadow-brand-900/5 transition-all text-brand-900">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display transition-all text-brand-900">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display transition-all">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 italic shadow-sm shadow-brand-900/20 transition-all hover:scale-[1.01] group">
               <img src="/images/logistique-rambouillet.jpg" alt="Volume et accès déménagement Rambouillet" className="w-full h-full object-cover font-display italic shadow-inner transition-transform duration-700 group-hover:scale-105" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display text-brand-900 transition-all">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm underline decoration-accent/20 underline-offset-8 italic transition-all hover:text-accent font-display uppercase tracking-tight">Volume, accès & monte-meuble</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm underline-offset-4 italic transition-all hover:opacity-100 font-display transition-all">
                 <p>
                    Certains déménagements à Rambouillet nécessitent une étude attentive du volume à déménager et des accès : étages, ascenseurs, escaliers ou halls d'immeubles. Nous évaluons chaque configuration (maison, pavillon, résidence) pour adapter les moyens humains et techniques à votre projet.
                 </p>
                 <p>
                    Pour le mobilier volumineux ou les accès complexes depuis la rue, un monte-meuble peut être proposé selon la faisabilité technique. Nous anticipons également les zones de stationnement et les accès spécifiques aux locaux professionnels.
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

      {/* 10. Calculateur de Volume */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl italic font-display shadow-md shadow-brand-900/60 transition-all shadow-inner italic font-display shadow-brand-900/10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm italic font-display transition-all shadow-black/30 text-white shadow-2xl transition-all">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 italic font-display text-white transition-all text-center md:text-left shadow-sm">
             <div className="lg:w-2/3 space-y-8 italic px-4 shadow-sm shadow-black/10 select-none transition-all font-display">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic hover:text-accent transition-colors shadow-sm italic transition-all">Estimez le volume de vos meubles avant devis</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display italic transition-all">
                  Utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation indicative pourra être affinée selon les accès, la distance et les particularités de votre projet à Rambouillet.
                </p>
                <div className="pt-4 shadow-sm px-4 transition-transform hover:scale-105 italic shadow-brand-900/10 font-display transition-all duration-500">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic transition-all shadow-accent/40 shadow-sm transition-all"
                  >
                    Estimer mon volume
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

      {/* 11. Méthode en 4 Étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl italic font-display shadow-brand-900/5 text-brand-900 shadow-inner italic font-display transition-all">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic text-center">Notre méthode en 4 étapes</h2>
          <p className="text-slate-600 text-lg text-center mt-6 max-w-2xl mx-auto italic opacity-80 underline-offset-4 decoration-accent/5">Une organisation rigoureuse pour votre projet du sud 78, étape par étape.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 transition-all">
          {[
            { step: "01", title: "Analyse du projet", desc: "Étude de vos besoins, du volume et des spécificités du logement à Rambouillet." },
            { step: "02", title: "Évaluation technique", desc: "Étude des accès, étages, stationnement et distance depuis le lieu de départ." },
            { step: "03", title: "Choix de la formule", desc: "Adaptation de l'accompagnement et planification de l'intervention dans le sud 78." },
            { step: "04", title: "Réalisation", desc: "Déménagement sécurisé et efficace réalisé par nos équipes expertes le jour J." }
          ].map((item, id) => (
            <div key={id} className="relative bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 italic font-display select-none transition-all shadow-brand-900/5">
              <span className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-brand-900 rounded-xl flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform duration-500 shadow-accent/20 italic">{item.step}</span>
              <h4 className="text-xl font-bold mb-4 mt-4 uppercase tracking-tight group-hover:text-accent transition-colors duration-500 italic">{item.title}</h4>
              <p className="text-slate-600 text-sm italic font-medium opacity-80 leading-relaxed shadow-sm transition-all duration-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Secteurs proches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-brand-900/5 text-brand-900 shadow-inner italic font-display transition-all shadow-brand-900/10">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display text-brand-900 transition-all underline decoration-accent/10 sm:underline-offset-8">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/20 italic font-display transition-all underline decoration-accent/10 sm:border-b sm:border-brand-900/5 pb-16">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic transition-all">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic select-none hover:opacity-100 transition-all font-display italic">Zones Yvelines Sud</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm hover:text-accent transition-colors font-display italic uppercase">Autres secteurs proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display transition-all hover:opacity-100 font-display italic">
                Marne Transdem assure vos projets dans toutes les communes limitrophes de Rambouillet et dans tout le sud des Yvelines.
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
              { name: "Le Perray-en-Y.", link: null },
              { name: "Gazeran", link: null },
              { name: "Les Essarts-le-Roi", link: null },
              { name: "Saint-Arnoult", link: null },
              { name: "Ablis", link: null },
              { name: "Maurepas", link: null },
              { name: "Coignières", link: null },
              { name: "Versailles", link: "/demenagement-versailles" },
              { name: "St-Germain-en-Laye", link: "/demenagement-saint-germain-en-laye" },
              { name: "Mantes-la-Jolie", link: "/demenagement-mantes-la-jolie" },
              { name: "Plaisir", link: "/demenagement-plaisir" },
              { name: "Yvelines (78)", link: "/demenagement-yvelines" },
              { name: "Île-de-France", link: "/demenagement-ile-de-france" },
              { name: "Chartres", link: null }
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

      {/* 13. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/10 italic shadow-md text-brand-900 transition-all border-b border-slate-50 italic font-display shadow-brand-900/5 italic underline decoration-accent/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/20 font-display italic shadow-sm px-4 shadow-2xl italic transition-all decoration-accent/10 underline-offset-8 transition-all">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/20 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 transition-all italic px-4 shadow-2xl shadow-brand-900/30 decoration-accent/10 transition-all font-display duration-1000">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/20 group-hover:scale-125 transition-all duration-1000 font-display italic"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 font-display italic shadow-sm underline-offset-4 italic transition-all italic decoration-accent/10 transition-all duration-1000">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm italic font-display uppercase italic text-brand-900 underline decoration-accent/20 transition-all hover:text-accent hover:decoration-accent/40 sm:underline-offset-[12px] font-display italic transition-all duration-1000">
                Vous préparez un déménagement à Rambouillet ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display underline-offset-4 transition-all italic decoration-brand-900/10 transition-all font-display hover:opacity-100 uppercase tracking-widest italic transition-all duration-1000">
                Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès, votre distance et le niveau d'accompagnement souhaité.
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
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display select-none hover:opacity-100 transition-all font-display italic">FAQ Rambouillet</span>
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
                  <li><Link to="/calculateur-volume" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic">Calcul volume</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display transition-all italic">Nos formules</Link></li>
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display transition-all italic">Particuliers</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic transition-all transition-all">Services</h4>
                <ul className="space-y-4 transition-all text-slate-400 font-display italic">
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic">Transfert Pro</Link></li>
                  <li><Link to="/garde-meuble-paris" className="hover:text-white transition-colors text-sm font-medium uppercase underline-offset-4 italic transition-all font-display transition-all italic">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic">Monte-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic transition-all italic">Emballage</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic transition-all transition-all">Secteurs</h4>
                <ul className="space-y-4 italic transition-all text-slate-400 font-display italic shadow-black/5">
                  <li><Link to="/demenagement-yvelines" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 font-display transition-all italic">Yvelines (78)</Link></li>
                  <li><Link to="/demenagement-ile-de-france" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none font-display transition-all italic">Île-de-France</Link></li>
                  <li><Link to="/demenagement-versailles" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none font-display transition-all italic">Versailles</Link></li>
                  <li><Link to="/demenagement-maurepas" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display transition-all italic invisible pointer-events-none">Maurepas</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10 transition-all font-display italic font-display">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100 font-display italic transition-all transition-all shadow-black/5">Réseau</h4>
                <ul className="space-y-4 text-slate-400 font-display italic">
                  <li><Link to="/demenagement-coignières" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display uppercase tracking-widest italic transition-all shadow-black/5 invisible pointer-events-none">Coignières</Link></li>
                  <li><Link to="/demenagement-saint-arnoult-en-yvelines" className="hover:text-white transition-colors text-sm font-medium italic transition-all font-display italic transition-all invisible pointer-events-none">St-Arnoult</Link></li>
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
          Marne Transdem, entreprise de déménagement intervenant à Rambouillet (78120) et dans le sud des Yvelines (78), assure vos projets de déménagement pour particuliers et entreprises au départ de Paris, l'Île-de-France ou localement. Services pour maisons, appartements, pavillons et locaux professionnels. Expertise en protection de mobilier, emballage d'objets fragiles, location de monte-meuble et garde-meuble sécurisé. Intervention à Rambouillet, Le Perray-en-Yvelines, Gazeran, Les Essarts-le-Roi, Auffargis, Clairefontaine-en-Yvelines, Saint-Arnoult-en-Yvelines, Ablis, Épernon, Maurepas, Coignières, Versailles et Saint-Germain-en-Laye. Devis gratuit, calculateur de volume en ligne et formules adaptées (Économique, Standard, Luxe).
        </p>
      </div>
    </div>
  );
};

export default LocalRambouillet;
