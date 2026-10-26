# Storybook Mockups Architecture

## Overview

The `mockups` workspace provides an isolated Storybook catalog alongside `frontend` and `time_echo`. It renders TimeEcho components in isolation without modifying or introducing dependencies into the production frontend.

## Key Architecture Decisions

### 1. Isolated Folder (`mockups/`)
- Resides on branch `feat/storybook-mockups` in its own git repository.
- Consumes components, styling tokens, fonts, and localization from `../frontend` via path aliases configured in `tsconfig.json` and Vite's `resolve.alias`.

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
