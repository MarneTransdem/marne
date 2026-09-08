import React from 'react';

import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const isChromeLessRoute =
    location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className={`min-h-screen ${location.pathname === '/' || isChromeLessRoute ? '' : 'pt-28'}`}
      >
        {children}
      </div>
  );
};
