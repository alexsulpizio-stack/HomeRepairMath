import type { MetadataRoute } from "next";
import { applianceKeys } from "@/lib/appliances";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorPages: MetadataRoute.Sitemap = applianceKeys.map((slug) => ({
    url: absoluteUrl(`/repair-or-replace/${slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/tools"), changeFrequency: "monthly", priority: 0.9 },
    ...calculatorPages,
    { url: absoluteUrl("/diy-or-hire"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/project-cost"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/methodology"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/disclaimer"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
