const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

// HomeRepairMath owns this canonical production domain. NEXT_PUBLIC_SITE_URL remains
// available for intentional overrides in preview/staging environments.
export const siteUrl = (
  configuredSiteUrl ||
  (process.env.VERCEL_ENV === "production"
    ? "https://homerepairmath.com"
    : vercelHost
      ? `https://${vercelHost}`
      : "http://localhost:3000")
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
