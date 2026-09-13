import type { Metadata } from "next";
import { applianceKeys, appliances } from "@/lib/appliances";

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
        <li><strong>Age:</strong> 38 × age / benchmark, with the ratio capped at 1.5 (up to 57 points).</li>
        <li><strong>Repair-to-replacement cost:</strong> 37 × repair / replacement cost, with the ratio capped at 2 (up to 74 points).</li>
        <li><strong>Condition:</strong> 15 × (5 − condition) / 4, where Poor is 1 and Excellent is 5 (0–15 points).</li>
        <li><strong>Recent repairs:</strong> 10 × repair count / 5, for 0–5 repairs (0–10 points).</li>
      </ul>

      <h2>Where the lifespan benchmarks come from</h2>
      <p>The single lifespan value used by the calculator is a planning benchmark, not a warranty or predicted failure date. Published references commonly report ranges because usage, installation, maintenance, climate, and equipment type matter. HomeRepairMath uses rounded values that sit within commonly published ranges and keeps age as only one part of the decision.</p>
      <ul>
        <li><a href="https://www.nachi.org/life-expectancy.htm">InterNACHI’s home-component life expectancy chart</a> publishes broad appliance and system ranges, including washers, dryers, refrigerators, dishwashers, water heaters, furnaces, heat pumps, and air conditioners.</li>
        <li><a href="https://www.energystar.gov/saveathome/heating-cooling/replace">ENERGY STAR’s heating and cooling replacement guidance</a> treats equipment age as one signal alongside frequent repairs, comfort problems, and operating costs.</li>
      </ul>
      <p>Because these references do not define a universal failure age, the benchmark should be read as “typical-life context,” not “years remaining.” The calculator’s estimated-life line is simply the benchmark minus entered age and is labeled accordingly.</p>

      <h2>What the score means</h2>
      <p>The result is a planning score from 0 to 100. A lower number favors repair; a higher number favors replacement. Scores below 43 currently show “Repair,” scores from 43 through 66 show “Borderline,” and scores of 67 or higher show “Replace.” These thresholds are decision aids, not failure probabilities.</p>
      <p>The sum is rounded to the nearest whole number and capped at 100 before choosing the recommendation. A 7-year-old washer with a $350 repair, $900 replacement, Average condition and no recent repairs scores 46 (Borderline). Changing only the repair to $850 gives 67 (Replace).</p>

      <h2>Service-life assumptions</h2>
      <p>These are the current model defaults, not manufacturer-specific predictions or guarantees. Time to benchmark is simply the benchmark minus the age entered, floored at zero; it is not a forecast of remaining service life. Use a diagnosis and the equipment’s actual history when deciding.</p>
      <ul>{applianceKeys.map(key => <li key={key}>{appliances[key].label}: {appliances[key].typicalLife} years.</li>)}</ul>

      <h2>DIY comparison</h2>
      <p>Materials, tools and the value of your time form the base cost. Each difficulty and rework-risk level above the minimum adds 5% of that base. The allowance is a transparent assumption, not a measured probability. Difficulty and risk also limit the recommendation: large savings alone do not make difficult work suitable for DIY. The calculator’s expandable explanation includes the exact thresholds and a worked example.</p>

      <h2>Project budget</h2>
      <p>The estimator adds materials, materials tax, labor, permits and miscellaneous costs, then applies contingency to that subtotal. It uses your prices rather than a price feed. Currency results are rounded only for display, so rounded line items may differ slightly from the total.</p>

      <h2>Input limits</h2>
      <p>Blank, negative, non-finite and out-of-range inputs pause the result rather than silently becoming zero. Replacement and professional quotes must be at least $1; zero is allowed for other costs. The model supports ages up to 50 years, 0–5 whole recent repairs, materials tax up to 20%, and contingency up to 50%. Other numeric inputs are limited to one billion, and totals beyond safe numeric precision are rejected.</p>

      <h2>DIY-vs-hire model</h2>
      <p>The DIY tool starts with materials, tool costs, and the value you assign to your time. It then adds a simple planning premium: 5% of base DIY cost for each difficulty step above “very easy” and 5% for each rework-risk step above “very low,” capped by the five-level inputs. This premium is deliberately not presented as an expected-loss probability.</p>

      <h2>Project-cost model</h2>
      <p>The project estimator adds materials, capped material sales tax, labor hours multiplied by hourly rate, permits, and miscellaneous costs. Contingency is then applied to that known-cost subtotal. The interface caps sales tax at 20% and contingency at 50% to prevent accidental extreme entries from creating misleading totals.</p>

      <h2>Validation and edge cases</h2>
      <p>The calculators are checked against ordinary, boundary, and intentionally unrealistic inputs. Negative money/time values are treated as zero for calculations, repair age is capped at the interface maximum, repair history and condition are constrained to their allowed ranges, and division-by-zero cases are guarded. The validation matrix is documented in the repository so formula changes can be checked against known examples.</p>

      <h2>Why the model is intentionally conservative</h2>
      <p>Home equipment varies by brand, model, installation quality, usage, maintenance, climate, and failure mode. A simple public calculator should not imply more certainty than the inputs support. Item-specific models can become more detailed as reliable evidence supports them.</p>

      <h2>When the math should not decide</h2>
      <p>Safety and diagnosis come first. Active leaks, electrical damage, gas or combustion concerns, structural damage, refrigerant issues, overheating, fire risk, or other hazards should be evaluated appropriately regardless of the calculator result.</p>

      <h2>Updating the models</h2>
      <p>Benchmarks and formulas should be revised when better evidence materially improves the decision. HomeRepairMath avoids routine date-stamped price tables when a durable ratio-based model can answer the question with less maintenance and less false precision.</p>
    </main>
  );
}
