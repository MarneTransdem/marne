# Fiabilisation des pages Montreuil et Pantin — 19 octobre 2026

## Problème et changements

Les anciennes pages annonçaient un dépôt des demandes 15 jours francs avant le déménagement, une signalisation posée 48 heures à l’avance et une prise en charge administrative systématique. À Montreuil, le texte promettait aussi une réservation de places alors que la mairie indique ne plus en réserver pour les déménagements. D’autres passages affirmaient l’absence de risque de détérioration, un déballage intégral automatique et l’utilisation de matériels non confirmés.

- Remplacement de ces affirmations par les démarches municipales sourcées et une répartition des responsabilités à préciser dans le devis.
- **Montreuil** : parcours de manutention, atelier en fond de cour, distinction entre réservation de places et autorisation d’occupation, inventaire des biens fragiles.
- **Pantin** : entrée utilisable, mezzanine, transfert de bureaux, vérification de l’interlocuteur compétent pour la voie et faisabilité réelle du monte-meuble.
- Cinq FAQ propres à chaque page, issues de la même source pour le contenu visible et le JSON-LD.
- Titres de 55 et 60 caractères ; descriptions de 150 et 152 caractères. Mise à jour du registre `contentUpdatedAt.json` et régénération des métadonnées et du sitemap.
- Liens contextuels vers les services, le devis et la page du 93. Liens de proximité recentrés sur les communes et arrondissements proches ; suppression des listes éloignées du besoin local.

Les deux URL, les canoniques et le gabarit sont conservés. Aucun tarif, chantier client, avis ou matériel supplémentaire n’est inventé. L’objectif est d’améliorer la fiabilité et l’utilité des pages, sans promettre de gain de classement.

## Sources officielles

Consultées le 19 octobre 2026 :

- [Montreuil — permissions et droits de voirie](https://www.montreuil.fr/urbanisme/urbanisme-et-habitat/permissions-et-droits-de-voirie), mise à jour affichée au 10 août 2026.
- [Pantin — demande d’occupation du domaine public](https://mesdemarches.pantin.fr/demarche/98/2). La page présente un cadre général d’instruction, des redevances et des cas particuliers selon la voie. Aucun délai unique de 15 jours n’en est déduit.

## Validation

- `npm run check` réussi : tests fonctionnels, audit du site et CRM, TypeScript, compilation, 161 pages prérendues et 126 fichiers de données sectorielles séparés.
- Les deux HTML contiennent les introductions et les FAQ attendues ; le JSON-LD correspond aux réponses visibles. H1 unique, longueurs des titres et descriptions conformes aux objectifs.
- Contrôle mobile à 390 px sur les deux pages, ordinateur à 1440 px sur Pantin : aucun débordement horizontal constaté et contenu lisible.
- Après push, contrôler la réussite App Hosting, comparer les contenus publics au commit et lancer l’audit SEO des 161 URL.
