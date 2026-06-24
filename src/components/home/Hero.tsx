import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Phone, ClipboardCheck, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT } from '../../constants';

const GoogleBadge = () => (
    <a 
      href="https://maps.app.goo.gl/mgKeWdoyH5Mpt8xJ9"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 bg-white border border-slate-100 px-5 py-2.5 rounded-2xl shadow-sm w-fit group hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" width="22" height="22" className="mr-1">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />
          ))}
        </div>
      </div>
      <div className="h-5 w-[1px] bg-slate-100"></div>
      <div className="flex flex-col">
        <span className="text-[12px] font-black text-brand-900 stay-dark group-hover:text-accent transition-colors">4.9/5</span>
        <span className="text-[9px] text-brand-900 stay-dark font-bold uppercase tracking-wider">495 avis Google</span>
      </div>
    </a>
  );

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [quickForm, setQuickForm] = useState({
    fromAddress: '',
    fromCity: '',
    fromZip: '',
    toAddress: '',
    toCity: '',
    toZip: '',
    volume: ''
  });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickForm.fromAddress) params.set('fromAddress', quickForm.fromAddress);
    if (quickForm.fromCity) params.set('fromCity', quickForm.fromCity);
    if (quickForm.fromZip) params.set('fromZip', quickForm.fromZip);
    if (quickForm.toAddress) params.set('toAddress', quickForm.toAddress);
    if (quickForm.toCity) params.set('toCity', quickForm.toCity);
    if (quickForm.toZip) params.set('toZip', quickForm.toZip);
    if (quickForm.volume) params.set('volume', quickForm.volume);
    
    navigate(`/demande-de-devis?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 pt-40 md:pt-48 pb-20 md:pb-24 overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 text-brand-900 dark:text-accent px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em]">
                  <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                  Paris & Île-de-France
                </div>
                <GoogleBadge />
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-900 dark:text-white leading-[1.1] mb-6 tracking-tight italic uppercase">
                Entreprise de<br/>
                <span className="text-accent underline decoration-brand-900/10 dark:decoration-white/10 underline-offset-8">déménagement à Paris</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 md:mb-12 max-w-xl leading-relaxed font-light italic">
                Marne Transdem accompagne les particuliers et les entreprises pour leurs déménagements à Paris, en Île-de-France et partout en France.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                <Link 
                  to="/demande-de-devis" 
                  className="btn-premium bg-brand-900 text-white px-8 py-5 rounded-full font-bold text-lg hover:bg-brand-800 shadow-xl flex items-center justify-center gap-3 group"
                >
                  Demander un devis
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="btn-premium bg-white text-brand-900 stay-dark border border-slate-200 px-8 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                >
                  <Phone size={20} className="text-accent" />
                  Appeler
                </a>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative lg:block"
            >
              <div className="relative z-10 p-1 bg-gradient-to-br from-slate-200 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] md:rounded-[3rem] shadow-premium max-w-lg mx-auto lg:max-w-none">
                 <div className="bg-white rounded-[2.4rem] md:rounded-[2.9rem] p-8 md:p-10 py-10 md:py-12">
                    <h2 className="text-2xl font-bold text-brand-900 stay-dark mb-2 tracking-tight italic uppercase">Estimation rapide</h2>
                    <p className="text-sm text-slate-500 stay-dark mb-8 font-light italic opacity-70">Recevez une première étude personnalisée.</p>
                    
                    <form onSubmit={handleQuickSubmit} className="space-y-5">
                      <div className="space-y-1.5 font-sans italic">
                        <label className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Départ</label>
                        <input 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none placeholder:text-slate-300 focus:border-accent transition-colors text-brand-900 stay-dark" 
                          placeholder="Adresse de départ" 
                          value={quickForm.fromAddress}
                          onChange={(e) => setQuickForm(prev => ({ ...prev, fromAddress: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5 font-sans italic">
                        <label className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Arrivée</label>
                        <input 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm outline-none placeholder:text-slate-300 focus:border-accent transition-colors text-brand-900 stay-dark" 
                          placeholder="Adresse d'arrivée" 
                          value={quickForm.toAddress}
                          onChange={(e) => setQuickForm(prev => ({ ...prev, toAddress: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1.5 font-sans italic">
                        <label className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest ml-1">Volume (m³)</label>
                        <div className="grid grid-cols-4 gap-3">
                          {['15', '30', '50', '+'].map(v => (
                            <button 
                              key={v}
                              type="button"
                              onClick={() => setQuickForm(prev => ({ ...prev, volume: v === '+' ? '60' : v }))}
                              className={`rounded-xl py-2 flex items-center justify-center text-xs font-bold transition-all ${
                                (quickForm.volume === v || (v === '+' && quickForm.volume === '60'))
                                  ? 'bg-accent text-brand-900 stay-dark border-accent' 
                                  : 'bg-slate-100 border border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700'
                              }`}
                            >
                              {v === '+' ? '60+' : v}
                            </button>
                          ))}
                        </div>
                      </div>
  
                      <button type="submit" className="w-full mt-10 bg-accent text-brand-900 stay-dark py-5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 active:scale-[0.98] uppercase italic text-sm tracking-widest">
                        Demander mon devis gratuit
                        <ArrowRight size={20} />
                      </button>
                    </form>
  
                    <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest italic">Réponse rapide</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };
