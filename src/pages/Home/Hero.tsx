import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/smoothScroll";
import { hero } from "../../data/content";
import { assets } from "../../data/assets";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Picture } from "../../components/media/Picture";

interface HeroProps {
  /** False while the intro preloader is still on screen. */
  ready: boolean;
}

/*
 * Desktop: type leads, photograph sits to the right and settles from a soft clip.
 * Mobile: the photograph is given the top of the screen and the headline sits
 * below it on the ivory ground, so no text is laid over busy imagery.
 */
export function Hero({ ready }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ready || reduced || !root.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero__line > span",
        { yPercent: 105 },
        { yPercent: 0, duration: 1.2, stagger: 0.12 },
      )
        .fromTo(
          ".hero__frame",
          { clipPath: "inset(14% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power3.inOut" },
          0.1,
        )
        .fromTo(".hero__photo", { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0.1)
        .fromTo(".hero__meta, .hero__lede, .hero__actions", { autoAlpha: 0, y: 16 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
        }, 0.7)
        .fromTo(".hero__rule", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.9);
    },
    { scope: root, dependencies: [ready, reduced] },
  );

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__text container">
        <p className="hero__meta label">{hero.eyebrow}</p>
        <h1 id="hero-title" className="hero__title display-xl">
          {hero.title.map((line) => (
            <span className="hero__line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <span className="hero__rule" aria-hidden="true" />
        <p className="hero__lede lede">{hero.supporting}</p>
        <div className="hero__actions">
          <Link to={hero.primaryCta.to} className="btn btn--solid">
            {hero.primaryCta.label} <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link to={hero.secondaryCta.to} className="btn">
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="hero__art">
      <div className="hero__frame">
        <Picture
          className="hero__photo"
          src={assets.ownerPhoto}
          alt="A smiling woman in a blush saree with gold jewellery, one hand resting at her forehead, in soft warm light."
          width={1080}
          height={1350}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      </div>
    </section>
  );
}
