import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { CONTACT, NAVIGATION, SERVICES } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-4 lg:gap-16 mb-20 text-center sm:text-left">
          {/* Brand Col - Logo + Description */}
          <div className="space-y-8 flex flex-col items-center sm:items-start order-1">
            <Link to="/">
              <Logo variant="light" height="h-14" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light max-w-sm mx-auto md:mx-0 px-4 sm:px-0 mt-4">
              Déménagement à Paris. Un accompagnement professionnel pour tous vos projets de mobilité au cœur de l'Île-de-France.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all"><Instagram size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all"><Facebook size={18} /></a>
               <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Services Col */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left order-2 sm:order-2 lg:order-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 lg:mb-10 text-white/40">Services</h4>
            <ul className="space-y-5 text-slate-400 font-medium text-sm">
              {SERVICES.map(service => (
                <li key={service.id}>
                  <Link to={service.path} className="hover:text-accent transition-colors block">{service.title}</Link>
                </li>
              ))}
              <li><Link to="/formules-demenagement" className="hover:text-accent transition-colors block">Nos Formules de Déménagement</Link></li>
            </ul>
          </div>

          {/* Info Col */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left order-3 sm:order-3 lg:order-3">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 lg:mb-10 text-white/40">Informations</h4>
            <ul className="space-y-5 text-slate-400 font-medium text-sm">
              <li><Link to="/a-propos" className="hover:text-accent transition-colors block">Qui sommes-nous</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors block">Contactez-nous</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors block">Conseils Déménagement</Link></li>
              <li><Link to="/demande-de-devis" className="hover:text-accent transition-colors block">Demande de devis</Link></li>
              <li><Link to="/calculateur-volume" className="hover:text-accent font-bold transition-colors block">Calculateur de volume</Link></li>
              <li className="pt-4 border-t border-slate-800">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-4">Secteurs Paris</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <Link to="/demenagement-paris-20" className="hover:text-accent transition-colors text-xs">Paris 20e</Link>
                  <Link to="/demenagement-paris-11" className="hover:text-accent transition-colors text-xs">Paris 11e</Link>
                  <Link to="/demenagement-paris-12" className="hover:text-accent transition-colors text-xs">Paris 12e</Link>
                  <Link to="/demenagement-paris-13" className="hover:text-accent transition-colors text-xs">Paris 13e</Link>
                  <Link to="/demenagement-paris-14" className="hover:text-accent transition-colors text-xs">Paris 14e</Link>
                  <Link to="/demenagement-paris-15" className="hover:text-accent transition-colors text-xs">Paris 15e</Link>
                  <Link to="/demenagement-paris-16" className="hover:text-accent transition-colors text-xs">Paris 16e</Link>
                  <Link to="/demenagement-paris-17" className="hover:text-accent transition-colors text-xs">Paris 17e</Link>
                  <Link to="/demenagement-paris-18" className="hover:text-accent transition-colors text-xs">Paris 18e</Link>
                  <Link to="/demenagement-paris-19" className="hover:text-accent transition-colors text-xs">Paris 19e</Link>
                  <Link to="/demenagement-paris-10" className="hover:text-accent transition-colors text-xs">Paris 10e</Link>
                  <Link to="/demenagement-paris-9" className="hover:text-accent transition-colors text-xs">Paris 9e</Link>
                </div>
                <Link to="/secteurs-desservis" className="text-accent hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mt-4">
                  Voir tous les secteurs <ArrowRight size={10} />
                </Link>
              </li>
              <li className="pt-4 border-t border-slate-800">
                 <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-4">Banlieue & IDF</span>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <Link to="/demenagement-montreuil" className="hover:text-accent transition-colors text-xs">Montreuil</Link>
                  <Link to="/demenagement-vincennes" className="hover:text-accent transition-colors text-xs">Vincennes</Link>
                  <Link to="/demenagement-saint-mande" className="hover:text-accent transition-colors text-xs">Saint-Mandé</Link>
                  <Link to="/demenagement-bagnolet" className="hover:text-accent transition-colors text-xs">Bagnolet</Link>
                  <Link to="/demenagement-hauts-de-seine" className="hover:text-accent transition-colors text-xs">Hauts-de-Seine</Link>
                  <Link to="/demenagement-seine-saint-denis" className="hover:text-accent transition-colors text-xs">Seine-Saint-Denis</Link>
                  <Link to="/demenagement-val-de-marne" className="hover:text-accent transition-colors text-xs">Val-de-Marne</Link>
                  <Link to="/demenagement-yvelines" className="hover:text-accent transition-colors text-xs">Yvelines</Link>
                  <Link to="/demenagement-essonne" className="hover:text-accent transition-colors text-xs">Essonne</Link>
                  <Link to="/demenagement-val-d-oise" className="hover:text-accent transition-colors text-xs">Val-d'Oise</Link>
                  <Link to="/demenagement-seine-et-marne" className="hover:text-accent transition-colors text-xs">Seine-et-Marne</Link>
                  <Link to="/demenagement-ile-de-france" className="hover:text-accent transition-colors text-xs">Île-de-France</Link>
                </div>
                <Link to="/secteurs-desservis" className="text-accent hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mt-4">
                  Toutes nos zones <ArrowRight size={10} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Address Col */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left order-4 sm:order-4 lg:order-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 lg:mb-10 text-white/40">Contact Direct</h4>
            <ul className="space-y-6">
              <li className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <MapPin size={22} className="text-accent shrink-0" />
                <span className="text-slate-400 text-sm font-light leading-relaxed">{CONTACT.fullAddress}</span>
              </li>
              <li className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <Phone size={22} className="text-accent shrink-0" />
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-slate-200 text-lg font-bold hover:text-white transition-colors">{CONTACT.phone}</a>
              </li>
              <li className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                <Mail size={22} className="text-accent shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="text-slate-400 text-sm font-medium hover:text-white transition-colors break-all">{CONTACT.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} {CONTACT.name}. Déménagement à Paris.
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-500 text-[11px] font-black uppercase tracking-widest">
            <Link to="/mentions-legales" className="hover:text-slate-300 transition-colors">Mentions Légales</Link>
            <span className="cursor-pointer hover:text-slate-300 transition-colors">Confidentialité</span>
            <span className="cursor-pointer hover:text-slate-300 transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
