import React from 'react';
import { motion } from 'motion/react';
import { Hero } from '../components/home/Hero';
import { ReassuranceBar } from '../components/home/ReassuranceBar';
import { ServicesSection } from '../components/home/ServicesSection';
import { GoogleReviewsSection } from '../components/home/GoogleReviews';
import { FAQ } from '../components/home/FAQ';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Quote, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { FORMULAS, FAQ_ITEMS } from '../constants';
import { SEO } from '../components/SEO';
import { getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from '../lib/schema';

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Déménageur Paris | Île-de-France | Devis Gratuit | Marne Transdem" 
        description="Marne Transdem : expert du déménagement à Paris 20e et en Île-de-France. Particuliers & Entreprises. Devis gratuit sous 24h."
        canonical="/"
        schema={[
          getOrganizationSchema(), 
          getLocalBusinessSchema(),
          getFAQSchema(FAQ_ITEMS.map(i => ({ q: i.question, a: i.answer })))
        ]}
      />
      
      <Hero />
      <ReassuranceBar />
      <ServicesSection />

      {/* Formulas Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-900 mb-4">Nos Formules de Déménagement</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Choisissez le niveau d'accompagnement adapté à vos besoins.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FORMULAS.map((formula, idx) => (
              <motion.div 
                key={formula.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white rounded-2xl p-8 border ${formula.popular ? 'border-accent ring-4 ring-accent/5 lg:scale-105' : 'border-gray-100'} relative shadow-premium flex flex-col ${formula.popular ? 'z-10 bg-slate-50/20' : ''}`}
              >
                {formula.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    Formule Équilibrée
                  </div>
                )}
                <h3 className="text-2xl font-bold text-brand-900 mb-2 tracking-tight">{formula.name}</h3>
                <p className="text-sm text-slate-500 mb-6 min-h-[40px] italic">{formula.description}</p>
                <div className="space-y-4 mb-10 flex-grow">
                  {formula.features.map(feature => (
                    <div key={feature} className="flex items-start gap-2">
                      <div className="mt-1 bg-accent/10 text-accent rounded-full p-0.5">
                        <CheckCircle size={10} fill="currentColor" className="text-white" />
                      </div>
                      <span className="text-sm text-brand-900 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/demande-de-devis"
                  className={`w-full py-4 rounded-xl flex items-center justify-center font-bold transition-all ${
                    formula.popular ? 'bg-accent text-white hover:bg-accent-hover shadow-lg' : 'bg-slate-100 text-brand-900 hover:bg-slate-200'
                  }`}
                >
                  Demander un devis
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/demenagement-paris-intra-muros.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-4">
                  <h2 className="text-accent font-black uppercase text-xs tracking-[0.3em] mb-4">L'exigence Marne Transdem</h2>
                  <p className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter uppercase italic">
                    Pourquoi nous <br/>
                    <span className="text-accent underline decoration-white/10 underline-offset-8 italic">faire confiance ?</span>
                  </p>
               </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                {[
                   { t: "Expertise Urbaine", d: "Maîtrise des accès complexes à Paris et sa région." },
                   { t: "Organisation 360°", d: "De l'emballage au remontage, rien n'est laissé au hasard." },
                   { t: "Garanties Totales", d: "Protection de vos biens par des assurances premium." },
                   { t: "Ponctualité Rigoureuse", d: "Le respect de vos délais est notre priorité absolue." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-2 text-white uppercase italic tracking-tight">{item.t}</h4>
                      <p className="text-slate-400 font-light text-sm italic leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
               <div className="absolute -inset-4 bg-accent/20 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative">
                  <img 
                    src="/images/marne-transdem.webp" 
                    alt="Déménageur professionnel Paris" 
                    className="w-full aspect-[4/5] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-16 left-16 right-16">
                     <p className="text-4xl font-black mb-2 italic tracking-tighter uppercase leading-none">Méthode <br/>Marne Transdem</p>
                     <p className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Excellence Logistique</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section - Refactored */}
      <section className="py-24 bg-white font-sans italic">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-50 rounded-[4rem] p-12 md:p-24 border border-slate-100 flex flex-col lg:flex-row gap-20 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
            
            <div className="lg:w-7/12 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-brand-900 mb-8 tracking-tighter uppercase italic">Zones <br/><span className="text-accent italic underline decoration-accent/10 underline-offset-8 transition-all font-sans italic">d'intervention</span></h2>
              <p className="text-slate-500 text-lg mb-12 font-light italic leading-relaxed max-w-2xl">
                De notre base au <span className="font-bold text-slate-700">coeur de Paris 20e</span>, nous couvrons un large territoire pour vos mobilités.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Paris 20e', path: '/demenagement-paris-20', m: false },
                  { name: 'Paris 16e', path: '/demenagement-paris-16', m: false },
                  { name: 'Montreuil', path: '/demenagement-montreuil', m: false },
                  { name: 'Boulogne', path: '/demenagement-boulogne-billancourt', m: false },
                  { name: 'Neuilly', path: '/demenagement-neuilly-sur-seine', m: false },
                  { name: 'Vincennes', path: '/demenagement-vincennes', m: false }
                ].map((zone) => (
                  <Link key={zone.name} to={zone.path} className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-accent hover:shadow-xl group h-full">
                    <MapPin size={18} className={`${zone.m ? 'text-accent' : 'text-slate-200'} group-hover:text-accent transition-colors mb-3`} />
                    <span className="text-[10px] font-black text-brand-900 uppercase tracking-widest text-center">{zone.name}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-12">
                 <Link to="/secteurs-desservis" className="text-brand-900 font-black uppercase text-xs tracking-[0.3em] flex items-center gap-3 hover:gap-5 transition-all group">
                    Voir tous nos secteurs <ArrowRight size={18} className="text-accent" />
                 </Link>
              </div>
            </div>

            <div className="lg:w-5/12 grid grid-cols-2 gap-6 relative order-first lg:order-last">
              <div className="space-y-6">
                <img src="/images/demenagement-paris.webp" alt="Déménagement Paris" className="rounded-3xl shadow-xl aspect-[3/4] object-cover grayscale-[30%]" />
                <img src="/images/demenagement-ile-de-france.webp" alt="Déménagement Île-de-France" className="rounded-3xl shadow-xl aspect-square object-cover" />
              </div>
              <div className="pt-12 space-y-6">
                <img src="/images/bureau-marne-transdem.webp" alt="Bureau Marne Transdem Paris" className="rounded-3xl shadow-xl aspect-[3/4] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      <GoogleReviewsSection />

      {/* CTA Final */}
      <section className="py-24 bg-brand-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Un projet de déménagement à Paris ou en Île-de-France ?</h2>
          <p className="text-white/60 mb-12 max-w-2xl mx-auto font-light">Demandez une estimation personnalisée ou contactez directement notre équipe.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/demande-de-devis" className="bg-accent text-brand-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-accent-hover transition-all flex items-center gap-3 shadow-2xl">
              Demander mon devis gratuit
              <ArrowRight size={24} />
            </Link>
            <a href="tel:0144935486" className="text-white font-bold text-2xl flex items-center gap-3 hover:text-accent transition-transform">
              <Phone size={24} className="text-accent" />
              01 44 93 54 86
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
