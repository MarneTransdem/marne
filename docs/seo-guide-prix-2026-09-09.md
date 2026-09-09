# Guide des prix — 9 septembre 2026

Page : `/blog/combien-coute-demenagement-paris`.

## Modifications

- Sommaire à quatre ancres et accès direct à la demande de devis.
- Grille de comparaison à six critères : inventaire, accès, prestations, moyens particuliers, prix/calendrier et conditions/garanties.
- Parcours vers le calculateur, les formules et le formulaire.
- Situations présentées comme illustrations, sans les faire passer pour des devis clients documentés.
- Affirmations sur le portage et le démontage reformulées pour renvoyer aux prestations convenues dans le devis.
- H1, description centrale, carte du blog et date de modification harmonisés.

Source officielle consultée pour les mentions du devis : https://www.service-public.gouv.fr/particuliers/vosdroits/F33997

Les fourchettes de prix préexistantes sont conservées avec leurs réserves ; elles n'ont pas été validées comme tarifs de l'entreprise. Aucun nouveau prix ni résultat client n'a été ajouté. Pour une prochaine révision, remplacer ces repères par des exemples chiffrés documentés et anonymisés fournis par l'entreprise.

## Validation

`npm run check` réussi : imports natifs Node, audit du site, contrôle du moteur dossiers, TypeScript, build et audit des 153 pages prérendues. Aucun lien interne invalide ni page orpheline signalé.

Serveur démarré avec `npm start`. Vérifications dans le navigateur : H1 actualisé, une canonique, aucune ancre interne manquante, six lignes de comparaison et aucun débordement horizontal à 1272 px. Le clic du sommaire place le titre sous l'en-tête ; le lien direct ouvre `/demande-de-devis`. Aucun formulaire envoyé. Pas de nouveau test Lighthouse ni de mesure de classement.

Cette intervention ne déclenche pas de déploiement.
