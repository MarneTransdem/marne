import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Building2, Briefcase, Zap, ShieldCheck, Clock, MapPin, Search, ClipboardCheck, Truck, Settings, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementEntreprises: React.FC = () => {
  const path = "/demenagement-entreprises-paris";

  const faqs = [
    { 
      q: "Comment organiser un déménagement d’entreprise à Paris ?", 
      a: "L'organisation d'un transfert de bureaux à Paris repose sur une planification minutieuse. Il est essentiel d'anticiper les aspects logistiques (accès, parkings), de coordonner les services internes et de faire appel à un prestataire spécialisé capable de gérer le mobilier lourd et le matériel informatique avec soin." 
    },
    { 
      q: "Comment limiter l’interruption d’activité pendant un transfert de bureaux ?", 
      a: "Pour minimiser l'impact sur votre production, des interventions par phases ou en horaires adaptés peuvent être envisagées selon les contraintes du projet. Notre organisation structurée du transfert et l'étiquetage précis permettent de faciliter la reprise d’activité dans les meilleures conditions dans vos nouveaux locaux." 
    },
    { 
      q: "Pouvez-vous transporter du mobilier de bureau ?", 
      a: "Oui, nous sommes équipés pour le transfert de tout type de mobilier professionnel : bureaux bench, sièges ergonomiques, armoires de rangement, tables de réunion et mobilier de réception. Nous assurons également le démontage et le remontage si nécessaire." 
    },
    { 
      q: "Prenez-vous en charge le matériel informatique ?", 
      a: "Oui, selon les besoins du projet. Le transfert informatique est une composante critique de nos prestations. Nous utilisons des protections spécifiques pour les écrans, unités centrales et périphériques, assurant un transport sécurisé de vos outils de travail numériques." 
    },
    { 
      q: "Comment obtenir un devis pour un déménagement d’entreprise ?", 
      a: "Vous pouvez effectuer une demande en ligne via notre formulaire ou nous contacter par téléphone. Une visite technique (physique ou à distance) peut être proposée pour évaluer précisément le volume, les accès et les contraintes techniques afin de vous remettre un devis détaillé." 
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement entreprises Paris | Marne Transdem"
        description="Organisez le déménagement de vos bureaux ou locaux professionnels à Paris avec Marne Transdem. Accompagnement, organisation et devis personnalisé."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement entreprises à Paris", "Marne Transdem accompagne les entreprises dans l’organisation de leurs transferts de bureaux, locaux professionnels et espaces de travail à Paris, en Île-de-France ou longue distance."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Déménagement Entreprises", item: path }
          ])
        ]}
      />

      {/* 1. Hero de page */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10"
            >
              <Briefcase size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest">Expertise B2B</span>
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Déménagement <br/>
              <span className="text-accent">entreprises</span> à Paris
            </h1>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              Marne Transdem accompagne les entreprises dans l’organisation de leurs transferts de bureaux, locaux professionnels et espaces de travail à Paris, en Île-de-France ou longue distance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20">
                Demander mon devis
                <ArrowRight size={20} />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                <Phone size={20} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bloc de réassurance */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <ClipboardCheck size={24} />, title: "Devis personnalisé" },
              { icon: <Clock size={24} />, title: "Organisation claire" },
              { icon: <Star size={24} />, title: "Accompagnement professionnel" },
              { icon: <Building2 size={24} />, title: "Intervention Entreprises" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="text-accent">{item.icon}</div>
                <span className="font-bold text-brand-900 text-sm uppercase tracking-wider">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Introduction SEO naturelle */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-900 mb-8">Le partenaire de votre transfert professionnel</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light mb-6">
              Organiser un transfert de bureaux à Paris exige une organisation rigoureuse. Qu'il s'agisse de déplacer du mobilier de bureau, du matériel informatique sensible ou des archives volumineuses, la continuité de votre activité est notre priorité. Notre équipe vous accompagne dans l’organisation de chaque étape de votre déménagement professionnel, des accès complexes de la capitale au planning de reprise d'activité.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              Nous mettons en œuvre une protection des équipements sur mesure et une organisation structurée pour minimiser les interruptions. Basés au cœur de Paris, nous maîtrisons les contraintes de stationnement et les exigences logistiques des immeubles de bureaux parisiens et franciliens.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Section “Un transfert d’entreprise bien organisé” */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 leading-tight">Un transfert d’entreprise bien organisé</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { t: "Continuité d’activité", d: "Limiter l’interruption pour maintenir votre productivité." },
                  { t: "Mobilier et équipements", d: "Protection adaptée des postes de travail et équipements informatiques." },
                  { t: "Archives et documents", d: "Organisation et conditionnement des fonds documentaires." },
                  { t: "Coordination du transfert", d: "Interlocuteur unique pour piloter vos équipes le jour J." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                      <CheckCircle2 size={20} />
                    </div>
                    <h4 className="font-bold text-brand-900">{item.t}</h4>
                    <p className="text-sm text-slate-500 font-light">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-[3rem] bg-slate-200 overflow-hidden shadow-2xl">
                <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Bureaux professionnels" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-900 text-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block border border-white/10">
                <p className="text-lg font-bold italic mb-2">"Maîtrise & Sérénité"</p>
                <p className="text-accent text-sm font-black uppercase tracking-widest">Transfert B2B</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section “Nos prestations pour les entreprises” */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Nos prestations pour les entreprises</h2>
            <p className="text-slate-500">Des services professionnels pour accompagner votre transfert d’entreprise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Building2 />, title: "Déménagement de bureaux", desc: "Transfert complet de vos espaces de travail." },
              { icon: <Truck />, title: "Mobilier professionnel", desc: "Transport de mobilier lourd et encombrant." },
              { icon: <Settings />, title: "Matériel informatique", desc: "Protection adaptée du matériel informatique" },
              { icon: <ClipboardCheck />, title: "Archives & Documents", desc: "Gestion rigoureuse de vos archives papier." },
              { icon: <ArrowRight />, title: "Démontage/Remontage", desc: "Installation de votre mobilier complexe." },
              { icon: <MapPin />, title: "Accès & Manutention", desc: "Gestion logistique des accès parisiens." },
              { icon: <Zap />, title: "Monte-meuble", desc: "Solution pour les accès difficiles par fenêtre." },
              { icon: <Clock />, title: "Stockage & Garde-meuble", desc: "Solutions de stockage modulables." }
            ].map((p, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-xs">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Section “Pour quels types d’entreprises ?” */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-900/50 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pour quels types d’entreprises ?</h2>
            <p className="text-slate-400">Une expertise qui s'adapte à chaque structure et chaque métier.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Bureaux administratifs & Tertiaires",
              "Cabinets de conseils & Professions libérales",
              "Agences de communication & Design",
              "Locaux commerciaux & Boutiques",
              "Startups & Espaces de co-working",
              "Petites et Moyennes Entreprises (PME)"
            ].map((profile, i) => (
              <div key={i} className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-bold text-slate-200">{profile}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section “Notre méthode en 4 étapes” */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-16">Notre méthode en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { t: "Analyse de vos besoins professionnels", d: "Étude personnalisée de votre projet professionnel." },
              { t: "Évaluation du volume, des accès et des contraintes", d: "Étude du volume, des accès et des contraintes." },
              { t: "Préparation du transfert", d: "Organisation logistique et protection des biens." },
              { t: "Transport, installation et accompagnement à la reprise", d: "Mise en place et accompagnement à la reprise d'activité." }
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-brand-900 text-accent rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  0{i + 1}
                </div>
                <h4 className="font-bold text-brand-900 mb-2">{step.t}</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed px-4">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section “Déménager des bureaux à Paris : accès, planning et organisation” */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-brand-900">Déménager des bureaux à Paris : accès, planning et organisation</h2>
              <p className="text-slate-600 leading-relaxed font-light">
                Le transfert de bureaux en milieu urbain dense comme Paris ne laisse aucune place à l'improvisation. Nous gérons pour vous les contraintes d'accès propres aux immeubles parisiens : ascenseurs parfois limités, escaliers étroits et stationnement restreint.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Un planning rigoureux est établi en amont pour assurer la coordination parfaite du déménagement. Que ce soit pour les étages élevés ou les accès en rez-de-chaussée, nous adaptons les horaires d'intervention et les moyens techniques pour faciliter une transition dans les meilleures conditions.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                 <div className="flex items-center gap-3 text-accent font-bold mb-2">
                    <Info size={18} />
                    Conseil Professionnel
                 </div>
                 <p className="text-sm text-slate-500 italic font-light">"Anticipez votre transfert le plus tôt possible afin de préparer les accès, le planning et l’organisation interne."</p>
              </div>
            </div>
            <div className="aspect-video bg-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl">
               <img src="/images/transfert-bureau-hauts-de-seine.jpg" alt="Bureau Parisien" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Section CTA intermédiaire */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Vous préparez un déménagement d’entreprise à Paris ?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez votre projet professionnel et recevez une estimation adaptée à vos contraintes, vos délais et votre organisation.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20">
              Demander mon devis
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 10. Pourquoi choisir Marne Transdem pour votre entreprise ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Pourquoi choisir Marne Transdem pour votre entreprise ?</h2>
            <p className="text-slate-500">Une expertise dédiée à la réussite de votre transfert professionnel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Entreprise basée à Paris 20e", d: "Une bonne connaissance des contraintes logistiques à Paris et en Île-de-France." },
              { t: "Accompagnement professionnel", d: "Un suivi de proximité et une expertise dédiée à votre projet." },
              { t: "Organisation claire", d: "Une planification étape par étape sans mauvaise surprise." },
              { t: "Protection soignée du mobilier et du matériel", d: "Protection soignée de vos outils de travail et de votre mobilier." },
              { t: "Adaptation aux contraintes des entreprises", d: "Des solutions pensées pour maintenir votre productivité." },
              { t: "Intervention IDF & Longue Distance", d: "Équipes disponibles à Paris, en Île-de-France et longue distance selon votre projet." }
            ].map((reason, i) => (
              <div key={i} className="flex gap-4 items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="text-accent shrink-0 mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-2">{reason.t}</h4>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{reason.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ spécifique entreprises */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Questions fréquentes entreprises</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6 items-start group hover:border-accent transition-all">
                <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                   <Search size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 text-lg mb-2">{faq.q}</h4>
                  <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Maillage interne */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
           <h3 className="text-xs font-black text-brand-900 uppercase tracking-[0.4em] mb-12 text-center opacity-40">Explorer nos solutions professionnelles</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/formules-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Formules</h4>
                <p className="text-xs text-slate-500 font-light">Options de service modulables.</p>
              </Link>
              <Link to="/location-monte-meuble-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Monte-meuble</h4>
                <p className="text-xs text-slate-500 font-light">Levage grandes hauteurs.</p>
              </Link>
              <Link to="/emballage-protection-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Emballage & Protection</h4>
                <p className="text-xs text-slate-500 font-light">Protection du matériel et du mobilier</p>
              </Link>
              <Link to="/garde-meuble-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h4 className="font-bold text-brand-900 mb-2">Garde-meuble</h4>
                <p className="text-xs text-slate-500 font-light">Stockage & Archives.</p>
              </Link>
           </div>
           <div className="mt-12 flex justify-center gap-8 text-sm font-bold text-slate-400">
              <Link to="/demande-de-devis" className="hover:text-accent">Demande de devis</Link>
              <Link to="/contact" className="hover:text-accent">Contact</Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementEntreprises;

