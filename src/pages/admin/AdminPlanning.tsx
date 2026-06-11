import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSyncedCollection } from '../../hooks/useData';
import { Demenagement, UserProfile, Role, FieldMover, FieldTruck } from '../../types';
import { 
  Plus, ArrowRight, Check, Calendar, List, Columns, 
  UserCheck, Truck, Users, Clock, FileText, X, AlertCircle 
} from 'lucide-react';
import { DocumentTemplates } from '../../components/admin/DocumentTemplates';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

interface AdminPlanningProps {
  demenagements?: Demenagement[];
  setDemenagements?: React.Dispatch<React.SetStateAction<Demenagement[]>>;
  collaborateurs?: UserProfile[];
  setSelectedMoveDoc?: (move: any | null) => void;
  role?: Role | null;
  searchQuery?: string;
}

const SEED_DEMENAGEMENTS: Demenagement[] = [
  { id: 'DEM-001', clientName: 'Sophie Marceau', devisId: 'DEV-2026-002', volume: 18, fromCity: 'Nanterre (92)', toCity: 'Lyon (69)', date: '2026-07-10', teamLeader: 'Hervé Le Gall', status: 'Programmé', crewSize: 2, assignedMovers: ['Pascal Porteur'], assignedTruck: 'CC-456-DD' },
  { id: 'DEM-002', clientName: 'Gérard Depardieu', devisId: 'DEV-2026-001', volume: 45, fromCity: 'Paris (75)', toCity: 'Bordeaux (33)', date: '2026-06-24', teamLeader: 'Ahmed Bensalah', status: 'Programmé', crewSize: 4, assignedMovers: ['Dominique Chauffard', 'Érik Solide'], assignedTruck: 'AA-123-BB' }
];

const SEED_MOVERS: FieldMover[] = [
  { id: 'MVR-001', name: 'Dominique Chauffard', phone: '06 11 22 33 44', role: 'Chauffeur PL', status: 'Disponible' },
  { id: 'MVR-002', name: 'Pascal Porteur', phone: '06 22 33 44 55', role: 'Déménageur Porteur', status: 'Disponible' },
  { id: 'MVR-003', name: 'Lucien Volant', phone: '06 33 44 55 66', role: 'Chauffeur VL', status: 'Disponible' },
  { id: 'MVR-004', name: 'Érik Solide', phone: '06 44 55 66 77', role: 'Aide-déménageur', status: 'Disponible' },
  { id: 'MVR-005', name: 'Marc Bagarre', phone: '06 55 66 77 88', role: 'Déménageur Porteur', status: 'Disponible' }
];

const SEED_TRUCKS: FieldTruck[] = [
  { id: 'TRK-01', plateNumber: 'AA-123-BB', type: 'Poids Lourd 44m³', capacity: 44, status: 'Disponible' },
  { id: 'TRK-02', plateNumber: 'CC-456-DD', type: 'Fourgon VL 20m³', capacity: 20, status: 'Disponible' },
  { id: 'TRK-03', plateNumber: 'EE-789-FF', type: 'Camionnette 12m³', capacity: 12, status: 'Disponible' }
];

const SEED_COLLABORATEURS: UserProfile[] = [
  { uid: 'u1', email: 'contact@marnetransdem.com', role: 'gérant', name: 'Alain Delon (Gérant)', status: 'Actif' },
  { uid: 'u2', email: 'secretaire@marnetransdem.com', role: 'secrétaire', name: 'Corinne Masson', status: 'Actif' },
  { uid: 'u3', email: 'commercial@marnetransdem.com', role: 'commercial', name: 'Jean-Marc Tardieu', status: 'Actif' },
  { uid: 'u4', email: 'chef@marnetransdem.com', role: 'chef_equipe', name: 'Hervé Le Gall (Chef Équipe 1)', status: 'Actif' },
  { uid: 'u5', email: 'ahmed@marnetransdem.com', role: 'chef_equipe', name: 'Ahmed Bensalah (Chef Équipe 2)', status: 'Actif' }
];

export function AdminPlanning({
  demenagements,
  setDemenagements,
  collaborateurs,
  setSelectedMoveDoc,
  role,
  searchQuery
}: AdminPlanningProps) {
  const context = useOutletContext<AdminOutletContextType>();
  const activeSearchQuery = searchQuery || context?.searchQuery || '';

  const { role: authRole } = useAuth();
  const activeRole = role || authRole;

  // Synced states fallback
  const [syncedMoves, setSyncedMoves] = useSyncedCollection<Demenagement>('demenagements', SEED_DEMENAGEMENTS);
  const [syncedCollabs] = useSyncedCollection<UserProfile>('collaborateurs', SEED_COLLABORATEURS);
  const [movers] = useSyncedCollection<FieldMover>('movers', SEED_MOVERS);
  const [trucks] = useSyncedCollection<FieldTruck>('trucks', SEED_TRUCKS);

  const activeMoves = demenagements || syncedMoves;
  const activeSetMoves = setDemenagements || setSyncedMoves;
  const activeCollabs = collaborateurs || syncedCollabs;

  const [showAddDemenagement, setShowAddDemenagement] = useState(false);
  const [localMoveDoc, setLocalMoveDoc] = useState<Demenagement | null>(null);

  // Planning View mode
  const [viewMode, setViewMode] = useState<'list' | 'gantt'>('list');

  // Inline assignment state
  const [activeAssignMoveId, setActiveAssignMoveId] = useState<string | null>(null);
  const [tempMovers, setTempMovers] = useState<string[]>([]);
  const [tempTruck, setTempTruck] = useState<string>('');

  const [newDemenagement, setNewDemenagement] = useState<Partial<Demenagement>>({
    clientName: '', 
    devisId: '', 
    volume: 25, 
    fromCity: '', 
    toCity: '', 
    date: '', 
    teamLeader: 'Hervé Le Gall', 
    status: 'À planifier', 
    crewSize: 3
  });

  const createPlanningMove = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `DEM-00${activeMoves.length + 1}`;
    const item: Demenagement = {
      id,
      clientName: newDemenagement.clientName || 'Client Déménagement',
      devisId: newDemenagement.devisId || 'SANS-DEVIS',
      volume: Number(newDemenagement.volume) || 20,
      fromCity: newDemenagement.fromCity || 'Mantes',
      toCity: newDemenagement.toCity || 'Versailles',
      date: newDemenagement.date || new Date().toISOString().split('T')[0],
      teamLeader: newDemenagement.teamLeader || 'Hervé Le Gall',
      status: (newDemenagement.status || 'À planifier') as any,
      crewSize: Number(newDemenagement.crewSize) || 2,
      assignedMovers: [],
      assignedTruck: ''
    };

    activeSetMoves(prev => [item, ...prev]);
    setShowAddDemenagement(false);
    setNewDemenagement({ 
      clientName: '', devisId: '', volume: 20, fromCity: '', toCity: '', date: '', teamLeader: 'Hervé Le Gall', status: 'À planifier', crewSize: 3 
    });
  };

  const updateMoveStatus = (id: string, newStatus: Demenagement['status']) => {
    activeSetMoves(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleDocumentClick = (move: Demenagement) => {
    if (setSelectedMoveDoc) {
      setSelectedMoveDoc(move);
    } else {
      setLocalMoveDoc(move);
    }
  };

  const openAssignmentPanel = (move: Demenagement) => {
    setActiveAssignMoveId(move.id);
    setTempMovers(move.assignedMovers || []);
    setTempTruck(move.assignedTruck || '');
  };

  const toggleTempMover = (moverName: string) => {
    setTempMovers(prev => 
      prev.includes(moverName) 
        ? prev.filter(n => n !== moverName) 
        : [...prev, moverName]
    );
  };

  const handleSaveAssignment = (moveId: string) => {
    activeSetMoves(prev => prev.map(d => {
      if (d.id === moveId) {
        return {
          ...d,
          assignedMovers: tempMovers,
          assignedTruck: tempTruck,
          status: d.status === 'À planifier' ? 'Programmé' : d.status
        };
      }
      return d;
    }));
    setActiveAssignMoveId(null);
  };

  const getFilteredDemenagements = (): Demenagement[] => {
    if (!activeSearchQuery) return activeMoves;
    const query = activeSearchQuery.toLowerCase();
    return activeMoves.filter(item => 
      item.clientName.toLowerCase().includes(query) || 
      item.id.toLowerCase().includes(query) ||
      item.fromCity.toLowerCase().includes(query) ||
      item.toCity.toLowerCase().includes(query)
    );
  };

  const getCountdown = (dateStr: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const target = new Date(dateStr);
    target.setHours(0,0,0,0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return { text: "Aujourd'hui", color: "text-red-600 bg-red-100 dark:bg-red-950/30 px-2 py-0.5 rounded-md font-black animate-pulse" };
    if (diffDays === 1) return { text: "Demain", color: "text-amber-700 bg-amber-100 dark:bg-amber-950/20 px-2 py-0.5 rounded-md font-bold" };
    if (diffDays > 1) return { text: `Dans ${diffDays} jours`, color: "text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-bold" };
    return { text: `Passé (${Math.abs(diffDays)} j)`, color: "text-slate-400 font-light" };
  };

  const teamLeaders = activeCollabs.filter(c => c.role === 'chef_equipe');

  // Gantt 30 days time track generator
  const ganttDays = useMemo(() => {
    const days = [];
    const monthsFr = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dateStr = `${d.getFullYear()}-${month}-${day}`;
      days.push({ 
        day, 
        monthLabel: monthsFr[d.getMonth()],
        dateStr 
      });
    }
    return days;
  }, []);

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
          <p className="text-xs font-bold text-slate-400 tracking-wider">PLANIFICATION CHANTIERS & CHAUFFEURS</p>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Opérations & Logistique terrain</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Toggle buttons */}
          <div className="bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-205/50 dark:border-slate-805 flex">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List size={14} /> Liste chantiers
            </button>
            <button
              onClick={() => setViewMode('gantt')}
              className={`p-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                viewMode === 'gantt' 
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar size={14} /> Planning Gantt (30j)
            </button>
          </div>

          {activeRole !== 'chef_equipe' && (
            <button
              onClick={() => setShowAddDemenagement(true)}
              className="bg-accent hover:bg-accent-hover text-brand-900 border border-accent font-black py-2.5 px-5 rounded-2xl text-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Plus size={14} /> Planifier un Chantier
            </button>
          )}
        </div>
      </div>

      {showAddDemenagement && (
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-350 dark:border-slate-700 p-6 rounded-3xl space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b pb-3 mb-2 border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-black uppercase text-brand-900 dark:text-white">Nouveau Chantier au Registre</h3>
            <button onClick={() => setShowAddDemenagement(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold">Fermer [X]</button>
          </div>
          <form onSubmit={createPlanningMove} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">Nom du client</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: Gérard Lhermitte" value={newDemenagement.clientName} onChange={e=>setNewDemenagement({...newDemenagement, clientName: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Métrage cubique (m³)</label>
              <input required type="number" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newDemenagement.volume} onChange={e=>setNewDemenagement({...newDemenagement, volume: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Ville de départ</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="Paris" value={newDemenagement.fromCity} onChange={e=>setNewDemenagement({...newDemenagement, fromCity: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Ville de destination</label>
              <input type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="Lyon" value={newDemenagement.toCity} onChange={e=>setNewDemenagement({...newDemenagement, toCity: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Date du transport</label>
              <input required type="date" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newDemenagement.date} onChange={e=>setNewDemenagement({...newDemenagement, date: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Chef d'équipe conducteur</label>
              <select className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent text-slate-800 dark:text-slate-100" value={newDemenagement.teamLeader} onChange={e=>setNewDemenagement({...newDemenagement, teamLeader: e.target.value})}>
                {teamLeaders.length > 0 ? (
                  teamLeaders.map(c => (
                    <option key={c.uid} value={c.name}>{c.name}</option>
                  ))
                ) : (
                  <>
                    <option value="Hervé Le Gall">Hervé Le Gall (Équipe 1)</option>
                    <option value="Ahmed Bensalah">Ahmed Bensalah (Équipe 2)</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Taille théorique de l'équipage</label>
              <input type="number" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newDemenagement.crewSize} onChange={e=>setNewDemenagement({...newDemenagement, crewSize: Number(e.target.value)})} />
            </div>
            
            <div className="md:col-span-3 pt-2">
              <button type="submit" className="w-full bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 py-3 rounded-xl font-bold cursor-pointer transition-all">
                Consigner et charger le planning
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {getFilteredDemenagements().map((move) => {
            const isAssigning = activeAssignMoveId === move.id;
            const countdownInfo = getCountdown(move.date);

            return (
              <div key={move.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Left info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800">
                        {move.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        move.status === 'À planifier' ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/20 dark:text-amber-400' :
                        move.status === 'Programmé' ? 'bg-sky-50 text-slate-700 dark:bg-sky-950/30 dark:text-sky-400' :
                        move.status === 'En cours' ? 'bg-purple-100 text-purple-900 dark:bg-purple-950/20 dark:text-purple-400' : 
                        'bg-green-150 text-green-900 dark:bg-green-950/20 dark:text-green-400'
                      }`}>
                        {move.status}
                      </span>
                      
                      {/* Countdown badge */}
                      {move.status !== 'Terminé' && (
                        <span className={`text-[9.5px] uppercase font-black ${countdownInfo.color}`}>
                          {countdownInfo.text}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-base font-black text-brand-950 dark:text-white tracking-tight">{move.clientName}</h4>
                    
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-light">
                      <span>{move.fromCity}</span>
                      <ArrowRight size={10} className="text-accent shrink-0" />
                      <span>{move.toCity}</span>
                    </div>
                  </div>

                  {/* Middle metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 text-xs shrink-0 lg:border-l lg:border-r lg:px-6 py-2">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Volume</span>
                      <span className="font-extrabold text-slate-800 dark:text-white">{move.volume} m³</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Date de transport</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{formatDateFr(move.date)}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Chef d'équipe</span>
                      <span className="font-semibold text-slate-800 dark:text-white capitalize">{move.teamLeader}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Équipage</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{move.crewSize} Coéquipiers</span>
                    </div>
                  </div>

                  {/* Operational assignment tags details */}
                  <div className="shrink-0 flex flex-col gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 p-3 rounded-2xl min-w-[200px] text-xs">
                    <div>
                      <span className="text-[8.5px] text-slate-400 block uppercase font-black">Chauffeurs / Équipiers</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {move.assignedMovers && move.assignedMovers.length > 0 ? (
                          move.assignedMovers.map(name => (
                            <span key={name} className="bg-brand-50 text-brand-800 dark:bg-brand-900/20 dark:text-brand-350 px-2 py-0.5 rounded text-[10px] font-semibold">
                              {name.split(' ')[0]}
                            </span>
                          ))
                        ) : (
                          <span className="text-amber-600 dark:text-amber-500 text-[10px] italic flex items-center gap-1 font-bold">
                            <AlertCircle size={10} /> Aucun équipier assigné
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-1 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800">
                      <span className="text-[8.5px] text-slate-400 block uppercase font-black">Camion affecté</span>
                      {move.assignedTruck ? (
                        <span className="text-brand-950 dark:text-accent font-extrabold flex items-center gap-1 mt-0.5">
                          <Truck size={10} /> {move.assignedTruck}
                        </span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-500 text-[10px] italic flex items-center gap-1 font-bold">
                          <AlertCircle size={10} /> Aucun véhicule affecté
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="shrink-0 space-y-2 w-full lg:w-auto">
                    <button
                      onClick={() => handleDocumentClick(move)}
                      className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-300 font-extrabold py-2 px-4 rounded-xl text-[10px] uppercase cursor-pointer text-center block border border-slate-200/50 dark:border-slate-800"
                    >
                      📄 Documents Officiels
                    </button>

                    {activeRole !== 'chef_equipe' && (
                      <button
                        onClick={() => openAssignmentPanel(move)}
                        className="w-full bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 font-black py-2 px-4 rounded-xl text-[10px] uppercase cursor-pointer text-center block transition-all"
                      >
                        👥 Affectation équipe
                      </button>
                    )}

                    {move.status === 'À planifier' && (
                      <button
                        onClick={() => updateMoveStatus(move.id, 'Programmé')}
                        className="w-full bg-accent hover:bg-accent-hover text-brand-950 font-black py-2 px-4 rounded-xl text-[10px] uppercase cursor-pointer text-center block active:scale-95"
                      >
                        Valider voyage
                      </button>
                    )}
                    {move.status === 'Programmé' && (
                      <button
                        onClick={() => updateMoveStatus(move.id, 'En cours')}
                        className="w-full bg-slate-950 hover:bg-slate-850 text-white dark:bg-slate-800 dark:hover:bg-slate-750 font-extrabold py-2 px-4 rounded-xl text-[10px] cursor-pointer text-center block active:scale-95"
                      >
                        En route (Démarré)
                      </button>
                    )}
                    {move.status === 'En cours' && (
                      <button
                        onClick={() => updateMoveStatus(move.id, 'Terminé')}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2 px-4 rounded-xl text-[10px] uppercase cursor-pointer text-center block active:scale-95"
                      >
                        Signaler livraison
                      </button>
                    )}
                    {move.status === 'Terminé' && (
                      <div className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 text-center py-2 px-4 rounded-xl border border-emerald-500/10 text-[10px] font-black uppercase flex items-center justify-center gap-1">
                        <Check size={12} /> Réalisé
                      </div>
                    )}
                  </div>
                </div>

                {/* Assignment drawer */}
                {isAssigning && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-xs">
                    {/* Movers Selection */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-850">
                      <h5 className="font-black text-slate-800 dark:text-slate-250 flex items-center gap-1.5">
                        <Users size={14} className="text-brand-900 dark:text-accent" />
                        Choisir l'équipe terrain disponible
                      </h5>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {movers.map(mover => {
                          const isChecked = tempMovers.includes(mover.name);
                          return (
                            <label 
                              key={mover.id} 
                              className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all ${
                                isChecked 
                                  ? 'bg-brand-50 border-brand-200/60 dark:bg-brand-900/15 dark:border-brand-900/40' 
                                  : 'bg-white border-slate-200/50 dark:bg-slate-900 dark:border-slate-805 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  className="accent-brand-900 dark:accent-accent"
                                  checked={isChecked} 
                                  onChange={() => toggleTempMover(mover.name)} 
                                />
                                <div className="space-y-0.5">
                                  <span className="font-bold block text-slate-800 dark:text-slate-200">{mover.name}</span>
                                  <span className="text-[9px] text-slate-400 block">{mover.role} ({mover.status})</span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Truck Selection */}
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-850">
                      <h5 className="font-black text-slate-800 dark:text-slate-250 flex items-center gap-1.5">
                        <Truck size={14} className="text-brand-900 dark:text-accent" />
                        Choisir le véhicule disponible
                      </h5>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {trucks.map(truck => {
                          const isSelected = tempTruck === truck.plateNumber;
                          return (
                            <label 
                              key={truck.id} 
                              className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all ${
                                isSelected 
                                  ? 'bg-brand-50 border-brand-200/60 dark:bg-brand-900/15 dark:border-brand-900/40' 
                                  : 'bg-white border-slate-200/50 dark:bg-slate-900 dark:border-slate-805 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <input 
                                  type="radio" 
                                  name="truckSelection"
                                  className="accent-brand-900 dark:accent-accent"
                                  checked={isSelected} 
                                  onChange={() => setTempTruck(truck.plateNumber)} 
                                />
                                <div className="space-y-0.5">
                                  <span className="font-bold block text-slate-800 dark:text-slate-200">{truck.plateNumber}</span>
                                  <span className="text-[9px] text-slate-400 block">{truck.type} ({truck.capacity} m³) - {truck.status}</span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                      <button 
                        onClick={() => setActiveAssignMoveId(null)}
                        className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={() => handleSaveAssignment(move.id)}
                        className="px-5 py-2 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:hover:bg-accent-hover text-white dark:text-brand-950 font-black rounded-xl transition-all shadow-md"
                      >
                        Enregistrer l'Affectation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {getFilteredDemenagements().length === 0 && (
            <div className="py-16 text-center text-slate-400 font-light border-2 border-dashed rounded-3xl">
              Aucun chantier de déménagement trouvé.
            </div>
          )}
        </div>
      )}

      {/* Gantt View */}
      {viewMode === 'gantt' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 overflow-x-auto">
          <div className="min-w-[950px] space-y-2">
            {/* Gantt header days row */}
            <div className="grid grid-cols-12 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="col-span-3 text-xs font-black uppercase text-slate-400 tracking-wider">Chantiers</div>
              
              {/* Timeline segment days details */}
              <div className="col-span-9 grid grid-cols-30 gap-0 text-center">
                {ganttDays.map((gd, idx) => (
                  <div 
                    key={gd.dateStr} 
                    className={`text-[9px] font-bold py-1 border-r border-slate-100 dark:border-slate-800/80 flex flex-col justify-center items-center ${
                      idx === 0 ? 'bg-accent/15 text-brand-900 dark:text-accent font-black rounded-t-lg' : ''
                    }`}
                  >
                    <span>{gd.day}</span>
                    <span className="text-[7px] font-medium text-slate-400">{gd.monthLabel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gantt chantiers rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/65">
              {getFilteredDemenagements().map(move => {
                return (
                  <div key={move.id} className="grid grid-cols-12 py-3 items-center hover:bg-slate-50/50 dark:hover:bg-slate-950/20 rounded-xl px-1">
                    {/* Left details */}
                    <div className="col-span-3 pr-4 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] font-bold text-slate-400">{move.id}</span>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">{move.clientName}</h4>
                      </div>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                        {move.fromCity.split(' ')[0]} ➔ {move.toCity.split(' ')[0]} ({move.volume} m³)
                      </p>
                    </div>

                    {/* Timeline grid */}
                    <div className="col-span-9 grid grid-cols-30 gap-0 h-9 items-center">
                      {ganttDays.map(gd => {
                        const isJobDay = move.date === gd.dateStr;
                        return (
                          <div 
                            key={gd.dateStr} 
                            className="h-full border-r border-slate-100 dark:border-slate-800/80 flex items-center justify-center relative"
                          >
                            {isJobDay && (
                              <div 
                                className={`absolute inset-x-0.5 h-6 rounded-lg text-[8px] font-black uppercase text-center flex items-center justify-center shadow-sm cursor-help truncate px-0.5 ${
                                  move.status === 'À planifier' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 border border-amber-300/40' :
                                  move.status === 'Programmé' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-400 border border-sky-300/40' :
                                  move.status === 'En cours' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400 border border-purple-300/40' :
                                  'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-450 border border-emerald-300/40'
                                }`}
                                title={`${move.clientName} (${move.volume} m³) - ${move.status}`}
                              >
                                {move.volume}m³
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {getFilteredDemenagements().length === 0 && (
                <div className="py-12 text-center text-xs text-slate-400">Aucun planning disponible.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Local Document Templates Modal Fallback */}
      {localMoveDoc && (
        <DocumentTemplates 
          move={localMoveDoc} 
          onClose={() => setLocalMoveDoc(null)} 
        />
      )}

    </div>
  );
}
