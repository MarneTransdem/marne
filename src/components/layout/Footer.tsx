import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { CONTACT, NAVIGATION, SERVICES } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Brand & Contact */}
          <div className="space-y-8 flex flex-col items-center sm:items-start">
            <div className="space-y-6 flex flex-col items-center sm:items-start w-full">
              <Link to="/">
                <Logo variant="light" height="h-12" />
              </Link>
              <div className="space-y-6">
                <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xs text-center sm:text-left">
                  Déménagement à Paris. Un accompagnement professionnel pour tous vos projets de mobilité au cœur de l'Île-de-France.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 justify-center sm:justify-start group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <MapPin size={14} className="text-accent" />
                    </div>
                    <span className="text-slate-300 text-xs font-medium">{CONTACT.fullAddress}</span>
                  </li>
                  <li className="flex items-center gap-3 justify-center sm:justify-start group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Phone size={14} className="text-accent" />
                    </div>
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-slate-100 text-sm font-bold hover:text-accent transition-colors">{CONTACT.phone}</a>
                  </li>
                  <li className="flex items-center gap-3 justify-center sm:justify-start group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Mail size={14} className="text-accent" />
                    </div>
                    <a href={`mailto:${CONTACT.email}`} className="text-slate-300 text-xs font-medium hover:text-white transition-colors truncate max-w-[200px]">{CONTACT.email}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 justify-center sm:justify-start">
               <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all"><Instagram size={14} /></a>
               <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all"><Facebook size={14} /></a>
               <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all"><Linkedin size={14} /></a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/40">Services</h4>
            <ul className="space-y-4 text-slate-400 font-medium text-sm">
              {SERVICES.slice(0, 8).map(service => (
                <li key={service.id}>
                  <Link to={service.path} className="hover:text-accent transition-colors flex items-center gap-2 group italic">
                    <span className="w-1 h-1 bg-accent/20 rounded-full group-hover:bg-accent transition-colors"></span>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/formules-demenagement" className="text-accent hover:text-white transition-colors underline decoration-accent/30 underline-offset-4 decoration-2">
                  Nos Formules de Déménagement
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Entreprise */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/40">Marne Transdem</h4>
            <ul className="space-y-4 text-slate-400 font-medium text-sm">
              <li><Link to="/a-propos" className="hover:text-accent transition-colors block">Qui sommes-nous</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors block">Contactez-nous</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors block">Conseils d'experts</Link></li>
              <li><Link to="/demande-de-devis" className="hover:text-accent transition-colors font-bold text-white block">Demander un devis</Link></li>
              <li><Link to="/calculateur-volume" className="hover:text-accent transition-colors block">Calculateur de volume</Link></li>
              <li><Link to="/secteurs-desservis" className="hover:text-accent transition-colors block">Zones d'intervention</Link></li>
            </ul>
          </div>

          {/* Col 4: Secteurs focus */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/40">Secteurs Clés</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Link to="/demenagement-paris-20" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Paris 20e</Link>
              <Link to="/demenagement-paris-11" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Paris 11e</Link>
              <Link to="/demenagement-paris-12" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Paris 12e</Link>
              <Link to="/demenagement-paris-15" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Paris 15e</Link>
              <Link to="/demenagement-paris-16" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Paris 16e</Link>
              <Link to="/demenagement-montreuil" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Montreuil</Link>
              <Link to="/demenagement-vincennes" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Vincennes</Link>
              <Link to="/demenagement-saint-mande" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Saint-Mandé</Link>
              <Link to="/demenagement-yvelines" className="text-slate-400 hover:text-accent transition-colors text-xs font-light">Yvelines</Link>
              <Link to="/demenagement-bagnolet" className="text-slate-400 hover:text-accent transition-colors text-xs font-light font-bold">Bagnolet</Link>
            </div>
            <Link to="/secteurs-desservis" className="text-accent hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mt-8">
              Toutes les zones <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[10px] font-medium uppercase tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} {CONTACT.name}. Solutions de mobilité professionnelle.
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <Link to="/mentions-legales" className="hover:text-slate-300 transition-colors">Mentions Légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-slate-300 transition-colors">Confidentialité</Link>
            <span className="cursor-pointer hover:text-slate-300 transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
