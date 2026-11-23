import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/smoothScroll";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Keep small for an editorial, unhurried feel. */
  y?: number;
}

/** Fades and lifts content once, when it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
}

/** Reveals a media frame with a soft upward clip and a slight settle. */
export function ImageReveal({ children, className }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const frame = ref.current;
      const img = frame.querySelector<HTMLElement>("img, video");
      gsap.fromTo(
        frame,
        { clipPath: "inset(12% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
        },
      );
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: frame, start: "top 85%", once: true },
          },
        );
      }
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export { ScrollTrigger };
