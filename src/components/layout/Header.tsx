import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ChevronDown, Sun, Moon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { CONTACT, NAVIGATION, SERVICES } from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';
import { trackConversion } from '../../lib/public-analytics';
import './header-premium.css';

const groups: Record<string, { ids: string[]; intro: string }> = {
  Particuliers: { ids: ['etudiant', 'senior', 'militaire', 'mutation', 'petit-volume'], intro: 'Un accompagnement adapté à votre logement et à votre situation.' },
  Entreprises: { ids: ['transfert-bureaux', 'transfert-informatique', 'transfert-industriel', 'transfert-laboratoire', 'gestion-archives'], intro: 'Préparez le transfert de vos équipes, de vos locaux et de vos équipements.' },
  Services: { ids: ['garde-meuble', 'monte-meuble', 'emballage', 'cartons', 'longue-distance', 'oeuvres-art', 'piano'], intro: 'Les moyens adaptés pour faciliter votre départ et protéger vos biens.' },
};
const menuId = (name: string) => `navigation-${name.toLowerCase()}`;

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const phone = `tel:${CONTACT.phone.replace(/\s/g, '')}`;
  const close = () => { setMobileOpen(false); setExpanded(null); setDesktopOpen(null); };

  useEffect(() => { close(); }, [pathname]);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setDesktopOpen(null);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      const focusable = Array.from<HTMLElement>(drawerRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ?? []).filter(node => node.getClientRects().length > 0);
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const media = window.matchMedia('(min-width:1200px)');
    const resize = () => { if (media.matches) close(); };
    document.addEventListener('keydown', handleKey);
    media.addEventListener('change', resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
      media.removeEventListener('change', resize);
      toggleRef.current?.focus();
    };
  }, [mobileOpen]);

  const themeButton = <button type="button" className="premium-theme" onClick={toggleTheme} aria-label="Changer de thème">{theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}</button>;
  return <>
    <header ref={headerRef} className={'premium-header' + (pathname === '/' ? ' home-site-header' : '')}>
      <div className="premium-header-inner">
        <Link to="/" className="premium-logo" onClick={close}><Logo height="h-12 md:h-14" /></Link>
        <nav className="premium-desktop-nav" aria-label="Navigation principale">
          {NAVIGATION.map(item => {
            const group = groups[item.name];
            const services = group ? SERVICES.filter(service => group.ids.includes(service.id)) : [];
            const active = pathname === item.path || services.some(service => service.path === pathname);
            return group ? <div key={item.path} className="premium-nav-group"
              onMouseEnter={() => setDesktopOpen(item.name)} onMouseLeave={() => setDesktopOpen(null)}
              onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDesktopOpen(null); }}
              onKeyDown={event => { if (event.key === 'Escape') { setDesktopOpen(null); event.currentTarget.querySelector('button')?.focus(); } }}>
              <div className={'premium-nav-pair' + (active ? ' is-active' : '')}>
                <Link to={item.path} onClick={close} aria-current={pathname === item.path ? 'page' : undefined}>{item.name}</Link>
                <button type="button" aria-label={`Afficher les solutions ${item.name.toLowerCase()}`} aria-expanded={desktopOpen === item.name} aria-controls={menuId(item.name)} onClick={() => setDesktopOpen(desktopOpen === item.name ? null : item.name)}><ChevronDown size={14} /></button>
              </div>
              {desktopOpen === item.name && <div id={menuId(item.name)} className="premium-mega">
                <div className="premium-mega-panel">
                  <div className="premium-mega-intro"><span>Marne Transdem</span><p className="premium-mega-title">{item.name}</p><p>{group.intro}</p><Link to={item.path} onClick={close}>Découvrir nos solutions <ArrowRight size={16} /></Link></div>
                  <div className="premium-mega-links">{services.map(service => <Link key={service.id} to={service.path} onClick={close} className="premium-mega-link"><span className="premium-menu-icon"><service.icon size={20} aria-hidden="true" /></span><span><strong>{service.title}</strong><span>{service.description}</span></span><ArrowRight size={15} aria-hidden="true" /></Link>)}</div>
                </div>
              </div>}
            </div> : <Link key={item.path} className={'premium-nav-direct' + (active ? ' is-active' : '')} to={item.path} onClick={close} aria-current={active ? 'page' : undefined}>{item.name}</Link>;
          })}
        </nav>
        <div className="premium-header-actions">{themeButton}<a className="premium-header-phone" href={phone} onClick={() => trackConversion('phone_click', { placement: 'header_desktop' })}><span>Conseil & devis</span>{CONTACT.phone}</a><Link className="premium-header-quote" to="/demande-de-devis" onClick={() => { trackConversion('quote_cta_click', { placement: 'header_desktop' }); close(); }}>Obtenir mon devis <ArrowRight size={16} aria-hidden="true" /></Link><button ref={toggleRef} type="button" className="premium-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu" aria-expanded={mobileOpen} aria-controls="premium-mobile-navigation"><Menu size={25} /></button></div>
      </div>
    </header>
    {mobileOpen && <div className="premium-mobile-layer"><div className="premium-mobile-backdrop" onClick={close} aria-hidden="true" /><div ref={drawerRef} id="premium-mobile-navigation" className="premium-drawer" role="dialog" aria-modal="true" aria-labelledby="premium-navigation-title">
      <div className="premium-drawer-heading"><div><span>Marne Transdem</span><h2 id="premium-navigation-title">Votre prochain départ</h2></div><button ref={closeRef} type="button" onClick={close} aria-label="Fermer la navigation"><X size={24} /></button></div>
      <nav aria-label="Navigation mobile">{NAVIGATION.map(item => {
        const group = groups[item.name]; const open = expanded === item.name;
        return <div className="premium-mobile-item" key={item.path}>{group ? <><button type="button" aria-expanded={open} aria-controls={`mobile-${menuId(item.name)}`} onClick={() => setExpanded(open ? null : item.name)}>{item.name}<ChevronDown size={18} /></button><div id={`mobile-${menuId(item.name)}`} hidden={!open} className="premium-mobile-submenu">{SERVICES.filter(service => group.ids.includes(service.id)).map(service => <Link key={service.id} to={service.path} onClick={close}><service.icon size={18} aria-hidden="true" />{service.title}</Link>)}<Link to={item.path} onClick={close} className="premium-mobile-all">Tout voir <ArrowRight size={16} /></Link></div></> : <Link to={item.path} onClick={close} aria-current={pathname === item.path ? 'page' : undefined}>{item.name}<ArrowRight size={16} aria-hidden="true" /></Link>}</div>;
      })}</nav>
      <div className="premium-drawer-contact"><span>Parlons de votre projet</span><a href={phone} onClick={() => trackConversion('phone_click', { placement: 'mobile_menu' })}><Phone size={18} />{CONTACT.phone}</a><Link to="/demande-de-devis" onClick={() => { trackConversion('quote_cta_click', { placement: 'mobile_menu' }); close(); }}>Demander un devis <ArrowRight size={18} /></Link></div>
    </div></div>}
  </>;
};
