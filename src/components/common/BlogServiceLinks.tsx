import { Link } from 'react-router-dom';

type ServiceLink = { path: string; label: string; description: string };
const formulas: ServiceLink = { path: '/formules-demenagement', label: 'Comparer les formules de déménagement', description: 'Distinguez les tâches que vous gardez et celles que vous confiez à l’équipe.' };
const packing: ServiceLink = { path: '/emballage-protection-demenagement', label: 'Préparer l’emballage et la protection', description: 'Précisez les objets fragiles et les meubles à protéger avant le transport.' };
const privateMove: ServiceLink = { path: '/demenagement-particuliers-paris', label: 'Organiser un déménagement de particulier', description: 'Préparez les accès de votre appartement ou maison et les prestations nécessaires.' };
const storage: ServiceLink = { path: '/garde-meuble-paris', label: 'Prévoir un garde-meuble entre deux logements', description: 'Étudiez le stockage si les dates de départ et d’entrée ne coïncident pas.' };
const lift: ServiceLink = { path: '/location-monte-meuble-paris', label: 'Étudier le recours à un monte-meuble', description: 'Vérifiez la faisabilité selon les meubles, les ouvertures et l’accès au bâtiment.' };
const quote: ServiceLink = { path: '/demande-de-devis', label: 'Demander un devis personnalisé', description: 'Transmettez votre trajet, votre volume estimé et les contraintes des deux adresses.' };

const linksByArticle: Record<string, ServiceLink[]> = {
  '10-conseils-demenagement-sans-stress-paris': [privateMove, packing, formulas],
  'formalites-administratives-demenagement': [privateMove, storage, quote],
  'combien-coute-demenagement-paris': [formulas, lift, quote],
  'comment-estimer-volume-demenagement': [packing, formulas, quote],
  'demenagement-monte-meuble-paris': [lift, packing, quote],
  'demenagement-entreprise-paris-checklist': [
    { path: '/transfert-bureaux-paris', label: 'Préparer le transfert de vos bureaux', description: 'Cadrez l’inventaire, les accès et l’ordre de livraison dans les nouveaux locaux.' },
    { path: '/demenagement-entreprises-paris', label: 'Définir votre projet de déménagement d’entreprise', description: 'Répartissez les responsabilités entre vos équipes, vos prestataires et les déménageurs.' },
    quote,
  ],
};

export function BlogServiceLinks({ slug }: { slug: string }) {
  const links = Object.hasOwn(linksByArticle, slug) ? linksByArticle[slug] : [];
  if (!links.length) return null;
  return <nav aria-labelledby="blog-services-heading" className="mt-16 border-t border-slate-200 pt-8">
    <h2 id="blog-services-heading" className="mb-6 text-2xl font-bold text-brand-900">Passer des conseils à votre projet</h2>
    <ul className="grid gap-4 md:grid-cols-3">
      {links.map(link => <li key={link.path} className="rounded-2xl border border-slate-200 bg-white p-5">
        <Link to={link.path} className="font-bold text-brand-900 underline underline-offset-4 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{link.label}</Link>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{link.description}</p>
      </li>)}
    </ul>
  </nav>;
}
