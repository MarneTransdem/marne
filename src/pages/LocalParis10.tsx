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
  ShieldCheck,
  Box,
  Briefcase,
  Store,
  Home,
  Archive,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalParis10: React.FC = () => {
  const path = '/demenagement-paris-10';

  const faqs = [
    {
      q: 'Comment organiser un déménagement à Paris 10e ?',
      a: "Un déménagement dans le 10e arrondissement demande une bonne préparation des accès, du volume et du stationnement. Les rues fréquentées, les immeubles anciens, les escaliers étroits ou les ascenseurs limités peuvent influencer l’organisation. Marne Transdem vous accompagne pour évaluer les contraintes et choisir la formule la plus adaptée à votre projet.",
    },
    {
      q: 'Marne Transdem intervient-elle dans tout le 10e arrondissement ?',
      a: "Oui, Marne Transdem accompagne les projets de déménagement dans le 10e arrondissement de Paris, selon les besoins du projet, le volume à transporter et les contraintes d’accès. Nous intervenons aussi dans les secteurs proches comme Paris 9e, Paris 11e, Paris 18e, Paris 19e et les arrondissements voisins.",
    },
    {
      q: 'Peut-on demander un monte-meuble à Paris 10e ?',
      a: "Oui, l’utilisation d’un monte-meuble peut être envisagée à Paris 10e lorsque les meubles volumineux ne passent pas facilement par les escaliers ou les ascenseurs. Sa mise en place dépend toutefois de la configuration de la rue, de la façade, des accès et des conditions techniques du projet.",
    },
    {
      q: 'Quelle formule choisir pour un déménagement à Paris 10e ?',
      a: "Le choix de la formule dépend du temps que vous souhaitez consacrer à la préparation, du volume à déménager et de la nature de vos biens. La formule Économique convient si vous préparez vos cartons, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage de préparation selon la prestation choisie.",
    },
    {
      q: 'Comment obtenir un devis pour un déménagement à Paris 10e ?',
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte votre volume, vos adresses, les accès, les étages, l’éventuel besoin de monte-meuble et le niveau d’accompagnement souhaité.",
    },
  ];

  const services = [
    {
      title: 'Déménagement Particuliers',
      path: '/demenagement-particuliers-paris',
      desc: 'Studios, appartements, logements familiaux et résidences dans le 10e.',
    },
    {
      title: 'Déménagement Entreprises',
      path: '/demenagement-entreprises-paris',
      desc: 'Bureaux, commerces, agences, cabinets et indépendants.',
    },
    {
      title: 'Garde-meuble / Stockage',
      path: '/garde-meuble-paris',
      desc: 'Solution utile en cas de transition, travaux ou manque d’espace.',
    },
    {
      title: 'Location Monte-meuble',
      path: '/location-monte-meuble-paris',
      desc: 'Étude des accès pour les meubles volumineux selon faisabilité.',
    },
    {
      title: 'Emballage & Protection',
      path: '/emballage-protection-demenagement',
      desc: 'Protection des meubles, objets fragiles, cartons et effets personnels.',
    },
    {
      title: 'Cartons & Matériel',
      path: '/cartons-demenagement-paris',
      desc: 'Matériel adapté pour préparer votre déménagement avec méthode.',
    },
    {
      title: 'Formules de déménagement',
      path: '/formules-demenagement',
      desc: 'Économique, Standard ou Luxe selon votre budget et vos besoins.',
    },
    {
      title: 'Calculateur Volume',
      path: '/calculateur-volume',
      desc: 'Estimez votre volume indicatif avant de demander un devis.',
    },
  ];

  const constraints = [
    {
      title: 'Rues fréquentées',
      desc: "Le 10e arrondissement demande une organisation attentive en raison de la circulation, des rues animées et des contraintes de stationnement.",
      icon: MapPin,
    },
    {
      title: 'Immeubles anciens',
      desc: "Certains immeubles peuvent présenter des escaliers étroits, des ascenseurs limités ou des parties communes à protéger.",
      icon: Building2,
    },
    {
      title: 'Commerces et bureaux',
      desc: "Les locaux professionnels nécessitent souvent une coordination précise pour limiter les perturbations dans l’activité.",
      icon: Store,
    },
    {
      title: 'Meubles volumineux',
      desc: "Les canapés, armoires, bibliothèques ou équipements professionnels peuvent nécessiter une étude de passage.",
      icon: Box,
    },
    {
      title: 'Monte-meuble éventuel',
      desc: "Un monte-meuble peut être envisagé selon la configuration de la façade, de la rue et des accès.",
      icon: Zap,
    },
    {
      title: 'Cartons et volume',
      desc: "Une estimation du volume et une préparation progressive des cartons permettent de mieux organiser le jour du déménagement.",
      icon: Package,
    },
  ];

  const nearbySectors = [
    { label: 'Déménagement Paris 9e', path: '/demenagement-paris-9' },
    { label: 'Déménagement Paris 11e', path: '/demenagement-paris-11' },
    { label: 'Déménagement Paris 18e', path: '/demenagement-paris-18' },
    { label: 'Déménagement Paris 19e', path: '/demenagement-paris-19' },
    { label: 'Déménagement Paris 3e', path: '/demenagement-paris-3' },
    { label: 'Déménagement Paris 2e', path: '/demenagement-paris-2' },
    { label: 'Déménagement Île-de-France', path: '/demenagement-ile-de-france' },
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <SEO
        title="Déménagement Paris 10e | Marne Transdem"
        description="Préparez votre déménagement à Paris 10e avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: 'Accueil', item: '/' },
            { name: 'Secteurs', item: '#' },
            { name: 'Déménagement Paris 10e', item: path },
          ]),
        ]}
      />

      {/* Hero */}
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
                Paris 10e
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
                Paris 10e
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Paris 10e, avec une organisation adaptée aux appartements, commerces, bureaux et contraintes d’accès du centre-est parisien.
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

      {/* Introduction locale */}
      <section className="py-24 lg:py-32 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Votre déménagement dans le 10e arrondissement de Paris
              </h2>

              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed">
                <p>
                  Le <span className="font-bold text-slate-700">Paris 10e</span> est un arrondissement dense, vivant et très urbain, où se croisent <span className="font-bold text-slate-700">appartements</span>, <span className="font-bold text-slate-700">studios</span>, logements familiaux, <span className="font-bold text-slate-700">immeubles anciens</span>, bureaux, commerces, agences et cabinets professionnels. Un déménagement dans ce secteur demande une organisation attentive, notamment lorsque les accès sont contraints ou que les rues sont très fréquentées.
                </p>

                <p>
                  Marne Transdem accompagne les projets de déménagement à Paris 10e en tenant compte du <span className="font-bold text-slate-700">volume</span>, des <span className="font-bold text-slate-700">étages</span>, des escaliers, des <span className="font-bold text-slate-700">ascenseurs</span>, du stationnement et du niveau d’accompagnement souhaité. La proximité avec <span className="font-bold text-slate-700">Paris 9e</span>, <span className="font-bold text-slate-700">Paris 11e</span>, <span className="font-bold text-slate-700">Paris 18e</span>, <span className="font-bold text-slate-700">Paris 19e</span>, <span className="font-bold text-slate-700">Paris 3e</span> et <span className="font-bold text-slate-700">Paris 2e</span> permet aussi d’organiser des déménagements dans tout le centre-est parisien.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
                <img
                  src="/images/demenagement-paris-10.jpg"
                  alt="Déménagement Paris 10e - organisation d’un déménagement en appartement"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi une bonne préparation */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden font-display">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight text-white underline decoration-accent/20 underline-offset-8">
              Pourquoi un déménagement à Paris 10e demande une bonne préparation
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed italic">
              Entre rues fréquentées, immeubles anciens, commerces et accès parfois limités, l’anticipation reste essentielle.
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

      {/* Services */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              Nos services de déménagement à Paris 10e
            </h2>
            <p className="text-slate-500 font-light text-lg italic">
              Des solutions adaptées aux particuliers, aux professionnels et aux accès urbains du 10e arrondissement.
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

      {/* Particuliers */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="/images/demenagement-appartement-92.jpg"
                  alt="Déménagement de particuliers à Paris 10e"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Déménagement de particuliers à Paris 10e
              </h2>

              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Marne Transdem accompagne les particuliers pour les déménagements d’appartements, studios, logements familiaux ou résidences situés dans le 10e arrondissement. Selon le volume et les accès, nous vous aidons à choisir une organisation adaptée à votre logement et à votre disponibilité.
                </p>
                <p>
                  La préparation peut inclure le tri, la mise en cartons, la protection des meubles, l’attention portée aux objets fragiles et l’étude des accès : escalier, ascenseur, cave, cour intérieure ou stationnement. Le choix de la formule permet ensuite d’ajuster le niveau d’accompagnement souhaité.
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

      {/* Entreprises */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight">
                Déménagement d’entreprises à Paris 10e
              </h2>

              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic border-l-4 border-accent/20 pl-6">
                <p>
                  Le 10e arrondissement accueille de nombreux commerces, bureaux, agences, cabinets et indépendants. Un transfert professionnel dans ce secteur demande une coordination claire pour organiser le mobilier, les archives, le matériel informatique et les contraintes d’accès.
                </p>
                <p>
                  Marne Transdem accompagne les entreprises dans la préparation du planning, l’organisation de la manutention et l’adaptation du déménagement aux contraintes d’activité. L’objectif est de faciliter la transition vers vos nouveaux locaux dans les meilleures conditions possibles.
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
                  src="/images/demenagement-paris-intra-muros.jpg"
                  alt="Transfert de bureaux à Paris 10e"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-900/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Formules */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              Formules adaptées à votre projet
            </h2>
            <p className="text-slate-500 text-lg font-light italic">
              Choisissez le niveau d’accompagnement selon votre budget, votre volume et le temps disponible pour préparer votre déménagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Économique',
                desc: 'Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport selon le projet.',
              },
              {
                name: 'Standard',
                desc: 'Une formule équilibrée pour déléguer certains éléments comme les objets fragiles ou certains meubles selon les besoins.',
              },
              {
                name: 'Luxe',
                desc: "Une formule plus complète pour déléguer davantage de préparation, d’emballage et d’organisation selon la prestation choisie.",
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
                    Le plus équilibré
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
              Découvrir le détail des formules
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Volume / accès / monte-meuble */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <div className="max-w-4xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight text-white">
                Volume, accès et monte-meuble à Paris 10e
              </h2>

              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed mb-12 italic">
                <p>
                  Dans le 10e arrondissement, le volume à déménager doit être analysé avec les accès disponibles : étage, ascenseur, hall d’immeuble, cage d’escalier, cave, cour intérieure, rue fréquentée ou stationnement.
                </p>
                <p>
                  Si certains meubles volumineux ne peuvent pas passer par les accès classiques, un monte-meuble peut être envisagé selon la faisabilité technique. Cette étude permet de mieux préparer l’intervention et d’adapter les moyens nécessaires.
                </p>
              </div>

              <Link
                to="/location-monte-meuble-paris"
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl inline-flex items-center gap-3 transition-all"
              >
                En savoir plus sur le monte-meuble
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculateur */}
      <section className="py-24 bg-slate-50 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[3rem] shadow-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-black text-brand-900 mb-6 leading-tight">
                Estimez le volume de votre déménagement
              </h2>
              <p className="text-slate-500 font-light leading-relaxed italic mb-8">
                Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux.
              </p>
              <Link
                to="/calculateur-volume"
                className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl flex items-center gap-3 shrink-0 justify-center md:justify-start"
              >
                <Calculator size={22} className="text-accent" />
                Utiliser le calculateur de volume
              </Link>
            </div>

            <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-2xl flex items-center justify-center text-brand-900/10">
              <Calculator size={80} />
            </div>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              Notre méthode en 4 étapes
            </h2>
            <p className="text-slate-500 text-lg font-light italic">
              Une organisation claire pour préparer votre déménagement à Paris 10e.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: 'Analyse de votre projet',
                icon: ClipboardCheck,
                desc: 'Échange sur vos besoins, vos dates, vos adresses et vos contraintes principales.',
              },
              {
                title: 'Évaluation volume & accès',
                icon: Ruler,
                desc: 'Estimation du volume et étude des accès : étage, ascenseur, escalier, stationnement.',
              },
              {
                title: 'Choix formule & organisation',
                icon: Calendar,
                desc: 'Choix de la formule et préparation de l’intervention selon votre niveau d’accompagnement.',
              },
              {
                title: 'Réalisation du déménagement',
                icon: Truck,
                desc: 'Manutention, transport et installation selon l’organisation définie avec vous.',
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

      {/* Secteurs proches */}
      <section className="py-24 border-t border-slate-100 bg-slate-50" id="maillage-local">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-brand-900 font-display">Autres secteurs proches</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center font-display text-slate-500">
            <Link to="/demenagement-paris-9" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 9e</Link>
            <Link to="/demenagement-paris-11" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 11e</Link>
            <Link to="/demenagement-paris-18" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 18e</Link>
            <Link to="/demenagement-paris-19" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 19e</Link>
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

      {/* CTA */}
      <section className="py-24 bg-accent relative overflow-hidden font-display text-brand-900">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Vous préparez un déménagement à Paris 10e ?
          </h2>
          <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto font-light italic">
            Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d’accompagnement souhaité.
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

      {/* FAQ */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6">
              FAQ Déménagement Paris 10e
            </h2>
            <p className="text-slate-500 font-light italic">
              Nos réponses pour préparer votre projet dans le 10e arrondissement.
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

      {/* Maillage interne final */}
      <section className="py-24 border-t border-slate-100 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Accès rapide
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/demande-de-devis" className="hover:text-accent transition-colors">
                    Demande de devis
                  </Link>
                </li>
                <li>
                  <Link to="/calculateur-volume" className="hover:text-accent transition-colors">
                    Calculateur de volume
                  </Link>
                </li>
                <li>
                  <Link to="/formules-demenagement" className="hover:text-accent transition-colors">
                    Nos formules
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Services
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-colors">
                    Déménagement Particuliers
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-colors">
                    Déménagement Entreprises
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
                    Emballage & Protection
                  </Link>
                </li>
                <li>
                  <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">
                    Cartons & Matériel
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Secteurs proches
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/demenagement-paris-9" className="hover:text-accent transition-colors">
                    Paris 9e
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-paris-11" className="hover:text-accent transition-colors">
                    Paris 11e
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-paris-18" className="hover:text-accent transition-colors">
                    Paris 18e
                  </Link>
                </li>
                <li>
                  <Link to="/demenagement-paris-19" className="hover:text-accent transition-colors">
                    Paris 19e
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">
                Contact
              </h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <Link to="/contact" className="hover:text-accent transition-colors">
                    Contactez Marne Transdem
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

export default LocalParis10;