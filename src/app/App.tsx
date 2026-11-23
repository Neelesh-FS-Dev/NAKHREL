import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "../components/layout/SiteLayout";
import { ShopProvider } from "../features/shop/ShopProvider";
import { initSmoothScroll } from "../lib/smoothScroll";
import { Home } from "../pages/Home/Home";

// Secondary routes are split out of the initial bundle.
const Collections = lazy(() => import("../pages/Collections/Collections"));
const CollectionDetail = lazy(() => import("../pages/Collections/CollectionDetail"));
const ProductDetail = lazy(() => import("../pages/ProductDetail/ProductDetail"));
const OurStory = lazy(() => import("../pages/OurStory/OurStory"));
const Lookbook = lazy(() => import("../pages/Lookbook/Lookbook"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Credits = lazy(() => import("../pages/Credits/Credits"));

function SmoothScrollProvider() {
  useEffect(() => initSmoothScroll(), []);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <SmoothScrollProvider />
        <Suspense fallback={null}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="collections" element={<Collections />} />
              <Route path="collections/:slug" element={<CollectionDetail />} />
              <Route path="products/:slug" element={<ProductDetail />} />
              <Route path="our-story" element={<OurStory />} />
              <Route path="lookbook" element={<Lookbook />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="credits" element={<Credits />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
