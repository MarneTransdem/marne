# Marne Transdem

Application web de Marne Transdem, déménageur à Paris et en Île-de-France.
Le projet combine React, TypeScript, Vite et un serveur Express pour servir les
pages publiques, les routes API, le prerender SEO, le sitemap, les robots et la
négociation automatique des images AVIF/WebP.

## Points Forts

- SEO local avec pages par secteur et articles de blog canoniques.
- Prerender HTML serveur pour les balises title, meta, canonical, robots, Open Graph et JSON-LD.
- Sitemap et robots générés depuis les routes SEO canoniques.
- Images négociées en AVIF puis WebP selon le header `Accept`.
- Formulaire de devis, formulaire de contact et calculateur de volume.
- Protections anti-spam de base sur les formulaires publics.

## Stack

- React 19, TypeScript, React Router.
- Vite, Tailwind CSS, Motion, Lucide React.
- Express, compression, Nodemailer, Gemini API.
- Firebase client pour les données applicatives.
- Sharp pour la génération des variantes images.

## Installation

```bash
npm install
```

Copier `.env.example` vers `.env`, puis renseigner les variables nécessaires :

```bash
GEMINI_API_KEY=
APP_URL=
GMAIL_USER=
GMAIL_APP_PASSWORD=
VITE_GOOGLE_MAPS_PLATFORM_KEY=
```

## Développement

```bash
npm run dev
```

Le serveur écoute sur `http://localhost:3000` par défaut. Pour choisir un port
dans PowerShell :

```powershell
$env:PORT='3100'; npm run dev
```

## Qualité

```bash
npm run audit:site
npm run lint
npm run build
```

Ou tout lancer en une fois :

```bash
npm run check
```

`npm run audit:site` contrôle notamment :

- cohérence routes publiques / sitemap ;
- correspondance du `robots.txt` ;
- existence des images référencées dans `src` ;
- couverture AVIF et WebP ;
- absence d'images Unsplash externes dans les pages publiques ;
- image Open Graph par défaut ;
- absence de fichiers `.env` suivis et de placeholders critiques dans les fichiers versionnés.

## Images

Générer les variantes manquantes :

```bash
npm run optimize:images
```

La recompression des WebP existants est volontairement séparée, car Windows peut
verrouiller les fichiers servis par le serveur local :

```bash
npm run optimize:images:recompress
```

## Production

```bash
npm run build
npm start
```

En production, le serveur sert `dist/`, applique les balises SEO serveur et
renvoie les variantes AVIF/WebP disponibles pour les images publiques. Les
images originales restent servies avec `Vary: Accept` pour éviter les caches
incohérents entre navigateurs compatibles AVIF/WebP et navigateurs plus anciens.

## Structure

- `server.ts` : serveur Express, API, SEO serveur, sitemap, robots, images.
- `src/lib/seo-routes.ts` : source des routes SEO canoniques.
- `src/pages` : pages publiques et pages locales.
- `src/components` : composants réutilisables.
- `scripts/optimize-referenced-images.mjs` : génération AVIF/WebP.
- `scripts/audit-site-health.ts` : audit local SEO/performance.

## Licence

Projet propriétaire Marne Transdem.
