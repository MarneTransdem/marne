import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Truck, Home, Building2, Warehouse, Box, MoveUp, Zap } from 'lucide-react';
import { SERVICES } from '../constants';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { getBreadcrumbSchema } from '../lib/schema';

const Services: React.FC = () => {
  const path = "/services";

  return (
    <div className="bg-white">
      <SEO 
        title="Nos Services de Déménagement à Paris | Marne Transdem" 
        description="Découvrez l'ensemble des services de Marne Transdem : déménagement pour particuliers et entreprises, garde-meuble, monte-meuble et emballage à Paris." 
        canonical={path}
        schema={[
          getBreadcrumbSchema([
            { name: "Accueil", item: "/" },
            { name: "Services", item: path }
          ])
        ]}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-brand-900 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            <Link to="/" className="hover:text-accent transition-colors">Accueil</Link>
            <ArrowRight size={10} />
            <span className="text-white">Services</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6 border border-white/20"
          >
            <Truck size={16} className="text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Nos expertises</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-white">
            Des services <br/>
            <span className="text-accent underline decoration-white/10 underline-offset-8">sur mesure</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            De la mise en cartons au transport d'objets lourds, Marne Transdem propose une gamme complète de services pour répondre à tous vos besoins de mobilité à Paris et en Île-de-France.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={service.path} className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-accent transition-all hover:shadow-2xl flex flex-col h-full">
                  <div className="w-16 h-16 bg-slate-50 text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                    <service.icon size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-900 mb-4">{service.title}</h2>
                  <p className="text-slate-500 font-light leading-relaxed mb-10 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                    Découvrir le service
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulas Callout */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-6">Besoin d'un accompagnement personnalisé ?</h2>
            <p className="text-slate-500 font-light text-lg mb-12">
              Découvrez nos trois formules de déménagement (Économique, Standard, Luxe) pour choisir le niveau de prestation qui vous convient le mieux.
            </p>
            <Link to="/formules-demenagement" className="inline-flex items-center gap-3 bg-brand-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-800 shadow-xl transition-all">
               Voir les formules
               <Zap size={20} className="text-accent" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-accent rounded-[3rem] p-12 lg:p-20 text-white text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
             <h2 className="text-3xl lg:text-5xl font-black mb-8 relative z-10">Un projet spécifique ?</h2>
             <p className="text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto relative z-10">
               Chaque déménagement est unique. Contactez-nous pour échanger sur vos besoins particuliers et obtenir un devis gratuit et détaillé.
             </p>
             <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <Link to="/demande-de-devis" className="bg-brand-900 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-800 transition-all shadow-xl">
                  Demander un devis
                </Link>
                <Link to="/contact" className="bg-white text-brand-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl">
                  Nous contacter
                </Link>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
