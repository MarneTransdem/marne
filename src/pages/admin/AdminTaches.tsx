import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  Filter,
  FolderOpen,
  RotateCcw,
  Search,
  UserCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSyncedCollection } from '../../hooks/useData';
import type { Devis, Facture, Visite, Demenagement } from '../../types';
import type {
  AdminPublicRequest,
  ClientDossier,
  DossierEvent,
  DossierTask
} from '../../lib/admin-dossiers';
import { DOSSIER_STAGES } from '../../lib/admin-dossiers';
import { buildClientDossiers } from '../../lib/admin-dossier-engine';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

type TaskFilter = 'open' | 'mine' | 'urgent' | 'today' | 'overdue' | 'devis' | 'factures' | 'planning' | 'dossiers' | 'done' | 'all';
type TaskCategory = 'devis' | 'factures' | 'planning' | 'dossiers';

type EnrichedTask = {
  task: DossierTask;
  dossier: ClientDossier | null;
  category: TaskCategory;
  isOverdue: boolean;
  isDueToday: boolean;
  dueSort: number;
  sourceLabel: string;
};

const PAGE_SIZE = 12;

const TASK_FILTERS: Array<{ id: TaskFilter; label: string }> = [
  { id: 'open', label: 'Ouvertes' },
  { id: 'mine', label: 'Moi' },
  { id: 'urgent', label: 'Urgent' },
  { id: 'today', label: "Aujourd'hui" },
  { id: 'overdue', label: 'En retard' },
  { id: 'devis', label: 'Devis' },
  { id: 'factures', label: 'Factures' },
  { id: 'planning', label: 'Planning' },
  { id: 'dossiers', label: 'Dossiers' },
  { id: 'done', label: 'Terminees' },
  { id: 'all', label: 'Tout' }
];

const ISSUE_CATEGORY: Record<string, TaskCategory> = {
  quote_to_send: 'devis',
  quote_to_follow_up: 'devis',
  quote_expiring: 'devis',
  invoice_to_send: 'factures',
  invoice_overdue: 'factures',
  planning_incomplete: 'planning',
  move_soon: 'planning'
};

const CATEGORY_LABELS: Record<TaskCategory, string> = {
  devis: 'Devis',
  factures: 'Factures',
  planning: 'Planning',
  dossiers: 'Dossier'
};

const CATEGORY_ROUTES: Record<TaskCategory, string> = {
  devis: '/admin/devis',
  factures: '/admin/factures',
  planning: '/admin/planning',
  dossiers: '/admin/dossiers'
};

const normalize = (value: unknown) => String(value ?? '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const getTodayIso = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

const createEntityId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getDateSort = (value?: string) => {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const timestamp = Date.parse(value.includes('T') ? value : `${value}T00:00:00`);
  return Number.isFinite(timestamp) ? timestamp : Number.MAX_SAFE_INTEGER;
};

const formatDate = (value?: string) => {
  if (!value) return 'Sans echeance';
  const timestamp = getDateSort(value);
  if (!Number.isFinite(timestamp) || timestamp === Number.MAX_SAFE_INTEGER) return value;
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(timestamp));
};

const getStageLabel = (stage?: ClientDossier['stage']) => (
  DOSSIER_STAGES.find((item) => item.key === stage)?.label || 'Dossier'
);

const getTaskCategory = (task: DossierTask): TaskCategory => {
  const byIssue = task.sourceIssueKind ? ISSUE_CATEGORY[task.sourceIssueKind] : null;
  if (byIssue) return byIssue;

  const text = normalize(`${task.title} ${task.sourceLabel}`);
  if (text.includes('devis')) return 'devis';
  if (text.includes('facture') || text.includes('paiement')) return 'factures';
  if (text.includes('planning') || text.includes('equipe') || text.includes('camion') || text.includes('intervention')) return 'planning';
  return 'dossiers';
};

const getTaskSourceLabel = (task: DossierTask) => {
  if (task.source === 'today_action') return task.sourceLabel || 'Action du jour';
  return task.sourceLabel || 'Tache manuelle';
};

const getPriorityClasses = (task: DossierTask, isOverdue: boolean) => {
  if (isOverdue) return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/25 dark:text-red-300 dark:border-red-900/40';
  if (task.priority === 'urgent') return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/25 dark:text-amber-300 dark:border-amber-900/40';
  return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
};

const getCategoryClasses = (category: TaskCategory) => {
  if (category === 'devis') return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/25 dark:text-sky-300 dark:border-sky-900/40';
  if (category === 'factures') return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/25 dark:text-emerald-300 dark:border-emerald-900/40';
  if (category === 'planning') return 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/25 dark:text-violet-300 dark:border-violet-900/40';
  return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
};

const sameOwner = (owner: string | undefined, currentUserLabel: string, currentUserEmail: string) => {
  const cleanOwner = normalize(owner);
  if (!cleanOwner) return false;
  return cleanOwner === normalize(currentUserLabel) || cleanOwner === normalize(currentUserEmail);
};

export function AdminTaches() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const context = useOutletContext<AdminOutletContextType>();

  const [dossierTasks, setDossierTasks] = useSyncedCollection<DossierTask>('dossierTasks');
  const [dossierEvents, setDossierEvents] = useSyncedCollection<DossierEvent>('dossierEvents');
  const [publicRequests] = useSyncedCollection<AdminPublicRequest>('quotes');
  const [visites] = useSyncedCollection<Visite>('visites');
  const [devisList] = useSyncedCollection<Devis>('devis');
  const [factures] = useSyncedCollection<Facture>('factures');
  const [demenagements] = useSyncedCollection<Demenagement>('demenagements');
  const [dossierOwners] = useSyncedCollection<{ id?: string; key: string; dossierId?: string; owner: string }>('dossierOwners');

  const [activeFilter, setActiveFilter] = useState<TaskFilter>('open');
  const [localQuery, setLocalQuery] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const currentUserLabel = user?.displayName || user?.email || 'Utilisateur CRM';
  const currentUserEmail = user?.email || '';
  const todayIso = useMemo(() => getTodayIso(), []);
  const query = context?.searchQuery?.trim() ? context.searchQuery : localQuery;

  const dossierOwnerOverrides = useMemo(() => {
    const overrides: Record<string, string> = {};
    dossierOwners.forEach((owner) => {
      if (owner.dossierId) overrides[owner.dossierId] = owner.owner;
      if (owner.key) overrides[owner.key] = owner.owner;
    });
    return overrides;
  }, [dossierOwners]);

  const dossiers = useMemo(() => buildClientDossiers({
    publicRequests,
    visites,
    devisList,
    factures,
    demenagements,
    dossierOwnerOverrides
  }), [publicRequests, visites, devisList, factures, demenagements, dossierOwnerOverrides]);

  const dossierByKey = useMemo(() => {
    const map = new Map<string, ClientDossier>();
    dossiers.forEach((dossier) => {
      [dossier.key, dossier.dossierId, dossier.clientName].forEach((key) => {
        const normalized = normalize(key);
        if (normalized) map.set(normalized, dossier);
      });
    });
    return map;
  }, [dossiers]);

  const enrichedTasks = useMemo<EnrichedTask[]>(() => {
    return dossierTasks.map((task) => {
      const dossier = dossierByKey.get(normalize(task.dossierId || task.dossierKey))
        || dossierByKey.get(normalize(task.dossierKey))
        || null;
      const category = getTaskCategory(task);
      const isOverdue = Boolean(task.dueDate && task.dueDate < todayIso && !task.done);
      const isDueToday = Boolean(task.dueDate && task.dueDate === todayIso && !task.done);

      return {
        task,
        dossier,
        category,
        isOverdue,
        isDueToday,
        dueSort: getDateSort(task.dueDate || task.createdAt),
        sourceLabel: getTaskSourceLabel(task)
      };
    }).sort((a, b) => {
      if (a.task.done !== b.task.done) return a.task.done ? 1 : -1;
      if (a.isOverdue !== b.isOverdue) return a.isOverdue ? -1 : 1;
      if (a.isDueToday !== b.isDueToday) return a.isDueToday ? -1 : 1;
      if (a.task.priority !== b.task.priority) return a.task.priority === 'urgent' ? -1 : 1;
      if (a.dueSort !== b.dueSort) return a.dueSort - b.dueSort;
      return b.task.createdAt.localeCompare(a.task.createdAt);
    });
  }, [dossierByKey, dossierTasks, todayIso]);

  const filterCounts = useMemo(() => {
    const counts = new Map<TaskFilter, number>();
    TASK_FILTERS.forEach((filter) => counts.set(filter.id, 0));
    enrichedTasks.forEach((item) => {
      const { task, category, isOverdue, isDueToday } = item;
      if (!task.done) counts.set('open', (counts.get('open') || 0) + 1);
      if (!task.done && sameOwner(task.owner, currentUserLabel, currentUserEmail)) counts.set('mine', (counts.get('mine') || 0) + 1);
      if (!task.done && task.priority === 'urgent') counts.set('urgent', (counts.get('urgent') || 0) + 1);
      if (isDueToday) counts.set('today', (counts.get('today') || 0) + 1);
      if (isOverdue) counts.set('overdue', (counts.get('overdue') || 0) + 1);
      if (!task.done) counts.set(category, (counts.get(category) || 0) + 1);
      if (task.done) counts.set('done', (counts.get('done') || 0) + 1);
      counts.set('all', (counts.get('all') || 0) + 1);
    });
    return counts;
  }, [currentUserEmail, currentUserLabel, enrichedTasks]);

  const ownerOptions = useMemo<string[]>(() => (
    Array.from(new Set<string>(enrichedTasks
      .map((item) => item.task.owner)
      .filter((owner): owner is string => Boolean(owner))))
      .sort((a, b) => a.localeCompare(b, 'fr'))
  ), [enrichedTasks]);

  const visibleTasks = useMemo(() => {
    const cleanQuery = normalize(query);
    return enrichedTasks.filter((item) => {
      const { task, dossier, category, isOverdue, isDueToday } = item;
      if (ownerFilter !== 'all' && task.owner !== ownerFilter) return false;
      if (activeFilter === 'open' && task.done) return false;
      if (activeFilter === 'mine' && (task.done || !sameOwner(task.owner, currentUserLabel, currentUserEmail))) return false;
      if (activeFilter === 'urgent' && (task.done || task.priority !== 'urgent')) return false;
      if (activeFilter === 'today' && !isDueToday) return false;
      if (activeFilter === 'overdue' && !isOverdue) return false;
      if (activeFilter === 'done' && !task.done) return false;
      if (['devis', 'factures', 'planning', 'dossiers'].includes(activeFilter) && (task.done || category !== activeFilter)) return false;

      if (!cleanQuery) return true;
      return [
        task.title,
        task.owner,
        task.dueDate,
        task.sourceLabel,
        task.sourceIssueKind,
        dossier?.clientName,
        dossier?.dossierId,
        dossier?.fromCity,
        dossier?.toCity,
        dossier?.nextAction
      ].some((value) => normalize(value).includes(cleanQuery));
    });
  }, [activeFilter, currentUserEmail, currentUserLabel, enrichedTasks, ownerFilter, query]);

  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedTasks = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return visibleTasks.slice(start, start + PAGE_SIZE);
  }, [safePage, visibleTasks]);

  const metrics = useMemo(() => ({
    open: filterCounts.get('open') || 0,
    urgent: filterCounts.get('urgent') || 0,
    overdue: filterCounts.get('overdue') || 0,
    today: filterCounts.get('today') || 0,
    done: filterCounts.get('done') || 0
  }), [filterCounts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, ownerFilter, query]);

  const registerTaskEvent = async (task: DossierTask, done: boolean) => {
    const dossier = dossierByKey.get(normalize(task.dossierId || task.dossierKey)) || null;
    const event: DossierEvent = {
      id: createEntityId('EVT'),
      dossierId: dossier?.dossierId || task.dossierId || task.dossierKey,
      dossierKey: dossier?.key || task.dossierKey || task.dossierId || task.id,
      type: 'task',
      title: done ? 'Tache terminee' : 'Tache reouverte',
      description: task.title,
      status: done ? 'success' : 'info',
      actor: currentUserLabel,
      createdAt: new Date().toISOString(),
      metadata: {
        taskId: task.id,
        source: task.source || 'manual'
      }
    };
    await setDossierEvents((prev) => [event, ...prev]);
  };

  const handleToggleTask = async (taskId: string) => {
    const task = dossierTasks.find((item) => item.id === taskId);
    if (!task) return;
    const nextDone = !task.done;

    await setDossierTasks((prev) => prev.map((item) => item.id === taskId ? { ...item, done: nextDone } : item));
    await registerTaskEvent(task, nextDone);
    context?.pushNotification(
      nextDone ? 'Tache terminee' : 'Tache reouverte',
      nextDone ? 'La tache est sortie du travail ouvert.' : 'La tache revient dans le travail ouvert.',
      nextDone ? 'success' : 'info'
    );
  };

  const openDossier = (item: EnrichedTask) => {
    const key = item.dossier?.key || item.task.dossierId || item.task.dossierKey;
    navigate(`/admin/dossiers?dossier=${encodeURIComponent(key)}`);
  };

  const resultStart = visibleTasks.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const resultEnd = Math.min(visibleTasks.length, safePage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Travail du jour</span>
            <h2 className="mt-1 text-2xl font-black text-brand-950 dark:text-white">Taches CRM a traiter</h2>
            <p className="mt-1 max-w-2xl text-sm font-semibold text-slate-500 dark:text-slate-400">
              Toutes les taches ouvertes, urgentes ou creees par les actions du jour sont regroupees ici pour piloter la journee sans chercher dans chaque dossier.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/dossiers')}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-900 px-4 py-3 text-[11px] font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-hover dark:bg-accent dark:text-brand-950"
          >
            Dossiers clients
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          <button type="button" onClick={() => setActiveFilter('open')} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-accent dark:border-slate-800 dark:bg-slate-950/50">
            <ClipboardList size={17} className="text-slate-500" />
            <span className="mt-3 block text-2xl font-black text-brand-950 dark:text-white">{metrics.open}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Ouvertes</span>
          </button>
          <button type="button" onClick={() => setActiveFilter('urgent')} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left transition-colors hover:border-amber-300 dark:border-amber-900/40 dark:bg-amber-950/20">
            <AlertTriangle size={17} className="text-amber-600" />
            <span className="mt-3 block text-2xl font-black text-amber-800 dark:text-amber-300">{metrics.urgent}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">Urgentes</span>
          </button>
          <button type="button" onClick={() => setActiveFilter('overdue')} className="rounded-2xl border border-red-200 bg-red-50 p-4 text-left transition-colors hover:border-red-300 dark:border-red-900/40 dark:bg-red-950/20">
            <Clock size={17} className="text-red-600" />
            <span className="mt-3 block text-2xl font-black text-red-800 dark:text-red-300">{metrics.overdue}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-red-700 dark:text-red-300">En retard</span>
          </button>
          <button type="button" onClick={() => setActiveFilter('today')} className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-left transition-colors hover:border-sky-300 dark:border-sky-900/40 dark:bg-sky-950/20">
            <CalendarDays size={17} className="text-sky-600" />
            <span className="mt-3 block text-2xl font-black text-sky-800 dark:text-sky-300">{metrics.today}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">Aujourd'hui</span>
          </button>
          <button type="button" onClick={() => setActiveFilter('done')} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left transition-colors hover:border-emerald-300 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <CheckCircle2 size={17} className="text-emerald-600" />
            <span className="mt-3 block text-2xl font-black text-emerald-800 dark:text-emerald-300">{metrics.done}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Terminees</span>
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 md:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {TASK_FILTERS.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-all ${active ? 'border-accent bg-accent text-brand-950 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-accent dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'}`}
                >
                  <Filter size={12} />
                  {filter.label}
                  <span className="rounded-md bg-white/70 px-1.5 py-0.5 text-[9px] text-brand-950 dark:bg-slate-900 dark:text-white">{filterCounts.get(filter.id) || 0}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(220px,1fr)_190px] xl:w-[520px]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                value={localQuery}
                onChange={(event) => setLocalQuery(event.target.value)}
                placeholder={context?.searchQuery?.trim() ? `Recherche globale: ${context.searchQuery}` : 'Rechercher client, tache, ville...'}
                disabled={Boolean(context?.searchQuery?.trim())}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-semibold text-slate-700 outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              />
            </label>
            <select
              value={ownerFilter}
              onChange={(event) => setOwnerFilter(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 outline-none transition-all focus:border-accent dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">Tous responsables</option>
              {ownerOptions.map((owner) => (
                <option key={owner} value={owner}>{owner}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="hidden grid-cols-[minmax(260px,1.4fr)_1fr_130px_150px_210px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 lg:grid">
            <span>Tache</span>
            <span>Dossier</span>
            <span>Echeance</span>
            <span>Responsable</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {paginatedTasks.map((item) => {
              const { task, dossier, category, isOverdue } = item;
              return (
                <article key={task.id} className={`grid grid-cols-1 gap-3 bg-white px-4 py-4 dark:bg-slate-900 lg:grid-cols-[minmax(260px,1.4fr)_1fr_130px_150px_210px] lg:items-center ${task.done ? 'opacity-70' : ''}`}>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`rounded-md border px-1.5 py-0.5 text-[8px] font-black uppercase ${getPriorityClasses(task, isOverdue)}`}>
                        {isOverdue ? 'Retard' : task.priority === 'urgent' ? 'Urgent' : 'Normal'}
                      </span>
                      <span className={`rounded-md border px-1.5 py-0.5 text-[8px] font-black uppercase ${getCategoryClasses(category)}`}>
                        {CATEGORY_LABELS[category]}
                      </span>
                      {task.done && (
                        <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[8px] font-black uppercase text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/25 dark:text-emerald-300">Terminee</span>
                      )}
                    </div>
                    <h3 className={`mt-2 truncate text-sm font-black ${task.done ? 'text-slate-400 line-through' : 'text-brand-950 dark:text-white'}`}>{task.title}</h3>
                    <p className="mt-1 line-clamp-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">Origine: {item.sourceLabel}</p>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-black text-brand-950 dark:text-white">{dossier?.clientName || task.dossierKey}</p>
                    <p className="mt-1 truncate text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      {dossier ? `${getStageLabel(dossier.stage)} - ${dossier.fromCity || 'Depart ?'} vers ${dossier.toCity || 'Arrivee ?'}` : 'Dossier a rattacher'}
                    </p>
                    {dossier?.amount ? <p className="mt-1 text-[10px] font-black text-slate-500 dark:text-slate-400">{dossier.amount.toLocaleString('fr-FR')} EUR</p> : null}
                  </div>

                  <div>
                    <p className={`text-xs font-black ${isOverdue ? 'text-red-600 dark:text-red-300' : 'text-slate-700 dark:text-slate-200'}`}>{formatDate(task.dueDate)}</p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-400">Creee {formatDate(task.createdAt)}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    <UserCircle size={14} className="text-slate-400" />
                    <span className="truncate">{task.owner || 'Non assigne'}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => handleToggleTask(task.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-black uppercase transition-colors ${task.done ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                    >
                      {task.done ? <RotateCcw size={13} /> : <CheckCircle2 size={13} />}
                      {task.done ? 'Reouvrir' : 'Terminer'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openDossier(item)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase text-slate-700 transition-colors hover:border-accent dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    >
                      <FolderOpen size={13} />
                      Dossier
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(CATEGORY_ROUTES[category])}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase text-slate-700 transition-colors hover:border-accent dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    >
                      <FileText size={13} />
                      Module
                    </button>
                  </div>
                </article>
              );
            })}

            {paginatedTasks.length === 0 && (
              <div className="bg-white px-5 py-10 text-center dark:bg-slate-900">
                <ClipboardList className="mx-auto text-slate-300" size={34} />
                <p className="mt-3 text-sm font-black text-brand-950 dark:text-white">Aucune tache dans cette vue.</p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">Change le filtre ou cree des taches depuis les actions du jour.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {resultStart}-{resultEnd} sur {visibleTasks.length} tache(s)
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase text-slate-600 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              Precedent
            </button>
            <span className="text-xs font-black text-slate-500 dark:text-slate-400">{safePage} / {totalPages}</span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase text-slate-600 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              Suivant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}