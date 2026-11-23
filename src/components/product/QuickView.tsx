import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatINR, productsInCollection } from "../../data/products";
import { productImages } from "../../data/assets";
import { useShop } from "../../features/shop/ShopProvider";
import type { Product } from "../../types/product";
import { Picture } from "../media/Picture";

interface QuickViewProps {
  product: Product;
  onClose: () => void;
}

/*
 * Quick view: a native dialog with the photo, price, colourways, quantity and add to
 * bag. Escape, Close and a click outside dismiss it, and focus returns to the trigger.
 */
export function QuickView({ product, onClose }: QuickViewProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useShop();

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  const image = productImages[product.slug];
  const others = productsInCollection(product.collection).filter((p) => p.slug !== product.slug);

  return (
    <dialog
      ref={dialog}
      className="quick-view"
      aria-labelledby="quick-view-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className="quick-view__media media">
        {image ? (
          <Picture src={image} alt={`Demo image for ${product.name}`} width={736} height={1308} decoding="async" />
        ) : (
          <div
            className="swatch-tile"
            style={{ ["--tile-a" as string]: product.tone[0], ["--tile-b" as string]: product.tone[1] }}
          />
        )}
      </div>

      <div className="quick-view__info">
        <p className="label">{product.colourway} · Demo</p>
        <h2 id="quick-view-title" className="display-m">
          {product.name}
        </h2>
        <p className="quick-view__price">{formatINR(product.price)}</p>
        <p className="prose">{product.description}</p>

        {others.length > 0 && (
          <p className="quick-view__variants">
            Also in this edit:{" "}
            {others.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && ", "}
                <Link to={`/products/${p.slug}`} onClick={() => dialog.current?.close()}>
                  {p.colourway}
                </Link>
              </span>
            ))}
          </p>
        )}

        <label className="quick-view__qty">
          <span className="label">Quantity</span>
          <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <div className="quick-view__actions">
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => {
              addToCart(product.slug, quantity);
              setAdded(true);
            }}
          >
            Add to bag
          </button>
          <Link to={`/products/${product.slug}`} className="btn" onClick={() => dialog.current?.close()}>
            View full details <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="form-message" aria-live="polite">
          {added ? `Added ${quantity} to bag.` : ""}
        </p>
        <button type="button" className="lightbox__btn quick-view__close" onClick={() => dialog.current?.close()}>
          Close
        </button>
      </div>
    </dialog>
  );
}
