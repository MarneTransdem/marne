# Maillage départemental des communes existantes

Listes officielles consultées le 9 septembre 2026 : https://geo.api.gouv.fr/departements/{code}/communes?fields=nom,code&format=json pour les départements 77, 91, 92, 93 et 94. Rapprochement exact des noms/slugs après normalisation des accents et séparateurs. Pas de correspondance approximative ni d'inférence depuis la proximité.

Résultat : 30 pages dans les Hauts-de-Seine, 11 en Seine-Saint-Denis, 17 dans le Val-de-Marne. Aucun rapprochement exact dans le jeu de pages pour 77 et 91 ; cela ne signifie pas absence de desserte ni impossibilité d'un alias. Les appellations non rapprochées restent hors de cette livraison.

Les trois guides proposent une liste des pages de communes identifiées. Les 58 communes utilisent leur département dans le fil d'Ariane visible et JSON-LD. Avec les 29 communes déjà traitées dans le Val-d'Oise et les Yvelines, le référentiel partagé couvre 87 pages locales. Aucune nouvelle URL, aucun appel externe à l'affichage, aucun changement des prestations ou FAQ.

Validation : npm run check ; vérifier les listes et les parcours retour sur les 87 communes, ainsi que les 118 fils d'Ariane du modèle. Confirmer l'absence de listes vides visibles pour 77/91. Après déploiement, contrôler les 58 nouvelles communes et les trois guides publics. Aucun gain de classement revendiqué.
