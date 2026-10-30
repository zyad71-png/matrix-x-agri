# Content plans

Run `node scripts/build-content-plans.mjs` from the repository root. It validates Arabic/English key parity and generates both static language pages. The approved source copy remains in the two JSON files.

Routes: `/agri/content-plans/ar/` and `/agri/content-plans/en/`.

The display-only redesign intentionally omits the contact section, team-contact links, plan request buttons, form and selection summary, as requested by the user. The original source fields remain in content files for provenance, but excluded fields are neither rendered nor included in the page's runtime JSON. There is no personal-data collection or submission code.

Old links with `#contact` are redirected within the page to `#plans`. Language switching preserves the current valid section and existing query parameters.

`settings.json` defines SITE_URL for canonical/alternate/OG URLs. Update it and rebuild if the domain changes. FORM_ENDPOINT remains empty and unused by the display-only pages.

Comparison uses the complete table on tablet/desktop and paired plan values per metric below 701px. English output omits Arabic alternate names. At Aero supplied webfonts are loaded site-wide for Latin text; Arabic retains Thmanyah. Both pricing pages and the reel use presentation-motion.js for recurring, reduced-motion-aware scroll transitions.
