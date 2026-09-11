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
      a: "Si votre projet nécessite du stockage, indiquez le volume d’archives, la durée envisagée et la fréquence des retraits. Faites confirmer le lieu, les conditions de conservation, les modalités d’accès et les garanties avant de retenir une solution."
    },
    { 
      q: "Comment identifier les boîtes avant le transfert ?",
      a: "Préparez une liste numérotée des boîtes avec leur service et leur emplacement de destination. Conservez en interne la correspondance avec le contenu des dossiers. Précisez au devis qui prépare les boîtes, réalise le repérage et les installe à l’arrivée."
    },
    { 
      q: "Comment préparer le transport de documents confidentiels ?",
      a: "Désignez les personnes autorisées à remettre et réceptionner les boîtes. Communiquez vos exigences de fermeture, de repérage et de suivi pour faire confirmer les moyens adaptés au devis. Évitez de faire apparaître des informations sensibles sur les étiquettes extérieures."
    },
    { 
      q: "Que faut-il préciser dans un devis de transfert d’archives ?",
      a: "Indiquez le nombre de boîtes ou le volume estimé, les adresses, les accès, le calendrier et le plan de rangement souhaité. Faites distinguer l’emballage, le transport, la manutention et le stockage éventuel. Signalez les documents qui doivent rester accessibles pendant le transfert."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Gestion & Transfert d'Archives Paris | Marne Transdem"
        description="Transfert d’archives à Paris : préparez le volume, le repérage des boîtes, les accès et la réception. Stockage éventuel et prestations à préciser dans votre devis."
        canonical={path}
        schema={[
          getServiceSchema("Transfert d’archives", "Préparation du transport des archives d’entreprise à Paris : volume, repérage, accès et modalités de réception à définir au devis."),
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Files size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Organisation & Transfert d’archives</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">d’archives</span> à Paris
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Organisez le déplacement de vos archives avec un inventaire, un repérage des boîtes et des consignes de réception. Les prestations et les besoins de stockage sont à préciser selon votre projet.
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
                  Le <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert d’archives</span> se prépare en identifiant les boîtes à déplacer, les services concernés et leurs emplacements d’arrivée. Désignez un référent pour centraliser les consignes et conserver la liste de correspondance avec les dossiers.
                </p>
                <p>
                  Précisez les documents qui doivent rester accessibles pendant le déménagement. L’emballage, la manutention et la disposition des boîtes à l’arrivée doivent être définis au devis. Pour un stockage intermédiaire, faites confirmer les délais et les modalités de récupération avant le départ des archives.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4 italic font-sans italic">
                 <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 italic">
                    <div className="text-accent font-black text-2xl italic">Repérage</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Boîtes et destinations</div>
                 </div>
                 <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 italic font-sans italic">
                    <div className="text-accent font-black text-2xl italic">Réception</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Contrôle de l’inventaire</div>
                 </div>
              </div>
            </div>
            <div className="relative italic transition-all grayscale-0 shadow-none italic font-sans italic">
               <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 hover:scale-[1.02] italic grayscale-0">
                  <img src="/images/bureau-marne-transdem.webp" alt="Gestion d'archives Marne Transdem" className="w-full h-full object-cover italic transition-all" />
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
              { icon: <Database size={32} />, t: "Volume", d: "Nombre de boîtes, dimensions et mobilier de rangement à déplacer." },
              { icon: <Search size={32} />, t: "Repérage", d: "Numérotation des boîtes et plan des emplacements d’arrivée à préparer." },
              { icon: <ShieldCheck size={32} />, t: "Consignes", d: "Fermeture des boîtes, personnes habilitées et exigences particulières à préciser." },
              { icon: <Zap size={32} />, t: "Accès aux dossiers", d: "Documents prioritaires et retraits pendant un stockage à anticiper." }
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
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Préparer le devis et la réception de vos archives</h2>
          <p className="text-slate-600 leading-relaxed">Indiquez les deux adresses, les étages, les ascenseurs, les possibilités de stationnement et la date souhaitée. À l’arrivée, prévoyez une personne pour rapprocher les boîtes reçues de l’inventaire et signaler les écarts constatés. Le tri du contenu, la numérisation et la destruction documentaire ne doivent pas être supposés inclus dans une prestation de transport.</p>
          <p className="text-slate-600 leading-relaxed">Si les archives accompagnent le mobilier, consultez notre page <Link to="/transfert-bureaux-paris" className="underline text-brand-900">transfert de bureaux</Link>. Pour un besoin intermédiaire, préparez les conditions de <Link to="/garde-meuble-paris" className="underline text-brand-900">stockage et de restitution</Link>. Décrivez le volume et les contraintes dans votre <Link to="/demande-de-devis" className="underline text-brand-900">demande de devis de transfert d’archives</Link>.</p>
        </div>
      </section>
      <section className="py-24 font-sans italic underline-none transition-all grayscale-0 italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic transition-all">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8 transition-all">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight underline-none italic transition-all">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic transition-all underline-none grayscale-0">Archivage</span></h2>
           </div>
           <div className="space-y-6 italic font-sans transition-all italic underline-none grayscale-0 italic transition-all shadow-none italic font-sans italic transition-all underline-none italic transition-all">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-accent transition-all shadow-sm italic transition-all italic transition-all">
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all underline-none grayscale-0 italic shadow-none italic font-sans italic transition-all underline-none italic">
                   <HelpCircle className="text-accent shrink-0 italic transition-all grayscale-0" size={20} />
                   {faq.q}
                 </h3>
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
            <Link to="/contact" className="hover:text-accent transition-all italic">Préparer votre transfert</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GestionArchives;
