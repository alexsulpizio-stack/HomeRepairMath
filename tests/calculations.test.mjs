import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRepair, calculateDiy, calculateProject } from '../lib/calculations.ts';
import { calculateLife } from '../lib/life.ts';

const repair = { expectedLife: 11, age: 7, repairCost: 350, replacementCost: 900, condition: 3, priorRepairs: 0 };
const diy = { proQuote: 900, materials: 300, tools: 75, hours: 8, hourlyValue: 25, difficulty: 3, redoRisk: 2 };
const project = { materials: 1200, salesTax: 6, laborHours: 16, laborRate: 85, permits: 0, disposal: 100, contingency: 10 };

test('repair score and recommendation agree at the previously inconsistent 67 boundary', () => {
  assert.equal(calculateRepair(repair).replacementScore, 46);
  const result = calculateRepair({ ...repair, repairCost: 850 });
  assert.equal(result.replacementScore, 67);
  assert.equal(result.recommendation, 'Replace');
});

test('all displayed scores use the documented recommendation thresholds', () => {
  for (let cost = 0; cost <= 2000; cost += 1) {
    const result = calculateRepair({ ...repair, repairCost: cost });
    const expected = result.replacementScore < 43 ? 'Repair' : result.replacementScore < 67 ? 'Borderline' : 'Replace';
    assert.equal(result.recommendation, expected);
  }
});

test('older equipment and costlier repairs never reduce replacement pressure', () => {
  let previous = 0;
  for (let age = 0; age <= 50; age++) {
    const result = calculateRepair({ ...repair, age });
    assert.ok(result.replacementScore >= previous);
    assert.ok(result.remainingLife >= 0);
    previous = result.replacementScore;
  }
  assert.equal(calculateRepair({ ...repair, age: 50, repairCost: 1000000, condition: 1, priorRepairs: 5 }).replacementScore, 100);
});

test('repair inputs reject blank, negative, zero replacement and fractional repair counts', () => {
  for (const value of [NaN, Infinity, -1, 1e100]) assert.equal(calculateRepair({ ...repair, repairCost: value }), null);
  assert.equal(calculateRepair({ ...repair, replacementCost: 0 }), null);
  assert.equal(calculateRepair({ ...repair, priorRepairs: 1.5 }), null);
  assert.equal(calculateRepair({ ...repair, age: 51 }), null);
  assert.ok(calculateRepair({ ...repair, repairCost: 0, age: 0 }));
});

test('DIY example includes time and the disclosed 15 percent allowance', () => {
  const result = calculateDiy(diy);
  assert.equal(result.timeCost, 200);
  assert.equal(result.baseDiyCost, 575);
  assert.ok(Math.abs(result.riskPremium - 86.25) < 1e-9);
  assert.equal(result.adjustedDiyCost, 661);
  assert.equal(result.savings, 239);
  assert.equal(result.savingsPct, 27);
});

test('difficulty is a decision gate even when savings are large', () => {
  assert.equal(calculateDiy({ ...diy, proQuote: 2000, difficulty: 2, redoRisk: 2 }).recommendation, 'DIY may make sense');
  assert.equal(calculateDiy({ ...diy, proQuote: 2000, difficulty: 5 }).recommendation, 'Hire a pro');
  assert.ok(calculateDiy({ ...diy, proQuote: 100 }).savings < 0);
});

test('DIY rejects missing quotes and unsafe arithmetic', () => {
  for (const value of [0, NaN, -1, Infinity]) assert.equal(calculateDiy({ ...diy, proQuote: value }), null);
  assert.equal(calculateDiy({ ...diy, hours: 1e9, hourlyValue: 1e9 }), null);
});

test('project example calculates tax, labor and contingency in order', () => {
  assert.deepEqual(calculateProject(project), { tax: 72, labor: 1360, knownCosts: 2732, contingencyAmount: 273, total: 3005 });
  assert.equal(calculateProject({ ...project, materials: 2200 }).total, 4171);
});

test('zero project is valid; decimals are retained until final rounding', () => {
  assert.equal(calculateProject({ materials: 0, salesTax: 0, laborHours: 0, laborRate: 0, permits: 0, disposal: 0, contingency: 0 }).total, 0);
  assert.equal(calculateProject({ materials: 100.50, salesTax: 5, laborHours: 1.5, laborRate: 20, permits: 0, disposal: 0, contingency: 10 }).total, 149);
});

test('project rejects invalid percentages, blank amounts and overflow', () => {
  for (const value of [NaN, -1, Infinity, 1e100]) assert.equal(calculateProject({ ...project, materials: value }), null);
  assert.equal(calculateProject({ ...project, salesTax: 21 }), null);
  assert.equal(calculateProject({ ...project, contingency: 51 }), null);
  assert.equal(calculateProject({ ...project, laborHours: 1e9, laborRate: 1e9 }), null);
});

test('life estimator is monotonic for age and rejects invalid ratings', () => {
  const base = { benchmark: 11, condition: 3, maintenance: 3, usage: 3 };
  let previous = 0;
  for (let age = 0; age <= 50; age++) { const result = calculateLife({ ...base, age }); assert.ok(result.score >= previous); previous = result.score; }
  assert.equal(calculateLife({ ...base, age: -1 }), null);
  assert.equal(calculateLife({ ...base, age: 7, condition: 6 }), null);
  assert.ok(calculateLife({ ...base, age: 7 }));
});
