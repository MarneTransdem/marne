import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Globe, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalGuyancourt: React.FC = () => {
  const path = "/demenagement-guyancourt";
  
  const faqs = [
    { 
      q: "Quel est le prix d'un déménagement à Guyancourt (78) ?", 
      a: "Le tarif dépend du volume (m3), de l'accessibilité (étage, ascenseur, type de résidence à Villaroy ou Les Saules), de la distance et de la formule choisie. Marne Transdem propose des devis gratuits après une étude personnalisée de votre projet." 
    },
    { 
      q: "Marne Transdem intervient-elle pour les entreprises près du Technocentre ?", 
      a: "Oui, nous sommes spécialisés dans les transferts de bureaux et la logistique professionnelle à Guyancourt, particulièrement dans le secteur du Technocentre Renault et des parcs d'affaires de Saint-Quentin-en-Yvelines." 
    },
    { 
      q: "Comment gérer le stationnement pour un déménagement à Guyancourt ?", 
      a: "À Guyancourt, certaines zones résidentielles ou d'affaires nécessitent une autorisation de stationnement. Marne Transdem anticipe ces démarches pour assurer une intervention fluide et sécurisée." 
    },
    { 
      q: "Proposez-vous la location de monte-meuble à Guyancourt ?", 
      a: "Oui, si votre appartement en résidence moderne ou votre maison de ville présente des accès restreints (escaliers étroits), nous pouvons mobiliser un monte-meuble sous réserve de faisabilité technique sur la voie publique." 
    },
    { 
      q: "Peut-on déménager depuis Guyancourt vers la province ?", 
      a: "Absolument. Marne Transdem organise des déménagements longue distance au départ de Guyancourt vers toute la France, avec une logistique adaptée aux trajets nationaux." 
    }
  ];

  const nearbySectors = [
    { n: "Montigny-le-Bretonneux", l: null },
    { n: "Voisins-le-Bretonneux", l: null },
    { n: "Versailles", l: "/demenagement-versailles" },
    { n: "Saint-Cyr-l’École", l: null },
    { n: "Buc", l: null },
    { n: "Vélizy-Villacoublay", l: "/demenagement-velizy-villacoublay" },
    { n: "Plaisir", l: "/demenagement-plaisir" },
    { n: "Trappes", l: null },
    { n: "Élancourt", l: null },
    { n: "Magny-les-Hameaux", l: null },
    { n: "Nogent-sur-Marne", l: "/demenagement-nogent-sur-marne" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Guyancourt | Marne Transdem"
        description="Préparez votre déménagement à Guyancourt avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Guyancourt", item: path }
          ])
        ]}
      />

      {/* 1. Hero */}
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Expertise Saint-Quentin-en-Yvelines</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic">Guyancourt</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne vos projets de déménagement à Guyancourt, que vous soyez un particulier en résidence ou une entreprise au Technocentre Renault.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Decomptage de volume gratuit
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
                Votre partenaire <span className="text-accent italic">à Guyancourt</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Ville dynamique au cœur de <span className="font-bold text-brand-900 italic tracking-tight">Saint-Quentin-en-Yvelines</span>, Guyancourt mêle harmonieusement quartiers résidentiels modernes et pôles d'activité stratégiques. Que vous emménagiez dans le quartier <span className="font-bold text-slate-700">Villaroy</span>, <span className="font-bold text-slate-700">Les Saules</span> ou que vous organisiez un transfert de bureaux proche du <span className="font-bold text-slate-700">Technocentre Renault</span>, Marne Transdem vous propose une logistique adaptée.
                </p>
                <p>
                  Notre connaissance du secteur de Guyancourt nous permet de maîtriser les spécificités locales : parkings souterrains, résidences sécurisées, parcs d'affaires et zones étudiantes proches de l'UVSQ. Nous adaptons nos moyens (volume, équipe, monte-meuble) pour un déménagement serein dans le 78.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-guyancourt-78.jpg" 
                  alt="Déménagement à Guyancourt Marne Transdem" 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Nos Services Spécifiques à Guyancourt */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic">Services <span className="text-accent underline decoration-accent/20 italic tracking-tight">sur Guyancourt</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-3xl mx-auto italic">
              Une expertise dédiée aux besoins variés des Guyancourtois, des familles aux grands pôles tertiaires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
             {[
               { icon: Home, t: "Déménagement Résidentiel", d: "Adapté aux appartements de Villaroy, aux résidences de standing et aux maisons de ville familiales." },
               { icon: Briefcase, t: "Transfert d'Entreprise", d: "Expertise pour les bureaux et parcs d'activités à proximité du Technocentre et de SQY." },
               { icon: GraduationCap, t: "Formules Étudiantes", d: "Solutions optimisées pour les petits volumes (studios) proches des pôles universitaires." },
               { icon: Truck, t: "Logistique SQY", d: "Coordination entre Guyancourt, Montigny, Voisins et l'ensemble de Saint-Quentin-en-Yvelines." },
               { icon: Building2, t: "Quartiers d'Affaires", d: "Manutention spécialisée pour le mobilier professionnel et le matériel informatique spécifique." },
               { icon: Globe, t: "Départ Province", d: "Organisation de votre déménagement depuis Guyancourt vers toutes les régions de France." }
             ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-accent transition-all group italic">
                  <item.icon className="text-accent mb-6 group-hover:scale-110 transition-transform grayscale-[20%]" size={40} />
                  <h3 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase italic">{item.t}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed italic italic">{item.d}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. Pourquoi choisir Marne Transdem pour Guyancourt */}
      <section className="py-24 font-sans italic transition-all italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic">
            <div className="lg:w-1/2 rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 lg:order-1 grayscale-[10%] italic">
              <img src="/images/demenagement-maison-78-guyancourt.jpg" alt="Organiser son déménagement à Guyancourt" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 italic">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Engagement Qualité</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Un déménagement à <span className="font-bold text-slate-700 tracking-tight italic">Guyancourt</span> requiert une organisation précise. Entre les quartiers piétonniers, les zones de bureaux à flux tendu et les zones résidentielles, Marne Transdem adapte ses ressources pour garantir la protection de vos biens.
                </p>
                <div className="grid grid-cols-1 gap-4 italic">
                  {[
                    "Équipes professionnelles et formées",
                    "Matériel de protection haut de gamme",
                    "Respect des plannings et des accès",
                    "Transparence tarifaire et devis clair"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 italic font-sans italic">
                      <CheckCircle2 size={18} className="text-accent shrink-0" />
                      <span className="text-sm font-medium text-slate-600 italic">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Les Formules Marne Transdem */}
      <section className="py-24 bg-brand-900 text-white font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16 italic font-sans italic">
             <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic tracking-tight italic">Nos Formules <span className="text-accent italic tracking-tight">Adaptées</span></h2>
             <p className="text-slate-400 font-light italic max-w-2xl mx-auto">Choisissez le niveau d'accompagnement idéal pour votre projet à Guyancourt.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto italic font-sans italic">
             {[
               { n: "Économique", d: "Manutention et transport de vos meubles et cartons déjà préparés par vos soins." },
               { n: "Standard", d: "Le compromis idéal pour déléguer la protection de vos meubles fragiles et l'emballage complexe." },
               { n: "Luxe", d: "Sérénité totale : nous gérons la préparation, l'emballage et l'organisation complète." }
             ].map((f, i) => (
               <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] hover:border-accent transition-all flex flex-col justify-between h-full italic transition-all group">
                 <div>
                   <h3 className="text-xl font-bold text-accent mb-6 group-hover:text-white transition-colors uppercase italic">{f.n}</h3>
                   <p className="text-slate-400 text-sm font-light leading-relaxed mb-10 italic italic">{f.d}</p>
                 </div>
                 <Link to="/formules-demenagement" className="text-accent font-black uppercase text-[10px] tracking-widest border-b border-accent/20 pb-1 hover:border-accent transition-all italic">Détails prestation</Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. Calculateur de Volume Guyancourt */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-12 italic">
           <h2 className="text-3xl md:text-6xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Préparez votre cubage</h2>
           <p className="text-slate-500 text-lg font-light leading-relaxed italic">
              Pour un devis précis à Guyancourt, l'estimation du volume est cruciale. Utilisez notre calculateur pour obtenir une première indication de vos besoins avant notre contact.
           </p>
           <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-12 py-6 rounded-full font-bold text-lg hover:shadow-2xl transition-all group shadow-xl italic tracking-tight uppercase italic transition-all italic">
             <Calculator size={28} className="text-accent" />
             Calculer mon volume
             <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 7. Méthode Marne Transdem */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Votre déménagement <span className="text-accent italic tracking-tight">en 4 étapes</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative font-sans italic">
             {[
               { icon: ClipboardCheck, t: "Consultation", d: "Étude de vos besoins et spécificités de Guyancourt." },
               { icon: Ruler, t: "Estimation", d: "Cubage précis et analyse des accès (Villaroy, etc.)." },
               { icon: Calendar, t: "Programmation", d: "Choix de la date et validation de la formule." },
               { icon: Truck, t: "Le D-Day", d: "Intervention experte et transfert sécurisé 78." }
             ].map((step, i) => (
               <div key={i} className="space-y-8 group italic">
                 <div className="w-20 h-20 bg-white shadow-2xl rounded-[1.5rem] flex items-center justify-center mx-auto text-brand-900 border border-slate-50 group-hover:bg-accent transition-all duration-500 relative grayscale-[30%] group-hover:grayscale-0 italic">
                   <step.icon size={32} />
                   <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-900 text-white rounded-full flex items-center justify-center font-black text-xs italic">{i+1}</div>
                 </div>
                 <div className="px-4 italic">
                    <h4 className="font-bold text-brand-900 mb-3 text-sm italic tracking-tight upgrade uppercase italic italic">{step.t}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed italic opacity-60 italic italic">{step.d}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 8. Secteurs Proches linking */}
      <section className="py-24 font-sans italic transition-all italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="text-center mb-16 italic font-sans">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 font-sans transition-all italic underline">Secteurs <span className="text-accent italic tracking-tight">Proches</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto italic font-sans">
            {nearbySectors.map((s, i) => (
              s.l ? (
                <Link key={i} to={s.l} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-accent hover:bg-white hover:shadow-xl transition-all text-center italic">
                   <span className="font-bold text-brand-900 group-hover:text-accent transition-colors italic uppercase text-[10px] tracking-widest italic">{s.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-50 text-center opacity-70 italic font-sans">
                   <span className="font-bold text-slate-400 italic uppercase text-[10px] tracking-widest italic italic">{s.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA Intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic italic leading-tight">DEMANDER MON DEVIS <br/>POUR GUYANCOURT ?</h2>
           <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic">
             Réponse rapide pour votre déménagement en Yvelines. Notre équipe étudie votre volume et vos accès pour un prix juste.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] italic">
               Obtenir mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] italic">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-900/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%] italic"></div>
      </section>

      {/* 10. FAQ Guyancourt */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic">
           <div className="text-center mb-16 italic font-sans italic underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic">Questions <span className="text-accent italic tracking-tight">Guyancourt</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic italic">
                   <HelpCircle className="text-accent shrink-0 mt-1 italic" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 11. Maillage Interne Final */}
      <section className="py-12 bg-slate-900 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 font-sans italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic">Devis Rapide</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all italic">Calculateur Cube</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic">Prestations</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all italic">IDF</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all italic">Province</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans italic">
            <Link to="/demenagement-paris" className="hover:text-accent uppercase italic transition-all italic underline underline-offset-4 decoration-accent/20">Paris</Link>
            <Link to="/demenagement-yvelines" className="hover:text-accent uppercase italic transition-all italic">Yvelines (78)</Link>
            <Link to="/demenagement-hauts-de-seine" className="hover:text-accent uppercase italic transition-all italic">Hauts-de-Seine (92)</Link>
            <Link to="/demenagement-versailles" className="hover:text-accent uppercase italic transition-all italic">Versailles</Link>
            <Link to="/demenagement-saint-germain-en-laye" className="hover:text-accent uppercase italic transition-all italic italic">Saint-Germain</Link>
            <Link to="/demenagement-plaisir" className="hover:text-accent uppercase italic transition-all italic">Plaisir</Link>
            <Link to="/demenagement-conflans-sainte-honorine" className="hover:text-accent uppercase italic transition-all italic">Conflans</Link>
            <Link to="/demenagement-poissy" className="hover:text-accent uppercase italic transition-all italic">Poissy</Link>
            <Link to="/demenagement-sartrouville" className="hover:text-accent uppercase italic transition-all italic">Sartrouville</Link>
            <Link to="/demenagement-rambouillet" className="hover:text-accent uppercase italic transition-all italic">Rambouillet</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalGuyancourt;
