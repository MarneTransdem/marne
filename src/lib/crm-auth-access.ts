import type { Firestore } from 'firebase/firestore';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import type { Functions } from 'firebase/functions';
import type { Role } from '../types';

const VALID_CRM_ROLES: Role[] = ['gérant', 'secrétaire', 'commercial', 'chef_equipe'];
const MANAGER_EMAIL = 'contact@marnetransdem.com';

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

export function isManagerBypassEmail(email?: string | null) {
  return normalizeCrmEmail(email) === MANAGER_EMAIL;
}

export function isSyntheticCrmUid(uid?: string | null) {
  return !!uid && uid.startsWith('collab-');
}

export function isValidCrmRole(role: unknown): role is Role {
  return typeof role === 'string' && VALID_CRM_ROLES.includes(role as Role);
}

export function getValidCrmRole(role: unknown): Role | null {
  return isValidCrmRole(role) ? role : null;
}

export type CrmAccessClaimRefreshResult = {
  role: Role | null;
  status: 'active' | 'missing_role' | 'missing_email';
};

export async function refreshCrmAccessClaims(functionsInstance: Functions) {
  const { httpsCallable } = await import('firebase/functions');
  const refreshClaims = httpsCallable<unknown, CrmAccessClaimRefreshResult>(
    functionsInstance,
    'refreshCrmAccessClaims'
  );

  const result = await refreshClaims({});
  return {
    role: getValidCrmRole(result.data.role),
    status: result.data.status
  };
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

  const writes = [setDoc(doc(db, 'userRolesByEmail', cleanEmail), payload, { merge: true })];

  if (!isSyntheticCrmUid(profile.uid)) {
    writes.push(setDoc(doc(db, 'users', profile.uid), payload, { merge: true }));
  }

  await Promise.all(writes);
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
  const deletions: Array<Promise<void>> = [];

  if (cleanEmail) {
    deletions.push(deleteDoc(doc(db, 'userRolesByEmail', cleanEmail)));
  }

  if (!isSyntheticCrmUid(uid)) {
    deletions.push(deleteDoc(doc(db, 'users', uid)));
  }

  await Promise.all(deletions);
}
