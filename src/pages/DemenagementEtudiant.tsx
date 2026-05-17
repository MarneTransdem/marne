import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, GraduationCap, Zap, Wallet, Home, Truck, Package, Calculator, Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementEtudiant: React.FC = () => {
  const path = "/demenagement-etudiant";

  const faqs = [
    { 
      q: "Proposez-vous des tarifs spécifiques pour les étudiants ?", 
      a: "Nous proposons une formule 'Économique' particulièrement adaptée aux budgets étudiants. En optimisant le volume (souvent limité à un studio ou une chambre de bonne) et en vous laissant la charge de l'emballage, nous parvenons à proposer des tarifs très compétitifs." 
    },
    { 
      q: "Peut-on déménager un petit volume (quelques cartons et un lit) ?", 
      a: "Absolument. Marne Transdem intervient pour tous types de volumes, même les plus réduits. C'est l'essence même de notre service petit volume dédié aux étudiants et jeunes actifs." 
    },
    { 
      q: "Intervenez-vous dans les résidences universitaires (CROUS, etc.) ?", 
      a: "Oui, nous avons l'habitude d'intervenir dans les résidences étudiantes à Paris et en Île-de-France, en respectant les contraintes d'accès et les horaires spécifiques de ces établissements." 
    },
    { 
      q: "Faut-il réserver longtemps à l'avance pour la rentrée de septembre ?", 
      a: "La période de fin août et début septembre est très demandée. Nous vous conseillons de réserver votre déménagement étudiant au moins 3 à 4 semaines à l'avance pour garantir la disponibilité de nos équipes." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Étudiant Paris & IDF | Marne Transdem"
        description="Besoin d'un déménagement étudiant à petit prix ? Marne Transdem propose des solutions adaptées aux studios, chambres de bonne et petits budgets à Paris et IDF."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Étudiant", "Service de déménagement économique pour étudiants et jeunes actifs à Paris et en Île-de-France."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Déménagement Étudiant", item: path }
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
              <GraduationCap size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Spécial Budget Étudiant</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase">étudiant</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Marne Transdem simplifie votre installation à Paris et en Île-de-France avec des solutions flexibles, rapides et adaptées aux petits budgets. Idéal pour studios et chambres de bonne.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis étudiant gratuit
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
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre studio <span className="text-accent italic">déménagé sans stress</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify">
                <p>
                  Changer de logement pour ses études est une étape cruciale qui ne doit pas devenir un gouffre financier. Marne Transdem a conçu un service de <span className="font-bold text-brand-900 underline decoration-accent/30 decoration-2">déménagement étudiant</span> spécifiquement pensé pour répondre aux contraintes des jeunes actifs et des universitaires à Paris et en région parisienne.
                </p>
                <p>
                  Que vous quittiez le cocon familial, que vous changiez de résidence universitaire ou que vous vous installiez en colocation, nous mobilisons des moyens adaptés à votre volume (souvent entre 5 et 15 m³). Notre objectif : vous offrir le professionnalisme d'un déménageur de métier au prix le plus juste.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 italic space-y-8 shadow-sm">
               <h3 className="text-2xl font-bold text-brand-900 uppercase italic border-b border-accent pb-4">Pourquoi nous choisir ?</h3>
               <div className="space-y-6">
                  {[
                    { icon: <Wallet size={20} />, t: "Tarifs ultra-compétitifs", d: "Une formule économique pensée pour les petits budgets." },
                    { icon: <Clock size={20} />, t: "Grande réactivité", d: "Possibilité d'intervention rapide selon nos disponibilités." },
                    { icon: <Zap size={20} />, t: "Logistique simplifiée", d: "Matériel adapté aux accès difficiles (chambres de bonne, escaliers)." },
                    { icon: <ShieldCheck size={20} />, t: "Sérénité totale", d: "Vos biens sont assurés et manipulés par des pros." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start italic">
                      <div className="text-accent mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-brand-900 text-sm uppercase italic">{item.t}</h4>
                        <p className="text-xs text-slate-500 font-light">{item.d}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 text-center italic mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Des solutions <span className="text-accent">sur mesure</span></h2>
        </div>
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 italic">
          {[
            { icon: <Home size={32} />, t: "Studio & Chambre", d: "Parfait pour les logements de 9m² à 25m². Manutention et transport rapide." },
            { icon: <Truck size={32} />, t: "Petit Volume", d: "Formule groupage ou dédiée pour quelques meubles et cartons seulement." },
            { icon: <Package size={32} />, t: "Matériel fourni", d: "Possibilité de commander des cartons et protections à prix préférentiel." }
          ].map((card, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-accent hover:shadow-xl transition-all group italic">
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
              <h3 className="text-xl font-bold text-brand-900 mb-4 uppercase italic tracking-tight">{card.t}</h3>
              <p className="text-slate-500 font-light text-sm leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center italic">
          <h2 className="text-3xl lg:text-6xl font-black mb-10 uppercase italic tracking-tight">Prêt à emménager ?</h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light italic">
            Obtenez une estimation gratuite en quelques minutes pour votre déménagement étudiant.
          </p>
          <div className="flex flex-wrap justify-center gap-6 italic">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition-all italic underline-none">
              Demander mon devis gratuit
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 backdrop-blur-sm italic">
              <Phone size={22} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 font-sans italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic">
           <div className="text-center mb-16 italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight underline decoration-accent/20">FAQ <span className="text-accentitalic">Étudiant</span></h2>
           </div>
           <div className="space-y-6 italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight">
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

      {/* Internal Linking / Footer Maillage */}
      <section className="py-12 bg-slate-50 border-t border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
            <Link to="/calculateur-volume" className="hover:text-accent transition-colors">Calculateur Volume</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-colors">Formules</Link>
            <Link to="/cartons-demenagement-paris" className="hover:text-accent transition-colors">Cartons</Link>
            <Link to="/demenagement-petit-volume" className="hover:text-accent transition-colors underline decoration-accent/30 decoration-2">Petit Volume</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementEtudiant;
