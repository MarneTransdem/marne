import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, Info, HelpCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalParis20: React.FC = () => {
  const path = "/demenagement-paris-20";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Paris 20e ?", 
      a: "Organiser un déménagement dans le 20e demande d'anticiper les accès (rues étroites, étages sans ascenseur) et le stationnement. Marne Transdem, basée rue des Maraîchers, vous accompagne de l'évaluation du volume à la réalisation finale pour une transition sereine." 
    },
    { 
      q: "Marne Transdem intervient-elle dans tout le 20e arrondissement ?", 
      a: "Oui, nous intervenons dans tous les quartiers du 20e : Gambetta, Ménilmontant, Belleville, Saint-Fargeau, Père Lachaise, Charonne et Porte de Bagnolet. Notre connaissance locale nous permet de gérer efficacement les contraintes spécifiques à chaque zone." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Paris 20e ?", 
      a: "Absolument. Selon la configuration de votre immeuble et la faisabilité technique, l'utilisation d'un monte-meuble peut être préconisée pour les meubles volumineux ou les accès difficiles par escalier. Nous étudions chaque projet individuellement." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Paris 20e ?", 
      a: "Le choix dépend de votre budget et du temps que vous souhaitez consacrer aux préparatifs. Nous proposons trois formules : Économique (vous emballez tout), Standard (nous emballons le fragile) et Luxe (nous gérons l'intégralité de l'emballage)." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Paris 20e ?", 
      a: "Il suffit de remplir notre formulaire de devis en ligne ou de nous contacter par téléphone. En tant qu'expert local du 20e, nous pouvons réaliser une estimation précise basée sur votre volume, vos accès et vos besoins spécifiques." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Paris 20e | Marne Transdem"
        description="Préparez votre déménagement à Paris 20e avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées et demande de devis."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "#" },
            { name: "Déménagement Paris 20e", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumb Visual */}
            <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-slate-300">Secteurs</span>
              <span>/</span>
              <span className="text-accent">Paris 20e</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm mb-8 border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-900">Déménagement local</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-8 leading-[1.1] tracking-tight">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Paris 20e</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl">
              Basée rue des Maraîchers, Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Paris 20e, dans les arrondissements voisins et en Île-de-France.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/demande-de-devis" 
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-[0_20px_50px_rgba(245,164,0,0.2)] flex items-center justify-center gap-3 group transition-all"
              >
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <Phone size={22} className="text-accent" />
                Appeler le {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction locale */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Une entreprise de déménagement située à Paris 20e
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Implantée au 43 <span className="font-bold text-slate-700">rue des Maraîchers</span>, notre équipe Marne Transdem est l'expert de proximité pour tous vos projets de mobilité au cœur du 20ème arrondissement. Nous connaissons parfaitement les spécificités de notre quartier, des immeubles anciens de Ménilmontant aux résidences plus modernes de la Porte de Bagnolet.
                </p>
                <p>
                  Que vous habitiez un studio ou un grand <span className="font-bold text-slate-700">appartement</span> familial, nous évaluons avec précision les contraintes liées aux <span className="font-bold text-slate-700">étages</span>, à l'absence d'<span className="font-bold text-slate-700">ascenseur</span> ou à l'exiguïté des <span className="font-bold text-slate-700">accès</span>. Nous gérons pour vous les problématiques de <span className="font-bold text-slate-700">stationnement</span> et la manipulation sécurisée de vos <span className="font-bold text-slate-700">meubles volumineux</span>.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-xs font-bold text-brand-900 border border-slate-100">
                  <MapPin size={14} className="text-accent" /> Rue des Maraîchers
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-xs font-bold text-brand-900 border border-slate-100">
                  <Building2 size={14} className="text-accent" /> Expert Paris 20e
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1550340499-a6c60bb828a1?auto=format&fit=crop&q=80&w=1000" 
                  alt="Rues de Paris 20e arrondissement" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent rounded-[2.5rem] -z-0 hidden md:block"></div>
              <div className="absolute -top-10 -left-10 p-8 bg-brand-900 text-white rounded-3xl z-20 shadow-xl hidden md:block max-w-[240px]">
                <p className="text-3xl font-black text-accent mb-2">Visite</p>
                <p className="text-sm font-bold leading-relaxed">Technique gratuite sous 48h dans tout l'arrondissement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi déménager à Paris 20e demande une bonne organisation */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight text-white underline decoration-accent/20 underline-offset-8">Pourquoi déménager à Paris 20e demande une bonne organisation</h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Le 20ème arrondissement possède un charme unique, mais ses rues pittoresques et ses immeubles de caractère imposent des défis logistiques réels pour un déménagement réussi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Immeubles & Accès", 
                desc: "Cages d'escalier étroites et ascenseurs aux dimensions réduites, voire inexistants dans les immeubles anciens du quartier.",
                icon: Building2 
              },
              { 
                title: "Rues & Stationnement", 
                desc: "Rues sinueuses à Ménilmontant ou Gambetta nécessitant une planification rigoureuse pour le positionnement du camion.",
                icon: Truck 
              },
              { 
                title: "Logistique Spécifique", 
                desc: "Besoin récurrent d'un monte-meuble pour le passage par fenêtre des canapés, pianos ou armoires volumineuses.",
                icon: Package 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-8">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services de déménagement à Paris 20e */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Nos services de déménagement à Paris 20e</h2>
            <p className="text-slate-500 font-light text-lg">Une gamme complète de solutions pour répondre à chaque besoin de mobilité.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Particuliers", path: "/demenagement-particuliers-paris", desc: "Logement complet, studio ou appartement familial." },
              { title: "Entreprises", path: "/demenagement-entreprises-paris", desc: "Bureaux, commerces et transferts professionnels." },
              { title: "Garde-meuble", path: "/garde-meuble-paris", desc: "Stockage sécurisé temporaire ou longue durée." },
              { title: "Monte-meuble", path: "/location-monte-meuble-paris", desc: "Location avec technicien pour accès difficiles." },
              { title: "Emballage", path: "/emballage-protection-demenagement", desc: "Protections premium pour tous vos biens." },
              { title: "Matériel", path: "/cartons-demenagement-paris", desc: "Livraison de cartons et fournitures adaptées." },
              { title: "Formules", path: "/formules-demenagement", desc: "3 niveaux d'accompagnement selon votre projet." },
              { title: "Sur mesure", path: "/contact", desc: "Une réponse personnalisée pour chaque demande." }
            ].map((service, i) => (
              <Link 
                key={i} 
                to={service.path}
                className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:border-accent/10 transition-all duration-500"
              >
                <h4 className="text-xl font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors">{service.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 italic">{service.desc}</p>
                <div className="flex items-center gap-2 text-brand-900 font-black text-[10px] uppercase tracking-widest">
                  Découvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement particuliers à Paris 20e */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000" alt="Déménagement particuliers" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-3xl -z-0"></div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Déménagement particuliers à Paris 20e</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Marne Transdem accompagne les particuliers pour les déménagements d'appartement, de maison, de studio, de logement familial ou de résidence principale/secondaire dans le 20ème arrondissement.
                </p>
                <p>
                  Nous prenons en charge la <span className="font-bold text-slate-700">préparation des cartons</span>, la <span className="font-bold text-slate-700">protection des meubles</span> fragiles et l'organisation logistique complète en fonction de votre <span className="font-bold text-slate-700">volume</span> et de vos <span className="font-bold text-slate-700">accès</span>. Nous vous conseillons sur le <span className="font-bold text-slate-700">choix de formule</span> idéal pour répondre à vos attentes.
                </p>
              </div>
              <Link 
                to="/demande-de-devis" 
                className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl transition-all group"
              >
                Demander mon devis
                <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement entreprises à Paris 20e */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight">Déménagement entreprises à Paris 20e</h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Marne Transdem accompagne les entreprises, commerces, bureaux, agences et professions libérales pour leurs transferts professionnels dans le 20e.
                </p>
                <p>
                  Qu'il s'agisse de <span className="font-bold text-slate-700">mobilier de bureau</span>, d'<span className="font-bold text-slate-700">archives</span> ou de <span className="font-bold text-slate-700">matériel informatique</span>, nous définissons une <span className="font-bold text-slate-700">organisation</span> rigoureuse pour garantir la <span className="font-bold text-slate-700">continuité d'activité</span>. Nous étudions le <span className="font-bold text-slate-700">planning</span> et les <span className="font-bold text-slate-700">accès</span> pour minimiser l'impact sur vos équipes.
                </p>
              </div>
              <Link 
                to="/demande-de-devis" 
                className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl transition-all group"
              >
                Organiser un transfert professionnel
                <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" alt="Déménagement entreprises" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Formules adaptées à votre projet */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Formules adaptées à votre projet</h2>
            <p className="text-slate-500 text-lg font-light">Trois niveaux d'accompagnement pour un déménagement sur mesure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { name: "Économique", desc: "La prestation essentielle : nous gérons le chargement, le transport et le déchargement." },
              { name: "Standard", desc: "Le meilleur compromis : nous emballons et déballons toute la vaisselle et les objets fragiles." },
              { name: "Luxe", desc: "Tranquillité totale : nos équipes s'occupent de l'emballage complet de tous vos biens." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                <h3 className="text-2xl font-black text-brand-900 mb-4">{f.name}</h3>
                <p className="text-slate-500 font-light text-sm italic mb-8 leading-relaxed">{f.desc}</p>
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6 font-black">
                  {i+1}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/formules-demenagement" className="inline-flex items-center gap-3 text-brand-900 font-black uppercase text-xs tracking-[0.3em] hover:text-accent transition-colors">
              Comparer toutes les formules <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Accès, étages, stationnement et monte-meuble */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-white">Accès, étages, stationnement et monte-meuble</h2>
                <div className="space-y-6 text-slate-300 font-light text-lg">
                  <p>
                    Certains projets à Paris 20e nécessitent une étude approfondie des accès. L'<span className="text-white font-bold">étage</span>, la taille de l'<span className="text-white font-bold">ascenseur</span> ou la configuration des escaliers sont des facteurs clés.
                  </p>
                  <p>
                    Pour les <span className="text-white font-bold">meubles volumineux</span> ou les <span className="text-white font-bold">accès par escalier</span> complexes, l'utilisation d'un <span className="text-white font-bold">monte-meuble</span> peut être requise selon la faisabilité. Nous évaluons chaque <span className="text-white font-bold">volume</span> pour anticiper ces besoins.
                  </p>
                </div>
                <div className="pt-10">
                  <Link to="/location-monte-meuble-paris" className="bg-accent text-brand-900 px-8 py-4 rounded-full font-bold hover:bg-accent-hover transition-all inline-flex items-center gap-3">
                    En savoir plus sur le monte-meuble
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center">
                   <Building2 size={32} className="text-accent mx-auto mb-4" />
                   <span className="block text-xl font-bold">Étages</span>
                </div>
                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center">
                   <Truck size={32} className="text-accent mx-auto mb-4" />
                   <span className="block text-xl font-bold">Parking</span>
                </div>
                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center">
                   <Ruler size={32} className="text-accent mx-auto mb-4" />
                   <span className="block text-xl font-bold">Accès</span>
                </div>
                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center">
                   <Zap size={32} className="text-accent mx-auto mb-4" />
                   <span className="block text-xl font-bold">Logistique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">Notre méthode en 4 étapes</h2>
            <p className="text-slate-500 text-lg font-light">Une organisation rigoureuse pour une transition en toute sérénité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Analyse du projet", icon: ClipboardCheck, desc: "Échange sur vos besoins, dates et contraintes spécifiques." },
              { title: "Évaluation technique", icon: Ruler, desc: "Mesure du volume et étude des accès à votre domicile ou bureau." },
              { title: "Choix & Organisation", icon: Calendar, desc: "Validation de la formule et réservation du stationnement." },
              { title: "Réalisation finale", icon: Truck, desc: "Exécution soigneuse de votre déménagement par nos experts." }
            ].map((step, i) => (
              <div key={i} className="relative group text-center">
                <div className="w-20 h-20 bg-brand-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative z-10 group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500 shadow-xl">
                  <step.icon size={32} />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-accent text-brand-900 rounded-full flex items-center justify-center font-black text-sm border-4 border-slate-50">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-4">{step.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Calculer votre volume */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-100 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black text-brand-900 mb-6 font-display leading-tight">Estimez le volume de votre déménagement</h2>
              <p className="text-slate-500 font-light leading-relaxed italic">
                Avant de demander un devis, vous pouvez utiliser notre calculateur de volume pour estimer vos meubles, cartons et objets principaux.
              </p>
            </div>
            <Link 
              to="/calculateur-volume" 
              className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl flex items-center gap-3 shrink-0"
            >
              <Calculator size={22} className="text-accent" />
              Utiliser le calculateur de volume
            </Link>
          </div>
        </div>
      </section>

      {/* 11. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/5 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight">Vous préparez un déménagement à Paris 20e ?</h2>
          <p className="text-brand-900/70 text-xl font-light mb-12 max-w-2xl mx-auto italic leading-relaxed">
            Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d’accompagnement souhaité.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-hover transition-all flex items-center gap-3 shadow-2xl">
              Demander mon devis gratuit
              <ArrowRight size={24} />
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-brand-900 font-black text-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <Phone size={24} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 12. FAQ locale */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">FAQ Déménagement Paris 20e</h2>
            <p className="text-slate-500 font-light italic">Les questions les plus fréquentes pour votre projet dans l'arrondissement.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-4">
                  <HelpCircle className="text-accent shrink-0 mt-1" size={22} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 italic border-l-2 border-accent/20">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Maillage interne (Secteurs Paris) */}
      <section className="py-24 border-t border-slate-100 bg-slate-50" id="maillage-local">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-brand-900">Autres secteurs proches</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center">
            <Link to="/demenagement-paris-11" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 11e</Link>
            <Link to="/demenagement-paris-12" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 12e</Link>
            <Link to="/demenagement-paris-19" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 19e</Link>
            <Link to="/demenagement-montreuil" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Montreuil</Link>
            <Link to="/demenagement-bagnolet" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Bagnolet</Link>
            <Link to="/demenagement-seine-saint-denis" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Seine-Saint-Denis</Link>
            <Link to="/demenagement-vincennes" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Saint-Mandé</Link>
            <Link to="/demenagement-val-de-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Val-de-Marne</Link>
            <Link to="/demenagement-seine-et-marne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Seine-et-Marne</Link>
            <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Île-de-France</Link>
          </div>
          
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Conversion</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/demande-de-devis" className="text-slate-500 hover:text-accent transition-colors">Demande de devis</Link></li>
                  <li><Link to="/calculateur-volume" className="text-slate-500 hover:text-accent transition-colors">Calculateur volume</Link></li>
                  <li><Link to="/formules-demenagement" className="text-slate-500 hover:text-accent transition-colors">Nos formules</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/demenagement-particuliers-paris" className="text-slate-500 hover:text-accent transition-colors">Particuliers</Link></li>
                  <li><Link to="/demenagement-entreprises-paris" className="text-slate-500 hover:text-accent transition-colors">Entreprises</Link></li>
                  <li><Link to="/location-monte-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Monte-meuble</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Logistique</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/garde-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Garde-meuble</Link></li>
                  <li><Link to="/emballage-protection-demenagement" className="text-slate-500 hover:text-accent transition-colors">Emballage</Link></li>
                  <li><Link to="/cartons-demenagement-paris" className="text-slate-500 hover:text-accent transition-colors">Cartons</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/contact" className="text-slate-500 hover:text-accent transition-colors">Nous contacter</Link></li>
                  <li className="text-slate-400 italic text-xs leading-relaxed">{CONTACT.fullAddress}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalParis20;
