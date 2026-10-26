# Navigation des prestations d’entreprise

Les pages de transfert de bureaux, transfert informatique et transfert d’archives affichent un fil d’Ariane dans le héros : Accueil → Déménagement d’entreprises → prestation.

Le composant `BreadcrumbTrail` affiche une liste sémantique, des liens HTML vers les niveaux parents et un dernier élément non cliquable avec `aria-current="page"`. La liste propre à chaque page alimente aussi `getBreadcrumbSchema` : le parcours visible et le JSON-LD partagent donc les mêmes noms et destinations.

Objectif : rendre la hiérarchie compréhensible et faciliter le retour vers l’offre générale. Il ne s’agit pas de corriger une exclusion d’indexation prouvée ni de garantir un résultat enrichi. [Référence Google](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).

Les contenus commerciaux, titres SEO, descriptions, canoniques et dates de contenu restent identiques. Validation : compilation et audits du projet, vérification des trois étapes dans le HTML initial et le JSON-LD, navigation au clavier et contrôles de largeur mobile/tablette/PC, puis vérification publique après publication.

Le contrôle à 320 px a aussi révélé un débordement sur Archives : un halo décoratif positionné à droite dépassait de 16 px de la fenêtre. Il est ramené dans son conteneur et marqué décoratif, sans masquer le contenu par une règle globale de débordement.
