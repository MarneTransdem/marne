# Contenus locaux Paris 15e et Paris 18e — 19 octobre 2026

## Intervention

Les introductions précédentes reposaient sur des promesses générales de maîtrise locale et de réactivité. Certaines mises en forme utilisaient `className` dans des chaînes HTML, et les listes de proximité comportaient notamment Nogent-sur-Marne pour ces deux arrondissements.

- **Paris 15e** : relevé du chemin de manutention dans la résidence, dimensions des ascenseurs, consignes de copropriété, démarche de stationnement sourcée, inventaire et préparation des trajets vers Issy-les-Moulineaux et Vanves.
- **Paris 18e** : approche du véhicule, marches et portage, vérification des conditions d’accès à Montmartre, étude de faisabilité du monte-meuble et préparation des petits volumes.
- Cinq FAQ propres à chaque page ; le modèle utilise la même source pour les réponses visibles et le JSON-LD FAQPage.
- Liens contextuels vers les services, outils et formulaire ; liste de proximité recentrée sur les arrondissements et communes proches.
- Métadescriptions différenciées : 146 et 149 caractères. Titres, H1 et URL canoniques conservés.

Le changement porte sur `src/constants/sectorsData.ts` et son index généré `src/constants/sectorMetadata.json`. Aucun nouveau gabarit, script côté visiteur, tarif fixe, avis ou garantie n'est ajouté. Les dates de modification des deux pages étaient déjà au 19 octobre 2026 : elles restent inchangées.

## Sources officielles consultées

- [Ville de Paris — stationnement pendant un déménagement](https://www.paris.fr/pages/faq-demenagements-4404), page indiquant une mise à jour au 3 juillet 2026.
- [Mairie du 18e — piétonnisation de la Butte Montmartre](https://mairie18.paris.fr/pages/pietonisation-de-la-butte-montmartre-29604), page indiquant une mise à jour au 12 novembre 2025. Son texte présente un projet : le contenu demande donc de vérifier les conditions en vigueur à l'adresse et à la date du déménagement, sans affirmer que toutes les dispositions sont déjà mises en place.
- [Mairie du 15e — Grenelle, Vaugirard et Javel](https://mairie15.paris.fr/pages/origines-du-15e-arrondissement-grenelle-vaugirard-javel-13321), pour les noms des quatre quartiers administratifs.

Les recommandations d'inventaire et de relevé des accès sont des conseils de préparation, pas des affirmations selon lesquelles tous les bâtiments d'un arrondissement présentent les mêmes contraintes.

## Validation

- Suite complète `npm run check` : tests, audit du site, moteur de dossiers CRM, TypeScript, compilation et audit des 161 pages prérendues.
- Contrôle ciblé des deux HTML : introductions, liens, FAQ visibles et données structurées issus des contenus modifiés.
- Chrome à 390 px : H1 unique et aucun débordement horizontal sur les deux pages ; lecture visuelle de l'introduction du 18e.

Impact attendu : mieux répondre aux questions de préparation propres à ces pages, faciliter le passage vers un service utile et rendre les métadescriptions plus distinctes. Aucun gain de position ni d'affichage enrichi FAQ n'est présumé.
