import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShop } from "../../features/shop/ShopProvider";
import { lockScroll, unlockScroll } from "../../lib/smoothScroll";
import { assets, lookbook, teaser } from "../../data/assets";

interface MenuLink {
  to: string;
  label: string;
  image: string;
  alt: string;
}

/* Each link previews a photograph of its own page. */
const links: MenuLink[] = [
  { to: "/", label: "Home", image: assets.images.intro, alt: "Woman in a peach and pink saree, turning with one hand raised" },
  { to: "/collections", label: "Collections", image: assets.images.collectionTimeless, alt: "Woman in a royal blue saree with a gold zari border" },
  { to: "/our-story", label: "Our Story", image: lookbook[3].src, alt: lookbook[3].alt },
  { to: "/lookbook", label: "Lookbook", image: lookbook[2].src, alt: lookbook[2].alt },
  { to: "/contact", label: "Contact", image: teaser[0].src, alt: teaser[0].alt },
];

interface HeaderProps {
  menuOpen: boolean;
  onMenuChange: (open: boolean) => void;
}

/*
 * Web: wordmark, inline navigation, wishlist and bag. Mobile: wordmark, wishlist, bag
 * and a Menu trigger that opens a full-screen overlay with large links and a preview
 * photograph that follows hover and focus.
 * Escape closes it, focus is trapped while it is open and returns to the trigger.
 */
export function Header({ menuOpen, onMenuChange }: HeaderProps) {
  const { cartCount, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [preview, setPreview] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    // Focus after the panel has become visible, or the browser refuses it.
    const focusFrame = window.requestAnimationFrame(() => {
      panel?.querySelector<HTMLAnchorElement>("a")?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onMenuChange(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>("a, button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKey);
      unlockScroll();
      trigger?.focus();
    };
  }, [menuOpen, onMenuChange]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__bar container">
        <Link to="/" className="wordmark" aria-label="NAKHREL home">
          NAKHREL
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="site-nav__link">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <Link to="/wishlist" className="site-header__count">
            Wishlist<span className="visually-hidden"> items</span>
            <span aria-label={`${wishlist.length} saved`}> ({wishlist.length})</span>
          </Link>
          <Link to="/cart" className="site-header__count">
            Bag<span className="visually-hidden"> items</span>
            <span aria-label={`${cartCount} in bag`}> ({cartCount})</span>
          </Link>
          <button
            ref={triggerRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => onMenuChange(!menuOpen)}
          >
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        ref={panelRef}
        className={`menu-overlay${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="menu-overlay__inner container">
          <nav aria-label="Primary">
            <ul className="menu-overlay__list">
              {links.map((link, i) => (
                <li key={link.to} style={{ ["--i" as string]: i }}>
                  <Link
                    to={link.to}
                    className="menu-overlay__link"
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="menu-overlay__meta">
              <li>
                <Link to="/wishlist" className="menu-overlay__small">
                  Wishlist ({wishlist.length})
                </Link>
              </li>
              <li>
                <Link to="/cart" className="menu-overlay__small">
                  Bag ({cartCount})
                </Link>
              </li>
            </ul>
          </nav>

          <figure className="menu-overlay__preview" aria-hidden="true">
            {links.map((link, i) => (
              <img
                key={link.to}
                src={link.image}
                alt=""
                className={i === preview ? "is-active" : undefined}
                loading="lazy"
                decoding="async"
              />
            ))}
            <figcaption className="label menu-overlay__caption">{links[preview].label}</figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}
