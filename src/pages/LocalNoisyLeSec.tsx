import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalNoisyLeSec: React.FC = () => {
  const path = "/demenagement-noisy-le-sec";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités d'un transfert à Noisy-le-Sec ?", 
      a: "Noisy-le-Sec offre une diversité de quartiers, des secteurs pavillonnaires aux zones plus denses en centre-ville. Chaque opération nécessite une logistique préparée, notamment pour l'accès aux immeubles et le stationnement, que nous étudions lors de notre visite technique." 
    },
    { 
      q: "Comment Marne Transdem gère le stationnement à Noisy-le-Sec (93130) ?", 
      a: "Nous prenons en charge la totalité de la gestion administrative auprès de la Mairie de Noisy-le-Sec pour obtenir votre Autorisation d'Occupation Temporaire (AOT). Nous posons également la signalétique 48h avant le déménagement pour garantir un emplacement libéré." 
    },
    { 
      q: "Proposez-vous des services de transfert de bureaux à Noisy-le-Sec ?", 
      a: "Bien sûr. Nos équipes sont formées pour le transfert de bureaux et locaux professionnels à Noisy-le-Sec, en veillant à minimiser l'interruption de votre activité grâce à une planification rigoureuse et des équipements de protection adaptés." 
    },
    { 
      q: "Comment planifier mon estimation à Noisy-le-Sec ?", 
      a: "C'est très simple : contactez-nous par téléphone ou via notre formulaire de demande en ligne. Un expert se rendra à votre domicile à Noisy-le-Sec ou organisera une visio pour évaluer précisément votre volume et les accès afin de vous remettre un devis ferme sous 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Bondy", l: "/demenagement-bondy" },
    { n: "Romainville", l: "/demenagement-romainville" },
    { n: "Pantin", l: "/demenagement-pantin" },
    { n: "Bobigny", l: "/demenagement-bobigny" },
    { n: "Drancy", l: "/demenagement-drancy" },
    { n: "Seine-Saint-Denis (93)", l: "/demenagement-seine-saint-denis" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Noisy-le-Sec | Bureaux & Appartements | Marne Transdem"
        description="Besoin d'un déménageur à Noisy-le-Sec (93130) ? Marne Transdem gère vos transferts de bureaux et déménagements d'appartements en zone urbaine. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Noisy-le-Sec", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Noisy-le-Sec (93)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Noisy-le-Sec</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Transferts de bureaux et déménagements d'appartements en zone urbaine à Noisy-le-Sec. Une expertise terrain pour une transition maitrisée.
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
                Votre déménageur <span className="text-accent italic">à Noisy-le-Sec</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Ville dynamique de l'est parisien, Noisy-le-Sec conjugue un habitat résidentiel diversifié et un tissu d'activités tertiaires en pleine évolution. Que vous déménagiez au sein d'un quartier pavillonnaire ou que vous transfériez vos bureaux, cette zone urbaine exige une logistique bien calibrée.
                </p>
                <p>
                  Réussir son déménagement ici demande d'anticiper la densité de stationnement et d'organiser les accès, particulièrement dans les secteurs les plus urbains.
                </p>
                <p>
                  <strong>Marne Transdem</strong> met en œuvre un savoir-faire spécifique pour ces opérations : véhicules adaptés aux rues de gabarit variable, monte-meubles d'extérieur si besoin et des équipes formées pour le transfert de mobiliers professionnels et personnels, assurant ainsi une transition sans stress.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-appartement-93.jpg" 
                  alt="Déménagement à Noisy-le-Sec" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Noisy-le-Sec</span></h2>
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Noisy-le-Sec</span></h2>
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

export default LocalNoisyLeSec;
