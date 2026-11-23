import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "../../lib/smoothScroll";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Picture } from "../media/Picture";

export interface PinnedFrame {
  src: string;
  alt: string;
  label: string;
}

interface PinnedFramesProps {
  frames: readonly PinnedFrame[];
}

/*
 * An editorial stage. While the section is pinned, the active frame wipes up over the
 * previous one, its name is set large beside it, and a thin progress line tracks the
 * scroll. The list of names jumps to any frame. Reduced-motion visitors and phones get
 * the frames as a plain grid, so nothing depends on scroll to be seen.
 */
export function PinnedFrames({ frames }: PinnedFramesProps) {
  const root = useRef<HTMLElement>(null);
  const progressBar = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const narrow = useMediaQuery("(max-width: 759px)");
  const plain = reduced || narrow;

  useGSAP(
    () => {
      if (plain || !root.current) return;
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressBar.current) progressBar.current.style.transform = `scaleX(${self.progress})`;
          setIndex(Math.min(frames.length - 1, Math.floor(self.progress * frames.length)));
        },
      });
      return () => trigger.kill();
    },
    { scope: root, dependencies: [plain, frames.length] },
  );

  /* Jump to a frame: scroll to the middle of its share of the pinned distance. */
  const goTo = (i: number) => {
    const section = root.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / frames.length) * travel;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  if (plain) {
    return (
      <ul className="pinned-static">
        {frames.map((frame) => (
          <li key={frame.src}>
            <Picture src={frame.src} alt={frame.alt} width={736} height={1308} loading="lazy" decoding="async" />
            <p className="label">{frame.label}</p>
          </li>
        ))}
      </ul>
    );
  }

  const current = frames[index];

  return (
    <section ref={root} className="pinned" style={{ height: `${frames.length * 75}vh` }} aria-label="Lookbook frames">
      <div className="pinned__stage container">
        <div className="pinned__copy">
          <p className="pinned__data label">
            {index + 1} of {frames.length}
          </p>
          <h3 className="pinned__title" aria-live="polite">
            {current.label}
          </h3>
          <p className="pinned__caption">{current.alt}</p>

          <ol className="pinned__index">
            {frames.map((frame, i) => (
              <li key={frame.src}>
                <button
                  type="button"
                  className="pinned__jump"
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                >
                  {frame.label}
                </button>
              </li>
            ))}
          </ol>

          <div className="pinned__progress" aria-hidden="true">
            <span ref={progressBar} />
          </div>
        </div>

        <div className="pinned__frames">
          {frames.map((frame, i) => (
            <figure key={frame.src} className={`pinned__frame${i === index ? " is-active" : ""}`}>
              <Picture src={frame.src} alt={frame.alt} width={736} height={1308} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
