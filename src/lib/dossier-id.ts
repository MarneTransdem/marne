export type DossierReferenceType = 'REQ' | 'VIS' | 'DEV' | 'FAC' | 'DEM' | 'SIM' | 'MAN';

export const DOSSIER_ID_PREFIX = 'DOS';

export function sanitizeDossierReference(value?: string | number | null) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toUpperCase();
}

export function buildDossierIdFromReference(type: DossierReferenceType, reference?: string | number | null) {
  const cleanReference = sanitizeDossierReference(reference);
  return cleanReference ? `${DOSSIER_ID_PREFIX}-${type}-${cleanReference}` : createDossierId(type);
}

export function createDossierId(type: DossierReferenceType = 'MAN') {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${DOSSIER_ID_PREFIX}-${type}-${timestamp}-${random}`;
}
