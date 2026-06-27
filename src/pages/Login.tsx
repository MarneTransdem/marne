import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithRedirect,
  signOut
} from 'firebase/auth';
import { auth, cloudFunctions, db } from '../lib/firebase';
import {
  getCrmRoleForAuthenticatedUser,
  getValidCrmRole,
  isManagerBypassEmail,
  refreshCrmAccessClaims,
  upsertCrmAccessProfile
} from '../lib/crm-auth-access';
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
  HelpCircle,
  Loader2
} from 'lucide-react';

export default function Login() {
  const { user, role, loading: authLoading, accessError } = useAuth();
  const navigate = useNavigate();

  // Primary Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState<string | null>(null);
  const [googleRedirectLoading, setGoogleRedirectLoading] = useState(true);
  const [showGoogleRedirectFallback, setShowGoogleRedirectFallback] = useState(false);

  // Auto-set state
  const [showSeeder, setShowSeeder] = useState(false);
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [seedingSuccess, setSeedingSuccess] = useState<string | null>(null);
  const demoLoginEnabled = import.meta.env.VITE_ENABLE_DEMO_LOGIN === 'true';
  const adminBootstrapEnabled = import.meta.env.VITE_ENABLE_ADMIN_BOOTSTRAP === 'true';

  const canBootstrapManager = (checkEmail: string) =>
    adminBootstrapEnabled && checkEmail === 'contact@marnetransdem.com';

  const normalizedLoginEmail = email.trim().toLowerCase();
  const visibleError = error || (!role ? accessError : null);

  const ensureUserHasCrmRole = async (
    uid: string,
    userEmail: string | null,
    displayName?: string | null
  ) => {
    const checkEmail = (userEmail || '').trim().toLowerCase();
    const syncClaims = async () => {
      const refreshedAccess = await refreshCrmAccessClaims(cloudFunctions);
      if (!refreshedAccess.role) return null;

      const currentUser = auth.currentUser;
      if (!currentUser) return null;

      const idTokenResult = await currentUser.getIdTokenResult(true);
      return getValidCrmRole(idTokenResult.claims.role);
    };

    try {
      const claimedRole = await syncClaims();
      if (claimedRole) {
        return true;
      }
    } catch (claimSyncError) {
      console.warn("CRM claims sync failed during login:", claimSyncError);
    }

    const existingRole = await getCrmRoleForAuthenticatedUser(db, uid, checkEmail);

    if (existingRole && isManagerBypassEmail(checkEmail)) {
      return true;
    }

    if (existingRole) {
      setError("Rôle CRM trouvé, mais les droits serveur ne sont pas encore synchronisés. Déployez les fonctions Firebase puis reconnectez-vous.");
      return false;
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

      try {
        const claimedRole = await syncClaims();
        return !!claimedRole || isManagerBypassEmail(checkEmail);
      } catch (claimSyncError) {
        console.warn("CRM claims sync failed after manager bootstrap:", claimSyncError);
        return isManagerBypassEmail(checkEmail);
      }
    }

    return false;
  };

  const buildGoogleProvider = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return provider;
  };

  const completeGoogleCrmLogin = async (
    uid: string,
    userEmail: string | null,
    displayName?: string | null
  ) => {
    const authorized = await ensureUserHasCrmRole(uid, userEmail, displayName);

    if (!authorized) {
      await signOut(auth);
      setError("Compte Google reconnu, mais aucun rôle CRM n'est associé à cette adresse. Demandez à un gérant d'ajouter ce compte dans Liste équipe.");
      return false;
    }

    navigate('/admin');
    return true;
  };

  useEffect(() => {
    let mounted = true;

    const finishRedirectLogin = async () => {
      setGoogleRedirectLoading(true);

      try {
        const redirectResult = await getRedirectResult(auth);
        if (!mounted || !redirectResult?.user) return;

        await completeGoogleCrmLogin(
          redirectResult.user.uid,
          redirectResult.user.email,
          redirectResult.user.displayName
        );
      } catch (err: any) {
        console.error("Google redirect login component error:", err);
        if (!mounted) return;

        if (err.code === 'auth/unauthorized-domain') {
          setError("Domaine non autorisé pour Google. Ajoutez le domaine du site dans Firebase Authentication > Settings > Authorized domains.");
        } else if (err.code === 'auth/account-exists-with-different-credential') {
          setError("Un compte existe déjà avec cette adresse e-mail. Connectez-vous avec la méthode utilisée initialement.");
        } else {
          setError(`Connexion Google impossible (${err.code || 'erreur inconnue'}).`);
        }
      } finally {
        if (mounted) setGoogleRedirectLoading(false);
      }
    };

    finishRedirectLogin();

    return () => {
      mounted = false;
    };
  }, []);

  // Redirect if already logged in and has role
  if (!authLoading && user && role) {
    return <Navigate to="/admin" replace />;
  }

  if (authLoading || googleRedirectLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-premium border border-slate-100 dark:border-slate-800 p-8 md:p-10 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Loader2 size={24} className="animate-spin" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-2 block">Portail Équipe</span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-900 dark:text-white tracking-tight">Connexion en cours</h1>
          <p className="text-sm font-light text-slate-500 dark:text-slate-400 mt-3">
            {googleRedirectLoading ? "Finalisation de la connexion Google..." : "Vérification de votre session..."}
          </p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError(null);
    setPasswordResetSuccess(null);

    const checkEmail = normalizedLoginEmail;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, checkEmail, password);
      const authorized = await ensureUserHasCrmRole(
        userCredential.user.uid,
        userCredential.user.email,
        userCredential.user.displayName
      );

      if (!authorized) {
        await signOut(auth);
        setError("Compte connecté, mais aucun rôle CRM exploitable par Firestore n'est associé à cette adresse.");
        return;
      }

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
            const authorized = await ensureUserHasCrmRole(newUser.uid, checkEmail, newUser.displayName);
            if (!authorized) {
              await signOut(auth);
              setError("Compte gérant créé, mais les droits serveur ne sont pas encore synchronisés.");
              return;
            }
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
            setShowGoogleRedirectFallback(true);
            setError("Ce compte gérant existe déjà, mais le mot de passe saisi est incorrect. Utilisez la connexion Google ou la connexion Google pleine page.");
          } else if (createErr.code === 'auth/operation-not-allowed') {
            setError("L'authentification par e-mail/mot de passe n'est pas activée dans votre console Firebase (Authentication > Sign-in method). Veuillez l'activer.");
          } else {
            setError(`Une erreur de connexion/création est survenue : ${createErr.message || createErr.toString()}`);
          }
        }
      } else {
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          const signInMethods = await fetchSignInMethodsForEmail(auth, checkEmail).catch(() => []);

          if (signInMethods.includes('google.com') && !signInMethods.includes('password')) {
            setShowGoogleRedirectFallback(true);
            setError("Ce compte est rattaché à Google. Utilisez Continuer avec Google ou la connexion Google pleine page si le popup se ferme.");
          } else if (checkEmail === 'contact@marnetransdem.com') {
            setShowGoogleRedirectFallback(true);
            setError("Le compte gérant doit se connecter avec Google, sauf si un mot de passe Firebase a été créé explicitement.");
          } else {
            setError("Identifiants incorrects. Vérifiez l'adresse e-mail et le mot de passe, ou utilisez la connexion Google.");
          }
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

  const handleGoogleRedirectLogin = async () => {
    setGoogleRedirectLoading(true);
    setError(null);
    setSeedingSuccess(null);
    setPasswordResetSuccess(null);

    try {
      await signInWithRedirect(auth, buildGoogleProvider());
    } catch (err: any) {
      console.error("Google redirect start error:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setError("Domaine non autorisé pour Google. Ajoutez le domaine du site dans Firebase Authentication > Settings > Authorized domains.");
      } else {
        setError(`Connexion Google impossible (${err.code || 'erreur inconnue'}).`);
      }
      setGoogleRedirectLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const targetEmail = normalizedLoginEmail;

    if (!targetEmail) {
      setError("Saisissez d'abord l'adresse e-mail du compte à réinitialiser.");
      return;
    }

    setPasswordResetLoading(true);
    setError(null);
    setPasswordResetSuccess(null);

    try {
      await sendPasswordResetEmail(auth, targetEmail);
      setPasswordResetSuccess(`E-mail de réinitialisation envoyé à ${targetEmail}.`);
    } catch (err: any) {
      console.error("Password reset error:", err);
      if (err.code === 'auth/invalid-email') {
        setError("Adresse e-mail invalide.");
      } else if (err.code === 'auth/user-not-found') {
        setError("Aucun compte Firebase n'est associé à cette adresse.");
      } else {
        setError(`Impossible d'envoyer l'e-mail de réinitialisation (${err.code || 'erreur inconnue'}).`);
      }
    } finally {
      setPasswordResetLoading(false);
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
        const signedInUser = await signInWithEmailAndPassword(auth, targetEmail, targetPassword);
        const authorized = await ensureUserHasCrmRole(
          signedInUser.user.uid,
          signedInUser.user.email,
          signedInUser.user.displayName
        );

        if (!authorized) {
          await signOut(auth);
          setError("Compte démo connecté, mais les droits CRM serveur ne sont pas synchronisés.");
          return;
        }

        setSeedingSuccess(`Authentifié avec succès comme ${targetRole}!`);
        navigate('/admin');
      } catch (signInErr: any) {
        const canSeedDemoAccount = signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/wrong-password' || signInErr.code === 'auth/invalid-credential';
        if (!canSeedDemoAccount) {
          throw signInErr;
        }

        const existingMethods = await fetchSignInMethodsForEmail(auth, targetEmail).catch(() => [] as string[]);
        const explainExistingAccount = () => {
          const methodsText = existingMethods.length > 0 ? existingMethods.join(', ') : 'un autre mode de connexion';
          setEmail(targetEmail);
          setError(`Le compte demo ${targetEmail} existe deja, mais le mot de passe demo n'est pas celui de ce compte Firebase. Methodes detectees : ${methodsText}. Utilisez le mode associe ou reinitialisez le mot de passe avant de relancer la demo.`);
        };

        if (signInErr.code !== 'auth/user-not-found' && existingMethods.length > 0) {
          explainExistingAccount();
          return;
        }

        try {
          // 2. Create standard credentials only when Firebase confirms the account is not already usable.
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
          const signedInUser = await signInWithEmailAndPassword(auth, targetEmail, targetPassword);
          const authorized = await ensureUserHasCrmRole(
            signedInUser.user.uid,
            signedInUser.user.email,
            signedInUser.user.displayName
          );

          if (!authorized) {
            await signOut(auth);
            setError("Compte demo cree, mais les droits CRM serveur ne sont pas synchronises.");
            return;
          }

          setSeedingSuccess(`Compte cree et authentifie avec succes en tant que ${targetRole}!`);
          navigate('/admin');
        } catch (createErr: any) {
          if (createErr.code === 'auth/email-already-in-use') {
            explainExistingAccount();
            return;
          }
          throw createErr;
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
        {visibleError && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 p-4 rounded-xl text-red-700 dark:text-red-400 text-xs flex gap-3 items-start mb-6">
            <ShieldAlert size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{visibleError}</span>
          </div>
        )}

        {seedingSuccess && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 p-4 rounded-xl text-green-700 dark:text-green-400 text-xs flex gap-3 items-start mb-6">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{seedingSuccess}</span>
          </div>
        )}

        {passwordResetSuccess && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 p-4 rounded-xl text-green-700 dark:text-green-400 text-xs flex gap-3 items-start mb-6">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">{passwordResetSuccess}</span>
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
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={loading || seedingLoading || passwordResetLoading || !normalizedLoginEmail}
              className="self-end text-[11px] font-bold text-slate-500 hover:text-brand-900 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              {passwordResetLoading ? "Envoi en cours..." : "Mot de passe oublié ?"}
            </button>
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
          disabled={loading || seedingLoading || googleRedirectLoading}
          onClick={handleGoogleRedirectLogin}
          className="w-full bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-sm font-black text-brand-900 dark:text-accent">
            G
          </span>
          Continuer avec Google
        </button>

        {showGoogleRedirectFallback && (
          <button
            type="button"
            disabled={loading || seedingLoading || googleRedirectLoading}
            onClick={handleGoogleRedirectLogin}
            className="mt-3 w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-xl text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {googleRedirectLoading ? "Ouverture Google..." : "Connexion Google pleine page"}
          </button>
        )}

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
