# Pages commerciales — 19 octobre 2026

## Intervention

- `src/lib/seo-routes.ts` : titres et descriptions de l’accueil, du devis et de cinq prestations. L’accueil présente le déménageur, le formulaire cible la demande de devis, les pages de services précisent leur prestation. Les titres font 51 à 58 caractères et les descriptions 145 à 153 caractères. Ces repères éditoriaux ne constituent pas des limites imposées par Google.
- `src/lib/schema.ts` : options typées pour associer un service à sa page canonique (`url`, `@id`, `mainEntityOfPage`). Le type de service reprend désormais son nom précis au lieu du libellé identique « Moving Service », notamment pour le stockage et le monte-meuble.
- Pages particuliers, entreprises, garde-meuble, monte-meuble et transfert de bureaux : transmission de leur chemin au générateur partagé. Le fournisseur reste l’entité Marne Transdem existante.
- `contentUpdatedAt.json` et sitemap généré : dates de modification des sept pages concernées.
- `scripts/audit-prerender.mjs` : contrôle dans le HTML initial des cinq services, de leur URL canonique, du fournisseur et d’un lien explorable vers le devis.

Impact attendu : des intentions de recherche mieux différenciées dans les métadonnées et une description structurée plus fidèle aux prestations. Aucun gain de position ni résultat enrichi n’est garanti. Aucun tarif, avis ou engagement commercial ajouté.

## Validation

Vérifier TypeScript, le test des routes SEO et la compilation complète avec audit du HTML pré-rendu. Le design et le fonctionnement du formulaire ne sont pas modifiés. La validation locale ne prouve pas le déploiement : vérifier séparément le commit servi par Firebase et les pages publiques.

Références : [Service, Schema.org](https://schema.org/Service) ; [titres dans Google Search](https://developers.google.com/search/docs/appearance/title-link).
