import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface BrandVideoProps {
  webm: string;
  mp4: string;
  poster: string;
  label: string;
}

/*
 * Muted, looping brand film with its own control bar. It plays while at least half
 * of it is on screen and pauses when it leaves, unless the visitor paused it by hand.
 * Reduced-motion visitors start on the poster. The reel has no audio track, so there
 * is no mute control.
 */
export function BrandVideo({ webm, mp4, poster, label }: BrandVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      void video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  return (
    <div className="brand-video">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const { currentTime, duration } = e.currentTarget;
          if (duration) setProgress((currentTime / duration) * 100);
        }}
        onClick={toggle}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>

      <div className="brand-video__bar">
        <button
          type="button"
          className="brand-video__toggle"
          onClick={toggle}
          aria-label={playing ? "Pause film" : "Play film"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          )}
        </button>
        <input
          className="brand-video__scrub"
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek through the film"
        />
      </div>
    </div>
  );
}
