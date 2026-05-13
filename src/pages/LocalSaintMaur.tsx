import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Store, Briefcase, Star, Info, ShieldCheck, Clock, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalSaintMaur: React.FC = () => {
  const path = "/demenagement-saint-maur-des-fosses";
  
  const faqs = [
    { 
      q: "Comment obtenir une autorisation de stationnement pour un déménagement à Saint-Maur-des-Fossés ?", 
      a: "La ville de Saint-Maur-des-Fossés impose des règles strictes concernant l'occupation du domaine public. En tant que déménageur professionnel, Marne Transdem gère pour vous les démarches administratives auprès des services techniques de la mairie pour réserver les emplacements nécessaires à nos camions, que ce soit à La Varenne, Adamville ou Le Parc." 
    },
    { 
      q: "Quel est le prix moyen d'un déménagement à Saint-Maur-des-Fossés ?", 
      a: "Le tarif dépend de plusieurs facteurs : le volume de biens (en m3), la distance entre les adresses, l'accessibilité (étages, ascenseur) et la formule choisie (Économique, Standard ou Luxe). Nous proposons systématiquement une visite technique gratuite à Saint-Maur pour établir un devis précis et sans surprise." 
    },
    { 
      q: "Proposez-vous la location de monte-meuble à Saint-Maur ?", 
      a: "Oui, nous disposons de monte-meubles adaptés aux rues parfois étroites de certains quartiers de Saint-Maur-des-Fossés. Cette solution est idéale pour passer les meubles volumineux par les fenêtres ou balcons lorsque les escaliers sont trop étroits ou pour préserver les parties communes des résidences de standing." 
    },
    { 
      q: "Assurez-vous les déménagements depuis Saint-Maur vers la province ?", 
      a: "Absolument. Marne Transdem est spécialiste des déménagements longue distance. Nous accompagnons de nombreuses familles de Saint-Maur quittant l'Île-de-France pour s'installer partout en France (Lyon, Bordeaux, Marseille, Nantes, etc.) avec la même exigence de qualité." 
    },
    { 
      q: "Quels types de transferts réalisez-vous pour les entreprises à Saint-Maur-des-Fossés ?", 
      a: "Nous assurons le transfert de bureaux, cabinets de professions libérales, commerces et locaux industriels. Notre expertise inclut la manutention lourde, le transfert de parcs informatiques et la gestion des archives, avec une logistique pensée pour minimiser l'interruption de votre activité." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Saint-Maur-des-Fossés | Marne Transdem : Expert Local"
        description="Société de déménagement à Saint-Maur-des-Fossés (94100). Expertise pour particuliers et entreprises. Devis gratuit, visite technique et accompagnement premium."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Saint-Maur-des-Fossés", item: path }
          ])
        ]}
      />

      {/* 1. Hero Section Premium */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-[#0B1221] overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-8"
              >
                <Star size={16} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Société de déménagement certifiée</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
                Déménageur <br/>
                <span className="text-accent italic">Saint-Maur-des-Fossés</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                L'excellence du déménagement sur-mesure pour les particuliers et professionnels de Saint-Maur. Expertise locale, logistique de précision et sérénité garantie pour votre installation dans le 94.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-[0_0_40px_rgba(255,191,0,0.2)] flex items-center justify-center gap-3 group transition-all">
                  Demander un devis gratuit
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                  <Phone size={22} className="text-accent" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5">
                <img 
                  src="/images/demenagement-saint-maur-des-fosses.webp" 
                  alt="Déménagement professionnel à Saint-Maur-des-Fossés avec Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl"></div>
              
              <div className="absolute -bottom-6 right-10 bg-white p-6 rounded-2xl shadow-2xl z-20 flex items-center gap-4">
                <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl">4.9</div>
                <div>
                  <div className="text-brand-900 font-bold text-sm">Excellent</div>
                  <div className="text-slate-500 text-xs italic">Basé sur nos derniers avis clients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Introduction SEO Riche */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 leading-tight">
              Une entreprise de déménagement à Saint-Maur-des-Fossés qui comprend vos exigences
            </h2>
            <div className="h-1.5 w-24 bg-accent mx-auto mb-10 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-0 italic text-center">
              « Déménager à Saint-Maur n'est pas une simple opération logistique, c'est une transition de vie dans l'une des communes les plus prisées du Val-de-Marne. »
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-slate-600 text-lg font-light leading-relaxed">
              <p>
                Saint-Maur-des-Fossés, ville aux huit quartiers et à la boucle de la Marne si caractéristique, exige une connaissance parfaite du terrain. Que vous habitiez une villa d'exception à <span className="font-bold text-brand-900">La Varenne-Saint-Hilaire</span>, un appartement bourgeois au <span className="font-bold text-brand-900">Parc de Saint-Maur</span> ou une maison de ville à <span className="font-bold text-brand-900">Adamville</span>, Marne Transdem déploie des moyens adaptés à votre environnement.
              </p>
              <p>
                Notre <span className="font-bold text-brand-900">société de déménagement à Saint-Maur-des-Fossés</span> se distingue par une approche artisanale alliée à une puissance logistique moderne. Nous ne nous contentons pas de transporter des cartons ; nous protégeons votre patrimoine, respectons vos souvenirs et gérons chaque contrainte technique — des rues étroites de <span className="font-bold text-brand-900">Champignol</span> aux accès complexes des bords de Marne.
              </p>
              <p>
                Depuis plus de deux décennies, notre équipe accompagne les familles, les couples et les seniors dans leur <span className="font-bold text-brand-900">déménagement appartement Saint-Maur-des-Fossés</span> ou maison. Nous sommes fiers d'être le partenaire de confiance pour ceux qui recherchent la sécurité, la ponctualité et une discrétion absolue.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="text-accent font-black text-4xl mb-2">20+</div>
                  <div className="text-brand-900 font-bold uppercase text-[10px] tracking-widest">Années d'expérience</div>
                </div>
                <div className="bg-brand-900 p-8 rounded-[2rem] text-white">
                  <div className="text-accent font-black text-4xl mb-2">98%</div>
                  <div className="text-white/70 font-bold uppercase text-[10px] tracking-widest">Clients satisfaits</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-accent p-8 rounded-[2rem] text-brand-900">
                  <div className="text-brand-900 font-black text-4xl mb-2">10k+</div>
                  <div className="text-brand-900/70 font-bold uppercase text-[10px] tracking-widest">Missions réussies</div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="text-brand-900 font-black text-4xl mb-2">0</div>
                  <div className="text-brand-900/50 font-bold uppercase text-[10px] tracking-widest">Stress garanti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Prestations Détaillées Particuliers */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-10 leading-tight">Déménagement maison & appartement à Saint-Maur</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Home size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Expertise Résidentielle</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Nous maîtrisons les spécificités des pavillons de Saint-Maur : gestion des étages, protection des parquets et boiseries, et manutention d'objets lourds comme les pianos ou coffres-forts.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Emballage Haute Protection</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Utilisation de fournitures premium : cartons double cannelure, papier bulle antistatique, et housses spécifiques pour literie et canapés afin de garantir une intégrité totale.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Logistique Urbaine 94</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Nos chauffeurs connaissent chaque quartier. Nous anticipons les difficultés de stationnement et d'accès pour un déchargement fluide et rapide.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                 <img src="/images/equipe-demenageur-94.jpg" alt="Equipe de déménageurs Marne Transdem en action" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Prestations Détaillées Professionnels */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-10 leading-tight">Transfert d'entreprise Saint-Maur-des-Fossés</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-900 rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Continuité d'Activité</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Nous planifions votre déménagement professionnel le week-end ou en horaires décalés pour que vos collaborateurs reprennent le travail dès le lundi matin sans interruption.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-900 rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Mobilier & Informatique</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Démontage/remontage de postes de travail, racks informatiques et mobilier de réunion. Emballage spécifique pour les parcs informatiques sensibles.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                   <div className="w-12 h-12 bg-brand-900 rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                     <ClipboardCheck size={24} />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-brand-900 mb-3">Gestion des Archives</h3>
                     <p className="text-slate-500 font-light leading-relaxed">Conditionnement sécurisé et indexation de vos archives pour un transfert ordonné et une réinstallation immédiate dans vos nouveaux locaux.</p>
                   </div>
                </div>
              </div>
              <div className="mt-12">
                 <Link to="/demenagement-entreprises-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] hover:text-brand-900 transition-colors border-b-2 border-accent pb-1">
                   En savoir plus sur nos solutions pros <ArrowRight size={14} />
                 </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative group">
               <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                 <img src="/images/demenagement-94-val-de-marne.jpg" alt="Locaux professionnels à Saint-Maur-des-Fossés" className="w-full h-full object-cover" />
               </div>
               <div className="absolute top-10 left-10 w-full h-full bg-slate-100 rounded-[3.5rem] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pourquoi choisir Marne Transdem à Saint-Maur */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Pourquoi choisir Marne Transdem à Saint-Maur ?</h2>
            <div className="h-1.5 w-24 bg-accent mx-auto rounded-full mb-10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { i: ShieldCheck, t: "Sécurité Totale", d: "Assurance professionnelle incluse couvrant l'intégralité de votre patrimoine durant le transport." },
              { i: Clock, t: "Ponctualité Rigoureuse", d: "Respect strict des horaires de début de chantier et des délais de livraison annoncés." },
              { i: Phone, t: "Interlocuteur Unique", d: "Un conseiller dédié suit votre dossier de la première visite à la réception finale." },
              { i: CheckCircle2, t: "Devis Transparent", d: "Une tarification claire, détaillée, sans frais cachés ni mauvaise surprise au déchargement." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-accent group transition-all">
                <item.i className="text-accent mb-8 group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-xl font-black mb-4">{item.t}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed italic">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Formules de déménagement */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 tracking-tight">Des formules adaptées à chaque budget</h2>
          <p className="text-slate-500 text-lg transition-colors font-light max-w-2xl mx-auto italic">Nous avons conçu 3 niveaux de services pour répondre précisément à vos besoins d'accompagnement et à vos contraintes budgétaires.</p>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {[
            { n: "Économique", desc: "La solution efficace pour les budgets serrés. Nous gérons la protection de vos meubles, le chargement, le transport et le déchargement.", p: "L'essentiel pour déménager sereinement." },
            { n: "Standard", desc: "Le meilleur rapport sérénité/prix. Nous gérons l'emballage et le déballage de vos objets fragiles et le démontage de vos meubles.", p: "Plébiscitée par les familles de Saint-Maur." },
            { n: "Luxe", desc: "Sérénité absolue. Nous gérons l'intégralité de votre déménagement : emballage complet, rangement, installation et nettoyage.", p: "Pour un emménagement clé en main." }
          ].map((formule, i) => (
            <div key={i} className={`bg-white p-12 rounded-[3rem] border-2 transition-all flex flex-col justify-between ${i === 1 ? 'border-accent shadow-[0_20px_60px_rgba(255,191,0,0.15)] scale-105 z-10' : 'border-slate-100 shadow-sm'}`}>
              <div>
                <h3 className="text-3xl font-black text-brand-900 mb-4">{formule.n}</h3>
                <div className="w-12 h-1 bg-accent mb-8"></div>
                <p className="text-slate-500 font-light leading-relaxed italic text-sm mb-8">{formule.desc}</p>
                <p className="text-brand-900 font-bold text-xs uppercase tracking-widest mb-12">{formule.p}</p>
              </div>
              <Link to="/formules-demenagement" className={`py-4 rounded-full font-bold text-center transition-all ${i === 1 ? 'bg-accent text-brand-900 hover:bg-brand-900 hover:text-white' : 'bg-slate-50 text-slate-400 hover:bg-brand-900 hover:text-white'}`}>
                Détails de la formule
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Témoignage local */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden">
             <Quote className="absolute top-12 left-12 text-white/5 w-64 h-64 -z-0" />
             <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="flex justify-center gap-1 mb-10">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-accent text-accent" />)}
                </div>
                <p className="text-2xl md:text-4xl text-white font-light italic leading-relaxed mb-12">
                  "Une équipe remarquable. Nous avons quitté notre maison de La Varenne pour une nouvelle installation à Saint-Maur. Professionnalisme, politesse et une réactivité incroyable pour la demande de stationnement. Marne Transdem mérite sa réputation d'excellence."
                </p>
                <div className="text-white">
                  <div className="font-bold text-lg">Famille Desvaux</div>
                  <div className="text-slate-500 text-sm italic font-light">Habitants de Saint-Maur-des-Fossés depuis 15 ans</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. Déménagement vers la province */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="rounded-[3rem] overflow-hidden shadow-2xl">
               <img src="/images/camion-demenagement-val-de-marne.jpg" alt="Camion de déménagement sur la route" className="w-full h-full object-cover" />
             </div>
             <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Depuis Saint-Maur vers toute la France</h2>
               <p className="text-slate-500 text-lg font-light leading-relaxed">
                 Vous quittez le Val-de-Marne pour le sud de la France, la Bretagne ou les Alpes ? Marne Transdem est le spécialiste du <span className="font-bold text-brand-900">déménagement depuis Saint-Maur-des-Fossés vers la province</span>.
               </p>
               <p className="text-slate-500 text-lg font-light leading-relaxed italic">
                 Nous optimisons nos trajets pour vous proposer des tarifs compétitifs sur les longues distances, tout en conservant le même niveau de qualité et de protection pour vos biens.
               </p>
               <div className="grid grid-cols-2 gap-4">
                 {["Saint-Maur → Lyon", "Saint-Maur → Nice", "Saint-Maur → Bordeaux", "Saint-Maur → Nantes", "Saint-Maur → Marseille", "Saint-Maur → Toulouse"].map((route, i) => (
                   <div key={i} className="flex items-center gap-3 text-brand-900/40 font-bold text-xs uppercase tracking-widest">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                     {route}
                   </div>
                 ))}
               </div>
               <Link to="/demenagement-longue-distance" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold inline-flex items-center gap-3 hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
                 Infos Longue Distance <ArrowRight size={20} />
               </Link>
             </div>
           </div>
        </div>
      </section>

      {/* 9. FAQ Locale SEO */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight uppercase">Questions fréquentes</h2>
             <div className="h-1 w-20 bg-accent mx-auto"></div>
           </div>
           <div className="space-y-6">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:border-accent">
                 <h4 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4">
                   <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-10 italic border-l-2 border-slate-100">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 10. CTA Final */}
      <section className="py-24 bg-[#0B1221] text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            Prêt pour votre déménagement <br/>
            à <span className="text-accent italic">Saint-Maur</span> ?
          </h2>
          <p className="text-slate-400 text-xl font-light mb-16 max-w-2xl mx-auto italic leading-relaxed">
            Obtenez votre devis personnalisé en 48h. Une équipe d'experts à votre écoute pour une installation réussie dans le Val-de-Marne.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
             <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-6 rounded-full font-bold text-xl hover:bg-white shadow-[0_0_50px_rgba(255,191,0,0.15)] transition-all min-w-[300px]">
               Devis Gratuit & Rapide
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-white hover:text-brand-900 transition-all min-w-[300px] flex items-center justify-center gap-4">
               <Phone size={24} className="text-accent" />
               {CONTACT.phone}
             </a>
          </div>
          <div className="mt-16 flex justify-center items-center gap-3 text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] italic">
             <ShieldCheck size={14} className="text-accent" />
             Zéro engagement • Visite gratuite • Devis sous 48h
          </div>
        </div>
      </section>

      {/* 11. Footer Maillage Local */}
      <section className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-900/30 mb-8 italic">Nos secteurs d'intervention Val-de-Marne</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-slate-400 font-bold text-xs uppercase tracking-widest italic">
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-colors">Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent transition-colors">Saint-Mandé</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-colors">Charenton</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-colors">Créteil</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-colors">Nogent</Link>
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-colors">Maisons-Alfort</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-colors">Tout le 94</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalSaintMaur;
