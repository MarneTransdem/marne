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
      a: "Décrivez les dimensions du tableau, son cadre, la présence d’une vitre et les fragilités connues. Les protections, le calage et la répartition de l’emballage sont à définir selon les caractéristiques de la pièce et les prestations retenues. Signalez toute consigne de conservation avant de confirmer le transport."
    },
    { 
      q: "Comment faire étudier le déplacement d’une sculpture ou d’un objet lourd ?",
      a: "Transmettez les dimensions, le poids connu, les points de fragilité et les accès aux deux adresses. La faisabilité, les moyens de manutention et les éventuelles autorisations doivent être étudiés avant toute confirmation. Une demande de devis ne vaut pas acceptation de la prise en charge."
    },
    { 
      q: "Proposez-vous une assurance spécifique pour les objets de valeur ?", 
      a: "Avant de confirmer le transport, demandez les conditions de couverture proposées pour vos œuvres et faites préciser la prise en compte de leur valeur déclarée. Les garanties applicables doivent être confirmées pour votre projet."
    },
    { 
      q: "Le décrochage et l’accrochage des tableaux sont-ils compris ?",
      a: "Décrivez les fixations et les opérations souhaitées dès la demande. Le décrochage, le démontage d’un support et l’installation à destination doivent être étudiés et précisés au devis ; ils ne sont pas à considérer comme inclus automatiquement."
    },
    { 
      q: "Quelles informations fournir pour un devis de déménagement de tableaux à Paris ?",
      a: "Indiquez la date souhaitée, les deux adresses, les étages, les passages et l’inventaire des pièces. Pour chaque tableau ou objet de valeur, précisez les dimensions, le cadre ou la vitre, le poids connu, les fragilités et les protections déjà disponibles. Les modalités de valeur déclarée et les conditions de couverture doivent être confirmées pour le projet."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement de tableaux à Paris | Marne Transdem"
        description="Déménagement de tableaux et d’œuvres d’art à Paris : préparez les dimensions, les accès et les besoins de protection pour un devis personnalisé avec Marne Transdem."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement d'œuvres d'art", "Préparation du transport de tableaux et d’œuvres d’art à Paris : dimensions, accès et besoins de protection à préciser pour un devis personnalisé.", { path }),
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Palette size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Paris & Île-de-France</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase">de tableaux et objets de valeur</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Pour votre déménagement à Paris et en Île-de-France, décrivez vos tableaux et objets de valeur : dimensions, cadres, vitres, fragilités et accès aux deux adresses. Les protections et les opérations prises en charge sont à préciser dans votre devis.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis#formulaire-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Préparer mon devis
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm italic">
                <Phone size={22} className="text-accent" />
                {CONTACT.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-300 leading-relaxed">
              <a href="#preparer-tableaux" className="underline underline-offset-4">Préparer la liste des pièces et les accès</a> et consulter les points à définir pour l’<Link to="/emballage-protection-demenagement" className="underline underline-offset-4">emballage et la protection</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Bloc de réassurance */}
      <section className="bg-slate-50 py-12 border-b border-slate-100 font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={24} />, title: "Protections à définir" },
              { icon: <Sparkles size={24} />, title: "Fragilités à signaler" },
              { icon: <Frame size={24} />, title: "Inventaire des pièces" },
              { icon: <Star size={24} />, title: "Couverture à confirmer" }
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
            <h2 className="text-3xl md:text-5xl font-black text-brand-900 uppercase italic tracking-tight italic underline decoration-accent/20 underline-offset-8">Tableaux et objets de valeur : <span className="text-accent italic tracking-tight">préparer leur déménagement</span></h2>
            <p className="text-slate-500 leading-relaxed text-lg font-light italic">
              Tableaux, sculptures, antiquités ou mobilier de designer demandent une préparation adaptée à leurs caractéristiques. Pour étudier votre transport à Paris ou en Île-de-France, décrivez les pièces, leurs fragilités et les contraintes des deux adresses. Les protections, les moyens de manutention et les opérations retenues doivent être définis avant l’intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center italic transition-all italic underline-none italic">
            <div className="order-2 md:order-1 rounded-[3.5rem] overflow-hidden shadow-2xl skew-x-1 grayscale-[10%] italic">
              <img width={1513} height={1513} loading="lazy" decoding="async" 
                src="/images/demenagement-oeuvres-art.jpg" 
                alt="Emballage oeuvre d'art Marne Transdem" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2 grid grid-cols-1 gap-8 italic transition-all italic underline-none italic">
              {[
                { t: "Surfaces et matériaux", d: "Signalez les surfaces délicates et les consignes de conservation pour définir des protections adaptées à la pièce." },
                { t: "Emballages disponibles", d: "Indiquez si vous disposez d’un emballage d’origine ou d’une protection existante ; les fournitures à prévoir sont à préciser au devis." },
                { t: "Manutention délicate", d: "Les prises, les passages et les contraintes de portage sont à étudier selon les dimensions et le poids des pièces." },
                { t: "Préparation du transport", d: "Les protections et les conditions d’arrimage sont à définir selon les caractéristiques des biens et les consignes transmises." }
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
            <h2 className="text-3xl lg:text-5xl font-black text-brand-900 uppercase italic tracking-tight italic">Les points à définir pour chaque pièce</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
            {[
              { icon: <Frame size={32} />, title: "Cadres et vitres", desc: "Relevez les dimensions hors tout et signalez les éléments fragiles ou saillants." },
              { icon: <Box size={32} />, title: "Poids et prises", desc: "Communiquez le poids connu et les contraintes de manipulation des objets volumineux." },
              { icon: <Shield size={32} />, title: "Valeur déclarée", desc: "Faites confirmer les modalités de déclaration et les conditions de couverture avant l’intervention." },
              { icon: <Sparkles size={32} />, title: "Petits objets fragiles", desc: "Distinguez les pièces et leurs éléments détachables dans votre inventaire." },
              { icon: <LayoutGrid size={32} />, title: "Trajet et accès", desc: "Décrivez les passages, les étages et le portage au départ comme à l’arrivée." },
              { icon: <Palette size={32} />, title: "Opérations souhaitées", desc: "Signalez le décrochage ou l’installation à étudier ; seules les opérations retenues au devis sont convenues." }
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

      <section id="preparer-tableaux" className="py-16 bg-white border-y border-slate-100 scroll-mt-28">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Préparer le transport de vos tableaux et objets de valeur</h2>
          <p className="text-slate-600 leading-relaxed">
            Préparez une liste des pièces à déplacer avec leurs dimensions, leur poids lorsqu’il est connu et la présence d’un cadre ou d’une vitre. Signalez les fragilités déjà identifiées, les emballages disponibles et les consignes particulières associées aux œuvres. Des photos permettent de préciser votre demande.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Décrivez les accès au départ et à l’arrivée : portes, escaliers, ascenseur, cour et distance jusqu’au véhicule. Indiquez si vous demandez le décrochage, le démontage d’un support ou l’installation à destination. Ces opérations doivent être étudiées et précisées dans les prestations convenues.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Pour un <Link to="/demenagement-particuliers-paris" className="text-brand-900 underline underline-offset-4">déménagement d’appartement ou de maison</Link>, distinguez ces pièces du mobilier et des cartons courants. Comparez les <Link to="/formules-demenagement#comparatif-formules" className="text-brand-900 underline underline-offset-4">prestations d’emballage des formules</Link>, puis détaillez les besoins particuliers dans votre <Link to="/demande-de-devis#formulaire-devis" className="text-brand-900 underline underline-offset-4">demande de devis pour vos tableaux et objets de valeur</Link>. Communiquez toute exigence particulière de conservation avant de confirmer le transport.
          </p>
        </div>
      </section>

      {/* 7. Méthode en 4 étapes Art */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 text-center italic">
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 mb-20 uppercase italic tracking-tight italic underline decoration-accent/20 underline-offset-8">Organisation en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 italic">
            {[
              { t: "Inventaire des pièces", d: "Dimensions, fragilités et informations nécessaires à la déclaration de valeur." },
              { t: "Étude du projet", d: "Vérification des accès, des protections à prévoir et de la faisabilité des opérations demandées." },
              { t: "Prestations convenues", d: "Répartition de l’emballage, manutention et transport précisés dans le devis." },
              { t: "Arrivée", d: "Livraison et remise en place selon les opérations retenues et les accès convenus." }
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
          <h2 className="text-3xl lg:text-6xl font-black mb-10 leading-tight italic uppercase tracking-tight italic">Préparons le déménagement <br/><span className="text-accent italic">de vos tableaux</span></h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light leading-relaxed italic">
            Parlez-nous de vos œuvres et recevez une étude logistique personnalisée pour leur transport.
          </p>
          <div className="flex flex-wrap justify-center gap-6 italic">
            <Link to="/demande-de-devis#formulaire-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 italic underline-none">
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
                  <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic">
                    <Zap size={20} className="text-accent italic" />
                    {faq.q}
                  </h3>
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
                   <span className="text-[10px] font-black text-brand-900 uppercase tracking-widest italic">{link.n}</span>
                </Link>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default DemenagementOeuvresArt;
