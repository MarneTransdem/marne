import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Phone,
  MapPin,
  Building2,
  Package,
  Calculator,
  Truck,
  Ruler,
  Calendar,
  ClipboardCheck,
  HelpCircle,
  Zap,
  Box,
  Store,
  Briefcase,
  Home,
  Archive,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalParis9: React.FC = () => {
  const path = '/demenagement-paris-9';

  const faqs = [
    {
      q: 'Comment organiser un déménagement à Paris 9e ?',
      a: "Un déménagement dans le 9e arrondissement nécessite une planification rigoureuse en raison de la densité urbaine, des rues très fréquentées et de l’activité commerciale intense. Il est essentiel d'anticiper le stationnement et d'évaluer les accès de l’immeuble (escaliers, ascenseurs, cour). Marne Transdem vous aide à coordonner ces éléments pour une transition fluide.",
    },
    {
      q: 'Marne Transdem intervient-elle dans tout le 9e arrondissement ?',
      a: "Oui, nous accompagnons les particuliers et les entreprises dans tous les quartiers du 9e arrondissement, des Grands Boulevards à la Nouvelle Athènes, ainsi que dans les secteurs adjacents comme les 8e, 10e, 17e et 18e arrondissements.",
    },
    {
      q: 'Peut-on demander un monte-meuble à Paris 9e ?',
      a: "L’utilisation d’un monte-meuble est souvent recommandée à Paris 9e pour les immeubles aux escaliers étroits ou aux ascenseurs exigus. Sa mise en place est possible sous réserve de faisabilité technique liée à la configuration de la rue, de l'espace de stationnement et de l'autorisation nécessaire.",
    },
    {
      q: 'Quelle formule choisir pour un déménagement à Paris 9e ?',
      a: "Tout dépend de votre budget et de votre besoin d'accompagnement. La formule Économique est idéale si vous préparez vos cartons. La formule Standard est la plus équilibrée pour déléguer les objets fragiles. La formule Luxe est une solution complète où Marne Transdem prend en charge une grande partie de l'organisation.",
    },
    {
      q: 'Comment obtenir un devis pour un déménagement à Paris 9e ?',
      a: "Vous pouvez effectuer une demande de devis gratuit via notre formulaire en ligne ou par téléphone. Nous estimerons votre projet en tenant compte du volume, de la distance, des étages et des spécificités d'accès propres au centre de Paris.",
    },
  ];

  const services = [
    {
      title: 'Déménagement Particuliers',
      path: '/demenagement-particuliers-paris',
      desc: 'Accompagnement pour studios, appartements et résidences familiales du 9e.',
    },
    {
      title: 'Déménagement Entreprises',
      path: '/demenagement-entreprises-paris',
      desc: 'Transferts de bureaux, commerces, agences et cabinets professionnels.',
    },
    {
      title: 'Garde-meuble / Stockage',
      path: '/garde-meuble-paris',
      desc: 'Solutions de stockage sécurisées pour vos meubles et archives.',
    },
    {
      title: 'Location Monte-meuble',
      path: '/location-monte-meuble-paris',
      desc: 'Solution pour les accès difficiles et les meubles volumineux.',
    },
    {
      title: 'Emballage & Protection',
      path: '/emballage-protection-demenagement',
      desc: 'Protection haut de gamme pour votre mobilier et objets fragiles.',
    },
    {
      title: 'Cartons & Matériel',
      path: '/cartons-demenagement-paris',
      desc: 'Fourniture de matériel professionnel pour sécuriser vos biens.',
    },
    {
      title: 'Formules de déménagement',
      path: '/formules-demenagement',
      desc: 'Trois niveaux de service adaptés à vos besoins et votre budget.',
    },
    {
      title: 'Calculateur Volume',
      path: '/calculateur-volume',
      desc: 'Outil gratuit pour estimer précisément vos besoins en cubage.',
    },
  ];

  const constraints = [
    {
      title: 'Activité commerciale intense',
      desc: "Le 9e est un pôle d'activité majeur ; le flux de circulation et les horaires des commerces imposent une logistique précise.",
      icon: Store,
    },
    {
      title: 'Immeubles de caractère',
      desc: "Les immeubles anciens du secteur ont souvent des cages d'escalier étroites ou des ascenseurs de petite taille.",
      icon: Building2,
    },
    {
      title: 'Rues centrales fréquentées',
      desc: "Le stationnement et la manutention doivent être anticipés pour ne pas gêner la fluidité des axes urbains.",
      icon: MapPin,
    },
    {
      title: 'Bureaux et professions libérales',
      desc: "Les transferts professionnels exigent une rigueur extrême pour assurer la continuité de votre activité.",
      icon: Briefcase,
    },
    {
      title: 'Monte-meuble stratégique',
      desc: "Le recours à un monte-meuble est une solution efficace lorsque les accès classiques sont saturés ou impossibles.",
      icon: Zap,
    },
    {
      title: 'Volume à optimiser',
      desc: "L'estimation précise du volume est cruciale pour adapter le véhicule et l'équipe aux contraintes du centre-parisien.",
      icon: Calculator,
    },
  ];

  const nearbySectors = [
    { label: 'Déménagement Paris 8e', path: '/demenagement-paris-8' },
    { label: 'Déménagement Paris 10e', path: '/demenagement-paris-10' },
    { label: 'Déménagement Paris 17e', path: '/demenagement-paris-17' },
    { label: 'Déménagement Paris 18e', path: '/demenagement-paris-18' },
    { label: 'Déménagement Paris 2e', path: '/demenagement-paris-2' },
    { label: 'Déménagement Paris 1er', path: '/demenagement-paris-1' },
    { label: 'Déménagement Île-de-France', path: '/demenagement-ile-de-france' },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <SEO
        title="Déménagement Paris 9e | Marne Transdem"
        description="Préparez votre déménagement à Paris 9e avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: 'Accueil', item: '/' },
            { name: 'Secteurs', item: '#' },
            { name: 'Déménagement Paris 9e', item: path },
          ]),
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-brand-900 transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-slate-300">Secteurs</span>
              <span>/</span>
              <span className="text-accent underline decoration-accent/20 underline-offset-4 font-black">
                Paris 9e
              </span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm mb-8 border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-900">
                Déménagement local
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-8 leading-[1.1] tracking-tight">
              Déménagement <br />
              <span className="text-accent underline decoration-accent/20 underline-offset-8">
                Paris 9e
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Paris 9e, avec une organisation adaptée aux appartements, bureaux, commerces et contraintes d’accès du centre parisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/demande-de-devis"
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all"
              >
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 lg:py-32 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Votre déménagement dans le 9e arrondissement de Paris
              </h2>

              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Le <span className="font-bold text-slate-700">Paris 9e</span> est un arrondissement central et dynamique, caractérisé par son mélange d’<span className="font-bold text-slate-700">appartements</span> de grand standing, de <span className="font-bold text-slate-700">studios</span> étudiants et de prestigieux <span className="font-bold text-slate-700">immeubles anciens</span>. C'est également un quartier d'affaires essentiel abritant de nombreux <span className="font-bold text-slate-700">bureaux</span>, agences, <span className="font-bold text-slate-700">cabinets professionnels</span> et commerces de proximité.
                </p>

                <p>
                  Qu'il s'agisse d'un logement familial ou d'un siège social, Marne Transdem maîtrise les spécificités du 9e : <span className="font-bold text-slate-700">escaliers</span> parfois dépourvus d'ascenseurs, rues très fréquentées et gestion du <span className="font-bold text-slate-700">stationnement</span>. Notre proximité avec <span className="font-bold text-slate-700">Paris 8e</span>, <span className="font-bold text-slate-700">10e</span>, <span className="font-bold text-slate-700">17e</span> et <span className="font-bold text-slate-700">18e</span> nous permet d'intervenir avec réactivité pour toute <span className="font-bold text-slate-700">demande de devis</span> ou estimation de volume.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
                <img
                  src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=1000"
                  alt="Déménagement Paris 9e - vue urbaine et logistique"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi préparation */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden font-display">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight text-white underline decoration-accent/20 underline-offset-8">
              Pourquoi un déménagement à Paris 9e demande une bonne préparation
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed italic">
              Un quartier central implique des défis logistiques spécifiques : rues étroites, flux piétons et architecture ancienne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constraints.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm group hover:border-accent transition-all"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-brand-900 transition-all">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              Nos services de déménagement à Paris 9e
            </h2>
            <p className="text-slate-500 font-light text-lg italic">
              Une gamme complète de prestations pour répondre aux besoins des résidents et des professionnels du 9e.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <h4 className="text-lg font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors leading-tight">
                  {service.title}
                </h4>
                <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 italic">
                  {service.desc}
                </p>
                <div className="flex items-center gap-2 text-brand-900 font-black text-[10px] uppercase tracking-widest">
                  En savoir plus
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Particuliers */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=1000"
                  alt="Déménagement particuliers Paris 9"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Déménagement de particuliers à Paris 9e
              </h2>

              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les familles, les couples et les étudiants pour leurs déménagements d'appartements ou de studios. Nous gérons toutes les étapes : du tri initial à la protection rigoureuse de vos meubles, en portant une attention particulière aux objets fragiles.
                </p>
                <p>
                  Nous prenons en compte les spécificités de votre logement (étage, ascenseur, cave) et sélectionnons ensemble la formule idéale pour maîtriser votre budget tout en garantissant une sécurité maximale lors du transport.
                </p>
              </div>

              <Link
                to="/demande-de-devis"
                className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl items-center gap-3 transition-all"
              >
                Demander mon devis
                <ArrowRight size={22} className="text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Entreprises */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Déménagement d’entreprises à Paris 9e
              </h2>

              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic border-l-4 border-accent/20 pl-6">
                <p>
                  Le 9e arrondissement est le cœur battant de nombreuses agences créatives et professions libérales. Pour un transfert de bureaux, nous organisons la manutention des archives, du matériel informatique et du mobilier ergonomique avec une planification rigoureuse.
                </p>
                <p>
                  Notre expertise permet de minimiser les temps d'arrêt de votre activité en gérant les accès complexes et en assurant une installation rapide dans vos nouveaux locaux professionnels.
                </p>
              </div>

              <Link
                to="/demenagement-entreprises-paris"
                className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl items-center gap-3 transition-all"
              >
                Organiser un transfert professionnel
                <ArrowRight size={22} />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&q=80&w=1000"
                  alt="Bureaux Paris 9"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-900/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Formules Presentation */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              Formules adaptées à votre projet
            </h2>
            <p className="text-slate-500 text-lg font-light italic">
              Trois niveaux de service pensés pour s'adapter à la complexité de votre déménagement parisien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Économique',
                desc: 'Mise en carton par vos soins. Marne Transdem gère la protection, le chargement et le transport sécurisé.',
              },
              {
                name: 'Standard',
                desc: 'Solution intermédiaire : nous emballons les objets fragiles et protégeons tout votre mobilier.',
              },
              {
                name: 'Luxe',
                desc: 'Sérénité totale : emballage complet de vos biens et organisation intégrale de la prestation.',
              },
            ].map((formula, i) => (
              <div
                key={i}
                className={`bg-white p-12 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center ${
                  formula.name === 'Standard'
                    ? 'border-accent ring-2 ring-accent/10'
                    : 'border-slate-200'
                }`}
              >
                {formula.name === 'Standard' && (
                  <div className="mb-6 inline-flex px-4 py-2 rounded-full bg-accent/15 text-brand-900 text-[10px] font-black uppercase tracking-widest">
                    Le plus populaire
                  </div>
                )}
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-brand-900 font-black text-2xl mb-8">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-4">{formula.name}</h3>
                <p className="text-slate-500 font-light text-sm italic mb-8 leading-relaxed">
                  {formula.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/formules-demenagement"
              className="text-brand-900 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:text-accent transition-colors"
            >
              Voir le détail complet des prestations
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Volume & Monte-meuble */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="max-w-4xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight text-white">
                Volume, accès et monte-meuble à Paris 9e
              </h2>

              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed mb-12 italic">
                <p>
                  Dans le 9e arrondissement, les accès par les parties communes peuvent être limités. Il est crucial d'étudier le passage en cage d'escalier ou en ascenseur pour vos meubles volumineux.
                </p>
                <p>
                  Marne Transdem propose la location de monte-meuble après une étude de faisabilité sur site. Cette solution sécurise le mobilier imposant et optimise le temps de manutention dans les rues fréquentées du secteur.
                </p>
              </div>

              <Link
                to="/location-monte-meuble-paris"
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl inline-flex items-center gap-3 transition-all"
              >
                Étudier la pose d'un monte-meuble
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Volume Calculator Block */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[3rem] shadow-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-black text-brand-900 mb-6 leading-tight">
                Estimez le volume de votre déménagement
              </h2>
              <p className="text-slate-500 font-light leading-relaxed italic mb-8">
                Préparez votre demande de devis en calculant en quelques clics le cubage nécessaire pour vos meubles et cartons.
              </p>
              <Link
                to="/calculateur-volume"
                className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl flex items-center gap-3 shrink-0 justify-center md:justify-start"
              >
                <Calculator size={22} className="text-accent" />
                Démarrer le calcul de volume
              </Link>
            </div>

            <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-2xl flex items-center justify-center text-brand-900/10">
              <Ruler size={80} />
            </div>
          </div>
        </div>
      </section>

      {/* Methode 4 etapes */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              Notre méthode en 4 étapes
            </h2>
            <p className="text-slate-500 text-lg font-light italic">
              Un processus structuré pour garantir la sécurité de vos biens à Paris 9e.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Analyse de votre projet',
                icon: ClipboardCheck,
                desc: 'Évaluation de vos besoins, calendrier et contraintes d’accès spécifiques au 9e.',
              },
              {
                title: 'Évaluation volume & accès',
                icon: Ruler,
                desc: 'Détermination du cubage et étude technique du site (étage, cour, stationnement).',
              },
              {
                title: 'Choix formule & planning',
                icon: Calendar,
                desc: 'Validation de la prestation retenue et fixation de la date d’intervention.',
              },
              {
                title: 'Déménagement & Installation',
                icon: Truck,
                desc: 'Manutention professionnelle, transport sécurisé et emménagement soigné.',
              },
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-brand-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500 shadow-xl">
                  <step.icon size={32} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent text-brand-900 rounded-full flex items-center justify-center font-black text-xs">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-4">{step.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed px-4 italic">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage local */}
      <section className="py-24 border-t border-slate-100 bg-slate-50" id="maillage-local">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-brand-900 font-display">Autres secteurs proches</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center font-display text-slate-500">
            <Link to="/demenagement-paris-8" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 8e</Link>
            <Link to="/demenagement-paris-10" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 10e</Link>
            <Link to="/demenagement-paris-17" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 17e</Link>
            <Link to="/demenagement-paris-18" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 18e</Link>
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

      {/* CTA Section */}
      <section className="py-24 bg-accent relative overflow-hidden font-display text-brand-900">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Préparez votre déménagement à Paris 9e
          </h2>
          <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto font-light italic">
            Demandez dès aujourd'hui votre devis personnalisé pour bénéficier d'une prestation premium adaptée à vos besoins.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/demande-de-devis"
              className="bg-brand-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-hover transition-all flex items-center gap-3 shadow-2xl"
            >
              Demander mon devis gratuit
              <ArrowRight size={24} />
            </Link>

            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="font-black text-2xl flex items-center gap-3 border-b-2 border-brand-900/20 hover:border-brand-900 transition-all pb-1"
            >
              <Phone size={24} />
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      </section>

      {/* FAQ Locale */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              FAQ Déménagement Paris 9e
            </h2>
            <p className="text-slate-500 font-light italic">
              Vos questions fréquentes sur l'organisation de votre projet dans le 9ème.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-200">
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

      {/* Interior Navigation */}
      <section className="py-24 border-t border-slate-100 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Accès direct
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/demande-de-devis" className="hover:text-accent transition-colors">
                    Demander un devis
                  </Link>
                </li>
                <li>
                  <Link to="/calculateur-volume" className="hover:text-accent transition-colors">
                    Cubage déménagement
                  </Link>
                </li>
                <li>
                  <Link to="/formules-demenagement" className="hover:text-accent transition-colors">
                    Nos formules de service
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Prestations
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-colors">
                    Particuliers
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-colors">
                    Entreprises
                  </Link>
                </li>
                <li>
                  <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-colors">
                    Monte-meuble
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Logistique
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/garde-meuble-paris" className="hover:text-accent transition-colors">
                    Garde-meuble
                  </Link>
                </li>
                <li>
                  <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-colors">
                    Protection & Emballage
                  </Link>
                </li>
                <li>
                  <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">
                    Cartons professionnels
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Zones Proches
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/demenagement-paris-8" className="hover:text-accent transition-colors">
                    Paris 8e
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-paris-10" className="hover:text-accent transition-colors">
                    Paris 10e
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-paris-17" className="hover:text-accent transition-colors">
                    Paris 17e
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-paris-18" className="hover:text-accent transition-colors">
                    Paris 18e
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Marne Transdem
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/contact" className="hover:text-accent transition-colors">
                    Nous contacter
                  </Link>
                </li>
                <li className="text-slate-400 italic text-xs leading-relaxed">
                  43 rue des Maraîchers, 75020 Paris
                </li>
                <li>
                   <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalParis9;
