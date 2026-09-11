"use client";

import { useMemo, useState } from "react";
import { calculateDiyHire } from "@/lib/calculations";

export default function DiyHireCalculator() {
  const [proQuote, setProQuote] = useState(900);
  const [materials, setMaterials] = useState(300);
  const [tools, setTools] = useState(75);
  const [hours, setHours] = useState(8);
  const [hourlyValue, setHourlyValue] = useState(25);
  const [difficulty, setDifficulty] = useState(3);
  const [redoRisk, setRedoRisk] = useState(2);

  const result = useMemo(
    () =>
      calculateDiyHire({
        proQuote,
        materials,
        tools,
        hours,
        hourlyValue,
        difficulty,
        redoRisk,
      }),
    [difficulty, hourlyValue, hours, materials, proQuote, redoRisk, tools],
  );

  return (
    <section className="calculator-card" aria-labelledby="diy-calculator-title">
      <div className="calculator-heading">
        <p className="eyebrow">DIY vs. hire calculator</p>
        <h2 id="diy-calculator-title">Is doing it yourself actually cheaper?</h2>
        <p>Compare the professional quote with materials, tools, your time, and the chance of rework.</p>
      </div>

      <div className="calculator-grid">
        <label>
          Professional quote ($)
          <input type="number" min="0" step="50" value={proQuote} onChange={(e) => setProQuote(Number(e.target.value))} />
        </label>
        <label>
          DIY materials ($)
          <input type="number" min="0" step="25" value={materials} onChange={(e) => setMaterials(Number(e.target.value))} />
        </label>
        <label>
          Tool purchases or rentals ($)
          <input type="number" min="0" step="25" value={tools} onChange={(e) => setTools(Number(e.target.value))} />
        </label>
        <label>
          Your time (hours)
          <input type="number" min="0" step="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
        </label>
        <label>
          Value of your time ($/hour)
          <input type="number" min="0" step="5" value={hourlyValue} onChange={(e) => setHourlyValue(Number(e.target.value))} />
        </label>
        <label>
          Difficulty
          <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
            <option value="1">Very easy</option>
            <option value="2">Easy</option>
            <option value="3">Moderate</option>
            <option value="4">Hard</option>
            <option value="5">Very hard</option>
          </select>
        </label>
        <label>
          Rework / mistake risk
          <select value={redoRisk} onChange={(e) => setRedoRisk(Number(e.target.value))}>
            <option value="1">Very low</option>
            <option value="2">Low</option>
            <option value="3">Moderate</option>
            <option value="4">High</option>
            <option value="5">Very high</option>
          </select>
        </label>
      </div>

      <div className="result" aria-live="polite">
        <div>
          <span className="result-label">Planning result</span>
          <strong>{result.recommendation}</strong>
        </div>
        <div>
          <span className="result-label">Adjusted DIY cost</span>
          <strong>${result.adjustedDiyCost.toLocaleString()}</strong>
        </div>
      </div>

      <div className="result-notes">
        <p><strong>Time cost:</strong> ${result.timeCost.toLocaleString()}.</p>
        <p><strong>Estimated savings:</strong> {result.savings >= 0 ? "$" : "-$"}{Math.abs(result.savings).toLocaleString()} ({result.savingsPct}%).</p>
      </div>

      <details>
        <summary>How the risk adjustment works</summary>
        <p>The calculator adds 5% of the base DIY cost for each step above “very easy” and another 5% for each step above “very low” rework risk, up to a 40% planning premium. That premium is not an insurance estimate or a probability of failure. It is only a way to stop a difficult project from looking artificially cheap. The tool does not price injury, code violations, permits, hidden damage, warranty loss, or catastrophic mistakes; those factors can make professional work the better choice even when the raw dollar savings look large.</p>
      </details>
    </section>
  );
}
