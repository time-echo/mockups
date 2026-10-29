# TimeEcho Storybook Mockup Catalog

Interactive UI component catalog and living mockups for TimeEcho, rendered in isolation with light/dark theme switching, English and Spanish localization, and offline mock state.

## Stack

- **Storybook**: 10.6.3 with `@storybook/nextjs-vite`
- **React**: 19.2.8
- **Next.js**: 16.4.2
- **Tailwind CSS**: v4 via `@tailwindcss/postcss`
- **Package Manager**: pnpm

## Tiers & Stories

| Tier | Group | Stories | Variants / Details |
| ---- | ----- | ------- | ------------------ |
| 1 | UI Primitives | `Tier 1 - Primitives/UI Primitives Gallery` | PaperSheet, ArchivalFolder, PostmarkStamp, WaxSeal, DualEmotionalBar, CountdownBadge, LinedPaperCanvas, RadialProgress |
| 2 | Stamps | `Tier 2 - Stamps/Stamps Catalog` | Stamps across all 4 categories, sizes (`sm`, `md`, `lg`, `xl`), postmark overlays, interactive `StampPickerModal` |
| 3 | Layout | `Tier 3 - Layout/App Shell & Header` | `ArchivalHeader`, `AppShell` (public and internal layouts) |
| 4 | Capsules | `Tier 4 - Capsules/Cards & Composer` | `CapsuleCards` (unlocked, in-transit, archived, opened), `ComposerForm` (full interactive composer) |
| 5 | Pages (Figma Frames) | `Tier 5 - Pages/Figma Frames` | `Landing-V2`, `Composer-Full`, `Letter-Sealed`, `Letter-Opened`, `Vault-Grid`, `Analytics-Summary`, `Settings-Sections` |

## Source of Truth

This repo is TimeEcho's design system. Components, tokens (`src/app/globals.css`), fonts (`src/lib/fonts.ts`), i18n and `public/` assets are copied from `time-echo-web` and kept identical; there is no runtime dependency on that repo.

## Getting Started

### Development Server

Runs Storybook locally on port 6006:

```bash
pnpm storybook
```

### Build Static Catalog

Generates a static build inside `storybook-static/`:

```bash
pnpm build-storybook
```

### Type Checking

```bash
pnpm exec tsc --noEmit
```
