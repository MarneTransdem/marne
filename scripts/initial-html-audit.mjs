// Audit raw HTML, before a browser can run React's segment-replacement scripts.
export function auditInitialHtml(html) {
  const errors = [];
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main || !/<h1\b/i.test(main)) errors.push('initial main content has no h1');
  if (/<!--\$(?:\?|!)-->/.test(html)) errors.push('unresolved Suspense boundary in initial HTML');
  if (/\bid=["']S:\d+["']/.test(html)) errors.push('deferred React segment in initial HTML');
  return errors;
}
