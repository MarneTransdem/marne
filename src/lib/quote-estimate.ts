export interface QuoteEstimate {
  estimatedVolume: number;
  cartonsCount: number;
  itemsCount: number;
  rooms: { name: string }[];
  [key: string]: unknown;
}

// Browser storage may contain an older or incomplete calculator draft.
export function parseQuoteEstimate(saved: string): QuoteEstimate | null {
  try {
    const data = JSON.parse(saved);
    if (!data || typeof data !== 'object'
      || !Number.isFinite(data.estimatedVolume) || data.estimatedVolume <= 0
      || !Number.isFinite(data.cartonsCount) || data.cartonsCount < 0
      || !Number.isFinite(data.itemsCount) || data.itemsCount < 0
      || !Array.isArray(data.rooms)
      || !data.rooms.every((room: unknown) => room && typeof room === 'object' && 'name' in room && typeof room.name === 'string')) return null;
    return data;
  } catch { return null; }
}

export function getEstimateFields(estimate: QuoteEstimate) {
  return {
    volume: `${estimate.estimatedVolume} m³`,
    message: `Volume estimé via le calculateur : ${estimate.estimatedVolume} m³.
Nombre de cartons estimé : ${estimate.cartonsCount}.
Nombre d’objets estimé : ${estimate.itemsCount}.
Pièces renseignées : ${estimate.rooms.map(room => room.name).join(', ')}.
Cette estimation est indicative et pourra être affinée selon les accès et les caractéristiques de votre projet.`,
  };
}

export function removeEstimateFields<T extends { volume: string; message: string }>(current: T, estimate: QuoteEstimate): T {
  const imported = getEstimateFields(estimate);
  return {
    ...current,
    // Only clear untouched imported values. Customer edits belong to the customer.
    volume: current.volume === imported.volume ? '' : current.volume,
    message: current.message === imported.message ? '' : current.message,
  };
}

export function shouldRestoreEstimate(params: URLSearchParams): boolean {
  // An explicit, more recent choice on the homepage takes priority over storage.
  return !params.get('volume')?.trim();
}
