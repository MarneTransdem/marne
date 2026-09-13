# Rubriques Services sur mobile — 13 septembre 2026

## Défaut observé en production

À une largeur de fenêtre de 390 px, la page Services avait une largeur défilable de 478 px. Le titre « Prestations techniques » atteignait 424,7 px à droite ; « Transferts professionnels » atteignait 478,2 px. Les rubriques utilisaient `whitespace-nowrap` et refusaient de revenir à la ligne.

## Correction

Trois titres de rubrique peuvent revenir à la ligne, utilisent une taille adaptée au mobile et restent centrés. Les séparateurs décoratifs sont masqués sous le seuil `sm` et peuvent se réduire au-delà. Les textes, niveaux h2, cartes, liens et métadonnées sont conservés. Pas de modification des dates éditoriales pour ce changement de présentation.

## Validation locale

Suite complète réussie : 153 pages pré-rendues et auditées, 118 fragments de secteurs. Mesures dans le navigateur sur la compilation locale :

| Fenêtre | Largeur défilable du document | Débordement des trois rubriques |
|---:|---:|---|
| 320 px | 312 px | Aucun |
| 390 px | 382 px | Aucun |
| 1 280 px | 1 272 px | Aucun |

L’écart de 8 px correspond à la place disponible hors barre de défilement. Vérification visuelle des cartes sur téléphone effectuée. Vérification de la version publiée à effectuer après push. Cette correction améliore la lisibilité mobile ; aucun gain de classement ou de score Lighthouse n’est déduit de cette mesure.
