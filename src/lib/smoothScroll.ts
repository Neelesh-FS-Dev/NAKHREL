/*
 * One rAF loop for the whole site. GSAP's ticker drives Lenis, and Lenis
 * notifies ScrollTrigger, so there are no competing animation frames.
 */
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Starts smooth scrolling. Returns a cleanup function. Skipped for reduced motion. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Locks page scroll while a modal layer (the mobile menu) is open. */
export function lockScroll() {
  lenis?.stop();
  document.body.classList.add("is-locked");
}

export function unlockScroll() {
  lenis?.start();
  document.body.classList.remove("is-locked");
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export { ScrollTrigger, gsap };
