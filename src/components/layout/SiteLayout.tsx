import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { scrollToTop } from "../../lib/smoothScroll";

/** Shared chrome for every page. The main region is made inert while a menu is open. */
export function SiteLayout() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the menu during render when the route changes (no extra effect pass).
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <main id="main" tabIndex={-1} inert={menuOpen}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
