# Images responsives : particuliers, monte-meuble et stockage

Quatre photos utilisent le composant `ResponsiveImage` existant : deux sur la page Particuliers, une sur Monte-meuble et une sur Garde-meuble. Les photos, cadrages, textes alternatifs, dimensions intrinsèques et chargement différé restent identiques. Les originaux servent de repli.

Les tailles déclarées correspondent aux mises en page : deux colonnes avec `gap-20` pour Particuliers, `gap-16` pour Garde-meuble, et image plafonnée à `max-w-4xl` avec bordure pour Monte-meuble. Le navigateur choisit parmi les variantes AVIF et WebP générées sans agrandissement de la source.

| Photo | Original, octets | AVIF 480 px, octets |
| --- | ---: | ---: |
| Garde-meuble | 134 506 | 25 404 |
| Monte-meuble | 207 218 | 47 661 |
| Appartement | 147 070 | 24 876 |
| Paris intra-muros | 334 640 | 36 157 |

Le poids effectivement chargé dépend du navigateur, de la largeur et de la densité de pixels. Ces chiffres ne mesurent pas une évolution des Core Web Vitals ou des positions Google.

Validation : compilation et audits du projet, contrôle des quatre balises `picture` dans le HTML initial, décodage des 20 variantes, contrôle du fichier choisi et du cadrage dans le navigateur, puis vérification publique après publication. Aucun changement de métadonnées, de texte éditorial ou de date de contenu.
