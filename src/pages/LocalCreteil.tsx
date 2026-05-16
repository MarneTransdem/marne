import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, Truck, Ruler, Calendar, ClipboardCheck, HelpCircle, Zap, Home, Store, Briefcase, Star, Info, ShieldCheck, Clock, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalCreteil: React.FC = () => {
  const path = "/demenagement-creteil";
  
  const faqs = [
    { 
      q: "Comment s'organise le stationnement à Créteil lors d'un déménagement ?", 
      a: "Créteil est une ville préfecture avec des zones de stationnement très réglementées, notamment près de l'Hôtel de Ville ou du Lac. Marne Transdem prend en charge les demandes d'autorisation d'occupation du domaine public auprès de la mairie de Créteil. Nous sécurisons les emplacements 48h à l'avance pour garantir le bon déroulement du chargement." 
    },
    { 
      q: "Quel est le coût d'un déménagement professionnel à Créteil ?", 
      a: "Le prix est calculé selon le volume de vos biens, l'accessibilité de vos logements (présence d'ascenseur, étage) et la distance. Nous réalisons une visite technique gratuite à Créteil (quartiers du Port, Front de Lac, Échat...) pour vous fournir un devis ferme, définitif et sans frais cachés." 
    },
    { 
      q: "Proposez-vous des services de transfert de bureaux à Créteil-Échat ?", 
      a: "Absolument. Créteil-Échat est un pôle tertiaire majeur. Nous sommes experts en transferts d'entreprises, cabinets médicaux et bureaux administratifs. Nous gérons la logistique informatique, le mobilier de bureau et les archives avec une discrétion absolue." 
    },
    { 
      q: "Comment protéger les objets fragiles lors d'un déménagement ?", 
      a: "Nous utilisons des fournitures de protection professionnelles : bull-pack, valises à verres, cartons penderies et housses capitonnées. Dans nos formules 'Standard' et 'Luxe', nos déménageurs experts se chargent eux-mêmes de l'emballage de vos objets délicats." 
    },
    { 
      q: "Réalisez-vous des déménagements depuis Créteil vers la province ?", 
      a: "Oui, nous accompagnons les Cristoliens partout en France. Que vous partiez vers Lyon, Bordeaux, Marseille ou toute autre région, nous organisons votre déménagement longue distance avec la même rigueur qu'un transport local dans le Val-de-Marne." 
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Créteil (94000) | Marne Transdem : Expert Déménageur"
        description="Besoin d'un déménageur à Créteil ? Marne Transdem offre des solutions sur-mesure pour particuliers et entreprises. Devis gratuit, visite technique et sérénité."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Déménagement Créteil", item: path }
          ])
        ]}
      />

      {/* 1. Hero Section Premium */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-[#0B1221] overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-8"
              >
                <Star size={16} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Expert local Val-de-Marne</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
                Déménagement <br/>
                <span className="text-accent italic">Créteil</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                Simplifiez votre installation à Créteil avec Marne Transdem. Une logistique maîtrisée, une équipe passionnée et un service premium pour un déménagement sans aucun stress.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-[0_0_40px_rgba(255,191,0,0.2)] flex items-center justify-center gap-3 group transition-all">
                  Devis gratuit Créteil
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                  <Phone size={22} className="text-accent" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5">
                <img 
                  src="/images/demenagement-creteil-camion.jpg" 
                  alt="Déménagement appartement à Créteil avec Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl"></div>
              
              <div className="absolute -bottom-6 right-10 bg-white p-6 rounded-2xl shadow-2xl z-20 flex items-center gap-4">
                <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl">4.9</div>
                <div>
                  <div className="text-brand-900 font-bold text-sm">Cristoliens satisfaits</div>
                  <div className="text-slate-500 text-xs italic">Expertise locale reconnue</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Introduction SEO Riche */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 leading-tight">
              Marne Transdem : Votre société de déménagement à Créteil de référence
            </h2>
            <div className="h-1.5 w-24 bg-accent mx-auto mb-10 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-0 italic text-center">
              « Créteil, capitale du Val-de-Marne, mérite un service de déménagement à la hauteur de son dynamisme. »
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-slate-600 text-lg font-light leading-relaxed">
              <p>
                Depuis plus de 20 ans, Marne Transdem s'impose comme l'un des leaders du <span className="font-bold text-brand-900">déménagement Créteil</span>. Que vous emménagiez dans une résidence moderne du <span className="font-bold text-brand-900">Front de Lac</span>, un appartement à <span className="font-bold text-brand-900">l'Échat</span> ou une maison en bord de Marne, notre expertise locale est votre meilleur atout.
              </p>
              <p>
                Nous comprenons les défis spécifiques de la ville préfecture : accessibilité des grandes résidences, gestion de la circulation et stationnement complexe. Notre <span className="font-bold text-brand-900">entreprise de déménagement Créteil</span> déploie des moyens techniques de pointe, incluant des monte-meubles de dernière génération, pour garantir une efficacité maximale et une protection totale de vos biens.
              </p>
              <p>
                Notre mission va au-delà du simple transport. Nous sommes votre partenaire pour chaque étape de votre <span className="font-bold text-brand-900">déménagement appartement Créteil</span> ou maison. De la fourniture de cartons adaptés à la réinstallation complète de votre mobilier, Marne Transdem incarne le savoir-faire artisanal associé à la rigueur d'un grand transporteur.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="text-accent font-black text-4xl mb-2">94</div>
                  <div className="text-brand-900 font-bold uppercase text-[10px] tracking-widest">Ancrage Local</div>
                </div>
                <div className="bg-brand-900 p-8 rounded-[2rem] text-white">
                  <div className="text-accent font-black text-4xl mb-2">48h</div>
                  <div className="text-white/70 font-bold uppercase text-[10px] tracking-widest">Devis Rapide</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-accent p-8 rounded-[2rem] text-brand-900">
                  <div className="text-brand-900 font-black text-4xl mb-2">0</div>
                  <div className="text-brand-900/70 font-bold uppercase text-[10px] tracking-widest">Stress Garanti</div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="text-brand-900 font-black text-4xl mb-2">100%</div>
                  <div className="text-brand-900/50 font-bold uppercase text-[10px] tracking-widest">Assuré</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Prestations Détaillées Particuliers */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-10 leading-tight">Déménagement particuliers à Créteil : La sérénité avant tout</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Home size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Appartements & Résidences</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Spécialiste des grandes copropriétés de Créteil, nous maîtrisons l'usage des monte-charges et des accès sécurisés pour préserver les parties communes.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Protection Sur-Mesure</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Chaque meuble est emballé individuellement sous couverture ou bull-pack. Nous protégeons aussi vos sols et vos cadres de portes lors du passage.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Équipement Haute Performance</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Une flotte de camions capitonnés de tous volumes (du 20m3 au 50m3) pour s'adapter parfaitement à la taille de votre logement.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                 <img src="/images/equipe-demenageur-creteil.jpg" alt="Déménageur Créteil" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-accent rounded-[3rem] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Prestations Détaillées Professionnels */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-10 leading-tight">Transfert d'entreprise & déménagement professionnel Créteil</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-900 rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Expertise Tertiaire Échat</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Nous accompagnons les sociétés basées à Créteil dans leurs transferts internes ou vers de nouveaux locaux, avec une gestion rigoureuse des délais pour limiter l'arrêt d'activité.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-brand-900 rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-900 mb-3">Mobilier & Postes Informatiques</h3>
                    <p className="text-slate-500 font-light leading-relaxed">Emballage antistatique pour vos serveurs et écrans, démontage et remontage précis de votre mobilier de bureau et rayonnages.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                   <div className="w-12 h-12 bg-brand-900 rounded-2xl shadow-md flex items-center justify-center shrink-0 text-accent">
                     <ClipboardCheck size={24} />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-brand-900 mb-3">Manutention Lourde</h3>
                     <p className="text-slate-500 font-light leading-relaxed">Besoin de déplacer un coffre-fort, une armoire forte ou du matériel médical à Henri Mondor ? Nos équipes sont formées aux techniques de levage spécifiques.</p>
                   </div>
                </div>
              </div>
              <div className="mt-12">
                 <Link to="/demenagement-entreprises-paris" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-brand-900 transition-all shadow-lg flex items-center justify-center gap-3 w-fit">
                   Découvrir nos solutions Entreprises <ArrowRight size={18} />
                 </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative group">
               <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]">
                 <img src="/images/demenagement-appartement-creteil.jpg" alt="Transfert entreprise Créteil" className="w-full h-full object-cover" />
               </div>
               <div className="absolute top-10 left-10 w-full h-full bg-slate-100 rounded-[3.5rem] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pourquoi choisir Marne Transdem à Créteil */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Pourquoi choisir Marne Transdem à Créteil ?</h2>
            <div className="h-1.5 w-24 bg-accent mx-auto rounded-full mb-10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { i: ShieldCheck, t: "Garantie Totale", d: "Une assurance professionnelle multirisque pour protéger vos biens jusqu'à leur nouvel emplacement." },
              { i: Clock, t: "Maîtrise du Temps", d: "Pas d'attente. Nous respectons nos planning à la minute pour que vous profitiez vite de votre nouveau chez-vous." },
              { i: MapPin, t: "Connaissance Terrain", d: "Nous maîtrisons les plans de circulation de Créteil et les démarches auprès de la Prefecture." },
              { i: Calculator, t: "Prix Juste", d: "Des tarifs compétitifs alliés à une qualité de service sans compromis pour le Val-de-Marne." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-accent group transition-all text-center">
                <item.i className="text-accent mb-8 mx-auto group-hover:scale-110 transition-transform" size={48} />
                <h3 className="text-xl font-black mb-4">{item.t}</h3>
                <p className="text-slate-400 font-light text-sm leading-relaxed italic">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Garde-meuble et stockage */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
           <div className="max-w-4xl mx-auto bg-white p-12 lg:p-20 rounded-[4rem] shadow-xl border border-slate-100 flex flex-col lg:flex-row items-center gap-12">
             <div className="shrink-0">
               <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                 <Package size={64} />
               </div>
             </div>
             <div>
               <h2 className="text-3xl font-black text-brand-900 mb-6">Besoin de stockage à Créteil ?</h2>
               <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                 Si votre nouveau logement n'est pas prêt, bénéficiez de notre service de <span className="font-bold text-brand-900">garde-meuble sécurisé</span> à proximité de Créteil. Conteneurs plombés, vidéosurveillance 24h/24 et conditions de stockage optimales (sec et tempéré).
               </p>
               <Link to="/garde-meuble-paris" className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-[10px] border-b-2 border-accent pb-1 hover:text-brand-900 hover:border-brand-900 transition-all">
                 Voir nos solutions de stockage <ArrowRight size={14} />
               </Link>
             </div>
           </div>
        </div>
      </section>

      {/* 7. Déménagement longue distance depuis Créteil */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
             <div className="lg:w-1/2">
               <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-8 tracking-tight">Déménagement de Créteil vers toute la France</h2>
               <p className="text-slate-500 text-lg font-light leading-relaxed mb-6">
                 Vous quittez le 94 pour une nouvelle vie en province ? Marne Transdem est votre spécialiste du <span className="font-bold text-brand-900">déménagement depuis Créteil vers la province</span>.
               </p>
               <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 italic">
                 Nous organisons des tournées régulières vers Lyon, Marseille, Bordeaux, Lille ou Nantes, vous permettant de bénéficier de tarifs optimisés grâce au groupage ou au circuit direct.
               </p>
               <div className="space-y-4 mb-10">
                 {[
                   { f: "Créteil", t: "Bordeaux", d: "585 km - 24h" },
                   { f: "Créteil", t: "Nice", d: "930 km - 48h" },
                   { f: "Créteil", t: "Lyon", d: "460 km - 24h" }
                 ].map((route, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-3 font-bold text-brand-900">
                       <span className="text-slate-400 font-light">{route.f}</span>
                       <ArrowRight size={14} className="text-accent" />
                       <span className="text-brand-900">{route.t}</span>
                     </div>
                     <div className="text-xs font-black uppercase text-accent tracking-widest">{route.d}</div>
                   </div>
                 ))}
               </div>
               <Link to="/demenagement-longue-distance" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold inline-flex items-center gap-3 hover:bg-accent hover:text-brand-900 transition-all shadow-xl">
                 Infos Longue Distance <ArrowRight size={20} />
               </Link>
             </div>
             <div className="lg:w-1/2 grayscale hover:grayscale-0 transition-all duration-700 rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800" alt="Déménagement longue distance" className="w-full h-full object-cover" />
             </div>
           </div>
        </div>
      </section>

      {/* 8. FAQ Locale Créteil */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-6 tracking-tight uppercase">Vos questions à Créteil</h2>
             <div className="h-1 w-20 bg-accent mx-auto"></div>
           </div>
           <div className="space-y-6">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm transition-all hover:border-accent">
                 <h4 className="text-xl font-bold text-brand-900 mb-6 flex items-start gap-4">
                   <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-10 italic border-l-2 border-accent">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 9. CTA Final */}
      <section className="py-24 bg-[#0B1221] text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            Prêt pour votre déménagement <br/>
            à <span className="text-accent italic">Créteil</span> ?
          </h2>
          <p className="text-slate-400 text-xl font-light mb-16 max-w-2xl mx-auto italic leading-relaxed">
            Obtenez votre devis personnalisé en 48h. Une équipe d'experts à votre écoute pour une installation réussie dans la ville préfecture du Val-de-Marne.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
             <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-6 rounded-full font-bold text-xl hover:bg-white shadow-[0_0_50px_rgba(255,191,0,0.15)] transition-all min-w-[300px]">
               Demander un devis gratuit
             </Link>
             <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-white hover:text-brand-900 transition-all min-w-[300px] flex items-center justify-center gap-4">
               <Phone size={24} className="text-accent" />
               {CONTACT.phone}
             </a>
          </div>
          <div className="mt-16 flex justify-center items-center gap-3 text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] italic">
             <ShieldCheck size={14} className="text-accent" />
             Visite gratuite • Assurance incluse • Ponctualité
          </div>
        </div>
      </section>

      {/* 10. Footer Maillage Local */}
      <section className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-900/30 mb-8 italic">Nos secteurs d'intervention Val-de-Marne</h4>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-slate-400 font-bold text-xs uppercase tracking-widest italic">
            <Link to="/demenagement-vincennes" className="hover:text-accent transition-colors">Vincennes</Link>
            <Link to="/demenagement-saint-maur-des-fosses" className="hover:text-accent transition-colors">Saint-Maur</Link>
            <Link to="/demenagement-saint-mande" className="hover:text-accent transition-colors">Saint-Mandé</Link>
            <Link to="/demenagement-charenton-le-pont" className="hover:text-accent transition-colors">Charenton</Link>
            <Link to="/demenagement-nogent-sur-marne" className="hover:text-accent transition-colors">Nogent-sur-Marne</Link>
            <Link to="/demenagement-joinville-le-pont" className="hover:text-accent transition-colors">Joinville-le-Pont</Link>
            <Link to="/demenagement-maisons-alfort" className="hover:text-accent transition-colors">Maisons-Alfort</Link>
            <Link to="/demenagement-ivry-sur-seine" className="hover:text-accent transition-colors">Ivry</Link>
            <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-colors">94 - Val-de-Marne</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalCreteil;
