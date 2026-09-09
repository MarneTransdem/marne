# Navigation et fils d'Ariane des secteurs

L'audit du graphe HTML des 153 pages ne trouve aucune page orpheline. Franconville et Marly-le-Roi ont chacune trois pages entrantes distinctes ; cela ne suffit pas à diagnostiquer leur classement. Une analyse éditoriale de leurs liens entrants reste distincte de cette correction.

Défaut traité : le fil d'Ariane n'était affiché que pour les départements alors que les autres pages SectorPage le déclaraient en JSON-LD. La page longue distance répétait sa propre URL comme parent.

Le modèle affiche désormais son fil d'Ariane sur toutes ses pages. Une même liste produit les liens visibles et le schéma. Les départements remontent à la région, les destinations longue distance au guide longue distance et les autres secteurs à l'index des secteurs. Le guide longue distance remonte lui aussi à l'index et ne se référence plus comme parent. La page courante est indiquée par aria-current et ne devient pas un lien vers elle-même.

Source : [Google — fil d'Ariane](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?hl=fr), consultée le 9 septembre 2026. Le parcours doit aider à comprendre la place de la page dans le site. Aucun gain de classement garanti.

Validation : npm run check, puis comparaison navigation/JSON-LD sur toutes les pages issues de SectorPage. Vérifier l'unicité des étapes, les destinations et les cas commune, département, région et longue distance. Contrôler un échantillon public après déploiement.
