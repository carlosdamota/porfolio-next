# Archive Report: Featured Projects Carousel

**Change Key**: `featured-projects-carousel`
**Date**: 2026-06-10
**Status**: Completed & Integrated

## Goal
Replace the static grid of featured projects with a horizontal carousel that supports native mobile gestures (touch swipe) and arrow navigation controls, without breaking layout, creating URL jump side-effects, or introducing layout issues.

## Accomplished
- **Client Component Split**: Created a new Client Component `ProjectsCarousel.tsx` to handle browser-only interactions and refs, keeping `Projects.tsx` as a Server Component for clean Supabase query fetching.
- **Scroll Logic**: Built a smooth scroll controller via React `useRef` and `scrollBy` calculation (width + gap) to slide cards gracefully on desktop navigation button click.
- **Outside Arrow Placements**: Positioned navigation chevrons completely outside of card items (`-translate-x-12` and `translate-x-12`), floating cleanly on the left/right margins.
- **Crisp SVG chevrons**: Upgraded arrow symbols to high-fidelity SVG vectors with stroke weight of 2.5.
- **Hover Micro-animations**: Implemented scale (`scale-110`) and horizontal translation slide transitions (`hover:translate-x-14`/`hover:-translate-x-14`), along with pointing arrow icon offsets (`group-hover/btn:translate-x-1.5` / `group-hover/btn:-translate-x-1.5`) when hovered.
- **Mobile Touch Native Compatibility**: Retained native touch swipe behavior and CSS scroll-snap alignments on mobile viewport widths while hiding arrow buttons (`hidden md:flex`).
- **Hidden Scrollbars**: Added `.scrollbar-none` utility class in `globals.css` to keep scrollbars hidden on all browsers.

## Verification Verdict
**PASS**
Typescript compilation compiles and builds cleanly. Manual verification in the browser via Puppeteer/Playwright subagent validates that the carousel scrolls seamlessly and chevrons align and render beautifully.

## Affected Files
- [ProjectsCarousel.tsx](file:///devdata/projects/porfolio-next/src/components/organisms/ProjectsCarousel.tsx) — [NEW] Client component containing the carousel layout, refs, and external arrow buttons.
- [Projects.tsx](file:///devdata/projects/porfolio-next/src/components/organisms/Projects.tsx) — [MODIFY] Server component rendering the container and importing the carousel.
- [globals.css](file:///devdata/projects/porfolio-next/src/app/globals.css) — [MODIFY] Declared `.scrollbar-none` utility class.
