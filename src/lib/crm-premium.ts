import type { Devis, Facture, Visite, Demenagement } from '../types';
import type { AdminPublicRequest } from './admin-dossiers';

export type PremiumActionSeverity = 'critical' | 'warning' | 'growth' | 'success';

export interface PremiumAction {
  id: string;
  severity: PremiumActionSeverity;
  title: string;
  description: string;
  metric: string;
  route: string;
  cta: string;
}

export interface PremiumCockpit {
  score: number;
  scoreLabel: string;
  scoreTone: PremiumActionSeverity;
  actions: PremiumAction[];
  metrics: {
    openRequests: number;
    quotesToSend: number;
    quotesToFollowUp: number;
    visitsToday: number;
    visitsNext7: number;
    movesToday: number;
    movesUnassigned: number;
    invoicesToSend: number;
    overdueInvoices: number;
    dueSoonInvoices: number;
    signedRevenue: number;
    pendingRevenue: number;
    quotePotential: number;
    forecastRevenue: number;
    quoteEstimatedMargin: number;
    quoteMarginGap: number;
    quoteRecommendedGap: number;
    quotesMarginAtRisk: number;
    quotesPremiumToJustify: number;
    conversionRate: number;
    averageQuoteValue: number;
  };
  nextOperations: Array<{
    id: string;
    type: 'visite' | 'demenagement';
    date: string;
    title: string;
    description: string;
    route: string;
  }>;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function toLocalIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDate(value?: string) {
  if (!value) return null;
  const datePart = value.includes('T') ? value.split('T')[0] : value;
  const date = new Date(`${datePart}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysFromToday(value?: string, today = new Date()) {
  const date = parseDate(value);
  if (!date) return null;
  const base = parseDate(toLocalIsoDate(today));
  if (!base) return null;
  return Math.ceil((date.getTime() - base.getTime()) / DAY_MS);
}

function daysSince(value?: string, today = new Date()) {
  const diff = daysFromToday(value, today);
  return diff === null ? null : -diff;
}

function isOpenRequest(request: AdminPublicRequest) {
  return request.status === 'Nouveau' || request.status === 'A rappeler' || request.status === 'En cours' || !request.status;
}

function isActiveQuote(quote: Devis) {
  return quote.status === 'Brouillon' || quote.status === 'Envoyé' || quote.status === 'En attente';
}

function quoteNeedsFollowUp(quote: Devis, today = new Date()) {
  if (quote.status !== 'Envoyé' && quote.status !== 'En attente') return false;
  const sentAge = daysSince(quote.lastReminderAt || quote.sentAt || quote.createdAt || quote.date, today);
  const expiresIn = daysFromToday(quote.expiresAt, today);
  return (sentAge !== null && sentAge >= 2) || (expiresIn !== null && expiresIn <= 5);
}

function compareByDate(a: { date: string }, b: { date: string }) {
  return a.date.localeCompare(b.date);
}

function addAction(actions: PremiumAction[], action: PremiumAction) {
  if (action.metric === '0') return;
  actions.push(action);
}

function scoreTone(score: number): PremiumActionSeverity {
  if (score >= 85) return 'success';
  if (score >= 68) return 'growth';
  if (score >= 45) return 'warning';
  return 'critical';
}

export function formatPremiumCurrency(value: number) {
  return `${Math.round(value || 0).toLocaleString('fr-FR')} €`;
}

export type PremiumOpportunityLevel = 'urgent' | 'hot' | 'warm' | 'cold' | 'done';

export interface PremiumOpportunityScore {
  score: number;
  level: PremiumOpportunityLevel;
  label: string;
  nextAction: string;
  reasons: string[];
  ageDays: number | null;
  dueInDays: number | null;
}

function normalizePremiumText(value: unknown) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function readDate(value: unknown) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === 'object' && 'seconds' in value && typeof (value as { seconds?: unknown }).seconds === 'number') {
    return new Date((value as { seconds: number }).seconds * 1000);
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function daysSinceUnknown(value: unknown, today = new Date()) {
  const date = readDate(value);
  if (!date) return null;
  const base = parseDate(toLocalIsoDate(today));
  if (!base) return null;
  date.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((base.getTime() - date.getTime()) / DAY_MS));
}

function isYes(value: unknown) {
  const normalized = normalizePremiumText(value).trim();
  return normalized === 'oui' || normalized === 'yes' || normalized === 'true' || normalized === '1';
}

function hasText(value: unknown) {
  return String(value ?? '').trim().length > 0;
}

function asNumber(value: unknown) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  const normalized = String(value ?? '').replace(',', '.').replace(/[^0-9.]/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function opportunityLevel(score: number): PremiumOpportunityLevel {
  if (score >= 82) return 'urgent';
  if (score >= 68) return 'hot';
  if (score >= 48) return 'warm';
  return 'cold';
}

function opportunityLabel(level: PremiumOpportunityLevel) {
  if (level === 'urgent') return 'Priorité absolue';
  if (level === 'hot') return 'Très chaud';
  if (level === 'warm') return 'À travailler';
  if (level === 'done') return 'Traité';
  return 'Faible priorité';
}

export function scorePublicRequest(request: AdminPublicRequest, today = new Date()): PremiumOpportunityScore {
  const status = normalizePremiumText(request.status);
  const isDone = status.includes('archive') || status.includes('converti');
  const isNew = !status || status.includes('nouveau');
  const ageDays = daysSinceUnknown(request.createdAt, today);
  const dueInDays = daysFromToday(typeof request.date === 'string' ? request.date : undefined, today);
  const volume = asNumber(request.volume);
  const formula = normalizePremiumText(request.formula);
  const reasons: string[] = [];

  let score = isDone ? 30 : 42;

  if (isNew) {
    score += 18;
    reasons.push('Nouvelle demande');
  }
  if (ageDays !== null) {
    if (ageDays <= 1 && !isDone) {
      score += 14;
      reasons.push('Lead récent');
    } else if (ageDays >= 3 && isNew) {
      score += Math.min(24, ageDays * 3);
      reasons.push(`Sans traitement depuis ${ageDays} j`);
    }
  }
  if (dueInDays !== null && !isDone) {
    if (dueInDays < 0) {
      score += 18;
      reasons.push('Date client dépassée');
    } else if (dueInDays <= 14) {
      score += 16;
      reasons.push('Déménagement proche');
    } else if (dueInDays <= 30) {
      score += 8;
      reasons.push('Échéance à 30 jours');
    }
  }
  if (volume >= 45) {
    score += 12;
    reasons.push('Gros volume');
  } else if (volume >= 25) {
    score += 7;
    reasons.push('Volume intéressant');
  }
  if (formula.includes('luxe') || formula.includes('cle')) {
    score += 12;
    reasons.push('Formule premium');
  }
  if (isYes(request.needsLift)) {
    score += 7;
    reasons.push('Monte-meuble');
  }
  if (isYes(request.needsPacking)) {
    score += 7;
    reasons.push('Emballage pro');
  }
  if (isYes(request.needsStorage)) {
    score += 7;
    reasons.push('Garde-meuble');
  }
  if (normalizePremiumText(request.visitPreference).includes('domicile') || normalizePremiumText(request.visitPreference).includes('visio')) {
    score += 6;
    reasons.push('Visite souhaitée');
  }
  if (!hasText(request.phone)) {
    score -= 25;
    reasons.push('Téléphone manquant');
  }
  if (!hasText(request.email)) {
    score -= 8;
    reasons.push('Email manquant');
  }
  if (status.includes('visite') || request.plannedVisitId) {
    score += 4;
    reasons.push('Visite à préparer');
  }

  const normalizedScore = isDone ? Math.min(score, 45) : Math.max(0, Math.min(100, score));
  const level = isDone ? 'done' : opportunityLevel(normalizedScore);
  const nextAction = isDone
    ? 'Suivre le dossier créé'
    : !hasText(request.phone)
      ? 'Compléter le téléphone'
      : status.includes('visite') || request.plannedVisitId
        ? 'Préparer la visite technique'
        : normalizePremiumText(request.visitPreference).includes('domicile') || normalizePremiumText(request.visitPreference).includes('visio')
          ? 'Planifier la visite'
          : normalizedScore >= 68
            ? 'Appeler et chiffrer en priorité'
            : 'Étudier et chiffrer';

  return {
    score: normalizedScore,
    level,
    label: opportunityLabel(level),
    nextAction,
    reasons: reasons.slice(0, 4),
    ageDays,
    dueInDays
  };
}

export function scoreQuoteOpportunity(quote: Devis, today = new Date()): PremiumOpportunityScore {
  const status = normalizePremiumText(quote.status);
  const signed = status.includes('signe');
  const refused = status.includes('refuse');
  const sentAge = daysSince(quote.lastReminderAt || quote.sentAt || quote.createdAt || quote.date, today);
  const ageDays = daysSince(quote.createdAt, today);
  const dueInDays = daysFromToday(quote.expiresAt, today);
  const reasons: string[] = [];

  let score = signed ? 25 : refused ? 12 : 40;

  if (status.includes('brouillon')) {
    score += 20;
    reasons.push('Brouillon à envoyer');
    if ((ageDays || 0) >= 2) {
      score += 12;
      reasons.push(`Créé depuis ${ageDays} j`);
    }
  }
  if (status.includes('envoye') || status.includes('attente')) {
    score += 22;
    reasons.push('Devis en décision client');
    if ((sentAge || 0) >= 2) {
      score += 14;
      reasons.push(`Relance J+${sentAge}`);
    }
  }
  if (dueInDays !== null && !signed && !refused) {
    if (dueInDays < 0) {
      score += 24;
      reasons.push('Validité expirée');
    } else if (dueInDays <= 5) {
      score += 18;
      reasons.push('Expire bientôt');
    }
  }
  if ((quote.price || 0) >= 3000) {
    score += 10;
    reasons.push('Montant élevé');
  }
  if ((quote.volume || 0) >= 40) {
    score += 8;
    reasons.push('Gros volume');
  }
  if (normalizePremiumText(quote.formula).includes('luxe')) {
    score += 8;
    reasons.push('Formule premium');
  }
  if (!hasText(quote.email) && !signed && !refused) {
    score -= 18;
    reasons.push('Email manquant');
  }

  const level = signed ? 'done' : refused ? 'cold' : opportunityLevel(Math.max(0, Math.min(100, score)));
  const normalizedScore = signed ? Math.min(score, 45) : Math.max(0, Math.min(100, score));
  const nextAction = signed
    ? 'Contrôler facture et planning'
    : refused
      ? 'Archiver ou reconquérir plus tard'
      : !hasText(quote.email)
        ? 'Ajouter email client'
        : status.includes('brouillon')
          ? 'Envoyer le devis'
          : dueInDays !== null && dueInDays <= 5
            ? 'Appeler avant expiration'
            : (sentAge || 0) >= 2
              ? 'Relancer le devis'
              : 'Surveiller la réponse';

  return {
    score: normalizedScore,
    level,
    label: opportunityLabel(level),
    nextAction,
    reasons: reasons.slice(0, 4),
    ageDays,
    dueInDays
  };
}

export type PremiumPricingRiskLevel = 'danger' | 'watch' | 'healthy' | 'premium';

export interface PremiumPricingAnalysis {
  estimatedCost: number;
  recommendedPrice: number;
  recommendedMin: number;
  recommendedMax: number;
  currentPrice: number;
  marginAmount: number;
  marginRate: number;
  targetMarginRate: number;
  deltaToRecommended: number;
  riskLevel: PremiumPricingRiskLevel;
  label: string;
  action: string;
  reasons: string[];
  costBreakdown: Array<{ label: string; amount: number }>;
}

export type PremiumPricingInput = Partial<Devis> & {
  needsLift?: string;
  needsPacking?: string;
  needsStorage?: string;
};

export type PremiumPricingFormulaKey = 'economique' | 'standard' | 'luxe' | 'dynamic';

export interface PremiumPricingFormulaSettings {
  variableCost: number;
  targetMargin: number;
}

export interface PremiumPricingSettings {
  baseCost: number;
  reserveRate: number;
  localFallbackKm: number;
  nationalFallbackKm: number;
  localFixedCost: number;
  localCostPerKm: number;
  longDistanceFixedCost: number;
  longDistanceCostPerKm: number;
  floorCost: number;
  portageCostPerMeter: number;
  liftCost: number;
  packingCostPerM3: number;
  storageCost: number;
  minMarginRate: number;
  formulaMargins: Record<PremiumPricingFormulaKey, PremiumPricingFormulaSettings>;
}

export const DEFAULT_PREMIUM_PRICING_SETTINGS: PremiumPricingSettings = {
  baseCost: 240,
  reserveRate: 0.08,
  localFallbackKm: 22,
  nationalFallbackKm: 280,
  localFixedCost: 110,
  localCostPerKm: 1.15,
  longDistanceFixedCost: 280,
  longDistanceCostPerKm: 1.35,
  floorCost: 42,
  portageCostPerMeter: 2.8,
  liftCost: 280,
  packingCostPerM3: 8,
  storageCost: 180,
  minMarginRate: 0.22,
  formulaMargins: {
    economique: { variableCost: 31, targetMargin: 0.32 },
    standard: { variableCost: 38, targetMargin: 0.38 },
    luxe: { variableCost: 48, targetMargin: 0.44 },
    dynamic: { variableCost: 42, targetMargin: 0.4 }
  }
};

const PRICING_FORMULA_KEYS: PremiumPricingFormulaKey[] = ['economique', 'standard', 'luxe', 'dynamic'];

function clampConfigNumber(value: unknown, fallback: number, min = 0, max = Number.POSITIVE_INFINITY) {
  const parsed = typeof value === 'number' ? value : Number(String(value ?? '').replace(',', '.'));
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export function normalizePremiumPricingSettings(value?: Partial<PremiumPricingSettings> | null): PremiumPricingSettings {
  const source = value || {};
  const formulas = (source.formulaMargins || {}) as Partial<Record<PremiumPricingFormulaKey, Partial<PremiumPricingFormulaSettings>>>;
  const formulaMargins = PRICING_FORMULA_KEYS.reduce((acc, key) => {
    const defaults = DEFAULT_PREMIUM_PRICING_SETTINGS.formulaMargins[key];
    const current = formulas[key] || {};
    acc[key] = {
      variableCost: clampConfigNumber(current.variableCost, defaults.variableCost, 0, 300),
      targetMargin: clampConfigNumber(current.targetMargin, defaults.targetMargin, 0.05, 0.85)
    };
    return acc;
  }, {} as Record<PremiumPricingFormulaKey, PremiumPricingFormulaSettings>);

  return {
    baseCost: clampConfigNumber(source.baseCost, DEFAULT_PREMIUM_PRICING_SETTINGS.baseCost, 0, 5000),
    reserveRate: clampConfigNumber(source.reserveRate, DEFAULT_PREMIUM_PRICING_SETTINGS.reserveRate, 0, 0.5),
    localFallbackKm: clampConfigNumber(source.localFallbackKm, DEFAULT_PREMIUM_PRICING_SETTINGS.localFallbackKm, 0, 300),
    nationalFallbackKm: clampConfigNumber(source.nationalFallbackKm, DEFAULT_PREMIUM_PRICING_SETTINGS.nationalFallbackKm, 0, 1500),
    localFixedCost: clampConfigNumber(source.localFixedCost, DEFAULT_PREMIUM_PRICING_SETTINGS.localFixedCost, 0, 5000),
    localCostPerKm: clampConfigNumber(source.localCostPerKm, DEFAULT_PREMIUM_PRICING_SETTINGS.localCostPerKm, 0, 20),
    longDistanceFixedCost: clampConfigNumber(source.longDistanceFixedCost, DEFAULT_PREMIUM_PRICING_SETTINGS.longDistanceFixedCost, 0, 10000),
    longDistanceCostPerKm: clampConfigNumber(source.longDistanceCostPerKm, DEFAULT_PREMIUM_PRICING_SETTINGS.longDistanceCostPerKm, 0, 20),
    floorCost: clampConfigNumber(source.floorCost, DEFAULT_PREMIUM_PRICING_SETTINGS.floorCost, 0, 500),
    portageCostPerMeter: clampConfigNumber(source.portageCostPerMeter, DEFAULT_PREMIUM_PRICING_SETTINGS.portageCostPerMeter, 0, 50),
    liftCost: clampConfigNumber(source.liftCost, DEFAULT_PREMIUM_PRICING_SETTINGS.liftCost, 0, 3000),
    packingCostPerM3: clampConfigNumber(source.packingCostPerM3, DEFAULT_PREMIUM_PRICING_SETTINGS.packingCostPerM3, 0, 100),
    storageCost: clampConfigNumber(source.storageCost, DEFAULT_PREMIUM_PRICING_SETTINGS.storageCost, 0, 5000),
    minMarginRate: clampConfigNumber(source.minMarginRate, DEFAULT_PREMIUM_PRICING_SETTINGS.minMarginRate, 0.05, 0.75),
    formulaMargins
  };
}

function roundToNearest(value: number, step = 10) {
  return Math.round(value / step) * step;
}

function ceilToNearest(value: number, step = 10) {
  return Math.ceil(value / step) * step;
}

function parseDistanceKm(value?: string) {
  const distance = asNumber(value);
  return distance > 0 ? distance : 0;
}

function parseFloor(value?: string) {
  const normalized = normalizePremiumText(value);
  if (!normalized || normalized.includes('rdc')) return 0;
  return Math.min(8, asNumber(normalized));
}

function parsePortageMeters(value?: string) {
  const meters = asNumber(value);
  return Number.isFinite(meters) ? Math.min(120, meters) : 0;
}

function formulaPricingKey(formula?: string): PremiumPricingFormulaKey {
  const normalized = normalizePremiumText(formula);
  if (normalized.includes('luxe')) return 'luxe';
  if (normalized.includes('economique') || normalized.includes('eco')) return 'economique';
  if (normalized.includes('dynamic')) return 'dynamic';
  return 'standard';
}

function formulaPricingLabel(key: PremiumPricingFormulaKey) {
  if (key === 'luxe') return 'Luxe';
  if (key === 'economique') return 'Économique';
  if (key === 'dynamic') return 'Dynamic';
  return 'Standard';
}

function formulaPricingProfile(formula: string | undefined, settings: PremiumPricingSettings) {
  const key = formulaPricingKey(formula);
  const profile = settings.formulaMargins[key];
  return { variableCost: profile.variableCost, targetMargin: profile.targetMargin, label: formulaPricingLabel(key) };
}

function computeAccessCost(quote: PremiumPricingInput, settings: PremiumPricingSettings) {
  const fromFloor = parseFloor(quote.fromFloor);
  const toFloor = parseFloor(quote.toFloor);
  const fromElevator = normalizePremiumText(quote.fromElevator).includes('oui');
  const toElevator = normalizePremiumText(quote.toElevator).includes('oui');
  const fromLift = normalizePremiumText(quote.fromLift).includes('oui');
  const toLift = normalizePremiumText(quote.toLift).includes('oui');
  const declaredLift = isYes(quote.needsLift);
  const floorCost = (fromElevator ? 0 : fromFloor * settings.floorCost) + (toElevator ? 0 : toFloor * settings.floorCost);
  const portageCost = (parsePortageMeters(quote.fromPortage) + parsePortageMeters(quote.toPortage)) * settings.portageCostPerMeter;
  const liftCost = (fromLift || toLift || declaredLift) ? settings.liftCost : 0;
  return Math.round(floorCost + portageCost + liftCost);
}

export function analyzeQuotePricing(quote: PremiumPricingInput, pricingSettings?: Partial<PremiumPricingSettings> | null): PremiumPricingAnalysis {
  const settings = normalizePremiumPricingSettings(pricingSettings);
  const volume = Math.max(5, asNumber(quote.volume) || 20);
  const profile = formulaPricingProfile(quote.formula, settings);
  const distanceKm = parseDistanceKm(quote.distance) || (quote.voyageType === 'National' ? settings.nationalFallbackKm : settings.localFallbackKm);
  const currentPrice = Math.max(0, Math.round(asNumber(quote.price)));
  const baseCost = settings.baseCost;
  const volumeCost = volume * profile.variableCost;
  const distanceCost = distanceKm <= 45
    ? settings.localFixedCost + distanceKm * settings.localCostPerKm
    : settings.longDistanceFixedCost + distanceKm * settings.longDistanceCostPerKm;
  const crewCost = volume >= 45 ? 680 : volume >= 30 ? 520 : volume >= 18 ? 390 : 290;
  const accessCost = computeAccessCost(quote, settings);
  const serviceCost = (isYes(quote.needsPacking) ? volume * settings.packingCostPerM3 : 0) + (isYes(quote.needsStorage) ? settings.storageCost : 0);
  const subtotal = baseCost + volumeCost + distanceCost + crewCost + accessCost + serviceCost;
  const reserve = subtotal * settings.reserveRate;
  const estimatedCost = roundToNearest(subtotal + reserve);
  const targetMargin = Math.min(0.9, Math.max(0.05, profile.targetMargin));
  const minimumMargin = Math.min(0.9, Math.max(settings.minMarginRate, targetMargin - 0.08));
  const recommendedPrice = ceilToNearest(estimatedCost / (1 - targetMargin));
  const recommendedMin = ceilToNearest(estimatedCost / (1 - minimumMargin));
  const recommendedMax = ceilToNearest(recommendedPrice * 1.18);
  const marginAmount = currentPrice - estimatedCost;
  const marginRate = currentPrice > 0 ? Math.round((marginAmount / currentPrice) * 100) : 0;
  const deltaToRecommended = currentPrice - recommendedPrice;
  const minimumMarginPercent = Math.round(settings.minMarginRate * 100);

  const reasons = [
    `${volume} m³`,
    `${profile.label}`,
    `${Math.round(distanceKm)} km estimés`,
    accessCost > 0 ? 'Accès à valoriser' : 'Accès standard'
  ];

  let riskLevel: PremiumPricingRiskLevel = 'healthy';
  let label = 'Prix cohérent';
  let action = 'Conserver le prix et envoyer';

  if (currentPrice <= 0) {
    riskLevel = 'watch';
    label = 'Prix à définir';
    action = 'Appliquer le prix recommandé';
  } else if (currentPrice < recommendedMin || marginRate < minimumMarginPercent) {
    riskLevel = 'danger';
    label = 'Marge en danger';
    action = `Rehausser vers ${formatPremiumCurrency(recommendedPrice)}`;
  } else if (marginRate < Math.round(targetMargin * 100) - 4) {
    riskLevel = 'watch';
    label = 'Marge à surveiller';
    action = `Ajuster idéalement vers ${formatPremiumCurrency(recommendedPrice)}`;
  } else if (currentPrice > recommendedMax) {
    riskLevel = 'premium';
    label = 'Prix premium';
    action = 'Justifier la valeur dans le devis';
  }

  return {
    estimatedCost,
    recommendedPrice,
    recommendedMin,
    recommendedMax,
    currentPrice,
    marginAmount,
    marginRate,
    targetMarginRate: Math.round(targetMargin * 100),
    deltaToRecommended,
    riskLevel,
    label,
    action,
    reasons,
    costBreakdown: [
      { label: 'Base dossier', amount: Math.round(baseCost) },
      { label: 'Volume & manutention', amount: Math.round(volumeCost + crewCost) },
      { label: 'Transport', amount: Math.round(distanceCost) },
      { label: 'Accès & options', amount: Math.round(accessCost + serviceCost) },
      { label: 'Réserve risque', amount: Math.round(reserve) }
    ]
  };
}
export function buildPremiumCockpit(input: {
  publicRequests: AdminPublicRequest[];
  devisList: Devis[];
  factures: Facture[];
  visites: Visite[];
  demenagements: Demenagement[];
  today?: Date;
  pricingSettings?: Partial<PremiumPricingSettings> | null;
}): PremiumCockpit {
  const today = input.today || new Date();
  const todayStr = toLocalIsoDate(today);

  const openRequests = input.publicRequests.filter(isOpenRequest).length;
  const quotesToSend = input.devisList.filter(quote => quote.status === 'Brouillon').length;
  const quotesToFollowUp = input.devisList.filter(quote => quoteNeedsFollowUp(quote, today)).length;
  const activeQuotes = input.devisList.filter(isActiveQuote);
  const signedQuotes = input.devisList.filter(quote => quote.status === 'Signé');
  const sentQuotes = input.devisList.filter(quote => quote.status !== 'Brouillon');

  const visitsToday = input.visites.filter(visit => visit.date === todayStr && visit.status !== 'Annulée').length;
  const visitsNext7 = input.visites.filter((visit) => {
    const diff = daysFromToday(visit.date, today);
    return diff !== null && diff >= 0 && diff <= 7 && visit.status !== 'Annulée';
  }).length;

  const movesToday = input.demenagements.filter(move => move.date === todayStr).length;
  const movesUnassigned = input.demenagements.filter(move => {
    const hasTeam = Boolean(move.teamLeader && move.teamLeader.trim()) && (move.assignedMovers?.length || 0) > 0 && Boolean(move.assignedTruck);
    return move.status === 'À planifier' || !hasTeam;
  }).length;

  const invoicesToSend = input.factures.filter(invoice => invoice.status !== 'Payée' && !invoice.sentAt).length;
  const overdueInvoices = input.factures.filter((invoice) => {
    const dueIn = daysFromToday(invoice.dueDate, today);
    return invoice.status === 'En retard' || (invoice.status === 'En attente' && dueIn !== null && dueIn < 0);
  }).length;
  const dueSoonInvoices = input.factures.filter((invoice) => {
    const dueIn = daysFromToday(invoice.dueDate, today);
    return invoice.status === 'En attente' && dueIn !== null && dueIn >= 0 && dueIn <= 3;
  }).length;

  const signedRevenue = signedQuotes.reduce((sum, quote) => sum + (quote.price || 0), 0);
  const pendingRevenue = input.factures
    .filter(invoice => invoice.status === 'En attente' || invoice.status === 'En retard')
    .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);
  const quotePotential = activeQuotes.reduce((sum, quote) => sum + (quote.price || 0), 0);
  const quotePricing = activeQuotes.map(quote => ({ quote, pricing: analyzeQuotePricing(quote, input.pricingSettings) }));
  const quoteEstimatedMargin = quotePricing.reduce((sum, item) => sum + item.pricing.marginAmount, 0);
  const quoteMarginGap = quotePricing.reduce((sum, item) => sum + Math.max(0, item.pricing.recommendedMin - (item.quote.price || 0)), 0);
  const quoteRecommendedGap = quotePricing.reduce((sum, item) => sum + Math.max(0, item.pricing.recommendedPrice - (item.quote.price || 0)), 0);
  const quotesMarginAtRisk = quotePricing.filter(item => item.pricing.riskLevel === 'danger' || item.pricing.riskLevel === 'watch').length;
  const quotesPremiumToJustify = quotePricing.filter(item => item.pricing.riskLevel === 'premium').length;
  const forecastRevenue = signedRevenue + quotePotential;
  const conversionRate = sentQuotes.length > 0 ? Math.round((signedQuotes.length / sentQuotes.length) * 100) : 0;
  const averageQuoteValue = input.devisList.length > 0
    ? Math.round(input.devisList.reduce((sum, quote) => sum + (quote.price || 0), 0) / input.devisList.length)
    : 0;

  const riskWeight =
    (openRequests * 5) +
    (quotesToSend * 4) +
    (quotesToFollowUp * 5) +
    (quotesMarginAtRisk * 6) +
    (movesUnassigned * 8) +
    (overdueInvoices * 8) +
    (invoicesToSend * 3) +
    (dueSoonInvoices * 4);
  const score = Math.max(0, Math.min(100, 100 - riskWeight));

  const actions: PremiumAction[] = [];
  addAction(actions, {
    id: 'requests',
    severity: openRequests >= 3 ? 'critical' : 'warning',
    title: 'Qualifier les nouvelles demandes',
    description: 'Transformer les formulaires entrants en visite, devis ou rappel commercial avant refroidissement.',
    metric: String(openRequests),
    route: '/admin/demandes',
    cta: 'Traiter'
  });
  addAction(actions, {
    id: 'quotes-send',
    severity: 'growth',
    title: 'Envoyer les devis prêts',
    description: 'Les devis brouillons doivent partir vite pour augmenter le taux de signature.',
    metric: String(quotesToSend),
    route: '/admin/devis',
    cta: 'Envoyer'
  });
  addAction(actions, {
    id: 'quotes-follow-up',
    severity: quotesToFollowUp >= 4 ? 'critical' : 'warning',
    title: 'Relancer les devis chauds',
    description: 'Relances à J+2, devis proches expiration et opportunités sans réponse.',
    metric: String(quotesToFollowUp),
    route: '/admin/relances',
    cta: 'Relancer'
  });
  addAction(actions, {
    id: 'planning',
    severity: 'critical',
    title: 'Sécuriser les chantiers non affectés',
    description: 'Affecter chef, équipe et camion pour éviter les trous opérationnels.',
    metric: String(movesUnassigned),
    route: '/admin/planning',
    cta: 'Planifier'
  });
  addAction(actions, {
    id: 'invoices',
    severity: overdueInvoices > 0 ? 'critical' : 'warning',
    title: 'Protéger la trésorerie',
    description: 'Envoyer les factures non parties et relancer les échéances proches ou dépassées.',
    metric: String(overdueInvoices + dueSoonInvoices + invoicesToSend),
    route: '/admin/factures',
    cta: 'Encaisser'
  });
  addAction(actions, {
    id: 'quote-margin',
    severity: quotesMarginAtRisk >= 3 || quoteMarginGap >= 1000 ? 'critical' : 'warning',
    title: 'Corriger les devis sous marge',
    description: 'Appliquer le prix conseillé ou justifier la valeur avant envoi pour protéger la rentabilité.',
    metric: String(quotesMarginAtRisk),
    route: '/admin/devis',
    cta: 'Corriger'
  });

  addAction(actions, {
    id: 'quote-premium',
    severity: 'growth',
    title: 'Justifier les devis premium',
    description: 'Les prix hauts doivent être accompagnés d’un argumentaire clair sur accès, équipe, protections et planning.',
    metric: String(quotesPremiumToJustify),
    route: '/admin/devis',
    cta: 'Argumenter'
  });

  const nextOperations = [
    ...input.visites
      .filter(visit => {
        const diff = daysFromToday(visit.date, today);
        return diff !== null && diff >= 0 && diff <= 7 && visit.status !== 'Annulée';
      })
      .map(visit => ({
        id: `visit-${visit.id}`,
        type: 'visite' as const,
        date: visit.date,
        title: `Visite ${visit.clientName}`,
        description: `${visit.time || 'Heure à confirmer'} - ${visit.commercialAssigned || 'Commercial à assigner'}`,
        route: '/admin/visites'
      })),
    ...input.demenagements
      .filter(move => {
        const diff = daysFromToday(move.date, today);
        return diff !== null && diff >= 0 && diff <= 7 && move.status !== 'Terminé';
      })
      .map(move => ({
        id: `move-${move.id}`,
        type: 'demenagement' as const,
        date: move.date,
        title: `Chantier ${move.clientName}`,
        description: `${move.volume || 0} m³ - ${move.fromCity || 'Départ'} vers ${move.toCity || 'Arrivée'}`,
        route: '/admin/planning'
      }))
  ].sort(compareByDate).slice(0, 6);

  return {
    score,
    scoreLabel: score >= 85 ? 'Excellence opérationnelle' : score >= 68 ? 'Bon niveau, actions ciblées' : score >= 45 ? 'Sous tension' : 'Priorité critique',
    scoreTone: scoreTone(score),
    actions: actions.sort((a, b) => {
      const weight = { critical: 0, warning: 1, growth: 2, success: 3 };
      return weight[a.severity] - weight[b.severity] || Number(b.metric) - Number(a.metric);
    }).slice(0, 5),
    metrics: {
      openRequests,
      quotesToSend,
      quotesToFollowUp,
      visitsToday,
      visitsNext7,
      movesToday,
      movesUnassigned,
      invoicesToSend,
      overdueInvoices,
      dueSoonInvoices,
      signedRevenue,
      pendingRevenue,
      quotePotential,
      forecastRevenue,
      quoteEstimatedMargin,
      quoteMarginGap,
      quoteRecommendedGap,
      quotesMarginAtRisk,
      quotesPremiumToJustify,
      conversionRate,
      averageQuoteValue
    },
    nextOperations
  };
}
