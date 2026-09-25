import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateContractorQuote,
  calculateDiyHire,
  calculateProjectCost,
  calculateRepairReplace,
} from "../lib/calculations.ts";

test("repair/replace: newer cheap repair favors repair", () => {
  const result = calculateRepairReplace({
    expectedLife: 11,
    age: 2,
    repairCost: 100,
    replacementCost: 1000,
    condition: 5,
    priorRepairs: 0,
  });
  assert.equal(result.replacementScore, 10.61);
  assert.equal(result.recommendation, "Repair");
});

test("repair/replace: mid-life moderate repair is borderline", () => {
  const result = calculateRepairReplace({
    expectedLife: 11,
    age: 7,
    repairCost: 350,
    replacementCost: 900,
    condition: 3,
    priorRepairs: 0,
  });
  assert.equal(result.replacementScore, 46.07);
  assert.equal(result.recommendation, "Borderline");
});

test("repair/replace: old costly repeat repairs favor replacement", () => {
  const result = calculateRepairReplace({
    expectedLife: 11,
    age: 12,
    repairCost: 700,
    replacementCost: 1000,
    condition: 2,
    priorRepairs: 2,
  });
  assert.equal(result.replacementScore, 82.6);
  assert.equal(result.recommendation, "Replace");
});

test("repair/replace: extreme inputs are capped safely", () => {
  const result = calculateRepairReplace({
    expectedLife: 11,
    age: 500,
    repairCost: 999999,
    replacementCost: 0,
    condition: -10,
    priorRepairs: 99,
  });
  assert.equal(result.replacementScore, 100);
  assert.equal(result.recommendation, "Replace");
});

test("DIY: easy project with strong savings can favor DIY", () => {
  const result = calculateDiyHire({
    proQuote: 1000,
    materials: 200,
    tools: 50,
    hours: 4,
    hourlyValue: 25,
    difficulty: 1,
    redoRisk: 1,
  });
  assert.equal(result.adjustedDiyCost, 350);
  assert.equal(result.savings, 650);
  assert.equal(result.recommendation, "DIY may make sense");
});

test("DIY: moderate project can be borderline", () => {
  const result = calculateDiyHire({
    proQuote: 1000,
    materials: 300,
    tools: 50,
    hours: 8,
    hourlyValue: 25,
    difficulty: 3,
    redoRisk: 3,
  });
  assert.equal(result.adjustedDiyCost, 660);
  assert.equal(result.savings, 340);
  assert.equal(result.recommendation, "Borderline");
});

test("DIY: hard project can favor hiring", () => {
  const result = calculateDiyHire({
    proQuote: 1000,
    materials: 300,
    tools: 100,
    hours: 12,
    hourlyValue: 30,
    difficulty: 5,
    redoRisk: 5,
  });
  assert.equal(result.adjustedDiyCost, 1064);
  assert.equal(result.savings, -64);
  assert.equal(result.recommendation, "Hire a pro");
});

test("project cost: normal estimate", () => {
  const result = calculateProjectCost({
    materials: 1200,
    salesTax: 6,
    laborHours: 16,
    laborRate: 85,
    permits: 0,
    disposal: 100,
    contingency: 10,
  });
  assert.deepEqual(result, {
    tax: 72,
    labor: 1360,
    knownCosts: 2732,
    contingencyAmount: 273,
    total: 3005,
  });
});

test("project cost: rate caps prevent accidental extreme totals", () => {
  const result = calculateProjectCost({
    materials: 1000,
    salesTax: 99,
    laborHours: 10,
    laborRate: 100,
    permits: 100,
    disposal: 100,
    contingency: 99,
  });
  assert.deepEqual(result, {
    tax: 200,
    labor: 1000,
    knownCosts: 2400,
    contingencyAmount: 1200,
    total: 3600,
  });
});

test("project cost: negative inputs sanitize to zero", () => {
  const result = calculateProjectCost({
    materials: -1,
    salesTax: -1,
    laborHours: -1,
    laborRate: -1,
    permits: -1,
    disposal: -1,
    contingency: -1,
  });
  assert.deepEqual(result, {
    tax: 0,
    labor: 0,
    knownCosts: 0,
    contingencyAmount: 0,
    total: 0,
  });
});


test("contractor quote: normalizes known exclusions and allowance gaps", () => {
  const result = calculateContractorQuote({
    quotedTotal: 18000,
    knownExtras: 1800,
    allowanceGap: 1200,
    depositPercent: 30,
    warrantyYears: 1,
    confirmedScopeItems: 4,
    totalScopeItems: 6,
  });

  assert.deepEqual(result, {
    quotedTotal: 18000,
    comparableTotal: 21000,
    addedCost: 3000,
    depositAmount: 5400,
    depositPercent: 30,
    warrantyYears: 1,
    confirmedScopeItems: 4,
    totalScopeItems: 6,
    scopeCompletenessPct: 67,
  });
});

test("contractor quote: sanitizes and caps user-entered values", () => {
  const result = calculateContractorQuote({
    quotedTotal: -100,
    knownExtras: -50,
    allowanceGap: 500,
    depositPercent: 150,
    warrantyYears: 99,
    confirmedScopeItems: 20,
    totalScopeItems: 6,
  });

  assert.deepEqual(result, {
    quotedTotal: 0,
    comparableTotal: 500,
    addedCost: 500,
    depositAmount: 0,
    depositPercent: 100,
    warrantyYears: 50,
    confirmedScopeItems: 6,
    totalScopeItems: 6,
    scopeCompletenessPct: 100,
  });
});
