import React, { useState, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSyncedCollection } from '../../hooks/useData';
import { Facture } from '../../types';
import { 
  Plus, FileText, X, Coins, CreditCard, AlertTriangle, 
  Search, ShieldAlert, BadgePercent, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { PdfGenerator } from '../../components/admin/PdfGenerator';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

interface AdminFacturesProps {
  factures?: Facture[];
  setFactures?: React.Dispatch<React.SetStateAction<Facture[]>>;
  setSelectedPdfDoc?: (doc: { type: 'devis' | 'facture'; data: any } | null) => void;
  searchQuery?: string;
}

export function AdminFactures({ 
  factures, 
  setFactures, 
  setSelectedPdfDoc, 
  searchQuery 
}: AdminFacturesProps) {
  const context = useOutletContext<AdminOutletContextType>();
  const activeSearchQuery = searchQuery || context?.searchQuery || '';

  const [syncedFactures, setSyncedFactures, { daysLimit: facturesDays, setDaysLimit: setFacturesDays }] = useSyncedCollection<Facture>('factures', [], { timeField: 'date' });
  
  const activeFactures = factures || syncedFactures;
  const activeSetFactures = setFactures || setSyncedFactures;

  const [showAddFacture, setShowAddFacture] = useState(false);
  const [localPdfFacture, setLocalPdfFacture] = useState<Facture | null>(null);
  const [sendingReminderId, setSendingReminderId] = useState<string | null>(null);
  
  // Financial filter state
  const [filterStatus, setFilterStatus] = useState<'all' | 'En attente' | 'Payée' | 'En retard'>('all');
  
  const [newFacture, setNewFacture] = useState<Partial<Facture>>({
    devisId: '', 
    clientName: '', 
    email: '',
    amount: 1500, 
    tvaRate: 20,
    status: 'En attente',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0]
  });

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Automated marking of overdue invoices
  useEffect(() => {
    const overdueInvoices = activeFactures.filter(
      f => f.status === 'En attente' && f.dueDate < todayStr
    );
    if (overdueInvoices.length > 0) {
      const updated = activeFactures.map(f => {
        if (f.status === 'En attente' && f.dueDate < todayStr) {
          return { ...f, status: 'En retard' as const, overdueSince: todayStr };
        }
        return f;
      });
      activeSetFactures(updated);
    }
  }, [activeFactures, todayStr, activeSetFactures]);

  const createInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `FAC-2026-00${activeFactures.length + 1}`;
    const dateVal = newFacture.date || new Date().toISOString().split('T')[0];
    const dueDateVal = newFacture.dueDate || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0];
    
    // Determine status (handle auto-overdue right away if dueDate is in the past)
    let finalStatus = newFacture.status || 'En attente';
    if (finalStatus === 'En attente' && dueDateVal < todayStr) {
      finalStatus = 'En retard';
    }

    const ttc = Number(newFacture.amount) || 1000;
    const rate = Number(newFacture.tvaRate) || 0;
    const ht = rate > 0 ? ttc / (1 + (rate / 100)) : ttc;
    const tvaAmount = ttc - ht;

    const item: Facture = {
      id,
      devisId: newFacture.devisId || 'DEV-MANUEL',
      clientName: newFacture.clientName || 'Client Manuel',
      email: newFacture.email || '',
      amountHT: Number(ht.toFixed(2)),
      tvaRate: rate,
      tvaAmount: Number(tvaAmount.toFixed(2)),
      amount: ttc,
      date: dateVal,
      dueDate: dueDateVal,
      status: finalStatus as any,
      overdueSince: finalStatus === 'En retard' ? todayStr : undefined
    };

    activeSetFactures(prev => [item, ...prev]);
    setShowAddFacture(false);
    setNewFacture({ 
      devisId: '', 
      clientName: '', 
      email: '',
      amount: 1500, 
      tvaRate: 20,
      status: 'En attente',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0]
    });
  };

  const updateInvoiceStatus = (id: string, newStatus: Facture['status']) => {
    activeSetFactures(prev => prev.map(f => {
      if (f.id === id) {
        return { 
          ...f, 
          status: newStatus,
          overdueSince: newStatus === 'En retard' ? todayStr : undefined
        };
      }
      return f;
    }));
  };

  const handleExportCSV = () => {
    const headers = ['Code Facture', 'Client', 'Email', 'Devis rattaché', 'Montant HT', 'TVA', 'Montant TTC', 'Date Emission', 'Date Echeance', 'Statut'];
    const rows = filteredFactures.map(f => [
      f.id,
      `"${f.clientName}"`,
      f.email || '',
      f.devisId,
      f.amountHT ? f.amountHT.toString().replace('.', ',') : '',
      f.tvaAmount ? f.tvaAmount.toString().replace('.', ',') : '',
      f.amount.toString().replace('.', ','),
      f.date,
      f.dueDate,
      f.status
    ]);
    const csvContent = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `export_factures_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRelance = async (fac: Facture) => {
    if (!fac.email) {
      if (context?.pushNotification) {
        context.pushNotification("Erreur de relance", "Aucun email n'est renseigné pour ce client.", "warning");
      } else {
        alert("Aucun email n'est renseigné pour ce client.");
      }
      return;
    }

    setSendingReminderId(fac.id);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'invoice-reminder',
          data: {
            invoice: fac
          }
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Erreur serveur (${response.status})`);
      }

      if (context?.pushNotification) {
        context.pushNotification("Relance envoyée ✉️", `Le rappel de paiement pour la facture ${fac.id} a été envoyé à ${fac.email}.`, "success");
      }
    } catch (err: any) {
      console.error("Failed to send invoice reminder:", err);
      if (context?.pushNotification) {
        context.pushNotification("Échec de l'envoi", err.message || "Impossible d'envoyer l'email de relance.", "warning");
      } else {
        alert("Une erreur est survenue lors de l'envoi de la relance.");
      }
    } finally {
      setSendingReminderId(null);
    }
  };

  const handlePdfClick = (fac: Facture) => {
    if (setSelectedPdfDoc) {
      setSelectedPdfDoc({ type: 'facture', data: fac });
    } else {
      setLocalPdfFacture(fac);
    }
  };

  const totals = useMemo(() => {
    const encaiss = activeFactures.filter(f => f.status === 'Payée').reduce((s, f) => s + f.amount, 0);
    const pending = activeFactures.filter(f => f.status === 'En attente').reduce((s, f) => s + f.amount, 0);
    const late = activeFactures.filter(f => f.status === 'En retard').reduce((s, f) => s + f.amount, 0);
    return { encaiss, pending, late };
  }, [activeFactures]);

  const filteredFactures = useMemo(() => {
    let list = activeFactures;
    
    // 1. Filter by status tabs
    if (filterStatus !== 'all') {
      list = list.filter(f => f.status === filterStatus);
    }

    // 2. Filter by search query
    if (activeSearchQuery) {
      const q = activeSearchQuery.toLowerCase();
      list = list.filter(item => 
        item.clientName.toLowerCase().includes(q) || 
        item.id.toLowerCase().includes(q) ||
        item.devisId.toLowerCase().includes(q)
      );
    }
    
    return list;
  }, [activeFactures, filterStatus, activeSearchQuery]);

  const formatDateFr = (dateStr?: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wider">GESTION DU CHIFFRE D'AFFAIRES</p>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Factures & Règlements</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          {/* Period Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">Période :</label>
            <select 
              value={facturesDays} 
              onChange={(e) => setFacturesDays(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3 text-xs font-black text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-accent/20 cursor-pointer"
            >
              <option value={90}>90 derniers jours</option>
              <option value={180}>180 derniers jours</option>
              <option value={365}>1 an</option>
              <option value="all">Toutes les archives</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-2xl text-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0"
          >
            <FileText size={14} /> Export CSV
          </button>
          <button
            onClick={() => setShowAddFacture(true)}
            className="bg-accent hover:bg-accent-hover text-brand-900 border border-accent font-black py-2.5 px-5 rounded-2xl text-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer shrink-0"
          >
            <Plus size={14} /> Émettre Facture
          </button>
        </div>
      </div>

      {/* Bandeau de synthèse financière */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 p-5 rounded-2xl shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">CA Encaissé (Réglé)</span>
            <h3 className="text-xl font-black text-emerald-950 dark:text-emerald-350">{totals.encaiss.toLocaleString('fr-FR')} €</h3>
            <p className="text-[9px] text-emerald-600 dark:text-emerald-500 font-bold">Trésorerie disponible</p>
          </div>
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 rounded-2xl">
            <Coins size={20} />
          </div>
        </div>

        <div className="bg-amber-50/60 dark:bg-amber-950/10 border border-amber-105 dark:border-amber-900/30 p-5 rounded-2xl shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">CA Attendu (Encaissement)</span>
            <h3 className="text-xl font-black text-amber-950 dark:text-amber-350">{totals.pending.toLocaleString('fr-FR')} €</h3>
            <p className="text-[9px] text-amber-600 dark:text-amber-500 font-bold">Encours facturés normaux</p>
          </div>
          <div className="p-3 bg-amber-100 dark:bg-amber-900/40 text-amber-600 rounded-2xl">
            <CreditCard size={20} />
          </div>
        </div>

        <div className="bg-red-50/60 dark:bg-red-950/10 border border-red-105 dark:border-red-900/30 p-5 rounded-2xl shadow-sm flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-red-600 dark:text-red-400 tracking-wider">CA en Souffrance (Retard)</span>
            <h3 className="text-xl font-black text-red-950 dark:text-red-350">{totals.late.toLocaleString('fr-FR')} €</h3>
            <p className="text-[9px] text-red-600 dark:text-red-500 font-bold">Relance de paiement requise</p>
          </div>
          <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-600 rounded-2xl">
            <AlertTriangle size={20} />
          </div>
        </div>
      </div>

      {showAddFacture && (
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-350 dark:border-slate-700 p-6 rounded-3xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b pb-3 mb-2 border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-black uppercase text-brand-900 dark:text-white">Création Libre d'une Facture</h3>
            <button onClick={() => setShowAddFacture(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold">Fermer [X]</button>
          </div>
          <form onSubmit={createInvoice} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold mb-1">Nom du client</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: Gérard Depardieu" value={newFacture.clientName} onChange={e=>setNewFacture({...newFacture, clientName: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Identifiant Devis associé (optionnel)</label>
              <input type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: DEV-2026-001" value={newFacture.devisId} onChange={e=>setNewFacture({...newFacture, devisId: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Email du client (pour relance)</label>
              <input type="email" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="client@email.com" value={newFacture.email} onChange={e=>setNewFacture({...newFacture, email: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Montant global TTC (€)</label>
              <input type="number" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newFacture.amount} onChange={e=>setNewFacture({...newFacture, amount: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Taux TVA (%)</label>
              <select className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newFacture.tvaRate} onChange={e=>setNewFacture({...newFacture, tvaRate: Number(e.target.value)})}>
                <option value={20}>20% (Standard)</option>
                <option value={10}>10% (Réduit)</option>
                <option value={5.5}>5.5% (Spécifique)</option>
                <option value={0}>0% (Franchise/Auto-entrepreneur)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Date d'émission</label>
              <input type="date" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newFacture.date} onChange={e=>setNewFacture({...newFacture, date: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Date d'échéance de paiement</label>
              <input type="date" className="w-full bg-white dark:bg-slate-955 p-2.5 border rounded-lg focus:outline-accent" value={newFacture.dueDate} onChange={e=>setNewFacture({...newFacture, dueDate: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Statut initial</label>
              <select className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent text-slate-800 dark:text-slate-100" value={newFacture.status} onChange={e=>setNewFacture({...newFacture, status: e.target.value as any})}>
                <option value="En attente">En attente de paiement</option>
                <option value="Payée">Déjà encaissée (Payée)</option>
                <option value="En retard">Impayée (Relance)</option>
              </select>
            </div>
            
            <div className="md:col-span-3 pt-2">
              <button type="submit" className="w-full bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 py-3 rounded-xl font-bold cursor-pointer transition-all">
                Enregistrer la Facture dans les écritures
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabs Filter & Invoices grid */}
      <div className="space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/50 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-350 dark:border-slate-800'
            }`}
          >
            Toutes ({activeFactures.length})
          </button>
          <button
            onClick={() => setFilterStatus('Payée')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              filterStatus === 'Payée'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/10'
                : 'bg-white text-emerald-600 border border-emerald-200/40 hover:bg-emerald-50 dark:bg-slate-900 dark:border-emerald-950/20'
            }`}
          >
            Payées ({activeFactures.filter(f => f.status === 'Payée').length})
          </button>
          <button
            onClick={() => setFilterStatus('En attente')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              filterStatus === 'En attente'
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/10'
                : 'bg-white text-amber-600 border border-amber-200/40 hover:bg-amber-50 dark:bg-slate-900 dark:border-amber-950/20'
            }`}
          >
            En attente ({activeFactures.filter(f => f.status === 'En attente').length})
          </button>
          <button
            onClick={() => setFilterStatus('En retard')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              filterStatus === 'En retard'
                ? 'bg-red-600 text-white shadow-sm shadow-red-600/10'
                : 'bg-white text-red-600 border border-red-200/40 hover:bg-red-50 dark:bg-slate-900 dark:border-red-950/20'
            }`}
          >
            En retard ({activeFactures.filter(f => f.status === 'En retard').length})
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-100 dark:border-slate-800 text-xs font-black text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Code Facture</th>
                  <th className="py-4 px-6">Client</th>
                  <th className="py-4 px-6">Devis rattaché</th>
                  <th className="py-4 px-6">Montant</th>
                  <th className="py-4 px-6">Émission</th>
                  <th className="py-4 px-6">Échéance</th>
                  <th className="py-4 px-6">Statut</th>
                  <th className="py-4 px-6">Règlement / Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-100 dark:divide-slate-800">
                {filteredFactures.map((fac) => {
                  const isOverdue = fac.status === 'En retard';
                  return (
                    <tr 
                      key={fac.id} 
                      className={`transition-colors duration-150 ${
                        isOverdue 
                          ? 'bg-red-50/40 dark:bg-red-950/10 hover:bg-red-50/70 dark:hover:bg-red-950/20 text-red-900 dark:text-red-300' 
                          : 'hover:bg-slate-50/50 dark:hover:bg-slate-950/40'
                      }`}
                    >
                      <td className="py-4 px-6 font-mono font-black">{fac.id}</td>
                      <td className="py-4 px-6 font-semibold">{fac.clientName}</td>
                      <td className="py-4 px-6 font-mono text-[11px] text-slate-500 dark:text-slate-400">{fac.devisId}</td>
                      <td className="py-4 px-6 font-extrabold">{fac.amount.toLocaleString('fr-FR')} €</td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{formatDateFr(fac.date)}</td>
                      <td className="py-4 px-6 font-semibold">{formatDateFr(fac.dueDate)}</td>
                      
                      {/* Badge Statut */}
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase inline-block ${
                          fac.status === 'Payée' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-450' :
                          fac.status === 'En retard' ? 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 animate-pulse' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-450'
                        }`}>
                          {fac.status === 'Payée' ? 'Payée' : fac.status === 'En retard' ? 'En retard' : 'En attente'}
                        </span>
                      </td>

                      <td className="py-4 px-6 flex items-center gap-2">
                        <button
                          onClick={() => handlePdfClick(fac)}
                          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-1.5 px-2.5 rounded-lg text-[10px] font-extrabold cursor-pointer inline-flex items-center gap-1 active:scale-95 whitespace-nowrap"
                          title="Visualiser la facture pro Marne Transdem"
                        >
                          <FileText size={11} /> PDF Pro
                        </button>
                        
                        {fac.status === 'Payée' ? (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-black flex items-center gap-1">
                            <CheckCircle2 size={12} /> Réglé
                          </span>
                        ) : (
                          <div className="flex gap-1">
                            <button
                              onClick={() => updateInvoiceStatus(fac.id, 'Payée')}
                              disabled={sendingReminderId !== null}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-1.5 rounded-xl text-[10px] cursor-pointer inline-block active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Encaisser
                            </button>
                            {fac.status === 'En attente' && (
                              <button
                                onClick={() => updateInvoiceStatus(fac.id, 'En retard')}
                                disabled={sendingReminderId !== null}
                                className="bg-red-100 hover:bg-red-200 text-red-700 font-extrabold px-2.5 py-1.5 rounded-xl text-[10px] cursor-pointer inline-block active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Déclarer en retard
                              </button>
                            )}
                            {(fac.status === 'En attente' || fac.status === 'En retard') && (
                              <button
                                onClick={() => handleRelance(fac)}
                                disabled={sendingReminderId !== null}
                                className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-extrabold px-2.5 py-1.5 rounded-xl text-[10px] cursor-pointer inline-flex items-center gap-1 active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {sendingReminderId === fac.id ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-amber-800 border-t-transparent rounded-full animate-spin mr-1" />
                                    Relance...
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle size={10} /> Relancer
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filteredFactures.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-400 font-light">
                      Aucune écriture comptable ne correspond aux critères.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Local PDF Generator Modal Fallback */}
      {localPdfFacture && (
        <PdfGenerator 
          documentType="facture"
          data={localPdfFacture}
          onClose={() => setLocalPdfFacture(null)}
          onStatusChange={(id, newStatus) => {
            activeSetFactures(prev => prev.map(f => f.id === id ? { ...f, status: newStatus as any } : f));
            setLocalPdfFacture(prev => prev ? { ...prev, status: newStatus as any } : null);
          }}
        />
      )}
    </div>
  );
}
