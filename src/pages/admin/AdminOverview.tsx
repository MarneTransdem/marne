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

  const todayActions = useMemo(() => allTodayActions.slice(0, 3), [allTodayActions]);
  const todayActionStats = useMemo(() => summarizeTodayActions(allTodayActions), [allTodayActions]);
  const hiddenTodayActionCount = Math.max(0, allTodayActions.length - todayActions.length);

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
        className: 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800'
      },
      {
        id: 'requests',
        label: 'Demandes à traiter',
        value: newPublicRequestCount,
        helper: `${premiumCockpit.metrics.openRequests} demandes ouvertes au total`,
        route: '/admin/demandes',
        cta: 'Qualifier',
        icon: UserCheck,
        className: 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800'
      },
      {
        id: 'dossiers',
        label: 'Dossiers à vérifier',
        value: todayActionStats.critical,
        helper: `${todayActionStats.openToCreate} action${todayActionStats.openToCreate > 1 ? 's' : ''} à créer`,
        route: '/admin/dossiers?focus=actions',
        cta: 'Voir',
        icon: AlertTriangle,
        className: 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800'
      },
      {
        id: 'margin',
        label: 'Prix à revoir',
        value: formatPremiumCurrency(premiumCockpit.metrics.quoteMarginGap),
        helper: `${premiumCockpit.metrics.quotesMarginAtRisk} devis sous surveillance`,
        route: '/admin/devis',
        cta: 'Revoir',
        icon: TrendingUp,
        className: 'bg-white text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800'
      },
      {
        id: 'planning',
        label: 'Planning à compléter',
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
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-accent">Tableau de bord</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-brand-950 dark:text-white md:text-3xl">
              Bonjour, {user?.email?.split('@')[0] || 'équipe'}
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Voici l'essentiel pour avancer aujourd'hui, sans bruit inutile. Les détails restent accessibles dans chaque module.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Demandes', value: newPublicRequestCount, detail: 'à qualifier', route: '/admin/demandes', icon: UserCheck },
              { label: 'Devis', value: quoteFollowUpCount, detail: 'à suivre', route: '/admin/devis', icon: FileText },
              { label: 'Factures', value: formatPremiumCurrency(pendingInvoicesSum), detail: 'en attente', route: '/admin/factures', icon: CreditCard },
              { label: 'Planning', value: planningToAssignCount, detail: 'à compléter', route: '/admin/planning', icon: Calendar }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.route)}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-left transition-colors hover:border-accent hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">{item.label}</span>
                    <Icon size={14} className="text-slate-400" />
                  </div>
                  <strong className="mt-2 block truncate text-lg font-black text-brand-950 dark:text-white">{item.value}</strong>
                  <span className="mt-0.5 block text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.detail}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{isManagerView ? 'Vue du jour' : roleFocus.eyebrow}</span>
            <h3 className="mt-1 text-xl font-black tracking-tight text-brand-950 dark:text-white">{isManagerView ? "Aujourd'hui en clair" : roleFocus.title}</h3>
            <p className="mt-1 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {isManagerView ? 'Les informations utiles sont regroupées ici pour décider vite, déléguer facilement et garder une vision sereine.' : roleFocus.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(isManagerView ? '/admin/dossiers?focus=actions' : roleFocus.primaryRoute)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-900 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-hover dark:bg-accent dark:text-brand-950"
          >
            {isManagerView ? 'Voir les actions' : roleFocus.primaryCta}
            <ArrowUpRight size={13} />
          </button>
        </div>

        {isManagerView ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {managerDecisionCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => navigate(card.route)}
                  className={`min-h-28 rounded-2xl border p-4 text-left transition-colors hover:border-accent hover:shadow-sm ${card.className}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-xl bg-slate-50 p-2 text-slate-500 dark:bg-slate-950/60 dark:text-slate-300"><Icon size={16} /></span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">{card.cta}</span>
                  </div>
                  <span className="mt-3 block text-[9px] font-black uppercase tracking-wider text-slate-400">{card.label}</span>
                  <strong className="mt-1 block truncate text-xl font-black text-brand-950 dark:text-white">{card.value}</strong>
                  <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-snug text-slate-500 dark:text-slate-400">{card.helper}</p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {roleFocus.checks.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-400">{item.label}</span>
                <strong className="mt-2 block truncate text-lg font-black text-brand-950 dark:text-white">{item.value}</strong>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">À faire maintenant</span>
            <h3 className="mt-1 text-lg font-black text-brand-950 dark:text-white">Les 3 prochaines actions utiles</h3>
            <p className="mt-1 max-w-2xl text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
              L'accueil reste volontairement court. {hiddenTodayActionCount > 0 ? `${hiddenTodayActionCount} autre${hiddenTodayActionCount > 1 ? 's' : ''} action${hiddenTodayActionCount > 1 ? 's' : ''} reste${hiddenTodayActionCount > 1 ? 'nt' : ''} disponible${hiddenTodayActionCount > 1 ? 's' : ''} dans Dossiers.` : 'Tout le reste est déjà couvert.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/admin/dossiers?focus=actions')}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-700 transition-colors hover:border-brand-900 hover:text-brand-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:text-white"
          >
            Tout voir
            <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-3">
          {todayActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => navigate(action.route)}
              className={`min-h-32 rounded-2xl border border-l-4 p-4 text-left transition-colors hover:border-accent hover:shadow-sm ${getTodayActionClasses(action.tone)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <ClipboardList size={16} className="mt-0.5 shrink-0 text-slate-400" />
                {action.alreadyTasked ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black uppercase text-emerald-700 dark:bg-emerald-950/25 dark:text-emerald-300">Préparée</span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-black uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-300">À préparer</span>
                )}
              </div>
              <span className="mt-3 block truncate text-[9px] font-black uppercase tracking-wider text-slate-400">{action.clientName}</span>
              <strong className="mt-1 block text-sm font-black leading-snug text-brand-950 dark:text-white">{action.title}</strong>
              <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-relaxed text-slate-500 dark:text-slate-400">{action.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[8px] font-black uppercase tracking-wider text-slate-400">
                <span className="rounded-md bg-slate-50 px-1.5 py-0.5 dark:bg-slate-950/60">{action.priority === 'urgent' ? 'À traiter' : 'Suivi'}</span>
                <span className="rounded-md bg-slate-50 px-1.5 py-0.5 dark:bg-slate-950/60">{formatDateFr(action.dueDate)}</span>
              </div>
            </button>
          ))}

          {todayActions.length === 0 && (
            <div className="xl:col-span-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
              <p className="text-sm font-black">Rien de sensible à traiter maintenant.</p>
              <p className="mt-1 text-xs font-semibold opacity-80">Le flux est propre pour votre rôle.</p>
            </div>
          )}
        </div>
      </section>

      {alertes.length > 0 && (
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">À surveiller</span>
              <h3 className="mt-1 text-lg font-black text-brand-950 dark:text-white">Points à ne pas oublier</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500 dark:bg-slate-800 dark:text-slate-300">{alertes.length}</span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {alertes.slice(0, 4).map((alerte) => (
              <button
                key={alerte.id}
                type="button"
                onClick={() => navigate(alerte.actionPath)}
                className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-colors hover:border-accent hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-900"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-relaxed text-slate-700 dark:text-slate-200">{alerte.message}</p>
                  <span className="mt-2 inline-flex text-[10px] font-black uppercase tracking-wider text-slate-400">{alerte.actionLabel}</span>
                </div>
                <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-slate-400" />
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {[
          { label: 'Trésorerie encaissée', value: `${activeInvoicesSum.toLocaleString('fr-FR')} €`, detail: `Ce mois : ${caStats.currentCA.toLocaleString('fr-FR')} €`, icon: Coins },
          { label: 'En attente', value: `${pendingInvoicesSum.toLocaleString('fr-FR')} €`, detail: 'Factures à encaisser', icon: CreditCard },
          { label: 'Conversion', value: `${conversionStats.rate}%`, detail: `${conversionStats.signed}/${conversionStats.total} devis`, icon: TrendingUp },
          { label: 'Chantiers', value: demenagements.filter(d => d.status === 'Programmé' || d.status === 'En cours').length, detail: 'en cours ou programmés', icon: Truck }
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{metric.label}</span>
                <Icon size={16} className="text-slate-400" />
              </div>
              <strong className="mt-3 block truncate text-2xl font-black text-brand-950 dark:text-white">{metric.value}</strong>
              <p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">{metric.detail}</p>
            </div>
          );
        })}
      </section>

      {premiumCockpit.nextOperations.length > 0 && (
        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Agenda</span>
              <h3 className="mt-1 text-lg font-black text-brand-950 dark:text-white">Prochains rendez-vous</h3>
            </div>
            <Calendar className="text-slate-400" size={18} />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {premiumCockpit.nextOperations.slice(0, 3).map((operation) => (
              <button
                key={operation.id}
                type="button"
                onClick={() => navigate(operation.route)}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-colors hover:border-accent hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-900"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase text-slate-400">{formatDateFr(operation.date)}</span>
                  {operation.type === 'visite' ? <MapPin size={14} className="text-slate-400" /> : <Truck size={14} className="text-slate-400" />}
                </div>
                <h4 className="mt-2 truncate text-xs font-black text-brand-950 dark:text-white">{operation.title}</h4>
                <p className="mt-1 truncate text-[11px] font-semibold text-slate-500 dark:text-slate-400">{operation.description}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles size={16} className="text-accent" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Raccourcis</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Devis', detail: 'Créer ou envoyer', route: '/admin/devis', icon: FileText },
              { label: 'Visites', detail: 'Planifier', route: '/admin/visites', icon: Calendar },
              { label: 'Planning', detail: 'Affecter', route: '/admin/planning', icon: UserCheck },
              { label: 'Factures', detail: 'Encaisser', route: '/admin/factures', icon: CreditCard }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.route)}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-left transition-colors hover:border-accent hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-900"
                >
                  <Icon size={17} className="text-slate-400" />
                  <span className="mt-3 block text-xs font-black text-brand-950 dark:text-white">{item.label}</span>
                  <span className="mt-0.5 block text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.detail}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Dernières activités</h3>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">5 éléments</span>
          </div>
          <div className="space-y-4">
            {timelineEvents.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-4 text-center text-xs font-semibold text-slate-400 dark:bg-slate-950/40">Aucune activité récente.</p>
            ) : (
              timelineEvents.map((event) => (
                <div key={event.id} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="truncate text-xs font-black text-brand-950 dark:text-white">{event.title}</h4>
                      <span className="shrink-0 text-[9px] font-bold text-slate-400">{formatDateFr(event.date)}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-relaxed text-slate-500 dark:text-slate-400">{event.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
