import firebaseConfig from '../../firebase-applet-config.json';
import { analyticsPath, classifyVisit, type VisitAttribution } from './analytics-attribution';
import { SITE_URL, getSeoRoute } from './seo-routes';

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type WebVitalName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';

const CONSENT_STORAGE_KEY = 'cookie-consent';
const CONSENT_EVENT_NAME = 'marne:analytics-consent';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || firebaseConfig.measurementId || '';
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
const GOOGLE_ADS_QUOTE_LABEL = import.meta.env.VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL;

let gtagPromise: Promise<void> | null = null;
let webVitalsStarted = false;
let consentVersion = 0;
const ATTRIBUTION_KEY = 'marne:visit-attribution:v1';
let visit: (VisitAttribution & { touched: number }) | null = null;
const sentQuotes = new Set<string>();
let lastPageView: string | null = null;

export function getVisitAttribution(): VisitAttribution | null {
  if (!hasAnalyticsConsent()) return null;
  const now = Date.now();
  if (!visit) {
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || 'null');
      if (saved && analyticsPath(saved.landing_page) === saved.landing_page &&
          ['paid', 'campaign', 'organic_search', 'referral', 'direct_or_unknown'].includes(saved.acquisition_channel) &&
          ['campaign', 'google', 'bing', 'duckduckgo', 'yahoo', 'ecosia', 'external', 'unknown'].includes(saved.acquisition_source) &&
          Number.isFinite(saved.touched) && now - saved.touched < 30 * 60 * 1000) visit = saved;
    } catch { /* Storage can be unavailable. */ }
  }
  if (!visit || now - visit.touched >= 30 * 60 * 1000) {
    const initial = classifyVisit(window.location.href, document.referrer);
    visit = initial ? { ...initial, touched: now } : null;
  }
  if (!visit) return null;
  visit.touched = now;
  try { window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(visit)); } catch { /* Memory-only fallback. */ }
  return { landing_page: visit.landing_page, acquisition_channel: visit.acquisition_channel, acquisition_source: visit.acquisition_source };
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isBrowser() {
  return typeof window !== 'undefined';
}

export function hasAnalyticsConsent() {
  if (!isBrowser()) return false;
  try { return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted'; } catch { return false; }
}

export function setAnalyticsConsent(value: 'accepted' | 'declined') {
  if (!isBrowser()) return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  consentVersion++;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = value !== 'accepted';
  window.gtag?.('consent', 'update', { analytics_storage: value === 'accepted' ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  if (value === 'declined') {
    lastPageView = null;
    visit = null;
    try { window.sessionStorage.removeItem(ATTRIBUTION_KEY); } catch { /* Optional storage. */ }
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME, { detail: { value } }));
}

function cleanParams(params: AnalyticsParams = {}) {
  const allowed = new Set(['placement', 'has_from_address', 'has_to_address', 'has_volume', 'has_pre_estimate', 'metric_name', 'metric_value', 'metric_delta', 'metric_rating', 'navigation_type', 'non_interaction', 'consent_value']);
  return Object.fromEntries(
    Object.entries(params).filter(([key, value]) => allowed.has(key) && (typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value)) || (typeof value === 'string' && /^[a-zA-Z0-9_-]{1,60}$/.test(value))))
  );
}

function loadGtag() {
  if (!isBrowser() || !GA_MEASUREMENT_ID || !hasAnalyticsConsent() || !analyticsPath(window.location.pathname)) return Promise.resolve();
  if (gtagPromise) return gtagPromise;

  gtagPromise = new Promise((resolve, reject) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer?.push(arguments);
    };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('set', { page_location: `${SITE_URL}${analyticsPath(window.location.pathname) || '/'}`, page_referrer: '', allow_google_signals: false, allow_ad_personalization_signals: false });

    if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    script.onload = () => {
      window.gtag?.('js', new Date());
      if (hasAnalyticsConsent()) window.gtag?.('config', GA_MEASUREMENT_ID, { send_page_view: false });
      resolve();
    };
    script.onerror = () => { script.remove(); gtagPromise = null; reject(new Error('Unable to load Google Analytics')); };
    document.head.appendChild(script);
  });

  return gtagPromise;
}

export async function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!isBrowser() || !GA_MEASUREMENT_ID || !hasAnalyticsConsent()) return;
  const pagePath = analyticsPath(eventName === 'web_vital' && typeof params.page_path === 'string' ? params.page_path : window.location.pathname);
  if (!pagePath) return;
  const version = consentVersion;
  const payload = { ...cleanParams(params), ...getVisitAttribution(), page_path: pagePath, page_location: `${SITE_URL}${pagePath}`, page_referrer: '', page_title: getSeoRoute(pagePath).title };

  try {
    await loadGtag();
    if (hasAnalyticsConsent() && version === consentVersion) window.gtag?.('event', eventName, { ...payload, send_to: GA_MEASUREMENT_ID });
  } catch (error) {
    console.warn('GA4 event failed:', error);
  }

}

export function trackPageView(path: string, _title: string) {
  if (!hasAnalyticsConsent()) return;
  const canonicalPath = analyticsPath(path);
  if (!canonicalPath || lastPageView === canonicalPath) return;
  lastPageView = canonicalPath;
  void trackEvent('page_view', {
    page_path: canonicalPath,
  });
}

export function trackConversion(action: string, params: AnalyticsParams = {}, savedQuoteId?: string) {
  if (!hasAnalyticsConsent()) return;
  if (action === 'quote_form_submit') {
    if (!savedQuoteId || sentQuotes.has(savedQuoteId)) return;
    sentQuotes.add(savedQuoteId);
  }
  const conversionParams = {
    event_category: 'conversion',
    conversion_action: action,
    ...params,
  };

  void trackEvent(action, conversionParams);

  if (action === 'quote_form_submit') {
    void trackEvent('generate_lead', {
      ...conversionParams,
      lead_type: 'quote_request',
    });

    if (GOOGLE_ADS_ID && GOOGLE_ADS_QUOTE_LABEL) {
      const version = consentVersion;
      void loadGtag().then(() => {
        if (!hasAnalyticsConsent() || version !== consentVersion) return;
        window.gtag?.('event', 'conversion', {
          send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_QUOTE_LABEL}`,
          transaction_id: savedQuoteId,
        });
      }).catch(() => { /* Analytics must never block the quote. */ });
    }
  }
}

function observeWebVitals() {
  if (!isBrowser() || webVitalsStarted || !hasAnalyticsConsent()) return;
  webVitalsStarted = true;
  // Attribute document-level metrics to the landing page, not to a later SPA route.
  const landingPath = window.location.pathname;
  void import('web-vitals').then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
    const report = (metric: import('web-vitals').Metric) => {
      void trackEvent('web_vital', {
        page_path: landingPath,
        metric_id: metric.id,
        metric_name: metric.name,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating,
        navigation_type: metric.navigationType,
        non_interaction: true,
      });
    };
    onCLS(report); onINP(report); onLCP(report); onFCP(report); onTTFB(report);
  }).catch(() => { webVitalsStarted = false; });
}

let publicAnalyticsInitialized = false;
export function initPublicAnalytics() {
  if (!isBrowser() || publicAnalyticsInitialized) return;
  publicAnalyticsInitialized = true;

  if (hasAnalyticsConsent()) {
    void loadGtag().catch(() => { /* Optional analytics. */ });
    getVisitAttribution();
    observeWebVitals();
  }

  window.addEventListener(CONSENT_EVENT_NAME, (event) => {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    if (detail?.value !== 'accepted') return;
    void loadGtag().catch(() => { /* Optional analytics. */ });
    observeWebVitals();
    trackPageView(`${window.location.pathname}${window.location.search}`, document.title);
  });
}
