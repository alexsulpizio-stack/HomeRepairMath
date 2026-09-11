import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RepairReplaceCalculator from "@/components/RepairReplaceCalculator";
import { applianceKeys, appliances, isApplianceKey } from "@/lib/appliances";

export function generateStaticParams() {
  return applianceKeys.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isApplianceKey(slug)) return {};
  const item = appliances[slug];
  return {
    title: `${item.shortLabel} Repair or Replace Calculator`,
    description: `${item.intro} Free first-pass calculator with transparent assumptions.`,
    alternates: { canonical: `/repair-or-replace/${slug}` },
  };
}

export default async function RepairOrReplacePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isApplianceKey(slug)) notFound();

  const item = appliances[slug];
  const otherItems = applianceKeys.filter((key) => key !== slug);
  const faq = [
    {
      question: `How old is too old to repair a ${item.shortLabel.toLowerCase()}?`,
      answer: `There is no single cutoff. This calculator uses about ${item.typicalLife} years as a planning benchmark, then combines age with repair cost, replacement cost, condition, and recent repair history.`,
    },
    {
      question: "Does the 50% rule always work?",
      answer: "No. Treat it as a quick reference, not a rule. A high-value newer unit can justify a substantial repair, while a smaller repair can still be a poor choice on an unreliable unit near the end of its useful life.",
    },
    {
      question: "Can safety problems override the calculator?",
      answer: "Yes. Active leaks, electrical damage, combustion concerns, refrigerant issues, structural damage, and other hazards require appropriate professional evaluation regardless of the financial score.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${item.shortLabel} Repair or Replace Calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: item.intro,
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <section className="hero compact-hero">
        <div className="shell hero-inner">
          <p className="eyebrow">Repair or replace</p>
          <h1>{item.shortLabel} repair or replace calculator</h1>
          <p className="hero-copy">{item.intro} The result is a planning aid, not a diagnosis.</p>
        </div>
      </section>

      <div className="shell content-shell">
        <RepairReplaceCalculator initialItem={slug} />

        <section className="content-section two-column-copy">
          <div>
            <p className="eyebrow">When repair can make sense</p>
            <h2>Reasons to keep the existing unit</h2>
            <ul>{item.repairNotes.map((note) => <li key={note}>{note}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow">When replacement gains ground</p>
            <h2>Reasons to replace</h2>
            <ul>{item.replacementNotes.map((note) => <li key={note}>{note}</li>)}</ul>
          </div>
        </section>

        <aside className="ad-placeholder" aria-label="Advertisement placeholder">
          <span>Future in-content ad placement</span>
          <small>Separated from calculator controls and recommendations.</small>
        </aside>

        <section className="content-section">
          <p className="eyebrow">Frequently asked questions</p>
          <h2>What the calculator can — and can’t — tell you</h2>
          <div className="faq-list">
            {faq.map((entry) => (
              <details key={entry.question}>
                <summary>{entry.question}</summary>
                <p>{entry.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="content-section">
          <p className="eyebrow">Related calculators</p>
          <div className="link-grid">
            {otherItems.map((key) => (
              <Link className="tool-card linked-card" key={key} href={`/repair-or-replace/${key}`}>
                <h3>{appliances[key].shortLabel}</h3>
                <p>{appliances[key].intro}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
