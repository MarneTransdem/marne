import assert from 'node:assert/strict';
import { createServer } from 'vite';

// Exercise the actual route component, not just the HTTP route registry.
const vite = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  ssr: {
    noExternal: ['react-router-dom', 'react-router'],
    resolve: { conditions: ['module', 'import', 'development'] },
  },
  appType: 'custom',
});
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  for (const slug of ['constructor', 'toString', '__proto__', 'hasOwnProperty', 'article-inexistant']) {
    const html = await render(`/blog/${slug}`);
    assert.match(html, /Page introuvable/, slug);
    assert.match(html, /noindex, nofollow/, slug);
    assert.doesNotMatch(html, /BlogPosting/, slug);
  }
  const valid = await render('/blog/combien-coute-demenagement-paris');
  assert.match(valid, /BlogPosting/);
  assert.match(valid, /Quel prix pour déménager un studio/);
  const alias = await render('/blog/2');
  assert.match(alias, /BlogPosting/);
  assert.match(alias, /comment-estimer-volume-demenagement/);
  console.log('Blog routes: 5 unknown slugs render NotFound; valid article and legacy alias preserved.');
} finally { await vite.close(); }
