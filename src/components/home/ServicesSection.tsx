import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../constants';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Nos Solutions</h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 mb-6">
            Des services de déménagement complets et sur mesure
          </p>
          <div className="h-1.5 w-20 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="service-card group flex flex-col h-full hover:border-accent/30"
            >
              <div className="mb-10 relative">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all duration-500 ease-out shadow-sm group-hover:shadow-[0_10_25px_rgba(15,23,42,0.15)] group-hover:-rotate-6">
                  <service.icon size={32} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-brand-900 mb-4 group-hover:text-accent transition-colors duration-300 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 mb-10 leading-relaxed font-light">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <Link 
                  to={service.path}
                  className="inline-flex items-center gap-2 text-[12px] uppercase tracking-widest font-black text-brand-900 group-hover:text-accent transition-colors group/btn border-b border-transparent group-hover:border-accent/20 pb-1"
                >
                  Découvrir le service
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
          
          {/* Custom Card for Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 lg:col-span-1 bg-brand-900 rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-4">Besoin d'un conseil personnalisé ?</h3>
            <p className="text-slate-300 mb-8">
              Notre équipe est à votre disposition pour évaluer vos besoins spécifiques gratuitement.
            </p>
            <Link 
              to="/contact"
              className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-accent-hover shadow-lg transition-all"
            >
              Contactez-nous
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
