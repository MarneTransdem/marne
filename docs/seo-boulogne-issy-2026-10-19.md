# Boulogne-Billancourt et Issy-les-Moulineaux — 19 octobre 2026

## Intervention

- Remplacement des introductions très proches par des contenus propres aux deux communes : préparation des accès, organisation du transport, démarche municipale et choix des prestations.
- Correction du HTML des introductions (`className` dans une chaîne HTML) et suppression de la coquille « s’tend ». Les liens restent des ancres HTML dans le contenu prérendu.
- Cinq FAQ distinctes par page, reprises par le JSON-LD existant sans modifier le gabarit.
- Maillage de proximité recentré sur les communes proches, Paris limitrophe et la page Hauts-de-Seine. Retrait des destinations éloignées de ces deux listes, sans suppression de leurs pages.
- Titres de 58 et 57 caractères ; descriptions de 146 et 152 caractères. Dates de modification actualisées ; métadonnées et sitemap régénérés par la compilation.

Impact attendu : différencier les réponses locales, fournir une démarche utile à la préparation du devis et améliorer la pertinence des liens. Aucun classement ni délai d’indexation garanti.

## Sources

- [Boulogne-Billancourt — Mes démarches](https://www.boulognebillancourt.com/mes-demarches), rubrique Stationnement ouverte dans le navigateur le 19 octobre 2026 : contact municipal pour une demande d’autorisation de stationnement lors d’un déménagement. Aucun délai ou tarif non publié n’est ajouté.
- [Issy-les-Moulineaux — Déménagements et emménagements](https://www.issy.com/demarche-demenagement), page municipale mise à jour le 16 juillet 2026, consultée le 19 octobre 2026. Le texte conserve la distinction entre barrières informatives et arrêté municipal, et renvoie vers la procédure à jour.

## Validation

Avant publication : tous les contrôles de `npm run check` sont réussis (tests, TypeScript, compilation et audit des 161 pages prérendues). Le contrôle ciblé valide les introductions, les FAQ visibles et JSON-LD, le H1 unique et les longueurs des métadonnées. Affichage vérifié à 390 px sur les deux pages et à 1440 px sur Boulogne-Billancourt, sans débordement horizontal. Revue du diff et `git diff --check` effectués.

Après push : vérifier le déploiement, la conformité du contenu public et les 161 URL avec `npm run audit:public-seo`. Les résultats de publication et le statut des workflows GitHub sont consignés dans le compte rendu ; ces contrôles ne prouvent pas l’indexation par Google.
