import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  BadgeCheck,
  CalendarClock,
  Camera,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserCircle,
  LockKeyhole,
  RefreshCw,
  UploadCloud,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db, storage } from '../../lib/firebase';
import { normalizeCrmEmail, upsertCrmAccessProfile } from '../../lib/crm-auth-access';
import { useSyncedCollection } from '../../hooks/useData';
import {
  ADMIN_TAB_LABELS,
  MANAGEABLE_ADMIN_TABS,
  getModuleAccessState,
  setModuleAccessForTab,
  type AdminTab
} from '../../lib/admin-permissions';
import type { Role, UserProfile } from '../../types';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

type ProfileForm = {
  name: string;
  phone: string;
};

const MAX_PROFILE_PHOTO_SIZE = 4 * 1024 * 1024;
const ALLOWED_PROFILE_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const formatDateTime = (value?: string | null) => {
  if (!value) return 'Non disponible';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};

const formatRole = (role?: Role | null) => {
  if (!role) return 'Non défini';
  return role === 'chef_equipe' ? 'Chef équipe' : role.charAt(0).toUpperCase() + role.slice(1);
};

const getInitials = (name?: string | null, email?: string | null) => {
  const source = (name || email || 'CRM').trim();
  const parts = source.split(/[\s.@_-]+/).filter(Boolean);
  return parts.slice(0, 2).map(part => part[0]?.toUpperCase()).join('') || 'CRM';
};

const getPhotoExtension = (file: File) => {
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
};

const formatFileSize = (size: number) => {
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} Mo`;
  return `${Math.max(1, Math.round(size / 1024))} Ko`;
};

export function AdminProfil() {
  const { user, role } = useAuth();
  const context = useOutletContext<AdminOutletContextType>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [remoteProfile, setRemoteProfile] = useState<Partial<UserProfile> | null>(null);
  const [form, setForm] = useState<ProfileForm>({ name: '', phone: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [accessSavingKey, setAccessSavingKey] = useState<string | null>(null);
  const [collaborateurs, setCollaborateurs] = useSyncedCollection<UserProfile>('collaborateurs', [], { enabled: role === 'gérant' });

  const email = normalizeCrmEmail(user?.email);
  const displayName = remoteProfile?.name || user?.displayName || email;
  const initials = getInitials(displayName, email);
  const effectiveRole = (remoteProfile?.role || role) as Role | null;
  const providerList = user?.providerData?.map(provider => provider.providerId).join(', ') || 'email';
  const persistedPhotoURL = remoteProfile?.photoURL || user?.photoURL || '';
  const profilePhotoURL = photoPreviewUrl || persistedPhotoURL;
  const manageableCollaborateurs = useMemo(() => (
    collaborateurs.filter(collab => (
      collab.uid !== user?.uid
      && normalizeCrmEmail(collab.email) !== email
      && collab.role !== 'gérant'
      && collab.status !== 'Inactif'
    ))
  ), [collaborateurs, email, user?.uid]);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        let nextProfile: Partial<UserProfile> = userSnap.exists() ? userSnap.data() as Partial<UserProfile> : {};

        if (email) {
          const emailSnap = await getDoc(doc(db, 'userRolesByEmail', email));
          if (emailSnap.exists()) {
            nextProfile = { ...emailSnap.data() as Partial<UserProfile>, ...nextProfile };
          }
        }

        if (!isMounted) return;
        setRemoteProfile(nextProfile);
        setForm({
          name: nextProfile.name || user.displayName || email || '',
          phone: nextProfile.phone || ''
        });
      } catch (error) {
        console.warn('Impossible de charger le profil CRM:', error);
        if (!isMounted) return;
        setForm({ name: user.displayName || email || '', phone: '' });
        context?.pushNotification('Profil partiellement chargé', 'Les informations locales du compte sont affichées.', 'warning');
      } finally {
        if (isMounted) setLoadingProfile(false);
      }
    };

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [context, email, user]);

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreviewUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(photoFile);
    setPhotoPreviewUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [photoFile]);

  const completion = useMemo(() => {
    const checks = [
      Boolean(form.name.trim()),
      Boolean(email),
      Boolean(form.phone.trim()),
      Boolean(effectiveRole),
      Boolean(profilePhotoURL)
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [effectiveRole, email, form.name, form.phone, profilePhotoURL]);

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ALLOWED_PROFILE_PHOTO_TYPES.includes(file.type)) {
      context?.pushNotification('Format non supporté', 'Choisissez une image JPG, PNG ou WebP.', 'warning');
      return;
    }

    if (file.size > MAX_PROFILE_PHOTO_SIZE) {
      context?.pushNotification('Photo trop lourde', 'La photo de profil doit faire moins de 4 Mo.', 'warning');
      return;
    }

    setPhotoFile(file);
  };

  const uploadProfilePhoto = async (file: File) => {
    if (!user) throw new Error('Utilisateur non connecté.');

    const extension = getPhotoExtension(file);
    const photoRef = ref(storage, `profile_photos/${user.uid}/avatar-${Date.now()}.${extension}`);
    await uploadBytes(photoRef, file, {
      contentType: file.type,
      customMetadata: {
        ownerUid: user.uid,
        ownerEmail: email || ''
      }
    });

    return getDownloadURL(photoRef);
  };

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    const cleanName = form.name.trim() || email || 'Utilisateur CRM';
    const cleanPhone = form.phone.trim();
    const updatedAt = new Date().toISOString();

    setSaving(true);
    try {
      const uploadedPhotoURL = photoFile ? await uploadProfilePhoto(photoFile) : '';
      const nextPhotoURL = uploadedPhotoURL || persistedPhotoURL || '';
      const authUpdate: { displayName?: string; photoURL?: string } = {};

      if (user.displayName !== cleanName) {
        authUpdate.displayName = cleanName;
      }

      if (nextPhotoURL && user.photoURL !== nextPhotoURL) {
        authUpdate.photoURL = nextPhotoURL;
      }

      if (Object.keys(authUpdate).length > 0) {
        await updateProfile(user, authUpdate);
      }

      const payload = {
        uid: user.uid,
        email,
        name: cleanName,
        phone: cleanPhone,
        photoURL: nextPhotoURL,
        updatedAt
      };

      await setDoc(doc(db, 'users', user.uid), payload, { merge: true });
      setRemoteProfile(prev => ({ ...prev, ...payload }));
      setPhotoFile(null);
      context?.pushNotification('Profil mis à jour', photoFile ? 'Vos informations et votre photo ont été enregistrées.' : 'Vos informations CRM ont été enregistrées.', 'success');
    } catch (error) {
      console.error('Erreur de sauvegarde du profil:', error);
      context?.pushNotification('Profil non sauvegardé', 'La mise à jour a échoué. Vérifiez vos droits Storage/Firestore ou la connexion.', 'warning');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleModuleAccess = async (collab: UserProfile, tab: AdminTab, enabled: boolean) => {
    if (role !== 'gérant') return;

    const nextModuleAccess = setModuleAccessForTab(collab.role, collab.moduleAccess, tab, enabled);
    const nextCollab: UserProfile = { ...collab, moduleAccess: nextModuleAccess };
    const savingKey = `${collab.uid}-${tab}`;

    setAccessSavingKey(savingKey);
    try {
      await setCollaborateurs(prev => prev.map(item => item.uid === collab.uid ? nextCollab : item));
      await upsertCrmAccessProfile(db, {
        uid: nextCollab.uid,
        email: nextCollab.email,
        role: nextCollab.role,
        name: nextCollab.name,
        phone: nextCollab.phone,
        status: nextCollab.status,
        provider: 'crm-email',
        moduleAccess: nextModuleAccess
      });

      context?.pushNotification(
        enabled ? 'Accès module accordé' : 'Accès module retiré',
        `${nextCollab.name} ${enabled ? 'peut utiliser' : "ne peut plus utiliser"} ${ADMIN_TAB_LABELS[tab].desktop}.`,
        enabled ? 'success' : 'warning'
      );
    } catch (error) {
      console.error('Erreur de mise à jour des accès module:', error);
      context?.pushNotification('Droits non sauvegardés', 'La modification des accès n’a pas pu être enregistrée.', 'warning');
    } finally {
      setAccessSavingKey(null);
    }
  };
  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 bg-gradient-to-br from-brand-950 via-slate-900 to-slate-800 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5 min-w-0">
              <div className="relative h-24 w-24 rounded-3xl bg-accent text-brand-950 flex items-center justify-center text-2xl font-black shadow-xl shrink-0 overflow-hidden border border-white/20">
                {profilePhotoURL ? (
                  <img src={profilePhotoURL} alt="Photo de profil" className="h-full w-full object-cover" />
                ) : (
                  initials
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loadingProfile || saving}
                  className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white text-brand-950 shadow-lg border border-white/70 flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-50"
                  title="Changer la photo"
                >
                  <Camera size={15} />
                </button>
              </div>
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent mb-2">
                  <UserCircle size={14} /> Profil utilisateur
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight truncate">{displayName}</h2>
                <p className="text-sm text-slate-300 font-medium truncate">{email || 'Adresse email indisponible'}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 min-w-64">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-300">Rôle</p>
                <p className="mt-1 text-sm font-black text-white">{formatRole(effectiveRole)}</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] uppercase font-black tracking-wider text-slate-300">Profil</p>
                <p className="mt-1 text-sm font-black text-white">{completion}% complet</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handlePhotoSelect}
          />

          <div className="space-y-4">
            <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-4 bg-slate-50/80 dark:bg-slate-950/40">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-brand-900 text-white dark:bg-accent dark:text-brand-950 flex items-center justify-center overflow-hidden font-black shrink-0">
                  {profilePhotoURL ? (
                    <img src={profilePhotoURL} alt="Aperçu photo" className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Photo de profil</p>
                  <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                    JPG, PNG ou WebP. Taille maximale : 4 Mo.
                  </p>
                  {photoFile && (
                    <p className="mt-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 truncate">
                      Nouvelle photo prête : {photoFile.name} ({formatFileSize(photoFile.size)})
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {photoFile && (
                    <button
                      type="button"
                      onClick={() => setPhotoFile(null)}
                      disabled={saving}
                      className="h-10 w-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:text-red-600 flex items-center justify-center disabled:opacity-50"
                      title="Annuler la photo choisie"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loadingProfile || saving}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-[11px] font-black text-slate-700 dark:text-slate-100 disabled:opacity-50"
                  >
                    <UploadCloud size={15} />
                    Choisir
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nom affiché</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm(prev => ({ ...prev, name: event.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25"
                  placeholder="Nom et prénom"
                  disabled={loadingProfile || saving}
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Téléphone direct</span>
                <input
                  value={form.phone}
                  onChange={(event) => setForm(prev => ({ ...prev, phone: event.target.value }))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent/25"
                  placeholder="06 00 00 00 00"
                  disabled={loadingProfile || saving}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/70 dark:bg-slate-950/40">
                <Mail size={16} className="text-accent mb-3" />
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email</p>
                <p className="mt-1 text-xs font-bold break-all">{email || 'Non disponible'}</p>
              </div>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/70 dark:bg-slate-950/40">
                <ShieldCheck size={16} className="text-accent mb-3" />
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Accès</p>
                <p className="mt-1 text-xs font-bold">{remoteProfile?.status || 'Actif'}</p>
              </div>
              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/70 dark:bg-slate-950/40">
                <Phone size={16} className="text-accent mb-3" />
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Contact</p>
                <p className="mt-1 text-xs font-bold">{form.phone || 'À compléter'}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingProfile || saving}
              className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-hover dark:bg-accent dark:text-brand-950 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl px-5 py-3 text-xs font-black transition-colors"
            >
              {saving ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Enregistrement...' : 'Enregistrer le profil'}
            </button>
          </div>

          <aside className="space-y-4">
            <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-5 bg-slate-50/80 dark:bg-slate-950/40">
              <div className="flex items-center gap-2 mb-4">
                <LockKeyhole size={16} className="text-accent" />
                <h3 className="text-sm font-black uppercase tracking-tight">Sécurité du compte</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Email vérifié</span>
                  <span className="font-black">{user?.emailVerified ? 'Oui' : 'Non'}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Méthode</span>
                  <span className="font-black text-right">{providerList}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">UID</span>
                  <span className="font-mono text-[10px] text-right truncate max-w-36">{user?.uid}</span>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-5 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2 mb-4">
                <CalendarClock size={16} className="text-accent" />
                <h3 className="text-sm font-black uppercase tracking-tight">Activité</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-slate-400 font-black uppercase text-[10px]">Création</p>
                  <p className="font-bold mt-1">{formatDateTime(user?.metadata.creationTime)}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-black uppercase text-[10px]">Dernière connexion</p>
                  <p className="font-bold mt-1">{formatDateTime(user?.metadata.lastSignInTime)}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-black uppercase text-[10px]">Dernière mise à jour CRM</p>
                  <p className="font-bold mt-1">{formatDateTime((remoteProfile as { updatedAt?: string } | null)?.updatedAt)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-4">
              <BadgeCheck size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p>Les informations de rôle et d'accès restent verrouillées par les droits CRM. Seuls les responsables peuvent modifier les habilitations.</p>
            </div>
          </aside>
        </form>
      </section>

      {role === 'gérant' && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl shadow-sm p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl bg-brand-900 text-white dark:bg-accent dark:text-brand-950 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent">Habilitations gérant</p>
                <h3 className="text-lg font-black text-brand-950 dark:text-white">Accès modules des collaborateurs</h3>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-2xl">
                  Accordez ou retirez des modules précis sans changer le rôle principal du compte.
                </p>
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-[11px] font-black text-slate-600 dark:text-slate-300">
              {manageableCollaborateurs.length} profil{manageableCollaborateurs.length > 1 ? 's' : ''}
            </span>
          </div>

          {manageableCollaborateurs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-5 text-sm font-semibold text-slate-500">
              Aucun collaborateur actif à gérer pour le moment.
            </div>
          ) : (
            <div className="space-y-4">
              {manageableCollaborateurs.map((collab) => (
                <div key={collab.uid} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/30 p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0 lg:w-64">
                      <div className="h-11 w-11 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden text-xs font-black text-brand-950 dark:text-accent shrink-0">
                        {collab.photoURL ? (
                          <img src={collab.photoURL} alt={collab.name} className="h-full w-full object-cover" />
                        ) : (
                          getInitials(collab.name, collab.email)
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black truncate">{collab.name}</p>
                        <p className="text-[11px] font-semibold text-slate-500 truncate">{collab.email}</p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 text-[9px] font-black uppercase text-slate-500">
                            {formatRole(collab.role)}
                          </span>
                          <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 text-[9px] font-black uppercase">
                            {collab.status || 'Actif'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 flex-1">
                      {MANAGEABLE_ADMIN_TABS.map((tab) => {
                        const state = getModuleAccessState(collab.role, collab.moduleAccess, tab);
                        const savingThis = accessSavingKey === `${collab.uid}-${tab}`;
                        const badge = state.granted ? 'Ajouté' : state.revoked ? 'Retiré' : state.baseEnabled ? 'Rôle' : 'Fermé';

                        return (
                          <button
                            key={tab}
                            type="button"
                            aria-pressed={state.enabled}
                            disabled={savingThis}
                            onClick={() => handleToggleModuleAccess(collab, tab, !state.enabled)}
                            className={`min-h-12 rounded-2xl border px-3 py-2 text-left transition-all disabled:opacity-60 ${
                              state.enabled
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/25 dark:text-emerald-200'
                                : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                            }`}
                          >
                            <span className="flex items-center justify-between gap-3">
                              <span className="min-w-0">
                                <span className="block text-[11px] font-black truncate">{ADMIN_TAB_LABELS[tab].desktop}</span>
                                <span className="mt-0.5 block text-[9px] font-black uppercase opacity-70">{savingThis ? 'Sauvegarde...' : badge}</span>
                              </span>
                              <span className={`relative h-5 w-9 rounded-full shrink-0 transition-colors ${state.enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${state.enabled ? 'translate-x-4 left-0.5' : 'left-0.5'}`} />
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default AdminProfil;