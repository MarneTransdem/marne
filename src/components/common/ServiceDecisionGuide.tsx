import { Link, useLocation } from 'react-router-dom';

const guides: Record<string, { title: string; intro: string; rows: [string, string][]; link: string; label: string }> = {
  '/location-monte-meuble-paris': {
    title: 'Vérifier la faisabilité avant de réserver',
    intro: 'Un étage élevé ne suffit pas à déterminer le matériel nécessaire. L’emplacement du véhicule et le passage des meubles doivent aussi être étudiés.',
    rows: [['Accès extérieur', 'Indiquez la largeur de la rue, les arbres, les câbles et la distance entre la chaussée et la façade.'], ['Ouverture', 'Précisez l’étage et les dimensions utiles de la fenêtre ou du balcon ; transmettez des photos lors de l’étude.'], ['Matériel et intervention', 'Faites confirmer la hauteur, la charge admissible, la durée et la présence du technicien dans votre devis.'], ['Stationnement', 'Précisez qui demande l’autorisation et quels frais sont inclus. Les règles dépendent de la commune.']],
    link: '/blog/demenagement-monte-meuble-paris', label: 'Quand le monte-meuble est-il utile ?',
  },
  '/garde-meuble-paris': {
    title: 'Choisir un stockage adapté à la durée et à vos accès',
    intro: 'La bonne solution dépend autant du volume à stocker que de la fréquence à laquelle vous devrez récupérer vos affaires.',
    rows: [['Volume', 'Préparez un inventaire des meubles et cartons à entreposer.'], ['Accès aux biens', 'Faites préciser l’adresse du stockage, les horaires, les conditions de retrait et la prise de rendez-vous éventuelle.'], ['Durée et prix', 'Demandez une estimation indiquant la période facturée, les frais de transport, les modalités de prolongation et de sortie.'], ['Protection et assurance', 'Vérifiez les protections prévues, les exclusions, la valeur déclarée et les conditions de couverture dans les documents contractuels.']],
    link: '/calculateur-volume', label: 'Estimer le volume à stocker',
  },
  '/demenagement-entreprises-paris': {
    title: 'Définir le périmètre de votre projet d’entreprise',
    intro: 'Avant de planifier le transport, identifiez les équipes concernées, les périodes d’indisponibilité acceptables et les responsabilités de chacun.',
    rows: [['Périmètre', 'Distinguez mobilier, archives, postes de travail et équipements nécessitant un intervenant spécialisé.'], ['Responsabilités', 'Désignez un interlocuteur pour les accès, un responsable de l’inventaire et un référent pour la reprise d’activité.'], ['Calendrier', 'Définissez les étapes, les horaires autorisés et les opérations qui doivent être achevées avant l’arrivée des équipes.'], ['Réception', 'Prévoyez une vérification des biens livrés, des emplacements et des réserves éventuelles.']],
    link: '/transfert-bureaux-paris', label: 'Préparer les opérations de transfert de bureaux',
  },
  '/transfert-bureaux-paris': {
    title: 'Préparer chaque poste avant le transfert',
    intro: 'Un plan d’implantation et un étiquetage commun limitent les recherches à l’arrivée. Ils complètent le planning général du déménagement de l’entreprise.',
    rows: [['Inventaire', 'Attribuez un identifiant à chaque poste, meuble et carton. Indiquez la pièce de destination sur le plan.'], ['Mobilier', 'Repérez les éléments à démonter et les contraintes de remontage. Réservez les ascenseurs et les accès nécessaires.'], ['Informatique', 'Coordonnez sauvegardes, arrêt et remise en service avec votre responsable informatique ; précisez les tâches confiées à chaque intervenant.'], ['Installation', 'Validez l’implantation puis contrôlez les postes et les circulations avant la reprise.']],
    link: '/blog/demenagement-entreprise-paris-checklist', label: 'Consulter la checklist de transfert',
  },
};

export function ServiceDecisionGuide() {
  const { pathname } = useLocation();
  const guide = guides[pathname];
  if (!guide) return null;
  return <section className="py-12 bg-slate-50 dark:bg-slate-900">
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <h2 className="text-3xl font-bold mb-5">{guide.title}</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8">{guide.intro}</p>
      <dl className="grid gap-6 md:grid-cols-2">{guide.rows.map(([title, text]) => <div key={title} className="rounded-2xl bg-white dark:bg-slate-950 p-6"><dt className="font-bold mb-2">{title}</dt><dd className="text-slate-600 dark:text-slate-300">{text}</dd></div>)}</dl>
      <p className="mt-8"><Link className="underline underline-offset-4 font-semibold" to={guide.link}>{guide.label}</Link></p>
      {pathname.includes('monte-meuble') && <p className="mt-4 text-sm">À Paris : <a className="underline" href="https://www.paris.fr/pages/faq-demenagements-4404">consulter les conditions officielles de stationnement pour un déménagement</a>. Pour une autre commune, vérifiez les modalités auprès de sa mairie.</p>}
    </div>
  </section>;
}
