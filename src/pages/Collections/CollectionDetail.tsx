import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageIntro } from "../../components/editorial/PageIntro";
import { ProductCard } from "../../components/product/ProductCard";
import { SortSelect } from "../../components/product/SortSelect";
import { sortProducts, type SortKey } from "../../lib/sortProducts";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getCollection, productsInCollection } from "../../data/products";
import { NotFound } from "../NotFound/NotFound";

export function CollectionDetail() {
  const { slug = "" } = useParams();
  const collection = getCollection(slug);
  const [sort, setSort] = useState<SortKey>("featured");
  const items = useMemo(
    () => (collection ? sortProducts(productsInCollection(collection.slug), sort) : []),
    [collection, sort],
  );

  useDocumentMeta(
    collection?.name ?? "Collection",
    collection?.summary ?? "A NAKHREL collection.",
  );

  if (!collection) return <NotFound />;

  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link to="/collections">Collections</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{collection.name}</span>
      </nav>
      <PageIntro eyebrow="Collection · demo" title={collection.name}>
        {collection.summary}
      </PageIntro>

      <section className="section container" aria-label={`${collection.name} products`}>
        <div className="toolbar">
          <p className="label">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </p>
          <SortSelect id="collection-sort" value={sort} onChange={setSort} />
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <p className="display-m">Nothing here yet.</p>
            <p className="prose">This edit is still being styled. Explore the rest of the collections in the meantime.</p>
            <Link to="/collections" className="btn">
              Back to collections <span className="btn__arrow" aria-hidden="true">→</span>
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

export default CollectionDetail;
