import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Phone, MapPin, Mail, Shield, Target, Users, Zap, LayoutGrid, Handshake, Box, Truck, Home, Building2, Warehouse } from 'lucide-react';
import { CONTACT, SERVICES } from '../constants';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { getBreadcrumbSchema, getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from '../lib/schema';

const About: React.FC = () => {
  const path = "/a-propos";

  const faqs = [
    {
      q: "Où est située Marne Transdem ?",
      a: `Marne Transdem est basée au ${CONTACT.fullAddress}. Notre localisation à Paris nous permet d’intervenir dans les différents arrondissements selon les besoins et les contraintes du projet.`
    },
    {
      q: "Marne Transdem intervient-elle uniquement à Paris ?",
      a: "Non, nous intervenons dans toute l'Île-de-France et nous accompagnons également des projets longue distance selon les besoins, le volume et l’organisation du déménagement."
    },
    {
      q: "Accompagnez-vous les particuliers et les entreprises ?",
      a: "Oui, nous proposons des prestations adaptées aux deux publics. Que ce soit pour un appartement ou pour un transfert de bureaux, nous avons des solutions spécifiques."
    },
    {
      q: "Comment obtenir un devis de déménagement ?",
      a: "Il vous suffit de remplir notre formulaire en ligne de demande de devis ou de nous contacter par téléphone. Nous évaluerons votre projet pour vous proposer une estimation personnalisée."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      <SEO 
        title="À propos de Marne Transdem | Déménagement à Paris" 
        description="Découvrez Marne Transdem, entreprise de déménagement à Paris accompagnant particuliers et entreprises avec méthode, soin et organisation." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "À propos", item: path }
          ]),
          getOrganizationSchema(),
          getLocalBusinessSchema(),
          getFAQSchema(faqs)
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 dark:bg-slate-950 overflow-hidden text-white transition-colors duration-300">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
              <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
              <ArrowRight size={10} />
              <span className="text-white">Qui sommes-nous</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <Users size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Qui sommes-nous</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-white italic">
              À propos de <br/>
              <span className="text-accent underline decoration-white/10 underline-offset-8 italic">Marne Transdem</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light italic">
              Entreprise de déménagement basée à Paris, nous accompagnons les particuliers et les entreprises dans leurs transitions locales et nationales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-3 shadow-lg italic">
                Demander un devis gratuit
                <ArrowRight size={20} />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 italic">
                <Phone size={20} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="py-24 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-brand-900 dark:text-white mb-8 uppercase italic underline decoration-accent/10 underline-offset-8">Une expertise <span className="text-accent italic">francilienne</span></h2>
              <div className="space-y-6 text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-light italic">
                <p>
                  Basée à <span className="font-bold text-brand-900 dark:text-white">Paris 20e</span>, Marne Transdem offre une logistique fluide pour les déménagements en Île-de-France ainsi qu'au niveau national.
                </p>
                <p>
                  Qu'il s'agisse de transférer un appartement dans le Marais ou des bureaux en petite couronne, nous appliquons la même rigueur et le même soin à chaque bien confié.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Notre mission */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 dark:text-white mb-6">Notre mission</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Notre mission est d’aider chaque client à préparer son déménagement avec méthode, sérénité et efficacité. Chaque projet est différent : volume à transporter, accès, étages, distance, niveau d’accompagnement souhaité, contraintes de calendrier ou besoins spécifiques. C’est pourquoi nous privilégions une approche personnalisée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: LayoutGrid, 
                title: "Organiser", 
                desc: "Préparer chaque étape pour limiter les imprévus." 
              },
              { 
                icon: Shield, 
                title: "Protéger", 
                desc: "Prendre soin des meubles, cartons et objets fragiles." 
              },
              { 
                icon: Handshake, 
                title: "Accompagner", 
                desc: "Orienter chaque client vers la formule la plus adaptée." 
              }
            ].map((mission, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all text-center"
              >
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <mission.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-brand-900 dark:text-white mb-4">{mission.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {mission.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Notre approche */}
      <section className="py-24 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 dark:text-white mb-6">Une méthode claire pour chaque déménagement</h2>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                L’objectif est d’apporter une vision claire du déroulement avant le jour du déménagement. Nous prenons en compte les contraintes propres à Paris : stationnement, étages, ascenseurs, accès d’immeuble, mobilier volumineux ou besoin éventuel de monte-meuble.
              </p>
            </div>

            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800 lg:before:hidden">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {[
                  { n: "01", t: "Échange sur votre projet", d: "Premier contact pour comprendre vos besoins." },
                  { n: "02", t: "Évaluation du projet", d: "Étude du volume, des accès et des contraintes." },
                  { n: "03", t: "Choix de la formule", d: "Organisation et planification de l'intervention." },
                  { n: "04", t: "Réalisation", d: "Déménagement effectué avec soin par nos équipes." }
                ].map((step, idx) => (
                  <div key={idx} className="relative pl-12 lg:pl-0 lg:text-center group">
                    <div className="absolute left-0 top-0 lg:static flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center text-accent font-black text-xs mb-4 z-10 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all">
                        {step.n}
                      </div>
                    </div>
                    <h4 className="font-bold text-brand-900 dark:text-white mb-2">{step.t}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{step.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Notre équipe */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6 italic tracking-tight uppercase">Notre <span className="text-accent underline decoration-accent/10 underline-offset-8">Équipe</span></h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Une équipe à dimension humaine pour un accompagnement de proximité et une logistique sans faille.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
            <div className="group space-y-6">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                <img 
                  src="/images/gerant-marne-transdem.webp" 
                  alt="M. H.Yassa - Gérant" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase italic tracking-tight">M. H.Yassa</h3>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">Gérant</p>
              </div>
            </div>
            
            <div className="group space-y-6 md:mt-12">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                <img 
                  src="/images/secretaire-marne-transdem.webp" 
                  alt="Mme J.Gabay - Secrétariat" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase italic tracking-tight">Mme J.Gabay</h3>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">Secrétariat</p>
              </div>
            </div>
            
            <div className="group space-y-6">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                <img 
                  src="/images/bureau-marne-transdem.webp" 
                  alt="Mr. E.Perrin - Commercial" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase italic tracking-tight">Mr. E.Perrin</h3>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">Commercial</p>
              </div>
            </div>

            <div className="group space-y-6 md:mt-12">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                <img 
                  src="/images/lamine.webp" 
                  alt="Lamine - Chef d'équipe" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase italic tracking-tight">Lamine</h3>
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">Chef d'équipe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Nos services */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 dark:text-white mb-4 tracking-tight">Des services adaptés aux particuliers et aux entreprises</h2>
            <p className="text-slate-500 dark:text-slate-400 font-light">Découvrez nos solutions pour répondre à toutes vos problématiques de mobilité.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.id} to={service.path} className="group bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-accent transition-all hover:shadow-xl flex flex-col h-full">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed mb-6 flex-grow">{service.description}</p>
                <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Explorer
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
            <Link to="/formules-demenagement" className="group bg-brand-900 p-8 rounded-[2rem] border border-brand-800 hover:border-accent transition-all hover:shadow-xl flex flex-col h-full text-white">
              <div className="w-14 h-14 bg-white/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Nos formules</h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed mb-6 flex-grow">Découvrez nos 3 formules Économique, Standard et Luxe pour votre déménagement.</p>
              <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                Voir les formules
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Pourquoi choisir Marne Transdem ? */}
      <section className="py-24 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 dark:text-white mb-12 text-center">Pourquoi choisir Marne Transdem ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                "Entreprise basée à Paris 20e",
                "Bonne connaissance des contraintes parisiennes",
                "Accompagnement professionnel",
                "Formules adaptées selon le projet",
                "Protection soignée des biens",
                "Intervention à Paris, en Île-de-France et longue distance selon les besoins"
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 size={16} className="text-accent" />
                  </div>
                  <span className="text-lg text-brand-900 dark:text-white font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Nos valeurs */}
      <section className="py-24 bg-brand-900 dark:bg-slate-950 text-white relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Nos valeurs</h2>
            <p className="text-slate-300 dark:text-slate-400 font-light">Ce qui guide nos interventions au quotidien.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Zap, 
                title: "Clarté", 
                desc: "Des informations compréhensibles pour choisir la bonne formule." 
              },
              { 
                icon: Shield, 
                title: "Soin", 
                desc: "Une attention portée à la protection des biens." 
              },
              { 
                icon: Target, 
                title: "Organisation", 
                desc: "Une préparation structurée avant l’intervention." 
              },
              { 
                icon: MapPin, 
                title: "Proximité", 
                desc: "Une entreprise basée à Paris, à l’écoute des besoins de ses clients." 
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white/5 dark:bg-slate-900 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 dark:border-slate-800 hover:bg-white/10 dark:hover:bg-slate-800/80 transition-colors">
                <div className="text-accent mb-6">
                  <value.icon size={32} />
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-slate-400 dark:text-slate-500 font-light text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Notre zone d’intervention */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 dark:text-white mb-6">Une entreprise de déménagement à Paris et en Île-de-France</h2>
              <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed text-lg mb-8">
                Basée au {CONTACT.fullAddress}, Marne Transdem intervient à Paris, en Île-de-France et accompagne également des projets longue distance selon les besoins.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black text-brand-900 dark:text-white uppercase tracking-[0.4em] mb-8 text-center opacity-40">Zones desservies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "Paris", "Paris 20e", "Hauts-de-Seine", "Seine-Saint-Denis", "Val-de-Marne",
                  "Val-d’Oise", "Yvelines", "Essonne", "Seine-et-Marne", "Longue distance*"
                ].map((zone, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 py-3 px-4 rounded-xl text-center text-sm font-bold text-brand-900 dark:text-white border border-slate-100 dark:border-slate-700">
                    {zone}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] text-slate-400 dark:text-slate-500 text-center italic">* Selon étude et volume du projet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section CTA intermédiaire */}
      <section className="py-24 text-center dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl lg:text-5xl font-black text-brand-900 dark:text-white mb-8 tracking-tight">Vous préparez un déménagement ?</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Expliquez-nous votre projet afin d’obtenir une estimation adaptée à votre volume, vos accès et le niveau d’accompagnement souhaité.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/demande-de-devis" className="bg-accent text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
              Demander mon devis gratuit
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white dark:bg-slate-800 text-brand-900 dark:text-white border border-slate-200 dark:border-slate-700 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 10. Section FAQ courte */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-900 dark:text-white mb-12 text-center">Questions fréquentes sur Marne Transdem</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-6 items-start">
                <div className="bg-slate-50 dark:bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center text-accent shrink-0">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 dark:text-white text-lg mb-3">{faq.q}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Bloc contact final */}
      <section className="py-24 dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 dark:bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 blur-[100px]"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">Contacter Marne Transdem</h2>
                <p className="text-xl text-slate-300 dark:text-slate-400 font-light mb-12 leading-relaxed">
                  Notre équipe est à votre écoute pour organiser votre prochain déménagement à Paris ou en Île-de-France.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 font-black">Notre bureau</div>
                    <div className="font-bold flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      {CONTACT.fullAddress}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 font-black">Email</div>
                    <div className="font-bold flex items-center gap-2">
                      <Mail size={16} className="text-accent" />
                      {CONTACT.email}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 font-black">Téléphone</div>
                    <div className="font-bold flex items-center gap-2">
                      <Phone size={16} className="text-accent" />
                      {CONTACT.phone}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to="/demande-de-devis" className="bg-accent text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all text-center">
                    Demander mon devis
                  </Link>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white dark:bg-slate-800 text-brand-900 dark:text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3">
                    <Phone size={20} className="text-accent" />
                    Nous appeler
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex justify-center items-center">
                <div className="w-full max-w-md aspect-[4/5] bg-white/5 dark:bg-slate-800/50 rounded-[3rem] border border-white/10 dark:border-slate-700 p-4 lg:p-8 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:w-48 group-hover:h-48 transition-all duration-700"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
                        Informations
                      </div>
                      <h3 className="text-3xl font-black text-white leading-tight">
                        Marne <br/>
                        <span className="text-accent underline decoration-white/10 underline-offset-4">Transdem</span>
                      </h3>
                    </div>

                    <div className="space-y-8 flex-grow">
                      <div className="group/item">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 font-black mb-3">Notre bureau</div>
                        <div className="font-bold flex items-start gap-4 text-slate-200 dark:text-slate-300">
                          <div className="w-10 h-10 rounded-2xl bg-white/5 dark:bg-white/10 border border-white/10 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                            <MapPin size={18} />
                          </div>
                          <span className="pt-1">{CONTACT.fullAddress}</span>
                        </div>
                      </div>

                      <div className="group/item">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 font-black mb-3">Email</div>
                        <div className="font-bold flex items-center gap-4 text-slate-200 dark:text-slate-300">
                          <div className="w-10 h-10 rounded-2xl bg-white/5 dark:bg-white/10 border border-white/10 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                            <Mail size={18} />
                          </div>
                          <span>{CONTACT.email}</span>
                        </div>
                      </div>

                      <div className="group/item">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-600 font-black mb-3">Téléphone</div>
                        <div className="font-bold flex items-center gap-4 text-slate-200 dark:text-slate-300">
                          <div className="w-10 h-10 rounded-2xl bg-white/5 dark:bg-white/10 border border-white/10 dark:border-slate-700 flex items-center justify-center shrink-0 group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                            <Phone size={18} />
                          </div>
                          <span>{CONTACT.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-8">
                      <Link to="/demande-de-devis" className="block w-full bg-white dark:bg-accent text-brand-900 dark:text-brand-950 py-4 rounded-2xl font-black text-center hover:bg-accent dark:hover:bg-white hover:text-white dark:hover:text-brand-950 transition-all shadow-lg hover:shadow-accent/20">
                        Demander un devis
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Info: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default About;
