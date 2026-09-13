# Accueil — design et ergonomie, 13 septembre 2026

## Direction visuelle

Palette bleu nuit, ivoire et or, en continuité du logo. Typographie droite et hiérarchie plus calme ; réduction des effets de rotation, des capitales et des ombres. Photographie existante du camion Marne Transdem, en AVIF avec repli WebP et dimensions explicites.

La première section associe présentation de l’entreprise, accès au devis, téléphone, avis Google et photographie. Le formulaire rapide est regroupé sous cette composition : deux adresses, choix de volume accessible via un fieldset, puis continuation vers le formulaire complet.

Les sections projets, services, préparation, formules, réassurance, zones et appel à l’action final partagent des espacements et des angles plus cohérents. Les styles sont limités à `.home-premium`. Les autres routes conservent leur présentation.

## Acquis préservés

Contenus métier, H1/H2, métadonnées, schémas structurés, liens commerciaux, destinations des formules et événements de mesure. Aucun envoi au CRM pendant les essais. Les données d’un essai local Paris → Vincennes, 30 m³, sont correctement reprises dans le formulaire complet.

En-tête partagé : suppression du second bouton de thème sur tablette, amélioration de son contraste en mode clair sur mobile et cible tactile de 44 px. Les liens de navigation restent identiques.

## Contrôles

Vérifications visuelles sur ordinateur 1 440 px, tablette 768 px et mobile 390 px. Mesures additionnelles à 320 et 1 024 px. Le test initial à 320 px a identifié un titre trop étroit dans le dernier appel à l’action, corrigé par un espacement adapté. Mode sombre vérifié et bouton principal contrasté. Préférence de mouvement réduit prise en compte dans les styles de l’accueil.

Suite `npm run check` réussie : 153 pages HTML complètes et 118 fragments de données sectorielles. Comparaison avant/après réussie pour le titre, la description, tous les H1/H2 et les données structurées ; les 46 destinations internes existantes sont conservées. Aucun débordement détecté au contrôle final à 320 px. Vérification du déploiement effectuée séparément après publication. Aucun score Lighthouse ni gain de conversion n’est revendiqué sans mesure correspondante.
