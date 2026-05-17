import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Building2, Zap, LayoutGrid, Settings, Truck, ClipboardCheck, Info, HelpCircle, Users, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const TransfertBureaux: React.FC = () => {
  const path = "/transfert-bureaux-paris";

  const faqs = [
    { 
      q: "Réalisez-vous les transferts de bureaux le week-end ?", 
      a: "Oui, nous organisons la majorité de nos transferts de bureaux le week-end ou en soirée pour garantir une continuité d'activité totale. Vos collaborateurs quittent leurs postes le vendredi et retrouvent leur environnement opérationnel le lundi matin." 
    },
    { 
      q: "Proposez-vous le montage de mobilier neuf ?", 
      a: "Absolument. Nos équipes sont formées au montage de toutes les marques de mobilier de bureau professionnelles. Nous pouvons assurer le déballage, le montage et l'installation selon vos plans d'implantation." 
    },
    { 
      q: "Comment gérez-vous la confidentialité des dossiers ?", 
      a: "Nous utilisons des bacs de transfert scellés pour les documents sensibles et des procédures de traçage rigoureuses tout au long du transport pour garantir la sécurité de vos données." 
    },
    { 
      q: "Assurez-vous le transfert du parc informatique ?", 
      a: "Oui, c'est l'une de nos spécialités. Nous gérons le déconnexion, l'emballage sous protection antistatique et la remise en place des unités centrales et écrans sur les nouveaux postes." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert de Bureaux Paris | Déménagement Entreprise Marne Transdem"
        description="Spécialiste du transfert de bureaux à Paris et Île-de-France. Organisation millimétrée, transfert informatique, montage de mobilier et continuité d'activité garantie."
        canonical={path}
        schema={[
          getServiceSchema("Transfert de Bureaux", "Marne Transdem accompagne les entreprises de toutes tailles dans leur déménagement de bureaux avec une logistique adaptée et une exécution rapide."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Transfert de Bureaux", item: path }
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
              <Building2 size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Expertise Tertiaire & Bureaux</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">de bureaux</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Optimisez votre mobilité professionnelle. Marne Transdem orchestre le déménagement de vos espaces de travail à Paris et en Île-de-France avec une rigueur absolue et sans interruption d'activité.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis transfert de bureaux
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

      {/* Intro section emphasizing business continuity */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Garantir votre <span className="text-accent italic">continuité d'activité</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify grayscale-0 italic transition-all">
                <p>
                  Un <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert de bureaux</span> réussi est un transfert invisible pour vos clients. Chez Marne Transdem, nous comprenons que chaque heure de productivité compte. C'est pourquoi nous élaborons un cahier des charges précis, de l'étude préalable à l'installation finale.
                </p>
                <p>
                  Nos équipes spécialisées gèrent l'ensemble du process : étiquetage systématique, protection des locaux, démontage du mobilier complexe et transfert de vos serveurs informatiques. Nous intervenons sur des plateaux de bureaux de 50 m² comme sur des sièges sociaux de plusieurs milliers de mètres carrés partout en Île-de-France.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Intervention 7j/7</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 text-brand-900 italic">
                  <Users size={16} className="text-accent" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Pilotage dédié</span>
                </div>
              </div>
            </div>
            <div className="relative group italic">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105 grayscale-0">
                <img 
                  src="/images/transfert-bureaux-paris.jpg" 
                  alt="Déménagement de bureaux Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-0 italic"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services specialized for office relocation */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic underline-none">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Prestations <span className="text-accent italic">Tertiaires</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
            {[
              { icon: <Settings size={32} />, t: "Montage Mobilier", d: "Assemblage de postes de travail, armoires et mobilier de réunion de toutes marques." },
              { icon: <Zap size={32} />, t: "Transfert Informatique", d: "Déconnexion et reconnexion de vos équipements sous protection spécifique." },
              { icon: <ClipboardCheck size={32} />, t: "Audit & Inventaire", d: "Marquage systématique et inventaire détaillé pour une traçabilité parfaite." },
              { icon: <LayoutGrid size={32} />, t: "Space Planning", d: "Aide à l'implantation selon vos plans pour une installation clé en main." },
              { icon: <ShieldCheck size={32} />, t: "Confidentialité", d: "Transfert sécurisé d'archives et de documents sensibles sous scellés." },
              { icon: <Truck size={32} />, t: "Logistique Adaptée", d: "Flotte de véhicules capitonnés et matériel de manutention de pointe." }
            ].map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-accent transition-all group italic">
                <div className="text-accent mb-6 group-hover:scale-110 transition-all">{service.icon}</div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight">{service.t}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{service.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process for office relocation */}
      <section className="py-24 font-sans italic transition-all italic underline-none">
        <div className="container mx-auto px-4 md:px-6 text-center italic">
           <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all">Méthodologie <span className="text-accent italic font-sans italic underline-none">en 4 phases</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { t: "1. Diagnostic", d: "Étude des accès, volumes et contraintes techniques sur site." },
               { t: "2. Planification", d: "Élaboration du rétro-planning et du plan d'étiquetage." },
               { t: "3. Réalisation", d: "Transfert orchestré par un chef de projet dédié." },
               { t: "4. Installation", d: "Mise en place finale et levée de réserves immédiate." }
             ].map((step, i) => (
               <div key={i} className="relative italic">
                 <div className="w-16 h-16 bg-brand-900 text-accent rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 shadow-xl">{i+1}</div>
                 <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight">{step.t}</h3>
                 <p className="text-xs text-slate-500 font-light leading-relaxed">{step.d}</p>
                 {i < 3 && <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-slate-100 -translate-x-1/2"></div>}
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl lg:text-6xl font-black mb-10 uppercase italic tracking-tight italic">Prêt pour votre <span className="text-accent italic">nouvelle adresse ?</span></h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light italic">
            Obtenez une étude logistique gratuite et un devis personnalisé pour votre transfert de bureaux.
          </p>
          <div className="flex flex-wrap justify-center gap-6 italic">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all italic underline-none">
              Demander une étude gratuite
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 backdrop-blur-sm italic">
              <Phone size={22} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 font-sans italic underline-none">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic">
           <div className="text-center mb-16 italic underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight">FAQ <span className="text-accent italic font-sans italic">Entreprise</span></h2>
           </div>
           <div className="space-y-6 italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-accent transition-all shadow-sm">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic">
                   <HelpCircle className="text-accent shrink-0" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 border-t border-slate-100 font-sans italic transition-all italic underline-none">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
            <Link to="/transfert-informatique-paris" className="hover:text-accent transition-all italic">Transfert IT</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic">Solutions Business</Link>
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Gestion Archives</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-all italic">Stockage Mobilier Pro</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Expert Relocation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertBureaux;
