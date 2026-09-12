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
      a: "Transmettez les dimensions, le poids documenté de chaque machine et les contraintes des deux sites. La faisabilité, les moyens de levage et les intervenants nécessaires doivent être confirmés avant engagement. La demande de devis ne vaut pas validation d’une capacité de levage." 
    },
    { 
      q: "Assurez-vous le transfert complet d'un atelier ou d'une usine ?", 
      a: "Décrivez séparément les machines, les stocks, les outillages, le mobilier et les bureaux concernés. Le périmètre retenu, le calendrier et les responsabilités de chaque intervenant sont à préciser dans le devis, notamment pour les opérations techniques sur les équipements." 
    },
    { 
      q: "Intervenez-vous pour le démontage et remontage mécanique ?", 
      a: "Le démontage mécanique, les déconnexions, les réglages et la remise en service doivent faire l’objet d’un périmètre explicite. Indiquez les opérations prévues par vos équipes de maintenance ou vos prestataires spécialisés afin de les distinguer de la manutention et du transport convenus." 
    },
    { 
      q: "Quelles sont vos garanties d'assurance pour le matériel industriel ?", 
      a: "Communiquez l’inventaire et la valeur des biens, puis demandez les conditions de couverture applicables au projet. Faites préciser les plafonds, les exclusions et les éventuelles garanties complémentaires avant de confirmer l’intervention." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert Industriel & Manutention Lourde Paris | Marne Transdem"
        description="Transfert industriel à Paris : préparez l’inventaire de votre atelier, les accès et le calendrier. Définissez les prestations nécessaires avec un devis adapté."
        canonical={path}
        schema={[
          getServiceSchema("Transfert Industriel", "Préparez votre projet de transfert d’atelier ou de site industriel : inventaire, accès, calendrier et prestations à confirmer dans un devis adapté."),
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
              initial={false}
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
              Préparez votre transfert d’atelier ou de site industriel à Paris et en Île-de-France. Décrivez les équipements, les accès et le calendrier pour définir les prestations et les moyens nécessaires à votre projet.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Décrire mon projet
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
                Préparer le <span className="text-accent italic">périmètre du transfert</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                <p>
                  Un <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert industriel</span> se prépare équipement par équipement. Constituez un inventaire avec les dimensions, les poids documentés, les photos et les contraintes communiquées par les fabricants. Distinguez les machines du mobilier, des outillages et des stocks.
                </p>
                <p>
                  Pour les deux sites, indiquez les accès, les quais, les passages et les créneaux disponibles. Transmettez les informations techniques sur les sols et les contraintes du bâtiment dont vous disposez. Les moyens de manutention et la faisabilité du transfert doivent être confirmés avant de fixer l’intervention.
                </p>
                <p>
                  Si le projet comprend aussi des postes de travail, consultez notre page <Link to="/transfert-bureaux-paris" className="underline font-medium text-brand-900">transfert de bureaux</Link>. La <Link to="/blog/demenagement-entreprise-paris-checklist" className="underline font-medium text-brand-900">checklist du déménagement d’entreprise</Link> vous aide à organiser les interlocuteurs et les étapes du projet.
                </p>
              </div>
            </div>
            <div className="relative group italic grayscale-[30%]">
               <div className="aspect-video rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01] italic">
                  <img width={1897} height={2529} loading="lazy" decoding="async" src="/images/transfert-entreprise-essonne.jpg" alt="Déménagement industriel Marne Transdem" className="w-full h-full object-cover italic font-sans" />
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
              { icon: <Weight size={32} />, t: "Équipements", d: "Dimensions, poids documentés et contraintes à transmettre pour examiner la faisabilité." },
              { icon: <Warehouse size={32} />, t: "Stocks", d: "Nature des biens, conditionnement, quantités et ordre de livraison à préciser." },
              { icon: <Settings size={32} />, t: "Mobilier technique", d: "Inventaire des établis, rangements et opérations de démontage à répartir entre intervenants." },
              { icon: <Truck size={32} />, t: "Transport", d: "Trajet, accès aux deux sites et contraintes de gabarit à étudier avant confirmation." }
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
                   Désignez les interlocuteurs des deux sites et communiquez les consignes d’accès et de sécurité. Faites préciser les opérations confiées à chaque intervenant, les documents nécessaires et les créneaux de transfert. Les déconnexions, les contrôles techniques et la remise en service doivent être organisés avec les responsables concernés ; le calendrier de reprise dépend de ces étapes.
                 </p>
                 <div className="pt-4 italic">
                    <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-flex items-center gap-3 italic">
                      Préparer ma demande de devis
                      <ArrowRight size={20} />
                    </Link>
                 </div>
              </div>
              <div className="lg:w-1/3 relative z-10 italic font-sans transition-all grayscale-0 italic">
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { l: "Inventaire", t: "À transmettre" },
                      { l: "Accès", t: "À vérifier" },
                      { l: "Périmètre", t: "À définir" },
                      { l: "Calendrier", t: "À convenir" }
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
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h3>
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
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Transfert d’archives</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Expert Logistique</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertIndustriel;
