import Link from "next/link";
import RepairReplaceCalculator from "@/components/RepairReplaceCalculator";
import { applianceKeys, appliances } from "@/lib/appliances";
import { absoluteUrl } from "@/lib/site";

export const metadata = { alternates: { canonical: "/" } };

const upcomingTools = [
  ["Appliance life estimator", "Estimate remaining useful life instead of relying on a single average lifespan."],
  ["Energy payback calculator", "See whether a more efficient replacement can actually repay its higher purchase price."],
];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HomeRepairMath",
    url: absoluteUrl("/"),
    description: "Free homeowner calculators for repair, replacement, cost, and maintenance decisions.",
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="hero">
        <div className="shell hero-inner">
          <p className="eyebrow">Free homeowner decision tools</p>
          <h1>Do the math before you spend money on a home repair.</h1>
          <p className="hero-copy">HomeRepairMath turns repair quotes, replacement costs, age, condition, and other practical inputs into clear decision guidance — with the assumptions shown.</p>
          <a className="primary-link" href="#repair-or-replace">Try the calculator</a>
        </div>
      </section>

      <div className="shell content-shell">
        <div className="ad-slot-reserved" data-ad-slot="home-top" aria-hidden="true" />

        <div id="repair-or-replace"><RepairReplaceCalculator /></div>

        <section className="content-section">
          <p className="eyebrow">Repair-or-replace guides</p>
          <h2>Start with the thing you’re deciding about.</h2>
          <div className="link-grid">
            {applianceKeys.map((key) => (
              <Link className="tool-card linked-card" key={key} href={`/repair-or-replace/${key}`}>
                <h3>{appliances[key].shortLabel}</h3>
                <p>{appliances[key].intro}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-section">
          <p className="eyebrow">More calculators</p>
          <h2>Price the decision, not just the part.</h2>
          <div className="link-grid">
            <Link className="tool-card linked-card" href="/diy-or-hire">
              <h3>DIY or hire a pro?</h3>
              <p>Compare a professional quote with materials, tools, your time, difficulty, and rework risk.</p>
            </Link>
            <Link className="tool-card linked-card" href="/project-cost">
              <h3>Project cost estimator</h3>
              <p>Build a budget from your local material costs, labor assumptions, fees, and contingency.</p>
            </Link>
          </div>
        </section>

        <section className="content-section">
          <p className="eyebrow">Why the math matters</p>
          <h2>A repair quote alone doesn’t tell you whether a repair is smart.</h2>
          <p>A $400 repair could be an easy yes on a newer $1,800 appliance and a poor bet on an older $650 appliance. The useful question is how the repair cost compares with replacement cost, expected remaining life, condition, repair history, and future operating costs.</p>
          <p>HomeRepairMath is built around showing those assumptions instead of hiding them behind a vague recommendation. Each calculator should explain what moved the result and where professional judgment still matters.</p>
          <p><Link href="/methodology">See exactly how the current scoring model works.</Link></p>
        </section>

        <div className="ad-slot-reserved" data-ad-slot="home-mid" aria-hidden="true" />

        <section className="content-section">
          <p className="eyebrow">Planned next</p>
          <h2>Keep expanding only where a tool adds real value.</h2>
          <div className="tool-grid">
            {upcomingTools.map(([title, copy]) => (
              <article className="tool-card" key={title}><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </section>

        <section className="content-section methodology">
          <h2>Transparent by design</h2>
          <p>These calculators are planning tools, not guarantees. Actual repair life, local labor rates, safety requirements, permit rules, and hidden damage can change the economics. HomeRepairMath favors simple, inspectable formulas and clearly labels assumptions.</p>
        </section>
      </div>
    </main>
  );
}
