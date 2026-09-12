# Lisibilité des sommaires des articles — 12 septembre 2026

Le gestionnaire des sommaires appelle `scrollIntoView` avec un alignement en haut. Les titres ciblés du guide de volume, des conseils et du guide monte-meuble ne réservaient pas d’espace pour l’en-tête fixe.

Le conteneur du contenu applique désormais une marge de défilement de 10 rem aux h2 possédant un identifiant. Cette règle commune couvre les liens du sommaire et les destinations de fragments sans ajouter de décalage à chaque article. Les liens, titres, URL canoniques et dates éditoriales sont conservés.

Avant publication, la mesure dans le navigateur sur le guide de volume confirme une marge calculée de 0 px pour `volume-devis`, avec un en-tête de 144 px. Validation : `npm run check` réussi sur 153 pages ; classe présente dans le HTML pré-rendu et règle `scroll-margin-top` produite dans le CSS compilé.
