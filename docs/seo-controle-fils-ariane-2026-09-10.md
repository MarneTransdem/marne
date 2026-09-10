# Contrôle des libellés de fils d’Ariane

L’inspection Search Console de la page longue distance signalait un libellé absent dans le dernier élément du fil d’Ariane d’une ancienne exploration. Le test Google en direct du 10 septembre 2026 a confirmé que la version publique actuelle possède un élément valide. Le balisage public ne nécessite donc pas de nouvelle réécriture pour ce défaut.

Le contrôle de pré-rendu vérifiait uniquement la syntaxe JSON. Il vérifie désormais également la présence d’un libellé non vide dans `ListItem.name` ou `item.name` pour chaque élément de `BreadcrumbList`, y compris dans les tableaux et les graphes JSON-LD. Un défaut bloque le build et apparaît avec le chemin de la page concernée.

Source : https://developers.google.com/search/docs/appearance/structured-data/breadcrumb

Les tests couvrent l’absence du dernier libellé, les espaces seuls, plusieurs fils d’Ariane, les graphes, le nom imbriqué et les autres types de schémas. Il s’agit d’un contrôle ciblé de non-régression, pas d’un validateur exhaustif Schema.org ni d’une garantie de résultat enrichi.

Validation : `npm run check`, incluant le test dédié et l’audit des 153 pages ; test Google en direct valide ; demande de nouvelle exploration acceptée. Aucun changement des textes, URL, métadonnées ou dates éditoriales.
