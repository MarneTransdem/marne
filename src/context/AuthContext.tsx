import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import type { Role } from '../types';
import { normalizeModuleAccess, type ModuleAccess } from '../lib/admin-permissions';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  moduleAccess: ModuleAccess;
  loading: boolean;
  accessError: string | null;
}

const EMPTY_MODULE_ACCESS = normalizeModuleAccess(null);

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  moduleAccess: EMPTY_MODULE_ACCESS,
  loading: true,
  accessError: null
});

const normalizeEmail = (email?: string | null) => (email || '').trim().toLowerCase();

type ModuleAccessTab = NonNullable<ModuleAccess['grantedTabs']>[number];

const mergeModuleAccess = (...accessList: Array<Partial<ModuleAccess> | null | undefined>) => {
  const grantedTabs = new Set<ModuleAccessTab>();
  const revokedTabs = new Set<ModuleAccessTab>();

  accessList.forEach((access) => {
    const normalized = normalizeModuleAccess(access);
    normalized.grantedTabs?.forEach(tab => grantedTabs.add(tab));
    normalized.revokedTabs?.forEach(tab => revokedTabs.add(tab));
  });

  return normalizeModuleAccess({
    grantedTabs: Array.from(grantedTabs),
    revokedTabs: Array.from(revokedTabs)
  });
};

const readModuleAccess = (data: unknown) => {
  const profile = data as { moduleAccess?: Partial<ModuleAccess> } | undefined;
  return normalizeModuleAccess(profile?.moduleAccess);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [moduleAccess, setModuleAccess] = useState<ModuleAccess>(EMPTY_MODULE_ACCESS);
  const [accessError, setAccessError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let isMounted = true;

    const initAuth = async () => {
      try {
        if (!isMounted) return;

        const { auth, db, cloudFunctions } = await import('../lib/firebase');
        const { onAuthStateChanged } = await import('firebase/auth');
        const {
          getCrmRoleForAuthenticatedUser,
          getValidCrmRole,
          isManagerBypassEmail,
          refreshCrmAccessClaims
        } = await import('../lib/crm-auth-access');

        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!isMounted) return;

          setLoading(true);
          setUser(firebaseUser);
          setAccessError(null);

          if (!firebaseUser) {
            setRole(null);
            setModuleAccess(EMPTY_MODULE_ACCESS);
            setLoading(false);
            return;
          }

          try {
            let idTokenResult = await firebaseUser.getIdTokenResult();
            let fetchedRole = getValidCrmRole(idTokenResult.claims.role);

            if (!fetchedRole) {
              try {
                const refreshedAccess = await refreshCrmAccessClaims(cloudFunctions);

                if (refreshedAccess.role) {
                  for (let attempt = 0; attempt < 2 && !fetchedRole; attempt += 1) {
                    await firebaseUser.getIdToken(true);
                    idTokenResult = await firebaseUser.getIdTokenResult();
                    fetchedRole = getValidCrmRole(idTokenResult.claims.role);
                  }
                }
              } catch (claimSyncError) {
                console.warn('Erreur de synchronisation des droits CRM :', claimSyncError);
              }
            }

            if (!fetchedRole && isManagerBypassEmail(firebaseUser.email)) {
              fetchedRole = 'gérant';
            }

            if (!fetchedRole) {
              const mirroredRole = await getCrmRoleForAuthenticatedUser(
                db,
                firebaseUser.uid,
                firebaseUser.email
              );

              setAccessError(
                mirroredRole
                  ? 'Rôle CRM trouvé, mais les droits serveur ne sont pas encore synchronisés. Déconnectez-vous puis reconnectez-vous après déploiement des fonctions.'
                  : "Compte connecté, mais aucun rôle CRM actif n'est associé à cette adresse."
              );
            }

            if (!isMounted) return;
            setRole(fetchedRole);
          } catch (error) {
            console.warn('Erreur de récupération du rôle :', error);
            if (!isMounted) return;
            setRole(null);
            setAccessError('Impossible de vérifier les droits CRM de ce compte.');
          }

          setLoading(false);
        });
      } catch (err) {
        console.warn('Échec du chargement dynamique de Firebase Auth:', err);
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setModuleAccess(EMPTY_MODULE_ACCESS);
      return undefined;
    }

    let cancelled = false;
    let userAccess = EMPTY_MODULE_ACCESS;
    let emailAccess = EMPTY_MODULE_ACCESS;
    let unsubscribeUser: (() => void) | null = null;
    let unsubscribeEmail: (() => void) | null = null;

    const publishAccess = () => {
      if (!cancelled) {
        setModuleAccess(mergeModuleAccess(emailAccess, userAccess));
      }
    };

    const subscribe = async () => {
      const { db } = await import('../lib/firebase');
      const { doc, onSnapshot } = await import('firebase/firestore');

      if (cancelled) return;

      unsubscribeUser = onSnapshot(
        doc(db, 'users', user.uid),
        (snapshot) => {
          userAccess = snapshot.exists() ? readModuleAccess(snapshot.data()) : EMPTY_MODULE_ACCESS;
          publishAccess();
        },
        (error) => {
          console.warn('Impossible de suivre les droits par utilisateur :', error);
          userAccess = EMPTY_MODULE_ACCESS;
          publishAccess();
        }
      );

      const cleanEmail = normalizeEmail(user.email);
      if (!cleanEmail) {
        publishAccess();
        return;
      }

      unsubscribeEmail = onSnapshot(
        doc(db, 'userRolesByEmail', cleanEmail),
        (snapshot) => {
          emailAccess = snapshot.exists() ? readModuleAccess(snapshot.data()) : EMPTY_MODULE_ACCESS;
          publishAccess();
        },
        (error) => {
          console.warn('Impossible de suivre les droits par email :', error);
          emailAccess = EMPTY_MODULE_ACCESS;
          publishAccess();
        }
      );
    };

    subscribe().catch((error) => {
      console.warn('Erreur de chargement des accès modulaires CRM :', error);
      setModuleAccess(EMPTY_MODULE_ACCESS);
    });

    return () => {
      cancelled = true;
      if (unsubscribeUser) unsubscribeUser();
      if (unsubscribeEmail) unsubscribeEmail();
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, role, moduleAccess, loading, accessError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
