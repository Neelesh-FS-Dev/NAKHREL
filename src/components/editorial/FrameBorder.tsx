interface FrameBorderProps {
  /** Unique per page, so the SVG definitions do not collide. */
  idPrefix: string;
}

/*
 * Botanical border around a portrait media frame. The art lives in the frame's
 * margin (see .frame-art padding), so it never crosses the video or its controls:
 * a double rule, and a heavier vine with leaves and a terracotta bud at each corner.
 */
export function FrameBorder({ idPrefix }: FrameBorderProps) {
  const corner = `${idPrefix}-corner`;
  const sprig = `${idPrefix}-sprig`;
  return (
    <svg className="frame-border" viewBox="0 0 180 320" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <g id={corner}>
          <path d="M4 27 C 4 14, 12 6, 27 4" fill="none" stroke="var(--color-botanical)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 27 C 3 30, 6 31, 11 31" fill="none" stroke="var(--color-botanical)" strokeWidth="0.9" strokeLinecap="round" />
          <ellipse cx="12" cy="12" rx="4.4" ry="1.9" transform="rotate(-42 12 12)" fill="var(--color-botanical)" opacity="0.9" />
          <ellipse cx="20" cy="8" rx="4.4" ry="1.9" transform="rotate(-14 20 8)" fill="var(--color-botanical)" opacity="0.9" />
          <ellipse cx="8" cy="21" rx="4.4" ry="1.9" transform="rotate(40 8 21)" fill="var(--color-botanical)" opacity="0.9" />
          <ellipse cx="14" cy="28" rx="3.6" ry="1.5" transform="rotate(16 14 28)" fill="var(--color-botanical)" opacity="0.7" />
          <ellipse cx="27" cy="4" rx="2.6" ry="1.2" transform="rotate(-8 27 4)" fill="var(--color-botanical)" opacity="0.7" />
          <circle cx="4" cy="4" r="2.6" fill="var(--color-accent-terracotta)" />
        </g>
        <g id={sprig}>
          <path d="M0 0 C -6 2, -12 2, -16 0" fill="none" stroke="var(--color-botanical)" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M0 0 C 6 2, 12 2, 16 0" fill="none" stroke="var(--color-botanical)" strokeWidth="0.9" strokeLinecap="round" />
          <ellipse cx="-9" cy="-1.6" rx="3.4" ry="1.4" transform="rotate(-18 -9 -1.6)" fill="var(--color-botanical)" opacity="0.9" />
          <ellipse cx="9" cy="-1.6" rx="3.4" ry="1.4" transform="rotate(18 9 -1.6)" fill="var(--color-botanical)" opacity="0.9" />
          <circle cx="0" cy="0" r="2" fill="var(--color-accent-terracotta)" />
        </g>
      </defs>
      <rect x="2" y="2" width="176" height="316" rx="3" fill="none" stroke="var(--color-botanical)" strokeOpacity="0.62" strokeWidth="1" />
      <rect x="7" y="7" width="166" height="306" rx="2" fill="none" stroke="var(--color-botanical)" strokeOpacity="0.42" strokeWidth="0.7" />
      <use href={`#${corner}`} />
      <use href={`#${corner}`} transform="translate(180 0) scale(-1 1)" />
      <use href={`#${corner}`} transform="translate(0 320) scale(1 -1)" />
      <use href={`#${corner}`} transform="translate(180 320) scale(-1 -1)" />
      <use href={`#${sprig}`} transform="translate(90 4)" />
      <use href={`#${sprig}`} transform="translate(90 316) scale(1 -1)" />
    </svg>
  );
}
