import type { Metadata } from "next";
import Link from "next/link";
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
    siteName: "HomeRepairMath",
  },
  twitter: {
    card: "summary",
    title: "HomeRepairMath",
    description: "The numbers behind smarter home repairs.",
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
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/" aria-label="HomeRepairMath home">HomeRepairMath</Link>
            <nav className="primary-nav" aria-label="Primary navigation">
              <Link href="/tools">Tools</Link>
              <Link href="/methodology">Methodology</Link>
              <Link href="/about">About</Link>
            </nav>
          </div>
        </header>
        <div id="main-content">{children}</div>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <div>
              <strong>HomeRepairMath</strong>
              <p>Practical estimates and decision tools for homeowners. Not a substitute for a licensed professional inspection.</p>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
              <Link href="/tools">Tools</Link>
              <Link href="/about">About</Link>
              <Link href="/methodology">Methodology</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
