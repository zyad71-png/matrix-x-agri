# AGRI review notes

The editorial source is source.md. This is a client review presentation, not publishing approval.

The new home lives at /agri/ with three anchors: #start, #samples, #pricing. Legacy home anchors resolve to these sections. The exhibition selector and all HVAC files are preserved. Existing AGRI storyboard/designs/pricing routes remain accessible for existing links; the home consolidates the review journey.

## Asset mapping verified visually
- Design 01: agri-1 (6).png — golden leaf, business network.
- Design 02: agri-1 (4).png — agricultural products, company representatives.
- Design 04: agri-1 (3).png — showcase company products.
- Design 03: agri-1 (2).png — scientific sessions.
- Extra: agri-1.png — invest your visit, outside eight pieces.
- Carousel cover: agri-1-(5).png (duplicated in both uploads).
- Carousel products in editorial order: 04_12_08 AM-4 (Fos Zink Addition), 04_11_45 AM-5 (Fungieb), 04_12_03 AM-2 (Zola Safe), 04_12_06 AM-3 (Fungieb Plus), 04_12_00 AM-1 (Propika).

## Storyboard limitation
Seven existing images belong to the previous sponsorship concept (office, brochure, computer, hall/farm transition, office presenter, ending). They do not fully match the new Reel 02 visitor/catalogue script. They are explicitly labelled as reference images with the discrepancy visible. No scene/timing correspondence is asserted. The new source script is unchanged.

## Commercial scope discrepancy
Current prices/quantities are unchanged: Essential EGP30,000/18 pieces, Expanded EGP45,000/29 pieces monthly. The existing package wording assigns archive production to Matrix, while the new brief assigns archive selection and production to the exhibition team. The home uses the user's current archive responsibility instruction, documents this discrepancy, and makes no calculation for the cost of two weeks. Existing shared pricing sources and HVAC are untouched.

## Pending
Publication start date; company names; participant and presenter names/titles; two approved products/descriptions; filming dates/locations; scientific programme confirmation; any new reel/key art assets. Library reference links now use the supplied local artwork. Booking and registration URLs are copied from source; automated navigation can validate hrefs, but external site submission/registration availability is not asserted.

Run python scripts/build-agri-home.py to regenerate the home. Uploaded source images are converted to optimized JPEGs; the committed outputs are reused when the original uploads are absent. Legacy home HTML is retained here for provenance. Do not run the older prepare-ui step to add legacy navigation code to this home; this page uses its own home.js navigation and hash aliases.

Validation: all eight piece dialogs opened at 390/768/1440px; both week tabs; two slides for each static design; all six Agro Safe slides in order; nested image zoom and Escape; seven storyboard images; no runtime errors or failed asset responses in local Chromium. All HVAC files matched their pre-change SHA256 values. No actual iOS Safari device was available. External registration and booking submissions were not exercised.

## Follow-up refinement
Removed the pending-data display and the legacy strategy text accordion from home. The former strategic site is now /agri/strategy.html, with its execution showcase removed and entry/return links added. Home uses three columns and 4:5 tiles at all widths, week value introductions, and per-topic expandable post details. Added the approved production workflow, aligned plan comparison (essential right/expanded left with shared rows), monthly planning deliverables and separate optional services. Validated at 390/768/1440px; all eight dialogs, caption disclosure, carousel progression, nested zoom, strategy navigation and three-column aspect ratio passed. No HVAC files changed. Publish to Sites only.

## Presentation polish
Created three embedded-font vector reel covers using the existing AGRI logo and approved reel names. Removed the grid helper sentence and replaced fixed-design terminology with design terminology. Restored the original pricing-card structure (same financial data, current palette and archive scope), moved monthly planning ahead of pricing and made monthly planning/optional services RTL snap carousels. Next/right buttons, rightward swipes and keyboard ArrowRight advance; the post gallery uses the same direction with a light entry transition. Strategy no longer exposes exhibition selection or pricing links; the site root now redirects to /agri/#home. HVAC files remain byte-unchanged. Checked at 390/768/1440px: root entry, 9 tiles, cover decoding, planning/optional rail controls, post gallery keyboard progression, unchanged prices and strategy links. No actual Safari device was available.


## Client presentation refinement — November 4
Removed the three hero choices. Added an editorial audience/offer introduction and week narratives; retained all nine sample pieces and exact financial quantities. Workflow now uses connected rows. Deliverables and optional services use mouse drag, native touch scrolling and wheel scrolling. Post galleries now use real scroll-snap slides, with visible idea, audience, objective and message plus expandable source copy/captions. Comparison is expandable.
Chromium at 390, 768 and 1440 px: nine posts, no horizontal overflow, wheel advances gallery and service rails, no JS errors. All nine dialogs/captions checked; mouse drag advanced the six-slide carousel and image zoom passed. Actual iOS Safari unavailable. HVAC and Vercel untouched. Publication does not constitute client approval of content.
