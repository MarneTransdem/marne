import { CONTACT } from '../../constants';

const formatHour = (value: string) => `${Number(value.slice(0, 2))} h${value.endsWith(':00') ? '' : ` ${value.slice(3)}`}`;

export function BusinessHours() {
  return <div>
    <p className="font-bold mb-3">Accueil au bureau et téléphone</p>
    <dl className="space-y-2 text-sm">
      {CONTACT.openingHours.map(period => <div key={period.label} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
        <dt>{period.label}</dt>
        <dd>{period.closed ? 'Fermé' : `${formatHour(period.opens)}–${formatHour(period.closes)}`}</dd>
      </div>)}
    </dl>
  </div>;
}
