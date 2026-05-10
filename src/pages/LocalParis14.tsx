import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Phone, MapPin, Building2, Package, 
  Calculator, Truck, Ruler, Calendar, ClipboardCheck, 
  HelpCircle, Zap, ShieldCheck, Box, UserCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalParis14: React.FC = () => {
  const path = "/demenagement-paris-14";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Paris 14e ?", 
      a: "Un déménagement dans le 14e arrondissement demande d'anticiper la diversité des quartiers, du dynamisme de Montparnasse au calme résidentiel du Parc Montsouris. Marne Transdem vous aide à évaluer le volume de vos biens et les contraintes d'accès (ascenseurs, escaliers, stationnement) pour une organisation sans faille." 
    },
    { 
      q: "Marne Transdem intervient-elle dans tout le 14e arrondissement ?", 
      a: "Oui, nous intervenons dans tous les quartiers du 14e : Montparnasse, Parc-de-Montsouris, Petit-Montrouge, Plaisance, ainsi qu'autour d'Alésia, Denfert-Rochereau et de la Cité Universitaire." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Paris 14e ?", 
      a: "Absolument. Selon la configuration de votre rue et de votre immeuble (notamment pour les appartements aux étages élevés avec ascenseurs limités), nous étudions la mise à disposition d'un monte-meuble. La faisabilité technique est vérifiée lors de l'étude préalable à votre domicile." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Paris 14e ?", 
      a: "Nous proposons trois formules : Économique (manutention et transport), Standard (équilibre avec emballage fragile) et Luxe (clé en main). Le choix dépend de votre volume et de votre souhait de déléguer la préparation à nos experts." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Paris 14e ?", 
      a: "Vous pouvez remplir notre formulaire en ligne ou nous appeler directement. Nous réalisons une évaluation gratuite et personnalisée basée sur votre volume réel et les spécificités d'accès de vos adresses." 
    }
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <SEO 
        title="Déménagement Paris 14e | Marne Transdem"
        description="Préparez votre déménagement à Paris 14e avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "#" },
            { name: "Déménagement Paris 14e", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-slate-300">Secteurs</span>
              <span>/</span>
              <span className="text-accent underline decoration-accent/20 underline-offset-4 font-black">Paris 14e</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm mb-8 border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-900 font-display">Déménagement local</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-8 leading-[1.1] tracking-tight font-display">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Paris 14e</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl italic font-display">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Paris 14e, avec une organisation adaptée aux appartements, résidences, bureaux et contraintes d'accès du sud parisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link 
                to="/demande-de-devis" 
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all font-display"
              >
                Demander un devis gratuit
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3 shadow-sm font-display"
              >
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
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
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight font-display">
                Votre déménagement dans le 14e arrondissement de Paris
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed font-display">
                <p>
                  Arrondissement à la fois résidentiel, familial et urbain, le <span className="font-bold text-slate-700">Paris 14e</span> offre une grande diversité de cadres de vie. Marne Transdem accompagne les <span className="font-bold text-slate-700">particuliers</span> et les <span className="font-bold text-slate-700">entreprises</span> pour tout type de projet. Que vous déménagiez d'un <span className="font-bold text-slate-700">appartement</span> familial proche de la place Denfert-Rochereau, d'un <span className="font-bold text-slate-700">studio</span> étudiant ou de <span className="font-bold text-slate-700">bureaux</span> à Montparnasse, nous maîtrisons les contraintes spécifiques du secteur.
                </p>
                <p>
                  Notre connaissance du sud parisien et de la proximité avec <span className="font-bold text-slate-700">Paris 13e</span>, <span className="font-bold text-slate-700">15e</span>, <span className="font-bold text-slate-700">6e</span>, <span className="font-bold text-slate-700">Montrouge</span>, <span className="font-bold text-slate-700">Malakoff</span> et <span className="font-bold text-slate-700">Vanves</span> permet d'anticiper les flux logistiques. Chaque intervention fait l'objet d'une <span className="font-bold text-slate-700">estimation du volume</span> et d'une analyse des <span className="font-bold text-slate-700">accès d'immeubles</span> : gestion des <span className="font-bold text-slate-700">étages</span>, utilisation des <span className="font-bold text-slate-700">ascenseurs</span> ou des <span className="font-bold text-slate-700">escaliers</span>, et organisation du <span className="font-bold text-slate-700">stationnement</span> pour votre <span className="font-bold text-slate-700">demande de devis</span>.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
                <img 
                  src="https://images.unsplash.com/photo-1549410148-5226fe784be6?auto=format&fit=crop&q=80&w=800" 
                  alt="Déménagement Paris 14" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi une bonne préparation */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight text-white underline decoration-accent/20 underline-offset-8">Pourquoi un déménagement à Paris 14e demande une bonne préparation</h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed italic">
              Un arrondissement urbain dense demande une anticipation rigoureuse pour une transition fluide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Volumes Variables", 
                desc: "Gestion adaptée aux studios comme aux logements familiaux avec une estimation précise du volume réel.",
                icon: Box 
              },
              { 
                title: "Accès & Manutention", 
                desc: "Étude des escaliers, ascenseurs et des gabarits de mobilier pour une manutention sans risque.",
                icon: Building2 
              },
              { 
                title: "Protection Communes", 
                desc: "Mise en place de protections pour les cages d'escalier et les halls afin de préserver votre environnement.",
                icon: ShieldCheck 
              },
              { 
                title: "Caves & Stockage", 
                desc: "Prise en compte des volumes stockés en cave ou espace de stockage secondaire pour ne rien oublier.",
                icon: Package 
              },
              { 
                title: "Monte-meuble externe", 
                desc: "Recours éventuel à un monte-meuble selon la configuration de votre rue et de votre façade.",
                icon: Zap 
              },
              { 
                title: "Stationnement", 
                desc: "Anticipation de l'emplacement de nos camions pour garantir une logistique efficace le jour J.",
                icon: Truck 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm group hover:border-accent transition-all">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-brand-900 transition-all text-accent">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors font-display">{item.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">Nos services de déménagement à Paris 14e</h2>
            <p className="text-slate-500 font-light text-lg italic font-display">Une expertise complète pour tous vos besoins de transition.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Déménagement Particuliers", path: "/demenagement-particuliers-paris", desc: "Studios, appartements familiaux et résidences." },
              { title: "Déménagement Entreprises", path: "/demenagement-entreprises-paris", desc: "Bureaux, commerces, cabinets et agences du sud parisien." },
              { title: "Garde-meuble / Stockage", path: "/garde-meuble-paris", desc: "Solutions de stockage sécurisées pour vos effets." },
              { title: "Location Monte-meuble", path: "/location-monte-meuble-paris", desc: "Service extérieur selon accès et faisabilité tecnica." },
              { title: "Emballage & Protection", path: "/emballage-protection-demenagement", desc: "Protection soignée pour votre mobilier et objets fragiles." },
              { title: "Cartons & Matériel", path: "/cartons-demenagement-paris", desc: "Fourniture de cartons et matériel professionnel." },
              { title: "Formules de déménagement", path: "/formules-demenagement", desc: "Trois niveaux de service adaptés à votre projet réel." },
              { title: "Calculateur Volume", path: "/calculateur-volume", desc: "Estimez gratuitement votre volume avant votre devis." }
            ].map((service, i) => (
              <Link 
                key={i} 
                to={service.path}
                className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <h4 className="text-lg font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors leading-tight font-display">{service.title}</h4>
                <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 italic font-display">{service.desc}</p>
                <div className="flex items-center gap-2 text-brand-900 font-black text-[10px] uppercase tracking-widest font-display">
                  En savoir plus <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1571404118318-0524edebbc2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Déménagement particuliers Paris 14" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight font-display">
                Déménagement de particuliers à Paris 14e
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic font-display">
                <p>
                  Marne Transdem accompagne les particuliers pour les déménagements de studios, appartements familiaux, résidences ou maisons dans le 14e arrondissement. Nous préconisons un <span className="font-bold text-slate-700">tri avant déménagement</span> pour anticiper votre installation dans votre nouveau foyer.
                </p>
                <p>
                  De la <span className="font-bold text-slate-700">préparation des cartons</span> à la <span className="font-bold text-slate-700">protection des meubles</span>, nous veillons à la sécurité de vos <span className="font-bold text-slate-700">objets fragiles</span>. Selon votre <span className="font-bold text-slate-700">estimation du volume</span> et les contraintes d'accès (<span className="font-bold text-slate-700">ascenseur</span>, <span className="font-bold text-slate-700">étages</span>, <span className="font-bold text-slate-700">cave</span>), vous pouvez choisir la <span className="font-bold text-slate-700">formule</span> la plus adaptée à vos besoins.
                </p>
              </div>
              <Link 
                to="/demande-de-devis" 
                className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl items-center gap-3 transition-all font-display"
              >
                Demander mon devis
                <ArrowRight size={22} className="text-accent" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-brand-900">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight font-display">
                Déménagement d’entreprises à Paris 14e
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic font-display">
                <p>
                  Nous accompagnons les entreprises, bureaux, agences, cabinets professionnels et professions libérales dans leurs transferts à Paris 14e. Notre objectif est de garantir une <span className="font-bold text-slate-700">continuité d'activité</span> optimale grâce à un <span className="font-bold text-slate-700">planning</span> rigoureux.
                </p>
                <p>
                  Nos équipes gèrent la manutention de votre <span className="font-bold text-slate-700">mobilier de bureau</span>, de vos <span className="font-bold text-slate-700">archives</span> et de votre <span className="font-bold text-slate-700">matériel informatique</span>. Nous analysons l'<span className="font-bold text-slate-700">organisation</span> et les conditions d'<span className="font-bold text-slate-700">accès et manutention</span> propres aux <span className="font-bold text-slate-700">locaux professionnels</span> du sud parisien et des <span className="font-bold text-slate-700">communes voisines</span>.
                </p>
              </div>
              <Link 
                to="/demenagement-entreprises-paris" 
                className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl items-center gap-3 transition-all font-display"
              >
                Organiser un transfert professionnel
                <ArrowRight size={22} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Déménagement entreprises Paris 14" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-900/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Formules */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">Formules adaptées à votre projet</h2>
            <p className="text-slate-500 text-lg font-light italic font-display">Choisissez le niveau d'accompagnement souhaité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Économique", 
                desc: "Vous préparez vos cartons, Marne Transdem prend en charge la manutention et le transport selon le projet." 
              },
              { 
                name: "Standard", 
                desc: "Une formule équilibrée pour déléguer certains éléments comme les objets fragiles ou certains meubles selon les besoins." 
              },
              { 
                name: "Luxe", 
                desc: "Une formule plus complète pour déléguer davantage de préparation, d'emballage et d'organisation selon la prestation choisie." 
              }
            ].map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-brand-900 font-black text-2xl mb-8">
                  {i+1}
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-4 font-display">{f.name}</h3>
                <p className="text-slate-500 font-light text-sm italic mb-8 leading-relaxed font-display">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/formules-demenagement" className="text-brand-900 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:text-accent transition-colors font-display">
              Découvrir le détail des formules <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès, stationnement, monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-brand-900">
          <div className="bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="max-w-4xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight font-display text-white">Volume, accès et monte-meuble à Paris 14e</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed mb-12 italic font-display">
                <p>
                  Dans le 14e arrondissement, chaque projet demande une étude attentive des accès. Le <span className="text-white font-medium">volume à déménager</span>, associé à la présence d'un <span className="text-white font-medium">étage</span> élevé ou d'un <span className="text-white font-medium">ascenseur</span> exigu, influence directement la logistique de votre journée.
                </p>
                <p>
                  Nous analysons systématiquement le <span className="text-white font-medium">hall d'immeuble</span>, la <span className="text-white font-medium">cage d'escalier</span>, l'accès à la <span className="text-white font-medium">cave</span>, à la <span className="text-white font-medium">cour intérieure</span> ou au <span className="text-white font-medium">parking</span>. Pour les <span className="text-white font-medium">meubles volumineux</span> ne passant pas par les ouvertures classiques or pour optimiser l'<span className="text-white font-medium">accès depuis la rue</span>, nous étudions le <span className="text-white font-medium">besoin éventuel de monte-meuble</span> selon la faisabilité technique.
                </p>
              </div>
              <Link 
                to="/location-monte-meuble-paris" 
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl inline-flex items-center gap-3 transition-all font-display"
              >
                En savoir plus sur le monte-meuble
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[3rem] shadow-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-black text-brand-900 mb-6 leading-tight font-display">Estimez le volume de votre déménagement</h2>
              <p className="text-slate-500 font-light leading-relaxed italic mb-8 font-display">
                Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux.
              </p>
              <Link 
                to="/calculateur-volume" 
                className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl flex items-center gap-3 shrink-0 font-display"
              >
                <Calculator size={22} className="text-accent" />
                Utiliser le calculateur de volume
              </Link>
            </div>
            <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-2xl flex items-center justify-center">
              <Calculator size={80} className="text-brand-900/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Notre méthode */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">Notre méthode en 4 étapes</h2>
            <p className="text-slate-500 text-lg font-light italic font-display">Une organisation pour une transition fluide et sécurisée.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Analyse de votre projet", icon: ClipboardCheck, desc: "Échange sur vos besoins spécifiques, vos dates et vos contraintes logistiques." },
              { title: "Évaluation volume & accès", icon: Ruler, desc: "Visite technique pour calibrer precisement les moyens humains et matériels." },
              { title: "Choix formule & organisation", icon: Calendar, desc: "Validation de la prestation retenue et planification de l'intervention." },
              { title: "Réalisation du déménagement", icon: Truck, desc: "Exécution soignée par nos équipes expertes dans le respect du planning." }
            ].map((step, i) => (step.icon &&
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-brand-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500 shadow-xl text-white">
                  <step.icon size={32} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent text-brand-900 rounded-full flex items-center justify-center font-black text-xs">
                    {i+1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-4 font-display">{step.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed px-4 italic font-display">{step.desc}</p>
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
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center font-display text-slate-500">
            <Link to="/demenagement-paris-13" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 13e</Link>
            <Link to="/demenagement-paris-15" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 15e</Link>
            <Link to="/demenagement-essonne" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Essonne</Link>
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

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 font-display text-brand-900">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Vous préparez un déménagement à Paris 14e ?</h2>
          <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto font-light italic">
            Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d'accompagnement souhaité.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-hover transition-all flex items-center gap-3 shadow-2xl font-display">
              Demander mon devis gratuit
              <ArrowRight size={24} />
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="font-black text-2xl flex items-center gap-3 border-b-2 border-brand-900/20 hover:border-brand-900 transition-all pb-1">
              <Phone size={24} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">FAQ Déménagement Paris 14e</h2>
            <p className="text-slate-500 font-light italic font-display">Nos réponses pour préparer votre projet sereinement dans le 14e.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-200">
                <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-4 font-display text-brand-900">
                  <HelpCircle className="text-accent shrink-0 mt-1" size={22} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 italic border-l-2 border-accent/20 font-display">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Maillage interne final */}
      <section className="py-24 border-t border-slate-100 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Accès Rapide</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/demande-de-devis" className="text-slate-500 hover:text-accent transition-colors">Demande de devis</Link></li>
                <li><Link to="/calculateur-volume" className="text-slate-500 hover:text-accent transition-colors">Calculateur de volume</Link></li>
                <li><Link to="/formules-demenagement" className="text-slate-500 hover:text-accent transition-colors">Nos formules</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Services</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/demenagement-particuliers-paris" className="text-slate-500 hover:text-accent transition-colors">Déménagement Particuliers</Link></li>
                <li><Link to="/demenagement-entreprises-paris" className="text-slate-500 hover:text-accent transition-colors">Déménagement Entreprises</Link></li>
                <li><Link to="/location-monte-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Monte-meuble</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Logistique</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/garde-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Garde-meuble</Link></li>
                <li><Link to="/emballage-protection-demenagement" className="text-slate-500 hover:text-accent transition-colors">Emballage & Protection</Link></li>
                <li><Link to="/cartons-demenagement-paris" className="text-slate-500 hover:text-accent transition-colors">Cartons & Matériel</Link></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30">Plus d'infos</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="text-slate-500 hover:text-accent transition-colors">Contactez Marne Transdem</Link></li>
                <li className="text-slate-400 italic text-xs leading-relaxed">43 rue des Maraîchers, 75020 Paris</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalParis14;
