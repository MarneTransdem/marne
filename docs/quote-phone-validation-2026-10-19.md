# Contrôle du téléphone dans le devis — 19 octobre 2026

Le contrôle public acceptait une suite de huit lettres comme téléphone : seule la longueur était vérifiée. Le formulaire utilise maintenant `isPlausiblePhone` pour exiger au moins huit chiffres et refuser les lettres ou les signes inattendus. Les espaces (y compris insécables), points, tirets, parenthèses et préfixe `+` restent acceptés, dans la limite existante de 25 caractères.

Ce contrôle de format ne certifie pas qu’un numéro est attribué ou joignable. Il améliore les indications données au visiteur avant envoi ; il ne remplace pas une validation côté serveur.

Le message d’erreur donne un exemple français. Les tests de formats sont ajoutés à `npm run check`. Vérification navigateur à 320 px : saisie alphabétique refusée, format international accepté, message associé au champ via `aria-describedby`, aucun débordement horizontal. Les tests UI ont conservé les autres champs obligatoires vides et le consentement non coché : aucune demande CRM n’a été envoyée.

Le contenu SEO et les étapes du formulaire restent identiques. Impact attendu : moins de demandes avec un téléphone manifestement inexploitable.
