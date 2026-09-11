# Calculator Math Validation

Validated against the formulas currently used by HomeRepairMath. These cases are intended to catch arithmetic mistakes, divide-by-zero behavior, and misleading behavior at input extremes.

## Repair vs. replace

| Case | Inputs | Expected result |
| --- | --- | --- |
| Newer unit, cheap repair | life 11y, age 2, repair $100, replacement $1,000, excellent, 0 recent repairs | score 10.61 — Repair |
| Mid-life, moderate repair | life 11y, age 7, repair $350, replacement $900, average, 0 repairs | score 46.07 — Borderline |
| Old, costly, repeat repairs | life 11y, age 12, repair $700, replacement $1,000, fair, 2 repairs | score 82.60 — Replace |
| Zero-dollar repair | life 11y, age 5, repair $0, replacement $1,000, average | score 24.77 — Repair |
| Negative values | negative age/costs and out-of-range selectors | sanitized; score bottoms at 0 rather than producing NaN |
| Extreme values | age 50, very large repair, $1 replacement, poor condition, 5 repairs | score caps at 100 — Replace |

## DIY vs. hire

| Case | Inputs | Expected result |
| --- | --- | --- |
| Easy project with strong savings | pro $1,000; materials $200; tools $50; 4h at $25; very easy/very low risk | adjusted DIY $350; saves $650 (65%) — DIY may make sense |
| Moderate project | pro $1,000; materials $300; tools $50; 8h at $25; moderate/moderate | adjusted DIY $660; saves $340 (34%) — Borderline |
| Hard project | pro $1,000; materials $300; tools $100; 12h at $30; very hard/very high risk | adjusted DIY $1,064; costs $64 more — Hire a pro |
| Zero quote | all zero | no divide-by-zero; Hire a pro |
| Negative values | negative money/time and out-of-range risk selectors | sanitized to non-negative costs and clamped selectors |

## Project cost

| Case | Inputs | Expected result |
| --- | --- | --- |
| Normal estimate | materials $1,200; tax 6%; 16h at $85; misc $100; contingency 10% | tax $72; labor $1,360; known $2,732; contingency $273; total $3,005 |
| All zero | all zero | total $0 |
| Negative values | all negative | sanitized to $0 |
| Over-limit rates | materials $1,000; tax 99%; 10h at $100; permits $100; misc $100; contingency 99% | tax capped at 20% ($200); contingency capped at 50% ($1,200); total $3,600 |

## Interpretation limits

These checks validate arithmetic and guardrails, not the empirical accuracy of the planning weights. Repair-life benchmarks and recommendation thresholds are heuristics and should be revised if better evidence supports different values.
