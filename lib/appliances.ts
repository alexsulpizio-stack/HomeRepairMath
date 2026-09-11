export type ApplianceKey =
  | "washer"
  | "dryer"
  | "refrigerator"
  | "dishwasher"
  | "water-heater"
  | "hvac";

export type ApplianceProfile = {
  key: ApplianceKey;
  label: string;
  shortLabel: string;
  typicalLife: number;
  intro: string;
  repairNotes: string[];
  replacementNotes: string[];
};

export const appliances: Record<ApplianceKey, ApplianceProfile> = {
  washer: {
    key: "washer",
    label: "Washing machine",
    shortLabel: "Washer",
    typicalLife: 11,
    intro: "Compare a washer repair quote with replacement cost, age, and overall condition.",
    repairNotes: [
      "A newer machine with a single isolated failure can still have years of useful life.",
      "A repair that is small relative to replacement cost usually deserves serious consideration.",
    ],
    replacementNotes: [
      "Repeated failures matter more than one repair quote.",
      "Leaks, corrosion, bearing noise, or multiple aging systems can make replacement more attractive.",
    ],
  },
  dryer: {
    key: "dryer",
    label: "Dryer",
    shortLabel: "Dryer",
    typicalLife: 13,
    intro: "Estimate whether repairing an aging clothes dryer is still economical.",
    repairNotes: [
      "Many dryer repairs are relatively contained and can be worthwhile on an otherwise sound unit.",
      "Simple heating, belt, roller, or switch issues may be less expensive than replacement.",
    ],
    replacementNotes: [
      "Repeated overheating, drum, motor, or control problems can shift the economics toward replacement.",
      "A very old dryer may have little remaining life even after a successful repair.",
    ],
  },
  refrigerator: {
    key: "refrigerator",
    label: "Refrigerator",
    shortLabel: "Refrigerator",
    typicalLife: 13,
    intro: "Use age, repair cost, replacement cost, and condition to evaluate a refrigerator repair.",
    repairNotes: [
      "Door seals, fans, sensors, and some ice-maker problems can be economical repairs.",
      "A younger refrigerator with stable temperatures and no history of failures may justify repair.",
    ],
    replacementNotes: [
      "Sealed-system or compressor repairs can become expensive relative to replacement.",
      "Temperature instability, multiple failures, or an aging sealed system increase replacement pressure.",
    ],
  },
  dishwasher: {
    key: "dishwasher",
    label: "Dishwasher",
    shortLabel: "Dishwasher",
    typicalLife: 10,
    intro: "Check whether a dishwasher repair still makes financial sense.",
    repairNotes: [
      "A modest pump, latch, hose, or sensor repair can make sense on a newer dishwasher.",
      "Condition and prior reliability should influence the decision as much as the current quote.",
    ],
    replacementNotes: [
      "A high repair bill on an older dishwasher can quickly approach the value of replacement.",
      "Rust, leaks, damaged racks, and recurring control problems are signs to consider replacement.",
    ],
  },
  "water-heater": {
    key: "water-heater",
    label: "Water heater",
    shortLabel: "Water heater",
    typicalLife: 12,
    intro: "Compare water-heater repair cost with age, condition, and replacement economics.",
    repairNotes: [
      "A replaceable heating element, thermostat, valve, or igniter may justify repair on a sound tank.",
      "A younger unit without corrosion or leakage can still have meaningful useful life remaining.",
    ],
    replacementNotes: [
      "A leaking tank normally means replacement rather than repair.",
      "Visible corrosion, repeated service calls, or age near the expected life strongly increase replacement pressure.",
    ],
  },
  hvac: {
    key: "hvac",
    label: "Central HVAC system",
    shortLabel: "HVAC",
    typicalLife: 17,
    intro: "Use a first-pass financial screen for a central heating or cooling repair decision.",
    repairNotes: [
      "A repair can be sensible when the system is younger, otherwise reliable, and the failed part is isolated.",
      "Professional diagnosis is especially important because system condition is difficult to infer from age alone.",
    ],
    replacementNotes: [
      "Major compressor, heat-exchanger, refrigerant, or repeated control failures can materially change the economics.",
      "Efficiency differences and equipment compatibility can matter more for HVAC than for many appliances.",
    ],
  },
};

export const applianceKeys = Object.keys(appliances) as ApplianceKey[];

export function isApplianceKey(value: string): value is ApplianceKey {
  return value in appliances;
}
