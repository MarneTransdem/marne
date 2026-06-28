import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  BadgeCheck,
  CalendarClock,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserCircle,
  LockKeyhole,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { normalizeCrmEmail } from '../../lib/crm-auth-access';
import type { Role, UserProfile } from '../../types';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

type ProfileForm = {
  name: string;
  phone: string;
};

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

export function AdminProfil() {
  const { user, role } = useAuth();
  const context = useOutletContext<AdminOutletContextType>();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [remoteProfile, setRemoteProfile] = useState<Partial<UserProfile> | null>(null);
  const [form, setForm] = useState<ProfileForm>({ name: '', phone: '' });

  const email = normalizeCrmEmail(user?.email);
  const displayName = remoteProfile?.name || user?.displayName || email;
  const initials = getInitials(displayName, email);
  const effectiveRole = (remoteProfile?.role || role) as Role | null;
  const providerList = user?.providerData?.map(provider => provider.providerId).join(', ') || 'email';

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

  const completion = useMemo(() => {
    const checks = [Boolean(form.name.trim()), Boolean(email), Boolean(form.phone.trim()), Boolean(effectiveRole)];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [effectiveRole, email, form.name, form.phone]);

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    const cleanName = form.name.trim() || email || 'Utilisateur CRM';
    const cleanPhone = form.phone.trim();
    const updatedAt = new Date().toISOString();

    setSaving(true);
    try {
      if (user.displayName !== cleanName) {
        await updateProfile(user, { displayName: cleanName });
      }

      const payload = {
        uid: user.uid,
        email,
        name: cleanName,
        phone: cleanPhone,
        updatedAt
      };

      await setDoc(doc(db, 'users', user.uid), payload, { merge: true });
      setRemoteProfile(prev => ({ ...prev, ...payload }));
      context?.pushNotification('Profil mis à jour', 'Vos informations CRM ont été enregistrées.', 'success');
    } catch (error) {
      console.error('Erreur de sauvegarde du profil:', error);
      context?.pushNotification('Profil non sauvegardé', 'La mise à jour a échoué. Vérifiez vos droits ou la connexion.', 'warning');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      <section className="bg-white dark:bg-slate-900 border border-slate-200/75 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 bg-gradient-to-br from-brand-950 via-slate-900 to-slate-800 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-5 min-w-0">
              <div className="h-20 w-20 rounded-3xl bg-accent text-brand-950 flex items-center justify-center text-2xl font-black shadow-xl shrink-0">
                {initials}
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
          <div className="space-y-4">
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
              Enregistrer le profil
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
    </div>
  );
}

export default AdminProfil;