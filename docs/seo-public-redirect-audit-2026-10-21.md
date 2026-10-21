# Contrôle HTTP des redirections — 21 octobre 2026

## Intervention

Ajout de `audit:public-redirects`, également lancé par `audit:public-seo`. Le script contrôle les 29 alias historiques avec leurs variantes slash et HTML, six variantes de normalisation et deux cas du domaine sans www, soit 95 parcours HTTP.

Les requêtes HEAD sont en lecture seule, avec quatre parcours simultanés et un délai maximal par requête. Les vérifications portent sur les codes permanents 301/308, les en-têtes Location, l’absence de boucle ou de sortie du site, la conservation des paramètres de suivi et l’arrivée sur la page canonique attendue en HTTP 200.

Un seul saut est attendu pour les cas avec www et l’accueil sans www. Une ancienne URL sans www peut utiliser deux sauts : la redirection de domaine App Hosting, puis l’alias applicatif. Ce cas est déclaré explicitement et reste signalé dans le rapport ; il n’est pas présenté comme corrigé.

Le serveur et les règles de redirection ne sont pas modifiés : les premiers contrôles publics ont confirmé leur bon fonctionnement. Impact attendu : détecter rapidement une régression HTTP que l’audit des seules pages canoniques ne verrait pas. Aucun gain de classement n’est garanti.

Le rapport détaillé est enregistré dans `build/public-redirect-audit.json` (ignoré par Git). Aucune modification visuelle ou de contenu public.

## Validation

Commande complète npm run audit:public-seo réussie : 161 pages et 95 parcours HTTP sans erreur détectée. Contrôle des imports SEO sous Node natif réussi et git diff --check sans erreur. Le seul parcours à deux sauts observé est /devis sur le domaine sans www. Aucun code de rendu ou serveur modifié ; aucune nouvelle vérification visuelle nécessaire.
