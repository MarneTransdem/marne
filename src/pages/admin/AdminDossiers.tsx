import React, { useState, useMemo, useEffect } from 'react';
import { useSyncedCollection } from '../../hooks/useData';
import { useAuth } from '../../context/AuthContext';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
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
  type DossierEvent,
  type AdminPublicRequest
} from '../../lib/admin-dossiers';
import { buildClientDossiers, normalizeDossierKey } from '../../lib/admin-dossier-engine';
import { buildDossierIdFromReference } from '../../lib/dossier-id';
import { getAccessibleTabs, type AdminTab } from '../../lib/admin-permissions';
import { AdminWorkflowRail } from '../../components/admin/AdminWorkflowRail';
import { ClientDossierDrawer, type ClientDossierWorkflowAction } from '../../components/admin/ClientDossierDrawer';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';
import { adminFetch } from '../../lib/admin-api';
import { db } from '../../lib/firebase';
import { useCrmSettings } from '../../hooks/useCrmSettings';
import {
  buildCommunicationLog,
  renderCommunication,
  type CommunicationAction,
  type CommunicationLog,
  type CommunicationTask
} from '../../lib/crm-communications';
import {
  analyzeDossierQuality,
  matchesDossierQualityFilter,
  type DossierQualityFilter,
  type DossierQualitySeverity
} from '../../lib/admin-dossier-quality';
import {
  buildTodayActions,
  hasOpenTaskForTodayAction,
  summarizeTodayActions,
  type TodayAction,
  type TodayActionTone
} from '../../lib/admin-today-actions';

const DOSSIER_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
const KANBAN_STAGE_BATCH_SIZE = 10;

type DossierPageSize = typeof DOSSIER_PAGE_SIZE_OPTIONS[number];
type DossierRiskFilter = 'all' | ClientDossier['risk'];
type DossierQualityFilterOption = 'all' | DossierQualityFilter;
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

const DOSSIER_QUALITY_FILTERS: Array<{ value: DossierQualityFilterOption; label: string }> = [
  { value: 'all', label: 'Tous controles' },
  { value: 'blocked', label: 'Dossiers bloques' },
  { value: 'missing_email', label: 'Sans email' },
  { value: 'followup', label: 'A relancer' },
  { value: 'planning_incomplete', label: 'Planning incomplet' },
  { value: 'invoice_risk', label: 'Factures a risque' },
  { value: 'move_soon', label: 'Dem. proche' }
];

const getDossierQualityPillClass = (severity: DossierQualitySeverity) => {
  if (severity === 'blocking') return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/25 dark:text-red-300 dark:border-red-900/50';
  if (severity === 'warning') return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/25 dark:text-amber-300 dark:border-amber-900/50';
  return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/25 dark:text-emerald-300 dark:border-emerald-900/50';
};

const getDossierQualityScoreClass = (score: number) => {
  if (score >= 85) return 'text-red-700 dark:text-red-300';
  if (score >= 55) return 'text-amber-700 dark:text-amber-300';
  if (score >= 25) return 'text-sky-700 dark:text-sky-300';
  return 'text-emerald-700 dark:text-emerald-300';
};

const getTodayActionToneClasses = (tone: TodayActionTone) => {
  if (tone === 'critical') return 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40';
  if (tone === 'warning') return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40';
  return 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/20 dark:text-sky-300 dark:border-sky-900/40';
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
        label: 'Preparer J-3',
        description: 'Archiver le message logistique avant envoi SMS',
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
  const { user, role, moduleAccess } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const context = useOutletContext<AdminOutletContextType>();
  const { communicationSettings } = useCrmSettings();

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
  const [dossierEvents, setDossierEvents] = useSyncedCollection<DossierEvent>('dossierEvents');
  const [dossierOwners, setDossierOwners] = useSyncedCollection<{ id?: string; key: string; dossierId?: string; owner: string }>('dossierOwners');
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
  const [dossierQualityFilter, setDossierQualityFilter] = useState<DossierQualityFilterOption>('all');
  const [dossierOwnerFilter, setDossierOwnerFilter] = useState('all');
  const [dossierSort, setDossierSort] = useState<DossierSortOption>('priority');
  const [dossierPageSize, setDossierPageSize] = useState<DossierPageSize>(20);
  const [dossierCurrentPage, setDossierCurrentPage] = useState(1);
  const [kanbanVisibleByStage, setKanbanVisibleByStage] = useState<Record<string, number>>({});

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
      if (o.dossierId) overrides[o.dossierId] = o.owner;
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

  const dossierQualityByKey = useMemo(() => (
    new Map(allDossiers.map((dossier) => [dossier.key, analyzeDossierQuality(dossier)]))
  ), [allDossiers]);

  const getDossierQualitySummary = (dossier: ClientDossier) => (
    dossierQualityByKey.get(dossier.key) || analyzeDossierQuality(dossier)
  );
  const activeDossier = useMemo(() => {
    if (!selectedDossierKey) return null;
    return allDossiers.find(d => d.key === selectedDossierKey) || null;
  }, [allDossiers, selectedDossierKey]);

  useEffect(() => {
    const rawDossierKey = new URLSearchParams(location.search).get('dossier');
    if (!rawDossierKey) return;
    const normalizedTarget = normalizeDossierKey(rawDossierKey);
    const targetDossier = allDossiers.find((dossier) => (
      normalizeDossierKey(dossier.key) === normalizedTarget ||
      normalizeDossierKey(dossier.dossierId) === normalizedTarget ||
      normalizeDossierKey(dossier.clientName) === normalizedTarget
    ));
    if (!targetDossier || selectedDossierKey === targetDossier.key) return;
    setActiveTab('dossiers');
    setSelectedDossierKey(targetDossier.key);
  }, [allDossiers, location.search, selectedDossierKey]);

  const activeDossierKeys = useMemo(() => {
    if (!selectedDossierKey) return new Set<string>();
    const keys = new Set<string>([selectedDossierKey]);
    if (activeDossier?.dossierId) keys.add(activeDossier.dossierId);
    if (activeDossier?.clientName) keys.add(normalizeDossierKey(activeDossier.clientName));
    return keys;
  }, [activeDossier, selectedDossierKey]);

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
      const qualitySummary = dossierQualityByKey.get(dossier.key) || analyzeDossierQuality(dossier);
      const matchesQuality = matchesDossierQualityFilter(qualitySummary, dossierQualityFilter);
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

      return matchesStage && matchesRisk && matchesQuality && matchesOwner && matchesSearch;
    });

    return sortedDossiers.sort((a, b) => {
      if (dossierSort === 'amount_desc') return b.amount - a.amount;
      if (dossierSort === 'client_asc') return a.clientName.localeCompare(b.clientName, 'fr');
      if (dossierSort === 'completion_asc') return a.completion - b.completion;
      if (dossierSort === 'date_asc') return getDossierComparableDate(a) - getDossierComparableDate(b);

      const qualityDelta = (dossierQualityByKey.get(b.key)?.score || 0) - (dossierQualityByKey.get(a.key)?.score || 0);
      if (qualityDelta !== 0) return qualityDelta;

      const riskDelta = DOSSIER_RISK_WEIGHT[a.risk] - DOSSIER_RISK_WEIGHT[b.risk];
      if (riskDelta !== 0) return riskDelta;
      return getDossierComparableDate(a) - getDossierComparableDate(b);
    });
  }, [allDossiers, workflowStageFilter, dossierRiskFilter, dossierQualityFilter, dossierOwnerFilter, activeSearch, dossierSort, dossierQualityByKey]);

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
    setKanbanVisibleByStage({});
  }, [activeSearch, workflowStageFilter, dossierRiskFilter, dossierQualityFilter, dossierOwnerFilter, dossierSort, dossierPageSize]);

  useEffect(() => {
    if (dossierCurrentPage > totalDossierPages) {
      setDossierCurrentPage(totalDossierPages);
    }
  }, [dossierCurrentPage, totalDossierPages]);

  // Mappings for notes and tasks
  const activeNotes = useMemo(() => {
    if (!selectedDossierKey) return [];
    return dossierNotes
      .filter(n => activeDossierKeys.has(n.dossierId || n.dossierKey))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [activeDossierKeys, dossierNotes, selectedDossierKey]);

  const activeTasks = useMemo(() => {
    if (!selectedDossierKey) return [];
    return dossierTasks
      .filter(t => activeDossierKeys.has(t.dossierId || t.dossierKey))
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        if (a.priority !== b.priority) return a.priority === 'urgent' ? -1 : 1;
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [activeDossierKeys, dossierTasks, selectedDossierKey]);

  const activeEvents = useMemo(() => {
    if (!selectedDossierKey) return [];
    return dossierEvents
      .filter(event => activeDossierKeys.has(event.dossierId || event.dossierKey))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 30);
  }, [activeDossierKeys, dossierEvents, selectedDossierKey]);

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

  const availableTabs = useMemo(() => (
    role ? getAccessibleTabs(role, moduleAccess) : (['dossiers'] as AdminTab[])
  ), [role, moduleAccess]);

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
    const dossierId = quote.dossierId || buildDossierIdFromReference('DEV', quote.id);

    const invoice: Facture = {
      id: getNextReference('FAC', factures.map((item) => item.id)),
      dossierId,
      devisId: quote.id,
      clientName: quote.clientName,
      email: quote.email || '',
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
    const dossierId = quote.dossierId || buildDossierIdFromReference('DEV', quote.id);

    const newMove: Demenagement = {
      id: getNextReference('DEM', demenagements.map((item) => item.id), false),
      dossierId,
      clientName: quote.clientName,
      devisId: quote.id,
      volume: quote.volume,
      fromCity: quote.fromCity,
      toCity: quote.toCity,
      fromAddress: quote.fromAddress || '',
      toAddress: quote.toAddress || '',
      date: quote.date || toIsoDate(),
      teamLeader: getDefaultTeamLeader(),
      status: 'À planifier',
      crewSize: 3,
      trackingToken: self.crypto?.randomUUID ? self.crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
    };
    await setDemenagements(prev => [newMove, ...prev]);
    return newMove;
  };

  const createEntityId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const nowIso = () => new Date().toISOString();

  type DossierEventInput = Omit<DossierEvent, 'id' | 'dossierId' | 'dossierKey' | 'createdAt' | 'actor' | 'status'> & {
    status?: DossierEvent['status'];
  };

  const registerDossierEvent = async (
    dossier: Pick<ClientDossier, 'key' | 'dossierId' | 'clientName'>,
    input: DossierEventInput
  ) => {
    const event: DossierEvent = {
      id: createEntityId('EVT'),
      dossierId: dossier.dossierId || dossier.key,
      dossierKey: dossier.key || dossier.dossierId,
      type: input.type,
      title: input.title,
      status: input.status || 'info',
      actor: currentUserLabel || 'CRM',
      createdAt: nowIso()
    };

    if (input.description) event.description = input.description;
    if (input.documentType) event.documentType = input.documentType;
    if (input.documentId) event.documentId = input.documentId;
    if (input.channel) event.channel = input.channel;
    if (input.recipient) event.recipient = input.recipient;
    if (input.metadata) event.metadata = input.metadata;

    await setDossierEvents(prev => [event, ...prev]);
    return event;
  };

  const findDossierForKey = (key: string) => (
    allDossiers.find(dossier => dossier.key === key || dossier.dossierId === key) || activeDossier
  );

  const registerDossierEventForKey = async (key: string, input: DossierEventInput) => {
    const dossier = findDossierForKey(key);
    if (!dossier) return;
    await registerDossierEvent(dossier, input);
  };

  const registerCommunicationLog = async (
    task: CommunicationTask,
    status: CommunicationLog['status'],
    error?: string
  ) => {
    const log = buildCommunicationLog(task, status, currentUserLabel || 'CRM', error);
    await setDoc(doc(db, 'communication_logs', log.id), log, { merge: true });
    return log;
  };

  const buildDossierCommunicationTask = (
    dossier: ClientDossier,
    documentType: 'devis' | 'facture',
    document: Devis | Facture,
    action: CommunicationAction,
    subject: string,
    body: string,
    clientEmail: string
  ): CommunicationTask => {
    const isQuote = documentType === 'devis';
    const amount = isQuote ? Number((document as Devis).price || 0) : Number((document as Facture).amount || 0);
    return {
      id: `${action}-${document.id}-${Date.now()}`,
      documentType,
      documentId: document.id,
      dossierId: dossier.dossierId,
      action,
      priority: action.includes('overdue') || action.includes('expiring') ? 'high' : 'normal',
      title: isQuote ? 'Envoi devis depuis dossier' : 'Envoi facture depuis dossier',
      description: `${isQuote ? 'Devis' : 'Facture'} ${document.id} traite depuis le dossier client.`,
      clientName: dossier.clientName,
      clientEmail,
      amount,
      dateLabel: isQuote ? ((document as Devis).date || '') : ((document as Facture).dueDate || ''),
      badgeLabel: 'Dossier',
      ctaLabel: action === 'quote_send' ? 'Envoyer devis' : action === 'invoice_send' ? 'Envoyer facture' : 'Envoyer relance',
      document,
      subject,
      body,
      sentToday: false
    };
  };

  const getQuoteReminderAction = (quote: Devis): CommunicationAction => {
    const expiryTime = quote.expiresAt ? Date.parse(quote.expiresAt) : NaN;
    if (Number.isFinite(expiryTime)) {
      const daysLeft = Math.ceil((expiryTime - Date.now()) / (24 * 60 * 60 * 1000));
      if (daysLeft <= 7) return 'quote_reminder_expiring';
    }
    return 'quote_reminder_soft';
  };

  const sendQuoteEmailFromDossier = async (dossier: ClientDossier, action: CommunicationAction) => {
    if (!dossier.quote) return false;
    const quote = dossier.quote;
    const recipient = cleanText(quote.email || dossier.request?.email);
    if (!recipient) {
      await registerDossierEvent(dossier, {
        type: 'communication',
        title: 'Email devis bloque',
        description: `Impossible d'envoyer ${quote.id}: adresse email client manquante.`,
        status: 'warning',
        documentType: 'devis',
        documentId: quote.id,
        channel: 'Email'
      });
      context?.pushNotification('Email manquant', 'Ajoutez une adresse email au devis avant de lancer l\'envoi.', 'warning');
      return false;
    }

    const sentAt = nowIso();
    const quoteForEmail: Devis = { ...quote, email: recipient };
    const rendered = renderCommunication(action, quoteForEmail, 'devis', communicationSettings);
    const task = buildDossierCommunicationTask(dossier, 'devis', quoteForEmail, action, rendered.subject, rendered.body, recipient);

    try {
      const response = action === 'quote_send'
        ? await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'admin-doc',
              documentType: 'devis',
              data: {
                id: quote.id,
                clientName: quote.clientName,
                clientEmail: recipient,
                pdfName: `Devis_${quote.id}.pdf`,
                docData: quoteForEmail,
                subject: rendered.subject,
                body: rendered.body
              }
            })
          })
        : await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'quote-reminder',
              data: {
                quote: quoteForEmail,
                reminderStage: action,
                subject: rendered.subject,
                body: rendered.body
              }
            })
          });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || 'Envoi du devis impossible.');
      }

      await setDevisList(prev => prev.map(item => {
        if (item.id !== quote.id) return item;
        if (action === 'quote_send') {
          return {
            ...item,
            email: recipient,
            status: item.status === 'Signé' || item.status === 'Refusé' ? item.status : 'Envoyé',
            sentAt
          };
        }
        return {
          ...item,
          email: recipient,
          status: 'En attente',
          sentAt: item.sentAt || sentAt,
          lastReminderAt: sentAt,
          reminderCount: (item.reminderCount || 0) + 1
        };
      }));

      await registerCommunicationLog(task, 'sent');
      await registerDossierEvent(dossier, {
        type: 'communication',
        title: action === 'quote_send' ? 'Devis envoye au client' : 'Relance devis envoyee',
        description: `${quote.id} transmis a ${recipient}.`,
        status: 'success',
        documentType: 'devis',
        documentId: quote.id,
        channel: 'Email',
        recipient,
        metadata: { action }
      });
      context?.pushNotification(action === 'quote_send' ? 'Devis envoye' : 'Relance envoyee', `${quote.id} a ete transmis a ${recipient}.`, 'success');
      return true;
    } catch (error: any) {
      const message = error?.message || 'Envoi du devis impossible.';
      await registerCommunicationLog(task, 'failed', message).catch(() => undefined);
      await registerDossierEvent(dossier, {
        type: 'communication',
        title: action === 'quote_send' ? 'Echec envoi devis' : 'Echec relance devis',
        description: message,
        status: 'error',
        documentType: 'devis',
        documentId: quote.id,
        channel: 'Email',
        recipient,
        metadata: { action }
      });
      context?.pushNotification('Echec de l\'envoi', message, 'warning');
      return false;
    }
  };

  const sendInvoiceEmailFromDossier = async (dossier: ClientDossier, invoice: Facture, action: CommunicationAction) => {
    const recipient = cleanText(invoice.email || dossier.quote?.email || dossier.request?.email);
    if (!recipient) {
      await registerDossierEvent(dossier, {
        type: 'communication',
        title: 'Email facture bloque',
        description: `Impossible d'envoyer ${invoice.id}: adresse email client manquante.`,
        status: 'warning',
        documentType: 'facture',
        documentId: invoice.id,
        channel: 'Email'
      });
      context?.pushNotification('Email manquant', 'Ajoutez une adresse email a la facture avant de lancer l\'envoi.', 'warning');
      return false;
    }

    const sentAt = nowIso();
    const invoiceForEmail: Facture = { ...invoice, email: recipient };
    const rendered = renderCommunication(action, invoiceForEmail, 'facture', communicationSettings);
    const task = buildDossierCommunicationTask(dossier, 'facture', invoiceForEmail, action, rendered.subject, rendered.body, recipient);

    try {
      const response = action === 'invoice_send'
        ? await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'admin-doc',
              documentType: 'facture',
              data: {
                id: invoice.id,
                clientName: invoice.clientName,
                clientEmail: recipient,
                pdfName: `Facture_${invoice.id}.pdf`,
                docData: invoiceForEmail,
                subject: rendered.subject,
                body: rendered.body
              }
            })
          })
        : await adminFetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify({
              type: 'invoice-reminder',
              data: {
                invoice: invoiceForEmail,
                subject: rendered.subject,
                body: rendered.body
              }
            })
          });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || 'Envoi de la facture impossible.');
      }

      await setFactures(prev => prev.map(item => {
        if (item.id !== invoice.id) return item;
        const nextInvoice: Facture = {
          ...item,
          email: recipient,
          sentAt: item.sentAt || sentAt
        };
        if (action !== 'invoice_send') {
          nextInvoice.lastReminderAt = sentAt;
          nextInvoice.reminderCount = (item.reminderCount || 0) + 1;
          if (action === 'invoice_overdue') nextInvoice.status = 'En retard';
        }
        return nextInvoice;
      }));

      await registerCommunicationLog(task, 'sent');
      await registerDossierEvent(dossier, {
        type: 'communication',
        title: action === 'invoice_send' ? 'Facture envoyee au client' : 'Relance facture envoyee',
        description: `${invoice.id} transmis a ${recipient}.`,
        status: 'success',
        documentType: 'facture',
        documentId: invoice.id,
        channel: 'Email',
        recipient,
        metadata: { action }
      });
      context?.pushNotification(action === 'invoice_send' ? 'Facture envoyee' : 'Relance envoyee', `${invoice.id} a ete transmis a ${recipient}.`, 'success');
      return true;
    } catch (error: any) {
      const message = error?.message || 'Envoi de la facture impossible.';
      await registerCommunicationLog(task, 'failed', message).catch(() => undefined);
      await registerDossierEvent(dossier, {
        type: 'communication',
        title: action === 'invoice_send' ? 'Echec envoi facture' : 'Echec relance facture',
        description: message,
        status: 'error',
        documentType: 'facture',
        documentId: invoice.id,
        channel: 'Email',
        recipient,
        metadata: { action }
      });
      context?.pushNotification('Echec de l\'envoi', message, 'warning');
      return false;
    }
  };

  const prepareDossierNotification = async (templateId: string, dossier: ClientDossier) => {
    const template = templates.find(t => t.id === templateId) || SEED_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const renderedBody = renderTemplate(template.body, dossier);
    const renderedSubject = template.subject ? renderTemplate(template.subject, dossier) : '';
    const recipient = template.channel === 'SMS'
      ? getDossierPhone(dossier)
      : cleanText(dossier.quote?.email || dossier.invoice?.email || dossier.request?.email);

    const noteId = createEntityId('NOTE');
    const newNote: DossierNote = {
      id: noteId,
      dossierId: dossier.dossierId,
      dossierKey: dossier.key,
      author: `${user?.email || 'Secretariat'} (CRM)`,
      content: `[Message prepare ${template.channel}] ${template.title}\n\n${template.subject ? `Objet : ${renderedSubject}\n` : ''}${renderedBody}`,
      createdAt: toIsoDate()
    };
    await setDossierNotes(prev => [newNote, ...prev]);
    const eventInput: DossierEventInput = {
      type: 'communication',
      title: `Message prepare: ${template.title}`,
      description: template.channel === 'SMS'
        ? 'SMS prepare dans le dossier. Aucun fournisseur SMS reel n est encore connecte.'
        : 'Message prepare et archive dans les notes CRM.',
      status: template.channel === 'SMS' ? 'warning' : 'info',
      channel: template.channel
    };
    if (recipient) eventInput.recipient = recipient;
    await registerDossierEvent(dossier, eventInput);
    context?.pushNotification('Message prepare', `Le message "${template.title}" est archive dans le dossier de ${dossier.clientName}.`, 'info');
  };
  const createAcceptedQuoteArtifacts = async (quote: Devis) => {
    await createMoveFromQuote(quote);
  };

  // Workflow Actions Runner
  const runDossierWorkflowAction = async (actionId: string, dossier: ClientDossier) => {
    switch (actionId) {
      case 'plan_visit': {
        const visitId = `VIS-${Date.now()}`;
        const dossierId = dossier.dossierId || buildDossierIdFromReference('REQ', dossier.request?.id || visitId);
        const visitPreference = dossier.request?.visitPreference;
        const visitMode: Visite['visitMode'] = visitPreference === 'domicile' || visitPreference === 'visio' || visitPreference === 'a_definir'
          ? visitPreference
          : 'a_definir';
        const newVisit: Visite = {
          id: visitId,
          dossierId,
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
          await setPublicRequests(prev => prev.map(r => r.id === dossier.request?.id ? { ...r, dossierId, status: 'Visite_planifiée', plannedVisitId: visitId } : r));
        }
        await registerDossierEvent(dossier, {
          type: 'workflow',
          title: 'Visite planifiee',
          description: `Rendez-vous ${newVisit.id} fixe le ${newVisit.date} a ${newVisit.time}.`,
          status: 'success',
          documentType: 'visite',
          documentId: newVisit.id
        });
        context?.pushNotification('Visite Planifiée 📅', `Rendez-vous fixé pour ${dossier.clientName}.`, 'success');
        break;
      }
      case 'convert_direct': {
        const devisId = getNextReference('DEV', devisList.map((item) => item.id));
        const dossierId = dossier.dossierId || buildDossierIdFromReference('REQ', dossier.request?.id || devisId);
        const volume = getDossierVolume(dossier);
        const formula = normalizeFormula(dossier.request?.formula);
        const item: Devis = {
          id: devisId,
          dossierId,
          clientName: dossier.clientName,
          phone: getDossierPhone(dossier),
          email: dossier.request?.email || '',
          fromCity: getDossierFromCity(dossier),
          toCity: getDossierToCity(dossier),
          fromAddress: dossier.request?.fromAddress || '',
          toAddress: dossier.request?.toAddress || '',
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
          await setPublicRequests(prev => prev.map(r => r.id === dossier.request?.id ? { ...r, dossierId, status: 'Étudié_Converti', convertedDevisId: devisId } : r));
        }
        await registerDossierEvent(dossier, {
          type: 'workflow',
          title: 'Devis brouillon cree',
          description: `Devis ${devisId} cree directement depuis la demande.`,
          status: 'success',
          documentType: 'devis',
          documentId: devisId
        });
        context?.pushNotification('Devis Créé 🚀', `Devis brouillon ${devisId} créé directement.`, 'success');
        break;
      }
      case 'archive_request': {
        if (dossier.request?.id) {
          await setPublicRequests(prev => prev.map(r => r.id === dossier.request?.id ? { ...r, status: 'Archivé' } : r));
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Demande archivee',
            description: 'Demande classee sans suite depuis le dossier.',
            status: 'info',
            documentType: 'demande',
            documentId: dossier.request.id
          });
          context?.pushNotification('Demande Classée 📂', `Demande archivée pour ${dossier.clientName}.`, 'info');
        }
        break;
      }
      case 'realize_visit': {
        if (dossier.visit?.id) {
          await setVisites(prev => prev.map(v => v.id === dossier.visit?.id ? { ...v, status: 'Réalisée' } : v));
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Visite realisee',
            description: `Visite ${dossier.visit.id} marquee comme realisee.`,
            status: 'success',
            documentType: 'visite',
            documentId: dossier.visit.id
          });
          context?.pushNotification('Visite Effectuée ✅', `Visite marquée réalisée.`, 'success');
        }
        break;
      }
      case 'create_quote_from_visit': {
        if (dossier.visit?.id) {
          const devisId = getNextReference('DEV', devisList.map((item) => item.id));
          const dossierId = dossier.dossierId || dossier.visit.dossierId || buildDossierIdFromReference('VIS', dossier.visit.id);
          const volume = getDossierVolume(dossier, dossier.visit.volumeEstimated || 20);
          const formula = normalizeFormula(dossier.request?.formula);
          const item: Devis = {
            id: devisId,
            dossierId,
            clientName: dossier.clientName,
            phone: getDossierPhone(dossier),
            email: dossier.request?.email || '',
            fromCity: getDossierFromCity(dossier),
            toCity: getDossierToCity(dossier),
            fromAddress: dossier.request?.fromAddress || '',
            toAddress: dossier.request?.toAddress || '',
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
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Devis genere depuis visite',
            description: `Devis ${devisId} genere depuis la visite ${dossier.visit.id}.`,
            status: 'success',
            documentType: 'devis',
            documentId: devisId
          });
          context?.pushNotification('Devis Émis 📝', `Devis ${devisId} généré depuis la visite.`, 'success');
        }
        break;
      }
      case 'cancel_visit': {
        if (dossier.visit?.id) {
          await setVisites(prev => prev.map(v => v.id === dossier.visit?.id ? { ...v, status: 'Annulée' } : v));
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Visite annulee',
            description: `Visite ${dossier.visit.id} annulee depuis le dossier.`,
            status: 'warning',
            documentType: 'visite',
            documentId: dossier.visit.id
          });
          context?.pushNotification('Visite Annulée ❌', `Visite annulée.`, 'info');
        }
        break;
      }
      case 'send_quote': {
        if (dossier.quote?.id) {
          await sendQuoteEmailFromDossier(dossier, 'quote_send');
        }
        break;
      }
      case 'remind_quote': {
        if (dossier.quote?.id) {
          await sendQuoteEmailFromDossier(dossier, getQuoteReminderAction(dossier.quote));
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
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Devis signe',
            description: `Devis ${dossier.quote.id} accepte. Facture et mission controlees.`,
            status: 'success',
            documentType: 'devis',
            documentId: dossier.quote.id
          });
          context?.pushNotification('Devis Signé ✍️', `Devis accepté ! Lancement logistique.`, 'success');
        }
        break;
      }
      case 'refuse_quote': {
        if (dossier.quote?.id) {
          await setDevisList(prev => prev.map(q => q.id === dossier.quote?.id ? { ...q, status: 'Refusé', refusedAt: toIsoDate() } : q));
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Devis refuse',
            description: `Devis ${dossier.quote.id} marque comme refuse.`,
            status: 'info',
            documentType: 'devis',
            documentId: dossier.quote.id
          });
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
            await registerDossierEvent(dossierWithInvoice, {
              type: 'workflow',
              title: 'Facture generee',
              description: `Facture ${invoice.id} creee depuis le devis ${dossier.quote.id}.`,
              status: 'success',
              documentType: 'facture',
              documentId: invoice.id
            });
            context?.pushNotification('Facture générée', `Facture ${invoice.id} créée pour ${dossier.clientName}.`, 'success');
            await sendInvoiceEmailFromDossier(dossierWithInvoice, invoice, 'invoice_send');
          }
        }
        break;
      }
      case 'pay_invoice': {
        if (dossier.invoice?.id) {
          await setFactures(prev => prev.map(f => f.id === dossier.invoice?.id ? { ...f, status: 'Payée' } : f));
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Paiement enregistre',
            description: `Facture ${dossier.invoice.id} marquee payee.`,
            status: 'success',
            documentType: 'facture',
            documentId: dossier.invoice.id
          });
          context?.pushNotification('Paiement Reçu 💳', `Facture ${dossier.invoice.id} réglée.`, 'success');
        }
        break;
      }
      case 'remind_invoice': {
        if (dossier.invoice?.id) {
          const invoiceAction: CommunicationAction = dossier.invoice.status === 'En retard' ? 'invoice_overdue' : 'invoice_reminder';
          await sendInvoiceEmailFromDossier(dossier, dossier.invoice, invoiceAction);
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
          await registerDossierEvent(dossier, {
            type: 'assignment',
            title: 'Affectation bloquee',
            description: 'Equipe ou vehicule disponible manquant pour planifier la mission.',
            status: 'warning',
            documentType: 'demenagement',
            documentId: dossier.move.id
          });
          context?.pushNotification(
            'Ressources à compléter',
            'Ajoutez au moins un équipier disponible et un véhicule disponible dans Équipe & outils.',
            'warning'
          );
        } else {
          await registerDossierEvent(dossier, {
            type: 'assignment',
            title: 'Affectation ouverte',
            description: 'Le dossier a ete ouvert pour affecter equipe, chef de mission et vehicule.',
            status: 'info',
            documentType: 'demenagement',
            documentId: dossier.move.id
          });
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
          await prepareDossierNotification('planning_j3', dossier);
        }
        break;
      }
      case 'complete_move': {
        if (dossier.move?.id) {
          await setDemenagements(prev => prev.map(m => m.id === dossier.move?.id ? { ...m, status: 'Terminé' } : m));
          await registerDossierEvent(dossier, {
            type: 'workflow',
            title: 'Mission terminee',
            description: `Demenagement ${dossier.move.id} marque termine.`,
            status: 'success',
            documentType: 'demenagement',
            documentId: dossier.move.id
          });
          context?.pushNotification('Chantier Clos 🏆', `Déménagement de ${dossier.clientName} terminé.`, 'success');
        }
        break;
      }
      case 'archive_dossier': {
        await registerDossierEvent(dossier, {
          type: 'workflow',
          title: 'Dossier archive',
          description: 'Archivage demande depuis le pipeline dossier.',
          status: 'info'
        });
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
    const legacyKey = activeDossier?.clientName ? normalizeDossierKey(activeDossier.clientName) : key;
    const existing = dossierOwners.find(o => o.key === key || o.dossierId === key || o.key === legacyKey);
    if (existing) {
      await setDossierOwners(prev => prev.map(o => (
        o.key === key || o.dossierId === key || o.key === legacyKey
          ? { ...o, key, dossierId: key, owner }
          : o
      )));
    } else {
      const id = createEntityId('OWN');
      await setDossierOwners(prev => [{ id, key, dossierId: key, owner }, ...prev]);
    }
    await registerDossierEventForKey(key, {
      type: 'assignment',
      title: 'Responsable modifie',
      description: `Dossier assigne a ${owner}.`,
      status: 'success'
    });
    context?.pushNotification('Assignation Mise à jour 👤', `Responsable mis à jour pour ce dossier.`, 'success');
  };

  const handleAddNote = async (key: string, content: string) => {
    const noteId = createEntityId('NOTE');
    const newNote: DossierNote = {
      id: noteId,
      dossierId: key,
      dossierKey: key,
      author: currentUserLabel || 'Administrateur',
      content,
      createdAt: toIsoDate()
    };
    await setDossierNotes(prev => [newNote, ...prev]);
    await registerDossierEventForKey(key, {
      type: 'note',
      title: 'Note interne ajoutee',
      description: content.length > 120 ? `${content.slice(0, 120)}...` : content,
      status: 'info'
    });
    context?.pushNotification('Note Ajoutée 📝', `Note interne enregistrée.`, 'success');
  };

  const handleAddTask = async (task: Omit<DossierTask, 'id' | 'createdAt' | 'done'>, options?: { notify?: boolean }) => {
    const taskId = createEntityId('TSK');
    const newTask: DossierTask = {
      ...task,
      dossierId: task.dossierKey,
      id: taskId,
      done: false,
      createdAt: toIsoDate()
    };
    await setDossierTasks(prev => [newTask, ...prev]);
    await registerDossierEventForKey(task.dossierKey, {
      type: 'task',
      title: 'Tache creee',
      description: `${newTask.title} - ${newTask.owner}`,
      status: newTask.priority === 'urgent' ? 'warning' : 'info'
    });
    if (options?.notify !== false) {
      context?.pushNotification('Tache ajoutee', 'Nouvelle tache de suivi creee.', 'success');
    }
  };

  const handleCreateTaskFromTodayAction = async (action: TodayAction, options?: { notify?: boolean }) => {
    const dossier = allDossiers.find((item) => item.key === action.dossierKey || item.dossierId === action.dossierId);
    if (!dossier) {
      if (options?.notify !== false) {
        context?.pushNotification('Action indisponible', 'Le dossier lie a cette action est introuvable.', 'warning');
      }
      return false;
    }

    if (hasOpenTaskForTodayAction(dossierTasks, action)) {
      if (options?.notify !== false) {
        context?.pushNotification('Tache deja ouverte', 'Une tache identique existe deja sur ce dossier.', 'info');
      }
      return false;
    }

    await handleAddTask({
      dossierId: dossier.dossierId,
      dossierKey: dossier.key,
      title: action.taskTitle,
      owner: hasMeaningfulOwner(dossier.owner) ? dossier.owner : currentUserLabel || 'Administrateur',
      dueDate: action.dueDate,
      priority: action.priority,
      source: 'today_action',
      sourceActionId: action.id,
      sourceIssueKind: action.issueKind,
      sourceLabel: action.title
    }, options);
    return true;
  };
  const handleToggleTask = async (taskId: string) => {
    const task = dossierTasks.find(item => item.id === taskId);
    await setDossierTasks(prev => prev.map(t => t.id === taskId ? { ...t, done: !t.done } : t));
    if (task) {
      await registerDossierEventForKey(task.dossierId || task.dossierKey, {
        type: 'task',
        title: task.done ? 'Tache reouverte' : 'Tache terminee',
        description: task.title,
        status: task.done ? 'info' : 'success'
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const task = dossierTasks.find(item => item.id === taskId);
    await setDossierTasks(prev => prev.filter(t => t.id !== taskId));
    if (task) {
      await registerDossierEventForKey(task.dossierId || task.dossierKey, {
        type: 'task',
        title: 'Tache supprimee',
        description: task.title,
        status: 'info'
      });
    }
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
    const dossier = allDossiers.find(item => item.move?.id === moveId);
    if (dossier) {
      await registerDossierEvent(dossier, {
        type: 'assignment',
        title: 'Equipe et vehicule affectes',
        description: `Chef: ${assignment.teamLeader}. Vehicule: ${assignment.assignedTruck}. Equipe: ${assignment.assignedMovers.join(', ')}.`,
        status: 'success',
        documentType: 'demenagement',
        documentId: moveId
      });
    }
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

  const allTodayActions = useMemo(() => buildTodayActions({
    dossiers: allDossiers,
    tasks: dossierTasks,
    role,
    maxActions: 20
  }), [allDossiers, dossierTasks, role]);

  const todayActions = useMemo(() => allTodayActions.slice(0, 6), [allTodayActions]);
  const creatableTodayActions = useMemo(() => todayActions.filter((action) => !action.alreadyTasked).slice(0, 3), [todayActions]);
  const todayActionStats = useMemo(() => summarizeTodayActions(allTodayActions), [allTodayActions]);

  const handleCreateTopTodayTasks = async () => {
    if (creatableTodayActions.length === 0) {
      context?.pushNotification('Actions du jour', 'Toutes les actions visibles sont deja couvertes.', 'info');
      return;
    }

    let createdCount = 0;
    for (const action of creatableTodayActions) {
      const created = await handleCreateTaskFromTodayAction(action, { notify: false });
      if (created) createdCount += 1;
    }

    if (createdCount > 0) {
      context?.pushNotification(
        'Actions du jour',
        `${createdCount} tache${createdCount > 1 ? 's' : ''} prioritaire${createdCount > 1 ? 's' : ''} creee${createdCount > 1 ? 's' : ''}.`,
        'success'
      );
      return;
    }

    context?.pushNotification('Actions du jour', 'Aucune tache supplementaire creee.', 'info');
  };

  const cockpitMetrics = useMemo(() => {
    const openDossiers = allDossiers.filter((dossier) => dossier.stage !== 'termine');
    const getQuality = (dossier: ClientDossier) => dossierQualityByKey.get(dossier.key) || analyzeDossierQuality(dossier);
    const urgentDossiers = allDossiers.filter((dossier) => dossier.risk === 'urgent');
    const blockedDossiers = openDossiers.filter((dossier) => getQuality(dossier).blocked);
    const quoteFollowUps = allDossiers.filter((dossier) => (
      getQuality(dossier).filters.includes('followup')
    ));
    const incompletePlanning = allDossiers.filter((dossier) => (
      getQuality(dossier).filters.includes('planning_incomplete')
    ));
    const overdueInvoices = allDossiers.filter((dossier) => getQuality(dossier).filters.includes('invoice_risk'));
    const moveSoonDossiers = openDossiers.filter((dossier) => getQuality(dossier).filters.includes('move_soon'));
    const openAmount = openDossiers.reduce((sum, dossier) => sum + dossier.amount, 0);

    const priorityDossiers = [...openDossiers]
      .sort((a, b) => {
        const qualityDelta = getQuality(b).score - getQuality(a).score;
        if (qualityDelta !== 0) return qualityDelta;
        const riskDelta = DOSSIER_RISK_WEIGHT[a.risk] - DOSSIER_RISK_WEIGHT[b.risk];
        if (riskDelta !== 0) return riskDelta;
        return getDossierComparableDate(a) - getDossierComparableDate(b);
      })
      .slice(0, 3);

    return {
      openCount: openDossiers.length,
      urgentCount: urgentDossiers.length,
      blockedCount: blockedDossiers.length,
      quoteFollowUpCount: quoteFollowUps.length,
      incompletePlanningCount: incompletePlanning.length,
      overdueInvoiceCount: overdueInvoices.length,
      moveSoonCount: moveSoonDossiers.length,
      openAmount,
      priorityDossiers
    };
  }, [allDossiers, dossierQualityByKey]);

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

          <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent">
                  <FolderOpen size={14} />
                  Tour de contrôle CRM
                </div>
                <h2 className="mt-2 text-xl font-black tracking-tight text-brand-950 dark:text-white">
                  Cockpit dossiers clients
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 max-w-2xl">
                  Dossiers actifs, priorités, relances et affectations issus des données CRM.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('all');
                    setDossierQualityFilter('all');
                    setDossierSort('priority');
                  }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 px-3 py-2 text-left hover:border-accent/50 transition-all"
                >
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <FolderOpen size={11} /> Ouverts
                  </span>
                  <strong className="mt-1 block text-lg font-black text-slate-950 dark:text-white">{cockpitMetrics.openCount}</strong>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('all');
                    setDossierQualityFilter('blocked');
                    setDossierSort('priority');
                  }}
                  className="rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/70 dark:bg-red-950/10 px-3 py-2 text-left hover:border-red-300 transition-all"
                >
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-red-600 dark:text-red-300">
                    <AlertTriangle size={11} /> Bloques
                  </span>
                  <strong className="mt-1 block text-lg font-black text-red-700 dark:text-red-300">{cockpitMetrics.blockedCount}</strong>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('urgent');
                    setDossierQualityFilter('all');
                  }}
                  className="rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/70 dark:bg-red-950/10 px-3 py-2 text-left hover:border-red-300 transition-all"
                >
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-red-600 dark:text-red-300">
                    <AlertTriangle size={11} /> Urgents
                  </span>
                  <strong className="mt-1 block text-lg font-black text-red-700 dark:text-red-300">{cockpitMetrics.urgentCount}</strong>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('all');
                    setDossierQualityFilter('followup');
                    setDossierSort('priority');
                  }}
                  className="rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-950/10 px-3 py-2 text-left hover:border-amber-300 transition-all"
                >
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    <Mail size={11} /> Relances
                  </span>
                  <strong className="mt-1 block text-lg font-black text-amber-800 dark:text-amber-300">{cockpitMetrics.quoteFollowUpCount}</strong>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('all');
                    setDossierQualityFilter('planning_incomplete');
                    setDossierSort('priority');
                  }}
                  className="rounded-lg border border-sky-200 dark:border-sky-900/40 bg-sky-50/70 dark:bg-sky-950/10 px-3 py-2 text-left hover:border-sky-300 transition-all"
                >
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-300">
                    <Users size={11} /> Planning
                  </span>
                  <strong className="mt-1 block text-lg font-black text-sky-800 dark:text-sky-300">{cockpitMetrics.incompletePlanningCount}</strong>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('all');
                    setDossierQualityFilter('invoice_risk');
                    setDossierSort('priority');
                  }}
                  className="rounded-lg border border-rose-200 dark:border-rose-900/40 bg-rose-50/70 dark:bg-rose-950/10 px-3 py-2 text-left hover:border-rose-300 transition-all"
                >
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
                    <FileText size={11} /> Retard
                  </span>
                  <strong className="mt-1 block text-lg font-black text-rose-800 dark:text-rose-300">{cockpitMetrics.overdueInvoiceCount}</strong>
                </button>
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2">
                  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    <CheckCircle2 size={11} /> Ouvert
                  </span>
                  <strong className="mt-1 block text-lg font-black text-brand-950 dark:text-white">
                    {cockpitMetrics.openAmount.toLocaleString('fr-FR')} €
                  </strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0">
              <div className="p-5">
                <section className="mb-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">Actions du jour</span>
                      <h3 className="mt-1 text-sm font-black text-brand-950 dark:text-white">Taches proposees par le CRM</h3>
                      <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {todayActionStats.openToCreate} a creer, {todayActionStats.alreadyTasked} deja couvertes par une tache ouverte.
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-black uppercase">
                        <div className="rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300">
                          {todayActionStats.critical} critiques
                        </div>
                        <div className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300">
                          {todayActionStats.warning} suivis
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300">
                          {todayActionStats.total} total
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={creatableTodayActions.length === 0}
                        onClick={handleCreateTopTodayTasks}
                        className="inline-flex items-center justify-center rounded-lg bg-brand-900 px-3 py-2 text-[10px] font-black uppercase text-white shadow-sm transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent dark:text-brand-950"
                      >
                        {creatableTodayActions.length > 0 ? `Creer ${creatableTodayActions.length} tache${creatableTodayActions.length > 1 ? 's' : ''}` : 'Tout couvert'}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {todayActions.map((action) => (
                      <div key={action.id} className={`rounded-xl border p-3 ${getTodayActionToneClasses(action.tone)}`}>
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[9px] font-black uppercase tracking-wider opacity-70">{action.clientName}</span>
                              <span className="rounded-md bg-white/60 dark:bg-slate-950/40 px-1.5 py-0.5 text-[8px] font-black uppercase opacity-80">{getDossierStageLabel(action.stage)}</span>
                              {action.alreadyTasked && (
                                <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[8px] font-black uppercase text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">Tache ouverte</span>
                              )}
                              <span className="rounded-md bg-white/60 px-1.5 py-0.5 text-[8px] font-black uppercase opacity-80 dark:bg-slate-950/40">{action.priority === 'urgent' ? 'Urgent' : 'Normal'}</span>
                              <span className="rounded-md bg-white/60 px-1.5 py-0.5 text-[8px] font-black uppercase opacity-80 dark:bg-slate-950/40">Echeance {action.dueDate}</span>
                            </div>
                            <p className="mt-1 text-xs font-black text-current">{action.title}</p>
                            <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold opacity-80">{action.description}</p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedDossierKey(action.dossierKey)}
                              className="rounded-lg bg-white/80 hover:bg-white px-3 py-2 text-[10px] font-black uppercase text-slate-700 shadow-sm dark:bg-slate-950/60 dark:text-slate-100"
                            >
                              Ouvrir
                            </button>
                            <button
                              type="button"
                              disabled={action.alreadyTasked}
                              onClick={() => handleCreateTaskFromTodayAction(action)}
                              className="rounded-lg bg-brand-900 hover:bg-brand-hover px-3 py-2 text-[10px] font-black uppercase text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:bg-accent dark:text-brand-950"
                            >
                              {action.alreadyTasked ? 'Couverte' : 'Creer tache'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {todayActions.length === 0 && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-300">
                        <p className="text-xs font-black">Aucune action critique pour ce role.</p>
                        <p className="mt-1 text-[11px] font-semibold opacity-80">Les dossiers ouverts ne demandent pas de tache immediate selon les controles actuels.</p>
                      </div>
                    )}
                  </div>
                </section>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">À traiter maintenant</span>
                    <h3 className="mt-1 text-sm font-black text-brand-950 dark:text-white">Dossiers prioritaires</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setWorkflowStageFilter('all');
                      setDossierRiskFilter('all');
                      setDossierSort('priority');
                    }}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 px-3 py-2 text-[10px] font-black uppercase text-slate-600 dark:text-slate-200"
                  >
                    Voir tout
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-3">
                  {cockpitMetrics.priorityDossiers.map((dossier) => {
                    const action = getDossierWorkflowActions(dossier)[0];
                    const quality = getDossierQualitySummary(dossier);
                    return (
                      <article
                        key={dossier.key}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-950/30 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className={`inline-flex rounded-md px-2 py-1 text-[9px] font-black uppercase ${
                              dossier.risk === 'urgent'
                                ? 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300'
                                : dossier.risk === 'attention'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300'
                                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                            }`}>
                              {getDossierStageLabel(dossier.stage)}
                            </span>
                            <h4 className="mt-2 truncate text-sm font-black text-brand-950 dark:text-white">{dossier.clientName}</h4>
                            <div className="mt-2 space-y-1">
                              <span className={`inline-flex border px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${quality.primaryIssue ? getDossierQualityPillClass(quality.primaryIssue.severity) : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/25 dark:text-emerald-300 dark:border-emerald-900/50'}`}>
                                {quality.primaryIssue?.label || quality.label}
                              </span>
                              <p className="line-clamp-2 text-xs font-medium text-slate-500 dark:text-slate-400">{quality.reason}</p>
                            </div>
                          </div>
                          <strong className={`shrink-0 text-xs font-black ${getDossierQualityScoreClass(quality.score)}`}>
                            {quality.score > 0 ? `${quality.score}/100` : dossier.amount > 0 ? `${dossier.amount.toLocaleString('fr-FR')} €` : '-'}
                          </strong>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-200/70 dark:border-slate-800 pt-3">
                          <button
                            type="button"
                            onClick={() => setSelectedDossierKey(dossier.key)}
                            className="text-[10px] font-black uppercase text-slate-500 hover:text-brand-900 dark:hover:text-white"
                          >
                            Ouvrir
                          </button>
                          {action && (
                            <button
                              type="button"
                              onClick={() => runDossierWorkflowAction(action.id, dossier)}
                              className="rounded-md bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:text-brand-950 px-2.5 py-1.5 text-[10px] font-black uppercase text-white"
                            >
                              {quality.actionLabel || action.label}
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}

                  {cockpitMetrics.priorityDossiers.length === 0 && (
                    <div className="xl:col-span-3 rounded-lg border border-dashed border-slate-250 dark:border-slate-800 p-6 text-center">
                      <CheckCircle2 className="mx-auto text-emerald-500" size={24} />
                      <p className="mt-2 text-sm font-black text-slate-600 dark:text-slate-300">Aucun dossier prioritaire.</p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 bg-slate-50/55 dark:bg-slate-950/20 p-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Santé portefeuille</span>
                <div className="mt-3 space-y-3">
                  {[
                    { label: 'Dossiers bloqués', value: cockpitMetrics.blockedCount, icon: <AlertTriangle size={14} className="text-red-600" /> },
                    { label: 'Devis à relancer', value: cockpitMetrics.quoteFollowUpCount, icon: <Mail size={14} className="text-amber-600" /> },
                    { label: 'Plannings incomplets', value: cockpitMetrics.incompletePlanningCount, icon: <Users size={14} className="text-sky-600" /> },
                    { label: 'Factures à risque', value: cockpitMetrics.overdueInvoiceCount, icon: <FileText size={14} className="text-rose-600" /> },
                    { label: 'Interventions proches', value: cockpitMetrics.moveSoonCount, icon: <Calendar size={14} className="text-emerald-600" /> }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-3">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <p className="text-[11px] font-bold leading-relaxed text-slate-600 dark:text-slate-300">{item.label}</p>
                      </div>
                      <strong className="text-sm font-black text-brand-950 dark:text-white">{item.value}</strong>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

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
          <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/75 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-brand-950 dark:text-white uppercase tracking-wider">Registre actif des dossiers</h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Demandes, visites, devis, factures et missions consolidés</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    title="Vue Liste"
                  >
                    <LayoutList size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                    title="Vue Pipeline"
                  >
                    <Columns size={16} />
                  </button>
                </div>
                <span className="text-[10px] font-black uppercase bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 text-slate-500 rounded-md px-2.5 py-1">
                  {filteredDossiers.length} dossier(s)
                </span>
              </div>
            </div>

            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 space-y-3 print:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-8 gap-3">
                {isUsingGlobalSearch ? (
                  <div className="xl:col-span-2 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2">
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
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-4 text-xs font-bold shadow-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                )}

                <select
                  value={workflowStageFilter}
                  onChange={(event) => setWorkflowStageFilter(event.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  <option value="all">Toutes les étapes</option>
                  {DOSSIER_STAGES.map((stage) => (
                    <option key={stage.key} value={stage.key}>{stage.label}</option>
                  ))}
                </select>

                <select
                  value={dossierRiskFilter}
                  onChange={(event) => setDossierRiskFilter(event.target.value as DossierRiskFilter)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  <option value="all">Toutes priorités</option>
                  <option value="urgent">Urgent</option>
                  <option value="attention">À surveiller</option>
                  <option value="normal">Normal</option>
                </select>

                <select
                  value={dossierQualityFilter}
                  onChange={(event) => setDossierQualityFilter(event.target.value as DossierQualityFilterOption)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  {DOSSIER_QUALITY_FILTERS.map((filter) => (
                    <option key={filter.value} value={filter.value}>{filter.label}</option>
                  ))}
                </select>

                <select
                  value={dossierOwnerFilter}
                  onChange={(event) => setDossierOwnerFilter(event.target.value)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
                >
                  <option value="all">Tous responsables</option>
                  {dossierOwnerFilterOptions.map((owner) => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>

                <select
                  value={dossierSort}
                  onChange={(event) => setDossierSort(event.target.value as DossierSortOption)}
                  className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
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
                    className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
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
                  {dossierQualityFilter !== 'all' && (
                    <span className="ml-1 text-slate-400">· Contrôle {DOSSIER_QUALITY_FILTERS.find((filter) => filter.value === dossierQualityFilter)?.label}</span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearchQuery('');
                    setWorkflowStageFilter('all');
                    setDossierRiskFilter('all');
                    setDossierQualityFilter('all');
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
                  <tr className="bg-slate-50/80 dark:bg-slate-950/30 text-slate-400 font-black uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="p-4">Client</th>
                    <th className="p-4">Avancement</th>
                    <th className="p-4">Parcours & Villes</th>
                    <th className="p-4">Montant</th>
                    <th className="p-4">Responsable</th>
                    <th className="p-4">Prochaine action</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {paginatedDossiers.map(d => {
                    const isUrgent = d.risk === 'urgent';
                    const isAttention = d.risk === 'attention';
                    const quality = getDossierQualitySummary(d);

                    return (
                      <tr
                        key={d.key}
                        onClick={() => setSelectedDossierKey(d.key)}
                        className="hover:bg-slate-50/85 dark:hover:bg-slate-950/40 cursor-pointer transition-colors duration-200 group"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${isUrgent ? 'bg-red-500 animate-pulse' : isAttention ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            <div>
                              <strong className="font-extrabold text-slate-900 dark:text-white text-xs">{d.clientName}</strong>
                              <p className="text-[10px] text-slate-400 mt-0.5">{d.phone || 'Pas de téléphone'}</p>
                              {quality.primaryIssue && (
                                <div className="mt-1 flex flex-wrap items-center gap-1">
                                  <span className={`inline-flex border px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${getDossierQualityPillClass(quality.primaryIssue.severity)}`}>
                                    {quality.primaryIssue.label}
                                  </span>
                                  {quality.issues.length > 1 && (
                                    <span className="text-[8px] font-black text-slate-400">+{quality.issues.length - 1}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="w-24">
                            <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mb-1">
                              <span>{getDossierStageLabel(d.stage)}</span>
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
                          <span className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-md border dark:border-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                            {d.owner}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="max-w-[220px] rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 px-2 py-1 text-slate-650 dark:text-slate-300">
                            <p className="truncate font-black">{quality.actionLabel}</p>
                            <p className="mt-0.5 truncate text-[9px] font-semibold text-slate-400">{quality.reason}</p>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDossierKey(d.key);
                              }}
                              className="p-1.5 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border dark:border-slate-800 rounded-md text-slate-600 dark:text-slate-300 shadow-sm"
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
                                className="p-1.5 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover rounded-md text-white dark:text-brand-950 shadow-sm"
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
                    className="inline-flex items-center gap-1 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={13} />
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={() => setDossierCurrentPage((page) => Math.min(totalDossierPages, page + 1))}
                    disabled={safeDossierCurrentPage >= totalDossierPages}
                    className="inline-flex items-center gap-1 rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Suivant
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
              </>
            ) : (
              <div className="p-4 bg-slate-50/60 dark:bg-slate-950/20 overflow-x-auto">
                <div className="flex gap-4 min-w-max pb-4">
                  {DOSSIER_STAGES.map(stage => {
                    // Filter dossiers for this specific stage column
                    const stageDossiers = filteredDossiers.filter(d => d.stage === stage.key);
                    const visibleLimit = kanbanVisibleByStage[stage.key] ?? KANBAN_STAGE_BATCH_SIZE;
                    const visibleStageDossiers = stageDossiers.slice(0, visibleLimit);
                    const remainingStageDossiers = Math.max(0, stageDossiers.length - visibleStageDossiers.length);

                    return (
                      <div key={stage.key} className="w-72 flex flex-col shrink-0">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider flex items-center gap-2">
                            {stage.label}
                            <span className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] py-0.5 px-2 rounded-md">
                              {stageDossiers.length}
                            </span>
                          </h4>
                        </div>

                        <div className="flex-1 min-h-[220px] bg-white/60 dark:bg-slate-900/35 rounded-xl p-2 space-y-3 border border-slate-200/70 dark:border-slate-800/70">
                          {visibleStageDossiers.map(d => {
                            const isUrgent = d.risk === 'urgent';
                            const isAttention = d.risk === 'attention';
                            const quality = getDossierQualitySummary(d);

                            return (
                              <div
                                key={d.key}
                                onClick={() => setSelectedDossierKey(d.key)}
                                className={`bg-white dark:bg-slate-950 p-3.5 rounded-lg border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group
                                  ${isUrgent ? 'border-l-4 border-l-red-500 border-red-100 dark:border-red-900/30' : isAttention ? 'border-l-4 border-l-amber-500 border-amber-100 dark:border-amber-900/30' : 'border-l-4 border-l-emerald-500 border-slate-200 dark:border-slate-800'}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <strong className="font-extrabold text-slate-900 dark:text-white text-xs truncate pr-2">
                                    {d.clientName}
                                  </strong>
                                  <span className={`text-[10px] font-black whitespace-nowrap bg-brand-50 dark:bg-brand-900/30 px-1.5 py-0.5 rounded-md ${getDossierQualityScoreClass(quality.score)}`}>
                                    {quality.score > 0 ? `${quality.score}/100` : d.amount > 0 ? d.amount.toLocaleString('fr-FR') + ' €' : '-'}
                                  </span>
                                </div>

                                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-2 truncate">
                                  {d.fromCity} ➔ {d.toCity}
                                </div>

                                {quality.primaryIssue && (
                                  <span className={`mb-2 inline-flex border px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${getDossierQualityPillClass(quality.primaryIssue.severity)}`}>
                                    {quality.primaryIssue.label}
                                  </span>
                                )}
                                <p className="line-clamp-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                  {quality.actionLabel}
                                </p>

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
                                      className="bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover text-white dark:text-brand-950 text-[9px] font-black px-2 py-1 rounded-md"
                                      title={getDossierWorkflowActions(d)[0].label}
                                    >
                                      {quality.actionLabel || getDossierWorkflowActions(d)[0].label}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}

                          {remainingStageDossiers > 0 && (
                            <button
                              type="button"
                              onClick={() => setKanbanVisibleByStage((previous) => ({
                                ...previous,
                                [stage.key]: (previous[stage.key] ?? KANBAN_STAGE_BATCH_SIZE) + KANBAN_STAGE_BATCH_SIZE
                              }))}
                              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-950/70 px-3 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:border-accent hover:text-brand-900 dark:hover:text-white transition-colors"
                            >
                              <Plus size={12} />
                              Charger {Math.min(KANBAN_STAGE_BATCH_SIZE, remainingStageDossiers)} de plus
                              <span className="font-bold normal-case tracking-normal text-slate-400">
                                {remainingStageDossiers} restant{remainingStageDossiers > 1 ? 's' : ''}
                              </span>
                            </button>
                          )}

                          {stageDossiers.length === 0 && (
                            <div className="h-20 flex items-center justify-center text-[10px] text-slate-400">
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
                      onClick={() => prepareDossierNotification(editingTemplate.id!, allDossiers[previewDossierIndex])}
                      className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail size={13} />
                      Preparer le message dans le dossier
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
          events={activeEvents}
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
            await registerDossierEvent(activeDossier, {
              type: 'workflow',
              title: 'Demenagement mis a jour',
              description: 'Informations de suivi ou de mission modifiees.',
              status: 'success',
              documentType: 'demenagement',
              documentId: moveId
            });
            context?.pushNotification('Dossier Mis à jour 💾', 'Le déménagement a été mis à jour.', 'success');
          }}
          onAssignOwner={(key, owner) => handleAssignOwner(key, owner)}
          onAddNote={(key, content) => handleAddNote(key, content)}
          onAddTask={(task) => handleAddTask(task)}
          onToggleTask={(taskId) => handleToggleTask(taskId)}
          onDeleteTask={(taskId) => handleDeleteTask(taskId)}
          onRegisterEvent={async (event) => {
            await registerDossierEvent(activeDossier, event);
          }}
        />
      )}

    </div>
  );
}
