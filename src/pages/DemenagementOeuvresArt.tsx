import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Palette, Shield, Info, Zap, Building2, User, ClipboardCheck, Package, LayoutGrid, Truck, Star, Sparkles, Frame, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementOeuvresArt: React.FC = () => {
  const path = "/demenagement-oeuvres-art";

  const faqs = [
    { 
      q: "Comment sont protégées les œuvres d'art lors d'un déménagement ?", 
      a: "Nous utilisons des matériaux de protection spécifiques : papier de soie sans acide, bulles polyéthylène, couvertures en feutre et, si nécessaire, des caisses sur-mesure en bois. Chaque œuvre est traitée individuellement selon sa fragilité et sa valeur." 
    },
    { 
      q: "Assurez-vous le transport de sculptures volumineuses ?", 
      a: "Oui, nous disposons du matériel de manutention adapté (monte-meubles, chariots spécifiques) et de l'expertise nécessaire pour manipuler et transporter des sculptures lourdes ou encombrantes en toute sécurité." 
    },
    { 
      q: "Proposez-vous une assurance spécifique pour les objets de valeur ?", 
      a: "Absolument. Pour les œuvres d'art, nous proposons des extensions d'assurance ad valorem basées sur la valeur déclarée de vos biens, vous offrant une protection optimale contre tout risque éventuel." 
    },
    { 
      q: "Intervenez-vous pour des galeries ou des musées ?", 
      a: "Marne Transdem accompagne principalement les collectionneurs privés, mais notre savoir-faire technique nous permet de répondre aux exigences de transport pour les galeries, les expositions temporaires et les professionnels de l'art." 
    },
    { 
      q: "Quel est le délai pour organiser un transport d'art ?", 
      a: "Compte tenu de la préparation nécessaire (caissage éventuel, planification logistique spécialisée), il est conseillé de nous contacter au moins 15 jours avant la date souhaitée pour une organisation optimale." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Œuvres d'Art Paris | Marne Transdem"
        description="Transport spécialisé d'œuvres d'art, tableaux et sculptures à Paris. Protection experte, caissage sur-mesure et manutention délicate pour vos objets précieux."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement d'œuvres d'art", "Marne Transdem propose un service de transport d'art haut de gamme pour les collectionneurs et professionnels, garantissant protection et sécurité."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Déménagement d'œuvres d'art", item: path }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white font-sans">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Palette size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Expertise Fine Art</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase">d'œuvres d'art</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Protection et transport de vos objets précieux, tableaux et sculptures avec un soin extrême. Une logistique dédiée aux collectionneurs et aux pièces d'exception à Paris et en Île-de-France.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis spécialisé art
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

      {/* 2. Bloc de réassurance */}
      <section className="bg-slate-50 py-12 border-b border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={24} />, title: "Sécurité maximale" },
              { icon: <Sparkles size={24} />, title: "Soin extrême" },
              { icon: <Frame size={24} />, title: "Caissage spécifique" },
              { icon: <Star size={24} />, title: "Assurance Ad Valorem" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 italic">
                <div className="text-accent grayscale-[20%]">{item.icon}</div>
                <span className="text-[10px] font-black text-brand-900 uppercase tracking-widest italic">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 & 4. Introduction */}
      <section className="py-24 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-8 italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight italic underline decoration-accent/20 underline-offset-8">Le Transport d'art : <span className="text-accent italic tracking-tight">une affaire de spécialistes</span></h2>
            <p className="text-slate-500 leading-relaxed text-lg font-light italic">
              Vos collections ne sont pas de simples meubles. Tableaux, sculptures, antiquités ou mobilier de designer requièrent une manipulation experte et des matériaux de protection spécifiques. Marne Transdem met à votre service une équipe formée aux techniques du "Fine Art" pour garantir une intégrité parfaite de vos œuvres lors de leur transport à Paris et partout en France.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center italic transition-all italic underline-none italic">
            <div className="order-2 md:order-1 rounded-[3.5rem] overflow-hidden shadow-2xl skew-x-1 grayscale-[10%] italic">
              <img 
                src="/images/demenagement-oeuvres-art.jpg" 
                alt="Emballage oeuvre d'art Marne Transdem" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2 grid grid-cols-1 gap-8 italic transition-all italic underline-none italic">
              {[
                { t: "Emballage haute protection", d: "Utilisation de matériaux neutres (papier de soie sans acide) pour préserver les surfaces délicates." },
                { t: "Caissage sur-mesure", d: "Fabrication de caisses en bois spécifiques pour les œuvres les plus fragiles ou précieuses." },
                { t: "Manutention délicate", d: "Une gestuelle précise acquise par l'expérience pour éviter tout risque lors du portage." },
                { t: "Transport sécurisé", d: "Arrimage spécifique dans nos camions pour éliminer toute vibration ou mouvement." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all h-full italic">
                  <div className="w-12 h-12 bg-slate-50 text-accent rounded-xl flex items-center justify-center mb-6 italic">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-4 uppercase italic tracking-tight italic">{item.t}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed italic">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services spécifiques Art */}
      <section className="py-24 bg-slate-50 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="text-center mb-16 italic underline decoration-accent/20 underline-offset-8">
            <h2 className="text-3xl lg:text-5xl font-black text-brand-900 uppercase italic tracking-tight italic">Prestations dédiées aux collectionneurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
            {[
              { icon: <Frame size={32} />, title: "Protection Tableaux", desc: "Coins de protection, papier de soie et cartonnages spécifiques." },
              { icon: <Box size={32} />, title: "Caisses bois", desc: "Solution de transport ultime pour les pièces de grande valeur." },
              { icon: <Shield size={32} />, title: "Assurance spécifique", desc: "Couverture ad valorem adaptée au marché de l'art." },
              { icon: <Sparkles size={32} />, title: "Objets de vitrine", desc: "Conditionnement millimétré pour les petits objets fragiles." },
              { icon: <LayoutGrid size={32} />, title: "Logistique dédiée", desc: "Une planification rigoureuse du point A au point B." },
              { icon: <Palette size={32} />, title: "Expertise Fine Art", desc: "Un personnel formé à la manipulation d'objets précieux." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex gap-6 items-start hover:shadow-lg transition-all italic">
                <div className="text-accent shrink-0 italic">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-brand-900 mb-3 uppercase italic tracking-tight italic">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed italic">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Méthode en 4 étapes Art */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 text-center italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 uppercase italic tracking-tight italic underline decoration-accent/20 underline-offset-8">Organisation en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 italic">
            {[
              { t: "Inventaire & Valeur", d: "Audit des œuvres à transporter et estimation de la couverture d'assurance." },
              { t: "Cahier des charges", d: "Définition du mode de protection (standard ou caissage bois)." },
              { t: "Conditionnement", d: "Phase d'emballage minutieuse effectuée in situ par nos experts." },
              { t: "Livraison sécurisée", d: "Manutention terminale et installation si nécessaire." }
            ].map((step, i) => (
              <div key={i} className="group italic">
                <div className="w-16 h-16 bg-brand-900 text-accent rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg italic">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 uppercase italic tracking-tight italic">{step.t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light italic">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA Intermédiaire */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden font-sans italic transition-all italic underline-none italic">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/2 italic transition-all italic"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10 italic">
          <h2 className="text-3xl lg:text-6xl font-black mb-10 leading-tight italic uppercase tracking-tight italic">Confiez vos trésors <br/><span className="text-accent italic">à des mains expertes</span></h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light leading-relaxed italic">
            Parlez-nous de vos œuvres et recevez une étude logistique personnalisée pour leur transport.
          </p>
          <div className="flex flex-wrap justify-center gap-6 italic">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 italic underline-none">
              Demander mon devis art
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 backdrop-blur-sm italic">
              <Phone size={22} className="text-accent italic" />
              Appeler le {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Art */}
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-4xl mx-auto italic">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-12 text-center uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8 transition-all italic">Questions fréquentes <br/><span className="text-accent italic tracking-tight italic uppercase italic">transport d'art</span></h2>
            <div className="space-y-6 italic">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 italic transition-all italic">
                  <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic">
                    <Zap size={20} className="text-accent italic" />
                    {faq.q}
                  </h4>
                  <p className="text-slate-500 leading-relaxed font-light italic pl-9 border-l-4 border-accent/20 italic">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Maillage interne final */}
      <section className="py-20 border-t border-slate-100 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center italic">
              {[
                { n: "Devis Art", l: "/demande-de-devis" },
                { n: "Formules", l: "/formules-demenagement" },
                { n: "Particuliers", l: "/demenagement-particuliers-paris" },
                { n: "Entreprises", l: "/demenagement-entreprises-paris" },
                { n: "Emballage", l: "/emballage-protection-demenagement" },
                { n: "Contact", l: "/contact" }
              ].map((link, i) => (
                <Link key={i} to={link.l} className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:border-accent hover:shadow-xl transition-all border border-transparent italic">
                   <h4 className="text-[10px] font-black text-brand-900 uppercase tracking-widest italic">{link.n}</h4>
                </Link>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementOeuvresArt;
