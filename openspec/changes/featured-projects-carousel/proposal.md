# Proposal: Featured Projects Carousel (No-JS)

## Intent
Introduce a pure CSS/HTML carousel for the "Featured Projects" section in the portfolio. This allows users to browse projects using navigation arrows without relying on JavaScript, improving page load speed, SEO, and ensuring compatibility when JS is disabled.

## Scope

### In Scope
- Modify `Projects.tsx` to wrap projects in a CSS scroll snap container.
- Implement CSS-only navigation arrows (next/previous) using anchor links targeting slide IDs.
- Hide scrollbars using Tailwind v4 utility styles.
- Maintain premium aesthetics (mint green colors, smooth transition animations, responsive cards).

### Out of Scope
- Dynamic infinite looping (not feasible cleanly without JS).
- Automatic slide transition/autoplay.
- Modifying project data structures or fetching logic.

## Capabilities

### New Capabilities
- `featured-projects`: Pure CSS carousel interface for project cards.

### Modified Capabilities
- None

## Approach
Implement CSS Scroll Snap with horizontal overflow (`overflow-x-auto snap-x snap-mandatory`). Assign an `id={`project-${index}`}` to each project slide. Create absolute-positioned navigation arrow links that link to the adjacent slide IDs. Hide scrollbars using modern scrollbar hiding techniques in CSS.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/organisms/Projects.tsx` | Modified | Replace flexwrap grid layout with a scroll snap container and navigation arrows. |
| `src/app/globals.css` | Modified | Add scrollbar-hiding utility and smooth scroll behavior. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Page vertical jump | Low | Sizing scroll containers to 100% viewport width and utilizing standard snap properties. |
| URL hash pollution | Med | Keep slide anchor target inline; accept hash change as standard behavior for no-JS navigation. |

## Rollback Plan
Run `git checkout src/components/organisms/Projects.tsx src/app/globals.css` to revert layout and styles to the original static flex-wrap grid.

## Dependencies
- None.

## Success Criteria
- [ ] Carousel displays projects horizontally on one line.
- [ ] Swiping on mobile or clicking arrows on desktop scrolls to adjacent slides.
- [ ] No JavaScript is executed to control carousel behavior.
- [ ] Scrollbars are invisible across major browsers.
