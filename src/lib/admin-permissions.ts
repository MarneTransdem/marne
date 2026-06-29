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
  | 'simulateur'
  | 'analytics'
  | 'profil'
  | 'parametres';

export type AdminCollection =
  | 'quotes'
  | 'devis'
  | 'factures'
  | 'visites'
  | 'demenagements'
  | 'dossierNotes'
  | 'dossierTasks'
  | 'dossierOwners'
  | 'notification_templates'
  | 'collaborateurs'
  | 'movers'
  | 'trucks';

export type ModuleAccess = {
  grantedTabs?: AdminTab[];
  revokedTabs?: AdminTab[];
};

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
    desktop: 'Factures & Trésorerie',
    mobile: 'Tréso.',
    title: 'Factures & Trésorerie'
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
  },
  analytics: {
    desktop: 'Analyses & Stats',
    mobile: 'Stats',
    title: 'Statistiques & Performance'
  },
  profil: {
    desktop: 'Mon profil',
    mobile: 'Profil',
    title: 'Mon Profil CRM'
  },
  parametres: {
    desktop: 'Paramètres',
    mobile: 'Param.',
    title: 'Paramètres CRM'
  }
};

const ADMIN_TAB_ORDER: AdminTab[] = [
  'overview',
  'dossiers',
  'demandes',
  'devis',
  'factures',
  'visites',
  'planning',
  'collaborateurs',
  'simulateur',
  'analytics',
  'profil',
  'parametres'
];

export const MANAGEABLE_ADMIN_TABS: AdminTab[] = [
  'overview',
  'dossiers',
  'demandes',
  'devis',
  'factures',
  'visites',
  'planning',
  'simulateur',
  'analytics'
];

const ROLE_TABS: Record<Role, AdminTab[]> = {
  gérant: ['overview', 'dossiers', 'demandes', 'devis', 'factures', 'visites', 'planning', 'collaborateurs', 'analytics', 'profil', 'parametres'],
  secrétaire: ['dossiers', 'demandes', 'devis', 'factures', 'visites', 'planning', 'profil', 'parametres'],
  commercial: ['dossiers', 'demandes', 'visites', 'planning', 'simulateur', 'profil', 'parametres'],
  chef_equipe: ['dossiers', 'planning', 'profil', 'parametres']
};

const ROLE_COLLECTIONS: Record<Role, AdminCollection[]> = {
  gérant: ['quotes', 'devis', 'factures', 'visites', 'demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'notification_templates', 'collaborateurs', 'movers', 'trucks'],
  secrétaire: ['quotes', 'devis', 'factures', 'visites', 'demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'notification_templates', 'movers', 'trucks'],
  commercial: ['quotes', 'devis', 'visites', 'demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'notification_templates', 'movers', 'trucks'],
  chef_equipe: ['demenagements', 'dossierNotes', 'dossierTasks', 'dossierOwners', 'notification_templates', 'movers', 'trucks']
};

function isAdminTab(value: unknown): value is AdminTab {
  return typeof value === 'string' && ADMIN_TAB_ORDER.includes(value as AdminTab);
}

function uniqueTabs(values: unknown): AdminTab[] {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values.filter(isAdminTab)));
}

export function normalizeModuleAccess(access?: Partial<ModuleAccess> | null): ModuleAccess {
  const grantedTabs = uniqueTabs(access?.grantedTabs).filter(tab => MANAGEABLE_ADMIN_TABS.includes(tab));
  const revokedTabs = uniqueTabs(access?.revokedTabs).filter(tab => MANAGEABLE_ADMIN_TABS.includes(tab));

  return {
    grantedTabs,
    revokedTabs: revokedTabs.filter(tab => !grantedTabs.includes(tab))
  };
}

export function getBaseAccessibleTabs(role: Role | null | undefined): AdminTab[] {
  return role ? ROLE_TABS[role] ?? [] : [];
}

export function getAccessibleTabs(role: Role | null | undefined, moduleAccess?: Partial<ModuleAccess> | null): AdminTab[] {
  if (!role) return [];
  if (role === 'gérant') return [...ROLE_TABS.gérant];

  const normalizedAccess = normalizeModuleAccess(moduleAccess);
  const tabs = new Set<AdminTab>(getBaseAccessibleTabs(role));

  normalizedAccess.grantedTabs?.forEach(tab => tabs.add(tab));
  normalizedAccess.revokedTabs?.forEach(tab => {
    if (tab !== 'profil') tabs.delete(tab);
  });

  tabs.add('profil');
  return ADMIN_TAB_ORDER.filter(tab => tabs.has(tab));
}

export function canAccessTab(role: Role | null | undefined, tab: AdminTab, moduleAccess?: Partial<ModuleAccess> | null): boolean {
  return getAccessibleTabs(role, moduleAccess).includes(tab);
}

export function setModuleAccessForTab(
  role: Role | null | undefined,
  currentAccess: Partial<ModuleAccess> | null | undefined,
  tab: AdminTab,
  enabled: boolean
): ModuleAccess {
  const normalizedAccess = normalizeModuleAccess(currentAccess);
  const baseHasTab = getBaseAccessibleTabs(role).includes(tab);
  const grantedTabs = new Set(normalizedAccess.grantedTabs);
  const revokedTabs = new Set(normalizedAccess.revokedTabs);

  if (enabled) {
    revokedTabs.delete(tab);
    if (!baseHasTab) grantedTabs.add(tab);
  } else {
    grantedTabs.delete(tab);
    if (baseHasTab) revokedTabs.add(tab);
  }

  return normalizeModuleAccess({
    grantedTabs: Array.from(grantedTabs),
    revokedTabs: Array.from(revokedTabs)
  });
}

export function getModuleAccessState(role: Role | null | undefined, currentAccess: Partial<ModuleAccess> | null | undefined, tab: AdminTab) {
  const normalizedAccess = normalizeModuleAccess(currentAccess);
  const baseEnabled = getBaseAccessibleTabs(role).includes(tab);
  const granted = normalizedAccess.grantedTabs?.includes(tab) ?? false;
  const revoked = normalizedAccess.revokedTabs?.includes(tab) ?? false;
  const enabled = granted || (baseEnabled && !revoked);

  return {
    enabled,
    baseEnabled,
    granted,
    revoked
  };
}

export function canAccessCollection(
  role: Role | null | undefined,
  collectionName: AdminCollection,
  moduleAccess?: Partial<ModuleAccess> | null
): boolean {
  if (!role) return false;
  if (role === 'gérant') return true;

  if (collectionName === 'factures') return canAccessTab(role, 'factures', moduleAccess);
  if (collectionName === 'quotes') return canAccessTab(role, 'demandes', moduleAccess);
  if (collectionName === 'devis') return canAccessTab(role, 'devis', moduleAccess);
  if (collectionName === 'visites') return canAccessTab(role, 'visites', moduleAccess);
  if (collectionName === 'demenagements') return canAccessTab(role, 'planning', moduleAccess);
  if (collectionName === 'movers' || collectionName === 'trucks') return canAccessTab(role, 'planning', moduleAccess);
  if (collectionName === 'dossierNotes' || collectionName === 'dossierTasks' || collectionName === 'dossierOwners') return canAccessTab(role, 'dossiers', moduleAccess);
  if (collectionName === 'notification_templates') return canAccessTab(role, 'dossiers', moduleAccess);
  if (collectionName === 'collaborateurs') return canAccessTab(role, 'collaborateurs', moduleAccess);

  return ROLE_COLLECTIONS[role]?.includes(collectionName) ?? false;
}
