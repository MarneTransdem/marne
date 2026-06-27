import { auth } from './firebase';

export async function getAdminIdToken(): Promise<string> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) {
    throw new Error("Session administrateur expiree. Reconnectez-vous pour continuer.");
  }
  return token;
}

export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = await getAdminIdToken();
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(input, {
    ...init,
    headers,
  });
}
