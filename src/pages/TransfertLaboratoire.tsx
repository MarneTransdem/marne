import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, Zap, Truck, Microscope, FlaskConical, ClipboardCheck, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const TransfertLaboratoire: React.FC = () => {
  const path = "/transfert-laboratoire-paris";

  const faqs = [
    { 
      q: "Assurez-vous le transport de matériel médical de haute précision ?", 
      a: "Oui, nous sommes formés à la manipulation d'équipements médicaux et scientifiques très sensibles (microscopes, centrifugeuses, équipements d'analyse). Nous utilisons des emballages sur-mesure et des moyens de transport suspendus pour éliminer toute vibration." 
    },
    { 
      q: "Prenez-vous en charge le transport de produits sous température contrôlée ?", 
      a: "Nous assurons la logistique et la manutention de ces produits. Pour les transferts nécessitant un maintien strict de la chaîne du froid, nous travaillons avec des caisses isothermes spécifiques ou des partenaires spécialisés en transport frigorifique." 
    },
    { 
      q: "Gérez-vous le transfert complet de laboratoires de recherche ?", 
      a: "Absolument. Marne Transdem gère le transfert complet : mobiliers de laboratoire, verrerie, équipements informatiques dédiés, consommables et machines de précision, dans le respect de vos protocoles de sécurité." 
    },
    { 
      q: "Quelles certifications possédez-vous pour ce type de transfert ?", 
      a: "Nos équipes sont formées aux bonnes pratiques de manutention en milieu sensible et nous appliquons des processus rigoureux de traçabilité et de sécurité conformes aux exigences du secteur médical et scientifique." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert de Laboratoires & Médical Paris | Marne Transdem"
        description="Expert du transfert de laboratoires et matériel médical à Paris. Manutention d'équipements de précision, sécurité renforcée et logistique pour milieux sensibles."
        canonical={path}
        schema={[
          getServiceSchema("Transfert de Laboratoire", "Marne Transdem offre un service de transfert spécialisé pour les laboratoires, pharmaciens et centres médicaux, garantissant intégrité et sécurité du matériel."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Transfert Laboratoire", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white font-sans italic transition-all">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Microscope size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Logistique Milieux Sensibles & Médical</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">laboratoire</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Rigueur absolue pour vos équipements de précision. Marne Transdem accompagne les centres de recherche, laboratoires et établissements de santé à Paris et en Île-de-France.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis spécialisé labo
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

      {/* Expertise section for sensitive environments */}
      <section className="py-24 font-sans italic underline-none">
        <div className="container mx-auto px-4 md:px-6 italic transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Précision <span className="text-accent italic">& Intégrité</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                <p>
                  Le <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert de laboratoire</span> exige une méthodologie radicalement différente du déménagement classique. Entre fragilité extrême des composants optiques et contraintes de décontamination, Marne Transdem déploie des moyens de protection sur-mesure.
                </p>
                <p>
                  Nous utilisons des emballages techniques, des systèmes d'amortissement de vibrations et des bacs de transport stérilisables pour garantir une sécurité parfaite. Nos équipes connaissent la valeur stratégique et financière de vos équipements et interviennent avec la plus grande précaution pour une remise en exploitation immédiate.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 italic transition-all grayscale-0">
               {[
                 { icon: <FlaskConical size={24} />, t: "Verrerie & Consommables", d: "Conditionnement spécifique pour les élements fragiles et sensibles." },
                 { icon: <Microscope size={24} />, t: "Appareillage de Précision", d: "Manutention experte pour instruments de mesure et optiques." },
                 { icon: <ShieldCheck size={24} />, t: "Sécurité & Traçabilité", d: "Protocoles de transfert rigoureux avec suivi permanent." }
               ].map((item, i) => (
                 <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex gap-6 items-start italic transition-all hover:border-accent">
                    <div className="text-accent italic">{item.icon}</div>
                    <div>
                       <h3 className="font-bold text-brand-900 text-sm uppercase italic mb-2">{item.t}</h3>
                       <p className="text-xs text-slate-500 font-light italic leading-relaxed">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Intervention Milieu Sensible */}
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2 italic transition-all"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic transition-all grayscale-0">
          <h2 className="text-3xl lg:text-6xl font-black mb-10 leading-tight italic uppercase tracking-tight">Confiez votre recherche <br/><span className="text-accent italic">à des mains expertes</span></h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light leading-relaxed italic">
            Audit de site gratuit et planification logistique dédiée pour votre transfert de laboratoire.
          </p>
          <div className="flex flex-wrap justify-center gap-6 italic">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 italic underline-none">
              Demander mon étude gratuite
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 backdrop-blur-sm italic">
              <Phone size={22} className="text-accent italic" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Laboratoire */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic grayscale-0">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic transition-all">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight font-sans italic underline-none">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic underline-none">Laboratoire</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic grayscale-0 shadow-none">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic font-sans italic transition-all italic underline-none">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 border-t border-slate-100 font-sans italic transition-all italic underline-none grayscale-0">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all underline-none">
            <Link to="/transfert-industriel-paris" className="hover:text-accent transition-all italic">Logistique Industrielle</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic transition-all italic grayscale-0">Transfert Pro Paris</Link>
            <Link to="/transfert-informatique-paris" className="hover:text-accent transition-all italic">Transfert IT & Serveurs</Link>
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Conservation Archives</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic font-sans italic transition-all italic">Expert Milieux Critiques</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertLaboratoire;
