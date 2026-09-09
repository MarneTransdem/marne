// Use native Node resolution, as `node server.ts` does in App Hosting.
// Vite/tsx can resolve extensionless imports that fail in production.
import assert from 'node:assert/strict';
import { getSeoRoute } from '../src/lib/seo-routes.ts';

const route = getSeoRoute('/demenagement-paris-montpellier');
assert.equal(route.status, 200);
assert.equal(route.h1, 'Déménagement Paris–Montpellier');
console.log('Native Node SEO imports passed.');
