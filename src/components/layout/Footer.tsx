import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { CONTACT, NAVIGATION, SERVICES } from '../../constants';
import { BusinessHours } from '../common/BusinessHours';
import './footer-premium.css';

const areas = [
  ['Paris 20e', '/demenagement-paris-20'], ['Paris 11e', '/demenagement-paris-11'],
  ['Paris 12e', '/demenagement-paris-12'], ['Paris 15e', '/demenagement-paris-15'],
  ['Paris 16e', '/demenagement-paris-16'], ['Montreuil', '/demenagement-montreuil'],
  ['Vincennes', '/demenagement-vincennes'], ['Saint-Mandé', '/demenagement-saint-mande'],
  ['Yvelines', '/demenagement-yvelines'], ['Bagnolet', '/demenagement-bagnolet'],
];

export const Footer = () => (
  <footer className="premium-footer">
    <div className="premium-footer-inner">
      <div className="premium-footer-welcome">
        <div className="premium-footer-brand">
          <Link to="/" aria-label="Marne Transdem, accueil"><Logo variant="dark" height="h-14" /></Link>
          <p>Déménagement à Paris. Un accompagnement professionnel pour tous vos projets de mobilité au cœur de l’Île-de-France.</p>
        </div>
        <address className="premium-footer-contact">
          <span>Rencontrons-nous à Paris 20e</span>
          <p><MapPin size={17} aria-hidden="true" />{CONTACT.fullAddress}</p>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}><Phone size={17} aria-hidden="true" />{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}><Mail size={17} aria-hidden="true" />{CONTACT.email}</a>
        </address>
        <div className="premium-footer-hours"><BusinessHours /></div>
      </div>
      <div className="premium-footer-navigation">
        <nav aria-label="Services en pied de page">
          <h2>Services</h2>
          <ul className="premium-footer-services">{SERVICES.slice(0, 8).map(service => <li key={service.id}><Link to={service.path}>{service.title}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Explorer le site">
          <h2>Explorer le site</h2>
          <ul>{NAVIGATION.filter(item => !['Particuliers', 'Entreprises', 'Services'].includes(item.name)).map(item => <li key={item.path}><Link to={item.path}>{item.name}</Link></li>)}
            <li><Link to="/calculateur-volume">Calculateur de volume</Link></li>
            <li><Link to="/demande-de-devis" className="premium-footer-quote">Demander un devis <ArrowRight size={15} aria-hidden="true" /></Link></li>
          </ul>
        </nav>
        <nav aria-label="Secteurs clés">
          <h2>Secteurs Clés</h2>
          <ul className="premium-footer-areas">{areas.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul>
          <Link to="/secteurs-desservis" className="premium-footer-all">Toutes les zones <ArrowRight size={15} aria-hidden="true" /></Link>
        </nav>
      </div>
      <div className="premium-footer-bottom">
        <p>© {new Date().getFullYear()} {CONTACT.name}. Solutions de mobilité professionnelle.</p>
        <nav aria-label="Informations légales"><Link to="/mentions-legales">Mentions légales</Link><Link to="/politique-de-confidentialite">Confidentialité</Link><a href="/sitemap.xml">Sitemap</a></nav>
      </div>
    </div>
  </footer>
);
