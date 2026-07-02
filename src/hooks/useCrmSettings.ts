import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  DEFAULT_CRM_SETTINGS,
  normalizeCrmSettings,
  readLocalCrmSettings,
  writeLocalCrmSettings,
  type CrmSettings
} from '../lib/crm-settings';

export type CrmSettingsSyncStatus = 'sync' | 'local';

export function useCrmSettings() {
  const [settings, setSettings] = useState<CrmSettings>(() => readLocalCrmSettings());
  const [status, setStatus] = useState<CrmSettingsSyncStatus>('local');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'crm_settings', 'default'),
      (snapshot) => {
        if (!snapshot.exists()) {
          setSettings(readLocalCrmSettings());
          setStatus('local');
          return;
        }

        const nextSettings = normalizeCrmSettings(snapshot.data() as Partial<CrmSettings>);
        setSettings(nextSettings);
        writeLocalCrmSettings(nextSettings);
        setStatus('sync');
      },
      (error) => {
        console.warn('Parametres CRM en mode local:', error);
        setSettings(readLocalCrmSettings());
        setStatus('local');
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    settings,
    pricingSettings: settings.pricing || DEFAULT_CRM_SETTINGS.pricing,
    communicationSettings: settings.communication || DEFAULT_CRM_SETTINGS.communication,
    status
  };
}