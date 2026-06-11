import React, { useState, useMemo } from 'react';
import { UserPlus, Edit, X, Trash2, Truck, Plus, Users, Calendar, AlertTriangle, CheckCircle, Scale, Shield } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { useOutletContext } from 'react-router-dom';
import { useSyncedCollection } from '../../hooks/useData';
import { UserProfile, FieldMover, FieldTruck, Role, Demenagement } from '../../types';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

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
  { id: 'TRK-01', plateNumber: 'AA-123-BB', type: 'Poids Lourd 44m³', capacity: 44, status: 'Disponible', mileage: 154000, nextMaintenanceDate: '2026-08-15' },
  { id: 'TRK-02', plateNumber: 'CC-456-DD', type: 'Fourgon VL 20m³', capacity: 20, status: 'Disponible', mileage: 87500, nextMaintenanceDate: '2026-06-20' },
  { id: 'TRK-03', plateNumber: 'EE-789-FF', type: 'Camionnette 12m³', capacity: 12, status: 'Disponible', mileage: 43200, nextMaintenanceDate: '2026-05-10' }
];

export function AdminCollaborateurs() {
  const { user } = useAuth();
  const context = useOutletContext<AdminOutletContextType>();
  const pushNotification = context?.pushNotification;

  // Synced state hooks
  const [collaborateurs, setCollaborateurs] = useSyncedCollection<UserProfile>('collaborateurs', SEED_COLLABORATEURS);
  const [movers, setMovers] = useSyncedCollection<FieldMover>('movers', SEED_MOVERS);
  const [trucks, setTrucks] = useSyncedCollection<FieldTruck>('trucks', SEED_TRUCKS);
  const [demenagements] = useSyncedCollection<Demenagement>('demenagements');

  // Local states
  const [showAddCollab, setShowAddCollab] = useState(false);
  const [editingCollab, setEditingCollab] = useState<UserProfile | null>(null);
  const [newCollab, setNewCollab] = useState<Partial<UserProfile>>({
    name: '', email: '', phone: '', role: 'commercial', status: 'Actif'
  });

  const [collabSubTab, setCollabSubTab] = useState<'crm' | 'terrain' | 'flotte'>('crm');

  const [showAddMover, setShowAddMover] = useState(false);
  const [editingMover, setEditingMover] = useState<FieldMover | null>(null);
  const [newMover, setNewMover] = useState<Partial<FieldMover>>({
    name: '', phone: '', role: 'Déménageur Porteur', status: 'Disponible'
  });

  const [showAddTruck, setShowAddTruck] = useState(false);
  const [editingTruck, setEditingTruck] = useState<FieldTruck | null>(null);
  const [newTruck, setNewTruck] = useState<Partial<FieldTruck>>({
    plateNumber: '', type: 'Fourgon VL 20m³', capacity: 20, status: 'Disponible', mileage: 0, nextMaintenanceDate: ''
  });

  // Calculate mission statistics by cross-referencing planning
  const moverMissionsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    demenagements.forEach(d => {
      if (d.assignedMovers) {
        d.assignedMovers.forEach(name => {
          counts[name] = (counts[name] || 0) + 1;
        });
      }
    });
    return counts;
  }, [demenagements]);

  const truckMissionsCount = useMemo(() => {
    const counts: Record<string, number> = {};
    demenagements.forEach(d => {
      if (d.assignedTruck) {
        counts[d.assignedTruck] = (counts[d.assignedTruck] || 0) + 1;
      }
    });
    return counts;
  }, [demenagements]);

  // Collaborator Management Handlers
  const handleAddCollaborateur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollab.name || !newCollab.email) {
      alert("Veuillez renseigner le nom et l'adresse e-mail.");
      return;
    }

    const uid = `collab-${Date.now()}`;
    const cleanEmail = newCollab.email.trim().toLowerCase();
    const createdItem: UserProfile = {
      uid,
      name: newCollab.name.trim(),
      email: cleanEmail,
      phone: newCollab.phone?.trim() || '',
      role: (newCollab.role as Role) || 'commercial',
      status: (newCollab.status as 'Actif' | 'Inactif') || 'Actif'
    };

    try {
      await setDoc(doc(db, 'users', uid), {
        uid,
        email: cleanEmail,
        role: createdItem.role,
        name: createdItem.name,
        phone: createdItem.phone,
        status: createdItem.status,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(`mt_role_${uid}`, createdItem.role);
    } catch (fsErr) {
      console.warn("Firestore save fallback offline during collaborator creation:", fsErr);
    }

    const updated = [...collaborateurs, createdItem];
    setCollaborateurs(updated);

    setNewCollab({ name: '', email: '', phone: '', role: 'commercial', status: 'Actif' });
    setShowAddCollab(false);

    if (pushNotification) {
      pushNotification(
        'Compte Créé 👥', 
        `Le compte de ${createdItem.name} (${createdItem.role}) a été configuré avec succès.`, 
        'success'
      );
    }
  };

  const handleEditCollaborateurStart = (collab: UserProfile) => {
    setEditingCollab(collab);
  };

  const handleUpdateCollaborateur = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCollab) return;

    if (!editingCollab.name || !editingCollab.email) {
      alert("Veuillez renseigner le nom et l'adresse e-mail.");
      return;
    }

    const cleanEmail = editingCollab.email.trim().toLowerCase();
    
    try {
      await setDoc(doc(db, 'users', editingCollab.uid), {
        uid: editingCollab.uid,
        email: cleanEmail,
        role: editingCollab.role,
        name: editingCollab.name.trim(),
        phone: editingCollab.phone || '',
        status: editingCollab.status,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      localStorage.setItem(`mt_role_${editingCollab.uid}`, editingCollab.role);
    } catch (fsErr) {
      console.warn("Firestore update offline during collaborator edit:", fsErr);
    }

    const updated = collaborateurs.map(c => c.uid === editingCollab.uid ? { ...editingCollab, email: cleanEmail } : c);
    setCollaborateurs(updated);
    setEditingCollab(null);

    if (pushNotification) {
      pushNotification(
        'Compte Mis à jour ⚙️', 
        `Les informations de ${editingCollab.name} ont été actualisées de façon sécurisée.`, 
        'info'
      );
    }
  };

  const handleDeleteCollaborateur = async (uid: string, name: string) => {
    if (uid === user?.uid) {
      alert("Erreur de sécurité : Vous ne pouvez pas supprimer votre propre compte Gérant actuellement connecté.");
      return;
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir révoquer et supprimer définitivement le compte de ${name} de l'organisation ?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', uid));
    } catch (fsErr) {
      console.warn("Firestore delete offline during collaborator removal:", fsErr);
    }

    const updated = collaborateurs.filter(c => c.uid !== uid);
    setCollaborateurs(updated);

    if (pushNotification) {
      pushNotification(
        'Compte Révoqué 🚨', 
        `L'utilisateur ${name} a été radié de l'annuaire de façon permanente.`, 
        'warning'
      );
    }
  };

  // Field Mover Handlers
  const handleAddMover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMover.name || !newMover.phone) {
      alert("Veuillez renseigner le nom et le numéro de téléphone.");
      return;
    }
    const id = `MVR-${Date.now()}`;
    const createdItem: FieldMover = {
      id,
      name: newMover.name.trim(),
      phone: newMover.phone.trim(),
      role: (newMover.role as any) || 'Déménageur Porteur',
      status: (newMover.status as any) || 'Disponible'
    };
    const updated = [...movers, createdItem];
    setMovers(updated);
    setNewMover({ name: '', phone: '', role: 'Déménageur Porteur', status: 'Disponible' });
    setShowAddMover(false);

    if (pushNotification) {
      pushNotification(
        'Équipier Terrain Ajouté 🚛', 
        `Le déménageur ${createdItem.name} (${createdItem.role}) a été ajouté à la liste.`, 
        'success'
      );
    }
  };

  const handleUpdateMover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMover) return;
    if (!editingMover.name || !editingMover.phone) {
      alert("Veuillez renseigner le nom et le numéro de téléphone.");
      return;
    }
    const updated = movers.map(m => m.id === editingMover.id ? editingMover : m);
    setMovers(updated);
    setEditingMover(null);

    if (pushNotification) {
      pushNotification(
        'Équipier Terrain Mis à jour ⚙️', 
        `Les informations de ${editingMover.name} ont été actualisées.`, 
        'info'
      );
    }
  };

  const handleDeleteMover = (id: string, name: string) => {
    if (!window.confirm(`Voulez-vous vraiment retirer le déménageur ${name} de l'équipe de terrain ?`)) return;
    const updated = movers.filter(m => m.id !== id);
    setMovers(updated);

    if (pushNotification) {
      pushNotification(
        'Équipier Terrain Retiré 🚨', 
        `Le déménageur ${name} a été retiré de la liste d'équipe.`, 
        'warning'
      );
    }
  };

  // Fleet Truck Handlers
  const handleAddTruck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTruck.plateNumber) {
      alert("Veuillez renseigner la plaque d'immatriculation du véhicule.");
      return;
    }
    const id = `TRK-${Date.now()}`;
    const createdItem: FieldTruck = {
      id,
      plateNumber: newTruck.plateNumber.toUpperCase().trim(),
      type: newTruck.type || 'Fourgon VL 20m³',
      capacity: Number(newTruck.capacity) || 20,
      status: (newTruck.status as any) || 'Disponible',
      mileage: newTruck.mileage ? Number(newTruck.mileage) : 0,
      nextMaintenanceDate: newTruck.nextMaintenanceDate || ''
    };
    const updated = [...trucks, createdItem];
    setTrucks(updated);
    setNewTruck({ plateNumber: '', type: 'Fourgon VL 20m³', capacity: 20, status: 'Disponible', mileage: 0, nextMaintenanceDate: '' });
    setShowAddTruck(false);

    if (pushNotification) {
      pushNotification(
        'Véhicule Ajouté 🚚', 
        `Le véhicule immatriculé ${createdItem.plateNumber} (${createdItem.type}) a été intégré à la flotte.`, 
        'success'
      );
    }
  };

  const handleUpdateTruck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTruck) return;
    if (!editingTruck.plateNumber) {
      alert("Veuillez renseigner la plaque d'immatriculation.");
      return;
    }
    const updatedTruck = { 
      ...editingTruck, 
      plateNumber: editingTruck.plateNumber.toUpperCase().trim(), 
      capacity: Number(editingTruck.capacity) || 20,
      mileage: editingTruck.mileage ? Number(editingTruck.mileage) : 0,
      nextMaintenanceDate: editingTruck.nextMaintenanceDate || ''
    };
    const updated = trucks.map(t => t.id === editingTruck.id ? updatedTruck : t);
    setTrucks(updated);
    setEditingTruck(null);

    if (pushNotification) {
      pushNotification(
        'Véhicule Mis à jour ⚙️', 
        `Le véhicule ${updatedTruck.plateNumber} a été mis à jour dans le système.`, 
        'info'
      );
    }
  };

  const handleDeleteTruck = (id: string, plateNumber: string) => {
    if (!window.confirm(`Voulez-vous vraiment retirer le véhicule immatriculé ${plateNumber} de la flotte ?`)) return;
    const updated = trucks.filter(t => t.id !== id);
    setTrucks(updated);

    if (pushNotification) {
      pushNotification(
        'Véhicule Retiré 🚨', 
        `Le véhicule ${plateNumber} a été supprimé de la flotte.`, 
        'warning'
      );
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

  const getMaintenanceBadge = (truck: FieldTruck) => {
    if (!truck.nextMaintenanceDate) {
      return <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-350 text-[9px] px-2.5 py-1 rounded-lg border">Non programmée</span>;
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    const maintDate = new Date(truck.nextMaintenanceDate);
    maintDate.setHours(0,0,0,0);
    const diffTime = maintDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return (
        <span className="bg-red-50 border border-red-200/50 text-red-700 dark:bg-red-950/30 dark:text-red-400 text-[9px] px-2.5 py-1 rounded-lg font-black animate-pulse flex items-center gap-1">
          <AlertTriangle size={10} /> Relance Maintenance
        </span>
      );
    } else if (diffDays <= 15) {
      return (
        <span className="bg-amber-50 border border-amber-200/50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 text-[9px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
          <AlertTriangle size={10} /> Sous {diffDays} j
        </span>
      );
    }
    return <span className="bg-emerald-50 border border-emerald-200/50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 text-[9px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1"><CheckCircle size={10} /> Maintenance OK</span>;
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-Tabs Selector */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4 sm:gap-6 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setCollabSubTab('crm')}
          className={`pb-3 text-xs sm:text-sm font-black whitespace-nowrap transition-colors relative cursor-pointer ${
            collabSubTab === 'crm' 
              ? 'text-accent border-b-2 border-accent' 
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          💻 COMPTES CRM ({collaborateurs.length})
        </button>
        <button
          type="button"
          onClick={() => setCollabSubTab('terrain')}
          className={`pb-3 text-xs sm:text-sm font-black whitespace-nowrap transition-colors relative cursor-pointer ${
            collabSubTab === 'terrain' 
              ? 'text-accent border-b-2 border-accent' 
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          🚛 ÉQUIPES TERRAIN ({movers.length})
        </button>
        <button
          type="button"
          onClick={() => setCollabSubTab('flotte')}
          className={`pb-3 text-xs sm:text-sm font-black whitespace-nowrap transition-colors relative cursor-pointer ${
            collabSubTab === 'flotte' 
              ? 'text-accent border-b-2 border-accent' 
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          🚚 FLOTTE VÉHICULES ({trucks.length})
        </button>
      </div>

      {/* Tab 1: CRM Security Accounts */}
      {collabSubTab === 'crm' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wider block">COMPTES LOGICIELS MARNETRANSDEM</p>
                <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">Accès du Personnel de Bureau & Encadrement</h2>
              </div>
              <button
                onClick={() => {
                  setShowAddCollab(!showAddCollab);
                  setEditingCollab(null);
                }}
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-brand-900 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <UserPlus size={14} /> Créer un accès CRM
              </button>
            </div>
          </div>

          {showAddCollab && (
            <form onSubmit={handleAddCollaborateur} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <UserPlus size={16} className="text-accent" />
                  <h3 className="font-black text-sm text-brand-955 dark:text-white uppercase leading-none">Créer un profil CRM</h3>
                </div>
                <button type="button" onClick={() => setShowAddCollab(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Nom complet</label>
                  <input type="text" required placeholder="Ex: Corinne Masson" value={newCollab.name || ''} onChange={e => setNewCollab(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Email de connexion</label>
                  <input type="email" required placeholder="Ex: secretaire@marnetransdem.com" value={newCollab.email || ''} onChange={e => setNewCollab(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Téléphone (facultatif)</label>
                  <input type="text" placeholder="Ex: 06 12 34 56 78" value={newCollab.phone || ''} onChange={e => setNewCollab(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Rôle habilité</label>
                  <select value={newCollab.role || 'commercial'} onChange={e => setNewCollab(prev => ({ ...prev, role: e.target.value as Role }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="secrétaire">Secrétaire (Gestion devis, facturation, plannings)</option>
                    <option value="commercial">Commercial (Visites techniques, chiffrage express)</option>
                    <option value="chef_equipe">Chef d'Équipe (Suivi et exécution logistique)</option>
                    <option value="gérant">Gérant (Accès complet à la plateforme & finances)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Statut d'activité</label>
                  <select value={newCollab.status || 'Actif'} onChange={e => setNewCollab(prev => ({ ...prev, status: e.target.value as any }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2.5 bg-brand-900 hover:bg-brand-hover text-white rounded-xl font-bold">Enregistrer l'accès</button>
              </div>
            </form>
          )}

          {editingCollab && (
            <form onSubmit={handleUpdateCollaborateur} className="bg-white dark:bg-slate-900 border border-amber-200 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase">Modifier le profil : {editingCollab.name}</h3>
                <button type="button" onClick={() => setEditingCollab(null)} className="text-slate-400"><X size={16} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Nom complet</label>
                  <input type="text" required value={editingCollab.name || ''} onChange={e => setEditingCollab(prev => prev ? ({ ...prev, name: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Email</label>
                  <input type="email" required value={editingCollab.email || ''} onChange={e => setEditingCollab(prev => prev ? ({ ...prev, email: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Téléphone</label>
                  <input type="text" value={editingCollab.phone || ''} onChange={e => setEditingCollab(prev => prev ? ({ ...prev, phone: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Rôle</label>
                  <select value={editingCollab.role || 'commercial'} onChange={e => setEditingCollab(prev => prev ? ({ ...prev, role: e.target.value as Role }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="secrétaire">Secrétaire</option>
                    <option value="commercial">Commercial</option>
                    <option value="chef_equipe">Chef d'Équipe</option>
                    <option value="gérant">Gérant</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Statut</label>
                  <select value={editingCollab.status || 'Actif'} onChange={e => setEditingCollab(prev => prev ? ({ ...prev, status: e.target.value as any }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-xl font-bold">Sauvegarder</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborateurs.map((collab) => (
              <div key={collab.uid} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-900 border border-accent/20 text-white font-black flex items-center justify-center text-xs">
                    {collab.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">{collab.name}</h4>
                    <p className="text-[11px] text-slate-400">{collab.email}</p>
                    {collab.phone && <p className="text-[10px] text-slate-500 font-mono mt-0.5">{collab.phone}</p>}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">Habilitation</span>
                    <span className="font-extrabold text-brand-955 dark:text-accent capitalize">{collab.role}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                    collab.status === 'Actif' ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-450' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {collab.status}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-2">
                  <button onClick={() => handleEditCollaborateurStart(collab)} className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 text-slate-600 rounded-lg border border-slate-200/50 flex items-center gap-1 text-[10px] font-bold">
                    <Edit size={12} className="text-amber-500" /> Modifier
                  </button>
                  {collab.email !== user?.email && (
                    <button onClick={() => handleDeleteCollaborateur(collab.uid, collab.name)} className="p-1.5 bg-red-50 hover:bg-red-105 text-red-600 rounded-lg border border-red-200/20 flex items-center gap-1 text-[10px] font-bold">
                      <Trash2 size={12} /> Révoquer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Regular Field Movers */}
      {collabSubTab === 'terrain' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wider block">ÉQUIPE DE CHANTIER OPÉRATIONNELLE</p>
                <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">Déménageurs terrain, Chauffeurs et Porteurs</h2>
              </div>
              <button
                onClick={() => {
                  setShowAddMover(!showAddMover);
                  setEditingMover(null);
                }}
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-brand-900 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <UserPlus size={14} /> Enregistrer un déménageur
              </button>
            </div>
          </div>

          {showAddMover && (
            <form onSubmit={handleAddMover} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-sm uppercase">Inscrire un déménageur de terrain</h3>
                <button type="button" onClick={() => setShowAddMover(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-bold block mb-1">Nom complet</label>
                  <input type="text" required placeholder="Ex: Marc Bagarre" value={newMover.name || ''} onChange={e => setNewMover(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Téléphone mobile</label>
                  <input type="text" required placeholder="Ex: 06 55 66 77 88" value={newMover.phone || ''} onChange={e => setNewMover(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Spécialité / Rôle</label>
                  <select value={newMover.role || 'Déménageur Porteur'} onChange={e => setNewMover(prev => ({ ...prev, role: e.target.value as any }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Chauffeur PL">Chauffeur Poids Lourds</option>
                    <option value="Chauffeur VL">Chauffeur Véhicule Léger</option>
                    <option value="Déménageur Porteur">Déménageur Porteur</option>
                    <option value="Aide-déménageur">Aide-déménageur</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Statut initial</label>
                  <select value={newMover.status || 'Disponible'} onChange={e => setNewMover(prev => ({ ...prev, status: e.target.value as any }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Disponible">Disponible</option>
                    <option value="En mission">En mission</option>
                    <option value="En repos">En repos</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2.5 bg-brand-900 hover:bg-brand-hover text-white rounded-xl font-bold">Ajouter au Registre</button>
              </div>
            </form>
          )}

          {editingMover && (
            <form onSubmit={handleUpdateMover} className="bg-white dark:bg-slate-900 border border-amber-250 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-sm uppercase">Modifier le déménageur : {editingMover.name}</h3>
                <button type="button" onClick={() => setEditingMover(null)} className="text-slate-400"><X size={16} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-bold block mb-1">Nom complet</label>
                  <input type="text" required value={editingMover.name || ''} onChange={e => setEditingMover(prev => prev ? ({ ...prev, name: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Téléphone mobile</label>
                  <input type="text" required value={editingMover.phone || ''} onChange={e => setEditingMover(prev => prev ? ({ ...prev, phone: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Spécialité</label>
                  <select value={editingMover.role || 'Déménageur Porteur'} onChange={e => setEditingMover(prev => prev ? ({ ...prev, role: e.target.value as any }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Chauffeur PL">Chauffeur PL</option>
                    <option value="Chauffeur VL">Chauffeur VL</option>
                    <option value="Déménageur Porteur">Déménageur Porteur</option>
                    <option value="Aide-déménageur">Aide-déménageur</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Statut</label>
                  <select value={editingMover.status || 'Disponible'} onChange={e => setEditingMover(prev => prev ? ({ ...prev, status: e.target.value as any }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Disponible">Disponible</option>
                    <option value="En mission">En mission</option>
                    <option value="En repos">En repos</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-xl font-bold">Mettre à jour</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movers.map(mover => {
              const missionsCount = moverMissionsCount[mover.name] || 0;
              return (
                <div key={mover.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 text-brand-955 dark:text-accent font-black flex items-center justify-center text-xs">
                        {mover.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">{mover.name}</h4>
                        <p className="text-[11px] text-slate-500 font-mono">{mover.phone}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      mover.status === 'Disponible' ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400' :
                      mover.status === 'En mission' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 animate-pulse' :
                      'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                    }`}>
                      {mover.status}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Spécialité</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">{mover.role}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Missions</span>
                      <span className="font-extrabold text-brand-900 dark:text-accent bg-slate-55 dark:bg-slate-950 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-800">
                        {missionsCount} chantiers
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-2">
                    <button onClick={() => { setEditingMover(mover); setShowAddMover(false); }} className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 text-slate-600 rounded-lg border border-slate-200/55 flex items-center gap-1 text-[10px] font-bold">
                      <Edit size={12} className="text-amber-500" /> Modifier
                    </button>
                    <button onClick={() => handleDeleteMover(mover.id, mover.name)} className="p-1.5 bg-red-50 hover:bg-red-105 text-red-650 rounded-lg border border-red-200/20 flex items-center gap-1 text-[10px] font-bold">
                      <Trash2 size={12} /> Retirer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Vehicles & Fleet Materials */}
      {collabSubTab === 'flotte' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 tracking-wider block">PARC AUTO & FLOTTE MARNETRANSDEM</p>
                <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">Véhicules et Matériels Logistiques</h2>
              </div>
              <button
                onClick={() => {
                  setShowAddTruck(!showAddTruck);
                  setEditingTruck(null);
                }}
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-brand-900 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Plus size={14} /> Enregistrer un véhicule
              </button>
            </div>
          </div>

          {showAddTruck && (
            <form onSubmit={handleAddTruck} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-sm uppercase">Ajouter un véhicule de transport</h3>
                <button type="button" onClick={() => setShowAddTruck(false)} className="text-slate-400 hover:text-slate-650"><X size={16} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold block mb-1">Immatriculation</label>
                  <input type="text" required placeholder="AA-123-BB" value={newTruck.plateNumber || ''} onChange={e => setNewTruck(prev => ({ ...prev, plateNumber: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Capacité (m³)</label>
                  <input type="number" required placeholder="Ex: 20" value={newTruck.capacity || ''} onChange={e => setNewTruck(prev => ({ ...prev, capacity: Number(e.target.value) }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Kilométrage actuel (km)</label>
                  <input type="number" placeholder="Ex: 120000" value={newTruck.mileage || ''} onChange={e => setNewTruck(prev => ({ ...prev, mileage: Number(e.target.value) }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Prochaine maintenance obligatoire</label>
                  <input type="date" value={newTruck.nextMaintenanceDate || ''} onChange={e => setNewTruck(prev => ({ ...prev, nextMaintenanceDate: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3 focus:outline-accent" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Modèle / Type</label>
                  <select value={newTruck.type || 'Fourgon VL 20m³'} onChange={e => setNewTruck(prev => ({ ...prev, type: e.target.value }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Poids Lourd 44m³">Poids Lourd 44m³</option>
                    <option value="Fourgon VL 20m³">Fourgon VL 20m³</option>
                    <option value="Camionnette 12m³">Camionnette 12m³</option>
                    <option value="Monte-Meuble">Monte-Meuble</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Statut technique</label>
                  <select value={newTruck.status || 'Disponible'} onChange={e => setNewTruck(prev => ({ ...prev, status: e.target.value as any }))} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Disponible">Disponible</option>
                    <option value="En maintenance">En maintenance</option>
                    <option value="En mission">En mission</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2.5 bg-brand-900 hover:bg-brand-hover text-white rounded-xl font-bold">Enregistrer le camion</button>
              </div>
            </form>
          )}

          {editingTruck && (
            <form onSubmit={handleUpdateTruck} className="bg-white dark:bg-slate-900 border border-amber-250 p-6 rounded-3xl space-y-4 shadow-xl text-xs">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-sm uppercase">Modifier le véhicule : {editingTruck.plateNumber}</h3>
                <button type="button" onClick={() => setEditingTruck(null)} className="text-slate-400"><X size={16} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold block mb-1">Immatriculation</label>
                  <input type="text" required value={editingTruck.plateNumber || ''} onChange={e => setEditingTruck(prev => prev ? ({ ...prev, plateNumber: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Capacité (m³)</label>
                  <input type="number" required value={editingTruck.capacity || ''} onChange={e => setEditingTruck(prev => prev ? ({ ...prev, capacity: Number(e.target.value) }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Kilométrage actuel (km)</label>
                  <input type="number" value={editingTruck.mileage || 0} onChange={e => setEditingTruck(prev => prev ? ({ ...prev, mileage: Number(e.target.value) }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Prochaine maintenance</label>
                  <input type="date" value={editingTruck.nextMaintenanceDate || ''} onChange={e => setEditingTruck(prev => prev ? ({ ...prev, nextMaintenanceDate: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3" />
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Modèle</label>
                  <select value={editingTruck.type || 'Fourgon VL 20m³'} onChange={e => setEditingTruck(prev => prev ? ({ ...prev, type: e.target.value }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Poids Lourd 44m³">Poids Lourd 44m³</option>
                    <option value="Fourgon VL 20m³">Fourgon VL 20m³</option>
                    <option value="Camionnette 12m³">Camionnette 12m³</option>
                    <option value="Monte-Meuble">Monte-Meuble</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold block mb-1">Statut technique</label>
                  <select value={editingTruck.status || 'Disponible'} onChange={e => setEditingTruck(prev => prev ? ({ ...prev, status: e.target.value as any }) : null)} className="w-full bg-slate-50 dark:bg-slate-950 border rounded-xl py-2.5 px-3">
                    <option value="Disponible">Disponible</option>
                    <option value="En maintenance">En maintenance</option>
                    <option value="En mission">En mission</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-xl font-bold">Sauvegarder</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trucks.map(truck => {
              const missionsCount = truckMissionsCount[truck.plateNumber] || 0;
              const maintBadge = getMaintenanceBadge(truck);

              return (
                <div key={truck.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-white flex items-center justify-center border border-slate-200/50">
                        <Truck size={16} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800 dark:text-white tracking-widest bg-slate-50 dark:bg-slate-955 px-2.5 py-1 rounded-md border font-mono">
                          {truck.plateNumber}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{truck.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      truck.status === 'Disponible' ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-450' :
                      truck.status === 'En mission' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400' :
                      'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                    }`}>
                      {truck.status}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Volume</span>
                      <span className="font-extrabold text-slate-800 dark:text-white">{truck.capacity} m³</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Missions</span>
                      <span className="font-extrabold text-slate-800 dark:text-white">{missionsCount} chantiers</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Kilométrage</span>
                      <span className="font-extrabold text-slate-800 dark:text-white">{truck.mileage?.toLocaleString('fr-FR') || 0} km</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block font-bold uppercase">Prochaine Échéance</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{formatDateFr(truck.nextMaintenanceDate) || 'Non programmée'}</span>
                    </div>
                  </div>

                  {/* Maintenance visual check */}
                  <div className="flex items-center pt-3 border-t border-dashed border-slate-150 dark:border-slate-800/60">
                    {maintBadge}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-2">
                    <button onClick={() => { setEditingTruck(truck); setShowAddTruck(false); }} className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-955 text-slate-600 rounded-lg border border-slate-200/50 flex items-center gap-1 text-[10px] font-bold">
                      <Edit size={12} className="text-amber-500" /> Modifier
                    </button>
                    <button onClick={() => handleDeleteTruck(truck.id, truck.plateNumber)} className="p-1.5 bg-red-50 hover:bg-red-105 text-red-600 rounded-lg border border-red-200/20 flex items-center gap-1 text-[10px] font-bold">
                      <Trash2 size={12} /> Retirer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
