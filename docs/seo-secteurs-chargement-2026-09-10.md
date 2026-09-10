# Chargement indépendant des données des secteurs

Le composant `SectorPage` importait les textes, FAQ et liens des 118 secteurs. Chaque visite d’une page géographique téléchargeait donc toutes ces données. Le contenu éditorial reste centralisé dans `src/constants/sectorsData.ts`, mais la préparation du site produit désormais un JSON par secteur dans `src/generated/sectors/` (fichiers générés, ignorés par Git).

Vite transforme ces JSON en fichiers JavaScript distincts. Le composant utilise des imports différés et des composants React `lazy` stables pour charger seulement la destination demandée. Le pré-rendu attend toujours la fin du rendu via `onAllReady` : les contenus et métadonnées restent dans le HTML public, sans dépendre de l’exécution de JavaScript pour être présents.

Mesures sur la compilation locale, avant/après (octets gzip calculés sur les fichiers, pas une mesure réseau Lighthouse) :

| Périmètre | Avant | Après |
| --- | ---: | ---: |
| Fichier commun aux secteurs | 93 098 | environ 14 300 |
| Données Paris–Nantes | incluses ci-dessus | 2 697 |
| Total modèle + données pour Nantes | 93 098 | environ 17 000 |

La baisse est d’environ 82 % pour cette partie du JavaScript. Elle ne représente pas le poids total de la page : les bibliothèques, images, styles et autres composants restent à télécharger. Le chargement des données ajoute une requête différée. Aucun nouveau score Lighthouse ou gain de classement n’est revendiqué.

## Validation

- `npm run check` : tests existants, TypeScript, compilation et audit des 153 pages pré-rendues.
- Comparaison du contenu principal des 147 fichiers HTML à la racine de `dist` avant/après : identique, hors commentaires React. Les six articles dans le sous-dossier `blog` restent couverts par l’audit des 153 pages.
- Nouveau contrôle intégré à chaque build : 118 données importées indépendamment, taille du modèle limitée et présence des pages HTML correspondantes.
- Navigation réelle sur le serveur local de production : Nantes → longue distance → Nantes ; rendu de Nantes confirmé. Destination inexistante : HTTP 404.
- Vérification après publication : modèle allégé et données propres à Nantes servis en HTTP 200, page Nantes complète.

`npm run dev` prépare automatiquement les fichiers générés ; `npm run build` les régénère également et retire les anciennes entrées devenues inutiles. Les modifications éditoriales se font exclusivement dans le fichier source, puis nécessitent une nouvelle préparation du site. Aucun changement de contenu : pas de nouvelle date éditoriale dans le sitemap.
