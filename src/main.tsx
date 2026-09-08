import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
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
  const root = document.getElementById('root')!;
  // Head nodes were serialized outside the React root by the static renderer.
  // Transfer ownership once before hydration so React does not retain duplicate metadata.
  document.head.querySelectorAll('[data-seo="true"]').forEach(element => element.remove());
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  );
  if (root.dataset.ssr === 'true') hydrateRoot(root, app);
  else {
    document.head.querySelectorAll('[data-rh="true"]').forEach(element => element.remove());
    createRoot(root).render(app);
  }
});
