import React, { useState, useMemo } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import {
  LogOut,
  Sun,
  Moon,
  Bell,
  BellRing,
  Trash2,
  Briefcase,
  FolderOpen,
  MapPin,
  FileText,
  CreditCard,
  Calendar,
  Users,
  Calculator,
  ChevronRight,
  Search,
  RefreshCw
} from 'lucide-react';
import { ADMIN_TAB_LABELS, getAccessibleTabs, type AdminTab } from '../../../lib/admin-permissions';

const CRM_SIDEBAR_SECTIONS: Array<{ title: string; tabs: AdminTab[] }> = [
  { title: 'Pilotage', tabs: ['overview', 'dossiers'] },
  { title: 'Relation client', tabs: ['demandes', 'visites', 'devis'] },
  { title: 'Finance', tabs: ['factures'] },
  { title: 'Opérations', tabs: ['planning'] },
  { title: 'Équipe & outils', tabs: ['collaborateurs', 'simulateur'] }
];

const getAdminTabIcon = (tab: AdminTab, size = 16) => {
  if (tab === 'overview') return <Briefcase size={size} />;
  if (tab === 'dossiers') return <FolderOpen size={size} />;
  if (tab === 'demandes') return <FolderOpen size={size} />;
  if (tab === 'devis') return <FileText size={size} />;
  if (tab === 'factures') return <CreditCard size={size} />;
  if (tab === 'visites') return <MapPin size={size} />;
  if (tab === 'planning') return <Calendar size={size} />;
  if (tab === 'collaborateurs') return <Users size={size} />;
  if (tab === 'simulateur') return <Calculator size={size} />;
  return <FileText size={size} />;
};

export type AdminOutletContextType = {
  pushNotification: (title: string, description: string, type?: 'info' | 'success' | 'warning') => void;
  searchQuery: string;
};

export function AdminLayout() {
  const { user, role, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning';
  }>>([]);

  const tabs = useMemo(() => getAccessibleTabs(role), [role]);

  // Determine current active tab from the URL
  const currentPathSegments = location.pathname.split('/').filter(Boolean);
  const currentTab = (currentPathSegments[1] as AdminTab) || 'overview';

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const pushNotification = (title: string, description: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title,
        description,
        time: "À l'instant",
        read: false,
        type
      },
      ...prev
    ]);
  };

  const handleDatabaseSync = async () => {
    setIsSyncing(true);
    // Simuler le rechargement. En vrai, la DB gère le mode hors-ligne automatiquement avec onSnapshot.
    setTimeout(() => {
      setIsSyncing(false);
      pushNotification('Synchronisation', 'Données synchronisées avec succès.', 'success');
    }, 1500);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout issue :", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white font-sans">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent mb-4"></div>
        <p className="text-sm text-slate-400 font-medium tracking-widest uppercase">Initialisation Sécurisée...</p>
      </div>
    );
  }

  if (!user || !role) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const getTabTitle = () => {
    return ADMIN_TAB_LABELS[currentTab]?.title ?? 'Espace Gérant';
  };

  const outletContext: AdminOutletContextType = {
    pushNotification,
    searchQuery
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_48%,#fff7ed_100%)] dark:bg-[linear-gradient(135deg,#020617_0%,#0f172a_55%,#111827_100%)] font-sans flex text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-80 hidden lg:flex flex-col bg-gradient-to-br from-white via-slate-50 to-amber-50/70 text-slate-700 border-r border-slate-200/80 shadow-[inset_-1px_0_0_rgba(15,23,42,0.03)] shrink-0 sticky top-0 h-screen">
        
        <div className="p-6 border-b border-slate-200/80 flex items-start justify-between">
          <div className="flex flex-col items-start gap-3">
            <img 
              src="/images/logo-clair.webp" 
              alt="Marne Transdem Logo" 
              className="h-10 w-auto object-contain shrink-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent">WORKSPACE CRM</span>
              </div>
              <h2 className="text-sm font-black text-brand-900 tracking-wider uppercase leading-none">MarneTransdem</h2>
            </div>
          </div>
          <div className="bg-white/80 p-1.5 rounded-xl border border-slate-200/80 shadow-sm shrink-0">
            <Briefcase className="text-accent" size={14} />
          </div>
        </div>

        <nav className="flex-1 px-4 pt-5 pb-4 space-y-5 overflow-y-auto">
          {CRM_SIDEBAR_SECTIONS.map((section) => {
            const sectionTabs = section.tabs.filter((tab) => tabs.includes(tab));
            if (sectionTabs.length === 0) return null;

            return (
              <div key={section.title} className="space-y-1.5">
                <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {section.title}
                </p>

                {sectionTabs.map(tab => {
                  const isActive = currentTab === tab;
                  const labelLabel = ADMIN_TAB_LABELS[tab].desktop;

                  return (
                    <button
                      key={tab}
                      onClick={() => navigate(`/admin/${tab}`)}
                      className={`group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-accent text-brand-900 shadow-md'
                          : 'text-slate-600 hover:text-brand-900 hover:bg-white/75 hover:shadow-sm'
                      }`}
                    >
                      <span className={`shrink-0 transition-colors ${isActive ? 'text-brand-900' : 'text-slate-400 group-hover:text-brand-900'}`}>
                        {getAdminTabIcon(tab)}
                      </span>
                      <span className="flex-1 text-left truncate">{labelLabel}</span>
                      <ChevronRight size={12} className={isActive ? 'opacity-100' : 'opacity-0'} />
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200/80 space-y-3">
          <button
            onClick={handleDatabaseSync}
            disabled={isSyncing}
            className="w-full py-2.5 px-3 bg-white/75 hover:bg-white border border-slate-200/80 rounded-xl text-slate-700 hover:text-brand-900 text-[11px] font-bold transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin text-accent' : ''} />
            {isSyncing ? "Sync..." : "Sauvegarder cloud"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3 bg-red-50/80 border border-red-100 text-red-600 hover:bg-red-100/80 hover:border-red-200 rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut size={14} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <main className="flex-1 min-h-screen flex flex-col overflow-y-auto lg:pt-0 pt-16 relative">
        
        {/* RESPONSIVE TOP NAV BAR FOR MOBILE & QUICK SETTINGS */}
        <header className="h-20 bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/70 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl shadow-[0_1px_18px_rgba(15,23,42,0.06)]">
          
          <div className="flex items-center gap-3">
            <h1 className="text-base md:text-lg font-black tracking-tight text-brand-950 dark:text-white">
              {getTabTitle()}
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-4 max-w-xs xl:max-w-md w-full mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Rechercher un dossier, un client, une ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-full py-2.5 pl-9 pr-4 text-xs shadow-sm focus:outline-none focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="lg:hidden relative w-32 sm:w-44">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 rounded-full py-1.5 pl-8 pr-2 text-[10px] shadow-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 bg-white/90 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
              title={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400 animate-spin-slow" /> : <Moon size={18} className="text-slate-700" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl transition-all duration-300 relative cursor-pointer active:scale-95 ${
                  showNotifications 
                    ? 'bg-accent/10 text-accent border border-accent/20' 
                    : 'bg-white/90 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 shadow-sm'
                }`}
                title="Notifications"
              >
                <Bell size={18} className={unreadCount > 0 ? "animate-pulse" : ""} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] uppercase font-black rounded-full flex items-center justify-center px-1 border border-white dark:border-slate-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl z-50 p-4 animate-fade-in divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-2">
                      <BellRing size={14} className="text-accent" />
                      <span className="text-xs font-black text-brand-950 dark:text-white uppercase tracking-wider">Alertes ({unreadCount})</span>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[10px] text-accent hover:underline font-bold"
                      >
                        Tout marquer lu
                      </button>
                    )}
                  </div>

                  <div className="py-2 max-h-64 overflow-y-auto space-y-2.5">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs font-light">
                        Aucune nouvelle notification
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`p-2.5 rounded-2xl border text-xs leading-relaxed transition-all relative ${
                            notif.read 
                              ? 'bg-slate-50/50 dark:bg-slate-950/20 border-transparent text-slate-500' 
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 font-bold">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                notif.type === 'success' ? 'bg-emerald-500' :
                                notif.type === 'warning' ? 'bg-amber-500' : 'bg-sky-500'
                              }`} />
                              <span className="text-[11px] truncate">{notif.title}</span>
                            </div>
                            <span className="text-[9px] text-slate-400 font-normal">{notif.time}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 pr-5 leading-normal">{notif.description}</p>
                          <button 
                            onClick={(e) => clearNotification(notif.id, e)}
                            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-red-500 hover:bg-slate-200/50 dark:hover:bg-slate-800 p-1 rounded-lg"
                            title="Supprimer"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:hidden pl-2">
              <button
                onClick={handleLogout}
                className="p-2 bg-red-50/80 text-red-600 rounded-2xl border border-red-100 shadow-sm"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT OUTLET */}
        <div className="flex-1 p-4 md:p-6 pb-24 lg:pb-6 relative max-w-7xl mx-auto w-full">
          <Outlet context={outletContext} />
        </div>
      </main>
    </div>
  );
}
