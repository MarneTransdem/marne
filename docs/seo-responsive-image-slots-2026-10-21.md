# Choix des variantes d’images des secteurs — 21 octobre 2026

## Correction

Les trois sections image/texte de SectorPage utilisent une colonne jusqu’au breakpoint lg (1024 px), puis deux colonnes avec un espace gap-20. La valeur générique de sizes indiquait pourtant 50vw dès 769 px. Les navigateurs pouvaient choisir une variante insuffisante sur tablette et trop grande par rapport au conteneur sur grand écran.

Les trois images reçoivent désormais des tailles explicites correspondant aux conteneurs Tailwind et à leurs marges : 608 px à partir de 640, 720 px à partir de 768, puis 448/576/704 px à partir de 1024/1280/1536. En dessous de 640, la largeur annoncée déduit les 32 px de marges. Ces valeurs sont regroupées dans une constante commentée à maintenir avec la grille.

ResponsiveImage adopte une valeur générique de 100vw et transmet aussi sizes au cas sans manifeste, afin de respecter une éventuelle source responsive fournie par l’appelant. Le héros garde son indication explicite 100vw et sa priorité de chargement. Les images de contenu restent différées ; formats, dimensions intrinsèques et design sont conservés.

Impact attendu : sélection de variantes plus adaptée à la largeur affichée. Aucun gain chiffré de LCP, CLS ou classement n’est annoncé sans mesure terrain. Aucun fichier image ni contenu éditorial changé.

## Validation

npm run check réussi : tests, TypeScript, compilation et audit des 161 pages. Les HTML des 126 secteurs conservent trois images de contenu dimensionnées et différées, leurs sources AVIF/WebP et le héros prioritaire. Largeurs de l’image d’introduction mesurées à Créteil : 350/712/720/444/576/704 px pour des écrans de 390/768/900/1024/1440/1920 px. Les écarts de 4 à 8 px aux limites du conteneur correspondent à la barre de défilement ; aucun débordement horizontal observé. Le cache peut conduire le navigateur à réutiliser une variante plus grande : aucun gain de poids ou de vitesse mesuré n’est revendiqué. Déploiement et attributs publics à vérifier après push.
