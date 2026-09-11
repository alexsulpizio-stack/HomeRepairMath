import type { Metadata } from "next";
import Link from "next/link";
import ProjectCostCalculator from "@/components/ProjectCostCalculator";

export const metadata: Metadata = {
  title: "Home Project Cost Estimator",
  description: "Build a home project estimate from your own material prices, labor hours, labor rate, fees, and contingency.",
  alternates: { canonical: "/project-cost" },
};

export default function ProjectCostPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Home Project Cost Estimator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Estimate a home project using user-entered material, labor, fee, and contingency assumptions.",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="hero compact-hero">
        <div className="shell hero-inner">
          <p className="eyebrow">Project planning</p>
          <h1>Home project cost estimator</h1>
          <p className="hero-copy">Use the prices and labor assumptions you actually have. The calculator adds the pieces together and makes contingency visible.</p>
        </div>
      </section>

      <div className="shell content-shell">
        <ProjectCostCalculator />

        <section className="content-section">
          <p className="eyebrow">Better than a single national average</p>
          <h2>Local inputs beat false precision.</h2>
          <p>Labor rates, material choices, taxes, delivery, disposal, and permit costs can differ dramatically. A single national average may be useful for orientation, but it can be a poor budget. This tool starts with the numbers you can verify locally.</p>
          <p>If you only have a contractor quote and are deciding whether the work is worth doing yourself, use the <Link href="/diy-or-hire">DIY vs. hire calculator</Link>.</p>
        </section>

        <aside className="ad-placeholder" aria-label="Advertisement placeholder">
          <span>Future in-content ad placement</span>
          <small>Kept separate from estimate inputs and totals.</small>
        </aside>

        <section className="content-section">
          <p className="eyebrow">Estimate checklist</p>
          <h2>Common costs people forget to budget.</h2>
          <div className="tool-grid">
            <article className="tool-card"><h3>Delivery and disposal</h3><p>Dump fees, haul-away, delivery, and equipment transport can sit outside material pricing.</p></article>
            <article className="tool-card"><h3>Permits and inspections</h3><p>Requirements vary by project and jurisdiction. Verify them locally rather than guessing.</p></article>
            <article className="tool-card"><h3>Consumables</h3><p>Fasteners, blades, adhesives, tape, protection, and cleanup supplies add up.</p></article>
            <article className="tool-card"><h3>Contingency</h3><p>A planning allowance helps prevent a small surprise from breaking the entire budget.</p></article>
          </div>
        </section>
      </div>
    </main>
  );
}
