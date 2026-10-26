# Calculateur de volume : intention en m³ et inventaire professionnel

## Modifications

- Titre précisant les m³ et description dédiée au calcul par inventaire. La source centrale de métadonnées et les propriétés du composant sont alignées.
- Ajout d’une réponse et d’un paragraphe sur le cubage d’un transfert de bureaux, en utilisant les pièces et objets personnalisés déjà disponibles dans l’outil. Lien contextuel vers la page du transfert de bureaux.
- Passage des titres de questions FAQ de H4 à H3 sous le H2 de la section, sans changer leur style. La nouvelle question est aussi rendue dans le JSON-LD existant.
- Le bouton de début devient un lien HTML vers le calculateur ; la cible possède une marge de défilement sous le header.
- Date de contenu de cette page ajoutée au registre, avec régénération du sitemap.

## Portée

Aucun changement des valeurs du catalogue, du calcul, de la marge, de l’arrondi ou du transfert d’inventaire vers le devis. Aucun déplacement de contenu entre le calculateur et le guide éditorial sur le volume. Les données privées d’audit restent hors Git.

## Impact attendu

Mieux préciser la fonction de l’outil dans les résultats et aider à préparer un inventaire professionnel. Les positions et clics doivent être suivis après exploration ; aucun gain immédiat n’est établi.

## Vérifications avant publication

`npm run check` réussi : tests fonctionnels, TypeScript, compilation et audits de 161 pages et 126 fragments sectoriels. Contrôle du HTML initial : titre de 57 caractères, description de 151 caractères, six FAQ en H3 et dans le JSON-LD, lien natif et lien vers le transfert de bureaux. Vérification à 320, 390, 768 et 1440 px sans débordement. Le lien place la cible à 96 px sous le haut du viewport ; ajout d’une pièce Bureau, d’un meuble, consultation de la synthèse et navigation vers le devis testés, sans envoi de formulaire.
