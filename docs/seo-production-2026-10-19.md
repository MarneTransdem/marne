# Contrôle SEO en production — 19 octobre 2026

## Résultat observé

Site contrôlé : https://www.devisdemenagement-paris.com

- 161 URL distinctes dans le sitemap public, correspondant aux routes du dépôt.
- 161 réponses HTTP 200 de type HTML, sans suivre de redirections.
- Une canonique absolue correcte, un titre, une description et un H1 par page.
- Aucun doublon exact de titre ou de description entre ces pages.
- Aucun `noindex` / `none` dans les métadonnées robots contrôlées ou l'en-tête `X-Robots-Tag` des pages du sitemap.
- Contenu prérendu présent dans le HTML reçu sans exécution de JavaScript.
- Toutes les pages du sitemap accessibles depuis l'accueil par des liens HTML internes.
- Aucun lien HTML interne hors des routes canoniques, hormis le sitemap ; aucune ancre interne absente.
- Les 12 vérifications de `scripts/audit-server.mjs` passent : redirections permanentes, conservation des paramètres, vraies 404, pages privées testées en noindex et domaine canonique.

Le premier relevé complet est horodaté `2026-10-19T09:08:58.334Z` (11 h 08, heure de Paris).

## Modification livrée

`npm run audit:public-seo` exécute le nouveau script `scripts/audit-public-seo.mjs`.
Il contrôle le sitemap réellement servi et chaque page publique, avec quatre requêtes simultanées et un délai maximal de 20 secondes par requête. Il compare également le sitemap aux routes du dépôt pour repérer une publication incomplète.

Le rapport détaillé est enregistré dans `build/public-seo-audit.json`, ignoré par Git. Toute anomalie entraîne un code de sortie non nul. Cette commande reste séparée de la compilation : une indisponibilité du réseau ou un déploiement encore en cours ne doit pas bloquer un build local.

Les contrôles HTTP complémentaires se relancent avec :

```sh
node scripts/audit-server.mjs https://www.devisdemenagement-paris.com
```

Impact attendu : détecter après publication les régressions d'accès, de métadonnées et de maillage qui empêcheraient ou compliqueraient l'exploration. Aucun changement des contenus commerciaux, du design ou du formulaire n'est nécessaire à la suite de ce relevé.

## Limites

Ces contrôles portent sur le HTML initial réellement servi, pas sur les décisions d'indexation de Google, les positions, les Core Web Vitals ou l'ensemble des règles de robots.txt. Les expressions de lecture correspondent au balisage généré par ce projet ; elles ne constituent pas un analyseur HTML universel. Le test de portée des liens compte aussi les liens de navigation et de pied de page : il ne mesure pas la qualité éditoriale du maillage contextuel.

Un HTTP 200 ne garantit pas l'indexation, comme le précise la [documentation Google sur les codes HTTP](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes?hl=fr). L'analyse Search Console reste reportée à la demande de l'utilisateur.

## Validation

- Audit HTTP public : 12 contrôles réussis.
- Audit des 161 pages publiques : aucune anomalie détectée.
- Vérification de syntaxe Node du nouveau script et `git diff --check`.

Aucun code exécuté par le site n'est modifié : seule la commande d'audit et sa documentation sont ajoutées.
