# Plan SEO fondé sur Search Console — 9 septembre 2026

## Périmètre et méthode

Source : `C:/Users/Lenovo/Downloads/devisdemenagement-paris.com-Performance-on-Search-2026-09-09.xlsx`. Recherche Web, du 7 juin au 6 septembre 2026 inclus (92 jours). Les données précèdent les corrections du 8 septembre : elles servent de référence initiale, pas de mesure de leur effet.

Lecture intégrale des feuilles : Graphique (92 jours), Requêtes (1 000 lignes), Pages (145 URL), Pays et Appareils. Aucun changement apporté au classeur. Les onglets Requêtes et Pages sont des agrégations séparées : ils ne permettent pas d'attribuer une requête à une page, ni de démontrer une cannibalisation. Les groupes de requêtes ci-dessous sont des filtres descriptifs ; ils peuvent se chevaucher et ne doivent pas être additionnés.

## Résultats

- Total du graphique : **329 clics, 91 237 impressions, CTR recalculé 0,36 %** (Graphique!A2:E93).
- Du 10 août au 6 septembre : **81 clics / 34 069 impressions / CTR 0,238 %**.
- Du 13 juillet au 9 août : **100 clics / 24 447 impressions / CTR 0,409 %**.
- Sur ces deux périodes de 28 jours : clics **−19 %**, impressions **+39,4 %**, CTR **−0,171 point**. Ce constat ne suffit pas à identifier une cause : saisonnalité, mix de requêtes, pays, appareils et positions doivent être séparés.
- Les deux accueils avec et sans www totalisent **322 clics** dans l'onglet Pages, sur **349 clics** pour cet onglet : **92,3 % des clics agrégés par page**. Ne pas diviser ce numérateur par les 329 clics du graphique.
- La requête exacte « marne transdem » représente **128 clics**. Le tableau des 1 000 requêtes n'en restitue que 200 au total : aucune extrapolation de la part marque/hors marque au trafic complet.
- France : **304 clics / 84 672 impressions**. Ordinateur : **163 clics / 60 971 impressions** ; mobile : **162 / 30 019**. Comparer les CTR à requête, pays et position comparables avant de conclure à un problème d'interface.

Les différences entre totaux du graphique, des pages et des requêtes sont attendues avec les règles d'agrégation, les requêtes anonymisées et les limites d'export de Search Console. Références Google : [écarts de données](https://support.google.com/webmasters/answer/17010575?hl=en), [dimensions et regroupements](https://support.google.com/webmasters/answer/17011259?hl=en).

## Contrôle du site public

Les 145 URL de la feuille Pages ont été demandées le 9 septembre : **116 réponses 200 et 29 réponses 301**, aucune erreur réseau ni réponse 4xx/5xx lors de ce passage. Ces nombres concernent la première réponse, pas un audit complet de toutes les chaînes de redirection. Les anciennes adresses /societe-demenagement-paris/ et /devisdemenagement/ renvoient d'abord vers leur version sans slash : vérifier le chemin complet avant toute nouvelle règle.

Les pages accueil, demande de devis, calculateur, article sur les prix et Enghien-les-Bains répondent en 200. Les performances historiques d'anciennes variantes ne justifient pas de les recréer. La publication du correctif de démarrage `d0577a8` doit être confirmée séparément dans App Hosting.

## Opportunités commerciales observées

| Requête exacte | Impressions | Clics | Position moyenne | Lecture |
|---|---:|---:|---:|---|
| devis déménagement paris | 1 187 | 0 | 9,09 | Examiner la page réellement affichée et la pertinence du résultat |
| devis demenagement | 1 011 | 0 | 6,65 | Même analyse, avec filtre France et appareil |
| devis déménagement | 978 | 0 | 6,05 | Même intention, aucune page distincte pour la variante accentuée |
| déménagement ile de france | 1 821 | 2 | 8,26 | Renforcer le positionnement régional du contenu existant |
| déménagement paris | 2 250 | 1 | 19,32 | Travail de pertinence et de positionnement au-delà du seul titre |
| déménagement international | 2 985 | 2 | 4,08 | Signal atypique à segmenter ; offre internationale à confirmer |

Sources : Requêtes!A9:E14, A48:E51. Les 57 requêtes exportées contenant « devis » totalisent **9 360 impressions et 2 clics**. Il s'agit d'impressions observées du site, pas d'un volume de recherche du marché. La position moyenne n'est pas une position fixe et ne prédit pas un CTR garanti.

## Ordre d'intervention proposé

### 1. Accueil et demande de devis

L'accueil concentre les clics. La page /demande-de-devis ne reçoit que **4 impressions et 0 clic** sur sa version avec www : l'export ne prouve pas qu'elle porte les 9 360 impressions des requêtes « devis ».

Première vérification : filtrer « devis déménagement paris » dans Search Console, puis ouvrir Pages, avec pays France. Identifier la ou les URL réellement montrées avant de déplacer une cible SEO.

Brief de contenu pour /demande-de-devis : informations nécessaires (adresses, date, volume, étages, ascenseurs, accès), facteurs qui font varier le prix, prestations incluses ou optionnelles, étapes après envoi, façon de comparer deux devis. Confirmer tout engagement de délai avant publication. Propositions éditoriales à valider : titre « Devis déménagement Paris et Île-de-France | Marne Transdem » ; introduction expliquant concrètement les informations à fournir et la préparation du chiffrage.

Maillage : accueil → devis ; guide prix → formules, calculateur et devis ; calculateur → devis avec volume prérempli. Préserver les liens déjà ajoutés et renforcer uniquement les passages réellement utiles. Mesurer l'envoi réussi côté serveur, pas seulement le clic sur le bouton ; distinguer les clics téléphone des prospects qualifiés.

### 2. Article sur le prix d'un déménagement à Paris

/blog/combien-coute-demenagement-paris : **480 impressions, 0 clic, position 27,82** (Pages!A21:E21). Le positionnement est une limite importante ; un changement de meta description seul ne suffira pas.

Brief : conserver les critères de prix déjà enrichis ; ajouter 2 à 3 exemples de devis réels anonymisés, avec date, volume, trajet, accès, formule, inclusions et montant TTC confirmé. Expliquer les écarts plutôt que publier un prix universel. Relier chaque cas aux services concernés. Ne pas transformer les fourchettes indicatives existantes en tarifs officiels de l'entreprise.

### 3. Déménagement de particuliers

/demenagement-particuliers-paris : **313 impressions, 6 clics, position 6,67**, CTR 1,92 % (Pages!A4:E4). Cette page reçoit déjà des clics : préserver son intention et sa structure utile.

Brief : comparer les formules et les tâches prises en charge, préciser emballage/démontage selon prestation, traiter les accès et l'inventaire, intégrer une preuve client vérifiable et des liens vers prix, formules et devis. Identifier d'abord les requêtes exactes de cette page dans Search Console.

### 4. Calculateur et guide volume

/calculateur-volume : **1 057 impressions, 0 clic, position 59,36** (Pages!A19:E19). Ce n'est pas un simple problème de CTR en première page.

Brief : expliquer le calcul en m³, proposer un exemple reproductible avec mobilier, signaler les limites de l'estimation, expliquer le passage au devis. Le guide /blog/comment-estimer-volume-demenagement soutient l'outil par un lien descriptif ; l'outil renvoie vers le guide et le devis. La mesure centrale est l'utilisation puis la transmission du volume, sans assimiler cela à une vente.

### 5. Une page locale pilote

Enghien-les-Bains : **497 impressions, 0 clic, position 27,27** (Pages!A20:E20). C'est une candidate issue des données, à confirmer selon la zone réellement prioritaire et la rentabilité opérationnelle.

Brief : contraintes locales documentées, liens officiels pour les démarches de stationnement lorsque pertinents, photos légendées d'une intervention réelle et cas client publiable. Décliner ensuite la méthode sur les villes prioritaires ; ne pas remplacer uniquement un nom de commune dans le même texte.

## Points à ne pas déduire du fichier

- La visibilité sur « déménagement international » ne prouve pas que la prestation est commercialisée. Confirmer les destinations, partenaires et responsabilités avant de créer une page dédiée.
- Les impressions sans clic ne prouvent pas une non-indexation actuelle, un titre défectueux ou une pénalité.
- Les versions www/sans www historiques ne démontrent pas une cannibalisation éditoriale. La canonical et les redirections se contrôlent séparément.
- L'export ne contient ni demandes de devis, ni chiffre d'affaires, ni croisement requête–page, ni comparaison France × mobile. Aucun gain commercial chiffré n'est prédit.

## Exécution et suivi

1. Confirmer le déploiement et figer sa date pour l'analyse ultérieure.
2. Relever les pages réellement associées aux recherches « devis », « déménagement ile de france » et « déménagement international », puis les requêtes propres aux cinq pages proposées.
3. Traiter accueil/devis et particuliers, puis prix/volume, puis une ville pilote.
4. Suivre chaque semaine les clics hors marque disponibles, impressions, CTR et positions par page avec les mêmes filtres. Comparer des fenêtres de 28 jours complètes, sans confondre progression et causalité.
5. Relier les visites organiques aux formulaires envoyés avec succès et aux demandes qualifiées dans le CRM, en respectant le consentement et sans transmettre de données personnelles dans les événements analytiques.

Informations métier nécessaires : délais réellement tenus, prestations incluses, formules, tarifs/cas anonymisés, assurances contractuelles, zones prioritaires, autorisations de publication des photos et avis. Leur absence n'empêche pas le diagnostic et les corrections techniques ; elle limite les preuves éditoriales publiables.
