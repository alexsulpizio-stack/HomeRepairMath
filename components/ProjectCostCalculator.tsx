"use client";

import { useMemo, useState } from "react";

export default function ProjectCostCalculator() {
  const [materials, setMaterials] = useState(1200);
  const [salesTax, setSalesTax] = useState(6);
  const [laborHours, setLaborHours] = useState(16);
  const [laborRate, setLaborRate] = useState(85);
  const [permits, setPermits] = useState(0);
  const [disposal, setDisposal] = useState(100);
  const [contingency, setContingency] = useState(10);

  const result = useMemo(() => {
    const safe = (value: number) => Math.max(0, Number.isFinite(value) ? value : 0);
    const materialSubtotal = safe(materials);
    const tax = materialSubtotal * (safe(salesTax) / 100);
    const labor = safe(laborHours) * safe(laborRate);
    const knownCosts = materialSubtotal + tax + labor + safe(permits) + safe(disposal);
    const contingencyAmount = knownCosts * (safe(contingency) / 100);
    const total = knownCosts + contingencyAmount;

    return {
      tax: Math.round(tax),
      labor: Math.round(labor),
      knownCosts: Math.round(knownCosts),
      contingencyAmount: Math.round(contingencyAmount),
      total: Math.round(total),
    };
  }, [contingency, disposal, laborHours, laborRate, materials, permits, salesTax]);

  return (
    <section className="calculator-card" aria-labelledby="project-cost-title">
      <div className="calculator-heading">
        <p className="eyebrow">Project cost estimator</p>
        <h2 id="project-cost-title">Build the estimate from the parts you actually know.</h2>
        <p>Enter your own local material and labor assumptions instead of relying on a national-average price.</p>
      </div>

      <div className="calculator-grid">
        <label>
          Materials subtotal ($)
          <input type="number" min="0" step="50" value={materials} onChange={(e) => setMaterials(Number(e.target.value))} />
        </label>
        <label>
          Materials sales tax (%)
          <input type="number" min="0" max="20" step="0.1" value={salesTax} onChange={(e) => setSalesTax(Number(e.target.value))} />
        </label>
        <label>
          Labor hours
          <input type="number" min="0" step="0.5" value={laborHours} onChange={(e) => setLaborHours(Number(e.target.value))} />
        </label>
        <label>
          Labor rate ($/hour)
          <input type="number" min="0" step="5" value={laborRate} onChange={(e) => setLaborRate(Number(e.target.value))} />
        </label>
        <label>
          Permits / inspection fees ($)
          <input type="number" min="0" step="25" value={permits} onChange={(e) => setPermits(Number(e.target.value))} />
        </label>
        <label>
          Disposal / delivery / misc. ($)
          <input type="number" min="0" step="25" value={disposal} onChange={(e) => setDisposal(Number(e.target.value))} />
        </label>
        <label>
          Contingency (%)
          <input type="number" min="0" max="50" step="1" value={contingency} onChange={(e) => setContingency(Number(e.target.value))} />
        </label>
      </div>

      <div className="result" aria-live="polite">
        <div>
          <span className="result-label">Planning estimate</span>
          <strong>${result.total.toLocaleString()}</strong>
        </div>
        <div>
          <span className="result-label">Contingency included</span>
          <strong>${result.contingencyAmount.toLocaleString()}</strong>
        </div>
      </div>

      <div className="cost-breakdown">
        <div><span>Materials tax</span><strong>${result.tax.toLocaleString()}</strong></div>
        <div><span>Labor</span><strong>${result.labor.toLocaleString()}</strong></div>
        <div><span>Known costs before contingency</span><strong>${result.knownCosts.toLocaleString()}</strong></div>
      </div>

      <details>
        <summary>Why include contingency?</summary>
        <p>Home projects often expose small unknowns after work begins. Contingency is not a prediction that something will go wrong; it is a planning allowance. Straightforward, well-scoped work may need less. Renovation, demolition, hidden conditions, or old construction may justify more.</p>
      </details>
    </section>
  );
}
