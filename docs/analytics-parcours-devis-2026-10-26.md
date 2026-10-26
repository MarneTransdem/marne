# Mesure du parcours de devis

## Événements

- `quote_cta_click` : ajout aux quatre CTA sectoriels, avec placements fixes `sector_hero`, `sector_individuals`, `sector_business` et `sector_final`.
- `quote_form_start` : première modification d’un champ ou action explicite de continuation/envoi du formulaire principal, avec consentement Analytics actif.
- `quote_step_2_view` et `quote_step_3_view` : étapes « Vos besoins » et « Vos coordonnées » atteintes avec consentement. Le paramètre fixe est `placement=quote_form`.

Le début et chaque étape sont dédupliqués par instance du formulaire. Revenir à l’étape précédente ne les renvoie pas. Recharger ou rouvrir le formulaire crée une nouvelle tentative ; ces compteurs ne sont pas des personnes uniques. Une acceptation tardive du consentement ne reconstruit pas les étapes antérieures.

## Confidentialité et conversion

Les nouveaux événements n’acceptent aucun contenu de champ, nom, e-mail, téléphone, adresse, message ou identifiant client. Les contrôles existants de consentement, de retrait, de nettoyage des URL et d’attribution sont conservés. Aucun script tiers supplémentaire ni changement de consentement automatique.

Le domaine public canonique et sa variante sans www sont les seuls hôtes autorisés pour Analytics/Ads. Les hôtes locaux et d’aperçu, qui embarquent aussi la configuration de production, ne chargent pas la mesure de production. Cela ne retire aucune donnée historique déjà collectée.

Les événements intermédiaires utilisent `trackEvent`, sans déclencher `generate_lead` ou Google Ads. La conversion existante reste conditionnée à l’enregistrement Firestore confirmé. `quote_form_submit` et `generate_lead` décrivent le même envoi : ils ne s’additionnent pas en nombre de demandes.

## Lecture des résultats

Les nouvelles mesures seront disponibles pour les interactions futures et les visiteurs consentants. Elles ne permettent pas de reconstituer les abandons historiques. Les événements n’ont pas été déclarés événements clés. Comparer des parcours et périodes cohérents ; distinguer l’attribution personnalisée des dimensions natives de session GA4.

## Vérifications avant publication

`npm run check` réussi : consentement et retrait, absence d’envois depuis les hôtes d’aperçu, déduplication, acceptation tardive sans reconstitution des étapes, absence de contenu de champ, enregistrement CRM confirmé ou échoué, notification échouée et double envoi concurrent. Le test du composant réel vérifie que le honeypot ne déclenche pas le début et que deux modifications ne produisent qu’un début et une étape.

TypeScript, compilation et audits de 161 pages / 126 fragments sectoriels réussis. Parcours mobile à 390 px testé dans l’aperçu : étapes 1 → 2 → 3 → 2 → 3, sans envoi de demande, sans débordement et sans script gtag chargé. Ces tests ne prouvent pas encore la réception de nouveaux événements provenant de visiteurs réels dans les rapports GA4.
