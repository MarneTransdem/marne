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
      a: "Demandez un devis précisant le mobilier, les accès et les prestations souhaitées. Pour comparer les options, indiquez si vous préparez vous-même les cartons et si certains meubles doivent être démontés. Le tarif dépend du projet ; une remise liée au statut étudiant doit être confirmée au devis."
    },
    { 
      q: "Peut-on déménager un petit volume (quelques cartons et un lit) ?", 
      a: "Vous pouvez demander un devis pour quelques meubles et cartons. Listez les objets, leurs dimensions et les étages aux deux adresses. Un petit volume peut nécessiter une manutention particulière si un escalier est étroit ou si le lit doit être démonté."
    },
    { 
      q: "Intervenez-vous dans les résidences universitaires (CROUS, etc.) ?", 
      a: "Pour préparer une livraison en résidence universitaire, demandez au gestionnaire les horaires d'accès, les modalités de remise des clés et les possibilités de stationnement. Vérifiez aussi l'ascenseur et le mobilier déjà fourni, puis transmettez ces informations avec votre demande de devis."
    },
    { 
      q: "Faut-il réserver longtemps à l'avance pour la rentrée de septembre ?", 
      a: "Contactez-nous dès que vos adresses et votre créneau d'entrée sont connus. Indiquez plusieurs dates possibles si vous disposez de souplesse. La disponibilité doit être confirmée lors de la réservation ; une demande anticipée ne réserve pas automatiquement une équipe."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement Étudiant Paris & IDF | Marne Transdem"
        description="Préparez votre déménagement étudiant à Paris et en Île-de-France : inventaire, accès en résidence, cartons, petit volume et devis adapté aux prestations choisies."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Étudiant", "Déménagement étudiant à Paris et en Île-de-France pour studios, chambres et petits volumes, avec prestations et disponibilités à confirmer au devis."),
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
              initial={false}
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
              Vous rejoignez un studio, une colocation ou une résidence universitaire à Paris ou en Île-de-France ? Préparez l'inventaire de vos meubles et cartons, les accès et la date d'entrée pour demander un devis adapté à votre installation.
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
                  Le volume dépend des biens que vous emportez, pas seulement de la surface du logement. Commencez par le <Link to="/calculateur-volume" className="underline text-brand-900">calculateur de volume</Link> et vérifiez les meubles déjà présents à destination. Pour quelques meubles et cartons, consultez notre service de <Link to="/demenagement-petit-volume" className="underline text-brand-900">déménagement petit volume</Link>.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 italic space-y-8 shadow-sm">
               <h3 className="text-2xl font-bold text-brand-900 uppercase italic border-b border-accent pb-4">Pourquoi nous choisir ?</h3>
               <div className="space-y-6">
                  {[
                    { icon: <Wallet size={20} />, t: "Budget à préparer", d: "Comparez des devis portant sur le même volume et les mêmes prestations." },
                    { icon: <Clock size={20} />, t: "Grande réactivité", d: "Possibilité d'intervention rapide selon nos disponibilités." },
                    { icon: <Zap size={20} />, t: "Logistique simplifiée", d: "Matériel adapté aux accès difficiles (chambres de bonne, escaliers)." },
                    { icon: <ShieldCheck size={20} />, t: "Garanties à vérifier", d: "Consultez les garanties, plafonds et exclusions indiqués au contrat." }
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
            { icon: <Home size={32} />, t: "Studio & Chambre", d: "Précisez les étages, l'ascenseur et les dimensions des meubles à transporter." },
            { icon: <Truck size={32} />, t: "Petit Volume", d: "Listez les meubles et cartons pour faire chiffrer le transport et la manutention." },
            { icon: <Package size={32} />, t: "Cartons & Protection", d: "Faites préciser les fournitures incluses au devis et celles à acheter séparément." }
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Préparer son installation en résidence ou en colocation</h2>
          <p className="text-slate-600 leading-relaxed">Confirmez la remise des clés avant de fixer la livraison. Demandez au gestionnaire ou aux colocataires où le véhicule peut s'arrêter, quels accès utiliser et à quels horaires les meubles peuvent être livrés. Signalez les escaliers étroits et mesurez les meubles encombrants.</p>
          <p className="text-slate-600 leading-relaxed">Pour définir votre budget, comparez les <Link to="/formules-demenagement" className="underline text-brand-900">prestations des formules de déménagement</Link>. Si vous emballez vos affaires, préparez les <Link to="/cartons-demenagement-paris" className="underline text-brand-900">cartons et protections nécessaires</Link>, identifiez leur destination et gardez vos clés, documents et affaires du premier soir avec vous.</p>
          <p className="text-slate-600 leading-relaxed">Si vous devez quitter votre logement avant de recevoir les nouvelles clés, demandez un chiffrage séparé pour un <Link to="/garde-meuble-paris" className="underline text-brand-900">stockage temporaire en garde-meuble</Link> : volume, durée, accès et second transport doivent être précisés.</p>
        </div>
      </section>
      <section className="py-24 bg-brand-900 text-white font-sans italic relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center italic">
          <h2 className="text-3xl lg:text-6xl font-black mb-10 uppercase italic tracking-tight">Prêt à emménager ?</h2>
          <p className="text-xl text-slate-300 mb-14 max-w-2xl mx-auto font-light italic">
            Transmettez vos deux adresses, votre inventaire et les dates souhaitées pour préparer votre devis étudiant.
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
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight">
                   <HelpCircle className="text-accent shrink-0" size={20} />
                   {faq.q}
                 </h3>
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
