import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { getCrmRoleForAuthenticatedUser, upsertCrmAccessProfile } from '../lib/crm-auth-access';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  Database, 
  ArrowRight, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function Login() {
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Primary Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-set state
  const [showSeeder, setShowSeeder] = useState(false);
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [seedingSuccess, setSeedingSuccess] = useState<string | null>(null);
  const demoLoginEnabled = import.meta.env.VITE_ENABLE_DEMO_LOGIN === 'true';
  const adminBootstrapEnabled = import.meta.env.VITE_ENABLE_ADMIN_BOOTSTRAP === 'true';

  // Redirect if already logged in and has role
  if (!authLoading && user && role) {
    return <Navigate to="/admin" replace />;
  }

  const canBootstrapManager = (checkEmail: string) =>
    adminBootstrapEnabled && checkEmail === 'contact@marnetransdem.com';

  const ensureUserHasCrmRole = async (
    uid: string,
    userEmail: string | null,
    displayName?: string | null
  ) => {
    const checkEmail = (userEmail || '').trim().toLowerCase();
    const existingRole = await getCrmRoleForAuthenticatedUser(db, uid, checkEmail);

    if (existingRole) {
      return true;
    }

    if (canBootstrapManager(checkEmail)) {
      await upsertCrmAccessProfile(db, {
        uid,
        email: checkEmail,
        role: 'gérant',
        name: displayName || 'Gérant MarneTransdem',
        status: 'Actif',
        provider: 'google'
      });
      return true;
    }

    return false;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError(null);

    const checkEmail = email.trim().toLowerCase();

    try {
      await signInWithEmailAndPassword(auth, checkEmail, password);
      // Success will trigger onAuthStateChanged in AuthProvider
      navigate('/admin');
    } catch (err: any) {
      console.error("Login component error:", err);
      
      // Smart Auto-registration for Gérant (contact@marnetransdem.com)
      if (canBootstrapManager(checkEmail) && 
          (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential')) {
        
        try {
          // Try to create the account if it didn't exist
          const userCredential = await createUserWithEmailAndPassword(auth, checkEmail, password);
          const newUser = userCredential.user;

          // Save the user profile role in Firestore.
          try {
            await upsertCrmAccessProfile(db, {
              uid: newUser.uid,
              email: checkEmail,
              role: 'gérant',
              name: 'Gérant MarneTransdem',
              status: 'Actif',
              provider: 'password'
            });
          } catch (fsErr) {
            console.warn("Firestore setDoc failed during registration (offline/unprovisioned database scenario):", fsErr);
          }

          setSeedingSuccess("Votre compte de Gérant a été automatiquement initialisé et sécurisé avec succès ! Bienvenue.");
          setTimeout(() => {
            navigate('/admin');
          }, 2000);
          return;
        } catch (createErr: any) {
          console.error("Auto-registration error:", createErr);
          if (createErr.code === 'auth/email-already-in-use') {
            setError("Mot de passe incorrect pour le compte gérant existant.");
          } else if (createErr.code === 'auth/operation-not-allowed') {
            setError("L'authentification par e-mail/mot de passe n'est pas activée dans votre console Firebase (Authentication > Sign-in method). Veuillez l'activer.");
          } else {
            setError(`Une erreur de connexion/création est survenue : ${createErr.message || createErr.toString()}`);
          }
        }
      } else {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          setError("Identifiants incorrects. Veuillez vérifier votre adresse e-mail et votre mot de passe.");
        } else if (err.code === 'auth/invalid-email') {
          setError("Adresse e-mail invalide.");
        } else {
          setError(`Une erreur est survenue lors de la connexion (${err.code}). Veuillez vérifier que les connexions par mot de passe sont activées dans votre console Firebase.`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setSeedingSuccess(null);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const userCredential = await signInWithPopup(auth, provider);
      const googleUser = userCredential.user;
      const authorized = await ensureUserHasCrmRole(
        googleUser.uid,
        googleUser.email,
        googleUser.displayName
      );

      if (!authorized) {
        await signOut(auth);
        setError("Compte Google reconnu, mais aucun rôle CRM n'est associé à cette adresse. Demandez à un gérant d'ajouter ce compte dans Liste équipe.");
        return;
      }

      navigate('/admin');
    } catch (err: any) {
      console.error("Google login component error:", err);

      if (err.code === 'auth/popup-closed-by-user') {
        setError("Connexion Google annulée.");
      } else if (err.code === 'auth/popup-blocked') {
        setError("La fenêtre Google a été bloquée par le navigateur. Autorisez les popups pour ce site puis réessayez.");
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError("Un compte existe déjà avec cette adresse e-mail. Connectez-vous avec la méthode utilisée initialement.");
      } else if (err.code === 'auth/operation-not-allowed') {
        setError("La connexion Google n'est pas encore activée dans Firebase Authentication.");
      } else {
        setError(`Connexion Google impossible (${err.code || 'erreur inconnue'}).`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to seed and immediately login with a specific role
  const handleDemoAccess = async (targetRole: Role) => {
    if (!demoLoginEnabled) {
      setError("Les comptes de demo sont desactives sur cet environnement.");
      return;
    }

    setSeedingLoading(true);
    setError(null);
    setSeedingSuccess(null);

    const emailMap: Record<Role, string> = {
      gérant: 'contact@marnetransdem.com',
      secrétaire: 'secretaire@marnetransdem.com',
      commercial: 'commercial@marnetransdem.com',
      chef_equipe: 'chef@marnetransdem.com'
    };

    const targetEmail = emailMap[targetRole];
    const targetPassword = 'Password123!';

    try {
      // 1. Try signing in first
      try {
        await signInWithEmailAndPassword(auth, targetEmail, targetPassword);
        setSeedingSuccess(`Authentifié avec succès comme ${targetRole}!`);
        navigate('/admin');
      } catch (signInErr: any) {
        // If user doesn't exist, try creating it
        if (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/wrong-password' || signInErr.code === 'auth/invalid-credential') {
          // 2. Create standard credentials
          const userCredential = await createUserWithEmailAndPassword(auth, targetEmail, targetPassword);
          const newUser = userCredential.user;

          // 3. Create the database profile user document with their designated roles
          try {
            await upsertCrmAccessProfile(db, {
              uid: newUser.uid,
              email: targetEmail,
              role: targetRole,
              name: targetRole,
              status: 'Actif',
              provider: 'demo'
            });
          } catch (fsErr) {
            console.warn("Firestore setDoc failed during demo registration (offline/unprovisioned database scenario):", fsErr);
          }

          // 4. Then sign in again to reflect
          await signInWithEmailAndPassword(auth, targetEmail, targetPassword);
          setSeedingSuccess(`Compte créé et authentifié avec succès en tant que ${targetRole}!`);
          navigate('/admin');
        } else {
          throw signInErr;
        }
      }
    } catch (err: any) {
      console.error("Seeder failure:", err);
      setError(`Erreur d'initialisation du rôle : ${err.message || err.toString()}. Veillez à vérifier que la méthode de connexion "Adresse e-mail/Mot de passe" est bien activée dans votre console Firebase.`);
    } finally {
      setSeedingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800 p-8 md:p-10 transition-all duration-300">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-2 block">Portail Équipe</span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-900 dark:text-white tracking-tight">MarneTransdem Admin</h1>
          <p className="text-sm font-light text-slate-500 dark:text-slate-400 mt-2">
            Connectez-vous pour piloter l'activité de déménagement.
          </p>
        </div>

        {/* Global Alert Notification */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 p-4 rounded-xl text-red-700 dark:text-red-400 text-xs flex gap-3 items-start mb-6">
            <ShieldAlert size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {seedingSuccess && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 p-4 rounded-xl text-green-700 dark:text-green-400 text-xs flex gap-3 items-start mb-6">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{seedingSuccess}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Adresse E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-default" size={18} />
              <input
                type="email"
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-950 dark:text-white focus:outline-none focus:border-accent dark:focus:border-accent transition-colors duration-300"
                placeholder="nom@marnetransdem.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-default" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-12 text-sm text-slate-950 dark:text-white focus:outline-none focus:border-accent dark:focus:border-accent transition-colors duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading || seedingLoading}
            className="w-full bg-brand-900 border border-brand-900 hover:bg-brand-hover dark:bg-accent dark:border-accent dark:text-brand-900 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Authentification..." : "Se connecter"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ou</span>
          <span className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
        </div>

        <button
          type="button"
          disabled={loading || seedingLoading}
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm font-black text-brand-900 dark:text-accent">
            G
          </span>
          Continuer avec Google
        </button>

        {/* Collapsible Seeder / Pre-configured Testing Roles - Perfect for Reviewing */}
        {demoLoginEnabled && (
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setShowSeeder(!showSeeder)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-brand-900 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Database size={14} className="text-accent" />
              Installation & Connexion rapide démo
            </span>
            <HelpCircle size={14} />
          </button>

          {showSeeder && (
            <div className="mt-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-900 p-4 space-y-3">
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                Idéal pour tester l'application sans configuration manuelle. Cliquez sur un rôle pour provisionner le compte et l'authentifier directement.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={loading || seedingLoading}
                  onClick={() => handleDemoAccess('gérant')}
                  className="bg-white dark:bg-slate-900 hover:border-accent border border-slate-100 dark:border-slate-800 text-left p-2.5 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
                >
                  <p className="text-xs font-black text-brand-900 dark:text-white">Gérant</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Accès total</p>
                </button>

                <button
                  type="button"
                  disabled={loading || seedingLoading}
                  onClick={() => handleDemoAccess('secrétaire')}
                  className="bg-white dark:bg-slate-900 hover:border-accent border border-slate-100 dark:border-slate-800 text-left p-2.5 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
                >
                  <p className="text-xs font-black text-brand-900 dark:text-white">Secrétaire</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Devis/Factures/Plannings</p>
                </button>

                <button
                  type="button"
                  disabled={loading || seedingLoading}
                  onClick={() => handleDemoAccess('commercial')}
                  className="bg-white dark:bg-slate-900 hover:border-accent border border-slate-100 dark:border-slate-800 text-left p-2.5 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
                >
                  <p className="text-xs font-black text-brand-900 dark:text-white">Commercial</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Visites/Planning</p>
                </button>

                <button
                  type="button"
                  disabled={loading || seedingLoading}
                  onClick={() => handleDemoAccess('chef_equipe')}
                  className="bg-white dark:bg-slate-900 hover:border-accent border border-slate-100 dark:border-slate-800 text-left p-2.5 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50"
                >
                  <p className="text-xs font-black text-brand-900 dark:text-white">Chef d'équipe</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Planning de l'équipe</p>
                </button>
              </div>

              {seedingLoading && (
                <div className="text-[10px] text-accent font-semibold animate-pulse text-center">
                  Provisionnement & authentification en cours...
                </div>
              )}
            </div>
          )}
        </div>
        )}

      </div>
    </div>
  );
}
