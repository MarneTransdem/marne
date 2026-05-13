import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Home, Users, Zap, ShieldCheck, Box, Truck, MapPin, Info, Settings, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT, SERVICES, FORMULAS } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementParticuliers: React.FC = () => {
  const path = "/demenagement-particuliers-paris";

  const faqs = [
    { q: "Comment préparer un déménagement particulier à Paris ?", a: "La clé réside dans l'anticipation. Commencez par trier vos affaires au moins 2 mois avant, anticipez les démarches liées au stationnement lorsque la situation l’exige et choisissez une formule adaptée à votre volume et votre temps disponible." },
    { q: "Quelle formule choisir pour un déménagement d'appartement ?", a: "Tout dépend de votre budget et de votre implication. La formule Économique est idéale si vous avez un budget serré et du temps pour les cartons. La formule Standard est le meilleur compromis, tandis que la Luxe est parfaite pour une tranquillité totale." },
    { q: "Peut-on demander un monte-meuble ?", a: "Absolument. Si votre immeuble parisien a des escaliers étroits ou un ascenseur trop petit, nous déployons un monte-meuble pour sécuriser le passage de vos pièces volumineuses et gagner en efficacité." },
    { q: "Proposez-vous l'emballage des objets fragiles ?", a: "Oui, c'est le cœur de nos formules Standard et Luxe. Nous utilisons des protections spécifiques (bulles, housses, valises à vaisselle) pour garantir l'intégrité de vos biens les plus précieux durant le transport." },
    { q: "Comment obtenir un devis de déménagement particulier ?", a: "Vous pouvez remplir notre formulaire en ligne ou nous appeler directement. Une visite technique peut être proposée selon la nature du projet pour évaluer précisément le volume et les accès afin de vous fournir un devis détaillé après analyse de votre projet." }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement particuliers Paris | Marne Transdem"
        description="Préparez votre déménagement particulier à Paris avec Marne Transdem. Formules adaptées, protection des biens et devis personnalisé. Expert local 75020."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement particuliers à Paris", "Marne Transdem accompagne les particuliers pour organiser leur déménagement à Paris, en Île-de-France ou longue distance, avec méthode, soin et accompagnement."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Déménagement Particuliers", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-slate-100"
            >
              <Home size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-900">Expertise Particuliers</span>
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black text-brand-900 mb-8 leading-tight tracking-tight">
              Déménagement <br/>
              <span className="text-accent">particuliers</span> à Paris
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed font-light max-w-2xl">
              Marne Transdem accompagne les particuliers pour organiser leur déménagement à Paris, en Île-de-France ou longue distance, avec méthode, soin et accompagnement.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-hover transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-900/20">
                Demander mon devis
                <ArrowRight size={20} />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                <Phone size={20} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bloc de réassurance */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap size={24} />, title: "Devis personnalisé" },
              { icon: <ShieldCheck size={24} />, title: "Protection soignée" },
              { icon: <Settings size={24} />, title: "Formules adaptées" },
              { icon: <Star size={24} />, title: "Accompagnement Pro" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="text-accent">{item.icon}</div>
                <span className="font-bold text-brand-900 text-sm uppercase tracking-wider">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Introduction SEO naturelle */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-900 mb-8">Votre projet, notre priorité</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light mb-6">
              Déménager à Paris est un défi de taille. Entre les rues étroites de la capitale, les immeubles anciens sans ascenseur et les difficultés de stationnement, organiser son changement d'adresse demande une logistique sans faille. Que vous viviez dans un studio, un appartement familial ou une maison en Île-de-France, Marne Transdem met son savoir-faire à votre service.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Notre équipe prend en charge toutes les étapes : de la protection des biens les plus fragiles à la manutention dans les étages les plus élevés. Nous nous adaptons aux accès complexes et assurons une organisation rigoureuse pour que votre transition vers votre futur foyer se déroule sans stress.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Section “Un déménagement particulier bien préparé” */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 leading-tight">Un déménagement particulier bien préparé</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { t: "Préparation des cartons", d: "Livraison anticipée du matériel pour emballer à votre rythme." },
                  { t: "Protection des meubles", d: "Utilisation de housses et couvertures professionnelles." },
                  { t: "Accès complexes à Paris", d: "Gestion des étages, escaliers étroits et accès difficiles." },
                  { t: "Organisation du transport", d: "Logistique maîtrisée pour un acheminement sécurisé." },
                  { t: "Choix de la formule", d: "Trois niveaux de service selon votre besoin et budget." },
                  { t: "Anticipation du volume", d: "Estimation précise pour une organisation optimale." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                      <CheckCircle2 size={20} />
                    </div>
                    <h4 className="font-bold text-brand-900">{item.t}</h4>
                    <p className="text-sm text-slate-500 font-light">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[3rem] bg-slate-200 overflow-hidden shadow-2xl">
                <img src="/images/demenagement-appartement-92.jpg" alt="Déménageur Marne Transdem pour particuliers" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section “Nos prestations pour les particuliers” */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Nos prestations pour les particuliers</h2>
            <p className="text-slate-500">Un large panel de services pour un déménagement clé en main.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Truck />, title: "Chargement et déchargement", desc: "Manutention experte de vos biens par nos déménageurs." },
              { icon: <Truck />, title: "Transport des meubles et cartons", desc: "Acheminement sécurisé vers votre nouvelle adresse." },
              { icon: <ShieldCheck />, title: "Protection des objets fragiles", desc: "Emballage spécifique pour la vaisselle, écrans et objets d'art." },
              { icon: <Settings />, title: "Démontage et remontage", desc: "Nos techniciens s'occupent de votre mobilier complexe." },
              { icon: <Box />, title: "Emballage selon formule", desc: "Prestation adaptée au niveau de confort choisi." },
              { icon: <Zap />, title: "Possibilité de monte-meuble", desc: "Solution de levage selon les accès et contraintes d'immeuble." },
              { icon: <MapPin />, title: "Garde-meuble selon besoins", desc: "Stockage sécurisé entre deux adresses si nécessaire." }
            ].map((p, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">{p.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section “Nos formules pour votre déménagement” */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nos formules pour votre déménagement</h2>
            <p className="text-slate-400">Des solutions flexibles adaptées à chaque budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FORMULAS.map((formula, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] flex flex-col hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-black mb-4 text-accent">{formula.name}</h3>
                <p className="text-slate-300 text-sm mb-10 font-light leading-relaxed">{formula.description}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {formula.features.slice(0, 4).map((f, j) => (
                    <li key={j} className="flex gap-3 text-sm font-light">
                      <CheckCircle2 size={16} className="text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="space-y-4">
                   <Link to="/demande-de-devis" className="block text-center bg-accent text-brand-900 py-4 rounded-full font-bold hover:bg-accent-hover transition-all">
                     Choisir {formula.name}
                   </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
             <Link to="/formules-demenagement" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">
                Comparer les formules en détail
                <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </section>

      {/* 7. Section “Notre méthode en 4 étapes” */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-16">Notre méthode en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { t: "Analyse du projet", d: "Étude de vos besoins et prise de contact initiale." },
              { t: "Estimation du volume et des accès", d: "Calcul précis du volume et étude des accès locaux." },
              { t: "Préparation", d: "Accompagnement et livraison du matériel d'emballage." },
              { t: "Transport et installation", d: "Mise en œuvre soignée et installation à destination." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-brand-900 text-accent rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  0{i + 1}
                </div>
                <h4 className="font-bold text-brand-900 mb-2">{step.t}</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed px-4">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section “Déménager à Paris : accès, étages et stationnement” */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-brand-900">Déménager à Paris : accès, étages et stationnement</h2>
              <p className="text-slate-600 leading-relaxed font-light">
                La vie parisienne impose ses propres règles. Entre les immeubles haussmanniens aux escaliers de service étroits et les quartiers modernes aux accès réglementés, rien n'est laissé au hasard.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Nos équipes sont habituées à gérer l'absence d'ascenseur ou les modèles trop petits. C'est pourquoi nous recommandons souvent l'utilisation d'un monte-meuble pour les étages élevés. Concernant le stationnement, nous anticipons les réservations de voirie nécessaires pour garantir un emplacement sécurisé au pied de votre immeuble le jour J.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                 <div className="flex items-center gap-3 text-accent font-bold mb-2">
                    <Info size={18} />
                    Conseil Local
                 </div>
                 <p className="text-sm text-slate-500 italic font-light">"Anticipez les démarches liées au stationnement le plus tôt possible afin de faciliter l’organisation le jour du déménagement."</p>
              </div>
            </div>
            <div className="aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl">
               <img src="/images/demenagement-paris-intra-muros.jpg" alt="Paris Streets Moving" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section CTA intermédiaire */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Besoin d’un devis pour votre déménagement particulier ?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez votre projet et recevez une estimation adaptée à votre situation.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20">
              Demander mon devis
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 10. Pourquoi choisir Marne Transdem ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Pourquoi choisir Marne Transdem ?</h2>
            <p className="text-slate-500">Un acteur de proximité engagé pour votre satisfaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Entreprise à Paris 20e", d: "Une connaissance approfondie de chaque rue de l'Est Parisien." },
              { t: "Protection Soignée", d: "Matériel professionnel pour mettre vos biens à l'abri des chocs." },
              { t: "Organisation Claire", d: "Pas de mauvaise surprise le jour J avec une planification rigoureuse." },
              { t: "Formules Flexibles", d: "Nous nous adaptons à votre budget sans compromis sur la qualité." },
              { t: "Service Client Direct", d: "Un interlocuteur unique pour répondre à toutes vos questions." },
              { t: "Rayonnement IDF", d: "Intervention à Paris, en Île-de-France et longue distance selon votre projet." }
            ].map((reason, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-accent shrink-0 mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-2">{reason.t}</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{reason.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ spécifique */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Questions fréquentes particuliers</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6 items-start group hover:border-accent transition-all">
                <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                   <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 text-lg mb-2">{faq.q}</h4>
                  <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Maillage interne */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
           <h3 className="text-xs font-black text-brand-900 uppercase tracking-[0.4em] mb-12 text-center opacity-40">Explorer nos services complémentaires</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/formules-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Formules</h4>
                <p className="text-xs text-slate-500 font-light">Trouvez le service adapté.</p>
              </Link>
              <Link to="/location-monte-meuble-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Monte-meuble</h4>
                <p className="text-xs text-slate-500 font-light">Levage grandes hauteurs.</p>
              </Link>
              <Link to="/emballage-protection-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Protection</h4>
                <p className="text-xs text-slate-500 font-light">Soin maximal des biens.</p>
              </Link>
              <Link to="/garde-meuble-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Garde-meuble</h4>
                <p className="text-xs text-slate-500 font-light">Stockage sécurisé.</p>
              </Link>
           </div>
           <div className="mt-12 flex justify-center gap-8 text-sm font-bold text-slate-400">
              <Link to="/demande-de-devis" className="hover:text-accent">Demander mon devis</Link>
              <Link to="/contact" className="hover:text-accent">Contact</Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementParticuliers;

