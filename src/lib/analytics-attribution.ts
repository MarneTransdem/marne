import { getCanonicalPath, getPublicCanonicalRoutes } from './seo-routes';

const publicPaths = new Set(getPublicCanonicalRoutes());
export function analyticsPath(value: string): string | null {
  try {
    const path = getCanonicalPath(new URL(value, 'https://www.devisdemenagement-paris.com').pathname);
    return publicPaths.has(path) ? path : null;
  } catch { return null; }
}

export type VisitAttribution = { landing_page: string; acquisition_channel: string; acquisition_source: string };
export function classifyVisit(href: string, referrer: string): VisitAttribution | null {
  const landing_page = analyticsPath(href);
  if (!landing_page) return null;
  const url = new URL(href);
  const medium = url.searchParams.get('utm_medium')?.toLowerCase();
  if (url.searchParams.has('gclid') || url.searchParams.has('msclkid') || ['cpc', 'ppc', 'paid', 'paid_search'].includes(medium || '')) {
    return { landing_page, acquisition_channel: 'paid', acquisition_source: 'campaign' };
  }
  // Never retain raw UTM values, click identifiers, referrer paths or search terms.
  if ([...url.searchParams.keys()].some(key => key.startsWith('utm_'))) {
    return { landing_page, acquisition_channel: 'campaign', acquisition_source: 'campaign' };
  }
  let host = '';
  try { host = new URL(referrer).hostname.toLowerCase(); } catch { /* Direct or unavailable. */ }
  const engines: Array<[string, RegExp]> = [
    ['google', /^(www\.)?google\.(com|fr|co\.uk|de|be|ch|ca)$/],
    ['bing', /^(www\.)?bing\.com$/], ['duckduckgo', /^(www\.)?duckduckgo\.com$/],
    ['yahoo', /^(?:[a-z]+\.)?search\.yahoo\.com$/], ['ecosia', /^(www\.)?ecosia\.org$/],
  ];
  const engine = engines.find(([, pattern]) => pattern.test(host));
  if (engine) return { landing_page, acquisition_channel: 'organic_search', acquisition_source: engine[0] };
  const internal = host === url.hostname || ['www.devisdemenagement-paris.com', 'devisdemenagement-paris.com'].includes(host);
  return { landing_page, acquisition_channel: host && !internal ? 'referral' : 'direct_or_unknown', acquisition_source: host && !internal ? 'external' : 'unknown' };
}
