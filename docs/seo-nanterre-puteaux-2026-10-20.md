# Nanterre et Puteaux — 20 octobre 2026

## Intervention et impact attendu

- Introductions et FAQ différenciées : accès des logements, livraison des bureaux, inventaire, choix des prestations et démarches locales.
- Liens vers les procédures municipales de déménagement. Les délais sont rattachés à leur source et les démarches, frais et signalisation doivent être convenus dans le devis.
- Suppression des listes de quartiers et promesses générales de réactivité au profit de renseignements à fournir pour préparer le transport.
- Correction du HTML des introductions (`className` dans les anciennes chaînes HTML). FAQ visibles et JSON-LD alimentés par la même donnée existante.
- Maillage vers volume, formules, monte-meuble, entreprises, devis et communes proches. Listes de proximité recentrées, aucune page supprimée.
- Métadonnées spécifiques et dates de modification actualisées ; sitemap et index de métadonnées régénérés à la compilation.

Objectif : améliorer la pertinence locale et la préparation du devis. Aucun classement ni délai d’indexation garanti.

## Sources officielles

- [Nanterre — Déménagement : demande d’autorisation de stationnement temporaire](https://www.nanterre.fr/annuaires/catalogue-des-demarches/detail/demande-dautorisation-de-stationnement-temporaire), lue dans le navigateur le 20 octobre 2026. Délai annoncé pour les occupations nécessitant un arrêté, formulaire complet et signé et affichage de l’arrêté.
- [Puteaux — Déménagement](https://www.puteaux.fr/vos-demarches/demenagement/), consultée le 20 octobre 2026. Délai de demande, formulaires et catégories de frais. Aucun montant n’est recopié dans le contenu.

## Validation

`npm run check` réussie (code de sortie 0) : tests fonctionnels, TypeScript, compilation et audit des 161 pages prérendues. Contrôle ciblé réussi des introductions, FAQ visibles et JSON-LD, H1 unique et longueurs des métadonnées (titres 54/53 caractères, descriptions 154/146). Affichage vérifié à 390 px sur les deux pages et à 1440 px sur Puteaux, sans débordement horizontal. Revue du diff et `git diff --check` réussies.

Après push : vérifier le déploiement, la conformité des contenus publics et les 161 URL. Les résultats et le statut GitHub sont communiqués dans le compte rendu, sans présumer de l’indexation Google.
