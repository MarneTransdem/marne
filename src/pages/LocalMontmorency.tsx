import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalMontmorency: React.FC = () => {
  const path = "/demenagement-montmorency";
  
  const faqs = [
    { 
      q: "Quelles sont les difficultés d'accès typiques lors d'un déménagement à Montmorency ?", 
      a: "Bâtie sur une colline, Montmorency présente un relief marqué avec de nombreuses rues en pente forte, des voies sinueuses et des accès pavillonaires parfois étroits ou arborés. Ces contraintes exigent une logistique minutieuse : choix de camions de taille adaptée, déploiement d'un monte-meubles performant et équipes habituées aux manutentions physiques exigeantes." 
    },
    { 
      q: "Comment réserver le stationnement pour un déménagement à Montmorency (95160) ?", 
      a: "L'autorisation temporaire de stationnement s'obtient auprès de la Mairie de Montmorency ou de la Communauté d'Agglomération. Marne Transdem gère l'ensemble de ces démarches administratives et s'assure de l'implantation de la signalétique réglementaire 48h à l'avance pour sanctuariser l'espace nécessaire à nos véhicules." 
    },
    { 
      q: "Proposez-vous des formules haut de gamme (Luxe) pour les propriétés de standing ?", 
      a: "Tout à fait. Pour les grandes propriétés et pavillons de standing de la vallée de Montmorency, nous disposons d'une formule clés en main incluant l'emballage complet de tous vos objets fragiles (vaisselle, œuvres d'art, verrerie, bibelots) par nos techniciens, la mise sur penderies de vos vêtements délicats et le remontage soigné de vos meubles précieux." 
    },
    { 
      q: "Quel est le délai pour fixer une visite technique gratuite à Montmorency ?", 
      a: "Nous pouvons planifier une visite technique d'évaluation (sur site ou à distance en visioconférence) très rapidement, souvent sous 24 à 48 heures. Cette visite permet d'estimer avec précision le cubage et d'anticiper la topographie des accès pour élaborer un devis détaillé gratuit sans surprise." 
    }
  ];

  const nearbySectors = [
    { n: "Enghien-les-Bains", l: "/demenagement-enghien-les-bains" },
    { n: "Saint-Gratien", l: "/demenagement-saint-gratien" },
    { n: "Ermont", l: "/demenagement-ermont" },
    { n: "Val-d'Oise (95)", l: "/demenagement-val-d-oise" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Montmorency | Premium & Qualité | Marne Transdem"
        description="Besoin d'un déménageur à Montmorency (95160) ? Marne Transdem propose des prestations de déménagement premium pour pavillons et propriétés de standing dans la vallée."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Montmorency", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de standing - Montmorency (95)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Montmorency</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Déménagements premium pour pavillons de standing avec accès techniques complexes. Une prise en charge sur-mesure d’une sécurité rigoureuse.
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

      {/* Content Section */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Excellence logistique <span className="text-accent italic">à Montmorency</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Perchée sur les hauteurs de la vallée éponyme, **Montmorency** se distingue par ses coteaux verdoyants, ses demeures historiques et ses belles propriétés de standing. Cependant, cette situation géographique privilégiée induit des contraintes majeures lors d'un déménagement : pentes fortes, impasses étroites et allées de jardin escarpées.
                </p>
                <p>
                  Chez **Marne Transdem**, nous avons developpé un savoir-faire spécifique pour relever ces défis techniques. Nous assurons la manutention méticuleuse de votre mobilier haut de gamme, de vos instruments de musique volumineux ou de vos objets précieux grâce à des techniques de portage sécurisées et une flotte de monte-meubles récents capables de contourner de nombreux obstacles de hauteur ou de recul.
                </p>
                <p>
                  Chaque étape est planifiée à l'avance par des conseillers qualifiés, depuis la déclaration de stationnement en mairie jusqu'au déploiement de protections spécifiques pour l’intérieur de vos demeures, pour un service haut de gamme exempt de tout tracas.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/camion-demenagement-95.jpg" 
                  alt="Déménagement à Montmorency" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobilité Connexe / Maillage */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">       
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Montmorency</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
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

      {/* FAQ Section */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Montmorency</span></h2>
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

export default LocalMontmorency;
