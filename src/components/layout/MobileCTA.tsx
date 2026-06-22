import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACT } from '../../constants';

export const MobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mettre en évidence la barre d'action mobile après le défilement du Hero initial (300px)
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-[0_20px_50px_rgba(6,26,51,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[20px] p-3.5 grid grid-cols-2 gap-3.5 border border-slate-100/80 dark:border-slate-800/80"
        >
          <a 
            href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
            className="bg-slate-100 dark:bg-slate-800 text-brand-900 dark:text-slate-100 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 text-xs uppercase tracking-widest active:scale-95 transition-all shadow-sm"
          >
            <Phone size={16} className="text-accent" />
            Appeler
          </a>
          <Link 
            to="/demande-de-devis"
            className="bg-accent text-brand-900 stay-dark py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 text-xs uppercase tracking-widest shadow-[0_10px_25px_rgba(245,164,0,0.25)] active:scale-95 transition-all"
          >
            Devis Gratuit
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
