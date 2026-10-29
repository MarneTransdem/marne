# Cartons : formats, quantités, remise du matériel et images

La page existante garde sa route et sa canonique. Le titre et la description sont alignés dans le composant et le registre SEO, le H1 indique Paris. Le contenu précise le choix des formats selon les biens, le poids et les protections, puis la préparation des quantités à partir d’un inventaire plutôt que d’un nombre de pièces.

Trois liens d’accès rapide mènent aux formats, aux quantités et aux modalités de remise, avec des cibles présentes dans le HTML initial. Les appels au devis mènent au formulaire. Les fournitures restent à confirmer selon la formule, le prix, la disponibilité et le lieu convenus ; aucune vente immédiate, livraison ou gratuité non vérifiée n’est ajoutée. Le calculateur est présenté pour le volume des cartons remplis, pas pour prédire un nombre de cartons vides.

La FAQ de choix du carton devient plus concrète. La liste commune aux réponses affichées et au JSON-LD est conservée. Le H1 est adapté aux petits écrans et les liens de fin de page passent progressivement de une à six colonnes.

L’image JPEG de 638 138 octets utilise le composant ResponsiveImage existant. Le générateur ajoute des variantes AVIF et WebP de 480, 800, 1200 et 1600 px sans agrandissement ; les dimensions intrinsèques, le chargement différé et le cadrage sont conservés. Le champ sizes réutilise la géométrie existante des deux colonnes avec gap-16. La réduction de poids ne constitue pas une mesure de LCP ni une preuve de progression SEO.

Impact attendu : aide plus précise pour choisir le matériel et préparer la demande, accès plus direct aux informations et image moins lourde selon le terminal. La date éditoriale du 29 octobre reflète l’enrichissement ; le sitemap est régénéré. Les données de requêtes privées restent dans build et ne sont pas publiées.

Vérifications : compilation et audits de pages, métadonnées, ancres et FAQ dans le HTML initial, variantes d’image, affichage mobile/tablette/PC, puis contrôle de la version publique après déploiement.
