import { Link } from "react-router-dom";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { Botanical } from "../../components/editorial/Botanical";

export function NotFound() {
  useDocumentMeta("Page not found", "This page could not be found on the NAKHREL website.");

  return (
    <section className="not-found container" aria-labelledby="not-found-title">
      <Botanical className="not-found__botanical" />
      <p className="label">Error 404</p>
      <h1 id="not-found-title" className="display-l">
        This page has slipped away.
      </h1>
      <p className="lede">The link may be out of date. The collections are still here.</p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--solid">
          Back to home
        </Link>
        <Link to="/collections" className="btn">
          Explore the collections
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
