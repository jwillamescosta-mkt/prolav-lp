import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const sitemap = new DOMParser().parseFromString(
  readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8"),
  "application/xml",
);

describe("Sitemap public visibility", () => {
  it("lists the main landing first and the institutional homepage second", () => {
    const urls = Array.from(sitemap.getElementsByTagName("loc"), (node) => node.textContent);
    expect(urls).toEqual(["https://prolav-lp.lovable.app/orcamento", "https://prolav-lp.lovable.app/"]);
  });

  it("gives the main landing the highest priority", () => {
    const priorities = Array.from(sitemap.getElementsByTagName("priority"), (n) => Number(n.textContent));
    expect(priorities).toEqual([1, 0.7]);
  });

  it("records the content change on 23/11/2026", () => {
    const dates = Array.from(sitemap.getElementsByTagName("lastmod"), (n) => n.textContent);
    expect(dates).toEqual(["2026-11-23", "2026-11-23"]);
  });
});
