# Réparer les liens HTML des introductions locales

## Défaut reproduit

Les introductions de SectorPage sont injectées avec dangerouslySetInnerHTML. Six textes de sectorsData contenaient des balises React Link avec un attribut to : elles étaient émises telles quelles dans le HTML public, sans créer d'ancre cliquable. Pages concernées : Saint-Mandé, Maisons-Alfort, Ivry-sur-Seine, Saint-Maurice, Fontenay-sous-Bois et Villejuif.

## Correction

Remplacer ce balisage dans les données éditoriales par des ancres HTML a href et utiliser l'attribut HTML class. Cinq liens pointent vers le Val-de-Marne ; celui de Saint-Mandé pointe vers Charenton-le-Pont. Les destinations et les textes des liens sont conservés. Aucun changement de canonique ni nouvelle URL.

## Validation

Ajout dans l'audit du HTML prérendu d'un rejet des balises link portant un attribut to. Exécuté avant correction, le contrôle a bien échoué sur les six pages concernées. Exécuter ensuite npm run check et vérifier les six ancres dans les introductions prérendues, puis publiques après déploiement. Ce contrôle complète la validation existante des destinations internes : celle-ci ne pouvait pas détecter des liens qui n'étaient pas des ancres.

La réparation rend des liens existants utilisables et explorables. Elle ne démontre aucun gain de positionnement.
