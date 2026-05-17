import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Box, Zap, Wallet, Home, Truck, Package, Calculator, Clock, HelpCircle, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementPetitVolume: React.FC = () => {
  const path = "/demenagement-petit-volume";

  const faqs = [
    { 
      q: "Qu'est-ce qu'un déménagement 'petit volume' ?", 
      a: "On parle de petit volume pour un déménagement correspondant généralement à un studio, une chambre de bonne ou le transfert de quelques meubles et cartons (entre 1 et 15 m³)." 
    },
    { 
      q: "Est-ce moins cher qu'un déménagement classique ?", 
      a: "Oui, car il nécessite moins de personnel et un véhicule plus petit. Marne Transdem propose des tarifs adaptés pour que le coût de votre déménagement reste proportionnel à la quantité de biens transportés." 
    },
    { 
      q: "Proposez-vous du groupage pour les petits volumes ?", 
      a: "Oui, pour les longues distances, nous organisons des tournées de groupage qui permettent de partager les frais de transport avec d'autres clients, offrant ainsi des prix très attractifs." 
    },
    { 
      q: "Peut-on déménager une seule armoire ou un seul canapé ?", 
      a: "Tout à fait. Notre service petit volume est idéal pour le transport de meubles isolés ou de quelques effets personnels, que ce soit à Paris, en banlieue ou en France." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Petit Volume Paris & IDF | Marne Transdem"
        description="Besoin de déménager quelques meubles ou un studio ? Découvrez notre service de déménagement petit volume à Paris : rapide, économique et professionnel."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Petit Volume", "Solution de déménagement économique pour les petits volumes, studios, chambres de bonne ou meubles isolés à Paris et en Île-de-France."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Petit Volume", item: path }
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
              <Box size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Solution Économique & Rapide</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase">petit volume</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Quelques cartons, un canapé ou un studio complet : Marne Transdem propose des formules intelligentes pour vos petits déménagements à Paris et en Île-de-France.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis petit volume gratuit
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

      {/* Intro section for small moves */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Petit volume <span className="text-accent italic">mais grand service</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify">
                <p>
                  Ce n'est pas parce que vous n'avez que quelques mètres cubes à transporter que vous devez renoncer à la qualité d'une entreprise de déménagement professionnelle. Marne Transdem a développé une expertise spécifique pour le <span className="font-bold text-brand-900">déménagement de petits volumes</span> à Paris.
                </p>
                <p>
                  Nous intervenons pour les studios, chambres de bonne, colocations ou simplement pour le transfert de quelques meubles de valeur (canapé, piano, buffet) d'un point A à un point B. Notre logistique adaptée nous permet d'être réactifs et de vous proposer un tarif ultra-compétitif.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 italic">
              {[
                { icon: <Wallet size={24} />, t: "Prix réduits", d: "Tarifs calculés au plus juste." },
                { icon: <Clock size={24} />, t: "Rapidité", d: "Intervention fluide et efficace." },
                { icon: <Truck size={24} />, t: "Véhicules légers", d: "Idéal pour les rues étroites." },
                { icon: <Zap size={24} />, t: "Flexibilité", d: "Rendez-vous selon vos besoins." }
              ].map((box, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 italic transition-all hover:border-accent">
                   <div className="text-accent mb-4 italic">{box.icon}</div>
                   <div className="font-bold text-brand-900 text-sm uppercase italic mb-2">{box.t}</div>
                   <div className="text-[10px] text-slate-500 font-light italic">{box.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typical cases */}
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 italic">
          <div className="max-w-4xl mx-auto italic text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Quand utiliser le <span className="text-accent italic">Petit Volume</span> ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 italic transition-all italic underline-none italic">
            {[
              { t: "Déménagement Étudiant", d: "Idéal pour une chambre ou un studio universitaire.", l: "/demenagement-etudiant" },
              { t: "Meuble Isolé", d: "Transport d'une pièce massive : piano, buffet, canapé d'angle.", l: "/demenagement-piano-objets-lourds" },
              { t: "Succession / Tri", d: "Transfert partiel de mobilier suite à un héritage ou un tri.", l: "/garde-meuble-paris" }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-accent transition-all group italic">
                <h3 className="text-lg font-bold text-white mb-4 uppercase italic tracking-tight group-hover:text-accent transition-colors italic">{item.t}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-8 italic">{item.d}</p>
                <Link to={item.l} className="text-accent text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">Voir le service <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* Steps guiding the client to book a small move */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-5xl mx-auto bg-slate-50 p-12 lg:p-20 rounded-[4rem] border border-slate-100 flex flex-col lg:flex-row items-center gap-20 italic shadow-sm">
             <div className="lg:w-1/2 space-y-8 italic">
                <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Réservez en <span className="text-accent italic">un clic</span></h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                  Pour un petit volume, nul besoin d'une logistique lourde. Nous adaptons la taille du camion (souvent un 12m³ ou 20m³) et le nombre de déménageurs pour vous garantir le meilleur rapport qualité/prix. Utilisez notre calculateur pour vérifier si votre projet entre dans cette catégorie.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 italic">
                  <Link to="/demande-de-devis" className="bg-brand-900 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all italic">Devis immédiat</Link>
                  <Link to="/calculateur-volume" className="bg-white text-brand-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic">Calculer mon volume</Link>
                </div>
             </div>
             <div className="lg:w-1/2 grid grid-cols-1 gap-4 italic font-sans italic underline-none italic transition-all italic underline-none italic">
                {[
                  "Protection sous couvertures incluse",
                  "Transport sécurisé et sanglé",
                  "Manutention par 1 ou 2 professionnels",
                  "Tarif dégressif selon flexibilité"
                ].map((check, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl flex items-center gap-4 italic shadow-sm border border-slate-100 font-sans italic transition-all italic underline-none italic">
                    <CheckCircle2 size={24} className="text-accent italic grayscale-0 italic" />
                    <span className="text-xs font-bold text-brand-900 uppercase tracking-widest italic">{check}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Petit Volume */}
      <section className="py-24 font-sans italic underline-none italic shadow-none italic translate-y-0 italic transition-opacity italic grayscale-0 italic shadow-none italic transition-all">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8 italic transition-all grayscale-0 italic shadow-none italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 font-display uppercase italic tracking-tight italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic underline-none">Petit Volume</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic underline-none">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic underline-none">
                 <h4 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h4>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic underline-none transition-all">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 bg-white border-t border-slate-100 font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic underline-none transition-all">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic underline-none transition-all">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all italic underline-none italic grayscale-0 italic shadow-none italic translate-y-0 italic opacity-100 italic transition-opacity italic grayscale-0 italic shadow-none italic font-sans italic underline-none transition-all">
            <Link to="/demenagement-etudiant" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Étudiants</Link>
            <Link to="/demenagement-piano-objets-lourds" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Objets Lourds</Link>
            <Link to="/formules-demenagement" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100 underline underline-offset-4 font-bold text-slate-900 italic">Nos Formules</Link>
            <Link to="/demenagement-longue-distance" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Longue Distance</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic font-sans italic transition-all italic grayscale-0 italic opacity-100">Contact Devis</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementPetitVolume;
