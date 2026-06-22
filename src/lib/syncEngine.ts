import { Firestore, collection, query, where, getDocs, doc, runTransaction } from 'firebase/firestore';
import { getOfflineQueue, updateActionStatus, dequeueAction } from './offlineQueue';

export async function processOfflineQueue(
  db: Firestore,
  pushNotification: (title: string, description: string, type: 'info' | 'success' | 'warning') => void
): Promise<{ successCount: number; failCount: number }> {
  const queue = getOfflineQueue();
  const pendingActions = queue.filter(action => action.status === 'pending');
  
  if (pendingActions.length === 0) {
    return { successCount: 0, failCount: 0 };
  }

  let successCount = 0;
  let failCount = 0;

  for (const action of pendingActions) {
    const { moveId, data } = action;
    const { assignedMovers, assignedTruck, date, clientName } = data;

    try {
      // 1. Fetch other moves scheduled on the SAME date to check for potential conflicts
      const q = query(collection(db, 'demenagements'), where('date', '==', date));
      const snapshot = await getDocs(q);

      const conflictingMoves: string[] = [];
      const conflictingMovers: string[] = [];

      snapshot.docs.forEach((docSnap) => {
        if (docSnap.id === moveId) return;
        const moveData = docSnap.data();

        if (assignedTruck && moveData.assignedTruck === assignedTruck) {
          conflictingMoves.push(`Véhicule ${assignedTruck} déjà affecté à ${moveData.clientName} (Chantier N° ${docSnap.id})`);
        }

        if (assignedMovers.length > 0 && moveData.assignedMovers) {
          const intersection = assignedMovers.filter((m: string) => moveData.assignedMovers.includes(m));
          if (intersection.length > 0) {
            conflictingMovers.push(`${intersection.join(', ')} déjà affecté(s) à ${moveData.clientName} (Chantier N° ${docSnap.id})`);
          }
        }
      });

      if (conflictingMoves.length > 0 || conflictingMovers.length > 0) {
        const errors = [...conflictingMoves, ...conflictingMovers];
        throw new Error(`Conflit de planification : ${errors.join(' | ')}`);
      }

      // 2. Perform transaction to lock the documents and save
      await runTransaction(db, async (transaction) => {
        const moveDocRef = doc(db, 'demenagements', moveId);
        const freshMoveDoc = await transaction.get(moveDocRef);

        if (!freshMoveDoc.exists()) {
          throw new Error("Le chantier n'existe plus.");
        }

        const freshData = freshMoveDoc.data();
        if (freshData.date !== date) {
          throw new Error("La date du chantier a changé entre-temps.");
        }

        // Lock other potentially conflicting documents inside the transaction to verify they haven't changed
        for (const docSnap of snapshot.docs) {
          if (docSnap.id === moveId) continue;
          
          const freshDoc = await transaction.get(docSnap.ref);
          if (freshDoc.exists()) {
            const currentData = freshDoc.data();
            if (assignedTruck && currentData.assignedTruck === assignedTruck) {
              throw new Error(`Conflit concurrent : le véhicule ${assignedTruck} vient d'être assigné au chantier N° ${docSnap.id}.`);
            }
            if (assignedMovers.length > 0 && currentData.assignedMovers) {
              const intersection = assignedMovers.filter((m: string) => currentData.assignedMovers.includes(m));
              if (intersection.length > 0) {
                throw new Error(`Conflit concurrent : le(s) déménageur(s) ${intersection.join(', ')} viennent d'être assigné(s) au chantier N° ${docSnap.id}.`);
              }
            }
          }
        }

        // Apply update
        transaction.update(moveDocRef, {
          assignedMovers: assignedMovers,
          assignedTruck: assignedTruck,
          status: freshData.status === 'À planifier' ? 'Programmé' : freshData.status
        });
      });

      // Dequeue action on success
      dequeueAction(action.id);
      successCount++;
      pushNotification(
        'Synchronisation réussie',
        `L'affectation de ${clientName} a été synchronisée avec le cloud.`,
        'success'
      );
    } catch (err: any) {
      console.error(`Erreur de synchronisation pour l'action ${action.id} :`, err);
      updateActionStatus(action.id, 'failed', err.message);
      failCount++;
      pushNotification(
        'Échec de synchronisation',
        `Conflit pour ${clientName} : ${err.message || "Erreur indéterminée"}.`,
        'warning'
      );
    }
  }

  return { successCount, failCount };
}
