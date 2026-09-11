const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const siteUrl = (configuredSiteUrl || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
