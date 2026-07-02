import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import {
  Bell,
  Building2,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Mail,
  Phone,
  RefreshCw,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSyncedCollection } from '../../hooks/useData';
import { CONTACT } from '../../constants';
import { normalizeCrmCommunicationSettings, normalizeCrmSettings, readLocalCrmSettings, writeLocalCrmSettings, type CrmCommunicationActionKey, type CrmCommunicationSettings, type CrmSettings } from '../../lib/crm-settings';
import { normalizePremiumPricingSettings, type PremiumPricingFormulaKey, type PremiumPricingFormulaSettings, type PremiumPricingSettings } from '../../lib/crm-premium';
import { COMMUNICATION_ACTION_LABELS, DEFAULT_COMMUNICATION_TEMPLATES } from '../../lib/crm-communications';
import { db } from '../../lib/firebase';
import type { NotificationTemplate, Role } from '../../types';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';
import { ADMIN_TAB_LABELS, getAccessibleTabs } from '../../lib/admin-permissions';

type PricingNumberField = Exclude<keyof PremiumPricingSettings, 'formulaMargins' | 'reserveRate' | 'minMarginRate'>;
type PricingRateField = 'reserveRate' | 'minMarginRate';
type CommunicationNumberField = Exclude<keyof CrmCommunicationSettings, 'quoteRemindersEnabled' | 'invoiceRemindersEnabled' | 'tone' | 'templates'>;

const PRICING_NUMBER_FIELDS: Array<{ field: PricingNumberField; label: string; step?: number }> = [
  { field: 'baseCost', label: 'Base dossier (EUR)', step: 10 },
  { field: 'localFallbackKm', label: 'Km local par defaut', step: 1 },
  { field: 'nationalFallbackKm', label: 'Km national par defaut', step: 10 },
  { field: 'localFixedCost', label: 'Forfait transport local', step: 10 },
  { field: 'localCostPerKm', label: 'Cout / km local', step: 0.05 },
  { field: 'longDistanceFixedCost', label: 'Forfait longue distance', step: 10 },
  { field: 'longDistanceCostPerKm', label: 'Cout / km longue distance', step: 0.05 },
  { field: 'floorCost', label: 'Cout etage sans ascenseur', step: 1 },
  { field: 'portageCostPerMeter', label: 'Portage / metre', step: 0.1 },
  { field: 'liftCost', label: 'Monte-meuble', step: 10 },
  { field: 'packingCostPerM3', label: 'Emballage / m3', step: 1 },
  { field: 'storageCost', label: 'Garde-meuble', step: 10 }
];

const PRICING_RATE_FIELDS: Array<{ field: PricingRateField; label: string }> = [
  { field: 'reserveRate', label: 'Reserve risque (%)' },
  { field: 'minMarginRate', label: 'Marge minimum (%)' }
];

const PRICING_FORMULA_FIELDS: Array<{ key: PremiumPricingFormulaKey; label: string }> = [
  { key: 'economique', label: 'Economique' },
  { key: 'standard', label: 'Standard' },
  { key: 'luxe', label: 'Luxe' },
  { key: 'dynamic', label: 'Dynamic' }
];

const COMMUNICATION_NUMBER_FIELDS: Array<{ field: CommunicationNumberField; label: string; min: number }> = [
  { field: 'quoteFirstReminderDays', label: '1re relance devis (jours)', min: 0 },
  { field: 'quoteReminderCooldownDays', label: 'Intervalle devis (jours)', min: 1 },
  { field: 'quoteExpirationAlertDays', label: 'Alerte expiration (jours)', min: 0 },
  { field: 'invoiceDueSoonDays', label: 'Facture avant échéance (jours)', min: 0 },
  { field: 'invoiceReminderCooldownDays', label: 'Intervalle facture (jours)', min: 1 }
];

const COMMUNICATION_TEMPLATE_FIELDS: CrmCommunicationActionKey[] = [
  'quote_send',
  'quote_reminder_soft',
  'quote_reminder_expiring',
  'invoice_send',
  'invoice_reminder',
  'invoice_overdue'
];

const COMMUNICATION_TONE_OPTIONS: Array<{ value: CrmCommunicationSettings['tone']; label: string }> = [
  { value: 'balanced', label: 'Équilibré' },
  { value: 'soft', label: 'Doux' },
  { value: 'firm', label: 'Ferme' }
];

const CRM_ROLES: Role[] = ['gérant', 'secrétaire', 'commercial', 'chef_equipe'];
const roleLabel = (role: Role) => {
  if (role === 'chef_equipe') return 'Chef équipe';
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const asPositiveNumber = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const percentToRate = (value: string, fallbackRate: number) => {
  const parsed = asPositiveNumber(value, Math.round(fallbackRate * 100));
  return Math.max(0, Math.min(90, parsed)) / 100;
};

const rateToPercent = (value: number) => Math.round((Number.isFinite(value) ? value : 0) * 100);

const formatDateTime = (value?: string) => {
  if (!value) return 'Jamais';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};

export function AdminParametres() {
  const { user, role } = useAuth();
  const context = useOutletContext<AdminOutletContextType>();
  const canEdit = role === 'gérant';
  const [templates] = useSyncedCollection<NotificationTemplate>('notification_templates');
  const [cloudStatus, setCloudStatus] = useState<'sync' | 'local' | 'saving'>('local');
  const [saving, setSaving] = useState(false);
  const [currentSettings, setCurrentSettings] = useState<CrmSettings>(() => readLocalCrmSettings());
  const [form, setForm] = useState<CrmSettings>(() => readLocalCrmSettings());
  const [selectedTemplateAction, setSelectedTemplateAction] = useState<CrmCommunicationActionKey>('quote_reminder_soft');

  useEffect(() => {
    const settingsRef = doc(db, 'crm_settings', 'default');
    const unsubscribe = onSnapshot(
      settingsRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setCloudStatus('local');
          return;
        }
        const nextSettings = normalizeCrmSettings(snapshot.data() as Partial<CrmSettings>);
        setCurrentSettings(nextSettings);
        setForm(nextSettings);
        writeLocalCrmSettings(nextSettings);
        setCloudStatus('sync');
      },
      (error) => {
        console.warn('Paramètres CRM en mode local:', error);
        setCloudStatus('local');
      }
    );

    return () => unsubscribe();
  }, []);

  const templateStats = useMemo(() => {
    return templates.reduce<Record<string, number>>((acc, template) => {
      acc[template.channel] = (acc[template.channel] || 0) + 1;
      return acc;
    }, {});
  }, [templates]);


  const setPricingNumberField = (field: PricingNumberField, value: string) => {
    setForm(prev => ({
      ...prev,
      pricing: normalizePremiumPricingSettings({
        ...prev.pricing,
        [field]: asPositiveNumber(value, prev.pricing[field])
      })
    }));
  };

  const setPricingRateField = (field: PricingRateField, value: string) => {
    setForm(prev => ({
      ...prev,
      pricing: normalizePremiumPricingSettings({
        ...prev.pricing,
        [field]: percentToRate(value, prev.pricing[field])
      })
    }));
  };

  const setFormulaPricingField = (
    formula: PremiumPricingFormulaKey,
    field: keyof PremiumPricingFormulaSettings,
    value: string
  ) => {
    setForm(prev => {
      const currentFormula = prev.pricing.formulaMargins[formula];
      const nextValue = field === 'targetMargin'
        ? percentToRate(value, currentFormula.targetMargin)
        : asPositiveNumber(value, currentFormula.variableCost);

      return {
        ...prev,
        pricing: normalizePremiumPricingSettings({
          ...prev.pricing,
          formulaMargins: {
            ...prev.pricing.formulaMargins,
            [formula]: {
              ...currentFormula,
              [field]: nextValue
            }
          }
        })
      };
    });
  };

  const setCommunicationNumberField = (field: CommunicationNumberField, value: string) => {
    setForm(prev => ({
      ...prev,
      communication: normalizeCrmCommunicationSettings({
        ...prev.communication,
        [field]: Math.max(COMMUNICATION_NUMBER_FIELDS.find(item => item.field === field)?.min || 0, Math.round(asPositiveNumber(value, prev.communication[field])))
      })
    }));
  };

  const setCommunicationToggle = (field: 'quoteRemindersEnabled' | 'invoiceRemindersEnabled', value: boolean) => {
    setForm(prev => ({
      ...prev,
      communication: normalizeCrmCommunicationSettings({
        ...prev.communication,
        [field]: value
      })
    }));
  };

  const setCommunicationTone = (value: CrmCommunicationSettings['tone']) => {
    setForm(prev => ({
      ...prev,
      communication: normalizeCrmCommunicationSettings({
        ...prev.communication,
        tone: value
      })
    }));
  };

  const setCommunicationTemplateField = (field: 'subject' | 'body', value: string) => {
    setForm(prev => ({
      ...prev,
      communication: normalizeCrmCommunicationSettings({
        ...prev.communication,
        templates: {
          ...prev.communication.templates,
          [selectedTemplateAction]: {
            subject: prev.communication.templates[selectedTemplateAction]?.subject || DEFAULT_COMMUNICATION_TEMPLATES[selectedTemplateAction].subject,
            body: prev.communication.templates[selectedTemplateAction]?.body || DEFAULT_COMMUNICATION_TEMPLATES[selectedTemplateAction].body,
            [field]: value
          }
        }
      })
    }));
  };

  const selectedTemplate = {
    subject: form.communication.templates[selectedTemplateAction]?.subject || DEFAULT_COMMUNICATION_TEMPLATES[selectedTemplateAction].subject,
    body: form.communication.templates[selectedTemplateAction]?.body || DEFAULT_COMMUNICATION_TEMPLATES[selectedTemplateAction].body
  };
  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canEdit) {
      context?.pushNotification('Paramètres verrouillés', 'Seul le gérant peut modifier les réglages globaux.', 'warning');
      return;
    }

    const nextSettings: CrmSettings = {
      ...form,
      id: 'default',
      companyName: form.companyName.trim() || CONTACT.name,
      contactEmail: form.contactEmail.trim() || CONTACT.email,
      phone: form.phone.trim() || CONTACT.phone,
      address: form.address.trim() || CONTACT.fullAddress,
      quoteValidityDays: Math.max(1, Math.round(form.quoteValidityDays)),
      invoicePaymentDelayDays: Math.max(0, Math.round(form.invoicePaymentDelayDays)),
      visitDurationMinutes: Math.max(15, Math.round(form.visitDurationMinutes)),
      planningReminderHours: Math.max(1, Math.round(form.planningReminderHours)),
      communication: normalizeCrmCommunicationSettings(form.communication),
      pricing: normalizePremiumPricingSettings(form.pricing),
      updatedAt: new Date().toISOString(),
      updatedBy: user?.email || 'CRM'
    };

    setSaving(true);
    setCloudStatus('saving');
    setCurrentSettings(nextSettings);
    setForm(nextSettings);
    writeLocalCrmSettings(nextSettings);

    try {
      await setDoc(doc(db, 'crm_settings', 'default'), nextSettings, { merge: true });
      setCloudStatus('sync');
      context?.pushNotification('Paramètres enregistrés', 'Les réglages CRM ont été sauvegardés dans le cloud.', 'success');
    } catch (error) {
      console.warn('Sauvegarde cloud des paramètres indisponible:', error);
      setCloudStatus('local');
      context?.pushNotification('Paramètres enregistrés localement', 'Le cloud acceptera ces réglages dès que les règles Firestore seront déployées.', 'warning');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent">
              <Settings size={14} /> Centre de configuration
            </div>
            <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-brand-950 dark:text-white">Paramètres CRM</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl">Réglages société, délais opérationnels, accès et état de synchronisation du backoffice.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-[10px] uppercase font-black text-slate-400">Mode</p>
              <p className="mt-1 text-sm font-black">{canEdit ? 'Édition' : 'Lecture'}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-[10px] uppercase font-black text-slate-400">Sync</p>
              <p className="mt-1 text-sm font-black">{cloudStatus === 'sync' ? 'Cloud' : cloudStatus === 'saving' ? 'Envoi' : 'Local'}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-[10px] uppercase font-black text-slate-400">Modèles</p>
              <p className="mt-1 text-sm font-black">{templates.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
              <p className="text-[10px] uppercase font-black text-slate-400">Maj</p>
              <p className="mt-1 text-xs font-black truncate">{formatDateTime(currentSettings.updatedAt)}</p>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSave} className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Building2 size={17} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-tight">Coordonnées société</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nom société</span>
                <input value={form.companyName} onChange={(e) => setForm(prev => ({ ...prev, companyName: e.target.value }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email principal</span>
                <input value={form.contactEmail} onChange={(e) => setForm(prev => ({ ...prev, contactEmail: e.target.value }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Téléphone</span>
                <input value={form.phone} onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Adresse</span>
                <input value={form.address} onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal size={17} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-tight">Délais opérationnels</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Validité devis (jours)</span>
                <input type="number" min={1} value={form.quoteValidityDays} onChange={(e) => setForm(prev => ({ ...prev, quoteValidityDays: asPositiveNumber(e.target.value, prev.quoteValidityDays) }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Délai règlement (jours)</span>
                <input type="number" min={0} value={form.invoicePaymentDelayDays} onChange={(e) => setForm(prev => ({ ...prev, invoicePaymentDelayDays: asPositiveNumber(e.target.value, prev.invoicePaymentDelayDays) }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Durée visite (min)</span>
                <input type="number" min={15} step={5} value={form.visitDurationMinutes} onChange={(e) => setForm(prev => ({ ...prev, visitDurationMinutes: asPositiveNumber(e.target.value, prev.visitDurationMinutes) }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Rappel planning (heures)</span>
                <input type="number" min={1} value={form.planningReminderHours} onChange={(e) => setForm(prev => ({ ...prev, planningReminderHours: asPositiveNumber(e.target.value, prev.planningReminderHours) }))} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
              </label>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">Dernière mise à jour par {currentSettings.updatedBy || 'Système'}.</p>
              <button type="submit" disabled={!canEdit || saving} className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:text-brand-950 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl px-5 py-3 text-xs font-black transition-colors">
                {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                Enregistrer
              </button>
            </div>

          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Mail size={17} className="text-accent" />
                <h3 className="text-sm font-black uppercase tracking-tight">Relances intelligentes</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Ton {COMMUNICATION_TONE_OPTIONS.find(option => option.value === form.communication.tone)?.label}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4">
                <span className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">Relances devis</span>
                <input type="checkbox" checked={form.communication.quoteRemindersEnabled} onChange={(e) => setCommunicationToggle('quoteRemindersEnabled', e.target.checked)} disabled={!canEdit || saving} className="h-5 w-5 accent-brand-900" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4">
                <span className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">Relances factures</span>
                <input type="checkbox" checked={form.communication.invoiceRemindersEnabled} onChange={(e) => setCommunicationToggle('invoiceRemindersEnabled', e.target.checked)} disabled={!canEdit || saving} className="h-5 w-5 accent-brand-900" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {COMMUNICATION_NUMBER_FIELDS.map(({ field, label, min }) => (
                <label key={field} className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
                  <input type="number" min={min} value={form.communication[field]} onChange={(e) => setCommunicationNumberField(field, e.target.value)} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
                </label>
              ))}
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Ton des relances</span>
                <select value={form.communication.tone} onChange={(e) => setCommunicationTone(e.target.value as CrmCommunicationSettings['tone'])} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70">
                  {COMMUNICATION_TONE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4">
              <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-4">
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
                  {COMMUNICATION_TEMPLATE_FIELDS.map(action => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => setSelectedTemplateAction(action)}
                      className={`h-10 px-3 rounded-2xl border text-[10px] font-black uppercase whitespace-nowrap text-left transition-colors ${selectedTemplateAction === action ? 'bg-brand-900 text-white border-brand-900 dark:bg-accent dark:text-brand-950 dark:border-accent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      {COMMUNICATION_ACTION_LABELS[action]}
                    </button>
                  ))}
                </div>
                <div className="space-y-3 min-w-0">
                  <label className="space-y-1.5 block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Objet</span>
                    <input value={selectedTemplate.subject} onChange={(e) => setCommunicationTemplateField('subject', e.target.value)} disabled={!canEdit || saving} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
                  </label>
                  <label className="space-y-1.5 block">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Message</span>
                    <textarea value={selectedTemplate.body} onChange={(e) => setCommunicationTemplateField('body', e.target.value)} disabled={!canEdit || saving} rows={8} className="w-full resize-y bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-semibold leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button type="submit" disabled={!canEdit || saving} className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:text-brand-950 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl px-5 py-3 text-xs font-black transition-colors">
                {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                Enregistrer les relances
              </button>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={17} className="text-accent" />
                <h3 className="text-sm font-black uppercase tracking-tight">Rentabilite & prix conseilles</h3>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Marge standard {rateToPercent(form.pricing.formulaMargins.standard.targetMargin)}%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRICING_RATE_FIELDS.map(({ field, label }) => (
                <label key={field} className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
                  <input type="number" min={0} max={90} value={rateToPercent(form.pricing[field])} onChange={(e) => setPricingRateField(field, e.target.value)} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
                </label>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {PRICING_NUMBER_FIELDS.map(({ field, label, step }) => (
                <label key={field} className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
                  <input type="number" min={0} step={step || 1} value={form.pricing[field]} onChange={(e) => setPricingNumberField(field, e.target.value)} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
                </label>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4">
              <h4 className="text-xs font-black uppercase tracking-tight mb-4 text-slate-600 dark:text-slate-300">Formules commerciales</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PRICING_FORMULA_FIELDS.map(({ key, label }) => (
                  <div key={key} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                    <p className="text-xs font-black uppercase text-slate-700 dark:text-slate-200 mb-3">{label}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Cout / m3</span>
                        <input type="number" min={0} step={1} value={form.pricing.formulaMargins[key].variableCost} onChange={(e) => setFormulaPricingField(key, 'variableCost', e.target.value)} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
                      </label>
                      <label className="space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Marge %</span>
                        <input type="number" min={5} max={85} value={rateToPercent(form.pricing.formulaMargins[key].targetMargin)} onChange={(e) => setFormulaPricingField(key, 'targetMargin', e.target.value)} disabled={!canEdit || saving} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-70" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button type="submit" disabled={!canEdit || saving} className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:text-brand-950 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl px-5 py-3 text-xs font-black transition-colors">
                {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                Enregistrer les regles
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={17} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-tight">Droits par rôle</h3>
            </div>
            <div className="space-y-3">
              {CRM_ROLES.map((item) => {
                const accessibleTabs = getAccessibleTabs(item);
                return (
                  <div key={item} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/70 dark:bg-slate-950/40">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-accent" />
                        <span className="text-xs font-black uppercase">{roleLabel(item)}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase">{accessibleTabs.length} modules</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {accessibleTabs.map(tab => (
                        <span key={tab} className="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9px] font-bold text-slate-500 dark:text-slate-300">
                          {ADMIN_TAB_LABELS[tab].mobile}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Bell size={17} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-tight">Modèles de notification</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {['Email', 'SMS', 'Both'].map(channel => (
                <div key={channel} className="rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-3 text-center">
                  <p className="text-[10px] uppercase font-black text-slate-400">{channel}</p>
                  <p className="mt-1 text-lg font-black">{templateStats[channel] || 0}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {templates.slice(0, 6).map(template => (
                <div key={template.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 text-xs">
                  <div className="min-w-0">
                    <p className="font-black truncate">{template.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{template.channel}</p>
                  </div>
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                </div>
              ))}
              {templates.length === 0 && (
                <p className="text-center text-xs text-slate-400 py-6">Aucun modèle chargé.</p>
              )}
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <LockKeyhole size={17} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-tight">État système</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-slate-500"><Mail size={13} /> Email CRM</span>
                <span className="font-black truncate max-w-40">{user?.email || 'Non connecté'}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-slate-500"><Clock3 size={13} /> Synchronisation</span>
                <span className="font-black">{context?.isSyncing ? 'En cours' : 'Stable'}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-slate-500"><Phone size={13} /> Standard</span>
                <span className="font-black">{form.phone}</span>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </div>
  );
}

export default AdminParametres;