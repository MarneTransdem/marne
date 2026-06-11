import type { Role } from '../types';

export type AdminTab =
  | 'overview'
  | 'dossiers'
  | 'demandes'
  | 'devis'
  | 'factures'
  | 'visites'
  | 'planning'
  | 'collaborateurs'
  | 'simulateur';

export type AdminCollection =
  | 'quotes'
  | 'devis'
  | 'factures'
  | 'visites'
  | 'demenagements'
  | 'dossierNotes'
  | 'dossierTasks'
  | 'dossierOwners'
  | 'collaborateurs'
  | 'movers'
  | 'trucks';

export const ADMIN_TAB_LABELS: Record<AdminTab, { desktop: string; mobile: string; title: string }> = {
  overview: {
    desktop: "Vue d'ensemble",
    mobile: 'Vue',
    title: 'Tableau de Bord'
  },
  dossiers: {
    desktop: 'Dossiers clients',
    mobile: 'Dossiers',
    title: 'Dossiers Clients'
  },
  demandes: {
    desktop: 'Demandes publiques',
    mobile: 'Demandes',
    title: 'Demandes Clients (Web)'
  },
  devis: {
    desktop: 'Devis clients',
    mobile: 'Devis',
    title: 'Gestion des Devis'
  },
  factures: {
    desktop: 'Factures & Règl.',
    mobile: 'Fact.',
    title: 'Factures & Règl.'
  },
  visites: {
    desktop: 'Visites techniques',
    mobile: 'Visites',
    title: 'Visites Techniques'
  },
  planning: {
    desktop: 'Plannings des équipes',
    mobile: 'Plan',
    title: 'Plannings Logistiques'
  },
  collaborateurs: {
    desktop: 'Liste équipe',
    mobile: 'Équipe',
    title: 'Liste Équipe'
  },
  simulateur: {
    desktop: 'Calcul volume rapide',
    mobile: 'Simul.',
    title: 'Calculateur Volume'
  }
};

const ROLE_TABS: Record<Role, AdminTab[]> = {
  gérant: ['overview', 'dossiers', 'demandes', 'devis', 'factures', 'visites', 'planning', 'collaborateurs'],
  secrétaire: ['dossiers', 'demandes', 'devis', 'factures', 'visites', 'planning'],
  commercial: ['dossiers', 'demandes', 'visites', 'planning', 'simulateur'],
  chef_equipe: ['dossiers', 'planning']
};

const ROLE_COLLECTIONS: Record<Role, AdminCollection[]> = {
  gérant: ['quotes', 'devis', 'factures', 'visites', 'demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'collaborateurs', 'movers', 'trucks'],
  secrétaire: ['quotes', 'devis', 'factures', 'visites', 'demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'movers', 'trucks'],
  commercial: ['quotes', 'devis', 'visites', 'demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'movers', 'trucks'],
  chef_equipe: ['demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'movers', 'trucks']
};

export function getAccessibleTabs(role: Role | null | undefined): AdminTab[] {
  return role ? ROLE_TABS[role] ?? [] : [];
}

export function canAccessTab(role: Role | null | undefined, tab: AdminTab): boolean {
  return getAccessibleTabs(role).includes(tab);
}

export function canAccessCollection(
  role: Role | null | undefined,
  collectionName: AdminCollection
): boolean {
  return role ? ROLE_COLLECTIONS[role]?.includes(collectionName) ?? false : false;
}
