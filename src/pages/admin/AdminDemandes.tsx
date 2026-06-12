import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { PublicRequests } from '../../components/admin/PublicRequests';
import { useSyncedCollection } from '../../hooks/useData';
import type { Devis, Visite } from '../../types';
import type { AdminOutletContextType } from '../../components/admin/layout/AdminLayout';

type AdminDemandesProps = {
  devisList?: Devis[];
  setDevisList?: React.Dispatch<React.SetStateAction<Devis[]>>;
  setNotifications?: React.Dispatch<React.SetStateAction<any[]>>;
};

export function AdminDemandes({
  devisList: legacyDevisList,
  setDevisList: legacySetDevisList,
  setNotifications: legacySetNotifications
}: AdminDemandesProps = {}) {
  const context = useOutletContext<AdminOutletContextType | undefined>();
  const [syncedDevisList, setSyncedDevisList] = useSyncedCollection<Devis>('devis');
  const [, setVisites] = useSyncedCollection<Visite>('visites');

  const setDevisList = legacySetDevisList ?? setSyncedDevisList;
  const currentDevisList = legacyDevisList ?? syncedDevisList;

  const pushWorkflowNotification = (
    title: string,
    description: string,
    type: 'info' | 'success' | 'warning' = 'success'
  ) => {
    if (context?.pushNotification) {
      context.pushNotification(title, description, type);
      return;
    }

    legacySetNotifications?.(prev => [
      {
        id: `notif-${Date.now()}`,
        title,
        description,
        time: "A l'instant",
        read: false,
        type
      },
      ...prev
    ]);
  };

  return (
    <PublicRequests
      onConvertToDevis={async (newDevisItem: Devis) => {
        await setDevisList([
          newDevisItem,
          ...currentDevisList.filter(devis => devis.id !== newDevisItem.id)
        ]);

        pushWorkflowNotification(
          'Demande étudiée & convertie',
          `La demande de ${newDevisItem.clientName} est devenue le devis brouillon ${newDevisItem.id}.`,
          'success'
        );
      }}
      onPlanVisit={async (visit: Visite) => {
        await setVisites(prev => [
          visit,
          ...prev.filter(item => item.id !== visit.id)
        ]);

        pushWorkflowNotification(
          'Visite planifiée',
          `Rendez-vous ${visit.visitMode === 'visio' ? 'en visio' : 'à domicile'} créé pour ${visit.clientName}.`,
          'success'
        );
      }}
    />
  );
}
