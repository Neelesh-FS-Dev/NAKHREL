import type { Ref } from "react";

interface BotanicalProps {
  ref?: Ref<SVGSVGElement>;
  className?: string;
  /** Mirrors the vine horizontally for a second use on the same page. */
  flip?: boolean;
}

/*
 * Simplified vine ornament drawn after the logo's botanical border:
 * a central bud, a looping stem, and small leaves. Decorative only.
 */
export function Botanical({ ref, className, flip = false }: BotanicalProps) {
  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 320 96"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="none" stroke="var(--color-botanical)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M8 62 C 60 40, 96 84, 160 60 S 260 40, 312 62" />
        <path d="M160 60 C 150 40, 152 26, 160 14" />
        <path d="M120 66 C 110 78, 98 80, 88 76" />
        <path d="M200 66 C 210 78, 222 80, 232 76" />
      </g>
      <g fill="var(--color-botanical)" opacity="0.85">
        <ellipse cx="88" cy="76" rx="8" ry="3.2" transform="rotate(-18 88 76)" />
        <ellipse cx="232" cy="76" rx="8" ry="3.2" transform="rotate(18 232 76)" />
        <ellipse cx="110" cy="50" rx="4" ry="2" />
        <ellipse cx="210" cy="50" rx="4" ry="2" />
      </g>
      <path
        d="M160 6 l-5 8 h10 z"
        fill="var(--color-accent-terracotta)"
        opacity="0.9"
      />
      <circle cx="160" cy="62" r="2.4" fill="var(--color-primary)" />
    </svg>
  );
}
