# HomeRepairMath

**The numbers behind smarter home repairs.**

HomeRepairMath is a low-maintenance, tool-first website for homeowners deciding whether to repair, replace, DIY, hire a pro, or budget a project. The site is designed to pair genuinely useful evergreen calculators with search-friendly explanatory content and conservative, policy-safe AdSense placements.

## Product goals

- Help homeowners make better repair decisions with transparent math.
- Favor evergreen tools over high-maintenance news, price feeds, or product catalogs.
- Build pages that remain useful if every ad is removed.
- Target commercial-intent home-repair searches without becoming a thin SEO content farm.
- Keep the architecture simple enough to maintain with minimal owner involvement.

## Current tools

1. **Repair vs. Replace** — age, repair/replacement cost, condition, and repair-history model.
2. **DIY vs. Hire a Pro** — compares a professional quote with materials, tools, time, difficulty, and rework risk.
3. **Project Cost Estimator** — combines user-entered materials, labor, fees, taxes, disposal, and contingency.

Repair-vs-replace has dedicated static landing pages for washers, dryers, refrigerators, dishwashers, water heaters, and central HVAC systems.

## Planned expansion

- Appliance remaining-life estimator
- Energy-efficiency payback calculator
- Additional repair categories only when the page can provide item-specific value

## Tech

- Next.js 16 App Router
- React 19
- TypeScript
- Static-first rendering where practical
- No database required for the MVP
- GitHub Actions lint/build validation
- AdSense placeholders only until the site is complete, deployed, and approved

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Production validation:

```bash
npm run lint
npm run build
```

## Project documentation

- `docs/roadmap.md` — product sequence
- `docs/content-standard.md` — minimum quality bar for indexable pages
- `docs/seo-strategy.md` — search architecture
- `docs/adsense-strategy.md` — monetization and policy guardrails
- `docs/launch-checklist.md` — launch steps and owner-input gates

## Monetization principles

Ad revenue is a secondary layer on top of useful tools. Ads must not be confused with navigation, calculator controls, recommendations, or required actions. Live ad code should not be added simply to make an unfinished site monetizable.

## Status

Functional pre-launch MVP. Public deployment, domain confirmation, contact information, analytics choice, and AdSense credentials are intentionally not hard-coded into the repository.
