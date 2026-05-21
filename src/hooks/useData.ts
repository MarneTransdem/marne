import { collection, onSnapshot, query, Firestore, doc, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState, useEffect, useRef } from 'react';

export const useCollection = <T>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  
  useEffect(() => {
    const q = query(collection(db as Firestore, collectionName));
    return onSnapshot(q, (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T)));
    });
  }, [collectionName]);
  
  return data;
};

// Helper to extract id or uid from item safely
const getItemKey = (item: any): string => {
  return item?.id || item?.uid || '';
};

export const useSyncedCollection = <T extends { id?: string; uid?: string }>(
  collectionName: string,
  initialSeed: T[]
) => {
  const [data, setData] = useState<T[]>(() => {
    try {
      const local = localStorage.getItem(`mt_${collectionName}`);
      return local ? JSON.parse(local) : initialSeed;
    } catch {
      return initialSeed;
    }
  });

  const initializedRef = useRef(false);

  useEffect(() => {
    const q = query(collection(db as Firestore, collectionName));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (snapshot.empty && !initializedRef.current) {
        initializedRef.current = true;
        try {
          const batch = writeBatch(db as Firestore);
          initialSeed.forEach((item) => {
            const key = getItemKey(item);
            if (key) {
              const docRef = doc(db as Firestore, collectionName, key);
              batch.set(docRef, item);
            }
          });
          await batch.commit();
        } catch (e) {
          console.error(`Error initializing Firestore with seed for ${collectionName}:`, e);
        }
      } else if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ ...d.data() } as T));
        
        try {
          localStorage.setItem(`mt_${collectionName}`, JSON.stringify(items));
        } catch (e) {
          console.error(e);
        }

        setData(items);
        initializedRef.current = true;
      }
    });

    return () => unsubscribe();
  }, [collectionName, initialSeed]);

  const setCollectionState = async (
    updater: T[] | ((prev: T[]) => T[])
  ) => {
    const nextData = typeof updater === 'function' ? updater(data) : updater;
    
    const nextIds = new Set(nextData.map((item) => getItemKey(item)).filter(Boolean));

    // Find added or updated items
    const toUpsert = nextData.filter((item) => {
      const key = getItemKey(item);
      const existing = data.find((d) => getItemKey(d) === key);
      return !existing || JSON.stringify(existing) !== JSON.stringify(item);
    });

    // Find deleted items
    const toDelete = data.filter((item) => {
      const key = getItemKey(item);
      return key && !nextIds.has(key);
    });

    setData(nextData);
    try {
      localStorage.setItem(`mt_${collectionName}`, JSON.stringify(nextData));
    } catch (e) {
      console.error(e);
    }

    try {
      const batch = writeBatch(db as Firestore);
      toUpsert.forEach((item) => {
        const key = getItemKey(item);
        if (key) {
          const docRef = doc(db as Firestore, collectionName, key);
          batch.set(docRef, item, { merge: true });
        }
      });
      toDelete.forEach((item) => {
        const key = getItemKey(item);
        if (key) {
          const docRef = doc(db as Firestore, collectionName, key);
          batch.delete(docRef);
        }
      });
      await batch.commit();
    } catch (err) {
      console.error(`Error syncing state with Firestore for ${collectionName}:`, err);
    }
  };

  return [data, setCollectionState] as const;
};
