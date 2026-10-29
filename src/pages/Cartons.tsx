import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Box, 
  Package, 
  ShieldCheck, 
  Zap, 
  Info, 
  LayoutGrid, 
  Truck, 
  ClipboardCheck, 
  Sparkles,
  Tally4,
  Warehouse,
  User,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ResponsiveImage } from '../components/common/ResponsiveImage';
import { STORAGE_IMAGE_SIZES } from '../lib/responsive-image-sizes';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const Cartons: React.FC = () => {
  const path = "/cartons-demenagement-paris";

  const faqs = [
    { 
      q: "Quels cartons utiliser pour un déménagement ?", 
      a: "Choisissez le format selon le contenu : petits cartons pour les livres et dossiers, formats standards pour le linge et les objets légers, protections individuelles pour la vaisselle. Vérifiez l’état du fond et des poignées, ainsi que la charge indiquée par le fabricant. Un grand carton ne doit pas être rempli uniquement d’objets lourds."
    },
    { 
      q: "Combien de cartons prévoir pour déménager ?", 
      a: "Le nombre dépend des affaires à emballer et des formats retenus, pas seulement du nombre de pièces. Listez séparément les livres, la vaisselle, le linge et les objets fragiles, puis indiquez les cartons utilisables que vous possédez déjà. Notre équipe pourra vous aider à préciser les quantités selon cet inventaire."
    },
    { 
      q: "Proposez-vous des cartons pour objets fragiles ?", 
      a: "Oui, selon la nature de votre projet, l’utilisation de matériels spécifiques peut être envisagée, comme des cartons croisillons pour la vaisselle ou des protections à bulles pour les objets délicats." 
    },
    { 
      q: "Comment organiser ses cartons avant le jour du déménagement ?", 
      a: "Une méthode efficace consiste à préparer les cartons pièce par pièce, à répartir le poids de manière homogène et à étiqueter systématiquement chaque carton avec son contenu et sa pièce de destination pour faciliter l'emménagement." 
    },
    { 
      q: "Comment obtenir un devis avec cartons et matériel inclus ?", 
      a: "Précisez les fournitures souhaitées, les quantités estimées et la date à laquelle vous en avez besoin. Selon la formule choisie, certaines fournitures peuvent être incluses. Faites détailler les formats, les quantités, les prix et les modalités de remise dans votre devis."
    },
    {
      q: "Peut-on venir récupérer des cartons au bureau ?",
      a: "Contactez notre équipe avant de vous déplacer pour confirmer les disponibilités, le lieu et le créneau de remise du matériel. Les horaires d’accueil du bureau ne garantissent pas la présence des formats ou des quantités souhaités."
    },
    {
      q: "La fourniture de cartons comprend-elle l’emballage de mes affaires ?",
      a: "La fourniture du matériel et l’emballage par notre équipe sont deux prestations à distinguer. Le devis doit préciser qui prépare les cartons, quels objets sont pris en charge et quelles protections sont prévues. Consultez les formules pour définir le niveau d’accompagnement adapté à votre projet."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Cartons déménagement Paris : formats | Marne Transdem"
        description="Quels cartons prévoir pour déménager à Paris ? Choisissez les formats, estimez les quantités et contactez Marne Transdem pour les prix et disponibilités."
        canonical={path}
        schema={[
          getServiceSchema("Cartons et matériel de déménagement", "Marne Transdem accompagne les particuliers et les entreprises dans la préparation de leur déménagement avec des cartons, protections et matériels adaptés.", { path }),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Cartons et matériel", item: path }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl text-center md:text-left">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <Package size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Préparation & Logistique</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              Cartons et <br/>
              <span className="text-accent underline decoration-white/10 underline-offset-8">matériel</span> de déménagement à Paris
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Livres, linge, vaisselle ou vêtements sur cintres : préparez les cartons et protections utiles à votre déménagement à Paris et en Île-de-France. Indiquez vos besoins pour faire confirmer les formats, les quantités, les prix et la remise du matériel avec Marne Transdem.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <Link to="/demande-de-devis#formulaire-devis" className="bg-accent text-brand-900 px-6 sm:px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20">
                Demander un devis gratuit
                <ArrowRight size={20} aria-hidden="true" className="shrink-0" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                <Phone size={20} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
            <nav aria-label="Préparer vos cartons" className="mt-8 flex flex-wrap gap-3">
              {[
                { href: '#cartons-formats', label: 'Choisir les formats' },
                { href: '#cartons-quantites', label: 'Estimer les quantités' },
                { href: '#cartons-remise', label: 'Prix et remise du matériel' },
              ].map(item => <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-xl border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">{item.label}</a>)}
            </nav>
          </div>
        </div>
      </section>

      {/* 2. Bloc de réassurance */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Box size={24} />, title: "Cartons adaptés" },
              { icon: <ShieldCheck size={24} />, title: "Protection des biens" },
              { icon: <Zap size={24} />, title: "Préparation facilitée" },
              { icon: <ClipboardCheck size={24} />, title: "Devis personnalisé" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="text-accent">{item.icon}</div>
                <span className="text-sm font-bold text-brand-900 uppercase tracking-wider">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 & 4. Introduction SEO & Pourquoi bien choisir ses cartons ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center md:text-left">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
            <h2 className="text-3xl font-bold text-brand-900">Le bon matériel pour une préparation bien organisée</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              Répartissez vos affaires par catégorie avant de choisir les cartons. Les livres demandent des formats faciles à porter, les objets fragiles une protection individuelle et le linge des cartons adaptés à son encombrement. Gardez les cartons secs, fermez le fond avec un adhésif adapté et indiquez la pièce de destination avant le chargement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { t: "Protéger les biens", d: "Un matériel adapté aide à mieux protéger vos biens lors des manipulations et du transport." },
              { t: "Faciliter le rangement", d: "Des formats de cartons uniformes permettent un empilage mieux organisé dans le camion." },
              { t: "Gérer le poids", d: "Bien choisir la taille de ses cartons évite les charges trop lourdes et facilite la manutention." },
              { t: "Organiser le déballage", d: "Un matériel adapté et un bon marquage permettent de gagner un temps précieux à l'arrivée." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-slate-50 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Tally4 size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">{item.t}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Matériel utile pour préparer votre déménagement */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 id="cartons-formats" className="scroll-mt-40 text-3xl lg:text-4xl font-bold text-brand-900">Quels formats de cartons et protections choisir ?</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto font-light">Matériel pouvant être prévu selon la prestation choisie et les besoins spécifiques de votre projet.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Box size={28} />, title: "Cartons standards", desc: "Pour le linge et les objets légers : choisissez un format qui reste facile à fermer et à porter." },
              { icon: <Package size={28} />, title: "Cartons renforcés", desc: "Pour les livres et dossiers : privilégiez de petits formats et respectez la charge indiquée sur le carton." },
              { icon: <Warehouse size={28} />, title: "Cartons penderie", desc: "Pour les vêtements sur cintres : relevez la place occupée sur la tringle et les longueurs à protéger." },
              { icon: <Sparkles size={28} />, title: "Protections fragiles", desc: "Pour la vaisselle et les objets délicats : protégez chaque pièce et calez les espaces pour limiter les mouvements." },
              { icon: <CheckCircle2 size={28} />, title: "Adhésifs et rubans", desc: "Rubans adhésifs professionnels pour une fermeture sécurisée." },
              { icon: <ShieldCheck size={28} />, title: "Couvertures", desc: "Protection du mobilier contre les rayures durant le transport." },
              { icon: <LayoutGrid size={28} />, title: "Housses matelas", desc: "Protection hygiénique pour vos matelas et canapés." },
              { icon: <Info size={28} />, title: "Étiquettes", desc: "Marquage clair pour organiser le contenu et les pièces." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-all group">
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-sm font-bold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pour les particuliers et les entreprises */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent mb-8">
                   <User size={32} />
                </div>
                <h3 className="text-3xl font-bold text-brand-900 mb-6">Particuliers</h3>
                <p className="text-slate-600 leading-relaxed font-light mb-6">
                  Précisez les affaires à emballer, de la vaisselle fragile aux vêtements, pour définir les formats et les protections nécessaires selon les disponibilités.
                </p>
                <ul className="grid grid-cols-2 gap-4">
                   {[
                     "Cartons vêtements",
                     "Cartons vaisselle",
                     "Objets personnels",
                     "Livres",
                     "Textiles",
                     "Électroménager"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                       <CheckCircle2 size={16} className="text-accent" />
                       {item}
                     </li>
                   ))}
                </ul>
             </div>
             <div className="bg-brand-900 p-12 rounded-[2.5rem] text-white">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                   <Building2 size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white">Entreprises</h3>
                <p className="text-slate-300 leading-relaxed font-light mb-6">
                  Solutions spécifiques pour le transfert de vos équipements professionnels et l'organisation de vos services.
                </p>
                <ul className="grid grid-cols-2 gap-4">
                   {[
                     "Archives",
                     "Dossiers",
                     "Matériel de bureau",
                     "Fournitures",
                     "Équipements pro",
                     "Organisation"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                       <CheckCircle2 size={16} className="text-accent" />
                       {item}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 id="cartons-remise" className="scroll-mt-40 text-3xl font-bold text-brand-900">Prix, disponibilités et remise des cartons à Paris</h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto mt-6">Pour obtenir les cartons nécessaires à votre projet, indiquez les formats, les quantités et la date souhaitée. Faites distinguer les fournitures incluses dans votre formule de celles à chiffrer séparément. Avant de vous déplacer au bureau, contactez l’équipe pour confirmer le matériel disponible, le prix et le lieu de remise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { t: "Analyse des besoins", d: "Évaluation du volume et de la nature des biens à emballer." },
              { t: "Choix du matériel", d: "Sélection des cartons et protections les plus adaptés." },
              { t: "Quantités et prix", d: "Confirmation des formats, des disponibilités et des fournitures incluses ou à chiffrer." },
              { t: "Remise du matériel", d: "Lieu, date et modalités à convenir avec notre équipe avant votre déplacement." }
            ].map((step, i) => (
              <div key={i} className="relative p-8 bg-white rounded-3xl border border-slate-100 group hover:bg-brand-900 transition-colors duration-500">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-accent font-black text-xl mb-6 group-hover:bg-accent group-hover:text-white transition-colors mx-auto">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 group-hover:text-white transition-colors">{step.t}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed group-hover:text-slate-300 transition-colors">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section Locale */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-900">Cartons de déménagement à Paris : préparer son projet avec méthode</h2>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                Déménager à Paris présente des défis logistiques uniques. Le manque d'espace fréquent dans les appartements parisiens impose une organisation méthodique. Nous vous conseillons de trier vos biens avant d'emballer et de bien répartir le poids dans vos cartons pour faciliter le passage par les étages ou ascenseurs réduits.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Une préparation progressive avant le jour J reste la meilleure stratégie pour un déménagement sans stress. Marne Transdem vous accompagne pour que chaque carton soit prêt selon les besoins de votre projet.
              </p>
            </div>
            <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <ResponsiveImage width={1897} height={1423} sizes={STORAGE_IMAGE_SIZES} loading="lazy" decoding="async"
                src="/images/cartons-demenagement-paris.jpg" 
                alt="Préparation de cartons Paris" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Intermédiaire */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Cartons et emballage : précisez ce dont vous avez besoin</h2>
          <p className="text-slate-600 leading-relaxed">Si vous préparez vos cartons vous-même, indiquez les fournitures nécessaires et celles que vous possédez déjà. Si vous souhaitez confier l’emballage à notre équipe, précisez les biens concernés pour faire chiffrer cette prestation. Retrouvez les niveaux d’accompagnement dans nos <Link to="/formules-demenagement" className="underline text-brand-900">formules de déménagement</Link> et le détail du service d’<Link to="/emballage-protection-demenagement" className="underline text-brand-900">emballage et protection des biens</Link>.</p>
          <h3 id="cartons-quantites" className="scroll-mt-40 text-2xl font-bold text-brand-900">Combien de cartons prévoir pour votre déménagement ?</h3>
          <p className="text-slate-600 leading-relaxed">Faites le tour des placards, de la bibliothèque et des rangements pièce par pièce. Notez ce qui part, ce qui reste et les cartons en bon état déjà disponibles. Les formats variant, un nombre de cartons calculé uniquement sur la surface du logement serait peu précis.</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-relaxed">
            <li><strong>Le contenu à emballer :</strong> livres, vaisselle, linge, vêtements sur cintres ou objets fragiles. Signalez les dimensions particulières pour éviter de choisir un format inadapté.</li>
            <li><strong>Le matériel disponible :</strong> cartons en bon état, protections et adhésifs que vous comptez réutiliser. Faites préciser ce qui reste à fournir.</li>
            <li><strong>La date souhaitée :</strong> prévoyez le temps de préparation avant le déménagement et confirmez avec l’équipe les disponibilités ainsi que les modalités de remise.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">Pour les cartons déjà préparés, relevez leur nombre et leurs dimensions extérieures dans le <Link to="/calculateur-volume" className="underline text-brand-900">calculateur de volume en m³</Link>. Cet outil prépare le volume à transporter ; il ne détermine pas le nombre de cartons vides à fournir.</p>
          <p className="text-slate-600 leading-relaxed">Ajoutez ces éléments à votre <Link to="/demande-de-devis#formulaire-devis" className="underline text-brand-900">demande de devis pour cartons et fournitures</Link>. Avant tout déplacement, <Link to="/contact" className="underline text-brand-900">contactez notre équipe</Link> pour confirmer les quantités et le lieu de remise.</p>
        </div>
      </section>
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-accent/10 blur-[100px]"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">Besoin de cartons ou de matériel ?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez votre projet et choisissez une solution adaptée à votre volume, vos biens et votre niveau d’accompagnement.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/demande-de-devis#formulaire-devis" className="bg-accent text-brand-900 px-8 sm:px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20">
              Demander mon devis
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* 10. Pourquoi choisir Marne Transdem ? */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 mb-4">Pourquoi choisir Marne Transdem ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "Accompagnement pro", d: "Un suivi de proximité et une expertise dédiée à la protection de vos biens." },
              { t: "Conseil sur la préparation", d: "Nous vous guidons sur les meilleures méthodes d'emballage." },
              { t: "Organisation claire", d: "Une planification étape par étape pour une transition sereine." },
              { t: "Protection soignée", d: "Utilisation rigoureuse de matériels de protection professionnels." },
              { t: "Formules adaptées", d: "Des formules adaptées selon votre budget et vos besoins." },
              { t: "Intervention IDF", d: "Intervention à Paris et en Île-de-France selon votre projet." }
            ].map((reason, i) => (
              <div key={i} className="flex gap-4 items-start p-6 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="text-accent shrink-0 mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-900 mb-1">{reason.t}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{reason.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center text-balance">Questions fréquentes cartons et matériel</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-3">
                    <Zap size={18} className="text-accent" />
                    {faq.q}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Maillage interne */}
      <section className="py-24 border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="text-3xl font-bold text-brand-900 mb-10">Préparer les autres étapes de votre déménagement</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 text-center md:text-left">
              <Link to="/demande-de-devis#formulaire-devis" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2 text-sm">Devis</h3>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Estimation personnalisée.</p>
              </Link>
              <Link to="/formules-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2 text-sm">Formules</h3>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Toutes nos prestations.</p>
              </Link>
              <Link to="/demenagement-particuliers-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2 text-sm">Particuliers</h3>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Accompagnement foyer.</p>
              </Link>
              <Link to="/demenagement-entreprises-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2 text-sm">Entreprises</h3>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Transfert professionnel.</p>
              </Link>
              <Link to="/emballage-protection-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2 text-sm text-balance">Emballage et protection</h3>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Soin et préservation.</p>
              </Link>
              <Link to="/contact" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2 text-sm">Contact</h3>
                <p className="text-xs text-slate-500 font-light text-balance text-center md:text-left">Parlons de votre projet.</p>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Cartons;
