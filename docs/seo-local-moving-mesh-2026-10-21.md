# Aide à la préparation du devis en petite couronne — 21 octobre 2026

## Modifications et impact attendu

Le composant LocalMovingLinks, réservé jusqu’ici aux arrondissements parisiens, accueille un contexte de commune facultatif. SectorPage le renseigne uniquement pour les communes déjà listées dans les groupes des Hauts-de-Seine, de Seine-Saint-Denis et du Val-de-Marne.

Un bloc visible propose six liens HTML : département, calculateur, monte-meuble, stockage, formules et demande de devis. Il accompagne le visiteur dans la préparation de son projet et rend ces destinations accessibles dans un contexte explicite. Aucun nouveau secteur, aucune proximité géographique ni prestation locale supplémentaire ne sont inventés. Les liens existants entre secteurs et le comportement parisien sont conservés.

Les dates de modification des communes concernées sont actualisées ; le sitemap est régénéré. Le composant réutilise le style et la grille responsive existants, sans importer le catalogue complet des secteurs dans le navigateur.

Objectif : faciliter l’orientation vers les outils et prestations avant le devis et renforcer le maillage contextuel. Aucun classement ni délai d’indexation garanti.

## Validation

npm run check réussi : tests fonctionnels, TypeScript, compilation et audit des 161 pages prérendues. Contrôle ciblé des 59 communes : six liens HTML initiaux, département correct et aucun lien vers soi. Exemple Créteil contrôlé en aperçu local à 390 × 844, 768 × 1024 et 1440 × 900 : grille une/deux/trois colonnes, aucun débordement horizontal observé. Contenu public et déploiement à vérifier après push.
