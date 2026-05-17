import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Shield, Info, Zap, FileText, ClipboardCheck, Package, Calculator, Truck, Star, HelpCircle, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementMilitaire: React.FC = () => {
  const path = "/demenagement-militaire";

  const faqs = [
    { 
      q: "Fournissez-vous les deux devis obligatoires pour le dossier de mutation ?", 
      a: "Oui, nous comprenons parfaitement les exigences administratives militaires (dossier de mutation). Nous vous fournissons rapidement les deux devis comparatifs nécessaires à votre administration pour l'obtention de votre prise en charge (PFMD)." 
    },
    { 
      q: "Respectez-vous les plafonds de cubage par grade ?", 
      a: "Absolument. Nos conseillers sont formés aux barèmes de cubage réglementaires en vigueur selon votre grade et votre situation familiale. Nous établissons nos devis en stricte conformité avec ces plafonds pour éviter tout reste à charge imprévu." 
    },
    { 
      q: "Quels documents dois-je fournir pour mon dossier de remboursement ?", 
      a: "Nous vous remettons tous les documents nécessaires : devis détaillés, contrat de déménagement, déclaration de valeur, lettre de voiture et facture acquittée après l'intervention." 
    },
    { 
      q: "Proposez-vous une assurance ad valorem ?", 
      a: "Oui, nous incluons systématiquement une assurance responsabilité contractuelle, et nous proposons des options d'assurance ad valorem pour couvrir vos biens à hauteur de leur valeur réelle déclarée." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Militaire & Gendarmerie | Marne Transdem"
        description="Expert du déménagement militaire et gendarmerie à Paris. Devis conformes PFMD, respect des plafonds de cubage et accompagnement administratif mutation."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Militaire", "Service spécialisé pour les mutations des militaires, gendarmes et policiers, avec gestion complète du dossier administratif."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Déménagement Militaire", item: path }
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
              <Shield size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Spécial Mutation Défense & Forces de l'ordre</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase">militaire</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem accompagne les militaires, gendarmes et policiers dans leurs mutations avec des solutions conformes aux exigences administratives (PFMD) et un respect strict des barèmes.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Obtenir mes deux devis mutation
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

      {/* Intro Section */}
      <section className="py-24 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                L'expertise <span className="text-accent italic">au service de votre mutation</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify grayscale-[20%]">
                <p>
                  Parce qu'un <span className="font-bold text-brand-900 underline decoration-accent/10 underline-offset-4">déménagement militaire</span> n'est pas un projet comme les autres, il nécessite une connaissance parfaite des procédures administratives de défense. Marne Transdem est le partenaire privilégié des forces de l'ordre et des armées pour organiser vos transferts en toute sérénité.
                </p>
                <p>
                  Nous maîtrisons l'ensemble de la chaîne logistique : du respect des droits à cubage selon votre grade à l'établissement des devis comparatifs requis pour votre dossier. Notre équipe vous assure une transition fluide vers votre nouvelle affectation, que ce soit à Paris, en Île-de-France ou via un <Link to="/demenagement-longue-distance" className="text-slate-900 font-bold hover:text-accent italic">déménagement longue distance</Link>.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic">
                  <CheckCircle2 size={16} className="text-accent italic" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Barèmes respectés</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic">
                  <CheckCircle2 size={16} className="text-accent italic" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Accompagnement PFMD</span>
                </div>
              </div>
            </div>
            <div className="relative group italic">
              <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01] grayscale-[30%] italic">
                <img 
                  src="/images/demenagement-militaire-paris.jpg" 
                  alt="Déménagement militaire Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-0 italic"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Military specific steps */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 text-center italic mb-20 italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 italic">Le processus <span className="text-accent italic">Mutation Défense</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 italic">
          {[
            { icon: <UserCheck size={32} />, t: "1. Audit cubage", d: "Évaluation sur place ou à distance de votre volume selon vos droits réglementaires." },
            { icon: <FileText size={32} />, t: "2. Devis comparatifs", d: "Remise immédiate de vos deux devis pour votre dossier administratif." },
            { icon: <ClipboardCheck size={32} />, t: "3. Validation dossier", d: "Fourniture de toutes les pièces justificatives (K-Bis, Assurances)." },
            { icon: <Truck size={32} />, t: "4. Mise en oeuvre", d: "Déménagement sécurisé respectant vos dates de mutation." }
          ].map((step, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-accent transition-all h-full italic">
              <div className="text-accent mb-6 italic">{step.icon}</div>
              <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight italic">{step.t}</h3>
              <p className="text-slate-500 font-light text-xs leading-relaxed italic">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Administrative Support */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="bg-brand-900 p-12 lg:p-20 rounded-[4rem] text-white flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden italic shadow-2xl italic">
            <div className="lg:w-2/3 space-y-8 relative z-10 italic">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight underline decoration-accent/20 italic">Zéro reste à charge <br/><span className="text-accent italic">Gestion rigoureuse</span></h2>
              <p className="text-slate-300 text-lg font-light leading-relaxed italic text-justify italic">
                Nous nous adaptons aux changements de dates fréquents des mutations militaires. Notre flexibilité et notre réactivité permettent d'ajuster le planning jusqu'au dernier moment pour correspondre à vos ordres de marche. Marne Transdem vous garantit une transparence totale sur les coûts pour une prise en charge optimale par votre centre d'administration.
              </p>
              <div className="pt-4 italic">
                <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-flex items-center gap-3 italic">
                  Demander mes devis comparatifs
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 relative z-10 italic">
               <div className="grid grid-cols-2 gap-4 italic font-sans italic underline-none italic transition-all italic">
                  {[
                    { l: "PFMD", t: "Conforme" },
                    { l: "Défense", t: "Expert" },
                    { l: "Mutation", t: "Rapide" },
                    { l: "Barème", t: "Garanti" }
                  ].map((badge, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center italic">
                       <div className="text-accent font-black text-xl mb-1 italic">{badge.l}</div>
                       <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold italic">{badge.t}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Militaire */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 italic underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight font-sans italic transition-all italic italic">FAQ <span className="text-accent italic tracking-tight">Militaire</span></h2>
           </div>
           <div className="space-y-6 italic font-sans italic transition-all italic underline-none italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0 italic">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic font-sans italic transition-all italic underline-none italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Footer */}
      <section className="py-12 border-t border-slate-100 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all italic">
            <Link to="/demande-de-devis" className="hover:text-accent transition-colors italic">Dossier Mutation</Link>
            <Link to="/calculateur-volume" className="hover:text-accent transition-colors italic">Cube & Grade</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-colors italic">Déménagement National</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-colors italic">Stockage de Campagne</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementMilitaire;
