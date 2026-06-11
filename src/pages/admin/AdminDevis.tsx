import React, { useState, useMemo } from 'react';
import { useSyncedCollection } from '../../hooks/useData';
import { Devis, Facture, Demenagement } from '../../types';
import { AdminPublicRequest } from '../../lib/admin-dossiers';
import { Plus, Edit, Trash2, FileText, Check, X, MoveRight, Printer, Copy, Search, Calendar, AlertTriangle } from 'lucide-react';
import { PdfGenerator } from '../../components/admin/PdfGenerator';

const COLUMNS = ['Brouillon', 'Envoyé', 'En attente', 'Signé', 'Refusé'] as const;
type DevisStatus = typeof COLUMNS[number];

export function AdminDevis() {
  const [devisList, setDevisList] = useSyncedCollection<Devis>('devis');
  const [factures, setFactures] = useSyncedCollection<Facture>('factures');
  const [demenagements, setDemenagements] = useSyncedCollection<Demenagement>('demenagements');
  const [publicRequests, setPublicRequests] = useSyncedCollection<AdminPublicRequest>('quotes');

  const [filterQuery, setFilterQuery] = useState('');
  const [showAddDevis, setShowAddDevis] = useState(false);
  const [editingDevisId, setEditingDevisId] = useState<string | null>(null);
  const [selectedPdfQuote, setSelectedPdfQuote] = useState<Devis | null>(null);
  const [newDevis, setNewDevis] = useState<Partial<Devis>>({
    clientName: '', phone: '', email: '', fromCity: '', toCity: '', fromAddress: '', toAddress: '', volume: 20, formula: 'Standard', price: 1200, status: 'Brouillon',
    fromFloor: '2', toFloor: '0 (RDC)', fromElevator: 'Oui', toElevator: 'Non', fromLift: 'Oui', toLift: 'Non', fromPortage: '-20m', toPortage: '-', distance: '', voyageType: undefined
  });

  const resetForm = () => {
    setNewDevis({ clientName: '', phone: '', email: '', fromCity: '', toCity: '', fromAddress: '', toAddress: '', volume: 20, formula: 'Standard', price: 1200, status: 'Brouillon',
      fromFloor: '2', toFloor: '0 (RDC)', fromElevator: 'Oui', toElevator: 'Non', fromLift: 'Oui', toLift: 'Non', fromPortage: '-20m', toPortage: '-', distance: '', voyageType: undefined });
    setEditingDevisId(null);
  };

  const createAcceptedQuoteArtifacts = (quote: Devis) => {
    if (!factures.some((invoice) => invoice.devisId === quote.id)) {
      const id = `FAC-2026-00${factures.length + 1}`;
      const invoice: Facture = {
        id, devisId: quote.id, clientName: quote.clientName, amount: quote.price,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
        status: 'En attente'
      };
      setFactures(prev => [invoice, ...prev]);
    }
    if (!demenagements.some((move) => move.devisId === quote.id)) {
      const moveId = `DEM-00${demenagements.length + 1}`;
      const newMove: Demenagement = {
        id: moveId, clientName: quote.clientName, devisId: quote.id, volume: quote.volume,
        fromCity: quote.fromCity, toCity: quote.toCity, date: quote.date || new Date().toISOString().split('T')[0],
        teamLeader: 'Hervé Le Gall', status: 'À planifier', crewSize: 3
      };
      setDemenagements(prev => [newMove, ...prev]);
    }
  };

  const saveQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingDevisId || `DEV-2026-00${devisList.length + 1}`;
    const createdAt = newDevis.createdAt || new Date().toISOString().split('T')[0];
    const defaultExpires = new Date(new Date(createdAt).getTime() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0];

    const item: Devis = {
      ...newDevis,
      id,
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
         status: 'Étudié_Converti',
         convertedDevisId: item.id
       } : req));
    }

    setShowAddDevis(false);
    resetForm();
  };

  const duplicateQuote = (quote: Devis) => {
    const duplicated: Partial<Devis> = {
      ...quote,
      id: undefined, // Let saveQuote generate new ID
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
    const parts = dateStr.split('-');
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

  // Filter quotes dynamically
  const filteredDevisList = useMemo(() => {
    if (!filterQuery) return devisList;
    const query = filterQuery.toLowerCase();
    return devisList.filter(quote => 
      quote.clientName.toLowerCase().includes(query) ||
      quote.id.toLowerCase().includes(query) ||
      quote.fromCity.toLowerCase().includes(query) ||
      quote.toCity.toLowerCase().includes(query) ||
      quote.formula.toLowerCase().includes(query) ||
      (quote.email && quote.email.toLowerCase().includes(query))
    );
  }, [devisList, filterQuery]);

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

        <button
          onClick={() => { resetForm(); setShowAddDevis(true); }}
          className="bg-accent hover:bg-accent-hover text-brand-900 border border-accent font-black py-2.5 px-5 rounded-2xl text-xs transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Rédiger un Devis
        </button>
      </div>

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
          const columnQuotes = filteredDevisList.filter(q => q.status === column);
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

                      {/* Expiration date/badge */}
                      {quote.expiresAt && (
                        <div className="flex items-center justify-between gap-2 mb-3 pt-2 border-t border-dashed border-slate-100 dark:border-slate-900">
                          <span className="text-[9px] text-slate-400 flex items-center gap-1">
                            <Calendar size={10} /> Exp: {formatDateFr(quote.expiresAt)}
                          </span>
                          {expirationBadge}
                        </div>
                      )}
                      
                      {/* Footer & Actions */}
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-900">
                        <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold shrink-0 ${getFormulaStyle(quote.formula)}`}>
                          {quote.volume} m³ • {quote.formula}
                        </span>
                        
                        <div className="flex gap-1">
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
