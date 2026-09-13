import { Link } from 'react-router-dom';
import { SERVICES } from '../../constants';
import { ArrowRight } from 'lucide-react';

export const ServicesSection = () => (
  <section id="services-accueil" className="home-service-directory">
    <div className="container mx-auto px-4 md:px-6">
      <div className="home-service-layout">
        <div className="home-service-intro">
          <p className="home-eyebrow">Nos services complémentaires</p>
          <h2>Les solutions pour préparer votre déménagement</h2>
          <p>Les bons moyens, au bon moment. Retrouvez ce qui peut faciliter votre départ et protéger vos biens.</p>
          <Link to="/services" className="home-text-link">Voir tous les services <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className="home-service-list">
          {SERVICES.filter(service => ['garde-meuble', 'monte-meuble', 'emballage', 'cartons', 'petit-volume', 'piano'].includes(service.id)).map(service => (
            <article key={service.id} className="home-service-row">
              <service.icon size={24} aria-hidden="true" />
              <div><h3><Link to={service.path}>{service.title}<ArrowRight size={18} aria-hidden="true" /></Link></h3><p>{service.description}</p></div>
            </article>
          ))}
        </div>
      </div>
      <div className="home-special-project"><h3>Un projet qui demande une organisation particulière ?</h3><p>Déménagement étudiant, accompagnement senior, œuvres d’art ou transfert professionnel : retrouvez les prestations adaptées à votre situation.</p></div>
    </div>
  </section>
);
