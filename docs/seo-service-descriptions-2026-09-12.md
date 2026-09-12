# Publier les descriptions spécifiques des services

Le composant SEO utilise le registre des routes en priorité. Les descriptions rédigées dans les composants de services étaient donc masquées par un modèle générique sur 18 pages, même lorsqu'elles avaient été retravaillées.

Le registre reçoit les descriptions déjà rédigées et revues pour 15 pages : cartons, entreprises, étudiant, militaire, mutation, particuliers, petit volume, emballage, formules, garde-meuble, archives, monte-meuble, bureaux, industriel et informatique. La description œuvres d'art déjà corrigée rejoint la même table pour supprimer son traitement particulier.

Les titres, URL et règles de canonique sont conservés. La table sert aux métadonnées SSR, à la navigation client et aux descriptions Open Graph/Twitter. Les dates éditoriales ne sont pas avancées pour cette correction de publication des descriptions existantes.

Les descriptions spécifiques proposées dans les composants piano, senior et laboratoire restent hors de ce lot : leur périmètre commercial doit être vérifié avant publication. Le modèle central existant reste utilisé pour ces trois pages. Les écarts entre composants et registre ne sont pas tous des erreurs : les pages générales ont des descriptions centrales explicites.

Validation : npm run check, puis comparaison exacte des trois balises description/og:description/twitter:description sur les 16 routes concernées dans le HTML généré et le HTML public. Cette correction ne garantit pas que Google reprendra ces textes littéralement dans ses extraits ni une hausse de clics.
