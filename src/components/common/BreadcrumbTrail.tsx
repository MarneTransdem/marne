import { Link } from 'react-router-dom';

type BreadcrumbItem = { name: string; item: string };

export function BreadcrumbTrail({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d’Ariane" className="mb-6 text-sm not-italic text-white">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((crumb, index) => (
          <li key={crumb.item} className="flex min-w-0 items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page" className="py-3">{crumb.name}</span>
            ) : (
              <Link to={crumb.item} className="inline-flex min-h-11 items-center rounded-sm py-2 underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
