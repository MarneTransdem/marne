# Lisibilité du maillage local

Le bloc de proximité utilisait des liens de 12 px, gris clair et en capitales italiques, avec un titre à 30 % d’opacité. Il devient une navigation nommée, sous forme de liste de cartes : texte de 16 px en bleu foncé, surfaces cliquables d’au moins 64 px de hauteur et contour de focus clavier visible.

Le composant `NearbySectorLinks` est typé et partagé par les pages sectorielles. La grille passe de une à deux puis trois colonnes. Les couleurs de fond et de texte sont explicites afin de conserver le contraste en thème sombre. L’accent orange reprend l’identité du site ; les flèches décoratives sont masquées aux lecteurs d’écran.

Les destinations et les ancres textuelles existantes sont conservées. Les liens restent des éléments HTML `<a>` dans le rendu initial. Aucun script, image, changement d’URL ou de métadonnées n’est ajouté. Les dates éditoriales ne changent pas pour cette présentation.

L’objectif est de faciliter le repérage et l’activation des liens, notamment au clavier et sur mobile. Ce changement ne démontre pas une progression de classement dans Google.

## Vérification avant publication

`npm run check` réussi, avec audits de 161 pages HTML et 126 fragments sectoriels. Contrôle ciblé : les 118 navigations de proximité gardent toutes leurs destinations et possèdent une liste structurée et un titre unique. À 390 px, texte mesuré à 16 px et cartes de 64 px de hauteur ; bleu `rgb(6, 26, 51)` sur blanc en thèmes clair et sombre. Focus clavier visible après tabulation. Grille vérifiée à 320, 390, 768 et 1440 px sans débordement horizontal, avec une, deux et trois colonnes.
