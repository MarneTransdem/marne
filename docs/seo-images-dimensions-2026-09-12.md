# Dimensions et chargement des images — 12 septembre 2026

Audit des 153 pages générées : 834 occurrences d’images, aucun attribut alt absent, 16 occurrences sans largeur ni hauteur HTML. La présence d’un alt ne valide pas à elle seule sa qualité éditoriale.

Ajout des dimensions intrinsèques mesurées dans les fichiers avec Sharp pour ces 16 images, réparties sur 13 pages. Les photos concernées sont dans les sections de contenu ou l’équipe ; ajout de `loading="lazy"` et `decoding="async"`. Les images et les classes de cadrage existantes sont conservées.

Les conteneurs utilisaient déjà des rapports de forme : aucun gain de CLS n’est affirmé sans mesure. Cette intervention explicite les dimensions et évite le chargement immédiat systématique de photos sous les premiers blocs. Aucun score Lighthouse ni gain de classement annoncé. Dates éditoriales conservées.
