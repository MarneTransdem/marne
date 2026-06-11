import type { Firestore } from 'firebase/firestore';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import type { Role } from '../types';

const VALID_CRM_ROLES: Role[] = ['gérant', 'secrétaire', 'commercial', 'chef_equipe'];

type CrmAccessProfile = {
  uid: string;
  email: string;
  role: Role;
  name?: string;
  phone?: string;
  status?: 'Actif' | 'Inactif';
  provider?: string;
};

export function normalizeCrmEmail(email?: string | null) {
  return (email || '').trim().toLowerCase();
}

export function isValidCrmRole(role: unknown): role is Role {
  return typeof role === 'string' && VALID_CRM_ROLES.includes(role as Role);
}

export async function getCrmRoleForAuthenticatedUser(
  db: Firestore,
  uid: string,
  email?: string | null
) {
  const uidDoc = await getDoc(doc(db, 'users', uid));

  if (uidDoc.exists()) {
    const data = uidDoc.data();
    if (data.status !== 'Inactif' && isValidCrmRole(data.role)) {
      return data.role;
    }
  }

  const cleanEmail = normalizeCrmEmail(email);
  if (!cleanEmail) return null;

  const emailDoc = await getDoc(doc(db, 'userRolesByEmail', cleanEmail));
  if (!emailDoc.exists()) return null;

  const data = emailDoc.data();
  if (data.status !== 'Inactif' && isValidCrmRole(data.role)) {
    return data.role;
  }

  return null;
}

export async function upsertCrmAccessProfile(db: Firestore, profile: CrmAccessProfile) {
  const cleanEmail = normalizeCrmEmail(profile.email);
  if (!cleanEmail) {
    throw new Error('CRM access profile requires an email.');
  }

  const payload = {
    uid: profile.uid,
    email: cleanEmail,
    name: profile.name || cleanEmail,
    phone: profile.phone || '',
    role: profile.role,
    status: profile.status || 'Actif',
    provider: profile.provider || 'crm',
    updatedAt: new Date().toISOString()
  };

  await Promise.all([
    setDoc(doc(db, 'users', profile.uid), payload, { merge: true }),
    setDoc(doc(db, 'userRolesByEmail', cleanEmail), payload, { merge: true })
  ]);
}

export async function deleteCrmEmailAccessProfile(db: Firestore, email?: string | null) {
  const cleanEmail = normalizeCrmEmail(email);
  if (!cleanEmail) return;

  await deleteDoc(doc(db, 'userRolesByEmail', cleanEmail));
}

export async function deleteCrmAccessProfile(
  db: Firestore,
  uid: string,
  email?: string | null
) {
  const cleanEmail = normalizeCrmEmail(email);
  const deletions = [deleteDoc(doc(db, 'users', uid))];

  if (cleanEmail) {
    deletions.push(deleteDoc(doc(db, 'userRolesByEmail', cleanEmail)));
  }

  await Promise.all(deletions);
}
