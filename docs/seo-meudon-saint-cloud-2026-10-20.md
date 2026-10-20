# Meudon et Saint-Cloud — 20 octobre 2026

## Modifications et impact attendu

- Introductions réécrites : préparation des accès et de l’inventaire, organisation du transport, démarches municipales et choix des prestations. Suppression des affirmations générales de maîtrise parfaite du terrain.
- Correction du balisage des introductions, qui utilisait des attributs React `className` dans des chaînes HTML.
- Cinq FAQ distinctes par commune, reprises par le JSON-LD existant. Aucune prestation automatique ni estimation de prix non confirmée.
- Liens contextuels vers volume, monte-meuble, formules, devis et communes proches. Listes de proximité recentrées ; aucune page supprimée.
- Titres de 51 et 57 caractères ; descriptions de 154 caractères. Dates de modification au 20 octobre 2026 et régénération du sitemap et des métadonnées.

Objectif : rendre les pages locales plus utiles et distinctes et faciliter la préparation d’un devis. Aucun gain de classement ou délai d’indexation garanti.

## Sources officielles

- [Meudon — Déménager / emménager](https://www.meudon.fr/mon-quotidien/logement/demenager-emmenager/), page mise à jour le 30 mars 2026, lue dans le navigateur le 20 octobre 2026 après un refus HTTP de l’outil de consultation. La page confirme la réservation d’emplacements pour camion et monte-meuble, payante, à anticiper d’au moins 15 jours.
- [Saint-Cloud — Autorisations de voirie](https://www.saintcloud.fr/autorisations-de-voirie), consultée le 20 octobre 2026 : distinction entre les voies, délai de dépôt et renvoi vers la procédure DRIEAT pour les axes identifiés. Le contenu renvoie à la source pour les pièces, conditions et frais applicables sans reprendre de tarif.

## Validation

`npm run check` réussie (code de sortie 0) : tests fonctionnels, TypeScript, compilation et audit des 161 pages prérendues. Contrôle ciblé réussi des introductions, FAQ visibles et JSON-LD, H1 unique et longueurs des métadonnées. Affichage contrôlé à 390 px sur les deux pages et à 1440 px sur Saint-Cloud, sans débordement horizontal. Revue du diff et `git diff --check` réussies.

Après push : vérifier le déploiement App Hosting, comparer les contenus publics au commit et lancer l’audit des 161 URL publiques. Le résultat de publication et le statut des workflows GitHub sont communiqués dans le compte rendu. Ces contrôles ne prouvent pas l’indexation Google.
