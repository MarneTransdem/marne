import { Link, useLocation } from 'react-router-dom';

const guides = {
  price: { path: '/blog/combien-coute-demenagement-paris', label: 'Comprendre le prix et comparer les devis' },
  volume: { path: '/blog/comment-estimer-volume-demenagement', label: 'Estimer le volume pièce par pièce' },
  lift: { path: '/blog/demenagement-monte-meuble-paris', label: 'Vérifier si un monte-meuble est nécessaire' },
  business: { path: '/blog/demenagement-entreprise-paris-checklist', label: 'Préparer le transfert de vos bureaux' },
  admin: { path: '/blog/formalites-administratives-demenagement', label: 'Organiser vos changements d’adresse' },
};

export function RelatedResources() {
  const { pathname } = useLocation();
  if (/^\/(admin|login|suivi|signature-devis)/.test(pathname) || ['/mentions-legales', '/politique-de-confidentialite'].includes(pathname)) return null;
  const business = /entreprise|transfert|archives/.test(pathname);
  const links = business ? [guides.business, { path: '/transfert-bureaux-paris', label: 'Découvrir notre organisation pour les bureaux' }, { path: '/demenagement-entreprises-paris', label: 'Préparer votre projet d’entreprise' }]
    : /monte-meuble/.test(pathname) ? [guides.lift, { path: '/location-monte-meuble-paris', label: 'Étudier une intervention avec technicien' }, guides.price]
    : [guides.price, guides.volume, guides.admin];
  return <aside aria-label="Ressources pour préparer votre déménagement" className="bg-slate-50 dark:bg-slate-900 py-12">
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <h2 className="text-2xl font-bold mb-4">Pour préparer votre projet</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-6">Vérifiez les informations qui permettront d’adapter la prestation à votre logement, vos accès et votre calendrier.</p>
      <ul className="grid md:grid-cols-3 gap-4">{links.filter(x => x.path !== pathname).map(link => <li key={link.path}><Link className="block rounded-xl border border-slate-200 dark:border-slate-700 p-5 underline underline-offset-4 hover:text-amber-700" to={link.path}>{link.label}</Link></li>)}</ul>
      <p className="mt-6"><Link to="/calculateur-volume" className="underline">Calculer votre volume</Link> · <Link to="/formules-demenagement" className="underline">Comparer les formules</Link> · <Link to="/demande-de-devis" className="underline">Demander une étude personnalisée</Link></p>
    </div>
  </aside>;
}
