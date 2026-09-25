ChaloBuddy V12 — Reference UI Patch

This overlay updates the visual layer to match the supplied TrekBuddy-style travel startup reference while keeping the ChaloBuddy brand and existing backend intact.

Included:
- Cinematic mountain hero with transparent navigation
- Editorial travel-startup typography and hierarchy
- Floating travel search bar
- Whole date field opens the native date picker (not just the calendar icon)
- Destination category tiles
- Featured trip cards
- How-it-works section
- Community stories section
- CTA/footer styling
- Responsive mobile navigation and stacked search

Backend safety:
- Does NOT include prisma/
- Does NOT include lib/
- Does NOT include app/api/
- Does NOT include .env
- Does NOT include package.json

Apply over the current working project. Then run:
  npm run dev

If old CSS remains, stop Next.js, remove .next, and run npm run dev again.
