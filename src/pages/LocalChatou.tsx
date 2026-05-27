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

const LocalChatou: React.FC = () => {
  const path = "/demenagement-chatou";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Chatou ?",
      a: "Un déménagement à Chatou demande d'anticiper le volume, les accès (étages, ascenseurs, résidences), le stationnement et la préparation des cartons. Selon qu'il s'agit d'un appartement, d'une maison ou d'un local professionnel, il est important d'évaluer les caves, garages, parkings et l'accès depuis la rue. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement et à vos biens."
    },
    {
      q: "Marne Transdem intervient-elle à Chatou et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Chatou et dans les secteurs proches comme Croissy-sur-Seine, Le Vésinet, Rueil-Malmaison, Montesson, Le Pecq, Saint-Germain-en-Laye, Carrières-sur-Seine et Bougival."
    },
    {
      q: "Peut-on demander un monte-meuble à Chatou ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Chatou ?",
      a: "La formule dépend de votre budget et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez vos cartons, la Standard offre un équilibre, et la Luxe permet de déléguer davantage d'organisation."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Chatou ?",
      a: "Vous pouvez remplir notre formulaire en ligne ou nous contacter par téléphone au 01 44 93 54 86. L'estimation prend en compte le volume, les accès, les étages et la formule choisie."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-display">
      <SEO 
        title="Déménagement Chatou | Marne Transdem" 
        description="Préparez votre déménagement à Chatou avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Chatou", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden italic font-display text-white">
        <div className="absolute inset-0 bg-[url('/images/demenagement-yvelines-78.jpg')] bg-cover bg-center opacity-20 transition-transform duration-1000 scale-105"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
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
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight uppercase italic hover:text-accent transition-colors duration-500">
                Déménagement <br/><span className="text-accent">Chatou</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic opacity-90 shadow-sm">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Chatou, avec une organisation adaptée aux appartements, maisons, résidences et bureaux de l’ouest francilien.
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
            <span className="text-brand-900 font-black italic uppercase">Chatou</span>
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
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8">
                Votre déménagement à Chatou
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium opacity-80 italic">
                <p>
                  Chatou, située dans les Yvelines au cœur de l'Île-de-France, est une destination prisée pour son cadre de vie résidentiel et sa proximité avec Paris Ouest. Marne Transdem accompagne les familles et les professionnels dans leur installation ou leur départ de cette commune dynamique.
                </p>
                <p>
                  Que vous habitiez un appartement en résidence, un studio moderne ou une maison de caractère, nous maîtrisons les contraintes locales : accès d'immeubles, escaliers étroits, stationnement en centre-ville ou rues proches des bords de Seine. Notre expertise s'étend également aux communes voisines comme Croissy-sur-Seine, Le Vésinet, Rueil-Malmaison et Saint-Germain-en-Laye.
                </p>
                <p>
                  De l'estimation du volume à la demande de devis, nous planifions chaque étape avec méthode pour garantir la sécurité de votre mobilier et de vos objets fragiles.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <MapPin className="text-accent" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Chatou (78400)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <Waves className="text-brand-900" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic">Boucles de la Seine</span>
                </div>
              </div>
            </motion.div>
            <div className="relative font-display italic">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 shadow-brand-900/10">
                <img 
                  src="/images/demenagement-yvelines-78.jpg" 
                  alt="Déménagement Chatou - Marne Transdem" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 opacity-50 shadow-accent/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic shadow-inner">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 italic font-display">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Une préparation rigoureuse à Chatou</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 italic">
            La diversité des profils de logements à Chatou demande une analyse précise des accès et des volumes.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 italic decoration-accent/10">
            {[
              {
                title: "Logements Variés",
                desc: "Des appartements avec étages aux maisons familiales avec jardins, chaque accès est unique.",
                icon: Home
              },
              {
                title: "Rues & Stationnement",
                desc: "Anticipation des accès en rues résidentielles ou proches des bords de Seine pour le camion.",
                icon: Truck
              },
              {
                title: "Objets Fragiles",
                desc: "Protection soignée de votre mobilier familial, vaisselle, tableaux et archives précieuses.",
                icon: ShieldCheck
              },
              {
                title: "Bureaux & Commerces",
                desc: "Organisation méthodique pour les transferts de cabinets, agences et locaux professionnels Chatou.",
                icon: Building2
              },
              {
                title: "Garde-meuble Utile",
                desc: "Solution de stockage flexible en cas de travaux ou de décalage de dates d'emménagement.",
                icon: Warehouse
              },
              {
                title: "Monte-meuble Technique",
                desc: "Solution à envisager pour les meubles volumineux et les accès difficiles par la fenêtre.",
                icon: ArrowUpCircle
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic shadow-brand-900/5">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors shadow-sm italic transition-all">
                  <item.icon className="text-brand-900 group-hover:text-accent" size={32} />
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
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic uppercase shadow-sm">Nos services à Chatou</h2>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto italic font-medium opacity-80 shadow-sm italic">Des prestations sur-mesure pour votre projet de déménagement dans les Yvelines.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display italic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 italic font-display">
            {[
              {
                title: "Particuliers",
                desc: "Appartements, studios, maisons et pavillons familiaux.",
                link: "/demenagement-particuliers-paris",
                icon: Home
              },
              {
                title: "Entreprises",
                desc: "Bureaux, commerces, agences et professions libérales.",
                link: "/demenagement-entreprises-paris",
                icon: Building2
              },
              {
                title: "Garde-meuble",
                desc: "Stockage sécurisé pendant une transition ou des travaux.",
                link: "/garde-meuble-paris",
                icon: Warehouse
              },
              {
                title: "Monte-meuble",
                desc: "Solution technique selon les accès et la faisabilité.",
                link: "/location-monte-meuble-paris",
                icon: ArrowUpCircle
              },
              {
                title: "Emballage",
                desc: "Protection des meubles, objets fragiles et matériel adapté.",
                link: "/emballage-protection-demenagement",
                icon: Package
              },
              {
                title: "Cartons",
                desc: "Fourniture de cartons et matériel de déménagement.",
                link: "/cartons-demenagement-paris",
                icon: Box
              },
              {
                title: "Formules",
                desc: "Économique, Standard ou Luxe selon vos besoins.",
                link: "/formules-demenagement",
                icon: Layout
              },
              {
                title: "Calculateur",
                desc: "Estimation indicative du volume de vos biens.",
                link: "/calculateur-volume",
                icon: Calculator
              }
            ].map((service, idx) => (
              <Link 
                key={idx} 
                to={service.link}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-brand-900 transition-all group active:scale-[0.98] italic font-display shadow-2xl"
              >
                <service.icon size={32} className="text-accent group-hover:text-brand-900 mb-6 italic" />
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight italic uppercase shadow-sm">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic opacity-80">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors uppercase italic shadow-sm underline underline-offset-4">
                  Découvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers */}
      <section className="py-24 bg-white font-display italic overflow-hidden shadow-sm text-brand-900">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="flex flex-col lg:flex-row gap-20 items-center italic shadow-sm shadow-brand-900/10">
            <div className="lg:w-1/2 order-2 lg:order-1 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] shadow-brand-900/10 italic border-8 border-slate-50 shadow-brand-900/10">
                  <img 
                    src="/images/demenagement-maison-yvelines.jpg" 
                    alt="Déménagement particuliers Chatou - Marne Transdem" 
                    className="w-full h-full object-cover shadow-sm font-display italic"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic font-display"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 px-4 font-display italic shadow-sm">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Pour les Particuliers</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs déménagements à Chatou et ses environs. Que vous quittiez un studio pour une maison ou que vous vous installiez dans une nouvelle résidence, nous avons la solution.
                </p>
                <p>
                  Nous gérons les transferts depuis ou vers Paris, ainsi que les projets longue distance. Nos services incluent le tri, la préparation des cartons, la protection spécifique des meubles et du fragile (vaisselle, tableaux, miroirs), ainsi que l'accès aux caves, garages et jardins. Chaque projet commence par une estimation précise du volume et une étude des accès (étages, ascenseurs, parking).
                </p>
              </div>
              <div className="pt-8 shadow-sm italic">
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

      {/* 6. Déménagement d'entreprises */}
      <section className="py-24 bg-slate-50 overflow-hidden relative shadow-sm italic font-display shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic font-display shadow-sm shadow-brand-900/10">
             <div className="lg:w-1/2 shadow-sm italic font-display transition-transform hover:scale-[1.01]">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 shadow-brand-900/10 italic font-display shadow-brand-900/10">
                  <img src="/images/transfert-entreprise-78-yvelines.jpg" alt="Déménagement Entreprise Chatou" className="w-full h-full object-cover rounded-[2.5rem] shadow-sm font-display italic" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 px-4 font-display italic decoration-accent/10">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic uppercase underline decoration-accent/20 underline-offset-8 shadow-sm">Pour les Professionnels</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display shadow-sm italic">
                 <p>
                   Les entreprises et professions libérales de Chatou font confiance à Marne Transdem pour leurs transferts de bureaux et locaux professionnels. Nous assurons la continuité de votre activité grâce à une organisation rigoureuse.
                 </p>
                 <p>
                    Notre prestation comprend le transfert du mobilier, des archives, du matériel informatique et des stocks. Nous intervenons également à proximité : Croissy-sur-Seine, Le Vésinet, Rueil-Malmaison, Montesson et Saint-Germain-en-Laye, facilitant votre mobilité dans l'ouest parisien.
                 </p>
               </div>
               <div className="pt-8 shadow-sm italic">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group shadow-sm shadow-brand-900/10 italic font-display shadow-2xl select-none"
                 >
                   Organiser un transfert
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform italic" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm shadow-brand-900/5 transition-all italic font-display shadow-sm">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight uppercase underline decoration-accent/20 underline-offset-8 shadow-sm italic">Des formules pour chaque projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 shadow-xl font-display italic text-brand-900">
            {[
              {
                name: "Économique",
                desc: "Manutention et transport. Vous gérez l'emballage de vos cartons pour un budget optimisé.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "L'option équilibrée : nous prenons en charge l'emballage du fragile et des meubles volumineux.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Prestation haut de gamme incluant l'emballage complet et l'organisation intégrale de votre départ.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic shadow-brand-900/10 font-display transition-transform hover:-translate-y-1">
                <div>
                  <formula.icon size={40} className="text-brand-900 mb-6 italic hover:scale-105 transition-transform" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 px-4 uppercase italic shadow-sm font-display">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 px-4 italic underline-offset-2 font-display">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors px-4 italic shadow-sm font-display underline underline-offset-4"
                >
                  Comparer <ArrowRight size={14} className="italic shadow-sm transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm overflow-hidden italic font-display shadow-inner text-brand-900">
        <div className="container mx-auto px-4 md:px-6 shadow-sm italic font-display transition-all text-brand-900">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display shadow-sm">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic shadow-sm shadow-brand-900/20 transition-all hover:scale-[1.01]">
               <img src="/images/demenagement-yvelines-camion.jpg" alt="Logistique déménagement Chatou" className="w-full h-full object-cover font-display italic shadow-inner" />
             </div>
             <div className="space-y-8 shadow-sm px-4 shadow-brand-900/10 italic font-display text-brand-900">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm underline decoration-accent/20 underline-offset-8 italic">Volume, accès & monte-meuble</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 px-4 italic font-display shadow-sm italic">
                 <p>
                    Certains déménagements à Chatou nécessitent une étude attentive de l'étage, de l'ascenseur, de l'escalier ou du hall d'immeuble. Qu'il s'agisse d'une résidence, d'une maison de ville ou d'un pavillon avec jardin et garage, nous analysons chaque détail.
                 </p>
                 <p>
                    Pour le mobilier volumineux ne passant pas par les accès classiques, un monte-meuble peut être proposé selon la faisabilité technique. Nous anticipons également les besoins de stationnement pour faciliter le chargement et déchargement de vos meubles et objets fragiles.
                 </p>
               </div>
               <div className="pt-6 shadow-sm px-4 italic transition-all">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic font-display underline underline-offset-4 select-none hover:translate-x-1"
                  >
                    Voir la location monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display italic underline" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative shadow-xl px-4 shadow-2xl italic font-display shadow-md">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic transition-all duration-1000"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-sm italic font-display transition-all shadow-black/20 text-white">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 italic font-display text-white text-center md:text-left">
             <div className="lg:w-2/3 space-y-8 italic px-4 shadow-sm shadow-black/10 select-none">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 px-4 uppercase italic hover:text-accent transition-colors">Estimez votre volume</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 px-4 shadow-sm italic">
                  Avant de demander votre devis à Chatou, utilisez notre outil gratuit pour évaluer le volume de vos meubles et cartons. Une étape clé pour une organisation parfaite.
                </p>
                <div className="pt-4 shadow-sm px-4 transition-transform hover:scale-105 italic">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 font-display italic shadow-accent/20"
                  >
                    Utiliser le calculateur
                    <Calculator size={20} className="group-hover:rotate-12 transition-transform italic" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3 flex justify-center shadow-sm px-4 italic transition-transform hover:scale-110 duration-700">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden italic shadow-2xl shadow-black/20">
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-700 font-display italic" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/5 text-brand-900 border-b border-slate-50 italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4 shadow-sm italic underline decoration-accent/10 sm:underline-offset-8">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight shadow-sm px-4 uppercase italic font-display hover:text-accent transition-colors">Déménager sereinement</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 px-4 italic shadow-sm">4 étapes clés pour la réussite de votre projet.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 shadow-brand-900/5">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 shadow-sm font-display italic shadow-brand-900/10">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-brand-900/10"></div>
             {[
               { id: "01", title: "Analyse", desc: "Étude personnalisée de votre volume et des contraintes d'accès Chatou." },
               { id: "02", title: "Évaluation", desc: "Choix de la formule adaptée et validation du planning de déménagement." },
               { id: "03", title: "Organisation", desc: "Préparation des cartons et protection soignée de chaque meuble." },
               { id: "04", title: "Réalisation", desc: "Manutention experte et transport sécurisé vers votre nouvelle adresse." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-transform hover:-translate-y-2 duration-300 italic shadow-sm font-display select-none transition-all">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all font-display italic hover:scale-105 shadow-brand-900/10 group-hover:shadow-accent/40">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight px-4 uppercase italic group-hover:text-accent transition-colors">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 px-4 italic">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl italic shadow-brand-900/5 text-brand-900 shadow-inner">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 italic font-display text-brand-900">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 shadow-sm shadow-brand-900/5 italic font-display transition-all">
            <div className="lg:w-2/3 space-y-6 shadow-sm px-4 font-display italic transition-all">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block tracking-[0.2em] opacity-80 shadow-sm italic select-none hover:opacity-100 transition-all">Yvelines & Bords de Seine</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight px-4 uppercase italic shadow-sm hover:text-accent transition-colors underline decoration-accent/10 sm:underline-offset-8">Secteurs Proches</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 px-4 shadow-sm italic font-display">
                Interventions régulières de Marne Transdem dans les communes limitrophes de Chatou.
              </p>
            </div>
            <div className="lg:w-1/3 shadow-sm px-4 italic font-display shadow-sm underline decoration-brand-900/20 hover:decoration-brand-900 transition-all">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm px-4 shadow-sm font-display hover:translate-x-1 select-none">
                Secteurs Desservis <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform font-display italic shadow-sm underline-offset-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 shadow-sm px-4 shadow-brand-900/10 italic font-display transition-all text-brand-900">
            {[
              { name: "Croissy-sur-Seine", link: "/demenagement-croissy-sur-seine" },
              { name: "Le Vésinet", link: "/demenagement-le-vesinet" },
              { name: "Rueil-Malmaison", link: "/demenagement-rueil-malmaison" },
              { name: "Montesson", link: null },
              { name: "Le Pecq", link: "/demenagement-le-pecq" },
              { name: "Marly-le-Roi", link: "/demenagement-marly-le-roi" },
              { name: "Saint-Germain", link: null },
              { name: "Carrières/Seine", link: null },
              { name: "Bougival", link: "/demenagement-bougival" },
              { name: "Houilles", link: "/demenagement-houilles" },
              { name: "Nogent-sur-Marne", link: "/demenagement-nogent-sur-marne" },
              { name: "Nanterre", link: "/demenagement-nanterre" },
              { name: "Yvelines", link: "/demenagement-yvelines" },
              { name: "IDF", link: "/demenagement-ile-de-france" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-all group shadow-sm active:scale-95 shadow-brand-900/10 italic font-display shadow-sm italic hover:shadow-md transition-all select-none transition-transform"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic font-display shadow-sm group-hover:text-brand-900 transition-colors uppercase italic">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 shadow-sm transition-all" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 italic font-display select-none transition-all grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm italic">{city.name}</span>
                  <MapPin size={14} className="text-slate-300" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/10 italic shadow-md text-brand-900 transition-all border-b border-slate-50 italic font-display">
        <div className="container mx-auto px-4 md:px-6 relative z-10 shadow-brand-900/20 font-display italic shadow-sm px-4 shadow-2xl italic transition-all">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/20 italic px-4 shadow-sm uppercase tracking-tight shadow-brand-900/10 transition-all italic px-4 shadow-2xl shadow-brand-900/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-accent/20 group-hover:scale-125 transition-all duration-1000"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 font-display italic shadow-sm underline-offset-4 italic transition-all italic">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight shadow-sm italic font-display uppercase italic text-brand-900 underline decoration-accent/20 transition-all hover:text-accent hover:decoration-accent/40 sm:underline-offset-[12px]">
                Déménagez à Chatou avec Marne Transdem
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 shadow-sm font-display underline-offset-4 transition-all italic">
                Bénéficiez d'une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité par des professionnels de l'ouest francilien.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 shadow-sm font-display italic shadow-sm transition-all italic px-4 shadow-2xl">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/40 select-none"
                >
                  Devis gratuit
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-brand-900/10 italic shadow-sm select-none"
                >
                  <Phone size={20} className="shadow-sm font-display shadow-sm transition-transform hover:scale-110" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 shadow-2xl shadow-brand-900/10 italic font-display shadow-sm font-display italic shadow-inner text-brand-900 transition-all shadow-brand-900/5">
        <div className="container mx-auto px-4 md:px-6 shadow-sm px-4 shadow-brand-900/20 font-display italic shadow-sm font-display italic transition-all">
          <div className="max-w-4xl mx-auto space-y-12 px-4 shadow-sm shadow-brand-900/20 italic px-4 shadow-2xl font-display shadow-brand-900/10 italic shadow-sm font-display italic transition-all">
            <div className="text-center mb-16 shadow-sm shadow-brand-900/10 italic font-display italic transition-all underline decoration-accent/20 sm:underline-offset-8">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] shadow-sm block mb-4 tracking-[0.2em] opacity-80 italic font-display select-none transition-all">FAQ Chatou</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight shadow-sm px-4 uppercase italic hover:text-accent transition-colors italic transition-all text-brand-900">Questions fréquentes</h2>
            </div>
            
            <div className="space-y-6 shadow-sm shadow-brand-900/10 italic font-display shadow-sm italic transition-all">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic font-display shadow-sm transition-all">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic shadow-sm font-display transition-all group-hover:text-accent text-brand-900">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic transition-all select-none group-hover:bg-brand-900 group-hover:text-white">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 shadow-sm font-display italic shadow-brand-900/10 shadow-sm transition-all italic">
                      <p className="text-slate-600 leading-relaxed font-medium italic shadow-brand-900/10 shadow-sm font-display transition-all">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic shadow-sm px-4 shadow-2xl shadow-black/40 font-display italic shadow-sm transition-all shadow-black/50">
        <div className="container mx-auto px-4 md:px-6 shadow-sm shadow-brand-900/40 font-display italic font-display shadow-sm transition-all italic underline decoration-white/5 hover:decoration-white/10 transition-all">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic shadow-brand-900/20 font-display italic shadow-sm transition-all italic">
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100">Déménager</h4>
                <ul className="space-y-4 text-slate-400">
                  <li><Link to="/devis-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none">Devis gratuit</Link></li>
                  <li><Link to="/calculateur-volume" className="hover:text-white transition-colors text-sm font-medium italic transition-all">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none">Formules</Link></li>
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none">Particuliers</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100">Services pro</h4>
                <ul className="space-y-4 transition-all text-slate-400">
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all">Déménagement Bureaux</Link></li>
                  <li><Link to="/garde-meuble-paris" className="hover:text-white transition-colors text-sm font-medium uppercase underline-offset-4 italic transition-all">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-white transition-colors text-sm font-medium italic transition-all">Monte-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-white transition-colors text-sm font-medium italic transition-all">Emballage & Protection</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase italic transition-all hover:opacity-100">Villes 78</h4>
                <ul className="space-y-4 italic transition-all text-slate-400">
                  <li><Link to="/demenagement-yvelines" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4">Yvelines (78)</Link></li>
                  <li><Link to="/demenagement-croissy-sur-seine" className="hover:text-white transition-colors text-sm font-medium uppercase italic transition-all select-none">Croissy-sur-Seine</Link></li>
                  <li><Link to="/demenagement-bougival" className="hover:text-white transition-colors text-sm font-medium italic transition-all select-none">Bougival</Link></li>
                  <li><Link to="/demenagement-versailles" className="hover:text-white transition-colors text-sm font-medium italic transition-all">Versailles</Link></li>
                </ul>
             </div>
             <div className="space-y-6 select-none shadow-black/10">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 uppercase transition-all hover:opacity-100">Plus de zones</h4>
                <ul className="space-y-4 text-slate-400">
                  <li><Link to="/demenagement-rueil-malmaison" className="hover:text-white transition-colors text-sm font-medium italic transition-all">Rueil-Malmaison</Link></li>
                  <li><Link to="/demenagement-nanterre" className="hover:text-white transition-colors text-sm font-medium italic transition-all shadow-sm">Nanterre</Link></li>
                  <li><Link to="/secteurs-desservis" className="hover:text-white transition-colors text-sm font-medium italic transition-all underline underline-offset-4 select-none">Nos secteurs</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors text-sm font-medium transition-colors uppercase italic shadow-sm select-none hover:text-accent transition-all text-accent font-black tracking-widest">Contact</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only select-none transition-all duration-1000">
        <p>
          Marne Transdem, entreprise de déménagement intervenant à Chatou (78400) et dans les Yvelines (78), propose des services de déménagement pour particuliers et entreprises. Solutions pour appartements, maisons de ville, résidences et bureaux. Expertise en protection de mobilier, emballage d'objets fragiles, location de monte-meuble et garde-meuble sécurisé. Intervention à Chatou, Croissy-sur-Seine, Le Vésinet, Rueil-Malmaison, Saint-Germain-en-Laye, Bougival, Nanterre et l'ensemble de l'Île-de-France. Devis gratuit, calculateur de volume en ligne et formules de déménagement adaptées (Économique, Standard, Luxe).
        </p>
      </div>
    </div>
  );
};

export default LocalChatou;
