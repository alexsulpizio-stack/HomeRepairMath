export type LifeResult = { score: number; label: string; yearsUsed: number; yearsRemaining: number; notes: string[] };

export function calculateLife({ age, benchmark, condition, maintenance, usage }: { age: number; benchmark: number; condition: number; maintenance: number; usage: number }): LifeResult | null {
  if (![age, benchmark, condition, maintenance, usage].every(Number.isFinite) || age < 0 || age > 60 || benchmark < 1 || benchmark > 60 || condition < 1 || condition > 5 || maintenance < 1 || maintenance > 5 || usage < 1 || usage > 5) return null;
  const ageRatio = Math.min(age / benchmark, 1.5);
  const conditionPenalty = (5 - condition) / 4;
  const maintenancePenalty = (5 - maintenance) / 4;
  const usagePenalty = (usage - 1) / 4;
  const score = Math.min(100, Math.max(0, Math.round(ageRatio * 55 + conditionPenalty * 20 + maintenancePenalty * 15 + usagePenalty * 10)));
  const label = score >= 70 ? "Plan for replacement" : score >= 45 ? "Monitor closely" : "Lower replacement pressure";
  const yearsRemaining = Math.max(0, Math.round((benchmark - age) * 10) / 10);
  return { score, label, yearsUsed: Math.round(ageRatio * 100), yearsRemaining, notes: [
    age >= benchmark ? "Age is at or beyond the benchmark used by this estimate." : `Age is about ${Math.round(ageRatio * 100)}% of the benchmark used by this estimate.`,
    condition <= 2 ? "Condition increases replacement pressure." : "Condition does not add much replacement pressure.",
    maintenance <= 2 ? "Skipped or inconsistent maintenance increases replacement pressure." : "Maintenance history reduces replacement pressure.",
    usage >= 4 ? "Heavy usage increases replacement pressure." : "Usage is not in the heavy-use range.",
  ] };
}
