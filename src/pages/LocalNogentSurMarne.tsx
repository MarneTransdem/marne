import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Waves, Home, Globe, Briefcase, Trees } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalNogentSurMarne: React.FC = () => {
  const path = "/demenagement-nogent-sur-marne";
  
  const faqs = [
    { 
      q: "Comment organiser un déménagement à Nogent-sur-Marne ?", 
      a: "Un déménagement à Nogent-sur-Marne demande d’anticiper le volume, les accès, les étages, les éventuels ascenseurs, le stationnement et la préparation des cartons. Selon qu’il s’agit d’un appartement, d’une maison, d’un logement familial ou d’un local professionnel, il est important d’évaluer les caves, garages, parkings, accès de chargement, meubles volumineux et objets fragiles. Marne Transdem vous accompagne pour définir une organisation adaptée à votre logement, à vos biens et au niveau d’accompagnement souhaité." 
    },
    { 
      q: "Marne Transdem intervient-elle à Nogent-sur-Marne et dans les villes proches ?", 
      a: "Oui, Marne Transdem accompagne les projets de déménagement à Nogent-sur-Marne et dans les secteurs proches comme Fontenay-sous-Bois, Le Perreux-sur-Marne, Bry-sur-Marne, Joinville-le-Pont, Champigny-sur-Marne, Vincennes, Saint-Mandé, Montreuil, Rosny-sous-Bois, Paris 12e, Paris 20e et plus largement en Île-de-France selon les besoins du projet." 
    },
    { 
      q: "Peut-on organiser un déménagement de Paris vers Nogent-sur-Marne ?", 
      a: "Oui, Marne Transdem peut accompagner un déménagement depuis Paris ou l’Île-de-France vers Nogent-sur-Marne selon le volume, les adresses, les accès, le niveau d’emballage souhaité et les contraintes du projet. Une étude personnalisée permet d’adapter l’organisation et les moyens nécessaires." 
    },
    { 
      q: "Marne Transdem peut-elle déménager des maisons ou logements familiaux à Nogent-sur-Marne ?", 
      a: "Oui, Marne Transdem accompagne les déménagements de maisons, appartements familiaux et résidences à Nogent-sur-Marne. L’organisation tient compte du volume, des meubles volumineux, des cartons par pièce, des objets fragiles, des accès, du stationnement et du niveau de service souhaité." 
    },
    { 
      q: "Peut-on demander un monte-meuble à Nogent-sur-Marne ?", 
      a: "Oui, un monte-meuble peut être envisagé lorsque certains meubles volumineux ne passent pas facilement par l’escalier ou l’ascenseur. Sa mise en place dépend de la configuration de la rue, de la façade, des accès et de la faisabilité technique." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement à Nogent-sur-Marne ?", 
      a: "Vous pouvez remplir le formulaire de demande de devis ou contacter Marne Transdem par téléphone. L’estimation prend en compte le volume, les adresses, les accès, les étages, le stationnement, la formule souhaitée et les besoins spécifiques comme l’emballage, le garde-meuble ou le monte-meuble." 
    }
  ];

  const nearbySectors = [
    { n: "Vincennes", l: "/demenagement-vincennes" },
    { n: "Saint-Mandé", l: "/demenagement-saint-mande" },
    { n: "Saint-Maur-des-Fossés", l: "/demenagement-saint-maur-des-fosses" },
    { n: "Montreuil", l: "/demenagement-montreuil" },
    { n: "Paris 12e", l: "/demenagement-paris-12" },
    { n: "Fontenay-sous-Bois", l: "/demenagement-fontenay-sous-bois" },
    { n: "Le Perreux-sur-Marne", l: "/demenagement-le-perreux-sur-marne" },
    { n: "Joinville-le-Pont", l: "/demenagement-joinville-le-pont" },
    { n: "Champigny-sur-Marne", l: "/demenagement-champigny-sur-marne" },
    { n: "Bry-sur-Marne", l: null }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Nogent-sur-Marne | Marne Transdem"
        description="Préparez votre déménagement à Nogent-sur-Marne avec Marne Transdem. Logements familiaux, maisons, appartements, locaux professionnels, formules adaptées, monte-meuble et devis personnalisé."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Nogent-sur-Marne", item: path }
          ])
        ]}
      />

      {/* 1. Hero Content */}
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Déménagement local</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase">Nogent-sur-Marne</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les particuliers et les entreprises dans leurs projets de déménagement à Nogent-sur-Marne, avec une organisation adaptée aux logements familiaux, maisons, appartements et bureaux de l’est parisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander un devis gratuit
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
                Votre déménagement <span className="text-accent italic">à Nogent-sur-Marne</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic">
                <p>
                  Ville résidentielle, familiale et dynamique du <span className="font-bold text-brand-900 italic tracking-tight uppercase">Val-de-Marne</span>, Nogent-sur-Marne offre un cadre de vie privilégié dans l’est parisien, entre les rives de la Marne et le bois de Vincennes. Que vous emménagiez dans un appartement du centre-ville, une maison familiale des quartiers résidentiels ou que vous transfériez vos bureaux, Marne Transdem vous propose des solutions sur mesure.
                </p>
                <p>
                  Grâce à notre proximité avec <span className="font-bold text-slate-700">Vincennes</span>, <span className="font-bold text-slate-700">Saint-Mandé</span>, <span className="font-bold text-slate-700">Le Perreux-sur-Marne</span>, <span className="font-bold text-slate-700">Champigny-sur-Marne</span> et <span className="font-bold text-slate-700">Paris</span>, nous maîtrisons parfaitement les contraintes logistiques du secteur : accès d’immeubles étroits, stationnement, ascenseurs et protection des parties communes en résidences.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/images/demenagement-94-val-de-marne.jpg" 
                  alt="Déménagement à Nogent-sur-Marne Marne Transdem" 
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi une préparation rigoureuse ? */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-4xl mx-auto text-center mb-16 italic font-sans italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic">Une préparation <span className="text-accent underline decoration-accent/20 italic tracking-tight">essentielle</span></h2>
             <p className="text-slate-500 text-lg font-light italic">
                Nogent-sur-Marne présente des profils de logements variés qui nécessitent une étude attentive de la logistique.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic font-sans italic">
             {[
               { icon: Building2, t: "Accès & Étages", d: "Appartements avec ascenseurs limités, escaliers étroits ou résidences avec halls à préserver." },
               { icon: Home, t: "Maisons & Pavillons", d: "Gestion des accès caves, garages, jardins, portails et allées pour un chargement optimal." },
               { icon: Trees, t: "Rues Résidentielles", d: "Anticipation du stationnement et de la manutention dans les quartiers résidentiels calmes." },
               { icon: Package, t: "Objets Fragiles", d: "Protection de la vaisselle, des livres, tableaux et meubles familiaux avec soin." },
               { icon: Briefcase, t: "Bureaux & Cabinets", d: "Organisation méticuleuse pour les transferts professionnels et le matériel informatique." },
               { icon: Waves, t: "Proximité Marne", d: "Logistique adaptée aux secteurs du bord de Marne et aux zones à forte fréquentation." }
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

      {/* 4. Nos Services à Nogent-sur-Marne */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic">
          <div className="text-center mb-20 italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 uppercase tracking-tight italic underline decoration-accent/20 underline-offset-8">Nos Services de <span className="text-accent italic tracking-tight">Déménagement</span></h2>
            <p className="text-slate-500 text-lg font-light italic max-w-2xl mx-auto italic">
              Des solutions complètes pour tous vos besoins de mobilité à Nogent-sur-Marne.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 italic">
             {[
               { t: "Particuliers", d: "Appartements, studios, résidences et maisons familiales.", l: "/demenagement-particuliers-paris" },
               { t: "Entreprises", d: "Bureaux, commerces, cabinets et professions libérales.", l: "/demenagement-entreprises-paris" },
               { t: "Garde-Meuble", d: "Stockage sécurisé pendant une transition ou des travaux.", l: "/garde-meuble-paris" },
               { t: "Monte-Meuble", d: "Location avec technicien pour les accès complexes.", l: "/location-monte-meuble-paris" },
               { t: "Emballage", d: "Protection experte de vos meubles et effets personnels.", l: "/emballage-protection-demenagement" },
               { t: "Cartons", d: "Fourniture de matériel d'emballage professionnel.", l: "/cartons-demenagement-paris" },
               { t: "Formules", d: "Économique, Standard ou Luxe selon votre budget.", l: "/formules-demenagement" },
               { t: "Calculateur", d: "Estimez votre volume indicatif en quelques clics.", l: "/calculateur-volume" }
             ].map((service, i) => (
               <Link key={i} to={service.l} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-accent hover:shadow-xl transition-all group flex flex-col justify-between italic transition-all italic">
                 <div>
                   <h3 className="text-lg font-bold text-brand-900 mb-3 uppercase italic tracking-tight group-hover:text-accent transition-colors italic">{service.t}</h3>
                   <p className="text-slate-500 text-xs font-light leading-relaxed italic italic">{service.d}</p>
                 </div>
                 <div className="mt-6 flex items-center gap-2 text-accent font-black uppercase text-[10px] tracking-widest italic font-sans">
                   Voir le service <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform italic" />
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* 5. Déménagement Familial */}
      <section className="py-24 bg-brand-900 text-white font-sans italic overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 order-2 lg:order-1 italic">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Déménagement <br/><span className="text-accent italic">Maisons & Logements Familiaux</span></h2>
              <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed italic">
                <p>
                  Nogent-sur-Marne est une ville prisée des familles pour son cadre de vie. Marne Transdem accompagne les foyers dans leurs changements de résidence avec une organisation dédiée aux grands volumes.
                </p>
                <p>
                  Nous prenons en charge la protection de votre mobilier volumineux, l'emballage de vos objets fragiles (vaisselle, tableaux, miroirs) et la logistique liée aux maisons avec jardin ou accès par cave/garage. Chaque pièce est organisée avec méthode pour une installation fluide dans votre nouveau logement à Nogent ou ailleurs.
                </p>
                <div className="pt-6 italic font-sans italic">
                   <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all inline-flex items-center gap-3 italic">
                     Préparer mon déménagement familial
                     <ArrowRight size={22} />
                   </Link>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 rounded-[3.5rem] overflow-hidden grayscale-[10%] shadow-2xl skew-y-2 italic">
               <img src="/images/demenagement-94-val-de-marne.jpg" alt="Déménagement familial à Nogent-sur-Marne" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none italic"></div>
      </section>

      {/* 6. Déménagement d'Entreprise */}
      <section className="py-24 font-sans italic transition-all italic underline-none">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center italic transition-all italic">
            <div className="lg:w-1/2 order-2 lg:order-1 grayscale-[15%] rounded-[3rem] shadow-2xl overflow-hidden italic shadow-black/5">
               <img src="/images/transfert-bureaux-entreprise-paris.jpg" alt="Transfert de bureaux à Nogent-sur-Marne" className="w-full h-full object-cover" />
            </div>
            <div className="lg:w-1/2 space-y-8 order-1 lg:order-2 italic font-sans italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Transfert <span className="text-accent italic uppercase italic tracking-tight italic">Professionnel</span></h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed italic italic">
                Nous accompagnons les entreprises, commerces et professions libérales de Nogent-sur-Marne dans leurs transferts de locaux. Marne Transdem gère le mobilier professionnel, l'archivage, le matériel informatique et la coordination logistique pour assurer la continuité de votre activité. Notre expertise s'tend également aux parcs d'affaires du Val-de-Marne et aux zones tertiaires de l'est parisien.
              </p>
              <Link to="/demenagement-entreprises-paris" className="inline-flex items-center gap-3 text-brand-900 font-black uppercase text-xs tracking-widest border-b-2 border-accent pb-2 hover:text-accent transition-all italic font-sans italic tracking-tight italic">
                Organiser un transfert professionnel
                <ArrowRight size={18} className="text-accent italic" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Arrivée de Paris vers Nogent */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all italic underline-none">
        <div className="container mx-auto px-4 md:px-6 text-center italic font-sans italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 font-sans italic">Paris & IDF vers <span className="text-accent italic tracking-tight font-sans italic">Nogent-sur-Marne</span></h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed max-w-3xl mx-auto mb-12 italic italic">
             Marne Transdem organise vos projets au départ de <Link to="/demenagement-paris" className="text-brand-900 font-bold hover:text-accent transition-colors italic underline decoration-accent/20 underline-offset-4">Paris</Link>, des <Link to="/demenagement-hauts-de-seine" className="text-brand-900 font-bold hover:text-accent transition-colors italic underline decoration-accent/20 underline-offset-4">Hauts-de-Seine</Link> ou de toute l'Île-de-France vers Nogent-sur-Marne. Nous adaptons le chargement et le planning selon les contraintes de votre adresse de départ et d'arrivée.
          </p>
          <div className="flex flex-wrap justify-center gap-4 italic font-sans italic">
             {[
               { n: "Paris 12e", l: "/demenagement-paris-12" },
               { n: "Paris 20e", l: "/demenagement-paris-20" },
               { n: "Val-de-Marne", l: "/demenagement-val-de-marne" },
               { n: "Seine-Saint-Denis", l: "/demenagement-seine-saint-denis" }
             ].map((loc, i) => (
               <Link key={i} to={loc.l} className="bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 text-sm font-bold text-brand-900 hover:text-accent hover:border-accent transition-all italic uppercase tracking-widest italic">{loc.n}</Link>
             ))}
          </div>
        </div>
      </section>

      {/* 8. Logistique & Volume */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 italic font-sans">
             <div className="lg:col-span-2 space-y-12 italic font-sans">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all italic">Volume, Accès <span className="text-accent italic tracking-tight font-sans">et Monte-Meuble</span></h2>
               <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic transition-all italic">
                 <p>
                   Chaque adresse à Nogent-sur-Marne présente des caractéristiques uniques. Un déménagement réussi commence par une évaluation précise du volume à transporter et une analyse des accès. Si votre mobilier volumineux ne passe pas par l'ascenseur ou l'escalier étroit d'une résidence, nous pouvons mobiliser un <Link to="/location-monte-meuble-paris" className="text-accent font-bold italic underline">monte-meuble</Link> selon la faisabilité technique sur la rue.
                 </p>
                 <p>
                   L'anticipation du stationnement est également primordiale pour la fluidité du chargement et le respect du voisinage. Nos équipes coordonnent l'ensemble de ces paramètres pour une intervention sereine.
                 </p>
               </div>
               <Link to="/calculateur-volume" className="inline-flex items-center gap-5 bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg group hover:shadow-2xl transition-all italic shadow-xl transition-all">
                  <Calculator size={24} className="text-accent group-hover:scale-110 transition-transform italic" />
                  Calculer mon volume indicatif
               </Link>
             </div>
             <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 flex flex-col justify-center italic shadow-sm italic transition-all italic">
                <h4 className="text-xl font-bold text-brand-900 mb-8 uppercase italic tracking-tight border-b-2 border-accent pb-4 italic">Notre Méthode</h4>
                {[
                  "Analyse de votre projet personnalisé",
                  "Évaluation du volume et des accès réels",
                  "Choix de la formule (Éco, Standard, Luxe)",
                  "Réalisation experte et transfert sécurisé"
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 mb-6 italic font-sans font-light italic">
                    <CheckCircle2 size={18} className="text-accent mt-1 shrink-0 italic" />
                    <span className="text-sm font-medium text-slate-600 italic italic">{step}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 9. Secteurs Proches linking section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16 italic font-sans italic transition-all italic">
            <h2 className="text-2xl md:text-4xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all italic underline underline-offset-4">Secteurs Proches <span className="text-accent italic tracking-tight font-sans italic">dans le Val-de-Marne</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto italic font-sans transition-all italic">
            {nearbySectors.map((s, i) => (
              s.l ? (
                <Link key={i} to={s.l} className="bg-white p-6 rounded-2xl border border-slate-100 group hover:border-accent hover:shadow-lg transition-all text-center italic shadow-sm transition-all italic">
                   <span className="font-bold text-brand-900 group-hover:text-accent transition-colors italic uppercase text-[10px] tracking-widest italic">{s.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-white/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center opacity-60 italic transition-all italic">
                   <span className="font-bold text-slate-400 italic uppercase text-[10px] tracking-widest italic italic">{s.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA Intermédiaire */}
      <section className="py-24 bg-accent relative overflow-hidden font-sans italic shadow-none">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic transition-all italic">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 font-display uppercase tracking-tight italic italic leading-tight italic transition-all italic">Organiser votre déménagement <br/>à Nogent-sur-Marne ?</h2>
           <p className="text-brand-900/70 text-lg mb-12 max-w-2xl mx-auto italic font-light italic leading-relaxed italic transition-all italic">
             Recevez une estimation adaptée à votre volume, vos accès, votre distance et le niveau d’accompagnement souhaité.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center italic transition-all italic">
             <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all min-w-[280px] italic transition-all italic">
               Demander mon devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 shadow-md flex items-center justify-center gap-3 transition-all min-w-[280px] italic transition-all italic">
                <Phone size={22} className="text-accent shadow-none italic" />
                {CONTACT.phone}
             </a>
           </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-900/5 rounded-full blur-[100px] pointer-events-none translate-x-[40%] translate-y-[-40%] italic transition-all italic"></div>
      </section>

      {/* 11. FAQ locale */}
      <section className="py-24 font-sans italic underline-none">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic transition-all italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic transition-all italic underline-none">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic">Nogent-sur-Marne</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans transition-all italic underline-none shadow-black/5">
                 <h4 className="text-lg font-bold text-brand-900 mb-6 flex items-start gap-5 tracking-tight uppercase italic italic font-sans italic underline-none transition-all italic">
                   <HelpCircle className="text-accent shrink-0 mt-1 italic transition-all italic" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-11 border-l-4 border-accent/20 italic italic transition-all italic font-sans italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 12. Maillage Interne Final */}
      <section className="py-12 bg-slate-900 font-sans italic transition-all italic underline-none">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 italic pb-8 border-b border-white/5 italic font-sans italic transition-all italic underline-none">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic transition-all italic">Devis Rapide</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-all italic transition-all italic">Calculateur Cube</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic transition-all italic">Formules</Link>
            <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-all italic transition-all italic">Île-de-France</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-all italic transition-all italic text-white underline decoration-accent/30 underline-offset-4">Val-de-Marne (94)</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-[8px] font-black uppercase tracking-[0.15em] text-slate-700 italic pt-8 font-sans transition-all italic underline-none">
            <Link to="/demenagement-paris" className="hover:text-accent transition-all italic transition-all italic underline underline-offset-4 decoration-accent/20">Paris</Link>
            <Link to="/demenagement-paris-12" className="hover:text-accent transition-all italic transition-all italic">Paris 12</Link>
            <Link to="/demenagement-paris-20" className="hover:text-accent transition-all italic transition-all italic">Paris 20</Link>
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-all italic transition-all italic">Vincennes</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent transition-all italic transition-all italic">Saint-Mandé</Link>
            <Link to="/demenagement-saint-maur" className="hover:text-accent transition-all italic transition-all italic">Saint-Maur</Link>
            <Link to="/demenagement-creteil" className="hover:text-accent transition-all italic transition-all italic">Créteil</Link>
            <Link to="/demenagement-montreuil" className="hover:text-accent transition-all italic transition-all italic">Montreuil</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-all italic transition-all italic">St-Maur des Fossés</Link>
            <Link to="/demenagement-champigny-sur-marne" className="hover:text-accent transition-all italic transition-all italic">Champigny-sur-Marne</Link>
            <Link to="/demenagement-le-perreux-sur-marne" className="hover:text-accent transition-all italic transition-all italic">Le Perreux-sur-Marne</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic transition-all italic text-slate-500">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalNogentSurMarne;
