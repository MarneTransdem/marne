# Préserver les saisies du devis — 19 octobre 2026

## Problèmes corrigés

Une estimation conservée dans le navigateur remplaçait systématiquement le volume transmis depuis l'accueil. Exemple : un ancien inventaire de 1,2 m³ pouvait écraser le choix récent de 30 m³.

Le bouton de retrait du calculateur effaçait aussi le volume et le commentaire sans vérifier s'ils avaient été modifiés par le visiteur.

## Comportement livré

- Un volume explicitement transmis depuis l'accueil est prioritaire. L'ancien inventaire n'est alors ni importé dans le formulaire ni joint à la demande CRM.
- Sans volume transmis, l'estimation du calculateur continue de préremplir les champs vides.
- Retirer l'estimation efface seulement les valeurs importées restées identiques. Un volume modifié ou un commentaire personnalisé est conservé, y compris un commentaire enrichi à partir du récapitulatif.
- Un brouillon illisible ou incomplet est ignoré avant toute mise à jour du formulaire.

La ville d'une page locale n'est pas utilisée pour supposer une adresse de départ : cette ville peut correspondre à l'arrivée.

## Fichiers

- `src/lib/quote-estimate.ts` : lecture typée du brouillon, récapitulatif et retrait préservant les modifications.
- `src/components/forms/QuoteForm.tsx` : intégration dans le formulaire.
- `scripts/test-quote-estimate.mjs` et `package.json` : régressions intégrées à `npm run check`.

## Validation avant publication

- Tests ciblés : priorité au volume explicite, conservation des modifications, nettoyage des valeurs inchangées, brouillons invalides.
- TypeScript et compilation réussis ; audit des 161 pages prérendues et des 126 modules locaux réussi.
- Parcours réel dans Chrome : calculateur à 1,2 m³, retour accueil, sélection de 30 m³, formulaire à 30 m³ sans ancien inventaire.
- Mobile 390 px : modification à 25 m³ et commentaire « Un piano à transporter. », puis retrait du calculateur ; les deux saisies restent présentes et aucun débordement horizontal n'est observé.
- Aucune demande de devis de test envoyée au CRM.
- Suite complète `npm run check` réussie. Le banc de test Analytics charge désormais les véritables fonctions de validation du téléphone et de gestion de l'estimation ; leur import manquant provoquait l'échec GitHub avant les tests d'envoi.

Impact attendu : moins de ressaisies et de demandes incohérentes à la suite d'une visite SEO. Aucun effet de classement ni gain de conversion n'est affirmé sans mesure.
