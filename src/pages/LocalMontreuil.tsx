import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Store, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalMontreuil: React.FC = () => {
  const path = "/demenagement-montreuil";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Montreuil ?", 
      a: "Organiser un déménagement à Montreuil demande d'anticiper les types d'accès (rues pavées, impasses, immeubles sans ascenseur) et de prévoir le stationnement. Marne Transdem vous accompagne dans ces démarches pour garantir une prestation fluide de la Mairie aux quartiers du Bas-Montreuil." 
    },
    { 
      q: "Marne Transdem intervient-elle à Montreuil et dans l'est parisien ?", 
      a: "Oui, en tant que déménageur basé à Paris 20e, nous sommes idéalement situés pour intervenir à Montreuil et dans toutes les communes limitrophes de l'est parisien. Nous réalisons des déménagements locaux et vers toute la France." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Montreuil ?", 
      a: "Tout à fait. Selon la faisabilité technique (configuration des lieux, ligne électrique, espace de stationnement), nous pouvons déployer un monte-meuble. C'est souvent la solution idéale pour les étages élevés ou les meubles volumineux ne passant pas par l'escalier." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Montreuil ?", 
      a: "Le choix dépend de votre budget et du temps que vous souhaitez consacrer aux cartons. Nous proposons trois formules : Économique (vous emballez tout), Standard (nous gérons le fragile) ou Luxe (nous emballons l'intégralité de vos biens)." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Montreuil ?", 
      a: "Il suffit de remplir notre formulaire en ligne ou de nous contacter par téléphone. Nous réalisons une évaluation gratuite du volume et des accès pour vous proposer un devis personnalisé et transparent." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Montreuil | Marne Transdem"
        description="Préparez votre déménagement à Montreuil avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Montreuil", item: path }
          ])
        ]}
      />

      {/* 1. Hero local */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden text-brand-900">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm mb-8 border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Déménagement local</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Montreuil</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-3xl">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Montreuil, avec une organisation adaptée aux logements, bureaux, commerces et contraintes d'accès de l'est parisien.
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
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight">
                Votre déménagement à Montreuil
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Aux portes de <span className="font-bold text-slate-700">Paris 20e</span>, Montreuil est une ville au tissu urbain riche et varié. Marne Transdem y accompagne quotidiennement des familles emménageant dans de nouveaux <span className="font-bold text-slate-700">appartements</span> ou quittant de grandes <span className="font-bold text-slate-700">maisons</span> familiales.
                </p>
                <p>
                  Notre expertise s'étend également au secteur professionnel : qu'il s'agisse de <span className="font-bold text-slate-700">bureaux</span>, de <span className="font-bold text-slate-700">commerces</span>, d'<span className="font-bold text-slate-700">ateliers</span> d'artistes ou de <span className="font-bold text-slate-700">locaux professionnels</span>, nous gérons chaque transfert avec rigueur. De l'estimation du <span className="font-bold text-slate-700">volume</span> à la gestion du <span className="font-bold text-slate-700">stationnement</span>, nous élaborons une <span className="font-bold text-slate-700">demande de devis</span> précise pour votre projet montreuillois.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src="https://images.unsplash.com/photo-1596720510619-3333e9d8e578?auto=format&fit=crop&q=80&w=800" 
                  alt="Déménagement Montreuil - Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Montreuil demande une bonne préparation */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Pourquoi un déménagement à Montreuil demande une bonne préparation</h2>
          <p className="text-slate-400 text-xl font-light max-w-3xl mx-auto italic">
            La diversité des quartiers de Montreuil impose une logistique précise.
          </p>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Diversité des accès", desc: "Entre les rues pavées et les grandes résidences, chaque accès est unique." },
            { title: "Hauteurs & Étages", desc: "Logements avec escaliers étroits ou ascenseurs de petite taille." },
            { title: "Stationnement", desc: "Zonage complexe nécessitant une anticipation pour les camions." },
            { title: "Monte-meuble", desc: "Besoin éventuel selon la configuration des fenêtres et des meubles." }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4 text-accent">{item.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Nos services dans cette zone */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Nos services de déménagement à Montreuil</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Particuliers", desc: "Déménagement de maisons et appartements.", link: "/demenagement-particuliers-paris" },
              { title: "Entreprises", desc: "Transferts de bureaux et locaux.", link: "/demenagement-entreprises-paris" },
              { title: "Garde-meuble", desc: "Stockage sécurisé pour vos biens.", link: "/garde-meuble-paris" },
              { title: "Monte-meuble", desc: "Solution pour accès difficiles.", link: "/location-monte-meuble-paris" },
              { title: "Emballage", desc: "Protections haute performance.", link: "/emballage-protection-demenagement" },
              { title: "Matériel", desc: "Vente de cartons et fournitures.", link: "/cartons-demenagement-paris" },
              { title: "Formules", desc: "3 niveaux de prestations adaptés.", link: "/formules-demenagement" },
              { title: "Volume", desc: "Évaluation précise de vos besoins.", link: "/calculateur-volume" }
            ].map((s, i) => (
              <Link key={i} to={s.link} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-accent transition-all group">
                <h3 className="font-bold text-brand-900 mb-2 group-hover:text-accent">{s.title}</h3>
                <p className="text-slate-500 text-sm font-light mb-4">{s.desc}</p>
                <div className="text-accent text-[10px] font-black uppercase flex items-center gap-1">En savoir plus <ArrowRight size={10} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers à Montreuil */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden shadow-lg">
                 <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" alt="Maison Montreuil" />
               </div>
               <div className="w-full md:w-1/2 space-y-6">
                 <h2 className="text-3xl font-black text-brand-900">Déménagement de particuliers à Montreuil</h2>
                 <p className="text-slate-500 font-light leading-relaxed">
                   Que vous déménagiez d'un studio à la mairie de Montreuil ou d'une maison à Signac, nous gérons votre projet de A à Z. Nous sommes experts en <span className="font-bold text-slate-700">déménagements Montreuil vers Paris</span> et inversement, assurant la protection de vos objets fragiles et une <span className="font-bold text-slate-700">estimation du volume</span> fiable dès le départ.
                 </p>
                 <Link to="/demande-de-devis" className="inline-block bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-colors">Demander mon devis</Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises à Montreuil */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
               <div className="w-full md:w-1/2 rounded-[2rem] overflow-hidden shadow-lg">
                 <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" alt="Bureau Montreuil" />
               </div>
               <div className="w-full md:w-1/2 space-y-6">
                 <h2 className="text-3xl font-black text-brand-900">Déménagement d'entreprises à Montreuil</h2>
                 <p className="text-slate-500 font-light leading-relaxed">
                   Montreuil accueille de nombreux <span className="font-bold text-slate-700">bureaux</span>, agences de communication et <span className="font-bold text-slate-700">ateliers</span>. Nous organisons vos transferts professionnels pour minimiser l'impact sur votre activité. Gestion des archives, matériel informatique et planification rigoureuse sont au cœur de notre méthode.
                 </p>
                 <Link to="/contact" className="inline-block border-2 border-brand-900 text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-brand-900 hover:text-white transition-all">Organiser un transfert professionnel</Link>
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
           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200">
             <h3 className="text-2xl font-black text-brand-900 mb-4 border-b pb-4">Économique</h3>
             <p className="text-slate-500 font-light text-sm italic">Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport selon le projet.</p>
           </div>
           <div className="bg-white p-10 rounded-[2.5rem] border border-brand-900 shadow-xl relative scale-105 z-10">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-brand-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Conseillée</div>
             <h3 className="text-2xl font-black text-brand-900 mb-4 border-b pb-4">Standard</h3>
             <p className="text-slate-500 font-light text-sm italic">Une formule équilibrée pour déléguer certains éléments comme les objets fragiles ou certains meubles selon les besoins.</p>
           </div>
           <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200">
             <h3 className="text-2xl font-black text-brand-900 mb-4 border-b pb-4">Luxe</h3>
             <p className="text-slate-500 font-light text-sm italic">Une formule plus complète pour déléguer davantage de préparation, d'emballage et d'organisation selon la prestation choisie.</p>
           </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/formules-demenagement" className="text-accent font-black uppercase tracking-widest text-xs hover:underline underline-offset-4">Voir le détail des formules</Link>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement et monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-8">
                <h2 className="text-4xl font-black">Volume, accès et monte-meuble à Montreuil</h2>
                <p className="text-slate-400 font-light leading-relaxed text-lg italic">
                  Chaque projet à Montreuil nécessite une étude attentive des accès : étage élevé, ascenseur étroit, cages d'escalier ou besoins de stationnement en rue.
                </p>
                <div className="grid grid-cols-2 gap-6 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" /> <span className="text-sm">Volume sur mesure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" /> <span className="text-sm">Expertise escaliers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" /> <span className="text-sm">Gestion parking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-accent" /> <span className="text-sm">Conseil logistique</span>
                  </div>
                </div>
                <Link to="/location-monte-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest">
                  Info Monte-meuble <ArrowRight size={18} />
                </Link>
              </div>
              <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10 backdrop-blur-sm self-center">
                <Truck size={64} className="text-accent mb-6" />
                <p className="text-slate-300 font-light italic leading-relaxed">
                  Le déploiement d'un monte-meuble à Montreuil dépend de la faisabilité technique liée aux câbles, à la largeur de la rue et aux autorisations municipales. Contactez-nous pour une visite technique gratuite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Estimez le volume de votre déménagement</h2>
            <p className="text-slate-500 text-lg font-light italic leading-relaxed">
              Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux.
            </p>
            <Link to="/calculateur-volume" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent hover:text-brand-900 shadow-xl transition-all">
              <Calculator size={22} className="text-accent" />
              Utiliser le calculateur de volume
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Notre méthode en 4 étapes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900">Notre méthode en 4 étapes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
             {[
               { icon: ClipboardCheck, t: "Analyse de votre projet", d: "Premier échange pour comprendre vos besoins spécifiques." },
               { icon: Ruler, t: "Évaluation volume & accès", d: "Visite ou estimation pour une logistique sans faille." },
               { icon: Calendar, t: "Choix formule & planning", d: "Organisation du jour J selon vos contraintes." },
               { icon: Truck, t: "Réalisation déménagement", d: "Transfert sécurisé de vos biens par nos équipes." }
             ].map((step, i) => (
               <div key={i} className="text-center space-y-6">
                 <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-brand-900 shadow-sm border border-slate-200">
                   <step.icon size={32} />
                 </div>
                 <h4 className="font-bold text-brand-900">{i+1}. {step.t}</h4>
                 <p className="text-slate-500 text-sm font-light leading-relaxed">{step.d}</p>
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
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center font-display text-slate-500 mb-16">
            <Link to="/demenagement-paris-20" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 20e</Link>
            <Link to="/demenagement-paris-11" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 11e</Link>
            <Link to="/demenagement-paris-12" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 12e</Link>
            <Link to="/demenagement-bagnolet" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Bagnolet</Link>
            <Link to="/demenagement-vincennes" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Vincennes</Link>
            <Link to="/demenagement-nogent-sur-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Nogent-sur-Marne</Link>
            <Link to="/demenagement-saint-mande" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Saint-Mandé</Link>
            <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Île-de-France</Link>
          </div>

          <div className="pt-12 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Conversion</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/demande-de-devis" className="text-brand-900 hover:text-accent transition-colors">Demande de devis</Link></li>
                  <li><Link to="/calculateur-volume" className="text-brand-900 hover:text-accent transition-colors">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-brand-900 hover:text-accent transition-colors">Nos formules</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/demenagement-particuliers-paris" className="text-brand-900 hover:text-accent transition-colors">Particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-brand-900 hover:text-accent transition-colors">Entreprises</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-brand-900 hover:text-accent transition-colors">Monte-meuble</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Logistique</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/garde-meuble-paris" className="text-brand-900 hover:text-accent transition-colors">Garde-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-brand-900 hover:text-accent transition-colors">Emballage</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-brand-900 hover:text-accent transition-colors">Cartons</Link></li>
                </ul>
              </div>
              <div className="space-y-4 text-slate-500">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/contact" className="hover:text-accent transition-colors">Nous contacter</Link></li>
                  <li className="text-slate-400 italic text-xs leading-relaxed">{CONTACT.fullAddress}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA devis */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Vous préparez un déménagement à Montreuil ?</h2>
           <p className="text-brand-900/70 text-lg mb-10 max-w-2xl mx-auto italic font-light">
             Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl flex items-center justify-center gap-3 transition-all">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all">
                Appeler le {CONTACT.phone}
             </a>
           </div>
        </div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">FAQ Déménagement Montreuil</h2>
           </div>
           <div className="space-y-8">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200">
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
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            <Link to="/demande-de-devis" className="hover:text-accent transition-colors">Demande de devis</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-colors">Calculateur de volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-colors">Formules</Link>
            <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-colors">Déménagement particuliers</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-colors">Déménagement entreprises</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-colors">Garde-meuble</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-colors">Monte-meuble</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-colors">Emballage et protection</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">Cartons et matériel</Link>
            <Link to="/contact" className="hover:text-accent transition-colors text-accent">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalMontreuil;
