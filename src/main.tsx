import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

type WindowWithBuffer = Window & typeof globalThis & {
  Buffer?: unknown;
};

async function prepareAdminRuntime() {
  if (typeof window === 'undefined') return;

  const isBackOfficeRoute = window.location.pathname === '/login' || window.location.pathname.startsWith('/admin');
  const targetWindow = window as WindowWithBuffer;

  if (!isBackOfficeRoute || targetWindow.Buffer) return;

  try {
    const {Buffer} = await import('buffer');
    targetWindow.Buffer = Buffer;
  } catch {
    // The CRM can still render; PDF-specific modules bring their own fallbacks when loaded.
  }
}

void prepareAdminRuntime().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
