import type { Devis, Facture } from '../types';
import { normalizeCrmCommunicationSettings, type CrmCommunicationSettings } from './crm-settings';

export type CommunicationDocumentType = 'devis' | 'facture';

export type CommunicationAction =
  | 'quote_send'
  | 'quote_reminder_soft'
  | 'quote_reminder_expiring'
  | 'invoice_send'
  | 'invoice_reminder'
  | 'invoice_overdue';

export type CommunicationLogStatus = 'sent' | 'failed' | 'done';

export interface CommunicationLog {
  id: string;
  documentType: CommunicationDocumentType;
  documentId: string;
  dossierId?: string;
  clientName: string;
  clientEmail?: string;
  action: CommunicationAction;
  channel: 'Email';
  subject: string;
  body: string;
  status: CommunicationLogStatus;
  sentAt: string;
  sentBy?: string;
  error?: string;
  metadata?: {
    amount?: number;
    dueDate?: string;
    quoteStatus?: Devis['status'];
    invoiceStatus?: Facture['status'];
    reminderCount?: number;
  };
}

export interface CommunicationTask {
  id: string;
  documentType: CommunicationDocumentType;
  documentId: string;
  dossierId?: string;
  action: CommunicationAction;
  priority: 'high' | 'medium' | 'normal';
  title: string;
  description: string;
  clientName: string;
  clientEmail?: string;
  amount: number;
  dateLabel: string;
  badgeLabel: string;
  ctaLabel: string;
  document: Devis | Facture;
  subject: string;
  body: string;
  lastSentAt?: string;
  sentToday: boolean;
  blockedReason?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export const DEFAULT_COMMUNICATION_TEMPLATES: Record<CommunicationAction, { subject: string; body: string }> = {
  quote_send: {
    subject: 'Votre devis Marne Transdem {documentId}',
    body: `Bonjour {clientName},

Veuillez trouver ci-joint votre devis {documentId} pour votre déménagement {routeLabel}.

Montant estimé : {amount}. Le devis est valable jusqu'au {expiresAt}.

Nous restons disponibles pour répondre à vos questions et bloquer la date dès votre validation.

Cordialement,
L'équipe Marne Transdem`
  },
  quote_reminder_soft: {
    subject: 'Suite à votre devis Marne Transdem {documentId}',
    body: `Bonjour {clientName},

Je me permets de revenir vers vous concernant le devis {documentId} envoyé pour votre déménagement {routeLabel}.

Avez-vous pu le consulter ? Nous pouvons ajuster la proposition si besoin ou bloquer la date dès votre accord.

{toneLine}

Cordialement,
L'équipe Marne Transdem`
  },
  quote_reminder_expiring: {
    subject: 'Votre devis Marne Transdem {documentId} arrive bientôt à expiration',
    body: `Bonjour {clientName},

Votre devis {documentId} pour votre déménagement {routeLabel} arrive bientôt à expiration le {expiresAt}.

Pour garantir la disponibilité de l'équipe et du camion à la date prévue, nous vous invitons à nous confirmer votre accord dès que possible.

{toneLine}

Cordialement,
L'équipe Marne Transdem`
  },
  invoice_send: {
    subject: 'Votre facture Marne Transdem {documentId}',
    body: `Bonjour {clientName},

Veuillez trouver ci-joint votre facture {documentId} d'un montant de {amount}.

Elle est payable avant le {dueDate}. Si le règlement a déjà été effectué, nous vous remercions de ne pas tenir compte de ce message.

Cordialement,
L'équipe Marne Transdem`
  },
  invoice_reminder: {
    subject: 'Rappel de paiement - Facture Marne Transdem {documentId}',
    body: `Bonjour {clientName},

Nous vous rappelons que la facture {documentId}, d'un montant de {amount}, est en attente de règlement.

Date d'échéance : {dueDate}. Vous trouverez la facture en pièce jointe avec les informations de paiement.

{toneLine}

Cordialement,
L'équipe Marne Transdem`
  },
  invoice_overdue: {
    subject: 'Relance facture échue - Marne Transdem {documentId}',
    body: `Bonjour {clientName},

Sauf erreur de notre part, la facture {documentId}, d'un montant de {amount}, a dépassé sa date d'échéance du {dueDate}.

Nous vous remercions de bien vouloir régulariser le règlement dans les meilleurs délais. La facture est jointe à ce message.

{toneLine}

Cordialement,
L'équipe Marne Transdem`
  }
};

export const COMMUNICATION_ACTION_LABELS: Record<CommunicationAction, string> = {
  quote_send: 'Envoi devis',
  quote_reminder_soft: 'Relance devis',
  quote_reminder_expiring: 'Relance expiration',
  invoice_send: 'Envoi facture',
  invoice_reminder: 'Relance facture',
  invoice_overdue: 'Relance retard'
};

export function toIsoDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

export function formatDateFr(value?: string) {
  if (!value) return 'Non renseigné';
  const datePart = value.includes('T') ? value.split('T')[0] : value;
  const parts = datePart.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return value;
}

export function formatCurrency(value?: number) {
  return `${Math.round(Number(value || 0)).toLocaleString('fr-FR')} €`;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function parseDate(value?: string) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function diffDays(from?: string, to = new Date()) {
  const date = parseDate(from);
  if (!date) return 0;
  return Math.floor((startOfDay(to).getTime() - startOfDay(date).getTime()) / DAY_MS);
}

function daysUntil(value?: string, from = new Date()) {
  const date = parseDate(value);
  if (!date) return null;
  return Math.ceil((startOfDay(date).getTime() - startOfDay(from).getTime()) / DAY_MS);
}

function isToday(value?: string, now = new Date()) {
  const date = parseDate(value);
  if (!date) return false;
  return toIsoDate(date) === toIsoDate(now);
}

function getLogsForDocument(logs: CommunicationLog[], documentType: CommunicationDocumentType, documentId: string) {
  return logs
    .filter(log => log.documentType === documentType && log.documentId === documentId && (log.status === 'sent' || log.status === 'done'))
    .sort((a, b) => b.sentAt.localeCompare(a.sentAt));
}

function getLastLog(logs: CommunicationLog[], documentType: CommunicationDocumentType, documentId: string, actions?: CommunicationAction[]) {
  return getLogsForDocument(logs, documentType, documentId)
    .find(log => !actions || actions.includes(log.action));
}

function replaceTokens(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((next, [key, value]) => next.replaceAll(`{${key}}`, value), template);
}

function getQuoteRouteLabel(quote: Devis) {
  return [quote.fromCity, quote.toCity].filter(Boolean).join(' vers ') || 'à planifier';
}

function getToneLine(action: CommunicationAction, tone: CrmCommunicationSettings['tone']) {
  if (action === 'quote_send' || action === 'invoice_send') return '';

  if (action.startsWith('quote_')) {
    if (tone === 'soft') return 'Si votre projet a évolué, dites-nous simplement ce qu’il faut ajuster.';
    if (tone === 'firm') return 'Sans retour rapide, nous ne pourrons pas garantir durablement la disponibilité de l’équipe et du véhicule.';
    return 'Nous pouvons vous répondre rapidement et sécuriser la date dès votre accord.';
  }

  if (tone === 'soft') return 'Si le règlement est déjà parti ou si vous avez besoin d’un délai, vous pouvez simplement nous répondre.';
  if (tone === 'firm') return 'Sans retour ou règlement rapide, ce dossier restera suivi en priorité par notre service administratif.';
  return 'Si le règlement a déjà été effectué, nous vous remercions de ne pas tenir compte de ce rappel.';
}

function getTemplateValues(
  action: CommunicationAction,
  document: Devis | Facture,
  documentType: CommunicationDocumentType,
  communicationSettings: CrmCommunicationSettings
) {
  const isQuote = documentType === 'devis';
  const quote = isQuote ? document as Devis : null;
  const invoice = !isQuote ? document as Facture : null;

  return {
    clientName: document.clientName || 'Client',
    documentId: document.id,
    amount: formatCurrency(isQuote ? quote?.price : invoice?.amount),
    routeLabel: quote ? getQuoteRouteLabel(quote) : 'réalisé avec Marne Transdem',
    expiresAt: formatDateFr(quote?.expiresAt),
    dueDate: formatDateFr(invoice?.dueDate),
    toneLine: getToneLine(action, communicationSettings.tone)
  };
}

export function renderCommunication(
  action: CommunicationAction,
  document: Devis | Facture,
  documentType: CommunicationDocumentType,
  communicationSettings?: Partial<CrmCommunicationSettings> | null
) {
  const settings = normalizeCrmCommunicationSettings(communicationSettings);
  const customTemplate = settings.templates[action];
  const fallbackTemplate = DEFAULT_COMMUNICATION_TEMPLATES[action];
  const template = {
    subject: customTemplate?.subject?.trim() || fallbackTemplate.subject,
    body: customTemplate?.body?.trim() || fallbackTemplate.body
  };
  const values = getTemplateValues(action, document, documentType, settings);

  return {
    subject: replaceTokens(template.subject, values).replace(/\s+/g, ' ').trim(),
    body: replaceTokens(template.body, values).replace(/\n{3,}/g, '\n\n').trim()
  };
}

function getTaskTemplate(
  action: CommunicationAction,
  document: Devis | Facture,
  documentType: CommunicationDocumentType,
  communicationSettings: CrmCommunicationSettings
) {
  return renderCommunication(action, document, documentType, communicationSettings);
}

function createTask(input: Omit<CommunicationTask, 'subject' | 'body'>, communicationSettings: CrmCommunicationSettings): CommunicationTask {
  const rendered = getTaskTemplate(input.action, input.document, input.documentType, communicationSettings);
  return { ...input, subject: rendered.subject, body: rendered.body };
}

export function buildCommunicationTasks(
  devisList: Devis[],
  factures: Facture[],
  logs: CommunicationLog[],
  now = new Date(),
  communicationSettings?: Partial<CrmCommunicationSettings> | null
): CommunicationTask[] {
  const communication = normalizeCrmCommunicationSettings(communicationSettings);
  const tasks: CommunicationTask[] = [];

  devisList.forEach((quote) => {
    const quoteLogs = getLogsForDocument(logs, 'devis', quote.id);
    const sentLog = getLastLog(logs, 'devis', quote.id, ['quote_send']);
    const reminderLog = getLastLog(logs, 'devis', quote.id, ['quote_reminder_soft', 'quote_reminder_expiring']);
    const sentAt = quote.sentAt || sentLog?.sentAt;
    const reminderCount = quote.reminderCount ?? quoteLogs.filter(log => log.action.startsWith('quote_reminder')).length;
    const lastReminderAt = quote.lastReminderAt || reminderLog?.sentAt;
    const expiresIn = daysUntil(quote.expiresAt, now);
    const hasEmail = Boolean(quote.email?.trim());

    if (quote.status === 'Brouillon') {
      tasks.push(createTask({
        id: `quote-send-${quote.id}`,
        documentType: 'devis',
        documentId: quote.id,
        dossierId: quote.dossierId,
        action: 'quote_send',
        priority: hasEmail ? 'medium' : 'normal',
        title: 'Envoyer le devis au client',
        description: `Devis ${quote.id} prêt à transmettre à ${quote.clientName}.`,
        clientName: quote.clientName,
        clientEmail: quote.email,
        amount: quote.price,
        dateLabel: quote.date ? `Déménagement ${formatDateFr(quote.date)}` : 'Date à confirmer',
        badgeLabel: hasEmail ? 'Prêt' : 'Email manquant',
        ctaLabel: 'Envoyer devis',
        document: quote,
        lastSentAt: sentLog?.sentAt,
        sentToday: isToday(sentLog?.sentAt, now),
        blockedReason: hasEmail ? undefined : 'Ajoutez une adresse email au devis.'
      }, communication));
      return;
    }

    if (quote.status === 'Signé' || quote.status === 'Refusé') return;
    if (!sentAt && quote.status !== 'Envoyé' && quote.status !== 'En attente') return;

    const daysSinceSent = diffDays(sentAt || quote.createdAt || quote.date, now);
    const daysSinceReminder = lastReminderAt ? diffDays(lastReminderAt, now) : Number.POSITIVE_INFINITY;
    if (!communication.quoteRemindersEnabled) return;

    const shouldExpiringReminder = expiresIn !== null && expiresIn <= communication.quoteExpirationAlertDays;
    const shouldSoftReminder = daysSinceSent >= communication.quoteFirstReminderDays && (reminderCount === 0 || daysSinceReminder >= communication.quoteReminderCooldownDays);

    if (!shouldExpiringReminder && !shouldSoftReminder) return;

    const action: CommunicationAction = shouldExpiringReminder ? 'quote_reminder_expiring' : 'quote_reminder_soft';
    const alreadySentToday = quoteLogs.some(log => log.action === action && isToday(log.sentAt, now));

    tasks.push(createTask({
      id: `${action}-${quote.id}`,
      documentType: 'devis',
      documentId: quote.id,
      dossierId: quote.dossierId,
      action,
      priority: shouldExpiringReminder ? 'high' : 'medium',
      title: shouldExpiringReminder ? 'Relancer avant expiration' : 'Relancer le devis',
      description: shouldExpiringReminder
        ? `Le devis ${quote.id} expire ${expiresIn !== null && expiresIn < 0 ? 'est expiré' : `dans ${expiresIn} jour(s)`}.`
        : `Aucune réponse détectée depuis ${daysSinceSent} jour(s).`,
      clientName: quote.clientName,
      clientEmail: quote.email,
      amount: quote.price,
      dateLabel: quote.expiresAt ? `Expire le ${formatDateFr(quote.expiresAt)}` : 'Validité à préciser',
      badgeLabel: shouldExpiringReminder ? 'Urgent' : `Relance ${reminderCount + 1}`,
      ctaLabel: 'Envoyer relance',
      document: quote,
      lastSentAt: lastReminderAt || sentAt,
      sentToday: alreadySentToday,
      blockedReason: hasEmail ? undefined : 'Ajoutez une adresse email au devis.'
    }, communication));
  });

  factures.forEach((invoice) => {
    if (invoice.status === 'Payée') return;

    const invoiceLogs = getLogsForDocument(logs, 'facture', invoice.id);
    const sentLog = getLastLog(logs, 'facture', invoice.id, ['invoice_send']);
    const reminderLog = getLastLog(logs, 'facture', invoice.id, ['invoice_reminder', 'invoice_overdue']);
    const hasEmail = Boolean(invoice.email?.trim());
    const dueIn = daysUntil(invoice.dueDate, now);

    if (!invoice.sentAt && !sentLog) {
      tasks.push(createTask({
        id: `invoice-send-${invoice.id}`,
        documentType: 'facture',
        documentId: invoice.id,
        dossierId: invoice.dossierId,
        action: 'invoice_send',
        priority: 'normal',
        title: 'Envoyer la facture',
        description: `Facture ${invoice.id} en attente d'envoi à ${invoice.clientName}.`,
        clientName: invoice.clientName,
        clientEmail: invoice.email,
        amount: invoice.amount,
        dateLabel: `Échéance ${formatDateFr(invoice.dueDate)}`,
        badgeLabel: hasEmail ? 'À envoyer' : 'Email manquant',
        ctaLabel: 'Envoyer facture',
        document: invoice,
        lastSentAt: sentLog?.sentAt,
        sentToday: isToday(sentLog?.sentAt, now),
        blockedReason: hasEmail ? undefined : 'Ajoutez une adresse email à la facture.'
      }, communication));
      return;
    }

    if (!communication.invoiceRemindersEnabled) return;

    const action: CommunicationAction = invoice.status === 'En retard' || (dueIn !== null && dueIn < 0)
      ? 'invoice_overdue'
      : 'invoice_reminder';
    const shouldRemind = action === 'invoice_overdue' || (dueIn !== null && dueIn <= communication.invoiceDueSoonDays);
    const daysSinceReminder = reminderLog?.sentAt ? diffDays(reminderLog.sentAt, now) : Number.POSITIVE_INFINITY;
    if (!shouldRemind || daysSinceReminder < communication.invoiceReminderCooldownDays) return;

    tasks.push(createTask({
      id: `${action}-${invoice.id}`,
      documentType: 'facture',
      documentId: invoice.id,
      dossierId: invoice.dossierId,
      action,
      priority: action === 'invoice_overdue' ? 'high' : 'medium',
      title: action === 'invoice_overdue' ? 'Relancer facture en retard' : 'Relancer facture à échéance',
      description: action === 'invoice_overdue'
        ? `La facture ${invoice.id} a dépassé son échéance.`
        : `La facture ${invoice.id} arrive à échéance dans ${dueIn} jour(s).`,
      clientName: invoice.clientName,
      clientEmail: invoice.email,
      amount: invoice.amount,
      dateLabel: `Échéance ${formatDateFr(invoice.dueDate)}`,
      badgeLabel: action === 'invoice_overdue' ? 'Retard' : 'À surveiller',
      ctaLabel: 'Envoyer relance',
      document: invoice,
      lastSentAt: reminderLog?.sentAt,
      sentToday: invoiceLogs.some(log => log.action === action && isToday(log.sentAt, now)),
      blockedReason: hasEmail ? undefined : 'Ajoutez une adresse email à la facture.'
    }, communication));
  });

  const priorityWeight = { high: 0, medium: 1, normal: 2 };
  return tasks.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority] || a.clientName.localeCompare(b.clientName));
}

export function buildCommunicationLog(
  task: CommunicationTask,
  status: CommunicationLogStatus,
  sentBy?: string,
  error?: string
): CommunicationLog {
  const metadata: NonNullable<CommunicationLog['metadata']> = {};
  if (task.amount !== undefined) metadata.amount = task.amount;

  if (task.documentType === 'facture') {
    const invoice = task.document as Facture;
    if (invoice.dueDate) metadata.dueDate = invoice.dueDate;
    if (invoice.status) metadata.invoiceStatus = invoice.status;
    if (invoice.reminderCount !== undefined) metadata.reminderCount = invoice.reminderCount;
  }

  if (task.documentType === 'devis') {
    const quote = task.document as Devis;
    if (quote.status) metadata.quoteStatus = quote.status;
    if (quote.reminderCount !== undefined) metadata.reminderCount = quote.reminderCount;
  }

  const log: CommunicationLog = {
    id: `COM-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    documentType: task.documentType,
    documentId: task.documentId,
    clientName: task.clientName,
    action: task.action,
    channel: 'Email',
    subject: task.subject,
    body: task.body,
    status,
    sentAt: new Date().toISOString(),
    metadata
  };

  if (task.dossierId) log.dossierId = task.dossierId;
  if (task.clientEmail) log.clientEmail = task.clientEmail;
  if (sentBy) log.sentBy = sentBy;
  if (error) log.error = error;

  return log;
}