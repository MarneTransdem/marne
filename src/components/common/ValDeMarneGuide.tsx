import { Link } from 'react-router-dom';

export function ValDeMarneGuide() {
  return <section aria-labelledby="preparer-demenagement-94" className="py-16 bg-white">
    <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-8">
      <div>
        <h2 id="preparer-demenagement-94" className="text-3xl md:text-4xl font-bold text-brand-900 mb-5">Préparer un déménagement dans le Val-de-Marne (94)</h2>
        <p className="text-slate-600 leading-relaxed">Pour un trajet entre Paris et le 94 ou entre deux communes du département, décrivez les deux adresses séparément. Les accès au logement, les biens à transporter et les possibilités de stationnement déterminent la préparation, même lorsque la distance routière est courte.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-900 mb-3">À proximité de Paris</h3>
          <p className="text-slate-600 leading-relaxed">Pour votre départ ou arrivée à <Link to="/demenagement-vincennes" className="underline">Vincennes</Link>, <Link to="/demenagement-saint-mande" className="underline">Saint-Mandé</Link> ou <Link to="/demenagement-charenton-le-pont" className="underline">Charenton-le-Pont</Link>, relevez les étages, les passages dans les parties communes et la distance entre le camion et l’entrée. Mesurez les meubles dont le passage reste incertain.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-brand-900 mb-3">Pour une maison ou une résidence</h3>
          <p className="text-slate-600 leading-relaxed">À <Link to="/demenagement-saint-maur-des-fosses" className="underline">Saint-Maur-des-Fossés</Link>, <Link to="/demenagement-nogent-sur-marne" className="underline">Nogent-sur-Marne</Link> ou <Link to="/demenagement-creteil" className="underline">Créteil</Link>, précisez la configuration réelle de votre adresse : portail, allée, cour, marches ou accès à la résidence. Ajoutez cave, garage et mobilier extérieur à l’inventaire lorsqu’ils sont concernés.</p>
        </article>
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">Stationnement : identifier la démarche pour votre adresse</h2>
        <p className="text-slate-600 leading-relaxed mb-4">Avant de retenir l’emplacement du camion ou d’un monte-meuble, faites préciser la démarche applicable par le service compétent pour l’adresse. Une place de stationnement habituelle ne décrit pas nécessairement l’espace requis pour la manutention. Convenez aussi de la personne qui dépose la demande et du traitement des frais éventuels dans le devis.</p>
        <p className="text-slate-600 leading-relaxed mb-4">Exemple documenté à Vincennes : le formulaire municipal demande l’adresse, les dates, le nombre de places ou la longueur nécessaire et la présence éventuelle d’un monte-meuble. Son verso distingue certaines voies pour lesquelles une autre démarche est indiquée. Ce document ne doit pas être appliqué aux autres communes du Val-de-Marne.</p>
        <p className="text-sm text-slate-600">Source : <a className="underline underline-offset-4" href="https://www.vincennes.fr/sites/default/files/2025-02/demenagement_m_meuble_manif_bis_2025.pdf">formulaire officiel de Vincennes pour déménagement et stationnement (PDF, édition 2025)</a>. Vérifiez auprès du service voirie la version et les modalités applicables à votre date ; les montants de cette édition ne sont pas repris ici.</p>
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-5">Comparer un devis de déménagement dans le 94</h2>
        <ul className="list-disc pl-6 space-y-3 text-slate-600">
          <li><strong>Le même inventaire :</strong> meubles, cartons et annexes, avec les dimensions des biens atypiques. Utilisez le <Link to="/blog/comment-estimer-volume-demenagement" className="underline">guide d’estimation du volume</Link>.</li>
          <li><strong>Les mêmes tâches :</strong> emballage du fragile, préparation des cartons, démontage et remontage. Le <Link to="/formules-demenagement" className="underline">comparatif des formules</Link> aide à répartir les responsabilités.</li>
          <li><strong>Les mêmes accès :</strong> étages, ascenseurs, portage et matériel envisagé aux deux adresses. La <Link to="/location-monte-meuble-paris" className="underline">mise en place d’un monte-meuble</Link> nécessite une étude de faisabilité.</li>
        </ul>
        <p className="text-slate-600 leading-relaxed mt-5">Le département ne détermine pas à lui seul un tarif. Consultez les <Link to="/blog/combien-coute-demenagement-paris" className="underline">critères qui font varier le prix</Link> et transmettez les informations de votre trajet dans la <Link to="/demande-de-devis" className="underline">demande de devis</Link>.</p>
      </div>
    </div>
  </section>;
}
