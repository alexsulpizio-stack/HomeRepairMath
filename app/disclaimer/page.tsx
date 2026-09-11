import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important limitations and safety information for HomeRepairMath calculators.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="shell prose-page">
      <p className="eyebrow">Disclaimer</p>
      <h1>Planning tools, not professional diagnosis.</h1>
      <p className="lead">HomeRepairMath provides general educational calculators and estimates. Results are not quotes, inspections, engineering opinions, diagnoses, or guarantees.</p>

      <h2>Actual conditions can change the answer</h2>
      <p>Equipment condition, installation quality, hidden damage, local labor costs, parts availability, warranties, permits, code requirements, climate, usage, and the exact failure mode can materially change a repair or replacement decision.</p>

      <h2>Safety comes before the score</h2>
      <p>Do not rely on a calculator result when there is an active leak, electrical damage, gas odor, combustion concern, overheating, fire risk, structural issue, refrigerant problem, suspected carbon monoxide issue, or other potential hazard. Shut down or isolate equipment when appropriate and seek qualified help.</p>

      <h2>No contractor relationship</h2>
      <p>Using this site does not create a contractor, engineer, inspector, attorney, financial adviser, or other professional-client relationship.</p>

      <h2>Verify important decisions</h2>
      <p>For expensive, safety-critical, regulated, or technically uncertain work, obtain an appropriate professional diagnosis and written quote before proceeding.</p>
    </main>
  );
}
