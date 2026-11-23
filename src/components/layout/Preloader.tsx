import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/smoothScroll";
import { Botanical } from "../editorial/Botanical";

/* Hard ceiling: the intro never holds the page longer than this. */
const MAX_WAIT_MS = 2800;

interface PreloaderProps {
  onDone: () => void;
}

/*
 * Short intro that plays once per session. Targets are passed by ref rather than
 * selector strings, since a scoped selector cannot match the scope root itself.
 */
export function Preloader({ onDone }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLParagraphElement>(null);
  const botanical = useRef<SVGSVGElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useGSAP(
    () => {
      let finished = false;
      let tl: gsap.core.Timeline | null = null;

      const finish = () => {
        if (finished) return;
        finished = true;
        tl?.kill();
        doneRef.current();
      };

      const timeout = window.setTimeout(finish, MAX_WAIT_MS);

      tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(timeout);
          finish();
        },
      });

      // Kept short on purpose: the hero photograph is not painted until this clears.
      tl.fromTo(mark.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .fromTo(botanical.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, "-=0.2")
        .fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.15")
        .to(root.current, { yPercent: -100, duration: 0.5, ease: "power3.inOut" });

      return () => {
        window.clearTimeout(timeout);
        tl?.kill();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader" role="status" aria-label="Loading NAKHREL">
      <div className="preloader__inner">
        <Botanical ref={botanical} className="preloader__botanical" />
        <p ref={mark} className="preloader__mark">
          NAKHREL
        </p>
        <span ref={line} className="preloader__line" aria-hidden="true" />
      </div>
    </div>
  );
}
