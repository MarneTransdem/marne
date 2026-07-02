import { CONTACT } from '../constants';
import {
  DEFAULT_PREMIUM_PRICING_SETTINGS,
  normalizePremiumPricingSettings,
  type PremiumPricingSettings
} from './crm-premium';

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
  pricing: PremiumPricingSettings;
  updatedAt: string;
  updatedBy: string;
}

export const SETTINGS_STORAGE_KEY = 'marne_crm_settings_default';

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
  pricing: DEFAULT_PREMIUM_PRICING_SETTINGS,
  updatedAt: '',
  updatedBy: 'Systeme'
};

const normalizePositiveInteger = (value: unknown, fallback: number, min: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.round(parsed));
};

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