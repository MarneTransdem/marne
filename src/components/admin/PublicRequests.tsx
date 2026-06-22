import React, { useState, useEffect, useMemo } from 'react';
import { 
  FolderOpen, Search, ArrowRight, User, Phone, Mail, MapPin, 
  Calendar, CheckCircle, RefreshCw, Layers, Sliders, Play, Plus, Clock, Eye,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { buildDossierIdFromReference } from '../../lib/dossier-id';

interface PublicRequest {
  id: string;
  dossierId?: string;
  fullName: string;
  phone: string;
  email: string;
  fromAddress: string;
  fromCity: string;
  fromZip: string;
  fromFloor?: string;
  fromElevator?: string;
  fromDifficulties?: string;
  toAddress: string;
  toCity: string;
  toZip: string;
  toFloor?: string;
  toElevator?: string;
  toDifficulties?: string;
  date: string;
  housingType: string;
  surface: string;
  volume: string | number;
  formula: string;
  visitPreference?: 'domicile' | 'visio' | 'a_definir' | string;
  needsLift?: string;
  needsPacking?: string;
  needsStorage?: string;
  message?: string;
  createdAt: any;
  status?: 'Nouveau' | 'Visite_planifiée' | 'Étudié_Converti' | 'Archivé';
  plannedVisitId?: string;
  convertedDevisId?: string;
}

interface PublicRequestsProps {
  onConvertToDevis: (devis: any) => void | Promise<void>;
  onPlanVisit: (visit: any) => void | Promise<void>;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
type PageSize = typeof PAGE_SIZE_OPTIONS[number];
type StatusFilter = 'all' | 'Nouveau' | 'Visite_planifiée' | 'Étudié_Converti' | 'Archivé';
type VisitFilter = 'all' | 'domicile' | 'visio' | 'a_definir';
type FormulaFilter = 'all' | 'Économique' | 'Standard' | 'Luxe';
type ServiceFilter = 'all' | 'lift' | 'packing' | 'storage';

const safeLower = (value: unknown) => String(value ?? '').toLowerCase();

const normalizeFormula = (value: unknown): FormulaFilter => {
  const formula = safeLower(value);
  if (formula.includes('luxe') || formula.includes('clé') || formula.includes('cle')) return 'Luxe';
  if (formula.includes('éco') || formula.includes('eco') || formula.includes('chargement')) return 'Économique';
  return 'Standard';
};

const getStatusLabel = (status?: PublicRequest['status']) => {
  if (status === 'Étudié_Converti') return 'Devis brouillon';
  if (status === 'Visite_planifiée') return 'Visite planifiée';
  if (status === 'Archivé') return 'Archivé';
  return 'À étudier';
};

export const PublicRequests: React.FC<PublicRequestsProps> = ({ onConvertToDevis, onPlanVisit }) => {
  const [requests, setRequests] = useState<PublicRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [visitFilter, setVisitFilter] = useState<VisitFilter>('all');
  const [formulaFilter, setFormulaFilter] = useState<FormulaFilter>('all');
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('all');
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<PublicRequest | null>(null);
  
  // Pricing/Chiffrage state
  const [pricingVolume, setPricingVolume] = useState<number>(30);
  const [pricingFormula, setPricingFormula] = useState<'Standard' | 'Économique' | 'Luxe'>('Standard');
  const [pricingPrice, setPricingPrice] = useState<number>(1500);
  const [pricingDate, setPricingDate] = useState<string>('');
  const [isConverting, setIsConverting] = useState(false);
  const [visitMode, setVisitMode] = useState<'domicile' | 'visio' | 'a_definir'>('a_definir');
  const [visitDate, setVisitDate] = useState<string>('');
  const [visitTime, setVisitTime] = useState<string>('10:00');
  const [visitCommercial, setVisitCommercial] = useState<string>('Jean-Marc Tardieu');
  const [isPlanningVisit, setIsPlanningVisit] = useState(false);
  
  const sortRequests = (list: PublicRequest[]) => {
    return [...list].sort((a, b) => {
      const tA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : new Date(a.createdAt || 0).getTime();
      const tB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : new Date(b.createdAt || 0).getTime();
      return tB - tA;
    });
  };

  const fetchRequests = () => {
    setLoading(true);
    return onSnapshot(
      collection(db, 'quotes'),
      (qSnap) => {
        const list = qSnap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            status: data.status || 'Nouveau'
          } as PublicRequest;
        });

        setRequests(sortRequests(list));
        setLoading(false);
      },
      (e) => {
        console.error("Failed to load quotes from Firestore:", e);
        setRequests([]);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const unsubscribe = fetchRequests();
    return () => unsubscribe();
  }, []);

  // Pre-populate Pricing Calculator when a request is selected
  useEffect(() => {
    if (selectedRequest) {
      const volNum = Number(selectedRequest.volume) || 20;
      setPricingVolume(volNum);
      
      const form = selectedRequest.formula === 'Luxe' || selectedRequest.formula === 'Clé en main' ? 'Luxe' 
                   : selectedRequest.formula === 'Économique' || selectedRequest.formula === 'Chargement' ? 'Économique' 
                   : 'Standard';
      setPricingFormula(form);
      setPricingDate(selectedRequest.date || '');
      setVisitMode(
        selectedRequest.visitPreference === 'domicile' || selectedRequest.visitPreference === 'visio'
          ? selectedRequest.visitPreference
          : 'a_definir'
      );
      setVisitDate('');
      setVisitTime('10:00');
      
      // Smart estimated price base (e.g. 50€/m3 and formula/lift multipliers)
      let priceBase = volNum * 55;
      if (form === 'Luxe') priceBase *= 1.4;
      if (form === 'Économique') priceBase *= 0.85;
      if (selectedRequest.needsLift === 'oui') priceBase += 300;
      if (selectedRequest.needsStorage === 'oui') priceBase += 200;
      
      setPricingPrice(Math.round(priceBase));
    }
  }, [selectedRequest]);

  // Recalculate price live with parameters modifications
  useEffect(() => {
    if (selectedRequest) {
      let base = pricingVolume * 55;
      if (pricingFormula === 'Luxe') base *= 1.4;
      if (pricingFormula === 'Économique') base *= 0.85;
      if (selectedRequest.needsLift === 'oui') base += 300;
      if (selectedRequest.needsStorage === 'oui') base += 200;
      setPricingPrice(Math.round(base));
    }
  }, [pricingVolume, pricingFormula]);

  const handleStudy = (req: PublicRequest) => {
    setSelectedRequest(req);
  };

  const handlePlanVisit = async () => {
    if (!selectedRequest) return;
    if (!visitDate) {
      alert('Veuillez choisir une date de visite.');
      return;
    }

    setIsPlanningVisit(true);
    try {
      const visitId = `VIS-WEB-${Math.floor(100 + Math.random() * 900)}`;
      const dossierId = selectedRequest.dossierId || buildDossierIdFromReference('REQ', selectedRequest.id);
      const visit = {
        id: visitId,
        dossierId,
        clientName: selectedRequest.fullName,
        address: visitMode === 'visio'
          ? `Visio - ${selectedRequest.email}`
          : [selectedRequest.fromAddress, selectedRequest.fromCity, selectedRequest.fromZip].filter(Boolean).join(', '),
        phone: selectedRequest.phone,
        date: visitDate,
        time: visitTime || '10:00',
        volumeEstimated: Number(selectedRequest.volume) || undefined,
        commercialAssigned: visitCommercial,
        visitMode,
        sourceRequestId: selectedRequest.id,
        status: 'Planifiée'
      };

      await onPlanVisit(visit);
      await updateDoc(doc(db, 'quotes', selectedRequest.id), {
        dossierId,
        status: 'Visite_planifiée',
        plannedVisitId: visitId,
        plannedVisitAt: new Date().toISOString()
      });

      setRequests(prev => prev.map(r => r.id === selectedRequest.id ? {
        ...r,
        dossierId,
        status: 'Visite_planifiée',
        plannedVisitId: visitId
      } : r));
      setSelectedRequest(prev => prev ? { ...prev, dossierId, status: 'Visite_planifiée', plannedVisitId: visitId } : prev);
    } catch (e) {
      console.error(e);
      alert('Erreur lors de la planification de la visite.');
    } finally {
      setIsPlanningVisit(false);
    }
  };

  const handleConvert = async () => {
    if (!selectedRequest) return;
    setIsConverting(true);
    
    try {
      const devisId = `DEV-2026-WEB-${Math.floor(100 + Math.random() * 900)}`;
      const dossierId = selectedRequest.dossierId || buildDossierIdFromReference('REQ', selectedRequest.id);
      const newDevis = {
        id: devisId,
        dossierId,
        clientName: selectedRequest.fullName,
        phone: selectedRequest.phone,
        email: selectedRequest.email,
        fromCity: `${selectedRequest.fromCity} (${selectedRequest.fromZip})`,
        toCity: `${selectedRequest.toCity} (${selectedRequest.toZip})`,
        fromAddress: selectedRequest.fromAddress,
        toAddress: selectedRequest.toAddress,
        volume: pricingVolume,
        formula: pricingFormula,
        price: pricingPrice,
        date: pricingDate || new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        status: 'Brouillon',
        sourceRequestId: selectedRequest.id
      };

      // Call parent dashboard hook to populate local active devis registrations
      await onConvertToDevis(newDevis);
      await updateDoc(doc(db, 'quotes', selectedRequest.id), {
        dossierId,
        status: 'Étudié_Converti',
        convertedDevisId: devisId,
        convertedAt: new Date().toISOString()
      });

      // Local persistence states update to reflect Traited/Converti
      
      // Refresh requests list
      setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, dossierId, status: 'Étudié_Converti' } : r));
      setSelectedRequest(null);
    } catch (e) {
      console.error(e);
      alert("Erreur lors de la conversion du devis.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette demande du site public ?")) return;
    try {
      await deleteDoc(doc(db, 'quotes', id));
      setRequests(prev => prev.filter(r => r.id !== id));
      if (selectedRequest?.id === id) {
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, visitFilter, formulaFilter, serviceFilter, pageSize]);

  const filtered = useMemo(() => {
    const query = safeLower(search.trim());

    return requests.filter((r) => {
      const currentStatus = r.status || 'Nouveau';
      const currentVisit = r.visitPreference === 'domicile' || r.visitPreference === 'visio'
        ? r.visitPreference
        : 'a_definir';
      const currentFormula = normalizeFormula(r.formula);
      const serviceValue =
        serviceFilter === 'lift' ? r.needsLift :
        serviceFilter === 'packing' ? r.needsPacking :
        serviceFilter === 'storage' ? r.needsStorage :
        undefined;

      const matchesSearch = !query || [
        r.fullName,
        r.email,
        r.phone,
        r.fromCity,
        r.fromZip,
        r.toCity,
        r.toZip,
        r.formula,
        r.housingType
      ].some((value) => safeLower(value).includes(query));

      const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;
      const matchesVisit = visitFilter === 'all' || currentVisit === visitFilter;
      const matchesFormula = formulaFilter === 'all' || currentFormula === formulaFilter;
      const matchesService = serviceFilter === 'all' || safeLower(serviceValue) === 'oui';

      return matchesSearch && matchesStatus && matchesVisit && matchesFormula && matchesService;
    });
  }, [requests, search, statusFilter, visitFilter, formulaFilter, serviceFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRequests = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSize, safeCurrentPage]);
  const resultStart = filtered.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const resultEnd = Math.min(filtered.length, safeCurrentPage * pageSize);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-6">
      <div className="bg-white/90 dark:bg-slate-900/90 p-4 border border-slate-200/75 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-slate-400 tracking-wider">MARNE TRANSDEM INTERACTION PUBLIC-CRM</p>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Demandes Entrantes du Site Web</h2>
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                {requests.filter(r => r.status === 'Nouveau' || !r.status).length} Nouvelles
              </span>
              <span className="bg-slate-100 text-slate-600 dark:bg-slate-950 dark:text-slate-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Client, ville, téléphone..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-xs bg-white dark:bg-slate-950 rounded-full border border-slate-200/80 dark:border-slate-800 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 shadow-sm"
              />
            </div>
            <button 
              type="button" 
              onClick={() => setRequests(prev => sortRequests(prev))} 
              disabled={loading}
              className="p-2 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-xl transition cursor-pointer shadow-sm"
              title="Rafraîchir"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
          >
            <option value="all">Tous les statuts</option>
            <option value="Nouveau">À étudier</option>
            <option value="Visite_planifiée">Visite planifiée</option>
            <option value="Étudié_Converti">Devis brouillon</option>
            <option value="Archivé">Archivé</option>
          </select>

          <select
            value={visitFilter}
            onChange={(event) => setVisitFilter(event.target.value as VisitFilter)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
          >
            <option value="all">Toutes les visites</option>
            <option value="domicile">Visite domicile</option>
            <option value="visio">Visite visio</option>
            <option value="a_definir">À définir</option>
          </select>

          <select
            value={formulaFilter}
            onChange={(event) => setFormulaFilter(event.target.value as FormulaFilter)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
          >
            <option value="all">Toutes les formules</option>
            <option value="Économique">Économique</option>
            <option value="Standard">Standard</option>
            <option value="Luxe">Luxe</option>
          </select>

          <select
            value={serviceFilter}
            onChange={(event) => setServiceFilter(event.target.value as ServiceFilter)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
          >
            <option value="all">Tous les services</option>
            <option value="lift">Monte-meuble</option>
            <option value="packing">Emballage pro</option>
            <option value="storage">Garde-meuble</option>
          </select>

          <select
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value) as PageSize)}
            className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-100 focus:outline-none focus:border-accent"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option} par page</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
          <p className="text-[11px] font-bold text-slate-500">
            Affichage {resultStart}-{resultEnd} sur {filtered.length} demande{filtered.length > 1 ? 's' : ''}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setStatusFilter('all');
              setVisitFilter('all');
              setFormulaFilter('all');
              setServiceFilter('all');
              setPageSize(10);
            }}
            className="self-start sm:self-auto text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-brand-900 dark:hover:text-white"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Requests List */}
        <div className={`space-y-4 ${selectedRequest ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            {loading && requests.length === 0 ? (
              <div className="py-20 text-center text-xs text-slate-400 font-medium">
                <RefreshCw size={24} className="mx-auto animate-spin mb-3 text-accent" />
                Chargement des requêtes clientes...
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center text-xs text-slate-500 italic">
                Aucune demande client trouvée ou table vide.
              </div>
            ) : (
              <>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginatedRequests.map((req) => (
                  <div 
                    key={req.id} 
                    className={`p-5 transition hover:bg-slate-50/60 dark:hover:bg-slate-950/40 cursor-pointer ${selectedRequest?.id === req.id ? 'bg-accent/5 dark:bg-slate-800/40 border-l-4 border-accent' : ''}`}
                    onClick={() => handleStudy(req)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">{req.fullName}</h4>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Clock size={10} /> Recu le {req.createdAt?.seconds ? new Date(req.createdAt.seconds * 1000).toLocaleDateString('fr-FR') : 'Date récente'}
                        </p>
                      </div>
                      <span className={`px-2.5 py-0.5 text-[9px] font-extrabold rounded-lg ${
                        req.status === 'Étudié_Converti'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                          : req.status === 'Visite_planifiée'
                            ? 'bg-sky-100 text-sky-900 dark:bg-sky-950/30 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}>
                        {getStatusLabel(req.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate">{req.fromCity} ➔ {req.toCity}</span>
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{req.volume} m³</span>
                        <span className="text-slate-400 mx-1">•</span>
                        <span className="italic">{req.housingType} ({req.surface}m²)</span>
                      </div>
                      <div className="text-right sm:text-left">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[9px] font-black uppercase text-brand-900 dark:text-accent">
                          {req.formula}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] border-t border-dashed border-slate-150 dark:border-slate-800/60 pt-2.5">
                      <span className="text-slate-400 italic">
                        {req.visitPreference === 'domicile'
                          ? 'Visite souhaitée : domicile'
                          : req.visitPreference === 'visio'
                            ? 'Visite souhaitée : visio'
                            : `Formule d'origine: ${req.formula}`}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleStudy(req); }}
                          className="px-3 py-1 bg-brand-900 text-white dark:bg-accent dark:text-brand-950 rounded-lg font-black text-[10px] hover:opacity-90 active:scale-95 cursor-pointer"
                        >
                          Etudier & Chiffrer
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteRequest(req.id); }}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition active:scale-95 cursor-pointer"
                          title="Supprimer la demande public"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-bold text-slate-500">
                    Page {safeCurrentPage} / {totalPages} · {pageSize} demandes par page
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={safeCurrentPage <= 1}
                      className="inline-flex items-center gap-1 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={13} />
                      Précédent
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      disabled={safeCurrentPage >= totalPages}
                      className="inline-flex items-center gap-1 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 px-3 py-2 text-[10px] font-black uppercase text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Suivant
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Detailed analysis and direct pricing tool */}
        {selectedRequest && (
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium space-y-6 animate-fade-in relative">
              <button 
                onClick={() => setSelectedRequest(null)} 
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 text-xs font-bold"
              >
                Fermer [X]
              </button>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                  Fiche de Logistique Publique
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-2">
                  Étude Technique de : {selectedRequest.fullName}
                </h3>
              </div>

              {/* Informative details */}
              <div className="space-y-4 text-xs">
                {/* Contact grid */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-secondary" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedRequest.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-secondary" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{selectedRequest.email}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-sky-50/70 dark:bg-sky-950/20 rounded-2xl border border-sky-100 dark:border-sky-900/40 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] uppercase font-black tracking-wider text-sky-700 dark:text-sky-300">Visite commerciale</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {selectedRequest.plannedVisitId ? `Planifiée : ${selectedRequest.plannedVisitId}` : 'À programmer depuis la demande'}
                      </p>
                    </div>
                    <Calendar size={16} className="text-sky-700 dark:text-sky-300" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={visitMode}
                      onChange={e => setVisitMode(e.target.value as any)}
                      className="bg-white dark:bg-slate-950 p-2 border border-sky-100 dark:border-sky-900/40 rounded-lg text-slate-800 dark:text-slate-100"
                    >
                      <option value="a_definir">À définir</option>
                      <option value="domicile">À domicile</option>
                      <option value="visio">En visio</option>
                    </select>
                    <select
                      value={visitCommercial}
                      onChange={e => setVisitCommercial(e.target.value)}
                      className="bg-white dark:bg-slate-950 p-2 border border-sky-100 dark:border-sky-900/40 rounded-lg text-slate-800 dark:text-slate-100"
                    >
                      <option value="Jean-Marc Tardieu">Jean-Marc Tardieu</option>
                      <option value="Michel Blanc-Sec">Michel Blanc-Sec</option>
                    </select>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={e => setVisitDate(e.target.value)}
                      className="bg-white dark:bg-slate-950 p-2 border border-sky-100 dark:border-sky-900/40 rounded-lg text-slate-800 dark:text-slate-100"
                    />
                    <input
                      type="time"
                      value={visitTime}
                      onChange={e => setVisitTime(e.target.value)}
                      className="bg-white dark:bg-slate-950 p-2 border border-sky-100 dark:border-sky-900/40 rounded-lg text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handlePlanVisit}
                    disabled={isPlanningVisit}
                    className="w-full bg-sky-700 hover:bg-sky-800 text-white font-black py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-55"
                  >
                    <Calendar size={14} /> Planifier la visite
                  </button>
                </div>

                {/* Logistics */}
                <div className="space-y-3.5">
                  <h4 className="font-black text-[11px] uppercase tracking-wider text-slate-400">⚡ Adresses et Configuration de Terrain</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Departure block */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-100 dark:border-slate-850/60">
                      <p className="text-[10px] font-black text-slate-400 uppercase">🚩 Départ (Chargement)</p>
                      <p className="font-extrabold mt-1 text-slate-950 dark:text-white">{selectedRequest.fromCity} ({selectedRequest.fromZip})</p>
                      <p className="text-slate-500 font-light text-[10px] mt-0.5">{selectedRequest.fromAddress}</p>
                      
                      <div className="mt-2.5 space-y-1 text-[10px] text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-205 dark:border-slate-800/40">
                        <p>Étage : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.fromFloor || 'RDC'}</strong></p>
                        <p>Ascenseur : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.fromElevator === 'oui' ? 'Oui ✔' : 'Non ✗'}</strong></p>
                        {selectedRequest.fromDifficulties && (
                          <p className="text-amber-600 dark:text-amber-400 font-medium">Contrainte : {selectedRequest.fromDifficulties}</p>
                        )}
                      </div>
                    </div>

                    {/* Arrival block */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-2xl border border-slate-100 dark:border-slate-850/60">
                      <p className="text-[10px] font-black text-slate-400 uppercase">🏁 Arrivée (Livraison)</p>
                      <p className="font-extrabold mt-1 text-slate-950 dark:text-white">{selectedRequest.toCity} ({selectedRequest.toZip})</p>
                      <p className="text-slate-500 font-light text-[10px] mt-0.5">{selectedRequest.toAddress}</p>
                      
                      <div className="mt-2.5 space-y-1 text-[10px] text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-205 dark:border-slate-800/40">
                        <p>Étage : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.toFloor || 'RDC'}</strong></p>
                        <p>Ascenseur : <strong className="font-bold text-slate-800 dark:text-slate-200">{selectedRequest.toElevator === 'oui' ? 'Oui ✔' : 'Non ✗'}</strong></p>
                        {selectedRequest.toDifficulties && (
                          <p className="text-amber-600 dark:text-amber-400 font-medium">Contrainte : {selectedRequest.toDifficulties}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional services and specs */}
                <div className="p-3.5 bg-brand-900/5 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-800/60 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Monte-Meuble</span>
                    <strong className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 font-black leading-none ${selectedRequest.needsLift === 'oui' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      {selectedRequest.needsLift === 'oui' ? 'Oui ☑' : 'Non'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Emballage pro</span>
                    <strong className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 font-black leading-none ${selectedRequest.needsPacking === 'oui' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      {selectedRequest.needsPacking === 'oui' ? 'Oui ☑' : 'Non'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Garde-Meuble</span>
                    <strong className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 font-black leading-none ${selectedRequest.needsStorage === 'oui' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                      {selectedRequest.needsStorage === 'oui' ? 'Oui ☑' : 'Non'}
                    </strong>
                  </div>
                </div>

                {selectedRequest.message && (
                  <div className="p-3 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200/20 rounded-xl">
                    <p className="text-[9px] uppercase font-black text-indigo-400 mb-1">✍ Message optionnel inscrit par le client:</p>
                    <p className="text-slate-700 dark:text-slate-300 italic">"{selectedRequest.message}"</p>
                  </div>
                )}
              </div>

              {/* Direct Simulator/Pricing & Conversion */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 space-y-4">
                <div className="flex items-center gap-1.5 mb-1 bg-yellow-50 dark:bg-yellow-950/20 px-3 py-1.5 rounded-lg border border-yellow-250/20">
                  <Sliders size={13} className="text-amber-500 shrink-0" />
                  <p className="text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase">CALCULATEUR PROFESSIONNEL DE TARIFICATION MARNE TRANSDEM</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-extrabold mb-1">Volume technique final (m³)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="range"
                        min="5" 
                        max="100" 
                        value={pricingVolume} 
                        onChange={e => setPricingVolume(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="font-black text-brand-900 dark:text-accent w-10 text-right">{pricingVolume}m³</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-extrabold mb-1">Nouveau tarif calculé (€)</label>
                    <input 
                      type="number" 
                      value={pricingPrice} 
                      onChange={e => setPricingPrice(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-accent font-extrabold text-brand-900 dark:text-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold mb-1">Formule Commerciale retenue</label>
                    <select 
                      value={pricingFormula} 
                      onChange={e => setPricingFormula(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
                    >
                      <option value="Économique">Économique (Formule Budget)</option>
                      <option value="Standard">Standard (Formule Intermédiaire)</option>
                      <option value="Luxe">Luxe (Formule Clé en main)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-extrabold mb-1">Date finale de déménagement</label>
                    <input 
                      type="date" 
                      value={pricingDate} 
                      onChange={e => setPricingDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConvert}
                    disabled={isConverting}
                    className="w-full bg-accent hover:bg-accent-hover text-brand-900 font-black py-3 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-55"
                  >
                    <Plus size={16} /> Générer le Devis Client Brouillon
                  </button>
                  <p className="text-[10px] text-center text-slate-500 italic mt-1.5">
                    L'estimation sera instantanément transférée au registre central des devis sous forme de Brouillon prêt à tarifer/envoyer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
