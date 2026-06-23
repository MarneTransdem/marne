import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableMultiTabIndexedDbPersistence, enableIndexedDbPersistence } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import firebaseConfig from '../../firebase-applet-config.json';

function getRuntimeFirebaseConfig() {
  if (typeof window === 'undefined') return firebaseConfig;

  const host = window.location.host;
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const isFirebaseAuthHost = host.endsWith('.firebaseapp.com') || host.endsWith('.web.app');

  if (isLocal || isFirebaseAuthHost) return firebaseConfig;

  return {
    ...firebaseConfig,
    authDomain: host
  };
}

const app = initializeApp(getRuntimeFirebaseConfig());
const FIREBASE_FUNCTIONS_REGION = 'europe-west4';

export const firebaseApp = app;
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth();
export const cloudFunctions = getFunctions(app, FIREBASE_FUNCTIONS_REGION);

export let analytics: any = null;

if (typeof window !== 'undefined') {
  // Enable offline persistence for Firestore to handle ERR_TIMED_OUT or offline networks smoothly
  const enablePersistence = async () => {
    try {
      if (enableMultiTabIndexedDbPersistence) {
        await enableMultiTabIndexedDbPersistence(db);
      } else if (enableIndexedDbPersistence) {
        await enableIndexedDbPersistence(db);
      }
    } catch (err: any) {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.warn('Firestore persistence failed-precondition (multiple tabs open)');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Firestore persistence unimplemented in this browser');
      } else {
        console.warn('Firestore persistence failed to enable:', err);
      }
    }
  };

  enablePersistence();

  const initAnalytics = () => {
    import('firebase/analytics').then(({ getAnalytics }) => {
      analytics = getAnalytics(app);
    }).catch(err => {
      console.warn('Failed to load Firebase Analytics lazily:', err);
    });
  };

  if (document.readyState === 'complete') {
    setTimeout(initAnalytics, 2500);
  } else {
    window.addEventListener('load', () => {
      setTimeout(initAnalytics, 2500);
    });
  }
}
