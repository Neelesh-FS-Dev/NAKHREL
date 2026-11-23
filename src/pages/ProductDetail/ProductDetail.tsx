import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../../components/product/ProductCard";
import { useShop } from "../../features/shop/ShopProvider";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { commerceNotice } from "../../data/content";
import { productImages } from "../../data/assets";
import { ZoomImage } from "../../components/product/ZoomImage";
import { getReviews } from "../../data/reviews";
import { ReviewList, ReviewSummary } from "../../components/product/Ratings";
import { formatINR, getCollection, getProduct, productsInCollection } from "../../data/products";
import { NotFound } from "../NotFound/NotFound";
import { Picture } from "../../components/media/Picture";

export function ProductDetail() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useDocumentMeta(
    product?.name ?? "Product",
    product?.description ?? "A NAKHREL saree.",
  );

  if (!product) return <NotFound />;

  const collection = getCollection(product.collection);
  const siblings = productsInCollection(product.collection);
  const related = siblings.filter((p) => p.slug !== product.slug).slice(0, 3);
  const saved = isWishlisted(product.slug);
  const { reviews, isSample } = getReviews(product.slug);

  const handleAdd = () => {
    addToCart(product.slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link to="/collections">Collections</Link>
        <span aria-hidden="true"> / </span>
        {collection && <Link to={`/collections/${collection.slug}`}>{collection.name}</Link>}
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="product container" aria-labelledby="product-title">
        <div className="product__gallery">
          <div className="media product__main" style={{ viewTransitionName: `product-${product.slug}` }}>
            {productImages[product.slug] ? (
              <ZoomImage src={productImages[product.slug]} alt={`Demo image for ${product.name}`} />
            ) : (
              <div
                className="swatch-tile product__swatch"
                style={{ ["--tile-a" as string]: product.tone[0], ["--tile-b" as string]: product.tone[1] }}
              />
            )}
            <span className="swatch-tile__label product-card__label">Demo image</span>
          </div>
          {productImages[product.slug] ? (
            <div className="media product__detail">
              <Picture
                className="product__crop"
                src={productImages[product.slug]}
                alt={`Close detail of ${product.name} (demo image)`}
                width={736}
                height={1308}
                loading="lazy"
                decoding="async"
              />
              <span className="swatch-tile__label product-card__label">Demo detail</span>
            </div>
          ) : (
            <div
              className="swatch-tile product__detail"
              style={{ ["--tile-a" as string]: product.tone[1], ["--tile-b" as string]: product.tone[0] }}
              aria-hidden="true"
            >
              <span className="swatch-tile__label">Detail shot</span>
            </div>
          )}
        </div>

        <div className="product__info">
          <p className="label">{collection?.name ?? "Collection"} · demo</p>
          <h1 id="product-title" className="display-l">
            {product.name}
          </h1>
          <p className="product__price">{formatINR(product.price)}</p>
          <p className="prose product__description">{product.description}</p>

          <fieldset className="variants">
            <legend className="label">Colourway</legend>
            <div className="variants__options">
              {siblings.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  className="variant"
                  aria-pressed={s.slug === product.slug}
                  onClick={() => navigate(`/products/${s.slug}`)}
                >
                  <span className="variant__chip" style={{ background: s.colour }} aria-hidden="true" />
                  {s.colourway}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="purchase">
            <label className="purchase__qty">
              <span className="label">Quantity</span>
              <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="btn btn--solid purchase__add" onClick={handleAdd}>
              Add to bag
            </button>
            <button
              type="button"
              className="btn"
              aria-pressed={saved}
              onClick={() => toggleWishlist(product.slug)}
            >
              {saved ? "Saved to wishlist" : "Save to wishlist"}
            </button>
          </div>
          <p className="form-message" aria-live="polite">
            {added ? "Added to bag." : ""}
          </p>
          <p className="form-message demo-note">{commerceNotice}</p>

          <dl className="product__specs">
            <div>
              <dt className="label">Colourway</dt>
              <dd>{product.colourway}</dd>
            </div>
            <div>
              <dt className="label">Fabric</dt>
              <dd>{product.fabric}</dd>
            </div>
            <div>
              <dt className="label">Care</dt>
              <dd>{product.care}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="product-details container" aria-labelledby="details-title">
        <h2 id="details-title" className="display-m">
          About this saree
        </h2>
        <div className="product-details__list">
          <details open>
            <summary>Description</summary>
            <p className="prose">{product.description}</p>
          </details>
          <details>
            <summary>Fabric and care</summary>
            <dl className="product-details__specs">
              <div>
                <dt className="label">Fabric</dt>
                <dd>{product.fabric}</dd>
              </div>
              <div>
                <dt className="label">Care</dt>
                <dd>{product.care}</dd>
              </div>
              <div>
                <dt className="label">Colourway</dt>
                <dd>{product.colourway}</dd>
              </div>
            </dl>
          </details>
          <details>
            <summary>Delivery and returns</summary>
            <p className="prose">Delivery times, costs and return terms are to be confirmed by NAKHREL before launch.</p>
          </details>
        </div>
      </section>

      <section className="product-reviews container" aria-labelledby="reviews-title">
        <h2 id="reviews-title" className="display-m">
          Reviews
        </h2>
        <div className="product-reviews__grid">
          <div className="product-reviews__summary">
            <ReviewSummary reviews={reviews} isSample={isSample} />
          </div>
          <div className="product-reviews__list">
            {reviews.length > 0 ? <ReviewList reviews={reviews} isSample={isSample} /> : null}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section container" aria-labelledby="related-title">
          <h2 id="related-title" className="display-m">
            More from {collection?.name ?? "this collection"}
          </h2>
          <ul className="product-grid">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default ProductDetail;
