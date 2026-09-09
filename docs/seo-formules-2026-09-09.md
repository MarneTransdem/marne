# Formules vers devis — 9 septembre 2026

Objectif : faciliter le passage d’un choix de prestation à une demande exploitable.

Les trois boutons de choix ouvraient le formulaire sans transmettre la formule. Ils pointent désormais vers `/demande-de-devis?formula=economique`, `standard` ou `luxe`. Le formulaire accepte uniquement ces trois valeurs et conserve les autres champs. La formule reste modifiable ; « Je ne sais pas » reste disponible. Aucune réservation ni nouvelle conversion n’est déclenchée par le choix.

La page explique les tâches à déléguer, l’inventaire à préparer, les accès et la relecture du périmètre du devis. Liens contextuels vers emballage, calculateur et guide prix. Les prestations commerciales du tableau existant ne sont pas modifiées.

Le champ formule possède maintenant un libellé associé et une aide accessible. La canonique du devis reste l’URL sans paramètres ; le suivi analytique existant retire les paramètres d’URL de ses événements.

Tests du composant réel avec dépendances simulées : trois valeurs valides, valeur inconnue, paramètre vide et préservation d’un champ déjà renseigné. Aucun devis envoyé par les tests. Exécuter aussi les contrôles globaux et vérifier la version servie après le push.
