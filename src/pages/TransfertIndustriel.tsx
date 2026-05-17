import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Settings, Zap, Truck, ShieldCheck, Factory, Warehouse, Weight, ClipboardCheck, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const TransfertIndustriel: React.FC = () => {
  const path = "/transfert-industriel-paris";

  const faqs = [
    { 
      q: "Gérez-vous le levage de machines de plusieurs tonnes ?", 
      a: "Oui, nous disposons du matériel de levage adapté (bras de levage, chariots gros tonnages, grues si nécessaire) et de l'expertise en manutention lourde pour déplacer vos équipements industriels les plus massifs." 
    },
    { 
      q: "Assurez-vous le transfert complet d'un atelier ou d'une usine ?", 
      a: "Marne Transdem accompagne les industriels dans le transfert complet de leurs sites : machines, stocks, outillages, mobilier technique et bureaux. Nous gérons la logistique de A à Z." 
    },
    { 
      q: "Intervenez-vous pour le démontage et remontage mécanique ?", 
      a: "Nous assurons la manutention et le transport. Pour le démontage/remontage complexe nécessitant un étalonnage, nous travaillons en coordination avec vos équipes de maintenance ou des prestataires techniques spécialisés." 
    },
    { 
      q: "Quelles sont vos garanties d'assurance pour le matériel industriel ?", 
      a: "Nous proposons des couvertures d'assurance spécifiques pour les équipements industriels de haute valeur, avec des polices ad valorem adaptées aux enjeux de votre secteur." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert Industriel & Manutention Lourde Paris | Marne Transdem"
        description="Expertise en transfert industriel à Paris. Déménagement de machines, ateliers, lignes de production et stocks. Manutention lourde et logistique usine."
        canonical={path}
        schema={[
          getServiceSchema("Transfert Industriel", "Marne Transdem réalise vos transferts industriels avec une rigueur technique absolue : manutention de machines, logistique d'atelier et transport lourd."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Transfert Industriel", item: path }
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
              <Factory size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Logistique & Manutention Industrielle</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">industriel</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Puissance et précision pour votre outil de production. Marne Transdem orchestre le transfert de vos sites industriels, machines et stocks avec une expertise technique sans faille.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Étude technique gratuite
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

      {/* Technical Approach Section */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Maîtriser la <span className="text-accent italic">force & la technique</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                <p>
                  Le <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert industriel</span> ne pardonne aucune improvisation. Qu'il s'agisse de déplacer une presse monumentale, une ligne de conditionnement complexe ou un stock stratégique, Marne Transdem mobilise les moyens de levage et de transport les plus performants.
                </p>
                <p>
                  Nous intervenons sur l'ensemble de la chaîne : audit des sols et des accès, calage et saisissage spécifique pour le transport, manutention lourde in situ et coordination logistique multi-sites. Notre expérience nous permet de minimiser les temps d'arrêt de production pour vos usines et ateliers.
                </p>
              </div>
            </div>
            <div className="relative group italic grayscale-[30%]">
               <div className="aspect-video rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01] italic">
                  <img src="/images/transfert-industriel-paris.jpg" alt="Déménagement industriel Marne Transdem" className="w-full h-full object-cover italic font-sans" />
               </div>
               <div className="absolute -top-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial specific services Cards */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic underline-none">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16 italic font-sans italic underline-none underline decoration-accent/20 underline-offset-8">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight font-sans italic transition-all italic">Prestations <span className="text-accent italic tracking-tight">Usine & Atelier</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 italic font-sans transition-all italic underline-none">
            {[
              { icon: <Weight size={32} />, t: "Manutention Lourde", d: "Déplacement de machines hors gabarit et équipements de production massifs." },
              { icon: <Warehouse size={32} />, t: "Transfert Stocks", d: "Logistique complète de vos matières premières et produits finis." },
              { icon: <Settings size={32} />, t: "Mobilier Technique", d: "Déménagement d'établis, racks de stockage et zones de conditionnement." },
              { icon: <Truck size={32} />, t: "Transport Convoi", d: "Organisation de transports spécifiques pour les pièces volumineuses." }
            ].map((card, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 h-full hover:border-accent transition-all group italic font-sans transition-all">
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform italic grayscale-0">{card.icon}</div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight italic">{card.t}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed italic">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-24 font-sans italic transition-all italic underline-none grayscale-0">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic">
           <div className="bg-brand-900 p-12 lg:p-20 rounded-[4rem] text-white flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden italic shadow-2xl">
              <div className="lg:w-2/3 space-y-8 relative z-10 italic">
                 <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight underline decoration-accent/20 italic">Sécurité & <br/><span className="text-accent italic">Rigueur Opérationnelle</span></h2>
                 <p className="text-slate-300 text-lg font-light leading-relaxed italic text-justify italic">
                   Chaque opération fait l'objet d'un Plan de Prévention rigoureux. Nos chefs de chantier supervisent chaque phase critique pour garantir une sécurité totale des hommes et du matériel. Nous nous adaptons à vos flux logistiques pour assurer une transition sans heurt.
                 </p>
                 <div className="pt-4 italic">
                    <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-flex items-center gap-3 italic">
                      Demander un audit technique
                      <ArrowRight size={20} />
                    </Link>
                 </div>
              </div>
              <div className="lg:w-1/3 relative z-10 italic font-sans transition-all grayscale-0 italic">
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { l: "Levage", t: "Expert" },
                      { l: "Sécurité", t: "Normée" },
                      { l: "Rigueur", t: "Totale" },
                      { l: "Délais", t: "Respectés" }
                    ].map((badge, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center italic transition-all grayscale-0 italic">
                         <div className="text-accent font-black text-xl mb-1 italic transition-all grayscale-0 italic">{badge.l}</div>
                         <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold italic transition-all grayscale-0 italic">{badge.t}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Industriel */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none grayscale-0">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic transition-all">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight font-sans italic transition-all underline-none italic grayscale-0">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0">Industriel</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic grayscale-0 shadow-none">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic font-sans italic transition-all italic underline-none italic grayscale-0">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 border-t border-slate-100 font-sans italic transition-all italic underline-none grayscale-0">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none grayscale-0">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all underline-none grayscale-0">
            <Link to="/transfert-bureaux-paris" className="hover:text-accent transition-all italic">Secteur Tertiaire</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic">Solutions Professionnelles</Link>
            <Link to="/transfert-laboratoire-paris" className="hover:text-accent transition-all italic">Milieux Sensibles</Link>
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Externalisation Archives</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Expert Logistique</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertIndustriel;
