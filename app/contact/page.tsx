import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Report a calculator issue, suggest an improvement, or ask about HomeRepairMath on GitHub.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="shell prose-page">
      <p className="eyebrow">Contact</p>
      <h1>Help improve HomeRepairMath</h1>
      <p className="lead">Use GitHub to report a calculator problem, suggest a tool, or ask a question about the site.</p>
      <p><a href="https://github.com/alexsulpizio-stack/HomeRepairMath/issues">View questions and feedback on GitHub</a></p>
      <p><a href="https://github.com/alexsulpizio-stack/HomeRepairMath/issues/new">Open a new GitHub issue</a> (a GitHub account is required).</p>
      <h2>Reporting a calculator problem</h2>
      <p>Include the page, example inputs, the result you received, and what you expected. This helps us reproduce and correct the problem.</p>
      <h2>Keep personal details private</h2>
      <p>GitHub issues are public. Do not include your address, phone number, financial details, or other personal information.</p>
    </main>
  );
}
