export type EnergyPaybackInput = {
  upgradePremium: number;
  currentAnnualEnergyCost: number;
  efficientAnnualEnergyCost: number;
  ownershipYears: number;
};

export type EnergyPaybackResult = {
  annualSavings: number;
  paybackYears: number | null;
  horizonSavings: number;
  netHorizonSavings: number;
  annualReturnPct: number | null;
  recommendation:
    | "Pays back within your horizon"
    | "Does not pay back within your horizon"
    | "No energy-cost savings entered";
};

function finite(value: number) {
  return Number.isFinite(value);
}

export function calculateEnergyPayback(input: EnergyPaybackInput): EnergyPaybackResult | null {
  const { upgradePremium, currentAnnualEnergyCost, efficientAnnualEnergyCost, ownershipYears } = input;

  if (
    ![upgradePremium, currentAnnualEnergyCost, efficientAnnualEnergyCost, ownershipYears].every(finite) ||
    upgradePremium < 0 ||
    upgradePremium > 1_000_000_000 ||
    currentAnnualEnergyCost < 0 ||
    currentAnnualEnergyCost > 1_000_000_000 ||
    efficientAnnualEnergyCost < 0 ||
    efficientAnnualEnergyCost > 1_000_000_000 ||
    ownershipYears <= 0 ||
    ownershipYears > 100
  ) {
    return null;
  }

  const annualSavings = Math.max(0, currentAnnualEnergyCost - efficientAnnualEnergyCost);
  const paybackYears = annualSavings > 0 ? upgradePremium / annualSavings : null;
  const horizonSavings = annualSavings * ownershipYears;
  const netHorizonSavings = horizonSavings - upgradePremium;
  const annualReturnPct = upgradePremium > 0 ? (annualSavings / upgradePremium) * 100 : annualSavings > 0 ? Infinity : null;

  let recommendation: EnergyPaybackResult["recommendation"];
  if (annualSavings <= 0) {
    recommendation = "No energy-cost savings entered";
  } else if (paybackYears !== null && paybackYears <= ownershipYears) {
    recommendation = "Pays back within your horizon";
  } else {
    recommendation = "Does not pay back within your horizon";
  }

  return {
    annualSavings: Math.round(annualSavings * 100) / 100,
    paybackYears: paybackYears === null ? null : Math.round(paybackYears * 100) / 100,
    horizonSavings: Math.round(horizonSavings * 100) / 100,
    netHorizonSavings: Math.round(netHorizonSavings * 100) / 100,
    annualReturnPct:
      annualReturnPct === null
        ? null
        : annualReturnPct === Infinity
          ? Infinity
          : Math.round(annualReturnPct * 10) / 10,
    recommendation,
  };
}
