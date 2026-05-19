# copstopready-site

Static public website for CopStopReady.

Hosted on GitHub Pages. Custom domain: [copstopready.com](https://copstopready.com)

## Pages

- `/` — Landing page (coming soon)
- `/privacy/` — Privacy Policy (required for Google Play Store submission)

## Editing

This site is intentionally simple: hand-authored HTML + inline CSS, no build step, no framework, no JavaScript. Edit the `.html` files directly. Changes pushed to `main` deploy automatically via GitHub Pages.

## Privacy Policy source of truth

The user-facing app contains the same Privacy Policy text in `src/rooms/settings/ui/LegalContent.ts` (PRIVACY constant) in the [copstopready-app](https://github.com/copstopready/copstopready-app) repo. When the in-app policy changes, the matching HTML version here must be updated.

## License

(c) 2026 CopStopReady. All rights reserved.