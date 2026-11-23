import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { Preloader } from "../../components/layout/Preloader";
import { Hero } from "./Hero";
import { FilmSection } from "./FilmSection";
import { Botanical } from "../../components/editorial/Botanical";
import { Newsletter } from "../../components/editorial/Newsletter";
import { ImageReveal, Reveal } from "../../components/motion/Reveal";
import { ProductCard } from "../../components/product/ProductCard";
import { assets, lookbook, portraitSize } from "../../data/assets";
import { PinnedFrames } from "../../components/motion/PinnedFrames";
import { brand, draping, introduction, philosophy } from "../../data/content";
import { collections, products } from "../../data/products";
import { prefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Picture } from "../../components/media/Picture";

const INTRO_KEY = "nakhrel:intro-seen";

/** Intro plays once per session, and never for reduced-motion visitors. */
function shouldShowIntro(): boolean {
  if (prefersReducedMotion()) return false;
  try {
    return !window.sessionStorage.getItem(INTRO_KEY);
  } catch {
    return true;
  }
}

export function Home() {
  useDocumentMeta(
    "NAKHREL",
    "NAKHREL is an emerging Indian saree label. Explore the first look at collections, lookbook and early access.",
  );

  const [showIntro, setShowIntro] = useState(shouldShowIntro);
  const [ready, setReady] = useState(!showIntro);

  const finishIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Storage unavailable. The intro simply replays next visit.
    }
    setReady(true);
    setShowIntro(false);
  }, []);

  const [featured, ...others] = collections;
  const featuredImage = assets.images.collectionTimeless;
  const collectionImages = {
    everyday: assets.images.collectionEveryday,
    occasion: assets.images.collectionOccasion,
  } as const;
  const showcase = products.slice(0, 3);

  return (
    <>
      {showIntro && <Preloader onDone={finishIntro} />}
      <Hero ready={ready} />

      <section className="section intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <ImageReveal className="intro__media media">
            <Picture
              src={assets.images.intro}
              alt="Woman in a peach and pink saree, turning with one hand raised in soft light"
              width={portraitSize.width}
              height={portraitSize.height}
              loading="lazy"
              decoding="async"
            />
          </ImageReveal>
          <div className="intro__copy">
            <Reveal>
              <p className="label">Introduction</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="intro-title" className="display-l">
                {introduction.heading[0]}
                <br />
                <em>{introduction.heading[1]}</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede intro__body">{introduction.body}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <Botanical className="intro__botanical" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section collections-feature" aria-labelledby="collections-title">
        <div className="container">
          <header className="section-head">
            <Reveal>
              <p className="label">Collections</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="collections-title" className="display-m">
                Three ways into the line
              </h2>
            </Reveal>
          </header>

          <div className="collections-feature__grid">
            <Reveal className="collections-feature__large">
              <Link to={`/collections/${featured.slug}`} className="collection-tile collection-tile--large">
                <div className="media collection-tile__media">
                  <Picture src={featuredImage} alt="Woman in an ivory saree with embroidered details, in soft light" width={portraitSize.width} height={portraitSize.height} loading="lazy" decoding="async" />
                </div>
                <div className="collection-tile__copy">
                  <h3 className="display-m">{featured.name}</h3>
                  <p>{featured.summary}</p>
                  <span className="text-link">View the edit</span>
                  <span className="collection-tile__arrow" aria-hidden="true">→</span>
                </div>
              </Link>
            </Reveal>

            <div className="collections-feature__stack">
              {others.map((c, i) => (
                <Reveal key={c.slug} delay={0.15 * (i + 1)}>
                  <Link to={`/collections/${c.slug}`} className="collection-tile">
                    <div className="media collection-tile__media">
                      <Picture
                        src={i === 0 ? collectionImages.everyday : collectionImages.occasion}
                        alt={
                          i === 0
                            ? "Woman in a pale green saree standing on a garden path"
                            : "Woman in a red brocade saree with gold details, against a dark backdrop"
                        }
                        width={portraitSize.width}
                        height={portraitSize.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="collection-tile__copy">
                      <h3 className="display-m">{c.name}</h3>
                      <p>{c.summary}</p>
                      <span className="text-link">View the edit</span>
                  <span className="collection-tile__arrow" aria-hidden="true">→</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section draping" aria-labelledby="draping-title">
        <div className="container draping__grid">
          <div className="draping__sticky">
            <Reveal>
              <p className="label">The art of draping</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 id="draping-title" className="display-l">
                {draping.heading[0]}
                <br />
                <em>{draping.heading[1]}</em>
              </h2>
            </Reveal>
          </div>
          <ol className="draping__beats">
            {draping.beats.map((beat, i) => (
              <li key={beat.title}>
                <Reveal>
                  <span className="draping__index label">0{i + 1}</span>
                  <h3 className="display-m">{beat.title}</h3>
                  <p className="prose">{beat.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FilmSection />

      <section className="section showcase" aria-labelledby="showcase-title">
        <div className="container">
          <header className="section-head section-head--split">
            <div>
              <Reveal>
                <p className="label">Curated preview · demo</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 id="showcase-title" className="display-m">
                  A first look at the edit
                </h2>
              </Reveal>
            </div>
            <Link to="/collections" className="btn">
              All sarees <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </header>
          <ul className="product-grid">
            {showcase.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={0.08 * i}>
                  <ProductCard product={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section philosophy" aria-labelledby="philosophy-title">
        <div className="container philosophy__inner">
          <Reveal>
            <Botanical className="philosophy__botanical" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="philosophy-title" className="philosophy__quote display-xl">
              {philosophy.quote[0]}
              <br />
              <em>{philosophy.quote[1]}</em>
            </h2>
          </Reveal>
        </div>
      </section>

      <section className="section teaser" aria-labelledby="teaser-title">
        <div className="container">
          <header className="section-head section-head--split">
            <div>
              <Reveal>
                <p className="label">Lookbook</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 id="teaser-title" className="display-m">
                  Details, up close
                </h2>
              </Reveal>
            </div>
            <Link to="/lookbook" className="btn">
              Open the lookbook <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </header>
          <PinnedFrames frames={lookbook} />
        </div>
      </section>

      <section className="section social" aria-labelledby="social-title">
        <div className="container social__grid">
          <Reveal>
            <p className="label">Instagram</p>
            <h2 id="social-title" className="display-m">
              Follow the story
            </h2>
            <p className="lede social__body">
              Saree line updates, first looks and everything in between are shared on Instagram.
            </p>
            <a className="btn" href={brand.instagram} target="_blank" rel="noopener noreferrer">
              @shopnakhrel <span className="btn__arrow" aria-hidden="true">↗</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal delay={0.12} className="social__card">
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="social__link">
              <Botanical className="social__botanical" />
              <span className="display-m social__title">{brand.sareeLineCredit}</span>
              <span className="label">{brand.announcement}</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="early-access" className="section early-access" aria-labelledby="early-title">
        <div className="container early-access__grid">
          <Newsletter id="home-newsletter" heading />
        </div>
      </section>
    </>
  );
}

export default Home;
