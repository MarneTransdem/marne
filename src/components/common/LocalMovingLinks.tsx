import { Link } from 'react-router-dom';

// Neighbours sharing a land boundary; river-only neighbours are omitted.
const neighbours: Record<number, number[]> = {
  1: [2, 8], 2: [1, 3, 9, 10], 3: [2, 4, 10, 11], 4: [3, 11, 12],
  5: [6, 13, 14], 6: [5, 7, 14, 15], 7: [6, 15], 8: [1, 9, 16, 17],
  9: [2, 8, 10, 17, 18], 10: [2, 3, 9, 11, 18, 19],
  11: [3, 4, 10, 12, 19, 20], 12: [4, 11, 20], 13: [5, 14],
  14: [5, 6, 13, 15], 15: [6, 7, 14], 16: [8, 17],
  17: [8, 9, 16, 18], 18: [9, 10, 17, 19], 19: [10, 11, 18, 20], 20: [11, 12, 19],
};

export function LocalMovingLinks({ slug }: { slug: string }) {
  const match = /^paris-(\d+)$/.exec(slug);
  const nearby = match ? neighbours[Number(match[1])] : undefined;
  if (!nearby) return null;
  const links = [
    { href: '/secteurs-desservis', label: 'Tous les arrondissements et secteurs desservis' },
    ...nearby.map(n => ({ href: `/demenagement-paris-${n}`, label: `Déménagement Paris ${n === 1 ? '1er' : `${n}e`}` })),
    { href: '/calculateur-volume', label: 'Estimer le cubage de vos meubles' },
    { href: '/location-monte-meuble-paris', label: 'Étudier le besoin de monte-meuble' },
    { href: '/garde-meuble-paris', label: 'Prévoir un stockage entre deux logements' },
    { href: '/formules-demenagement', label: 'Comparer les prestations et les formules' },
  ];
  return <nav aria-label="Préparer votre déménagement à Paris" className="border-t border-slate-200 bg-slate-50 py-12">
    <div className="container mx-auto max-w-5xl px-4 md:px-6">
      <h2 className="text-2xl font-bold text-brand-900 mb-4">Votre trajet et les services utiles</h2>
      <p className="text-slate-600 mb-6">Votre arrivée se situe dans un arrondissement voisin ? Consultez ses accès et précisez les prestations utiles aux deux adresses.</p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map(link => <li key={link.href}><Link to={link.href} className="block h-full rounded-xl border border-slate-200 bg-white p-4 text-brand-900 underline decoration-amber-500 underline-offset-4 hover:text-amber-800">{link.label}</Link></li>)}
      </ul>
    </div>
  </nav>;
}
