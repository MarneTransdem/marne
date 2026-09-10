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
      a: "Transmettez les consignes de votre employeur : destinataire du devis, adresse de facturation, prestations demandées et éventuelles références à faire figurer. Faites valider le devis par votre interlocuteur RH ou achats avant de confirmer la réservation."
    },
    { 
      q: "Dans quels délais puis-je obtenir un devis pour ma mutation ?", 
      a: "Le délai dépend des informations disponibles et de la nécessité d'évaluer le volume ou les accès. Indiquez votre date de prise de poste et la date limite de réponse demandée par votre employeur ; le délai de remise du devis sera à confirmer lors de l'échange."
    },
    { 
      q: "Proposez-vous une assistance pour les démarches administratives ?", 
      a: "Demandez à votre employeur la liste des justificatifs attendus et transmettez-la avant la réservation. Conservez le devis accepté, les documents contractuels et la facture. Les conditions de remboursement et les pièces requises restent à vérifier auprès de l'organisme qui prend en charge les frais."
    },
    { 
      q: "Prenez-vous en charge le déménagement de ma famille également ?", 
      a: "Précisez si le projet concerne tout le mobilier familial ou seulement une partie des biens. Le volume, les prestations d'emballage, les dates et les éventuels besoins de stockage doivent figurer dans votre demande pour établir le périmètre du déménagement."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Mutation Professionnelle Paris | Marne Transdem"
        description="Préparez votre déménagement pour mutation professionnelle à Paris : volume, accès, calendrier, devis à transmettre à votre employeur et prestations à choisir."
        canonical={path}
        schema={[
          getServiceSchema("Mutation Professionnelle", "Déménagement pour mutation professionnelle à Paris, en Île-de-France ou longue distance, avec volume, calendrier et prestations à préciser au devis."),
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
              initial={false}
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
              Préparez votre changement de domicile à Paris, en Île-de-France ou en province : volume à transporter, accès, date de prise de poste et prestations souhaitées. Transmettez ces éléments à Marne Transdem pour établir votre devis de déménagement.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 italic font-sans transition-all italic underline-none">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none italic grayscale-0 italic opacity-100 italic transition-opacity font-sans">
                Demander un devis mutation
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
                  Réunissez les consignes de votre employeur avant de demander le devis : prestations concernées, coordonnées de facturation et justificatifs attendus. Pour un trajet entre deux régions, consultez notre page <Link to="/demenagement-longue-distance" className="text-brand-900 font-bold hover:text-accent underline">déménagement longue distance</Link> et signalez les contraintes de chargement et de livraison.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic grayscale-0 italic">
                 <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic grayscale-0 italic shadow-none italic">
                   <CheckCircle2 size={16} className="text-accent italic grayscale-0 italic" />
                   <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic grayscale-0 italic opacity-100">Consignes RH à préciser</span>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 italic grayscale-0 italic shadow-none italic">
                   <Zap size={16} className="text-accent italic grayscale-0 italic" />
                   <span className="text-[10px] font-black uppercase text-brand-900 tracking-widest italic grayscale-0 italic opacity-100">Calendrier à confirmer</span>
                 </div>
              </div>
            </div>
            <div className="rounded-[4rem] overflow-hidden grayscale-[30%] shadow-2xl skew-x-1 italic font-sans transition-all italic shadow-none italic">
               <img src="/images/transfert-bureaux-entreprise-paris.jpg" alt="Mutation professionnelle Paris Marne Transdem" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 italic" />
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
              { icon: <FileText size={32} />, t: "Dossier employeur", d: "Communiquez les consignes et les justificatifs demandés avant de valider le devis." },
              { icon: <Calculator size={32} />, t: "Volume à transporter", d: "Préparez l'inventaire du mobilier et les dimensions des accès aux deux logements." },
              { icon: <Package size={32} />, t: "Emballage à choisir", d: "Précisez les objets à emballer et les tâches que vous souhaitez conserver à votre charge." },
              { icon: <Truck size={32} />, t: "Calendrier", d: "Signalez la prise de poste et faites confirmer les dates de chargement et de livraison." }
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
                      Utilisez le <Link to="/calculateur-volume" className="underline text-brand-900">calculateur de volume</Link> pour préparer votre inventaire, puis comparez les <Link to="/formules-demenagement" className="underline text-brand-900">formules de déménagement</Link>. Si les dates de départ et d'entrée dans le logement ne coïncident pas, demandez les conditions et le coût d'un <Link to="/garde-meuble-paris" className="underline text-brand-900">stockage en garde-meuble</Link>.
                    </p>
                    <ul className="space-y-4 italic font-sans transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                       {[
                         "Dates et disponibilités à confirmer",
                         "Inventaire du mobilier familial",
                         "Validation du devis par votre interlocuteur RH",
                         "Garanties et exclusions à vérifier au contrat"
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
                    <h3 className="text-xl font-bold mb-8 uppercase italic tracking-tight border-b border-accent pb-4 italic">Check-list Mutation</h3>
                    <div className="space-y-6 italic">
                       {[
                         { step: "Inventaire", d: "Indiquez le mobilier, les deux adresses et leurs accès." },
                         { step: "Devis", d: "Faites préciser les prestations et le calendrier proposé." },
                         { step: "Validation", d: "Soumettez le devis à votre employeur selon ses consignes." },
                         { step: "Réservation", d: "Confirmez les dates et les modalités avec le déménageur." }
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
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                   <HelpCircle className="text-accent shrink-0 italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic" size={20} />
                   {faq.q}
                 </h3>
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
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Devis déménagement mutation</Link>
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
