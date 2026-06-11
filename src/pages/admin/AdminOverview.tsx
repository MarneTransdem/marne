import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Coins, CreditCard, FileText, Truck, MapPin, 
  AlertTriangle, TrendingUp, Clock, ArrowUpRight, ArrowUp, ArrowDown,
  Calendar, UserCheck, AlertCircle, Sparkles
} from 'lucide-react';
import { useSyncedCollection } from '../../hooks/useData';
import type { Devis, Facture, Visite, Demenagement } from '../../types';
import type { AdminPublicRequest } from '../../lib/admin-dossiers';

export function AdminOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [factures] = useSyncedCollection<Facture>('factures');
  const [publicRequests] = useSyncedCollection<AdminPublicRequest>('quotes');
  const [visites] = useSyncedCollection<Visite>('visites');
  const [devisList] = useSyncedCollection<Devis>('devis');
  const [demenagements] = useSyncedCollection<Demenagement>('demenagements');

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
  }, [visites, demenagements, factures, todayStr]);

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
