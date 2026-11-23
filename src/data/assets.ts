/*
 * Central asset registry. Components import from here, never from raw paths.
 *
 * Provenance (full list in `credits` below):
 * - Brand-supplied: the Coming Soon announcement post (homepage hero, used once)
 *   and the logo reveal reel (film section and Our Story page).
 * - Supplied by the project owner: 12 saree portraits in src/assets/images/added/.
 *   Original sources and licences are not verified. Confirm both before launch.
 * None of these images are NAKHREL products. Product cards use labelled placeholders.
 */
import ownerPhoto from "../assets/images/post-saree-line-coming-soon.jpg";
import logoRevealPoster from "../assets/images/logo-reveal-poster.jpg";
import logoRevealMp4 from "../assets/videos/logo-reveal.mp4";
import logoRevealWebm from "../assets/videos/logo-reveal.webm";

import introPeach from "../assets/images/added/intro-peach-pink-saree.jpeg";
import collectionTimeless from "../assets/images/added/collection-timeless-royal-blue.jpeg";
import collectionEveryday from "../assets/images/added/collection-everyday-green-garden.jpeg";
import collectionOccasion from "../assets/images/added/collection-occasion-red-brocade.jpeg";
import lookbookCreamGreen from "../assets/images/added/lookbook-cream-green-border.jpeg";
import lookbookMaroon from "../assets/images/added/lookbook-maroon-saree.jpeg";
import lookbookDoorway from "../assets/images/added/lookbook-doorway-red.jpeg";
import lookbookGarden from "../assets/images/added/lookbook-garden-cream.jpeg";
import lookbookGoldTissue from "../assets/images/added/lookbook-gold-tissue.jpeg";
import teaserSage from "../assets/images/added/teaser-sage-seated.jpeg";
import teaserDarkGreen from "../assets/images/added/teaser-dark-green-portrait.jpeg";
import teaserLamplit from "../assets/images/added/teaser-lamplit-black.jpeg";

import productBlush from "../assets/images/added/product-blush-drape-saree.jpeg";
import productIvory from "../assets/images/added/product-ivory-thread-study.jpeg";
import productRoseDusk from "../assets/images/added/product-rose-dusk-border.jpeg";
import productPeach from "../assets/images/added/product-sunlit-peach-drape.jpeg";
import productHeritage from "../assets/images/added/product-heritage-vine-saree.jpeg";
import productEveningRose from "../assets/images/added/product-evening-rose-gold.jpeg";

/** Native size of the supplied portraits. Used for layout attributes only. */
export const portraitSize = { width: 736, height: 1308 } as const;

/** Demo product photography, keyed by product slug. Demo only, not NAKHREL stock. */
export const productImages: Record<string, string> = {
  "blush-drape-saree": productBlush,
  "ivory-thread-study": productIvory,
  "rose-dusk-border": productRoseDusk,
  "sunlit-peach-drape": productPeach,
  "heritage-vine-saree": productHeritage,
  "evening-rose-gold": productEveningRose,
};

export const assets = {
  /** The one use of the brand's announcement photo: the homepage hero. */
  ownerPhoto,
  logoReveal: {
    poster: logoRevealPoster,
    mp4: logoRevealMp4,
    webm: logoRevealWebm,
  },
  images: {
    intro: introPeach,
    collectionTimeless,
    collectionEveryday,
    collectionOccasion,
  },
} as const;

/** Lookbook frames. Labels describe the frame, not a product. */
export const lookbook = [
  { id: "cream", src: lookbookCreamGreen, label: "Cream and green", alt: "Smiling woman in a cream saree with a deep green border, in a garden" },
  { id: "maroon", src: lookbookMaroon, label: "Maroon and pink", alt: "Woman in a maroon saree with a pink border, standing among shrubs" },
  { id: "doorway", src: lookbookDoorway, label: "Doorway", alt: "Woman in a red saree standing in a weathered wooden doorway" },
  { id: "garden", src: lookbookGarden, label: "Garden light", alt: "Woman in a cream saree with raised arms, lit by evening light in a garden" },
  { id: "tissue", src: lookbookGoldTissue, label: "Gold tissue", alt: "Pink and gold tissue saree draped over a shoulder, close view" },
] as const;

/** Homepage teaser frames. */
export const teaser = [
  { id: "sage", src: teaserSage, alt: "Woman in a sage-green saree sitting on grass in soft light" },
  { id: "dark-green", src: teaserDarkGreen, alt: "Woman in a saree with a dark green setting, portrait" },
  { id: "lamplit", src: teaserLamplit, alt: "Woman in a black saree in a lamplit room, in black and white" },
] as const;

export interface ImageCredit {
  file: string;
  kind: "photo" | "video" | "brand";
  source: string;
  license: string;
  credit: string;
  /** Where it appears on the site. */
  usedOn: string;
}

const OWNER_SOURCE = "https://www.instagram.com/shopnakhrel/";
const SUPPLIED = {
  kind: "photo" as const,
  source: "Supplied by the project owner (original source not verified)",
  license: "To be confirmed before launch",
  credit: "Project owner to confirm",
};

export const credits: ImageCredit[] = [
  {
    file: "post-saree-line-coming-soon.jpg",
    kind: "brand",
    source: OWNER_SOURCE,
    license: "Supplied by NAKHREL",
    credit: "NAKHREL",
    usedOn: "Home hero (only use)",
  },
  {
    file: "logo-reveal.mp4 / .webm",
    kind: "brand",
    source: OWNER_SOURCE,
    license: "Supplied by NAKHREL",
    credit: "NAKHREL",
    usedOn: "Home film section; Our Story",
  },
  { ...SUPPLIED, file: "intro-peach-pink-saree.jpeg", usedOn: "Home introduction" },
  { ...SUPPLIED, file: "collection-timeless-royal-blue.jpeg", usedOn: "Home collections" },
  { ...SUPPLIED, file: "collection-everyday-green-garden.jpeg", usedOn: "Home collections" },
  { ...SUPPLIED, file: "collection-occasion-red-brocade.jpeg", usedOn: "Home collections" },
  { ...SUPPLIED, file: "lookbook-cream-green-border.jpeg", usedOn: "Lookbook" },
  { ...SUPPLIED, file: "lookbook-maroon-saree.jpeg", usedOn: "Lookbook" },
  { ...SUPPLIED, file: "lookbook-doorway-red.jpeg", usedOn: "Lookbook" },
  { ...SUPPLIED, file: "lookbook-garden-cream.jpeg", usedOn: "Lookbook" },
  { ...SUPPLIED, file: "lookbook-gold-tissue.jpeg", usedOn: "Lookbook" },
  { ...SUPPLIED, file: "teaser-sage-seated.jpeg", usedOn: "Home teaser" },
  { ...SUPPLIED, file: "teaser-dark-green-portrait.jpeg", usedOn: "Home teaser" },
  { ...SUPPLIED, file: "teaser-lamplit-black.jpeg", usedOn: "Home teaser" },
  { ...SUPPLIED, file: "product-blush-drape-saree.jpeg", usedOn: "Product cards and detail (demo)" },
  { ...SUPPLIED, file: "product-ivory-thread-study.jpeg", usedOn: "Product cards and detail (demo)" },
  { ...SUPPLIED, file: "product-rose-dusk-border.jpeg", usedOn: "Product cards and detail (demo)" },
  { ...SUPPLIED, file: "product-sunlit-peach-drape.jpeg", usedOn: "Product cards and detail (demo)" },
  { ...SUPPLIED, file: "product-heritage-vine-saree.jpeg", usedOn: "Product cards and detail (demo)" },
  { ...SUPPLIED, file: "product-evening-rose-gold.jpeg", usedOn: "Product cards and detail (demo)" },
];
