import { Link } from "react-router-dom";
import { useShop } from "../../features/shop/ShopProvider";
import { PageIntro } from "../../components/editorial/PageIntro";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { commerceNotice } from "../../data/content";
import { formatINR, getProduct } from "../../data/products";
import { productImages } from "../../data/assets";
import { Picture } from "../../components/media/Picture";

export function Cart() {
  useDocumentMeta("Bag", "Your demo bag for the NAKHREL concept website.");
  const { cart, setQuantity, removeFromCart, subtotal, cartCount } = useShop();

  const lines = cart.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ line, product }] : [];
  });

  return (
    <>
      <PageIntro eyebrow="Bag · demo" title="Your bag">
        {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? "piece" : "pieces"} selected.` : undefined}
      </PageIntro>

      <section className="section container" aria-label="Bag contents">
        {lines.length === 0 ? (
          <div className="empty-state">
            <p className="display-m">Your bag is empty.</p>
            <p className="prose">Nothing has been added yet. The collections are a good place to start.</p>
            <Link to="/collections" className="btn">
              Explore the collection <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <div className="cart">
            <ul className="cart__lines">
              {lines.map(({ line, product }) => (
                <li key={product.slug} className="cart-line">
                  {productImages[product.slug] ? (
                    <Picture
                      className="cart-line__tile"
                      src={productImages[product.slug]}
                      alt=""
                      width={96}
                      height={120}
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="swatch-tile cart-line__tile"
                      style={{ ["--tile-a" as string]: product.tone[0], ["--tile-b" as string]: product.tone[1] }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="cart-line__info">
                    <h2 className="cart-line__name">
                      <Link to={`/products/${product.slug}`}>{product.name}</Link>
                    </h2>
                    <p className="cart-line__colour">{product.colourway}</p>
                    <p className="cart-line__price">{formatINR(product.price)}</p>
                  </div>
                  <div className="cart-line__controls">
                    <label>
                      <span className="visually-hidden">Quantity for {product.name}</span>
                      <select
                        value={line.quantity}
                        onChange={(e) => setQuantity(product.slug, Number(e.target.value))}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="button" className="text-btn" onClick={() => removeFromCart(product.slug)}>
                      Remove<span className="visually-hidden"> {product.name}</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="cart__summary" aria-labelledby="summary-title">
              <h2 id="summary-title" className="label">
                Summary
              </h2>
              <p className="cart__subtotal">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </p>
              <p className="form-message demo-note">{commerceNotice}</p>
              <button type="button" className="btn btn--solid cart__checkout" disabled aria-describedby="checkout-note">
                Checkout unavailable in demo
              </button>
              <p id="checkout-note" className="form-consent">
                Checkout is not connected. A real commerce backend and payment provider are needed before launch.
              </p>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

export default Cart;
