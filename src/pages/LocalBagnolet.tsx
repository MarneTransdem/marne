import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Store, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalBagnolet: React.FC = () => {
  const path = "/demenagement-bagnolet";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Bagnolet ?", 
      a: "Un déménagement à Bagnolet demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité." 
    },
    { 
      q: "Marne Transdem intervient-elle à Bagnolet et dans les villes proches ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Bagnolet et dans les secteurs proches comme Paris 20e, Paris 19e, Montreuil, Les Lilas, Romainville, Pantin et plus largement en Île-de-France selon les besoins du projet." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Bagnolet ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Bagnolet ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Bagnolet ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <SEO 
        title="Déménagement Bagnolet | Marne Transdem"
        description="Préparez votre déménagement à Bagnolet avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Bagnolet", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden text-brand-900">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-accent/5 -skew-x-12 translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm mb-8 border border-slate-200"
            >
              <MapPin size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Déménagement local</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Bagnolet</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-3xl">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Bagnolet, avec une organisation adaptée aux appartements, résidences, bureaux, commerces et contraintes d'accès de l'est parisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all">
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3 shadow-sm">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction locale */}
      <section className="py-24 border-b border-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight">
                Votre déménagement à Bagnolet
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Située en bordure immédiate de <span className="font-bold text-slate-700">Paris 20e</span>, Bagnolet est une ville dynamique de la petite couronne. Sa proximité avec <span className="font-bold text-slate-700">Montreuil</span>, <span className="font-bold text-slate-700">Les Lilas</span>, <span className="font-bold text-slate-700">Romainville</span> et <span className="font-bold text-slate-700">Pantin</span> en fait un secteur stratégique pour l'est francilien.
                </p>
                <p>
                  Qu'il s'agisse d'<span className="font-bold text-slate-700">appartements</span> dans des <span className="font-bold text-slate-700">résidences</span> modernes, de <span className="font-bold text-slate-700">logements familiaux</span> ou de <span className="font-bold text-slate-700">maisons</span>, Marne Transdem gère chaque projet avec soin. Nous intervenons également pour les <span className="font-bold text-slate-700">bureaux</span>, <span className="font-bold text-slate-700 font-bold">commerces</span> et <span className="font-bold text-slate-700">locaux professionnels</span>. De l'estimation du <span className="font-bold text-slate-700">volume</span> à la gestion des <span className="font-bold text-slate-700 text-slate-700">accès d'immeubles</span>, <span className="font-bold text-slate-700">ascenseurs</span>, <span className="font-bold text-slate-700">escaliers</span> et <span className="font-bold text-slate-700">stationnement</span>, nous élaborons une <span className="font-bold text-slate-700">demande de devis</span> adaptée à votre situation.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02]">
                <img 
                  src="/images/demenagement-appartement-93.jpg" 
                  alt="Déménagement Bagnolet" 
                  width="800"
                  height="600"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Bagnolet demande une bonne préparation */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Un déménagement préparé à Bagnolet</h2>
            <p className="text-slate-500 text-lg font-light italic">Anticiper les contraintes urbaines pour une transition fluide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Diversité des accès", d: "Configuration variée des rues et des zones de stationnement selon les quartiers." },
              { t: "Logistique Étages", d: "Gestion des ascenseurs limités et des escaliers étroits dans l'ancien." },
              { t: "Protection Résidences", d: "Préserver les parties communes, halls et parkings lors de la manutention." },
              { t: "Monte-meuble", d: "Évaluer la faisabilité technique si les accès intérieurs sont trop contraints." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-accent transition-all">
                <h3 className="text-lg font-bold text-brand-900 mb-4">{item.t}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Bagnolet */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Nos services à Bagnolet</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Particuliers", d: "Appartements, résidences et maisons familiales.", l: "/demenagement-particuliers-paris" },
              { t: "Entreprises", d: "Bureaux, commerces et locaux professionnels.", l: "/demenagement-entreprises-paris" },
              { t: "Garde-meuble", d: "Stockage sécurisé pendant votre transition.", l: "/garde-meuble-paris" },
              { t: "Monte-meuble", d: "Solution pour accès et meubles volumineux.", l: "/location-monte-meuble-paris" },
              { t: "Emballage", d: "Protection des meubles et objets fragiles.", l: "/emballage-protection-demenagement" },
              { t: "Cartons", d: "Matériel professionnel adapté à votre projet.", l: "/cartons-demenagement-paris" },
              { t: "Formules", d: "3 niveaux : Économique, Standard ou Luxe.", l: "/formules-demenagement" },
              { t: "Calculateur", d: "Estimation indicative de votre volume global.", l: "/calculateur-volume" }
            ].map((s, i) => (
              <Link key={i} to={s.l} className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-brand-900 mb-3 group-hover:text-accent transition-colors">{s.t}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">{s.d}</p>
                </div>
                <div className="mt-8 text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  Découvrir <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Bagnolet */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-light">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black leading-tight italic">Déménagement de particuliers à Bagnolet</h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed italic">
                <p>
                  Que vous emménagiez dans une résidence du quartier de la Noue ou que vous quittiez un appartement proche de la Mairie, Marne Transdem assure vos projets <span className="text-white font-bold">Bagnolet vers Paris</span> ou inversement.
                </p>
                <p>
                  Nous prenons en charge la <span className="text-white font-bold">protection de vos meubles</span> et objets fragiles, tout en vous conseillant sur le meilleur choix de <span className="text-white font-bold">formule</span> selon votre <span className="text-white font-bold">volume</span> et vos besoins d'accompagnement (préparation de cartons, cave, caves de stockage).
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-white transition-all shadow-xl">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                 <img src="/images/demenagement-maison-appartement-particulier.jpg" alt="Habitation Bagnolet" width="800" height="600" loading="lazy" decoding="async" className="w-full h-full object-cover" />
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-3xl -z-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Bagnolet */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="aspect-video bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white p-2">
                 <img src="/images/transfert-bureaux-entreprise-paris.jpg" alt="Bureaux Bagnolet" width="800" height="450" loading="lazy" decoding="async" className="rounded-[2rem] w-full h-full object-cover" />
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900">Déménagement d'entreprises à Bagnolet</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Le <span className="font-bold text-slate-700">transfert professionnel</span> à Bagnolet concerne aussi bien les grands bureaux que les <span className="font-bold text-slate-700">agences</span> et <span className="font-bold text-slate-700">commerces</span> de proximité.
                </p>
                <p>
                  Nous gérons la manutention de votre <span className="font-bold text-slate-700">mobilier de bureau</span>, de vos <span className="font-bold text-slate-700">archives</span> et de votre matériel informatique avec une organisation précise garantissant la <span className="font-bold text-slate-700">continuité de votre activité</span>. Proximité avec Paris et l'est francilien.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all">
                Organiser un transfert professionnel <Briefcase size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Formules adaptées à votre projet</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {[
               { name: "Économique", desc: "Vous préparez vos cartons, nous gérons la manutention et le transport." },
               { name: "Standard", desc: "Le bon équilibre : nous gérons les objets fragiles et le mobilier." },
               { name: "Luxe", desc: "Délégation complète de la préparation et de l'organisation." }
             ].map((formule, i) => (
               <div key={i} className={`bg-white p-12 rounded-[2.5rem] border ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
                 <h3 className="text-2xl font-black text-brand-900 mb-6">{formule.name}</h3>
                 <p className="text-slate-500 font-light text-sm italic mb-10">{formule.desc}</p>
                 <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest hover:underline">Voir les détails</Link>
               </div>
             ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent transition-all shadow-lg">
              Comparer les formules
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8">Volume, accès et monte-meuble à Bagnolet</h2>
                <p className="text-slate-400 font-light text-lg italic leading-relaxed">
                  L'environnement urbain de Bagnolet demande une analyse précise des accès : immeubles de grande hauteur, rues étroites ou besoins de stationnement en rue.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  {["Volume total", "Étages & Ascenseur", "Accès Cave / Parking", "Stationnement réservé"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-300">
                      <Zap size={16} className="text-accent" />
                      <span className="font-light text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px]">
                  Info Monte-meuble <ArrowRight size={14} />
                </Link>
              </div>
              <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-sm shadow-inner italic font-light">
                 <p className="text-slate-300 mb-8 leading-relaxed">
                   En fonction de la configuration des lieux (étage, largeur des escaliers, meubles volumineux ne passant pas par les accès classiques), l'utilisation d'un monte-meuble peut être envisagée sous réserve de faisabilité technique.
                 </p>
                 <div className="flex items-center gap-4 text-accent">
                   <Truck size={32} />
                   <span className="text-xs font-black uppercase tracking-widest">Expertise Bagnolet</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Estimez le volume de votre déménagement</h2>
            <p className="text-slate-500 text-lg font-light italic leading-relaxed">
              Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette évaluation indicative facilite l'étude de votre projet.
            </p>
            <Link to="/calculateur-volume" className="inline-flex items-center gap-4 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group">
              <Calculator size={24} className="text-accent" />
              Accéder au calculateur
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Notre méthode en 4 étapes</h2>
            <p className="text-slate-400 mt-4 font-light italic leading-relaxed">Une organisation claire pour un déménagement à Bagnolet maîtrisé.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative font-sans">
             <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-slate-100 -z-10"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse de votre projet", d: "Premier échange pour comprendre vos besoins." },
               { icon: Ruler, t: "Évaluation volume & accès", d: "Estimation précise de la logistique requise." },
               { icon: Calendar, t: "Choix formule & planning", d: "Organisation du jour J et choix des options." },
               { icon: Truck, t: "Réalisation déménagement", d: "Transfert sécurisé de vos biens à Bagnolet." }
             ].map((step, i) => (
               <div key={i} className="text-center space-y-6">
                 <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 hover:bg-accent transition-all duration-500 relative">
                    <step.icon size={32} />
                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs">{i+1}</span>
                 </div>
                 <h4 className="font-bold text-brand-900">{step.t}</h4>
                 <p className="text-slate-500 text-xs font-light leading-relaxed px-4">{step.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 border-t border-slate-100 bg-slate-50" id="maillage-local">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-brand-900 font-display text-brand-900">Autres secteurs proches</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center text-slate-500 mb-16">
            <Link to="/demenagement-paris-20" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 20e</Link>
            <Link to="/demenagement-paris-19" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 19e</Link>
            <Link to="/demenagement-montreuil" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Montreuil</Link>
            <Link to="/demenagement-pantin" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Pantin</Link>
            <Link to="/demenagement-vincennes" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Nogent-sur-Marne</Link>
            <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Île-de-France</Link>
          </div>

          <div className="pt-12 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left text-slate-500">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Conversion</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/demande-de-devis" className="hover:text-accent transition-colors">Demande de devis</Link></li>
                  <li><Link to="/calculateur-volume" className="hover:text-accent transition-colors">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-accent transition-colors">Nos formules</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Services</h4>
                <ul className="space-y-2 text-sm font-light">
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-colors">Particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-colors">Entreprises</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-accent transition-colors">Monte-meuble</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Logistique</h4>
                <ul className="space-y-2 text-sm font-light italic">
                  <li><Link to="/garde-meuble-paris" className="hover:text-accent transition-colors">Garde-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-accent transition-colors">Emballage</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">Cartons</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Contact</h4>
                <ul className="space-y-2 text-sm font-light italic text-slate-400">
                  <li><Link to="/contact" className="hover:text-accent transition-colors">Nous contacter</Link></li>
                  <li className="leading-relaxed">{CONTACT.fullAddress}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight">Vous préparez un déménagement à Bagnolet ?</h2>
           <p className="text-brand-900/70 text-lg mb-10 max-w-2xl mx-auto italic font-light leading-relaxed">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px]">
               Demande de devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px]">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display uppercase tracking-tight">FAQ Déménagement Bagnolet</h2>
           </div>
           <div className="grid grid-cols-1 gap-8">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-10 lg:p-12 rounded-[2.5rem] border border-slate-100 hover:border-accent/40 shadow-sm transition-all transition-colors group">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5">
                   <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 14. Maillage interne final */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-300">
            <Link to="/demande-de-devis" className="hover:text-accent transition-colors">Demande de devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-colors">Calculateur de volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-colors">Formules de déménagement</Link>
            <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-colors">Déménagement particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-colors">Déménagement entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-colors">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-colors">Location monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-colors">Emballage et protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">Cartons et matériel</Link>
            <Link to="/contact" className="hover:text-accent transition-colors text-accent">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalBagnolet;
