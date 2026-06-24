type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

type WebVitalName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';

const CONSENT_STORAGE_KEY = 'cookie-consent';
const CONSENT_EVENT_NAME = 'marne:analytics-consent';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
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

function ratingForMetric(name: WebVitalName, value: number) {
  const thresholds: Record<WebVitalName, [number, number]> = {
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    INP: [200, 500],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
  };
  const [good, poor] = thresholds[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function sendWebVital(name: WebVitalName, value: number) {
  void trackEvent('web_vital', {
    event_category: 'core_web_vitals',
    metric_name: name,
    metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_rating: ratingForMetric(name, value),
    non_interaction: true,
  });
}

function observeWebVitals() {
  if (!isBrowser() || webVitalsStarted || !('PerformanceObserver' in window)) return;
  webVitalsStarted = true;

  const observed = new Set<string>();

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.responseStart) {
      sendWebVital('TTFB', navigation.responseStart);
    }
  } catch {
    // Ignore unsupported navigation timing implementations.
  }

  try {
    new PerformanceObserver((list) => {
      const fcp = list.getEntries().find((entry) => entry.name === 'first-contentful-paint');
      if (fcp && !observed.has('FCP')) {
        observed.add('FCP');
        sendWebVital('FCP', fcp.startTime);
      }
    }).observe({ type: 'paint', buffered: true });
  } catch {
    // Paint timing is not available everywhere.
  }

  let lcpValue = 0;
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) lcpValue = lastEntry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // LCP observer unsupported.
  }

  let clsValue = 0;
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<PerformanceEntry & { hadRecentInput?: boolean; value?: number }>) {
        if (!entry.hadRecentInput) clsValue += entry.value || 0;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch {
    // CLS observer unsupported.
  }

  let inpValue = 0;
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<PerformanceEntry & { duration?: number }>) {
        inpValue = Math.max(inpValue, entry.duration || 0);
      }
    }).observe({ type: 'event', buffered: true, durationThreshold: 40 } as PerformanceObserverInit);
  } catch {
    // Event timing is not supported by all browsers.
  }

  const flushFinalMetrics = () => {
    if (lcpValue > 0 && !observed.has('LCP')) {
      observed.add('LCP');
      sendWebVital('LCP', lcpValue);
    }
    if (clsValue > 0 && !observed.has('CLS')) {
      observed.add('CLS');
      sendWebVital('CLS', clsValue);
    }
    if (inpValue > 0 && !observed.has('INP')) {
      observed.add('INP');
      sendWebVital('INP', inpValue);
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushFinalMetrics();
  });
  window.addEventListener('pagehide', flushFinalMetrics);
}

export function initPublicAnalytics() {
  if (!isBrowser()) return;

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
