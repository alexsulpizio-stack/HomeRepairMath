# Launch Checklist

This checklist separates work that can be completed in the repository from decisions or credentials that require the owner.

## Code and content — completed before owner input

- [x] Responsive Next.js application shell
- [x] Repair-vs-replace calculator
- [x] Dedicated repair-vs-replace landing pages
- [x] DIY-vs-hire calculator
- [x] Project cost estimator
- [x] Crawlable tools index and primary navigation
- [x] About, methodology, privacy, and disclaimer pages
- [x] Sitemap, robots, manifest, canonical metadata
- [x] Structured data for core tools
- [x] Generated favicon and social-sharing image
- [x] Reserved ad placements away from interactive controls
- [x] CI lint/build workflow
- [x] Basic security headers
- [x] CI green on current main branch
- [x] Static route/link/metadata review
- [ ] Final visual accessibility and mobile pass on a deployed build

## Owner input required before public launch

- [ ] Confirm ownership/control of the production domain (planned: homerepairmath.com)
- [ ] Choose the public contact method/email shown on the site
- [ ] Choose hosting/deployment target and authorize deployment

## Owner/account input required before monetization

- [ ] AdSense account/site approval
- [ ] AdSense publisher/client ID
- [ ] Ad slot IDs if using manual units
- [ ] Consent/CMP configuration required for the audiences and regions served
- [ ] Decide whether to enable Google Analytics or another analytics provider

## After deployment, before AdSense review

- [ ] Verify HTTPS and canonical domain redirects
- [ ] Verify robots.txt and sitemap.xml on production
- [ ] Add site to Google Search Console
- [ ] Submit sitemap
- [ ] Confirm important pages are crawlable and render correctly without JavaScript errors
- [ ] Build enough complete, original pages that the site does not look under construction
- [ ] Remove all visible “Future ad placement” development labels from production or replace them with live/reserved production-safe ad containers
- [ ] Verify privacy policy matches the actual analytics, advertising, cookies, and consent behavior

## After AdSense approval

- [ ] Add publisher code via environment variables/configuration
- [ ] Add ads.txt with the exact approved publisher ID
- [ ] Validate ad spacing on mobile and desktop
- [ ] Never click live ads during testing
- [ ] Monitor Core Web Vitals, layout shift, RPM, and engagement
- [ ] Increase ad inventory only when user experience remains strong
