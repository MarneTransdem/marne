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

const LocalCourbevoie: React.FC = () => {
  const path = "/demenagement-courbevoie";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Courbevoie ?", 
      a: "Un déménagement à Courbevoie demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité." 
    },
    { 
      q: "Marne Transdem intervient-elle à Courbevoie et dans les villes proches ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Courbevoie et dans les secteurs proches comme La Défense, Puteaux, Neuilly-sur-Seine, Levallois-Perret, Nanterre, Asnières-sur-Seine, Clichy et plus largement dans les Hauts-de-Seine selon les besoins du projet." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Courbevoie ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Courbevoie ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Courbevoie ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <SEO 
        title="Déménagement Courbevoie | Marne Transdem"
        description="Préparez votre déménagement à Courbevoie avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Courbevoie", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden text-slate-900 font-display">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors">Secteurs</Link>
              <span>/</span>
              <span className="text-accent underline decoration-accent/20 underline-offset-4 font-black">Courbevoie</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm mb-8 border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-900 font-display">Déménagement local</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-8 leading-[1.1] tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
              Déménagement <br/>
              Courbevoie
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl italic font-display">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Courbevoie, avec une organisation adaptée aux appartements, résidences, bureaux, sièges, commerces et contraintes d’accès de l’ouest parisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 font-display">
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

      {/* 2. Introduction locale */}
      <section className="py-24 lg:py-32 font-display">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 font-display">
              <div className="inline-block px-4 py-1.5 bg-brand-900/5 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-900 italic">Secteur Stratégique</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 font-display">
                Votre déménagement à Courbevoie
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic font-display text-slate-900">
                <p>
                  Ville stratégique des <span className="font-bold text-slate-700">Hauts-de-Seine</span>, Courbevoie se situe au cœur d'un environnement urbain et économique majeur. Marne Transdem accompagne les <span className="font-bold text-slate-700">particuliers</span> et les <span className="font-bold text-slate-700">entreprises</span> dans leurs projets de mobilité. Notre proximité immédiate avec <span className="font-bold text-slate-700">La Défense</span>, <span className="font-bold text-slate-700">Puteaux</span>, <span className="font-bold text-slate-700">Neuilly-sur-Seine</span>, <span className="font-bold text-slate-700">Levallois-Perret</span> et <span className="font-bold text-slate-700">Nanterre</span> nous permet d'organiser des interventions fluides dans tout l'ouest parisien, y compris vers <span className="font-bold text-slate-700">Asnières-sur-Seine</span> et <span className="font-bold text-slate-700">Paris 17e</span>.
                </p>
                <p>
                  Qu'il s'agisse d'un <span className="font-bold text-slate-700">appartement</span>, d'un <span className="font-bold text-slate-700">studio</span> ou d'une <span className="font-bold text-slate-700">résidence</span> familiale récente, ou du transfert de <span className="font-bold text-slate-700">bureaux</span>, <span className="font-bold text-slate-700">sièges d'entreprises</span>, <span className="font-bold text-slate-700">commerces</span> ou <span className="font-bold text-slate-700">cabinets professionnels</span>, nous maîtrisons les spécificités logistiques. Nous anticipons les <span className="font-bold text-slate-700">accès d'immeubles</span> (ascenseurs, escaliers), les contraintes de <span className="font-bold text-slate-700">stationnement</span> et l'estimation rigoureuse du <span className="font-bold text-slate-700">volume</span> pour une <span className="font-bold text-slate-700">demande de devis</span> sur-mesure.
                </p>
              </div>
            </div>
            <div className="relative font-display">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
                <img 
                  src="/images/transfert-bureau-hauts-de-seine.jpg" 
                  alt="Déménagement Courbevoie" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi une bonne préparation ? */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden font-display">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white text-center">
          <div className="max-w-3xl mb-20 mx-auto font-display">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 text-white font-display">Organisation & Logistique</h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed italic font-display text-white">
              La densité de Courbevoie et sa proximité avec le quartier d'affaires de La Défense imposent une organisation millimétrée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white text-left font-display">
            {[
              { 
                title: "Ville Dense & Dynamique", 
                desc: "Anticipation des flux de circulation et des accès pour une intervention efficace en zone urbaine.",
                icon: Building2 
              },
              { 
                title: "Résidences & Appartements", 
                desc: "Gestion des ascenseurs, escaliers et préservation des halls et parties communes des immeubles.",
                icon: Box 
              },
              { 
                title: "Bureaux & Sièges", 
                desc: "Organisation spécifique pour les transferts professionnels autour de La Défense avec maintien d'activité.",
                icon: ShieldCheck 
              },
              { 
                title: "Protection des Biens", 
                desc: "Emballage soigné pour le mobilier volumineux, les objets fragiles et les effets personnels précieux.",
                icon: MapPin 
              },
              { 
                title: "Accès & Monte-meuble", 
                desc: "Option de levage extérieur à envisager selon la configuration technique, les parkings ou quais de livraison.",
                icon: Zap 
              },
              { 
                title: "Manutention Spécifique", 
                desc: "Prise en charge personnalisée en cave, parking ou cours intérieures selon les contraintes du site.",
                icon: Package 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm group hover:border-accent transition-all text-white font-display">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-brand-900 transition-all font-display text-accent">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors font-display italic uppercase">{item.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm italic font-display">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nos services */}
      <section className="py-24 font-display">
        <div className="container mx-auto px-4 md:px-6 text-slate-900 text-center">
          <div className="text-center mb-16 font-display text-slate-900">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase italic underline decoration-accent/20 underline-offset-8">Nos services à Courbevoie</h2>
            <p className="text-slate-500 font-light text-lg italic font-display">Des solutions premium développées pour la vie urbaine et les besoins professionnels.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-display text-left">
            {[
              { title: "Déménagement Particuliers", path: "/demenagement-particuliers-paris", desc: "Appartements, studios, résidences et logements familiaux." },
              { title: "Déménagement Entreprises", path: "/demenagement-entreprises-paris", desc: "Bureaux, sièges, commerces, agences et professions libérales." },
              { title: "Garde-meuble / Stockage", path: "/garde-meuble-paris", desc: "Solution utile pendant une transition, des travaux ou un décalage de dates." },
              { title: "Location Monte-meuble", path: "/location-monte-meuble-paris", desc: "Solution à envisager selon les accès et la faisabilité technique." },
              { title: "Emballage & Protection", path: "/emballage-protection-demenagement", desc: "Protection des meubles, objets fragiles, cartons et effets personnels." },
              { title: "Cartons & Matériel", path: "/cartons-demenagement-paris", desc: "Préparation du déménagement avec du matériel professionnel adapté." },
              { title: "Formules de déménagement", path: "/formules-demenagement", desc: "Économique, Standard ou Luxe selon vos attentes de service." },
              { title: "Calculateur Volume", path: "/calculateur-volume", desc: "Estimation indicative du volume de vos biens avant devis." }
            ].map((service, i) => (
              <Link 
                key={i} 
                to={service.path}
                className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-500 font-display"
              >
                <h4 className="text-lg font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors leading-tight font-display italic uppercase">{service.title}</h4>
                <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 italic font-display">{service.desc}</p>
                <div className="flex items-center gap-2 text-brand-900 font-black text-[10px] uppercase tracking-widest font-display italic">
                  En savoir plus <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement de particuliers */}
      <section className="py-24 bg-slate-50 font-display text-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center font-display">
            <div className="relative order-2 lg:order-1 font-display">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="/images/demenagement-appartement-92.jpg" 
                  alt="Déménagement particuliers Courbevoie" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10 font-display"></div>
            </div>
            <div className="space-y-8 order-1 lg:order-2 font-display">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 font-display italic">
                Déménagement de particuliers à Courbevoie
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic font-display text-slate-900">
                <p>
                  Marne Transdem accompagne les particuliers pour les déménagements d'appartements, de studios, de logements familiaux et de résidences à Courbevoie. Que vous projetiez un déménagement de Courbevoie vers Paris, de Paris vers Courbevoie ou vers toute autre destination (Île-de-France ou longue distance), nous adaptons nos opérations.
                </p>
                <p>
                  Notre équipe prend en charge le <span className="font-bold text-slate-700">tri</span>, la <span className="font-bold text-slate-700">préparation des cartons</span>, la <span className="font-bold text-slate-700">protection des meubles</span> et le soin des <span className="font-bold text-slate-700">objets fragiles</span> et <span className="font-bold text-slate-700">effets personnels</span>. En fonction des <span className="font-bold text-slate-700">accès</span> (<span className="font-bold text-slate-700">ascenseur</span>, <span className="font-bold text-slate-700">cave</span>, <span className="font-bold text-slate-700">parking</span>) et de l'indicatif de <span className="font-bold text-slate-700">volume</span>, vous choisissez la <span className="font-bold text-slate-700">formule</span> idéale. Un <span className="font-bold text-slate-700">garde-meuble</span> peut ortienter votre transition.
                </p>
              </div>
              <Link 
                to="/demande-de-devis" 
                className="inline-flex bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl items-center gap-3 transition-all font-display italic"
              >
                Demander mon devis
                <ArrowRight size={22} className="text-accent font-display" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Déménagement d'entreprises */}
      <section className="py-24 font-display text-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center font-display">
            <div className="space-y-8 font-display">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 font-display italic">
                Déménagement d’entreprises à Courbevoie
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic font-display text-slate-900">
                <p>
                  Courbevoie accueille de nombreux sièges sociaux et agences à proximité de La Défense. Nous accompagnons les professionnels pour leurs transferts de bureaux, sièges, agences et commerces locaux. De la gestion du <span className="font-bold text-slate-700">mobilier professionnel</span> aux <span className="font-bold text-slate-700">archives</span> et au <span className="font-bold text-slate-700">matériel informatique</span>, nous assurons une logistique rigoureuse pour votre <span className="font-bold text-slate-700">continuité d'activité</span>.
                </p>
                <p>
                  Notre proximité avec <span className="font-bold text-slate-700">Puteaux</span>, <span className="font-bold text-slate-700">Neuilly-sur-Seine</span>, <span className="font-bold text-slate-700">Levallois-Perret</span> et <span className="font-bold text-slate-700">Nanterre</span> nous permet d'organiser des transferts fluides avec un <span className="font-bold text-slate-700">planning</span> d'intervention maîtrisé. Nous gérons les accès (quais, parkings) et proposons du <span className="font-bold text-slate-700">stockage temporaire</span> si besoin pour votre matériel professionnel.
                </p>
              </div>
              <Link 
                to="/demenagement-entreprises-paris" 
                className="inline-flex bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl items-center gap-3 transition-all font-display italic"
              >
                Organiser un transfert professionnel
                <ArrowRight size={22} className="font-display" />
              </Link>
            </div>
            <div className="relative font-display">
              <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl font-display">
                <img 
                  src="/images/transfert-bureau-hauts-de-seine.jpg" 
                  alt="Déménagement entreprises Courbevoie" 
                  className="w-full h-full object-cover font-display"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-900/10 rounded-full blur-3xl -z-10 font-display"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Formules */}
      <section className="py-24 bg-slate-50 font-display text-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 font-display">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase italic underline decoration-accent/20 underline-offset-8">Formules adaptées à votre projet</h2>
            <p className="text-slate-500 text-lg font-light italic font-display">Trois niveaux d'accompagnement pour correspondre à votre budget et vos attentes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-900 font-display">
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
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center font-display">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-brand-900 font-black text-2xl mb-8 font-display">
                  {i+1}
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-4 font-display uppercase italic">{f.name}</h3>
                <p className="text-slate-500 font-light text-sm italic mb-8 leading-relaxed font-display">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 font-display">
            <Link to="/formules-demenagement" className="inline-flex bg-brand-900 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-hover transition-all items-center gap-3 font-display">
              Comparer les formules
              <ArrowRight size={18} className="text-accent font-display" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès et monte-meuble */}
      <section className="py-24 font-display text-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl font-display">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl font-display"></div>
            
            <div className="max-w-4xl relative z-10 text-white font-display">
              <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 text-white font-display uppercase">Volume, accès et monte-meuble à Courbevoie</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed mb-12 italic font-display text-white">
                <p>
                  Certains déménagements à Courbevoie imposent une étude logistique attentive. L'urbanisme dense de la ville, avec ses <span className="text-white font-medium">immeubles récents ou anciens</span>, ses <span className="text-white font-medium">quartiers familiaux</span> et ses zones d'affaires, exige d'anticiper la manutention.
                </p>
                <p>
                  Nous analysons le <span className="text-white font-medium">volume à déménager</span>, les <span className="text-white font-medium">étages</span>, la capacité des <span className="text-white font-medium">ascenseurs</span>, la largeur des <span className="text-white font-medium">escaliers</span> et les <span className="text-white font-medium">quels de livraison</span> ou <span className="text-white font-medium">parkings</span>. Pour les meubles volumineux ou les accès intérieurs trop restreints, un <span className="text-white font-medium">monte-meuble</span> peut être envisagé selon la faisabilité technique et les conditions de <span className="text-white font-medium">stationnement</span>.
                </p>
              </div>
              <Link 
                to="/location-monte-meuble-paris" 
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl inline-flex items-center gap-3 transition-all font-display italic"
              >
                Services Monte-meuble
                <ArrowRight size={22} className="font-display" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Calculateur de volume */}
      <section className="py-24 bg-slate-50 font-display text-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[3rem] shadow-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-slate-100 font-display">
            <div className="max-w-xl text-center md:text-left font-display text-slate-900">
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 mb-6 leading-tight italic font-display uppercase italic underline decoration-accent/20 underline-offset-8">Estimez votre volume</h2>
              <p className="text-slate-500 font-light leading-relaxed italic mb-8 text-lg font-display text-slate-900">
                Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux.
              </p>
              <Link 
                to="/calculateur-volume" 
                className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl inline-flex items-center gap-3 shrink-0 font-display italic"
              >
                <Calculator size={22} className="text-accent font-display" />
                Utiliser le calculateur de volume
              </Link>
            </div>
            <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-2xl flex items-center justify-center font-display">
              <Calculator size={80} className="text-brand-900/10 font-display" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Notre méthode */}
      <section className="py-24 font-display text-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 text-slate-900 font-display">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase italic underline decoration-accent/20 underline-offset-8">Notre méthode en 4 étapes</h2>
            <p className="text-slate-500 text-lg font-light italic font-display">Un processus clair pour préparer votre déménagement à Courbevoie en toute tranquillité.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-display">
            {[
              { title: "Analyse de votre projet", icon: ClipboardCheck, desc: "Définition de vos besoins, dates et spécificités de Courbevoie." },
              { title: "Évaluation volume & accès", icon: Ruler, desc: "Analyse technique pour calibrer les moyens logistiques nécessaires." },
              { title: "Choix formule & organisation", icon: Calendar, desc: "Validation de la prestation et planification rigoureuse." },
              { title: "Réalisation du mouvement", icon: Truck, desc: "Intervention soignée et sécurisée de nos techniciens experts." }
            ].map((step, i) => (
              <div key={i} className="text-center group font-display">
                <div className="w-20 h-20 bg-brand-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500 shadow-xl font-display">
                  <step.icon size={32} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent text-brand-900 rounded-full flex items-center justify-center font-black text-xs font-display">
                    {i+1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-4 font-display italic uppercase">{step.title}</h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed px-4 italic font-display">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Secteurs proches */}
      <section className="py-24 border-t border-slate-100 bg-slate-50 font-display text-slate-900 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 font-display">
            <h2 className="text-2xl font-black text-brand-900 font-display italic uppercase underline decoration-accent/20 underline-offset-8">Autres secteurs proches</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center text-slate-500 font-display uppercase italic">
            <Link to="/demenagement-neuilly-sur-seine" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Neuilly-sur-Seine</Link>
            <Link to="/demenagement-levallois-perret" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Levallois-Perret</Link>
            <Link to="/demenagement-clichy" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Clichy</Link>
            <Link to="/demenagement-paris-17" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 17e</Link>
            <Link to="/demenagement-hauts-de-seine" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Hauts-de-Seine</Link>
            <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Île-de-France</Link>
            <span className="text-slate-300 font-bold text-sm italic font-display uppercase">Déménagement La Défense</span>
            <Link to="/demenagement-puteaux" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Puteaux</Link>
            <Link to="/demenagement-nanterre" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Nanterre</Link>
            <Link to="/demenagement-suresnes" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Suresnes</Link>
            <Link to="/demenagement-rueil-malmaison" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Rueil-Malmaison</Link>
            <Link to="/demenagement-vaucresson" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Vaucresson</Link>
            <span className="text-slate-300 font-bold text-sm italic font-display uppercase">Déménagement Asnières-sur-Seine</span>
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden font-display text-brand-900 text-center">
        <div className="container mx-auto px-4 md:px-6 relative z-10 font-display text-brand-900">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight font-display italic underline decoration-brand-900/20 underline-offset-8 uppercase">Vous préparez un déménagement à Courbevoie ?</h2>
          <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto font-light italic font-display">
            Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d’accompagnement souhaité.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center font-display">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-hover transition-all flex items-center gap-3 shadow-2xl font-display italic">
              Demander mon devis gratuit
              <ArrowRight size={24} className="font-display" />
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-brand-900 font-black text-2xl flex items-center gap-3 border-b-2 border-brand-900/20 hover:border-brand-900 transition-all pb-1 font-display">
              <Phone size={24} className="font-display" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl font-display"></div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24 font-display text-slate-900">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl font-display text-slate-900">
          <div className="text-center mb-16 font-display text-slate-900">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase italic underline decoration-accent/20 underline-offset-8 font-display">FAQ Courbevoie</h2>
            <p className="text-slate-500 font-light italic font-display">Nos réponses pour préparer votre projet sereinement dans l'ouest parisien.</p>
          </div>

          <div className="space-y-6 font-display">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-200 font-display">
                <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-4 font-display text-brand-900 italic uppercase italic">
                  <HelpCircle className="text-accent shrink-0 mt-1 font-display text-accent" size={22} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-2 border-accent/20 italic font-display">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Maillage interne final */}
      <section className="py-24 border-t border-slate-100 font-display bg-slate-50/50 text-slate-900">
        <div className="container mx-auto px-4 md:px-6 font-display">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 font-display">
            <div className="space-y-4 font-display">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display italic">Accès Rapide</h5>
              <ul className="space-y-2 text-sm italic font-display font-display text-slate-900">
                <li><Link to="/demande-de-devis" className="text-slate-500 hover:text-accent transition-colors">Demande de devis</Link></li>
                <li><Link to="/calculateur-volume" className="text-slate-500 hover:text-accent transition-colors">Calculateur volume</Link></li>
                <li><Link to="/formules-demenagement" className="text-slate-500 hover:text-accent transition-colors">Nos formules</Link></li>
              </ul>
            </div>
            <div className="space-y-4 font-display">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display italic">Services</h5>
              <ul className="space-y-2 text-sm italic font-display font-display text-slate-900">
                <li><Link to="/demenagement-particuliers-paris" className="text-slate-500 hover:text-accent transition-colors">Particuliers</Link></li>
                <li><Link to="/demenagement-entreprises-paris" className="text-slate-500 hover:text-accent transition-colors">Entreprises</Link></li>
                <li><Link to="/location-monte-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Monte-meuble</Link></li>
              </ul>
            </div>
            <div className="space-y-4 font-display">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display italic">Solutions</h5>
              <ul className="space-y-2 text-sm italic font-display font-display text-slate-900">
                <li><Link to="/garde-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Garde-meuble</Link></li>
                <li><Link to="/emballage-protection-demenagement" className="text-slate-500 hover:text-accent transition-colors">Emballage</Link></li>
                <li><Link to="/cartons-demenagement-paris" className="text-slate-500 hover:text-accent transition-colors">Matériel</Link></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2 font-display">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display italic">Contact</h5>
              <ul className="space-y-2 text-sm italic font-display font-display text-slate-900">
                <li><Link to="/contact" className="text-slate-500 hover:text-accent transition-colors">Contact Marne Transdem</Link></li>
                <li className="pt-2 font-display">
                    <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent text-[11px] uppercase tracking-widest font-black transition-colors">Déménagement Île-de-France</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalCourbevoie;
