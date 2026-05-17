import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Heart, Sparkles, Zap, Package, LayoutGrid, ClipboardCheck, Sofa, HelpCircle, Truck, Info, Home, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementSenior: React.FC = () => {
  const path = "/demenagement-senior";

  const faqs = [
    { 
      q: "Quelles aides financières existent pour le déménagement des seniors ?", 
      a: "Plusieurs aides peuvent être sollicitées selon la situation : les caisses de retraite parentales (CNAV, CNRACL, etc.), l'APA (Allocation Personnalisée d'Autonomie) via le Conseil Départemental, ou encore certaines mutuelles." 
    },
    { 
      q: "Proposez-vous un service d'emballage complet (vaisselle, rideaux, bibelots) ?", 
      a: "Oui, notre formule 'Luxe' est particulièrement recommandée pour les seniors. Nous prenons en charge l'intégralité de l'emballage des objets fragiles, bibelots, vaisselle, ainsi que le décrochage et le raccrochage des luminaires." 
    },
    { 
      q: "Déménagez-vous vers des résidences seniors ou EHPAD ?", 
      a: "Absolument. Nous connaissons les contraintes logistiques de ces établissements (horaires, accès restreints, coordination avec le personnel de santé). Nous assurons un transfert respectueux et discret." 
    },
    { 
      q: "Pouvez-vous nous aider à trier ou à débarrasser certains meubles ?", 
      a: "Nous pouvons organiser le retrait d'encombrants ou le transfert vers un garde-meuble si le nouveau logement est plus petit que l'ancien, afin de faciliter la transition." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Senior Paris & Île-de-France | Marne Transdem"
        description="Un accompagnement bienveillant pour le déménagement des seniors à Paris. Aide à l'emballage, manutention douce, installation en résidence senior ou EHPAD."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Senior", "Service de déménagement avec accompagnement renforcé pour les personnes âgées, incluant emballage complet et installation."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Déménagement Senior", item: path }
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
              <Heart size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Accompagnement Bienveillant & Sur-mesure</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase">senior</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem offre un service de déménagement tout en douceur pour les seniors. Plus qu'un simple transport, nous assurons un accompagnement humain pour une transition sereine vers votre nouveau foyer.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Demander un devis personnalisé
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

      {/* Intro section emphasizing the soft approach */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Une transition <span className="text-accent italic">en toute sérénité</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify grayscale-[20%]">
                <p>
                  Changer de logement après de nombreuses années dans un même foyer est une étape chargée d'émotion. Marne Transdem l'a compris et propose un service de <span className="font-bold text-brand-900">déménagement senior</span> basé sur l'écoute, la patience et une attention méticuleuse portée aux objets qui vous sont chers.
                </p>
                <p>
                  Qu'il s'agisse de se rapprocher de votre famille, de s'installer dans un appartement plus adapté ou d'intégrer une <Link to="/demenagement-residence-senior" className="text-brand-900 font-bold hover:text-accent italic decoration-accent/30 underline underline-offset-4">résidence service</Link> ou un EHPAD, nos équipes sont formées pour agir avec discrétion et prévenance.
                </p>
              </div>
            </div>
            <div className="relative group italic">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-105 grayscale-[10%]">
                <img 
                  src="/images/demenagement-senior-paris.jpg" 
                  alt="Déménagement personne âgée Marne Transdem" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/30 rounded-full blur-[100px] -z-0 italic"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services for Seniors Cards */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16 italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Un service <span className="text-accent italic underline-none">clé en main</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 italic transition-all italic underline-none italic">
            {[
              { icon: <Package size={32} />, t: "Emballage Expert", d: "Protection intégrale de votre vaisselle, bibelots, effets personnels et souvenirs précieux." },
              { icon: <Sofa size={32} />, t: "Manutention Douce", d: "Démontage et remontage de vos meubles avec un soin extrême." },
              { icon: <Sparkles size={32} />, t: "Service d'installation", d: "Mise en place de vos meubles selon vos souhaits pour vous sentir immédiatement chez vous." },
              { icon: <ShieldCheck size={32} />, t: "Assurance Renforcée", d: "Protection ad valorem pour couvrir sereinement vos objets de valeur." }
            ].map((service, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 h-full hover:border-accent transition-all group italic">
                <div className="text-accent mb-6 group-hover:scale-110 transition-all italic">{service.icon}</div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight italic underline-none italic">{service.t}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed italic">{service.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by step installation */}
      <section className="py-24 font-sans italic transition-all italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-4xl mx-auto italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-12 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 text-center italic">L'installation, notre priorité</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 italic transition-all italic underline-none italic">
                <div className="space-y-6 italic font-sans italic underline-none italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic grayscale-0 italic opacity-100 italic transition-opacity">
                   <p className="text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                     Nous ne nous contentons pas de transporter vos cartons. Pour un <span className="font-bold text-brand-900">déménagement senior réussi</span>, nous accordons une importance capitale au remontage et à la mise en place de vos meubles dans le nouveau logement.
                   </p>
                   <p className="text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                     Que ce soit pour une installation en maison de retraite (EHPAD) ou en résidence autonomie, nous coordonnons l'arrivée avec l'établissement pour éviter tout désagrément.
                   </p>
                   <div className="pt-4 italic">
                      <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-3 italic underline-none italic grayscale-0 italic opacity-100">
                        Demander un devis senior
                        <ArrowRight size={22} className="text-accent italic" />
                      </Link>
                   </div>
                </div>
                <div className="bg-brand-900 p-10 rounded-[3rem] text-white flex flex-col justify-center italic">
                   <div className="space-y-6 italic">
                      {[
                        "Décrochage des rideaux et luminaires",
                        "Emballage des objets d'art et fragiles",
                        "Tri pré-déménagement (Option)",
                        "Remontage complet du mobilier",
                        "Mise en place des vêtements sur cintres"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 italic">
                           <CheckCircle2 size={24} className="text-accent shrink-0 italic" />
                           <span className="text-sm font-medium italic opacity-90">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Senior */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic shadow-none italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8 italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline-none italic shadow-none italic grayscale-0 italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0 italic shadow-none italic">Seniors</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic">
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

      {/* Internal Linking Maillage Final */}
      <section className="py-12 bg-white border-t border-slate-100 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic">
            <Link to="/demenagement-particuliers-paris" className="hover:text-accent transition-all italic">Particuliers</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2">Nos Formules</Link>
            <Link to="/emballage-protection-demenagement" className="hover:text-accent transition-all italic">Emballage</Link>
            <Link to="/garde-meuble-paris" className="hover:text-accent transition-all italic">Stockage sécurisé</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Aide & Devis</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementSenior;
