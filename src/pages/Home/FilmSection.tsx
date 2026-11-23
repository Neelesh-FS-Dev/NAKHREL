import { assets } from "../../data/assets";
import { film } from "../../data/content";
import { FrameBorder } from "../../components/editorial/FrameBorder";
import { BrandVideo } from "../../components/editorial/BrandVideo";
import { ImageReveal, Reveal } from "../../components/motion/Reveal";

export function FilmSection() {
  return (
    <section className="section film" aria-labelledby="film-title">
      <div className="container film__grid">
        <div className="film__copy">
          <Reveal>
            <p className="label">{film.label}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="film-title" className="display-m">
              {film.title}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="prose film__caption">{film.caption}</p>
          </Reveal>
        </div>

        <div className="frame-art">
          <FrameBorder idPrefix="film" />
          <ImageReveal className="film__frame media">
            <BrandVideo
              webm={assets.logoReveal.webm}
              mp4={assets.logoReveal.mp4}
              poster={assets.logoReveal.poster}
              label="NAKHREL logo reveal film: a botanical vine, birds and the wordmark"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
