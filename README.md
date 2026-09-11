# HomeRepairMath

**The numbers behind smarter home repairs.**

HomeRepairMath is a low-maintenance, tool-first website for homeowners deciding whether to repair, replace, DIY, or hire a pro. The site is designed to pair genuinely useful evergreen calculators with search-friendly explanatory content and compliant AdSense placements.

## Product goals

- Help homeowners make better repair decisions with transparent math.
- Favor evergreen tools over high-maintenance news, price feeds, or product catalogs.
- Build pages that are useful even without ads.
- Target commercial-intent home-repair searches without becoming a thin SEO content farm.
- Keep the architecture simple enough to maintain with minimal owner involvement.

## Initial tool roadmap

1. Repair vs. Replace calculator
2. DIY vs. Hire-a-Pro calculator
3. Project cost estimator
4. Appliance lifespan / remaining-life estimator
5. Ownership-cost and energy-cost calculators

## Tech direction

- Next.js 16 App Router
- React 19
- TypeScript
- Static-first rendering where practical
- No database required for the MVP
- AdSense placeholders only until the site is approved and ready

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Monetization principles

Ad revenue is a secondary layer on top of useful tools. Ads should never be placed where they can be mistaken for navigation, calculator controls, or required actions. See `docs/adsense-strategy.md`.

## Status

MVP foundation in progress.
