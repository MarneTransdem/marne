# Attribution native des recherches organiques

Les événements GA4 et l’initialisation du tag envoyaient systématiquement un `page_referrer` vide. La classification personnalisée identifiait déjà les moteurs de recherche, mais le rapport natif d’acquisition ne recevait pas ce signal.

Le tag reçoit maintenant une origine fixe correspondant au moteur reconnu dans l’attribution de visite existante. Google, Bing, DuckDuckGo, Yahoo et Ecosia sont pris en charge. Le paramètre est défini avant la configuration du flux et dans les événements. La visite mémorisée conserve ce contexte pendant la navigation vers le devis, y compris avec les données de session v1 déjà enregistrées.

Le consentement Analytics conditionne la collecte. Seules les origines constantes des moteurs sont transmises. Les référents inconnus, chemins, requêtes, fragments et valeurs brutes de campagne sont exclus. Une visite classée campagne ou payante ne reçoit pas de référent organique.

Les tests vérifient l’initialisation, les événements de page et de devis, les cinq moteurs, les domaines imitant Google, les référents internes/externes inconnus, les campagnes, les sessions v1, le refus et le retrait du consentement. La mesure des aperçus et la déduplication des demandes sont également contrôlées par la suite existante.

Impact attendu pour le pilotage SEO, une attribution organique exploitable dans les rapports natifs pour les prochaines sessions consentantes reconnues. L’historique Direct ne peut pas être reconstitué par cette correction. Les autres sources restent soumises à la politique existante de nettoyage. La réception et la classification des visites réelles devront être vérifiées après traitement GA4. Aucun gain de classement Google n’est associé à cette correction de mesure.

Référence officielle consultée le 5 novembre 2026, `page_referrer` participe au calcul de la source du trafic.

https://developers.google.com/analytics/devguides/collection/ga4/reference/config#page_referrer
