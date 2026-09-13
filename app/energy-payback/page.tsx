import type { Metadata } from "next";
import Link from "next/link";
import EnergyPaybackCalculator from "@/components/EnergyPaybackCalculator";

export const metadata: Metadata = {
  title: "Energy Efficiency Payback Calculator",
  description: "Compare the extra upfront cost of an efficient home upgrade with annual energy savings and your expected ownership horizon.",
  alternates: { canonical: "/energy-payback" },
};

export default function EnergyPaybackPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Energy Efficiency Payback Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Calculate simple payback for the incremental cost of a more energy-efficient home equipment option.",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="hero compact-hero">
        <div className="shell hero-inner">
          <p className="eyebrow">Efficiency decision tool</p>
          <h1>Energy efficiency payback calculator</h1>
          <p className="hero-copy">Find out whether the extra cost of a more efficient appliance or home system is likely to come back through lower energy bills during the years you expect to own it.</p>
        </div>
      </section>
      <div className="shell content-shell">
        <EnergyPaybackCalculator />
        <section className="content-section">
          <p className="eyebrow">Use the right comparison</p>
          <h2>Payback should measure the efficiency premium—not the entire purchase.</h2>
          <p>If you already need a replacement, both choices require spending money. The useful energy question is whether paying extra for the more efficient choice is justified by the energy savings. Comparing the full price of the efficient option against zero would exaggerate the payback period.</p>
          <p>If you are deciding whether to replace working equipment at all, start with a <Link href="/repair-or-replace/hvac">repair-or-replace calculator</Link> or the <Link href="/appliance-life">appliance life estimator</Link> first.</p>
        </section>
        <section className="content-section example-section">
          <p className="eyebrow">Worked example</p>
          <h2>A $500 efficiency premium saving $150 per year</h2>
          <p>Suppose the efficient option costs $500 more than the baseline and is expected to reduce annual energy cost from $800 to $650. Annual savings are $150, so simple payback is about 3.33 years. If you expect to own it for eight years, gross energy savings are about $1,200 and net savings after the premium are about $700.</p>
          <p>This does not assume energy prices rise or fall. Enter the annual energy-cost estimates you are comfortable using and treat the answer as a planning comparison rather than a guarantee.</p>
        </section>
        <section className="content-section">
          <p className="eyebrow">What this tool leaves out</p>
          <h2>Simple payback is useful because it is simple—but incomplete.</h2>
          <div className="tool-grid">
            <article className="tool-card"><h3>Rebates and tax credits</h3><p>Subtract confirmed incentives from the upgrade premium before using the calculator.</p></article>
            <article className="tool-card"><h3>Financing</h3><p>Interest and financing fees can make a longer-payback upgrade less attractive.</p></article>
            <article className="tool-card"><h3>Maintenance differences</h3><p>Include them separately if one option has meaningfully different service costs.</p></article>
            <article className="tool-card"><h3>Energy-price changes</h3><p>The calculator holds your annual-cost estimates constant instead of guessing future utility rates.</p></article>
          </div>
        </section>
      </div>
    </main>
  );
}
