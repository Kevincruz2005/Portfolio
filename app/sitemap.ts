import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kevin-portfolio-taupe.vercel.app";
  const routes = ["", "/projects", "/about", "/capabilities", "/contact"];

  return routes.map(
    (route, index) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: index === 0 ? 1 : 0.8,
    }),
  );
}
