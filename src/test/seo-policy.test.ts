import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sitemap = new DOMParser().parseFromString(
  readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8"),
  "application/xml",
);

describe("Sitemap public visibility", () => {
  it("includes only the institutional homepage, excluding the ad landing", () => {
    const urls = Array.from(sitemap.getElementsByTagName("loc"), (node) => node.textContent);
    expect(urls).toEqual(["https://prolav-lp.lovable.app/"]);
  });

  it("records the homepage content change on 23/11/2026", () => {
    expect(sitemap.getElementsByTagName("lastmod").item(0)?.textContent).toBe("2026-11-23");
  });
});