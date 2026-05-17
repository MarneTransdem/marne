import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Zap, Monitor, Cpu, Server, ShieldCheck, Truck, ClipboardCheck, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const TransfertInformatique: React.FC = () => {
  const path = "/transfert-informatique-paris";

  const faqs = [
    { 
      q: "Gérez-vous le transfert de serveurs et baies de stockage ?", 
      a: "Oui, nous sommes spécialisés dans le transfert d'infrastructures critiques. Nous utilisons des fly-cases spécifiques et des camions suspendus avec contrôle de température si nécessaire pour assurer l'intégrité de vos serveurs et baies." 
    },
    { 
      q: "Proposez-vous le nettoyage des postes de travail ?", 
      a: "Absolument. Nous pouvons inclure une prestation de nettoyage cryogénique ou à air comprimé pour les claviers, écrans et unités centrales lors du transfert pour une remise au propre totale." 
    },
    { 
      q: "Comment protégez-vous les écrans lors du transport ?", 
      a: "Les écrans sont emballés individuellement sous housses antistatiques et placés dans des bacs de protection rigides compartimentés pour éviter tout choc ou rayure." 
    },
    { 
      q: "Réalisez-vous le brassage et le câblage sur le nouveau site ?", 
      a: "Nous assurons la reconnexion des postes de travail (logistique IT). Pour le brassage complexe de baies serveurs, nous travaillons en coordination étroite avec votre DSI ou nos partenaires experts en infogérance." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert Informatique & Data Centers Paris | Marne Transdem"
        description="Spécialiste du transfert informatique à Paris. Déménagement de serveurs, parcs informatiques, baies de stockage et postes de travail avec protection antistatique."
        canonical={path}
        schema={[
          getServiceSchema("Transfert Informatique", "Marne Transdem offre un service de transfert IT premium pour les entreprises, garantissant la sécurité et la remise en service rapide de votre parc informatique."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Transfert Informatique", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white font-sans italic">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Monitor size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Expertise IT & Infrastructures</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">informatique</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              La sécurité de vos données est notre priorité. Marne Transdem assure le transfert de vos actifs informatiques et Data Centers avec une technologie de protection de pointe.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis transfert IT expert
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

      {/* Core Expertise in IT Transfer */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">
                Maîtriser vos <span className="text-accent italic">actifs numériques</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                <p>
                  Le <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert informatique</span> est l'étape la plus critique du déménagement d'entreprise. Un serveur mal manipulé ou une connectique endommagée peut stopper net votre activité. Marne Transdem déploie des protocoles de manutention spécifiques "High-Tech" pour éliminer tout risque.
                </p>
                <p>
                  De la salle serveur à la mise en place sur chaque bureau, nous utilisons des chariots informatiques suspendus, des housses antistatiques et des bacs de protection rigides. Nos techniciens collaborent étroitement avec votre DSI pour respecter vos impératifs de remise en service (RTO/RPO).
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 italic transition-all underline-none italic font-sans italic grayscale-0">
               {[
                 { icon: <Server size={24} />, t: "Data Centers", d: "Transfert sécurisé de baies et serveurs critiques." },
                 { icon: <Monitor size={24} />, t: "Parc Utilisateur", d: "Déconnexion et reconnexion de masse." },
                 { icon: <ShieldCheck size={24} />, t: "Antistatique", d: "Protection complète contre les décharges." },
                 { icon: <Zap size={24} />, t: "Remise en service", d: "Engagement sur les délais de reconnexion." }
               ].map((box, i) => (
                 <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-4 italic">
                    <div className="text-accent italic">{box.icon}</div>
                    <div className="font-bold text-brand-900 text-sm uppercase italic">{box.t}</div>
                    <div className="text-[10px] text-slate-500 font-light italic">{box.d}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Protection Section */}
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 italic grayscale-0 transition-all italic">
          <div className="max-w-4xl mx-auto italic text-center mb-20 italic">
            <h2 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Protection <span className="text-accent italic">Zéro Défaut</span></h2>
            <p className="text-slate-300 text-xl font-light mt-8 italic">Nous utilisons le meilleur matériel du marché pour vos équipements de valeur.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 italic underline-none italic font-sans grayscale-0">
            {[
              { t: "Bac IT Compartimenté", d: "Protection rigide pour chaque unité centrale et groupe d'écrans." },
              { t: "Emballage Antistatique", d: "Housses spécifiques pour prévenir tout dommage électronique." },
              { t: "Fly-cases Spécifiques", d: "Caisses de transport ultra-résistantes pour les composants critiques." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] italic text-center grayscale-0">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent italic">
                   <Monitor size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase italic tracking-tight italic transition-all italic">{item.t}</h3>
                <p className="text-slate-400 text-sm font-light italic leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic grayscale-0 transition-opacity italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight font-sans italic transition-all italic italic underline-none italic">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0 italic shadow-none italic">Informatique</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic underline-none italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic font-sans italic transition-all italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 border-t border-slate-100 font-sans italic transition-all italic underline-none italic grayscale-0 italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all italic">
            <Link to="/transfert-bureaux-paris" className="hover:text-accent transition-all italic">Transfert de Bureaux</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic transition-all italic">Solutions Globales Pro</Link>
            <Link to="/transfert-laboratoire-paris" className="hover:text-accent transition-all italic">Transfert Médical</Link>
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Archivage Sécurisé</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Audit IT Gratuit</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertInformatique;
