# Marne Transdem - Déménageur à Paris & Île-de-France

Marne Transdem est une application web moderne et performante pour une entreprise de déménagement basée à Paris. Elle offre une expérience utilisateur premium, optimisée pour le SEO et le taux de conversion.

## 🚀 Fonctionnalités

- **SEO Local Optimisé** : Pages dédiées pour de nombreux secteurs (Paris, Hauts-de-Seine, Yvelines, etc.).
- **Calculateur de Volume** : Outil interactif pour estimer le volume d'un déménagement.
- **Demande de Devis** : Formulaire complet et intuitif pour les prospects.
- **Design Premium** : Interface soignée utilisant Tailwind CSS et Framer Motion (motion) pour des animations fluides.
- **Responsive Design** : Expérience fluide sur desktop, tablette et mobile.

## 🛠️ Stack Technique

- **Frontend** : React 18+ / TypeScript
- **Build Tool** : Vite
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion (motion)
- **Icônes** : Lucide React
- **Routage** : React Router DOM

## 💻 Installation et Développement

### Prérequis

- Node.js (v18 ou supérieur)
- npm (ou yarn)

### Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-depot>
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Créez un fichier `.env` basé sur `.env.example` et configurez vos variables.

### Lancement du serveur de développement

```bash
npm run dev
```
L'application utilise un serveur Express avec Vite en middleware. Elle est accessible sur `http://localhost:3000`.

### Build et Production

Pour construire et lancer l'application en mode production (idéal pour Cloud Run) :

```bash
npm run build
npm start
```
Le serveur écoutera sur le port défini par l'environnement (`PORT`) ou 3000 par défaut.

## 📁 Structure du Projet

- `server.ts` : Point d'entrée de l'application (Express + Vite).
- `src/components` : Composants UI réutilisables.
- `src/pages` : Pages principales et pages SEO locales.
- `src/lib` : Utilitaires et schémas SEO.
- `src/constants` : Constantes de l'application (coordonnées, etc.).
- `src/types.ts` : Définitions Typescript globales.

## 📄 Licence

Ce projet est la propriété de Marne Transdem.
