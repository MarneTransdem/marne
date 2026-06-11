import React from 'react';
import { PublicRequests } from '../../components/admin/PublicRequests';
import { Devis } from '../../types';

interface AdminDemandesProps {
  devisList: Devis[];
  setDevisList: React.Dispatch<React.SetStateAction<Devis[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}

export function AdminDemandes({
  devisList,
  setDevisList,
  setNotifications
}: AdminDemandesProps) {
  return (
    <PublicRequests 
      onConvertToDevis={(newDevisItem) => {
        const updatedDevis = [newDevisItem, ...devisList];
        setDevisList(updatedDevis);
        localStorage.setItem('mt_devis', JSON.stringify(updatedDevis));
        
        // Add simple notification feedback
        setNotifications(prev => [
          {
            id: `notif-${Date.now()}`,
            title: 'Demande Étudiée & Convertie 🚀',
            description: `La demande de ${newDevisItem.clientName} a été convertie en Devis Brouillon ${newDevisItem.id}.`,
            time: 'A l\'instant',
            read: false,
            type: 'success' as const
          },
          ...prev
        ]);
      }}
    />
  );
}
