# Données structurées de l'entreprise

Le schéma MovingCompany commun comportait des coordonnées GPS et des horaires codés en dur, sans source ni affichage public correspondant dans les éléments examinés. Ces champs facultatifs sont retirés en attendant une confirmation fiable. Leur absence ne signifie ni fermeture de l'entreprise ni absence d'adresse.

Le nom, l'adresse, le téléphone et l'e-mail proviennent de CONTACT. Le logo existant est ajouté au schéma MovingCompany, effectivement émis par SEO. Organization utilise le même identifiant d'entreprise ; le fournisseur des schémas Service reprend le nom partagé. Aucun avis ou agrégat de notes ajouté.

Référence : [Google Search Central — établissements locaux](https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=fr), consultée le 9 septembre 2026. Les données optionnelles doivent être renseignées avec exactitude ; leur ajout ne garantit pas un affichage enrichi.

Validation : npm run check ; vérifier les objets MovingCompany dans les 153 HTML générés, leur identifiant, coordonnées de contact et logo, ainsi que l'absence des champs retirés. Contrôler ensuite plusieurs pages publiques après déploiement. Les informations de Google Business Profile ne sont pas modifiées par cette intervention.
