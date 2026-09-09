# Mesure des demandes de devis — 9 septembre 2026

## Corrections

- Un seul circuit gtag pour les événements publics : suppression du second envoi Firebase Analytics.
- `generate_lead` uniquement après confirmation de `addDoc` par Firestore ; identifiant de document utilisé pour empêcher deux appels identiques dans la page. Les clics téléphone restent `phone_click` et ne génèrent pas de prospect.
- Verrou synchrone contre deux soumissions simultanées du formulaire. Une erreur de notification e-mail ne transforme plus un enregistrement réussi en échec apparent.
- Paramètres analytiques limités à une liste autorisée. Aucun nom, téléphone, e-mail, ville saisie, sujet libre, inventaire détaillé, paramètre d’URL ou fragment transmis par les événements applicatifs.
- URL et titre issus des routes publiques connues ; URL de provenance brute retirée. Les routes privées ne sont pas mesurées par ce circuit.
- Consentement vérifié avant et après chargement asynchrone de la balise. Retrait : arrêt des événements applicatifs et suppression de l’attribution locale. Publicité personnalisée et signaux publicitaires restent refusés.

## Attribution

Avec consentement, conserver une page d’entrée publique et une catégorie de provenance dans la session du navigateur (expiration après 30 minutes d’inactivité). Les moteurs reconnus sont classés `organic_search` ; les identifiants publicitaires ou supports payants connus sont classés `paid`. Une URL UTM non payante est classée `campaign`. Une provenance extérieure non reconnue est `referral`, son nom n’est pas conservé. L’absence de provenance est `direct_or_unknown` : elle ne prouve pas une saisie directe de l’URL.

Les paramètres UTM et identifiants de clic ne sont jamais conservés. Le classement est indicatif, n’est pas une attribution multicanale et ne permet pas de reconstituer les visites antérieures au consentement. Une navigation dans le même onglet conserve l’origine jusqu’au devis. Sans consentement : aucune attribution enregistrée dans la demande.

La collection `quotes` reçoit, si disponible, un champ `acquisition` contenant `landing_page`, `acquisition_channel`, `acquisition_source`. Les mêmes dimensions accompagnent les événements GA4. Ces données client sont indicatives et ne doivent pas servir à des décisions financières automatisées.

## Exploitation dans GA4

La configuration du compte GA4 n’a pas été inspectée ni modifiée. Pour exploiter ce suivi :

1. Vérifier la réception de `generate_lead` et le définir comme événement clé ; ne pas additionner `quote_form_submit` et `generate_lead` comme deux prospects.
2. Créer les dimensions personnalisées de portée événement `landing_page`, `acquisition_channel` et `acquisition_source` pour les explorations.
3. Vérifier les mesures améliorées du flux : désactiver les vues automatiques fondées sur l’historique et les interactions de formulaires si elles font doublon avec la mesure applicative. Vérifier les réglages de collecte de données fournies par les utilisateurs avant de conclure à un audit global de confidentialité.
4. Comparer les demandes enregistrées et les événements consentis : un bloqueur, une interruption réseau ou un refus de cookies peut expliquer un écart. Aucun système navigateur ne garantit une livraison exactement une fois.

Références officielles consultées :
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://developers.google.com/tag-platform/security/guides/consent

## Tests

`npm run test:analytics` teste en environnement isolé le consentement, le retrait pendant le chargement, la suppression des données d’URL, le circuit unique, la déduplication, l’attribution, les routes privées et le stockage inaccessible. Le gestionnaire réel du formulaire est exécuté avec Firestore et e-mail simulés : succès, échec de sauvegarde, échec de notification et soumissions concurrentes. Aucun prospect ni e-mail de test créé en production. Ces tests sont intégrés à `npm run check`.
