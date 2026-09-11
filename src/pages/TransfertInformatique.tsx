import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Zap, Monitor, Cpu, Server, ShieldCheck, Truck, ClipboardCheck, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const TransfertInformatique: React.FC = () => {
  const path = "/transfert-informatique-paris";

  const faqs = [
    { 
      q: "Gérez-vous le transfert de serveurs et baies de stockage ?", 
      a: "Le transfert de serveurs ou de baies nécessite une étude préalable : dimensions, poids, accès et consignes du fabricant. Décrivez les équipements à notre équipe pour faire confirmer la faisabilité et les moyens nécessaires. L’arrêt, la sauvegarde et la remise en service sont à coordonner avec votre responsable informatique."
    },
    { 
      q: "Qui prépare les sauvegardes et la déconnexion des postes ?",
      a: "Désignez votre responsable informatique ou votre prestataire pour organiser les sauvegardes, vérifier leur restauration et planifier l’arrêt des équipements. Le devis de déménagement doit préciser les opérations de manutention retenues et la répartition des tâches avant l’enlèvement."
    },
    { 
      q: "Comment protégez-vous les écrans lors du transport ?", 
      a: "Indiquez le nombre d’écrans, leurs dimensions et les emballages disponibles. Les protections adaptées aux équipements, les consignes de manipulation et les fournitures nécessaires sont à définir lors de la préparation du devis. Signalez les matériels fragiles ou présentant des exigences particulières."
    },
    { 
      q: "Réalisez-vous le brassage et le câblage sur le nouveau site ?", 
      a: "Prévoyez le brassage, le câblage, la reconnexion et les tests avec votre responsable informatique ou votre prestataire. Ces opérations ne doivent pas être considérées comme incluses dans le transport : faites préciser les responsabilités et les prestations retenues avant de confirmer le calendrier."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Transfert informatique Paris | Marne Transdem"
        description="Transfert informatique à Paris : inventaire des équipements, accès, protections et coordination avec votre prestataire informatique. Préparez un devis personnalisé."
        canonical={path}
        schema={[
          getServiceSchema("Transfert informatique", "Préparation du transport des équipements informatiques à Paris : inventaire, accès et protections à définir au devis, en coordination avec le responsable informatique du client."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Transfert Informatique", item: path }
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
              <Monitor size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Transport & coordination</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Transfert <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase font-sans">informatique</span> à Paris
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Préparez le transport de vos équipements informatiques à Paris avec un inventaire clair, des protections adaptées et un calendrier coordonné avec votre responsable informatique.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Demander un devis de transfert
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

      {/* Core Expertise in IT Transfer */}
      <section className="py-24 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center italic">
            <div className="space-y-8 italic">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8 transition-all">
                Organiser le transport de vos <span className="text-accent italic">équipements informatiques</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                <p>
                  Le <span className="font-bold text-brand-900 underline decoration-accent/10 italic">transfert informatique</span> demande de distinguer le déplacement du matériel de la gestion des données et du réseau. Identifiez les équipements à transporter, leurs dimensions, leur poids et les contraintes d’accès aux deux adresses.
                </p>
                <p>
                  Votre responsable informatique définit les sauvegardes, l’arrêt des équipements et les tests de reprise. Notre équipe prépare avec vous les prestations de transport et de manutention à inscrire au devis. Les moyens de protection et les éventuelles contraintes particulières doivent être confirmés pour chaque projet.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 italic transition-all underline-none italic font-sans italic grayscale-0">
               {[
                 { icon: <Server size={24} />, t: "Inventaire", d: "Équipements, dimensions et contraintes à communiquer." },
                 { icon: <Monitor size={24} />, t: "Postes de travail", d: "Identification de chaque poste et de sa destination." },
                 { icon: <ShieldCheck size={24} />, t: "Protections", d: "Emballages et consignes à préciser selon le matériel." },
                 { icon: <Zap size={24} />, t: "Reprise d’activité", d: "Reconnexion et tests à planifier avec votre prestataire informatique." }
               ].map((box, i) => (
                 <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-4 italic">
                    <div className="text-accent italic">{box.icon}</div>
                    <div className="font-bold text-brand-900 text-sm uppercase italic">{box.t}</div>
                    <div className="text-[10px] text-slate-500 font-light italic">{box.d}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Protection Section */}
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 italic grayscale-0 transition-all italic">
          <div className="max-w-4xl mx-auto italic text-center mb-20 italic">
            <h2 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tight underline decoration-accent/20 underline-offset-8">Préparer les <span className="text-accent italic">protections et les accès</span></h2>
            <p className="text-slate-300 text-xl font-light mt-8 italic">Les besoins particuliers doivent être identifiés avant de confirmer les moyens de transport.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 italic underline-none italic font-sans grayscale-0">
            {[
              { t: "Consignes du matériel", d: "Signalez les exigences du fabricant, les éléments fragiles et les emballages d’origine disponibles." },
              { t: "Repérage des postes", d: "Associez chaque équipement à une pièce ou un poste d’arrivée ; préparez le plan d’installation." },
              { t: "Accès aux locaux", d: "Précisez les étages, ascenseurs, zones de livraison, badges et horaires autorisés dans les deux bâtiments." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] italic text-center grayscale-0">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent italic">
                   <Monitor size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase italic tracking-tight italic transition-all italic">{item.t}</h3>
                <p className="text-slate-400 text-sm font-light italic leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Les informations pour votre devis de transfert informatique</h2>
          <p className="text-slate-600 leading-relaxed">Préparez le nombre de postes, écrans, imprimantes et autres équipements, les adresses de départ et d’arrivée, les accès et la date souhaitée. Indiquez les matériels nécessitant une étude particulière et le nom du référent qui coordonnera l’intervention. Il n’est pas nécessaire de transmettre des mots de passe ou des données de votre entreprise pour établir cet inventaire.</p>
          <p className="text-slate-600 leading-relaxed">Pour un déménagement complet, consultez notre prestation de <Link to="/transfert-bureaux-paris" className="underline text-brand-900">transfert de bureaux</Link> et la <Link to="/blog/demenagement-entreprise-paris-checklist" className="underline text-brand-900">checklist de préparation du déménagement d’entreprise</Link>. Décrivez ensuite le matériel et les contraintes dans votre <Link to="/demande-de-devis" className="underline text-brand-900">demande de devis de transfert informatique</Link>.</p>
        </div>
      </section>
      <section className="py-24 bg-slate-50 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl italic grayscale-0 transition-opacity italic">
           <div className="text-center mb-16 italic font-sans italic transition-all italic underline decoration-accent/10 underline-offset-8">
             <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-4 uppercase italic tracking-tight font-sans italic transition-all italic italic underline-none italic">FAQ <span className="text-accent italic tracking-tight font-sans italic transition-all italic grayscale-0 italic shadow-none italic">Informatique</span></h2>
           </div>
           <div className="grid grid-cols-1 gap-8 italic font-sans italic transition-all italic underline-none italic">
             {faqs.map((faq, i) => (
               <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 group hover:border-accent transition-all shadow-sm italic font-sans italic transition-all italic">
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h3>
                 <p className="text-slate-500 font-light leading-relaxed pl-9 border-l-4 border-accent/20 italic font-sans italic transition-all italic">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Internal Linking Maillage Final */}
      <section className="py-12 border-t border-slate-100 font-sans italic transition-all italic underline-none italic grayscale-0 italic">
        <div className="container mx-auto px-4 md:px-6 italic font-sans italic transition-all italic">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic font-sans italic transition-all italic">
            <Link to="/transfert-bureaux-paris" className="hover:text-accent transition-all italic">Transfert de Bureaux</Link>
            <Link to="/demenagement-entreprises-paris" className="hover:text-accent transition-all italic underline decoration-accent/30 decoration-2 italic font-sans italic transition-all italic">Solutions Globales Pro</Link>
            <Link to="/transfert-laboratoire-paris" className="hover:text-accent transition-all italic">Transfert Médical</Link>
            <Link to="/gestion-archives-paris" className="hover:text-accent transition-all italic">Archivage Sécurisé</Link>
            <Link to="/contact" className="hover:text-accent transition-all italic">Préparer votre projet</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransfertInformatique;
