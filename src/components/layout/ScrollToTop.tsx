import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }

    // The route may still be displaying its Suspense fallback.
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
      return true;
    };
    let observer: MutationObserver | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const frame = requestAnimationFrame(() => {
      if (scrollToTarget()) return;
      observer = new MutationObserver(() => {
        if (scrollToTarget()) {
          observer?.disconnect();
          clearTimeout(timeout);
        }
      });
      observer.observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer?.disconnect(), 10000);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
