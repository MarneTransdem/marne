import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MapPin, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const LocalFranconville: React.FC = () => {
  const path = "/demenagement-franconville";
  
  const faqs = [
    { 
      q: "Quelles sont les spécificités d'un déménagement à Franconville ?", 
      a: "Franconville se caractérise par des quartiers résidentiels calmes, de nombreux pavillons avec jardins et des résidences récentes de taille moyenne. La gestion des accès pavillonnaires étroits et des appartements en copropriété avec ascenseurs limités ou escaliers complexes exige une logistique rodée, ainsi que l'utilisation si nécessaire de véhicules légers et de monte-meubles adaptés." 
    },
    { 
      q: "Comment réserver un emplacement de stationnement à Franconville (95130) ?", 
      a: "Toute occupation temporaire du domaine public à Franconville nécessite une autorisation préalable délivrée par les services de la Mairie. Marne Transdem prend en charge toutes ces démarches administratives indispensables et pose des panneaux de réservation de stationnement réglementaires 48 heures à l'avance pour sanctuariser l'emplacement de nos camions." 
    },
    { 
      q: "Proposez-vous des formules pour les déménagements familiaux à Franconville ?", 
      a: "Absolument. Nous sommes experts dans l'accompagnement des familles. Nos différentes formules (Économique, Standard, Luxe) s'adaptent à vos besoins précis. De la simple logistique de transport au clés-en-main comprenant l'emballage de tous vos cartons et le démontage/remontage complet de vos mobiliers, nous vous garantissons une transition tout en douceur." 
    },
    { 
      q: "Comment obtenir un devis gratuit et personnalisé pour Franconville ?", 
      a: "Vous pouvez nous contacter directement par téléphone ou faire une demande sur notre formulaire en ligne. Nous fixons ensuite rendez-vous pour une visite technique (physique ou à distance via visioconférence) pour évaluer fidèlement votre cubage, planifier les accès logistiques et vous adresser un devis gratuit sous 24 heures." 
    }
  ];

  const nearbySectors = [
    { n: "Montmorency", l: "/demenagement-montmorency" },
    { n: "Saint-Gratien", l: "/demenagement-saint-gratien" },
    { n: "Argenteuil", l: "/demenagement-argenteuil" },
    { n: "Val-d'Oise (95)", l: "/demenagement-val-d-oise" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Déménagement Franconville | Maisons & Appartements | Marne Transdem"
        description="Besoin d'un déménageur de confiance à Franconville (95130) ? Marne Transdem propose des prestations de déménagement sur-mesure pour familles, particuliers et bureaux."
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Secteurs", item: "/secteurs-desservis" },
            { name: "Franconville", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 bg-brand-900 overflow-hidden text-white font-sans">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <MapPin size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Service de standing - Franconville (95)</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic uppercase text-white">Franconville</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Accompagnement de qualité pour les projets familiaux, déménagements de maisons et d'appartements dans le nord-ouest francilien.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic">
                Demander mon chiffrage gratuit
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

      {/* Content Section */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">
                Votre partenaire de confiance <span className="text-accent italic">à Franconville</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-[16px] font-light leading-relaxed text-justify">
                <p>
                  Bien intégrée au cœur du Parisis et desservie par d'importants axes de communication, la commune de **Franconville** attire de nombreuses familles et professionnels grâce à son cadre de vie exceptionnel, ses parcs et ses infrastructures scolaires de premier plan.
                </p>
                <p>
                  Afin de concrétiser votre déménagement en toute sérénité, **Marne Transdem** met à votre disposition l'excellence et la rigueur de ses compagnons déménageurs d'Île-de-France. Nous maîtrisons les règlements urbains locaux et les contraintes logistiques inhérentes aux résidences et pavillons de Franconville.
                </p>
                <p>
                  Que vous prépariez une transition vers une belle maison familiale, un appartement moderne de centre-ville, ou un déménagement d'activités tertiaires, bénéficiez de matériel de pointe : camions capitonnés sécurisés, caisses spéciales pour objets fragiles, et notre flotte de monte-meubles performants.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/images/demenagement-franconville.jpg" 
                  alt="Déménagement à Franconville" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobilité Connexe / Maillage */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 font-sans">
        <div className="container mx-auto px-4 md:px-6">       
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Secteurs desservis à proximité <span className="text-accent italic font-sans italic">de Franconville</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {nearbySectors.map((s, i) => (
              s.l ? (
                <Link key={i} to={s.l} className="bg-white p-6 rounded-2xl border border-slate-100 group hover:border-accent hover:shadow-lg transition-all text-center shadow-sm">
                  <span className="font-bold text-brand-900 group-hover:text-accent transition-colors text-xs uppercase tracking-wider">{s.n}</span>
                </Link>
              ) : (
                <div key={i} className="bg-white/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center opacity-60">
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">{s.n}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 font-sans">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 mt-2 mb-4 uppercase tracking-tight">Questions Fréquentes <span className="text-accent italic font-sans">Franconville</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100">
                <h4 className="text-lg font-bold text-brand-900 mb-4 flex items-start gap-4 tracking-tight uppercase">
                  <HelpCircle className="text-accent shrink-0 mt-1" size={24} />
                  {faq.q}
                </h4>
                <p className="text-slate-500 font-light leading-relaxed pl-10 border-l-4 border-accent/20 text-justify">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalFranconville;
