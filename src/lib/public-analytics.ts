import firebaseConfig from '../../firebase-applet-config.json';

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type WebVitalName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';

const CONSENT_STORAGE_KEY = 'cookie-consent';
const CONSENT_EVENT_NAME = 'marne:analytics-consent';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || firebaseConfig.measurementId || '';
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
const GOOGLE_ADS_QUOTE_LABEL = import.meta.env.VITE_GOOGLE_ADS_QUOTE_CONVERSION_LABEL;

let gtagPromise: Promise<void> | null = null;
let webVitalsStarted = false;

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
  return window.localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
}

export function setAnalyticsConsent(value: 'accepted' | 'declined') {
  if (!isBrowser()) return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT_NAME, { detail: { value } }));
}

function cleanParams(params: AnalyticsParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

function loadGtag() {
  if (!isBrowser() || !GA_MEASUREMENT_ID || !hasAnalyticsConsent()) return Promise.resolve();
  if (gtagPromise) return gtagPromise;

  gtagPromise = new Promise((resolve, reject) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer?.push(arguments);
    };

    if (document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    script.onload = () => {
      window.gtag?.('js', new Date());
      window.gtag?.('config', GA_MEASUREMENT_ID, { send_page_view: false });
      resolve();
    };
    script.onerror = () => reject(new Error('Unable to load Google Analytics'));
    document.head.appendChild(script);
  });

  return gtagPromise;
}

async function logFirebaseEvent(eventName: string, params: AnalyticsParams) {
  try {
    const [{ getFirebaseAnalytics }, { logEvent }] = await Promise.all([
      import('./firebase'),
      import('firebase/analytics'),
    ]);
    const analytics = await getFirebaseAnalytics();
    if (!analytics) return;
    logEvent(analytics, eventName, cleanParams(params));
  } catch (error) {
    console.warn('Firebase Analytics event failed:', error);
  }
}

export async function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!isBrowser() || !hasAnalyticsConsent()) return;
  const payload = cleanParams({
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...params,
  });

  try {
    await loadGtag();
    window.gtag?.('event', eventName, payload);
  } catch (error) {
    console.warn('GA4 event failed:', error);
  }

  await logFirebaseEvent(eventName, payload);
}

export function trackPageView(path: string, title: string) {
  void trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
}

export function trackConversion(action: string, params: AnalyticsParams = {}) {
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
      void loadGtag().then(() => {
        window.gtag?.('event', 'conversion', {
          send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_QUOTE_LABEL}`,
          value: 1,
          currency: 'EUR',
        });
      });
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
    void loadGtag();
    observeWebVitals();
  }

  window.addEventListener(CONSENT_EVENT_NAME, (event) => {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    if (detail?.value !== 'accepted') return;
    void loadGtag();
    observeWebVitals();
    trackPageView(`${window.location.pathname}${window.location.search}`, document.title);
  });
}
