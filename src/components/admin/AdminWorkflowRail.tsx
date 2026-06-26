import React, { useMemo } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  FolderOpen,
  MapPin,
  Route,
  Truck
} from 'lucide-react';
import type { AdminTab } from '../../lib/admin-permissions';
import type { ClientDossier, DossierStage } from '../../lib/admin-dossiers';
import {
  getWorkflowMetrics
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

export function AdminWorkflowRail({
  dossiers,
  activeStage,
  onSelectStage
}: AdminWorkflowRailProps) {
  const metrics = useMemo(() => getWorkflowMetrics(dossiers), [dossiers]);
  const openDossierCount = dossiers.filter((dossier) => dossier.stage !== 'termine').length;
  const totalAmount = dossiers.reduce((sum, dossier) => sum + dossier.amount, 0);

  return (
    <section className="rounded-xl border border-slate-200/75 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm p-4 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent">
            <Route size={14} />
            Flux opérationnel
          </div>
          <h2 className="mt-1 text-lg font-black tracking-tight text-brand-950 dark:text-white">
            {openDossierCount} dossiers ouverts
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:flex gap-2 text-xs">
          <div className="rounded-lg bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/75 dark:border-slate-800 px-4 py-3">
            <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Pipeline</span>
            <strong className="mt-1 block text-brand-950 dark:text-white">{totalAmount.toLocaleString('fr-FR')} €</strong>
          </div>
          <button
            type="button"
            onClick={() => onSelectStage('all')}
            className={`rounded-lg border px-4 py-3 text-left transition-all active:scale-95 ${
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
              className={`min-h-[104px] rounded-lg border p-3 text-left transition-all active:scale-[0.98] ${
                isActive
                  ? 'bg-brand-900 text-white border-brand-900 shadow-md dark:bg-accent dark:text-brand-950 dark:border-accent'
                  : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/75 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-accent/50 hover:shadow-sm hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-white/15' : 'bg-slate-100 dark:bg-slate-800 text-accent'}`}>
                  {STAGE_ICONS[metric.id]}
                </span>
                {metric.urgentCount > 0 && (
                  <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-black ${isActive ? 'bg-white/15 text-white dark:text-brand-950' : 'bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300'}`}>
                    <AlertCircle size={10} />
                    {metric.urgentCount}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <span className="block truncate text-[10px] font-black uppercase tracking-wider opacity-70">{metric.shortLabel}</span>
                <strong className="mt-1 block text-xl font-black leading-none">{metric.count}</strong>
                <span className="mt-1 block truncate text-[10px] font-bold opacity-70">{metric.actionLabel}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
