import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Picture } from "../media/Picture";

interface ZoomImageProps {
  src: string;
  alt: string;
}

/*
 * Product photograph with magnification. Desktop: the image magnifies toward the
 * pointer while hovered. Touch and keyboard: a tap or Enter toggles a fixed zoom.
 */
export function ZoomImage({ src, alt }: ZoomImageProps) {
  const root = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);

  const track = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !root.current) return;
    const box = root.current.getBoundingClientRect();
    root.current.style.setProperty("--zx", `${((e.clientX - box.left) / box.width) * 100}%`);
    root.current.style.setProperty("--zy", `${((e.clientY - box.top) / box.height) * 100}%`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setZoomed((z) => !z);
    }
  };

  return (
    <div
      ref={root}
      className={`zoom${zoomed ? " is-zoomed" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={zoomed}
      aria-label={zoomed ? `Reset zoom on ${alt}` : `Zoom in on ${alt}`}
      onPointerMove={track}
      onClick={() => setZoomed((z) => !z)}
      onKeyDown={onKeyDown}
    >
      <Picture src={src} alt={alt} width={736} height={1308} decoding="async" />
    </div>
  );
}
