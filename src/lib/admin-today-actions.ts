import type { ClientDossier, DossierTask } from './admin-dossiers';
import {
  analyzeDossierQuality,
  type DossierQualityIssue,
  type DossierQualityIssueKind,
  type DossierQualitySummary
} from './admin-dossier-quality';

export type TodayActionTone = 'critical' | 'warning' | 'info';
export type TodayActionRole = 'gerant' | 'secretaire' | 'commercial' | 'chef_equipe' | 'admin' | 'all';

export interface TodayAction {
  id: string;
  dossierKey: string;
  dossierId: string;
  clientName: string;
  stage: ClientDossier['stage'];
  owner: string;
  issueKind: DossierQualityIssueKind;
  title: string;
  description: string;
  cta: string;
  route: string;
  tone: TodayActionTone;
  score: number;
  taskTitle: string;
  dueDate: string;
  priority: DossierTask['priority'];
  alreadyTasked: boolean;
  quality: DossierQualitySummary;
}

interface BuildTodayActionsInput {
  dossiers: ClientDossier[];
  tasks?: DossierTask[];
  role?: string | null;
  maxActions?: number;
  now?: Date;
}

const ALL_ISSUES: DossierQualityIssueKind[] = [
  'missing_email',
  'missing_phone',
  'missing_route',
  'missing_date',
  'missing_volume',
  'unassigned_owner',
  'quote_to_send',
  'quote_to_follow_up',
  'quote_expiring',
  'invoice_to_send',
  'invoice_overdue',
  'planning_incomplete',
  'move_soon'
];

const ROLE_ISSUES: Record<TodayActionRole, DossierQualityIssueKind[]> = {
  all: ALL_ISSUES,
  admin: ALL_ISSUES,
  gerant: ALL_ISSUES,
  secretaire: [
    'missing_email',
    'unassigned_owner',
    'quote_to_send',
    'quote_to_follow_up',
    'quote_expiring',
    'invoice_to_send',
    'invoice_overdue',
    'missing_phone'
  ],
  commercial: [
    'missing_phone',
    'missing_email',
    'missing_route',
    'missing_date',
    'missing_volume',
    'quote_to_send',
    'quote_to_follow_up',
    'quote_expiring',
    'unassigned_owner'
  ],
  chef_equipe: [
    'planning_incomplete',
    'move_soon',
    'missing_route',
    'missing_date',
    'missing_volume'
  ]
};

const ISSUE_META: Record<DossierQualityIssueKind, { title: string; cta: string; route: string; taskPrefix: string }> = {
  missing_email: {
    title: 'Email client manquant',
    cta: 'Completer',
    route: '/admin/dossiers',
    taskPrefix: 'Completer email client'
  },
  missing_phone: {
    title: 'Telephone client manquant',
    cta: 'Completer',
    route: '/admin/dossiers',
    taskPrefix: 'Completer telephone client'
  },
  missing_route: {
    title: 'Trajet incomplet',
    cta: 'Controler',
    route: '/admin/dossiers',
    taskPrefix: 'Completer trajet dossier'
  },
  missing_date: {
    title: 'Date a renseigner',
    cta: 'Planifier',
    route: '/admin/dossiers',
    taskPrefix: 'Renseigner date dossier'
  },
  missing_volume: {
    title: 'Volume a confirmer',
    cta: 'Verifier',
    route: '/admin/dossiers',
    taskPrefix: 'Verifier volume dossier'
  },
  unassigned_owner: {
    title: 'Responsable a assigner',
    cta: 'Assigner',
    route: '/admin/dossiers',
    taskPrefix: 'Assigner responsable dossier'
  },
  quote_to_send: {
    title: 'Devis a envoyer',
    cta: 'Envoyer',
    route: '/admin/devis',
    taskPrefix: 'Envoyer devis client'
  },
  quote_to_follow_up: {
    title: 'Devis a relancer',
    cta: 'Relancer',
    route: '/admin/devis',
    taskPrefix: 'Relancer devis client'
  },
  quote_expiring: {
    title: 'Devis expire bientot',
    cta: 'Relancer',
    route: '/admin/devis',
    taskPrefix: 'Relancer devis avant expiration'
  },
  invoice_to_send: {
    title: 'Facture a envoyer',
    cta: 'Envoyer',
    route: '/admin/factures',
    taskPrefix: 'Envoyer facture client'
  },
  invoice_overdue: {
    title: 'Facture en retard',
    cta: 'Relancer',
    route: '/admin/factures',
    taskPrefix: 'Relancer paiement facture'
  },
  planning_incomplete: {
    title: 'Planning incomplet',
    cta: 'Affecter',
    route: '/admin/planning',
    taskPrefix: 'Affecter equipe et camion'
  },
  move_soon: {
    title: 'Intervention proche',
    cta: 'Controler',
    route: '/admin/planning',
    taskPrefix: 'Controler dossier avant intervention'
  }
};

const normalize = (value: unknown) => String(value ?? '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const normalizeRole = (role?: string | null): TodayActionRole => {
  const normalized = normalize(role);
  if (!normalized) return 'all';
  if (normalized.includes('secret')) return 'secretaire';
  if (normalized.includes('commercial')) return 'commercial';
  if (normalized.includes('chef')) return 'chef_equipe';
  if (normalized.includes('gerant')) return 'gerant';
  if (normalized.includes('admin')) return 'admin';
  return 'all';
};

const toIsoDate = (date: Date) => date.toISOString().split('T')[0];

const addDays = (base: Date, days: number) => {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
};

const getIssueForRole = (quality: DossierQualitySummary, role: TodayActionRole) => {
  const allowed = ROLE_ISSUES[role] || ROLE_ISSUES.all;
  return quality.issues.find((issue) => allowed.includes(issue.kind)) || null;
};

const getTone = (quality: DossierQualitySummary, issue: DossierQualityIssue): TodayActionTone => {
  if (issue.severity === 'blocking' || quality.score >= 85) return 'critical';
  if (issue.severity === 'warning' || quality.score >= 45) return 'warning';
  return 'info';
};

const getTaskTitle = (issue: DossierQualityIssue, dossier: ClientDossier) => {
  const meta = ISSUE_META[issue.kind];
  return `${meta.taskPrefix} - ${dossier.clientName}`;
};


export const hasOpenTaskForTodayAction = (tasks: DossierTask[] = [], action: Pick<TodayAction, 'id' | 'dossierKey' | 'dossierId' | 'clientName' | 'issueKind' | 'taskTitle'>) => {
  const keys = new Set([
    normalize(action.dossierKey),
    normalize(action.dossierId),
    normalize(action.clientName)
  ].filter(Boolean));
  const normalizedActionId = normalize(action.id);
  const normalizedIssueKind = normalize(action.issueKind);
  const normalizedTitle = normalize(action.taskTitle);

  return tasks.some((task) => {
    if (task.done) return false;
    if (task.source === 'today_action' && normalize(task.sourceActionId) === normalizedActionId) return true;

    const taskKey = normalize(task.dossierId || task.dossierKey);
    if (!keys.has(taskKey)) return false;
    if (task.source === 'today_action' && normalize(task.sourceIssueKind) === normalizedIssueKind) return true;

    return normalize(task.title) === normalizedTitle;
  });
};

export const buildTodayActions = ({
  dossiers,
  tasks = [],
  role,
  maxActions = 12,
  now = new Date()
}: BuildTodayActionsInput): TodayAction[] => {
  const normalizedRole = normalizeRole(role);
  const today = toIsoDate(now);
  const tomorrow = toIsoDate(addDays(now, 1));

  return dossiers
    .filter((dossier) => dossier.stage !== 'termine')
    .map((dossier) => {
      const quality = analyzeDossierQuality(dossier);
      const issue = getIssueForRole(quality, normalizedRole);
      if (!issue) return null;

      const meta = ISSUE_META[issue.kind];
      const tone = getTone(quality, issue);
      const taskTitle = getTaskTitle(issue, dossier);
      const priority: DossierTask['priority'] = tone === 'critical' ? 'urgent' : 'normal';
      const dueDate = tone === 'critical' ? today : tomorrow;
      const action: TodayAction = {
        id: `${dossier.key}-${issue.kind}`,
        dossierKey: dossier.key,
        dossierId: dossier.dossierId,
        clientName: dossier.clientName,
        stage: dossier.stage,
        owner: dossier.owner,
        issueKind: issue.kind,
        title: meta.title,
        description: issue.detail,
        cta: meta.cta,
        route: meta.route,
        tone,
        score: quality.score,
        taskTitle,
        dueDate,
        priority,
        alreadyTasked: false,
        quality
      };

      return {
        ...action,
        alreadyTasked: hasOpenTaskForTodayAction(tasks, action)
      };
    })
    .filter((action): action is TodayAction => Boolean(action))
    .sort((a, b) => {
      const toneWeight: Record<TodayActionTone, number> = { critical: 0, warning: 1, info: 2 };
      const toneDelta = toneWeight[a.tone] - toneWeight[b.tone];
      if (toneDelta !== 0) return toneDelta;
      if (a.alreadyTasked !== b.alreadyTasked) return a.alreadyTasked ? 1 : -1;
      if (b.score !== a.score) return b.score - a.score;
      return a.clientName.localeCompare(b.clientName, 'fr');
    })
    .slice(0, maxActions);
};

export const summarizeTodayActions = (actions: TodayAction[]) => ({
  total: actions.length,
  critical: actions.filter((action) => action.tone === 'critical').length,
  warning: actions.filter((action) => action.tone === 'warning').length,
  alreadyTasked: actions.filter((action) => action.alreadyTasked).length,
  openToCreate: actions.filter((action) => !action.alreadyTasked).length
});