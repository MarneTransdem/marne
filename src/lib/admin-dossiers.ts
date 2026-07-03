import type { Demenagement, Devis, Facture, Visite } from '../types';

export type DossierStage = 'demande' | 'visite' | 'devis' | 'facturation' | 'planning' | 'intervention' | 'termine';

export interface AdminPublicRequest {
  id?: string;
  dossierId?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  fromAddress?: string;
  fromCity?: string;
  fromZip?: string;
  toAddress?: string;
  toCity?: string;
  toZip?: string;
  date?: string;
  volume?: string | number;
  formula?: string;
  visitPreference?: 'domicile' | 'visio' | 'a_definir' | string;
  needsLift?: string;
  needsPacking?: string;
  needsStorage?: string;
  status?: 'Nouveau' | 'Visite_planifiée' | 'Étudié_Converti' | 'Archivé' | string;
  plannedVisitId?: string;
  convertedDevisId?: string;
  createdAt?: unknown;
}

export interface ClientDossier {
  key: string;
  dossierId: string;
  clientName: string;
  phone?: string;
  fromCity?: string;
  toCity?: string;
  date?: string;
  amount: number;
  stage: DossierStage;
  completion: number;
  nextAction: string;
  owner: string;
  risk: 'normal' | 'attention' | 'urgent';
  request?: AdminPublicRequest;
  quote?: Devis;
  invoice?: Facture;
  visit?: Visite;
  move?: Demenagement;
}

export interface DossierNote {
  id: string;
  dossierId?: string;
  dossierKey: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface DossierTask {
  id: string;
  dossierId?: string;
  dossierKey: string;
  title: string;
  owner: string;
  dueDate?: string;
  priority: 'normal' | 'urgent';
  done: boolean;
  createdAt: string;
  source?: 'manual' | 'today_action';
  sourceActionId?: string;
  sourceIssueKind?: string;
  sourceLabel?: string;
}

export interface DossierOwnerAssignment {
  id: string;
  dossierId?: string;
  dossierKey: string;
  owner: string;
  updatedAt: string;
}

export type DossierEventType = 'workflow' | 'communication' | 'assignment' | 'note' | 'task' | 'system';
export type DossierEventStatus = 'success' | 'warning' | 'error' | 'info';

export interface DossierEvent {
  id: string;
  dossierId?: string;
  dossierKey: string;
  type: DossierEventType;
  title: string;
  description?: string;
  status: DossierEventStatus;
  actor?: string;
  createdAt: string;
  documentType?: 'demande' | 'visite' | 'devis' | 'facture' | 'demenagement';
  documentId?: string;
  channel?: 'Email' | 'SMS' | 'Both' | 'Internal';
  recipient?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export const DOSSIER_STAGES: Array<{ key: DossierStage; label: string; shortLabel: string }> = [
  { key: 'demande', label: 'Demande', shortLabel: 'Dem.' },
  { key: 'visite', label: 'Visite', shortLabel: 'Visit.' },
  { key: 'devis', label: 'Devis', shortLabel: 'Devis' },
  { key: 'facturation', label: 'Facturation', shortLabel: 'Fact.' },
  { key: 'planning', label: 'Planning', shortLabel: 'Plan.' },
  { key: 'intervention', label: 'Intervention', shortLabel: 'Inter.' },
  { key: 'termine', label: 'Terminé', shortLabel: 'OK' }
];

export const DOSSIER_PROGRESS: Record<DossierStage, number> = {
  demande: 10,
  visite: 25,
  devis: 45,
  facturation: 62,
  planning: 78,
  intervention: 90,
  termine: 100
};
