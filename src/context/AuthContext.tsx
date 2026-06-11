import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';

type Role = 'gérant' | 'secrétaire' | 'commercial' | 'chef_equipe';

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
        const isAdminPath = window.location.pathname.startsWith('/admin') || window.location.pathname === '/login';
        if (!isAdminPath) {
          setLoading(false);
          return;
        }

        if (!isMounted) return;

        const { auth, db } = await import('../lib/firebase');
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');

        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!isMounted) return;
          setUser(user);
          if (user) {
            try {
              const userDoc = await getDoc(doc(db, 'users', user.uid));
              if (userDoc.exists()) {
                const fetchedRole = userDoc.data().role as Role;
                if (!isMounted) return;
                setRole(fetchedRole);
              } else {
                if (!isMounted) return;
                setRole(null);
              }
            } catch (error) {
              console.warn("Erreur de récupération du rôle depuis Firestore :", error);
              if (!isMounted) return;
              setRole(null);
            }
          } else {
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
