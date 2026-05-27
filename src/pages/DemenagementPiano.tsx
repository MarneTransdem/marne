import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Music, Zap, Ruler, Boxes, ShieldCheck, Truck, LayoutGrid, ClipboardCheck, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementPiano: React.FC = () => {
  const path = "/demenagement-piano-objets-lourds";

  const faqs = [
    { 
      q: "Déménagez-vous tous les types de pianos ?", 
      a: "Oui, nos équipes sont formées pour le transport de pianos droits et de pianos à queue (quart-de-queue, demi-queue). Chaque type nécessite des techniques de protection et de levage spécifiques que nous maîtrisons parfaitement." 
    },
    { 
      q: "Quelles précautions prenez-vous pour un transport de piano ?", 
      a: "Nous utilisons des housses de protection capitonnées, des luges à piano pour la manutention, et nous sanglons l'instrument avec soin. Si le passage par l'escalier est impossible, nous utilisons un monte-meuble professionnel." 
    },
    { 
      q: "Assurez-vous d'autres objets lourds (coffres-forts, billards) ?", 
      a: "Absolument. Notre expertise s'étend à tous les objets encombrants ou lourds : coffres-forts, tables de billard, marbres, statues ou machines-outils légères." 
    },
    { 
      q: "Faut-il prévoir un accordage après le déménagement ?", 
      a: "Un piano est sensible aux variations d'hygrométrie et de température. Bien que nous le transportions avec le plus grand soin, il est conseillé de prévoir un accordage environ 2 à 3 semaines après son installation dans son nouveau domicile." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Piano & Objets Lourds Paris | Marne Transdem"
        description="Transport professionnel de pianos, coffres-forts et objets lourds à Paris. Expertise technique, matériel de levage et monte-meuble pour vos biens précieux."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Piano & Objets Lourds", "Service spécialisé de transport d'instruments de musique, coffres-forts et mobiliers lourds ou encombrants à Paris et IDF."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Objets Lourds", item: path }
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
              <Music size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Technique de Manutention Avancée</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Piano & objets <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">lourds</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem maîtrise le transport de vos biens les plus précieux et encombrants. Pianos droits, pianos à queue, coffres-forts ou marbres : nous garantissons une sécurité absolue.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 italic font-sans transition-all italic underline-none">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none italic grayscale-0 italic opacity-100 italic transition-opacity font-sans">
                Devis transport spécialisé
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

      {/* Intro section for heavy lifting */}
      <section className="py-24 font-sans italic underline-none italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic translate-y-0 italic grayscale-0 italic opacity-100 italic transition-opacity italic grayscale-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic transition-all italic grayscale-0 italic opacity-100 italic transition-opacity italic grayscale-0">
            <div className="space-y-8 italic font-sans transition-all italic grayscale-0 italic">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-accent italic">
                La précision <span className="text-accent italic font-sans italic transition-all italic grayscale-0 italic opacity-100 italic">du geste technique</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify grayscale-0 italic transition-opacity italic">
                <p>
                  Transporter un instrument de musique ou un meuble de plusieurs centaines de kilos ne s'improvise pas. Marne Transdem mobilise des équipes expertes en <span className="font-bold text-brand-900 underline decoration-accent/10 underline-offset-4 italic">manutention lourde</span> pour assurer l'intégrité de vos biens et de votre domicile lors du passage.
                </p>
                <p>
                  Qu'il s'agisse d'un accès par escalier avec une luge à piano ou d'une extraction par façade via un <Link to="/location-monte-meuble-paris" className="text-brand-900 font-bold hover:text-accent italic transition-colors underline decoration-accent/10 italic">monte-meuble spécialisé</Link>, nous adaptons nos moyens à chaque contrainte technique. Votre piano droit ou à queue sera protégé par des housses spécifiques et sanglé avec la plus grande rigueur.
                </p>
              </div>
            </div>
            <div className="rounded-[4rem] overflow-hidden grayscale-[5%] shadow-2xl skew-x-1 italic font-sans transition-all italic shadow-none italic">
               <img src="/images/demenageur-port-de-charges.jpg" alt="Transport piano et objets lourds Marne Transdem" className="w-full h-full object-cover italic transition-transform duration-700 hover:scale-[1.02]" />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Cards */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
          <div className="text-center mb-16 italic font-sans transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all italic font-sans italic grayscale-0 italic shadow-none italic">Notre expertise <span className="text-accent italic tracking-tight italic transition-all italic grayscale-0 italic shadow-none italic">en manutention</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">
            {[
              { icon: <Music size={32} />, t: "Pianos droits & à queue", d: "Protection intégrale, transport sur luge et sanglage professionnel." },
              { icon: <ShieldCheck size={32} />, t: "Coffres-forts", d: "Manutention de charges lourdes avec matériel de portage adapté." },
              { icon: <Ruler size={32} />, t: "Mobiliers de valeur", d: "Table en marbre, billard, sculptures et pièces de créateur." },
              { icon: <Zap size={32} />, t: "Monte-meuble dédié", d: "Extraction sécurisée par les fenêtres jusqu'au 8ème étage." }
            ].map((card, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 h-full hover:border-accent transition-all group italic font-sans transition-all italic grayscale-0 italic shadow-none italic">
                <div className="text-accent mb-6 group-hover:scale-110 transition-transform italic font-sans italic grayscale-0 italic opacity-100 italic transition-opacity italic">{card.icon}</div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight italic font-sans transition-all italic grayscale-0 italic shadow-none italic">{card.t}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Insurance section */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
           <div className="max-w-4xl mx-auto italic font-sans transition-all italic underline decoration-accent/20 italic underline-offset-8 transition-all grayscale-0 italic shadow-none italic opacity-100 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-12 text-center uppercase italic tracking-tight font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">Sécurité & <span className="text-accent italic tracking-tight italic transition-all italic grayscale-0 italic shadow-none italic">Assurances</span></h2>
              <div className="bg-slate-900 p-12 lg:p-20 rounded-[4rem] text-white italic font-sans transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center italic">
                    <div className="space-y-6 italic">
                       <p className="text-slate-300 text-lg font-light leading-relaxed italic text-justify italic">
                         Pour vos objets de grande valeur, Marne Transdem propose des extensions d'assurance ad valorem. Chaque piano ou objet lourd fait l'objet d'un état des lieux rigoureux avant et après le transport.
                       </p>
                       <ul className="space-y-4 italic">
                          {[
                            "Housses de protection capitonnées",
                            "Sangles de levage professionnelles",
                            "Expertise pianos droits & queue",
                            "Manutention d'objets d'art délicats"
                          ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 italic">
                               <CheckCircle2 size={20} className="text-accent italic" />
                               <span className="text-sm font-medium italic opacity-90">{item}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center italic">
                       <ShieldCheck size={64} className="text-accent mx-auto mb-6 italic" />
                       <div className="text-2xl font-black uppercase italic tracking-tight italic">Protection <br/>Garantie</div>
                       <div className="text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] italic">Valeurs déclarées</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Objets Lourds */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8 italic transition-all grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">Piano</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic">
                   <HelpCircle className="text-accent shrink-0 italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic" size={20} />
                   {faq.q}
                 </h4>
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
            <Link to="/demande-de-devis" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Devis spécialisé</Link>
            <Link to="/location-monte-meuble-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Monte-meuble</Link>
            <Link to="/demenagement-oeuvres-art" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Transport d'Art</Link>
            <Link to="/demenagement-petit-volume" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Meuble Isolé</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Contact Expert</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementPiano;
