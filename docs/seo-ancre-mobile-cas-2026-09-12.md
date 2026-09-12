# Visibilité de l'exemple après navigation par ancre

Le contrôle en production à 390 × 844 a révélé que l'ancre small-move-example plaçait le titre à environ 0 px du haut, derrière l'en-tête fixe d'environ 81 px. Le titre et le statut du projet étaient masqués à l'arrivée depuis Paris 12e.

Ajout d'une marge de défilement sur le titre ciblé (scroll-mt-40). Le chemin, le fragment et le contenu restent identiques. Aucune modification de date éditoriale pour cette correction de présentation.

Validation : npm run check ; navigation vers le formulaire sans envoi ; contrôle du titre et du statut au-dessus du texte après publication. Journal local : build/check-ancre-mobile-2026-09-12.log.
