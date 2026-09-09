import { Link, useLocation } from 'react-router-dom';
import { getCanonicalPath } from '../../lib/seo-routes';

const guides = {
  price: { path: '/blog/combien-coute-demenagement-paris', label: 'Comprendre le prix et comparer les devis' },
  volume: { path: '/blog/comment-estimer-volume-demenagement', label: 'Estimer le volume pièce par pièce' },
  lift: { path: '/blog/demenagement-monte-meuble-paris', label: 'Vérifier si un monte-meuble est nécessaire' },
  business: { path: '/blog/demenagement-entreprise-paris-checklist', label: 'Préparer le transfert de vos bureaux' },
  admin: { path: '/blog/formalites-administratives-demenagement', label: 'Organiser vos changements d’adresse' },
  packing: { path: '/emballage-protection-demenagement', label: 'Prévoir la protection des meubles et objets fragiles' },
  boxes: { path: '/cartons-demenagement-paris', label: 'Choisir les cartons pour vos affaires' },
  small: { path: '/demenagement-petit-volume', label: 'Organiser le transport d’un petit volume' },
  calculator: { path: '/calculateur-volume', label: 'Calculer votre volume de mobilier' },
  formulas: { path: '/formules-demenagement', label: 'Comparer les formules de déménagement' },
  quote: { path: '/demande-de-devis', label: 'Demander une étude personnalisée' },
};

export function RelatedResources() {
  const { pathname: locationPath } = useLocation();
  const pathname = getCanonicalPath(locationPath);
  if (/^\/(admin|login|suivi|signature-devis)/.test(pathname) || ['/mentions-legales', '/politique-de-confidentialite'].includes(pathname)) return null;
  const business = /entreprise|transfert|archives/.test(pathname);
  const resourceGroup = business ? {
    description: 'Préparez l’inventaire des postes, les accès et le calendrier de reprise d’activité pour organiser votre transfert.',
    links: [guides.business, { path: '/transfert-bureaux-paris', label: 'Découvrir notre organisation pour les bureaux' }, { path: '/demenagement-entreprises-paris', label: 'Préparer votre projet d’entreprise' }, guides.packing],
  } : /monte-meuble|piano|oeuvres-art/.test(pathname) ? {
    description: 'Vérifiez les dimensions, les passages et la protection des biens avant de choisir les moyens de manutention.',
    links: [guides.lift, { path: '/location-monte-meuble-paris', label: 'Étudier une intervention avec technicien' }, guides.packing, guides.price],
  } : /garde-meuble|stockage/.test(pathname) ? {
    description: 'Estimez les biens à stocker, préparez leur protection et précisez les dates de transport et de restitution dans votre demande.',
    links: [guides.volume, guides.packing, guides.boxes, guides.price],
  } : /emballage|cartons/.test(pathname) ? {
    description: 'Repérez les objets fragiles et les fournitures nécessaires, puis vérifiez qui réalise l’emballage dans la formule retenue.',
    links: [guides.packing, guides.boxes, guides.formulas, guides.volume],
  } : /volume|etudiant/.test(pathname) ? {
    description: 'Faites l’inventaire de vos meubles et cartons pour préciser le volume, puis préparez les informations utiles au chiffrage.',
    links: [guides.volume, guides.calculator, guides.small, guides.price],
  } : /combien-coute|formules|demande-de-devis/.test(pathname) ? {
    description: 'Pour comparer les prestations, rapprochez le volume estimé, les tâches prises en charge et les contraintes d’accès.',
    links: [guides.price, guides.formulas, guides.volume, guides.packing],
  } : {
    description: 'Vérifiez les informations qui permettront d’adapter la prestation à votre logement, vos accès et votre calendrier.',
    links: [guides.price, guides.volume, guides.admin],
  };
  const links = resourceGroup.links.filter(link => link.path !== pathname).slice(0, 3);
  const actions = [guides.calculator, guides.formulas, guides.quote].filter(
    link => link.path !== pathname && !links.some(resource => resource.path === link.path),
  );
  return <aside aria-label="Ressources pour préparer votre déménagement" className="bg-slate-50 dark:bg-slate-900 py-12">
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">Pour préparer votre projet</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6">{resourceGroup.description}</p>
      <ul className="grid md:grid-cols-3 gap-4">{links.map(link => <li key={link.path}><Link className="block rounded-xl border border-slate-200 dark:border-slate-700 p-5 underline underline-offset-4 hover:text-amber-700" to={link.path}>{link.label}</Link></li>)}</ul>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{actions.map(link => <li key={link.path}><Link to={link.path} className="underline underline-offset-4">{link.label}</Link></li>)}</ul>
    </div>
  </aside>;
}
