import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import type { Role } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  loading: boolean;
  accessError: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  accessError: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
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

  return (
    <AuthContext.Provider value={{ user, role, loading, accessError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
