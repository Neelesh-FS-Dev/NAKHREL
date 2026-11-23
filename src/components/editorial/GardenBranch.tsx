import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../../lib/smoothScroll";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/* Leaves sit along the stem: position, rotation and size. */
const leaves = [
  { x: 110, y: 96, r: -38, rx: 13, ry: 5 },
  { x: 175, y: 150, r: 32, rx: 12, ry: 4.5 },
  { x: 245, y: 118, r: -28, rx: 13, ry: 5 },
  { x: 315, y: 100, r: 40, rx: 12, ry: 4.5 },
  { x: 390, y: 70, r: -22, rx: 13, ry: 5 },
  { x: 455, y: 92, r: 30, rx: 12, ry: 4.5 },
  { x: 520, y: 62, r: -34, rx: 11, ry: 4 },
];

/*
 * The NAKHREL garden: a fine botanical branch that draws itself as the section
 * enters, with leaves unfolding one after another. Decorative, drawn in code.
 * Reduced-motion visitors get the finished branch.
 */
export function GardenBranch() {
  const root = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const stem = root.current.querySelector<SVGPathElement>(".garden__stem");
      const leafEls = root.current.querySelectorAll<SVGGElement>(".garden__leaf");
      const buds = root.current.querySelectorAll<SVGGElement>(".garden__bud");
      if (!stem) return;

      const trigger = { trigger: root.current, start: "top 80%", once: true };
      const tl = gsap.timeline({ scrollTrigger: trigger });
      tl.fromTo(stem, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: "power1.inOut" })
        .fromTo(
          leafEls,
          { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, duration: 0.9, stagger: 0.18, ease: "back.out(1.4)" },
          "-=1.4",
        )
        .fromTo(buds, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, stagger: 0.2 }, "-=0.6");

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === root.current) st.kill();
        });
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <svg
      ref={root}
      className="garden"
      viewBox="0 0 600 200"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="garden__stem"
        pathLength={1}
        d="M20 150 C 120 60, 200 190, 300 110 S 480 40, 580 120"
        fill="none"
        stroke="var(--color-botanical)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={0}
      />
      {leaves.map((leaf, i) => (
        <g key={i} className="garden__leaf" transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}>
          <ellipse rx={leaf.rx} ry={leaf.ry} fill="var(--color-botanical)" opacity="0.85" />
        </g>
      ))}
      <g className="garden__bud">
        <circle cx="580" cy="120" r="4" fill="var(--color-accent-terracotta)" />
      </g>
      <g className="garden__bud">
        <circle cx="20" cy="150" r="3" fill="var(--color-accent-terracotta)" />
      </g>
    </svg>
  );
}
