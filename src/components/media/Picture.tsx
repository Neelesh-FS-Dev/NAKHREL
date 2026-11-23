import type { ImgHTMLAttributes } from "react";

/* Every WebP sibling of a bundled JPEG, keyed by its path relative to src/assets/images. */
const webpFiles = import.meta.glob("../../assets/images/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const webpFor = (jpgUrl: string): string | undefined => {
  // Vite gives hashed URLs, so match on the file's base name instead.
  const base = jpgUrl.split("/").pop()?.replace(/\.(jpe?g)$/i, "").replace(/-[A-Za-z0-9_-]{6,12}$/, "");
  if (!base) return undefined;
  const key = Object.keys(webpFiles).find((k) => k.endsWith(`/${base}.webp`));
  return key ? webpFiles[key] : undefined;
};

type PictureProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

/*
 * An <img> that offers a WebP source first, with the original JPEG as the fallback.
 * The WebP is looked up by file name, so callers keep passing the JPEG URL.
 */
export function Picture({ src, className, ...rest }: PictureProps) {
  const webp = webpFor(src);
  if (!webp) return <img src={src} className={className} {...rest} />;
  return (
    <picture className="picture">
      <source srcSet={webp} type="image/webp" />
      <img src={src} className={className} {...rest} />
    </picture>
  );
}
