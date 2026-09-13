import React from 'react';
import '../styles/home-premium.css';
import '../styles/home-editorial.css';
import { motion } from 'motion/react';
import { Hero } from '../components/home/Hero';
import { ReassuranceBar } from '../components/home/ReassuranceBar';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProjectGateway } from '../components/home/ProjectGateway';
import { QuotePreparation } from '../components/home/QuotePreparation';
import { Link } from 'react-router-dom';

const GoogleReviewsSection = React.lazy(() => import('../components/home/GoogleReviews').then(m => ({ default: m.GoogleReviewsSection })));
const FAQ = React.lazy(() => import('../components/home/FAQ').then(m => ({ default: m.FAQ })));
import { ArrowRight, CheckCircle, Quote, Phone, ShieldCheck, MapPin, Check } from 'lucide-react';
import { FORMULAS, FAQ_ITEMS, CONTACT } from '../constants';
import { SEO } from '../components/SEO';
import { getOrganizationSchema, getLocalBusinessSchema, getFAQSchema } from '../lib/schema';

const DeferredGoogleReviews: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (shouldRender) return;
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { rootMargin: '700px 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={ref}>
      {shouldRender ? (
        <React.Suspense fallback={<div className="py-24 text-center bg-white dark:bg-slate-950"><span className="text-slate-400 animate-pulse font-light text-sm italic">Chargement des avis clients...</span></div>}>
          <GoogleReviewsSection />
        </React.Suspense>
      ) : (
        <div className="h-24 bg-white dark:bg-slate-950" aria-hidden="true" />
      )}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="home-premium">
      <SEO 
        title="Déménagement Paris et Île-de-France | Marne Transdem"
        description="Appartement, maison ou bureaux : déménagez à Paris et en Île-de-France avec Marne Transdem. Comparez nos formules et demandez votre devis gratuit et personnalisé."
        canonical="/"
        schema={[
          getOrganizationSchema(), 
          getLocalBusinessSchema(),
          getFAQSchema(FAQ_ITEMS.map(i => ({ q: i.question, a: i.answer })))
        ]}
      />
      
      <Hero />
      <ReassuranceBar />
      <ProjectGateway />
      <ServicesSection />
      <QuotePreparation />

      {/* Formulas Section */}
      <section id="nos-formules" className="home-formulas py-24 stay-light-section transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-900 mb-4 stay-dark">Nos Formules de Déménagement</h2>
            <p className="text-slate-600 max-w-2xl mx-auto stay-dark font-light">Choisissez le niveau d'accompagnement adapté à vos besoins.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FORMULAS.map((formula, idx) => (
              <motion.div 
                key={formula.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`stay-white-bg rounded-2xl p-8 border ${formula.popular ? 'border-accent ring-4 ring-accent/5 ' : 'border-slate-100'} relative shadow-premium flex flex-col ${formula.popular ? 'z-10 bg-slate-50/20' : ''}`}
              >
                {formula.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-brand-900 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    Formule Équilibrée
                  </div>
                )}
                <p className="home-formula-number" aria-hidden="true">0{idx + 1}</p><h3 className="text-2xl font-bold text-brand-900 mb-2 tracking-tight stay-dark">{formula.name}</h3>
                <p className="text-sm text-slate-500 mb-6 min-h-[40px] italic stay-dark opacity-70">{formula.description}</p>
                <div className="space-y-4 mb-10 flex-grow">
                  {formula.features.map(feature => (
                    <div key={feature} className="flex items-start gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full border-2 border-accent bg-accent/10 flex items-center justify-center mt-0.5 shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                      </div>
                      <span className="text-sm text-brand-900 font-medium stay-dark leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  to={`/demande-de-devis?formula=${['economique', 'standard', 'luxe'][idx]}`}
                  className={`w-full py-4 rounded-xl flex items-center justify-center font-bold transition-all ${
                    formula.popular ? 'bg-accent text-brand-900 stay-dark hover:bg-accent-hover shadow-lg' : 'bg-slate-100 text-brand-900 stay-dark hover:bg-slate-200'
                  }`}
                >
                  Choisir la formule {formula.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="home-trust py-24 bg-brand-900 text-white overflow-hidden relative font-sans italic">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-4">
                  <p className="text-accent font-black uppercase text-xs tracking-[0.3em] mb-4">L'exigence Marne Transdem</p>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter uppercase italic">
                    Pourquoi nous <br/>
                    <span className="text-accent underline decoration-white/10 underline-offset-8 italic">faire confiance ?</span>
                  </h2>
               </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                {[
                   { t: "Expertise Urbaine", d: "Maîtrise des accès complexes à Paris et sa région." },
                   { t: "Prestations définies ensemble", d: "Emballage, démontage et remontage précisés dans votre devis." },
                   { t: "Protection des biens", d: "Protections adaptées et assurance selon les conditions contractuelles." },
                   { t: "Ponctualité Rigoureuse", d: "Le respect de vos délais est notre priorité absolue." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4 group">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-brand-900 transition-all duration-500">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2 text-white uppercase italic tracking-tight">{item.t}</h3>
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
                    src="/images/societe-demenagement-paris.webp" 
                    alt="Déménageur professionnel Paris" 
                    width="600"
                    height="800"
                    loading="lazy"
                    decoding="async"
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
      <section className="home-areas py-24 bg-white font-sans italic transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="stay-light-section rounded-3xl md:rounded-[4rem] p-6 md:p-12 xl:p-20 border border-slate-100 flex flex-col lg:flex-row gap-20 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
            
            <div className="lg:w-7/12 relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-brand-900 stay-dark mb-8 tracking-tighter uppercase italic">Zones <br/><span className="text-accent italic underline decoration-accent/10 underline-offset-8 transition-all font-sans italic">d'intervention</span></h2>
              <p className="text-slate-500 text-lg mb-12 font-light italic leading-relaxed max-w-2xl stay-dark opacity-70">
                De notre base au <span className="font-bold text-slate-700 stay-dark">coeur de Paris 20e</span>, nous couvrons un large territoire pour vos mobilités.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Paris : tous les arrondissements', path: '/secteurs-desservis', m: true },
                  { name: 'Paris 20e', path: '/demenagement-paris-20', m: true },
                  { name: 'Val-de-Marne', path: '/demenagement-val-de-marne', m: true },
                  { name: 'Seine-Saint-Denis', path: '/demenagement-seine-saint-denis', m: true },
                  { name: 'Hauts-de-Seine', path: '/demenagement-hauts-de-seine', m: true },
                  { name: 'Seine-et-Marne', path: '/demenagement-seine-et-marne', m: true },
                  { name: 'Yvelines', path: '/demenagement-yvelines', m: true },
                  { name: 'Essonne', path: '/demenagement-essonne', m: true },
                  { name: 'Val-d’Oise', path: '/demenagement-val-d-oise', m: true }
                ].map((zone) => (
                  <Link key={zone.name} to={zone.path} className="flex flex-col items-center justify-center p-4 stay-white-bg rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-accent hover:shadow-xl group h-full">
                    <MapPin size={18} className={`${zone.m ? 'text-accent' : 'text-slate-200'} group-hover:text-accent transition-colors mb-3`} />
                    <span className="text-sm font-semibold text-brand-900 stay-dark text-center">{zone.name}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-12">
                 <Link to="/secteurs-desservis" className="text-brand-900 stay-dark font-black uppercase text-xs tracking-[0.3em] flex items-center gap-3 hover:gap-5 transition-all group">
                    Voir tous nos secteurs <ArrowRight size={18} className="text-accent" />
                 </Link>
              </div>
            </div>

            <div className="lg:w-5/12 grid grid-cols-2 gap-6 relative order-first lg:order-last">
              <div className="space-y-6">
                <img src="/images/demenagement-paris.webp" width="600" height="800" loading="lazy" decoding="async" alt="Déménagement professionnel Paris et Paris 20e" className="rounded-3xl shadow-xl aspect-[3/4] object-cover grayscale-[30%]" />
                <img src="/images/demenagement-ile-de-france.webp" width="600" height="600" loading="lazy" decoding="async" alt="Déménagement en Île-de-France et banlieue parisienne" className="rounded-3xl shadow-xl aspect-square object-cover" />
              </div>
              <div className="pt-12 space-y-6">
                <img src="/images/demenagement-longue-distance.webp" width="600" height="800" loading="lazy" decoding="async" alt="Déménagement longue distance au départ de Paris vers toute la France" className="rounded-3xl shadow-xl aspect-[3/4] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <React.Suspense fallback={<div className="py-24 text-center bg-white dark:bg-slate-950"><span className="text-slate-400 animate-pulse font-light text-sm italic">Chargement des questions fréquentes...</span></div>}>
        <FAQ />
      </React.Suspense>

      {/* Advice Teaser Section */}
      <section className="home-advice py-24 bg-white dark:bg-slate-950 overflow-hidden relative font-sans italic transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
               <div className="absolute -inset-10 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
               <div className="relative bg-brand-900 rounded-[3rem] p-4 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="/images/preparation-demenagement.webp" 
                    alt="Préparation de déménagement à Paris : cartons, emballage et checklist Marne Transdem" 
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                    className="rounded-[2.5rem] w-full aspect-video object-cover"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-accent p-8 rounded-[2rem] shadow-xl border-4 border-white dark:border-slate-800 hidden md:block">
                     <CheckCircle size={40} className="text-brand-900" />
                  </div>
               </div>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
               <div className="space-y-4">
                  <h2 className="text-amber-800 dark:text-accent font-black uppercase text-xs tracking-[0.3em] mb-4">Experts à vos côtés</h2>
                  <p className="text-4xl md:text-6xl font-black text-brand-900 dark:text-white mb-8 leading-[1.1] tracking-tighter uppercase italic">
                    Préparez votre <br/>
                    <span className="text-amber-800 dark:text-accent underline decoration-brand-900/10 dark:decoration-white/10 underline-offset-8 italic">départ sereinement</span>
                  </p>
               </div>
               
               <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
                  Préparez les étapes de votre projet : budget, volume à transporter, protection des objets et démarches avant le départ.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: 'Estimer le prix du déménagement', path: '/blog/combien-coute-demenagement-paris' },
                    { label: 'Préparer les objets fragiles', path: '/emballage-protection-demenagement' },
                    { label: 'Organiser les formalités', path: '/blog/formalites-administratives-demenagement' },
                    { label: 'Planifier les étapes du départ', path: '/blog/10-conseils-demenagement-sans-stress-paris' }
                  ].map((tip, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <CheckCircle size={18} className="text-accent shrink-0" />
                       <Link to={tip.path} className="text-brand-900 dark:text-slate-200 font-bold text-sm underline underline-offset-4 hover:text-amber-800">{tip.label}</Link>
                    </div>
                  ))}
               </div>

               <Link to="/blog" className="inline-flex items-center gap-4 bg-brand-900 dark:bg-accent dark:text-brand-900 text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-brand-800 transition-all shadow-xl group">
                  Accéder à nos conseils <ArrowRight size={20} className="text-accent group-hover:translate-x-2 transition-transform dark:text-brand-900" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      <DeferredGoogleReviews />

      {/* CTA Final */}
      <section className="home-final py-24 bg-white dark:bg-slate-950 relative overflow-hidden font-sans italic transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="home-contact-panel bg-slate-50 stay-light-section rounded-[3rem] md:rounded-[4rem] p-12 md:p-20 border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
<figure className="home-office-photo"><picture><source srcSet="/images/bureau-marne-transdem.avif" type="image/avif" /><img src="/images/bureau-marne-transdem.webp" width="1360" height="1020" loading="lazy" decoding="async" alt="La façade de l’agence Marne Transdem, rue des Maraîchers à Paris" /></picture><figcaption>Rencontrons-nous à Paris 20e.</figcaption></figure>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none z-0"></div>
            
            <div className="home-contact-copy relative z-10">
              <p className="home-eyebrow">Parlons de votre prochain départ</p>
              <h2 className="text-3xl md:text-5xl font-black text-brand-900 stay-dark mb-6 tracking-tighter uppercase italic">Un projet de déménagement <br/> à Paris ou en Île-de-France ?</h2>
              <p className="text-slate-500 stay-dark mb-12 max-w-2xl mx-auto font-light italic text-lg opacity-80">Demandez une estimation personnalisée ou contactez directement notre équipe.</p><address className="home-office-address">43 rue des Maraîchers, 75020 Paris<br /><span>Accueil au bureau et téléphone : lun.–ven. 9 h–19 h · sam. 10 h–16 h</span></address>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/demande-de-devis" className="bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-brand-800 transition-all flex items-center gap-3 shadow-xl group">
                  Demander mon devis gratuit
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform text-accent" />
                </Link>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-brand-900 stay-dark font-bold text-2xl flex items-center gap-3 hover:text-accent transition-colors">
                  <Phone size={24} className="text-accent" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
