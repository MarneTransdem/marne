import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const vite = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
  ssr: { noExternal: ['react-router-dom', 'react-router'], resolve: { conditions: ['module', 'import', 'development'] } },
  appType: 'custom',
});
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const { getPublicCanonicalRoutes, getSitemapXml, getRobotsTxt } = await vite.ssrLoadModule('/src/lib/seo-routes.ts');
  const index = await fs.readFile('dist/index.html', 'utf8');
  const template = (index.includes('data-ssr="true"') ? await fs.readFile('dist/shell.html', 'utf8') : index).replace(/<title>[\s\S]*?<\/title>/, '');
  await fs.writeFile('dist/shell.html', template);
  await fs.writeFile('dist/private.html', template.replace('</head>', '<meta data-rh="true" name="robots" content="noindex, nofollow" /></head>'));
  let count = 0;
  for (const url of getPublicCanonicalRoutes()) {
    let markup = await render(url);
    const head = [];
    markup = markup.replace(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>/g, tag => { head.push(tag); return ''; });
    const html = template.replace('</head>', `${head.join('\n')}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root" data-ssr="true">${markup}</div>`);
    const file = path.join('dist', url === '/' ? 'index.html' : `${url.slice(1)}.html`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html);
    count++;
  }
  await fs.writeFile('dist/sitemap.xml', getSitemapXml());
  await fs.writeFile('dist/robots.txt', getRobotsTxt());
  console.log(`Prerendered ${count} public pages with complete content and metadata.`);
} finally { await vite.close(); }
