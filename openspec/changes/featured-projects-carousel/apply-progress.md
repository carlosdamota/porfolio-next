# Apply Progress: Featured Projects Carousel (No-JS)

## Implementation Summary
Implemented a fully responsive, pure CSS carousel for the featured projects page using CSS Scroll Snap, daisyUI v5 carousel utilities, and HTML anchor targets. Hided default browser scrollbars using custom tailwind v4 utility declarations.

## Completed Tasks
- [x] 1.1 Add `.scrollbar-none` utility class in `src/app/globals.css`.
- [x] 1.2 Verify `globals.css` builds without lint errors.
- [x] 2.1 Update `src/components/organisms/Projects.tsx` to wrap projects mapping in a daisyUI `carousel` container.
- [x] 2.2 Assign unique `id={`project-slide-${index}`}` and `carousel-item` class to each project card container.
- [x] 2.3 Set responsive card widths (e.g. `w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] shrink-0 snap-start`).
- [x] 3.1 Overlay prev/next arrows absolute-positioned inside each card targeting relative indices.
- [x] 3.2 Add chevron characters or arrows and format buttons with daisyUI classes (`btn btn-circle btn-sm`).
- [x] 3.3 Set transition and pointer events so arrows are visible and accessible.
- [x] 4.1 Run linter (`pnpm lint`) and type checks (`pnpm tsc`) to ensure no regressions.
- [x] 4.2 Run local Next.js build (`pnpm build`) to verify compile-time safety.
- [x] 4.3 Validate visually in browser that scroll behavior works and no scrollbars are shown.

## Files Changed
- `src/app/globals.css` (Modified) — Added `.scrollbar-none` utility class.
- `src/components/organisms/Projects.tsx` (Modified) — Restructured static grid cards into a responsive daisyUI carousel with absolute positioned next/prev arrow anchor links.

## Deviations from Design
None — implementation matches design.

## Issues Found
None.
