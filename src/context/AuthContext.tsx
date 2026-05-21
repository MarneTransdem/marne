import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type Role = 'gérant' | 'secrétaire' | 'commercial' | 'chef_equipe';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

function getFallbackRoleByEmail(email: string | null): Role | null {
  if (!email) return null;
  const cleanEmail = email.toLowerCase().trim();
  if (cleanEmail === 'contact@marnetransdem.com' || cleanEmail.includes('alain') || cleanEmail.includes('gerant')) {
    return 'gérant';
  }
  if (cleanEmail === 'secretaire@marnetransdem.com' || cleanEmail.includes('corinne') || cleanEmail.includes('secretaire')) {
    return 'secrétaire';
  }
  if (cleanEmail === 'commercial@marnetransdem.com' || cleanEmail.includes('commercial') || cleanEmail.includes('tardieu')) {
    return 'commercial';
  }
  if (cleanEmail === 'chef@marnetransdem.com' || cleanEmail.includes('chef') || cleanEmail.includes('ahmed') || cleanEmail.includes('equipe')) {
    return 'chef_equipe';
  }
  return 'gérant'; // Fallback to 'gérant'
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const fetchedRole = userDoc.data().role as Role;
            setRole(fetchedRole);
            localStorage.setItem(`mt_role_${user.uid}`, fetchedRole);
          } else {
            const cachedRole = localStorage.getItem(`mt_role_${user.uid}`);
            if (cachedRole) {
              setRole(cachedRole as Role);
            } else {
              const fallback = getFallbackRoleByEmail(user.email);
              setRole(fallback);
              if (fallback) localStorage.setItem(`mt_role_${user.uid}`, fallback);
            }
          }
        } catch (error) {
          console.warn("Erreur de récupération du rôle depuis Firestore, utilisation du fallback hors-ligne :", error);
          const cachedRole = localStorage.getItem(`mt_role_${user.uid}`);
          if (cachedRole) {
            setRole(cachedRole as Role);
          } else {
            const fallback = getFallbackRoleByEmail(user.email);
            setRole(fallback);
            if (fallback) localStorage.setItem(`mt_role_${user.uid}`, fallback);
          }
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
