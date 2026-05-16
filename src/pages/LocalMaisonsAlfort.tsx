import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Waves, Home, Globe, Briefcase, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalMaisonsAlfort: React.FC = () => {
  const path = "/demenagement-maisons-alfort";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Maisons-Alfort ?", 
      a: "Un déménagement à Maisons-Alfort demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Selon qu’il s’agit d’un appartement, d’une résidence, d’une maison ou d’un local professionnel, il est important d’évaluer les caves, garages, parkings, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité." 
    },
    { 
      q: "Marne Transdem intervient-elle à Maisons-Alfort et dans les villes proches ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Maisons-Alfort et dans les secteurs proches comme Charenton-le-Pont, Saint-Maurice, Alfortville, Créteil, Saint-Maur-des-Fossés, Joinville-le-Pont, Ivry-sur-Seine, Vitry-sur-Seine, Vincennes, Paris 12e, Paris 13e et plus largement en Île-de-France selon les besoins du projet." 
    },
    { 
      q: "Peut-on organiser un déménagement de Paris vers Maisons-Alfort ?", 
      a: "Oui, Marne Transdem peut accompagner un déménagement depuis Paris ou l’Île-de-France vers Maisons-Alfort selon le volume, les adresses, les accès, les étages, le niveau d’emballage souhaité et les contraintes du projet. Une étude personnalisée permet d’adapter l’organisation et les moyens nécessaires." 
    },
    { 
      q: "Marne Transdem peut-elle déménager des bureaux ou locaux professionnels à Maisons-Alfort ?", 
      a: "Oui, Marne Transdem accompagne les transferts de bureaux, cabinets, agences, commerces et locaux professionnels à Maisons-Alfort. L’organisation tient compte du mobilier professionnel, des archives, du matériel informatique, des cartons professionnels, des étages, des ascenseurs, des accès et du besoin éventuel de stockage temporaire." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Maisons-Alfort ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de l’étage, de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Maisons-Alfort ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, le stationnement, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const nearbySectors = [
    { n: "Charenton-le-Pont", l: "/demenagement-charenton-le-pont" },
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur" },
    { n: "Créteil", l: "/demenagement-creteil" },
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Saint-Maurice", l: null },
    { n: "Alfortville", l: null },
    { n: "Joinville-le-Pont", l: null },
    { n: "Ivry-sur-Seine", l: null },
    { n: "Vitry-sur-Seine", l: null }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Maisons-Alfort | Marne Transdem"
        description="Préparez votre déménagement à Maisons-Alfort avec Marne Transdem. Déménagements de résidences, appartements, maisons et bureaux avec attention aux accès, étages, monte-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Maisons-Alfort", item: path }
          ])
        ]}
      />

      {/* 1. Hero Content */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white font-sans">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <MapPin size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement local</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Maisons-Alfort</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Maisons-Alfort, avec une organisation adaptée aux résidences, appartements, maisons, bureaux, commerces, cabinets et locaux professionnels, en tenant compte des accès, des étages et des contraintes de stationnement.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm italic">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction locale */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">
                Votre déménagement <span className="text-accent italic">à Maisons-Alfort</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify">
                <p>
                  Ville résidentielle, familiale et dynamique du <span className="font-bold text-brand-900 italic tracking-tight uppercase">Val-de-Marne</span> et de l’est parisien, Maisons-Alfort bénéficie d’une situation privilégiée en <span className="font-bold text-slate-700">Île-de-France</span>. Proche de <span className="font-bold text-slate-700">Paris</span> (notamment les 12e et 13e arrondissements), de <span className="font-bold text-slate-700">Charenton-le-Pont</span>, <span className="font-bold text-slate-700">Saint-Maurice</span>, <span className="font-bold text-slate-700">Alfortville</span>, <span className="font-bold text-slate-700">Créteil</span>, <span className="font-bold text-slate-700">Saint-Maur-des-Fossés</span>, <span className="font-bold text-slate-700">Joinville-le-Pont</span>, <span className="font-bold text-slate-700">Ivry-sur-Seine</span>, <span className="font-bold text-slate-700">Vitry-sur-Seine</span> et <span className="font-bold text-slate-700">Vincennes</span>, elle offre des profils de logements variés.
                </p>
                <p>
                  Que vous emménagiez dans un studio, un appartement en résidence, une maison familiale ou que vous transfériez vos bureaux, cabinets professionnels, agences ou commerces, Marne Transdem vous propose des solutions sur mesure. Nous maîtrisons les contraintes locales : accès d’immeubles, ascenseurs, étages, escaliers, ainsi que la logistique liée au stationnement et à l’estimation du volume pour une demande de devis précise.
                </p>
              </div>
              <div className="pt-4">
                <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic">
                  Demander mon devis personnalisé
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-maisons-alfort-94.jpg" 
                  alt="Déménagement à Maisons-Alfort Marne Transdem" 
                  className="w-full h-full object-cover grayscale-[10%]"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi une préparation rigoureuse ? */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-4xl mx-auto text-center mb-16 italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic">Pourquoi une <span className="text-accent underline decoration-accent/20 italic tracking-tight">préparation rigoureuse</span> ?</h2>
             <p className="text-slate-500 text-lg font-light italic">
                Maisons-Alfort présente des contraintes logistiques variées qui demandent une étude attentive.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
             {[
               { icon: Building2, t: "Résidences & Appartements", d: "Gestion des étages, ascenseurs parfois limités, escaliers étroits et protection des halls et parties communes." },
               { icon: Home, t: "Maisons & Pavillons", d: "Analyse des accès garage, cave, jardin, portail, allée ou cour pour un chargement efficace." },
               { icon: Truck, t: "Stationnement & Rue", d: "Anticipation du stationnement dans les rues résidentielles ou fréquentées pour assurer la manutention." },
               { icon: Package, t: "Protection & Fragiles", d: "Emballage expert de la vaisselle, livres, tableaux, mobilier familial et objets de valeur." },
               { icon: Briefcase, t: "Bureaux & Commerces", d: "Organisation méticuleuse pour les transferts professionnels : mobilier, archives et matériel informatique." },
               { icon: Ruler, t: "Monte-Meuble", d: "Solution à envisager pour les meubles volumineux selon la configuration de la rue et l'étage." }
             ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-accent transition-all group italic">
                  <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform grayscale-[10%]" size={40} />
                  <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">{item.t}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed italic">{item.d}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Nos Services à Maisons-Alfort */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-20 italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic underline decoration-accent/20 underline-offset-8">Nos Services de <span className="text-accent italic tracking-tight">Déménagement</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-2xl mx-auto italic">
              Des solutions complètes pour tous vos besoins de mobilité à Maisons-Alfort.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 italic">
             {[
               { t: "Particuliers", d: "Appartements, studios, résidences, maisons et logements familiaux.", l: "/demenagement-particuliers-paris" },
               { t: "Entreprises", d: "Bureaux, commerces, cabinets, agences et locaux professionnels.", l: "/demenagement-entreprises-paris" },
               { t: "Garde-Meuble", d: "Solution utile pendant une transition, des travaux ou un décalage.", l: "/garde-meuble-paris" },
               { t: "Monte-Meuble", d: "Solution selon les étages, accès et faisabilité technique.", l: "/location-monte-meuble-paris" },
               { t: "Emballage", d: "Protection des meubles, objets fragiles et effets personnels.", l: "/emballage-protection-demenagement" },
               { t: "Cartons", d: "Préparation du déménagement avec du matériel adapté.", l: "/cartons-demenagement-paris" },
               { t: "Formules", d: "Économique, Standard ou Luxe selon votre budget.", l: "/formules-demenagement" },
               { t: "Calculateur", d: "Estimation indicative du volume avant votre devis.", l: "/calculateur-volume" }
             ].map((service, i) => (
               <Link key={i} to={service.l} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group flex flex-col justify-between italic">
                 <div>
                   <h3 className="text-lg font-bold text-brand-900 mb-3 uppercase italic tracking-tight group-hover:text-accent transition-colors italic">{service.t}</h3>
                   <p className="text-slate-500 text-xs font-light leading-relaxed italic">{service.d}</p>
                 </div>
                 <div className="mt-6 flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest italic font-sans italic">
                   Voir le service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform italic" />
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement Particuliers */}
      <section className="py-24 bg-brand-900 text-white font-sans italic overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Déménagement <br/><span className="text-accent italic">de Particuliers</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les particuliers dans leurs changements de résidence à Maisons-Alfort. Nous organisons les déménagements d'appartements, studios, résidences et maisons familiales, que ce soit pour une installation locale, de Maisons-Alfort vers Paris, ou vers une autre ville d’Île-de-France.
                </p>
                <p>
                  Nous prenons en charge le tri, la préparation des cartons, la protection experte de vos meubles et effets personnels (vaisselle, livres, tableaux, miroirs). Notre équipe évalue les accès, les étages, les ascenseurs et les caves pour adapter la formule choisie à votre projet de mobilité.
                </p>
                <div className="pt-6">
                   <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all inline-flex items-center gap-3 italic">
                     Demander mon devis particulier
                     <ArrowRight size={22} />
                   </Link>
                </div>
              </div>
            </div>
            <div className="rounded-[3.5rem] overflow-hidden grayscale-[5%] shadow-2xl skew-y-1 italic">
               <img src="/images/demenagement-particulier-maisons-alfort.jpg" alt="Déménagement particuliers Maisons-Alfort" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none italic"></div>
      </section>

      {/* 6. Déménagement Résidencies */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-4xl mx-auto italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 text-center italic">Une organisation adaptée <span className="text-accent italic tracking-tight italic">aux résidences & étages</span></h2>
            <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 space-y-8 italic shadow-sm italic">
              <p className="text-slate-500 text-lg font-light leading-relaxed italic text-center italic">
                Les déménagements en immeuble collectif ou résidence à Maisons-Alfort nécessitent une coordination précise de l'équipe et une attention particulière aux parties communes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 italic">
                {[
                  "Protection des murs et sols des parties communes.",
                  "Gestion optimisée des ascenseurs et escaliers.",
                  "Anticipation du stationnement et des accès cave/parking.",
                  "Installation méthodique dans votre nouveau logement."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 italic font-sans">
                    <CheckCircle2 size={24} className="text-accent mt-1 shrink-0 italic" />
                    <span className="text-slate-600 font-medium italic">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center pt-8">
                <Link to="/demande-de-devis" className="inline-flex items-center gap-3 bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-800 transition-all italic">
                  Préparer mon déménagement en résidence
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Déménagement d'Entreprise */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic transition-all italic">
            <div className="rounded-[3rem] shadow-2xl overflow-hidden grayscale-[10%] italic">
               <img src="/images/transfert-bureau-maisons-alfort.jpg" alt="Déménagement d'entreprises Maisons-Alfort" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Transfert <span className="text-accent italic uppercase italic tracking-tight italic">Professionnel</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed italic italic">
                Marne Transdem accompagne les professionnels de Maisons-Alfort dans leurs transferts de bureaux, cabinets, agences et commerces. Nous gérons le mobilier professionnel, l'archivage, le matériel informatique et la planification logistique pour assurer la continuité de votre activité vers le Val-de-Marne ou l'est parisien.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 italic">
                <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all italic">Organiser un transfert pro</Link>
                <Link to="/garde-meuble-paris" className="bg-white text-brand-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic">Stockage temporaire</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Arrivée de Paris vers Maisons-Alfort */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 text-center italic font-sans italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 font-sans italic italic">Paris & IDF vers <span className="text-accent italic tracking-tight font-sans italic italic">Maisons-Alfort</span></h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed max-w-3xl mx-auto mb-12 italic italic text-center italic">
             Marne Transdem organise vos projets au départ de <Link to="/demenagement-paris" className="text-brand-900 font-bold hover:text-accent transition-colors italic underline decoration-accent/20 underline-offset-4">Paris</Link> (12e, 13e, etc.), de la <Link to="/demenagement-seine-saint-denis" className="text-brand-900 font-bold hover:text-accent transition-colors italic underline decoration-accent/20 underline-offset-4">Seine-Saint-Denis</Link>, des <Link to="/demenagement-hauts-de-seine" className="text-brand-900 font-bold hover:text-accent transition-colors italic underline decoration-accent/20 underline-offset-4">Hauts-de-Seine</Link> ou du <Link to="/demenagement-val-de-marne" className="text-brand-900 font-bold hover:text-accent transition-colors italic underline decoration-accent/20 underline-offset-4">Val-de-Marne</Link> vers Maisons-Alfort.
          </p>
          <div className="flex flex-wrap justify-center gap-4 italic font-sans italic underline-none italic">
             {[
               { n: "Paris 12e", l: "/demenagement-paris-12" },
               { n: "Paris 13e", l: "/demenagement-paris-13" },
               { n: "Hauts-de-Seine", l: "/demenagement-hauts-de-seine" },
               { n: "Seine-Saint-Denis", l: "/demenagement-seine-saint-denis" },
               { n: "Essonne", l: "/demenagement-essonne" }
             ].map((loc, i) => (
               <Link key={i} to={loc.l} className="bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 text-sm font-bold text-brand-900 hover:text-accent hover:border-accent transition-all italic uppercase tracking-widest italic">{loc.n}</Link>
             ))}
          </div>
        </div>
      </section>

      {/* 9. Formules */}
      <section className="py-24 bg-brand-900 text-white font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16 italic font-sans italic underline decoration-accent/20 underline-offset-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight italic italic underline-none italic">Formules <span className="text-accent italic tracking-tight italic italic underline-none italic">sur Mesure</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 italic">
             {[
               { t: "Économique", d: "Vous préparez vos cartons, Marne Transdem gère la manutention et le transport." },
               { t: "Standard", d: "Formule équilibrée déléguant les mobiliers délicats et les objets fragiles." },
               { t: "Luxe", d: "Déléguez une grande partie de la préparation et de l'emballage pour plus de confort." }
             ].map((formule, i) => (
               <div key={i} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-accent transition-all group italic">
                 <h3 className="text-2xl font-bold text-white mb-6 uppercase italic tracking-tight italic group-hover:text-accent transition-colors italic">{formule.t}</h3>
                 <p className="text-slate-400 text-sm font-light leading-relaxed italic">{formule.d}</p>
                 <div className="mt-8">
                    <Link to="/formules-demenagement" className="text-accent text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 italic">Détails de la formule <ArrowRight size={14} /></Link>
                 </div>
               </div>
             ))}
          </div>
          <div className="text-center mt-16 italic font-sans italic underline-none italic transition-all italic">
             <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all italic shadow-2xl italic">Comparer les formules</Link>
          </div>
        </div>
      </section>

      {/* 10. Volume & Monte-Meuble */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans transition-all italic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 italic font-sans italic underline-none italic">
             <div className="lg:col-span-2 space-y-12 italic transition-all italic">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all italic transition-all italic">Volume, Accès <span className="text-accent italic tracking-tight font-sans italic transition-all italic">et Monte-Meuble</span></h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic transition-all italic text-justify">
                 <p>
                   L'organisation d'un déménagement à Maisons-Alfort demande une étude attentive du volume et des accès réels (hall, parking, ascenseur, couloirs). Si des meubles volumineux ne passent pas par les escaliers étroits d'une résidence, l'utilisation d'un <Link to="/location-monte-meuble-paris" className="text-accent font-bold italic underline">monte-meuble</Link> peut être envisagée selon la faisabilité technique sur place.
                 </p>
                 <p>
                   Nous vous conseillons d'estimer votre volume indicatif via notre calculateur pour affiner votre demande de devis et prévoir les moyens nécessaires le jour J.
                 </p>
               </div>
               <div className="flex flex-col sm:flex-row gap-6 pt-4 italic">
                  <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg group hover:shadow-2xl transition-all italic shadow-xl">
                    <Calculator size={24} className="text-accent group-hover:scale-110 transition-transform italic" />
                    Calculateur de volume
                  </Link>
                  <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-brand-900 font-black uppercase text-xs tracking-widest border-b-2 border-accent pb-2 hover:text-accent transition-all italic">Location de monte-meuble</Link>
               </div>
             </div>
             <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 italic shadow-sm flex flex-col justify-center italic">
                <h4 className="text-xl font-bold text-brand-900 mb-8 uppercase italic tracking-tight border-b-2 border-accent pb-4 italic">Notre Méthode</h4>
                {[
                  "Analyse de votre projet personnalisé",
                  "Évaluation du volume, accès et étages",
                  "Choix de la formule et organisation",
                  "Réalisation du déménagement sécurisée"
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 mb-6 italic">
                    <span className="text-accent font-black italic">{i+1}.</span>
                    <span className="text-sm font-medium text-slate-600 italic">{step}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 11. Secteurs Proches linking section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16 italic font-sans italic underline decoration-accent/20 underline-offset-8">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight italic underline-none italic">Autres Secteurs <span className="text-accent italic tracking-tight font-sans italic italic underline-none italic">Proches</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto italic font-sans transition-all italic">
            {nearbySectors.map((s, i) => (
              s.l ? (
                <Link key={i} to={s.l} className="bg-white p-6 rounded-2xl border border-slate-100 group hover:border-accent hover:shadow-lg transition-all text-center italic shadow-sm">
                   <span className="font-bold text-brand-900 group-hover:text-accent transition-colors italic uppercase text-[10px] tracking-widest italic">{s.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-white/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center opacity-60 italic">
                   <span className="font-bold text-slate-400 italic uppercase text-[10px] tracking-widest italic italic">{s.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA Intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic transition-all italic">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic italic leading-tight italic transition-all italic underline-none italic shadow-none italic translate-y-0 italic grayscale-0 transition-opacity italic">Vous préparez un déménagement <br/>à Maisons-Alfort ?</h2>
           <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic transition-all italic grayscale-0 italic text-brand-900 italic">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès, vos étages et le niveau d’accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] italic shadow-none italic grayscale-0 italic opacity-100">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] italic">
                <Phone size={22} className="text-accent shadow-none italic grayscale-0 italic" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-900/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%] italic transition-all italic grayscale-0 italic"></div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8 italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline-none italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0 italic shadow-none italic">Maisons-Alfort</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic font-sans italic transition-all italic shadow-none italic grayscale-0 italic">
                   <HelpCircle className="text-accent shrink-0 mt-1 italic transition-all italic grayscale-0 italic" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic italic transition-all italic font-sans italic shadow-none italic grayscale-0 italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 14. Maillage Interne Final */}
      <section className="py-12 bg-slate-900 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic">Devis Rapide</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all italic">Calculateur Cube</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all italic">Île-de-France</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all italic text-white underline decoration-accent/30 underline-offset-4">Val-de-Marne (94)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans transition-all italic underline-none italic grayscale-0 italic">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all italic underline underline-offset-4 decoration-accent/20">Paris</Link>
            <Link to="/demenagement-paris-12" className="hover:text-accent transition-all italic">Paris 12</Link>
            <Link to="/demenagement-paris-13" className="hover:text-accent transition-all italic">Paris 13</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-all italic">Charenton</Link>
            <Link to="/demenagement-saint-maur" className="hover:text-accent transition-all italic">Saint-Maur</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all italic">Créteil</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all italic">Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-all italic">Nogent-sur-Marne</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all italic">St-Maur des Fossés</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalMaisonsAlfort;
