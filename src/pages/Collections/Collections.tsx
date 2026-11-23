import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "../../components/editorial/PageIntro";
import { ProductCard } from "../../components/product/ProductCard";
import { SortSelect } from "../../components/product/SortSelect";
import { sortProducts, type SortKey } from "../../lib/sortProducts";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { collections, products } from "../../data/products";
import { commerceNotice } from "../../data/content";
import { assets } from "../../data/assets";
import { Picture } from "../../components/media/Picture";


/* Each collection's photograph. Demo mood imagery, not NAKHREL product photography. */
const collectionFrames = {
  "timeless-classics": {
    src: assets.images.collectionTimeless,
    alt: "Woman in a royal blue saree with a gold zari border and gold jewellery",
  },
  "everyday-grace": {
    src: assets.images.collectionEveryday,
    alt: "Woman in a pale green saree standing on a garden path",
  },
  "occasion-edit": {
    src: assets.images.collectionOccasion,
    alt: "Woman in a red brocade saree with gold details, against a dark backdrop",
  },
} as const;

/* Colour families that exist in the catalogue. Only these appear as filters. */
const colourOptions = Array.from(new Map(products.map((p) => [p.colourway, p.colour])).entries()).map(
  ([name, hex]) => ({ name, hex }),
);

export function Collections() {
  useDocumentMeta("Collections", "Browse the NAKHREL saree collections: demo edits shown for concept review.");
  const [sort, setSort] = useState<SortKey>("featured");
  const [colour, setColour] = useState<string | null>(null);
  const sorted = useMemo(
    () => sortProducts(colour ? products.filter((p) => p.colourway === colour) : products, sort),
    [sort, colour],
  );

  return (
    <>
      <PageIntro eyebrow="Collections" title="The edit">
        Three ways to explore the line. Every piece shown here is a placeholder for concept review.
      </PageIntro>

      <section className="section container" aria-label="Collections">
        <ul className="collection-rows">
          {collections.map((c, i) => {
            const frame = collectionFrames[c.slug];
            return (
              <li key={c.slug}>
                <Link
                  to={`/collections/${c.slug}`}
                  className={`collection-row__link collection-row ${i % 2 === 1 ? "collection-row--flip" : ""}`}
                >
                  <div className="media collection-row__media">
                    <Picture src={frame.src} alt={frame.alt} width={736} height={1308} loading="lazy" decoding="async" />
                  </div>
                  <div className="collection-row__copy">
                    <h2 className="display-m">{c.name}</h2>
                    <p>{c.summary}</p>
                    <span className="text-link">Browse {c.name.toLowerCase()}</span>
                    <span className="collection-row__arrow" aria-hidden="true">→</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section container" aria-labelledby="all-sarees">
        <div className="colour-filter">
          <p className="label" id="colour-filter-label">Explore by colour</p>
          <div className="colour-filter__options" role="group" aria-labelledby="colour-filter-label">
            <button type="button" className="colour-chip" aria-pressed={colour === null} onClick={() => setColour(null)}>
              All colours
            </button>
            {colourOptions.map((option) => (
              <button
                key={option.name}
                type="button"
                className="colour-chip"
                aria-pressed={colour === option.name}
                onClick={() => setColour(option.name)}
              >
                <span className="colour-chip__swatch" style={{ background: option.hex }} aria-hidden="true" />
                {option.name}
              </button>
            ))}
          </div>
        </div>

        <div className="toolbar">
          <h2 id="all-sarees" className="display-m">
            All sarees
          </h2>
          <SortSelect id="collections-sort" value={sort} onChange={setSort} />
        </div>
        <p className="form-message demo-note">{commerceNotice}</p>
        {sorted.length === 0 ? (
          <p className="prose">No pieces in this colour yet.</p>
        ) : (
          <ul className="product-grid">
            {sorted.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Collections;
