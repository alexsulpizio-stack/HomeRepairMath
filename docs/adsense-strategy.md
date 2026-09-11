# AdSense Strategy

HomeRepairMath should maximize long-term revenue by maximizing useful, commercially relevant sessions — not by maximizing ad density.

Current Google guidance emphasizes unique/relevant content, clear navigation, enough finished content for a meaningful user experience, and ad implementations that do not encourage accidental clicks or interfere with interactive controls.

Official references:

- https://support.google.com/adsense/answer/7299563
- https://support.google.com/adsense/answer/81904
- https://support.google.com/adsense/answer/1346295
- https://support.google.com/publisherpolicies/answer/11035030
- https://support.google.com/adsense/answer/7549925

## Principles

- The page must remain useful if every ad is removed.
- Keep ads visually separate from calculator controls, navigation, recommendations, and calls to action.
- Never label an ad in a way that implies it is part of the calculation or a required next step.
- Avoid layouts that create accidental clicks, especially on mobile.
- Protect Core Web Vitals by reserving ad space to reduce layout shift.
- Start conservative and increase inventory only after measuring revenue, engagement, and page performance.
- Do not add live ad code while pages still look unfinished or under construction.
- Do not click live ads during development or testing.

## Initial placement model

For a long-form tool page:

1. One ad after useful introductory/supporting content and clearly separated from the primary tool.
2. One ad after the tool/result explanation.
3. One later in-content ad only on pages long enough to support it naturally.
4. Consider anchor/Auto Ads only after real traffic data exists and only if they do not degrade the calculator experience.

The MVP uses explicit placeholders so placement can be evaluated before live AdSense code is added. Production should replace development labels with properly reserved ad containers or remove them until approval.

## Content threshold

Do not create pages solely to host ads. A dedicated landing page should have a distinct reason to exist: unique inputs, assumptions, explanation, methodology, or homeowner guidance.

Template-driven pages must contain meaningful item-specific value. If two pages differ only by a noun and a lifespan number, consolidate them instead of publishing both.

## Privacy and consent

Google states that publishers must clearly disclose cookie use. Before any ad tags or analytics tags are loaded in production:

- make the privacy policy match the actual implementation;
- configure any consent mechanism required for the audiences/regions served;
- document which third parties receive data;
- avoid loading tracking merely to make an empty ad placeholder work.

## Revenue expansion

Once organic traffic is established, evaluate:

- AdSense RPM by tool/category
- viewability by slot
- mobile vs. desktop RPM
- engagement after calculator completion
- pages that drive additional tool use
- high-value categories worth expanding

Do not optimize clicks. Optimize legitimate page value, qualified traffic, viewability, and useful session depth.
