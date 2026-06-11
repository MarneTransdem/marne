import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Bell, Trash2, BellRing } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { PublicRequests } from '../components/admin/PublicRequests';
import { PdfGenerator } from '../components/admin/PdfGenerator';
import { DocumentTemplates } from '../components/admin/DocumentTemplates';
import { AdminDevis } from './admin/AdminDevis';
import { AdminVisites } from './admin/AdminVisites';
import { AdminFactures } from './admin/AdminFactures';
import { AdminPlanning } from './admin/AdminPlanning';
import { AdminCollaborateurs } from './admin/AdminCollaborateurs';
import { AdminDemandes } from './admin/AdminDemandes';
import { useSyncedCollection } from '../hooks/useData';
import { Devis, Facture, Visite, Demenagement, UserProfile, FieldMover, FieldTruck, Role } from '../types';
import { 
  LogOut, 
  User, 
  UserPlus,
  Edit,
  X,
  FileText, 
  Calendar, 
  Users, 
  CheckSquare, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Truck, 
  Search, 
  Plus, 
  Check, 
  ChevronRight, 
  Coins, 
  Building, 
  Calculator, 
  CreditCard,
  FileSpreadsheet,
  RefreshCw,
  FolderOpen,
  SlidersHorizontal,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye
} from 'lucide-react';

const SEED_DEVIS: Devis[] = [
  { id: 'DEV-2026-001', clientName: 'Gérard Depardieu', phone: '06 12 34 56 78', fromCity: 'Paris (75)', toCity: 'Bordeaux (33)', volume: 45, formula: 'Luxe', price: 3450, date: '2026-06-24', createdAt: '2026-05-18', status: 'Signé' },
  { id: 'DEV-2026-002', clientName: 'Sophie Marceau', phone: '06 98 76 54 32', fromCity: 'Nanterre (92)', toCity: 'Lyon (69)', volume: 18, formula: 'Standard', price: 1720, date: '2026-07-10', createdAt: '2026-05-19', status: 'Signé' },
  { id: 'DEV-2026-003', clientName: 'Jean Dujardin', phone: '07 43 21 89 67', fromCity: 'Boulogne-Billancourt (92)', toCity: 'Marseille (13)', volume: 32, formula: 'Économique', price: 2100, date: '2026-06-05', createdAt: '2026-05-10', status: 'Brouillon' },
  { id: 'DEV-2026-004', clientName: 'Marion Cotillard', phone: '06 55 44 33 22', fromCity: 'Versailles (78)', toCity: 'Nantes (44)', volume: 55, formula: 'Luxe', price: 4200, date: '2026-08-15', createdAt: '2026-05-15', status: 'Envoyé' },
  { id: 'DEV-2026-005', clientName: 'Omar Sy', phone: '06 11 22 33 44', fromCity: 'Montreuil (93)', toCity: 'Lille (59)', volume: 22, formula: 'Standard', price: 1450, date: '2026-06-18', createdAt: '2026-05-20', status: 'Envoyé' }
];

const SEED_FACTURES: Facture[] = [
  { id: 'FAC-2026-001', devisId: 'DEV-2026-001', clientName: 'Gérard Depardieu', amount: 3450, date: '2026-05-19', dueDate: '2026-06-19', status: 'Payée' },
  { id: 'FAC-2026-002', devisId: 'DEV-2026-002', clientName: 'Sophie Marceau', amount: 1720, date: '2026-05-20', dueDate: '2026-06-20', status: 'En attente' }
];

const SEED_VISITES: Visite[] = [
  { id: 'VIS-001', clientName: 'Pierre Niney', address: '12 Rue de la Paix, Paris', phone: '06 88 77 66 55', date: '2026-05-22', time: '14:30', commercialAssigned: 'Jean-Marc Tardieu', status: 'Planifiée' },
  { id: 'VIS-002', clientName: 'Albert Dupontel', address: '45 Avenue Foch, Saint-Cloud', phone: '06 44 33 22 11', date: '2026-05-20', time: '10:00', volumeEstimated: 40, commercialAssigned: 'Michel Blanc-Sec', status: 'Réalisée' },
  { id: 'VIS-003', clientName: 'Leïla Bekhti', address: '8 Rue Caulaincourt, Paris 18', phone: '07 12 45 78 90', date: '2026-05-25', time: '11:00', commercialAssigned: 'Jean-Marc Tardieu', status: 'Planifiée' }
];

const SEED_DEMENAGEMENTS: Demenagement[] = [
  { id: 'DEM-001', clientName: 'Sophie Marceau', devisId: 'DEV-2026-002', volume: 18, fromCity: 'Nanterre (92)', toCity: 'Lyon (69)', date: '2026-07-10', teamLeader: 'Hervé Le Gall', status: 'Programmé', crewSize: 2 },
  { id: 'DEM-002', clientName: 'Gérard Depardieu', devisId: 'DEV-2026-001', volume: 45, fromCity: 'Paris (75)', toCity: 'Bordeaux (33)', date: '2026-06-24', teamLeader: 'Ahmed Bensalah', status: 'Programmé', crewSize: 4 }
];

const SEED_COLLABORATEURS: UserProfile[] = [
  { uid: 'u1', email: 'contact@marnetransdem.com', role: 'gérant', name: 'Alain Delon (Gérant)', status: 'Actif' },
  { uid: 'u2', email: 'secretaire@marnetransdem.com', role: 'secrétaire', name: 'Corinne Masson', status: 'Actif' },
  { uid: 'u3', email: 'commercial@marnetransdem.com', role: 'commercial', name: 'Jean-Marc Tardieu', status: 'Actif' },
  { uid: 'u4', email: 'chef@marnetransdem.com', role: 'chef_equipe', name: 'Hervé Le Gall (Chef Équipe 1)', status: 'Actif' },
  { uid: 'u5', email: 'ahmed@marnetransdem.com', role: 'chef_equipe', name: 'Ahmed Bensalah (Chef Équipe 2)', status: 'Actif' }
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

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [devisList, setDevisList] = useSyncedCollection<Devis>('devis', SEED_DEVIS);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');


  // Notification and Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning';
  }>>([
    {
      id: 'notif-1',
      title: 'Devis signé ! ✍️',
      description: 'M. Gérard Depardieu a signé le devis DEV-2026-001.',
      time: 'Il y a 5 min',
      read: false,
      type: 'success'
    },
    {
      id: 'notif-2',
      title: 'Visite programmée 📍',
      description: 'Visite technique programmée chez Mme Robert demain à 14h.',
      time: 'Il y a 1 heure',
      read: false,
      type: 'warning'
    },
    {
      id: 'notif-3',
      title: 'Base synchronisée ☁️',
      description: 'Tous vos dossiers de déménagement locaux sont à jour.',
      time: 'Il y a 3 heures',
      read: true,
      type: 'info'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  // Real-time state management (seeded via localStorage for incredible persistence and live UI interactivity)
  const [factures, setFactures] = useSyncedCollection<Facture>('factures', SEED_FACTURES);
  const [visites, setVisites] = useSyncedCollection<Visite>('visites', SEED_VISITES);
  const [demenagements, setDemenagements] = useSyncedCollection<Demenagement>('demenagements', SEED_DEMENAGEMENTS);
  const [collaborateurs, setCollaborateurs] = useSyncedCollection<UserProfile>('collaborateurs', SEED_COLLABORATEURS);

  // States for physical Movers (terrain team)
  const [movers, setMovers] = useSyncedCollection<FieldMover>('movers', SEED_MOVERS);

  // States for physical Trucks (véhicules flotte)
  const [trucks, setTrucks] = useSyncedCollection<FieldTruck>('trucks', SEED_TRUCKS);

  // Target Move ID for crew/mover assignment panel
  const [assigningMoveId, setAssigningMoveId] = useState<string | null>(null);

  // Rapid Volumetric Estimator (Commercial feature)
  const [rapidRooms, setRapidRooms] = useState({
    salon: 1,
    chambre: 2,
    cuisine: 1,
    cave: 0,
    bureau: 0
  });
  const [customMultiplier, setCustomMultiplier] = useState(10); // average m3 per bedroom
  const [rapidResult, setRapidResult] = useState<number>(30);

  // PDF & Document templates selector states
  const [selectedPdfDoc, setSelectedPdfDoc] = useState<{ type: 'devis' | 'facture', data: any } | null>(null);
  const [selectedMoveDoc, setSelectedMoveDoc] = useState<any | null>(null);

  // Sync / loading action states
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Load and seed initial database schemas is handled by real-time Firestore synchronization hooks!

  // Sync to Firestore for real persistent capability sync
  const handleDatabaseSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      // Create user role profile in Firestore for safe tracking
      if (user) {
        console.log("Checking permissions, user.uid:", user.uid);
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          role: role,
          lastSyncAt: new Date().toISOString()
        }, { merge: true });
        console.log("Sync success!");
      }

      // Read back live state
      setSyncMessage("Synchronisation avec Cloud Firestore réussie !");
    } catch (err: any) {
      console.error("Firestore sync fail :", err);
      setSyncMessage("Échec de synchronisation : " + (err.message || String(err)));
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  // Live rapid multiplier logic
  useEffect(() => {
    const totalRooms = rapidRooms.salon + rapidRooms.chambre + rapidRooms.cuisine + rapidRooms.cave + rapidRooms.bureau;
    const baseEst = totalRooms * customMultiplier;
    setRapidResult(baseEst > 0 ? baseEst : 10);
  }, [rapidRooms, customMultiplier]);

  // Loading indicator for mounting
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white font-sans">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent mb-4"></div>
        <p className="text-sm text-slate-400 font-medium tracking-widest uppercase">Initialisation Securisée...</p>
      </div>
    );
  }

  // Not logged in or anonymous user redirection
  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  // Role permissions enforcement mapping
  const getAccessibleTabs = (userRole: Role) => {
    switch (userRole) {
      case 'gérant': 
        return ['overview', 'demandes', 'devis', 'factures', 'visites', 'planning', 'collaborateurs'];
      case 'secrétaire': 
        return ['demandes', 'devis', 'factures', 'visites', 'planning'];
      case 'commercial': 
        return ['demandes', 'visites', 'planning', 'simulateur'];
      case 'chef_equipe': 
        return ['planning'];
      default: 
        return [];
    }
  };

  const tabs = getAccessibleTabs(role);
  if (!tabs.includes(activeTab)) {
    setActiveTab(tabs[0] || 'planning');
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout issue :", err);
    }
  };

  const updateQuoteStatus = (id: string, newStatus: Devis['status']) => {
    const updated = devisList.map(q => q.id === id ? { ...q, status: newStatus } : q);
    setDevisList(updated);
    localStorage.setItem('mt_devis', JSON.stringify(updated));
  };

  const updateInvoiceStatus = (id: string, newStatus: Facture['status']) => {
    const updated = factures.map(f => f.id === id ? { ...f, status: newStatus } : f);
    setFactures(updated);
    localStorage.setItem('mt_factures', JSON.stringify(updated));
  };


  const updateMoveStatus = (id: string, newStatus: Demenagement['status']) => {
    const updated = demenagements.map(d => d.id === id ? { ...d, status: newStatus } : d);
    setDemenagements(updated);
    localStorage.setItem('mt_demenagements', JSON.stringify(updated));
  };

  // Convert volume estimate directly into a new draft quote
  const convertEstimateToDraftQuote = () => {
    const id = `DEV-2026-00${devisList.length + 1}`;
    const calculatedPrice = rapidResult * 45; // average 45€ per m3
    const newDraft: Devis = {
      id,
      clientName: 'Estimation Commerciale Express',
      phone: 'À renseigner',
      fromCity: 'Paris et Île-de-France',
      toCity: 'À renseigner',
      volume: rapidResult,
      formula: 'Standard',
      price: calculatedPrice,
      date: new Date(Date.now() + 15 * 24 * 3600 * 1000).toISOString().split('T')[0], // 15 days later ready
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Brouillon'
    };

    const updated = [newDraft, ...devisList];
    setDevisList(updated);
    localStorage.setItem('mt_devis', JSON.stringify(updated));
    setActiveTab('devis');
  };



  // Handler to assign crew and truck to a move (Déménagement)
  const handleAssignCrewToMove = (moveId: string, assignedMoversList: string[], assignedTruckPlate: string) => {
    const updated = demenagements.map(d => {
      if (d.id === moveId) {
        return {
          ...d,
          assignedMovers: assignedMoversList,
          assignedTruck: assignedTruckPlate,
          crewSize: assignedMoversList.length + 1 // including team leader
        };
      }
      return d;
    });
    setDemenagements(updated);
    localStorage.setItem('mt_demenagements', JSON.stringify(updated));
    setAssigningMoveId(null);

    // Update status to "Programmé" as it is now staffed
    const move = demenagements.find(d => d.id === moveId);
    if (move && move.status === 'À planifier') {
      updateMoveStatus(moveId, 'Programmé');
    }

    // Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Équipage de Terrain Affecté 🎯',
      description: `L'équipe de déménagement (${assignedMoversList.length} équipiers + camion ${assignedTruckPlate}) est maintenant affectée au chantier de ${move?.clientName || 'Client'}.`,
      time: "À l'instant",
      read: false,
      type: 'success' as const
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Helper methods migrated to modular components

  // Calculate sum counts for beautiful display metrics cards
  const activeInvoicesSum = factures.reduce((acc, current) => acc + (current.status === 'Payée' ? current.amount : 0), 0);
  const pendingInvoicesSum = factures.reduce((acc, current) => acc + (current.status === 'En attente' ? current.amount : 0), 0);
  
  // Custom styled label backgrounds
  const getFormulaBadgeColor = (formula: Devis['formula']) => {
    switch(formula) {
      case 'Luxe': return 'bg-amber-100 text-amber-900 border border-amber-200';
      case 'Standard': return 'bg-sky-100 text-sky-950 border border-sky-200';
      case 'Économique': return 'bg-emerald-100 text-emerald-950 border border-emerald-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return "Tableau de Bord";
      case 'demandes': return "Demandes Clients (Web)";
      case 'devis': return "Gestion des Devis";
      case 'factures': return "Factures & Règl.";
      case 'visites': return "Visites Techniques";
      case 'planning': return "Plannings Logistiques";
      case 'collaborateurs': return "Liste Équipe";
      case 'simulateur': return "Calculateur Volume";
      default: return "Espace Gérant";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* LEFT SIDEBAR - HIGHLY SOPHISTICATED NEUTRAL/DARK SIDEBAR */}
      <aside className="w-80 hidden lg:flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 sticky top-0 h-screen">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-start justify-between">
          <div className="flex flex-col items-start gap-3">
            <img 
              src="/images/logo-sombre.webp" 
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
              <h2 className="text-sm font-black text-white tracking-wider uppercase leading-none">MarneTransdem</h2>
            </div>
          </div>
          <div className="bg-slate-800/70 p-1.5 rounded-xl border border-slate-700/50 shrink-0">
            <Briefcase className="text-accent" size={14} />
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 my-6 p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-800/40 border border-slate-800/50 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border-2 border-accent">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white truncate">{user.email}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span className="text-[10px] text-slate-400 capitalize font-bold">{role}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/70">
            <span className="text-slate-400 font-medium">Auto-Sauvegarde</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Check size={10} /> LocalStorage
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">CONTRÔLES PRINCIPAUX</p>
          
          {tabs.map(tab => {
            const isActive = activeTab === tab;
            let icon = <FileText size={16} />;
            let labelLabel = tab.toUpperCase();

            if (tab === 'overview') { icon = <TrendingUp size={16} />; labelLabel = "Vue d'ensemble"; }
            if (tab === 'demandes') { icon = <FolderOpen size={16} />; labelLabel = 'Demandes Publics'; }
            if (tab === 'devis') { icon = <FileText size={16} />; labelLabel = 'Devis clients'; }
            if (tab === 'factures') { icon = <CreditCard size={16} />; labelLabel = 'Factures & Règl.'; }
            if (tab === 'visites') { icon = <MapPin size={16} />; labelLabel = 'Visites Techniques'; }
            if (tab === 'planning') { icon = <Calendar size={16} />; labelLabel = 'Plannings des équipes'; }
            if (tab === 'collaborateurs') { icon = <Users size={16} />; labelLabel = 'Liste Équipe'; }
            if (tab === 'simulateur') { icon = <Calculator size={16} />; labelLabel = 'Calcul Volume rapide'; }

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-accent text-brand-900 shadow-md transform translate-x-2'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {icon}
                <span className="flex-1 text-left">{labelLabel}</span>
                <ChevronRight size={12} className={isActive ? 'opacity-100' : 'opacity-0'} />
              </button>
            );
          })}
        </nav>

        {/* Footer actions inside Sidebar */}
        <div className="p-4 border-t border-slate-800/85 space-y-3">
          <button
            onClick={handleDatabaseSync}
            disabled={isSyncing}
            className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-slate-300 hover:text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin text-accent' : ''} />
            {isSyncing ? "Sync..." : "Sauvegarder cloud"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/20 hover:border-red-800/40 rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut size={14} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <main className="flex-1 min-h-screen flex flex-col overflow-y-auto lg:pt-0 pt-16">
        
        {/* RESPONSIVE TOP NAV BAR FOR MOBILE & QUICK SETTINGS */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
          
          {/* Left section: Tab Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-sm md:text-base lg:text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">
              {getTabTitle()}
            </h1>
          </div>

          {/* Middle section: Quick Search */}
          <div className="hidden lg:flex items-center gap-4 max-w-xs xl:max-w-md w-full mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Rechercher un dossier, un client, une ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-accent dark:focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Right section: Actions (notifications / toggle theme / user profile dropdown) */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Quick Mobile Search */}
            <div className="lg:hidden relative w-32 sm:w-44">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-1.5 pl-8 pr-2 text-[10px] focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* THEME TOGGLE ICON */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-300 cursor-pointer active:scale-95"
              title={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400 animate-spin-slow" /> : <Moon size={18} className="text-slate-700" />}
            </button>

            {/* NOTIFICATION BELL */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                }}
                className={`p-2 rounded-xl transition-all duration-300 relative cursor-pointer active:scale-95 ${
                  showNotifications 
                    ? 'bg-accent/10 text-accent border border-accent/20' 
                    : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300'
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

              {/* Notification Dropdown Container */}
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

                  <div className="pt-3 text-center">
                    <span className="text-[10px] text-slate-400 italic">Central d'alertes MarneTransdem</span>
                  </div>
                </div>
              )}
            </div>

            {/* USER PORTFOLIO / PROFILE */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
                className={`flex items-center gap-2 p-1.5 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 ${
                  showProfileDropdown 
                    ? 'bg-slate-100 dark:bg-slate-800 border border-accent/20' 
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-transparent'
                }`}
                title="Mon profil"
              >
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center border-2 border-accent shrink-0">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col text-left pr-1">
                  <span className="text-[10px] font-black text-slate-800 dark:text-white truncate max-w-[120px]">{user.email?.split('@')[0]}</span>
                  <span className="text-[8px] text-accent uppercase font-black tracking-wider leading-none capitalize">{role}</span>
                </div>
              </button>

              {/* Profile Dropdown Container */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl z-50 p-4 animate-fade-in space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="space-y-1 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-800 text-accent font-black text-lg flex items-center justify-center border-2 border-accent mx-auto">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="pt-2">
                      <p className="text-xs font-black text-brand-950 dark:text-white truncate">{user.email}</p>
                      <p className="text-[10px] font-bold text-slate-400 capitalize">{role}</p>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 py-0.5">
                      <span>Status de session</span>
                      <span className="text-emerald-500 font-bold flex items-center gap-1">● Actif</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 py-0.5">
                      <span>Version CRM</span>
                      <span>v1.2 (Prod)</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-900/30 dark:text-red-400 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <LogOut size={12} />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* MOBILE BOTTOM NAVIGATION LIST */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-2 z-50 flex items-center justify-around gap-1">
          {tabs.slice(0, 6).map(tab => {
            const isActive = activeTab === tab;
            let icon = <FileText size={16} />;
            let label = tab;

            if (tab === 'overview') { icon = <TrendingUp size={16} />; label = 'Vue'; }
            if (tab === 'demandes') { icon = <FolderOpen size={16} />; label = 'Demandes'; }
            if (tab === 'devis') { icon = <FileText size={16} />; label = 'Devis'; }
            if (tab === 'factures') { icon = <CreditCard size={16} />; label = 'Fact'; }
            if (tab === 'visites') { icon = <MapPin size={16} />; label = 'Visites'; }
            if (tab === 'planning') { icon = <Calendar size={16} />; label = 'Plan'; }
            if (tab === 'collaborateurs') { icon = <Users size={16} />; label = 'Équipe'; }
            if (tab === 'simulateur') { icon = <Calculator size={16} />; label = 'Simul'; }

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold flex-1 transition-all ${
                  isActive ? 'text-accent bg-accent/10 dark:bg-slate-800' : 'text-slate-500'
                }`}
              >
                {icon}
                <span>{label.charAt(0).toUpperCase() + label.slice(1, 4)}</span>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC DASHBOARD WORKSPACE BODY */}
        <div className="flex-1 p-6 space-y-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          
          {/* Synchronized successfully alert notification banner */}
          {syncMessage && (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 px-5 py-4 rounded-2xl text-xs font-medium flex items-center gap-3 animate-fade-in shadow-sm">
              <ShieldCheck className="text-emerald-500" size={18} />
              <span>{syncMessage}</span>
            </div>
          )}

          {/* 1. OVERVIEW VIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Banner */}
              <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
                <div className="space-y-1.5 z-10">
                  <span className="text-[10px] font-black uppercase text-accent tracking-[5px] block">Console Gérant</span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Bonjour, {user.email}</h2>
                  <p className="text-slate-400 font-light text-xs max-w-xl">
                    Tableau de bord de suivi intégral de l'activité de MarneTransdem. Suivi en temps réel des signatures de devis, des visites programmées et de la planification logistique des équipes.
                  </p>
                </div>
                <div className="bg-slate-800 border border-slate-700/55 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 z-10">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">État système</span>
                  <span className="text-emerald-400 font-black text-xs mt-1">● OPÉRATIONNEL</span>
                </div>
              </div>

              {/* Advanced Interactive Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Finances Encaissées</span>
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                      <Coins className="text-emerald-600" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-brand-900 dark:text-white">{activeInvoicesSum.toLocaleString('fr-FR')} €</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Total des factures réglées</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">En Attente Encaissement</span>
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
                      <CreditCard className="text-amber-600" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-brand-900 dark:text-white">{pendingInvoicesSum.toLocaleString('fr-FR')} €</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Factures de déménagements signés</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Signatures Devis</span>
                    <div className="p-2.5 bg-sky-50 dark:bg-sky-950/20 rounded-xl">
                      <FileText className="text-sky-600" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-brand-900 dark:text-white">
                    {devisList.filter(d => d.status === 'Signé').length} / {devisList.length}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">Estimations validées par les clients</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Équipes de Déménagement</span>
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
                      <Truck className="text-indigo-600" size={18} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-brand-900 dark:text-white">
                    {demenagements.filter(d => d.status === 'Programmé' || d.status === 'En cours').length}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">Chantiers en cours ou planifiés</p>
                </div>

              </div>

              {/* Splendid Custom Interactive Analytics Graph & Action panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Custom SVG Graphic (Responsive Interactive Visualizer) */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Activité Mensuelle & Taux Contractuel</h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5">Performance de conversion des visites techniques en devis signés</p>
                  </div>

                  {/* Fully vector-scaled visual graphics without any libraries */}
                  <div className="pt-6 relative h-64 border-b border-l border-slate-100 dark:border-slate-800 flex items-end justify-between px-6 gap-3">
                    
                    {/* Month 1 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="text-[10px] font-black text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">12 Devis</div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-36 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-accent h-3/4 rounded-t-lg transition-transform duration-300"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Mars</span>
                    </div>

                    {/* Month 2 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="text-[10px] font-black text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">18 Devis</div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-44 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-accent h-5/6 rounded-t-lg transition-transform duration-300"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Avril</span>
                    </div>

                    {/* Month 3 */}
                    <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="text-[10px] font-black text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">25 Devis</div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-52 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-accent h-full rounded-t-lg transition-transform duration-300"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Mai (Actuel)</span>
                    </div>

                    {/* Left overlay scales */}
                    <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between text-[8px] text-slate-400 font-bold pointer-events-none">
                      <span>30m³ Moy.</span>
                      <span>15m³ Moy.</span>
                      <span>5m³ Moy.</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-accent rounded-full inline-block"></span> Volume moyen calculé</span>
                    <span className="font-semibold text-brand-950 dark:text-white">Taux moyen de signature : 68%</span>
                  </div>
                </div>

                {/* Quick actions panel */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Raccourcis Logistiques</h3>
                    <p className="text-xs text-slate-500 font-light mt-0.5">Déclenchez les actes métiers d'un clic</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => { setActiveTab('devis'); }}
                      className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-left transition-all active:scale-95 flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-black text-brand-900 dark:text-white group-hover:text-accent transition-colors">Créer un Devis</p>
                        <p className="text-[10px] text-slate-400 italic">Émettre une nouvelle estimation</p>
                      </div>
                      <Plus className="text-slate-400 group-hover:text-accent" size={16} />
                    </button>

                    <button
                      onClick={() => { setActiveTab('visites'); }}
                      className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-left transition-all active:scale-95 flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-black text-brand-900 dark:text-white group-hover:text-accent transition-colors">Planifier visite technique</p>
                        <p className="text-[10px] text-slate-400 italic">Assigner un commercial terrain</p>
                      </div>
                      <MapPin className="text-slate-400 group-hover:text-accent" size={16} />
                    </button>

                    <button
                      onClick={() => { setActiveTab('planning'); }}
                      className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800 text-left transition-all active:scale-95 flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-black text-brand-900 dark:text-white group-hover:text-accent transition-colors">Déménagement Équipe</p>
                        <p className="text-[10px] text-slate-400 italic">Assigner une équipe au calendrier</p>
                      </div>
                      <Truck className="text-slate-400 group-hover:text-accent" size={16} />
                    </button>
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/20 text-slate-500 p-3.5 rounded-2xl text-[10px] leading-relaxed">
                    <strong>Note Sécurité :</strong> Les actions critiques sont soumises à signature authentifiée.
                  </div>
                </div>

              </div>

              {/* Dynamic Notification Logs / Live Action Feeds */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-premium">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Membres Actifs connectés</h3>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-500/10">Synchronisé</span>
                </div>
                
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {collaborateurs.slice(0, 4).map(c => (
                    <div key={c.uid} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-[10px]">
                          {c.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-extrabold text-brand-950 dark:text-white">{c.name}</p>
                          <p className="text-[10px] text-slate-400 font-light">{c.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[9px] font-bold border border-slate-100 bg-slate-50 dark:bg-slate-950 text-slate-500 rounded-full capitalize">
                          {c.role}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* INTERACTION: DEMANDES DU SITE PUBLIC */}
          {activeTab === 'demandes' && (
            <AdminDemandes 
              devisList={devisList}
              setDevisList={setDevisList}
              setNotifications={setNotifications}
            />
          )}

          {/* 2. DEVIS (QUOTES) TAB */}
          {activeTab === 'devis' && (
            <AdminDevis />
          )}

          {/* 3. FACTURES (INVOICES) TAB */}
          {activeTab === 'factures' && (
            <AdminFactures 
              factures={factures}
              setFactures={setFactures}
              setSelectedPdfDoc={setSelectedPdfDoc}
              searchQuery={searchQuery}
            />
          )}

          {/* 4. VISITES (TECHNICAL VISITS) TAB */}
          {activeTab === 'visites' && (
            <AdminVisites searchQuery={searchQuery} />
          )}

          {/* 5. PLANNING TAB (TIMELINES FOR BOTH VISITS AND MOVES) */}
          {activeTab === 'planning' && (
            <AdminPlanning 
              demenagements={demenagements}
              setDemenagements={setDemenagements}
              collaborateurs={collaborateurs}
              setSelectedMoveDoc={setSelectedMoveDoc}
              role={role}
              searchQuery={searchQuery}
            />
          )}

          {/* 6. RAPID SIMULATOR TAB (COMMERCIAL ONLY EXPENDITURE TOOL) */}
          {activeTab === 'simulateur' && (
            <div className="space-y-6">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl space-y-3">
                <h2 className="text-lg font-black tracking-tight text-brand-900 dark:text-white">Estimateur Volumétrique Instantané de Terrain</h2>
                <p className="text-xs text-slate-500 font-light">
                  Conçu spécialement pour les commerciaux de MarneTransdem lors de l'appel ou de la visite client rapide pour fournir instantanément un devis estimatif au mètre cube (m³).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                
                {/* Visual room clickers */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-white">Nombre de pièces / Logements</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white">Salons / Salles de Séjour</span>
                        <p className="text-[10px] text-slate-400 italic">Meubles lourds, tables, buffet, canapés</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={()=>setRapidRooms({...rapidRooms, salon: Math.max(0, rapidRooms.salon-1)})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">-</button>
                        <span className="font-extrabold text-sm w-4 text-center">{rapidRooms.salon}</span>
                        <button onClick={()=>setRapidRooms({...rapidRooms, salon: rapidRooms.salon+1})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white">Chambres à coucher</span>
                        <p className="text-[10px] text-slate-400 italic">Lits, armoires, commodes, tables de chevet</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={()=>setRapidRooms({...rapidRooms, chambre: Math.max(0, rapidRooms.chambre-1)})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">-</button>
                        <span className="font-extrabold text-sm w-4 text-center">{rapidRooms.chambre}</span>
                        <button onClick={()=>setRapidRooms({...rapidRooms, chambre: rapidRooms.chambre+1})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white">Cuisine aménagée</span>
                        <p className="text-[10px] text-slate-400 italic">Électroménager, frigo, vaisselle, four</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={()=>setRapidRooms({...rapidRooms, cuisine: Math.max(0, rapidRooms.cuisine-1)})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">-</button>
                        <span className="font-extrabold text-sm w-4 text-center">{rapidRooms.cuisine}</span>
                        <button onClick={()=>setRapidRooms({...rapidRooms, cuisine: rapidRooms.cuisine+1})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">+</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white">Cave / Grenier de stockage</span>
                        <p className="text-[10px] text-slate-400 italic">Cartons entassés, cartons divers</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={()=>setRapidRooms({...rapidRooms, cave: Math.max(0, rapidRooms.cave-1)})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">-</button>
                        <span className="font-extrabold text-sm w-4 text-center">{rapidRooms.cave}</span>
                        <button onClick={()=>setRapidRooms({...rapidRooms, cave: rapidRooms.cave+1})} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold text-base cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">Multiplicateur de chargement (m³ par pièce moyenne)</label>
                    <input type="range" min="5" max="15" value={customMultiplier} onChange={e=>setCustomMultiplier(Number(e.target.value))} className="w-full tracking bg-slate-200 accent-accent" />
                    <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                      <span>5 m³ (Éco)</span>
                      <span>10 m³ (Moyen)</span>
                      <span>15 m³ (Surchargé)</span>
                    </div>
                  </div>
                </div>

                {/* Computational results panel */}
                <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-accent tracking-widest block">RÉSULTAT DU CALCUL</span>
                    <h3 className="text-sm font-black text-white">Estimation Cubique Automatique</h3>
                    <p className="text-slate-400 font-light text-xs leading-relaxed">
                      L'intensité de chargement calculée d'après vos paramètres correspond au volume global utile moyen recommandé pour le transport.
                    </p>
                  </div>

                  <div className="py-8 text-center bg-slate-800/50 rounded-2xl border border-slate-800">
                    <span className="text-5xl font-black text-accent tracking-tight">{rapidResult}</span>
                    <span className="text-2xl font-black text-white ml-1">m³</span>
                    <p className="text-[11px] text-slate-400 mt-2">Recommandé : Camion de type {rapidResult > 40 ? "Poids lourd" : "Fourgon 20m³"}</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={convertEstimateToDraftQuote}
                      className="w-full bg-accent hover:bg-accent-hover text-brand-900 font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Plus size={16} /> Générer le Devis Client Brouillon
                    </button>
                    <p className="text-[10px] text-center text-slate-500 italic">
                      L'estimation sera transférée au registre des brouillons de devis des secrétaires.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 7. COLLABORATEURS (COLLABORATORS) TAB (GERANT ONLY CONCEPT) */}
          {activeTab === 'collaborateurs' && (
            <AdminCollaborateurs 
              collaborateurs={collaborateurs}
              setCollaborateurs={setCollaborateurs}
              movers={movers}
              setMovers={setMovers}
              trucks={trucks}
              setTrucks={setTrucks}
              user={user}
              setNotifications={setNotifications}
            />
          )}

        </div>

      </main>

      {/* FLOAT MODALS DE GARANTIE ET DE REGLEMENTATION LOGISTIQUE */}
      {selectedPdfDoc && (
        <PdfGenerator 
          documentType={selectedPdfDoc.type}
          data={selectedPdfDoc.data}
          onClose={() => setSelectedPdfDoc(null)}
          onStatusChange={(id, newStatus) => {
            if (selectedPdfDoc.type === 'devis') {
              updateQuoteStatus(id, newStatus);
            } else if (selectedPdfDoc.type === 'facture') {
              updateInvoiceStatus(id, newStatus);
            }
            setSelectedPdfDoc(prev => (prev ? { ...prev, data: { ...prev.data, status: newStatus } } : null));
          }}
        />
      )}

      {selectedMoveDoc && (
        <DocumentTemplates 
          move={selectedMoveDoc}
          onClose={() => setSelectedMoveDoc(null)}
        />
      )}

    </div>
  );
}
