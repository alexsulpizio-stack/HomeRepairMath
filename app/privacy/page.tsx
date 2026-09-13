import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how HomeRepairMath handles calculator inputs, analytics, advertising technologies, third-party links, and future privacy-policy changes.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="shell prose-page">
      <p className="eyebrow">Privacy</p>
      <h1>Privacy Policy</h1>
      <p className="lead">HomeRepairMath is designed to work without requiring an account or personal profile for its core calculators.</p>

      <h2>Calculator inputs</h2>
      <p>The current calculators run in your browser. Values you enter into the calculators are used to produce the on-page result and are not intentionally stored by HomeRepairMath unless a future feature clearly says otherwise.</p>

      <h2>Analytics</h2>
      <p>HomeRepairMath may use privacy-respecting site analytics or standard web analytics to understand aggregate usage, such as which pages are visited, general device information, referral sources, and performance. If analytics that use cookies or similar identifiers are enabled, this policy and any required consent controls will be updated accordingly.</p>

      <h2>Advertising</h2>
      <p>HomeRepairMath may display advertising, including Google AdSense. Advertising providers may use cookies, device identifiers, or similar technologies to serve, measure, and personalize ads where permitted. Google and other vendors may process data under their own privacy policies and consent requirements.</p>

      <h2>Third-party links</h2>
      <p>The site may link to third-party websites. HomeRepairMath does not control the privacy practices or content of those sites.</p>

      <h2>Policy changes</h2>
      <p>This policy may be updated when the site adds analytics, advertising, saved results, accounts, or other data-processing features. Material changes should be reflected on this page before or when those features launch.</p>

      <p><strong>Last updated:</strong> September 10, 2026.</p>
    </main>
  );
}
