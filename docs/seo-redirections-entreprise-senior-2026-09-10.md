# Anciennes pages entreprise et résidence senior — 10 septembre 2026

Le nouveau contrôle des 36 anciennes URL issues de Search Console retrouve 15 destinations en 200 après redirection et 21 URL terminant en 404, avant cette correction.

Deux de ces 404 disposent d'un équivalent actuel répondant à la même intention :

| Ancienne route | Destination 301 | Correspondance |
| --- | --- | --- |
| /demenagement/entreprise/ | /demenagement-entreprises-paris | Transferts de bureaux, locaux professionnels et espaces de travail. |
| /demenagement-residence-senior | /demenagement-senior | Page traitant explicitement des installations en résidence senior et EHPAD, avec FAQ dédiée. |

Les règles sont enregistrées dans seo-routes.ts et firebase.json. Le normaliseur existant gère les barres finales et préserve les paramètres de requête. Les pages de destination restent dans le sitemap ; les anciennes URL n'y sont pas ajoutées.

Les autres URL ne sont pas redirigées sans correspondance vérifiée : anciens fichiers WordPress, auteur, embed, pagination, articles disparus, communes et ancienne offre luxe. Leur absence ne justifie pas une redirection générale vers l'accueil. Une restitution de contenu demande une analyse éditoriale distincte.

Contrôles avant livraison : npm run check et test HTTP des six anciennes routes restaurées sur les deux dernières interventions, sous trois variantes chacune (sans barre, avec barre, avec paramètre de suivi), puis contrôle des six destinations et de la canonique de l'accueil.

Validation locale réussie : npm run check (153 pages) et 18 variantes HTTP, six destinations, canonique unique de l'accueil.

