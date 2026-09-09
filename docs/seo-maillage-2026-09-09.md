# Maillage des ressources — 9 septembre 2026

## Problème et changement

Le bloc partagé « Pour préparer votre projet » proposait les mêmes guides de prix, volume et démarches sur la majorité des pages, notamment le stockage et l’emballage. Ses actions conservaient également des liens vers la page en cours.

Le bloc adapte maintenant son introduction et ses liens à sept contextes : entreprise, manutention particulière, stockage, emballage/cartons, volume/étudiant, prix/formules/devis et préparation générale. Trois ressources au maximum sont proposées, avec des actions complémentaires sans doublon ni lien vers la page courante. Les alias sont normalisés avant sélection. Aucune nouvelle page, promesse commerciale ou donnée tarifaire n’est créée.

Exemples : stockage → estimation du volume, protection et cartons ; cartons → protection, formules et volume ; petit volume → guide volume, calculateur et prix. Les pages de transfert utilisent une introduction adaptée à l’activité professionnelle.

Référence : [recommandations Google sur les liens explorables et les ancres contextualisées](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=fr).

## Validation

`npm run check` réussi : contrôles du site, du suivi consenti, du moteur CRM, TypeScript et génération des 153 pages HTML. Le contrôle complémentaire du HTML prérendu valide les 151 blocs de ressources : destinations canoniques, absence de liens vers soi-même et de doublons, ainsi que les parcours stockage, cartons et petit volume. Les deux pages légales n’affichent pas ce bloc.

## Mesure

Le rapport GA4 « SEO → demandes de devis | Marne Transdem » est enregistré avec une vue tous canaux et une vue `organic_search`. Il rapproche `page_view` et `generate_lead` par page d’entrée, canal et source du parcours consenti. Le test du 9 septembre a été reçu une fois comme événement clé et l’utilisateur a confirmé sa réception dans le CRM. Cette demande est un test, pas un résultat commercial.

Les dimensions personnalisées sont nouvelles ; les anciennes données ne permettent pas de reconstruire ces parcours. Évaluer les demandes futures et les performances Search Console sur des fenêtres comparables, sans attribuer d’emblée une évolution à ce seul changement de maillage.
