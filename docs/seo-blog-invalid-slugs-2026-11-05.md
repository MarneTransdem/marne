# Blog : rejeter les faux noms d’article — 5 novembre 2026

## Constat reproduit

Le registre des articles est un objet JavaScript. La lecture directe posts[id] acceptait aussi des propriétés héritées telles que constructor, toString, hasOwnProperty et __proto__. Le rendu React de /blog/constructor échouait dans getArticleDate (date absente). Le serveur dispose déjà d’un statut 404 pour les URL inconnues : cette correction vise le rendu applicatif et ne démontre pas une erreur HTTP 500 en production.

## Correction

BlogPost sélectionne désormais uniquement les clés propres au registre avec Object.hasOwn. Toute autre valeur utilise le composant NotFound et son noindex existants. Les articles et les alias historiques sont conservés.

## Contrôles

Un test de rendu réel vérifie cinq noms inconnus, l’absence de BlogPosting et le noindex, ainsi qu’un article valide et l’alias /blog/2. Ce test est intégré à npm run check. Aucun changement de métadonnées, de contenu éditorial ou de dates du sitemap.

Impact attendu : éviter une page applicative en erreur sur ces URL invalides et conserver un signal cohérent de page introuvable. Aucun gain de classement présumé.
