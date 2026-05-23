import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_KEY || '';

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <APIProvider apiKey={API_KEY} version="weekly">
    {children}
  </APIProvider>
);
