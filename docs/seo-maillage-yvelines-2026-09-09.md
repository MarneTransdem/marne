# Parcours départemental des Yvelines

22 pages locales existantes sont rapprochées de la liste officielle : https://geo.api.gouv.fr/departements/78/communes?fields=nom,code&format=json (9 septembre 2026). Correspondance des noms et slugs normalisés, sans déduction depuis une proximité. Les identifiants conservés sont des codes INSEE.

Le guide Yvelines donne accès à ces 22 communes. Leur fil d'Ariane visible et JSON-LD remonte au département. La liste couvre les pages disponibles sur le site, pas toutes les communes du département. Les URL, métadonnées et FAQ sont conservées.

Le rendu de la liste est partagé avec le Val-d'Oise déjà traité. Libellés « Déménagement : commune » pour éviter des prépositions incorrectes devant Le/La. Aucun appel réseau au service géographique lors de l'affichage.

Validation : npm run check ; contrôler les 22 liens aller et les 22 parcours retour. Recontrôler les sept communes du Val-d'Oise et les 118 fils d'Ariane du modèle. Vérifier les 23 pages publiques des Yvelines après déploiement. Aucun gain de classement revendiqué.
