import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const positions = new Map<string, number>();

// Restore after async content grows; stop if the user starts interacting.
export function useHistoryScroll() {
  const location = useLocation();
  const navigation = useNavigationType();
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const target =
      navigation === 'POP'
        ? (positions.get(location.key) ?? 0)
        : navigation === 'REPLACE'
          ? window.scrollY
          : 0;
    let restoring = true;
    const stop = () => {
      restoring = false;
      observer.disconnect();
      clearTimeout(timer);
    };
    const restore = () => {
      window.scrollTo({ top: target, behavior: 'instant' });
      if (Math.abs(window.scrollY - target) < 1) stop();
    };
    const observer = new ResizeObserver(restore);
    observer.observe(document.body);
    const timer = setTimeout(stop, 10000);
    positions.set(location.key, target);
    restore();
    const save = () => {
      if (!restoring) positions.set(location.key, window.scrollY);
    };
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    return () => {
      stop();
      window.removeEventListener('scroll', save);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
      window.history.scrollRestoration = previous;
      if (positions.size > 100) positions.delete(positions.keys().next().value!);
    };
  }, [location.key, navigation]);
}
