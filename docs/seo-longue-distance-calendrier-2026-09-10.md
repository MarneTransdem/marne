# Déménagement longue distance : préparation du devis et du calendrier

La page `/demenagement-longue-distance` avait un seul paragraphe introductif général. Son contenu détaille désormais les informations utiles avant une demande de devis : dates impératives ou flexibles, chargement et livraison, inventaire, accès aux deux adresses et accueil à destination.

- Trois paragraphes remplacent l’introduction ; le balisage HTML utilise `strong` et `class` au lieu des anciens attributs JSX insérés dans une chaîne HTML.
- Liens contextuels vers le calculateur, les formules, l’emballage, le garde-meuble et le formulaire de devis. Les liens vers les destinations sont conservés.
- FAQ enrichie de six à huit réponses : calendrier de livraison et comparaison de devis. La réponse sur le stockage précise la disponibilité à confirmer, les deux transports et une éventuelle prolongation.
- Date de modification de cette seule route ajoutée au registre du sitemap.

Validation : `npm run check`, puis contrôle ciblé du HTML pré-rendu et de la production (`build/verify-long-distance.mjs`) : contenu, H1 unique, liens internes et huit réponses structurées. Aucun changement de mise en page ni nouvelle mesure Lighthouse dans cette intervention. Aucun délai de livraison, tarif ou résultat d’indexation garanti.
