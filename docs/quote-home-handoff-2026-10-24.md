# Passage de l’accueil à la demande de devis

## Vérifications

- Les adresses saisies sur l’accueil et le volume 30 m³ sont repris dans le formulaire public.
- Modifier l’adresse dans le formulaire conserve le volume et actualise le récapitulatif.
- Le lien de la formule Standard préremplit la sélection correspondante.

## Correction

Le bouton « 60+ » transmettait 60, ce qui supprimait la notion « ou plus ». Il transmet désormais la chaîne `60+`, encodée par URLSearchParams. L’état sélectionné utilise la même valeur.

Vérification locale mobile : bouton sélectionné, volume « 60+ m³ » à l’étape 2 et dans le récapitulatif. Aucun envoi au CRM. Aucun changement de métadonnées, de contenu SEO ou de mise en page.
