# Pages sectorielles : accès direct au formulaire de devis

## Constat et correction

Lors du test à 390 × 844 px depuis le CTA principal de Châtillon, le formulaire se trouvait à 445 px et le premier champ à 782 px après navigation. Ce champ se plaçait près du bas de l’écran et de la barre mobile fixe.

Les quatre CTA principaux du modèle sectoriel pointent désormais vers `/demande-de-devis#formulaire-devis`. La cible et sa marge de défilement existent déjà sur la page devis, et le composant global de navigation gère les ancres lors des transitions. Les liens restent présents dans le HTML initial.

## Portée

Aucune ville n’est supposée être le départ ou l’arrivée. Aucun champ, validation, envoi CRM, paramètre de suivi ou URL canonique n’est modifié. Les autres liens éditoriaux vers la page devis sont conservés. Les dates éditoriales restent inchangées.

L’objectif est de faciliter le début de la saisie après un clic explicite de demande de devis. Le taux de conversion devra être mesuré ; aucune hausse n’est établie par ce seul changement.

## Vérifications avant publication

TypeScript, compilation, audits de 161 pages HTML et 126 fragments sectoriels réussis. Contrôle ciblé de 504 liens principaux sur les 126 pages : ancre correcte, cible unique dans le HTML du devis et canonique conservée. Test de navigation mobile à 390 × 844 px : cible à 128 px et premier champ à 465 px, contre 782 px avant correction. Le résultat est identique après rechargement direct. Aucun débordement à 320, 390 ou 1440 px et aucun formulaire envoyé.
