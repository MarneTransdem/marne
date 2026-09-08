# Mise en œuvre SEO — 8 septembre 2026

## Modifications du projet

- Hôte canonique aligné sur le www déjà servi en production. Redirections 301 côté Express, normalisation du slash et des extensions HTML, conservation des paramètres. Alias Firebase contrôlés à la compilation.
- Prérendu intégral des 153 pages : React rend le contenu, les liens et les métadonnées au build ; les formulaires et menus sont ensuite hydratés. Le mode développement utilise également le rendu serveur pour les pages publiques.
- Une seule production de métadonnées, avec React 19. Les métadonnées locales sont extraites des données sectorielles dans un fichier léger, sans importer tous les textes locaux sur chaque page.
- Sitemap et robots cohérents ; suppression de la date du jour artificielle. Dates propres aux articles et dates de modification visibles pour les guides effectivement révisés.
- Correction/retrait des 17 destinations 404 de l’audit et des erreurs supplémentaires découvertes par le crawl HTML complet. Liens vers les alias remplacés par des liens directs. Un article inconnu affiche une vraie page introuvable.
- Ressources complémentaires liées au sujet de la page ; ancres de services explicites ; aucun orphelin détecté par le contrôle du graphe HTML généré.
- Quatre blocs éditoriaux spécifiques : monte-meuble, garde-meuble, déménagement d’entreprise et transfert de bureaux. Critères de décision, responsabilités, périmètre et préparation ; liens vers les guides et source officielle parisienne.
- Liens officiels ajoutés sur stationnement et déclaration de changement d’adresse. Prix présentés comme repères indicatifs, suppression d’une comparaison de prix externe non sourcée. Correction de Markdown affiché littéralement et de formulations trop absolues dans le gabarit local.
- Badge Google remplacé par un lien vers les avis, sans note et nombre figés. Liens sociaux vides retirés.
- Images responsives AVIF/WebP et dimensions intrinsèques sur le gabarit local ; chargement différé des illustrations hors premier écran. Les variantes sont générées par Sharp, à partir des images existantes.
- Retrait de l’animation globale d’entrée et du masquage initial des contenus publics. Ajustement de la navigation et du bouton de menu mobile.
- Mesure via la bibliothèque officielle `web-vitals` chargée après consentement, remplaçant l’addition approximative du CLS et le maximum brut d’événements utilisé pour l’INP. Les mesures terrain restent à collecter après mise en ligne.
- Protection de l’indexation des routes privées ; maintien des formulaires et du CRM. Les modifications préexistantes de ClientDossierDrawer et VolumeCalculator ont été conservées.

## Commandes et contrôles

La suite complète a passé les contrôles SEO, les cinq scénarios du moteur de dossiers et TypeScript. Le contrôle du prérendu couvre les 153 pages et le graphe complet de leurs liens. Les 12 sondes HTTP passent également. Dans le navigateur : canonical et description uniques après hydratation et navigation, menu mobile fonctionnel et images locales servies en AVIF responsive.

Contrôle mobile final à 390 × 844 : aucun débordement horizontal sur la page Charenton-le-Pont et le formulaire de devis ; le paramètre `volume=15` préremplit bien « 15 m³ », tandis que la canonical reste sans paramètres. Aucune erreur navigateur observée sur ce parcours. Aucun formulaire n’a été soumis pendant les tests. `git diff --check` passe également.

Le JavaScript directement référencé par le HTML d’accueil passe d’environ 400 ko à 277 ko décodés (environ −31 %). Il s’agit du socle déclaré dans le HTML, pas du poids total chargé après hydratation et pas d’un résultat Core Web Vitals. Le CSS initial reste proche de 185 ko ; la réduction de ce dernier et du gros module de données locales reste une optimisation possible après mesures.

`npm run check` lance les contrôles existants, les tests du moteur de dossiers, TypeScript, la génération des images, la synchronisation du sitemap, la compilation, le prérendu et son audit.

`node scripts/audit-server.mjs http://localhost:3121` contrôle les réponses HTTP, 301, paramètres, pages privées et 404 du serveur Express construit.

Le fichier `build/seo-validation.json` contient les pages, leurs liens et les erreurs éventuelles. La compilation échoue si une page publique manque de HTML, si une canonical est incorrecte, si un H1 manque, si un lien interne cible une URL absente, si du JSON-LD est invalide ou si une page est orpheline.

## Mise en ligne et dépendances externes

Les changements sont dans le workspace ; aucun déploiement n’a été effectué. Le build doit précéder toute publication. Express sert les snapshots ; Firebase Hosting utilise les clean URLs et les redirections du fichier firebase.json.

La redirection sans www actuellement effectuée en amont par l’hébergement doit être passée de 302 à 301/308 dans sa configuration de domaine. La nouvelle application emploie le bon hôte, mais ne peut pas remplacer une réponse produite avant de la joindre.

Google Business Profile, Search Console et GA4 doivent être vérifiés dans leurs comptes : domaine/canonical sélectionnée, sitemap, réception des événements, conversions qualifiées et données terrain. Aucun accès ou changement de ces comptes n’est revendiqué.

Les vrais tarifs TTC, détails d’assurance, capacité du monte-meuble, photos documentées et cas clients publiables nécessitent une validation métier. Leur collecte a été demandée ; aucune référence, qualification, prestation supplémentaire ou note client n’a été inventée. Les 118 fiches sectorielles existantes ne constituent pas 118 études de cas validées.

Le développement d’autorité externe, l’obtention d’avis, les partenariats et la publication de nouvelles études de cas restent des travaux marketing fondés sur des relations et données réelles. Aucun achat de liens, publication externe ou sollicitation client n’a été effectué.
