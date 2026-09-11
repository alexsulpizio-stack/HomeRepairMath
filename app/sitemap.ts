import type { MetadataRoute } from "next";
import { applianceKeys } from "@/lib/appliances";

const baseUrl = "https://homerepairmath.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorPages: MetadataRoute.Sitemap = applianceKeys.map((slug) => ({
    url: `${baseUrl}/repair-or-replace/${slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...calculatorPages,
    { url: `${baseUrl}/diy-or-hire`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/project-cost`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/methodology`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
