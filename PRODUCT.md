# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are individuals engaging in intentional, private personal reflection, annual reviews, and life milestone tracking (e.g. birthdays, New Year resolutions, major life or career transitions). They want to capture their present mental state and forecast milestones, then revisit their past self with tangible evidence of growth.

## Product Purpose

TimeEcho is an epistolary digital time-capsule application for writing encrypted, scheduled letters to one's future self. It turns personal reflection into an empirical, retrospective growth loop by combining letter writing with calibrated emotional baseline tracking and structured milestone forecasts evaluated upon delivery. Success means users experience an intimate, tangible reckoning with their past self, discovering how their emotions, goals, and realities have evolved over time.

## Positioning

Unlike generic journaling tools or simple delayed-email delivery services, TimeEcho treats reflection as an empirical feedback loop: pairing deeply personal letters with quantitative emotional baselines (happiness, anxiety, motivation) and structured milestone predictions that are systematically evaluated upon delivery via the Reality Ledger.

## Operating Context

Private personal vault and reflective ritual. Users write letters during moments of quiet contemplation, milestone transitions, or annual horizons (6 months, 1 year, 3 years, 5 years, or custom dates). The interface reinforces physical postal materiality (docket folios, parchment paper sheets, ruled canvases, wax seals, postmark stamps, and manila folders). When letters unlock, users undergo an unsealing ceremony, re-evaluating their emotional state and scoring their predictions.

## Capabilities and Constraints

- **Time-Capsule Composition**: Rich composition with ruled paper canvas, custom horizon delivery scheduling (6m, 1y, 3y, 5y, custom date), and simulated wax sealing.
- **Emotional Snapshot Calibration**: 1–10 baseline ratings for happiness, anxiety, and motivation recorded at composition and re-rated upon delivery to compute emotional deltas.
- **Milestone Predictions**: Up to 5 structured predictions across life categories (city, career, salary, relationship, achievement) with post-opening outcome scoring (fulfilled, unfulfilled, diverged, pending).
- **Reality Ledger & Retrospective Analytics**: Comparison interface to grade predictions against reality, tracking accuracy percentages, emotional shift gauges, and growth trends across capsules.
- **Bilingual Support**: Native English and Spanish UI, microcopy, and locale-aware date formatting.
- **Strict Privacy & Anti-Social Design**: Private vault with no social feeds, public counters, likes, or sharing mechanics.
- **Technical Stack**: Next.js 15 (App Router), React 19, TypeScript strict mode, Tailwind CSS v4 (@theme inline), React Context state layer with repository pattern (HttpApiRepository + MockApiStore fallback).

## Brand Commitments

- **Name**: TimeEcho ("Write today. Discover tomorrow." / "Escribe hoy a la persona en la que te convertirás.").
- **Aesthetic Identity**: Epistolary archival aesthetic rooted in physical postal materiality (carmine wax seals, indigo ink, manila dossiers, parchment paper, typewriter text).
- **Typography Tokens**: Fraunces (editorial serif display), Courier Prime (letter body & monospace), IBM Plex Sans (system/UI).
- **Tone & Voice**: Intimate, reflective, dignified, second-person ("Your letter", "You predicted"), present tense for actions ("Seal & Send"). Free from generic SaaS marketing tropes.

## Evidence on Hand

- Complete Next.js App Router codebase with functional routes (`/`, `/dashboard`, `/letters/new`, `/letters/[id]`, `/letters/[id]/reality`, `/analytics`, `/settings`, `/login`, `/about`, `/terms`, `/privacy`).
- Architectural specification in `docs/architecture.md` and Design System specification in `docs/design.md`.
- Domain models and types defined in `src/types/timeecho.ts`.
- Dual-language localization dictionaries in `src/lib/i18n/en.json` and `src/lib/i18n/es.json`.
- Mock API store with sample seed data for letters and predictions in `src/lib/mockApiStore.ts`.

## Product Principles

1. **Tangibility over Abstraction**: Digital interactions mirror physical postal materiality—cracking wax seals, unfolding parchment, stamping dockets, and leafing through manila folders.
2. **Empirical Reflection**: Every time-capsule pairs prose with structured baselines and predictions, transforming nostalgia into measurable personal growth.
3. **Intimacy and Sanctity**: The platform is an uncompromised private sanctuary for self-communion, devoid of social vanity, gamification, or algorithmic feeds.
4. **Restraint and Dignity**: Visuals and copy favor calm editorial whitespace, deliberate typography, and measured tone over hyperactive SaaS patterns.

## Accessibility & Inclusion

- Semantic HTML structures across all forms and archival components.
- Strict WCAG AA contrast compliance across both light (parchment/manila) and dark themes.
- Global support for `prefers-reduced-motion` across seal animations and transitions.
- Minimum 44×44px interactive tap targets.
- Resilient bilingual layout handling text expansion (Spanish ~15–20% expansion over English) without container clipping.
