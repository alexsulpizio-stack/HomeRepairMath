export type RepairReplaceInput = {
  expectedLife: number;
  age: number;
  repairCost: number;
  replacementCost: number;
  condition: number;
  priorRepairs: number;
};

export type RepairReplaceResult = {
  expectedLife: number;
  replacementScore: number;
  recommendation: "Repair" | "Borderline" | "Replace";
  remainingLife: number;
  breakEvenRepair: number;
  repairPercent: number;
  reasons: string[];
};

export type DiyHireInput = {
  proQuote: number;
  materials: number;
  tools: number;
  hours: number;
  hourlyValue: number;
  difficulty: number;
  redoRisk: number;
};

export type DiyHireResult = {
  timeCost: number;
  adjustedDiyCost: number;
  savings: number;
  savingsPct: number;
  recommendation: "DIY may make sense" | "Borderline" | "Hire a pro";
};

export type ProjectCostInput = {
  materials: number;
  salesTax: number;
  laborHours: number;
  laborRate: number;
  permits: number;
  disposal: number;
  contingency: number;
};

export type ProjectCostResult = {
  tax: number;
  labor: number;
  knownCosts: number;
  contingencyAmount: number;
  total: number;
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function finiteOr(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

function nonNegative(value: number) {
  return Math.max(0, finiteOr(value));
}

export function calculateRepairReplace(input: RepairReplaceInput): RepairReplaceResult {
  const expectedLife = Math.max(1, finiteOr(input.expectedLife, 1));
  const cleanAge = clamp(nonNegative(input.age), 0, 50);
  const cleanRepair = nonNegative(input.repairCost);
  const cleanReplacement = Math.max(1, finiteOr(input.replacementCost, 1));
  const cleanCondition = clamp(finiteOr(input.condition, 3), 1, 5);
  const cleanPriorRepairs = clamp(finiteOr(input.priorRepairs), 0, 5);

  const ageRatio = clamp(cleanAge / expectedLife, 0, 1.5);
  const repairRatio = clamp(cleanRepair / cleanReplacement, 0, 2);
  const conditionPenalty = (5 - cleanCondition) / 4;
  const repeatRepairPenalty = cleanPriorRepairs / 5;

  const replacementScore = clamp(
    Math.round(
      (ageRatio * 38 + repairRatio * 37 + conditionPenalty * 15 + repeatRepairPenalty * 10) * 100,
    ) / 100,
    0,
    100,
  );

  const recommendation =
    replacementScore >= 67 ? "Replace" : replacementScore >= 43 ? "Borderline" : "Repair";

  const remainingLife = Math.max(0, Math.round((expectedLife - cleanAge) * 10) / 10);
  const repairPercent = Math.round((cleanRepair / cleanReplacement) * 100);
  const breakEvenRepair = Math.round(cleanReplacement * 0.5);

  const reasons = [
    cleanAge >= expectedLife
      ? `Age is at or beyond the typical ${expectedLife}-year life used by this model.`
      : `Age is about ${Math.round(ageRatio * 100)}% of the typical life used by this model.`,
    `The repair quote is about ${repairPercent}% of the replacement cost.`,
    cleanPriorRepairs > 0
      ? `${cleanPriorRepairs} prior repair${cleanPriorRepairs === 1 ? "" : "s"} increase the chance of spending more on an aging unit.`
      : "No prior repairs were entered, which reduces replacement pressure.",
  ];

  return {
    expectedLife,
    replacementScore,
    recommendation,
    remainingLife,
    breakEvenRepair,
    repairPercent,
    reasons,
  };
}

export function calculateDiyHire(input: DiyHireInput): DiyHireResult {
  const safeQuote = nonNegative(input.proQuote);
  const safeMaterials = nonNegative(input.materials);
  const safeTools = nonNegative(input.tools);
  const safeHours = nonNegative(input.hours);
  const safeHourly = nonNegative(input.hourlyValue);
  const safeDifficulty = clamp(finiteOr(input.difficulty, 3), 1, 5);
  const safeRedoRisk = clamp(finiteOr(input.redoRisk, 3), 1, 5);

  const timeCost = safeHours * safeHourly;
  const baseDiyCost = safeMaterials + safeTools + timeCost;
  const riskPremium =
    baseDiyCost * (((safeDifficulty - 1) * 0.05) + ((safeRedoRisk - 1) * 0.05));
  const adjustedDiyCost = Math.round(baseDiyCost + riskPremium);
  const savings = Math.round(safeQuote - adjustedDiyCost);
  const savingsPct = safeQuote > 0 ? Math.round((savings / safeQuote) * 100) : 0;

  let recommendation: DiyHireResult["recommendation"] = "Hire a pro";
  if (safeDifficulty <= 2 && safeRedoRisk <= 2 && savingsPct >= 25) {
    recommendation = "DIY may make sense";
  } else if (safeDifficulty <= 3 && safeRedoRisk <= 3 && savingsPct >= 15) {
    recommendation = "Borderline";
  }

  return { timeCost, adjustedDiyCost, savings, savingsPct, recommendation };
}

export function calculateProjectCost(input: ProjectCostInput): ProjectCostResult {
  const materialSubtotal = nonNegative(input.materials);
  const taxRate = Math.min(nonNegative(input.salesTax), 20);
  const contingencyRate = Math.min(nonNegative(input.contingency), 50);
  const tax = materialSubtotal * (taxRate / 100);
  const labor = nonNegative(input.laborHours) * nonNegative(input.laborRate);
  const knownCosts =
    materialSubtotal + tax + labor + nonNegative(input.permits) + nonNegative(input.disposal);
  const contingencyAmount = knownCosts * (contingencyRate / 100);
  const total = knownCosts + contingencyAmount;

  return {
    tax: Math.round(tax),
    labor: Math.round(labor),
    knownCosts: Math.round(knownCosts),
    contingencyAmount: Math.round(contingencyAmount),
    total: Math.round(total),
  };
}
