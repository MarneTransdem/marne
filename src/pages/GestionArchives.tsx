import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, Zap, Truck, Files, Database, Search, ClipboardCheck, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const GestionArchives: React.FC = () => {
  const path = "/gestion-archives-paris";

  const faqs = [
    { 
      q: "Proposez-vous le stockage sécurisé des archives ?", 
      a: "Oui, nous disposons d'espaces dédiés et sécurisés (vidéosurveillance, détection incendie, contrôle d'accès) pour le stockage de vos archives papier ou numériques sur le long terme." 
    },
    { 
      q: "Pouvez-vous aider à l'indexation de nos dossiers ?", 
      a: "Absolument. Nos équipes peuvent prendre en charge l'inventaire, le tri et l'indexation de vos archives lors du transfert pour vous permettre une recherche simplifiée sur votre nouveau site." 
    },
    { 
      q: "Comment garantissez-vous la confidentialité lors du transport ?", 
      a: "Le transfert d'archives se fait systématiquement sous scellés. Nos véhicules sont verrouillés et nos personnels sont sensibilisés à la stricte confidentialité des documents manipulés." 
    },
    { 
      q: "Réalisez-vous la destruction sécurisée de documents périmés ?", 
      a: "Oui, nous proposons un service de destruction sécurisée avec certificat de destruction pour vos archives dont la durée légale de conservation est atteinte." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Gestion & Transfert d'Archives Paris | Marne Transdem"
        description="Spécialiste de la gestion d'archives à Paris. Transfert sécurisé, indexation, stockage et destruction certifiée de documents confidentiels pour entreprises."
        canonical={path}
        schema={[
          getServiceSchema("Gestion d'Archives", "Marne Transdem assure la gestion globale de vos archives d'entreprise : du transfert sécurisé au stockage haute protection."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Gestion d'Archives", item: path }
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
              <Files size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Externalisation & Transfert d'Archives</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Gestion <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">d'archives</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Sécurisez votre patrimoine documentaire. Marne Transdem gère le transfert et l'archivage de vos documents critiques avec une confidentialité et une organisation totale.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis archivage pro
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

      {/* Value Proposition for Archive Management */}
      <section className="py-24 font-sans italic underline-none transition-all">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Confidentialité <span className="text-accent italic">& Rigueur</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify italic font-sans italic">
                <p>
                  Le <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert d'archives</span> est une opération délicate qui nécessite une traçabilité sans faille. Qu'il s'agisse de dossiers RH, comptables ou juridiques, chaque boîte doit être répertoriée et acheminée en toute sécurité. Marne Transdem vous propose des solutions d'externalisation et de transfert sur-mesure.
                </p>
                <p>
                  Nous facilitons votre déménagement en prenant en charge le re-classement ou la mise en conteneurs spécifiques de vos documents. Notre expertise vous permet de libérer de l'espace sur vos plateaux de bureaux tout en garantissant un accès rapide à vos informations en cas de besoin.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic font-sans italic">
                 <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 italic">
                    <div className="text-accent font-black text-2xl italic">100%</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Confidentialité</div>
                 </div>
                 <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 italic font-sans italic">
                    <div className="text-accent font-black text-2xl italic">Zéro</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Perte de documents</div>
                 </div>
              </div>
            </div>
            <div className="relative italic transition-all grayscale-0 shadow-none italic font-sans italic">
               <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] italic grayscale-0">
                  <img src="/images/gestion-archives-paris.jpg" alt="Gestion d'archives Marne Transdem" className="w-full h-full object-cover italic transition-all" />
               </div>
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-0 italic transition-all"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid for archive management */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic underline-none transition-all grayscale-0">
        <div className="container mx-auto px-4 md:px-6 italic transition-all">
          <div className="text-center mb-16 italic font-sans italic transition-all underline decoration-accent/20 underline-offset-8">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight font-sans italic">Expertise <span className="text-accent italic tracking-tight">Documentaire</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 italic font-sans transition-all">
            {[
              { icon: <Database size={32} />, t: "Stockage Sécurisé", d: "Entreposage de vos archives dans des locaux aux normes NF Z40-350." },
              { icon: <Search size={32} />, t: "Indexation & Tri", d: "Organisation logique et catalogage pour une recherche facilitée." },
              { icon: <ShieldCheck size={32} />, t: "Destruction Certifiée", d: "Broyage sécurisé des documents périmés avec attestation." },
              { icon: <Zap size={32} />, t: "Numérisation", d: "Passage au digital pour vos documents consultés fréquemment." }
            ].map((box, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-accent transition-all group italic transition-all font-sans italic underline-none grayscale-0 shadow-none italic transition-all">
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform italic grayscale-0 transition-opacity italic">{box.icon}</div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight font-sans italic transition-all italic">{box.t}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed font-sans italic transition-all italic">{box.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 font-sans italic underline-none transition-all grayscale-0 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic transition-all">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8 transition-all">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight underline-none italic transition-all">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic transition-all underline-none grayscale-0">Archivage</span></h2>
           </div>
           <div className="space-y-6 italic font-sans transition-all italic underline-none grayscale-0 italic transition-all shadow-none italic font-sans italic transition-all underline-none italic transition-all">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-accent transition-all shadow-sm italic transition-all italic transition-all">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all underline-none grayscale-0 italic shadow-none italic font-sans italic transition-all underline-none italic">
                   <HelpCircle className="text-accent shrink-0 italic transition-all grayscale-0" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic transition-all italic transition-all">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 border-t border-slate-100 font-sans italic transition-all italic underline-none grayscale-0 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic transition-all underline-none grayscale-0 italic shadow-none italic transition-all italic font-sans italic transition-all underline-none">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic transition-all">
            <Link to="/transfert-bureaux-paris" className="hover:text-accent transition-all italic">Transfert de Bureaux</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic transition-all italic grayscale-0 shadow-none italic transition-all italic transition-all">Solutions Globales Pro</Link>
            <Link to="/transfert-informatique-paris" className="hover:text-accent transition-all italic">Transfert IT expert</Link>
            <Link to="/transfert-laboratoire-paris" className="hover:text-accent transition-all italic">Transfert Médical</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Audit Logistique</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GestionArchives;
