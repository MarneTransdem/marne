export interface OfflineAction {
  id: string;
  type: 'ASSIGN_RESOURCES';
  moveId: string;
  data: {
    assignedMovers: string[];
    assignedTruck: string;
    previousMovers: string[];
    previousTruck: string;
    date: string;
    clientName: string;
  };
  timestamp: number;
  status: 'pending' | 'failed';
  error?: string;
}

const STORAGE_KEY = 'marne_offline_assignments_queue';

export function getOfflineQueue(): OfflineAction[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Erreur de lecture de la queue offline :", err);
    return [];
  }
}

export function saveOfflineQueue(queue: OfflineAction[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('marne_offline_queue_change'));
    }
  } catch (err) {
    console.error("Erreur d'écriture de la queue offline :", err);
  }
}

export function enqueueAction(
  moveId: string,
  data: OfflineAction['data']
): OfflineAction {
  const queue = getOfflineQueue();
  const newAction: OfflineAction = {
    id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'ASSIGN_RESOURCES',
    moveId,
    data,
    timestamp: Date.now(),
    status: 'pending'
  };

  // Remove any previous pending updates for the same moveId to avoid redundancy
  const filteredQueue = queue.filter(
    (action) => !(action.moveId === moveId && action.status === 'pending')
  );

  filteredQueue.push(newAction);
  saveOfflineQueue(filteredQueue);
  return newAction;
}

export function dequeueAction(actionId: string): void {
  const queue = getOfflineQueue();
  const filtered = queue.filter((a) => a.id !== actionId);
  saveOfflineQueue(filtered);
}

export function updateActionStatus(
  actionId: string,
  status: OfflineAction['status'],
  error?: string
): void {
  const queue = getOfflineQueue();
  const updated = queue.map((action) => {
    if (action.id === actionId) {
      return { ...action, status, error };
    }
    return action;
  });
  saveOfflineQueue(updated);
}

export function clearQueue(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('marne_offline_queue_change'));
    }
  } catch (err) {
    console.error("Erreur de suppression de la queue offline :", err);
  }
}
