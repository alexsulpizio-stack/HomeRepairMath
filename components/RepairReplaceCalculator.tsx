"use client";

import { useMemo, useState } from "react";

const presets = {
  washer: { label: "Washing machine", life: 11 },
  dryer: { label: "Dryer", life: 13 },
  refrigerator: { label: "Refrigerator", life: 13 },
  dishwasher: { label: "Dishwasher", life: 10 },
  waterHeater: { label: "Water heater", life: 12 },
  hvac: { label: "Central HVAC system", life: 17 },
} as const;

type PresetKey = keyof typeof presets;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function RepairReplaceCalculator() {
  const [item, setItem] = useState<PresetKey>("washer");
  const [age, setAge] = useState(7);
  const [repairCost, setRepairCost] = useState(350);
  const [replacementCost, setReplacementCost] = useState(900);
  const [condition, setCondition] = useState(3);

  const result = useMemo(() => {
    const expectedLife = presets[item].life;
    const ageRatio = clamp(age / expectedLife, 0, 1.5);
    const repairRatio = replacementCost > 0 ? clamp(repairCost / replacementCost, 0, 2) : 2;
    const conditionPenalty = (5 - condition) / 4;

    // Higher score favors replacement. The weights are deliberately simple and visible.
    const replacementScore = clamp(
      Math.round((ageRatio * 45 + repairRatio * 40 + conditionPenalty * 15) * 100) / 100,
      0,
      100,
    );

    const recommendation =
      replacementScore >= 65 ? "Replace" : replacementScore >= 45 ? "Borderline" : "Repair";

    const remainingLife = Math.max(0, expectedLife - age);
    const breakEvenRepair = Math.round(replacementCost * 0.5);

    return { expectedLife, replacementScore, recommendation, remainingLife, breakEvenRepair };
  }, [age, condition, item, repairCost, replacementCost]);

  return (
    <section className="calculator-card" aria-labelledby="calculator-title">
      <div className="calculator-heading">
        <p className="eyebrow">Flagship tool</p>
        <h2 id="calculator-title">Repair or replace?</h2>
        <p>Enter a few numbers to get a transparent first-pass recommendation.</p>
      </div>

      <div className="calculator-grid">
        <label>
          Item
          <select value={item} onChange={(event) => setItem(event.target.value as PresetKey)}>
            {Object.entries(presets).map(([key, preset]) => (
              <option key={key} value={key}>{preset.label}</option>
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
        <p><strong>Typical life:</strong> about {result.expectedLife} years.</p>
        <p><strong>Estimated life remaining:</strong> {result.remainingLife > 0 ? `about ${result.remainingLife} years` : "at or beyond typical life"}.</p>
        <p><strong>50% rule reference:</strong> a repair around ${result.breakEvenRepair.toLocaleString()} is half the replacement cost.</p>
      </div>

      <details>
        <summary>How this score works</summary>
        <p>The current MVP weights age at 45%, repair cost versus replacement cost at 40%, and overall condition at 15%. It is a decision aid, not a diagnosis. Future versions will use item-specific failure patterns and efficiency differences.</p>
      </details>
    </section>
  );
}
