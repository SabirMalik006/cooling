import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to `location.hash` after navigation so `/#services` style links land
 * beneath the sticky header on any page.
 */
export default function useScrollToHash(headerOffset = 88) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }

    let attempts = 0;
    let frame = 0;

    const tryScroll = () => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        return;
      }
      attempts += 1;
      if (attempts < 30) frame = window.requestAnimationFrame(tryScroll);
    };

    frame = window.requestAnimationFrame(tryScroll);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash, headerOffset]);
}
