import type { Collection, Product } from "../types/product";

/*
 * DEMO DATA. These collections and products are placeholders for the concept.
 * Names, prices, colourways and descriptions are invented for demonstration.
 * Fabric and care are marked as "to be confirmed" on purpose.
 */

export const collections: Collection[] = [
  {
    slug: "timeless-classics",
    name: "Timeless Classics",
    summary: "Everyday-to-festive sarees built on clean borders and quiet colour.",
    tone: ["#e8b9a4", "#c88f8d"],
  },
  {
    slug: "everyday-grace",
    name: "Everyday Grace",
    summary: "Lighter drapes for long days, coffee, and walking somewhere beautiful.",
    tone: ["#f0d8c6", "#e8b9a4"],
  },
  {
    slug: "occasion-edit",
    name: "Occasion Edit",
    summary: "Richer borders and fuller colour for the evenings you plan around.",
    tone: ["#c88f8d", "#582028"],
  },
];

const TBC = "To be confirmed by NAKHREL.";

export const products: Product[] = [
  {
    slug: "blush-drape-saree",
    name: "Blush Drape Saree",
    collection: "timeless-classics",
    price: 6800,
    colourway: "Blush",
    colour: "#e8b9a4",
    tone: ["#f3d6c8", "#e8b9a4"],
    description:
      "A soft blush saree with a fine contrasting border and an easy, unfussy pallu.",
    fabric: TBC,
    care: TBC,
  },
  {
    slug: "ivory-thread-study",
    name: "Ivory Thread Study",
    collection: "timeless-classics",
    price: 7400,
    colourway: "Ivory",
    colour: "#f3ebdc",
    tone: ["#fbf6ec", "#e6d6c0"],
    description:
      "An ivory base with a restrained thread border, made for quiet confidence.",
    fabric: TBC,
    care: TBC,
  },
  {
    slug: "rose-dusk-border",
    name: "Rose Dusk Border",
    collection: "everyday-grace",
    price: 5200,
    colourway: "Dusty Rose",
    colour: "#c88f8d",
    tone: ["#e2b6b2", "#c88f8d"],
    description:
      "A dusty rose drape with a slim border that works from morning meetings to dinner.",
    fabric: TBC,
    care: TBC,
  },
  {
    slug: "sunlit-peach-drape",
    name: "Sunlit Peach Drape",
    collection: "everyday-grace",
    price: 4900,
    colourway: "Peach",
    colour: "#f0c8b2",
    tone: ["#f7dccd", "#eab7a0"],
    description:
      "Light, warm peach for slow afternoons. Pairs easily with gold or silver.",
    fabric: TBC,
    care: TBC,
  },
  {
    slug: "heritage-vine-saree",
    name: "Heritage Vine Saree",
    collection: "occasion-edit",
    price: 12800,
    colourway: "Burgundy",
    colour: "#582028",
    tone: ["#7a3a44", "#582028"],
    description:
      "A deep burgundy saree with a vine-inspired border, echoing the NAKHREL botanical mark.",
    fabric: TBC,
    care: TBC,
  },
  {
    slug: "evening-rose-gold",
    name: "Evening Rose Gold",
    collection: "occasion-edit",
    price: 15600,
    colourway: "Rose Gold",
    colour: "#b8705a",
    tone: ["#d59c8a", "#b8705a"],
    description:
      "A statement piece for celebrations, with fine gold accents used with restraint.",
    fabric: TBC,
    care: TBC,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const productsInCollection = (slug: string) =>
  products.filter((p) => p.collection === slug);

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
