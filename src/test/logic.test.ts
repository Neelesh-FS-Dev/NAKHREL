import { describe, expect, it } from "vitest";
import { formatINR, products } from "../data/products";
import { sortProducts } from "../lib/sortProducts";

describe("sortProducts", () => {
  it("orders by price, low to high and high to low, without mutating input", () => {
    const input = [...products];
    const asc = sortProducts(input, "price-asc");
    const desc = sortProducts(input, "price-desc");
    expect(asc[0].price).toBe(Math.min(...products.map((p) => p.price)));
    expect(desc[0].price).toBe(Math.max(...products.map((p) => p.price)));
    expect(input).toEqual(products);
  });

  it("orders by name alphabetically", () => {
    const names = sortProducts(products, "name").map((p) => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });
});

describe("formatINR", () => {
  it("formats whole rupees with the Indian grouping", () => {
    expect(formatINR(12800)).toBe("₹12,800");
    expect(formatINR(120000)).toBe("₹1,20,000");
  });
});
