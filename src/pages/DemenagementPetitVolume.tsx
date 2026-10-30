import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, CheckCircle2, Box, Zap, Wallet, Truck, Clock, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CONTACT } from '../constants';
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from '../lib/schema';

const DemenagementPetitVolume: React.FC = () => {
  const path = "/demenagement-petit-volume";

  const faqs = [
    { 
      q: "Qu'est-ce qu'un déménagement 'petit volume' ?", 
      a: "Cette prestation concerne notamment quelques meubles et cartons, une chambre ou un studio. Préparez un inventaire avec les dimensions des objets : la surface du logement ne suffit pas à déterminer le volume à transporter."
    },
    { 
      q: "Est-ce moins cher qu'un déménagement classique ?", 
      a: "Le volume est un élément du devis, mais les accès, la distance, les dates et les opérations de manutention comptent aussi. Signalez les étages sans ascenseur, les meubles à démonter et les objets lourds. Comparez des devis portant sur les mêmes prestations plutôt qu'un prix au mètre cube isolé."
    },
    { 
      q: "Proposez-vous du groupage pour les petits volumes ?", 
      a: "Non, Marne Transdem ne propose pas de groupage. Pour quelques meubles ou cartons, demandez un devis adapté à votre inventaire, au trajet et aux accès des deux adresses. Indiquez votre période de déménagement pour préparer l’organisation de votre projet."
    },
    { 
      q: "Peut-on déménager une seule armoire ou un seul canapé ?", 
      a: "Vous pouvez demander un devis pour un meuble isolé. Transmettez ses dimensions, des photos utiles et les informations d'accès aux deux adresses. Précisez s'il peut être démonté et signalez tout objet particulièrement lourd pour adapter l'évaluation du transport."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Déménagement petit volume à Paris : devis | Marne Transdem"
        description="Un meuble, des cartons ou un studio à déménager à Paris et en Île-de-France ? Préparez votre inventaire et vos accès pour demander un devis personnalisé."
        canonical={path}
        schema={[
          getServiceSchema("Déménagement Petit Volume", "Déménagement de petits volumes, studios ou meubles isolés à Paris et en Île-de-France, avec transport et prestations à préciser au devis.", { path }),
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
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-white/10"
            >
              <Box size={16} className="text-accent" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Meubles, cartons & studios</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight italic">
              Déménagement <br/>
              <span className="text-accent italic underline decoration-accent/20 underline-offset-8 transition-all hover:text-white italic uppercase">petit volume</span> à Paris
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl italic">
              Un meuble isolé, quelques cartons ou les affaires d’un studio : préparez votre petit déménagement à Paris et en Île-de-France avec Marne Transdem. Le devis précise le transport, la manutention et les prestations retenues selon votre inventaire et vos accès.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/demande-de-devis#formulaire-devis" className="bg-accent text-brand-900 px-6 sm:px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-xl flex items-center justify-center gap-3 group transition-all italic underline-none">
                Devis petit volume gratuit
                <ArrowRight size={22} aria-hidden="true" className="shrink-0 group-hover:translate-x-1 transition-transform" />
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
                  Pour un <span className="font-bold text-brand-900">déménagement de petit volume</span>, commencez par ce qui doit réellement partir : mobilier, cartons et objets particuliers. Un logement de même surface peut contenir des quantités très différentes ; la liste des biens est plus utile qu’une estimation fondée uniquement sur les mètres carrés.
                </p>
                <p>
                  Pour préparer le devis, listez les meubles et cartons, puis indiquez les étages, les ascenseurs et la distance entre le véhicule et les accès. Un canapé volumineux ou un piano demande une évaluation spécifique, même si le reste de l'inventaire est limité.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 italic">
              {[
                { icon: <Wallet size={24} />, t: "Devis détaillé", d: "Volume, accès et prestations à préciser." },
                { icon: <Clock size={24} />, t: "Organisation", d: "Créneaux de chargement et de livraison à convenir." },
                { icon: <Truck size={24} />, t: "Accès à préparer", d: "Signalez les rues et escaliers étroits." },
                { icon: <Zap size={24} />, t: "Calendrier", d: "Dates à confirmer selon les disponibilités." }
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

      <section aria-labelledby="petit-volume-inventaire" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-6">
          <h2 id="petit-volume-inventaire" className="text-3xl font-bold text-brand-900">Que faut-il prévoir pour votre petit déménagement ?</h2>
          <p className="text-slate-600 leading-relaxed">Préparez la liste des biens aux deux adresses avant de choisir les prestations. Voici les informations utiles selon votre situation, sans volume ni tarif forfaitaire supposés.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Un meuble isolé', text: 'Relevez sa longueur, sa largeur et sa hauteur. Précisez les parties démontables, les matériaux fragiles et les passages à vérifier : portes, palier, ascenseur et escalier.' },
              { title: 'Quelques meubles et cartons', text: 'Listez chaque meuble et comptez les cartons par format. Signalez les biens lourds ou fragiles, ainsi que ce que vous pouvez emballer ou démonter avant le chargement.' },
              { title: 'Une chambre ou un studio', text: 'N’oubliez pas la literie, les vêtements, la vaisselle et les petits appareils. Indiquez le mobilier conservé, vendu ou laissé sur place pour ne compter que ce qui part.' },
            ].map(item => (
              <div key={item.title} className="rounded-3xl bg-white p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-brand-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-600 leading-relaxed">Utilisez le <Link to="/calculateur-volume" className="underline underline-offset-4 font-semibold text-brand-900">calculateur de volume en m³</Link> pour préparer votre estimation. À chaque adresse, ajoutez les étages, les dimensions de l’ascenseur et la distance de portage. Un faible volume ne garantit pas le passage d’un canapé dans un escalier étroit.</p>
        </div>
      </section>

      <section aria-labelledby="petit-volume-prix" className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 id="petit-volume-prix" className="text-3xl font-bold text-brand-900">Comment se prépare le prix d’un petit déménagement à Paris ?</h2>
          <p className="text-slate-600 leading-relaxed">Le devis dépend du volume, du trajet et des opérations nécessaires : protection, démontage, manutention dans les étages et installation à l’arrivée. La saison, la date retenue, le stationnement et les accès peuvent aussi modifier l’organisation, même pour quelques meubles.</p>
          <p className="text-slate-600 leading-relaxed">Pour préparer votre budget, le <Link to="/blog/combien-coute-demenagement-paris" className="underline underline-offset-4 font-semibold text-brand-900">guide des prix d’un déménagement à Paris</Link> présente des repères indicatifs, notamment pour un studio. Comparez ensuite des devis établis pour le même inventaire, les mêmes accès et la même répartition des tâches.</p>
          <p className="text-slate-600 leading-relaxed">Vous avez des dates souples ? Indiquez votre période et votre trajet pour préparer l’organisation de votre petit déménagement. Marne Transdem ne propose pas de groupage ; le devis est établi selon les biens à transporter, les accès et les prestations souhaitées.</p>
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
              { t: "Stockage temporaire", d: "Conserver une partie du mobilier entre deux logements.", l: "/garde-meuble-paris" }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:border-accent transition-all group italic">
                <h3 className="text-lg font-bold text-white mb-4 uppercase italic tracking-tight group-hover:text-accent transition-colors italic">{item.t}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed mb-8 italic">{item.d}</p>
                <Link to={item.l} className="text-accent text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2">{item.t} <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(242,125,38,0.05),transparent_50%)] pointer-events-none"></div>
      </section>

      {/* Steps guiding the client to book a small move */}
      <section className="py-24 font-sans italic transition-all italic underline-none italic">
        <div className="container mx-auto px-4 md:px-6 italic">
          <div className="max-w-5xl mx-auto bg-slate-50 p-6 sm:p-12 lg:p-20 rounded-[2rem] sm:rounded-[4rem] border border-slate-100 flex flex-col lg:flex-row items-center gap-8 lg:gap-20 italic shadow-sm">
             <div className="lg:w-1/2 space-y-8 italic">
                <h2 className="text-3xl md:text-5xl font-black text-brand-900 tracking-tight uppercase italic underline decoration-accent/20 underline-offset-8">Préparez votre <span className="text-accent italic">demande de devis</span></h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed italic text-justify italic">
                  Estimez vos meubles et cartons avec le calculateur, puis précisez les accès et les objets difficiles à manipuler. Le devis doit indiquer le transport, l'emballage et le démontage retenus. La réservation intervient après accord sur les prestations, le prix et les dates.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 italic">
                  <Link to="/demande-de-devis#formulaire-devis" className="bg-brand-900 text-white px-6 sm:px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all italic">Demander mon devis</Link>
                  <Link to="/calculateur-volume" className="bg-white text-brand-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all italic">Calculer mon volume</Link>
                </div>
             </div>
             <div className="lg:w-1/2 grid grid-cols-1 gap-4 italic font-sans italic underline-none italic transition-all italic underline-none italic">
                {[
                  "Inventaire et dimensions des meubles",
                  "Étages, ascenseurs et stationnement",
                  "Démontage et emballage à préciser",
                  "Dates de transport à confirmer"
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-brand-900">Préparer un petit déménagement sans oublier les accès</h2>
          <p className="text-slate-600 leading-relaxed">Mesurez les meubles encombrants et vérifiez leur passage dans les portes et les escaliers. Pour un piano ou une pièce particulièrement lourde, consultez les informations sur le <Link to="/demenagement-piano-objets-lourds" className="underline text-brand-900">transport des objets lourds</Link> et signalez ces contraintes dès la demande.</p>
          <p className="text-slate-600 leading-relaxed">Comparez les <Link to="/formules-demenagement" className="underline text-brand-900">prestations des formules</Link> pour choisir ce que vous préparez vous-même. Si vous emballez vos affaires, prévoyez les <Link to="/cartons-demenagement-paris" className="underline text-brand-900">cartons et protections</Link> nécessaires et identifiez les objets fragiles.</p>
        </div>
      </section>

      <section aria-labelledby="small-move-example" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <p className="text-sm font-semibold text-brand-900 mb-3">Exemple de préparation — septembre 2026</p>
          <h2 id="small-move-example" className="scroll-mt-40 text-3xl font-bold text-brand-900 mb-6">Un déménagement de 20 m³ de Paris 12e à Paris 4e</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Le document de préparation de ce projet confié à Marne Transdem indiquait un volume estimé à 20 m³. Au départ, les biens étaient répartis entre le premier étage et un garage, avec ascenseur disponible. À l’arrivée, le logement était situé au cinquième étage, avec ascenseur et monte-meubles prévu. L’organisation était soumise à un portage inférieur à 20 mètres.</p>
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">Ce que notre équipe prépare</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-relaxed">
                <li>Livraison préalable de cartons et d’adhésifs.</li>
                <li>Mise en penderie des vêtements sur cintres.</li>
                <li>Protection du mobilier et mise sous housse de la literie.</li>
                <li>Dépose des éléments fixés aux murs et plafonds, sans repose.</li>
                <li>Demandes administratives de stationnement au chargement et à la livraison.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">Ce que le client prend en charge</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 leading-relaxed">
                <li>Emballage et déballage des cartons, y compris les objets fragiles.</li>
                <li>Démontage et remontage du mobilier.</li>
                <li>Déconnexion et reconnexion des appareils électriques et des équipements raccordés aux fluides.</li>
                <li>Éventuels frais de stationnement selon les lieux de résidence.</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">Cet exemple décrit les prestations prévues dans le document de préparation, sans constituer un compte rendu d’exécution. Le volume seul ne définit pas la prestation : les accès et la répartition des tâches sont également précisés au devis. Consultez nos <Link to="/formules-demenagement" className="underline underline-offset-4 font-semibold text-brand-900">formules de déménagement</Link> pour préparer votre propre demande.</p>
          <p className="text-slate-600 leading-relaxed mb-6">Vous préparez vous aussi un départ depuis ce secteur ? Consultez les informations sur le <Link to="/demenagement-paris-12" className="underline underline-offset-4 font-semibold text-brand-900">déménagement dans le 12e arrondissement</Link> pour compléter votre préparation.</p>
          <Link to="/demande-de-devis#formulaire-devis" className="inline-flex items-center gap-3 rounded-xl bg-brand-900 px-6 py-4 font-bold text-white">Demander un devis pour mon petit déménagement <ArrowRight size={20} aria-hidden="true" className="shrink-0" /></Link>
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
                 <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-4 uppercase italic tracking-tight italic font-sans italic transition-all italic">
                   <HelpCircle className="text-accent shrink-0 italic" size={20} />
                   {faq.q}
                 </h3>
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
