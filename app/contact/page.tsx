import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact and Calculator Feedback",
  description: "Guidance for reporting calculator issues or suggesting improvements to HomeRepairMath.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="shell prose-page">
      <p className="eyebrow">Contact</p>
      <h1>Help improve HomeRepairMath</h1>
      <p className="lead">Feedback helps improve the calculators, examples, and explanations across the site.</p>
      <p>The public feedback channel is currently being updated. When reporting a calculator issue, note the page, the inputs you used, the result you received, and what you expected.</p>
      <h2>Reporting a calculator problem</h2>
      <p>Include the page, example inputs, the result you received, and what you expected. This helps us reproduce and correct the problem.</p>
      <h2>Keep personal details private</h2>
      <p>Do not include your address, phone number, financial details, or other personal information when sharing feedback about a calculator.</p>
    </main>
  );
}
