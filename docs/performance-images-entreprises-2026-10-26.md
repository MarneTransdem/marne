# Images responsives des pages entreprises

Quatre emplacements sur trois pages utilisent désormais le composant `ResponsiveImage` existant : une image sur Bureaux, une sur Archives et deux sur Déménagement d’entreprises.

- Sources AVIF et WebP avec descripteurs de largeur.
- `sizes` commun calculé pour la grille : conteneur Tailwind, marges `px-4`/`md:px-6`, deux colonnes à partir de `lg`, espacement `gap-20`.
- Dimensions intrinsèques, textes alternatifs, photos, cadrage et chargement différé conservés. L’original reste disponible en repli.
- Les variantes d’Archives et d’Entreprises sont ajoutées à la génération existante ; celles de Bureaux existaient déjà.

## Poids des fichiers (octets)

| Photo | Original | AVIF 480 px | AVIF 800 px |
| --- | ---: | ---: | ---: |
| Bureaux | 763 317 | 47 769 | 106 377 |
| Archives | 274 346 | 21 144 | 44 114 |
| Entreprises | 127 178 | 19 331 | 39 285 |

Le fichier choisi dépend de la largeur affichée, de la densité de pixels et du navigateur. Ces chiffres décrivent les fichiers, pas un gain mesuré de LCP, CLS ou classement Google. Les images concernées se situent dans le contenu, après le héros.

Validation : compilation et audits du projet ; vérification du HTML initial (`picture`, `srcset`, `sizes`, dimensions, textes alternatifs et `loading="lazy"`) ; inspection du fichier effectivement choisi dans le navigateur et de l’affichage mobile ; vérification des sources publiées après déploiement. Aucun contenu éditorial ni date de contenu modifié.
