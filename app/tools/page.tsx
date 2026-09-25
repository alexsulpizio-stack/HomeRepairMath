import type { Metadata } from "next";
import Link from "next/link";
import { applianceKeys, appliances } from "@/lib/appliances";

export const metadata: Metadata = {
  title: "Home Repair Calculators",
  description: "Free HomeRepairMath calculators for repair-vs-replace decisions, DIY-vs-hire comparisons, and project budgeting.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <main className="shell prose-page tools-page">
      <p className="eyebrow">All tools</p>
      <h1>Home repair calculators</h1>
      <p className="lead">Start with the decision you’re trying to make. Every tool shows its assumptions and is designed to work without an account.</p>

      <h2>Repair or replace</h2>
      <div className="link-grid">
        {applianceKeys.map((key) => (
          <Link className="tool-card linked-card" key={key} href={`/repair-or-replace/${key}`}>
            <h3>{appliances[key].shortLabel}</h3>
            <p>{appliances[key].intro}</p>
          </Link>
        ))}
      </div>

      <h2>Planning and efficiency</h2>
      <div className="link-grid">
        <Link className="tool-card linked-card" href="/appliance-life">
          <h3>Appliance life estimator</h3>
          <p>Estimate replacement pressure from age, condition, maintenance, and usage without treating a lifespan benchmark as a failure date.</p>
        </Link>
        <Link className="tool-card linked-card" href="/energy-payback">
          <h3>Energy payback calculator</h3>
          <p>Compare an efficiency upgrade premium with annual energy savings and your expected ownership horizon.</p>
        </Link>
      </div>

      <h2>Project decisions</h2>
      <div className="link-grid">
        <Link className="tool-card linked-card" href="/diy-or-hire">
          <h3>DIY or hire a pro?</h3>
          <p>Compare a professional quote with materials, tools, your time, difficulty, and rework risk.</p>
        </Link>
        <Link className="tool-card linked-card" href="/project-cost">
          <h3>Project cost estimator</h3>
          <p>Build a budget from materials, labor, taxes, fees, disposal, and contingency.</p>
        </Link>
        <Link className="tool-card linked-card" href="/contractor-quote-comparison">
          <h3>Contractor quote comparison</h3>
          <p>Compare bids after adding known exclusions and allowance gaps, while keeping scope, deposit, and warranty details visible.</p>
        </Link>
      </div>
    </main>
  );
}
