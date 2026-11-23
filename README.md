# NAKHREL: Concept Website

A React + TypeScript concept site for NAKHREL, an emerging Indian saree label. It was built as an unsolicited pitch: it shows how the brand could look online and how a future shop could work. Nothing here is a live store.

## Creative direction

- **Concept:** *The Art of Being Nakhrel*. A quiet, editorial, warm take on saree dressing.
- **Palette:** sampled from the supplied logo reveal. Ivory ground `#f3ebdc`, burgundy wordmark `#582028`, terracotta birds `#b8705a`, with peach, rose and a little gold as accents. The sage botanical tone is an estimate from the vine.
- **Type:** Bodoni Moda (display, close to the wordmark's high-contrast serif) and Manrope (body). Both are self-hosted through Fontsource.
- **Motion:** restrained. A once-per-session intro, a clipped hero reveal, gentle scroll reveals, and image settles. Reduced-motion visitors get static content.

## Technology

- React 19, Vite, TypeScript (strict)
- React Router (route-level code splitting)
- GSAP with `@gsap/react` for timelines and ScrollTrigger
- Lenis for smooth scrolling, driven from GSAP's ticker (one animation loop)
- Plain CSS with design tokens in `src/styles/tokens.css`

## Routes

| Route | Page |
| --- | --- |
| `/` | Editorial homepage (preloader, hero, intro, collections, draping, film, product preview, philosophy, lookbook teaser, Instagram, early access) |
| `/collections` | Collection index and full product grid, with sorting |
| `/collections/:slug` | Individual collection, with sorting and an empty state |
| `/products/:slug` | Product detail: colourway switcher, quantity, add to bag, wishlist, related products |
| `/our-story` | Brand principles (concept copy) |
| `/lookbook` | Editorial grid of detail crops from the supplied photograph |
| `/contact` | Enquiry form with validation and a clearly labelled demo notice |
| `/cart` | Demo bag: quantity, removal, subtotal. Checkout is disabled. |
| `/wishlist` | Saved products |
| `*` | Custom 404 |

Cart and wishlist persist in `localStorage`. Stored entries are re-validated on read.

## Image and video sources

**Brand-supplied (owner's files):**
- `grabfy-shopnakhrel-post-1.jpg`: the "Coming Soon" saree-line announcement. Used **once**, as the homepage hero.
- `grabfy-Df4mRGesk2o-1.mp4`: the logo reveal. Used on the Our Story page as "Botanical, in motion".

**Supplied by the project owner (19 saree portraits in the project root, 12 in use):**
- Copied to `src/assets/images/added/`. Used on the homepage (intro, collections, teaser) and in the lookbook.
- Original sources and licences were not verified. **Confirm them before launch.** The Credits page lists these as "to be confirmed".

**Stock film (concept placeholder):**
- One Pexels clip under the Pexels Licence, used in the film section.

Every file, source, licence and placement is listed in `src/data/assets.ts` (`credits`) and shown on `/credits`.

The Pinterest search page was not used. Pins are copyrighted by their posters, and Pinterest's terms do not grant reuse rights for a public site.

## Demo behaviour

- Add to bag, wishlist and quantity work and persist locally.
- Checkout is disabled, with a notice that no payment is processed.
- The contact form and early-access form validate input and then show a success or demo message stating that nothing was sent or stored. Neither claims a subscription or enquiry that did not happen.

## Production integrations still needed

1. **Commerce backend:** product catalogue, inventory, cart and checkout. Payment provider and tax/shipping rules.
2. **Email:** newsletter provider with double opt-in, and an inbox or CRM for enquiries. Privacy notice and consent wording approved by the brand.
3. **Photography:** product photography (front, detail, and a secondary image per product) and a full lookbook at responsive sizes.
4. **Media delivery:** AVIF/WebP variants with `srcset` and `sizes`, poster frames at multiple sizes, and a proper hero video if one is supplied in portrait and landscape.
5. **Brand messaging:** approved introduction, story and campaign lines.
6. **SEO:** production domain for canonical URLs, sitemap generation, Open Graph image at 1200×630, and a decision on indexing (staging versus live).
7. **Legal:** privacy policy and terms pages (not built here).
8. **Brand mark:** the wordmark is set in the display serif as a stand-in. A cleaned vector logo should be supplied and substituted.

## Development

```bash
npm install
npm run dev        # local development
npm run build      # type-check and production build
npm run lint       # oxlint
npm run preview    # serve the production build
```

## Project structure

```
src/
  app/             router and app shell
  components/      layout, motion (Reveal, ImageReveal), editorial, product
  data/            assets, content copy, demo products (kept separate from presentation)
  features/shop/   cart and wishlist state (localStorage)
  hooks/           reduced-motion, document meta
  lib/             Lenis + GSAP coordination, product sorting
  pages/           one folder per route
  styles/          tokens, globals, section styles
  types/           shared types
```

## Known gaps

- No automated tests yet (Vitest / React Testing Library / Playwright suites are not written).
- Lighthouse and Core Web Vitals have **not** been measured.
- Image-variant pipeline (AVIF/WebP, `srcset`) is not in place. Stock photos are 1400px JPEGs.
- Lookbook lightbox and a full WCAG audit are not done.
