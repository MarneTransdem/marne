# Analyse des erreurs de requêtes — 24 octobre 2026

## Périmètre et limites

Lecture de Cloud Logging avec le compte autorisé, projet marnetransdem20, service Cloud Run marne, fenêtre glissante de sept jours. Les compteurs Cloud Run ne sont pas directement comparables au résumé CDN Firebase. Les lignes visibles constituent un échantillon, pas un export exhaustif. Le libellé « Google » dans la table ne prouve pas que la requête provient de Googlebot.

## Constats

- Le filtre Cloud Run `httpRequest.status>=500` affiche trois résultats : trois POST sur `/api/gemini/analyze-images`, le 17 octobre vers 16 h 41. Cela ne détermine pas la cause applicative et n’explique pas les six réponses 5xx du résumé CDN.
- Le filtre GET 404 affiche 9 903 résultats lors de la lecture. L’échantillon contient de nombreuses requêtes vers WordPress, wp-json et des paramètres de traversée de répertoires : comportement compatible avec des scans automatisés. Aucune attribution certaine du robot.
- Après exclusion de plusieurs chemins CMS identifiés, 5 092 résultats restent affichés : ils comprennent encore xmlrpc.php, fichiers PHP, .env, .git/config, autres sondes, anciennes URL et ressources. Ce groupe n’est donc pas un total d’erreurs SEO pertinentes.
- Une requête de vérification de bundle générée pendant notre déploiement apparaît aussi dans l’échantillon : ne pas la traiter comme un lien cassé du site.

## Anciennes URL vérifiées sur le domaine public

Toutes les URL ci-dessous répondent 404 sans Location au contrôle HEAD effectué le 24 octobre.

| Ancien chemin | Destination candidate |
| --- | --- |
| `/formules-de-demenagement` | `/formules-demenagement` |
| `/contact-demenageur` | `/contact` |
| `/conseils-demenagement` | `/blog` |
| `/demenagement-longue-distance-paris-service-marne-transdem` | `/demenagement-longue-distance` |
| `/devis-demenagement-en-ligne-obtention-estimation-precise-marne-transdem` | `/demande-de-devis` |
| `/guide-complet-pour-choisir-le-bon-emplacement-lors-dun-demenagement-a-paris` | À qualifier : aucun équivalent exact identifié pendant cet audit |

## Suite technique

Ajouter les redirections permanentes ciblées des cinq chemins dont l’intention est identifiable, vérifier leurs destinations et leur canonical, puis tester et publier. Conserver les véritables URL absentes en erreur ; ne pas rediriger globalement les sondes vers l’accueil. Examiner séparément les détails applicatifs des trois erreurs de l’API d’analyse d’images avant toute correction de ce service.

Aucun changement applicatif, de sécurité ou d’hébergement effectué pendant cette analyse.

## Intervention suivante : cinq redirections

Les cinq destinations candidates identifiées ci-dessus sont ajoutées à `CANONICAL_ALIASES` et à la configuration Firebase Hosting. App Hosting applique la table commune via le serveur Express, avec un statut 301. L’audit public existant couvre automatiquement les nouveaux chemins, leurs variantes avec slash final et suffixe `.html`, la conservation des paramètres et l’absence de chaîne sur le domaine www.

Impact attendu : orienter les visites et explorations de ces anciennes URL vers les pages correspondant à leur intention. Aucun changement du sitemap canonique ; aucun résultat d’indexation ou de positionnement garanti.
