export type CollectionSlug = "timeless-classics" | "everyday-grace" | "occasion-edit";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  summary: string;
  /** Tone pair for the placeholder tile until brand photography is supplied. */
  tone: [string, string];
}

export interface Product {
  slug: string;
  name: string;
  collection: CollectionSlug;
  /** Price in INR, whole rupees. */
  price: number;
  colourway: string;
  /** Hex used for the colourway chip and placeholder tile. */
  colour: string;
  tone: [string, string];
  description: string;
  /** Fabric and care are unverified until NAKHREL supplies them. */
  fabric: string;
  care: string;
}

export interface CartLine {
  slug: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  /** Whole stars, 1 to 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  title: string;
  body: string;
  verifiedPurchase: boolean;
}
