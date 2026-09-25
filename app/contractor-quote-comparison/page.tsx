import type { Metadata } from "next";
import Link from "next/link";
import ContractorQuoteComparisonCalculator from "@/components/ContractorQuoteComparisonCalculator";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contractor Quote Comparison Calculator",
  description:
    "Compare contractor quotes side by side, add excluded costs and allowance gaps, and check scope, deposits, and warranties before choosing a home improvement bid.",
  alternates: { canonical: "/contractor-quote-comparison" },
};

export default function ContractorQuoteComparisonPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Contractor Quote Comparison Calculator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        url: absoluteUrl("/contractor-quote-comparison"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Compare written contractor bids after adding known excluded work and allowance gaps, with scope, deposit, and warranty details kept visible.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Should I automatically choose the lowest contractor quote?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. First make sure the bids describe the same work, materials, exclusions, allowances, timing, and warranty terms. A lower written total can reflect a smaller scope rather than a lower price for the same job.",
            },
          },
          {
            "@type": "Question",
            name: "What is an allowance in a contractor quote?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An allowance is a placeholder amount for an item or category that has not been fully selected or priced. Comparing bids is easier when allowance amounts are brought to the same target level.",
            },
          },
          {
            "@type": "Question",
            name: "Does this calculator tell me whether a contractor price is fair?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. It compares the bids and assumptions you enter. It does not know local market pricing, hidden site conditions, contractor quality, or whether a particular price is fair for your property.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="hero compact-hero">
        <div className="shell hero-inner">
          <p className="eyebrow">Before you sign a home improvement contract</p>
          <h1>Compare contractor quotes apples to apples.</h1>
          <p className="hero-copy">
            A cheaper bid is not cheaper if it leaves out work the other contractor included. Normalize
            the known differences first, then compare scope, deposit, warranty, and the questions still
            unanswered.
          </p>
          <a className="primary-link" href="#compare-quotes">Compare my quotes</a>
        </div>
      </section>

      <div className="shell content-shell">
        <div id="compare-quotes">
          <ContractorQuoteComparisonCalculator />
        </div>

        <div className="ad-slot-reserved" data-ad-slot="quote-comparison-top" aria-hidden="true" />

        <section className="content-section">
          <p className="eyebrow">Why quote totals mislead</p>
          <h2>The bottom-line price may describe a different project.</h2>
          <p>
            Imagine one roofing bid at $18,000 and another at $20,500. The first looks cheaper until
            you discover that disposal is excluded and its material allowance is $1,200 below the
            product level you asked both contractors to price. Add those differences back and the
            comparison can reverse.
          </p>
          <p>
            This calculator deliberately does not invent a local “fair price.” Instead, it works with
            facts you can verify in the written proposals. The comparable-known-cost number is simply
            the quoted total plus the excluded work and allowance gaps you enter. That makes the math
            inspectable and keeps a national average from pretending to know your house.
          </p>
        </section>

        <section className="content-section">
          <p className="eyebrow">Normalize the scope</p>
          <h2>Six things to put beside the price.</h2>
          <div className="tool-grid">
            <article className="tool-card">
              <h3>Materials and equipment</h3>
              <p>
                “Premium materials included” is not the same as a manufacturer, model, grade, quantity,
                or finish. Compare bids against the same specification wherever possible.
              </p>
            </article>
            <article className="tool-card">
              <h3>Permits and inspections</h3>
              <p>
                The important comparison is whether required permit and inspection responsibilities are
                explicit. Requirements vary by project and jurisdiction, so verify them locally.
              </p>
            </article>
            <article className="tool-card">
              <h3>Removal and disposal</h3>
              <p>
                Tear-out, haul-away, dumpsters, refrigerant recovery, or disposal fees can sit outside
                an attractive headline price. Make those exclusions visible before comparing totals.
              </p>
            </article>
            <article className="tool-card">
              <h3>Cleanup and protection</h3>
              <p>
                Floor protection, dust control, landscaping protection, daily cleanup, and final cleanup
                affect the scope even when they are not large line items.
              </p>
            </article>
            <article className="tool-card">
              <h3>Timing and payment</h3>
              <p>
                Put the estimated start and completion timing next to the requested deposit. A payment
                schedule is part of the deal, not a footnote to the price.
              </p>
            </article>
            <article className="tool-card">
              <h3>Warranty language</h3>
              <p>
                Separate manufacturer coverage from the contractor’s workmanship warranty. Record what
                is actually written rather than assigning a made-up dollar value to a longer warranty.
              </p>
            </article>
          </div>
        </section>

        <section className="content-section example-section">
          <p className="eyebrow">Worked example</p>
          <h2>How the “cheaper” quote can move.</h2>
          <p>
            The calculator opens with a simple example. Quote A is $18,000 on paper, but it has $1,800
            of known excluded work and a $1,200 allowance gap. Its comparable known cost becomes
            $21,000. Quote B starts at $20,500 and has no entered exclusions or allowance gap, so it
            remains $20,500. The tool has not proved that Quote B is better; it has shown that the
            original $2,500 headline-price advantage was not an apples-to-apples comparison.
          </p>
          <p>
            That distinction matters. Contractor experience, installation quality, references, hidden
            conditions, insurance, licensing requirements, scheduling, change-order language, and the
            actual contract can outweigh a small price difference. The calculator keeps those judgment
            calls outside the formula instead of manufacturing a contractor “score.”
          </p>
        </section>

        <section className="content-section">
          <p className="eyebrow">What to do with an unclear line</p>
          <h2>Turn uncertainty into a written question.</h2>
          <p>
            If a proposal does not say whether flashing, electrical work, trim repair, disposal, permit
            fees, equipment pads, painting, or another project-specific item is included, do not guess
            a dollar amount just to make the calculator look complete. Leave the cost adjustment at
            zero, leave the relevant scope box unchecked, and ask the contractor to clarify the proposal
            in writing. Then update the comparison.
          </p>
          <p>
            The Federal Trade Commission advises consumers to get multiple written estimates and says a
            written estimate should describe the work, materials, completion date, and price. It also
            advises against automatically choosing the lowest bidder when estimates differ materially.{" "}
            <a
              href="https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam"
              rel="noopener noreferrer"
            >
              Read the FTC’s home-improvement guidance.
            </a>
          </p>
        </section>

        <div className="ad-slot-reserved" data-ad-slot="quote-comparison-mid" aria-hidden="true" />

        <section className="content-section">
          <p className="eyebrow">Before choosing a contractor</p>
          <h2>The calculator is a comparison worksheet, not a hiring verdict.</h2>
          <p>
            A proposal can be complete and still come from the wrong contractor. Verify credentials and
            insurance where applicable, check references and complaint history, read the actual contract,
            and confirm that verbal promises made during sales conversations appear in writing. Contract
            and deposit rules vary by state and locality, so a generic calculator should not tell you that
            one deposit percentage is universally legal or normal.
          </p>
          <p>
            If you are still early enough that you do not have competing proposals, use the{" "}
            <Link href="/project-cost">project cost estimator</Link> to build your own planning baseline.
            If you are deciding whether the professional price justifies doing the work yourself, use the{" "}
            <Link href="/diy-or-hire">DIY vs. hire calculator</Link>.
          </p>
        </section>

        <section className="content-section methodology">
          <p className="eyebrow">Methodology</p>
          <h2>Exactly what the calculator does.</h2>
          <p>
            For each bid, comparable known cost equals the written quote total plus known excluded work
            plus any allowance gap you enter. The deposit amount is the written quote total multiplied
            by the deposit percentage you enter. Scope completeness is only a count of the six checklist
            items you marked as confirmed in writing. Warranty years are displayed, not converted into
            money or points.
          </p>
          <p>
            The tool does not estimate local labor rates, contractor markup, material prices, hidden
            damage, code corrections, financing cost, future change orders, or workmanship quality.
            Those omissions are intentional. A transparent comparison of known inputs is more useful
            than false precision.
          </p>
        </section>

        <section className="content-section">
          <p className="eyebrow">FAQ</p>
          <h2>Contractor quote comparison questions</h2>
          <div className="faq-list">
            <details>
              <summary>Should I automatically choose the lowest contractor quote?</summary>
              <p>
                No. First make sure the bids describe the same work. Price differences can come from
                different materials, exclusions, allowances, schedules, warranties, or project scope.
              </p>
            </details>
            <details>
              <summary>What if I do not know the cost of an excluded item?</summary>
              <p>
                Leave the dollar adjustment at zero and treat the exclusion as an unresolved question.
                Ask for a written price or revised proposal before treating the bids as comparable.
              </p>
            </details>
            <details>
              <summary>Does a longer warranty make a quote worth more?</summary>
              <p>
                It may matter, but this calculator does not invent a dollar value for it. Check who
                provides the warranty, what it covers, what can void it, whether registration is
                required, and whether labor and materials have different terms.
              </p>
            </details>
            <details>
              <summary>Does this calculator tell me whether my quote is fair for my city?</summary>
              <p>
                No. It compares the bids and adjustments you enter. A local market benchmark requires
                reliable current pricing for the exact project and location, which this tool does not
                pretend to have.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}
