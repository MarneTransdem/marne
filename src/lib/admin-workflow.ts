import type { AdminTab } from './admin-permissions';
import type { ClientDossier, DossierStage } from './admin-dossiers';

export interface AdminWorkflowStep {
  id: DossierStage;
  label: string;
  shortLabel: string;
  tab: AdminTab;
  actionLabel: string;
}

export interface AdminWorkflowMetric extends AdminWorkflowStep {
  count: number;
  amount: number;
  urgentCount: number;
}

export const ADMIN_WORKFLOW_STEPS: AdminWorkflowStep[] = [
  { id: 'demande', label: 'Demande', shortLabel: 'Demande', tab: 'demandes', actionLabel: 'Qualifier' },
  { id: 'visite', label: 'Visite', shortLabel: 'Visite', tab: 'visites', actionLabel: 'Planifier' },
  { id: 'devis', label: 'Devis', shortLabel: 'Devis', tab: 'devis', actionLabel: 'Envoyer' },
  { id: 'facturation', label: 'Facture', shortLabel: 'Facture', tab: 'factures', actionLabel: 'Encaisser' },
  { id: 'planning', label: 'Planning', shortLabel: 'Planning', tab: 'planning', actionLabel: 'Affecter' },
  { id: 'intervention', label: 'Mission', shortLabel: 'Mission', tab: 'planning', actionLabel: 'Suivre' },
  { id: 'termine', label: 'Clôture', shortLabel: 'Clôture', tab: 'planning', actionLabel: 'Archiver' }
];

const RISK_SCORE: Record<ClientDossier['risk'], number> = {
  urgent: 0,
  attention: 1,
  normal: 2
};

const normalizeWorkflowText = (value: string) =>
  value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function getWorkflowStep(stage: DossierStage): AdminWorkflowStep | undefined {
  return ADMIN_WORKFLOW_STEPS.find((item) => item.id === stage);
}

export function getDossierPrimaryActionLabel(dossier: Pick<ClientDossier, 'nextAction'>, fallback = 'Action') {
  const action = normalizeWorkflowText(dossier.nextAction);
  if (action.includes('realiser')) return 'Réaliser';
  if (action.includes('qualifier')) return 'Qualifier';
  if (action.includes('finaliser')) return 'Finaliser';
  if (action.includes('relancer')) return 'Relancer';
  if (action.includes('facture') || action.includes('reglement')) return 'Facturer';
  if (action.includes('affecter')) return 'Affecter';
  if (action.includes('preparer')) return 'Préparer';
  if (action.includes('suivre')) return 'Suivre';
  if (action.includes('cloturer') || action.includes('archive')) return 'Clôturer';
  return fallback;
}

export function getDossierActionTab(dossier: Pick<ClientDossier, 'stage'>): AdminTab | null {
  return getWorkflowStep(dossier.stage)?.tab ?? null;
}

export function getWorkflowMetrics(dossiers: ClientDossier[]): AdminWorkflowMetric[] {
  return ADMIN_WORKFLOW_STEPS.map((step) => {
    const stepDossiers = dossiers.filter((dossier) => dossier.stage === step.id);
    return {
      ...step,
      count: stepDossiers.length,
      amount: stepDossiers.reduce((sum, dossier) => sum + dossier.amount, 0),
      urgentCount: stepDossiers.filter((dossier) => dossier.risk !== 'normal').length
    };
  });
}

export function getPriorityDossiers(dossiers: ClientDossier[], limit = 5): ClientDossier[] {
  return [...dossiers]
    .filter((dossier) => dossier.stage !== 'termine')
    .sort((a, b) => {
      const riskDiff = RISK_SCORE[a.risk] - RISK_SCORE[b.risk];
      if (riskDiff !== 0) return riskDiff;
      const progressDiff = a.completion - b.completion;
      if (progressDiff !== 0) return progressDiff;
      return a.clientName.localeCompare(b.clientName);
    })
    .slice(0, limit);
}
