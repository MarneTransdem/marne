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
      q: "Quelles informations transmettre pour déplacer un appareil de laboratoire ?",
      a: "Indiquez la marque, le modèle, les dimensions et le poids documenté de chaque appareil. Joignez des photos et les consignes de transport du fabricant. Précisez les préparations ou interventions techniques nécessaires afin de faire confirmer la prise en charge et les moyens adaptés avant le devis."
    },
    { 
      q: "Comment signaler des produits ou des contraintes de température ?",
      a: "Identifiez séparément les produits biologiques, chimiques et les éléments soumis à une température particulière dans votre demande. Transmettez les contraintes à votre responsable de laboratoire et à l’interlocuteur chargé du devis pour examiner les besoins. Leur présence dans l’inventaire ne vaut pas acceptation de leur transport : les prestations et les intervenants restent à confirmer."
    },
    { 
      q: "Comment organiser le transfert du mobilier et des équipements ?",
      a: "Préparez un inventaire par salle et indiquez l’emplacement prévu à l’arrivée. Distinguez mobilier, verrerie, appareils et matériel informatique. Précisez les accès, les créneaux disponibles et les personnes présentes pour la réception. Le devis doit définir les éléments retenus et les étapes convenues."
    },
    { 
      q: "La remise en service des appareils fait-elle partie du déménagement ?",
      a: "Identifiez avec votre responsable technique les interventions nécessaires avant et après le transport : arrêt, déconnexion, préparation, installation ou vérifications des appareils. Faites préciser qui réalise chaque étape. Une demande de transport ne signifie pas que ces opérations techniques sont incluses."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert de Laboratoires & Médical Paris | Marne Transdem"
        description="Transfert de laboratoire à Paris : préparez l’inventaire du mobilier et des appareils, les accès et le calendrier pour faire étudier votre demande de devis."
        canonical={path}
        schema={[
          getServiceSchema("Transfert de Laboratoire", "Préparation d’une demande de transfert de laboratoire à Paris et en Île-de-France : inventaire du mobilier et des appareils, accès, calendrier et prestations à confirmer au devis."),
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Microscope size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Préparer votre transfert à Paris</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">laboratoire</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Vous préparez un transfert de laboratoire à Paris ou en Île-de-France ? Présentez à Marne Transdem votre inventaire, les contraintes des locaux et le calendrier envisagé pour étudier les prestations de déménagement adaptées à votre projet.
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
                Inventaire <span className="text-accent italic">& préparation des accès</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                <p>
                  Pour votre <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert de laboratoire</span>, listez le mobilier et les appareils salle par salle. Indiquez leurs dimensions, leur poids connu, les fragilités et les consignes du fabricant. Joignez des photos des équipements, des portes, des couloirs et des zones de chargement aux deux adresses.
                </p>
                <p>
                  Précisez les étages, les caractéristiques des ascenseurs ou monte-charges, la distance de portage et les créneaux autorisés. Avec votre responsable de laboratoire, identifiez les appareils à préparer avant enlèvement et les intervenants chargés de leur remise en service. Faites définir au devis les protections, la manutention et les étapes retenues.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 italic transition-all grayscale-0">
               {[
                 { icon: <FlaskConical size={24} />, t: "Verrerie & Consommables", d: "Inventaire et fragilités à préciser, avec les besoins de conditionnement." },
                 { icon: <Microscope size={24} />, t: "Appareillage de Précision", d: "Modèle, poids et consignes du fabricant à transmettre pour étude." },
                 { icon: <ShieldCheck size={24} />, t: "Repérage & Réception", d: "Salles de départ et d’arrivée, repères des équipements et contacts à indiquer." }
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
          <h2 className="text-3xl lg:text-6xl font-black mb-10 leading-tight italic uppercase tracking-tight">Préparez votre inventaire <br/><span className="text-accent italic">pour un devis adapté</span></h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light leading-relaxed italic">
            Transmettez la liste des éléments à déplacer, vos contraintes d’accès et vos dates pour faire préciser le périmètre du transfert.
          </p>
          <div className="flex flex-wrap justify-center gap-6 italic">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 italic underline-none">
              Demander mon devis
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
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h3>
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
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Transfert d’archives</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic font-sans italic transition-all italic">Contacter Marne Transdem</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertLaboratoire;
