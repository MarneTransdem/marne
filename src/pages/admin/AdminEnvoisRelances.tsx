import React, { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  RefreshCw,
  Search,
  Send,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSyncedCollection } from '../../hooks/useData';
import { adminFetch } from '../../lib/admin-api';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';
import type { Devis, Facture } from '../../types';
import {
  COMMUNICATION_ACTION_LABELS,
  buildCommunicationLog,
  buildCommunicationTasks,
  formatCurrency,
  formatDateFr,
  type CommunicationAction,
  type CommunicationLog,
  type CommunicationTask
} from '../../lib/crm-communications';

const FILTERS: Array<{ id: 'all' | 'devis' | 'facture' | 'urgent' | 'history'; label: string }> = [
  { id: 'all', label: 'Tout' },
  { id: 'devis', label: 'Devis' },
  { id: 'facture', label: 'Factures' },
  { id: 'urgent', label: 'Urgent' },
  { id: 'history', label: 'Historique' }
];

const getPriorityClasses = (priority: CommunicationTask['priority']) => {
  if (priority === 'high') return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/25 dark:text-red-300 dark:border-red-900/40';
  if (priority === 'medium') return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/25 dark:text-amber-300 dark:border-amber-900/40';
  return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
};

const getActionTone = (action: CommunicationAction) => {
  if (action === 'invoice_overdue' || action === 'quote_reminder_expiring') return 'text-red-700 bg-red-50 border-red-100 dark:text-red-300 dark:bg-red-950/25 dark:border-red-900/30';
  if (action.includes('reminder')) return 'text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-300 dark:bg-amber-950/25 dark:border-amber-900/30';
  return 'text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-300 dark:bg-emerald-950/25 dark:border-emerald-900/30';
};

const isQuoteTask = (task: CommunicationTask): task is CommunicationTask & { document: Devis } => task.documentType === 'devis';
const isInvoiceTask = (task: CommunicationTask): task is CommunicationTask & { document: Facture } => task.documentType === 'facture';

export function AdminEnvoisRelances() {
  const { user } = useAuth();
  const context = useOutletContext<AdminOutletContextType>();
  const navigate = useNavigate();
  const [devisList, setDevisList] = useSyncedCollection<Devis>('devis');
  const [factures, setFactures] = useSyncedCollection<Facture>('factures');
  const [logs, setLogs] = useSyncedCollection<CommunicationLog>('communication_logs');
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]['id']>('all');
  const [query, setQuery] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [sendingTaskId, setSendingTaskId] = useState<string | null>(null);

  const tasks = useMemo(() => buildCommunicationTasks(devisList, factures, logs), [devisList, factures, logs]);
  const visibleTasks = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return tasks.filter((task) => {
      if (activeFilter === 'history') return false;
      if (activeFilter === 'devis' && task.documentType !== 'devis') return false;
      if (activeFilter === 'facture' && task.documentType !== 'facture') return false;
      if (activeFilter === 'urgent' && task.priority !== 'high') return false;
      if (!cleanQuery) return true;
      return [task.clientName, task.clientEmail, task.documentId, task.title, task.description]
        .filter(Boolean)
        .some(value => String(value).toLowerCase().includes(cleanQuery));
    });
  }, [activeFilter, query, tasks]);

  const selectedTask = useMemo(() => {
    return visibleTasks.find(task => task.id === selectedTaskId) || visibleTasks[0] || null;
  }, [selectedTaskId, visibleTasks]);

  const sentToday = logs.filter(log => log.status === 'sent' && log.sentAt.startsWith(new Date().toISOString().split('T')[0])).length;
  const urgentCount = tasks.filter(task => task.priority === 'high').length;
  const quoteCount = tasks.filter(task => task.documentType === 'devis').length;
  const invoiceCount = tasks.filter(task => task.documentType === 'facture').length;

  const registerLog = async (task: CommunicationTask, status: CommunicationLog['status'], error?: string) => {
    const log = buildCommunicationLog(task, status, user?.email || user?.displayName || 'CRM', error);
    await setLogs(prev => [log, ...prev]);
    return log;
  };

  const updateQuoteAfterSend = async (task: CommunicationTask) => {
    if (!isQuoteTask(task)) return;
    const now = new Date().toISOString();
    const isReminder = task.action !== 'quote_send';

    await setDevisList(prev => prev.map(quote => {
      if (quote.id !== task.documentId) return quote;
      const nextQuote: Devis = {
        ...quote,
        status: isReminder ? 'En attente' : 'Envoyé',
        sentAt: quote.sentAt || now
      };

      if (isReminder) {
        nextQuote.lastReminderAt = now;
        nextQuote.reminderCount = (quote.reminderCount || 0) + 1;
      }

      return nextQuote;
    }));
  };

  const updateInvoiceAfterSend = async (task: CommunicationTask) => {
    if (!isInvoiceTask(task)) return;
    const now = new Date().toISOString();
    const isReminder = task.action !== 'invoice_send';

    await setFactures(prev => prev.map(invoice => {
      if (invoice.id !== task.documentId) return invoice;
      const nextInvoice: Facture = {
        ...invoice,
        sentAt: invoice.sentAt || now,
        status: task.action === 'invoice_overdue' ? 'En retard' : invoice.status
      };

      if (isReminder) {
        nextInvoice.lastReminderAt = now;
        nextInvoice.reminderCount = (invoice.reminderCount || 0) + 1;
      }

      return nextInvoice;
    }));
  };

  const sendTask = async (task: CommunicationTask) => {
    if (task.blockedReason) {
      context?.pushNotification('Envoi impossible', task.blockedReason, 'warning');
      return;
    }

    if (task.sentToday) {
      context?.pushNotification('Déjà traité aujourd’hui', 'Cette relance a déjà été envoyée aujourd’hui.', 'warning');
      return;
    }

    setSendingTaskId(task.id);
    try {
      if (task.documentType === 'devis') {
        if (task.action === 'quote_send') {
          const quote = task.document as Devis;
          const response = await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'admin-doc',
              documentType: 'devis',
              data: {
                id: quote.id,
                clientName: quote.clientName,
                clientEmail: task.clientEmail,
                pdfName: `Devis_${quote.id}.pdf`,
                docData: quote
              }
            })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok || !result.success) throw new Error(result.error || result.details || 'Envoi du devis impossible.');
        } else {
          const response = await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'quote-reminder',
              data: {
                quote: task.document,
                reminderStage: task.action
              }
            })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok || !result.success) throw new Error(result.error || result.details || 'Relance du devis impossible.');
        }
        await updateQuoteAfterSend(task);
      } else {
        const invoice = task.document as Facture;
        if (task.action === 'invoice_send') {
          const response = await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'admin-doc',
              documentType: 'facture',
              data: {
                id: invoice.id,
                clientName: invoice.clientName,
                clientEmail: task.clientEmail,
                pdfName: `Facture_${invoice.id}.pdf`,
                docData: invoice
              }
            })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok || !result.success) throw new Error(result.error || result.details || 'Envoi de la facture impossible.');
        } else {
          const response = await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'invoice-reminder',
              data: { invoice }
            })
          });
          const result = await response.json().catch(() => ({}));
          if (!response.ok || !result.success) throw new Error(result.error || result.details || 'Relance de facture impossible.');
        }
        await updateInvoiceAfterSend(task);
      }

      await registerLog(task, 'sent');
      context?.pushNotification('Email envoyé', `${COMMUNICATION_ACTION_LABELS[task.action]} envoyé à ${task.clientName}.`, 'success');
    } catch (error: any) {
      const message = error?.message || 'Envoi impossible.';
      await registerLog(task, 'failed', message).catch(() => undefined);
      context?.pushNotification('Échec de l’envoi', message, 'warning');
    } finally {
      setSendingTaskId(null);
    }
  };

  const openDocument = (task: CommunicationTask) => {
    navigate(task.documentType === 'devis' ? '/admin/devis' : '/admin/factures');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 dark:text-slate-100">
      <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-2xl bg-brand-900 text-white dark:bg-accent dark:text-brand-950 flex items-center justify-center shrink-0">
              <Send size={19} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Centre opérationnel</p>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">Envois & Relances</h2>
              <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-3xl">
                File unique pour envoyer les devis, transmettre les factures et relancer les clients au bon moment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-w-full xl:min-w-[560px]">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/80 dark:bg-slate-950/40">
              <p className="text-[10px] font-black uppercase text-slate-400">À traiter</p>
              <p className="mt-1 text-xl font-black">{tasks.length}</p>
            </div>
            <div className="rounded-2xl border border-red-100 dark:border-red-900/40 p-3 bg-red-50/70 dark:bg-red-950/20">
              <p className="text-[10px] font-black uppercase text-red-500">Urgents</p>
              <p className="mt-1 text-xl font-black text-red-700 dark:text-red-300">{urgentCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/80 dark:bg-slate-950/40">
              <p className="text-[10px] font-black uppercase text-slate-400">Devis</p>
              <p className="mt-1 text-xl font-black">{quoteCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/80 dark:bg-slate-950/40">
              <p className="text-[10px] font-black uppercase text-slate-400">Envoyés jour</p>
              <p className="mt-1 text-xl font-black">{sentToday}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-6 items-start">
        <section className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {FILTERS.map(filter => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`h-10 px-4 rounded-2xl border text-xs font-black transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-brand-900 text-white border-brand-900 dark:bg-accent dark:text-brand-950 dark:border-accent'
                        : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {filter.label}
                    {filter.id === 'devis' ? ` (${quoteCount})` : filter.id === 'facture' ? ` (${invoiceCount})` : filter.id === 'urgent' ? ` (${urgentCount})` : ''}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full h-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-9 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="Client, email, référence..."
                />
              </div>
            </div>
          </div>

          {activeFilter === 'history' ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                <h3 className="text-sm font-black uppercase tracking-tight">Historique des envois</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {logs.slice(0, 30).map(log => (
                  <div key={log.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${getActionTone(log.action)}`}>
                          {COMMUNICATION_ACTION_LABELS[log.action]}
                        </span>
                        <span className="font-black truncate">{log.clientName}</span>
                        <span className="font-mono text-[10px] text-slate-400">{log.documentId}</span>
                      </div>
                      <p className="mt-1 text-slate-500 dark:text-slate-400 truncate">{log.subject}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-black ${log.status === 'sent' ? 'text-emerald-600' : 'text-red-600'}`}>{log.status === 'sent' ? 'Envoyé' : 'Échec'}</p>
                      <p className="text-[10px] text-slate-400">{formatDateFr(log.sentAt)}</p>
                    </div>
                  </div>
                ))}
                {logs.length === 0 && (
                  <div className="p-10 text-center text-sm font-semibold text-slate-400">Aucun envoi enregistré pour le moment.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleTasks.map(task => {
                const isSelected = selectedTask?.id === task.id;
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`w-full text-left rounded-3xl border p-4 transition-all ${
                      isSelected
                        ? 'border-accent bg-amber-50/50 dark:bg-amber-950/10 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-accent/60'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${getPriorityClasses(task.priority)}`}>
                            {task.badgeLabel}
                          </span>
                          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${getActionTone(task.action)}`}>
                            {COMMUNICATION_ACTION_LABELS[task.action]}
                          </span>
                          {task.sentToday && (
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
                              Fait aujourd’hui
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-black text-slate-950 dark:text-white truncate">{task.title}</h3>
                        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{task.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500">
                          <span>{task.clientName}</span>
                          <span className="font-mono">{task.documentId}</span>
                          <span>{task.dateLabel}</span>
                          <span>{formatCurrency(task.amount)}</span>
                        </div>
                      </div>
                      <div className="flex md:flex-col items-stretch gap-2 shrink-0 md:w-40">
                        <button
                          type="button"
                          onClick={(event) => { event.stopPropagation(); sendTask(task); }}
                          disabled={sendingTaskId !== null || Boolean(task.blockedReason) || task.sentToday}
                          className="h-10 flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-900 text-white dark:bg-accent dark:text-brand-950 px-3 text-[11px] font-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {sendingTaskId === task.id ? <RefreshCw size={14} className="animate-spin" /> : <Mail size={14} />}
                          {sendingTaskId === task.id ? 'Envoi...' : task.ctaLabel}
                        </button>
                        <button
                          type="button"
                          onClick={(event) => { event.stopPropagation(); openDocument(task); }}
                          className="h-10 w-10 md:w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 hover:text-slate-900 dark:hover:text-white text-[11px] font-black"
                          title="Ouvrir le module source"
                        >
                          <ExternalLink size={14} />
                          <span className="hidden md:inline">Ouvrir</span>
                        </button>
                      </div>
                    </div>
                  </button>
                );
              })}

              {visibleTasks.length === 0 && (
                <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center">
                  <CheckCircle2 size={28} className="mx-auto text-emerald-500 mb-3" />
                  <h3 className="text-sm font-black">Aucune action dans cette file</h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">Les prochaines relances apparaîtront automatiquement selon les dates et les statuts.</p>
                </div>
              )}
            </div>
          )}
        </section>

        <aside className="xl:sticky xl:top-24 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-accent" />
              <h3 className="text-sm font-black uppercase tracking-tight">Aperçu du message</h3>
            </div>

            {selectedTask ? (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Destinataire</p>
                  <p className="mt-1 text-sm font-black truncate">{selectedTask.clientName}</p>
                  <p className="text-xs font-semibold text-slate-500 truncate">{selectedTask.clientEmail || 'Email manquant'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Objet</p>
                  <p className="mt-1 text-xs font-black leading-relaxed">{selectedTask.subject}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 p-4">
                  <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-700 dark:text-slate-300">{selectedTask.body}</pre>
                </div>
                {selectedTask.blockedReason && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300 flex gap-2">
                    <AlertTriangle size={15} className="shrink-0" />
                    {selectedTask.blockedReason}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm font-semibold text-slate-500">Sélectionnez une action pour prévisualiser le message.</p>
            )}
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-5 text-xs text-emerald-800 dark:text-emerald-200 flex items-start gap-3">
            <ShieldCheck size={17} className="shrink-0 mt-0.5" />
            <p className="font-semibold leading-relaxed">
              Les emails envoyés depuis cette file créent un journal CRM et mettent à jour le statut du document. Les PDF restent joints automatiquement.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AdminEnvoisRelances;