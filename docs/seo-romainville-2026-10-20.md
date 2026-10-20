# Romainville — 20 octobre 2026

## Modifications et impact attendu

- Remplacement du contenu promotionnel générique et des promesses absolues par des conseils de préparation des accès, du volume et des prestations.
- Correction de la signalisation annoncée à 48 h : le formulaire actuellement lié depuis la démarche municipale mentionne quatre semaines pour le dépôt et sept jours pour l’affichage. Distinction entre demande et autorisation obtenue ; répartition des tâches à confirmer dans le devis.
- Cinq FAQ visibles reprises par le JSON-LD existant, liens vers outils, services, devis et secteurs voisins.
- Métadonnées et date de modification actualisées ; URL et template conservés, sitemap régénéré.

Objectif : répondre à l’intention locale avec des informations vérifiables et faciliter une demande de devis complète. Aucun classement ni délai d’indexation garanti.

## Sources

- [Ville — Occupation du domaine public](https://www.ville-romainville.fr/979-occupation-du-domaine-public.htm).
- [Formulaire actuellement lié par la Ville](https://www.ville-romainville.fr/cms_viewFile.php?idtf=140167&path=demenagement-dp.pdf), consulté le 20 octobre 2026.

Un ancien PDF reste indexé avec un délai de deux semaines : il n’a pas été retenu. Le lien de la page municipale actuelle pointe vers le document mentionnant quatre semaines. Aucun tarif ni traitement administratif automatique ajouté.

## Validation

npm run check réussi : tests fonctionnels, TypeScript, compilation et audit des 161 pages prérendues. Contrôle ciblé réussi : HTML initial, H1 unique, métadonnées (57 et 153 caractères) et cohérence FAQ/JSON-LD. Aucun changement de template ou de styles ; aucun nouveau contrôle visuel réalisé pour cette correction de contenu. Contenu public et déploiement à vérifier après push.
