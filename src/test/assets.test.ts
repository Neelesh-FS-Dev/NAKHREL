import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { credits } from "../data/assets";
import { productImages } from "../data/assets";

const root = resolve(__dirname, "..");

describe("asset registry", () => {
  it("credits a source and licence for every stock item", () => {
    for (const c of credits) {
      expect(c.source, c.file).toBeTruthy();
      expect(c.license, c.file).toBeTruthy();
    }
  });

  it("has a file on disk for every credited supplied image", () => {
    const supplied = credits.filter((c) => c.kind !== "video" && !c.file.includes(" / "));
    const found = supplied.map((c) => c.file);
    const onDisk = (name: string) =>
      existsSync(resolve(root, "assets/images/added", name)) ||
      existsSync(resolve(root, "assets/images", name)) ||
      existsSync(resolve(root, "assets/images/stock", name));
    for (const name of found) {
      expect(onDisk(name), name).toBe(true);
    }
  });

  it("maps every demo product to a photograph", () => {
    expect(Object.keys(productImages).length).toBeGreaterThan(0);
  });
});
