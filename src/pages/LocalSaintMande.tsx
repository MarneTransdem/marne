import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Store, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalSaintMande: React.FC = () => {
  const path = "/demenagement-saint-mande";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Saint-Mandé ?", 
      a: "Un déménagement à Saint-Mandé demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité." 
    },
    { 
      q: "Marne Transdem intervient-elle à Saint-Mandé et dans les villes proches ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Saint-Mandé et dans les secteurs proches comme Paris 12e, Paris 20e, Vincennes, Montreuil, Charenton-le-Pont et plus largement en Île-de-France selon les besoins du projet." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Saint-Mandé ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Saint-Mandé ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Saint-Mandé ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Saint-Mandé | Marne Transdem"
        description="Préparez votre déménagement à Saint-Mandé avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Saint-Mandé", item: path }
          ])
        ]}
      />

      {/* 1. Hero local */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden text-brand-900 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
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
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Saint-Mandé</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-3xl mx-auto lg:mx-0">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Saint-Mandé, avec une organisation adaptée aux appartements, maisons, résidences, bureaux et contraintes d'accès de l'est parisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
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
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight">
                Votre déménagement à Saint-Mandé
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed font-light">
                <p>
                  Commune résidentielle d'exception limitrophe de <span className="font-bold text-slate-700">Paris 12e</span> et <span className="font-bold text-slate-700">Vincennes</span>, Saint-Mandé offre un cadre de vie privilégié. Marne Transdem intervient quotidiennement dans ce secteur, ainsi qu'à <span className="font-bold text-slate-700">Paris 20e</span>, <Link to="/demenagement-charenton-le-pont" className="font-bold text-slate-700 hover:text-accent underline decoration-accent/20">Charenton-le-Pont</Link> et l'ensemble du <span className="font-bold text-slate-700">Val-de-Marne</span>.
                </p>
                <p>
                  Que vous prépariez le transfert d'<span className="font-bold text-slate-700">appartements</span> familiaux, de <span className="font-bold text-slate-700">maisons</span>, de <span className="font-bold text-slate-700">résidences</span> sécurisées ou de <span className="font-bold text-slate-700">bureaux</span>, <span className="font-bold text-slate-700">commerces</span> et <span className="font-bold text-slate-700 text-slate-700">professions libérales</span>, notre équipe maîtrise les spécificités locales. De l'estimation du <span className="font-bold text-slate-700">volume</span> à la gestion du <span className="font-bold text-slate-700">stationnement</span> et des <span className="font-bold text-slate-700">accès d'immeubles</span>, <span className="font-bold text-slate-700">ascenseurs</span> ou <span className="font-bold text-slate-700">escaliers</span>, nous vous proposons une <span className="font-bold text-slate-700">demande de devis</span> transparente pour votre futur projet.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                <img src="/images/demenagement-94-val-de-marne.jpg" alt="Saint-Mandé Immobilier" width="800" height="600" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Saint-Mandé demande une bonne préparation */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Pourquoi un déménagement à Saint-Mandé demande une bonne préparation</h2>
            <p className="text-slate-400 text-lg font-light italic max-w-3xl mx-auto">
              La densité et le standing de Saint-Mandé imposent une logistique adaptée aux logements avec étages et résidences de caractère.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Logements & Étages", d: "Gestion des appartements avec escaliers ou ascenseurs parfois limités selon les immeubles." },
              { t: "Maisons & Accès", d: "Configuration spécifique des accès maisons et halls de résidences avec parties communes à préserver." },
              { t: "Volumes & Stockage", d: "Prise en compte des caves, cours ou espaces de stockage souvent présents." },
              { t: "Objets Fragiles", d: "Protection renforcée pour les meubles volumineux et objets de valeur dans les logements familiaux." },
              { t: "Stationnement Urbain", d: "Anticipation des emplacements camions pour éviter les gênes de circulation." },
              { t: "Option Monte-meuble", d: "Évaluation de la faisabilité technique si les accès intérieurs ne permettent pas le passage." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:border-accent transition-colors">
                <h3 className="text-xl font-bold mb-4 text-accent flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  {item.t}
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Saint-Mandé */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Nos services à Saint-Mandé</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Particuliers", d: "Appartements, maisons, résidences et logements familiaux.", l: "/demenagement-particuliers-paris" },
              { t: "Entreprises", d: "Bureaux, cabinets, commerces et professions libérales.", l: "/demenagement-entreprises-paris" },
              { t: "Garde-meuble", d: "Solution utile pendant une transition ou des travaux.", l: "/garde-meuble-paris" },
              { t: "Monte-meuble", d: "Solution à envisager selon les accès et la faisabilité.", l: "/location-monte-meuble-paris" },
              { t: "Emballage", d: "Protection des meubles, cartons et objets fragiles.", l: "/emballage-protection-demenagement" },
              { t: "Cartons", d: "Matériel adapté selon le projet : standard, livre, penderie.", l: "/cartons-demenagement-paris" },
              { t: "Formules", d: "3 niveaux de prestations : Économique, Standard ou Luxe.", l: "/formules-demenagement" },
              { t: "Calculateur", d: "Estimation indicative du volume de votre mobilier.", l: "/calculateur-volume" }
            ].map((s, i) => (
              <Link key={i} to={s.l} className="group bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-accent transition-all flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-brand-900 mb-3 group-hover:text-accent transition-colors">{s.t}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed italic">{s.d}</p>
                </div>
                <div className="mt-8 text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  Découvrir le service <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Saint-Mandé */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img src="/images/demenagement-appartement-creteil.jpg" alt="Déménagement Particulier Saint-Mandé" width="600" height="600" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-900/10 pointer-events-none"></div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight">Déménagement de particuliers à Saint-Mandé</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs transferts de <span className="font-bold text-slate-700">maisons</span>, <span className="font-bold text-slate-700">studios</span>, appartements familiaux et <span className="font-bold text-slate-700">résidences</span> sécurisées. Nous organisons vos projets <span className="font-bold text-slate-700">Saint-Mandé vers Paris</span> ou inversement.
                </p>
                <p>
                  De la gestion du <span className="font-bold text-slate-700">tri avant déménagement</span> à la <span className="font-bold text-slate-700">protection des meubles</span> et objets fragiles, nous adaptons la <span className="font-bold text-slate-700">formule</span> à votre <span className="font-bold text-slate-700">volume</span> et vos accès (ascenseur, cave, cave de stockage).
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-4 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-lg">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Saint-Mandé */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative">
              <img src="/images/transfert-bureaux-entreprise-paris.jpg" alt="Transfert Entreprise Saint-Mandé" width="600" height="600" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight text-center lg:text-left">Déménagement d'entreprises à Saint-Mandé</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed">
                <p>
                  Nous accompagnons les professionnels : <span className="font-bold text-slate-700">bureaux</span>, <span className="font-bold text-slate-700">agences</span>, <span className="font-bold text-slate-700 text-slate-700 font-bold">professions libérales</span> et commerces. Notre objectif est de garantir la <span className="font-bold text-slate-700">continuité de votre activité</span> grâce à un planning rigoureux.
                </p>
                <p>
                  Manutention du <span className="font-bold text-slate-700">mobilier de bureau</span>, des <span className="font-bold text-slate-700">archives</span> et du matériel informatique à proximité de Paris et du <span className="font-bold text-slate-700">Val-de-Marne</span>.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                 <Link to="/contact" className="inline-flex items-center gap-4 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all shadow-sm">
                   Organiser un transfert professionnel <Briefcase size={20} />
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "Économique", desc: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport selon le projet." },
             { name: "Standard", desc: "Une formule équilibrée pour déléguer certains éléments comme les objets fragiles ou certains meubles selon les besoins." },
             { name: "Luxe", desc: "Une formule plus complète pour déléguer davantage de préparation, d'emballage et d'organisation selon la prestation choisie." }
           ].map((formule, i) => (
             <div key={i} className={`bg-white p-10 rounded-[3rem] border ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'} transition-all`}>
               <h3 className="text-2xl font-black text-brand-900 mb-6">{formule.name}</h3>
               <p className="text-slate-500 font-light text-sm italic leading-relaxed mb-10">{formule.desc}</p>
               <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest hover:underline decoration-white/20">Voir les détails</Link>
             </div>
           ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-lg">
            Comparer les formules
          </Link>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Volume, accès et monte-meuble à Saint-Mandé</h2>
                <p className="text-slate-400 font-light text-lg italic leading-relaxed">
                  L'environnement résidentiel de Saint-Mandé nécessite une étude attentive des accès pour adapter les moyens techniques et humains.
                </p>
                <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/10">
                  {["Volume à déménager", "Nombre d'étages", "Gestion d'ascenseur", "Hall d'immeuble", "Maison / Cour", "Accès Cave / Parking"].map((check, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-300">
                      <Zap className="text-accent shrink-0" size={16} />
                      <span className="font-light text-sm">{check}</span>
                    </div>
                  ))}
                </div>
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors">
                  Info Monte-meuble <ArrowRight size={14} />
                </Link>
              </div>
              <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md shadow-inner">
                 <Truck className="text-accent mb-8" size={64} />
                 <p className="text-slate-300 font-light italic leading-relaxed text-sm mb-0">
                   Le besoin éventuel d'un monte-meuble à Saint-Mandé dépend de la faisabilité technique (configuration des lieux, ligne électrique, espace de stationnement). Nos experts évaluent cette solution lors de l'étude de votre projet.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Estimez le volume de votre déménagement</h2>
            <p className="text-slate-500 text-lg font-light italic leading-relaxed">
              Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette estimation indicative pourra être affinée selon les accès de votre futur projet.
            </p>
            <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-brand-hover shadow-2xl transition-all group">
              <Calculator size={24} className="text-accent" />
              Utiliser le calculateur de volume
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform font-bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight">Notre méthode en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative">
             <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-slate-100 -z-10"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse de votre projet", d: "Premier échange pour comprendre vos besoins." },
               { icon: Ruler, t: "Évaluation volume & accès", d: "Estimation sur place ou à distance de la logistique." },
               { icon: Calendar, t: "Choix formule & planning", d: "Organisation du jour J et choix des options." },
               { icon: Truck, t: "Réalisation déménagement", d: "Transfert sécurisé de vos biens à Saint-Mandé." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs">{i+1}</div>
                 </div>
                 <div>
                    <h4 className="font-bold text-brand-900 mb-3">{step.t}</h4>
                    <p className="text-slate-500 text-xs font-light px-4 leading-relaxed italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
          <p className="mt-20 text-slate-400 text-sm font-light italic max-w-3xl mx-auto">
             Une méthode claire pour préparer votre déménagement à Saint-Mandé, adapter les moyens nécessaires et choisir le niveau d’accompagnement correspondant à votre situation.
          </p>
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 border-t border-slate-100 bg-slate-50" id="maillage-local">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-brand-900 font-display uppercase tracking-wider">Autres secteurs proches</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center text-slate-500 mb-16">
            <Link to="/demenagement-paris-12" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 12e</Link>
            <Link to="/demenagement-paris-20" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 20e</Link>
            <Link to="/demenagement-vincennes" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Nogent-sur-Marne</Link>
            <Link to="/demenagement-montreuil" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Montreuil</Link>
            <Link to="/demenagement-charenton-le-pont" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Charenton</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Saint-Maur</Link>
            <Link to="/demenagement-val-de-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Val-de-Marne</Link>
            <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Île-de-France</Link>
          </div>

          <div className="pt-12 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left text-slate-500">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Conversion</h4>
                <ul className="space-y-2 text-sm italic">
                  <li><Link to="/demande-de-devis" className="hover:text-accent transition-colors">Demande de devis</Link></li>
                  <li><Link to="/calculateur-volume" className="hover:text-accent transition-colors">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="hover:text-accent transition-colors">Nos formules</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Services</h4>
                <ul className="space-y-2 text-sm italic">
                  <li><Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-colors">Particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-colors">Entreprises</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="hover:text-accent transition-colors">Monte-meuble</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Logistique</h4>
                <ul className="space-y-2 text-sm italic">
                  <li><Link to="/garde-meuble-paris" className="hover:text-accent transition-colors">Garde-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="hover:text-accent transition-colors">Emballage</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">Cartons</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Contact</h4>
                <ul className="space-y-2 text-sm italic">
                  <li><Link to="/contact" className="hover:text-accent transition-colors">Nous contacter</Link></li>
                  <li className="text-slate-400 text-xs leading-relaxed">{CONTACT.fullAddress}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display uppercase tracking-tight">Vous préparez un déménagement à Saint-Mandé ?</h2>
           <p className="text-brand-900/70 text-lg mb-10 max-w-2xl mx-auto italic font-light leading-relaxed font-display">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px]">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px]">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-1/2 left-32 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display tracking-tight uppercase">FAQ Déménagement Saint-Mandé</h2>
           </div>
           <div className="grid grid-cols-1 gap-8">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent/40 transition-all shadow-sm">
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
      <section className="py-12 bg-slate-900 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-4 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Demande de devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules de déménagement</Link>
            <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-all">Déménagement particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all">Déménagement entreprises</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pt-6">
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-all">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-all">Location monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-all">Emballage et protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-all">Cartons et matériel</Link>
            <Link to="/contact" className="hover:text-accent transition-all text-white/40">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalSaintMande;
