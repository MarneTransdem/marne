import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  PackageCheck, 
  Truck, 
  Phone, 
  ChevronRight, 
  Star,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CharentonLePont = () => {
  return (
    <div id="charenton-page" className="bg-white">
      {/* 1. Hero Section Premium */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/demenagement-charenton-le-pont.webp" 
            alt="Déménagement professionnel à Charenton-le-Pont avec Marne Transdem" 
            className="w-full h-full object-cover opacity-40 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mb-6"
            >
              <MapPin id="loc-icon" size={14} />
              <span>Déménageur Local 94220</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 italic tracking-tight leading-[1.1]"
            >
              Votre déménagement à <span className="text-accent underline decoration-accent/30 underline-offset-8">Charenton-le-Pont</span> sans le moindre stress.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mb-10 leading-relaxed"
            >
              Que vous quittiez les abords du Bois de Vincennes ou que vous emménagiez près de la Mairie, Marne Transdem déploie son savoir-faire historique pour garantir la sécurité de vos biens.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/contact" className="px-8 py-4 bg-accent text-white rounded-full font-bold uppercase text-sm tracking-widest hover:bg-accent-hover hover:shadow-2xl hover:shadow-accent/40 transition-all text-center">
                Demander mon devis offert
              </Link>
              <a href="tel:0148084439" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2 group whitespace-nowrap">
                <Phone size={18} className="group-hover:animate-shake" />
                01 48 08 44 39
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Introduction Puissante / Expertise Locale (EEAT) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 italic tracking-tight uppercase">
                Bien plus qu'un simple transport : une <span className="text-accent">présence locale</span> rassurante.
              </h2>
              <div className="space-y-6 text-slate-600 font-light leading-relaxed">
                <p>
                  Charenton-le-Pont est une ville exigeante. Entre ses rues commerçantes animées, ses immeubles bourgeois et sa proximité immédiate avec Paris, chaque déménagement nécessite une logistique précise.
                </p>
                <p>
                  Chez **Marne Transdem**, nous connaissons chaque quartier (Val de Seine, Bercy, Plateau). Nous maîtrisons les contraintes de stationnement de la rue de Paris et les accès parfois complexes des résidences bordant le Bois. 
                </p>
                <p>
                  Notre équipe de déménageurs professionnels ne se contente pas de porter des cartons ; elle organise votre transition de vie avec la rigueur d'un expert et la courtoisie d'un partenaire de proximité.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-accent/30 transition-colors">
                  <ShieldCheck className="text-accent mb-4" size={32} />
                  <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider font-mono">Assurance Complète</h4>
                  <p className="text-xs text-slate-500">Protection intégrale de votre patrimoine.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-accent/30 transition-colors">
                  <Clock className="text-accent mb-4" size={32} />
                  <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider font-mono">Ponctualité Rigoureuse</h4>
                  <p className="text-xs text-slate-500">Respect strict des horaires de voirie.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10 group bg-slate-100">
                <img 
                  src="/images/marne-transdem.webp" 
                  alt="Déménageur Marne Transdem à Charenton-le-Pont" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services sur-mesure pour Charenton */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 italic tracking-tight uppercase">Nos Solutions à <span className="text-accent">la Carte</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              Que vous habitiez en studio ou en maison de ville, nous avons une formule adaptée à vos besoins réels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Déménagement de Particuliers", 
                desc: "Emballage soigné, protection des objets fragiles et mobilier sous housses." 
              },
              { 
                title: "Transfert d'Entreprise", 
                desc: "Logistique dédiée aux bureaux et commerces Charentonnais pour une reprise d'activité rapide." 
              },
              { 
                title: "Garde-Meubles Sécurisé", 
                desc: "Stockage court ou long terme dans nos box sous télésurveillance 24h/24." 
              }
            ].map((s, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <PackageCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase italic leading-tight">{s.title}</h3>
                <p className="text-slate-500 font-light mb-8 flex-grow leading-relaxed">{s.desc}</p>
                <Link to="/contact" className="text-accent font-black uppercase text-[10px] tracking-[0.2em] flex items-center hover:gap-2 transition-all">
                  En savoir plus <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pourquoi choisir Marne Transdem à Charenton ? */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto p-12 lg:p-20 bg-slate-900 rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/20 skew-x-[-15deg] translate-x-1/2"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-5xl font-bold mb-8 italic leading-tight">Pourquoi nous confier vos <span className="text-accent uppercase">clés</span> ?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-mono text-sm font-bold">01</div>
                    <p className="text-slate-300 font-light"><strong className="text-white">Expertise Charentonnaise :</strong> Nous opérons quotidiennement dans le 94220, ce qui nous permet d'anticiper les pièges urbains.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-mono text-sm font-bold">02</div>
                    <p className="text-slate-300 font-light"><strong className="text-white">Matériel Spécialisé :</strong> Monte-meubles de dernière génération pour les appartements haussmanniens sans ascenseur.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-mono text-sm font-bold">03</div>
                    <p className="text-slate-300 font-light"><strong className="text-white">Accompagnement administratif :</strong> Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie de Charenton.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10">
                <div className="bg-accent/40 w-12 h-12 rounded-full mb-6 flex items-center justify-center">
                  <Quote size={20} className="text-white fill-white" />
                </div>
                <p className="text-lg italic font-light text-slate-200 mb-8 leading-relaxed">
                  "Un déménagement réalisé de Charenton vers Lyon en juin dernier. Équipe ponctuelle, très polie et surtout très précautionneuse avec mon piano. Je recommande vivement Marne Transdem."
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-accent">M</div>
                  <div>
                    <p className="font-bold text-sm">Marc L.</p>
                    <div className="flex text-accent">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SEO Déménagement Charenton */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 italic text-center uppercase tracking-tight">Questions <span className="text-accent">Frequentes</span></h2>
            
            <div className="space-y-6">
              {[
                { 
                  q: "Quelles sont les formalités de stationnement à Charenton-le-Pont ?", 
                  a: "La ville de Charenton requiert une autorisation de stationnement temporaire (AST). Marne Transdem prend en charge cette demande auprès des services municipaux pour vous libérer des contraintes administratives." 
                },
                { 
                  q: "Proposez-vous la location de monte-meuble à Charenton ?", 
                  a: "Oui. Pour les accès difficiles ou les meubles volumineux, nous déployons un technicien et un monte-meuble capable d'atteindre les étages élevés des résidences charentonnaises." 
                },
                { 
                  q: "Quel est le prix d'un déménagement à Charenton-le-Pont ?", 
                  a: "Le tarif dépend du volume, de la distance et de la formule choisie. Nous réalisons une visite technique gratuite (à domicile ou en visio) pour vous fournir un devis précis et transparent." 
                },
                { 
                  q: "Peut-on déménager le dimanche à Charenton ?", 
                  a: "Le déménagement est soumis à la réglementation sonore locale. Nous privilégions les interventions du lundi au samedi pour respecter le voisinage, mais des exceptions sont possibles en fonction de la situation." 
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-start gap-4">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-1" />
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-slate-500 font-light leading-relaxed pl-9">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA de Conclusion */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 italic tracking-tight uppercase leading-tight">
              Prenez de l'avance sur votre <span className="text-accent underline decoration-accent/10 underline-offset-8">Déménagement</span>.
            </h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Plus de 20 ans d'expérience au service des Charentonnais. Contactez-nous dès aujourd'hui pour planifier votre visite technique gratuite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-accent text-white rounded-full font-bold uppercase text-sm tracking-[0.2em] shadow-xl shadow-accent/20 hover:scale-105 transition-all">
                Obtenir mon devis gratuit
              </Link>
              <a href="tel:0148084439" className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white rounded-full font-bold uppercase text-sm tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                Nous appeler
              </a>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900">20+</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">ans d'expérience</span>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900">98%</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">clients satisfaits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocalMesh />
    </div>
  );
};

const LocalMesh = () => (
  <section className="py-12 bg-slate-50 border-t border-slate-100">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-center">
        <Link to="/demenagement-vincennes" className="text-slate-400 hover:text-accent font-bold text-xs transition-colors italic uppercase">Déménagement Vincennes</Link>
        <Link to="/demenagement-saint-mande" className="text-slate-400 hover:text-accent font-bold text-xs transition-colors italic uppercase">Déménagement Saint-Mandé</Link>
        <Link to="/demenagement-saint-maur-des-fosses" className="text-slate-400 hover:text-accent font-bold text-xs transition-colors italic uppercase">Déménagement Saint-Maur</Link>
        <Link to="/demenagement-montreuil" className="text-slate-400 hover:text-accent font-bold text-xs transition-colors italic uppercase">Déménagement Montreuil</Link>
        <Link to="/demenagement-val-de-marne" className="text-slate-400 hover:text-accent font-bold text-xs transition-colors italic uppercase">Déménagement Val-de-Marne</Link>
        <Link to="/demenagement-ile-de-france" className="text-slate-400 hover:text-accent font-bold text-xs transition-colors italic uppercase">Déménagement Île-de-France</Link>
      </div>
    </div>
  </section>
);

export default CharentonLePont;
