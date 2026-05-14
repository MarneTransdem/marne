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
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getBreadcrumbSchema, getFAQSchema } from '../lib/schema';

const LocalSceaux: React.FC = () => {
  const path = "/demenagement-sceaux";

  const faqData = [
    {
      q: "Comment organiser un déménagement à Sceaux ?",
      a: "Un déménagement à Sceaux demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Dans une ville résidentielle où l'on trouve aussi bien des appartements que des maisons, il est important d'évaluer les caves, garages, parkings, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité."
    },
    {
      q: "Marne Transdem intervient-elle à Sceaux et dans les villes proches ?",
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Sceaux et dans les secteurs proches comme Bourg-la-Reine, Fontenay-aux-Roses, Antony, Châtenay-Malabry, Bagneux, Le Plessis-Robinson, Cachan, Clamart et plus largement dans les Hauts-de-Seine selon les besoins du projet."
    },
    {
      q: "Peut-on demander un monte-meuble à Sceaux ?",
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique."
    },
    {
      q: "Quelle formule choisir pour un déménagement à Sceaux ?",
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie."
    },
    {
      q: "Comment obtenir un devis pour un déménagement à Sceaux ?",
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Déménagement Sceaux | Marne Transdem" 
        description="Préparez votre déménagement à Sceaux avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Sceaux", item: path }
          ]),
          getFAQSchema(faqData)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden font-display italic">
        <div className="absolute inset-0 bg-[url('/images/demenagement-paris-intra-muros.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white italic">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6 text-white italic">
                <span className="h-px w-8 bg-accent italic"></span>
                <span className="text-accent uppercase font-black tracking-widest text-sm italic">Déménagement local</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white italic">
                Déménagement <span className="text-accent italic">Sceaux</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-medium italic">
                Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Sceaux, avec une organisation adaptée aux appartements, maisons et résidences du sud des Hauts-de-Seine.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 italic">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-accent text-brand-900 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group italic"
                >
                  Demander un devis gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform italic" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 italic"
                >
                  <Phone size={20} className="text-accent italic" />
                  {CONTACT.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-4 font-display italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <nav className="flex text-xs font-bold uppercase tracking-widest text-slate-400 italic">
            <Link to="/" className="hover:text-brand-900 transition-colors italic">Accueil</Link>
            <span className="mx-3 text-slate-200">/</span>
            <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors italic">Secteurs</Link>
            <span className="mx-3 text-slate-200">/</span>
            <span className="text-brand-900 italic font-black">Fontenay-aux-Roses</span>
          </nav>
        </div>
      </div>

      {/* 2. Introduction locale */}
      <section className="py-24 bg-white overflow-hidden relative font-display italic">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 italic font-display"
            >
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic">
                Votre déménagement à Sceaux
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium italic opacity-80 font-display">
                <p>
                  Sceaux est une ville résidentielle, familiale et recherchée des Hauts-de-Seine, profitant d'une proximité directe avec Bourg-la-Reine, Fontenay-aux-Roses, Antony, Châtenay-Malabry, Bagneux, Le Plessis-Robinson, Cachan et Paris sud.
                </p>
                <p>
                  Marne Transdem accompagne vos projets à Sceaux, qu'il s'agisse d'un appartement de standing en centre-ville, d'un studio, d'une maison de caractère ou d'un logement familial dans un quartier résidentiel. Nous maîtrisons les spécificités d'accès locaux : parcs, jardins, halls d'immeubles, ascenseurs, escaliers, parkings, caves ou cours intérieures.
                </p>
                <p>
                  Pour les professionnels, nous organisons les transferts de bureaux, commerces, cabinets et agences de professions libérales à Sceaux, avec une logistique soignée garantissant la continuité de votre activité au cœur d'un environnement privilégié.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 italic font-display">
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm italic">
                  <MapPin className="text-accent italic" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic font-display">Sceaux (92330)</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-sm italic">
                  <ShieldCheck className="text-brand-900 italic" size={24} />
                  <span className="text-brand-900 font-bold uppercase tracking-wider text-xs italic font-display">Expertise Premium</span>
                </div>
              </div>
            </motion.div>
            <div className="relative italic font-display">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50 italic">
                <img 
                  src="/images/demenagement-appartement-92.jpg" 
                  alt="Déménagement Sceaux" 
                  className="w-full h-full object-cover italic font-display"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0 italic font-display"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Sceaux demande une bonne préparation */}
      <section className="py-24 bg-slate-50 font-display italic">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16 px-4 italic font-display">
          <h2 className="text-4xl font-black text-brand-900 mb-6 tracking-tight italic font-display uppercase italic text-center">Pourquoi un déménagement à Sceaux demande une bonne préparation</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium opacity-80 italic font-display text-center">
            Ville résidentielle avec un patrimoine immobilier de qualité, Sceaux demande une attention particulière à la protection des biens et à la logistique d'accès.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic font-display font-display shadow-sm">
            {[
              {
                title: "Mobilier & Objets de Valeur",
                desc: "Nous assurons une protection soignée pour vos biens fragiles, meubles familiaux et objets précieux.",
                icon: ShieldCheck
              },
              {
                title: "Logistique Résidentielle",
                desc: "Halls, parkings souterrains, garages ou jardins : nous planifions chaque point de passage avec précision.",
                icon: MapPin
              },
              {
                title: "Préservation des Lieux",
                desc: "Nous veillons à la protection des parties communes, escaliers et ascenseurs lors de la manutention.",
                icon: ArrowUpCircle
              },
              {
                title: "Gestion du Bâti",
                desc: "D'un appartement moderne à une maison ancienne, chaque configuration d'immeuble à Sceaux est expertisée.",
                icon: Home
              },
              {
                title: "Stationnement local",
                desc: "Anticipation des accès depuis la rue ou en zone résidentielle pour optimiser le temps de transfert.",
                icon: Truck
              },
              {
                title: "Solution Monte-Meuble",
                desc: "Si les accès intérieurs sont limités, nous évaluons la possibilité technique d'installer un monte-meuble extérieur.",
                icon: ArrowUpCircle
              }
            ].map((item, id) => (
              <div key={id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group italic font-display">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-brand-900 transition-colors italic">
                  <item.icon className="text-brand-900 group-hover:text-accent italic font-display" size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight italic font-display">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm italic opacity-80 italic font-display">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Sceaux */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative font-display italic">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-accent opacity-5 -skew-x-12 -translate-x-1/2 italic"></div>
        <div className="container mx-auto px-4 md:px-6 mb-20 text-center relative z-10 px-4 italic font-display">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight italic font-display italic">Nos prestations à Sceaux</h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto italic font-medium opacity-80 italic font-display">Un service sur mesure pour tous vos projets de déménagement et stockage.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic font-display font-display px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 italic font-display shadow-sm">
            {[
              {
                title: "Déménagement de particuliers",
                desc: "Appartements, studios, maisons et logements familiaux.",
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
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white hover:text-brand-900 transition-all group active:scale-[0.98] italic font-display"
              >
                <service.icon size={32} className="text-accent group-hover:text-brand-900 mb-6 italic" />
                <h3 className="text-xl font-bold mb-4 tracking-tight leading-tight italic font-display italic">{service.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-600 text-sm leading-relaxed mb-6 italic opacity-80 italic font-display">{service.desc}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent group-hover:text-brand-900 transition-colors italic font-display">
                  Détails <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform italic font-display" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Sceaux */}
      <section className="py-24 bg-white font-display italic shadow-sm overflow-hidden px-4">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="flex flex-col lg:flex-row gap-20 items-center italic font-display px-4">
            <div className="lg:w-1/2 order-2 lg:order-1 relative italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] italic shadow-brand-900/10">
                  <img 
                    src="/images/demenagement-appartement-92.jpg" 
                    alt="Déménagement particuliers Sceaux" 
                    className="w-full h-full object-cover italic font-display"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl italic"></div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 italic font-display font-display">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic font-display italic px-4">Déménagement de particuliers</h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium italic opacity-80 font-display px-4">
                <p>
                  Marne Transdem accompagne les familles, actifs, cadres et étudiants pour leurs déménagements à Sceaux : appartements de standing, studios ou maisons familiales.
                </p>
                <p>
                  De Sceaux vers Paris, ou de Paris vers Sceaux, nous gérons chaque étape de votre mobilité locale ou longue distance. Organisation des cartons, protection absolue du mobilier, transport sécurisé et gestion des accès (ascenseur, cave, garage, parking) : nous adaptons nos moyens à votre situation.
                </p>
              </div>
              <div className="pt-8 italic font-display px-4">
                <Link 
                  to="/devis-demenagement" 
                  className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-xl active:scale-95 group shadow-brand-900/20 italic font-display"
                >
                  Ouvrir mon dossier
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform italic font-display" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Sceaux */}
      <section className="py-24 bg-slate-50 overflow-hidden relative font-display italic shadow-sm px-4">
        <div className="container mx-auto px-4 md:px-6 italic font-display">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center italic font-display italic">
             <div className="lg:w-1/2 italic font-display">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative border-8 border-white p-2 italic font-display shadow-sm">
                  <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Déménagement Entreprise Sceaux" className="w-full h-full object-cover rounded-[2.5rem] italic font-display" />
                </div>
             </div>
             <div className="lg:w-1/2 space-y-8 italic font-display italic font-display shadow-sm px-4">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic font-display italic font-display">Déménagement d'entreprises à Sceaux</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display px-4">
                 <p>
                   Marne Transdem accompagne les professionnels de Sceaux (bureaux, commerces, cabinets, professions libérales) dans leurs transferts d'activité.
                 </p>
                 <p>
                    Mobilier professionnel, matériel informatique, archives : nous organisons votre transfert avec rigueur pour assurer la continuité de vos services. Notre maîtrise du secteur sud 92 couvre Bourg-la-Reine, Fontenay-aux-Roses, Antony et Châtenay-Malabry.
                 </p>
               </div>
               <div className="pt-8 italic font-display px-4">
                 <Link 
                   to="/demenagement-entreprises-paris" 
                   className="inline-flex bg-white border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all active:scale-95 group italic font-display shadow-sm"
                 >
                   Organiser un transfert
                   <Building2 className="ml-3 group-hover:scale-110 transition-transform font-display italic shadow-sm" size={20} />
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-white relative font-display italic overflow-hidden shadow-sm">
        <div className="container mx-auto px-4 md:px-6 mb-16 text-center italic font-display px-4">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic font-display font-display shadow-sm uppercase italic">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 italic font-display shadow-xl">
            {[
              {
                name: "Économique",
                desc: "Manutention et transport : vous préparez vos cartons, nous gérons la logistique lourde.",
                icon: Calculator
              },
              {
                name: "Standard",
                desc: "L'option équilibrée : nous emballons les objets fragiles et protégeons votre mobilier soigné.",
                icon: Layout
              },
              {
                name: "Luxe",
                desc: "Sérénité absolue : nous gérons la majeure partie de la préparation et de l'emballage sécurisé.",
                icon: ShieldCheck
              }
            ].map((formula, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all border-t-8 border-t-accent flex flex-col justify-between italic font-display shadow-sm">
                <div className="italic font-display">
                  <formula.icon size={40} className="text-brand-900 mb-6 italic shadow-sm font-display italic" />
                  <h4 className="text-2xl font-black text-brand-900 mb-4 italic font-display italic px-4 font-display">{formula.name}</h4>
                  <p className="text-slate-600 mb-8 font-medium leading-relaxed opacity-80 italic font-display px-4 shadow-sm italic font-display">{formula.desc}</p>
                </div>
                <Link 
                  to="/formules-demenagement" 
                  className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-xs hover:text-accent transition-colors italic font-display shadow-sm italic px-4 font-display shadow-2xl"
                >
                  Détails <ArrowRight size={14} className="italic shadow-sm italic font-display shadow-sm" />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center italic font-display px-4">
             <Link 
              to="/formules-demenagement" 
              className="inline-flex items-center gap-4 bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all active:scale-95 shadow-2xl group italic font-display font-display px-4 shadow-sm shadow-brand-900/10 italic"
             >
               Plus d'infos sur nos formules <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24 bg-slate-50 font-display italic overflow-hidden shadow-sm px-4">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic font-display px-4">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white italic font-display shadow-xl">
               <img src="/images/camion-demenagement-val-de-marne.jpg" alt="Logistique à Sceaux" className="w-full h-full object-cover italic font-display shadow-sm" />
             </div>
             <div className="space-y-8 italic font-display italic font-display shadow-sm px-4">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic font-display italic px-4 font-display shadow-sm uppercase italic tracking-tighter">Volume, accès et monte-meuble à Sceaux</h2>
               <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium opacity-80 italic font-display px-4 shadow-sm">
                 <p>
                    L'organisation d'un déménagement à Sceaux nécessite une expertise technique des accès urbains : résidences avec étages, halls d'immeubles, escaliers, jardins, caves, parkings ou garages souterrains. 
                 </p>
                 <p>
                    Le volume global, le mobilier volumineux démantelable ou non ainsi que les objets fragiles orientent nos choix logistiques. En cas d'accès intérieur restreint (cage d'escalier étroite, ascenseur limité), une solution monte-meuble extérieur sera proposée après étude de faisabilité technique.
                 </p>
               </div>
               <div className="pt-6 italic font-display shadow-sm px-4">
                 <Link 
                    to="/location-monte-meuble-paris" 
                    className="flex items-center gap-2 text-brand-900 font-bold uppercase tracking-widest hover:text-accent transition-colors italic font-display font-display italic"
                  >
                    Solutions monte-meuble <ArrowRight size={18} className="italic shadow-sm font-display" />
                 </Link>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* 9. Calculer votre volume avant de demander un devis */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative font-display italic shadow-xl px-4 italic font-display shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent opacity-[0.03] rotate-12 translate-x-1/2 italic"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic font-display shadow-sm px-4">
           <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center px-4 italic font-display shadow-sm px-4 font-display">
             <div className="lg:w-2/3 space-y-8 italic px-4 font-display">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 italic font-display italic px-4 font-display shadow-sm">Estimez le volume de votre mobilier</h2>
                <p className="text-slate-300 text-lg font-medium leading-relaxed opacity-80 italic font-display italic px-4 shadow-sm italic font-display">
                  Avant de solliciter un devis, utilisez notre calculateur de volume pour obtenir une estimation indicative de vos meubles et cartons. Cette première étape permet d'affiner votre projet pour Sceaux.
                </p>
                <div className="pt-4 italic font-display shadow-sm px-4 italic font-display">
                  <Link 
                    to="/calculateur-volume" 
                    className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-2xl group flex items-center justify-center gap-3 italic font-display font-display"
                  >
                    Outil Calculateur
                    <Calculator size={20} className="group-hover:rotate-12 transition-transform italic shadow-sm" />
                  </Link>
                </div>
             </div>
             <div className="lg:w-1/3 flex justify-center italic shadow-sm px-4 italic font-display">
                <div className="w-64 h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] flex items-center justify-center group relative overflow-hidden italic shadow-2xl">
                    <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 italic"></div>
                    <Calculator size={100} className="text-accent group-hover:scale-110 transition-transform duration-700 font-display italic shadow-sm italic shadow-2xl" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24 bg-white font-display italic shadow-sm px-4 font-display shadow-2xl overflow-hidden underline-offset-4">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20 px-4 italic font-display shadow-sm italic font-display px-4 italic">
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight leading-tight italic font-display shadow-sm italic font-display px-4 uppercase italic tracking-tight">Une méthode fluide et transparente</h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic opacity-70 italic font-display shadow-sm italic font-display shadow-sm px-4">Préparer sereinement votre déménagement à Sceaux.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm italic px-4 italic font-display px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative overflow-hidden px-4 italic font-display shadow-sm italic font-display shadow-sm">
             <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 -z-10 font-display italic shadow-sm italic shadow-2xl"></div>
             {[
               { id: "01", title: "Cadrage du projet", desc: "Étude de votre besoin, du volume global et de votre calendrier cible." },
               { id: "02", title: "Audit technique", desc: "Expertise physique ou à distance des accès et de la logistique à Sceaux." },
               { id: "03", title: "Cadrage logistique", desc: "Choix de la formule, planification des équipes et préparation emballage." },
               { id: "04", title: "Mise en œuvre", desc: "Prise en charge de la manutention experte et transport local sécurisé." }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center transform transition-transform hover:-translate-y-2 duration-300 italic font-display italic shadow-sm italic">
                 <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl font-black text-brand-900 mb-8 mx-auto group-hover:bg-brand-900 group-hover:text-accent transition-all font-display italic shadow-sm shadow-brand-900/5 hover:scale-105 italic">
                   {step.id}
                 </div>
                 <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight leading-tight italic font-display shadow-sm italic font-display italic px-4 uppercase tracking-tighter italic">{step.title}</h4>
                 <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 italic font-display italic shadow-sm italic font-display px-4 italic">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Secteurs proches de Sceaux */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 font-display shadow-2xl overflow-hidden shadow-black/5 italic">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm px-4 italic font-display px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-end mb-16 px-4 italic font-display shadow-sm italic font-display shadow-sm px-4">
            <div className="lg:w-2/3 space-y-6 italic shadow-sm px-4 font-display">
              <span className="text-accent uppercase font-black tracking-widest text-[10px] mb-4 block italic tracking-[0.2em] opacity-80 italic shadow-sm italic font-display">Réseau Local</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic font-display italic px-4 shadow-sm font-display italic uppercase tracking-tighter italic font-display">Secteurs proches de Sceaux</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 italic font-display italic px-4 shadow-sm italic font-display px-4">
                Nous intervenons dans toute la zone sud des Hauts-de-Seine et à Paris, assurant une prestation de proximité pour les particuliers et les entreprises.
              </p>
            </div>
            <div className="lg:w-1/3 italic font-display shadow-sm px-4 italic font-display italic shadow-sm">
              <Link to="/secteurs-desservis" className="group flex items-center gap-4 text-brand-900 font-black uppercase tracking-widest text-sm italic font-display italic px-4 shadow-sm italic">
                Voir tous les secteurs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform italic font-display shadow-sm italic" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 font-display italic shadow-sm px-4 italic font-display shadow-sm px-4">
            {[
              { name: "Bourg-la-Reine", link: "/demenagement-bourg-la-reine" },
              { name: "Fontenay", link: "/demenagement-fontenay-aux-roses" },
              { name: "Antony", link: "/demenagement-antony" },
              { name: "Châtenay", link: "/demenagement-chatenay-malabry" },
              { name: "Bagneux", link: "/demenagement-bagneux" },
              { name: "Le Plessis-Robinson", link: "/demenagement-le-plessis-robinson" },
              { name: "Vélizy", link: "/demenagement-velizy-villacoublay" },
              { name: "Clamart", link: "/demenagement-clamart" },
              { name: "HDS / 92", link: "/demenagement-hauts-de-seine" },
              { name: "IDF / Région", link: "/demenagement-ile-de-france" },
              { name: "Vaucresson", link: "/demenagement-vaucresson" }
            ].map((city, idx) => (
              city.link ? (
                <Link 
                  key={idx} 
                  to={city.link}
                  className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:border-brand-900 transition-colors group shadow-sm active:scale-95 transition-all italic font-display shadow-sm italic"
                >
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest italic font-display italic">{city.name}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-brand-900 italic shadow-sm" />
                </Link>
              ) : (
                <div key={idx} className="bg-slate-100/50 border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm opacity-60 italic font-display shadow-sm italic font-display px-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic font-display shadow-sm font-display italic">{city.name}</span>
                  <MapPin size={14} className="text-slate-300 italic shadow-sm font-display" />
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-white relative overflow-hidden font-display italic shadow-sm px-4 font-display shadow-2xl overflow-hidden underline-offset-4 italic">
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic font-display italic shadow-sm italic font-display px-4 italic font-display px-4 shadow-sm overflow-hidden shadow-brand-900/5">
          <div className="bg-white rounded-[4rem] p-12 md:p-24 shadow-2xl border border-slate-50 text-center relative overflow-hidden group shadow-brand-900/5 italic px-4 font-display shadow-sm italic font-display px-4 shadow-sm uppercase italic tracking-tight">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 italic shadow-sm font-display shadow-sm italic font-display shadow-sm italic shadow-accent/20"></div>
            <div className="max-w-4xl mx-auto space-y-10 relative z-10 italic font-display italic shadow-sm italic font-display px-4 italic font-display px-4 shadow-sm shadow-brand-900/10 italic">
              <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight leading-tight italic font-display shadow-sm italic font-display px-4 shadow-sm font-display shadow-sm underline-offset-4 italic">
                Vous préparez un déménagement à Sceaux ?
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-3xl mx-auto leading-relaxed italic opacity-80 italic font-display shadow-sm italic font-display px-4 shadow-sm italic font-display shadow-sm italic font-display">
                Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 italic font-display shadow-sm italic font-display px-4 shadow-sm italic font-display shadow-sm underline-offset-4">
                <Link 
                  to="/devis-demenagement" 
                  className="bg-brand-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-800 transition-all shadow-2xl active:scale-95 group flex items-center justify-center gap-3 shadow-brand-900/20 italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm shadow-brand-900/20 italic"
                >
                  DEVIS GRATUIT
                  <FileText size={20} className="group-hover:translate-x-1 transition-transform italic shadow-sm font-display" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} 
                  className="bg-slate-50 text-brand-900 border border-slate-100 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl italic font-display shadow-sm italic font-display font-display italic shadow-sm shadow-brand-900/5"
                >
                  <Phone size={20} className="italic shadow-sm font-display" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 bg-slate-50 font-display italic shadow-sm px-4 font-display shadow-2xl overflow-hidden italic shadow-black/5">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm italic font-display px-4 italic font-display shadow-sm italic overflow-hidden shadow-brand-900/5">
          <div className="max-w-4xl mx-auto space-y-12 px-4 shadow-sm italic font-display shadow-sm italic font-display shadow-sm overflow-hidden shadow-brand-900/5 italic px-4 italic shadow-2xl italic font-display">
            <div className="text-center mb-16 italic font-display italic shadow-sm italic font-display px-4 italic font-display italic shadow-sm italic font-display italic">
               <span className="text-accent uppercase font-black tracking-widest text-[10px] italic shadow-sm font-display italic block mb-4 italic tracking-[0.2em] opacity-80 italic shadow-sm">CONSEILS LOCAUX</span>
               <h2 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tight leading-tight italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden shadow-brand-900/5 italic underline-offset-4">FAQ Déménagement Sceaux</h2>
               <p className="text-slate-500 font-medium italic opacity-80 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden shadow-brand-900/5 italic font-display italic font-display font-display font-display underline-offset-4">Les étapes clés pour votre mobilité dans le sud des Hauts-de-Seine.</p>
            </div>
            
            <div className="space-y-6 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display italic shadow-sm px-4">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display italic">
                   <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4 tracking-tight leading-tight italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm italic">
                    <span className="w-10 h-10 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0 text-sm font-black italic shadow-sm italic font-display font-black italic shadow-sm">Q</span>
                    {faq.q}
                   </h3>
                   <div className="pl-14 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden shadow-2xl font-display italic font-display font-display italic shadow-sm px-4">
                      <p className="text-slate-600 leading-relaxed font-medium italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-brand-900/5 shadow-sm">
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
      <section className="py-20 bg-brand-900 text-white font-display border-t border-white/5 italic font-display shadow-sm px-4 font-display shadow-2xl overflow-hidden underline-offset-4 shadow-black/20 italic">
        <div className="container mx-auto px-4 md:px-6 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-2xl italic">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 font-display italic italic font-display italic shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display shadow-sm shadow-brand-900/5">
             <div className="space-y-6 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display shadow-sm">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 italic font-display shadow-sm italic font-display shadow-sm italic shadow-accent/20">Nos Services</h4>
                <ul className="space-y-4 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-sm">
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display shadow-sm italic">Déménagement particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display shadow-sm italic font-display">Déménagement entreprises</Link></li>
                  <li><Link to="/garde-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display italic font-display shadow-sm">Garde-meuble</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display font-display shadow-sm">Location monte-meuble</Link></li>
                </ul>
             </div>
             <div className="space-y-6 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display shadow-sm hover:scale-105 transition-transform italic italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 italic font-display shadow-sm italic font-display shadow-sm italic shadow-accent/20 italic">Outils Métiers</h4>
                <ul className="space-y-4 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-sm shadow-brand-900/5 italic">
                  <li><Link to="/calculateur-volume" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm italic font-display italic">Calculateur de volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm italic">Formules de déménagement</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display font-display shadow-sm italic font-display italic">Emballage et protection</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm font-display shadow-sm font-display italic font-display shadow-sm italic">Cartons et matériel</Link></li>
                </ul>
             </div>
             <div className="space-y-6 font-display italic shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-sm shadow-brand-900/5 italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm italic shadow-accent/20 italic uppercase tracking-tighter shadow-sm font-display font-display italic">Accès Directs</h4>
                <ul className="space-y-4 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-sm hover:scale-105 transition-transform italic font-display shadow-sm">
                  <li><Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display shadow-sm italic">Île-de-France</Link></li>
                  <li><Link to="/demenagement-92-hauts-de-seine" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm font-display shadow-sm font-display italic font-display italic shadow-sm">Hauts-de-Seine</Link></li>
                  <li><Link to="/longue-distance" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic font-display shadow-sm italic shadow-sm italic font-display font-display shadow-sm shadow-brand-900/10 italic">Longue distance</Link></li>
                  <li><Link to="/secteurs-desservis" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display italic font-display shadow-sm shadow-brand-900/10 italic font-display shadow-sm shadow-white/5">Secteurs desservis</Link></li>
                </ul>
             </div>
             <div className="space-y-6 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-sm shadow-brand-900/10 italic font-display italic shadow-sm italic">
                <h4 className="text-accent text-[10px] uppercase font-black tracking-widest italic tracking-[0.2em] opacity-80 italic font-display shadow-sm italic font-display shadow-sm italic font-display shadow-sm shadow-accent/20 italic font-display font-display">Secteurs Sud 92</h4>
                <ul className="space-y-4 italic font-display shadow-sm italic font-display shadow-sm italic overflow-hidden font-display italic font-display shadow-sm font-display italic shadow-sm hover:scale-105 transition-transform italic shadow-sm shadow-brand-900/10 italic">
                  <li><Link to="/demenagement-fontenay-aux-roses" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm italic font-display italic font-display uppercase tracking-widest italic font-display shadow-sm italic">Fontenay (proche)</Link></li>
                  <li><Link to="/demenagement-bagneux" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm font-display shadow-sm font-display shadow-sm italic font-display shadow-sm">Bagneux (proche)</Link></li>
                  <li><Link to="/demenagement-clamart" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic font-display shadow-sm italic shadow-sm font-display uppercase tracking-widest italic shadow-sm italic">Clamart (proche)</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium italic shadow-sm font-display font-display italic shadow-sm uppercase tracking-widest italic shadow-sm">Nous contacter</Link></li>
                </ul>
             </div>
           </div>
        </div>
      </section>

      {/* Semantic Text */}
      <div className="sr-only italic font-display italic font-display italic shadow-sm">
        <p>
          Marne Transdem, expert du déménagement Sceaux et dans les Hauts-de-Seine (92), vous accompagne pour tous vos projets : transfert de bureaux Sceaux, déménagement appartement de standing, studio, maison de ville, résidence de qualité avec accès complexes, location monte-meuble et garde-meuble. Devis gratuit pour particuliers et entreprises. Proximité Bourg-la-Reine, Fontenay-aux-Roses, Antony, Châtenay-Malabry, Bagneux, Le Plessis-Robinson, Cachan, Clamart et Paris sud.
        </p>
      </div>
    </div>
  );
};

export default LocalSceaux;
