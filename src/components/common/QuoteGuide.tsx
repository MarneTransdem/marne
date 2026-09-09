import { Link } from 'react-router-dom';

const linkClass = 'underline underline-offset-4 font-semibold';

export function QuoteGuide() {
  return (
    <section aria-labelledby="quote-guide-heading" className="mt-16 md:mt-24 text-slate-600 dark:text-slate-300 leading-relaxed">
      <h2 id="quote-guide-heading" className="text-3xl font-bold text-brand-900 dark:text-white mb-8">Comment préparer un devis adapté à votre déménagement ?</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-4">Les informations utiles au chiffrage</h3>
          <ul className="list-disc pl-5 space-y-3">
            <li>Les adresses de départ et d’arrivée, ainsi que la date ou la période envisagée.</li>
            <li>Le volume des meubles et cartons, avec les objets fragiles, lourds ou encombrants à signaler.</li>
            <li>Les étages, ascenseurs, escaliers et la distance entre le véhicule et chaque entrée.</li>
            <li>Les prestations souhaitées : emballage, démontage, remontage ou stockage, selon votre projet.</li>
          </ul>
          <p className="mt-5">Vous ne connaissez pas encore le volume ? Le <Link to="/calculateur-volume" className={linkClass}>calculateur de volume de déménagement</Link> fournit une estimation à préciser avec l’inventaire et les accès.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-4">Pourquoi le prix varie d’un projet à l’autre</h3>
          <p>Le volume et le trajet influencent les moyens de transport nécessaires. Les accès, la manutention, la date et le niveau d’accompagnement modifient aussi l’organisation de l’intervention.</p>
          <p className="mt-4">À Paris, signalez les escaliers étroits, les cours intérieures et les possibilités de stationnement. Si un <Link to="/location-monte-meuble-paris" className={linkClass}>monte-meuble</Link> est envisagé, sa faisabilité et les démarches nécessaires doivent être étudiées.</p>
          <p className="mt-4">Consultez le <Link to="/blog/combien-coute-demenagement-paris" className={linkClass}>guide des prix à Paris</Link> pour comprendre ces critères. Une fourchette indicative ne remplace pas le devis correspondant à votre déménagement.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-4">Que se passe-t-il après votre demande ?</h3>
          <p>L’équipe vous recontacte pour préciser votre projet. L’échange permet de compléter les informations sur les biens, les accès et les prestations avant d’établir une proposition adaptée. Si votre date est flexible, indiquez-le pour étudier les possibilités d’organisation.</p>
          <p className="mt-4">Une estimation issue du calculateur prépare cet échange ; elle ne confirme ni un tarif ni une réservation de date.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-4">Comment comparer les prestations proposées ?</h3>
          <p>Comparez les devis sur le même inventaire et les mêmes accès. Vérifiez le montant TTC, la répartition des tâches d’emballage et de démontage, les éventuels frais liés aux accès, les conditions d’assurance et les modalités de paiement.</p>
          <p className="mt-4">Nos <Link to="/formules-demenagement" className={linkClass}>formules de déménagement</Link> vous aident à préciser le niveau d’aide souhaité. Demandez que les prestations et options retenues soient décrites dans la proposition.</p>
        </div>
      </div>
      <p className="mt-10"><a href="#formulaire-devis" className="inline-block bg-brand-900 dark:bg-accent text-white dark:text-brand-900 font-bold px-6 py-4 rounded-xl">Revenir au formulaire de devis</a></p>
    </section>
  );
}
