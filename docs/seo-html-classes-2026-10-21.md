# HTML des introductions locales — 21 octobre 2026

## Correction et portée

Le template SectorPage injecte les introductions comme du HTML. Des attributs JSX `className` y étaient présents sur 22 pages (206 occurrences) : les navigateurs n’y appliquent pas les classes CSS. Ils ont été remplacés par l’attribut HTML `class`, sans changer les textes, les liens ou les listes de classes.

Secteurs concernés : Essonne, Guyancourt, Nogent-sur-Marne, Paris 9/10/11/12/13/14/16/17/19, Saint-Mandé, Saint-Maur-des-Fossés, Seine-et-Marne et trajets Paris–Lille/Marseille/Montpellier/Rennes/Strasbourg/Toulouse.

Les dates de modification des seules pages concernées sont actualisées. Le sitemap est régénéré. Les audits du HTML prérendu et du site public rejettent désormais ce défaut afin d’éviter une régression.

Impact attendu : HTML conforme à l’usage prévu, styles de présentation des introductions effectivement applicables. Ce défaut n’est pas présenté comme un blocage d’indexation ; aucun gain de classement n’est garanti. Les styles du site et la structure du template ne sont pas modifiés.

## Validation

Le nouveau garde-fou a rejeté les anciens HTML en signalant les 22 pages attendues. Après correction, npm run check est réussi : tests, TypeScript, compilation et audit des 161 pages prérendues. Exemple Paris 11e contrôlé en aperçu local à 390 × 844 et 1440 × 900 : classes appliquées, aucun attribut classname résiduel ni débordement horizontal mobile observé. Contenu public et déploiement à vérifier après push.
