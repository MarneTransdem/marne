import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Zap, FileText, ClipboardCheck, Package, Calculator, Truck, Star, HelpCircle, Briefcase, Info, ListTodo } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementMutation: React.FC = () => {
  const path = "/demenagement-mutation-professionnelle";

  const faqs = [
    { 
      q: "Mon employeur demande un devis spécifique, pouvez-vous l'établir ?", 
      a: "Oui. Nous établissons des devis détaillés conformes aux exigences des départements RH et des services achats. Nous pouvons inclure les prestations spécifiques demandées (emballage complet, assurance ad valorem, etc.)." 
    },
    { 
      q: "Dans quels délais puis-je obtenir un devis pour ma mutation ?", 
      a: "Nous sommes conscients de l'urgence liée aux mutations professionnelles. Après une visite technique (physique ou vidéo), vous recevez votre devis sous 24 à 48 heures maximum." 
    },
    { 
      q: "Proposez-vous une assistance pour les démarches administratives ?", 
      a: "Nous fournissons tous les documents nécessaires à votre dossier de remboursement : lettre de voiture, contrat de déménagement, déclaration de valeur et facture acquittée." 
    },
    { 
      q: "Prenez-vous en charge le déménagement de ma famille également ?", 
      a: "Absolument. Notre service mutation professionnelle couvre l'intégralité du foyer pour assurer une transition fluide vers votre nouvelle affectation, à Paris ou en province." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Mutation Professionnelle Paris | Marne Transdem"
        description="Une mutation professionnelle en vue ? Marne Transdem vous accompagne avec des devis rapides, une organisation réactive et un dossier conforme pour votre employeur."
        canonical={path}
        schema={[
          getServiceSchema("Mutation Professionnelle", "Service de déménagement pour les salariés en mutation professionnelle, fonctionnaires et cadres, incluant l'aide administrative."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Mutation Professionnelle", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white font-sans">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Briefcase size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Spécial Mobilité & Mutation Salariée</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Mutation <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">professionnelle</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic font-sans italic transition-all italic underline-none italic translate-y-0 italic grayscale-0 italic opacity-100">
              Marne Transdem facilite votre mobilité professionnelle avec des solutions réactives et un accompagnement administratif complet vers votre nouvelle affectation à Paris, en Île-de-France ou au niveau national.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 italic font-sans transition-all italic underline-none">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none italic grayscale-0 italic opacity-100 italic transition-opacity font-sans">
                Devis rapide mutation
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform italic" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm italic">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro section for HR/Employees */}
      <section className="py-24 font-sans italic underline-none italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic text-brand-900 italic font-sans italic transition-all italic transition-opacity italic grayscale-0 italic opacity-100">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic translate-y-0 italic grayscale-0 italic opacity-100 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic transition-all italic grayscale-0 italic opacity-100 italic">
            <div className="space-y-8 italic font-sans transition-all italic grayscale-0 italic">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-accent italic">
                Réactivité <span className="text-accent italic font-sans italic transition-all italic grayscale-0 italic opacity-100 italic">& Professionnalisme</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify grayscale-0 italic transition-opacity italic">
                <p>
                  Une <span className="font-bold text-brand-900 underline decoration-accent/10 underline-offset-4 italic">mutation professionnelle</span> est souvent synonyme d'urgence et de contraintes administratives. Marne Transdem est le partenaire des entreprises et des salariés pour organiser ces transferts de domicile de manière fluide et rigoureuse.
                </p>
                <p>
                  Nous établissement des devis transparents, conformes aux exigences des départements des Ressources Humaines. Notre objectif est de décharger le collaborateur de toute la logistique liée au déménagement pour qu'il puisse se concentrer sur sa nouvelle mission. Nous intervenons en <Link to="/demenagement-longue-distance" className="text-brand-900 font-bold hover:text-accent italic transition-colors underline decoration-accent/10 italic">longue distance</Link> ou en local.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic grayscale-0 italic">
                 <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic grayscale-0 italic shadow-none italic">
                   <CheckCircle2 size={16} className="text-accent italic grayscale-0 italic" />
                   <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic grayscale-0 italic opacity-100">Dossier RH Conforme</span>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic grayscale-0 italic shadow-none italic">
                   <Zap size={16} className="text-accent italic grayscale-0 italic" />
                   <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic grayscale-0 italic opacity-100">Devis sous 24/48h</span>
                 </div>
              </div>
            </div>
            <div className="rounded-[4rem] overflow-hidden grayscale-[30%] shadow-2xl skew-x-1 italic font-sans transition-all italic shadow-none italic">
               <img src="/images/mutation-professionnelle-paris.jpg" alt="Mutation professionnelle Paris Marne Transdem" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 italic" />
            </div>
          </div>
        </div>
      </section>

      {/* Services and specific items Cards */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
          <div className="text-center mb-16 italic font-sans transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all italic font-sans italic grayscale-0 italic shadow-none italic">Une offre <span className="text-accent italic tracking-tight italic transition-all italic grayscale-0 italic shadow-none italic">dédiée mobilité</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
            {[
              { icon: <FileText size={32} />, t: "Gestion Administrative", d: "Établissement des factures, contrats et certificats nécessaires au remboursement." },
              { icon: <Calculator size={32} />, t: "Estimation Précise", d: "Visite technique gratuite pour un cubage exact et un devis sans surprise." },
              { icon: <Package size={32} />, t: "Emballage Intégral", d: "Protection experte du foyer pour une remise au travail sans délai." },
              { icon: <Truck size={32} />, t: "Transition Rapide", d: "Respect strict des dates imposées par votre prise de poste." }
            ].map((card, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 h-full hover:border-accent transition-all group italic font-sans transition-all italic grayscale-0 italic shadow-none italic">
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform italic font-sans italic grayscale-0 italic opacity-100 italic transition-opacity">{card.icon}</div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight italic font-sans transition-all italic grayscale-0 italic shadow-none italic">{card.t}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step guide for the employee */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
           <div className="max-w-4xl mx-auto italic font-sans transition-all italic underline decoration-accent/20 italic underline-offset-8 transition-all grayscale-0 italic shadow-none italic opacity-100 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-12 text-center uppercase italic tracking-tight font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">Simplifiez <span className="text-accent italic tracking-tight italic transition-all italic grayscale-0 italic shadow-none italic">vos démarches</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                 <div className="space-y-6 italic font-sans transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                    <p className="text-slate-500 text-lg font-light leading-relaxed italic text-justify italic font-sans transition-all italic grayscale-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                      Nous accompagnons les salariés en mutation sur tous les aspects logistiques. De l'emballage de la vaisselle au démontage des mobiliers complexes, Marne Transdem assure une prestation premium qui répond aux standards de qualité demandés par les grandes entreprises et administrations.
                    </p>
                    <ul className="space-y-4 italic font-sans transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                       {[
                         "Intervention possible en fin de semaine",
                         "Transfert de résidence principale & famille",
                         "Coordination avec les services RH",
                         "Assurance Ad Valorem complète"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                           <CheckCircle2 size={20} className="text-accent italic grayscale-0 italic opacity-100" />
                           <span className="text-slate-600 font-medium italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
                             {item}
                           </span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-brand-900 p-12 rounded-[3.5rem] text-white italic font-sans transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                    <h4 className="text-xl font-bold mb-8 uppercase italic tracking-tight border-b border-accent pb-4 italic">Check-list Mutation</h4>
                    <div className="space-y-6 italic">
                       {[
                         { step: "Visite", d: "Demandez une visite virtuelle ou physique." },
                         { step: "Deis", d: "Recevez votre offre détaillée sous 24h." },
                         { step: "Prise en charge", d: "Soumettez le devis à votre employeur." },
                         { step: "Planning", d: "Bloquez vos dates de déménagement." }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-4 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                            <span className="text-accent font-black italic">{i+1}.</span>
                            <div>
                               <div className="font-bold uppercase text-[10px] tracking-widest italic">{item.step}</div>
                               <div className="text-xs text-slate-400 italic">{item.d}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Mutation */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8 italic transition-all grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">Mutation</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                   <HelpCircle className="text-accent shrink-0 italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 bg-white border-t border-slate-100 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Devis URGENCE</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Formules Mobilité</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Longue Distance</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Transfert Pro</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Contact RH</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementMutation;
