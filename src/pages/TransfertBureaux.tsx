import { ServiceDecisionGuide } from '../components/common/ServiceDecisionGuide';
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
      a: "Une intervention le week-end ou en soirée peut être étudiée selon vos contraintes et nos disponibilités. Le créneau, les accès aux deux locaux et les étapes de remise en service doivent être confirmés au devis. Prévoyez un temps de vérification avant la reprise de vos équipes."
    },
    { 
      q: "Proposez-vous le montage de mobilier neuf ?", 
      a: "Signalez le mobilier neuf ou à démonter, ses références et les notices disponibles. Nous étudions les opérations possibles et précisons au devis le démontage, le montage et la mise en place retenus. Transmettez le plan des nouveaux bureaux pour préparer l’installation."
    },
    { 
      q: "Comment gérez-vous la confidentialité des dossiers ?", 
      a: "Identifiez les dossiers sensibles avec votre responsable interne et définissez les personnes autorisées à les préparer et les réceptionner. Les contenants, l’étiquetage et les modalités de transport sont à convenir avant le transfert. Gardez séparés les documents dont vous aurez besoin pendant l’intervention."
    },
    { 
      q: "Assurez-vous le transfert du parc informatique ?", 
      a: "Le transport du matériel informatique peut être intégré au projet. Faites préciser les opérations prises en charge et coordonnez les sauvegardes, la déconnexion, le réseau et les tests avec votre responsable informatique. La remise en place physique des équipements ne vaut pas validation de leur fonctionnement."
    },
    {
      q: "Quels éléments déterminent le prix d’un transfert de bureaux ?",
      a: "Le devis dépend du volume de mobilier et de cartons, des adresses, des étages, des ascenseurs et des distances de portage. L’emballage, le démontage, le stockage éventuel et les créneaux demandés comptent aussi. Comparez les offres sur un même inventaire et vérifiez les prestations incluses."
    },
    {
      q: "Que préparer avant de demander un devis ?",
      a: "Rassemblez l’inventaire, le nombre de postes, les plans des locaux, les dates souhaitées et les contraintes d’accès aux deux adresses. Signalez les archives, les équipements particuliers et les services qui doivent rester disponibles. Désignez un interlocuteur pour valider le planning et la réception."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert de bureaux Paris | Marne Transdem"
        description="Transfert de bureaux à Paris et en Île-de-France : inventaire, accès, mobilier et planning. Préparez votre déménagement avec un devis personnalisé."
        canonical={path}
        schema={[
          getServiceSchema("Transfert de bureaux à Paris", "Préparation du déménagement de bureaux à Paris et en Île-de-France : inventaire, accès, protection du mobilier et planning définis selon le projet."),
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Building2 size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Expertise Tertiaire & Bureaux</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">de bureaux à Paris</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Préparez le déménagement de vos bureaux à Paris et en Île-de-France avec Marne Transdem. Inventaire, accès, protection du mobilier et planning : nous définissons avec vous les prestations adaptées à vos locaux et à votre organisation.
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
      <ServiceDecisionGuide />

      {/* Intro section emphasizing business continuity */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Préparer votre <span className="text-accent italic">reprise d'activité</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify grayscale-0 italic transition-all">
                <p>
                  Un <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert de bureaux</span> se prépare avec les personnes qui utilisent les locaux. Identifiez les postes prioritaires, les documents à conserver à portée de main et les équipements nécessaires à la reprise. Le planning doit intégrer le transport, l’installation et vos vérifications internes.
                </p>
                <p>
                  Aux deux adresses, précisez les étages, les dimensions des ascenseurs, les accès de livraison et les règles de l’immeuble. L’inventaire et le plan d’implantation permettent de définir les tâches confiées aux déménageurs, celles de vos équipes et les interventions de vos autres prestataires.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Planning à convenir</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 text-brand-900 italic">
                  <Users size={16} className="text-accent" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Prestations sur devis</span>
                </div>
              </div>
            </div>
            <div className="relative group italic">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105 grayscale-0">
                <img 
                  src="/images/transfert-bureaux-entreprise-paris.jpg" 
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
              { icon: <Settings size={32} />, t: "Mobilier de bureau", d: "Identifiez les meubles à démonter et à remonter. Les opérations retenues et leur faisabilité sont à préciser au devis." },
              { icon: <Zap size={32} />, t: "Matériel informatique", d: "Préparez le transport des écrans et unités centrales avec votre référent informatique, qui organise les sauvegardes et les tests de reprise." },
              { icon: <ClipboardCheck size={32} />, t: "Inventaire et repérage", d: "Listez le mobilier et les cartons, puis associez chaque lot à une pièce ou un poste dans les nouveaux locaux." },
              { icon: <LayoutGrid size={32} />, t: "Plan d’implantation", d: "Transmettez le plan des bureaux et indiquez les emplacements souhaités pour organiser la mise en place du mobilier." },
              { icon: <ShieldCheck size={32} />, t: "Documents et archives", d: "Séparez les dossiers sensibles et convenez des contenants, des personnes responsables et des modalités de réception." },
              { icon: <Truck size={32} />, t: "Accès et transport", d: "Décrivez les accès aux deux immeubles, les créneaux de livraison et les contraintes de stationnement pour préparer les moyens nécessaires." }
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
               { t: "3. Réalisation", d: "Transport et manutention selon les prestations et le planning convenus." },
               { t: "4. Réception", d: "Vérification du mobilier, signalement des réserves et tests de reprise par vos équipes." }
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

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-900 mb-6">Préparer le devis et les prestations complémentaires</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Pour comparer les propositions, transmettez le même inventaire et les mêmes contraintes à chaque prestataire.
            Notre <Link to="/blog/demenagement-entreprise-paris-checklist" className="text-brand-900 underline">checklist de déménagement d’entreprise</Link> vous aide à organiser les étapes avec vos équipes.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Si les nouveaux locaux ne sont pas prêts, étudiez une solution de <Link to="/garde-meuble-paris" className="text-brand-900 underline">stockage du mobilier</Link>.
            Précisez aussi vos besoins d’<Link to="/emballage-protection-demenagement" className="text-brand-900 underline">emballage et de protection</Link> et faites distinguer ces prestations dans votre devis.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl lg:text-6xl font-black mb-10 uppercase italic tracking-tight italic">Prêt pour votre <span className="text-accent italic">nouvelle adresse ?</span></h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light italic">
            Communiquez votre inventaire, vos adresses et vos dates souhaitées pour recevoir un devis personnalisé pour votre transfert de bureaux.
          </p>
          <div className="flex flex-wrap justify-center gap-6 italic">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all italic underline-none">
              Demander un devis gratuit
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
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic">
                   <HelpCircle className="text-accent shrink-0" size={20} />
                   {faq.q}
                 </h3>
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
            <Link to="/transfert-informatique-paris" className="hover:text-accent transition-all italic">Transfert informatique</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic">Déménagement d’entreprise</Link>
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Gestion Archives</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-all italic">Stockage Mobilier Pro</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Contacter Marne Transdem</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertBureaux;
