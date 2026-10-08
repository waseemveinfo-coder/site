import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { solutions } from "@/lib/solutions";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...products.map((p) => `/product/${p.slug}`),
    "/solutions",
    ...solutions.map((s) => `/solutions/${s.slug}`),
    "/security",
    "/pricing",
    "/demo",
    "/support",
    "/help",
    "/blog",
    "/terms",
    "/privacy",
    "/refund",
    "/delivery",
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p.startsWith("/product/privacy") ? 0.9 : 0.7,
  }));
}
