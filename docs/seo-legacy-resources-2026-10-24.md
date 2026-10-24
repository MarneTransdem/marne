# Anciennes ressources encore demandées

## Redirections ciblées

Les chemins proviennent de l’échantillon de GET 404 observé dans Cloud Logging le 24 octobre. Les deux sources répondent encore 404 avant correction ; les destinations répondent 200.

| Source | Destination | Motif |
| --- | --- | --- |
| `/demenagement-sans-stress-paris-region-parisienne` | `/blog/10-conseils-demenagement-sans-stress-paris` | Même sujet : préparation et organisation du déménagement sans stress à Paris. |
| `/images/PDF/formule-luxe.pdf` | `/formules-demenagement` | La page actuelle décrit la formule Luxe et les prestations à préciser au devis. La redirection conduit vers une page HTML, pas vers un PDF recréé. |

Implémentation 301 dans la table commune au serveur App Hosting et dans la configuration Firebase Hosting. L’audit public inclut automatiquement les variantes de chemins et les paramètres de suivi. Aucun nouveau contenu indexable ni changement de sitemap.

## Ressources non redirigées

- `/cache/resized/da2bb957bc621341fe9d94272e9294a1.jpg` et `/cache/resized/98dd6eafec5ffa3714e538c9b0258b18.jpg` : identité des images inconnue, aucune substitution arbitraire par le logo.
- Articles sur le déménagement avec enfants ou le choix d’un emplacement : aucun équivalent exact identifié dans les six articles actuels.
- Ancien chemin regroupant Paris 7e, 6e et 16e : aucune destination unique évidente ; ne pas choisir arbitrairement un arrondissement.
- Sondes PHP, WordPress, .env et .git : ne pas transformer ces requêtes en visites des pages commerciales.

Cette revue traite les ressources identifiées dans l’échantillon, pas un inventaire exhaustif de toutes les anciennes URL. Le contenu historique des fichiers indisponibles n’a pas été récupéré.
