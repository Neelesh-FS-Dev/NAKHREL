import { Link } from "react-router-dom";
import { PageIntro } from "../../components/editorial/PageIntro";
import { ProductCard } from "../../components/product/ProductCard";
import { useShop } from "../../features/shop/ShopProvider";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getProduct } from "../../data/products";

export function Wishlist() {
  useDocumentMeta("Wishlist", "Saved NAKHREL sarees for the concept website.");
  const { wishlist } = useShop();
  const items = wishlist.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });

  return (
    <>
      <PageIntro eyebrow="Wishlist" title="Saved for later">
        {items.length > 0 ? `${items.length} saved ${items.length === 1 ? "piece" : "pieces"}.` : undefined}
      </PageIntro>
      <section className="section container" aria-label="Saved products">
        {items.length === 0 ? (
          <div className="empty-state">
            <p className="display-m">Nothing saved yet.</p>
            <p className="prose">Tap Save on any piece you want to come back to. Your list stays on this device.</p>
            <Link to="/collections" className="btn">
              Browse the collections <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        ) : (
          <ul className="product-grid">
            {items.map((p) => (
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

export default Wishlist;
