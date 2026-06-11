import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSyncedCollection } from '../../hooks/useData';
import { Visite, UserProfile } from '../../types';
import { 
  Plus, MapPin, Check, Calendar, Grid, ChevronLeft, ChevronRight, 
  Trash2, AlertTriangle, Phone, Box, HelpCircle, User, Compass
} from 'lucide-react';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

interface AdminVisitesProps {
  searchQuery?: string;
}

export function AdminVisites({ searchQuery }: AdminVisitesProps) {
  const context = useOutletContext<AdminOutletContextType>();
  const activeSearchQuery = searchQuery || context?.searchQuery || '';

  const [visites, setVisites] = useSyncedCollection<Visite>('visites');
  const [collaborateurs] = useSyncedCollection<UserProfile>('collaborateurs');

  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [showAddVisite, setShowAddVisite] = useState(false);
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

  const createTechnicalVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `VIS-00${visites.length + 1}`;
    const item: Visite = {
      id,
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

  const getFilteredVisites = (): Visite[] => {
    if (!activeSearchQuery) return visites;
    const query = activeSearchQuery.toLowerCase();
    return visites.filter(item => 
      item.clientName.toLowerCase().includes(query) || 
      item.id.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query) ||
      item.commercialAssigned.toLowerCase().includes(query)
    );
  };

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
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Grid size={14} /> Liste
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                viewMode === 'calendar' 
                  ? 'bg-white dark:bg-slate-900 shadow-sm text-brand-900 dark:text-white' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar size={14} /> Semaine
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
            <h3 className="text-sm font-black uppercase text-brand-900 dark:text-white">Programmer une Nouvelle Visite</h3>
            <button onClick={() => setShowAddVisite(false)} className="text-slate-400 hover:text-slate-900 text-xs font-bold">Fermer [X]</button>
          </div>
          <form onSubmit={createTechnicalVisit} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
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
                Consigner la visite au planning
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredVisites().map((vis) => (
            <div 
              key={vis.id} 
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all ${
                vis.status === 'Annulée' 
                  ? 'border-red-100 dark:border-red-950/20 opacity-60' 
                  : 'border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase font-black text-slate-400 bg-slate-100 dark:bg-slate-955 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800">
                  {vis.id}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                  vis.status === 'Planifiée' ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400' :
                  vis.status === 'Réalisée' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' :
                  vis.status === 'Annulée' ? 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400' :
                  'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                }`}>
                  {vis.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-black text-slate-900 dark:text-white text-sm leading-tight">{vis.clientName}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light flex items-center gap-1">
                  <MapPin size={12} className="text-accent shrink-0" /> {vis.address}
                </p>
                {vis.phone && (
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
                    <Phone size={10} className="text-slate-400" /> {vis.phone}
                  </p>
                )}
              </div>

              {/* Volume & visit mode */}
              <div className="flex gap-2 flex-wrap items-center">
                {getVisitModeBadge(vis.visitMode)}
                {vis.volumeEstimated ? (
                  <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-350 text-[9px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1 border border-emerald-100 dark:border-emerald-900/30">
                    <Box size={10} /> Vol. estimé: {vis.volumeEstimated} m³
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 text-[9px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                    <HelpCircle size={10} /> Volume non défini
                  </span>
                )}
              </div>

              {vis.notes && (
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-2.5 rounded-xl text-[10px] text-slate-500 dark:text-slate-400 italic">
                  <span className="font-bold not-italic block mb-0.5 text-slate-400 uppercase tracking-wide text-[8px]">Notes</span>
                  "{vis.notes}"
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Rendez-vous</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{vis.date.split('-').reverse().join('/')} à {vis.time}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold">Commercial</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{vis.commercialAssigned}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2">
                {vis.status === 'Planifiée' && (
                  <button
                    onClick={() => updateVisitStatus(vis.id, 'Réalisée')}
                    className="flex-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-500/10 py-2 rounded-xl text-[10px] font-black cursor-pointer transition-all text-center block"
                  >
                    Visite effectuée
                  </button>
                )}
                {vis.status === 'Planifiée' && (
                  <button
                    onClick={() => updateVisitStatus(vis.id, 'Annulée')}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 border border-red-500/10 rounded-xl text-[10px] font-black cursor-pointer transition-all"
                  >
                    Annuler
                  </button>
                )}
                <button
                  onClick={() => deleteVisit(vis.id)}
                  className="p-2 bg-slate-50 hover:bg-red-50 hover:text-red-600 dark:bg-slate-950 dark:hover:bg-red-950/20 text-slate-400 border border-slate-200/50 dark:border-slate-800 rounded-xl transition-all cursor-pointer"
                  title="Supprimer définitivement"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
          {getFilteredVisites().length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400 font-light border-2 border-dashed rounded-3xl">
              Aucune visite programmée trouvée.
            </div>
          )}
        </div>
      )}

      {/* Calendar Week View */}
      {viewMode === 'calendar' && (
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
                        className={`p-2 border-r border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5 justify-center ${
                          day.dateStr === todayStr ? 'bg-slate-50/50 dark:bg-slate-950/20' : ''
                        }`}
                      >
                        {cellVisits.map(vis => (
                          <div 
                            key={vis.id} 
                            className="bg-brand-50/90 dark:bg-slate-955 p-2 rounded-xl border border-brand-100/50 dark:border-slate-800 text-[10px] leading-tight space-y-1 hover:border-accent dark:hover:border-accent transition-all shadow-sm"
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

    </div>
  );
}
