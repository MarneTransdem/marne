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
      q: "Quel devis demander pour un déménagement militaire ?",
      a: "Marne Transdem peut établir son devis à partir de votre inventaire, des accès et des prestations souhaitées. Vérifiez d'abord auprès de votre service gestionnaire la procédure applicable et le nombre de devis requis. Si des offres concurrentes sont demandées, sollicitez des entreprises distinctes."
    },
    { 
      q: "Le volume transporté correspond-il à mes droits à déménagement ?",
      a: "Le volume à transporter est estimé à partir de vos meubles et cartons. Vos droits et le plafond de prise en charge sont à faire confirmer par votre service gestionnaire selon votre situation. Comparez ensuite le devis avec cette validation pour identifier les éventuels frais à votre charge."
    },
    { 
      q: "Quels documents dois-je fournir pour mon dossier de remboursement ?", 
      a: "Demandez à votre service gestionnaire la liste des justificatifs correspondant à votre dossier, puis transmettez les exigences concernant le devis et la facturation avant de réserver. Conservez les documents contractuels et la facture ; la recevabilité du dossier dépend de la procédure administrative applicable."
    },
    { 
      q: "Comment vérifier les garanties pour mes biens ?",
      a: "Signalez les objets de valeur et faites préciser les garanties, plafonds, franchises et exclusions du contrat. Si une couverture complémentaire est nécessaire, demandez confirmation de sa disponibilité et de son coût avant de signer."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Militaire & Gendarmerie | Marne Transdem"
        description="Préparez votre déménagement militaire à Paris : inventaire, accès, calendrier et devis. Faites confirmer vos droits et la procédure par votre service gestionnaire."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Militaire", "Déménagement pour mutation militaire à Paris ou longue distance, avec volume et prestations à préciser au devis et procédure à confirmer auprès du service gestionnaire."),
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
              initial={false}
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
              Préparez votre changement de domicile avec un inventaire, les accès aux deux logements et les dates souhaitées. Avant de réserver, faites confirmer par votre service gestionnaire vos droits et le circuit à suivre pour votre mutation.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Demander un devis déménagement
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
                  Pour un <span className="font-bold text-brand-900">déménagement militaire</span>, préparez séparément le transport de vos biens et les démarches de prise en charge. Le devis décrit les prestations commerciales ; votre service gestionnaire confirme la procédure et les droits applicables à votre situation.
                </p>
                <p>
                  Indiquez les meubles à emporter, les étages, les ascenseurs et les contraintes de livraison. Le <Link to="/calculateur-volume" className="underline text-brand-900">calculateur de volume</Link> aide à préparer l'inventaire ; il ne calcule pas vos droits administratifs. Pour un trajet entre régions, consultez les informations sur le <Link to="/demenagement-longue-distance" className="underline text-brand-900">déménagement longue distance</Link>.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic">
                  <CheckCircle2 size={16} className="text-accent italic" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Droits à confirmer</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic">
                  <CheckCircle2 size={16} className="text-accent italic" />
                  <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic">Prestations à préciser</span>
                </div>
              </div>
            </div>
            <div className="relative group italic">
              <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.01] grayscale-[30%] italic">
                <img 
                  src="/images/camion-demenageur-marne-transdem.jpg" 
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
            { icon: <UserCheck size={32} />, t: "1. Procédure", d: "Vérifiez vos droits et le circuit à suivre auprès de votre service gestionnaire." },
            { icon: <FileText size={32} />, t: "2. Inventaire", d: "Précisez le volume réel, les accès et les prestations souhaitées." },
            { icon: <ClipboardCheck size={32} />, t: "3. Devis", d: "Faites établir le devis et suivez les consignes de validation reçues." },
            { icon: <Truck size={32} />, t: "4. Réservation", d: "Confirmez les dates et les conditions de réalisation avec le déménageur." }
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
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight underline decoration-accent/20 italic">Valider votre budget <br/><span className="text-accent italic">avant de réserver</span></h2>
              <p className="text-slate-300 text-lg font-light leading-relaxed italic text-justify italic">
                Le montant du devis et celui pris en charge ne sont pas nécessairement identiques. Faites confirmer votre financement et les prestations concernées avant de vous engager. Si votre date change, contactez le déménageur pour vérifier les disponibilités et les conditions de modification.
              </p>
              <div className="pt-4 italic">
                <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-flex items-center gap-3 italic">
                  Préparer mon devis mutation
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/3 relative z-10 italic">
               <div className="grid grid-cols-2 gap-4 italic font-sans italic underline-none italic transition-all italic">
                  {[
                    { l: "Volume", t: "À estimer" },
                    { l: "Devis", t: "À détailler" },
                    { l: "Dates", t: "À confirmer" },
                    { l: "Droits", t: "À vérifier" }
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Où vérifier la procédure de changement de résidence ?</h2>
          <p className="text-slate-600 leading-relaxed">Consultez les <a href="https://www.defense.gouv.fr/commissariat/actualites/vous-etes-mutes-demenagez-serenite-grace-pfmd" className="underline text-brand-900">informations du ministère des Armées sur la PFMD</a> et demandez à votre service gestionnaire quel dispositif s'applique à votre mutation. Une demande commerciale sur ce site ne vaut pas validation administrative ni réservation via une plateforme ministérielle.</p>
          <p className="text-slate-600 leading-relaxed">Pour préparer le transport, comparez les <Link to="/formules-demenagement" className="underline text-brand-900">prestations des formules de déménagement</Link>. Si les dates des logements ne coïncident pas, faites chiffrer séparément le <Link to="/garde-meuble-paris" className="underline text-brand-900">garde-meuble temporaire</Link> et vérifiez sa prise en charge éventuelle avec votre gestionnaire.</p>
        </div>
      </section>
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 italic underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight font-sans italic transition-all italic italic">FAQ <span className="text-accent italic tracking-tight">Militaire</span></h2>
           </div>
           <div className="space-y-6 italic font-sans italic transition-all italic underline-none italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0 italic">
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h3>
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
            <Link to="/calculateur-volume" className="hover:text-accent transition-colors italic">Estimer le volume à transporter</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-colors italic">Déménagement National</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-colors italic">Garde-meuble temporaire</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementMilitaire;
