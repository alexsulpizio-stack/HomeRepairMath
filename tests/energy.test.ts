import test from "node:test";
import assert from "node:assert/strict";
import { calculateEnergyPayback } from "../lib/energy.ts";

test("energy payback: efficient option pays back within horizon", () => {
  const result = calculateEnergyPayback({ upgradePremium: 500, currentAnnualEnergyCost: 800, efficientAnnualEnergyCost: 650, ownershipYears: 8 });
  assert.ok(result);
  assert.equal(result.annualSavings, 150);
  assert.equal(result.paybackYears, 3.33);
  assert.equal(result.horizonSavings, 1200);
  assert.equal(result.netHorizonSavings, 700);
  assert.equal(result.recommendation, "Pays back within your horizon");
});

test("energy payback: payback can exceed ownership horizon", () => {
  const result = calculateEnergyPayback({ upgradePremium: 1200, currentAnnualEnergyCost: 900, efficientAnnualEnergyCost: 800, ownershipYears: 5 });
  assert.ok(result);
  assert.equal(result.paybackYears, 12);
  assert.equal(result.netHorizonSavings, -700);
  assert.equal(result.recommendation, "Does not pay back within your horizon");
});

test("energy payback: no energy savings produces no payback", () => {
  const result = calculateEnergyPayback({ upgradePremium: 500, currentAnnualEnergyCost: 700, efficientAnnualEnergyCost: 750, ownershipYears: 10 });
  assert.ok(result);
  assert.equal(result.annualSavings, 0);
  assert.equal(result.paybackYears, null);
  assert.equal(result.recommendation, "No energy-cost savings entered");
});

test("energy payback: zero premium with savings is immediate", () => {
  const result = calculateEnergyPayback({ upgradePremium: 0, currentAnnualEnergyCost: 700, efficientAnnualEnergyCost: 600, ownershipYears: 5 });
  assert.ok(result);
  assert.equal(result.paybackYears, 0);
  assert.equal(result.annualReturnPct, Infinity);
  assert.equal(result.recommendation, "Pays back within your horizon");
});

test("energy payback: invalid inputs return null", () => {
  assert.equal(calculateEnergyPayback({ upgradePremium: -1, currentAnnualEnergyCost: 700, efficientAnnualEnergyCost: 600, ownershipYears: 5 }), null);
  assert.equal(calculateEnergyPayback({ upgradePremium: 500, currentAnnualEnergyCost: 700, efficientAnnualEnergyCost: 600, ownershipYears: 0 }), null);
});
