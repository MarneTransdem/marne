# Liens des prestations vers les secteurs — 19 octobre 2026

## Constat et intervention

Les contenus des cinq pages commerciales principales renvoyaient vers les autres services et le devis, sans accès contextuel direct aux pages des départements prioritaires.

Le composant typé `ServiceAreaLinks` complète les pages particuliers, entreprises, transfert de bureaux, garde-meuble et monte-meuble. Il propose quatre destinations : l’annuaire des arrondissements et secteurs, les Hauts-de-Seine, la Seine-Saint-Denis et le Val-de-Marne. L’introduction dépend de la prestation et explique quelles informations préparer aux adresses concernées. Le bloc stockage ne présente pas les secteurs comme des adresses d’entrepôts.

Les liens React Router sont rendus en ancres HTML dans le pré-rendu. Aucune dépendance ni requête réseau supplémentaire. Mise en page sur une colonne puis deux à partir du breakpoint `sm`, liens avec état de focus visible et texte descriptif.

## Impact attendu et contrôles

Faciliter le passage d’une prestation à son contexte local et la découverte des pages de secteurs. Les pages locales possèdent déjà des liens vers les services et le formulaire de devis.

L’audit de compilation vérifie les quatre liens à l’intérieur du bloc de chaque page, pour ne pas confondre ce maillage contextuel avec les liens du footer. Les contrôles existants vérifient aussi la validité des destinations, les métadonnées, les canoniques et l’absence de pages orphelines.

Référence : [liens explorables et ancres descriptives, Google Search Central](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
