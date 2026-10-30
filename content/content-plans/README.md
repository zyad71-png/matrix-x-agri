# Content plans

Run `node scripts/build-content-plans.mjs` from the repository root. It validates parity of the Arabic and English content keys and generates both static pages. Content is sourced solely from the approved AR/EN copy blocks and UI table. The source instructions and owner appendix are not published.

Routes: `/agri/content-plans/ar/` and `/agri/content-plans/en/`.

`content/content-plans/settings.json` contains `SITE_URL` and `FORM_ENDPOINT`. The build writes the runtime config. SITE_URL is the current Sites origin; update settings and rebuild when moving to another domain. FORM_ENDPOINT is intentionally empty. No fields or send button appear until a valid HTTPS endpoint is configured.

Endpoint contract when configured: POST JSON with name, company, contact, plan and optional message. Show success only for a successful HTTP response whose JSON has `accepted: true`. Failure retains all field values. This contract was tested with a mock; no real delivery service is configured or claimed.

No tax, revision allowance, contract duration or optional-service pricing has been added.
