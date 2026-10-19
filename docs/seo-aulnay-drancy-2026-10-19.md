# Pages Aulnay-sous-Bois et Drancy — 19 octobre 2026

## Corrections et impact attendu

Les anciennes FAQ annonçaient une pose de signalisation 48 heures avant l’intervention, sans vérification locale, ainsi qu’une visite technique systématique à Drancy. Le texte d’Aulnay affirmait des moyens dédiés et des horaires décalés sans confirmation pour chaque projet.

- **Aulnay-sous-Bois** : inventaire des annexes et biens atypiques, distinction entre stationnement courant et organisation du déménagement, préparation d’un transfert de locaux et confirmation des créneaux et moyens techniques.
- **Drancy** : estimation du volume complétée par les dimensions, le poids et les accès ; zones à durée limitée et stationnement alterné sourcés ; visite et signalisation à convenir selon le projet.
- Cinq FAQ propres à chaque page, partagées avec le JSON-LD existant. Aucun délai municipal ni prestation automatique non confirmé n’est introduit.
- Liens contextuels vers les outils, services, communes proches, page départementale et demande de devis. Les listes de proximité existantes, déjà pertinentes, sont conservées.
- Titres de 54 et 52 caractères ; descriptions de 155 caractères. Dates de modification au 19 octobre 2026, métadonnées et sitemap régénérés.

Les URL et le gabarit sont conservés. Impact attendu : fiabiliser les réponses locales et faciliter une demande de devis renseignée. Aucun gain de classement n’est garanti.

## Sources officielles consultées

- [Aulnay-sous-Bois — Stationner](https://www.aulnay-sous-bois.fr/ma-ville/transports-circulation-stationnement/voiture/stationner/), lue dans le navigateur intégré le 19 octobre 2026 après un refus HTTP 403 du moteur de consultation. Le contenu visible distingue l’hyper-centre de courte durée et le stationnement de longue durée/résidentiel. Aucune règle propre aux déménagements n’en est déduite.
- [Drancy — Le stationnement à Drancy](https://www.drancy.fr/vie-quotidienne/se-deplacer-a-drancy/le-stationnement-a-drancy-667.html), consultée le 19 octobre 2026. La page présente zones à durée limitée, stationnement alterné et carte municipale ; elle mentionne également des parkings payants. Le contenu ne généralise donc pas la gratuité à tout emplacement ni à une autorisation de déménagement.

## Validation

Avant publication : `npm run check` réussie (tests, TypeScript, compilation, 161 pages prérendues et audits internes). Contrôle ciblé réussi des introductions, FAQ visibles et JSON-LD, H1 unique et longueurs des métadonnées des deux pages. Affichage vérifié à 390 px sur les deux pages et à 1440 px sur Drancy, sans débordement horizontal. `git diff --check` réussi.

Contrôles prévus après push : déploiement App Hosting, comparaison des deux contenus publics au commit et audit SEO des 161 URL. Leur résultat est communiqué dans le compte rendu de publication ; la réussite locale ne préjuge pas du statut des workflows GitHub ni de l’indexation Google.
