# Design System Sync

`src/` mirrors `time-echo-web/src`. There is no runtime dependency on that repo, so drift is only caught by review.

- Keep `src/app/globals.css` (tokens), `src/lib/fonts.ts`, `src/lib/i18n/{en,es}.json` and `public/` identical to `time-echo-web`.
- Add every i18n key to both `en.json` and `es.json`; Spanish text runs ~15–20% longer, so check for clipping.
- Keep the `@` alias in sync between `tsconfig.json` and `.storybook/main.ts`.
- Preserve the epistolary aesthetic (see `PRODUCT.md`) and WCAG AA contrast in light and dark themes, with 44×44px minimum tap targets and `prefers-reduced-motion` support.
