# Fiabilisation des pages Bobigny et Bondy — 19 octobre 2026

## Intervention et impact attendu

Les textes précédents promettaient une gestion systématique des autorisations et de la signalisation, un emplacement libéré à Bobigny et le paiement des redevances à Bondy. Ces engagements n’étaient pas confirmés par les informations du projet. Les nouvelles pages précisent les responsabilités et prestations à convenir dans le devis.

- **Bobigny** : parcours dans une résidence, distinction entre rue et propriété privée, préparation d’un transfert de bureaux et vérification des conditions du monte-meuble.
- **Bondy** : inventaire des annexes, accès à une maison, distinction entre stationnement courant et emplacement pour le déménagement, calendrier longue distance et stockage intermédiaire.
- Cinq FAQ distinctes par page, partagées avec le JSON-LD existant. Suppression des garanties absolues et des affirmations de prestation automatique non confirmées.
- Liens contextuels vers les services, outils, devis et page départementale du 93. Liens de proximité resserrés ; ajout du lien départemental dans la liste de Bondy.
- Titres de 53 et 59 caractères ; descriptions de 154 et 152 caractères. Dates de modification au 19 octobre 2026 et régénération des métadonnées et du sitemap.

Les URL et le gabarit restent identiques. Impact attendu : des pages plus utiles et fiables pour préparer le devis, avec une navigation locale cohérente. Aucun gain de classement n’est présumé.

## Sources et limites

- [Bobigny — notice générale des demandes d’arrêtés](https://www.bobigny.fr/fileadmin/images/Actualite/2022/Janvier/procedure_de_rappel_demande_d_arrete_v2017.pdf), consultée le 19 octobre 2026. Le document mentionne travaux et interventions sur le domaine public. Son nom de fichier est ancien : aucun délai propre aux déménagements n’est extrapolé. Le contenu demande de confirmer la procédure actuelle et son application auprès du service compétent.
- [Bondy — stationnement dans la ville](https://www.ville-bondy.fr/demarche-administrative/stationnement-dans-la-ville/), consultée le 19 octobre 2026. Cette page décrit les zones de stationnement courant. Elle ne permet pas d’affirmer qu’une réservation de déménagement est acquise ni que l’entreprise prend systématiquement en charge les frais et les panneaux.

## Validation

- `npm run check` réussi : tests fonctionnels, audit du site et CRM, TypeScript, compilation, 161 pages prérendues et audit des 126 fichiers de données sectorielles.
- Contrôle ciblé réussi des introductions, FAQ visibles et JSON-LD des deux pages ; H1 unique et longueurs de métadonnées conformes. Une première lecture avait été lancée avant la fin du build et portait sur les anciens HTML ; la vérification a été refaite après sa réussite.
- Mobile à 390 px sur Bobigny et Bondy, ordinateur à 1440 px sur Bondy : aucun débordement horizontal constaté, contenu lisible.
- Après push : vérifier la réussite App Hosting, comparer les contenus publics au commit et auditer les 161 pages publiques.
