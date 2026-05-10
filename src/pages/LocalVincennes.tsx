import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Store, Briefcase, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalVincennes: React.FC = () => {
  const path = "/demenagement-vincennes";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Vincennes ?", 
      a: "Un déménagement à Vincennes demande d'anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d'accompagnement souhaité." 
    },
    { 
      q: "Marne Transdem intervient-elle à Vincennes et dans les villes proches ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Vincennes et dans les secteurs proches comme Paris 12e, Paris 20e, Saint-Mandé, Montreuil, Fontenay-sous-Bois et plus largement en Île-de-France selon les besoins du projet." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Vincennes ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l'escalier ou l'ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Vincennes ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d'accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Vincennes ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L'estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l'emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Vincennes | Marne Transdem"
        description="Préparez votre déménagement à Vincennes avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Vincennes", item: path }
          ])
        ]}
      />

      {/* 1. Hero local */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden text-brand-900 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-accent/5 -skew-x-12 translate-x-1/3 pointer-events-none"></div>
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
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Vincennes</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-3xl mx-auto lg:mx-0">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Vincennes, avec une organisation adaptée aux appartements, maisons, bureaux et contraintes d'accès de l'est parisien.
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
                Votre déménagement à Vincennes
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Ville résidentielle recherchée pour sa qualité de vie aux portes de <span className="font-bold text-slate-700">Paris 12e</span> et <span className="font-bold text-slate-700">Paris 20e</span>, Vincennes propose un paysage urbain entre élégance et dynamisme. Marne Transdem assure vos transferts depuis ou vers les secteurs proches comme <span className="font-bold text-slate-700">Saint-Mandé</span>, <span className="font-bold text-slate-700">Montreuil</span> ou <span className="font-bold text-slate-700">Fontenay-sous-Bois</span>.
                </p>
                <p>
                  Qu'il s'agisse d'<span className="font-bold text-slate-700">appartements</span> de caractère, de <span className="font-bold text-slate-700">maisons</span>, de <span className="font-bold text-slate-700">résidences</span> familiales ou de <span className="font-bold text-slate-700">bureaux</span> et cabinets de <span className="font-bold text-slate-700">professions libérales</span>, nous maîtrisons les contraintes d'accès locales. De l'estimation du <span className="font-bold text-slate-700">volume</span> à la gestion rigoureuse du <span className="font-bold text-slate-700">stationnement</span>, nous élaborons une <span className="font-bold text-slate-700">demande de devis</span> sur mesure pour votre projet vincennois.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src="https://images.unsplash.com/photo-1596720510619-3333e9d8e578?auto=format&fit=crop&q=80&w=800" 
                  alt="Vincennes Immobilier" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Vincennes demande une bonne préparation */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Une préparation rigoureuse à Vincennes</h2>
            <p className="text-slate-500 text-lg font-light italic">Anticiper les contraintes de l'est parisien pour un déménagement sans stress.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Accès & Étages", d: "Gestion des immeubles anciens avec ascenseurs limités ou escaliers étroits." },
              { t: "Protection des Biens", d: "Emballage soigné pour les appartements familiaux riches en mobilier et objets fragiles." },
              { t: "Logistique Urbaine", d: "Anticipation des zones de stationnement et des halls de résidences." },
              { t: "Volumes & Caves", d: "Prise en compte des espaces de stockage, caves et parkings souterrains." },
              { t: "Solution Monte-meuble", d: "Évaluation de la faisabilité technique selon la configuration de votre fenêtre." },
              { t: "Mobilier Volumineux", d: "Organisation spécifique pour les pièces imposantes ne passant pas par les accès classiques." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:border-accent transition-colors">
                <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={20} />
                  {item.t}
                </h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed font-light">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Vincennes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Nos services à Vincennes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Particuliers", d: "Appartements, maisons et logements familiaux.", l: "/demenagement-particuliers-paris" },
              { t: "Entreprises", d: "Bureaux, cabinets, commerces et agences.", l: "/demenagement-entreprises-paris" },
              { t: "Garde-meuble", d: "Stockage temporaire lors d'une transition.", l: "/garde-meuble-paris" },
              { t: "Monte-meuble", d: "Solution à envisager selon les accès difficiles.", l: "/location-monte-meuble-paris" },
              { t: "Emballage", d: "Protection des meubles et objets précieux.", l: "/emballage-protection-demenagement" },
              { t: "Cartons", d: "Tout le matériel nécessaire à votre préparation.", l: "/cartons-demenagement-paris" },
              { t: "Formules", d: "3 niveaux de prestations : Éco, Standard, Luxe.", l: "/formules-demenagement" },
              { t: "Calculateur", d: "Estimation indicative de votre volume global.", l: "/calculateur-volume" }
            ].map((s, i) => (
              <Link key={i} to={s.l} className="group bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-brand-900 mb-3 group-hover:text-accent transition-colors">{s.t}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">{s.d}</p>
                </div>
                <div className="mt-6 text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  Découvrir <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Vincennes */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(238,131,23,0.05),transparent)] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black leading-tight">Déménagement de particuliers à Vincennes</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light italic leading-relaxed">
                <p>
                  Marne Transdem accompagne les familles vincennoises dans tous leurs projets de vie : du studio d'étudiant à la maison bourgeoise. Nous expertly gérons les transferts <span className="text-white font-medium">Vincennes vers Paris</span> ou inversement, ainsi que vers toute l'Île-de-France et la Province.
                </p>
                <p>
                  De la préparation des cartons à la protection de vos meubles les plus précieux, nous adaptons la <span className="text-white font-medium">formule</span> à vos besoins et à votre <span className="text-white font-medium">volume</span> de déménagement.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-accent text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-white transition-all">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Appartement Vincennes" />
              </div>
              <div className="aspect-square rounded-[3rem] overflow-hidden mt-12 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Déménagement Famille" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Vincennes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-accent/20 rounded-[4rem] blur-2xl -z-10 rotate-6"></div>
                <div className="bg-white p-4 rounded-[3rem] shadow-2xl border border-slate-100">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" className="rounded-[2.5rem] w-full" alt="Bureaux Vincennes" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900">Déménagement d'entreprises à Vincennes</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed">
                <p>
                  Vincennes accueille de nombreux sièges sociaux, ateliers et cabinets de <span className="font-bold text-slate-700">professions libérales</span>. Marne Transdem organise votre <span className="font-bold text-slate-700">transfert professionnel</span> avec une précision logistique permettant la continuité de votre activité.
                </p>
                <p>
                  Mobilier de bureau, archives ou matériel informatique : nous gérons la manutention et le transport avec une organisation millimétrée entre Vincennes, Paris et l'est francilien.
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
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900">Formules adaptées à votre projet</h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "Économique", desc: "Manutention et transport : vous préparez vos cartons, nous gérons le chargement et la livraison." },
             { name: "Standard", desc: "L'option équilibrée : nous emballons vos objets fragiles et protégeons votre mobilier." },
             { name: "Luxe", desc: "Délégation complète : nous gérons l'intégralité de l'emballage et de l'organisation pour vous." }
           ].map((formule, i) => (
             <div key={i} className={`bg-white p-10 rounded-[2.5rem] border ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
               <h3 className="text-2xl font-black text-brand-900 mb-6">{formule.name}</h3>
               <p className="text-slate-500 font-light text-sm italic leading-relaxed mb-8">{formule.desc}</p>
               <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest hover:underline">Détails de l'offre</Link>
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
          <div className="bg-brand-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-black">Volume, accès et monte-meuble à Vincennes</h2>
                <p className="text-slate-400 font-light text-lg italic leading-relaxed">
                  L'accès urbain à Vincennes (immeubles récents ou anciens, cours intérieures, halls) nécessite une évaluation technique préalable. 
                </p>
                <ul className="space-y-4">
                  {["Volume à déménager", "Étages & Ascenseurs", "Largeur des accès", "Stationnement réservé"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300">
                      <Zap className="text-accent" size={18} />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-xs">
                  En savoir plus sur le monte-meuble <ArrowRight size={14} />
                </Link>
              </div>
              <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-sm">
                <p className="text-slate-400 font-light leading-relaxed italic mb-8">
                  Certains déménagements nécessitent l'utilisation d'un monte-meuble pour les pièces volumineuses ou les accès complexes. Cette option est soumise à une étude de faisabilité technique sur place.
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-brand-900">
                    <Truck size={32} />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-accent font-black mb-1">Expertise locale</span>
                    <span className="text-sm font-bold">Logistique Vincennes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">Estimez le volume de votre déménagement</h2>
            <p className="text-slate-500 text-lg font-light italic leading-relaxed">
              Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux. Cette évaluation reste indicative et pourra être affinée selon les caractéristiques de votre projet.
            </p>
            <Link to="/calculateur-volume" className="inline-flex items-center gap-3 bg-accent text-brand-900 px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group">
              <Calculator size={24} />
              Utiliser le calculateur de volume
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Notre méthode en 4 étapes</h2>
            <p className="text-slate-400 mt-4 font-light italic">Une organisation claire pour un déménagement à Vincennes maîtrisé.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
             <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-slate-100 -z-10"></div>
             {[
               { i: ClipboardCheck, t: "Analyse de votre projet", d: "Premier échange pour comprendre vos besoins." },
               { i: Ruler, t: "Évaluation volume & accès", d: "Visite ou estimation précise de la logistique." },
               { i: Calendar, t: "Choix formule & planning", d: "Organisation du jour J selon vos contraintes." },
               { i: Truck, t: "Réalisation déménagement", d: "Transfert sécurisé de vos biens à Vincennes." }
             ].map((step, i) => (
               <div key={i} className="text-center space-y-6 group">
                 <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center mx-auto text-brand-900 group-hover:bg-accent transition-all duration-500 border border-slate-50">
                   <step.i size={32} />
                 </div>
                 <h4 className="font-bold text-brand-900">{i+1}. {step.t}</h4>
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
            <h2 className="text-2xl font-black text-brand-900 font-display">Autres secteurs proches</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center text-slate-500 mb-16">
            <Link to="/demenagement-paris-12" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 12e</Link>
            <Link to="/demenagement-paris-20" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 20e</Link>
            <Link to="/demenagement-saint-mande" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Saint-Mandé</Link>
            <Link to="/demenagement-montreuil" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Montreuil</Link>
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
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">Vous préparez un déménagement à Vincennes ?</h2>
           <p className="text-brand-900/70 text-lg mb-10 max-w-2xl mx-auto italic font-light">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl flex items-center justify-center gap-3 transition-all">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all">
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
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">FAQ Déménagement Vincennes</h2>
           </div>
           <div className="grid grid-cols-1 gap-6">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-accent/30 transition-all transition-colors">
                 <h4 className="text-lg font-bold text-brand-900 mb-4 flex items-center gap-4">
                   <HelpCircle className="text-accent shrink-0" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-2 border-accent/20 italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 14. Maillage interne final */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-colors">Demande de devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-colors">Calculateur de volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-colors">Formules de déménagement</Link>
            <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-colors">Déménagement particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-colors">Déménagement entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-colors">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-colors">Location monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-colors">Emballage et protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">Cartons et matériel</Link>
            <Link to="/contact" className="hover:text-accent transition-colors text-white">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalVincennes;
