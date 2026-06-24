import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { setAnalyticsConsent, trackEvent } from '../../lib/public-analytics';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setAnalyticsConsent('accepted');
    void trackEvent('cookie_consent_update', { consent_value: 'accepted' });
    setIsVisible(false);
  };

  const handleDecline = () => {
    setAnalyticsConsent('declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100]"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-900/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl -z-0"></div>
            
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center shrink-0">
                <Cookie className="text-brand-900" size={24} />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-brand-900 uppercase tracking-wider text-sm">Gestion des cookies</h3>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-slate-400 hover:text-brand-900 transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed">
                  Nous utilisons des cookies pour optimiser votre expérience, analyser notre trafic et améliorer nos services de déménagement.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAccept}
                    className="flex-1 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-800 transition-all shadow-lg shadow-brand-900/10 active:scale-[0.98]"
                  >
                    Tout accepter
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-[0.98]"
                  >
                    Continuer sans accepter
                  </button>
                </div>
                
                <p className="text-[10px] text-slate-400 font-medium">
                  En cliquant sur "Tout accepter", vous consentez à l'utilisation des cookies. {' '}
                  <Link to="/politique-de-confidentialite" className="text-brand-900 underline hover:text-accent transition-colors">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
