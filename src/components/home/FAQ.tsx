import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FAQ_ITEMS } from '../../constants';
import { ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-accent text-sm font-bold uppercase tracking-widest mb-4">FAQ déménagement</h2>
            <p className="text-3xl md:text-5xl font-bold text-brand-900 mb-6 tracking-tight">
              Questions fréquentes
            </p>
            <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
              Retrouvez toutes les informations utiles pour préparer votre déménagement avec sérénité.
            </p>
          </div>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div 
                key={index}
                className={`border rounded-2xl transition-all duration-300 ${
                  openIndex === index ? 'border-accent/30 bg-slate-50/50' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-5 md:px-8 py-5 md:py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg md:text-xl ${openIndex === index ? 'text-accent' : 'text-brand-900'}`}>
                    {item.question}
                  </span>
                  <div className={`shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-accent' : 'text-slate-300'}`}>
                    <ChevronDown className="w-5 md:w-6 h-5 md:h-6" />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-8 pb-6 md:pb-8 text-slate-600 leading-relaxed font-light text-sm md:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-400 mb-6">Vous avez une question spécifique ?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:0144935486" className="flex items-center gap-3 text-brand-900 font-bold hover:text-accent transition-colors">
                <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-accent"><Phone size={18} /></span>
                01 44 93 54 86
              </a>
              <Link to="/contact" className="btn-premium bg-brand-900 text-white px-8 py-3 rounded-full font-bold text-sm">
                Nous contacter par email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
