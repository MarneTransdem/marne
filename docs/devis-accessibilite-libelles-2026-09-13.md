# Libellés du formulaire de devis — 13 septembre 2026

## Constat en production

À 390 px, 24 champs du formulaire n’avaient aucun libellé HTML associé (`labels.length` nul). Les textes visibles existaient, mais ils étaient séparés des contrôles sans `htmlFor`/`id`. La formule et la case de consentement étaient déjà associées correctement.

## Correction

Association explicite des 24 libellés aux champs correspondants, avec des identifiants préfixés `quote-`. Ajout des indications de remplissage automatique `name`, `tel` et `email` pour les coordonnées. Les noms des champs utilisés par le formulaire, la validation, le CRM, les valeurs et le consentement restent inchangés.

## Validation locale

Suite complète réussie sur 153 pages. Vérification dans le navigateur : 26 contrôles hors champ antispam, aucun sans libellé associé, aucun identifiant dupliqué. Cliquer « Nom et prénom » place le focus sur `fullName`. Contrôle en production à effectuer après push. Aucune demande envoyée au CRM. Le gain porte sur l’accessibilité et la saisie ; aucun gain de classement ni de conversion n’est présumé.
