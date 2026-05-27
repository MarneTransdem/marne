import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalBobigny: React.FC = () => {
  const path = "/demenagement-bobigny";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités des déménagements administratifs à Bobigny ?", 
      a: "Bobigny concentre de nombreuses administrations. Marne Transdem possède une expertise dans le transfert de bureaux et services publics, avec une logistique minutieuse pour limiter l'interruption de service, gérer les accès sécurisés et transporter le matériel sensible." 
    },
    { 
      q: "Comment gérez-vous le stationnement pour les logements collectifs à Bobigny ?", 
      a: "Pour les grands ensembles et logements collectifs, l'accès au pied de l'immeuble est crucial. Nous effectuons pour vous la demande d'Autorisation d'Occupation Temporaire (AOT) à la Mairie de Bobigny et installons la signalétique 48h avant pour garantir un accès libéré le jour J." 
    },
    { 
      q: "Proposez-vous des services adaptés aux particuliers emménageant à Bobigny ?", 
      a: "Absolument. Que vous emménagiez dans une résidence récente ou un immeuble plus ancien, nous adaptons nos moyens (monte-meubles, camions de gabarits différents) et protégeons vos biens avec le plus grand soin pour une installation sereine." 
    },
    { 
      q: "Comment réserver une estimation gratuite avec Marne Transdem à Bobigny ?", 
      a: "Contactez-nous par téléphone ou via notre formulaire en ligne. Nous organiserons rapidement une visite technique (sur site à Bobigny ou en visio) afin d'évaluer vos besoins, accès et volume, et vous transmettrons une offre chiffrée ferme sous 24h." 
    }
  ];

  const nearbySectors = [
    { n: "Drancy", l: "/demenagement-drancy" },
    { n: "Noisy-le-Sec", l: "/demenagement-noisy-le-sec" },
    { n: "Bondy", l: "/demenagement-bondy" },
    { n: "Pantin", l: "/demenagement-pantin" },
    { n: "Aulnay-sous-Bois", l: "/demenagement-aulnay-sous-bois" },
    { n: "Seine-Saint-Denis (93)", l: "/demenagement-seine-saint-denis" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Bobigny | Administratif & Logements Collectifs | Marne Transdem"
        description="Besoin d'un déménageur à Bobigny (93000) ? Marne Transdem offre son expertise pour les déménagements administratifs et logements collectifs. Devis Gratuit."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Bobigny", item: path }
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de Proximité - Bobigny (93)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Bobigny</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Expertise pour les déménagements administratifs et les logements collectifs à Bobigny. Une logistique pensée pour la précision et la sérénité.
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
                Votre déménageur <span className="text-accent italic">à Bobigny</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Capitale administrative dynamique de la Seine-Saint-Denis, Bobigny se caractérise par son urbanisme dense, ses nombreux centres de décision et des quartiers résidentiels composés majoritairement de logements collectifs.
                </p>
                <p>
                  Ces spécificités exigent une logistique de déménagement maîtrisée, capable d'intervenir dans des environnements contraints, qu'il s'agisse de transférer des services administratifs sensibles ou de déménager des familles dans des immeubles résidentiels.
                </p>
                <p>
                  <strong>Marne Transdem</strong> déploie à Bobigny des équipes rompues aux exigences de mobilité urbaine. Nous optimisons chaque intervention : des accès sécurisés pour les bureaux aux monte-meubles d'extérieur pour les étages élevés des logements collectifs, garantissant la sécurité de vos biens et le respect des délais convenus.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-appartement-93.jpg" 
                  alt="Déménagement à Bobigny" 
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Bobigny</span></h2>
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic">Bobigny</span></h2>
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

export default LocalBobigny;
