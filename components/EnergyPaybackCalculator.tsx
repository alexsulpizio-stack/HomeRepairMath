"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/NumberInput";
import { calculateEnergyPayback } from "@/lib/energy";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function EnergyPaybackCalculator() {
  const [upgradePremium, setUpgradePremium] = useState(800);
  const [currentAnnualEnergyCost, setCurrentAnnualEnergyCost] = useState(900);
  const [efficientAnnualEnergyCost, setEfficientAnnualEnergyCost] = useState(650);
  const [ownershipYears, setOwnershipYears] = useState(8);

  const result = useMemo(() => calculateEnergyPayback({
    upgradePremium,
    currentAnnualEnergyCost,
    efficientAnnualEnergyCost,
    ownershipYears,
  }), [currentAnnualEnergyCost, efficientAnnualEnergyCost, ownershipYears, upgradePremium]);

  return (
    <section className="calculator-card" aria-labelledby="energy-payback-title">
      <div className="calculator-heading">
        <p className="eyebrow">Energy payback calculator</p>
        <h2 id="energy-payback-title">Will the efficiency upgrade pay for itself?</h2>
        <p>Compare the extra upfront price of the more efficient option with the annual energy-cost savings you expect. Use the price difference between two options—not the full purchase price.</p>
      </div>
      <div className="calculator-grid">
        <label>Extra upfront cost of efficient option ($)<NumberInput min={0} max={1_000_000_000} value={upgradePremium} onChange={setUpgradePremium} /></label>
        <label>Annual energy cost of baseline option ($)<NumberInput min={0} max={1_000_000_000} value={currentAnnualEnergyCost} onChange={setCurrentAnnualEnergyCost} /></label>
        <label>Annual energy cost of efficient option ($)<NumberInput min={0} max={1_000_000_000} value={efficientAnnualEnergyCost} onChange={setEfficientAnnualEnergyCost} /></label>
        <label>Years you expect to own/use it<NumberInput min={0.1} max={100} value={ownershipYears} onChange={setOwnershipYears} /></label>
      </div>
      {result ? (
        <>
          <div className="result" aria-live="polite">
            <div><span className="result-label">Planning result</span><strong>{result.recommendation}</strong></div>
            <div><span className="result-label">Simple payback</span><strong>{result.paybackYears === null ? "No payback" : result.paybackYears + " years"}</strong></div>
          </div>
          <div className="cost-breakdown" aria-label="Energy payback breakdown">
            <div><span>Annual energy savings</span><strong>{money(result.annualSavings)}</strong></div>
            <div><span>Energy savings over ownership horizon</span><strong>{money(result.horizonSavings)}</strong></div>
            <div><span>Net savings after upgrade premium</span><strong>{money(result.netHorizonSavings)}</strong></div>
            <div><span>Simple annual return on upgrade premium</span><strong>{result.annualReturnPct === null ? "—" : result.annualReturnPct === Infinity ? "Immediate" : result.annualReturnPct + "%"}</strong></div>
          </div>
          <div className="reason-list">
            <strong>How to read this result</strong>
            <ul>
              <li>This is simple payback: upgrade premium ÷ annual energy savings.</li>
              <li>It does not model financing, inflation, energy-price changes, maintenance, rebates, tax credits, or resale value.</li>
              <li>A positive payback result does not mean replacing working equipment early is automatically economical.</li>
            </ul>
          </div>
        </>
      ) : <p className="input-error" role="status">Check the highlighted fields to see the estimate.</p>}
      <details>
        <summary>What should I enter as the upgrade premium?</summary>
        <p>Use the price difference between the efficient option and the realistic baseline option you would otherwise buy. Example: if a standard replacement is $1,200 and the efficient version is $1,700, enter $500—not $1,700.</p>
      </details>
    </section>
  );
}
