import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, Truck } from 'lucide-react';

const projects = [
  { title: 'Déménagement de particuliers', path: '/demenagement-particuliers-paris', icon: Home, label: 'Appartement ou maison', description: 'Choisissez ce que vous préparez et ce que vous confiez à notre équipe, selon les accès et les biens à transporter.' },
  { title: 'Déménagement d’entreprises', path: '/demenagement-entreprises-paris', icon: Building2, label: 'Bureaux et locaux professionnels', description: 'Préparez le transfert de vos équipes, de votre mobilier et de vos équipements avec un périmètre et un calendrier définis.' },
  { title: 'Déménagement longue distance', path: '/demenagement-longue-distance', icon: Truck, label: 'De Paris vers une autre région', description: 'Organisez le trajet, les dates et les accès au départ comme à l’arrivée pour construire un devis adapté à votre destination.' },
];

export function ProjectGateway() {
  return (
    <section aria-labelledby="home-projects-heading" className="home-projects bg-brand-900 py-16 md:py-20 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-3">Votre projet, votre accompagnement</p>
          <h2 id="home-projects-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-5">Chaque déménagement commence par les bonnes questions.</h2>
          <p className="text-slate-300 text-lg leading-relaxed">Retrouvez les prestations, les points à anticiper et les informations utiles pour préparer votre demande.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map(({ title, path, icon: Icon, label, description }) => (
            <Link key={path} to={path} className="group flex flex-col rounded-2xl border border-white/20 bg-white/5 p-7 md:p-8 hover:bg-white/10 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors">
              <Icon size={28} aria-hidden="true" className="text-accent mb-6" />
              <p className="text-sm text-slate-300 mb-2">{label}</p>
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p className="text-slate-300 leading-relaxed mb-7">{description}</p>
              <span className="mt-auto inline-flex items-center gap-3 text-accent font-semibold">Préparer mon projet <ArrowRight size={18} aria-hidden="true" /></span>
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
