import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ChevronDown, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../ui/Logo';
import { CONTACT, NAVIGATION, SERVICES } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isParticuliersOpen, setIsParticuliersOpen] = useState(false);
  const [isEntreprisesOpen, setIsEntreprisesOpen] = useState(false);
  
  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
    setIsParticuliersOpen(false);
    setIsEntreprisesOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobileExpanded = (name: string) => {
    setMobileExpanded(mobileExpanded === name ? null : name);
  };

  const PARTICULIERS_SERVICES = ['etudiant', 'senior', 'militaire', 'mutation', 'petit-volume'];
  const ENTREPRISE_SERVICES = ['transfert-bureaux', 'transfert-informatique', 'transfert-industriel', 'transfert-laboratoire', 'gestion-archives'];
  const TECHNICAL_SERVICES = ['garde-meuble', 'monte-meuble', 'emballage', 'cartons', 'longue-distance', 'oeuvres-art', 'piano'];
  
  const OTHER_SERVICES = SERVICES.filter(s => TECHNICAL_SERVICES.includes(s.id));
  const INDIVIDUAL_SERVICES = SERVICES.filter(s => PARTICULIERS_SERVICES.includes(s.id));
  const PRO_SERVICES = SERVICES.filter(s => ENTREPRISE_SERVICES.includes(s.id));

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3' : `bg-transparent pt-5 ${location.pathname === '/' ? 'pb-5 md:py-8' : 'pb-8 md:pt-8 md:pb-12'}`
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="shrink-0" onClick={closeMenu}>
            <Logo height="h-14 md:h-16" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAVIGATION.map((item) => {
              if (item.name === 'Services' || item.name === 'Particuliers' || item.name === 'Entreprises') {
                const isOpen = 
                  item.name === 'Services' ? isServicesOpen : 
                  item.name === 'Particuliers' ? isParticuliersOpen : 
                  isEntreprisesOpen;
                
                const setIsOpenDropdown = 
                  item.name === 'Services' ? setIsServicesOpen : 
                  item.name === 'Particuliers' ? setIsParticuliersOpen : 
                  setIsEntreprisesOpen;
                
                const servicesToShow = 
                  item.name === 'Services' ? OTHER_SERVICES : 
                  item.name === 'Particuliers' ? INDIVIDUAL_SERVICES : 
                  PRO_SERVICES;

                return (
                  <div 
                    key={item.path}
                    className="relative group"
                    onMouseEnter={() => setIsOpenDropdown(true)}
                    onMouseLeave={() => setIsOpenDropdown(false)}
                  >
                    <Link 
                      to={item.path}
                      className={`nav-link text-sm font-semibold transition-colors flex items-center gap-1 ${
                        location.pathname.startsWith(item.path) || 
                        servicesToShow.some(s => location.pathname === s.path)
                          ? 'text-accent after:w-full' 
                          : (isScrolled || theme === 'light' ? 'text-slate-600 dark:text-slate-400' : 'text-slate-300') + ' hover:text-accent'
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </Link>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 pointer-events-auto ${item.name === 'Services' ? 'w-[900px]' : 'w-[750px]'}`}
                        >
                          <div className={`bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden p-8 grid gap-x-6 gap-y-4 ${item.name === 'Services' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            {servicesToShow.map((service) => (
                              <Link
                                key={service.id}
                                to={service.path}
                                onClick={() => setIsOpenDropdown(false)}
                                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group/item"
                              >
                                <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-brand-900 dark:text-white group-hover/item:bg-accent transition-colors shrink-0">
                                  <service.icon size={16} />
                                </div>
                                <div>
                                  <h4 className="text-[11px] font-bold text-brand-900 dark:text-white mb-0.5 line-clamp-1">{service.title}</h4>
                                  <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-1">{service.description}</p>
                                </div>
                              </Link>
                            ))}
                            <div className={`mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center ${item.name === 'Services' ? 'col-span-3' : 'col-span-2'}`}>
                              <Link 
                                to={item.path} 
                                onClick={() => setIsOpenDropdown(false)}
                                className="text-xs font-bold text-accent hover:text-brand-900 dark:hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest"
                              >
                                {item.name === 'Services' ? 'Tous nos services techniques' : `Toutes nos solutions ${item.name.toLowerCase()}`} <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`nav-link text-sm font-semibold transition-colors ${
                    location.pathname === item.path 
                      ? 'text-accent after:w-full' 
                      : (isScrolled || theme === 'light' ? 'text-slate-600 dark:text-slate-400' : 'text-slate-300') + ' hover:text-accent'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                isScrolled || theme === 'light'
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700' 
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              aria-label="Changer de thème"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="text-right hidden xl:block">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Conseil & devis</p>
              <a 
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="font-bold hover:text-accent transition-all text-sm text-brand-900 stay-dark"
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

          {/* Mobile Menu Toggle & Theme */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' 
                  : 'bg-white/10 text-white'
              }`}
              aria-label="Changer de thème"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              className={`p-2 transition-colors ${isScrolled || theme === 'light' ? 'text-brand-900 dark:text-white' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Move outside the header element to avoid stacking context issues with backdrop-blur */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-brand-900/40 backdrop-blur-md z-[60]"
              onClick={closeMenu}
            ></motion.div>
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 z-[70] shadow-2xl flex flex-col p-10 pt-24"
            >
              <button 
                className="absolute top-6 right-6 text-brand-900 dark:text-white p-2"
                onClick={closeMenu}
              >
                <X size={32} />
              </button>

              <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-2 -mr-2">
                <div className="flex flex-col gap-6">
                  {NAVIGATION.map((item, index) => {
                    const hasSubmenu = item.name === 'Services' || item.name === 'Particuliers' || item.name === 'Entreprises';
                    const isExpanded = mobileExpanded === item.name;

                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        {hasSubmenu ? (
                          <button 
                            onClick={() => toggleMobileExpanded(item.name)}
                            className={`w-full flex items-center justify-between text-2xl font-bold transition-all ${
                              location.pathname.startsWith(item.path) ? 'text-accent pl-4 border-l-4 border-accent' : 'text-black'
                            }`}
                          >
                            {item.name}
                            <ChevronDown size={24} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        ) : (
                          <Link 
                            to={item.path}
                            onClick={closeMenu}
                            className={`text-2xl font-bold transition-all block ${
                              location.pathname === item.path ? 'text-accent pl-4 border-l-4 border-accent' : 'text-black'
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                        
                        {hasSubmenu && (
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 ml-4 flex flex-col gap-3 border-l border-slate-100 dark:border-slate-800 pl-4 pb-2">
                                  {(
                                    item.name === 'Services' ? OTHER_SERVICES : 
                                    item.name === 'Particuliers' ? INDIVIDUAL_SERVICES : 
                                    PRO_SERVICES
                                  ).map((s) => (
                                    <Link 
                                      key={s.id} 
                                      to={s.path} 
                                      onClick={closeMenu}
                                      className="text-base font-medium text-black hover:text-accent transition-colors flex items-center gap-3 py-1"
                                    >
                                      <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg text-brand-900 dark:text-white">
                                        <s.icon size={16} />
                                      </div>
                                      {s.title}
                                    </Link>
                                  ))}
                                  <Link 
                                    to={item.path} 
                                    onClick={closeMenu}
                                    className="text-sm font-bold text-accent hover:text-brand-900 dark:hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest mt-2"
                                  >
                                    Tout voir <ArrowRight size={14} />
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto space-y-6 pt-10 border-t border-slate-100 dark:border-slate-800"
                >
                  <a 
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="flex flex-col gap-2 items-start"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Conseil & devis</span>
                    <span className="text-xl font-bold text-black flex items-center gap-2">
                       <Phone size={20} className="text-accent" />
                       {CONTACT.phone}
                    </span>
                  </a>
                  <Link 
                    to="/demande-de-devis" 
                    onClick={closeMenu}
                    className="btn-premium bg-brand-900 dark:bg-accent dark:text-brand-900 text-white py-4 px-8 rounded-full font-bold text-center shadow-xl block"
                  >
                    Demander un devis
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

