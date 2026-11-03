import { useCallback, useEffect, useRef } from 'react';

type Motion = 'right' | 'left' | 'popup';
const offset = {
  right: 'translateX(100%)',
  left: 'translateX(-100%)',
  popup: 'translateY(8px) scale(0.98)',
};

// Keep the element mounted until its exit finishes. Cancel work on route changes.
export function usePanelMotion(kind: Motion) {
  const panel = useRef<HTMLElement | null>(null);
  const surface = useRef<HTMLElement | null>(null);
  const generation = useRef(0);
  const backdrop = useRef<HTMLElement | null>(null);
  const animations = useRef<Animation[]>([]);
  const closing = useRef(false);
  const mounted = useRef(true);
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enter = useCallback(() => {
    generation.current += 1;
    if (surface.current) delete surface.current.dataset.closing;
    closing.current = false;
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
    if (reduced()) return;
    if (panel.current)
      animations.current.push(
        panel.current.animate(
          [
            { opacity: 0, transform: offset[kind] },
            { opacity: 1, transform: 'none' },
          ],
          { duration: kind === 'popup' ? 160 : 240, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        ),
      );
    if (backdrop.current)
      animations.current.push(
        backdrop.current.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180 }),
      );
  }, [kind]);
  const close = useCallback(
    async (done: () => void) => {
      if (closing.current) return;
      const current = ++generation.current;
      if (surface.current) surface.current.dataset.closing = 'true';
      const initial = panel.current ? getComputedStyle(panel.current) : null;
      const from = { opacity: initial?.opacity ?? '1', transform: initial?.transform ?? 'none' };
      closing.current = true;
      animations.current.forEach((animation) => animation.cancel());
      animations.current = [];
      if (!reduced()) {
        if (panel.current)
          animations.current.push(
            panel.current.animate([from, { opacity: 0, transform: offset[kind] }], {
              duration: 180,
              easing: 'ease-in',
              fill: 'forwards',
            }),
          );
        if (backdrop.current)
          animations.current.push(
            backdrop.current.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 180,
              fill: 'forwards',
            }),
          );
        await Promise.all(
          animations.current.map((animation) => animation.finished.catch(() => undefined)),
        );
      }
      if (current !== generation.current) return;
      if (mounted.current && closing.current) done();
      animations.current.forEach((animation) => animation.cancel());
      animations.current = [];
      closing.current = false;
    },
    [kind],
  );
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      animations.current.forEach((animation) => animation.cancel());
    };
  }, []);
  return { panel, backdrop, surface, enter, close };
}
