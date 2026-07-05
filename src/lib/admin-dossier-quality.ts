import type { ClientDossier } from './admin-dossiers';

export type DossierQualitySeverity = 'blocking' | 'warning' | 'info';

export type DossierQualityIssueKind =
  | 'missing_email'
  | 'missing_phone'
  | 'missing_route'
  | 'missing_date'
  | 'missing_volume'
  | 'unassigned_owner'
  | 'quote_to_send'
  | 'quote_to_follow_up'
  | 'quote_expiring'
  | 'invoice_to_send'
  | 'invoice_overdue'
  | 'planning_incomplete'
  | 'move_soon';

export type DossierQualityFilter =
  | 'blocked'
  | 'missing_email'
  | 'followup'
  | 'planning_incomplete'
  | 'invoice_risk'
  | 'move_soon';

export interface DossierQualityIssue {
  kind: DossierQualityIssueKind;
  severity: DossierQualitySeverity;
  label: string;
  detail: string;
  actionLabel: string;
  weight: number;
}

export interface DossierQualitySummary {
  score: number;
  label: 'Critique' | 'Élevée' | 'À surveiller' | 'Stable';
  blocked: boolean;
  issues: DossierQualityIssue[];
  primaryIssue?: DossierQualityIssue;
  filters: DossierQualityFilter[];
  daysUntilMove?: number;
  actionLabel: string;
  reason: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const cleanText = (value: unknown) => String(value ?? '').trim();

const hasOwner = (owner: unknown) => {
  const normalized = cleanText(owner)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return Boolean(normalized) && normalized !== 'non assigne';
};

const parseVolume = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) return value;
  const parsed = Number(cleanText(value).replace(',', '.').match(/\d+(\.\d+)?/)?.[0] || NaN);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const getDaysUntil = (value?: string) => {
  if (!value) return undefined;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return undefined;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((timestamp - today.getTime()) / DAY_MS);
};

const buildIssue = (
  kind: DossierQualityIssueKind,
  severity: DossierQualitySeverity,
  label: string,
  detail: string,
  actionLabel: string,
  weight: number
): DossierQualityIssue => ({
  kind,
  severity,
  label,
  detail,
  actionLabel,
  weight
});

export const analyzeDossierQuality = (dossier: ClientDossier): DossierQualitySummary => {
  const issues: DossierQualityIssue[] = [];
  const clientEmail = cleanText(dossier.quote?.email || dossier.invoice?.email || dossier.request?.email);
  const clientPhone = cleanText(dossier.phone || dossier.request?.phone || dossier.quote?.phone || dossier.visit?.phone);
  const fromCity = cleanText(dossier.request?.fromCity || dossier.quote?.fromCity || dossier.move?.fromCity || dossier.fromCity);
  const toCity = cleanText(dossier.request?.toCity || dossier.quote?.toCity || dossier.move?.toCity || dossier.toCity);
  const moveDate = dossier.move?.date || dossier.date || dossier.visit?.date || dossier.quote?.date || dossier.request?.date;
  const daysUntilMove = getDaysUntil(moveDate);
  const volume = parseVolume(dossier.move?.volume || dossier.quote?.volume || dossier.visit?.volumeEstimated || dossier.request?.volume);
  const quoteNeedsEmail = Boolean(dossier.quote && ['Brouillon', 'Envoye', 'Envoyé', 'En attente'].includes(dossier.quote.status));
  const invoiceNeedsEmail = Boolean(dossier.invoice && ['En attente', 'En retard'].includes(dossier.invoice.status));

  if (!clientEmail) {
    issues.push(buildIssue(
      'missing_email',
      quoteNeedsEmail || invoiceNeedsEmail ? 'blocking' : 'warning',
      'Email manquant',
      'Aucun email client exploitable pour envoyer devis, facture ou suivi.',
      'Compléter email client',
      quoteNeedsEmail || invoiceNeedsEmail ? 95 : 45
    ));
  }

  if (!clientPhone) {
    issues.push(buildIssue(
      'missing_phone',
      'warning',
      'Téléphone manquant',
      'Aucun téléphone client disponible pour confirmer rapidement le dossier.',
      'Compléter téléphone',
      30
    ));
  }

  if (!fromCity || !toCity) {
    issues.push(buildIssue(
      'missing_route',
      'blocking',
      'Trajet incomplet',
      'Ville de départ ou ville d’arrivée manquante.',
      'Compléter le trajet',
      80
    ));
  }

  if (!moveDate && dossier.stage !== 'termine') {
    issues.push(buildIssue(
      'missing_date',
      dossier.stage === 'demande' ? 'warning' : 'blocking',
      'Date absente',
      'Le dossier ne contient pas de date exploitable.',
      'Renseigner la date',
      dossier.stage === 'demande' ? 35 : 70
    ));
  }

  if (!volume && ['demande', 'visite', 'devis', 'planning'].includes(dossier.stage)) {
    issues.push(buildIssue(
      'missing_volume',
      'warning',
      'Volume à confirmer',
      'Le volume n’est pas renseigné ou pas fiable.',
      'Vérifier le volume',
      35
    ));
  }

  if (!hasOwner(dossier.owner) && dossier.stage !== 'termine') {
    issues.push(buildIssue(
      'unassigned_owner',
      'warning',
      'Responsable absent',
      'Aucun responsable clair n’est rattaché au dossier.',
      'Assigner un responsable',
      40
    ));
  }

  if (dossier.quote?.status === 'Brouillon') {
    issues.push(buildIssue(
      'quote_to_send',
      clientEmail ? 'warning' : 'blocking',
      'Devis non envoyé',
      'Le devis existe mais n’a pas encore été envoyé au client.',
      'Envoyer le devis',
      clientEmail ? 55 : 98
    ));
  }

  if (dossier.quote && ['Envoye', 'Envoyé', 'En attente'].includes(dossier.quote.status)) {
    issues.push(buildIssue(
      'quote_to_follow_up',
      'warning',
      'Devis à relancer',
      'Le devis est envoyé mais aucune signature n’est encore enregistrée.',
      'Relancer le devis',
      58
    ));
  }

  const daysUntilQuoteExpiry = getDaysUntil(dossier.quote?.expiresAt);
  if (dossier.quote && typeof daysUntilQuoteExpiry === 'number' && daysUntilQuoteExpiry >= 0 && daysUntilQuoteExpiry <= 7 && dossier.quote.status !== 'Signé') {
    issues.push(buildIssue(
      'quote_expiring',
      'warning',
      'Devis expire bientôt',
      `Expiration dans ${daysUntilQuoteExpiry} jour${daysUntilQuoteExpiry > 1 ? 's' : ''}.`,
      'Relancer avant expiration',
      62
    ));
  }

  if (dossier.invoice?.status === 'En retard') {
    issues.push(buildIssue(
      'invoice_overdue',
      'blocking',
      'Facture en retard',
      'La facture est en retard de paiement.',
      'Relancer le paiement',
      120
    ));
  } else if (dossier.invoice?.status === 'En attente' && !dossier.invoice.sentAt) {
    issues.push(buildIssue(
      'invoice_to_send',
      clientEmail ? 'warning' : 'blocking',
      'Facture non envoyée',
      'La facture existe mais aucun envoi client n’est historisé.',
      'Envoyer la facture',
      clientEmail ? 55 : 96
    ));
  }

  if (
    dossier.move &&
    dossier.stage === 'planning' &&
    (!dossier.move.assignedTruck || !dossier.move.teamLeader || !dossier.move.assignedMovers?.length)
  ) {
    issues.push(buildIssue(
      'planning_incomplete',
      typeof daysUntilMove === 'number' && daysUntilMove <= 7 ? 'blocking' : 'warning',
      'Planning incomplet',
      'Équipe, chef de mission ou camion non affecté.',
      'Affecter équipe et camion',
      typeof daysUntilMove === 'number' && daysUntilMove <= 7 ? 105 : 70
    ));
  }

  if (typeof daysUntilMove === 'number' && daysUntilMove >= 0 && daysUntilMove <= 7 && dossier.stage !== 'termine') {
    issues.push(buildIssue(
      'move_soon',
      daysUntilMove <= 2 ? 'blocking' : 'warning',
      daysUntilMove <= 2 ? 'Intervention imminente' : 'Déménagement proche',
      `Intervention prévue dans ${daysUntilMove} jour${daysUntilMove > 1 ? 's' : ''}.`,
      'Contrôler le dossier',
      daysUntilMove <= 2 ? 92 : 64
    ));
  }

  const sortedIssues = issues.sort((a, b) => b.weight - a.weight);
  const score = Math.min(100, sortedIssues.reduce((sum, issue) => sum + issue.weight, 0));
  const primaryIssue = sortedIssues[0];
  const filters = new Set<DossierQualityFilter>();

  if (sortedIssues.some((issue) => issue.severity === 'blocking')) filters.add('blocked');
  if (sortedIssues.some((issue) => issue.kind === 'missing_email')) filters.add('missing_email');
  if (sortedIssues.some((issue) => ['quote_to_follow_up', 'quote_expiring', 'quote_to_send'].includes(issue.kind))) filters.add('followup');
  if (sortedIssues.some((issue) => issue.kind === 'planning_incomplete')) filters.add('planning_incomplete');
  if (sortedIssues.some((issue) => ['invoice_overdue', 'invoice_to_send'].includes(issue.kind))) filters.add('invoice_risk');
  if (sortedIssues.some((issue) => issue.kind === 'move_soon')) filters.add('move_soon');

  return {
    score,
    label: score >= 85 ? 'Critique' : score >= 55 ? 'Élevée' : score >= 25 ? 'À surveiller' : 'Stable',
    blocked: filters.has('blocked'),
    issues: sortedIssues,
    primaryIssue,
    filters: Array.from(filters),
    daysUntilMove,
    actionLabel: primaryIssue?.actionLabel || dossier.nextAction,
    reason: primaryIssue?.detail || 'Aucun point bloquant détecté sur ce dossier.'
  };
};

export const matchesDossierQualityFilter = (
  summary: DossierQualitySummary,
  filter: DossierQualityFilter | 'all'
) => filter === 'all' || summary.filters.includes(filter);
