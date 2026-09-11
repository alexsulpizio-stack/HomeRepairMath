import type { Metadata } from "next";
import Link from "next/link";
import DiyHireCalculator from "@/components/DiyHireCalculator";

export const metadata: Metadata = {
  title: "DIY or Hire a Pro Calculator",
  description: "Compare a contractor quote with DIY materials, tools, time, difficulty, and rework risk.",
  alternates: { canonical: "/diy-or-hire" },
};

export default function DiyOrHirePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DIY or Hire a Pro Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Compare a contractor quote with the real planning cost of doing the work yourself.",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="hero compact-hero">
        <div className="shell hero-inner">
          <p className="eyebrow">DIY decision tool</p>
          <h1>DIY or hire a pro?</h1>
          <p className="hero-copy">A cheap-looking DIY project can stop being cheap after tools, time, rework, and risk. This calculator makes those costs visible.</p>
        </div>
      </section>

      <div className="shell content-shell">
        <DiyHireCalculator />

        <section className="content-section">
          <p className="eyebrow">What to count</p>
          <h2>DIY cost is more than the receipt from the hardware store.</h2>
          <p>Materials are only one part of the decision. Include tools you must buy or rent, realistic working time, cleanup, disposal, extra trips, and the possibility that part of the job must be redone.</p>
          <p>Your time does not need to be valued at your wage. Use whatever hourly value makes sense to you. The point is to avoid treating eight hours of your weekend as automatically free.</p>
        </section>

        <aside className="ad-placeholder" aria-label="Advertisement placeholder">
          <span>Future in-content ad placement</span>
          <small>Kept away from inputs and the calculator result.</small>
        </aside>

        <section className="content-section">
          <p className="eyebrow">Safety boundary</p>
          <h2>Some projects should not be reduced to savings.</h2>
          <p>Electrical service work, gas, combustion equipment, structural changes, roofing at height, refrigerants, asbestos or lead hazards, and permit-controlled work can carry consequences that a simple calculator cannot price. When licensing, code, safety, or diagnosis is uncertain, qualified professional help can be the correct answer even if DIY appears cheaper.</p>
          <p>For equipment decisions instead of project labor, use the <Link href="/repair-or-replace/washer">repair-or-replace calculator</Link>.</p>
        </section>
      </div>
    </main>
  );
}
