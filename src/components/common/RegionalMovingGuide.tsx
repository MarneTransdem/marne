import { Link } from 'react-router-dom';

const areas = [
  { name: 'Paris (75)', path: '/secteurs-desservis' },
  { name: 'Hauts-de-Seine (92)', path: '/demenagement-hauts-de-seine' },
  { name: 'Seine-Saint-Denis (93)', path: '/demenagement-seine-saint-denis' },
  { name: 'Val-de-Marne (94)', path: '/demenagement-val-de-marne' },
  { name: 'Seine-et-Marne (77)', path: '/demenagement-seine-et-marne' },
  { name: 'Yvelines (78)', path: '/demenagement-yvelines' },
  { name: 'Essonne (91)', path: '/demenagement-essonne' },
  { name: 'Val-d’Oise (95)', path: '/demenagement-val-d-oise' },
];

export function RegionalMovingGuide() {
  return <section aria-labelledby="demenagement-region" className="py-16 bg-white">
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <h2 id="demenagement-region" className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">Déménager entre Paris, petite couronne et grande couronne</h2>
      <p className="text-slate-600 leading-relaxed mb-6">L’Île-de-France réunit Paris, les trois départements de petite couronne et les quatre départements de grande couronne. Pour préparer un trajet dans la région, examinez séparément le logement de départ et celui d’arrivée : quelques kilomètres de trajet ne résument pas le travail de manutention.</p>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-900 mb-3">D’un appartement à un autre</h3>
          <p className="text-slate-600">Notez les étages, les dimensions utiles des ascenseurs et les passages dans les escaliers aux deux adresses. Signalez les meubles qui ne se démontent pas et la distance de portage entre l’entrée et le camion.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-900 mb-3">Entre appartement et maison</h3>
          <p className="text-slate-600">Ajoutez la cave, le garage, le mobilier extérieur et les dépendances à l’inventaire. À la maison, précisez la largeur du portail, la longueur de l’allée et les marches entre le véhicule et les pièces.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-900 mb-3">Entre deux locaux professionnels</h3>
          <p className="text-slate-600">Distinguez mobilier, archives et équipements. Précisez les horaires d’accès, les interlocuteurs sur place et l’ordre de réinstallation pour préparer le <Link to="/transfert-bureaux-paris" className="underline underline-offset-4">transfert des bureaux</Link>.</p>
        </article>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">Trouver les informations de votre secteur en Île-de-France</h2>
      <p className="text-slate-600 mb-5">Consultez les pages de départ et d’arrivée pour préparer votre projet. Les modalités d’intervention sont étudiées selon les adresses, le volume, la date et les accès.</p>
      <ul className="grid sm:grid-cols-2 gap-3 mb-5">{areas.map(area => <li key={area.path}><Link to={area.path} className="block rounded-xl border border-slate-200 p-4 underline underline-offset-4 text-brand-900">{area.name === 'Paris (75)' ? 'Paris (75) : consulter les arrondissements et secteurs' : `Déménagement : ${area.name}`}</Link></li>)}</ul>
      <p className="text-sm text-slate-600 mb-10">Repère géographique : <a href="https://www.iledefrance.fr/decouvrir-le-fonctionnement-de-la-region/propos-de-la-region" className="underline underline-offset-4">présentation des huit départements par la Région Île-de-France</a>.</p>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">Quels éléments font varier le prix d’un déménagement régional ?</h2>
      <p className="text-slate-600 leading-relaxed mb-5">Le volume, la distance, les accès et les tâches confiées à l’équipe doivent être examinés ensemble. Un trajet court avec plusieurs étages et une longue distance de portage ne se prépare pas comme un transfert entre deux rez-de-chaussée accessibles. Le nom du département ne suffit pas à fixer un prix.</p>
      <ul className="list-disc pl-6 space-y-3 text-slate-600">
        <li>Préparez le mobilier et les cartons avec le <Link to="/blog/comment-estimer-volume-demenagement" className="underline underline-offset-4">guide d’estimation du volume</Link>.</li>
        <li>Distinguez les tâches que vous réalisez et celles à déléguer avec le <Link to="/formules-demenagement" className="underline underline-offset-4">comparatif des formules</Link>.</li>
        <li>Vérifiez la même liste de prestations en suivant le <Link to="/blog/combien-coute-demenagement-paris" className="underline underline-offset-4">guide des critères de prix et de comparaison des devis</Link>.</li>
      </ul>
    </div>
  </section>;
}
