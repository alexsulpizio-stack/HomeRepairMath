import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Our Home Repair Calculators",
  description: "About HomeRepairMath and its approach to transparent homeowner decision tools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="shell prose-page">
      <p className="eyebrow">About HomeRepairMath</p>
      <h1>The numbers behind smarter home repairs.</h1>
      <p className="lead">HomeRepairMath is a free collection of practical calculators for homeowners facing expensive repair, replacement, and maintenance decisions.</p>

      <h2>What we are building</h2>
      <p>Most repair decisions are not answered by one price quote. Age, replacement cost, expected remaining life, condition, prior failures, safety, and operating cost can all matter. HomeRepairMath turns those inputs into simple planning tools and shows the assumptions behind the result.</p>

      <h2>What we are not</h2>
      <p>HomeRepairMath does not inspect your home, diagnose equipment, provide contractor bids, or replace licensed professional judgment. A calculator can help organize a decision; it cannot see hidden damage or confirm that a repair is safe.</p>

      <h2>Who publishes the site</h2>
      <p>HomeRepairMath is an independent homeowner-tool project. Its goal is to make repair and replacement decisions easier to evaluate by showing the assumptions behind each calculation rather than hiding them behind a black box.</p>

      <h2>How we keep the tools useful</h2>
      <p>We favor formulas that are understandable, reusable, and easy to audit. We avoid pretending that a national average is a precise local quote. When a tool uses a benchmark, the benchmark is identified as an assumption rather than presented as a guarantee.</p>

      <p><Link href="/methodology">Read the methodology</Link> or start with the <Link href="/repair-or-replace/washer">repair-or-replace calculator</Link>.</p>
    </main>
  );
}
