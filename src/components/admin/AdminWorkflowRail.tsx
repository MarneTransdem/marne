import React, { useMemo } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  Eye,
  FileText,
  FolderOpen,
  MapPin,
  Route,
  Truck
} from 'lucide-react';
import type { AdminTab } from '../../lib/admin-permissions';
import type { ClientDossier, DossierStage } from '../../lib/admin-dossiers';
import {
  ADMIN_WORKFLOW_STEPS,
  getDossierPrimaryActionLabel,
  getPriorityDossiers,
  getWorkflowMetrics,
  getWorkflowStep
} from '../../lib/admin-workflow';

interface AdminWorkflowRailProps {
  dossiers: ClientDossier[];
  activeStage: DossierStage | 'all';
  availableTabs: AdminTab[];
  onSelectStage: (stage: DossierStage | 'all') => void;
  onOpenDossier: (dossierKey: string) => void;
  onNavigate: (tab: AdminTab) => void;
  onRunPrimaryAction?: (dossier: ClientDossier) => void;
}

const STAGE_ICONS: Record<DossierStage, React.ReactNode> = {
  demande: <FolderOpen size={16} />,
  visite: <MapPin size={16} />,
  devis: <FileText size={16} />,
  facturation: <CreditCard size={16} />,
  planning: <Calendar size={16} />,
  intervention: <Truck size={16} />,
  termine: <CheckCircle2 size={16} />
};

const RISK_CLASSES: Record<ClientDossier['risk'], string> = {
  urgent: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40',
  attention: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40',
  normal: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/40'
};

export function AdminWorkflowRail({
  dossiers,
  activeStage,
  availableTabs,
  onSelectStage,
  onOpenDossier,
  onNavigate,
  onRunPrimaryAction
}: AdminWorkflowRailProps) {
  const metrics = useMemo(() => getWorkflowMetrics(dossiers), [dossiers]);
  const priorityDossiers = useMemo(() => getPriorityDossiers(dossiers, 4), [dossiers]);
  const openDossierCount = dossiers.filter((dossier) => dossier.stage !== 'termine').length;
  const totalAmount = dossiers.reduce((sum, dossier) => sum + dossier.amount, 0);

  const navigateToStep = (stage: DossierStage) => {
    const step = getWorkflowStep(stage);
    if (!step) return;
    if (availableTabs.includes(step.tab)) {
      onNavigate(step.tab);
    } else {
      onSelectStage(stage);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent">
            <Route size={14} />
            Flux opérationnel
          </div>
          <h2 className="mt-2 text-xl md:text-2xl font-black tracking-tight text-brand-950 dark:text-white">
            {openDossierCount} dossiers ouverts
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:flex gap-2 text-xs">
          <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 px-4 py-3 shadow-sm">
            <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Pipeline</span>
            <strong className="mt-1 block text-brand-950 dark:text-white">{totalAmount.toLocaleString('fr-FR')} €</strong>
          </div>
          <button
            type="button"
            onClick={() => onSelectStage('all')}
            className={`rounded-2xl border px-4 py-3 text-left transition-all active:scale-95 ${
              activeStage === 'all'
                ? 'bg-brand-900 text-white border-brand-900 shadow-sm dark:bg-accent dark:text-brand-950 dark:border-accent'
                : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/75 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-accent/50 hover:shadow-sm'
            }`}
          >
            <span className="block text-[9px] font-black uppercase tracking-wider opacity-70">Vue</span>
            <strong className="mt-1 block">Tous</strong>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {metrics.map((metric) => {
          const isActive = activeStage === metric.id;
          return (
            <button
              key={metric.id}
              type="button"
              onClick={() => onSelectStage(metric.id)}
              className={`min-h-[132px] rounded-2xl border p-4 text-left transition-all active:scale-[0.98] ${
                isActive
                  ? 'bg-brand-900 text-white border-brand-900 shadow-md dark:bg-accent dark:text-brand-950 dark:border-accent'
                  : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/75 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-accent/50 hover:shadow-sm hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${isActive ? 'bg-white/15' : 'bg-slate-100 dark:bg-slate-800 text-accent'}`}>
                  {STAGE_ICONS[metric.id]}
                </span>
                {metric.urgentCount > 0 && (
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-black ${isActive ? 'bg-white/15 text-white dark:text-brand-950' : 'bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300'}`}>
                    <AlertCircle size={10} />
                    {metric.urgentCount}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="block truncate text-[10px] font-black uppercase tracking-wider opacity-70">{metric.shortLabel}</span>
                <strong className="mt-1 block text-2xl font-black leading-none">{metric.count}</strong>
                <span className="mt-2 block truncate text-[10px] font-bold opacity-70">{metric.actionLabel}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">À traiter maintenant</span>
            <h3 className="mt-1 text-sm font-black text-brand-950 dark:text-white">Prochaines actions dossiers</h3>
          </div>
          <button
            type="button"
            onClick={() => onSelectStage('all')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200/75 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-100 transition-all active:scale-95"
          >
            Tous les dossiers
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {priorityDossiers.map((dossier) => {
            const step = getWorkflowStep(dossier.stage);
            const primaryActionLabel = getDossierPrimaryActionLabel(dossier, step?.actionLabel || 'Action');
            return (
              <div key={dossier.key} className="py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${RISK_CLASSES[dossier.risk]}`}>
                      {STAGE_ICONS[dossier.stage]}
                      {step?.label || 'Dossier'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{dossier.completion}%</span>
                  </div>
                  <div className="mt-2">
                    <h4 className="truncate text-sm font-black text-brand-950 dark:text-white">{dossier.clientName}</h4>
                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{dossier.nextAction}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                      <span className="truncate">Resp. {dossier.owner}</span>
                      {dossier.date && <span>{dossier.date}</span>}
                      {(dossier.fromCity || dossier.toCity) && (
                        <span className="truncate">
                          {[dossier.fromCity, dossier.toCity].filter(Boolean).join(' - ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenDossier(dossier.key)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200/75 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-100 transition-all active:scale-95"
                  >
                    <Eye size={13} />
                    Ouvrir
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (onRunPrimaryAction) {
                        onRunPrimaryAction(dossier);
                      } else {
                        navigateToStep(dossier.stage);
                      }
                    }}
                    title={dossier.nextAction}
                    aria-label={`${dossier.nextAction} - ${dossier.clientName}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white dark:text-brand-950 transition-all active:scale-95"
                  >
                    {primaryActionLabel}
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}

          {priorityDossiers.length === 0 && (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto text-emerald-500" size={28} />
              <p className="mt-3 text-sm font-black text-slate-600 dark:text-slate-300">Aucun dossier ouvert.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
