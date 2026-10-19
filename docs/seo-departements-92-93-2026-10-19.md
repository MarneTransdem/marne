# Pages départementales 92 et 93 — 19 octobre 2026

## Intervention et impact attendu

Les pages Hauts-de-Seine et Seine-Saint-Denis disposaient d’un annuaire communal, mais leurs introductions et FAQ étaient très proches. Le changement conserve leurs URL, leur gabarit et cet annuaire.

- **Hauts-de-Seine** : préparation des accès en résidence, trajet vers Paris, exemple municipal de Courbevoie et organisation des transferts de bureaux. Liens contextuels vers Boulogne-Billancourt, Issy-les-Moulineaux, Courbevoie, Nanterre et Puteaux.
- **Seine-Saint-Denis** : portage depuis une cour ou une voie privée, exemple municipal de Montreuil, étude du monte-meuble et décalage de remise des clés. Liens vers Montreuil, Pantin, Saint-Denis, Bagnolet et Les Lilas.
- Chaque page comporte cinq questions propres à son contenu. Les réponses visibles et le JSON-LD FAQPage utilisent la même source existante.
- Les listes finales de proximité pointent désormais vers la région, des arrondissements voisins et des départements limitrophes. Les communes restent accessibles dans l’annuaire dédié, sans répéter toute sa liste en bas de page.
- Titres de 57 et 52 caractères ; descriptions de 153 et 154 caractères. L’index de métadonnées est régénéré par le build. Les dates de modification des deux routes sont renseignées au 19 octobre 2026 dans le registre et le sitemap généré.

Impact attendu : distinguer l’utilité des deux pages, faciliter la navigation vers une commune ou un service pertinent et fournir les renseignements nécessaires à un devis. Aucun résultat de classement, d’indexation ou d’affichage enrichi FAQ n’est garanti.

## Sources

Sources municipales consultées le 19 octobre 2026 et liées dans le contenu visible :

- [Courbevoie — stationnement sur la voirie](https://www.ville-courbevoie.fr/900/stationnement-sur-la-voirie.htm), rubrique déménagement et lien vers la démarche en ligne.
- [Montreuil — permissions et droits de voirie](https://www.montreuil.fr/urbanisme/urbanisme-et-habitat/permissions-et-droits-de-voirie), mise à jour affichée au 10 août 2026. La page distingue l’autorisation d’occupation du domaine public de la réservation de places pour un déménagement.

Les modalités d’une commune ne sont pas étendues à tout son département. Aucun délai municipal, tarif fixe, chantier client ou garantie non vérifié n’est ajouté.

## Vérifications avant publication

- Tests, audit du site, moteur CRM, TypeScript et compilation validés avec `npm run check`. Le premier prérendu a atteint le délai de 30 secondes ; après arrêt de l’aperçu local, la relance ciblée du prérendu et de ses audits réussit : 161 pages HTML, aucun lien interne invalide ni page orpheline, 126 fichiers de données sectorielles séparés.
- Contrôle ciblé réussi des introductions, de l’annuaire communal, du H1, des longueurs de métadonnées et de la correspondance des FAQ visibles avec le JSON-LD dans les deux HTML.
- Mobile à 390 px sur les deux pages ; tablette à 768 px et ordinateur à 1440 px sur le 93, sans débordement horizontal. Contrôle ordinateur terminé dans le navigateur intégré après déconnexion de Chrome.
- Après push : vérifier le statut App Hosting, la présence des nouveaux contenus sur les deux URL publiques et lancer l’audit SEO public.
