import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  FolderOpen,
  Mail,
  MapPin,
  Plus,
  ShieldCheck,
  StickyNote,
  Trash2,
  Truck,
  User,
  X
} from 'lucide-react';
import type { AdminTab } from '../../lib/admin-permissions';
import type { FieldMover, FieldTruck, Demenagement } from '../../types';
import {
  DOSSIER_STAGES,
  type ClientDossier,
  type DossierNote,
  type DossierTask,
  type DossierEvent
} from '../../lib/admin-dossiers';
import {
  getDossierActionTab,
  getDossierPrimaryActionLabel,
  getWorkflowStep
} from '../../lib/admin-workflow';
import { adminFetch } from '../../lib/admin-api';
import { analyzeDossierQuality, type DossierQualitySeverity } from '../../lib/admin-dossier-quality';

export interface ClientDossierWorkflowAction {
  id: string;
  label: string;
  description: string;
  tone?: 'primary' | 'success' | 'warning' | 'neutral';
}

type DossierEventDraft = Omit<DossierEvent, 'id' | 'dossierId' | 'dossierKey' | 'createdAt' | 'actor' | 'status'> & {
  status?: DossierEvent['status'];
};

interface ClientDossierDrawerProps {
  dossier: ClientDossier | null;
  notes: DossierNote[];
  tasks: DossierTask[];
  events: DossierEvent[];
  ownerOptions: string[];
  availableTabs: AdminTab[];
  workflowActions: ClientDossierWorkflowAction[];
  movers: FieldMover[];
  trucks: FieldTruck[];
  onClose: () => void;
  onNavigate: (tab: AdminTab) => void;
  onRunWorkflowAction: (actionId: string, dossier: ClientDossier) => void;
  onAssignMoveResources: (
    moveId: string,
    assignment: { assignedMovers: string[]; assignedTruck: string; teamLeader: string }
  ) => void;
  onUpdateMove?: (moveId: string, updates: Partial<Demenagement>) => void;
  onAssignOwner: (dossierKey: string, owner: string) => void;
  onAddNote: (dossierKey: string, content: string) => void;
  onAddTask: (task: Omit<DossierTask, 'id' | 'createdAt' | 'done'>) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onRegisterEvent?: (event: DossierEventDraft) => void | Promise<void>;
}

export function ClientDossierDrawer({
  dossier,
  notes,
  tasks,
  events,
  ownerOptions,
  availableTabs,
  workflowActions,
  movers,
  trucks,
  onClose,
  onNavigate,
  onRunWorkflowAction,
  onAssignMoveResources,
  onUpdateMove,
  onAssignOwner,
  onAddNote,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onRegisterEvent
}: ClientDossierDrawerProps) {
  const [noteContent, setNoteContent] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskOwner, setTaskOwner] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState<DossierTask['priority']>('normal');
  const [assignmentMoverNames, setAssignmentMoverNames] = useState<string[]>([]);
  const [assignmentTruck, setAssignmentTruck] = useState('');
  const [assignmentLeader, setAssignmentLeader] = useState('');
  const [sendingTrackingEmail, setSendingTrackingEmail] = useState(false);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState<string | null>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);

  const handleSendTrackingEmail = async () => {
    if (!dossier?.move || !dossier.move.trackingToken) return;
    const clientEmail = dossier.quote?.email || dossier.invoice?.email || dossier.request?.email || '';
    setSendingTrackingEmail(true);
    setEmailSuccessMessage(null);
    setEmailErrorMessage(null);

    try {
      const response = await adminFetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({
          type: 'devis-tracking',
          data: {
            clientName: dossier.clientName,
            clientEmail,
            id: dossier.move.id,
            trackingToken: dossier.move.trackingToken
          }
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || "Erreur lors de l'envoi");
      }

      const successEvent: DossierEventDraft = {
        type: 'communication',
        title: 'Lien de suivi envoyé',
        description: `Lien de suivi public envoyé à ${clientEmail || 'email non renseigné'}.`,
        status: 'success',
        documentType: 'demenagement',
        documentId: dossier.move.id,
        channel: 'Email'
      };
      if (clientEmail) successEvent.recipient = clientEmail;
      await onRegisterEvent?.(successEvent);
      setEmailSuccessMessage("Lien de suivi envoyé avec succès !");
      setTimeout(() => setEmailSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error("Failed to send tracking email:", err);
      const errorEvent: DossierEventDraft = {
        type: 'communication',
        title: 'Échec envoi lien de suivi',
        description: err.message || "Impossible d'envoyer l'e-mail.",
        status: 'error',
        documentType: 'demenagement',
        documentId: dossier.move.id,
        channel: 'Email'
      };
      if (clientEmail) errorEvent.recipient = clientEmail;
      await onRegisterEvent?.(errorEvent);
      setEmailErrorMessage(err.message || "Impossible d'envoyer l'e-mail.");
      setTimeout(() => setEmailErrorMessage(null), 5000);
    } finally {
      setSendingTrackingEmail(false);
    }
  };

  useEffect(() => {
    setNoteContent('');
    setTaskTitle('');
    setTaskDueDate('');
    setTaskPriority('normal');
    setTaskOwner(dossier?.owner || ownerOptions[0] || '');
  }, [dossier?.key, dossier?.owner, ownerOptions]);

  useEffect(() => {
    setAssignmentMoverNames(dossier?.move?.assignedMovers || []);
    setAssignmentTruck(dossier?.move?.assignedTruck || '');
    setAssignmentLeader(dossier?.move?.teamLeader || '');
  }, [
    dossier?.key,
    dossier?.move?.id,
    dossier?.move?.assignedTruck,
    dossier?.move?.teamLeader,
    dossier?.move?.assignedMovers?.join('|')
  ]);

  useEffect(() => {
    if (!assignmentLeader) return;
    setAssignmentMoverNames((current) => (
      current.includes(assignmentLeader)
        ? current.filter((name) => name !== assignmentLeader)
        : current
    ));
  }, [assignmentLeader]);

  const stage = useMemo(
    () => (dossier ? DOSSIER_STAGES.find((item) => item.key === dossier.stage) : null),
    [dossier]
  );

  if (!dossier) return null;

  const canNavigate = (tab: AdminTab) => availableTabs.includes(tab);
  const workflowStep = getWorkflowStep(dossier.stage);
  const primaryActionLabel = getDossierPrimaryActionLabel(dossier, workflowStep?.actionLabel || 'Action');
  const primaryActionTab = getDossierActionTab(dossier);
  const primaryWorkflowAction = workflowActions[0];
  const canRunPrimaryAction = !!primaryWorkflowAction || (!!primaryActionTab && canNavigate(primaryActionTab));
  const assignedMoverSet = new Set(dossier.move?.assignedMovers || []);
  const assignableMovers = movers.filter((mover) => (
    mover.name !== assignmentLeader &&
    (mover.status === 'Disponible' || assignedMoverSet.has(mover.name))
  ));
  const assignableTrucks = trucks.filter((truck) => truck.status === 'Disponible' || dossier.move?.assignedTruck === truck.plateNumber);
  const leaderOptions = Array.from(new Set([
    dossier.move?.teamLeader,
    ...movers.map((mover) => mover.name),
    ...ownerOptions
  ].filter(Boolean) as string[]));
  const selectedTruck = trucks.find((truck) => truck.plateNumber === assignmentTruck);
  const selectedTruckCapacityOk = !selectedTruck || !dossier.move || selectedTruck.capacity >= dossier.move.volume;
  const canSubmitAssignment = !!dossier.move && assignmentMoverNames.length > 0 && !!assignmentTruck && !!assignmentLeader && selectedTruckCapacityOk;
  const normalizedMoveStatus = String(dossier.move?.status || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const canEditMoveAssignment = !!dossier.move && (normalizedMoveStatus.includes('planifier') || normalizedMoveStatus.includes('programme'));
  const clientEmail = dossier.quote?.email || dossier.invoice?.email || dossier.request?.email || '';
  const clientPhone = dossier.phone || dossier.request?.phone || dossier.quote?.phone || dossier.visit?.phone || '';
  const dossierDate = dossier.move?.date || dossier.visit?.date || dossier.quote?.date || dossier.request?.date || dossier.date || '';
  const dossierVolume = dossier.move?.volume || dossier.quote?.volume || dossier.visit?.volumeEstimated || dossier.request?.volume || '';
  const routeReady = Boolean(dossier.fromCity && dossier.toCity);
  const contactReady = Boolean(clientEmail && clientPhone);
  const dateReady = Boolean(dossierDate);
  const volumeReady = Boolean(dossierVolume);
  const quoteReady = dossier.quote ? dossier.quote.status !== 'Brouillon' : !['devis', 'facturation', 'planning', 'intervention'].includes(dossier.stage);
  const invoiceReady = dossier.invoice ? dossier.invoice.status !== 'En retard' : true;
  const planningReady = dossier.move ? Boolean(dossier.move.teamLeader && dossier.move.assignedTruck && dossier.move.assignedMovers?.length) : true;
  const readyChecklist = [
    { id: 'contact', label: 'Contact', detail: clientEmail && clientPhone ? 'Email et téléphone OK' : 'Email ou téléphone à compléter', done: contactReady },
    { id: 'route', label: 'Trajet', detail: routeReady ? `${dossier.fromCity} vers ${dossier.toCity}` : 'Départ ou arrivée à préciser', done: routeReady },
    { id: 'date_volume', label: 'Date / volume', detail: dateReady && volumeReady ? `${dossierDate} - ${dossierVolume} m³` : 'Date ou volume à confirmer', done: dateReady && volumeReady },
    { id: 'quote', label: 'Devis', detail: dossier.quote ? dossier.quote.status : 'À créer si nécessaire', done: quoteReady },
    { id: 'invoice', label: 'Facture', detail: dossier.invoice ? dossier.invoice.status : 'Pas de facture bloquante', done: invoiceReady },
    { id: 'planning', label: 'Planning', detail: dossier.move ? (planningReady ? 'Équipe et camion affectés' : 'Équipe ou camion à affecter') : 'Pas encore en planning', done: planningReady }
  ];
  const readyCount = readyChecklist.filter((item) => item.done).length;
  const readyPercent = Math.round((readyCount / readyChecklist.length) * 100);
  const firstOpenTask = tasks.find((task) => !task.done);

  const toggleAssignmentMover = (moverName: string) => {
    setAssignmentMoverNames((current) => (
      current.includes(moverName)
        ? current.filter((name) => name !== moverName)
        : [...current, moverName]
    ));
  };

  const timelineItems = [
    dossier.visit && {
      id: dossier.visit.id,
      label: 'Visite technique',
      status: dossier.visit.status,
      meta: `${dossier.visit.address} · ${dossier.visit.time}`,
      date: dossier.visit.date,
      icon: <MapPin size={14} />
    },
    dossier.quote && {
      id: dossier.quote.id,
      label: 'Devis',
      status: dossier.quote.status,
      meta: `${dossier.quote.formula} · ${dossier.quote.volume} m³ · ${dossier.quote.price.toLocaleString('fr-FR')} €`,
      date: dossier.quote.createdAt,
      icon: <FileText size={14} />
    },
    dossier.invoice && {
      id: dossier.invoice.id,
      label: 'Facture',
      status: dossier.invoice.status,
      meta: `${dossier.invoice.amount.toLocaleString('fr-FR')} € · échéance ${dossier.invoice.dueDate}`,
      date: dossier.invoice.date,
      icon: <CreditCard size={14} />
    },
    dossier.move && {
      id: dossier.move.id,
      label: 'Intervention',
      status: dossier.move.status,
      meta: `${dossier.move.fromCity} → ${dossier.move.toCity} · ${dossier.move.crewSize} équipiers`,
      date: dossier.move.date,
      icon: <Truck size={14} />
    }
  ].filter(Boolean) as Array<{ id: string; label: string; status: string; meta: string; date: string; icon: React.ReactNode }>;

  const linkedDocuments = [
    dossier.quote && { label: 'Devis client', reference: dossier.quote.id, tab: 'devis' as AdminTab, status: dossier.quote.status },
    dossier.invoice && { label: 'Facture', reference: dossier.invoice.id, tab: 'factures' as AdminTab, status: dossier.invoice.status },
    dossier.visit && { label: 'Compte rendu visite', reference: dossier.visit.id, tab: 'visites' as AdminTab, status: dossier.visit.status },
    dossier.move && { label: 'Ordre de mission', reference: dossier.move.id, tab: 'planning' as AdminTab, status: dossier.move.status }
  ].filter(Boolean) as Array<{ label: string; reference: string; tab: AdminTab; status: string }>;

  const openTaskCount = tasks.filter((task) => !task.done).length;
  const riskClass = dossier.risk === 'urgent'
    ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40'
    : dossier.risk === 'attention'
      ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40'
      : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/40';

  const qualitySummary = analyzeDossierQuality(dossier);
  const getQualityIssueClass = (severity: DossierQualitySeverity) => {
    if (severity === 'blocking') return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40';
    if (severity === 'warning') return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/40';
  };
  const qualityScoreClass = qualitySummary.score >= 85
    ? 'text-red-700 dark:text-red-300'
    : qualitySummary.score >= 55
      ? 'text-amber-700 dark:text-amber-300'
      : qualitySummary.score >= 25
        ? 'text-sky-700 dark:text-sky-300'
        : 'text-emerald-700 dark:text-emerald-300';
  const qualityRiskLabel = qualitySummary.score >= 85
    ? 'Contrôle urgent'
    : qualitySummary.score >= 55
      ? 'Risque élevé'
      : qualitySummary.score >= 25
        ? 'À surveiller'
        : 'Stable';

  const getEventClass = (status: DossierEvent['status']) => {
    if (status === 'success') return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/40';
    if (status === 'warning') return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40';
    if (status === 'error') return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40';
    return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
  };

  const formatEventDate = (value: string) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
  };

  const getEventIcon = (event: DossierEvent) => {
    if (event.type === 'communication') return <Mail size={13} />;
    if (event.type === 'assignment') return <User size={13} />;
    if (event.type === 'task') return <ClipboardList size={13} />;
    if (event.type === 'note') return <StickyNote size={13} />;
    return <ShieldCheck size={13} />;
  };

  const submitNote = (event: React.FormEvent) => {
    event.preventDefault();
    const content = noteContent.trim();
    if (!content) return;
    onAddNote(dossier.key, content);
    setNoteContent('');
  };

  const submitTask = (event: React.FormEvent) => {
    event.preventDefault();
    const title = taskTitle.trim();
    if (!title) return;
    onAddTask({
      dossierKey: dossier.key,
      title,
      owner: taskOwner || dossier.owner,
      dueDate: taskDueDate || '',
      priority: taskPriority
    });
    setTaskTitle('');
    setTaskDueDate('');
    setTaskPriority('normal');
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-slate-950/35 backdrop-blur-sm">
      <button type="button" className="hidden md:block flex-1 cursor-default" onClick={onClose} aria-label="Fermer le dossier" />

      <aside className="w-full md:max-w-3xl h-full bg-white dark:bg-slate-950 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/75 dark:border-slate-800 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${riskClass}`}>
                  <AlertCircle size={12} />
                  {stage?.label || 'Dossier'}
                </span>
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:bg-slate-900 dark:text-slate-300">
                  {dossier.dossierId}
                </span>
              </div>
              <h2 className="mt-3 truncate text-2xl font-black tracking-tight text-brand-950 dark:text-white">{dossier.clientName}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {dossier.fromCity || 'Départ à préciser'} {'->'} {dossier.toCity || 'Arrivée à préciser'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200/75 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] md:grid-cols-5">
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900">
              <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Téléphone</span>
              <span className="mt-1 block truncate font-black text-brand-950 dark:text-white">{clientPhone || 'À compléter'}</span>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900">
              <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Email</span>
              <span className="mt-1 block truncate font-black text-brand-950 dark:text-white">{clientEmail || 'À compléter'}</span>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900">
              <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Date</span>
              <span className="mt-1 block truncate font-black text-brand-950 dark:text-white">{dossierDate || 'À fixer'}</span>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900">
              <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Montant</span>
              <span className="mt-1 block truncate font-black text-brand-950 dark:text-white">{dossier.amount.toLocaleString('fr-FR')} EUR</span>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900">
              <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">À faire</span>
              <span className="mt-1 block truncate font-black text-brand-950 dark:text-white">{openTaskCount} tâche{openTaskCount > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-slate-200/75 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/85">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Prochaine action</span>
                  <h3 className="mt-2 text-lg font-black text-brand-950 dark:text-white">{qualitySummary.actionLabel}</h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">{qualitySummary.reason}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Risque</span>
                  <strong className={`block max-w-[130px] text-right text-sm font-black leading-tight ${qualityScoreClass}`}>{qualityRiskLabel}</strong>
                </div>
              </div>

              {firstOpenTask && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-900/40 dark:bg-amber-950/20">
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">Tâche ouverte</p>
                  <p className="mt-1 text-xs font-black text-amber-900 dark:text-amber-200">{firstOpenTask.title}</p>
                </div>
              )}

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_170px]">
                <select
                  value={dossier.owner}
                  onChange={(event) => onAssignOwner(dossier.key, event.target.value)}
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-accent dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  {ownerOptions.map((owner) => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={!canRunPrimaryAction}
                  onClick={() => {
                    if (primaryWorkflowAction) {
                      onRunWorkflowAction(primaryWorkflowAction.id, dossier);
                    } else if (primaryActionTab) {
                      onNavigate(primaryActionTab);
                    }
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-900 px-3 text-xs font-black text-white hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent dark:text-brand-950"
                >
                  Traiter
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/75 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/85">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Dossier pret ?</span>
                  <h3 className="mt-2 text-lg font-black text-brand-950 dark:text-white">{readyCount}/{readyChecklist.length} points OK</h3>
                </div>
                <strong className={`text-2xl font-black ${readyPercent === 100 ? 'text-emerald-600 dark:text-emerald-300' : readyPercent >= 70 ? 'text-amber-600 dark:text-amber-300' : 'text-red-600 dark:text-red-300'}`}>{readyPercent}%</strong>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${readyPercent}%` }} />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {readyChecklist.map((item) => (
                  <div key={item.id} className={`rounded-xl border px-3 py-2 ${item.done ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300' : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200'}`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={13} className={item.done ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-300 dark:text-slate-600'} />
                      <span className="text-[10px] font-black uppercase tracking-wider">{item.label}</span>
                    </div>
                    <p className="mt-1 truncate text-[10px] font-semibold opacity-75">{item.detail}</p>
                  </div>
                ))}
              </div>
              {qualitySummary.issues.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-brand-900 dark:text-slate-400 dark:hover:text-white">
                    Voir les points à corriger
                  </summary>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {qualitySummary.issues.slice(0, 6).map((issue) => (
                      <span key={issue.kind} className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase ${getQualityIssueClass(issue.severity)}`} title={issue.detail}>
                        {issue.label}
                      </span>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </section>

          {workflowActions.length > 1 && (
            <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <ClipboardList size={14} className="text-accent" />
                Actions guidées
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {workflowActions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => onRunWorkflowAction(action.id, dossier)}
                    className={`text-left rounded-xl border px-3 py-3 transition-all active:scale-[0.98] ${
                      action.tone === 'success'
                        ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-300'
                        : action.tone === 'warning'
                          ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300'
                          : action.tone === 'neutral'
                            ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200'
                            : 'bg-brand-900 hover:bg-brand-hover border-brand-900 text-white dark:bg-accent dark:border-accent dark:text-brand-950'
                    }`}
                  >
                    <span className="block text-xs font-black">{action.label}</span>
                    <span className="mt-1 block text-[10px] font-bold opacity-70">{action.description}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {dossier.move && (
            <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Truck size={14} className="text-accent" />
                    Affectation opérationnelle
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {dossier.move.volume} m³ · {dossier.move.date} · {dossier.move.fromCity} → {dossier.move.toCity}
                  </p>
                </div>
                <span className="self-start rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2.5 py-1 text-[10px] font-black uppercase text-slate-500">
                  {dossier.move.status}
                </span>
              </div>

              {(dossier.move.teamLeader || dossier.move.assignedMovers?.length || dossier.move.assignedTruck) && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Chef mission</span>
                    <p className="mt-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                      {dossier.move.teamLeader || 'À choisir'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Équipe affectée</span>
                    <p className="mt-1 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      {(dossier.move.assignedMovers || []).join(', ') || 'À compléter'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/40 p-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">Véhicule</span>
                    <p className="mt-1 text-xs font-bold text-sky-900 dark:text-sky-200">
                      {dossier.move.assignedTruck || 'À affecter'}
                    </p>
                  </div>
                </div>
              )}

              {/* Portail Suivi Client & Signature */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                  Portail Suivi Client & Signature Électronique
                </span>
                {dossier.move.trackingToken ? (
                  <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-400">Lien de suivi public :</span>
                      {dossier.move.clientSignature ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/40">
                          <CheckCircle2 size={10} /> Signé électroniquement
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/40">
                          En attente de signature
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/suivi/${dossier.move.id}?token=${dossier.move.trackingToken}`}
                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-300 focus:outline-none"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/suivi/${dossier.move!.id}?token=${dossier.move!.trackingToken}`);
                        }}
                        className="bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover text-white dark:text-brand-950 rounded-lg px-3 py-1.5 text-[10px] font-black cursor-pointer shrink-0"
                      >
                        Copier
                      </button>
                      <button
                        type="button"
                        disabled={sendingTrackingEmail}
                        onClick={handleSendTrackingEmail}
                        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg px-3 py-1.5 text-[10px] font-black cursor-pointer shrink-0 flex items-center gap-1"
                      >
                        {sendingTrackingEmail ? "Envoi..." : "Envoyer par mail"}
                      </button>
                    </div>
                    {emailSuccessMessage && (
                      <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">{emailSuccessMessage}</p>
                    )}
                    {emailErrorMessage && (
                      <p className="text-[10px] font-bold text-red-600 dark:text-red-400 mt-1">{emailErrorMessage}</p>
                    )}
                    {dossier.move.clientSignature && (
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[9px] font-black uppercase text-slate-400">Aperçu signature :</span>
                          <span className="block text-[10px] font-bold text-slate-500">
                            Le {new Date(dossier.move.signedAt || '').toLocaleDateString('fr-FR')} à {new Date(dossier.move.signedAt || '').toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <div className="bg-white rounded-lg p-1.5 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                          <img src={dossier.move.clientSignature} alt="Signature Client" className="h-10 w-24 object-contain" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onUpdateMove) {
                        onUpdateMove(dossier.move!.id, {
                          trackingToken: self.crypto?.randomUUID ? self.crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
                        });
                      }
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-800 rounded-xl px-3 py-2 text-xs font-black flex items-center justify-center gap-2"
                  >
                    Activer le suivi & générer le token public
                  </button>
                )}
              </div>

              {canEditMoveAssignment && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Chef d'équipe</label>
                    <select
                      value={assignmentLeader}
                      onChange={(event) => setAssignmentLeader(event.target.value)}
                      className="mt-2 w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-accent"
                    >
                      <option value="">Choisir un responsable terrain</option>
                      {leaderOptions.map((leader) => (
                        <option key={leader} value={leader}>{leader}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Équipiers disponibles</label>
                      <span className="text-[10px] font-bold text-slate-400">{assignmentMoverNames.length} sélectionné{assignmentMoverNames.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {assignableMovers.map((mover) => {
                        const checked = assignmentMoverNames.includes(mover.name);
                        return (
                          <button
                            key={mover.id}
                            type="button"
                            onClick={() => toggleAssignmentMover(mover.name)}
                            className={`text-left rounded-xl border px-3 py-2.5 transition-all active:scale-[0.98] ${
                              checked
                                ? 'bg-brand-900 text-white border-brand-900 dark:bg-accent dark:text-brand-950 dark:border-accent'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <span className="block text-xs font-black">{mover.name}</span>
                            <span className="mt-0.5 block text-[10px] font-bold opacity-70">{mover.role} · {mover.status}</span>
                          </button>
                        );
                      })}
                      {assignableMovers.length === 0 && (
                        <p className="sm:col-span-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-3 text-xs font-bold text-amber-800 dark:text-amber-300">
                          Aucun équipier disponible. Ajoutez ou libérez un équipier dans Liste équipe.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Véhicule / capacité</label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {assignableTrucks.map((truck) => {
                        const checked = assignmentTruck === truck.plateNumber;
                        const capacityOk = truck.capacity >= dossier.move!.volume;
                        return (
                          <button
                            key={truck.id}
                            type="button"
                            disabled={!capacityOk}
                            onClick={() => setAssignmentTruck(truck.plateNumber)}
                            className={`text-left rounded-xl border px-3 py-2.5 transition-all active:scale-[0.98] ${
                              checked
                                ? 'bg-brand-900 text-white border-brand-900 dark:bg-accent dark:text-brand-950 dark:border-accent'
                                : capacityOk
                                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-slate-800 dark:text-slate-200'
                                  : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300 cursor-not-allowed opacity-75'
                            }`}
                          >
                            <span className="block text-xs font-black">{truck.plateNumber}</span>
                            <span className="mt-0.5 block text-[10px] font-bold opacity-70">
                              {truck.type} · {truck.capacity} m³ · {capacityOk ? truck.status : 'Capacité insuffisante'}
                            </span>
                          </button>
                        );
                      })}
                      {assignableTrucks.length === 0 && (
                        <p className="sm:col-span-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-3 text-xs font-bold text-amber-800 dark:text-amber-300">
                          Aucun véhicule disponible. Ajoutez ou libérez un véhicule dans Liste équipe.
                        </p>
                      )}
                    </div>
                    {!selectedTruckCapacityOk && (
                      <p className="mt-2 text-[10px] font-bold text-red-600 dark:text-red-300">
                        Le véhicule sélectionné est trop petit pour le volume du chantier.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={!canSubmitAssignment}
                    onClick={() => onAssignMoveResources(dossier.move!.id, {
                      assignedMovers: assignmentMoverNames,
                      assignedTruck: assignmentTruck,
                      teamLeader: assignmentLeader
                    })}
                    className="w-full bg-accent hover:bg-accent-hover text-brand-950 rounded-xl px-3 py-3 text-xs font-black flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 size={14} />
                    {dossier.move.status === 'Programmé' ? "Mettre à jour l'affectation" : 'Valider équipe, véhicule et planning'}
                  </button>
                </div>
              )}
            </section>
          )}

          <details className="rounded-2xl border border-slate-200/75 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <summary className="flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
              <ClockDot /> Timeline
            </summary>$1
          </details>

          <details className="rounded-2xl border border-slate-200/75 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <summary className="flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
              <ShieldCheck size={14} className="text-accent" />
              Historique CRM
            </summary>$1
          </details>
          <details className="rounded-2xl border border-slate-200/75 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <summary className="flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
              <FolderOpen size={14} className="text-accent" />
              Pieces liees
            </summary>$1
          </details>

          <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <ClipboardList size={14} className="text-accent" />
              Tâches
            </h3>

            <form onSubmit={submitTask} className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-2">
              <input
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
                placeholder="Nouvelle tâche"
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
              />
              <input
                type="date"
                value={taskDueDate}
                onChange={(event) => setTaskDueDate(event.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
              />
              <select
                value={taskOwner}
                onChange={(event) => setTaskOwner(event.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
              >
                {ownerOptions.map((owner) => (
                  <option key={owner} value={owner}>{owner}</option>
                ))}
              </select>
              <select
                value={taskPriority}
                onChange={(event) => setTaskPriority(event.target.value as DossierTask['priority'])}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
              <button
                type="submit"
                disabled={!taskTitle.trim()}
                className="sm:col-span-2 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover text-white dark:text-brand-950 rounded-xl px-3 py-2 text-xs font-black flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Plus size={14} />
                Ajouter la tâche
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3">
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center ${task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700'}`}
                    aria-label={task.done ? 'Marquer à faire' : 'Marquer terminée'}
                  >
                    {task.done && <CheckCircle2 size={13} />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-black ${task.done ? 'line-through text-slate-400' : 'text-brand-950 dark:text-white'}`}>{task.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {task.owner}{task.dueDate ? ` · ${task.dueDate}` : ''} · {task.priority}
                    </p>
                  </div>
                  <button type="button" onClick={() => onDeleteTask(task.id)} className="text-slate-400 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-xs text-slate-500">Aucune tâche active sur ce dossier.</p>
              )}
            </div>
          </section>

          <details className="rounded-2xl border border-slate-200/75 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <summary className="flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
              <StickyNote size={14} className="text-accent" />
              Notes internes
            </summary>$1
          </details>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
            <button
              type="button"
              disabled={!canNavigate('dossiers')}
              onClick={() => onNavigate('dossiers')}
              className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/75 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl p-3 text-xs font-black flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FolderOpen size={14} />
              Retour dossiers
            </button>
            <button
              type="button"
              disabled={!canRunPrimaryAction}
              onClick={() => {
                if (primaryWorkflowAction) {
                  onRunWorkflowAction(primaryWorkflowAction.id, dossier);
                } else if (primaryActionTab) {
                  onNavigate(primaryActionTab);
                }
              }}
              className="bg-accent hover:bg-accent-hover text-brand-950 rounded-xl p-3 text-xs font-black flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {primaryWorkflowAction?.label || primaryActionLabel}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ClockDot() {
  return <Calendar size={14} className="text-accent" />;
}
