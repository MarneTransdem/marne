# Parcours départemental du Val-d'Oise

Sept pages de communes existantes ont été rapprochées de la [liste officielle des communes du département 95](https://geo.api.gouv.fr/departements/95/communes?fields=nom,code&format=json), consultée le 9 septembre 2026. Le rapprochement utilise les noms et slugs normalisés, sans déduire une appartenance depuis une proximité géographique. Les codes conservés sont des codes INSEE, non des codes postaux.

Le guide départemental propose désormais un accès aux sept communes : Argenteuil, Cergy, Enghien-les-Bains, Franconville, Montmorency, Pontoise et Saint-Gratien. Le fil d'Ariane visible et le JSON-LD de chaque commune utilisent le Val-d'Oise comme parent. Les URL canoniques restent inchangées. Aucun appel à l'API géographique n'est nécessaire pour afficher les pages.

La liste couvre les pages identifiées dans le projet, pas l'ensemble des communes du département ni une promesse de disponibilité. Les autres départements ne sont pas modifiés.

Validation : npm run check ; vérifier les sept liens de la section départementale et les sept parcours retour, dans le HTML et le JSON-LD. Contrôler les mêmes huit pages publiques après déploiement. Aucun gain de classement revendiqué.
