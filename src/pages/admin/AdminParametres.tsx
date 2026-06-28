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
import { db } from '../../lib/firebase';
import type { NotificationTemplate, Role } from '../../types';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';
import { ADMIN_TAB_LABELS, getAccessibleTabs } from '../../lib/admin-permissions';

type CrmSettings = {
  id: string;
  companyName: string;
  contactEmail: string;
  phone: string;
  address: string;
  quoteValidityDays: number;
  invoicePaymentDelayDays: number;
  visitDurationMinutes: number;
  planningReminderHours: number;
  updatedAt: string;
  updatedBy: string;
};

const SETTINGS_STORAGE_KEY = 'marne_crm_settings_default';

const DEFAULT_SETTINGS: CrmSettings = {
  id: 'default',
  companyName: CONTACT.name,
  contactEmail: CONTACT.email,
  phone: CONTACT.phone,
  address: CONTACT.fullAddress,
  quoteValidityDays: 15,
  invoicePaymentDelayDays: 7,
  visitDurationMinutes: 45,
  planningReminderHours: 24,
  updatedAt: '',
  updatedBy: 'Système'
};

const CRM_ROLES: Role[] = ['gérant', 'secrétaire', 'commercial', 'chef_equipe'];

const readLocalSettings = (): CrmSettings => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw), id: 'default' };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const writeLocalSettings = (settings: CrmSettings) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

const roleLabel = (role: Role) => {
  if (role === 'chef_equipe') return 'Chef équipe';
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const asPositiveNumber = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

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
  const [currentSettings, setCurrentSettings] = useState<CrmSettings>(() => readLocalSettings());
  const [form, setForm] = useState<CrmSettings>(() => readLocalSettings());

  useEffect(() => {
    const settingsRef = doc(db, 'crm_settings', 'default');
    const unsubscribe = onSnapshot(
      settingsRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setCloudStatus('local');
          return;
        }
        const nextSettings = { ...DEFAULT_SETTINGS, ...snapshot.data(), id: 'default' } as CrmSettings;
        setCurrentSettings(nextSettings);
        setForm(nextSettings);
        writeLocalSettings(nextSettings);
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
      updatedAt: new Date().toISOString(),
      updatedBy: user?.email || 'CRM'
    };

    setSaving(true);
    setCloudStatus('saving');
    setCurrentSettings(nextSettings);
    setForm(nextSettings);
    writeLocalSettings(nextSettings);

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