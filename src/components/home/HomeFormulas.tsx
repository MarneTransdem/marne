import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { FORMULAS } from '../../constants';

const formulaKeys = ['economique', 'standard', 'luxe'];

export function HomeFormulas() {
  return (
    <section id="nos-formules" className="home-formulas home-formula-comparison stay-light-section" aria-labelledby="home-formulas-heading">
      <div className="container mx-auto px-4 md:px-6">
        <div className="home-formula-intro">
          <div><p className="home-eyebrow">À chacun son accompagnement</p><h2 id="home-formulas-heading" className="stay-dark">Nos Formules de Déménagement</h2></div>
          <p>Choisissez le niveau d'accompagnement adapté à vos besoins.</p>
        </div>
        <div className="home-formula-options">
          {FORMULAS.map((formula, index) => (
            <article key={formula.name} className={'home-formula-option' + (formula.popular ? ' home-formula-balanced' : '')} aria-labelledby={'home-formula-' + formulaKeys[index]}>
              <div className="home-formula-top"><span aria-hidden="true">0{index + 1}</span>{formula.popular && <span className="home-formula-badge">Formule équilibrée</span>}</div>
              <h3 id={'home-formula-' + formulaKeys[index]} className="stay-dark">{formula.name}</h3>
              <p className="home-formula-description">{formula.description}</p>
              <ul>{formula.features.map(feature => <li key={feature}><Check size={17} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              <Link to={'/demande-de-devis?formula=' + formulaKeys[index]} className="home-formula-select">Choisir la formule {formula.name}<ArrowRight size={18} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
        <div className="home-formula-bottom"><p>Les prestations retenues sont précisées dans votre devis personnalisé.</p><Link to="/formules-demenagement">Comparer les prestations en détail <ArrowRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
