import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Coins, CreditCard, FileText, Truck, MapPin, 
  AlertTriangle, TrendingUp, Clock, ArrowUpRight, ArrowUp, ArrowDown,
  Calendar, UserCheck, AlertCircle, Sparkles, ClipboardList, CheckCircle2
} from 'lucide-react';
import { useSyncedCollection } from '../../hooks/useData';
import type { Devis, Facture, Visite, Demenagement } from '../../types';
import type { AdminPublicRequest, DossierTask } from '../../lib/admin-dossiers';
import { buildPremiumCockpit, formatPremiumCurrency } from '../../lib/crm-premium';
import { buildClientDossiers } from '../../lib/admin-dossier-engine';
import { buildTodayActions, summarizeTodayActions, type TodayActionTone } from '../../lib/admin-today-actions';
import { useCrmSettings } from '../../hooks/useCrmSettings';

const getPremiumToneClasses = (tone: 'critical' | 'warning' | 'growth' | 'success') => {
  if (tone === 'critical') return 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40';
  if (tone === 'warning') return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40';
  if (tone === 'growth') return 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/20 dark:text-sky-300 dark:border-sky-900/40';
  return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/40';
};

const getPremiumButtonClasses = (tone: 'critical' | 'warning' | 'growth' | 'success') => {
  if (tone === 'critical') return 'bg-red-600 hover:bg-red-700 text-white';
  if (tone === 'warning') return 'bg-amber-600 hover:bg-amber-700 text-white';
  if (tone === 'growth') return 'bg-sky-600 hover:bg-sky-700 text-white';
  return 'bg-emerald-600 hover:bg-emerald-700 text-white';
};

const getTodayActionClasses = (tone: TodayActionTone) => {
  if (tone === 'critical') return 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40';
  if (tone === 'warning') return 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40';
  return 'bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/20 dark:text-sky-300 dark:border-sky-900/40';
};
export function AdminOverview() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const { pricingSettings } = useCrmSettings();
  
  const [factures] = useSyncedCollection<Facture>('factures');
  const [publicRequests] = useSyncedCollection<AdminPublicRequest>('quotes');
  const [visites] = useSyncedCollection<Visite>('visites');
  const [devisList] = useSyncedCollection<Devis>('devis');
  const [demenagements] = useSyncedCollection<Demenagement>('demenagements');
  const [dossierTasks] = useSyncedCollection<DossierTask>('dossierTasks');
  const [dossierOwners] = useSyncedCollection<{ id?: string; key: string; dossierId?: string; owner: string }>('dossierOwners');

  const dossierOwnerOverrides = useMemo(() => {
    const overrides: Record<string, string> = {};
    dossierOwners.forEach((owner) => {
      if (owner.dossierId) overrides[owner.dossierId] = owner.owner;
      if (owner.key) overrides[owner.key] = owner.owner;
    });
    return overrides;
  }, [dossierOwners]);

  const allDossiers = useMemo(() => buildClientDossiers({
    publicRequests,
    visites,
    devisList,
    factures,
    demenagements,
    dossierOwnerOverrides
  }), [publicRequests, visites, devisList, factures, demenagements, dossierOwnerOverrides]);

  const allTodayActions = useMemo(() => buildTodayActions({
    dossiers: allDossiers,
    tasks: dossierTasks,
    role,
    maxActions: 20
  }), [allDossiers, dossierTasks, role]);

  const todayActions = useMemo(() => allTodayActions.slice(0, 5), [allTodayActions]);
  const todayActionStats = useMemo(() => summarizeTodayActions(allTodayActions), [allTodayActions]);

  const premiumCockpit = useMemo(() => buildPremiumCockpit({
    publicRequests,
    devisList,
    factures,
    visites,
    demenagements,
    pricingSettings
  }), [publicRequests, devisList, factures, visites, demenagements, pricingSettings]);
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const formatDateFr = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  // 1. Alertes prioritaires
  const alertes = useMemo(() => {
    const list: Array<{ 
      id: string; 
      type: 'warning' | 'error' | 'info'; 
      message: string; 
      actionPath: string; 
      actionLabel: string;
    }> = [];

    // Visites du jour
    const todayVisites = visites.filter(v => v.date === todayStr && v.status !== 'Annulée');
    if (todayVisites.length > 0) {
      list.push({
        id: 'alerte-visite',
        type: 'info',
        message: `${todayVisites.length} visite(s) technique(s) programmée(s) aujourd'hui.`,
        actionPath: '/admin/visites',
        actionLabel: 'Voir l\'agenda'
      });
    }

    // Chantiers sans équipe ou aujourd'hui
    const todayMoves = demenagements.filter(d => d.date === todayStr);
    const movesToAssign = demenagements.filter(d => d.status === 'À planifier');
    
    if (todayMoves.length > 0) {
      list.push({
        id: 'alerte-moves-today',
        type: 'warning',
        message: `${todayMoves.length} chantier(s) de déménagement prévu(s) aujourd'hui.`,
        actionPath: '/admin/planning',
        actionLabel: 'Suivre les équipes'
      });
    }
    if (movesToAssign.length > 0) {
      list.push({
        id: 'alerte-moves-assign',
        type: 'error',
        message: `${movesToAssign.length} chantier(s) de déménagement sans équipe assignée.`,
        actionPath: '/admin/planning',
        actionLabel: 'Affecter équipe'
      });
    }


    if (premiumCockpit.metrics.quotesMarginAtRisk > 0) {
      list.push({
        id: 'alerte-quote-margin',
        type: premiumCockpit.metrics.quoteMarginGap >= 1000 ? 'error' : 'warning',
        message: `${premiumCockpit.metrics.quotesMarginAtRisk} devis sous surveillance marge. Manque à récupérer : ${formatPremiumCurrency(premiumCockpit.metrics.quoteMarginGap)}.`,
        actionPath: '/admin/devis',
        actionLabel: 'Corriger les prix'
      });
    }
    // Factures en retard
    const overdueInvoices = factures.filter(f => f.status === 'En retard' || (f.status === 'En attente' && f.dueDate < todayStr));
    if (overdueInvoices.length > 0) {
      list.push({
        id: 'alerte-facture-overdue',
        type: 'error',
        message: `${overdueInvoices.length} facture(s) en retard de paiement.`,
        actionPath: '/admin/factures',
        actionLabel: 'Relancer les clients'
      });
    }

    return list;
  }, [visites, demenagements, factures, todayStr, premiumCockpit]);

  // 2. Taux de conversion devis
  const conversionStats = useMemo(() => {
    const nonDraft = devisList.filter(d => d.status !== 'Brouillon');
    const signed = devisList.filter(d => d.status === 'Signé');
    const rate = nonDraft.length > 0 ? Math.round((signed.length / nonDraft.length) * 100) : 0;
    return {
      rate,
      signed: signed.length,
      total: nonDraft.length
    };
  }, [devisList]);

  // 3. CA mensuel et comparaison
  const caStats = useMemo(() => {
    const now = new Date();
    const formatYearMonth = (d: Date) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      return `${y}-${m}`;
    };
    const currentMonthStr = formatYearMonth(now);
    
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthStr = formatYearMonth(prevMonth);
    
    const currentCA = factures
      .filter(f => f.status === 'Payée' && f.date.startsWith(currentMonthStr))
      .reduce((sum, f) => sum + f.amount, 0);
       
    const prevCA = factures
      .filter(f => f.status === 'Payée' && f.date.startsWith(prevMonthStr))
      .reduce((sum, f) => sum + f.amount, 0);

    const diff = currentCA - prevCA;
    const pct = prevCA > 0 ? Math.round((diff / prevCA) * 100) : 0;

    return {
      currentCA,
      prevCA,
      diff,
      pct
    };
  }, [factures]);

  // 4. Timeline des 5 derniers événements
  const timelineEvents = useMemo(() => {
    const events: Array<{ id: string; date: string; title: string; desc: string; type: 'devis' | 'visite' | 'demenagement' | 'facture' }> = [];

    devisList.forEach(d => {
      if (d.createdAt) {
        events.push({
          id: `devis-created-${d.id}`,
          date: d.createdAt,
          title: 'Devis créé',
          desc: `Devis ${d.id} créé pour ${d.clientName} (${d.price.toLocaleString('fr-FR')} €)`,
          type: 'devis'
        });
      }
      if (d.status === 'Signé' && d.acceptedAt) {
        events.push({
          id: `devis-signed-${d.id}`,
          date: d.acceptedAt,
          title: 'Devis signé',
          desc: `M./Mme ${d.clientName} a signé le devis ${d.id}`,
          type: 'devis'
        });
      }
    });

    visites.forEach(v => {
      events.push({
        id: `visite-${v.id}`,
        date: v.date,
        title: 'Visite planifiée',
        desc: `Visite technique planifiée chez ${v.clientName} à ${v.time}`,
        type: 'visite'
      });
    });

    demenagements.forEach(dm => {
      events.push({
        id: `dem-${dm.id}`,
        date: dm.date,
        title: 'Déménagement planifié',
        desc: `Chantier planifié pour ${dm.clientName} (${dm.volume} m³)`,
        type: 'demenagement'
      });
    });

    factures.forEach(f => {
      events.push({
        id: `fac-created-${f.id}`,
        date: f.date,
        title: 'Facture émise',
        desc: `Facture ${f.id} de ${f.amount.toLocaleString('fr-FR')} € émise pour ${f.clientName}`,
        type: 'facture'
      });
      if (f.status === 'Payée') {
        events.push({
          id: `fac-paid-${f.id}`,
          date: f.date,
          title: 'Facture payée',
          desc: `Règlement de ${f.amount.toLocaleString('fr-FR')} € reçu de ${f.clientName}`,
          type: 'facture'
        });
      }
    });

    return events
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  }, [devisList, visites, demenagements, factures]);

  const activeInvoicesSum = factures.reduce((acc, current) => acc + (current.status === 'Payée' ? current.amount : 0), 0);
  const pendingInvoicesSum = factures.reduce((acc, current) => acc + (current.status === 'En attente' ? current.amount : 0), 0);
  const newPublicRequestCount = publicRequests.filter((request) => request.status === 'Nouveau' || !request.status).length;
  const quoteFollowUpCount = devisList.filter((quote) => quote.status === 'Brouillon' || quote.status === 'Envoyé' || quote.status === 'En attente').length;
  const planningToAssignCount = demenagements.filter((move) => move.status === 'À planifier').length;

  const roleFocus = useMemo(() => {
    if (role === 'secrétaire') {
      return {
        eyebrow: 'Cockpit secrétaire',
        title: 'Accélérer les documents et les relances',
        description: 'Votre priorité est de faire partir les devis, transmettre les factures, relancer proprement et garder les visites cadrées.',
        primaryRoute: '/admin/relances',
        primaryCta: 'Traiter les envois',
        checks: [
          { label: 'Devis à envoyer', value: premiumCockpit.metrics.quotesToSend },
          { label: 'Finance à suivre', value: premiumCockpit.metrics.invoicesToSend + premiumCockpit.metrics.dueSoonInvoices + premiumCockpit.metrics.overdueInvoices },
          { label: 'Visites 7 jours', value: premiumCockpit.metrics.visitsNext7 }
        ]
      };
    }

    if (role === 'commercial') {
      return {
        eyebrow: 'Cockpit commercial',
        title: 'Transformer les demandes en visites et devis signés',
        description: 'Votre priorité est de rappeler les leads chauds, planifier les visites utiles et envoyer des devis rentables sans perdre le timing.',
        primaryRoute: '/admin/demandes',
        primaryCta: 'Qualifier les demandes',
        checks: [
          { label: 'Demandes ouvertes', value: premiumCockpit.metrics.openRequests },
          { label: 'Visites 7 jours', value: premiumCockpit.metrics.visitsNext7 },
          { label: 'Potentiel devis', value: formatPremiumCurrency(premiumCockpit.metrics.quotePotential) }
        ]
      };
    }

    if (role === 'chef_equipe') {
      return {
        eyebrow: 'Cockpit terrain',
        title: 'Sécuriser les chantiers du jour',
        description: 'Votre priorité est de savoir quoi faire, avec qui, quel camion, et de remonter les informations terrain sans friction.',
        primaryRoute: '/admin/planning',
        primaryCta: 'Voir le planning',
        checks: [
          { label: 'Chantiers aujourd’hui', value: premiumCockpit.metrics.movesToday },
          { label: 'À affecter', value: premiumCockpit.metrics.movesUnassigned },
          { label: 'Prochaines opérations', value: premiumCockpit.nextOperations.length }
        ]
      };
    }

    return {
      eyebrow: 'Cockpit gérant',
      title: 'Piloter marge, trésorerie et risques opérationnels',
      description: 'Votre priorité est de voir vite ce qui rapporte, ce qui bloque, ce qui met la qualité en risque et où déléguer.',
      primaryRoute: '/admin/analytics',
      primaryCta: 'Analyser la performance',
      checks: [
        { label: 'CA prévisionnel', value: formatPremiumCurrency(premiumCockpit.metrics.forecastRevenue) },
        { label: 'Marge à récupérer', value: formatPremiumCurrency(premiumCockpit.metrics.quoteMarginGap) },
        { label: 'Conversion', value: `${premiumCockpit.metrics.conversionRate}%` }
      ]
    };
  }, [role, premiumCockpit]);

  const managerDecisionCards = useMemo(() => {
    const financeActions = premiumCockpit.metrics.invoicesToSend + premiumCockpit.metrics.dueSoonInvoices + premiumCockpit.metrics.overdueInvoices;
    const planningRisk = premiumCockpit.metrics.movesUnassigned + premiumCockpit.metrics.visitsNext7;

    return [
      {
        id: 'cash',
        label: 'Argent à encaisser',
        value: formatPremiumCurrency(pendingInvoicesSum),
        helper: `${financeActions} action${financeActions > 1 ? 's' : ''} finance à traiter`,
        route: '/admin/factures',
        cta: 'Encaisser',
        icon: CreditCard,
        className: 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/40'
      },
      {
        id: 'requests',
        label: 'Demandes chaudes',
        value: newPublicRequestCount,
        helper: `${premiumCockpit.metrics.openRequests} demandes ouvertes au total`,
        route: '/admin/demandes',
        cta: 'Qualifier',
        icon: UserCheck,
        className: 'bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/20 dark:text-sky-300 dark:border-sky-900/40'
      },
      {
        id: 'dossiers',
        label: 'Dossiers critiques',
        value: todayActionStats.critical,
        helper: `${todayActionStats.openToCreate} action${todayActionStats.openToCreate > 1 ? 's' : ''} à créer`,
        route: '/admin/dossiers',
        cta: 'Débloquer',
        icon: AlertTriangle,
        className: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/40'
      },
      {
        id: 'margin',
        label: 'Marge à corriger',
        value: formatPremiumCurrency(premiumCockpit.metrics.quoteMarginGap),
        helper: `${premiumCockpit.metrics.quotesMarginAtRisk} devis sous surveillance`,
        route: '/admin/devis',
        cta: 'Revoir',
        icon: TrendingUp,
        className: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40'
      },
      {
        id: 'planning',
        label: 'Planning à risque',
        value: planningRisk,
        helper: `${premiumCockpit.metrics.movesUnassigned} chantier${premiumCockpit.metrics.movesUnassigned > 1 ? 's' : ''} à affecter`,
        route: '/admin/planning',
        cta: 'Planifier',
        icon: Calendar,
        className: 'bg-slate-50 text-slate-900 border-slate-200 dark:bg-slate-950/60 dark:text-slate-200 dark:border-slate-800'
      }
    ];
  }, [newPublicRequestCount, pendingInvoicesSum, premiumCockpit, todayActionStats]);

  const isManagerView = roleFocus.eyebrow === 'Cockpit gérant';

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Banner */}
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-850 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 backdrop-blur-md">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em] bg-accent/10 px-2.5 py-1 rounded-full block">MarneTransdem CRM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-brand-900 dark:text-white">
            Bonjour, {user?.email?.split('@')[0]}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-xs max-w-xl">
            Pilotez votre activité en temps réel. Suivez vos performances, vos tournées et encaissez vos factures.
          </p>
        </div>
        <div className="bg-slate-50/95 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shrink-0 z-10 min-w-[200px] shadow-sm">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Tâches en attente</span>
          <span className="text-3xl font-black text-brand-900 dark:text-white block mt-1">
            {newPublicRequestCount + quoteFollowUpCount + planningToAssignCount}
          </span>
          <div className="text-[10px] text-slate-500 mt-1 flex flex-col gap-0.5">
            <span>• {newPublicRequestCount} demandes web</span>
            <span>• {quoteFollowUpCount} devis à relancer</span>
            <span>• {planningToAssignCount} chantiers à planifier</span>
          </div>
        </div>
      </div>

      <section className='bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4'>
            <div className='space-y-2'>
              <span className='text-[10px] font-black uppercase tracking-[0.2em] text-accent'>{roleFocus.eyebrow}</span>
              <h3 className='text-xl md:text-2xl font-black tracking-tight text-brand-950 dark:text-white'>{isManagerView ? 'Les 5 décisions du matin' : roleFocus.title}</h3>
              <p className='text-sm font-medium text-slate-500 dark:text-slate-400 max-w-3xl'>
                {isManagerView ? 'Un résumé court, actionnable et connecté aux bons modules pour piloter sans se perdre dans les détails.' : roleFocus.description}
              </p>
            </div>
            <button
              type='button'
              onClick={() => navigate(isManagerView ? '/admin/dossiers' : roleFocus.primaryRoute)}
              className='inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-900 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-hover dark:bg-accent dark:text-brand-950'
            >
              {isManagerView ? 'Ouvrir les priorités' : roleFocus.primaryCta}
              <ArrowUpRight size={13} />
            </button>
          </div>

          {isManagerView ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-5 gap-3'>
              {managerDecisionCards.map((card) => {
                const Icon = card.icon;
                return (
                  <button
                    key={card.id}
                    type='button'
                    onClick={() => navigate(card.route)}
                    className={`text-left rounded-2xl border p-4 min-h-32 transition-all hover:-translate-y-0.5 hover:shadow-md ${card.className}`}
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <Icon size={18} className='shrink-0 opacity-80' />
                      <span className='rounded-md bg-white/70 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider opacity-80 dark:bg-slate-950/40'>{card.cta}</span>
                    </div>
                    <span className='mt-4 block text-[9px] font-black uppercase tracking-wider opacity-70'>{card.label}</span>
                    <strong className='mt-1 block text-2xl font-black leading-tight'>{card.value}</strong>
                    <p className='mt-2 text-[11px] font-semibold leading-snug opacity-80'>{card.helper}</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
              {roleFocus.checks.map((item) => (
                <div key={item.label} className='rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/75 dark:border-slate-800 p-3 min-h-20'>
                  <span className='block text-[9px] font-black uppercase tracking-wider text-slate-400 leading-tight'>{item.label}</span>
                  <strong className='mt-2 block text-lg font-black text-brand-900 dark:text-white truncate'>{item.value}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Actions du jour</span>
            <h3 className="mt-1 text-lg font-black text-brand-900 dark:text-white">Priorites CRM convertibles en taches</h3>
            <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {todayActionStats.critical} critiques, {todayActionStats.warning} a suivre, {todayActionStats.alreadyTasked} deja couvertes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/dossiers')}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-900 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-hover dark:bg-accent dark:text-brand-950"
          >
            Ouvrir dossiers
            <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-5 gap-3">
          {todayActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => navigate(action.route)}
              className={`text-left rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${getTodayActionClasses(action.tone)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <ClipboardList size={16} className="mt-0.5 shrink-0 opacity-75" />
                {action.alreadyTasked ? (
                  <CheckCircle2 size={15} className="shrink-0 text-emerald-600 dark:text-emerald-300" />
                ) : (
                  <span className="rounded-md bg-white/70 px-1.5 py-0.5 text-[8px] font-black uppercase opacity-80 dark:bg-slate-950/40">A creer</span>
                )}
              </div>
              <span className="mt-3 block text-[9px] font-black uppercase tracking-wider opacity-70 truncate">{action.clientName}</span>
              <strong className="mt-1 block text-xs font-black leading-snug">{action.title}</strong>
              <p className="mt-1 line-clamp-2 text-[11px] font-semibold opacity-80">{action.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-white/70 px-1.5 py-0.5 text-[8px] font-black uppercase opacity-80 dark:bg-slate-950/40">{action.priority === 'urgent' ? 'Urgent' : 'Normal'}</span>
                <span className="rounded-md bg-white/70 px-1.5 py-0.5 text-[8px] font-black uppercase opacity-80 dark:bg-slate-950/40">{action.dueDate}</span>
              </div>
              <span className="mt-3 inline-flex text-[9px] font-black uppercase tracking-wider opacity-80">{action.cta}</span>
            </button>
          ))}

          {todayActions.length === 0 && (
            <div className="xl:col-span-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-300">
              <p className="text-sm font-black">Aucune action sensible aujourd'hui.</p>
              <p className="mt-1 text-xs font-semibold opacity-80">Les controles dossier ne signalent pas de priorite immediate pour votre role.</p>
            </div>
          )}
        </div>
      </section>
      {/* Cockpit Premium */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 bg-brand-950 text-white rounded-3xl p-6 shadow-sm border border-brand-900 overflow-hidden relative">
          <div className="absolute right-0 top-0 h-32 w-32 bg-accent/10 rounded-bl-[48px]" />
          <div className="relative z-10 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Cockpit Premium</span>
                <h3 className="text-xl font-black mt-1">Maîtrise opérationnelle</h3>
              </div>
              <ShieldCheck className="text-accent shrink-0" size={28} />
            </div>

            <div className="flex items-end gap-3">
              <span className="text-6xl font-black leading-none">{premiumCockpit.score}</span>
              <div className="pb-2">
                <span className="text-sm font-black">/100</span>
                <p className="text-xs text-slate-300 font-semibold">{premiumCockpit.scoreLabel}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/8 border border-white/10 rounded-2xl p-3">
                <span className="text-[9px] uppercase font-black text-slate-400">Aujourd'hui</span>
                <strong className="block text-lg mt-0.5">{premiumCockpit.metrics.visitsToday + premiumCockpit.metrics.movesToday}</strong>
              </div>
              <div className="bg-white/8 border border-white/10 rounded-2xl p-3">
                <span className="text-[9px] uppercase font-black text-slate-400">À 7 jours</span>
                <strong className="block text-lg mt-0.5">{premiumCockpit.metrics.visitsNext7}</strong>
              </div>
              <div className="bg-white/8 border border-white/10 rounded-2xl p-3">
                <span className="text-[9px] uppercase font-black text-slate-400">Devis marge</span>
                <strong className="block text-lg mt-0.5">{premiumCockpit.metrics.quotesMarginAtRisk}</strong>
              </div>
              <div className="bg-white/8 border border-white/10 rounded-2xl p-3">
                <span className="text-[9px] uppercase font-black text-slate-400">Risques</span>
                <strong className="block text-lg mt-0.5">{premiumCockpit.metrics.movesUnassigned + premiumCockpit.metrics.overdueInvoices}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-8 bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Ordre de bataille</span>
              <h3 className="text-lg font-black text-brand-900 dark:text-white">Priorités à traiter maintenant</h3>
            </div>
            <button
              onClick={() => navigate('/admin/relances')}
              className="self-start sm:self-center px-3 py-2 rounded-xl bg-slate-950 text-white dark:bg-accent dark:text-brand-950 text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              Centre relances <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 space-y-3">
              {premiumCockpit.actions.length === 0 ? (
                <div className="border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-4 text-emerald-800 dark:text-emerald-300">
                  <p className="text-xs font-black">Aucune urgence détectée.</p>
                  <p className="text-[11px] mt-1 font-medium opacity-80">Le flux commercial, planning et trésorerie est sous contrôle.</p>
                </div>
              ) : premiumCockpit.actions.map(action => (
                <div key={action.id} className={`border rounded-2xl p-4 flex items-center justify-between gap-4 ${getPremiumToneClasses(action.severity)}`}>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black leading-none">{action.metric}</span>
                      <h4 className="text-xs font-black truncate">{action.title}</h4>
                    </div>
                    <p className="text-[11px] mt-1 font-medium opacity-80 leading-relaxed">{action.description}</p>
                  </div>
                  <button
                    onClick={() => navigate(action.route)}
                    className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0 ${getPremiumButtonClasses(action.severity)}`}
                  >
                    {action.cta}
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/75 dark:border-slate-800 p-4">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Portefeuille signé</span>
                <strong className="block text-xl font-black mt-1 text-brand-900 dark:text-white">{formatPremiumCurrency(premiumCockpit.metrics.signedRevenue)}</strong>
                <p className="text-[10px] text-slate-500 mt-1">CA sécurisé par devis signés</p>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/75 dark:border-slate-800 p-4">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Potentiel ouvert</span>
                <strong className="block text-xl font-black mt-1 text-brand-900 dark:text-white">{formatPremiumCurrency(premiumCockpit.metrics.quotePotential)}</strong>
                <p className="text-[10px] text-slate-500 mt-1">{premiumCockpit.metrics.conversionRate}% de conversion actuelle</p>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/75 dark:border-slate-800 p-4 col-span-2 lg:col-span-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Panier moyen devis</span>
                <strong className="block text-xl font-black mt-1 text-brand-900 dark:text-white">{formatPremiumCurrency(premiumCockpit.metrics.averageQuoteValue)}</strong>
                <p className="text-[10px] text-slate-500 mt-1">Base pour marge et tarification intelligente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {premiumCockpit.nextOperations.length > 0 && (
        <section className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Terrain</span>
              <h3 className="text-lg font-black text-brand-900 dark:text-white">Visites et chantiers des 7 prochains jours</h3>
            </div>
            <Calendar className="text-slate-400" size={20} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {premiumCockpit.nextOperations.map(operation => (
              <button
                key={operation.id}
                onClick={() => navigate(operation.route)}
                className="text-left border border-slate-200/75 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/70 dark:bg-slate-950/50 hover:border-accent transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase text-slate-400">{formatDateFr(operation.date)}</span>
                  {operation.type === 'visite' ? <MapPin size={14} className="text-sky-500" /> : <Truck size={14} className="text-indigo-500" />}
                </div>
                <h4 className="mt-2 text-xs font-black text-slate-900 dark:text-white truncate">{operation.title}</h4>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">{operation.description}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Priorités & Alertes */}
      {alertes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <AlertCircle size={14} className="text-red-500" />
            Priorités opérationnelles ({alertes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alertes.map(alerte => (
              <div 
                key={alerte.id} 
                className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-all duration-200 shadow-sm backdrop-blur-sm ${
                  alerte.type === 'error' 
                    ? 'bg-red-50/70 dark:bg-red-950/10 border-red-200/70 dark:border-red-900/30 text-red-950 dark:text-red-300' 
                    : alerte.type === 'warning'
                    ? 'bg-amber-50/70 dark:bg-amber-950/10 border-amber-200/70 dark:border-amber-900/30 text-amber-950 dark:text-amber-300'
                    : 'bg-sky-50/70 dark:bg-sky-950/10 border-sky-200/70 dark:border-sky-900/30 text-sky-950 dark:text-sky-300'
                }`}
              >
                <div className="flex gap-3 items-start">
                  <div className={`p-2 rounded-xl mt-0.5 ${
                    alerte.type === 'error' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                      : alerte.type === 'warning'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                      : 'bg-sky-100 dark:bg-sky-900/30 text-sky-600'
                  }`}>
                    <AlertTriangle size={16} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold leading-normal">{alerte.message}</p>
                    <p className="text-[10px] opacity-75">Action requise immédiatement</p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(alerte.actionPath)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold tracking-wide uppercase transition-colors shrink-0 ${
                    alerte.type === 'error'
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/10'
                      : alerte.type === 'warning'
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm shadow-amber-600/10'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm shadow-sky-600/10'
                  }`}
                >
                  {alerte.actionLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CA Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trésorerie Encaissée</span>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
              <Coins className="text-emerald-600" size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-brand-900 dark:text-white">{activeInvoicesSum.toLocaleString('fr-FR')} €</h3>
          
          {/* CA Mensuel & Comparaison */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[9px] text-slate-400 uppercase block font-bold">Ce mois ({caStats.currentCA.toLocaleString('fr-FR')} €)</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                vs {caStats.prevCA.toLocaleString('fr-FR')} € (M-1)
              </span>
            </div>
            {caStats.pct !== 0 && (
              <span className={`flex items-center gap-0.5 text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${
                caStats.diff >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
              }`}>
                {caStats.diff >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {Math.abs(caStats.pct)}%
              </span>
            )}
          </div>
        </div>

        {/* Factures en attente */}
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">En Attente Encaissement</span>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
              <CreditCard className="text-amber-600" size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-brand-900 dark:text-white">{pendingInvoicesSum.toLocaleString('fr-FR')} €</h3>
          <p className="text-[10px] text-slate-400 mt-1">Factures de déménagements signés en cours</p>
        </div>

        {/* Conversion rate Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taux de Conversion</span>
            <div className="p-2.5 bg-sky-50 dark:bg-sky-950/20 rounded-xl">
              <TrendingUp className="text-sky-600" size={18} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-black text-brand-900 dark:text-white">{conversionStats.rate}%</h3>
              <p className="text-[10px] text-slate-400 mt-1">
                {conversionStats.signed} devis signés / {conversionStats.total} envoyés
              </p>
            </div>
            
            {/* Circular Progress Micro-indicator */}
            <div className="relative w-10 h-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-sky-500"
                  strokeWidth="3.5"
                  strokeDasharray={`${conversionStats.rate}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-sky-600 dark:text-sky-400">
                {conversionStats.rate}%
              </div>
            </div>
          </div>
        </div>

        {/* Chantiers planifiés */}
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Déménagements</span>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
              <Truck className="text-indigo-600" size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-brand-900 dark:text-white">
            {demenagements.filter(d => d.status === 'Programmé' || d.status === 'En cours').length}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">Chantiers en cours ou programmés ce mois</p>
        </div>
      </div>

      {/* Main Sections Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Timeline & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Action Rapides */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} className="text-accent" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Actions Rapides</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button 
                onClick={() => navigate('/admin/devis')}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 hover:border-accent dark:hover:border-accent hover:bg-white dark:hover:bg-slate-950 hover:shadow-md transition-all group gap-2 text-center"
              >
                <div className="p-3 bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 rounded-2xl group-hover:bg-accent group-hover:text-brand-900 transition-all">
                  <FileText size={20} />
                </div>
                <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">Nouveau Devis</span>
                <span className="text-[9px] text-slate-400">Rédiger & envoyer</span>
              </button>

              <button 
                onClick={() => navigate('/admin/visites')}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 hover:border-accent dark:hover:border-accent hover:bg-white dark:hover:bg-slate-950 hover:shadow-md transition-all group gap-2 text-center"
              >
                <div className="p-3 bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300 rounded-2xl group-hover:bg-accent group-hover:text-brand-900 transition-all">
                  <Calendar size={20} />
                </div>
                <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">Planifier Visite</span>
                <span className="text-[9px] text-slate-400">Technique ou Visio</span>
              </button>

              <button 
                onClick={() => navigate('/admin/planning')}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 hover:border-accent dark:hover:border-accent hover:bg-white dark:hover:bg-slate-950 hover:shadow-md transition-all group gap-2 text-center"
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 rounded-2xl group-hover:bg-accent group-hover:text-brand-900 transition-all">
                  <UserCheck size={20} />
                </div>
                <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">Assigner Équipe</span>
                <span className="text-[9px] text-slate-400">Planification terrain</span>
              </button>

              <button 
                onClick={() => navigate('/admin/factures')}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 hover:border-accent dark:hover:border-accent hover:bg-white dark:hover:bg-slate-950 hover:shadow-md transition-all group gap-2 text-center"
              >
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 rounded-2xl group-hover:bg-accent group-hover:text-brand-900 transition-all">
                  <CreditCard size={20} />
                </div>
                <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-200">Suivi Factures</span>
                <span className="text-[9px] text-slate-400">Encaisser & relancer</span>
              </button>
            </div>
          </div>

          {/* Timeline d'événements récents */}
          <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200/75 dark:border-slate-800 rounded-3xl p-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Journal d'Activité Récente</h3>
              </div>
              <span className="text-[9px] font-black uppercase text-accent tracking-widest">5 Derniers Événements</span>
            </div>

            <div className="relative border-l border-slate-100 dark:border-slate-800 pl-4 ml-2 space-y-6">
              {timelineEvents.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 italic text-center">Aucun événement enregistré.</p>
              ) : (
                timelineEvents.map(event => (
                  <div key={event.id} className="relative group">
                    {/* Circle Dot */}
                    <span className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border bg-white dark:bg-slate-900 transition-transform group-hover:scale-125 ${
                      event.type === 'devis' 
                        ? 'border-brand-500' 
                        : event.type === 'visite'
                        ? 'border-sky-500'
                        : event.type === 'demenagement'
                        ? 'border-indigo-500'
                        : 'border-emerald-500'
                    }`} />
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-xs font-extrabold text-slate-950 dark:text-slate-200">{event.title}</h4>
                        <span className="text-[9px] text-slate-400 font-bold bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-md">
                          {formatDateFr(event.date)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </div>

        {/* Right Side: Quick info / CRM Tips */}
        <div className="space-y-8">
          
          <div className="bg-gradient-to-br from-brand-900 to-slate-950 text-white rounded-3xl p-6 shadow-sm border border-brand-950/50 flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <ShieldCheck className="text-accent" size={32} />
              <h3 className="text-lg font-black tracking-tight leading-tight">MarneTransdem CRM Sécurisé</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Toutes les opérations sensibles comme l'édition de factures, l'affectation de camions ou la signature de devis sont historisées localement. En cas de déconnexion réseau, vos modifications restent éditables hors-ligne et se synchronisent avec Cloud Firestore dès récupération du signal.
              </p>
            </div>
            
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Version CRM 2.1</span>
              <span className="flex items-center gap-1 text-emerald-400 font-extrabold">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Opérationnel
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
