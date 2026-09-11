import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How HomeRepairMath calculators turn repair cost, replacement cost, age, condition, and repair history into planning guidance.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <main className="shell prose-page">
      <p className="eyebrow">Methodology</p>
      <h1>Simple formulas, visible assumptions.</h1>
      <p className="lead">HomeRepairMath is designed to make homeowner decision math easier to inspect rather than hiding it behind a black-box recommendation.</p>

      <h2>Repair-or-replace model</h2>
      <p>The current first-pass model combines four factors: age relative to a typical service-life benchmark, repair cost relative to replacement cost, overall condition, and recent repair history.</p>
      <ul>
        <li><strong>Age: 38%</strong> — older equipment receives more replacement pressure.</li>
        <li><strong>Repair-to-replacement cost: 37%</strong> — expensive repairs receive more replacement pressure.</li>
        <li><strong>Condition: 15%</strong> — visibly poor or declining condition shifts the result toward replacement.</li>
        <li><strong>Recent repairs: 10%</strong> — repeat failures matter because the current quote may not be the last one.</li>
      </ul>

      <h2>What the score means</h2>
      <p>The result is a planning score from 0 to 100. A lower number favors repair; a higher number favors replacement. Scores below 43 currently show “Repair,” scores from 43 through 66 show “Borderline,” and scores of 67 or higher show “Replace.” These thresholds are decision aids, not failure probabilities.</p>

      <h2>Why the model is intentionally conservative</h2>
      <p>Home equipment varies by brand, model, installation quality, usage, maintenance, climate, and failure mode. A simple public calculator should not imply more certainty than the inputs support. Item-specific models can become more detailed as reliable evidence supports them.</p>

      <h2>When the math should not decide</h2>
      <p>Safety and diagnosis come first. Active leaks, electrical damage, gas or combustion concerns, structural damage, refrigerant issues, overheating, fire risk, or other hazards should be evaluated appropriately regardless of the calculator result.</p>

      <h2>Updating the models</h2>
      <p>Benchmarks and formulas should be revised when better evidence materially improves the decision. HomeRepairMath avoids routine date-stamped price tables when a durable ratio-based model can answer the question with less maintenance and less false precision.</p>
    </main>
  );
}
