import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT } from '../../constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10"></div>
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              Paris & Île-de-France
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-900 leading-[1.1] mb-6 tracking-tight">
              Entreprise de<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-800 font-black">déménagement à Paris</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 md:mb-12 max-w-xl leading-relaxed font-light">
              Marne Transdem accompagne les particuliers et les entreprises pour leurs déménagements à Paris, en Île-de-France et partout en France.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-16">
              <Link 
                to="/demande-de-devis" 
                className="btn-premium bg-accent text-brand-900 px-8 py-5 rounded-full font-bold text-lg hover:bg-accent-hover shadow-[0_20px_50px_rgba(245,164,0,0.2)] flex items-center justify-center gap-3 group"
              >
                Demander un devis
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="btn-premium bg-white text-brand-900 border border-slate-200 px-8 py-5 rounded-full font-bold text-lg hover:bg-brand-900 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <Phone size={20} className="text-accent group-hover:text-white" />
                Appeler
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:block"
          >
            <div className="relative z-10 p-1 bg-gradient-to-br from-slate-200 to-slate-50 rounded-[2.5rem] md:rounded-[3rem] shadow-premium max-w-lg mx-auto lg:max-w-none">
               <div className="bg-white rounded-[2.4rem] md:rounded-[2.9rem] p-8 md:p-10 py-10 md:py-12">
                  <h3 className="text-2xl font-bold text-brand-900 mb-2 tracking-tight">Estimation rapide</h3>
                  <p className="text-sm text-slate-400 mb-8 font-light">Recevez une première étude personnalisée.</p>
                  
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Départ</label>
                      <input disabled className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none placeholder:text-slate-300" placeholder="Ville ou Code Postal" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Arrivée</label>
                      <input disabled className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none placeholder:text-slate-300" placeholder="Ville ou Code Postal" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Volume (m³)</label>
                      <div className="grid grid-cols-4 gap-3">
                        {['15', '30', '50', '+'].map(v => (
                          <div key={v} className="bg-slate-50 border border-slate-100 rounded-xl py-2 flex items-center justify-center text-xs font-bold text-slate-400">{v}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link to="/demande-de-devis" className="w-full mt-10 bg-accent text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
                    Demander mon devis gratuit
                    <ArrowRight size={20} />
                  </Link>

                  <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Réponse rapide</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
