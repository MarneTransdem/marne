import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useSyncedCollection } from '../../hooks/useData';
import { useAuth } from '../../context/AuthContext';
import { Devis, Facture, Demenagement } from '../../types';
import { AdminPublicRequest } from '../../lib/admin-dossiers';
import { buildDossierIdFromReference } from '../../lib/dossier-id';
import { getNextSequencedId, getNextYearlyId } from '../../lib/admin-ids';
import { adminFetch } from '../../lib/admin-api';
import { db } from '../../lib/firebase';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';
import { buildCommunicationLog, renderCommunication, type CommunicationLog, type CommunicationTask } from '../../lib/crm-communications';
import { analyzeQuotePricing, formatPremiumCurrency, scoreQuoteOpportunity } from '../../lib/crm-premium';
import { useCrmSettings } from '../../hooks/useCrmSettings';
import { Plus, Edit, Trash2, FileText, Check, X, MoveRight, Printer, Copy, Search, Calendar, AlertTriangle, Mail, Loader2, Flame, TrendingUp, ShieldCheck } from 'lucide-react';
import { PdfGenerator } from '../../components/admin/PdfGenerator';

const COLUMNS = ['Brouillon', 'Envoyé', 'En attente', 'Signé', 'Refusé'] as const;
type DevisStatus = typeof COLUMNS[number];
type QuoteSortMode = 'priority' | 'recent' | 'amount' | 'moveDate';
type QuoteProfitabilityFilter = 'all' | 'marginRisk' | 'priceAdjust' | 'premium' | 'ready' | 'followUp';

const getQuoteOpportunityClasses = (level: string) => {
  if (level === 'urgent') return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/25 dark:text-red-300 dark:border-red-900/40';
  if (level === 'hot') return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/25 dark:text-amber-300 dark:border-amber-900/40';
  if (level === 'warm') return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/25 dark:text-sky-300 dark:border-sky-900/40';
  if (level === 'done') return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/25 dark:text-emerald-300 dark:border-emerald-900/40';
  return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
};

const getPricingRiskClasses = (level: string) => {
  if (level === 'danger') return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/25 dark:text-red-300 dark:border-red-900/40';
  if (level === 'watch') return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/25 dark:text-amber-300 dark:border-amber-900/40';
  if (level === 'premium') return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/25 dark:text-indigo-300 dark:border-indigo-900/40';
  return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/25 dark:text-emerald-300 dark:border-emerald-900/40';
};
export function AdminDevis() {
  const { user } = useAuth();
  const context = useOutletContext<AdminOutletContextType>();
  const { pricingSettings } = useCrmSettings();
  const [devisList, setDevisList, { daysLimit: devisDays, setDaysLimit: setDevisDays }] = useSyncedCollection<Devis>('devis', [], { timeField: 'createdAt' });
  const [allDevisForIds] = useSyncedCollection<Devis>('devis');
  const [factures, setFactures] = useSyncedCollection<Facture>('factures');
  const [demenagements, setDemenagements] = useSyncedCollection<Demenagement>('demenagements');
  const [publicRequests, setPublicRequests] = useSyncedCollection<AdminPublicRequest>('quotes');

  const [filterQuery, setFilterQuery] = useState('');
  const [quoteSortMode, setQuoteSortMode] = useState<QuoteSortMode>('priority');
  const [profitabilityFilter, setProfitabilityFilter] = useState<QuoteProfitabilityFilter>('all');
  const [showAddDevis, setShowAddDevis] = useState(false);
  const [editingDevisId, setEditingDevisId] = useState<string | null>(null);
  const [selectedPdfQuote, setSelectedPdfQuote] = useState<Devis | null>(null);
  const [sendingQuoteId, setSendingQuoteId] = useState<string | null>(null);
  const [newDevis, setNewDevis] = useState<Partial<Devis>>({
    clientName: '', phone: '', email: '', fromCity: '', toCity: '', fromAddress: '', toAddress: '', volume: 20, formula: 'Standard', price: 1200, status: 'Brouillon',
    fromFloor: '2', toFloor: '0 (RDC)', fromElevator: 'Oui', toElevator: 'Non', fromLift: 'Oui', toLift: 'Non', fromPortage: '-20m', toPortage: '-', distance: '', voyageType: undefined
  });
  const draftPricingInsight = useMemo(() => analyzeQuotePricing(newDevis, pricingSettings), [newDevis, pricingSettings]);

  const resetForm = () => {
    setNewDevis({ clientName: '', phone: '', email: '', fromCity: '', toCity: '', fromAddress: '', toAddress: '', volume: 20, formula: 'Standard', price: 1200, status: 'Brouillon',
      fromFloor: '2', toFloor: '0 (RDC)', fromElevator: 'Oui', toElevator: 'Non', fromLift: 'Oui', toLift: 'Non', fromPortage: '-20m', toPortage: '-', distance: '', voyageType: undefined });
    setEditingDevisId(null);
  };

  const createAcceptedQuoteArtifacts = (quote: Devis) => {
    const dossierId = quote.dossierId || buildDossierIdFromReference('DEV', quote.id);
    if (!factures.some((invoice) => invoice.devisId === quote.id)) {
      const id = getNextYearlyId('FAC', factures.map((invoice) => invoice.id));
      const invoice: Facture = {
        id, dossierId, devisId: quote.id, clientName: quote.clientName, amount: quote.price,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
        status: 'En attente'
      };
      setFactures(prev => [invoice, ...prev]);
    }
    if (!demenagements.some((move) => move.devisId === quote.id)) {
      const moveId = getNextSequencedId('DEM', demenagements.map((move) => move.id));
      const newMove: Demenagement = {
        id: moveId, dossierId, clientName: quote.clientName, devisId: quote.id, volume: quote.volume,
        fromCity: quote.fromCity, toCity: quote.toCity,
        fromAddress: quote.fromAddress, toAddress: quote.toAddress,
        date: quote.date || new Date().toISOString().split('T')[0],
        teamLeader: 'Hervé Le Gall', status: 'À planifier', crewSize: 3,
        trackingToken: self.crypto?.randomUUID ? self.crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
      };
      setDemenagements(prev => [newMove, ...prev]);
    }
  };

  const saveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const idSource = allDevisForIds.length > 0 ? allDevisForIds : devisList;
    const id = editingDevisId || getNextYearlyId('DEV', idSource.map((quote) => quote.id));
    const dossierId = newDevis.dossierId || buildDossierIdFromReference('DEV', id);
    const createdAt = newDevis.createdAt || new Date().toISOString().split('T')[0];
    const defaultExpires = new Date(new Date(createdAt).getTime() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0];

    const item: Devis = {
      ...newDevis,
      id,
      dossierId,
      clientName: newDevis.clientName || 'Nouveau Client',
      phone: newDevis.phone || '0600000000',
      email: newDevis.email || '',
      fromCity: newDevis.fromCity || 'Paris',
      toCity: newDevis.toCity || 'Lyon',
      fromAddress: newDevis.fromAddress || '',
      toAddress: newDevis.toAddress || '',
      volume: Number(newDevis.volume) || 20,
      formula: (newDevis.formula || 'Standard') as any,
      price: Number(newDevis.price) || 1200,
      date: newDevis.date || new Date().toISOString().split('T')[0],
      createdAt,
      expiresAt: newDevis.expiresAt || defaultExpires,
      status: (newDevis.status || 'Brouillon') as any,
      acceptedAt: newDevis.status === 'Signé' && !newDevis.acceptedAt ? new Date().toISOString() : newDevis.acceptedAt,
    };

    const updated = editingDevisId
      ? devisList.map((quote) => quote.id === editingDevisId ? item : quote)
      : [item, ...devisList];
    setDevisList(updated);
    
    if (item.status === 'Signé') {
      createAcceptedQuoteArtifacts(item);
    }
    
    // Workflow tracking
    if (!editingDevisId && item.sourceRequestId) {
       setPublicRequests(prev => prev.map(req => req.id === item.sourceRequestId ? {
         ...req, 
         dossierId,
         status: 'Étudié_Converti',
         convertedDevisId: item.id
       } : req));
     }

    setShowAddDevis(false);
    resetForm();
  };

  const registerQuoteSendLog = async (quote: Devis, status: CommunicationLog['status'], error?: string) => {
    const rendered = renderCommunication('quote_send', quote, 'devis');
    const task: CommunicationTask = {
      id: `quote-send-${quote.id}`,
      documentType: 'devis',
      documentId: quote.id,
      dossierId: quote.dossierId,
      action: 'quote_send',
      priority: 'normal',
      title: 'Envoi devis',
      description: `Envoi direct du devis ${quote.id}.`,
      clientName: quote.clientName,
      clientEmail: quote.email,
      amount: Number(quote.price || 0),
      dateLabel: quote.date || '',
      badgeLabel: 'Envoyé',
      ctaLabel: 'Envoyer devis',
      document: quote,
      subject: rendered.subject,
      body: rendered.body,
      sentToday: false
    };
    const log = buildCommunicationLog(task, status, user?.email || user?.displayName || 'CRM', error);
    await setDoc(doc(db, 'communication_logs', log.id), log, { merge: true });
  };

  const sendQuoteByEmail = async (quote: Devis) => {
    const targetEmail = quote.email?.trim();
    if (!targetEmail) {
      context?.pushNotification('Email manquant', 'Ajoutez une adresse email au devis avant de l’envoyer.', 'warning');
      return;
    }

    setSendingQuoteId(quote.id);
    try {
      const sentQuote: Devis = {
        ...quote,
        email: targetEmail,
        status: quote.status === 'Signé' || quote.status === 'Refusé' ? quote.status : 'Envoyé',
        sentAt: new Date().toISOString()
      };

      const response = await adminFetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({
          type: 'admin-doc',
          documentType: 'devis',
          data: {
            id: quote.id,
            clientName: quote.clientName,
            clientEmail: targetEmail,
            pdfName: `Devis_${quote.id}.pdf`,
            docData: sentQuote
          }
        })
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || 'Envoi du devis impossible.');
      }

      await setDevisList(prev => prev.map(item => item.id === quote.id ? { ...item, email: targetEmail, status: sentQuote.status, sentAt: sentQuote.sentAt } : item));
      await registerQuoteSendLog(sentQuote, 'sent').catch(() => undefined);
      context?.pushNotification('Devis envoyé', `Le devis ${quote.id} a été envoyé à ${targetEmail}.`, 'success');
    } catch (error: any) {
      const message = error?.message || 'Envoi du devis impossible.';
      await registerQuoteSendLog({ ...quote, email: targetEmail }, 'failed', message).catch(() => undefined);
      context?.pushNotification('Échec de l’envoi', message, 'warning');
    } finally {
      setSendingQuoteId(null);
    }
  };

  const duplicateQuote = (quote: Devis) => {
    const duplicated: Partial<Devis> = {
      ...quote,
      id: undefined, // Let saveQuote generate new ID
      dossierId: undefined,
      status: 'Brouillon',
      createdAt: new Date().toISOString().split('T')[0],
      date: new Date(Date.now() + 15 * 24 * 3600 * 1000).toISOString().split('T')[0], // 15 days later
      expiresAt: new Date(Date.now() + 45 * 24 * 3600 * 1000).toISOString().split('T')[0], // 45 days later
      acceptedAt: undefined,
      refusedAt: undefined,
      sentAt: undefined,
    };
    setNewDevis(duplicated);
    setEditingDevisId(null);
    setShowAddDevis(true);
  };

  const updateQuoteStatus = (quoteId: string, newStatus: DevisStatus) => {
    const quote = devisList.find(q => q.id === quoteId);
    if (!quote || quote.status === newStatus) return; // ignore if same status
    
    const updatedQuote = { 
      ...quote, 
      status: newStatus,
      acceptedAt: newStatus === 'Signé' ? new Date().toISOString() : quote.acceptedAt
    };
    
    setDevisList(prev => prev.map(q => q.id === quoteId ? updatedQuote : q));
    if (newStatus === 'Signé') {
      createAcceptedQuoteArtifacts(updatedQuote);
    }
  };

  const deleteQuote = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      setDevisList(prev => prev.filter((quote) => quote.id !== id));
    }
  };


  const applyRecommendedPrice = async (quote: Devis, recommendedPrice: number) => {
    const nextPrice = Math.round(recommendedPrice);
    await setDevisList(prev => prev.map(item => item.id === quote.id ? { ...item, price: nextPrice } : item));
    context?.pushNotification('Prix conseillé appliqué', `Le devis ${quote.id} est passé à ${formatPremiumCurrency(nextPrice)}.`, 'success');
  };

  const buildPricingArgument = (quote: Devis, pricingInsight: ReturnType<typeof analyzeQuotePricing>) => {
    const accessLine = pricingInsight.reasons.includes('Accès à valoriser')
      ? 'Les accès, le portage ou le monte-meuble nécessitent une préparation spécifique.'
      : 'Les accès restent simples, ce qui permet de maintenir un prix maîtrisé.';

    return [
      `Proposition ${quote.formula} pour ${quote.volume} m³ entre ${quote.fromCity} et ${quote.toCity}.`,
      `Le prix recommandé est de ${formatPremiumCurrency(pricingInsight.recommendedPrice)} pour sécuriser une marge cible de ${pricingInsight.targetMarginRate}%.`,
      `Coût estimé interne : ${formatPremiumCurrency(pricingInsight.estimatedCost)}. Prix minimum à ne pas franchir : ${formatPremiumCurrency(pricingInsight.recommendedMin)}.`,
      accessLine,
      'Argument client : organisation cadrée, équipe adaptée, protections, ponctualité et responsabilité opérationnelle jusqu’à la livraison.'
    ].join('\n');
  };

  const copyPricingArgument = async (quote: Devis, pricingInsight: ReturnType<typeof analyzeQuotePricing>) => {
    const argument = buildPricingArgument(quote, pricingInsight);
    try {
      if (!navigator.clipboard) throw new Error('Clipboard indisponible');
      await navigator.clipboard.writeText(argument);
      context?.pushNotification('Argumentaire copié', `La justification commerciale du devis ${quote.id} est prête.`, 'success');
    } catch {
      window.prompt('Argumentaire commercial à copier', argument);
    }
  };
  const handleDragStart = (e: React.DragEvent, quoteId: string) => {
    e.dataTransfer.setData('quoteId', quoteId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, status: DevisStatus) => {
    e.preventDefault();
    const quoteId = e.dataTransfer.getData('quoteId');
    if (quoteId) {
      updateQuoteStatus(quoteId, status);
    }
  };

  const formatDateFr = (dateStr?: string) => {
    if (!dateStr) return '';
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const parts = cleanDate.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const getExpirationBadge = (quote: Devis) => {
    if (quote.status === 'Signé' || quote.status === 'Refusé') return null;
    if (!quote.expiresAt) return null;
    const today = new Date();
    today.setHours(0,0,0,0);
    const expiry = new Date(quote.expiresAt);
    expiry.setHours(0,0,0,0);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return (
        <span className="bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border border-red-200/50 dark:border-red-900/30">
          <AlertTriangle size={10} /> Expiré
        </span>
      );
    } else if (diffDays <= 5) {
      return (
        <span className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-200/50 dark:border-amber-900/30 animate-pulse">
          <AlertTriangle size={10} /> Expire bientôt
        </span>
      );
    }
    return null;
  };

  const getFormulaStyle = (formula: string) => {
    switch (formula) {
      case 'Luxe':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30';
      case 'Standard':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30';
      case 'Économique':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800';
    }
  };

  const quotePulse = useMemo(() => {
    const enriched = devisList.map((quote) => ({
      quote,
      opportunity: scoreQuoteOpportunity(quote),
      pricing: analyzeQuotePricing(quote, pricingSettings)
    }));
    const activeQuotes = enriched.filter(({ quote }) => quote.status !== 'Signé' && quote.status !== 'Refusé');
    const followUps = enriched.filter(({ opportunity }) => opportunity.nextAction.includes('Relancer') || opportunity.nextAction.includes('expiration'));
    const pricingAlerts = activeQuotes.filter(({ pricing }) => pricing.riskLevel === 'danger' || pricing.riskLevel === 'watch');
    const readyToSend = activeQuotes.filter(({ quote, pricing }) =>
      quote.status === 'Brouillon' && Boolean(quote.email?.trim()) && pricing.riskLevel !== 'danger' && pricing.riskLevel !== 'watch'
    );

    return {
      hot: enriched.filter((item) => item.opportunity.level === 'urgent' || item.opportunity.level === 'hot').length,
      toSend: devisList.filter((quote) => quote.status === 'Brouillon').length,
      toFollowUp: followUps.length,
      pricingAlerts: pricingAlerts.length,
      dangerPricing: activeQuotes.filter(({ pricing }) => pricing.riskLevel === 'danger').length,
      watchPricing: activeQuotes.filter(({ pricing }) => pricing.riskLevel === 'watch').length,
      premiumPricing: activeQuotes.filter(({ pricing }) => pricing.riskLevel === 'premium').length,
      readyToSend: readyToSend.length,
      marginGap: activeQuotes.reduce((sum, item) => sum + Math.max(0, item.pricing.recommendedMin - (item.quote.price || 0)), 0),
      recommendedGap: activeQuotes.reduce((sum, item) => sum + Math.max(0, item.pricing.recommendedPrice - (item.quote.price || 0)), 0),
      estimatedMargin: activeQuotes.reduce((sum, item) => sum + item.pricing.marginAmount, 0),
      averageMarginRate: activeQuotes.length > 0 ? Math.round(activeQuotes.reduce((sum, item) => sum + item.pricing.marginRate, 0) / activeQuotes.length) : 0,
      potential: activeQuotes.reduce((sum, item) => sum + (item.quote.price || 0), 0)
    };
  }, [devisList, pricingSettings]);

  const quoteQualityFilters: Array<{ id: QuoteProfitabilityFilter; label: string; count: number; tone: string }> = [
    { id: 'all', label: 'Tous', count: devisList.length, tone: 'text-slate-600 dark:text-slate-300' },
    { id: 'marginRisk', label: 'Marge faible', count: quotePulse.dangerPricing, tone: 'text-red-700 dark:text-red-300' },
    { id: 'priceAdjust', label: 'Prix à ajuster', count: quotePulse.pricingAlerts, tone: 'text-amber-700 dark:text-amber-300' },
    { id: 'premium', label: 'Premium à justifier', count: quotePulse.premiumPricing, tone: 'text-indigo-700 dark:text-indigo-300' },
    { id: 'ready', label: 'Prêt à envoyer', count: quotePulse.readyToSend, tone: 'text-emerald-700 dark:text-emerald-300' },
    { id: 'followUp', label: 'À relancer', count: quotePulse.toFollowUp, tone: 'text-sky-700 dark:text-sky-300' }
  ];

  const filteredDevisList = useMemo(() => {
    const query = filterQuery.toLowerCase().trim();

    return devisList.filter((quote) => {
      const pricing = analyzeQuotePricing(quote, pricingSettings);
      const opportunity = scoreQuoteOpportunity(quote);
      const activeQuote = quote.status !== 'Signé' && quote.status !== 'Refusé';
      const matchesSearch = !query ||
        quote.clientName.toLowerCase().includes(query) ||
        quote.id.toLowerCase().includes(query) ||
        quote.fromCity.toLowerCase().includes(query) ||
        quote.toCity.toLowerCase().includes(query) ||
        quote.formula.toLowerCase().includes(query) ||
        Boolean(quote.email?.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      if (profitabilityFilter === 'marginRisk') return activeQuote && pricing.riskLevel === 'danger';
      if (profitabilityFilter === 'priceAdjust') return activeQuote && (pricing.riskLevel === 'danger' || pricing.riskLevel === 'watch');
      if (profitabilityFilter === 'premium') return activeQuote && pricing.riskLevel === 'premium';
      if (profitabilityFilter === 'ready') return activeQuote && quote.status === 'Brouillon' && Boolean(quote.email?.trim()) && pricing.riskLevel !== 'danger' && pricing.riskLevel !== 'watch';
      if (profitabilityFilter === 'followUp') return opportunity.nextAction.includes('Relancer') || opportunity.nextAction.includes('expiration');
      return true;
    });
  }, [devisList, filterQuery, profitabilityFilter, pricingSettings]);

  const sortQuotesForColumn = (quotes: Devis[]) => {
    return [...quotes].sort((a, b) => {
      if (quoteSortMode === 'priority') return scoreQuoteOpportunity(b).score - scoreQuoteOpportunity(a).score;
      if (quoteSortMode === 'amount') return (b.price || 0) - (a.price || 0);
      if (quoteSortMode === 'moveDate') return String(a.date || '9999-12-31').localeCompare(String(b.date || '9999-12-31'));
      return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
    });
  };
  // Kanban view
  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-slate-900 p-5 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wider">GESTION DES DOSSIERS DE DEMENAGEMENT</p>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Pipeline des Ventes Devis</h2>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text"
            placeholder="Rechercher client, ville, formule, email..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-805 rounded-2xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {filterQuery && (
            <button onClick={() => setFilterQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Période :</label>
          <select 
            value={devisDays} 
            onChange={(e) => setDevisDays(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3 text-xs font-black text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
          >
            <option value={90}>90 derniers jours</option>
            <option value={180}>180 derniers jours</option>
            <option value={365}>1 an</option>
            <option value="all">Toutes les archives</option>
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tri :</label>
          <select
            value={quoteSortMode}
            onChange={(e) => setQuoteSortMode(e.target.value as QuoteSortMode)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3 text-xs font-black text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
          >
            <option value="priority">Priorité commerciale</option>
            <option value="recent">Plus récents</option>
            <option value="amount">Montant décroissant</option>
            <option value="moveDate">Date déménagement</option>
          </select>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddDevis(true); }}
          className="bg-accent hover:bg-accent-hover text-brand-900 border border-accent font-black py-2.5 px-5 rounded-2xl text-xs transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
        >
          <Plus size={14} /> Rédiger un Devis
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Devis chauds</span>
          <strong className="mt-1 flex items-center gap-1 text-xl font-black text-red-600 dark:text-red-300"><Flame size={16} /> {quotePulse.hot}</strong>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Marge à récupérer</span>
          <strong className="block mt-1 text-xl font-black text-red-600 dark:text-red-300">{formatPremiumCurrency(quotePulse.marginGap)}</strong>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Marge prévisionnelle</span>
          <strong className={`block mt-1 text-xl font-black ${quotePulse.estimatedMargin >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-600 dark:text-red-300'}`}>{formatPremiumCurrency(quotePulse.estimatedMargin)}</strong>
          <span className="text-[9px] font-bold text-slate-400">Moyenne {quotePulse.averageMarginRate}%</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">À corriger</span>
          <strong className="block mt-1 text-xl font-black text-amber-600 dark:text-amber-300">{quotePulse.pricingAlerts}</strong>
          <span className="text-[9px] font-bold text-slate-400">{quotePulse.dangerPricing} critiques</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Prêts à envoyer</span>
          <strong className="block mt-1 text-xl font-black text-emerald-600 dark:text-emerald-300">{quotePulse.readyToSend}</strong>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Potentiel ouvert</span>
          <strong className="block mt-1 text-xl font-black text-brand-900 dark:text-accent">{formatPremiumCurrency(quotePulse.potential)}</strong>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {quoteQualityFilters.map((filter) => {
            const active = profitabilityFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setProfitabilityFilter(filter.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${active ? 'border-accent bg-accent text-brand-950' : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-accent/60 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'}`}
              >
                {filter.label}
                <span className={`rounded-lg bg-white/80 px-1.5 py-0.5 text-[9px] ${active ? 'text-brand-950' : filter.tone}`}>{filter.count}</span>
              </button>
            );
          })}
          {(profitabilityFilter !== 'all' || filterQuery) && (
            <button
              type="button"
              onClick={() => { setProfitabilityFilter('all'); setFilterQuery(''); }}
              className="ml-auto inline-flex items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X size={12} /> Effacer
            </button>
          )}
        </div>
      </section>
      {showAddDevis && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-lg space-y-6 animate-fade-in">
          {/* Form UI Header */}
          <div className="flex items-center justify-between border-b pb-3 mb-2 border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black uppercase text-brand-900 dark:text-white">
                {editingDevisId ? `Modifier le devis ${editingDevisId}` : "Rédiger un Nouveau Devis"}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">Saisissez les coordonnées, les adresses et les spécifications techniques de la prestation.</p>
            </div>
            <button 
              type="button"
              onClick={() => { setShowAddDevis(false); resetForm(); }} 
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl transition"
            >
              Fermer [X]
            </button>
          </div>

          <form onSubmit={saveQuote} className="space-y-6 text-xs text-slate-800 dark:text-slate-200">
            {/* Section 1: Informations Générales & Client */}
            <div className="space-y-3">
              <h4 className="font-extrabold uppercase text-[10px] text-slate-400 tracking-wider flex items-center gap-1.5 border-b pb-1.5 border-slate-100 dark:border-slate-800">
                👤 Informations Générales & Client
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">Nom du client *</label>
                  <input required className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-accent" placeholder="Monsieur GONCALVES MATHIEU" value={newDevis.clientName} onChange={e=>setNewDevis({...newDevis, clientName: e.target.value})} />
                </div>
                <div>
                  <label className="block font-bold mb-1">Téléphone *</label>
                  <input required className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-accent" placeholder="06 12 34 56 78" value={newDevis.phone} onChange={e=>setNewDevis({...newDevis, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email</label>
                  <input type="email" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-accent" placeholder="mathieu@site.fr" value={newDevis.email || ''} onChange={e=>setNewDevis({...newDevis, email: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Section 2: Adresses & Logistique de Déménagement */}
            <div className="space-y-3">
              <h4 className="font-extrabold uppercase text-[10px] text-slate-400 tracking-wider flex items-center gap-1.5 border-b pb-1.5 border-slate-100 dark:border-slate-800">
                📦 Adresses & Logistique
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Chargement Group */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <span className="font-bold text-[10px] text-red-650 uppercase tracking-wider block border-b pb-1 border-slate-200/50 dark:border-slate-800/50">📤 Point de Chargement</span>
                  <div>
                    <label className="block font-bold mb-1">Adresse (Rue)</label>
                    <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="2 Rue François Coppée" value={newDevis.fromAddress || ''} onChange={e=>setNewDevis({...newDevis, fromAddress: e.target.value})} />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Code Postal & Ville</label>
                    <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="92320 CHATILLON" value={newDevis.fromCity} onChange={e=>setNewDevis({...newDevis, fromCity: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-0.5">Étage</label>
                      <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="2" value={newDevis.fromFloor || ''} onChange={e=>setNewDevis({...newDevis, fromFloor: e.target.value})} />
                    </div>
                    <div>
                      <label className="block font-bold mb-0.5">Portage</label>
                      <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="-20m" value={newDevis.fromPortage || ''} onChange={e=>setNewDevis({...newDevis, fromPortage: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-0.5">Ascenseur</label>
                      <select className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" value={newDevis.fromElevator} onChange={e=>setNewDevis({...newDevis, fromElevator: e.target.value as any})}>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold mb-0.5">Monte-meuble</label>
                      <select className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" value={newDevis.fromLift} onChange={e=>setNewDevis({...newDevis, fromLift: e.target.value as any})}>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Livraison Group */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                  <span className="font-bold text-[10px] text-emerald-600 uppercase tracking-wider block border-b pb-1 border-slate-200/50 dark:border-slate-800/50">📥 Point de Livraison</span>
                  <div>
                    <label className="block font-bold mb-1">Adresse (Rue)</label>
                    <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="172 Avenue Jean Jaurès" value={newDevis.toAddress || ''} onChange={e=>setNewDevis({...newDevis, toAddress: e.target.value})} />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Code Postal & Ville</label>
                    <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="75019 PARIS" value={newDevis.toCity} onChange={e=>setNewDevis({...newDevis, toCity: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-0.5">Étage</label>
                      <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="5" value={newDevis.toFloor || ''} onChange={e=>setNewDevis({...newDevis, toFloor: e.target.value})} />
                    </div>
                    <div>
                      <label className="block font-bold mb-0.5">Portage</label>
                      <input className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" placeholder="-" value={newDevis.toFloor ? newDevis.toPortage || '' : ''} onChange={e=>setNewDevis({...newDevis, toPortage: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold mb-0.5">Ascenseur</label>
                      <select className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" value={newDevis.toElevator} onChange={e=>setNewDevis({...newDevis, toElevator: e.target.value as any})}>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold mb-0.5">Monte-meuble</label>
                      <select className="w-full bg-white dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg" value={newDevis.toLift} onChange={e=>setNewDevis({...newDevis, toLift: e.target.value as any})}>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Paramètres du Devis & Tarification */}
            <div className="space-y-3">
              <h4 className="font-extrabold uppercase text-[10px] text-slate-400 tracking-wider flex items-center gap-1.5 border-b pb-1.5 border-slate-100 dark:border-slate-800">
                💰 Paramètres Devis, Dates & Tarifs
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold mb-1">Volume global (m³)</label>
                  <input type="number" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" value={newDevis.volume} onChange={e=>setNewDevis({...newDevis, volume: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block font-bold mb-1">Prix TTC (€)</label>
                  <input type="number" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" value={newDevis.price} onChange={e=>setNewDevis({...newDevis, price: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block font-bold mb-1">Formule choisie</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" value={newDevis.formula} onChange={e=>setNewDevis({...newDevis, formula: e.target.value as any})}>
                    <option value="Standard">Standard</option>
                    <option value="Économique">Économique</option>
                    <option value="Luxe">Luxe</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Distance de transport (facultatif)</label>
                  <input className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" placeholder="ex: 17 km, 450 km" value={newDevis.distance || ''} onChange={e=>setNewDevis({...newDevis, distance: e.target.value})} />
                </div>
                <div>
                  <label className="block font-bold mb-1">Type de voyage (facultatif)</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" value={newDevis.voyageType || ''} onChange={e=>setNewDevis({...newDevis, voyageType: e.target.value ? e.target.value as any : undefined})}>
                    <option value="">Automatique</option>
                    <option value="Urbain">Urbain</option>
                    <option value="National">National</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">État du Devis</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" value={newDevis.status} onChange={e=>setNewDevis({...newDevis, status: e.target.value as DevisStatus})}>
                    {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Date estimée du déménagement</label>
                  <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" value={newDevis.date} onChange={e=>setNewDevis({...newDevis, date: e.target.value})} />
                </div>
                <div>
                  <label className="block font-bold mb-1">Date limite de validité</label>
                  <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800 rounded-xl" value={newDevis.expiresAt || ''} onChange={e=>setNewDevis({...newDevis, expiresAt: e.target.value})} />
                </div>
              </div>
            </div>

              <div className={`rounded-2xl border p-4 ${getPricingRiskClasses(draftPricingInsight.riskLevel)}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider opacity-75">Assistant rentabilité</span>
                    <h4 className="text-sm font-black mt-1">{draftPricingInsight.label} · marge {draftPricingInsight.marginRate}%</h4>
                    <p className="text-[11px] mt-1 font-semibold opacity-85">{draftPricingInsight.action}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <span className="block text-[9px] font-black uppercase opacity-70">Prix conseillé</span>
                      <strong className="text-lg font-black">{formatPremiumCurrency(draftPricingInsight.recommendedPrice)}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNewDevis({ ...newDevis, price: draftPricingInsight.recommendedPrice })}
                      className="px-3 py-2 rounded-xl bg-slate-950 text-white dark:bg-accent dark:text-brand-950 text-[10px] font-black uppercase tracking-wider hover:opacity-90"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
              </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-brand-900 hover:bg-brand-hover text-white py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-98">
                Enregistrer et Générer le Devis
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {COLUMNS.map(column => {
          const columnQuotes = sortQuotesForColumn(filteredDevisList.filter(q => q.status === column));
          const totalCA = columnQuotes.reduce((sum, q) => sum + q.price, 0);

          return (
            <div 
              key={column}
              className="flex-shrink-0 w-80 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col snap-start min-h-[450px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column)}
            >
              {/* Column Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">{column}</h3>
                  <span className="bg-white dark:bg-slate-800 shadow-sm text-slate-600 dark:text-slate-400 text-xs px-2.5 py-0.5 rounded-full font-black">
                    {columnQuotes.length}
                  </span>
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  Total : <span className="text-brand-900 dark:text-accent font-extrabold">{totalCA.toLocaleString('fr-FR')} €</span>
                </div>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 min-h-[300px]">
                {columnQuotes.map(quote => {
                  const expirationBadge = getExpirationBadge(quote);
                  const canSendQuote = quote.status !== 'Signé' && quote.status !== 'Refusé';
                  const quoteHasEmail = Boolean(quote.email?.trim());
                  const quoteIsSending = sendingQuoteId === quote.id;
                  const quoteInsight = scoreQuoteOpportunity(quote);
                  const pricingInsight = analyzeQuotePricing(quote, pricingSettings);
                  const pricingGap = Math.max(0, pricingInsight.recommendedMin - (quote.price || 0));
                  const recommendedGap = Math.max(0, pricingInsight.recommendedPrice - (quote.price || 0));
                  const canApplyRecommendedPrice = canSendQuote && recommendedGap > 0 && (pricingInsight.riskLevel === 'danger' || pricingInsight.riskLevel === 'watch');

                  return (
                    <div
                      key={quote.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, quote.id)}
                      className="bg-white dark:bg-slate-950 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 cursor-grab active:cursor-grabbing hover:border-accent dark:hover:border-accent/80 transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <span className="text-[9px] font-black text-slate-400 tracking-wider bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md">
                          {quote.id}
                        </span>
                        <span className="font-black text-brand-900 dark:text-accent text-xs">
                          {quote.price.toLocaleString('fr-FR')} €
                        </span>
                      </div>
                      
                      <h4 className="font-black text-slate-900 dark:text-white text-xs leading-tight mb-1">
                        {quote.clientName}
                      </h4>
                      {quote.email && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mb-1">
                          {quote.email}
                        </p>
                      )}
                      
                      <p className="text-[10px] text-slate-500 mb-2.5 flex items-center gap-1 font-medium">
                        <span className="truncate max-w-[100px]" title={quote.fromCity}>{quote.fromCity}</span> 
                        <MoveRight size={10} className="text-slate-400 shrink-0" /> 
                        <span className="truncate max-w-[100px]" title={quote.toCity}>{quote.toCity}</span>
                      </p>
                      <div className={`mb-2 rounded-xl border px-3 py-2 ${getQuoteOpportunityClasses(quoteInsight.level)}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] font-black uppercase tracking-wider">Score {quoteInsight.score}</span>
                          <span className="text-[9px] font-black">{quoteInsight.label}</span>
                        </div>
                        <p className="text-[10px] mt-1 font-semibold opacity-85 flex items-center gap-1">
                          <TrendingUp size={10} /> {quoteInsight.nextAction}
                        </p>
                      </div>
                      {/* Expiration date/badge */}
                      {quote.expiresAt && (
                        <div className="flex items-center justify-between gap-2 mb-3 pt-2 border-t border-dashed border-slate-100 dark:border-slate-900">
                          <span className="text-[9px] text-slate-400 flex items-center gap-1">
                            <Calendar size={10} /> Exp: {formatDateFr(quote.expiresAt)}
                          </span>
                          {expirationBadge}
                        </div>
                      )}

                      <div className={`mb-3 rounded-xl border px-3 py-2 ${getPricingRiskClasses(pricingInsight.riskLevel)}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[9px] font-black uppercase tracking-wider">{pricingInsight.label}</span>
                          <span className="text-[9px] font-black">Marge {pricingInsight.marginRate}%</span>
                        </div>
                        <p className="text-[10px] mt-1 font-semibold opacity-85 flex items-center gap-1">
                          <ShieldCheck size={10} /> {pricingInsight.action}
                        </p>
                        <div className="mt-2 grid grid-cols-3 gap-1.5 text-[9px] font-black uppercase tracking-wider">
                          <div className="rounded-lg bg-white/55 dark:bg-slate-950/35 px-2 py-1">
                            <span className="block opacity-60">Min</span>
                            <strong>{formatPremiumCurrency(pricingInsight.recommendedMin)}</strong>
                          </div>
                          <div className="rounded-lg bg-white/55 dark:bg-slate-950/35 px-2 py-1">
                            <span className="block opacity-60">Reco</span>
                            <strong>{formatPremiumCurrency(pricingInsight.recommendedPrice)}</strong>
                          </div>
                          <div className="rounded-lg bg-white/55 dark:bg-slate-950/35 px-2 py-1">
                            <span className="block opacity-60">Écart</span>
                            <strong>{pricingGap > 0 ? formatPremiumCurrency(pricingGap) : 'OK'}</strong>
                          </div>
                        </div>
                        {(canApplyRecommendedPrice || pricingInsight.riskLevel === 'premium') && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {canApplyRecommendedPrice && (
                              <button
                                type="button"
                                onClick={() => applyRecommendedPrice(quote, pricingInsight.recommendedPrice)}
                                className="inline-flex items-center gap-1 rounded-lg bg-slate-950 px-2 py-1.5 text-[9px] font-black uppercase text-white hover:opacity-90 dark:bg-accent dark:text-brand-950"
                              >
                                <ShieldCheck size={10} /> Appliquer reco
                              </button>
                            )}
                            {pricingInsight.riskLevel === 'premium' && (
                              <button
                                type="button"
                                onClick={() => copyPricingArgument(quote, pricingInsight)}
                                className="inline-flex items-center gap-1 rounded-lg bg-white/75 px-2 py-1.5 text-[9px] font-black uppercase hover:bg-white dark:bg-slate-950/50"
                              >
                                <Copy size={10} /> Argumentaire
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Signature Display (if signed) */}
                      {quote.status === 'Signé' && quote.clientSignature && (
                        <div className="mb-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl flex items-center justify-between gap-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-black uppercase text-emerald-700 dark:text-emerald-400">Signé le</span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold">{quote.acceptedAt ? formatDateFr(quote.acceptedAt) : 'N/A'}</span>
                          </div>
                          <img src={quote.clientSignature} alt="Signature" className="h-8 w-20 object-contain mix-blend-multiply dark:mix-blend-normal bg-white rounded-md p-1" />
                        </div>
                      )}

                      {/* Payment Status Badge */}
                      {quote.paymentStatus === 'Acompte Payé' && (
                        <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-xl flex items-center gap-2">
                          <span className="text-blue-600 dark:text-blue-400 text-sm">💰</span>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-black uppercase text-blue-700 dark:text-blue-400">Acompte payé en ligne</span>
                            <span className="text-[10px] text-blue-600 dark:text-blue-500 font-bold">
                              {quote.acompteAmount?.toLocaleString('fr-FR')} € reçus{quote.acomptePayedAt ? ` · ${formatDateFr(quote.acomptePayedAt)}` : ''}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Footer & Actions */}
                      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-900">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold shrink-0 ${getFormulaStyle(quote.formula)}`}>
                            {quote.volume} m³ • {quote.formula}
                          </span>
                          {quote.sentAt && (
                            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 min-w-0">
                              <Mail size={10} className="shrink-0" /> {formatDateFr(quote.sentAt)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap justify-end gap-1">
                          {canSendQuote && (
                            <button
                              type="button"
                              onClick={() => sendQuoteByEmail(quote)}
                              disabled={quoteIsSending || !quoteHasEmail}
                              className={`px-2 py-1.5 font-bold text-[9px] uppercase rounded-lg transition-colors flex items-center gap-0.5 ${quoteHasEmail ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950/25 dark:hover:bg-emerald-900/40' : 'text-slate-350 bg-slate-50 dark:bg-slate-900 cursor-not-allowed opacity-60'}`}
                              title={quoteHasEmail ? 'Envoyer le devis par email' : 'Email client manquant'}
                            >
                              {quoteIsSending ? <Loader2 size={10} className="animate-spin" /> : <Mail size={10} />}
                              {quote.sentAt ? 'Renvoyer' : 'Envoyer'}
                            </button>
                          )}

                          <button 
                            onClick={() => setSelectedPdfQuote(quote)} 
                            className="px-2 py-1.5 text-slate-500 font-bold text-[9px] uppercase hover:text-brand-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-0.5" 
                            title="Imprimer / PDF"
                          >
                            <Printer size={10} /> PDF
                          </button>
                          
                          <button 
                            onClick={() => duplicateQuote(quote)} 
                            className="p-1.5 text-slate-400 hover:text-brand-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors" 
                            title="Dupliquer"
                          >
                            <Copy size={11} />
                          </button>

                          <button 
                            onClick={() => { setNewDevis(quote); setEditingDevisId(quote.id); setShowAddDevis(true); }} 
                            className="p-1.5 text-slate-400 hover:text-brand-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors" 
                            title="Modifier"
                          >
                            <Edit size={11} />
                          </button>
                          
                          <button 
                            onClick={() => deleteQuote(quote.id)} 
                            className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" 
                            title="Supprimer"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {columnQuotes.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl opacity-50 py-8">
                    <span className="text-xs text-slate-400 font-medium text-center">Déposez un devis ici</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* PDF Generator Modal */}
      {selectedPdfQuote && (
        <PdfGenerator 
          documentType="devis"
          data={selectedPdfQuote}
          onClose={() => setSelectedPdfQuote(null)}
          onStatusChange={(id, newStatus) => {
            updateQuoteStatus(id, newStatus as DevisStatus);
            setSelectedPdfQuote(prev => prev ? { ...prev, status: newStatus as DevisStatus } : null);
          }}
        />
      )}
    </div>
  );
}
