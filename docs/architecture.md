# Storybook Mockups Architecture

## Overview

The `mockups` workspace is the TimeEcho design system: a self-contained Storybook catalog alongside `time-echo-web` and `time_echo`. It carries its own copy of the web app's UI/UX (components, features, design tokens, fonts, i18n and public assets), so it builds without `../time-echo-web`.

## Key Architecture Decisions

### 1. Isolated Folder (`mockups/`)
- Resides on branch `feat/storybook-mockups` in its own git repository.
- `src/` mirrors `time-echo-web/src` (`app`, `components`, `features`, `lib`, `types`, `i18n`; API routes and `proxy.ts` omitted) and `public/` holds the same icons and images. `@/*` resolves to `./src/*` via `tsconfig.json` and Vite's `resolve.alias`; Storybook serves `public/` as static assets.
- Design tokens (colors) live in `src/app/globals.css`; fonts (Fraunces, Courier Prime, IBM Plex Sans) in `src/lib/fonts.ts`. Keep both identical to `time-echo-web` when the web UI changes.

### 2. Framework & Tooling
- `@storybook/nextjs-vite` (Storybook 10) for React 19 and Next.js 16 support.
- Tailwind CSS v4 loaded through PostCSS with `@tailwindcss/postcss`.
- Addons: `@storybook/addon-a11y` and `@storybook/addon-docs`.

### 3. Mock Store Provider (`MockCapsuleRepository`)
- Decorator in `.storybook/preview.tsx` wraps all stories in `TimeEchoProvider`.
- Backed by `MockCapsuleRepository`, which wraps `mockApiStore` and initial archival seeds.
- Guarantees `useTimeEcho()`, `createCapsule()`, `updateReality()`, and `t()` function without network requests or running the backend API.

### 4. Global Toolbars
- **Theme**: Light and dark toggling. Sets `.dark` on the container and `document.documentElement`, activating Tailwind v4 CSS color tokens (`--wax`, `--ink`, `--manila`, `--parchment`).
- **Locale**: English (`en`) and Spanish (`es`) switching. Feeds `TimeEchoProvider` and synchronizes storage listeners to update `t()` strings dynamically.
