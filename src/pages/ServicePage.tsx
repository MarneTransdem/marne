import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES, CONTACT } from '../constants';
import { SEO } from '../components/SEO';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const ServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id) || SERVICES[0];

  return (
    <div className="bg-white">
      <SEO 
        title={service.title} 
        description={`${service.description} Marne Transdem à Paris et Île-de-France. Expertise et soin de vos biens.`}
      />
      
      {/* Header Service */}
      <section className="bg-brand-900 text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/" className="text-accent font-bold text-sm uppercase tracking-widest mb-6 inline-block hover:underline">← Accueil</Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{service.title}</h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              {service.description} Marne Transdem s’adapte à toutes les configurations pour vous offrir un service irréprochable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/devis" className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-accent-hover transition-all">
                Devis personnalisé
              </Link>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <Phone size={18} />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="rounded-[40px] overflow-hidden shadow-2xl">
                 <img 
                  src="/images/demenagement-ile-de-france.webp" 
                  alt={service.title} 
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-900 rounded-full flex flex-col items-center justify-center p-8 text-center text-white font-bold leading-tight shadow-xl">
                 <span className="text-accent text-3xl mb-1">MT</span>
                 <span className="text-xs uppercase tracking-widest">Service de Qualité</span>
              </div>
            </div>

            <div className="lg:w-1/2 lg:pl-10">
              <h2 className="text-3xl font-bold text-brand-900 mb-8">Pourquoi choisir Marne Transdem pour votre {service.title.toLowerCase()} ?</h2>
              <div className="space-y-6">
                {[
                  "Un accompagnement dédié pour chaque étape de votre projet.",
                  "Utilisation de matériel de protection adapté à vos meubles.",
                  "Organisation structurée pour respecter vos contraintes.",
                  "Devis clair et transparent sans frais cachés.",
                  "Protection soignée des parties communes lors du passage.",
                  "Conseils personnalisés pour préparer vos cartons."
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-slate-700"
                  >
                    <CheckCircle2 className="text-accent shrink-0" />
                    <span className="font-medium text-lg leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-bold text-lg text-brand-900 mb-4 italic">"Notre priorité : le respect de vos biens et de votre tranquillité."</h4>
                <p className="text-sm text-slate-500">— La direction de Marne Transdem</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-brand-900 mb-12 text-center">Nos autres prestations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {SERVICES.filter(s => s.id !== id).slice(0, 4).map(s => (
               <Link 
                key={s.id} 
                to={s.path}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
               >
                 <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                    <s.icon size={32} />
                 </div>
                 <h4 className="font-bold text-brand-900 text-lg mb-2">{s.title}</h4>
                 <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>
                 <div className="mt-4 flex items-center gap-2 text-accent font-bold text-xs">
                   En savoir plus <ArrowRight size={14} />
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
