import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

type Role = 'gérant' | 'secrétaire' | 'commercial' | 'chef_equipe';
const VALID_ROLES: Role[] = ['gérant', 'secrétaire', 'commercial', 'chef_equipe'];

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
        const { doc, getDoc } = await import('firebase/firestore');

        unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!isMounted) return;
          setUser(firebaseUser);

          if (!firebaseUser) {
            setRole(null);
            setLoading(false);
            return;
          }

          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            const fetchedRole = userDoc.exists() ? userDoc.data().role : null;

            if (!isMounted) return;
            setRole(VALID_ROLES.includes(fetchedRole) ? fetchedRole : null);
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
