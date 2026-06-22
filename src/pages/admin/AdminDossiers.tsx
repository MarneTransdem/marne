import React, { useState, useMemo, useEffect } from 'react';
import { useSyncedCollection } from '../../hooks/useData';
import { useAuth } from '../../context/AuthContext';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Plus, Search, Mail, MessageSquare, Settings, FolderOpen,
  Users, Check, Save, RefreshCw, AlertTriangle, Calendar,
  ChevronLeft, ChevronRight, Info, FileText, CheckCircle2, Trash2, Edit3, Eye, LayoutList, Columns
} from 'lucide-react';
import type { Devis, Facture, Visite, Demenagement, UserProfile, FieldMover, FieldTruck, NotificationTemplate } from '../../types';
import {
  DOSSIER_STAGES,
  type ClientDossier,
  type DossierNote,
  type DossierTask,
  type AdminPublicRequest
} from '../../lib/admin-dossiers';
import { buildClientDossiers } from '../../lib/admin-dossier-engine';
import type { AdminTab } from '../../lib/admin-permissions';
import { AdminWorkflowRail } from '../../components/admin/AdminWorkflowRail';
import { ClientDossierDrawer, type ClientDossierWorkflowAction } from '../../components/admin/ClientDossierDrawer';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

const DOSSIER_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

type DossierPageSize = typeof DOSSIER_PAGE_SIZE_OPTIONS[number];
type DossierRiskFilter = 'all' | ClientDossier['risk'];
type DossierSortOption = 'priority' | 'date_asc' | 'amount_desc' | 'client_asc' | 'completion_asc';

const DOSSIER_RISK_WEIGHT: Record<ClientDossier['risk'], number> = {
  urgent: 0,
  attention: 1,
  normal: 2
};

const getDossierStageLabel = (stage: string) => (
  DOSSIER_STAGES.find((item) => item.key === stage)?.label || stage
);

const getDossierComparableDate = (dossier: ClientDossier) => {
  const rawDate =
    dossier.date ||
    dossier.move?.date ||
    dossier.visit?.date ||
    dossier.quote?.date ||
    dossier.request?.date ||
    '';
  const timestamp = Date.parse(rawDate);
  return Number.isFinite(timestamp) ? timestamp : Number.MAX_SAFE_INTEGER;
};

const SEED_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'visite_planifiee',
    title: 'Confirmation de Visite Technique',
    channel: 'Both',
    subject: 'MarneTransdem - Votre visite technique planifiée',
    body: `Bonjour {clientName},

Nous vous confirmons votre rendez-vous pour la visite technique de votre logement le {date} à {time}.
Le commercial chargé de votre dossier sera {commercialAssigned}.

N'hésitez pas à nous contacter pour toute modification.
Cordialement,
L'équipe MarneTransdem`
  },
  {
    id: 'devis_envoye',
    title: 'Votre Devis de Déménagement',
    channel: 'Both',
    subject: 'MarneTransdem - Votre devis de déménagement {devisId}',
    body: `Bonjour {clientName},

Votre devis pour le déménagement de {fromCity} vers {toCity} (volume estimé : {volume} m³) est prêt.
Le montant estimé pour la formule {formula} est de {price} €.

Vous pouvez le consulter et le signer en ligne dès maintenant.
Cordialement,
L'équipe MarneTransdem`
  },
  {
    id: 'devis_expirant',
    title: 'Rappel : Devis arrivant à expiration',
    channel: 'Email',
    subject: 'MarneTransdem - Votre devis {devisId} expire bientôt',
    body: `Bonjour {clientName},

Nous vous rappelons que votre devis {devisId} pour votre déménagement vers {toCity} arrive à expiration le {expiresAt}.
Pour réserver vos déménageurs et garantir la date choisie, merci de nous renvoyer le devis signé.

Cordialement,
L'équipe MarneTransdem`
  },
  {
    id: 'planning_j3',
    title: 'Rappel J-3 Déménagement',
    channel: 'SMS',
    body: `Bonjour {clientName}, c'est l'équipe MarneTransdem. Rappel : votre déménagement est prévu le {date}. Nos déménageurs arriveront vers 8h00 à {fromCity}. Le véhicule assigné est {assignedTruck}. À très vite !`
  },
  {
    id: 'facture_emise',
    title: 'Facture de Prestation',
    channel: 'Email',
    subject: 'MarneTransdem - Votre facture {invoiceId}',
    body: `Bonjour {clientName},

Veuillez trouver ci-joint la facture {invoiceId} concernant votre déménagement.
Le montant de {price} € est à régler avant le {dueDate}.

Cordialement,
L'équipe MarneTransdem`
  }
];

const getDossierWorkflowActions = (dossier: ClientDossier): ClientDossierWorkflowAction[] => {
  const actions: ClientDossierWorkflowAction[] = [];
  
  switch (dossier.stage) {
    case 'demande':
      actions.push({
        id: 'plan_visit',
        label: 'Planifier visite',
        description: 'Fixer un rendez-vous pour une visite technique',
        tone: 'primary'
      });
      actions.push({
        id: 'convert_direct',
        label: 'Créer devis direct',
        description: 'Sauter la visite et passer au chiffrage',
        tone: 'success'
      });
      actions.push({
        id: 'archive_request',
        label: 'Archiver la demande',
        description: 'Classer sans suite',
        tone: 'neutral'
      });
      break;
    case 'visite':
      if (dossier.visit?.status === 'Planifiée') {
        actions.push({
          id: 'realize_visit',
          label: 'Enregistrer visite réalisée',
          description: 'Marquer le rendez-vous comme effectué',
          tone: 'primary'
        });
      } else {
        actions.push({
          id: 'create_quote_from_visit',
          label: 'Générer le devis',
          description: 'Créer le devis basé sur l\'estimation',
          tone: 'primary'
        });
      }
      actions.push({
        id: 'cancel_visit',
        label: 'Annuler la visite',
        description: 'Annuler le rendez-vous technique',
        tone: 'neutral'
      });
      break;
    case 'devis':
      if (dossier.quote?.status === 'Brouillon') {
        actions.push({
          id: 'send_quote',
          label: 'Finaliser et envoyer devis',
          description: 'Envoyer le devis par mail/SMS au client',
          tone: 'primary'
        });
      } else {
        actions.push({
          id: 'remind_quote',
          label: 'Relancer le client',
          description: 'Envoyer une relance de devis',
          tone: 'warning'
        });
        actions.push({
          id: 'sign_quote',
          label: 'Enregistrer la signature',
          description: 'Valider le devis signé',
          tone: 'success'
        });
      }
      actions.push({
        id: 'refuse_quote',
        label: 'Marquer refusé',
        description: 'Le client décline la proposition',
        tone: 'neutral'
      });
      break;
    case 'facturation':
      if (!dossier.invoice) {
        actions.push({
          id: 'create_invoice',
          label: 'Générer la facture',
          description: 'Créer la facture en attente de règlement',
          tone: 'primary'
        });
      } else {
        actions.push({
          id: 'pay_invoice',
          label: 'Enregistrer le règlement',
          description: 'Marquer la facture comme payée',
          tone: 'success'
        });
        if (dossier.invoice.status === 'En retard') {
          actions.push({
            id: 'remind_invoice',
            label: 'Envoyer relance facture',
            description: 'Relancer pour retard de paiement',
            tone: 'warning'
          });
        }
      }
      break;
    case 'planning':
      actions.push({
        id: 'assign_planning',
        label: 'Affecter équipe',
        description: 'Planifier les compagnons et le camion',
        tone: 'primary'
      });
      if (!dossier.invoice && dossier.quote?.status === 'Signé') {
        actions.push({
          id: 'create_invoice',
          label: 'Générer facture',
          description: 'Créer la facture du devis accepté',
          tone: 'success'
        });
      }
      actions.push({
        id: 'confirm_j3',
        label: 'Confirmer J-3',
        description: 'Envoyer le rappel logistique par SMS',
        tone: 'success'
      });
      break;
    case 'intervention':
      actions.push({
        id: 'complete_move',
        label: 'Terminer la mission',
        description: 'Clôturer le transport et signer la lettre de voiture',
        tone: 'success'
      });
      break;
    case 'termine':
      actions.push({
        id: 'archive_dossier',
        label: 'Archiver le dossier',
        description: 'Déposer aux archives du CRM',
        tone: 'neutral'
      });
      break;
  }
  return actions;
};

const toIsoDate = (date = new Date()) => date.toISOString().split('T')[0];

const addDaysIso = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
};

const getNextReference = (prefix: string, ids: string[], withYear = true) => {
  const year = new Date().getFullYear();
  const pattern = new RegExp(`^${prefix}(?:-${year})?-(\\d+)$`);
  const highest = ids.reduce((max, id) => {
    const match = id.match(pattern);
    const value = match ? Number(match[1]) : 0;
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0);
  const sequence = String(highest + 1).padStart(4, '0');
  return withYear ? `${prefix}-${year}-${sequence}` : `${prefix}-${sequence}`;
};

const cleanText = (value?: string | number | null) => String(value ?? '').trim();

const buildCityLabel = (city?: string, zip?: string) => [cleanText(city), cleanText(zip)].filter(Boolean).join(' ');

const buildRequestAddress = (request?: AdminPublicRequest) => (
  [cleanText(request?.fromAddress), buildCityLabel(request?.fromCity, request?.fromZip)]
    .filter(Boolean)
    .join(', ')
);

const parseVolume = (value: unknown, fallback = 20) => {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) return Math.round(value);
  if (typeof value === 'string') {
    const match = value.replace(',', '.').match(/\d+(\.\d+)?/);
    const parsed = match ? Number(match[0]) : NaN;
    if (Number.isFinite(parsed) && parsed > 0) return Math.round(parsed);
  }
  return fallback;
};

const normalizeFormula = (formula?: string): Devis['formula'] => {
  const normalized = cleanText(formula)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (normalized.includes('econom')) return '\u00c9conomique';
  if (normalized.includes('luxe')) return 'Luxe';
  if (normalized.includes('dynamic')) return 'Dynamic';
  return 'Standard';
};

const estimateQuotePrice = (volume: number, formula: Devis['formula']) => {
  const rates: Record<Devis['formula'], number> = {
    '\u00c9conomique': 52,
    Standard: 62,
    Luxe: 78,
    Dynamic: 68
  };
  return Math.max(450, Math.round((volume * rates[formula]) / 10) * 10);
};

const hasMeaningfulOwner = (owner?: string) => {
  const normalized = cleanText(owner)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  return !!normalized && !normalized.includes('non assigne');
};

export function AdminDossiers() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const context = useOutletContext<AdminOutletContextType>();

  // Fetch all operational data
  const [publicRequests, setPublicRequests] = useSyncedCollection<AdminPublicRequest>('quotes');
  const [visites, setVisites] = useSyncedCollection<Visite>('visites');
  const [devisList, setDevisList] = useSyncedCollection<Devis>('devis');
  const [factures, setFactures] = useSyncedCollection<Facture>('factures');
  const [demenagements, setDemenagements] = useSyncedCollection<Demenagement>('demenagements');
  const [collaborateurs] = useSyncedCollection<UserProfile>('collaborateurs');
  const [movers] = useSyncedCollection<FieldMover>('movers');
  const [trucks] = useSyncedCollection<FieldTruck>('trucks');

  // Dossier specific metadata tables
  const [dossierNotes, setDossierNotes] = useSyncedCollection<DossierNote>('dossierNotes');
  const [dossierTasks, setDossierTasks] = useSyncedCollection<DossierTask>('dossierTasks');
  const [dossierOwners, setDossierOwners] = useSyncedCollection<{ id?: string; key: string; owner: string }>('dossierOwners');
  const [templates, setTemplates] = useSyncedCollection<NotificationTemplate>('notification_templates', SEED_TEMPLATES);

  // Ensure default templates exist
  useEffect(() => {
    if (templates.length === 0) {
      setTemplates(SEED_TEMPLATES);
    }
  }, [templates.length, setTemplates]);

  // UI States
  const [activeTab, setActiveTab] = useState<'dossiers' | 'templates'>('dossiers');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban');
  const [workflowStageFilter, setWorkflowStageFilter] = useState<string>('all');
  const [selectedDossierKey, setSelectedDossierKey] = useState<string | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [dossierRiskFilter, setDossierRiskFilter] = useState<DossierRiskFilter>('all');
  const [dossierOwnerFilter, setDossierOwnerFilter] = useState('all');
  const [dossierSort, setDossierSort] = useState<DossierSortOption>('priority');
  const [dossierPageSize, setDossierPageSize] = useState<DossierPageSize>(20);
  const [dossierCurrentPage, setDossierCurrentPage] = useState(1);

  // Active notification templates editor state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('visite_planifiee');
  const [editingTemplate, setEditingTemplate] = useState<Partial<NotificationTemplate> | null>(null);
  const [previewDossierIndex, setPreviewDossierIndex] = useState<number>(0);

  // Sync edit form when selected template changes
  const activeTemplate = useMemo(() => {
    return templates.find(t => t.id === selectedTemplateId) || SEED_TEMPLATES.find(t => t.id === selectedTemplateId);
  }, [templates, selectedTemplateId]);

  useEffect(() => {
    if (activeTemplate) {
      setEditingTemplate({ ...activeTemplate });
    }
  }, [activeTemplate]);

  // Build master client dossiers
  const dossierOwnerOverrides = useMemo(() => {
    const overrides: Record<string, string> = {};
    dossierOwners.forEach(o => {
      if (o.key) overrides[o.key] = o.owner;
    });
    return overrides;
  }, [dossierOwners]);

  const allDossiers = useMemo(() => {
    return buildClientDossiers({
      publicRequests,
      visites,
      devisList,
      factures,
      demenagements,
      dossierOwnerOverrides
    });
  }, [publicRequests, visites, devisList, factures, demenagements, dossierOwnerOverrides]);

  const activeDossier = useMemo(() => {
    if (!selectedDossierKey) return null;
    return allDossiers.find(d => d.key === selectedDossierKey) || null;
  }, [allDossiers, selectedDossierKey]);

  // Search query from layout context or local state
  const isUsingGlobalSearch = Boolean(context?.searchQuery?.trim());
  const activeSearch = isUsingGlobalSearch ? context.searchQuery : localSearchQuery;

  const dossierOwnerFilterOptions = useMemo<string[]>(() => (
    Array.from(new Set<string>(
      allDossiers
        .map((dossier) => cleanText(dossier.owner))
        .filter((owner): owner is string => Boolean(owner))
    ))
      .sort((a, b) => a.localeCompare(b, 'fr'))
  ), [allDossiers]);

  // Filter dossiers
  const filteredDossiers = useMemo(() => {
    const sortedDossiers = allDossiers.filter(dossier => {
      const matchesStage = workflowStageFilter === 'all' || dossier.stage === workflowStageFilter;
      const matchesRisk = dossierRiskFilter === 'all' || dossier.risk === dossierRiskFilter;
      const matchesOwner = dossierOwnerFilter === 'all' || dossier.owner === dossierOwnerFilter;

      const queryLower = activeSearch.toLowerCase().trim();
      const matchesSearch = !queryLower ||
        dossier.clientName.toLowerCase().includes(queryLower) ||
        (dossier.phone && dossier.phone.includes(queryLower)) ||
        (dossier.fromCity && dossier.fromCity.toLowerCase().includes(queryLower)) ||
        (dossier.toCity && dossier.toCity.toLowerCase().includes(queryLower)) ||
        (dossier.owner && dossier.owner.toLowerCase().includes(queryLower)) ||
        (dossier.nextAction && dossier.nextAction.toLowerCase().includes(queryLower)) ||
        (dossier.request?.email && dossier.request.email.toLowerCase().includes(queryLower)) ||
        (dossier.quote?.id && dossier.quote.id.toLowerCase().includes(queryLower)) ||
        (dossier.invoice?.id && dossier.invoice.id.toLowerCase().includes(queryLower)) ||
        (dossier.move?.id && dossier.move.id.toLowerCase().includes(queryLower));

      return matchesStage && matchesRisk && matchesOwner && matchesSearch;
    });

    return sortedDossiers.sort((a, b) => {
      if (dossierSort === 'amount_desc') return b.amount - a.amount;
      if (dossierSort === 'client_asc') return a.clientName.localeCompare(b.clientName, 'fr');
      if (dossierSort === 'completion_asc') return a.completion - b.completion;
      if (dossierSort === 'date_asc') return getDossierComparableDate(a) - getDossierComparableDate(b);

      const riskDelta = DOSSIER_RISK_WEIGHT[a.risk] - DOSSIER_RISK_WEIGHT[b.risk];
      if (riskDelta !== 0) return riskDelta;
      return getDossierComparableDate(a) - getDossierComparableDate(b);
    });
  }, [allDossiers, workflowStageFilter, dossierRiskFilter, dossierOwnerFilter, activeSearch, dossierSort]);

  const totalDossierPages = Math.max(1, Math.ceil(filteredDossiers.length / dossierPageSize));
  const safeDossierCurrentPage = Math.min(dossierCurrentPage, totalDossierPages);
  const paginatedDossiers = useMemo(() => {
    const start = (safeDossierCurrentPage - 1) * dossierPageSize;
    return filteredDossiers.slice(start, start + dossierPageSize);
  }, [filteredDossiers, dossierPageSize, safeDossierCurrentPage]);
  const dossierResultStart = filteredDossiers.length === 0 ? 0 : (safeDossierCurrentPage - 1) * dossierPageSize + 1;
  const dossierResultEnd = Math.min(filteredDossiers.length, safeDossierCurrentPage * dossierPageSize);

  useEffect(() => {
    setDossierCurrentPage(1);
  }, [activeSearch, workflowStageFilter, dossierRiskFilter, dossierOwnerFilter, dossierSort, dossierPageSize]);

  useEffect(() => {
    if (dossierCurrentPage > totalDossierPages) {
      setDossierCurrentPage(totalDossierPages);
    }
  }, [dossierCurrentPage, totalDossierPages]);

  // Mappings for notes and tasks
  const activeNotes = useMemo(() => {
    if (!selectedDossierKey) return [];
    return dossierNotes
      .filter(n => n.dossierKey === selectedDossierKey)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [dossierNotes, selectedDossierKey]);

  const activeTasks = useMemo(() => {
    if (!selectedDossierKey) return [];
    return dossierTasks
      .filter(t => t.dossierKey === selectedDossierKey)
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        if (a.priority !== b.priority) return a.priority === 'urgent' ? -1 : 1;
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [dossierTasks, selectedDossierKey]);

  const activeCollaborateurs = useMemo(() => (
    collaborateurs.filter((collaborateur) => collaborateur.status === 'Actif')
  ), [collaborateurs]);

  const currentUserLabel = user?.displayName || user?.email || '';

  const commercialOptions = useMemo(() => (
    activeCollaborateurs
      .filter((collaborateur) => collaborateur.role === 'commercial')
      .map((collaborateur) => collaborateur.name)
      .filter(Boolean)
  ), [activeCollaborateurs]);

  const teamLeaderOptions = useMemo(() => (
    activeCollaborateurs
      .filter((collaborateur) => collaborateur.role === 'chef_equipe')
      .map((collaborateur) => collaborateur.name)
      .filter(Boolean)
  ), [activeCollaborateurs]);

  const ownerOptions = useMemo(() => {
    const dbUsers = activeCollaborateurs.map((collaborateur) => collaborateur.name).filter(Boolean);
    const existingOwners = allDossiers.map((dossier) => dossier.owner).filter(hasMeaningfulOwner);
    return Array.from(new Set([...dbUsers, ...existingOwners, currentUserLabel].filter(Boolean)));
  }, [activeCollaborateurs, allDossiers, currentUserLabel]);

  const availableTabs = useMemo(() => {
    const roles: Record<string, AdminTab[]> = {
      gérant: ['overview', 'dossiers', 'demandes', 'devis', 'factures', 'visites', 'planning', 'collaborateurs'],
      secrétaire: ['dossiers', 'demandes', 'devis', 'factures', 'visites', 'planning'],
      commercial: ['dossiers', 'demandes', 'visites', 'planning', 'simulateur'],
      chef_equipe: ['dossiers', 'planning']
    };
    return role ? roles[role] ?? [] : ['dossiers'];
  }, [role]);

  // Notification placeholders helper
  const renderTemplate = (body: string, dossier: ClientDossier | null) => {
    if (!body) return '';
    const data = {
      clientName: dossier?.clientName || 'Client',
      date: dossier?.date || addDaysIso(2),
      time: dossier?.visit?.time || 'à confirmer',
      devisId: dossier?.quote?.id || 'devis brouillon',
      invoiceId: dossier?.invoice?.id || 'facture à créer',
      price: dossier?.amount ? dossier.amount.toLocaleString('fr-FR') : 'à chiffrer',
      dueDate: dossier?.invoice?.dueDate || addDaysIso(30),
      fromCity: dossier?.fromCity || 'départ à compléter',
      toCity: dossier?.toCity || 'arrivée à compléter',
      volume: dossier?.quote?.volume || dossier?.move?.volume || dossier?.request?.volume || 'à confirmer',
      formula: dossier?.quote?.formula || normalizeFormula(dossier?.request?.formula),
      commercialAssigned: dossier?.visit?.commercialAssigned || 'à assigner',
      assignedTruck: dossier?.move?.assignedTruck || 'à affecter',
      expiresAt: dossier?.quote?.expiresAt || addDaysIso(30)
    };

    return body.replace(/{(\w+)}/g, (match, key) => {
      return (data as any)[key] !== undefined ? String((data as any)[key]) : match;
    });
  };

  const getDossierPhone = (dossier: ClientDossier) => (
    cleanText(dossier.phone || dossier.request?.phone || dossier.quote?.phone || dossier.visit?.phone)
  );

  const getDossierFromCity = (dossier: ClientDossier) => (
    buildCityLabel(dossier.request?.fromCity, dossier.request?.fromZip) ||
    cleanText(dossier.quote?.fromCity || dossier.move?.fromCity || dossier.fromCity) ||
    'Départ à compléter'
  );

  const getDossierToCity = (dossier: ClientDossier) => (
    buildCityLabel(dossier.request?.toCity, dossier.request?.toZip) ||
    cleanText(dossier.quote?.toCity || dossier.move?.toCity || dossier.toCity) ||
    'Arrivée à compléter'
  );

  const getDossierVolume = (dossier: ClientDossier, fallback = 20) => parseVolume(
    dossier.request?.volume ?? dossier.visit?.volumeEstimated ?? dossier.quote?.volume ?? dossier.move?.volume,
    fallback
  );

  const getDossierCommercial = (dossier: ClientDossier) => (
    cleanText(dossier.visit?.commercialAssigned) ||
    (hasMeaningfulOwner(dossier.owner) ? dossier.owner : '') ||
    commercialOptions[0] ||
    (role === 'commercial' ? currentUserLabel : '') ||
    'Commercial à assigner'
  );

  const getDefaultTeamLeader = () => (
    teamLeaderOptions[0] ||
    movers.find((mover) => mover.status === 'Disponible')?.name ||
    ''
  );

  const createInvoiceFromQuote = async (quote: Devis) => {
    const existingInvoice = factures.find((invoice) => invoice.devisId === quote.id);
    if (existingInvoice) return existingInvoice;

    const invoice: Facture = {
      id: getNextReference('FAC', factures.map((item) => item.id)),
      devisId: quote.id,
      clientName: quote.clientName,
      amount: quote.price,
      date: toIsoDate(),
      dueDate: addDaysIso(30),
      status: 'En attente'
    };
    await setFactures(prev => [invoice, ...prev]);
    return invoice;
  };

  const createMoveFromQuote = async (quote: Devis) => {
    const existingMove = demenagements.find((move) => move.devisId === quote.id);
    if (existingMove) return existingMove;

    const newMove: Demenagement = {
      id: getNextReference('DEM', demenagements.map((item) => item.id), false),
      clientName: quote.clientName,
      devisId: quote.id,
      volume: quote.volume,
      fromCity: quote.fromCity,
      toCity: quote.toCity,
      date: quote.date || toIsoDate(),
      teamLeader: getDefaultTeamLeader(),
      status: 'À planifier',
      crewSize: 3,
      trackingToken: self.crypto?.randomUUID ? self.crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
    };
    await setDemenagements(prev => [newMove, ...prev]);
    return newMove;
  };

  const sendSimulatedNotification = async (templateId: string, dossier: ClientDossier) => {
    const template = templates.find(t => t.id === templateId) || SEED_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const renderedBody = renderTemplate(template.body, dossier);
    const renderedSubject = template.subject ? renderTemplate(template.subject, dossier) : '';

    // Push notification feedback
    if (context?.pushNotification) {
      context.pushNotification(
        `Alerte client (${template.channel}) ✉️`,
        `Notification "${template.title}" envoyée à ${dossier.clientName}.`,
        'success'
      );
    } else {
      alert(`Notification "${template.title}" simulée avec succès pour ${dossier.clientName}.`);
    }

    // Append internal note logging the email
    const noteId = `NOTE-${Date.now()}`;
    const newNote: DossierNote = {
      id: noteId,
      dossierKey: dossier.key,
      author: `${user?.email || 'Secrétariat'} (Auto)`,
      content: `[Notification ${template.channel}] ${template.title}\n\n${template.subject ? `Objet : ${renderedSubject}\n` : ''}${renderedBody}`,
      createdAt: toIsoDate()
    };
    await setDossierNotes(prev => [newNote, ...prev]);
  };

  const createAcceptedQuoteArtifacts = async (quote: Devis) => {
    await createMoveFromQuote(quote);
  };

  // Workflow Actions Runner
  const runDossierWorkflowAction = async (actionId: string, dossier: ClientDossier) => {
    switch (actionId) {
      case 'plan_visit': {
        const visitId = `VIS-${Date.now()}`;
        const visitPreference = dossier.request?.visitPreference;
        const visitMode: Visite['visitMode'] = visitPreference === 'domicile' || visitPreference === 'visio' || visitPreference === 'a_definir'
          ? visitPreference
          : 'a_definir';
        const newVisit: Visite = {
          id: visitId,
          clientName: dossier.clientName,
          phone: getDossierPhone(dossier),
          address: buildRequestAddress(dossier.request) || cleanText(dossier.fromCity) || 'Adresse à compléter',
          date: addDaysIso(2),
          time: '10:00',
          volumeEstimated: getDossierVolume(dossier),
          commercialAssigned: getDossierCommercial(dossier),
          visitMode,
          status: 'Planifiée' as const,
          sourceRequestId: dossier.request?.id || ''
        };
        await setVisites(prev => [newVisit, ...prev]);
        if (dossier.request?.id) {
          await setPublicRequests(prev => prev.map(r => r.id === dossier.request?.id ? { ...r, status: 'Visite_planifiée', plannedVisitId: visitId } : r));
        }
        context?.pushNotification('Visite Planifiée 📅', `Rendez-vous fixé pour ${dossier.clientName}.`, 'success');
        break;
      }
      case 'convert_direct': {
        const devisId = getNextReference('DEV', devisList.map((item) => item.id));
        const volume = getDossierVolume(dossier);
        const formula = normalizeFormula(dossier.request?.formula);
        const item: Devis = {
          id: devisId,
          clientName: dossier.clientName,
          phone: getDossierPhone(dossier),
          email: dossier.request?.email || undefined,
          fromCity: getDossierFromCity(dossier),
          toCity: getDossierToCity(dossier),
          fromAddress: dossier.request?.fromAddress,
          toAddress: dossier.request?.toAddress,
          volume,
          formula,
          price: estimateQuotePrice(volume, formula),
          date: dossier.request?.date || toIsoDate(),
          createdAt: toIsoDate(),
          expiresAt: addDaysIso(30),
          status: 'Brouillon' as const,
          sourceRequestId: dossier.request?.id || ''
        };
        await setDevisList(prev => [item, ...prev]);
        if (dossier.request?.id) {
          await setPublicRequests(prev => prev.map(r => r.id === dossier.request?.id ? { ...r, status: 'Étudié_Converti', convertedDevisId: devisId } : r));
        }
        context?.pushNotification('Devis Créé 🚀', `Devis brouillon ${devisId} créé directement.`, 'success');
        break;
      }
      case 'archive_request': {
        if (dossier.request?.id) {
          await setPublicRequests(prev => prev.map(r => r.id === dossier.request?.id ? { ...r, status: 'Archivé' } : r));
          context?.pushNotification('Demande Classée 📂', `Demande archivée pour ${dossier.clientName}.`, 'info');
        }
        break;
      }
      case 'realize_visit': {
        if (dossier.visit?.id) {
          await setVisites(prev => prev.map(v => v.id === dossier.visit?.id ? { ...v, status: 'Réalisée' } : v));
          context?.pushNotification('Visite Effectuée ✅', `Visite marquée réalisée.`, 'success');
        }
        break;
      }
      case 'create_quote_from_visit': {
        if (dossier.visit?.id) {
          const devisId = getNextReference('DEV', devisList.map((item) => item.id));
          const volume = getDossierVolume(dossier, dossier.visit.volumeEstimated || 20);
          const formula = normalizeFormula(dossier.request?.formula);
          const item: Devis = {
            id: devisId,
            clientName: dossier.clientName,
            phone: getDossierPhone(dossier),
            email: dossier.request?.email || undefined,
            fromCity: getDossierFromCity(dossier),
            toCity: getDossierToCity(dossier),
            fromAddress: dossier.request?.fromAddress,
            toAddress: dossier.request?.toAddress,
            volume,
            formula,
            price: estimateQuotePrice(volume, formula),
            date: dossier.visit.date,
            createdAt: toIsoDate(),
            expiresAt: addDaysIso(30),
            status: 'Brouillon' as const,
            sourceVisitId: dossier.visit.id
          };
          await setDevisList(prev => [item, ...prev]);
          await setVisites(prev => prev.map(v => v.id === dossier.visit?.id ? { ...v, status: 'Chiffrée' } : v));
          context?.pushNotification('Devis Émis 📝', `Devis ${devisId} généré depuis la visite.`, 'success');
        }
        break;
      }
      case 'cancel_visit': {
        if (dossier.visit?.id) {
          await setVisites(prev => prev.map(v => v.id === dossier.visit?.id ? { ...v, status: 'Annulée' } : v));
          context?.pushNotification('Visite Annulée ❌', `Visite annulée.`, 'info');
        }
        break;
      }
      case 'send_quote': {
        if (dossier.quote?.id) {
          await setDevisList(prev => prev.map(q => q.id === dossier.quote?.id ? { ...q, status: 'Envoyé', sentAt: toIsoDate() } : q));
          await sendSimulatedNotification('devis_envoye', dossier);
        }
        break;
      }
      case 'remind_quote': {
        if (dossier.quote?.id) {
          await sendSimulatedNotification('devis_expirant', dossier);
        }
        break;
      }
      case 'sign_quote': {
        if (dossier.quote?.id) {
          const updatedQuote: Devis = {
            ...dossier.quote,
            status: 'Signé' as const,
            acceptedAt: toIsoDate()
          };
          await setDevisList(prev => prev.map(q => q.id === dossier.quote?.id ? updatedQuote : q));
          await createAcceptedQuoteArtifacts(updatedQuote);
          context?.pushNotification('Devis Signé ✍️', `Devis accepté ! Lancement logistique.`, 'success');
        }
        break;
      }
      case 'refuse_quote': {
        if (dossier.quote?.id) {
          await setDevisList(prev => prev.map(q => q.id === dossier.quote?.id ? { ...q, status: 'Refusé', refusedAt: toIsoDate() } : q));
          context?.pushNotification('Devis Refusé 🛑', `Devis marqué comme refusé.`, 'info');
        }
        break;
      }
      case 'create_invoice': {
        if (dossier.quote?.id) {
          const alreadyExists = factures.some((invoice) => invoice.devisId === dossier.quote?.id);
          const invoice = await createInvoiceFromQuote(dossier.quote);
          const dossierWithInvoice: ClientDossier = { ...dossier, invoice };

          if (alreadyExists) {
            context?.pushNotification('Facture déjà présente', `La facture ${invoice.id} existe déjà pour ce devis.`, 'info');
          } else {
            context?.pushNotification('Facture générée', `Facture ${invoice.id} créée pour ${dossier.clientName}.`, 'success');
            await sendSimulatedNotification('facture_emise', dossierWithInvoice);
          }
        }
        break;
      }
      case 'pay_invoice': {
        if (dossier.invoice?.id) {
          await setFactures(prev => prev.map(f => f.id === dossier.invoice?.id ? { ...f, status: 'Payée' } : f));
          context?.pushNotification('Paiement Reçu 💳', `Facture ${dossier.invoice.id} réglée.`, 'success');
        }
        break;
      }
      case 'remind_invoice': {
        if (dossier.invoice?.id) {
          await sendSimulatedNotification('facture_emise', dossier);
        }
        break;
      }
      case 'assign_planning': {
        if (!dossier.move?.id) {
          context?.pushNotification('Planning introuvable', `Aucun déménagement n'est encore rattaché à ${dossier.clientName}.`, 'warning');
          break;
        }

        setSelectedDossierKey(dossier.key);
        const hasAssignableMovers = movers.some((mover) => (
          mover.status === 'Disponible' || dossier.move?.assignedMovers?.includes(mover.name)
        ));
        const hasAssignableTruck = trucks.some((truck) => (
          truck.status === 'Disponible' || dossier.move?.assignedTruck === truck.plateNumber
        ));

        if (!hasAssignableMovers || !hasAssignableTruck) {
          context?.pushNotification(
            'Ressources à compléter',
            'Ajoutez au moins un équipier disponible et un véhicule disponible dans Équipe & outils.',
            'warning'
          );
        } else {
          context?.pushNotification(
            'Affectation ouverte',
            'Sélectionnez le chef de mission, les équipiers et le véhicule dans le dossier.',
            'info'
          );
        }
        break;
      }
      case 'confirm_j3': {
        if (dossier.move?.id) {
          const isReadyForConfirmation = !!dossier.move.assignedTruck && !!dossier.move.assignedMovers?.length && !!dossier.move.teamLeader;
          if (!isReadyForConfirmation) {
            setSelectedDossierKey(dossier.key);
            context?.pushNotification('Planning incomplet', `Affectez d'abord l'équipe et le véhicule pour ${dossier.clientName}.`, 'warning');
            break;
          }
          await sendSimulatedNotification('planning_j3', dossier);
        }
        break;
      }
      case 'complete_move': {
        if (dossier.move?.id) {
          await setDemenagements(prev => prev.map(m => m.id === dossier.move?.id ? { ...m, status: 'Terminé' } : m));
          context?.pushNotification('Chantier Clos 🏆', `Déménagement de ${dossier.clientName} terminé.`, 'success');
        }
        break;
      }
      case 'archive_dossier': {
        context?.pushNotification('Dossier Archivé 🗄️', `Dossier de ${dossier.clientName} archivé.`, 'info');
        setSelectedDossierKey(null);
        break;
      }
      default:
        break;
    }
  };

  // Drawer custom handlers
  const handleAssignOwner = async (key: string, owner: string) => {
    const existing = dossierOwners.find(o => o.key === key);
    if (existing) {
      await setDossierOwners(prev => prev.map(o => o.key === key ? { ...o, owner } : o));
    } else {
      const id = `OWN-${Date.now()}`;
      await setDossierOwners(prev => [{ id, key, owner }, ...prev]);
    }
    context?.pushNotification('Assignation Mise à jour 👤', `Responsable mis à jour pour ce dossier.`, 'success');
  };

  const handleAddNote = async (key: string, content: string) => {
    const noteId = `NOTE-${Date.now()}`;
    const newNote: DossierNote = {
      id: noteId,
      dossierKey: key,
      author: currentUserLabel || 'Administrateur',
      content,
      createdAt: toIsoDate()
    };
    await setDossierNotes(prev => [newNote, ...prev]);
    context?.pushNotification('Note Ajoutée 📝', `Note interne enregistrée.`, 'success');
  };

  const handleAddTask = async (task: Omit<DossierTask, 'id' | 'createdAt' | 'done'>) => {
    const taskId = `TSK-${Date.now()}`;
    const newTask: DossierTask = {
      ...task,
      id: taskId,
      done: false,
      createdAt: toIsoDate()
    };
    await setDossierTasks(prev => [newTask, ...prev]);
    context?.pushNotification('Tâche Ajoutée 📌', `Nouvelle tâche de suivi créée.`, 'success');
  };

  const handleToggleTask = async (taskId: string) => {
    await setDossierTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
  };

  const handleDeleteTask = async (taskId: string) => {
    await setDossierTasks(prev => prev.filter(t => t.id !== taskId));
    context?.pushNotification('Tâche Supprimée 🗑️', `La tâche a été retirée du dossier.`, 'info');
  };

  const handleAssignMoveResources = async (moveId: string, assignment: { assignedMovers: string[]; assignedTruck: string; teamLeader: string }) => {
    await setDemenagements(prev => prev.map(m => m.id === moveId ? {
      ...m,
      assignedMovers: assignment.assignedMovers,
      assignedTruck: assignment.assignedTruck,
      teamLeader: assignment.teamLeader,
      status: 'Programmé'
    } : m));
    context?.pushNotification('Planning Mis à jour 🚚', `Ressources de terrain affectées avec succès.`, 'success');
  };

  // Save template settings
  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate || !editingTemplate.id) return;
    await setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? { ...t, ...editingTemplate, lastUpdated: toIsoDate() } as NotificationTemplate : t));
    context?.pushNotification('Modèle Sauvegardé 💾', `Le modèle de message "${editingTemplate.title}" a été mis à jour.`, 'success');
  };

  // Workflow actions to pass to drawer
  const drawerWorkflowActions = useMemo(() => {
    return activeDossier ? getDossierWorkflowActions(activeDossier) : [];
  }, [activeDossier]);

  return (
    <div className="space-y-6">

      {/* Tab Navigation header */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 print:hidden">
        <button
          onClick={() => setActiveTab('dossiers')}
          className={`pb-4 text-xs font-black uppercase tracking-wider transition-all relative ${activeTab === 'dossiers' ? 'text-accent border-b-2 border-accent' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="flex items-center gap-2">
            <FolderOpen size={16} />
            Pipeline & Dossiers Clients
          </span>
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-4 text-xs font-black uppercase tracking-wider transition-all relative ${activeTab === 'templates' ? 'text-accent border-b-2 border-accent' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="flex items-center gap-2">
            <Settings size={16} />
            Modèles de Notifications
          </span>
        </button>
      </div>

      {/* Tab 1: Pipeline & Dossiers */}
      {activeTab === 'dossiers' && (
        <div className="space-y-6 animate-fade-in">

          {/* Workflow Rail */}
          <AdminWorkflowRail
            dossiers={allDossiers}
            activeStage={workflowStageFilter as any}
            availableTabs={availableTabs}
            onSelectStage={(stage) => setWorkflowStageFilter(stage)}
            onOpenDossier={(key) => setSelectedDossierKey(key)}
            onNavigate={(tab) => navigate(`/admin/${tab}`)}
            onRunPrimaryAction={(dossier) => {
              const actions = getDossierWorkflowActions(dossier);
              if (actions.length > 0) {
                runDossierWorkflowAction(actions[0].id, dossier);
              }
            }}
          />

          {/* Tabular Listing of Client Folders */}
          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-brand-950 dark:text-white uppercase tracking-wider">Fichiers Clients</h3>
                <p className="text-xs text-slate-400 font-light mt-0.5">Cliquez sur un dossier pour le consulter et gérer ses actions réglementaires</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    title="Vue Liste"
                  >
                    <LayoutList size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`p-1.5 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    title="Vue Pipeline"
                  >
                    <Columns size={16} />
                  </button>
                </div>
                <span className="text-[10px] font-black uppercase bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 text-slate-500 rounded-full px-2.5 py-1">
                  {filteredDossiers.length} dossier(s)
                </span>
              </div>
            </div>

            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 space-y-3 print:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-7 gap-3">
                {isUsingGlobalSearch ? (
                  <div className="xl:col-span-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2">
                    <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">Recherche globale active</span>
                    <strong className="block truncate text-xs text-slate-700 dark:text-slate-100">{activeSearch}</strong>
                  </div>
                ) : (
                  <div className="relative xl:col-span-2">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Nom, téléphone, ville, email, référence..."
                      value={localSearchQuery}
                      onChange={(e) => setLocalSearchQuery(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold shadow-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                )}

                <select
                  value={workflowStageFilter}
                  onChange={(event) => setWorkflowStageFilter(event.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  <option value="all">Toutes les étapes</option>
                  {DOSSIER_STAGES.map((stage) => (
                    <option key={stage.key} value={stage.key}>{stage.label}</option>
                  ))}
                </select>

                <select
                  value={dossierRiskFilter}
                  onChange={(event) => setDossierRiskFilter(event.target.value as DossierRiskFilter)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  <option value="all">Toutes priorités</option>
                  <option value="urgent">Urgent</option>
                  <option value="attention">À surveiller</option>
                  <option value="normal">Normal</option>
                </select>

                <select
                  value={dossierOwnerFilter}
                  onChange={(event) => setDossierOwnerFilter(event.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  <option value="all">Tous responsables</option>
                  {dossierOwnerFilterOptions.map((owner) => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>

                <select
                  value={dossierSort}
                  onChange={(event) => setDossierSort(event.target.value as DossierSortOption)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  <option value="priority">Priorité puis date</option>
                  <option value="date_asc">Date la plus proche</option>
                  <option value="amount_desc">Montant décroissant</option>
                  <option value="client_asc">Client A-Z</option>
                  <option value="completion_asc">Avancement faible</option>
                </select>

                {viewMode === 'list' && (
                  <select
                    value={dossierPageSize}
                    onChange={(event) => setDossierPageSize(Number(event.target.value) as DossierPageSize)}
                    className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                  >
                    {DOSSIER_PAGE_SIZE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option} par page</option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-[11px] font-bold text-slate-500">
                  {viewMode === 'list' ? (
                    <>Affichage {dossierResultStart}-{dossierResultEnd} sur {filteredDossiers.length} dossier{filteredDossiers.length > 1 ? 's' : ''}</>
                  ) : (
                    <>{filteredDossiers.length} dossier{filteredDossiers.length > 1 ? 's' : ''} affichés</>
                  )}
                  {workflowStageFilter !== 'all' && (
                    <span className="ml-1 text-slate-400">· Étape {getDossierStageLabel(workflowStageFilter)}</span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearchQuery('');
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('all');
                    setDossierOwnerFilter('all');
                    setDossierSort('priority');
                    setDossierPageSize(20);
                    setDossierCurrentPage(1);
                  }}
                  className="self-start sm:self-auto text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-brand-900 dark:hover:text-white"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>

            {viewMode === 'list' ? (
              <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="p-4">Client</th>
                    <th className="p-4">Avancement</th>
                    <th className="p-4">Parcours & Villes</th>
                    <th className="p-4">Valeur Prestation</th>
                    <th className="p-4">Responsable</th>
                    <th className="p-4">Prochaine action</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {paginatedDossiers.map(d => {
                    const isUrgent = d.risk === 'urgent';
                    const isAttention = d.risk === 'attention';

                    return (
                      <tr
                        key={d.key}
                        onDoubleClick={() => setSelectedDossierKey(d.key)}
                        className="hover:bg-slate-50/75 dark:hover:bg-slate-950/40 cursor-pointer transition-colors duration-200 group"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${isUrgent ? 'bg-red-500 animate-pulse' : isAttention ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            <div>
                              <strong className="font-extrabold text-slate-900 dark:text-white text-xs">{d.clientName}</strong>
                              <p className="text-[10px] text-slate-400 mt-0.5">{d.phone || 'Pas de téléphone'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="w-24">
                            <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mb-1">
                              <span>Étape : {d.stage}</span>
                              <span>{d.completion}%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-accent h-full transition-all duration-300"
                                style={{ width: `${d.completion}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-bold">
                          <div className="truncate max-w-[160px]">
                            {d.fromCity} ➔ {d.toCity}
                          </div>
                          <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{d.date || 'Date non planifiée'}</span>
                        </td>
                        <td className="p-4">
                          <strong className="font-extrabold text-slate-950 dark:text-white">{d.amount.toLocaleString('fr-FR')} €</strong>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-lg border dark:border-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                            {d.owner}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="max-w-[180px] font-medium truncate text-slate-550 dark:text-slate-400">
                            {d.nextAction}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDossierKey(d.key);
                              }}
                              className="p-1.5 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-300 shadow-sm"
                              title="Ouvrir le dossier"
                            >
                              <Eye size={13} />
                            </button>
                            {getDossierWorkflowActions(d).length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const actions = getDossierWorkflowActions(d);
                                  runDossierWorkflowAction(actions[0].id, d);
                                }}
                                className="p-1.5 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover rounded-lg text-white dark:text-brand-950 shadow-sm"
                                title={getDossierWorkflowActions(d)[0].label}
                              >
                                <ChevronRight size={13} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredDossiers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        <FolderOpen className="mx-auto mb-2 opacity-50" size={24} />
                        Aucun dossier ne correspond à vos filtres.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredDossiers.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 print:hidden">
                <p className="text-[11px] font-bold text-slate-500">
                  Page {safeDossierCurrentPage} / {totalDossierPages} · {dossierPageSize} dossiers par page
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDossierCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={safeDossierCurrentPage <= 1}
                    className="inline-flex items-center gap-1 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={13} />
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={() => setDossierCurrentPage((page) => Math.min(totalDossierPages, page + 1))}
                    disabled={safeDossierCurrentPage >= totalDossierPages}
                    className="inline-flex items-center gap-1 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Suivant
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
              </>
            ) : (
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900 overflow-x-auto">
                <div className="flex gap-4 min-w-max pb-4">
                  {DOSSIER_STAGES.map(stage => {
                    // Filter dossiers for this specific stage column
                    const stageDossiers = filteredDossiers.filter(d => d.stage === stage.key);
                    
                    return (
                      <div key={stage.key} className="w-72 flex flex-col shrink-0">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
                            {stage.label}
                            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] py-0.5 px-2 rounded-full">
                              {stageDossiers.length}
                            </span>
                          </h4>
                        </div>
                        
                        <div className="flex-1 min-h-[200px] bg-slate-100/50 dark:bg-slate-800/20 rounded-2xl p-2 space-y-3 border border-slate-200/50 dark:border-slate-800/50">
                          {stageDossiers.map(d => {
                            const isUrgent = d.risk === 'urgent';
                            const isAttention = d.risk === 'attention';
                            
                            return (
                              <div
                                key={d.key}
                                onClick={() => setSelectedDossierKey(d.key)}
                                className={`bg-white dark:bg-slate-950 p-3.5 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer group
                                  ${isUrgent ? 'border-l-red-500' : isAttention ? 'border-l-amber-500' : 'border-l-emerald-500 border border-slate-200 dark:border-slate-800'}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <strong className="font-extrabold text-slate-900 dark:text-white text-xs truncate pr-2">
                                    {d.clientName}
                                  </strong>
                                  <span className="text-[10px] font-black text-brand-900 dark:text-brand-300 whitespace-nowrap bg-brand-50 dark:bg-brand-900/30 px-1.5 py-0.5 rounded">
                                    {d.amount > 0 ? d.amount.toLocaleString('fr-FR') + ' €' : '-'}
                                  </span>
                                </div>
                                
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 truncate">
                                  {d.fromCity} ➔ {d.toCity}
                                </div>
                                
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold">
                                    <Calendar size={10} />
                                    {d.date || 'À définir'}
                                  </div>
                                  {getDossierWorkflowActions(d).length > 0 && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const actions = getDossierWorkflowActions(d);
                                        runDossierWorkflowAction(actions[0].id, d);
                                      }}
                                      className="bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover text-white dark:text-brand-950 text-[9px] font-black px-2 py-1 rounded"
                                      title={getDossierWorkflowActions(d)[0].label}
                                    >
                                      {getDossierWorkflowActions(d)[0].label}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          
                          {stageDossiers.length === 0 && (
                            <div className="h-20 flex items-center justify-center text-[10px] text-slate-400 italic">
                              Aucun dossier
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Modèles de Notifications */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in print:hidden">

          {/* Left: Template Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 pl-1">Modèles Disponibles</h3>
            <div className="space-y-2">
              {templates.map(t => {
                const isSelected = selectedTemplateId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplateId(t.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all active:scale-[0.98] ${isSelected
                        ? 'bg-accent/10 border-accent/30 text-brand-950 dark:text-white ring-1 ring-accent/30'
                        : 'bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {t.channel}
                      </span>
                      {t.lastUpdated && (
                        <span className="text-[8px] text-slate-400 font-bold">Maj: {t.lastUpdated}</span>
                      )}
                    </div>
                    <strong className="block text-xs font-extrabold">{t.title}</strong>
                    <p className="text-[10px] text-slate-400 mt-1 truncate">{t.body}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Template Editor */}
          {editingTemplate && (
            <div className="lg:col-span-8 space-y-6">

              {/* Form card */}
              <form onSubmit={handleSaveTemplate} className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-sm font-black text-brand-950 dark:text-white uppercase tracking-wider">Édition du Modèle</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Personnalisez le sujet et le corps du message client</p>
                  </div>
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-brand-950 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <Save size={13} />
                    Enregistrer les modifications
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Titre administratif</label>
                    <input
                      type="text"
                      value={editingTemplate.title || ''}
                      onChange={(e) => setEditingTemplate(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Canal de transmission</label>
                    <select
                      value={editingTemplate.channel || 'Both'}
                      onChange={(e) => setEditingTemplate(prev => ({ ...prev, channel: e.target.value as any }))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent font-bold"
                    >
                      <option value="Email">Email uniquement</option>
                      <option value="SMS">SMS uniquement</option>
                      <option value="Both">Email & SMS</option>
                    </select>
                  </div>
                </div>

                {editingTemplate.channel !== 'SMS' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Objet de l'e-mail</label>
                    <input
                      type="text"
                      placeholder="Sujet de l'e-mail..."
                      value={editingTemplate.subject || ''}
                      onChange={(e) => setEditingTemplate(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Corps du message</label>
                    <span className="text-[9px] font-bold text-slate-450 bg-slate-100 dark:bg-slate-950 rounded border px-1.5">
                      Placeholders : {`{clientName}`}, {`{date}`}, {`{fromCity}`}, {`{toCity}`}, {`{price}`}
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={editingTemplate.body || ''}
                    onChange={(e) => setEditingTemplate(prev => ({ ...prev, body: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-accent resize-none leading-relaxed font-mono"
                  />
                </div>
              </form>

              {/* Real-time Dynamic Preview panel */}
              <div className="bg-slate-100/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">Aperçu Réel Client</h4>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Visualisez le message généré avec un dossier existant</p>
                  </div>
                  {allDossiers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-450">Sélection dossier :</span>
                      <select
                        value={previewDossierIndex}
                        onChange={(e) => setPreviewDossierIndex(Number(e.target.value))}
                        className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg px-2.5 py-1 text-[11px] focus:outline-none"
                      >
                        {allDossiers.slice(0, 10).map((d, i) => (
                          <option key={d.key} value={i}>{d.clientName} ({d.stage})</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-4 shadow-sm space-y-3">
                  {editingTemplate.channel !== 'SMS' && (
                    <div className="text-xs pb-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-slate-400"><strong>Objet :</strong> <span className="text-slate-900 dark:text-slate-100 font-bold">{renderTemplate(editingTemplate.subject || '', allDossiers[previewDossierIndex] || null)}</span></p>
                    </div>
                  )}
                  <div className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans">
                    {renderTemplate(editingTemplate.body || '', allDossiers[previewDossierIndex] || null)}
                  </div>
                </div>

                {allDossiers.length > 0 && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => sendSimulatedNotification(editingTemplate.id!, allDossiers[previewDossierIndex])}
                      className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail size={13} />
                      Simuler l'envoi de notification (Push & Note CRM)
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

      {/* Slide-over client folder drawer */}
      {activeDossier && (
        <ClientDossierDrawer
          dossier={activeDossier}
          notes={activeNotes}
          tasks={activeTasks}
          ownerOptions={ownerOptions}
          availableTabs={availableTabs}
          workflowActions={drawerWorkflowActions}
          movers={movers}
          trucks={trucks}
          onClose={() => setSelectedDossierKey(null)}
          onNavigate={(tab) => {
            setSelectedDossierKey(null);
            navigate(`/admin/${tab}`);
          }}
          onRunWorkflowAction={(actionId, dossier) => runDossierWorkflowAction(actionId, dossier)}
          onAssignMoveResources={(moveId, assignment) => handleAssignMoveResources(moveId, assignment)}
          onUpdateMove={async (moveId, updates) => {
            await setDemenagements(prev => prev.map(m => m.id === moveId ? { ...m, ...updates } : m));
            context?.pushNotification('Dossier Mis à jour 💾', 'Le déménagement a été mis à jour.', 'success');
          }}
          onAssignOwner={(key, owner) => handleAssignOwner(key, owner)}
          onAddNote={(key, content) => handleAddNote(key, content)}
          onAddTask={(task) => handleAddTask(task)}
          onToggleTask={(taskId) => handleToggleTask(taskId)}
          onDeleteTask={(taskId) => handleDeleteTask(taskId)}
        />
      )}

    </div>
  );
}
