# Images responsives du blog

L’index du blog et les six guides utilisent des images AVIF/WebP avec srcset et sizes pour les bannières, les cartes et les recommandations. Les cinq images insérées dans le HTML statique du guide d’entreprise passent par un petit générateur de balisage basé sur le même manifeste. Ce générateur prend des données d’image explicites, échappe les attributs et conserve une image de repli ; il ne transforme pas du HTML arbitraire.

Sept photos sont ajoutées au générateur d’assets existant. Les variantes ne dépassent pas la définition d’origine. Les tailles annoncées suivent les conteneurs et grilles du blog : bannière d’article, contenu sur onze colonnes, carte mise en avant et grille des articles. Les recommandations conservent une boîte de 96 px pour stabiliser leur disposition dans les cartes.

Le contrôle visuel des originaux a révélé des descriptions trompeuses : certaines photos montraient des biens emballés plutôt qu’une équipe, un camion ou des documents administratifs. Les alternatives du blog sont centralisées et corrigées pour décrire la scène visible, sans ajout de lieu ou de prestation supposée. La bannière et la carte du guide monte-meuble utilisent désormais la photo existante d’un appareil en façade, au lieu d’une photo de vaisselle. Les autres photos, cadrages, titres, liens et textes des guides sont conservés. La priorité haute des bannières reste explicite et les photos intérieures restent chargées à la demande. Les dates des articles et le sitemap ne sont pas actualisés pour cette optimisation d’assets et d’alternatives.

Impact attendu : réduire les octets transférés selon le terminal et fournir des images adaptées sans déplacement de mise en page. Les poids des fichiers sont mesurables ; un gain de LCP ou de classement ne peut pas être déduit de la seule compression.

Validation : compilation et audits globaux, HTML initial des sept routes, présence des sources responsives et dimensions, décodage des variantes, rendu mobile/tablette/PC et contrôle public après déploiement. Les relevés techniques et captures de travail restent dans build.
