# SEO Strategy

HomeRepairMath should win by being more useful than a generic answer page.

## Search model

Target queries where a homeowner is making a decision rather than casually researching:

- repair or replace [appliance]
- is [repair] worth it
- [appliance] repair cost vs replacement
- how old is too old to repair [appliance]
- DIY vs hire [project]
- home project cost calculator
- project estimate calculator

## Current page architecture

Use a hub-and-spoke structure:

- `/` — brand and flagship tool hub
- `/tools` — all calculator index
- `/repair-or-replace/washer`
- `/repair-or-replace/dryer`
- `/repair-or-replace/refrigerator`
- `/repair-or-replace/dishwasher`
- `/repair-or-replace/water-heater`
- `/repair-or-replace/hvac`
- `/diy-or-hire`
- `/project-cost`
- `/methodology` — formula transparency and trust
- `/about`, `/privacy`, `/disclaimer` — trust/policy pages

Each page should link to closely related decisions rather than a generic wall of unrelated links.

## What makes a page index-worthy

A page should include meaningful unique value such as:

- an interactive calculator or a materially unique decision model
- item-specific assumptions or failure considerations
- transparent formulas
- interpretation of the result
- useful edge cases
- safety/professional-callout guidance
- an explanation of what changes the math

Avoid mass-producing near-identical pages with only nouns swapped. If a new category cannot add item-specific value, keep it inside a broader tool instead of creating a new indexable URL.

## Technical priorities

- Static/server rendering for primary content
- Descriptive titles and meta descriptions
- Canonical URLs
- XML sitemap and robots metadata
- Semantic headings and accessible forms
- Fast mobile rendering and minimal JavaScript outside interactive tools
- Structured data only where it accurately matches visible content
- Clear top navigation and a crawlable tools index
- No dependence on frequently changing price feeds for core usefulness

## Measurement after launch

Use Search Console first to identify:

- queries with impressions but weak click-through rate;
- pages ranking just outside the first page;
- unexpected search intents that deserve clearer content;
- tool categories that attract meaningful demand;
- pages that Google crawls but declines to index.

Analytics, if enabled, should answer product questions such as which calculators people use and whether visitors continue to related tools. Do not collect data merely because it is available.

## Maintenance

Search performance should be reviewed periodically rather than requiring continuous publishing. Expand categories based on Search Console impressions, useful tool opportunities, and actual user demand—not on a fixed blogging calendar.
