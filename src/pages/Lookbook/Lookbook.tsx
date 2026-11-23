import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { PageIntro } from "../../components/editorial/PageIntro";
import { Reveal } from "../../components/motion/Reveal";
import { Picture } from "../../components/media/Picture";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { lookbook, portraitSize } from "../../data/assets";
import { lookbookNote } from "../../data/content";

const SWIPE_PX = 48;

/*
 * Editorial grid of licensed stock frames used as concept mood imagery. Each frame
 * opens in a native dialog with previous and next controls, arrow keys and swipe on
 * touch. Escape, the close button or a click outside closes it, and focus returns to
 * the frame that opened it.
 */
export function Lookbook() {
  useDocumentMeta("Lookbook", "A NAKHREL lookbook: editorial frames and textile details.");
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const count = lookbook.length;
  const frame = index === null ? null : lookbook[index];

  useEffect(() => {
    if (index !== null && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [index]);

  const step = (delta: number) => {
    setIndex((current) => (current === null ? null : (current + delta + count) % count));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const onTouchStart = (e: TouchEvent<HTMLDialogElement>) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDialogElement>) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) >= SWIPE_PX) step(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <PageIntro eyebrow="Lookbook" title="Details, in close frame">
        {lookbookNote}
      </PageIntro>

      <section className="section container" aria-label="Lookbook images">
        <ul className="lookbook">
          {lookbook.map((item, i) => (
            <li key={item.id} className={`lookbook__item lookbook__item--${i}`}>
              <figure>
                <button
                  type="button"
                  className="media lookbook__frame lookbook__open"
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setIndex(i);
                  }}
                  aria-label={`Open ${item.label} larger`}
                >
                  <Picture src={item.src} alt="" width={portraitSize.width} height={portraitSize.height} loading="lazy" decoding="async" />
                </button>
                <Reveal>
                  <figcaption className="label lookbook__caption">{item.label}</figcaption>
                </Reveal>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Lookbook frame"
        onClose={() => {
          setIndex(null);
          opener.current?.focus();
        }}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        {frame && (
          <figure className="lightbox__figure">
            <Picture src={frame.src} alt={frame.alt} width={portraitSize.width} height={portraitSize.height} decoding="async" />
            <figcaption className="label">
              {frame.label} · {(index ?? 0) + 1} of {count}
            </figcaption>
          </figure>
        )}
        <div className="lightbox__controls">
          <button type="button" className="lightbox__btn" onClick={() => step(-1)}>
            Previous
          </button>
          <button type="button" className="lightbox__btn" onClick={() => step(1)}>
            Next
          </button>
          <button type="button" className="lightbox__btn lightbox__btn--close" onClick={() => dialog.current?.close()}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Lookbook;
