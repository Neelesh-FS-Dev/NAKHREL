import { Link } from "react-router-dom";
import { brand } from "../../data/content";
import { Newsletter } from "../editorial/Newsletter";

const YEAR = new Date().getFullYear();

export function Footer() {

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__intro">
          <p className="site-footer__wordmark" aria-hidden="true">
            NAKHREL
          </p>
          <p className="site-footer__blurb">
            An emerging saree label. Warm, feminine and rooted in the textile traditions it loves.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <p className="label">Explore</p>
          <ul>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <Link to="/our-story">Our Story</Link>
            </li>
            <li>
              <Link to="/lookbook">Lookbook</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="site-footer__social">
          <p className="label">Follow</p>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
            Instagram<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="site-footer__newsletter">
          <Newsletter id="footer-newsletter" />
        </div>
      </div>

      <div className="container site-footer__base">
        <p>© {YEAR} NAKHREL. Concept website. Not a live store. <Link to="/credits">Image credits</Link></p>
      </div>
    </footer>
  );
}
