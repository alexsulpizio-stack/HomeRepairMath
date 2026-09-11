import RepairReplaceCalculator from "@/components/RepairReplaceCalculator";

const upcomingTools = [
  ["DIY or hire a pro?", "Compare labor savings against time, difficulty, tools, permits, and risk."],
  ["Project cost estimator", "Build a transparent estimate from materials, labor, complexity, and contingency."],
  ["Appliance life estimator", "Estimate remaining useful life instead of relying on a single average lifespan."],
  ["Energy payback calculator", "See whether a more efficient replacement can actually repay its higher purchase price."],
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-inner">
          <p className="eyebrow">Free homeowner decision tools</p>
          <h1>Do the math before you spend money on a home repair.</h1>
          <p className="hero-copy">
            HomeRepairMath turns repair quotes, replacement costs, age, condition, and other practical inputs into clear decision guidance.
          </p>
          <a className="primary-link" href="#repair-or-replace">Try the calculator</a>
        </div>
      </section>

      <div className="shell content-shell">
        <aside className="ad-placeholder" aria-label="Advertisement placeholder">
          <span>Future ad placement</span>
          <small>Reserved away from navigation and calculator controls.</small>
        </aside>

        <div id="repair-or-replace">
          <RepairReplaceCalculator />
        </div>

        <section className="content-section">
          <p className="eyebrow">Why the math matters</p>
          <h2>A repair quote alone doesn’t tell you whether a repair is smart.</h2>
          <p>
            A $400 repair could be an easy yes on a newer $1,800 appliance and a poor bet on an older $650 appliance. The useful question is how the repair cost compares with replacement cost, expected remaining life, condition, and future operating costs.
          </p>
          <p>
            HomeRepairMath is built around showing those assumptions instead of hiding them behind a vague recommendation. As the tools mature, each calculator will explain what moved the result and where professional judgment still matters.
          </p>
        </section>

        <aside className="ad-placeholder" aria-label="Advertisement placeholder">
          <span>Future in-content ad placement</span>
          <small>Ads will never be styled as calculator results or required actions.</small>
        </aside>

        <section className="content-section">
          <p className="eyebrow">Coming next</p>
          <h2>One toolkit for expensive homeowner decisions.</h2>
          <div className="tool-grid">
            {upcomingTools.map(([title, copy]) => (
              <article className="tool-card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section methodology">
          <h2>Transparent by design</h2>
          <p>
            These calculators are planning tools, not guarantees. Actual repair life, local labor rates, safety requirements, permit rules, and hidden damage can change the economics. HomeRepairMath will favor simple, inspectable formulas and clearly label assumptions.
          </p>
        </section>
      </div>
    </main>
  );
}
