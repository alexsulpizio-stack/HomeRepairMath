import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HomeRepairMath — Smarter Home Repair Decisions",
    template: "%s | HomeRepairMath",
  },
  description:
    "Free calculators that help homeowners decide whether to repair, replace, DIY, or hire a pro.",
  metadataBase: new URL("https://homerepairmath.com"),
  openGraph: {
    title: "HomeRepairMath",
    description: "The numbers behind smarter home repairs.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell header-inner">
            <a className="brand" href="/" aria-label="HomeRepairMath home">
              HomeRepairMath
            </a>
            <span className="tagline">The numbers behind smarter home repairs.</span>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <strong>HomeRepairMath</strong>
            <p>Practical estimates and decision tools for homeowners. Not a substitute for a licensed professional inspection.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
