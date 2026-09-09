# Calculateur de volume — 9 septembre 2026

Page : `/calculateur-volume`.

- Explication du calcul par volumes indicatifs du catalogue et quantités.
- Exemple reproductible dérivé directement du catalogue : canapé deux places, table basse, dix cartons standard ; 2 m³ nets, 2,20 m³ avec marge, 3 m³ après arrondi supérieur.
- Limites, inventaire des annexes, dimensions atypiques et contrôle des résultats de l’analyse photo précisés.
- Maillage vers le guide volume, les formules et le guide prix.
- FAQ visible et JSON-LD issues de la même liste pour éviter les divergences.
- Suggestion de formule fondée sur le nombre d’objets remplacée par une explication des tâches à déléguer.
- Libellés accessibles sur les boutons d’ajout/retrait des pièces et objets.
- Bouton de passage au devis harmonisé ; protection contre l’enregistrement d’un inventaire vide.

Le transfert existant conserve le détail de l’inventaire dans le stockage local, repris par le formulaire sur le même navigateur. Aucun tarif ni gain de référencement annoncé. La mission se termine par commit, push et vérification du commit servi par App Hosting et du contenu public.

## Vérification

`npm run check` réussi : imports Node natifs, audit du site, moteur dossiers, TypeScript, compilation, prérendu et audit des 153 pages sans page orpheline.

Parcours réel dans le navigateur local : bouton final désactivé pour l’inventaire vide ; ajout d’un salon, d’un canapé deux places, d’une table basse et de dix cartons standard ; total 2,00 m³, puis 2,20 m³ après activation de la marge. Le bouton « Continuer vers le devis » ouvre le formulaire avec 2,2 m³, dix cartons, douze objets et la pièce Salon. Une seule canonique sur le formulaire, aucun envoi effectué.
