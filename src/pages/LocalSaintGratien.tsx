import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalSaintGratien: React.FC = () => {
  const path = "/demenagement-saint-gratien";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités d'un déménagement à Saint-Gratien ?", 
      a: "Saint-Gratien, située à proximité immédiate du lac d'Enghien et du pôle Enghien-Soisy, marie des zones résidentielles calmes et verdoyantes à des axes de transit denses. La gestion des copropriétés, des rues à stationnement alterné et des pavillons de standing requiert un équipement adapté, comme des camions capitonnés de tailles variées et des monte-meubles mobiles." 
    },
    { 
      q: "Comment s'organise l'autorisation de stationnement à Saint-Gratien (95210) ?", 
      a: "Marne Transdem effectue les démarches d'autorisation temporaire de stationnement auprès des services techniques de la mairie de Saint-Gratien. Nous installons les signalisations nécessaires au moins 48 heures à l'avance pour sécuriser les emplacements réservés à nos camions de déménagement." 
    },
    { 
      q: "Proposez-vous des formules adaptées pour les professionnels proches d'Enghien-Soisy ?", 
      a: "Tout à fait. Nous offrons des solutions sur-mesure de transfert de bureaux, commerces et administrations à Saint-Gratien et sur l'ensemble du pôle Enghien-Soisy. Nos équipes planifient précisément le déménagement, parfois en dehors des heures de bureau habituelles, pour garantir une parfaite continuité de votre activité." 
    },
    { 
      q: "Comment obtenir un devis gratuit pour déménager à Saint-Gratien ?", 
      a: "Il suffit de nous contacter par téléphone ou de compléter notre formulaire en ligne. Nous organisons une visite technique d'évaluation de volume (sur site ou en visioconférence) afin de repérer les accès et obstacles éventuels. Suite à cela, nous vous remettons une proposition ferme et définitive sous 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Enghien-les-Bains", l: "/demenagement-enghien-les-bains" },
    { n: "Argenteuil", l: "/demenagement-argenteuil" },
    { n: "Ermont", l: "/demenagement-ermont" },
    { n: "Val-d'Oise (95)", l: "/demenagement-val-d-oise" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Saint-Gratien | Particuliers & Entreprises | Marne Transdem"
        description="Besoin d'un déménageur professionnel à Saint-Gratien (95210) ? Marne Transdem propose des solutions d'emballage, transport et monte-meuble pro proches du pôle Enghien-Soisy."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Saint-Gratien", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Saint-Gratien (95)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Saint-Gratien</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Solutions sur-mesure pour particuliers et entreprises proches du pôle Enghien-Soisy. De la préparation d'emballages à la manutention sécurisée.
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
                Votre déménageur <span className="text-accent italic">à Saint-Gratien & Enghien-Soisy</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Idéalement ceinturée par d'importants pôles économiques et résidentiels comme **Enghien-les-Bains** et **Soisy-sous-Montmorency**, la commune de **Saint-Gratien** offre un cadre prisé et dynamique qui séduit autant les familles que les entrepreneurs en quête d'accessibilité.
                </p>
                <p>
                  Que vous emménagiez dans une maison bourgeoise, une copropriété moderne, ou que vous pilotiez le transfert de vos bureaux professionnels, **Marne Transdem** est votre partenaire logistique privilégié. Nous anticipons les difficultés techniques caractéristiques du secteur afin de rendre la transition efficace et sereine.
                </p>
                <p>
                  Grâce à nos formules modulables (économique, standard, luxe) et nos options spécifiques de monte-meuble et garde-meuble, vous profitez d'une prestation de haut niveau encadrée par des déménageurs professionnels expérimentés d'Île-de-France.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-saint-gratien.jpg" 
                  alt="Déménagement à Saint-Gratien" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maillage / Santé de liaison */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">       
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Saint-Gratien</span></h2>
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Saint-Gratien</span></h2>
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

export default LocalSaintGratien;
