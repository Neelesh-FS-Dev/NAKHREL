import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(query).matches;

/** True when the visitor asks for reduced motion. Stays in sync if they change it. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Non-hook read for code that runs outside React (e.g. Lenis setup). */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(query).matches;
