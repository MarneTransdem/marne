import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { CONTACT } from '../../constants';

export const MobileCTA: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl p-3 grid grid-cols-2 gap-3 border border-slate-100 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <a 
        href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
        className="bg-slate-100 text-brand-900 stay-dark py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm active:scale-95 transition-all shadow-md"
      >
        <Phone size={18} />
        Appeler
      </a>
      <Link 
        to="/demande-de-devis"
        className="bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-[0_10px_25px_rgba(234,179,8,0.3)] active:scale-95 transition-all"
      >
        Devis
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};
