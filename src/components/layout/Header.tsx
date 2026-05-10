import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../ui/Logo';
import { CONTACT, NAVIGATION } from '../../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="shrink-0" onClick={closeMenu}>
          <Logo variant="dark" height="h-14 md:h-16" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`nav-link text-sm font-semibold transition-colors ${
                location.pathname === item.path ? 'text-brand-900 after:w-full' : 'text-slate-500 hover:text-brand-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-8">
          <div className="text-right hidden xl:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Conseil & devis</p>
            <a 
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="text-brand-900 font-bold hover:text-accent transition-all text-sm"
            >
              {CONTACT.phone}
            </a>
          </div>
          <Link 
            to="/demande-de-devis" 
            className="btn-premium bg-accent text-brand-900 px-8 py-2.5 rounded-full font-bold text-sm hover:bg-accent-hover shadow-xl flex items-center gap-2 group"
          >
            Obtenir mon devis
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-brand-900 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-brand-900/40 backdrop-blur-md z-[40]"
              onClick={closeMenu}
            ></motion.div>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl flex flex-col p-10 pt-24"
            >
              <button 
                className="absolute top-6 right-6 text-brand-900 p-2"
                onClick={closeMenu}
              >
                <X size={32} />
              </button>

              <div className="flex flex-col gap-8 overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {NAVIGATION.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link 
                        to={item.path}
                        onClick={closeMenu}
                        className={`text-2xl font-bold transition-all ${
                          location.pathname === item.path ? 'text-accent pl-4 border-l-4 border-accent' : 'text-brand-900'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto space-y-6 pt-10 border-t border-slate-100"
                >
                  <a 
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="flex flex-col gap-2 items-start"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Conseil & devis</span>
                    <span className="text-xl font-bold text-brand-900 flex items-center gap-2">
                       <Phone size={20} className="text-accent" />
                       {CONTACT.phone}
                    </span>
                  </a>
                  <Link 
                    to="/demande-de-devis" 
                    onClick={closeMenu}
                    className="btn-premium bg-accent text-white py-4 px-8 rounded-full font-bold text-center shadow-xl block"
                  >
                    Demander un devis
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
