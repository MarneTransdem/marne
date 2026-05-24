import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, CheckCircle2, Building2, Package, Calculator, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalLesLilas: React.FC = () => {
  const path = "/demenagement-les-lilas";
  
  const faqs = [
    { 
      q: "Comment s'organise un déménagement dans le centre-ville des Lilas ?", 
      a: "Le centre des Lilas bénéficie d'une configuration urbaine proche de Paris, avec des rues parfois étroites et une circulation dense. Marne Transdem anticipe ces contraintes en effectuant une visite technique préventive pour analyser les accès (stationnement, rue piétonne, cour intérieure) et définir le type de véhicule le plus adapté (camion capitonné de moyen gabarit ou recours à un monte-meuble si nécessaire)." 
    },
    { 
      q: "Quelles sont les formalités de stationnement auprès de la Mairie des Lilas ?", 
      a: "Pour stationner votre camion de déménagement sur la voie publique aux Lilas, il est obligatoire d'obtenir une autorisation d'occupation temporaire (AOT). Cette demande doit être transmise aux services techniques de la Mairie des Lilas avec un délai minimal de 15 jours avant la date prévue. Marne Transdem gère l'intégralité de cette procédure administrative et la pose des panneaux de stationnement 48h en amont pour vous garantir un accès dégagé le jour J." 
    },
    { 
      q: "Proposez-vous des solutions de déménagement pour les petits commerces des Lilas ?", 
      a: "Absolument. Nous sommes habitués à accompagner le développement des commerces de proximité aux Lilas. Déménagement de comptoirs, mobilier spécialisé, stockage de marchandise, nous assurons une logistique rapide pour limiter au maximum l'interruption de votre activité, en planifiant les opérations sur des créneaux horaires flexibles." 
    },
    { 
      q: "Comment planifier l'estimation gratuite de mon volume aux Lilas ?", 
      a: "Il suffit de nous contacter par téléphone ou via notre formulaire en ligne. Un conseiller Marne Transdem fixera rapidement une visite à votre adresse, ou une visio en cas d'indisponibilité, pour évaluer les accès et votre volume à déménager, et vous transmettre sous 24h un devis gratuit et ferme, sans engagement." 
    }
  ];

  const nearbySectors = [
    { n: "Paris 20e", l: "/demenagement-paris-20" },
    { n: "Paris 19e", l: "/demenagement-paris-19" },
    { n: "Bagnolet", l: "/demenagement-bagnolet" },
    { n: "Romainville", l: "/demenagement-romainville" },
    { n: "Pantin", l: "/demenagement-pantin" },
    { n: "Montreuil", l: "/demenagement-montreuil" },
    { n: "Seine-Saint-Denis (93)", l: "/demenagement-seine-saint-denis" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Les Lilas | Particuliers & Commerces | Marne Transdem"
        description="Besoin d'un déménageur aux Lilas (93260) ? Marne Transdem propose des solutions de déménagement pour logements familiaux et commerces de proximité. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Les Lilas", item: path }
          ])
        ]}
      />

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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Les Lilas (93)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Les Lilas</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Solutions de déménagement sur-mesure pour vos logements familiaux et vos commerces de proximité aux Lilas. Une logistique pensée pour la sérénité des résidents de l'est parisien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander mon chiffrage gratuit
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

      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre déménageur <span className="text-accent italic">de confiance aux Lilas</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Idéalement située aux portes de Paris (20e arrondissement), la ville des Lilas allie la tranquillité d'une vie familiale de banlieue à une proximité immédiate avec la capitale. Les Lilas accueillent aujourd'hui de nombreux jeunes actifs et familles qui apprécient son caractère authentique, ses parcs et son dynamisme commercial.
                </p>
                <p>
                  Réussir son déménagement ici nécessite une expertise locale. Les rues en pente typiques des quartiers des Lilas, ainsi que la densité de stationnement, exigent une organisation rigoureuse.
                </p>
                <p>
                  <strong>Marne Transdem</strong> intervient aux Lilas avec tout le matériel professionnel requis : monte-meubles d'extérieur pour les accès difficiles, emballages spécialisés, et une équipe de compagnons formés qui assurent la sécurité de vos biens du début à la fin de la prestation.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-lilas-93.jpg" 
                  alt="Déménagement aux Lilas" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">       
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">des Lilas</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {nearbySectors.map((s, i) => (
              s.l ? (
                <Link key={i} to={s.l} className="bg-white p-6 rounded-2xl border border-slate-100 group hover:border-accent hover:shadow-lg transition-all text-center shadow-sm">
                  <span className="font-bold text-brand-900 group-hover:text-accent transition-colors text-xs uppercase tracking-wider">{s.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-white/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center opacity-60">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">{s.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Les Lilas</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
                <h4 className="text-lg font-bold text-brand-900 mb-4 flex items-start gap-4 tracking-tight uppercase">
                  <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-4 border-accent/20 text-justify">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalLesLilas;
