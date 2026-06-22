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
  MapPin,
  Plus,
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
  type DossierTask
} from '../../lib/admin-dossiers';
import {
  getDossierActionTab,
  getDossierPrimaryActionLabel,
  getWorkflowStep
} from '../../lib/admin-workflow';

export interface ClientDossierWorkflowAction {
  id: string;
  label: string;
  description: string;
  tone?: 'primary' | 'success' | 'warning' | 'neutral';
}

interface ClientDossierDrawerProps {
  dossier: ClientDossier | null;
  notes: DossierNote[];
  tasks: DossierTask[];
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
}

export function ClientDossierDrawer({
  dossier,
  notes,
  tasks,
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
  onDeleteTask
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
    setSendingTrackingEmail(true);
    setEmailSuccessMessage(null);
    setEmailErrorMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'devis-tracking',
          data: {
            clientName: dossier.clientName,
            clientEmail: dossier.quote?.email || dossier.invoice?.email || dossier.request?.email || '',
            id: dossier.move.id,
            trackingToken: dossier.move.trackingToken
          }
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || "Erreur lors de l'envoi");
      }

      setEmailSuccessMessage("Lien de suivi envoyé avec succès !");
      setTimeout(() => setEmailSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error("Failed to send tracking email:", err);
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
  const canEditMoveAssignment = !!dossier.move && ['À planifier', 'Programmé'].includes(dossier.move.status);

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
      dueDate: taskDueDate || undefined,
      priority: taskPriority
    });
    setTaskTitle('');
    setTaskDueDate('');
    setTaskPriority('normal');
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-slate-950/35 backdrop-blur-sm">
      <button type="button" className="hidden md:block flex-1 cursor-default" onClick={onClose} aria-label="Fermer le dossier" />

      <aside className="w-full md:max-w-2xl h-full bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_58%,#fff7ed_100%)] dark:bg-slate-950 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/75 dark:border-slate-800 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${riskClass}`}>
                <AlertCircle size={12} />
                {stage?.label || 'Dossier'}
              </span>
              <h2 className="text-xl font-black text-brand-950 dark:text-white mt-3 tracking-tight truncate">{dossier.clientName}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {dossier.fromCity || 'Départ à préciser'} → {dossier.toCity || 'Arrivée à préciser'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/75 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-sm"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
            <div className="bg-white/90 dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-3 shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Montant</span>
              <p className="font-black text-brand-950 dark:text-white mt-1">{dossier.amount.toLocaleString('fr-FR')} €</p>
            </div>
            <div className="bg-white/90 dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-3 shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Avancement</span>
              <p className="font-black text-brand-950 dark:text-white mt-1">{dossier.completion}%</p>
            </div>
            <div className="bg-white/90 dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-3 shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Tâches</span>
              <p className="font-black text-brand-950 dark:text-white mt-1">{openTaskCount} ouvertes</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <User size={14} className="text-accent" />
                Responsable
              </div>
              <select
                value={dossier.owner}
                onChange={(event) => onAssignOwner(dossier.key, event.target.value)}
                className="mt-3 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-accent"
              >
                {ownerOptions.map((owner) => (
                  <option key={owner} value={owner}>{owner}</option>
                ))}
              </select>
            </div>

            <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                <ClipboardList size={14} className="text-accent" />
                Action prioritaire
              </div>
              <p className="mt-3 text-sm font-black text-brand-950 dark:text-white">{dossier.nextAction}</p>
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
                className="mt-4 w-full bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover text-white dark:text-brand-950 rounded-xl px-3 py-2 text-xs font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {primaryWorkflowAction?.label || primaryActionLabel}
                <ArrowRight size={14} />
              </button>
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

          <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <ClockDot /> Timeline
            </h3>
            <div className="mt-4 space-y-3">
              {timelineItems.map((item) => (
                <div key={`${item.label}-${item.id}`} className="flex gap-3">
                  <div className="mt-1 w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-black text-brand-950 dark:text-white">{item.label}</p>
                      <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.meta}</p>
                    <span className="inline-flex mt-2 px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-500">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              {timelineItems.length === 0 && (
                <p className="text-xs text-slate-500">Aucun jalon métier rattaché pour le moment.</p>
              )}
            </div>
          </section>

          <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FolderOpen size={14} className="text-accent" />
              Pièces liées
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkedDocuments.map((document) => (
                <button
                  key={document.reference}
                  type="button"
                  disabled={!canNavigate(document.tab)}
                  onClick={() => onNavigate(document.tab)}
                  className="text-left bg-white/75 dark:bg-slate-950/40 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-3 hover:border-accent disabled:opacity-50 disabled:hover:border-slate-100 dark:disabled:hover:border-slate-800 transition-colors"
                >
                  <p className="text-xs font-black text-brand-950 dark:text-white">{document.label}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{document.reference} · {document.status}</p>
                </button>
              ))}
              {linkedDocuments.length === 0 && (
                <p className="text-xs text-slate-500">Aucune pièce rattachée.</p>
              )}
            </div>
          </section>

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

          <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <StickyNote size={14} className="text-accent" />
              Notes internes
            </h3>
            <form onSubmit={submitNote} className="mt-4 space-y-2">
              <textarea
                value={noteContent}
                onChange={(event) => setNoteContent(event.target.value)}
                placeholder="Ajouter une note interne"
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent resize-none"
              />
              <button
                type="submit"
                disabled={!noteContent.trim()}
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl px-3 py-2 text-xs font-black disabled:opacity-50"
              >
                Enregistrer la note
              </button>
            </form>

            <div className="mt-4 space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-black text-slate-500 truncate">{note.author}</p>
                    <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">{note.content}</p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-xs text-slate-500">Aucune note interne enregistrée.</p>
              )}
            </div>
          </section>

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
