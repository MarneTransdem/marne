# Audit d’indexabilité en production — 10 septembre 2026

Contrôle HTTP public des 153 URL du sitemap, avec lecture du HTML sans exécuter JavaScript.

- 153 réponses HTTP 200, un H1 et une canonique cohérente par page. L’origine avec ou sans slash final est normalisée avant comparaison.
- Aucune directive noindex/none dans les métadonnées robots/googlebot ni dans X-Robots-Tag des pages contrôlées.
- robots.txt et sitemap accessibles en HTTP 200. Robots autorise le site public et référence le sitemap.
- Parcours des liens HTML depuis l’accueil : 61 pages à un clic, 91 à deux clics, aucune page orpheline parmi les 153 URL.
- Domaine sans www : 301 vers www, vérifiée sur l’accueil et un article. HTTP vers HTTPS : 301 ; depuis HTTP sans www, deux étapes restent nécessaires. Aucune boucle constatée sur les variantes testées.
- Ancien alias /particuliers et slash final d’Alfortville : 301. URL inexistante de contrôle : 404.

Ce contrôle ne prouve pas l’indexation effective et ne remplace pas Search Console. Il ne permet pas d’exclure une action manuelle, un problème intermittent ou des problèmes de qualité de contenu. Les statistiques de profondeur sont calculées par parcours en largeur, sur les liens présents dans le HTML reçu.

## Amélioration du sitemap

Ajout de dates de révision significative pour cinq pages dont le contenu a été retravaillé et documenté : Charenton, Alfortville, Maisons-Alfort et Ivry (9 septembre), Le Perreux (10 septembre). Références : documents SEO correspondants dans ce dossier et historique Git. Ces dates décrivent les révisions du contenu principal ; elles ne changent pas automatiquement lors des builds, retouches de libellés ou changements de styles.

Registre : src/constants/contentUpdatedAt.json. Ajouter ou modifier une entrée uniquement après une révision significative et documentée ; conserver l’absence de date lorsqu’elle est inconnue. Le serveur et les sitemaps générés utilisent le même registre. Suppression de l’argument permettant d’appliquer une date globale à toutes les URL (aucun appelant ne l’utilisait).

Google indique utiliser lastmod lorsque la date est fiable et vérifiable : https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

L’envoi répété d’une demande de réexploration n’accélère pas le traitement ; le sitemap reste un signal, sans garantie d’indexation : https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

## Suite prioritaire

Comparer dans Search Console les URL exclues et leurs motifs actuels, en ciblant d’abord les pages de services et contenus déjà visibles sur des requêtes. Utiliser l’inspection d’URL sur quelques pages substantielles récemment retravaillées. Améliorer ensuite les contenus qui restent peu utiles ou trop similaires, et documenter les preuves réelles de l’activité. Éviter de créer davantage de pages locales génériques pour tenter d’accélérer l’indexation.
