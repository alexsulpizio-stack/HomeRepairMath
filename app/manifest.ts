import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HomeRepairMath",
    short_name: "HomeRepairMath",
    description: "The numbers behind smarter home repairs.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7f4",
    theme_color: "#1f6b45",
  };
}
