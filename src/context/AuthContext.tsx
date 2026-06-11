import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import type { Role } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let isMounted = true;

    const initAuth = async () => {
      try {
        if (!isMounted) return;

        const { auth, db } = await import('../lib/firebase');
        const { onAuthStateChanged } = await import('firebase/auth');
        const { getCrmRoleForAuthenticatedUser } = await import('../lib/crm-auth-access');

        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!isMounted) return;
          setUser(firebaseUser);

          if (!firebaseUser) {
            setRole(null);
            setLoading(false);
            return;
          }

          try {
            const fetchedRole = await getCrmRoleForAuthenticatedUser(
              db,
              firebaseUser.uid,
              firebaseUser.email
            );

            if (!isMounted) return;
            setRole(fetchedRole);
          } catch (error) {
            console.warn("Erreur de récupération du rôle depuis Firestore :", error);
            if (!isMounted) return;
            setRole(null);
          }

          setLoading(false);
        });
      } catch (err) {
        console.warn("Échec du chargement dynamique de Firebase Auth:", err);
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
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
