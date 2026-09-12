import { ServiceDecisionGuide } from '../components/common/ServiceDecisionGuide';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, MoveUp, Shield, Info, Zap, Building2, User, ClipboardCheck, LayoutGrid, Package, Calculator, Truck, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const MonteMeuble: React.FC = () => {
  const path = "/location-monte-meuble-paris";

  const faqs = [
    {
      q: "De quels monte-meubles dispose Marne Transdem ?",
      a: "Notre parc comprend trois monte-meubles : un autoporté de 30 m et 300 kg de charge maximale, et deux tractés de 24 m et 18 m, chacun de 250 kg de charge maximale. Les repères sont respectivement le 10e, le 7e et le 5e étage. L’étage accessible et la charge admissible dans la configuration prévue doivent être confirmés après étude des accès ; les capacités maximales ne garantissent pas chaque intervention."
    },
    {
      q: "Quand faut-il utiliser un monte-meuble ?",
      a: "L'utilisation d'un monte-meuble est recommandée lorsque vos meubles ne passent pas dans l'ascenseur ou la cage d'escalier, pour les objets lourds ou meubles volumineux, ou pour gagner du temps sur les étages élevés en passant directement par une fenêtre ou un balcon."
    },
    {
      q: "Un monte-meuble est-il utile en appartement ?",
      a: "Oui, il peut être utile dans de nombreux immeubles parisiens lorsque les accès sont étroits ou les ascenseurs trop petits. Cela permet de préserver l'état de vos biens et des parties communes de la copropriété."
    },
    {
      q: "Peut-on utiliser un monte-meuble à Paris ?",
      a: "Oui, sous réserve de faisabilité technique et des autorisations nécessaires. L’emplacement de l’appareil, la façade, les ouvertures et les obstacles doivent être étudiés. À Paris, l’utilisation d’un monte-meuble sur l’espace public nécessite une autorisation d’occupation temporaire de déménagement."
    },
    {
      q: "Comment savoir si un monte-meuble est nécessaire ?",
      a: "L'analyse des accès est la première étape. Si vous avez un doute sur le passage d'un canapé, d'une armoire ou de l'électroménager, nous évaluons la situation pour vous confirmer si le recours à un monte-meuble est la solution la plus adaptée."
    },
    {
      q: "Comment obtenir un devis pour un monte-meuble ?",
      a: "Indiquez l’adresse, l’étage, la date souhaitée, les biens à déplacer et leurs dimensions. Décrivez la fenêtre ou le balcon et l’emplacement possible de l’appareil. Le devis doit préciser l’intervention du technicien, la manutention, les protections et les démarches retenues pour votre projet."
    },
    {
      q: "Quels éléments déterminent le prix d’un monte-meuble ?",
      a: "Le devis dépend notamment de la configuration des accès, de l’appareil nécessaire, des biens à déplacer, de la durée prévue et des prestations de manutention. Faites préciser les frais de déplacement, les autorisations et les conditions applicables si l’intervention doit être prolongée ou reportée."
    },
    {
      q: "Un étage ou un poids maximum peut-il être confirmé à distance ?",
      a: "L’étage seul ne suffit pas : la hauteur, le recul disponible, les obstacles, les dimensions et le poids des biens influencent la faisabilité. Communiquez ces informations à notre équipe ; les capacités de l’appareil et les conditions réelles d’installation doivent être vérifiées avant de confirmer l’intervention."
    }
  ];

  return (
    <div className="bg-white">
      <SEO
        title="Location monte-meuble Paris | Marne Transdem"
        description="Trois monte-meubles à Paris : un autoporté de 30 m et deux tractés de 24 m et 18 m. Préparez vos accès et demandez un devis selon la faisabilité."
        canonical={path}
        schema={[
          getServiceSchema("Location de monte-meuble", "Marne Transdem accompagne les particuliers et les entreprises lorsque l’utilisation d’un monte-meuble facilite le passage de meubles volumineux, d’objets lourds ou d’accès difficiles."),
          getFAQSchema(faqs),
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Location monte-meuble", item: `https://marnetransdem.com${path}` }
          ])
        ]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
            >
              <MoveUp size={16} className="text-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Logistique & Hauteur</span>
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
              Location de <br/>
              <span className="text-accent">monte-meuble</span> à Paris
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
              Marne Transdem accompagne les particuliers et les entreprises lorsque l’utilisation d’un monte-meuble facilite le passage de meubles volumineux, d’objets lourds ou d’accès difficiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-3 shadow-lg shadow-accent/20">
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
      <ServiceDecisionGuide />

      <section className="py-16 bg-white" aria-labelledby="parc-monte-meubles">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <h2 id="parc-monte-meubles" className="scroll-mt-40 text-3xl md:text-4xl font-bold text-brand-900 mb-6">Notre parc de trois monte-meubles</h2>
          <p className="text-slate-600 leading-relaxed mb-8">Marne Transdem dispose d’un monte-meuble autoporté et de deux monte-meubles tractés. Le choix de l’appareil dépend de la hauteur à atteindre, de l’emplacement disponible et des biens à déplacer.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { type: 'Autoporté', height: '30 m', floor: '10e étage', capacity: '300 kg' },
              { type: 'Tracté 24 m', height: '24 m', floor: '7e étage', capacity: '250 kg' },
              { type: 'Tracté 18 m', height: '18 m', floor: '5e étage', capacity: '250 kg' },
            ].map(machine => (
              <div key={machine.type} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-brand-900 mb-5">{machine.type}</h3>
                <dl className="space-y-4 text-slate-600">
                  <div><dt>Hauteur maximale</dt><dd className="text-2xl font-bold text-brand-900">{machine.height}</dd></div>
                  <div><dt>Repère indicatif</dt><dd className="font-semibold text-brand-900">{machine.floor}</dd></div>
                  <div><dt>Charge maximale</dt><dd className="text-xl font-bold text-brand-900">{machine.capacity}</dd></div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate-600 leading-relaxed">Les étages sont des repères : leur hauteur varie d’un bâtiment à l’autre. Le recul, les ouvertures et les obstacles influencent l’installation. La hauteur accessible et la charge admissible dans la configuration prévue sont à confirmer avant l’intervention ; les maxima indiqués ne constituent pas une garantie de faisabilité.</p>
          <p className="mt-5"><Link to="/demande-de-devis" className="font-semibold text-brand-900 underline underline-offset-4">Décrire mes accès pour choisir un monte-meuble adapté</Link></p>
        </div>
      </section>

      {/* 2. Bloc de réassurance */}
      <section className="bg-slate-50 py-12 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <LayoutGrid size={24} />, title: "Accès difficiles" },
              { icon: <Box size={24} />, title: "Meubles volumineux" },
              { icon: <Shield size={24} />, title: "Solution adaptée" },
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

      {/* 3 & 4. Introduction SEO & Quand utiliser un monte-meuble */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-8">
            <h2 className="text-3xl font-bold text-brand-900">Une expertise logistique pour vos accès complexes</h2>
            <p className="text-slate-600 leading-relaxed text-lg font-light">
              Louer un monte-meuble à Paris est souvent une nécessité dictée par la configuration des immeubles parisiens. Les étages élevés, les escaliers étroits ou l'absence d'ascenseur rendent parfois impossible le passage de certains biens. Le passage par fenêtre ou balcon peut alors représenter une solution adaptée, sous réserve de faisabilité.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
              <img width={765} height={1020} loading="lazy" decoding="async"
                src="/images/monte-meuble-demenagement.webp"
                alt="Location Monte-meuble Marne Transdem Paris"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Ascenseur absent ou petit", d: "Une option à étudier lorsque les meubles ne passent pas par les accès intérieurs." },
              { t: "Meuble trop volumineux", d: "Solution pour le mobilier qui ne peut pas emprunter la cage d'escalier." },
              { t: "Étage élevé", d: "Peut faciliter la manutention sur plusieurs étages." },
              { t: "Accès d'immeuble complexe", d: "Lorsque la configuration des lieux rend le portage manuel difficile." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all h-full">
                <div className="w-12 h-12 bg-slate-50 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">{item.t}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ce que comprend notre accompagnement */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900">Ce que comprend notre accompagnement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <LayoutGrid size={32} />, title: "Analyse des accès", desc: "Vérification de la faisabilité selon la configuration des lieux." },
              { icon: <Calculator size={32} />, title: "Évaluation du volume", desc: "Étude des objets à manutentionner pour choisir l'appareil adapté." },
              { icon: <Info size={32} />, title: "Conseil personnalisé", desc: "Orientation vers la solution de levage la plus efficace." },
              { icon: <User size={32} />, title: "Organisation manutention", desc: "Planification rigoureuse de l'intervention technique." },
              { icon: <Package size={32} />, title: "Protection des biens", desc: "Protection soignée de votre mobilier lors du passage." },
              { icon: <Truck size={32} />, title: "Coordination", desc: "Coordination avec l’organisation générale du déménagement." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-6 items-start hover:shadow-lg transition-all">
                <div className="text-accent shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-brand-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pour les particuliers et les entreprises */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-brand-900 p-12 rounded-[2.5rem] text-white">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                   <User size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-6">Particuliers</h3>
                <p className="text-slate-300 leading-relaxed font-light mb-6 text-lg">
                  Faites étudier le passage de vos canapés, de votre électroménager et de vos meubles volumineux selon leurs dimensions, leur poids et les ouvertures disponibles.
                </p>
                <ul className="space-y-4 text-slate-300 mb-10">
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Canapés et buffets</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Électroménager lourd</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Objets fragiles et précieux</li>
                </ul>
             </div>
             <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent mb-8">
                   <Building2 size={32} />
                </div>
                <h3 className="text-3xl font-bold text-brand-900 mb-6">Entreprises</h3>
                <p className="text-slate-500 leading-relaxed font-light mb-6 text-lg">
                  Préparez le passage de votre mobilier de bureau, de vos équipements et de vos archives. Les biens concernés et leur protection sont à préciser lors de l’étude des accès.
                </p>
                <ul className="space-y-4 text-slate-500 mb-10">
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Mobilier de bureau</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Équipements techniques</li>
                   <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-accent" /> Archives et documents</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Notre méthode en 4 étapes */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-brand-900 mb-16">Notre méthode en 4 étapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { t: "Analyse des accès", d: "Vérification technique de la configuration de votre rue et immeuble." },
              { t: "Évaluation des biens", d: "Étude des objets à manutentionner pour un levage sécurisé." },
              { t: "Organisation", d: "Planification de l'intervention de l'appareil et du technicien." },
              { t: "Passage des biens", d: "Réalisation de l'opération en coordination avec le déménagement." }
            ].map((step, i) => (
              <div key={i} className="group">
                <div className="w-16 h-16 bg-brand-900 text-accent rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-4 tracking-tight">{step.t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{step.d}</p>
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
              <h2 className="text-3xl font-bold text-brand-900">Monte-meuble à Paris : une solution utile pour les accès difficiles</h2>
              <p className="text-slate-600 leading-relaxed font-light text-lg">
                Vivre à Paris présente souvent le défi d'immeubles anciens avec des escaliers étroits et des ascenseurs de petites dimensions. Dans ces conditions, l'anticipation de votre déménagement est primordiale.
              </p>
              <p className="text-slate-600 leading-relaxed font-light">
                Le passage par la façade peut éviter un escalier trop étroit, mais exige un emplacement adapté pour installer l’appareil. Les contraintes de stationnement, les obstacles et la circulation autour de la zone d’intervention doivent être étudiés avant de confirmer la prestation.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-12 flex flex-col justify-center gap-8 shadow-sm">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-brand-900">Analyse de faisabilité</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Chaque intervention de monte-meuble à Paris est unique. Nous évaluons systématiquement :
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "L'emplacement de stationnement",
                      "La portée nécessaire",
                      "L'angle de la façade",
                      "La largeur des ouvertures"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle2 size={16} className="text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center gap-4">
                   <Info className="text-accent shrink-0" size={24} />
                   <p className="text-xs text-slate-500 italic">L'utilisation d'un monte-meuble est soumise aux conditions techniques réelles constatées sur place.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA Intermédiaire */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Préparer votre devis de monte-meuble à Paris</h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-600 leading-relaxed">
            <li><strong>Les biens :</strong> listez les meubles, leurs dimensions et leur poids lorsqu’il est connu. Signalez les objets fragiles et les éléments démontables.</li>
            <li><strong>Les accès :</strong> indiquez l’adresse, l’étage, les dimensions de l’ouverture et les obstacles visibles devant la façade. Des photos prises depuis un endroit accessible peuvent aider à préparer l’étude ; elles ne remplacent pas la vérification technique.</li>
            <li><strong>L’organisation :</strong> précisez la date souhaitée, l’enlèvement ou la livraison concernés et les prestations attendues : manutention, emballage ou transport.</li>
          </ul>
          <h3 className="text-2xl font-bold text-brand-900">Anticiper l’autorisation et l’emplacement de l’appareil</h3>
          <p className="text-slate-600 leading-relaxed">À Paris, une autorisation d’occupation temporaire de déménagement est nécessaire pour utiliser un monte-meuble sur l’espace public. Consultez les <a href="https://www.paris.fr/pages/faq-demenagements-4404" className="underline text-brand-900">modalités officielles de la Ville de Paris</a> et précisez avec notre équipe qui effectue la démarche. L’autorisation ne remplace pas l’étude de faisabilité technique.</p>
          <p className="text-slate-600 leading-relaxed">Pour préparer les objets, consultez nos conseils d’<Link to="/emballage-protection-demenagement" className="underline text-brand-900">emballage et protection</Link>. Notre <Link to="/blog/demenagement-monte-meuble-paris" className="underline text-brand-900">guide du déménagement avec monte-meuble</Link> complète cette préparation. Transmettez ensuite les informations dans votre <Link to="/demande-de-devis" className="underline text-brand-900">demande de devis de monte-meuble</Link>.</p>
        </div>
      </section>
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">Besoin d’un monte-meuble pour votre déménagement ?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Décrivez vos accès, vos étages et les biens à transporter afin d’obtenir une estimation adaptée.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/20">
              Demander mon devis
            </Link>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white text-brand-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              <Phone size={20} className="text-accent" />
              Appeler le {CONTACT.phone}
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
              { t: "Entreprise basée à Paris 20e", d: "Une connaissance logistique du terrain à Paris et en Île-de-France." },
              { t: "Accompagnement professionnel", d: "Un suivi de proximité et une expertise dédiée à votre projet." },
              { t: "Analyse des accès", d: "Analyse des accès pour évaluer la faisabilité du passage." },
              { t: "Protection soignée des biens", d: "Protection soignée de votre mobilier et de vos effets personnels." },
              { t: "Organisation claire", d: "Les accès, les démarches et les prestations sont précisés avant l’intervention." },
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
            <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Questions fréquentes monte-meuble</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all">
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
           <h2 className="text-3xl font-bold text-brand-900 mb-10">Organiser les prestations de votre déménagement</h2>
           <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
              <Link to="/demande-de-devis" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2">Devis</h3>
                <p className="text-xs text-slate-500 font-light">Estimation personnalisée.</p>
              </Link>
              <Link to="/demenagement-particuliers-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2">Particuliers</h3>
                <p className="text-xs text-slate-500 font-light">Accompagnement foyer.</p>
              </Link>
              <Link to="/demenagement-entreprises-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2">Entreprises</h3>
                <p className="text-xs text-slate-500 font-light">Transfert professionnel.</p>
              </Link>
              <Link to="/garde-meuble-paris" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2">Garde-meuble</h3>
                <p className="text-xs text-slate-500 font-light">Solution de stockage.</p>
              </Link>
              <Link to="/formules-demenagement" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2">Formules</h3>
                <p className="text-xs text-slate-500 font-light">Toutes nos prestations.</p>
              </Link>
              <Link to="/contact" className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                <h3 className="font-bold text-brand-900 mb-2">Contact</h3>
                <p className="text-xs text-slate-500 font-light">Parlons de votre projet.</p>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default MonteMeuble;
