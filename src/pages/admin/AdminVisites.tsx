import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSyncedCollection } from '../../hooks/useData';
import { Visite, UserProfile } from '../../types';
import { 
  Plus, MapPin, Check, Calendar, Grid, ChevronLeft, ChevronRight, 
  Trash2, AlertTriangle, Phone, Box, HelpCircle, User, Compass, Clock, Eye
} from 'lucide-react';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';
import { buildDossierIdFromReference } from '../../lib/dossier-id';
import { getNextSequencedId } from '../../lib/admin-ids';

interface AdminVisitesProps {
  searchQuery?: string;
}

const VISIT_LIST_PAGE_SIZE = 10;
const INITIAL_UPCOMING_COUNT = 9;

export function AdminVisites({ searchQuery }: AdminVisitesProps) {
  const context = useOutletContext<AdminOutletContextType>();
  const activeSearchQuery = searchQuery || context?.searchQuery || '';

  const [visites, setVisites] = useSyncedCollection<Visite>('visites');
  const [collaborateurs] = useSyncedCollection<UserProfile>('collaborateurs');

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, visitId: string } | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<Visite | null>(null);
  const [editingVisitId, setEditingVisitId] = useState<string | null>(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [viewMode, setViewMode] = useState<'list' | 'week' | 'month'>('list');
  const [showAddVisite, setShowAddVisite] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Visite['status'] | 'all'>('all');
  const [modeFilter, setModeFilter] = useState<Visite['visitMode'] | 'all'>('all');
  const [commercialFilter, setCommercialFilter] = useState<string>('all');
  const [dateScopeFilter, setDateScopeFilter] = useState<'upcoming' | 'today' | 'past' | 'all'>('upcoming');
  const [visibleUpcomingCount, setVisibleUpcomingCount] = useState(INITIAL_UPCOMING_COUNT);
  const [visitListPage, setVisitListPage] = useState(1);
  const [newVisite, setNewVisite] = useState<Partial<Visite>>({
    clientName: '', 
    address: '', 
    phone: '', 
    date: '', 
    time: '10:00', 
    volumeEstimated: 0,
    visitMode: 'domicile',
    commercialAssigned: '', 
    status: 'Planifiée',
    notes: ''
  });

  // Base commercials from DB
  const commercialsList = useMemo(() => {
    const list = collaborateurs.filter(col => col.role === 'commercial' && col.status === 'Actif');
    if (list.length === 0) {
      // Fallback
      return [
        { uid: 'com-1', name: 'Jean-Marc Tardieu' },
        { uid: 'com-2', name: 'Michel Blanc-Sec' }
      ];
    }
    return list;
  }, [collaborateurs]);

  // Set default commercial when list changes
  React.useEffect(() => {
    if (commercialsList.length > 0 && !newVisite.commercialAssigned) {
      setNewVisite(prev => ({ ...prev, commercialAssigned: commercialsList[0].name }));
    }
  }, [commercialsList, newVisite.commercialAssigned]);

  // Calendar week state (represents Monday of selected week)
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    const mon = new Date(d.setDate(diff));
    mon.setHours(0, 0, 0, 0);
    return mon;
  });

  // Calendar month state
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1); // Set to 1st to avoid overflow issues
    return d;
  });

  const changeMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + direction);
      return next;
    });
  };

  const setTodayMonth = () => {
    const d = new Date();
    d.setDate(1);
    setCurrentMonth(d);
  };

  const monthNamesFr = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const monthDays = useMemo(() => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDayOfWeek = startOfMonth.getDay();
    const paddingDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    const gridStartDate = new Date(startOfMonth);
    gridStartDate.setDate(startOfMonth.getDate() - paddingDays);
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStartDate);
      d.setDate(gridStartDate.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      days.push({
        date: d,
        dateStr,
        isCurrentMonth: d.getMonth() === currentMonth.getMonth(),
        dayNum: d.getDate()
      });
    }
    return days;
  }, [currentMonth]);

  const changeWeek = (direction: number) => {
    setCurrentWeekStart(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + direction * 7);
      return next;
    });
  };

  const setTodayWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const mon = new Date(d.setDate(diff));
    mon.setHours(0, 0, 0, 0);
    setCurrentWeekStart(mon);
  };

  const weekDays = useMemo(() => {
    const days = [];
    const weekdaysFr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    for (let i = 0; i < 5; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(currentWeekStart.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      days.push({
        dateLabel: weekdaysFr[i],
        formattedDate: `${day}/${month}`,
        dateStr
      });
    }
    return days;
  }, [currentWeekStart]);

  const hoursList = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, visitId: string) => {
    e.dataTransfer.setData('text/plain', visitId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropWeek = (e: React.DragEvent, dateStr: string, hourStr: string) => {
    e.preventDefault();
    const visitId = e.dataTransfer.getData('text/plain');
    if (!visitId) return;
    setVisites(prev => prev.map(v => v.id === visitId ? { ...v, date: dateStr, time: hourStr, status: 'Planifiée' } : v));
  };

  const handleDropMonth = (e: React.DragEvent, dateStr: string) => {
    e.preventDefault();
    const visitId = e.dataTransfer.getData('text/plain');
    if (!visitId) return;
    setVisites(prev => prev.map(v => v.id === visitId ? { ...v, date: dateStr, status: 'Planifiée' } : v));
  };

  // Past / Future checker
  const isVisitPast = (visDate: string, visTime: string) => {
    if (!visDate) return false;
    try {
      const [year, month, day] = visDate.split('-').map(Number);
      const [hours, minutes] = (visTime || '00:00').split(':').map(Number);
      const visitDate = new Date(year, month - 1, day, hours, minutes);
      return visitDate < new Date();
    } catch (e) {
      return false;
    }
  };

  // Context Menu handlers
  const handleContextMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visitId: id
    });
  };

  const handleAction = (action: 'edit' | 'done' | 'cancel' | 'delete', id: string) => {
    setContextMenu(null);
    if (action === 'edit') {
      const vis = visites.find(v => v.id === id);
      if (vis) {
        setEditingVisitId(vis.id);
        setNewVisite({
          clientName: vis.clientName,
          address: vis.address,
          phone: vis.phone,
          date: vis.date,
          time: vis.time,
          volumeEstimated: vis.volumeEstimated || 0,
          visitMode: vis.visitMode,
          commercialAssigned: vis.commercialAssigned,
          status: vis.status,
          notes: vis.notes
        });
        setShowAddVisite(true);
      }
    } else if (action === 'done') {
      updateVisitStatus(id, 'Réalisée');
    } else if (action === 'cancel') {
      updateVisitStatus(id, 'Annulée');
    } else if (action === 'delete') {
      deleteVisit(id);
    }
  };

  const saveTechnicalVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVisitId) {
      // Update
      setVisites(prev => prev.map(v => {
        if (v.id === editingVisitId) {
          return {
            ...v,
            clientName: newVisite.clientName || v.clientName,
            address: newVisite.address || v.address,
            phone: newVisite.phone || v.phone,
            date: newVisite.date || v.date,
            time: newVisite.time || v.time,
            volumeEstimated: newVisite.volumeEstimated !== undefined ? Number(newVisite.volumeEstimated) : v.volumeEstimated,
            visitMode: (newVisite.visitMode as any) || v.visitMode,
            commercialAssigned: newVisite.commercialAssigned || v.commercialAssigned,
            notes: newVisite.notes || '',
            status: newVisite.status || v.status
          };
        }
        return v;
      }));
      setEditingVisitId(null);
    } else {
      // Create
      const id = getNextSequencedId('VIS', visites.map((visit) => visit.id));
      const item: Visite = {
        id,
        dossierId: buildDossierIdFromReference('VIS', id),
        clientName: newVisite.clientName || 'Client Visite',
        address: newVisite.address || 'Paris',
        phone: newVisite.phone || '',
        date: newVisite.date || new Date().toISOString().split('T')[0],
        time: newVisite.time || '10:00',
        volumeEstimated: newVisite.volumeEstimated ? Number(newVisite.volumeEstimated) : undefined,
        visitMode: newVisite.visitMode as any || 'domicile',
        commercialAssigned: newVisite.commercialAssigned || (commercialsList[0]?.name || 'Jean-Marc Tardieu'),
        status: 'Planifiée',
        notes: newVisite.notes || ''
      };
      setVisites(prev => [item, ...prev]);
    }
    setShowAddVisite(false);
    setNewVisite({
      clientName: '', 
      address: '', 
      phone: '', 
      date: '', 
      time: '10:00', 
      volumeEstimated: 0,
      visitMode: 'domicile',
      commercialAssigned: commercialsList[0]?.name || 'Jean-Marc Tardieu', 
      status: 'Planifiée',
      notes: ''
    });
  };

  const updateVisitStatus = (id: string, newStatus: Visite['status']) => {
    setVisites(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const deleteVisit = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cette visite ?')) {
      setVisites(prev => prev.filter(v => v.id !== id));
    }
  };

  const getVisitTimestamp = (visit: Visite) => {
    const [year, month, day] = visit.date.split('-').map(Number);
    const [hours, minutes] = (visit.time || '00:00').split(':').map(Number);
    const date = new Date(year || 1970, (month || 1) - 1, day || 1, hours || 0, minutes || 0);
    return date.getTime();
  };

  const uniqueCommercials = useMemo(() => {
    return Array.from(new Set(visites.map((visit) => visit.commercialAssigned).filter(Boolean))).sort();
  }, [visites]);

  const filteredSortedVisites = useMemo(() => {
    const query = activeSearchQuery.trim().toLowerCase();
    const now = Date.now();

    return visites
      .filter((visit) => {
        const matchesSearch = !query || [
          visit.clientName,
          visit.id,
          visit.address,
          visit.phone,
          visit.commercialAssigned,
          visit.notes
        ].some((value) => String(value || '').toLowerCase().includes(query));

        const matchesStatus = statusFilter === 'all' || visit.status === statusFilter;
        const matchesMode = modeFilter === 'all' || visit.visitMode === modeFilter;
        const matchesCommercial = commercialFilter === 'all' || visit.commercialAssigned === commercialFilter;
        const isPast = isVisitPast(visit.date, visit.time);
        const matchesDateScope =
          dateScopeFilter === 'all' ||
          (dateScopeFilter === 'today' && visit.date === todayStr) ||
          (dateScopeFilter === 'upcoming' && !isPast) ||
          (dateScopeFilter === 'past' && isPast);

        return matchesSearch && matchesStatus && matchesMode && matchesCommercial && matchesDateScope;
      })
      .sort((a, b) => {
        const timeA = getVisitTimestamp(a);
        const timeB = getVisitTimestamp(b);
        const aIsUpcoming = timeA >= now;
        const bIsUpcoming = timeB >= now;
        if (aIsUpcoming !== bIsUpcoming) return aIsUpcoming ? -1 : 1;
        return aIsUpcoming ? timeA - timeB : timeB - timeA;
      });
  }, [visites, activeSearchQuery, statusFilter, modeFilter, commercialFilter, dateScopeFilter, todayStr]);

  const upcomingVisites = useMemo(() => {
    return filteredSortedVisites.filter((visit) => visit.status !== 'Annulée' && !isVisitPast(visit.date, visit.time));
  }, [filteredSortedVisites]);

  const visibleUpcomingVisites = upcomingVisites.slice(0, visibleUpcomingCount);
  const totalListPages = Math.max(1, Math.ceil(filteredSortedVisites.length / VISIT_LIST_PAGE_SIZE));
  const safeVisitListPage = Math.min(visitListPage, totalListPages);
  const paginatedVisites = filteredSortedVisites.slice(
    (safeVisitListPage - 1) * VISIT_LIST_PAGE_SIZE,
    safeVisitListPage * VISIT_LIST_PAGE_SIZE
  );

  React.useEffect(() => {
    setVisitListPage(1);
    setVisibleUpcomingCount(INITIAL_UPCOMING_COUNT);
  }, [activeSearchQuery, statusFilter, modeFilter, commercialFilter, dateScopeFilter]);

  React.useEffect(() => {
    if (visitListPage > totalListPages) {
      setVisitListPage(totalListPages);
    }
  }, [visitListPage, totalListPages]);

  const getFilteredVisites = (): Visite[] => filteredSortedVisites;

  // Helper to map visits to calendar cell
  const getVisitsForCell = (dateStr: string, hourStr: string) => {
    const slotHour = parseInt(hourStr.split(':')[0], 10);
    return getFilteredVisites().filter(v => {
      if (v.date !== dateStr || v.status === 'Annulée') return false;
      const vHour = parseInt(v.time.split(':')[0], 10);
      return vHour === slotHour;
    });
  };

  const getVisitModeBadge = (mode?: string) => {
    switch (mode) {
      case 'domicile':
        return <span className="bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300 text-[9px] px-2 py-0.5 rounded-md font-bold">À domicile</span>;
      case 'visio':
        return <span className="bg-sky-100 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300 text-[9px] px-2 py-0.5 rounded-md font-bold">Visio</span>;
      case 'a_definir':
        return <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[9px] px-2 py-0.5 rounded-md font-bold">À définir</span>;
      default:
        return null;
    }
  };

  const getVisitStatusClasses = (status: Visite['status']) => {
    if (status === 'Planifiée') return 'bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400';
    if (status === 'Réalisée') return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400';
    if (status === 'Annulée') return 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400';
    return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400';
  };

  const formatDateFr = (dateStr?: string) => {
    if (!dateStr) return 'Date à définir';
    const parts = dateStr.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
  };

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-wider">VISITES SUR TERRAIN & RENSEIGNEMENTS</p>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Planning des Visites Techniques</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Toggle buttons */}
          <div className="bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-805 flex">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid size={14} /> Liste
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`p-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'week' 
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar size={14} /> Semaine
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`p-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'month' 
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar size={14} /> Mensuelle
            </button>
          </div>

          <button
            onClick={() => setShowAddVisite(true)}
            className="bg-accent hover:bg-accent-hover text-brand-900 border border-accent font-black py-2.5 px-5 rounded-2xl text-xs transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <Plus size={14} /> Programmer une Visite
          </button>
        </div>
      </div>

      {showAddVisite && (
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-350 dark:border-slate-700 p-6 rounded-3xl space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b pb-3 mb-2 border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-black uppercase text-brand-900 dark:text-white">
              {editingVisitId ? 'Modifier la Visite' : 'Programmer une Nouvelle Visite'}
            </h3>
            <button onClick={() => { setShowAddVisite(false); setEditingVisitId(null); }} className="text-slate-400 hover:text-slate-900 text-xs font-bold">Fermer [X]</button>
          </div>
          <form onSubmit={saveTechnicalVisit} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold mb-1">Nom du client</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: Gérard L'Hermitte" value={newVisite.clientName} onChange={e=>setNewVisite({...newVisite, clientName: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Adresse complète</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: 8 Rue de Charenton, Paris" value={newVisite.address} onChange={e=>setNewVisite({...newVisite, address: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Téléphone mobile</label>
              <input type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: 06 00 00 00 00" value={newVisite.phone || ''} onChange={e=>setNewVisite({...newVisite, phone: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Date programmée</label>
              <input required type="date" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" value={newVisite.date} onChange={e=>setNewVisite({...newVisite, date: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Créneau horaire</label>
              <input required type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: 14:30" value={newVisite.time} onChange={e=>setNewVisite({...newVisite, time: e.target.value})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Volume estimé (m³)</label>
              <input type="number" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="Facultatif" value={newVisite.volumeEstimated || ''} onChange={e=>setNewVisite({...newVisite, volumeEstimated: Number(e.target.value)})} />
            </div>
            <div>
              <label className="block font-bold mb-1">Type de visite</label>
              <select className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent text-slate-800 dark:text-slate-100" value={newVisite.visitMode} onChange={e=>setNewVisite({...newVisite, visitMode: e.target.value as any})}>
                <option value="domicile">À domicile</option>
                <option value="visio">Visio</option>
                <option value="a_definir">À définir</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Commercial Évaluateur Assigné</label>
              <select className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent text-slate-800 dark:text-slate-100" value={newVisite.commercialAssigned} onChange={e=>setNewVisite({...newVisite, commercialAssigned: e.target.value})}>
                {commercialsList.map(com => (
                  <option key={com.uid} value={com.name}>{com.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Notes post-visite / consignes</label>
              <input type="text" className="w-full bg-white dark:bg-slate-950 p-2.5 border rounded-lg focus:outline-accent" placeholder="ex: accès difficile au 4ème étage" value={newVisite.notes || ''} onChange={e=>setNewVisite({...newVisite, notes: e.target.value})} />
            </div>
            
            <div className="md:col-span-3 pt-2">
              <button type="submit" className="w-full bg-brand-900 hover:bg-brand-hover text-white dark:bg-accent dark:text-brand-950 py-3 rounded-xl font-bold cursor-pointer transition-all">
                {editingVisitId ? 'Enregistrer les modifications' : 'Consigner la visite au planning'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Visit filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Échéance</label>
            <select value={dateScopeFilter} onChange={(e) => setDateScopeFilter(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="upcoming">À venir</option>
              <option value="today">Aujourd'hui</option>
              <option value="past">Passées</option>
              <option value="all">Toutes</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Statut</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="all">Tous statuts</option>
              <option value="Planifiée">Planifiée</option>
              <option value="Réalisée">Réalisée</option>
              <option value="Chiffrée">Chiffrée</option>
              <option value="Facturée">Facturée</option>
              <option value="Annulée">Annulée</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Type</label>
            <select value={modeFilter} onChange={(e) => setModeFilter(e.target.value as any)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="all">Tous types</option>
              <option value="domicile">À domicile</option>
              <option value="visio">Visio</option>
              <option value="a_definir">À définir</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Commercial</label>
            <select value={commercialFilter} onChange={(e) => setCommercialFilter(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="all">Tous</option>
              {uniqueCommercials.map((commercial) => (
                <option key={commercial} value={commercial}>{commercial}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setDateScopeFilter('upcoming');
                setStatusFilter('all');
                setModeFilter('all');
                setCommercialFilter('all');
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl px-3 py-2 text-xs font-black transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-accent">Les plus proches</p>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">9 prochaines visites</h3>
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400">{upcomingVisites.length} à venir</span>
            </div>

            {visibleUpcomingVisites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {visibleUpcomingVisites.map((vis) => (
                  <button
                    key={vis.id}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, vis.id)}
                    onClick={() => setSelectedVisit(vis)}
                    onContextMenu={(e) => handleContextMenu(e, vis.id)}
                    className="text-left border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/30 hover:bg-white dark:hover:bg-slate-950 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 truncate">{vis.id}</p>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">{vis.clientName}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase shrink-0 ${getVisitStatusClasses(vis.status)}`}>
                        {vis.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-bold">
                        <Calendar size={12} className="text-accent" /> {formatDateFr(vis.date)}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-bold">
                        <Clock size={12} className="text-accent" /> {vis.time}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 flex gap-1.5">
                      <MapPin size={12} className="text-slate-400 shrink-0 mt-0.5" /> {vis.address}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {getVisitModeBadge(vis.visitMode)}
                      <span className="bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-300 text-[9px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <User size={10} /> {vis.commercialAssigned}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-slate-400 text-sm font-light border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                Aucune visite à venir avec ces filtres.
              </div>
            )}

            {upcomingVisites.length > visibleUpcomingCount && (
              <button
                onClick={() => setVisibleUpcomingCount((count) => count + INITIAL_UPCOMING_COUNT)}
                className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-xs font-black text-slate-600 dark:text-slate-300 transition-colors"
              >
                Afficher plus ({Math.min(INITIAL_UPCOMING_COUNT, upcomingVisites.length - visibleUpcomingCount)} supplémentaires)
              </button>
            )}
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Vue liste paginée</p>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Toutes les visites filtrées</h3>
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400">{filteredSortedVisites.length} résultat(s)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left">
                <thead className="bg-slate-50 dark:bg-slate-950/60 text-[10px] uppercase tracking-wider text-slate-400 font-black border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Adresse</th>
                    <th className="px-4 py-3">Commercial</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {paginatedVisites.map((vis) => (
                    <tr key={vis.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/40 cursor-pointer" onClick={() => setSelectedVisit(vis)}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-black text-slate-900 dark:text-white">{formatDateFr(vis.date)}</div>
                        <div className="text-[10px] text-slate-400 font-bold">{vis.time}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-black text-slate-900 dark:text-white">{vis.clientName}</div>
                        <div className="text-[10px] text-slate-400 font-bold">{vis.id}</div>
                      </td>
                      <td className="px-4 py-3 max-w-xs text-slate-500 dark:text-slate-400 truncate">{vis.address}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-200 font-bold">{vis.commercialAssigned}</td>
                      <td className="px-4 py-3">{getVisitModeBadge(vis.visitMode)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${getVisitStatusClasses(vis.status)}`}>{vis.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={(e) => { e.stopPropagation(); setSelectedVisit(vis); }} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-500" title="Voir"><Eye size={13} /></button>
                          {vis.status === 'Planifiée' && (
                            <button onClick={(e) => { e.stopPropagation(); updateVisitStatus(vis.id, 'Réalisée'); }} className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600" title="Marquer réalisée"><Check size={13} /></button>
                          )}
                          <button onClick={(e) => { e.stopPropagation(); deleteVisit(vis.id); }} className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600" title="Supprimer"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedVisites.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-slate-400 font-light">Aucune visite trouvée avec ces filtres.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Page {safeVisitListPage} / {totalListPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVisitListPage((page) => Math.max(1, page - 1))}
                  disabled={safeVisitListPage <= 1}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-950"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setVisitListPage((page) => Math.min(totalListPages, page + 1))}
                  disabled={safeVisitListPage >= totalListPages}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-950"
                >
                  Suivant
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* Calendar Week View */}
      {viewMode === 'week' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 overflow-x-auto">
          {/* Calendar Controller */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Compass className="text-accent" size={16} />
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Navigation semaine</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => changeWeek(-1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
                title="Semaine précédente"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={setTodayWeek}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 border border-slate-200/30 rounded-xl text-[10px] font-black text-slate-700 dark:text-slate-300 transition-all"
              >
                Aujourd'hui
              </button>
              <button 
                onClick={() => changeWeek(1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
                title="Semaine suivante"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Grille */}
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-6 border-b border-slate-100 dark:border-slate-800 pb-2 text-center text-xs font-black uppercase tracking-wider text-slate-400">
              <div className="text-left pl-2">Horaires</div>
              {weekDays.map(day => (
                <div key={day.dateStr} className={`py-1 rounded-xl ${day.dateStr === todayStr ? 'bg-accent/15 text-brand-900 dark:text-accent font-black' : ''}`}>
                  {day.dateLabel} <span className="text-[10px] opacity-75 font-bold">({day.formattedDate})</span>
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {hoursList.map(hour => (
                <div key={hour} className="grid grid-cols-6 min-h-[75px] items-stretch">
                  {/* Hour cell */}
                  <div className="text-[11px] font-black text-slate-400 pr-4 py-2 border-r border-slate-100 dark:border-slate-800/80 flex items-center justify-start">
                    {hour}
                  </div>

                  {/* Day cells */}
                  {weekDays.map(day => {
                    const cellVisits = getVisitsForCell(day.dateStr, hour);
                    return (
                      <div 
                        key={day.dateStr} 
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropWeek(e, day.dateStr, hour)}
                        className={`p-2 border-r border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5 justify-center ${
                          day.dateStr === todayStr ? 'bg-slate-50/50 dark:bg-slate-950/20' : ''
                        }`}
                      >
                        {cellVisits.map(vis => (
                          <div 
                            key={vis.id} 
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, vis.id)}
                            onClick={(e) => { e.stopPropagation(); setSelectedVisit(vis); }}
                            onContextMenu={(e) => handleContextMenu(e, vis.id)}
                            className={`p-2 rounded-xl text-[10px] leading-tight space-y-1 hover:border-accent dark:hover:border-accent transition-all shadow-sm cursor-pointer select-none ${
                              vis.status === 'Réalisée'
                                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-950 dark:text-emerald-300'
                                : vis.status === 'Annulée'
                                  ? 'bg-red-50/50 dark:bg-red-950/20 text-red-400 border border-red-100 dark:border-red-900/20 opacity-50'
                                  : isVisitPast(vis.date, vis.time)
                                    ? 'bg-slate-50 dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800 opacity-60'
                                    : 'bg-amber-50/80 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 text-amber-950 dark:text-amber-300'
                            }`}
                          >
                            <div className="flex justify-between items-start font-black text-slate-900 dark:text-white">
                              <span className="truncate max-w-[85px]">{vis.clientName}</span>
                              <span className="text-[8px] text-accent font-bold shrink-0">{vis.time}</span>
                            </div>
                            <div className="text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-0.5">
                              <User size={8} /> {vis.commercialAssigned.split(' ')[0]}
                            </div>
                            <div className="flex items-center justify-between gap-1 mt-1 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800/80">
                              {vis.volumeEstimated && (
                                <span className="font-extrabold text-[8px] text-emerald-600 dark:text-emerald-400">
                                  {vis.volumeEstimated} m³
                                </span>
                              )}
                              <span className={`text-[8px] uppercase font-black px-1 rounded ${
                                vis.status === 'Planifiée' ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {vis.status === 'Planifiée' ? 'Plan.' : 'Réal.'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calendar Month View */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 overflow-x-auto">
          {/* Calendar Controller */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Compass className="text-accent" size={16} />
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                {monthNamesFr[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
                title="Mois précédent"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={setTodayMonth}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 border border-slate-200/30 rounded-xl text-[10px] font-black text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
              >
                Aujourd'hui
              </button>
              <button 
                onClick={() => changeMonth(1)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
                title="Mois suivant"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Grille Mensuelle */}
          <div className="min-w-[800px] border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-2.5 text-center text-xs font-black uppercase tracking-wider text-slate-400">
              <div>Lun</div>
              <div>Mar</div>
              <div>Mer</div>
              <div>Jeu</div>
              <div>Ven</div>
              <div>Sam</div>
              <div>Dim</div>
            </div>

            {/* Table Body (6 weeks = 42 days) */}
            <div className="grid grid-cols-7 grid-rows-6 divide-y divide-x divide-slate-100 dark:divide-slate-800/80 bg-slate-100/30 dark:bg-slate-950/10">
              {monthDays.map((day, idx) => {
                const dayVisits = getFilteredVisites().filter(v => v.date === day.dateStr && v.status !== 'Annulée');
                const isToday = day.dateStr === todayStr;
                return (
                  <div 
                    key={day.dateStr + '-' + idx} 
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropMonth(e, day.dateStr)}
                    className={`p-2 min-h-[105px] flex flex-col gap-1.5 ${
                      day.isCurrentMonth 
                        ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200' 
                        : 'bg-slate-50/50 dark:bg-slate-950/20 text-slate-400 dark:text-slate-600'
                    } ${isToday ? 'ring-2 ring-inset ring-accent/60' : ''}`}
                  >
                    {/* Day number header */}
                    <div className="flex justify-between items-center select-none">
                      <span className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ${
                        isToday 
                          ? 'bg-accent text-brand-950 font-black' 
                          : day.isCurrentMonth ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'
                      }`}>
                        {day.dayNum}
                      </span>
                      {dayVisits.length > 0 && (
                        <span className="bg-brand-900 text-white dark:bg-accent dark:text-brand-950 text-[7.5px] font-black px-1.5 py-0.5 rounded-full shrink-0">
                          {dayVisits.length} {dayVisits.length > 1 ? 'visites' : 'visite'}
                        </span>
                      )}
                    </div>

                    {/* Visits list */}
                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto max-h-[75px] scrollbar-thin">
                      {dayVisits.map(vis => (
                        <div 
                          key={vis.id} 
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, vis.id)}
                          onClick={(e) => { e.stopPropagation(); setSelectedVisit(vis); }}
                          onContextMenu={(e) => handleContextMenu(e, vis.id)}
                          className={`p-1 px-1.5 rounded-lg text-[8.5px] leading-tight space-y-0.5 hover:border-accent dark:hover:border-accent transition-all shadow-2xs truncate cursor-pointer select-none ${
                            vis.status === 'Réalisée'
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-300'
                              : vis.status === 'Annulée'
                                ? 'bg-red-50/50 dark:bg-red-950/20 text-red-400 border border-red-100/50 dark:border-red-900/20 opacity-50'
                                : isVisitPast(vis.date, vis.time)
                                  ? 'bg-slate-50 dark:bg-slate-950/55 text-slate-400 border border-slate-200 dark:border-slate-800 opacity-60'
                                  : 'bg-amber-50/80 dark:bg-amber-950/30 border border-amber-100/50 dark:border-amber-900/30 text-amber-900 dark:text-amber-300'
                          }`}
                          title={`${vis.clientName} - ${vis.time} - ${vis.address}`}
                        >
                          <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                            <span className="truncate max-w-[65px]">{vis.clientName}</span>
                            <span className="text-[7.5px] text-accent font-bold shrink-0">{vis.time}</span>
                          </div>
                          <div className="text-slate-400 text-[7.5px] truncate flex items-center gap-0.5 font-medium">
                            <User size={8} /> {vis.commercialAssigned.split(' ')[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl max-w-lg w-full overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
              <div>
                <span className="text-[10px] uppercase font-black text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800 mr-2">
                  {selectedVisit.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  selectedVisit.status === 'Planifiée' ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400' :
                  selectedVisit.status === 'Réalisée' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                  selectedVisit.status === 'Annulée' ? 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400' :
                  'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                }`}>
                  {selectedVisit.status}
                </span>
              </div>
              <button 
                onClick={() => setSelectedVisit(null)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold cursor-pointer"
              >
                Fermer [X]
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">{selectedVisit.clientName}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Adresse</span>
                      <a 
                        href={`https://maps.google.com/?q=${encodeURIComponent(selectedVisit.address)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-brand-900 dark:text-accent font-semibold hover:underline"
                      >
                        {selectedVisit.address}
                      </a>
                    </div>
                  </div>

                  {selectedVisit.phone && (
                    <div className="flex items-start gap-2.5">
                      <Phone size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Téléphone</span>
                        <a href={`tel:${selectedVisit.phone}`} className="font-semibold hover:underline">
                          {selectedVisit.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5">
                    <Calendar size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Rendez-vous</span>
                      <span className="font-semibold text-slate-900 dark:text-white capitalize">
                        {selectedVisit.date.split('-').reverse().join('/')} à {selectedVisit.time}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5">
                      <User size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Commercial Évaluateur</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{selectedVisit.commercialAssigned}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Box size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-400 block text-[10px] uppercase">Volume estimé</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {selectedVisit.volumeEstimated ? `${selectedVisit.volumeEstimated} m³` : 'Non défini'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Grid size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Type de visite</span>
                      {getVisitModeBadge(selectedVisit.visitMode)}
                    </div>
                  </div>
                </div>
              </div>

              {selectedVisit.notes && (
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl italic text-[11px]">
                  <span className="font-bold not-italic block mb-1 text-slate-400 uppercase tracking-wide text-[9px]">Notes post-visite / consignes</span>
                  "{selectedVisit.notes}"
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedVisit(null);
                  handleAction('edit', selectedVisit.id);
                }}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-black text-slate-700 dark:text-slate-300 cursor-pointer transition-all"
              >
                Modifier
              </button>
              {selectedVisit.status === 'Planifiée' && (
                <button
                  onClick={() => {
                    updateVisitStatus(selectedVisit.id, 'Réalisée');
                    setSelectedVisit(null);
                  }}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-500/10 rounded-xl text-xs font-black cursor-pointer transition-all"
                >
                  Effectuée
                </button>
              )}
              {selectedVisit.status === 'Planifiée' && (
                <button
                  onClick={() => {
                    updateVisitStatus(selectedVisit.id, 'Annulée');
                    setSelectedVisit(null);
                  }}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 border border-red-500/10 rounded-xl text-xs font-black cursor-pointer transition-all"
                >
                  Annuler la visite
                </button>
              )}
              <button
                onClick={() => {
                  const id = selectedVisit.id;
                  setSelectedVisit(null);
                  deleteVisit(id);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black cursor-pointer transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div 
            className="fixed inset-0 z-40 cursor-default" 
            onClick={() => setContextMenu(null)}
            onContextMenu={(e) => { e.preventDefault(); setContextMenu(null); }}
          />
          <div 
            className="fixed z-50 min-w-[160px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl py-1.5 text-xs text-slate-700 dark:text-slate-200 animate-fade-in"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button
              onClick={() => handleAction('edit', contextMenu.visitId)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              Modifier la visite
            </button>
            <button
              onClick={() => handleAction('done', contextMenu.visitId)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-emerald-600 dark:text-emerald-400"
            >
              Marquer réalisée
            </button>
            <button
              onClick={() => handleAction('cancel', contextMenu.visitId)}
              className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-amber-600 dark:text-amber-400"
            >
              Annuler la visite
            </button>
            <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
            <button
              onClick={() => handleAction('delete', contextMenu.visitId)}
              className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold flex items-center gap-2 transition-colors cursor-pointer text-red-600 dark:text-red-400"
            >
              Supprimer
            </button>
          </div>
        </>
      )}

    </div>
  );
}
