import React from 'react';
import { motion } from 'motion/react';
import { Check, Info, ArrowRight, Phone, CheckCircle2, Zap, MapPin, Mail, XCircle } from 'lucide-react';
import { FORMULAS, CONTACT, SERVICES } from '../constants';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

import { getBreadcrumbSchema, getFAQSchema, getServiceSchema } from '../lib/schema';

const FormulasPage: React.FC = () => {
  const path = "/formules-demenagement";
  const faqs = [
    { 
      q: "Quelle formule choisir pour un déménagement à Paris ?", 
      a: "Le choix dépend principalement de votre budget et du temps que vous pouvez consacrer à la préparation. Pour un budget maîtrisé, la formule Économique est idéale. Si vous manquez de temps ou possédez beaucoup d'objets fragiles, les formules Standard ou Luxe offrent un accompagnement plus complet." 
    },
    { 
      q: "Quelle est la différence entre la formule Économique et la formule Standard ?", 
      a: "La principale différence réside dans l'emballage du fragile (vaisselle, verrerie, bibelots). Dans la formule Économique, vous emballez tout vous-même. Dans la formule Standard, nos équipes prennent en charge la protection et l'emballage de vos objets délicats." 
    },
    { 
      q: "La formule Luxe comprend-elle l'emballage ?", 
      a: "Oui, la formule Luxe (clé en main) inclut un accompagnement renforcé pour l'emballage de vos biens (fragiles et non fragiles) selon la prestation choisie et les besoins définis lors de l'étude de votre projet." 
    },
    { 
      q: "Peut-on personnaliser une formule de déménagement ?", 
      a: "Oui, selon le projet. Nos formules sont des bases de travail flexibles. Selon le projet et l'étude du volume, nous pouvons ajouter des options comme le démontage spécifique de certains meubles ou la mise en place renforcée." 
    },
    { 
      q: "Comment obtenir un devis selon la formule choisie ?", 
      a: "Il vous suffit de nous contacter ou de remplir notre formulaire en ligne. Nous évaluerons votre volume et les accès pour vous proposer une estimation adaptée à la formule qui vous intéresse." 
    }
  ];

  const comparisonData = [
    { label: "Livraison de fournitures d’emballage : cartons standards, cartons livres, adhésifs, bulles", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Mise en penderie des effets sur cintre", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Mise en housse de la literie", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Protection du mobilier sous couvertures et emballages spécifiques", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Emballage et déballage du fragile", eco: "À votre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Emballage du non fragile", eco: "À votre charge", std: "À votre charge", lux: "À notre charge" },
    { label: "Déballage du non fragile", eco: "À votre charge", std: "À votre charge", lux: "À la demande / selon projet" },
    { label: "Démontage et remontage du mobilier", eco: "À votre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Aide à la déconnexion et reconnexion des appareils", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Aide à la dépose des éléments fixés", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Remise en place des effets selon instructions", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Demande administrative pour autorisation de stationnement", eco: "À notre charge", std: "À notre charge", lux: "À notre charge" },
    { label: "Mise à disposition du monte-meuble si possibilité de mise en place", eco: "Offert", std: "Offert", lux: "Offert" }
  ];

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    let styles = "";
    const lowerStatus = status.toLowerCase();

    if (lowerStatus.includes("à notre charge")) {
      styles = "bg-slate-50 text-brand-900 border-slate-200";
    } else if (lowerStatus.includes("à votre charge")) {
      styles = "bg-white text-slate-400 border-slate-100 italic";
    } else if (lowerStatus.includes("offert")) {
      styles = "bg-accent/10 text-accent border-accent/20 font-black";
    } else if (lowerStatus.includes("selon projet") || lowerStatus.includes("à la demande")) {
      styles = "bg-brand-900/5 text-brand-900 border-brand-900/10";
    } else {
      styles = "bg-slate-50 text-slate-400 border-slate-200";
    }

    return (
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 inline-block ${styles}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Formules de déménagement Paris | Marne Transdem" 
        description="Découvrez les formules Économique, Standard et Luxe de Marne Transdem pour organiser votre déménagement à Paris selon votre budget et vos besoins." 
        canonical={path}
        schema={[
          getFAQSchema(faqs),
          getServiceSchema("Formules de déménagement", "Découvrez les formules Économique, Standard et Luxe de Marne Transdem pour organiser votre déménagement à Paris."),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Nos formules", item: path }
          ])
        ]}
      />
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb links for UI */}
            <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
              <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
              <ArrowRight size={10} />
              <span className="text-white">Nos formules</span>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <Zap size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Nos formules</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-white">
              Formules de <br/>
              <span className="text-accent underline decoration-white/10 underline-offset-8">déménagement</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Découvrez les détails de nos formules pour choisir le niveau d’accompagnement le plus adapté à votre projet, votre budget et votre disponibilité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/demande-de-devis" className="bg-accent text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20">
                Demander un devis gratuit
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

      {/* 2. Introduction */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-900 mb-8">Découvrez les détails de nos formules</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-light">
              <p>
                Nous proposons des formules soigneusement conçues pour répondre à différents besoins en matière de temps, de budget et de niveau d’accompagnement. Que vous souhaitiez participer activement à la préparation de votre déménagement ou déléguer une grande partie de l’organisation, nos formules vous permettent de choisir la solution la plus adaptée à votre situation.
              </p>
              <p>
                Avant de choisir votre formule, prenez le temps de comparer les prestations incluses afin de mieux comprendre les avantages de chaque niveau d’accompagnement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3 formules flexibles et personnalisables */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-6">3 formules flexibles et personnalisables</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              Nous avons conçu ces trois formules pour répondre aux besoins des particuliers et des entreprises, selon leur budget, leur disponibilité et le niveau de prise en charge souhaité.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formule Économique */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase tracking-tight">Formule économique</h3>
              <p className="text-slate-500 mb-8 leading-relaxed font-light text-sm">
                Pour un déménagement maîtrisé, la formule Économique est idéale si vous souhaitez préparer vous-même vos cartons et organiser une partie de votre déménagement. Vous vous occupez de l’emballage et de la mise en cartons de vos affaires. L’équipe Marne Transdem prend ensuite en charge le chargement, le transport et le déchargement dans votre nouveau logement ou local.
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Préparation des cartons par le client",
                  "Chargement et déchargement",
                  "Transport des biens",
                  "Solution adaptée aux budgets maîtrisés",
                  "Idéale si vous souhaitez participer"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-900 font-medium">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/demande-de-devis" className="w-full py-4 bg-slate-100 text-brand-900 rounded-2xl font-bold text-center hover:bg-slate-200 transition-colors">
                Choisir la formule économique
              </Link>
            </motion.div>

            {/* Formule Standard */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-900 rounded-[2.5rem] p-10 border border-brand-800 shadow-2xl flex flex-col h-full lg:scale-110 z-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-3xl"></div>
              <div className="bg-accent text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest self-start mb-6">
                Le plus équilibré
              </div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Formule standard</h3>
              <p className="text-slate-300 mb-8 leading-relaxed font-light text-sm">
                La formule Standard est un bon équilibre entre confort, accompagnement et budget. Vous préparez une partie de vos affaires, notamment les éléments non fragiles. L’équipe Marne Transdem peut prendre en charge l’emballage des objets fragiles, la protection des meubles, ainsi que le démontage et le remontage du mobilier selon les besoins du projet.
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Emballage des objets fragiles selon le projet",
                  "Protection des meubles",
                  "Démontage et remontage si nécessaire",
                  "Chargement, transport et déchargement",
                  "Bon équilibre autonomie/accompagnement"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/demande-de-devis" className="w-full py-4 bg-accent text-white rounded-2xl font-bold text-center hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20">
                Choisir la formule standard
              </Link>
            </motion.div>

            {/* Formule Luxe */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase tracking-tight">Formule luxe</h3>
              <p className="text-slate-500 mb-8 leading-relaxed font-light text-sm">
                La formule Luxe, aussi appelée formule clé en main, s’adresse aux clients qui souhaitent déléguer une grande partie de leur déménagement. L’équipe Marne Transdem accompagne la préparation, l’emballage, la protection, la manutention, le transport et l’installation selon les besoins définis lors de l’étude du projet.
              </p>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Prise en charge renforcée de la préparation",
                  "Emballage des biens selon la prestation",
                  "Protection mobilier et objets fragiles",
                  "Transport et installation",
                  "Solution confortable pour déléguer"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-900 font-medium">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/demande-de-devis" className="w-full py-4 bg-slate-100 text-brand-900 rounded-2xl font-bold text-center hover:bg-slate-200 transition-colors">
                Choisir la formule luxe
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Tableau comparatif */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-brand-900 mb-6 tracking-tight">Tableau comparatif des formules</h2>
            <p className="text-slate-500 font-light text-lg">Comparez les prestations pour choisir le niveau d’accompagnement idéal.</p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block relative">
            <div className="overflow-hidden rounded-[3rem] border border-slate-200 shadow-premium bg-white">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-brand-900">
                    <th className="p-10 text-xs font-black uppercase tracking-[0.2em] text-white/40 border-b border-white/5 w-[35%]">Prestations</th>
                    <th className="p-10 text-sm font-black uppercase tracking-widest text-white border-b border-white/5 text-center">Économique</th>
                    <th className="p-10 text-sm font-black uppercase tracking-widest text-white border-b border-accent/20 text-center bg-white/5 relative border-x border-white/5">
                      <div className="flex flex-col items-center gap-3">
                        <span className="bg-accent text-brand-900 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-accent/20">
                          Recommandée
                        </span>
                        <span>Standard</span>
                      </div>
                    </th>
                    <th className="p-10 text-sm font-black uppercase tracking-widest text-white border-b border-white/5 text-center">Luxe</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="p-6 font-bold text-brand-900 border-b border-slate-50 leading-tight text-sm">{row.label}</td>
                      <td className="p-6 text-center border-b border-slate-50 bg-white">
                        <StatusBadge status={row.eco} />
                      </td>
                      <td className="p-6 text-center border-b border-accent/5 bg-accent/[0.03] border-x border-accent/5">
                         <StatusBadge status={row.std} />
                      </td>
                      <td className="p-6 text-center border-b border-slate-50">
                        <StatusBadge status={row.lux} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison (Modern Cards) */}
          <div className="lg:hidden space-y-8">
            <div className="space-y-6">
              {['Économique', 'Standard', 'Luxe'].map((formula) => (
                <div key={formula} className={`p-8 rounded-3xl border ${formula === 'Standard' ? 'border-accent bg-accent/[0.02] ring-4 ring-accent/5' : 'border-slate-100 bg-white'}`}>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className={`text-2xl font-black uppercase tracking-tight ${formula === 'Standard' ? 'text-accent' : 'text-brand-900'}`}>{formula}</h3>
                    {formula === 'Standard' && (
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Populaire</span>
                    )}
                  </div>
                  <div className="space-y-4">
                    {comparisonData.map((row, i) => (
                      <div key={i} className="flex flex-col gap-2 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="text-xs font-bold text-brand-900 leading-tight">{row.label}</div>
                        <div>
                          <StatusBadge status={formula === 'Économique' ? row.eco : formula === 'Standard' ? row.std : row.lux} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="mt-12 text-sm text-slate-500 font-bold text-center italic flex items-center justify-center gap-2">
            <Info size={16} className="text-accent" />
            Toutes nos formules sont flexibles et adaptables selon les besoins du projet.
          </p>

          {/* Decision Support Block */}
          <div className="mt-24 max-w-4xl mx-auto bg-brand-900 rounded-[3rem] p-10 lg:p-20 border border-white/5 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Besoin d’aide pour choisir votre formule ?</h3>
              <p className="text-slate-300 leading-relaxed font-light text-lg mb-12 max-w-2xl mx-auto">
                Nous vous accompagnons pour identifier la prestation la plus adaptée à votre volume, vos accès, votre budget et votre disponibilité.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/demande-de-devis" className="bg-accent text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/30">
                  Demander mon devis gratuit
                  <ArrowRight size={20} />
                </Link>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                  <Phone size={20} className="text-accent" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quelle formule choisir ? */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-[120px]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Quelle formule choisir pour votre déménagement ?</h2>
            <p className="text-slate-300 font-light">Identifiez la solution la plus adaptée à votre profil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Choisissez l'Économique si :</h4>
              <ul className="space-y-4 text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous souhaitez maîtriser votre budget.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous pouvez préparer vos cartons.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous voulez confier surtout le transport.
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Choisissez la Standard si :</h4>
              <ul className="space-y-4 text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous souhaitez un équilibre budget/confort.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous voulez déléguer les objets fragiles.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous avez besoin d'aide pour certains meubles.
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Choisissez la Luxe si :</h4>
              <ul className="space-y-4 text-slate-300 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous souhaitez déléguer plus de préparation.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous manquez de temps.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  Vous recherchez un accompagnement complet.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section CTA intermédiaire */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-8">Vous déménagez bientôt ? Laissez-nous vous accompagner.</h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez votre projet et recevez une estimation adaptée à votre volume, vos accès, votre budget et le niveau d’accompagnement souhaité.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/demande-de-devis" className="bg-accent text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all shadow-xl shadow-accent/20">
              Demander mon devis gratuit
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 border border-slate-200 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 7. Nos services complémentaires */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Nos services de déménagement</h2>
            <p className="text-slate-500 font-light">Nous fournissons des services de déménagement adaptés aux particuliers et aux entreprises.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.id} to={service.path} className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-accent transition-all hover:shadow-xl shadow-premium/5 flex flex-col h-full">
                <div className="w-14 h-14 bg-slate-50 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 flex-grow">{service.description}</p>
                <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Découvrir
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Questions fréquentes sur nos formules</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex gap-6 items-start">
                <div className="bg-slate-50 w-10 h-10 rounded-lg flex items-center justify-center text-accent shrink-0">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 text-lg mb-3">{faq.q}</h4>
                  <p className="text-slate-500 font-light leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Bloc contact final */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 blur-[100px]"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-8">Devis déménagement Paris</h2>
                <p className="text-xl text-slate-300 font-light mb-12 leading-relaxed">
                  Vous déménagez bientôt ? Contactez Marne Transdem pour choisir la formule adaptée à votre projet.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Notre bureau</div>
                    <div className="font-bold flex items-center gap-2">
                      <MapPin size={16} className="text-accent" />
                      {CONTACT.fullAddress}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Email</div>
                    <div className="font-bold flex items-center gap-2">
                      <Mail size={16} className="text-accent" />
                      {CONTACT.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to="/demande-de-devis" className="bg-accent text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent/90 transition-all text-center">
                    Demander mon devis gratuit
                  </Link>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                    <Phone size={20} className="text-accent" />
                    Nous appeler
                  </a>
                </div>
              </div>
              <div className="hidden lg:block relative">
                 <div className="aspect-square bg-white/5 rounded-[3rem] border border-white/10 p-8">
                    <div className="w-full h-full rounded-[2rem] bg-brand-800 flex items-center justify-center overflow-hidden">
                       <img 
                        src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80" 
                        alt="Devis Déménagement Paris" 
                        className="w-full h-full object-cover opacity-60"
                       />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormulasPage;
