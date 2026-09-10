# Cohérence des dates des articles

Les dates de mise à jour visibles et dateModified de BlogPosting lisent désormais contentUpdatedAt.json, comme lastmod dans le sitemap. Les anciennes valeurs locales des articles sont supprimées. La date de publication est conservée et identifiée avec un libellé et une balise time.

Le formatage français utilise explicitement UTC pour éviter un décalage de jour selon le navigateur. Aucune date n’est calculée à partir du jour de build. Le registre doit uniquement être modifié lors d’une réelle modification du contenu.

La correction reflète les changements de maillage des six articles effectués le 10 septembre. Elle ne prétend pas améliorer automatiquement leur classement.

Référence : https://developers.google.com/search/docs/appearance/publication-dates?hl=fr
