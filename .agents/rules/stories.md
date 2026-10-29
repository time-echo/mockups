# Story Conventions

- Stories live in `src/stories/Tier{N}-*.stories.tsx`; titles follow `Tier N - Group/Name`. Put a new story in the tier matching its composition level (primitives → stamps → layout → capsules → pages).
- Never fetch from the network. Data comes from `MockCapsuleRepository` (`src/support/`), `mockApiStore.ts` and `initialSeeds.ts`; change mock data there, not inline in stories.
- Stories must render under the global decorator (`.storybook/preview.tsx`) in both themes (light/dark) and both locales (`en`/`es`).
- Verify with `pnpm exec tsc --noEmit` and `pnpm build-storybook` before finishing.
