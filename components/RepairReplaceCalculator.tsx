"use client";

import { useMemo, useState } from "react";
import { appliances, applianceKeys, type ApplianceKey } from "@/lib/appliances";
import { calculateRepairReplace } from "@/lib/calculations";

export default function RepairReplaceCalculator({ initialItem = "washer" }: { initialItem?: ApplianceKey }) {
  const [item, setItem] = useState<ApplianceKey>(initialItem);
  const [age, setAge] = useState(Math.round(appliances[initialItem].typicalLife * 0.65));
  const [repairCost, setRepairCost] = useState(350);
  const [replacementCost, setReplacementCost] = useState(900);
  const [condition, setCondition] = useState(3);
  const [priorRepairs, setPriorRepairs] = useState(0);

  const result = useMemo(
    () =>
      calculateRepairReplace({
        expectedLife: appliances[item].typicalLife,
        age,
        repairCost,
        replacementCost,
        condition,
        priorRepairs,
      }),
    [age, condition, item, priorRepairs, repairCost, replacementCost],
  );

  return (
    <section className="calculator-card" aria-labelledby="calculator-title">
      <div className="calculator-heading">
        <p className="eyebrow">Repair vs. replace calculator</p>
        <h2 id="calculator-title">Is this repair still worth it?</h2>
        <p>Enter a few numbers to get a transparent first-pass recommendation.</p>
      </div>

      <div className="calculator-grid">
        <label>
          Item
          <select
            value={item}
            onChange={(event) => {
              const next = event.target.value as ApplianceKey;
              setItem(next);
              setAge(Math.round(appliances[next].typicalLife * 0.65));
            }}
          >
            {applianceKeys.map((key) => (
              <option key={key} value={key}>{appliances[key].label}</option>
            ))}
          </select>
        </label>

        <label>
          Age (years)
          <input type="number" min="0" max="50" value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </label>

        <label>
          Repair quote ($)
          <input type="number" min="0" step="25" value={repairCost} onChange={(e) => setRepairCost(Number(e.target.value))} />
        </label>

        <label>
          Replacement cost ($)
          <input type="number" min="1" step="50" value={replacementCost} onChange={(e) => setReplacementCost(Number(e.target.value))} />
        </label>

        <label>
          Overall condition
          <select value={condition} onChange={(e) => setCondition(Number(e.target.value))}>
            <option value="1">Poor</option>
            <option value="2">Fair</option>
            <option value="3">Average</option>
            <option value="4">Good</option>
            <option value="5">Excellent</option>
          </select>
        </label>

        <label>
          Repairs in last 2 years
          <input type="number" min="0" max="5" value={priorRepairs} onChange={(e) => setPriorRepairs(Number(e.target.value))} />
        </label>
      </div>

      <div className={`result result-${result.recommendation.toLowerCase()}`} aria-live="polite">
        <div>
          <span className="result-label">Recommendation</span>
          <strong>{result.recommendation}</strong>
        </div>
        <div>
          <span className="result-label">Replacement pressure</span>
          <strong>{Math.round(result.replacementScore)}/100</strong>
        </div>
      </div>

      <div className="result-notes">
        <p><strong>Typical life used:</strong> about {result.expectedLife} years.</p>
        <p><strong>Estimated life remaining:</strong> {result.remainingLife > 0 ? `about ${result.remainingLife} years` : "at or beyond typical life"}.</p>
        <p><strong>50% rule reference:</strong> a repair around ${result.breakEvenRepair.toLocaleString()} is half the replacement cost.</p>
      </div>

      <div className="reason-list" aria-label="Factors affecting the result">
        <strong>What moved the result</strong>
        <ul>
          {result.reasons.map((reason) => <li key={reason}>{reason}</li>)}
        </ul>
      </div>

      <details>
        <summary>How this score works</summary>
        <p>The current model weights age at 38%, repair cost versus replacement cost at 37%, overall condition at 15%, and recent repair history at 10%. The score is a weighted planning index, not a probability that the unit will fail and not a forecast of how many years it will actually last. The “life remaining” line only compares age with the typical-life benchmark. Safety issues, active leaks, combustion concerns, electrical damage, refrigerant problems, or a professional diagnosis can override the score.</p>
      </details>
    </section>
  );
}
