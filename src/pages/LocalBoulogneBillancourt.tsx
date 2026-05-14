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

const LocalBoulogneBillancourt: React.FC = () => {
  const path = "/demenagement-boulogne-billancourt";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Boulogne-Billancourt ?", 
      a: "Un déménagement à Boulogne-Billancourt demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité." 
    },
    { 
      q: "Marne Transdem intervient-elle à Boulogne-Billancourt et dans les villes proches ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Boulogne-Billancourt et dans les secteurs proches comme Paris 16e, Paris 15e, Issy-les-Moulineaux, Saint-Cloud, Sèvres, Meudon et plus largement dans les Hauts-de-Seine selon les besoins du projet." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Boulogne-Billancourt ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque les meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Quelle formule choisir pour un déménagement à Boulogne-Billancourt ?", 
      a: "La formule dépend de votre budget, du temps disponible pour préparer vos cartons et du niveau d’accompagnement souhaité. La formule Économique convient si vous préparez une grande partie de vos affaires, la formule Standard offre un équilibre entre autonomie et accompagnement, et la formule Luxe permet de déléguer davantage selon la prestation choisie." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Boulogne-Billancourt ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <SEO 
        title="Déménagement Boulogne-Billancourt | Marne Transdem"
        description="Préparez votre déménagement à Boulogne-Billancourt avec Marne Transdem. Services pour particuliers et entreprises, formules adaptées, monte-meuble, garde-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Boulogne-Billancourt", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-slate-50 overflow-hidden text-slate-900">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-brand-900 transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/secteurs-desservis" className="hover:text-brand-900 transition-colors">Secteurs</Link>
              <span>/</span>
              <span className="text-accent underline decoration-accent/20 underline-offset-4 font-black">Boulogne-Billancourt</span>
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
              <span className="text-accent underline decoration-accent/20 underline-offset-8">Boulogne-Billancourt</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl italic font-display">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Boulogne-Billancourt, avec une organisation adaptée aux appartements, maisons, résidences, bureaux, commerces et contraintes d’accès de l’ouest parisien.
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
              <div className="inline-block px-4 py-1.5 bg-brand-900/5 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-900">Expertise de l'Ouest Parisien</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight font-display">
                Votre déménagement à Boulogne-Billancourt
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed font-display">
                <p>
                  Ville majeure des <span className="font-bold text-slate-700">Hauts-de-Seine</span>, Boulogne-Billancourt se distingue par son dynamisme et la diversité de son parc immobilier. Marne Transdem accompagne les <span className="font-bold text-slate-700">particuliers</span> et les <span className="font-bold text-slate-700">entreprises</span> dans leurs projets de mobilité au cœur de cette commune stratégique. Notre présence régulière à proximité immédiate de <span className="font-bold text-slate-700">Paris 16e</span>, <span className="font-bold text-slate-700">Paris 15e</span> et <span className="font-bold text-slate-700">Issy-les-Moulineaux</span> nous permet d'aborder chaque intervention avec une parfaite connaissance du terrain.
                </p>
                <p>
                  Que vous emménagiez dans un <span className="font-bold text-slate-700">appartement</span> familial vers Marcel Sembat, une <span className="font-bold text-slate-700">maison</span> à proximité du Bois de Boulogne ou que vous transfériez vos <span className="font-bold text-slate-700">bureaux</span>, <span className="font-bold text-slate-700">commerces</span> ou <span className="font-bold text-slate-700">cabinets professionnels</span>, nous gérons l'ensemble de la logistique. Nous anticipons les contraintes d'accès propres aux <span className="font-bold text-slate-700">immeubles</span> (ascenseurs, escaliers), les zones de <span className="font-bold text-slate-700">stationnement</span> et l'estimation rigoureuse des <span className="font-bold text-slate-700">volumes</span> pour vous proposer une <span className="font-bold text-slate-700">demande de devis</span> juste et transparente. Notre expertise s'tend également aux villes environnantes comme <span className="font-bold text-slate-700">Saint-Cloud</span>, <span className="font-bold text-slate-700">Sèvres</span> et <span className="font-bold text-slate-700">Meudon</span>.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
                <img 
                  src="/images/demenagement-boulogne-billancourt-92.jpg" 
                  alt="Déménagement Boulogne-Billancourt 92 - Service Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi un déménagement à Boulogne-Billancourt demande une bonne préparation */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight text-white underline decoration-accent/20 underline-offset-8">Pourquoi un déménagement à Boulogne-Billancourt demande une bonne préparation</h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed italic">
              L'urbanisme dense et la variété des habitations imposent une organisation logistique millimétrée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Accès & Étages", 
                desc: "Anticipation des halls, ascenseurs parfois étroits et escaliers pour une manutention fluide.",
                icon: Building2 
              },
              { 
                title: "Logements Familiaux", 
                desc: "Gestion spécifique des volumes importants dans les résidences et maisons boulonnaises.",
                icon: Box 
              },
              { 
                title: "Protection des Biens", 
                desc: "Emballage soigné des meubles volumineux et objets fragiles pour une sécurité totale.",
                icon: ShieldCheck 
              },
              { 
                title: "Zone de Stationnement", 
                desc: "Anticipation nécessaire des emplacements pour les camions de déménagement en centre-ville.",
                icon: MapPin 
              },
              { 
                title: "Monte-meuble Éventuel", 
                desc: "Option de levage extérieur lorsque les accès intérieurs sont limités, selon faisabilité technique.",
                icon: Zap 
              },
              { 
                title: "Espaces Complémentaires", 
                desc: "Prise en charge des contenus de caves, cours intérieures, parkings et espaces de stockage.",
                icon: Package 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display">Nos services de déménagement à Boulogne-Billancourt</h2>
            <p className="text-slate-500 font-light text-lg italic">Une gamme de solutions sur-mesure pour votre transition.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Déménagement Particuliers", path: "/demenagement-particuliers-paris", desc: "Logements familiaux, appartements et studios." },
              { title: "Déménagement Entreprises", path: "/demenagement-entreprises-paris", desc: "Bureaux, commerces, cabinets et agences." },
              { title: "Garde-meuble / Stockage", path: "/garde-meuble-paris", desc: "Solutions sécurisées pour vos archives et mobilier." },
              { title: "Location Monte-meuble", path: "/location-monte-meuble-paris", desc: "Levage extérieur pour meubles volumineux." },
              { title: "Emballage & Protection", path: "/emballage-protection-demenagement", desc: "Protection premium de vos biens les plus précieux." },
              { title: "Cartons & Matériel", path: "/cartons-demenagement-paris", desc: "Fournitures et matériel de déménagement professionnel." },
              { title: "Formules de déménagement", path: "/formules-demenagement", desc: "Économique, Standard ou Luxe selon vos besoins." },
              { title: "Calculateur Volume", path: "/calculateur-volume", desc: "Estimez votre volume en quelques clics." }
            ].map((service, i) => (
              <Link 
                key={i} 
                to={service.path}
                className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <h4 className="text-lg font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors leading-tight font-display">{service.title}</h4>
                <p className="text-slate-500 text-xs font-light leading-relaxed mb-6 italic">{service.desc}</p>
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
                  src="/images/demenagement-maison-appartement-particulier.jpg" 
                  alt="Déménagement particulier Boulogne-Billancourt - Appartement et maison" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight font-display">
                Déménagement de particuliers à Boulogne-Billancourt
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic font-display">
                <p>
                  Marne Transdem accompagne les particuliers pour les déménagements d'appartements, de maisons, de studios et de logements familiaux à Boulogne-Billancourt. Que votre projet concerne un déplacement intra-muros, de Boulogne-Billancourt vers Paris, ou vers une autre destination (Île-de-France ou longue distance), nous adaptons nos moyens à votre situation.
                </p>
                <p>
                  De la phase de préparation aux services de <span className="font-bold text-slate-700">cartons</span> et <span className="font-bold text-slate-700">protection des meubles</span>, nous veillons sur vos <span className="font-bold text-slate-700">objets fragiles</span>. Selon vos contraintes d'<span className="font-bold text-slate-700">accès</span> (<span className="font-bold text-slate-700">ascenseur</span>, <span className="font-bold text-slate-700">étages</span>, <span className="font-bold text-slate-700">cave</span>, <span className="font-bold text-slate-700">parking</span>), vous pouvez choisir la <span className="font-bold text-slate-700">formule</span> idéale après une <span className="font-bold text-slate-700">estimation du volume</span> précise.
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
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight font-display">
                Déménagement d’entreprises à Boulogne-Billancourt
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic font-display">
                <p>
                  Nous accompagnons les professionnels de Boulogne-Billancourt dans leurs transferts de bureaux, commerces, cabinets et locaux professionnels. Que vous soyez une <span className="font-bold text-slate-700">profession libérale</span>, une petite agence ou une entreprise plus importante, nous assurons la manutention de votre <span className="font-bold text-slate-700">mobilier de bureau</span>, de vos <span className="font-bold text-slate-700">archives</span> et de votre <span className="font-bold text-slate-700">matériel informatique</span>.
                </p>
                <p>
                  Notre organisation vise à minimiser l'impact sur votre <span className="font-bold text-slate-700">continuité d'activité</span>. Grâce à un <span className="font-bold text-slate-700">planning</span> rigoureux et une connaissance des conditions d'<span className="font-bold text-slate-700">accès et manutention</span> propres aux Hauts-de-Seine, nous sécurisons votre installation dans vos nouveaux locaux professionnels.
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
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
                  alt="Déménagement professionnel Boulogne-Billancourt - Transfert de bureaux" 
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
            <p className="text-slate-500 text-lg font-light italic font-display">Trois niveaux de service pour correspondre à votre budget et vos attentes.</p>
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
            <Link to="/formules-demenagement" className="inline-flex bg-brand-900 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-hover transition-all items-center gap-3 font-display">
              Comparer les formules
              <ArrowRight size={18} className="text-accent" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Volume, accès et monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="max-w-4xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight font-display text-white">Volume, accès et monte-meuble à Boulogne-Billancourt</h2>
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed mb-12 italic font-display">
                <p>
                  Certains déménagements à Boulogne-Billancourt nécessitent une étude attentive de la logistique. La typologie urbaine de la ville, avec ses <span className="text-white font-medium">immeubles</span> et ses <span className="text-white font-medium">résidences</span>, impose de vérifier l'adéquation entre le <span className="text-white font-medium">volume</span> à déménager et les contraintes de passage.
                </p>
                <p>
                  Nous analysons les <span className="text-white font-medium">étages</span>, la capacité des <span className="text-white font-medium">ascenseurs</span>, la largeur des <span className="text-white font-medium">escaliers</span> et les <span className="text-white font-medium">halls d'immeuble</span>. Dans certaines configurations (meubles non démontables, escaliers étroits), un <span className="text-white font-medium">monte-meuble</span> peut être envisagé selon la faisabilité technique et les possibilités de <span className="text-white font-medium">stationnement</span> devant la façade.
                </p>
              </div>
              <Link 
                to="/location-monte-meuble-paris" 
                className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl inline-flex items-center gap-3 transition-all font-display"
              >
                Découvrir le service monte-meuble
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
              <h2 className="text-3xl md:text-4xl font-black text-brand-900 mb-6 leading-tight font-display">Estimez le volume de votre déménagement</h2>
              <p className="text-slate-500 font-light leading-relaxed italic mb-8 font-display text-lg">
                Avant de demander un devis, utilisez notre calculateur de volume pour estimer vos meubles, cartons et objets principaux.
              </p>
              <Link 
                to="/calculateur-volume" 
                className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover shadow-xl inline-flex items-center gap-3 shrink-0 font-display"
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
            <p className="text-slate-500 text-lg font-light italic font-display">Une méthode claire pour préparer votre déménagement à Boulogne-Billancourt, adapter les moyens nécessaires et choisir le niveau d’accompagnement correspondant à votre situation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-display">
            {[
              { title: "Analyse de votre projet", icon: ClipboardCheck, desc: "Définition de vos besoins, dates et spécificités." },
              { title: "Évaluation volume & accès", icon: Ruler, desc: "Analyse technique pour calibrer les moyens logistiques." },
              { title: "Choix formule & organisation", icon: Calendar, desc: "Validation de la prestation et planification." },
              { title: "Réalisation du déménagement", icon: Truck, desc: "Intervention soignée de nos techniciens experts." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-brand-900 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 relative group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500 shadow-xl">
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
      <section className="py-24 border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-brand-900 font-display">Autres secteurs proches</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center font-display text-slate-500">
            <Link to="/demenagement-paris-16" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 16e</Link>
            <Link to="/demenagement-paris-15" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Paris 15e</Link>
            <Link to="/demenagement-hauts-de-seine" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Hauts-de-Seine</Link>
            <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Île-de-France</Link>
            <Link to="/demenagement-issy-les-moulineaux" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Issy-les-Moulineaux</Link>
            <Link to="/demenagement-saint-cloud" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Saint-Cloud</Link>
            <span className="text-slate-300 font-bold text-sm italic">Déménagement Sèvres</span>
            <Link to="/demenagement-meudon" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Meudon</Link>
            <Link to="/demenagement-vaucresson" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Vaucresson</Link>
            <Link to="/demenagement-neuilly-sur-seine" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Neuilly-sur-Seine</Link>
            <Link to="/demenagement-levallois-perret" className="text-slate-400 hover:text-accent font-bold text-sm transition-colors border-b border-transparent hover:border-accent">Déménagement Levallois-Perret</Link>
          </div>
        </div>
      </section>

      {/* 12. CTA intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight font-display">Vous préparez un déménagement à Boulogne-Billancourt ?</h2>
          <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto font-light italic font-display">
            Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès et le niveau d’accompagnement souhaité.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center font-display">
            <Link to="/demande-de-devis" className="bg-brand-900 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-brand-hover transition-all flex items-center gap-3 shadow-2xl font-display">
              Demander mon devis gratuit
              <ArrowRight size={24} />
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-brand-900 font-black text-2xl flex items-center gap-3 border-b-2 border-brand-900/20 hover:border-brand-900 transition-all pb-1 font-display">
              <Phone size={24} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      </section>

      {/* 13. FAQ locale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl font-display">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 font-display tracking-tight leading-tight uppercase italic underline decoration-accent/20 underline-offset-8">FAQ Déménagement <br/> Boulogne-Billancourt</h2>
            <p className="text-slate-500 font-light italic font-display">Nos réponses pour préparer votre projet sereinement dans l'ouest parisien.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-200">
                <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-4 font-display text-brand-900">
                  <HelpCircle className="text-accent shrink-0 mt-1" size={22} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-2 border-accent/20 font-display italic">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Maillage interne final */}
      <section className="py-24 border-t border-slate-100 font-display bg-slate-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display">Accès Rapide</h5>
              <ul className="space-y-2 text-sm italic">
                <li><Link to="/demande-de-devis" className="text-slate-500 hover:text-accent transition-colors">Demande de devis</Link></li>
                <li><Link to="/calculateur-volume" className="text-slate-500 hover:text-accent transition-colors">Calculateur de volume</Link></li>
                <li><Link to="/formules-demenagement" className="text-slate-500 hover:text-accent transition-colors">Nos formules</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display">Services</h5>
              <ul className="space-y-2 text-sm italic">
                <li><Link to="/demenagement-particuliers-paris" className="text-slate-500 hover:text-accent transition-colors">Déménagement Particuliers</Link></li>
                <li><Link to="/demenagement-entreprises-paris" className="text-slate-500 hover:text-accent transition-colors">Déménagement Entreprises</Link></li>
                <li><Link to="/location-monte-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Monte-meuble</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display">Logistique</h5>
              <ul className="space-y-2 text-sm italic">
                <li><Link to="/garde-meuble-paris" className="text-slate-500 hover:text-accent transition-colors">Garde-meuble</Link></li>
                <li><Link to="/emballage-protection-demenagement" className="text-slate-500 hover:text-accent transition-colors">Emballage & Protection</Link></li>
                <li><Link to="/cartons-demenagement-paris" className="text-slate-500 hover:text-accent transition-colors">Cartons & Matériel</Link></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 font-display">Plus d'infos</h5>
              <ul className="space-y-2 text-sm italic">
                <li><Link to="/contact" className="text-slate-500 hover:text-accent transition-colors">Contactez Marne Transdem</Link></li>
                <li className="text-slate-400 italic text-xs leading-relaxed">43 rue des Maraîchers, 75020 Paris</li>
                <li className="pt-2">
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

export default LocalBoulogneBillancourt;
