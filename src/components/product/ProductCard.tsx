import { useState } from "react";
import { QuickView } from "./QuickView";
import { Link } from "react-router-dom";
import { formatINR } from "../../data/products";
import { productImages } from "../../data/assets";
import { useShop } from "../../features/shop/ShopProvider";
import type { Product } from "../../types/product";
import { Picture } from "../media/Picture";

interface ProductCardProps {
  product: Product;
}

/** Editorial product tile with wishlist and a minimal add-to-bag action. */
export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [added, setAdded] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const saved = isWishlisted(product.slug);

  const handleAdd = () => {
    addToCart(product.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/products/${product.slug}`} className="product-card__link" aria-label={`View ${product.name}`} viewTransition>
          <div className="media product-card__tile" style={{ viewTransitionName: `product-${product.slug}` }}>
            {productImages[product.slug] ? (
              <Picture src={productImages[product.slug]} alt={`Demo image for ${product.name}`} width={736} height={1308} loading="lazy" decoding="async" />
            ) : (
              <div
                className="swatch-tile product-card__swatch"
                style={{
                  ["--tile-a" as string]: product.tone[0],
                  ["--tile-b" as string]: product.tone[1],
                }}
              />
            )}
            <span className="swatch-tile__label product-card__label">Demo image</span>
          </div>
        </Link>
        <button
          type="button"
          className="icon-toggle"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={() => toggleWishlist(product.slug)}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <div className="product-card__meta">
        <div>
          <h3 className="product-card__name">
            <Link to={`/products/${product.slug}`} viewTransition>{product.name}</Link>
          </h3>
          <p className="product-card__colour">{product.colourway}</p>
        </div>
        <p className="product-card__price">{formatINR(product.price)}</p>
      </div>

      <div className="product-card__actions">
        <button type="button" className="btn text-btn" onClick={handleAdd}>
          Add to bag
        </button>
        <button type="button" className="btn text-btn" onClick={() => setQuickOpen(true)}>
          Quick view
        </button>
        <span className="form-message" aria-live="polite">
          {added ? "Added to bag" : ""}
        </span>
      </div>

      {quickOpen && <QuickView product={product} onClose={() => setQuickOpen(false)} />}
    </article>
  );
}
