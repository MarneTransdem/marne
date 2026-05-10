import React from 'react';
import { motion } from 'motion/react';
import { Hero } from '../components/home/Hero';
import { ReassuranceBar } from '../components/home/ReassuranceBar';
import { ServicesSection } from '../components/home/ServicesSection';
import { FAQ } from '../components/home/FAQ';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Quote, Phone, ShieldCheck } from 'lucide-react';
import { FORMULAS, FAQ_ITEMS } from '../constants';
import { SEO } from '../components/SEO';
import { getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from '../lib/schema';

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Entreprise de déménagement à Paris 20e | Marne Transdem" 
        description="Besoin d'un déménageur à Paris ? Marne Transdem propose des services de déménagement pour particuliers et entreprises en Île-de-France. Devis gratuit & Garde-meuble."
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
      <section className="py-24 bg-brand-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-accent font-bold uppercase text-sm mb-4 tracking-widest">L'Organisation Marne Transdem</h2>
              <p className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">Pourquoi nous confier votre projet ?</p>
              
              <div className="space-y-10">
                {[
                   { t: "Expertise locale", d: "Paris, accès, stationnement et contraintes d’immeuble." },
                   { t: "Organisation claire", d: "Un déroulement préparé étape par étape." },
                   { t: "Protection soignée", d: "Meubles et objets fragiles protégés avec attention." },
                   { t: "Planning clair", d: "Une organisation pensée pour limiter les imprévus." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accent">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white">{item.t}</h4>
                      <p className="text-slate-400 font-light leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border-8 border-white/5 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Équipe professionnelle Marne Transdem pour déménagement à Paris" 
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-accent p-10 rounded-3xl shadow-2xl hidden md:block">
                <p className="text-3xl font-black mb-1">Organisation</p>
                <p className="font-bold text-xs uppercase tracking-widest text-brand-900 leading-tight">Méthode professionnelle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section - Refactored */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-50 rounded-[40px] p-12 md:p-20 border border-slate-100 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-900 mb-6 font-sans tracking-tight">Zones d'intervention</h2>
              <p className="text-slate-600 text-lg mb-10 font-light leading-relaxed">
                Basés à <span className="font-bold text-brand-900">Paris 20e</span>, nous intervenons dans toute l’Île-de-France et accompagnons également les déménagements longue distance depuis Paris.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { name: 'Paris 20e', path: '/demenagement-paris-20' },
                  { name: 'Paris 11e', path: '/demenagement-paris-11' },
                  { name: 'Paris 12e', path: '/demenagement-paris-12' },
                  { name: 'Paris 13e', path: '/demenagement-paris-13' },
                  { name: 'Paris 14e', path: '/demenagement-paris-14' },
                  { name: 'Paris 15e', path: '/demenagement-paris-15' },
                  { name: 'Paris 16e', path: '/demenagement-paris-16' },
                  { name: 'Paris 17e', path: '/demenagement-paris-17' },
                  { name: 'Paris 18e', path: '/demenagement-paris-18' },
                  { name: 'Paris 19e', path: '/demenagement-paris-19' },
                  { name: 'Montreuil', path: '/demenagement-montreuil' },
                  { name: 'Vincennes', path: '/demenagement-vincennes' },
                  { name: 'Saint-Mandé', path: '/demenagement-saint-mande' },
                  { name: 'Bagnolet', path: '/demenagement-bagnolet' },
                  { name: 'Île-de-France', path: '/demenagement-ile-de-france' }
                ].map((zone) => (
                  <Link key={zone.name} to={zone.path} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/50 shadow-sm transition-all hover:border-accent/30 hover:shadow-md">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full shrink-0"></div>
                    <span className="text-sm font-bold text-brand-900">{zone.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=400" alt="Zone d'intervention déménagement Paris" className="rounded-2xl shadow-lg h-48 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&q=80&w=400" alt="Déménagement Tour Eiffel Paris" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
              </div>
              <div className="pt-8 space-y-4">
                <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400" alt="Vue de Paris déménagement Île-de-France" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1550340499-a6c60bb828a1?auto=format&fit=crop&q=80&w=400" alt="Rues de Paris pour déménageurs" className="rounded-2xl shadow-lg h-48 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

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
