# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, OpenCode, etc.) when working with code in this repository. `CLAUDE.md` is a symlink to it.

## What this is

TimeEcho's design system: a Storybook catalog (not a runnable app) of components, features and page mockups. `src/` is a copy of `time-echo-web/src` (components, features, lib, types, i18n; API routes and `proxy.ts` omitted) with no runtime dependency on that repo. Keep design tokens (`src/app/globals.css`), fonts (`src/lib/fonts.ts`), i18n dictionaries and `public/` identical to `time-echo-web` when they change. Product/brand context is in `PRODUCT.md`; deeper architecture and design specs are in `docs/architecture.md` and `docs/design.md`.

## Commands

Package manager is pnpm.

- `pnpm storybook` — dev server on port 6006
- `pnpm build-storybook` — static build to `storybook-static/`
- `pnpm typecheck` (`tsc --noEmit`) — the only static check; there is no linter
- Tests are Storybook stories run through Vitest + Playwright (Chromium, headless), configured in `vitest.config.ts`. Run `pnpm exec vitest run --project storybook`; add `-t "<story name>"` or a story file path to narrow it. No `test` script is defined in `package.json`.

## Git hooks and commits

Husky runs `tsc --noEmit` on pre-commit and commitlint (`@commitlint/config-conventional`) on commit-msg, so commit messages must follow Conventional Commits. PRs use `.github/pull_request_template.md`.

## Architecture

- **Stories** live in `src/stories/Tier{1..5}-*.stories.tsx`, ordered by composition level: primitives → stamps → layout → capsules → pages (Figma frames). New stories follow the `Tier N - Group/Name` title convention.
- **Global decorator** (`.storybook/preview.tsx`) wraps every story in `TimeEchoProvider` + `FlashProvider`, with toolbar globals for theme (toggles `.dark` on the container and `<html>`) and locale (`en`/`es`, written to localStorage and the `timeecho_locale`/`NEXT_LOCALE` cookies). Components rely on `useTimeEcho()` and `t()` working without any backend.
- **Data layer**: `TimeEchoContext` takes an `ICapsuleRepository` (`src/lib/repositories`). Production uses `HttpApiRepository`; Storybook injects `src/support/mockCapsuleRepository.ts`, which wraps `src/lib/mockApiStore.ts` and `initialSeeds.ts`. Mockup data changes go there, not into stories.
- **Code organization**: shared UI in `src/components/{ui,stamps,layout}`; domain code in `src/features/{capsules,reality-ledger,analytics}` (each with `components/`, `hooks/`, `index.ts`); `src/app/` holds Next.js App Router pages that the Tier 5 stories render. Domain types are in `src/types/timeecho.ts`.
- **Aliases**: `@/*` → `src/*`, defined in both `tsconfig.json` and the Vite alias in `.storybook/main.ts`; keep them in sync.
- **Styling**: Tailwind v4 via `@tailwindcss/postcss`, with color tokens (`--wax`, `--ink`, `--manila`, `--parchment`) in `globals.css`. Respect the epistolary/postal aesthetic and WCAG AA in both themes.
- **i18n**: UI strings come from `src/lib/i18n/{en,es}.json`; add keys to both languages (Spanish runs ~15–20% longer, so check layouts).

## Rules

Modular rules live in `.agents/rules/`; read the relevant ones before changing that area:

- `stories.md` — story and mock-data conventions
- `design-system-sync.md` — keeping tokens, fonts, i18n and assets identical to `time-echo-web`
- `version-control.md` — commits and PRs
