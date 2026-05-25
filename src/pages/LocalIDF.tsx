import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Store, Briefcase, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalIDF: React.FC = () => {
  const path = "/demenagement-ile-de-france";
  
  const faqs = [
    { 
      q: "Marne Transdem intervient-elle dans toute l’Île-de-France ?", 
      a: "Marne Transdem accompagne les projets de déménagement à Paris et en Île-de-France selon les besoins, le volume, les accès et l’organisation du projet. L’entreprise intervient auprès des particuliers et des entreprises pour des déménagements locaux, régionaux ou longue distance selon les cas." 
    },
    { 
      q: "Comment organiser un déménagement en Île-de-France ?", 
      a: "Il faut anticiper le volume à transporter, les accès aux deux adresses, les étages, les ascenseurs, le stationnement, les cartons, les meubles volumineux et la formule souhaitée. Le calculateur de volume peut aider à préparer une première estimation avant la demande de devis." 
    },
    { 
      q: "Proposez-vous des déménagements entre Paris et la banlieue ?", 
      a: "Oui, Marne Transdem accompagne les déménagements entre Paris et les villes d’Île-de-France, dans les deux sens, selon les besoins du projet et les contraintes d’accès." 
    },
    { 
      q: "Peut-on demander un monte-meuble en Île-de-France ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement en Île-de-France ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement en Île-de-France ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la distance, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Île-de-France | Marne Transdem"
        description="Préparez votre déménagement en Île-de-France avec Marne Transdem. Services pour particuliers et entreprises, Paris, petite couronne, grande couronne, formules adaptées et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Île-de-France", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Globe size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement régional</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Île-de-France</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Paris, en petite couronne, en grande couronne et vers d'autres destinations selon les besoins du projet.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all">
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction régionale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Votre déménagement <br/><span className="text-accent italic">en Île-de-France</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Marne Transdem accompagne les projets de déménagement en <span className="font-bold text-slate-700">Île-de-France</span> pour les particuliers et les entreprises. Basée à <span className="font-bold text-slate-700">Paris</span>, notre expertise s'étend de la <span className="font-bold text-slate-700">petite couronne</span> à la <span className="font-bold text-slate-700">grande couronne</span>.
                </p>
                <p>
                  Qu'il s'agisse d'<span className="font-bold text-slate-700">appartements</span>, de <span className="font-bold text-slate-700">maisons</span>, de <span className="font-bold text-slate-700">logements familiaux</span> ou de transferts de <span className="font-bold text-slate-700 font-bold">bureaux</span>, <span className="font-bold text-slate-700">commerces</span> et <span className="font-bold text-slate-700">locaux professionnels</span>, nous maîtrisons les contraintes de la région capitale. De l'estimation du <span className="font-bold text-slate-700">volume</span> à la gestion des <span className="font-bold text-slate-700 text-slate-700">accès</span> (étages, ascenseurs, stationnement), nous vous proposons une <span className="font-bold text-slate-700">demande de devis</span> sur mesure pour votre projet.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src="/images/demenagement-ile-de-france.webp" 
                  width="600"
                  height="600"
                  alt="Déménagement Île-de-France Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement en Île-de-France demande une bonne organisation */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Une organisation maîtrisée</h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto">
              Les contraintes de déménagement varient considérablement selon votre localisation en région parisienne.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { icon: Building2, t: "Milieu Urbain & Parisien", d: "Gestion des appartements parisiens avec accès étroits, étages sans ascenseur et stationnement contraint." },
               { icon: Home, t: "Maisons & Pavillons", d: "Logistique adaptée aux volumes plus importants des maisons en banlieue (grande couronne)." },
               { icon: Truck, t: "Logistique & Matériel", d: "Besoin éventuel de monte-meuble selon la configuration ou de stockage temporaire (garde-meuble)." },
               { icon: Package, t: "Protection & Cartons", d: "Préparation rigoureuse et protection des biens fragiles pour garantir l'intégrité de vos effets." },
               { icon: MapPin, t: "Distance & Trajet", d: "Optimisation de l'itinéraire entre les adresses pour réduire le temps de transport en Île-de-France." },
               { icon: Ruler, t: "Estimation Volume", d: "Une étude précise du volume à déménager pour adapter la taille du camion et l'équipe nécessaire." }
             ].map((item, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-accent transition-all group">
                 <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform" size={40} />
                 <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight">{item.t}</h3>
                 <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement en Île-de-France */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Nos services en Île-de-France</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Particuliers", d: "Appartements, maisons, studios et résidences.", l: "/demenagement-particuliers-paris" },
              { t: "Entreprises", d: "Organisation des transferts de bureaux et commerces.", l: "/demenagement-entreprises-paris" },
              { t: "Garde-meuble", d: "Solution utile pendant une transition ou des travaux.", l: "/garde-meuble-paris" },
              { t: "Monte-meuble", d: "Solution pour meubles volumineux ou accès difficiles.", l: "/location-monte-meuble-paris" },
              { t: "Emballage", d: "Protection des meubles et objets fragiles.", l: "/emballage-protection-demenagement" },
              { t: "Cartons", d: "Matériel professionnel pour préparer vos biens.", l: "/cartons-demenagement-paris" },
              { t: "Formules", d: "Économique, Standard et Luxe selon vos besoins.", l: "/formules-demenagement" },
              { t: "Calculateur", d: "Estimation indicative du volume de mobilier.", l: "/calculateur-volume" }
            ].map((s, i) => (
              <Link key={i} to={s.l} className="group bg-brand-900 p-8 rounded-[2rem] border border-white/5 hover:bg-brand-hover hover:shadow-2xl transition-all flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-accent mb-3 group-hover:text-white transition-colors">{s.t}</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed italic">{s.d}</p>
                </div>
                <div className="mt-8 text-white/40 group-hover:text-accent flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
                  Découvrir <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers en Île-de-France */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                   <img src="/images/demenagement-appartement-92.jpg" alt="Déménagement Particulier IDF" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              </div>
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight">Déménagement de particuliers</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les particuliers pour leurs transferts d'<span className="font-bold text-slate-700">appartements</span>, <span className="font-bold text-slate-700">maisons</span>, <span className="font-bold text-slate-700">studios</span> et <span className="font-bold text-slate-700 text-slate-700">résidences</span>.
                </p>
                <p>
                  Nous organisons vos projets <span className="font-bold text-slate-700 italic">Paris vers banlieue</span>, <span className="font-bold text-slate-700 italic">banlieue vers Paris</span> ou entre deux villes d'Île-de-France. De la <span className="font-bold text-slate-700">protection des meubles</span> au choix de la <span className="font-bold text-slate-700">formule</span>, nous adaptons chaque étape à votre <span className="font-bold text-slate-700">volume</span> et vos accès.
                </p>
              </div>
              <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-brand-hover shadow-xl transition-all">
                Demander mon devis <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises en Île-de-France */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2">
               <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Déménagement Entreprise IDF" className="w-full h-full object-cover" />
               </div>
             </div>
             <div className="lg:w-1/2 space-y-8">
               <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight">Déménagement d'entreprises</h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                 <p>
                   Nous accompagnons les professionnels : <span className="font-bold text-slate-700">bureaux</span>, <span className="font-bold text-slate-700">commerces</span>, agences et <span className="font-bold text-slate-700">locaux professionnels</span> dans toute la région.
                 </p>
                 <p>
                   Manutention du <span className="font-bold text-slate-700">mobilier de bureau</span>, des <span className="font-bold text-slate-700">archives</span> et du matériel informatique avec un planning rigoureux pour garantir la <span className="font-bold text-slate-700">continuité de votre activité</span>. Stockage temporaire en garde-meuble possible si nécessaire.
                 </p>
               </div>
               <Link to="/contact" className="inline-flex items-center gap-3 border-2 border-brand-900 text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all">
                 Organiser un transfert professionnel <Briefcase size={20} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Paris et arrondissements desservis */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 font-display tracking-tight uppercase">Déménagement à Paris <span className="text-accent underline decoration-accent/20 italic">et arrondissements</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { n: "Paris 20e", l: "/demenagement-paris-20" },
              { n: "Paris 19e", l: "/demenagement-paris-19" },
              { n: "Paris 18e", l: "/demenagement-paris-18" },
              { n: "Paris 17e", l: "/demenagement-paris-17" },
              { n: "Paris 16e", l: "/demenagement-paris-16" },
              { n: "Paris 15e", l: "/demenagement-paris-15" },
              { n: "Paris 14e", l: "/demenagement-paris-14" },
              { n: "Paris 13e", l: "/demenagement-paris-13" },
              { n: "Paris 12e", l: "/demenagement-paris-12" },
              { n: "Paris 11e", l: "/demenagement-paris-11" },
              { n: "Paris 10e", l: "/demenagement-paris-10" },
              { n: "Paris 9e", l: "/demenagement-paris-9" }
            ].map((area, i) => (
              <Link key={i} to={area.l} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-accent hover:shadow-lg transition-all text-center">
                 <span className="font-bold text-slate-700 text-sm group-hover:text-accent">{area.n}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Villes proches de Paris */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 font-display tracking-tight uppercase">Villes proches de Paris</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { n: "Montreuil", l: "/demenagement-montreuil" },
              { n: "Pantin", l: "/demenagement-pantin" },
              { n: "Les Lilas", l: "/demenagement-les-lilas" },
              { n: "Saint-Denis", l: "/demenagement-saint-denis" },
              { n: "Romainville", l: "/demenagement-romainville" },
              { n: "Noisy-le-Sec", l: "/demenagement-noisy-le-sec" },
              { n: "Bondy", l: "/demenagement-bondy" },
              { n: "Bobigny", l: "/demenagement-bobigny" },
              { n: "Saint-Ouen", l: "/demenagement-saint-ouen" },
              { n: "Argenteuil", l: "/demenagement-argenteuil" },
              { n: "Cergy", l: "/demenagement-cergy" },
              { n: "Pontoise", l: "/demenagement-pontoise" },
              { n: "Saint-Gratien", l: "/demenagement-saint-gratien" },
              { n: "Enghien-les-Bains", l: "/demenagement-enghien-les-bains" },
              { n: "Montmorency", l: "/demenagement-montmorency" },
              { n: "Franconville", l: "/demenagement-franconville" },
              { n: "Vincennes", l: "/demenagement-vincennes" },
              { n: "Saint-Mandé", l: "/demenagement-saint-mande" },
              { n: "Bagnolet", l: "/demenagement-bagnolet" },
              { n: "Boulogne-Billancourt", l: "/demenagement-boulogne-billancourt" },
              { n: "Neuilly-sur-Seine", l: "/demenagement-neuilly-sur-seine" },
              { n: "Levallois-Perret", l: "/demenagement-levallois-perret" },
              { n: "Clichy", l: "/demenagement-clichy" },
              { n: "Courbevoie", l: "/demenagement-courbevoie" },
              { n: "Puteaux", l: "/demenagement-puteaux" },
              { n: "Nanterre", l: "/demenagement-nanterre" },
              { n: "Suresnes", l: "/demenagement-suresnes" },
              { n: "Rueil-Malmaison", l: "/demenagement-rueil-malmaison" },
              { n: "Saint-Cloud", l: "/demenagement-saint-cloud" },
              { n: "Meudon", l: "/demenagement-meudon" },
              { n: "Clamart", l: "/demenagement-clamart" },
              { n: "Montrouge", l: "/demenagement-montrouge" },
              { n: "Bagneux", l: "/demenagement-bagneux" },
              { n: "Fontenay-aux-Roses", l: "/demenagement-fontenay-aux-roses" },
              { n: "Sceaux", l: "/demenagement-sceaux" },
              { n: "Bourg-la-Reine", l: "/demenagement-bourg-la-reine" },
              { n: "Antony", l: "/demenagement-antony" },
              { n: "Châtenay-Malabry", l: "/demenagement-chatenay-malabry" },
              { n: "Le Plessis-Robinson", l: "/demenagement-le-plessis-robinson" },
              { n: "Vélizy-Villacoublay", l: "/demenagement-velizy-villacoublay" },
              { n: "Viroflay", l: "/demenagement-viroflay" },
              { n: "Vaucresson", l: "/demenagement-vaucresson" },
              { n: "Chaville", l: "/demenagement-chaville" },
              { n: "Ville-d’Avray", l: "/demenagement-ville-d-avray" },
              { n: "Versailles", l: "/demenagement-versailles" },
              { n: "Garches", l: "/demenagement-garches" },
              { n: "Marnes-la-Coquette", l: "/demenagement-marnes-la-coquette" },
              { n: "Le Chesnay-Rocquencourt", l: "/demenagement-le-chesnay-rocquencourt" },
              { n: "La Celle-Saint-Cloud", l: "/demenagement-la-celle-saint-cloud" },
              { n: "Châtillon", l: "/demenagement-chatillon" },
              { n: "Malakoff", l: "/demenagement-malakoff" },
              { n: "Sèvres", l: "/demenagement-sevres" },
              { n: "Vanves", l: "/demenagement-vanves" },
              { n: "Issy-les-Moulineaux", l: "/demenagement-issy-les-moulineaux" }
            ].map((city, i) => (
              city.l !== "#" ? (
                <Link key={i} to={city.l} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:border-accent hover:shadow-lg transition-all text-center">
                   <span className="font-bold text-slate-700 text-sm italic">{city.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-center opacity-75">
                   <span className="font-light text-slate-400 text-sm italic">{city.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 9. Départements d'Île-de-France */}
      <section className="py-24 bg-brand-900 text-white font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase italic">Départements d'Île-de-France</h2>
            <p className="text-slate-400 font-light italic">Nous intervenons sur l'ensemble du territoire francilien.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "Paris", d: "Déménagements d'appartements, studios, bureaux et commerces avec une attention particulière aux accès urbains." },
              { n: "Hauts-de-Seine", d: "Déménagements de particuliers et d'entreprises dans les villes résidentielles et professionnelles de l'ouest." },
              { n: "Seine-Saint-Denis", d: "Transferts dans les villes proches de Paris pour appartements, maisons, bureaux et locaux professionnels." },
              { n: "Val-de-Marne", d: "Déménagements entre Paris, les communes du sud-est, les logements familiaux et zones d'activités." },
              { n: "Yvelines", d: "Déménagements vers ou depuis les villes résidentielles de grande couronne, avec des volumes souvent plus importants." },
              { n: "Val-d'Oise", d: "Accompagnement des projets en grande couronne selon les besoins, les accès et la logistique souhaitée." },
              { n: "Essonne", d: "Déménagements de logements, maisons et locaux professionnels selon les contraintes de distance régionale." },
              { n: "Seine-et-Marne", d: "Déménagements longue distance régionale ou grande couronne selon le volume et l'organisation choisie." }
            ].map((dept, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:border-accent transition-all">
                <h3 className="text-xl font-bold text-accent mb-4 border-l-4 border-accent pl-4">{dept.n}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed italic">{dept.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Formules adaptées */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Nos formules de déménagement</h2>
          <p className="text-slate-500 mt-4 italic font-light">Trouvez le niveau d’accompagnement idéal pour votre projet en Île-de-France.</p>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { n: "Économique", d: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport." },
            { n: "Standard", d: "Une formule équilibrée : nous gérons les objets fragiles et le mobilier encombrant." },
            { n: "Luxe", d: "Délégation complète de la préparation, de l'emballage et de l'organisation pour une transition sereine." }
          ].map((f, i) => (
            <div key={i} className={`bg-white p-12 rounded-[3rem] border shadow-sm flex flex-col justify-between ${i === 1 ? 'border-accent shadow-xl scale-105 z-10' : 'border-slate-200'}`}>
              <div>
                <h3 className="text-2xl font-black text-brand-900 mb-6">{f.n}</h3>
                <p className="text-slate-500 text-sm font-light italic leading-relaxed mb-10">{f.d}</p>
              </div>
              <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest hover:underline decoration-white/20">Voir la formule</Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link to="/formules-demenagement" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
            Comparer les formules
          </Link>
        </div>
      </section>

      {/* 11. Volume, accès, stationnement et monte-meuble */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                 <h2 className="text-3xl md:text-5xl font-black leading-tight border-l-4 border-accent pl-8 tracking-tight italic">Volume, accès et logistique <br/><span className="text-accent italic">en Île-de-France</span></h2>
                 <p className="text-slate-400 font-light text-lg leading-relaxed italic">
                    Chaque déménagement est unique et nécessite une étude attentive des accès pour adapter les moyens techniques et humains.
                 </p>
                 <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/10">
                   {["Volume à déménager", "Nombre d'étages", "Gestion d'ascenseur", "Hall d'immeuble", "Maison / Cour", "Cave / Parking"].map((check, i) => (
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
               <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md italic font-light text-slate-300 text-sm leading-relaxed">
                  <p className="mb-6">
                    L'utilisation d'un monte-meuble peut être envisagée lorsque les meubles ne passent pas par les accès classiques (escalier, ascenseur). Sa mise en place dépend de la configuration technique et de la faisabilité sur site.
                  </p>
                  <div className="flex items-center gap-4 text-accent font-black uppercase text-[10px] tracking-widest">
                    <Truck size={24} />
                    Expertise régionale IDF
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 12. Calculateur de volume */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight italic">Estimez le volume de votre mobilier</h2>
          <p className="text-slate-500 text-lg font-light italic leading-relaxed">
             Avant de demander un devis, utilisez notre calculateur de volume. Cette estimation indicative pourra être affinée selon les accès et la distance de votre trajet.
          </p>
          <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group">
            <Calculator size={24} className="text-accent" />
            Accéder au calculateur de volume
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 13. Déménagement depuis l’Île-de-France vers la France */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="aspect-[16/9] bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white p-2">
                   <img src="/images/demenagement-longue-distance-camion.jpg" alt="Déménagement longue distance" className="w-full h-full object-cover rounded-[2rem] grayscale-[30%]" />
                </div>
                <div className="absolute top-4 right-4 bg-brand-900 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                   <Globe size={14} className="text-accent" /> Longue Distance
                </div>
             </div>
             <div className="order-1 lg:order-2 space-y-10">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight italic">Déménager <br/><span className="text-accent underline decoration-accent/20 italic">depuis l'Île-de-France</span></h2>
               <div className="space-y-6 text-slate-500 text-lg font-light italic leading-relaxed">
                 <p>
                   Marne Transdem accompagne des projets de déménagement depuis Paris ou l'Île-de-France vers d'autres destinations en France selon les besoins spécifiques du projet.
                 </p>
                 <p>
                   De l'<span className="font-bold text-slate-700">organisation longue distance</span> au choix de la <span className="font-bold text-slate-700">formule</span>, nous assurons la protection de vos biens lors du trajet. Estimation personnalisée après étude du volume et des accès au départ et à l'arrivée.
                 </p>
               </div>
               <div className="flex flex-wrap gap-4 text-xs font-display font-medium text-slate-400">
                  <span>vers Lyon</span> <span>vers Marseille</span> <span>vers Bordeaux</span> <span>vers Nice</span> <span>vers Toulouse</span> <span>vers Nantes</span>
               </div>
               <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-xl">
                 Préparer un déménagement longue distance <ArrowRight size={18} />
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* 14. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight uppercase">Notre méthode en <span className="text-accent underline decoration-accent/20 italic">4 étapes</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 relative">
             <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-slate-200 -z-10"></div>
             {[
               { icon: ClipboardCheck, t: "Analyse de votre projet", d: "Premier échange pour comprendre vos besoins." },
               { icon: Ruler, t: "Évaluation volume & accès", d: "Estimation sur place ou à distance de la logistique." },
               { icon: Calendar, t: "Choix formule & planning", d: "Organisation du planning et choix des options." },
               { icon: Truck, t: "Réalisation déménagement", d: "Transfert sécurisé de vos biens en Île-de-France." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs">{i+1}</div>
                 </div>
                 <div>
                    <h4 className="font-bold text-brand-900 mb-3">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider px-4 leading-relaxed italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
          <p className="mt-20 text-slate-400 text-sm font-light italic max-w-3xl mx-auto">
             Une méthode claire pour préparer votre déménagement en Île-de-France, adapter les moyens nécessaires et choisir le niveau d’accompagnement correspondant à votre situation.
          </p>
        </div>
      </section>

      {/* 15. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display tracking-tight uppercase">Vous préparez un déménagement en Île-de-France ?</h2>
           <p className="text-brand-900/70 text-lg mb-10 max-w-2xl mx-auto italic font-light leading-relaxed">
              Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès, votre distance et le niveau d'accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px]">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px]">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
      </section>

      {/* 16. FAQ locale régionale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display uppercase italic tracking-tight">FAQ Déménagement <br/><span className="text-accent underline decoration-accent/20 italic tracking-tight uppercase underline-offset-8">Île-de-France</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 italic tracking-tight">
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

      {/* 17. Maillage interne final */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all">Demande de devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all">Calculateur volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all">Formules de déménagement</Link>
            <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-all">Déménagement particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all">Déménagement entreprises</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pt-8 pb-8 border-b border-white/5">
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-all">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-all">Location monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-all">Emballage et protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-all">Cartons et matériel</Link>
            <Link to="/contact" className="hover:text-accent transition-all">Contact</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 italic pt-8">
            <Link to="/demenagement-paris-20" className="hover:text-accent transition-all">Paris 20e</Link>
            <Link to="/demenagement-montreuil" className="hover:text-accent transition-all">Montreuil</Link>
            <Link to="/demenagement-pantin" className="hover:text-accent transition-all">Pantin</Link>
            <Link to="/demenagement-les-lilas" className="hover:text-accent transition-all">Les Lilas</Link>
            <Link to="/demenagement-saint-denis" className="hover:text-accent transition-all">Saint-Denis</Link>
            <Link to="/demenagement-romainville" className="hover:text-accent transition-all">Romainville</Link>
            <Link to="/demenagement-noisy-le-sec" className="hover:text-accent transition-all">Noisy-le-Sec</Link>
            <Link to="/demenagement-bondy" className="hover:text-accent transition-all">Bondy</Link>
            <Link to="/demenagement-bobigny" className="hover:text-accent transition-all">Bobigny</Link>
            <Link to="/demenagement-saint-ouen" className="hover:text-accent transition-all">Saint-Ouen</Link>
            <Link to="/demenagement-argenteuil" className="hover:text-accent transition-all">Argenteuil</Link>
            <Link to="/demenagement-cergy" className="hover:text-accent transition-all">Cergy</Link>
            <Link to="/demenagement-pontoise" className="hover:text-accent transition-all">Pontoise</Link>
            <Link to="/demenagement-saint-gratien" className="hover:text-accent transition-all">Saint-Gratien</Link>
            <Link to="/demenagement-enghien-les-bains" className="hover:text-accent transition-all">Enghien-les-Bains</Link>
            <Link to="/demenagement-montmorency" className="hover:text-accent transition-all">Montmorency</Link>
            <Link to="/demenagement-franconville" className="hover:text-accent transition-all">Franconville</Link>
            <Link to="/demenagement-aulnay-sous-bois" className="hover:text-accent transition-all">Aulnay-sous-Bois</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all">Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent transition-all">Saint-Mandé</Link>
            <Link to="/demenagement-bagnolet" className="hover:text-accent transition-all">Bagnolet</Link>
            <Link to="/demenagement-saint-cloud" className="hover:text-accent transition-all">Saint-Cloud</Link>
            <Link to="/demenagement-meudon" className="hover:text-accent transition-all">Meudon</Link>
            <Link to="/demenagement-clamart" className="hover:text-accent transition-all">Clamart</Link>
            <Link to="/demenagement-sevres" className="hover:text-accent transition-all">Sèvres</Link>
            <Link to="/demenagement-vanves" className="hover:text-accent transition-all">Vanves</Link>
            <Link to="/demenagement-chatillon" className="hover:text-accent transition-all">Châtillon</Link>
            <Link to="/demenagement-malakoff" className="hover:text-accent transition-all">Malakoff</Link>
            <Link to="/demenagement-montrouge" className="hover:text-accent transition-all">Montrouge</Link>
            <Link to="/demenagement-bagneux" className="hover:text-accent transition-all">Bagneux</Link>
            <Link to="/demenagement-fontenay-aux-roses" className="hover:text-accent transition-all">Fontenay</Link>
            <Link to="/demenagement-sceaux" className="hover:text-accent transition-all">Sceaux</Link>
            <Link to="/demenagement-bourg-la-reine" className="hover:text-accent transition-all">Bourg-la-Reine</Link>
            <Link to="/demenagement-antony" className="hover:text-accent transition-all">Antony</Link>
            <Link to="/demenagement-chatenay-malabry" className="hover:text-accent transition-all">Châtenay</Link>
            <Link to="/demenagement-le-plessis-robinson" className="hover:text-accent transition-all">Le Plessis</Link>
            <Link to="/demenagement-velizy-villacoublay" className="hover:text-accent transition-all">Vélizy</Link>
            <Link to="/demenagement-viroflay" className="hover:text-accent transition-all">Viroflay</Link>
            <Link to="/demenagement-chaville" className="hover:text-accent transition-all">Chaville</Link>
            <Link to="/demenagement-vaucresson" className="hover:text-accent transition-all">Vaucresson</Link>
            <Link to="/demenagement-le-chesnay-rocquencourt" className="hover:text-accent transition-all italic">Le Chesnay</Link>
            <Link to="/demenagement-la-celle-saint-cloud" className="hover:text-accent transition-all italic">La Celle-Saint-Cloud</Link>
            <Link to="/demenagement-garches" className="hover:text-accent transition-all">Garches</Link>
            <Link to="/demenagement-marnes-la-coquette" className="hover:text-accent transition-all italic underline decoration-accent/30 font-bold">Marnes-la-Coquette</Link>
            <Link to="/demenagement-bougival" className="hover:text-accent transition-all italic">Bougival</Link>
            <Link to="/demenagement-chatou" className="hover:text-accent transition-all italic">Chatou</Link>
            <Link to="/demenagement-le-vesinet" className="hover:text-accent transition-all italic">Le Vésinet</Link>
            <Link to="/demenagement-le-pecq" className="hover:text-accent transition-all italic">Le Pecq</Link>
            <Link to="/demenagement-saint-germain-en-laye" className="hover:text-accent transition-all italic">Saint-Germain</Link>
            <Link to="/demenagement-poissy" className="hover:text-accent transition-all italic">Poissy</Link>
            <Link to="/demenagement-sartrouville" className="hover:text-accent transition-all italic">Sartrouville</Link>
            <Link to="/demenagement-rambouillet" className="hover:text-accent transition-all italic">Rambouillet</Link>
            <Link to="/demenagement-mantes-la-jolie" className="hover:text-accent transition-all italic">Mantes-la-Jolie</Link>
            <Link to="/demenagement-plaisir" className="hover:text-accent transition-all italic">Plaisir</Link>
            <Link to="/demenagement-guyancourt" className="hover:text-accent transition-all italic">Guyancourt</Link>
            <Link to="/demenagement-maisons-laffitte" className="hover:text-accent transition-all italic">Maisons-Laffitte</Link>
            <Link to="/demenagement-houilles" className="hover:text-accent transition-all italic">Houilles</Link>
            <Link to="/demenagement-conflans-sainte-honorine" className="hover:text-accent transition-all italic underline decoration-accent/20">Conflans-Sainte-Honorine</Link>
            <Link to="/demenagement-louveciennes" className="hover:text-accent transition-all italic">Louveciennes</Link>
            <Link to="/demenagement-ville-d-avray" className="hover:text-accent transition-all italic">Ville-d’Avray</Link>
            <Link to="/demenagement-versailles" className="hover:text-accent transition-all">Versailles</Link>
            <Link to="/demenagement-issy-les-moulineaux" className="hover:text-accent transition-all">Issy</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-all">Nogent-sur-Marne</Link>
            <Link to="/demenagement-hauts-de-seine" className="hover:text-accent transition-all">Hauts-de-Seine</Link>
            <Link to="/demenagement-seine-saint-denis" className="hover:text-accent transition-all">Seine-Saint-Denis</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all">Val-de-Marne</Link>
            <Link to="/demenagement-yvelines" className="hover:text-accent transition-all">Yvelines</Link>
            <Link to="/demenagement-essonne" className="hover:text-accent transition-all">Essonne</Link>
            <Link to="/demenagement-val-d-oise" className="hover:text-accent transition-all">Val-d'Oise</Link>
            <Link to="/demenagement-seine-et-marne" className="hover:text-accent transition-all">Seine-et-Marne</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all">Longue Distance</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalIDF;
