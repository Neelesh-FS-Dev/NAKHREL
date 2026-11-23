import { Link } from "react-router-dom";
import { FrameBorder } from "../../components/editorial/FrameBorder";
import { BrandVideo } from "../../components/editorial/BrandVideo";
import { GardenBranch } from "../../components/editorial/GardenBranch";
import { ImageReveal, Reveal } from "../../components/motion/Reveal";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { story } from "../../data/content";
import { assets } from "../../data/assets";
import { Picture } from "../../components/media/Picture";

/*
 * Our Story: the announcement photograph anchors the first screen. Principles
 * are set as staggered statements on the grid, not as numbered cards. The
 * closing line gets a full-width field of colour, then the brand's own motion mark.
 */
export function OurStory() {
  useDocumentMeta("Our Story", "The NAKHREL story: warmth, craft in the details and quiet confidence.");

  return (
    <>
      <section className="story-hero container" aria-labelledby="story-title">
        <figure className="story-hero__media">
          <ImageReveal className="media story-hero__frame">
            <Picture
              src={assets.ownerPhoto}
              alt="Vaishnvi Mahadik in a blush saree with gold jewellery, smiling with one hand resting at her forehead, in soft warm light."
              width={1080}
              height={1350}
              fetchPriority="high"
              decoding="async"
            />
          </ImageReveal>
          <figcaption className="story-hero__caption">Saree line by Vaishnvi Mahadik. Coming soon.</figcaption>
        </figure>

        <div className="story-hero__copy">
          <Reveal>
            <h1 id="story-title" className="story-hero__title">
              A story still unfolding.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="story-hero__lede">{story.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="story-principles container" aria-labelledby="principles-title">
        <h2 id="principles-title" className="visually-hidden">
          What NAKHREL cares about
        </h2>
        <ol className="story-principles__list">
          {story.pillars.map((pillar, i) => (
            <li key={pillar.title} className={`story-principle story-principle--${i % 2 === 0 ? "left" : "right"}`}>
              <Reveal>
                <h3 className="story-principle__title">{pillar.title}</h3>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="story-principle__body">{pillar.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-close" aria-label="Closing thought">
        <div className="container story-close__inner">
          <GardenBranch />
          <Reveal delay={0.1}>
            <blockquote className="story-close__quote">
              <p>The saree is the starting point.</p>
              <p>The person wearing it is the story.</p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/collections" className="btn">
              See the collections <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="story-mark container" aria-labelledby="mark-title">
        <Reveal className="story-mark__copy">
          <h2 id="mark-title" className="display-m">
            Botanical, in motion
          </h2>
          <p className="prose">
            The vine and birds that frame the NAKHREL wordmark, set in motion.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="story-mark__media">
          <div className="frame-art">
            <FrameBorder idPrefix="mark" />
            <div className="media story-mark__frame">
              <BrandVideo
                webm={assets.logoReveal.webm}
                mp4={assets.logoReveal.mp4}
                poster={assets.logoReveal.poster}
                label="NAKHREL logo reveal: a botanical vine, birds and the wordmark"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default OurStory;
