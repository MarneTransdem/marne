import { CONTACT } from '../constants';
import {
  DEFAULT_PREMIUM_PRICING_SETTINGS,
  normalizePremiumPricingSettings,
  type PremiumPricingSettings
} from './crm-premium';

export type CrmCommunicationTone = 'soft' | 'balanced' | 'firm';

export type CrmCommunicationActionKey =
  | 'quote_send'
  | 'quote_reminder_soft'
  | 'quote_reminder_expiring'
  | 'invoice_send'
  | 'invoice_reminder'
  | 'invoice_overdue';

export interface CrmCommunicationTemplateSettings {
  subject: string;
  body: string;
}

export interface CrmCommunicationSettings {
  quoteRemindersEnabled: boolean;
  invoiceRemindersEnabled: boolean;
  quoteFirstReminderDays: number;
  quoteReminderCooldownDays: number;
  quoteExpirationAlertDays: number;
  invoiceDueSoonDays: number;
  invoiceReminderCooldownDays: number;
  tone: CrmCommunicationTone;
  templates: Partial<Record<CrmCommunicationActionKey, CrmCommunicationTemplateSettings>>;
}

export interface CrmSettings {
  id: string;
  companyName: string;
  contactEmail: string;
  phone: string;
  address: string;
  quoteValidityDays: number;
  invoicePaymentDelayDays: number;
  visitDurationMinutes: number;
  planningReminderHours: number;
  communication: CrmCommunicationSettings;
  pricing: PremiumPricingSettings;
  updatedAt: string;
  updatedBy: string;
}

export const SETTINGS_STORAGE_KEY = 'marne_crm_settings_default';

export const DEFAULT_CRM_COMMUNICATION_SETTINGS: CrmCommunicationSettings = {
  quoteRemindersEnabled: true,
  invoiceRemindersEnabled: true,
  quoteFirstReminderDays: 2,
  quoteReminderCooldownDays: 3,
  quoteExpirationAlertDays: 5,
  invoiceDueSoonDays: 3,
  invoiceReminderCooldownDays: 3,
  tone: 'balanced',
  templates: {}
};

export const DEFAULT_CRM_SETTINGS: CrmSettings = {
  id: 'default',
  companyName: CONTACT.name,
  contactEmail: CONTACT.email,
  phone: CONTACT.phone,
  address: CONTACT.fullAddress,
  quoteValidityDays: 15,
  invoicePaymentDelayDays: 7,
  visitDurationMinutes: 45,
  planningReminderHours: 24,
  communication: DEFAULT_CRM_COMMUNICATION_SETTINGS,
  pricing: DEFAULT_PREMIUM_PRICING_SETTINGS,
  updatedAt: '',
  updatedBy: 'Systeme'
};

const COMMUNICATION_TEMPLATE_KEYS: CrmCommunicationActionKey[] = [
  'quote_send',
  'quote_reminder_soft',
  'quote_reminder_expiring',
  'invoice_send',
  'invoice_reminder',
  'invoice_overdue'
];

const normalizePositiveInteger = (value: unknown, fallback: number, min: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.round(parsed));
};

const normalizeBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
};

const normalizeTone = (value: unknown): CrmCommunicationTone => {
  if (value === 'soft' || value === 'balanced' || value === 'firm') return value;
  return DEFAULT_CRM_COMMUNICATION_SETTINGS.tone;
};

const normalizeCommunicationTemplates = (value: unknown): CrmCommunicationSettings['templates'] => {
  if (!value || typeof value !== 'object') return {};
  const source = value as Partial<Record<CrmCommunicationActionKey, Partial<CrmCommunicationTemplateSettings>>>;
  return COMMUNICATION_TEMPLATE_KEYS.reduce<CrmCommunicationSettings['templates']>((acc, key) => {
    const template = source[key];
    if (!template || typeof template !== 'object') return acc;
    const subject = String(template.subject || '').trim();
    const body = String(template.body || '').trim();
    if (subject || body) acc[key] = { subject, body };
    return acc;
  }, {});
};

export function normalizeCrmCommunicationSettings(data?: Partial<CrmCommunicationSettings> | null): CrmCommunicationSettings {
  const source = data || {};
  return {
    ...DEFAULT_CRM_COMMUNICATION_SETTINGS,
    ...source,
    quoteRemindersEnabled: normalizeBoolean(source.quoteRemindersEnabled, DEFAULT_CRM_COMMUNICATION_SETTINGS.quoteRemindersEnabled),
    invoiceRemindersEnabled: normalizeBoolean(source.invoiceRemindersEnabled, DEFAULT_CRM_COMMUNICATION_SETTINGS.invoiceRemindersEnabled),
    quoteFirstReminderDays: normalizePositiveInteger(source.quoteFirstReminderDays, DEFAULT_CRM_COMMUNICATION_SETTINGS.quoteFirstReminderDays, 0),
    quoteReminderCooldownDays: normalizePositiveInteger(source.quoteReminderCooldownDays, DEFAULT_CRM_COMMUNICATION_SETTINGS.quoteReminderCooldownDays, 1),
    quoteExpirationAlertDays: normalizePositiveInteger(source.quoteExpirationAlertDays, DEFAULT_CRM_COMMUNICATION_SETTINGS.quoteExpirationAlertDays, 0),
    invoiceDueSoonDays: normalizePositiveInteger(source.invoiceDueSoonDays, DEFAULT_CRM_COMMUNICATION_SETTINGS.invoiceDueSoonDays, 0),
    invoiceReminderCooldownDays: normalizePositiveInteger(source.invoiceReminderCooldownDays, DEFAULT_CRM_COMMUNICATION_SETTINGS.invoiceReminderCooldownDays, 1),
    tone: normalizeTone(source.tone),
    templates: normalizeCommunicationTemplates(source.templates)
  };
}

export function normalizeCrmSettings(data?: Partial<CrmSettings> | null): CrmSettings {
  const source = data || {};
  return {
    ...DEFAULT_CRM_SETTINGS,
    ...source,
    id: 'default',
    companyName: String(source.companyName || DEFAULT_CRM_SETTINGS.companyName),
    contactEmail: String(source.contactEmail || DEFAULT_CRM_SETTINGS.contactEmail),
    phone: String(source.phone || DEFAULT_CRM_SETTINGS.phone),
    address: String(source.address || DEFAULT_CRM_SETTINGS.address),
    quoteValidityDays: normalizePositiveInteger(source.quoteValidityDays, DEFAULT_CRM_SETTINGS.quoteValidityDays, 1),
    invoicePaymentDelayDays: normalizePositiveInteger(source.invoicePaymentDelayDays, DEFAULT_CRM_SETTINGS.invoicePaymentDelayDays, 0),
    visitDurationMinutes: normalizePositiveInteger(source.visitDurationMinutes, DEFAULT_CRM_SETTINGS.visitDurationMinutes, 15),
    planningReminderHours: normalizePositiveInteger(source.planningReminderHours, DEFAULT_CRM_SETTINGS.planningReminderHours, 1),
    communication: normalizeCrmCommunicationSettings(source.communication),
    pricing: normalizePremiumPricingSettings(source.pricing),
    updatedAt: String(source.updatedAt || ''),
    updatedBy: String(source.updatedBy || DEFAULT_CRM_SETTINGS.updatedBy)
  };
}

export const readLocalCrmSettings = (): CrmSettings => {
  if (typeof window === 'undefined') return DEFAULT_CRM_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_CRM_SETTINGS;
    return normalizeCrmSettings(JSON.parse(raw));
  } catch {
    return DEFAULT_CRM_SETTINGS;
  }
};

export const writeLocalCrmSettings = (settings: CrmSettings) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalizeCrmSettings(settings)));
};