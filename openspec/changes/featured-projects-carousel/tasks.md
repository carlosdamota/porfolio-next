# Tasks: Featured Projects Carousel (Refined)

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 40-60 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: CSS Foundations
- [x] 1.1 Add `.scrollbar-none` utility class in `src/app/globals.css`.
- [x] 1.2 Verify `globals.css` builds without lint errors.

## Phase 2: Carousel Scroll Controller & Viewport
- [ ] 2.1 Add React `useRef` to target the carousel viewport in `src/components/organisms/Projects.tsx`.
- [ ] 2.2 Implement a scroll helper `scroll(direction: 'left' | 'right')` that calculates card width + gap and triggers `scrollBy`.
- [ ] 2.3 Structure projects map under a relative container with carousel-item cards styled with `.snap-start`.

## Phase 3: External Navigation Controls
- [ ] 3.1 Place next/prev arrow buttons outside the carousel container at the parent wrapper level.
- [ ] 3.2 Add click event listeners calling the scroll helper.
- [ ] 3.3 Hide buttons on mobile/tablet viewports (`hidden md:flex`) and show them on desktop hover.

## Phase 4: Verification
- [ ] 4.1 Run linter (`pnpm lint`) and type checks (`pnpm tsc`) to ensure no regressions.
- [ ] 4.2 Run local Next.js build (`pnpm build`) to verify compile-time safety.
- [ ] 4.3 Validate visually in browser that scroll behavior works and no scrollbars are shown.
