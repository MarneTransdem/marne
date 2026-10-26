import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Sector } from '../../constants/sectorsData';

export function NearbySectorLinks({ sectors }: { sectors: Sector['nearbySectors'] }) {
  if (sectors.length === 0) return null;

  return (
    <nav aria-labelledby="nearby-sectors-title" className="border-t border-slate-200 bg-slate-50 stay-light-section py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-7 max-w-2xl">
          <span aria-hidden="true" className="mb-4 block h-1 w-10 rounded-full bg-accent" />
          <h2 id="nearby-sectors-title" className="text-2xl md:text-3xl font-bold text-brand-900 stay-dark">Autres secteurs à proximité</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">Consultez les informations utiles pour préparer les accès et le déménagement à chaque adresse de votre trajet.</p>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <li key={sector.l} className="min-w-0">
              <Link
                to={sector.l}
                className="flex h-full min-h-16 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white stay-white-bg px-5 py-4 text-base font-semibold leading-snug text-brand-900 stay-dark underline decoration-accent/70 underline-offset-4 transition-colors hover:border-amber-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900"
              >
                <span className="min-w-0 break-words">Déménagement {sector.n}</span>
                <ArrowRight aria-hidden="true" size={18} className="shrink-0 text-amber-700" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
