# Créteil — 21 octobre 2026

## Modifications et impact attendu

- Suppression de l’ancienneté de vingt ans, de la position de leader, de la protection totale et des promesses absolues de devis, non vérifiées. Suppression des attributs `className` dans le HTML injecté.
- Contenu pratique sur inventaire, résidences, accès, prestations et responsabilités lors des transferts professionnels ; liens vers les outils, services, devis et secteurs proches.
- Démarches de stationnement à confirmer auprès du service compétent sans inventer de délai. Distinction avec les droits résidentiels et abonnements de parking, qui ne constituent pas une réservation de déménagement.
- Cinq FAQ visibles reprises par le JSON-LD existant. Métadonnées et date de modification actualisées ; URL et template conservés, sitemap régénéré.

Objectif : fiabiliser les engagements et faciliter une demande de devis complète. Aucun classement ni délai d’indexation garanti.

## Sources et limites

- [Portail officiel de Créteil](https://demarches.ville-creteil.fr/), consulté le 21 octobre 2026, avec accès aux démarches et contact de la mairie.
- [Carte résidentielle du Centre ancien](https://demarches.ville-creteil.fr/espaces-publics-stationnement/je-sollicite-une-carte-pour-beneficier-du-tarif-de-stationnement-residentiel-pour-le-centre-ancien/).
- [Abonnements des parkings municipaux](https://demarches.ville-creteil.fr/espaces-publics-stationnement/je-sollicite-une-carte-dabonnement-aux-parkings-municipaux/).

Les délais et tarifs de déménagement présents sur des sites tiers n’ont pas été repris faute de validation dans une source municipale accessible. La page contact liée par le portail a renvoyé une erreur lors du contrôle ; le lien publié pointe vers le portail accessible.

## Validation

npm run check réussi : tests fonctionnels, TypeScript, compilation et audit des 161 pages prérendues. Contrôle ciblé réussi : HTML initial, H1 unique, métadonnées (55 et 153 caractères) et cohérence FAQ/JSON-LD. Aucun changement de template ou de styles ; aucun nouveau contrôle visuel réalisé pour cette correction de contenu. Contenu public et déploiement à vérifier après push.
