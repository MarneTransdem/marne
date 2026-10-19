import { Link } from 'react-router-dom';

const guidance = {
  particuliers: {
    title: 'Préparer les accès de votre logement',
    text: 'Retrouvez votre secteur de départ ou d’arrivée pour préparer les informations utiles : étage, ascenseur, distance de portage et stationnement. Décrivez les accès aux deux adresses dans votre demande de devis.',
  },
  entreprises: {
    title: 'Organiser le déménagement de vos locaux',
    text: 'Repérez les secteurs concernés avant de définir le planning. Pour chaque site, précisez les horaires de livraison, les accès réservés, les ascenseurs utilisables et votre interlocuteur sur place.',
  },
  bureaux: {
    title: 'Préparer le départ et l’arrivée de vos bureaux',
    text: 'Consultez les secteurs de vos deux implantations. Complétez ces informations avec les accès à l’immeuble, les créneaux de manutention et le plan de répartition du mobilier dans les nouveaux bureaux.',
  },
  stockage: {
    title: 'Prévoir les trajets vers et depuis le stockage',
    text: 'Indiquez où les meubles seront enlevés puis livrés. Les pages locales vous aident à préparer les accès à ces adresses ; le lieu de stockage, sa disponibilité et ses conditions d’accès sont à confirmer dans votre devis.',
  },
  monteMeuble: {
    title: 'Étudier l’installation à votre adresse',
    text: 'Sélectionnez le secteur de l’intervention et précisez la hauteur, les ouvertures et l’emplacement au sol. La page locale aide à préparer la demande ; la faisabilité du levage et les autorisations restent à vérifier pour votre adresse.',
  },
} as const;

const areas = [
  { href: '/secteurs-desservis', name: 'Paris — les 20 arrondissements', detail: 'Retrouvez la page de votre arrondissement.' },
  { href: '/demenagement-hauts-de-seine', name: 'Hauts-de-Seine (92)', detail: 'Consultez les communes et préparez les accès.' },
  { href: '/demenagement-seine-saint-denis', name: 'Seine-Saint-Denis (93)', detail: 'Repérez votre secteur de départ ou d’arrivée.' },
  { href: '/demenagement-val-de-marne', name: 'Val-de-Marne (94)', detail: 'Préparez les informations utiles à votre trajet.' },
] as const;

export function ServiceAreaLinks({ service }: { service: keyof typeof guidance }) {
  const { title, text } = guidance[service];
  return <section aria-labelledby="service-areas-title" className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
    <div className="container mx-auto max-w-5xl px-4 md:px-6">
      <span className="mb-4 block h-1 w-12 rounded-full bg-accent" aria-hidden="true" />
      <h2 id="service-areas-title" className="text-2xl font-bold text-brand-900 md:text-3xl">{title}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{text}</p>
      <nav aria-label="Secteurs pour cette prestation" className="mt-8">
        <ul className="grid gap-4 sm:grid-cols-2">
          {areas.map(area => <li key={area.href} className="min-w-0">
            <Link to={area.href} className="block h-full rounded-xl border border-slate-200 bg-white p-5 text-brand-900 transition-colors hover:border-amber-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">
              <span className="font-semibold underline decoration-amber-500 underline-offset-4">{area.name}</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600">{area.detail}</span>
            </Link>
          </li>)}
        </ul>
      </nav>
    </div>
  </section>;
}
