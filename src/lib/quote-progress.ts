export type QuoteProgressEvent = 'quote_form_start' | 'quote_step_2_view' | 'quote_step_3_view';

/** One form mount is one attempt; no field content is accepted by this recorder. */
export function createQuoteProgressTracker({ hasConsent, send }: {
  hasConsent: () => boolean;
  send: (event: QuoteProgressEvent) => void;
}) {
  const sent = new Set<QuoteProgressEvent>();
  const record = (event: QuoteProgressEvent) => {
    try {
      if (sent.has(event) || !hasConsent()) return;
      send(event);
      sent.add(event);
    } catch { /* Optional measurement must never block the form. */ }
  };

  return {
    start: () => record('quote_form_start'),
    reachStep: (step: number) => {
      if (step === 2) record('quote_step_2_view');
      if (step === 3) record('quote_step_3_view');
    },
  };
}
