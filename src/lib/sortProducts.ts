import type { Product } from "../types/product";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name, A to Z",
};

/** Returns a sorted copy. The input list is never mutated. */
export function sortProducts(list: Product[], key: SortKey): Product[] {
  const copy = [...list];
  switch (key) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}
