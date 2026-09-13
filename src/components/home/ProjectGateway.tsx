import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  { title: 'Déménagement de particuliers', path: '/demenagement-particuliers-paris', image: 'demenagement-paris', label: 'Appartement ou maison', description: 'Choisissez ce que vous préparez et ce que vous confiez à notre équipe, selon les accès et les biens à transporter.' },
  { title: 'Déménagement d’entreprises', path: '/demenagement-entreprises-paris', image: 'transfert-entreprise-essonne', label: 'Bureaux et locaux professionnels', description: 'Préparez le transfert de vos équipes, de votre mobilier et de vos équipements avec un périmètre et un calendrier définis.' },
  { title: 'Déménagement longue distance', path: '/demenagement-longue-distance', image: 'demenagement-longue-distance', label: 'De Paris vers une autre région', description: 'Organisez le trajet, les dates et les accès au départ comme à l’arrivée pour construire un devis adapté à votre destination.' },
];

export function ProjectGateway() {
  return (
    <section id="votre-projet" aria-labelledby="home-projects-heading" className="home-projects bg-brand-900 py-16 md:py-20 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="home-section-intro mb-10">
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-3">Votre projet, votre accompagnement</p>
          <h2 id="home-projects-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-5">Chaque déménagement commence par les bonnes questions.</h2>
          <p className="text-slate-300 text-lg leading-relaxed">Retrouvez les prestations, les points à anticiper et les informations utiles pour préparer votre demande.</p>
        </div>
        <div className="home-project-grid">
          {projects.map(({ title, path, image, label, description }, index) => (
            <Link key={path} to={path} className="home-project-card group">
              <div className="home-project-image"><img src={'/images/' + image + '.webp'} alt="" width="600" height="450" loading="lazy" decoding="async" /><span aria-hidden="true">0{index + 1}</span></div>
              <div className="home-project-body">
              <p className="text-sm text-slate-300 mb-2">{label}</p>
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-slate-300 leading-relaxed mb-7">{description}</p>
              <span className="mt-auto inline-flex items-center gap-3 text-accent font-semibold">Préparer mon projet <ArrowRight size={18} aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-8 text-sm font-semibold">
          <Link to="/formules-demenagement" className="underline underline-offset-4 hover:text-accent">Comparer les formules</Link>
          <Link to="/a-propos" className="underline underline-offset-4 hover:text-accent">Découvrir Marne Transdem</Link>
          <Link to="/contact" className="underline underline-offset-4 hover:text-accent">Parler de mon projet à l’équipe</Link>
        </div>
      </div>
    </section>
  );
}
