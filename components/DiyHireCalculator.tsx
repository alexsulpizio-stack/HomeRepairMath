"use client";

import { useMemo, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function DiyHireCalculator() {
  const [proQuote, setProQuote] = useState(900);
  const [materials, setMaterials] = useState(300);
  const [tools, setTools] = useState(75);
  const [hours, setHours] = useState(8);
  const [hourlyValue, setHourlyValue] = useState(25);
  const [difficulty, setDifficulty] = useState(3);
  const [redoRisk, setRedoRisk] = useState(2);

  const result = useMemo(() => {
    const safeQuote = Math.max(0, Number.isFinite(proQuote) ? proQuote : 0);
    const safeMaterials = Math.max(0, Number.isFinite(materials) ? materials : 0);
    const safeTools = Math.max(0, Number.isFinite(tools) ? tools : 0);
    const safeHours = Math.max(0, Number.isFinite(hours) ? hours : 0);
    const safeHourly = Math.max(0, Number.isFinite(hourlyValue) ? hourlyValue : 0);
    const safeDifficulty = clamp(difficulty, 1, 5);
    const safeRedoRisk = clamp(redoRisk, 1, 5);

    const timeCost = safeHours * safeHourly;
    const baseDiyCost = safeMaterials + safeTools + timeCost;
    const riskPremium = baseDiyCost * (((safeDifficulty - 1) * 0.05) + ((safeRedoRisk - 1) * 0.05));
    const adjustedDiyCost = Math.round(baseDiyCost + riskPremium);
    const savings = Math.round(safeQuote - adjustedDiyCost);
    const savingsPct = safeQuote > 0 ? Math.round((savings / safeQuote) * 100) : 0;

    let recommendation = "Hire a pro";
    if (safeDifficulty <= 2 && safeRedoRisk <= 2 && savingsPct >= 25) recommendation = "DIY may make sense";
    else if (safeDifficulty <= 3 && safeRedoRisk <= 3 && savingsPct >= 15) recommendation = "Borderline";

    return { timeCost, adjustedDiyCost, savings, savingsPct, recommendation };
  }, [difficulty, hourlyValue, hours, materials, proQuote, redoRisk, tools]);

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
        <p>The calculator adds a simple planning premium as difficulty and rework risk increase. It does not price injury, code violations, permits, hidden damage, warranty loss, or catastrophic mistakes. Those factors can make professional work the better choice even when the raw dollar savings look large.</p>
      </details>
    </section>
  );
}
