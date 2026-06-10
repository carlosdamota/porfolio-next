# Design: Featured Projects Carousel (No-JS)

## Technical Approach
We will utilize daisyUI's built-in pure CSS carousel utilities (`carousel`, `carousel-item`) and CSS Scroll Snap to build a fully responsive, JS-free project carousel. The carousel will show 1 card at a time on mobile, 2 cards on tablet, and 3 cards on desktop. Arrows will be rendered inside each slide using absolute positioning, linking to the previous and next slide IDs dynamically.

## Architecture Decisions

### Decision: Carousel Layout Mechanism

| Option | Tradeoff | Decision |
|--------|----------|----------|
| CSS Scroll Snap (daisyUI Carousel) | Easy dynamic mapping, native touch support on mobile, pure CSS. Changing hash changes URL. | **Chosen**: Standard, robust, fits existing styling framework. |
| CSS Input Radio / Checkboxes | No URL hash change. Hard to map dynamically for N projects from DB, complex CSS. | Rejected due to high implementation complexity and lack of touch support. |

### Decision: Hide Scrollbars

| Option | Tradeoff | Decision |
|--------|----------|----------|
| custom CSS class `.scrollbar-none` | Simple utility in CSS using scrollbar-width and vendor prefixes. | **Chosen**: Added as utility in `globals.css` to keep design clean. |

## Data Flow
No changes to data flow. The projects are fetched at request-time in the React Server Component `Projects.tsx` and rendered inline:

```
getProjects() ──→ Map items into daisyUI Carousel ──→ Render HTML/CSS to Client
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/organisms/Projects.tsx` | Modify | Wrap the project cards in a `.carousel` container and add slide IDs and arrow navigation links. |
| `src/app/globals.css` | Modify | Add `.scrollbar-none` helper styles to hide native scrollbars on the carousel. |

## Interfaces / Contracts
No changes to typescript interfaces or data structure models.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | Component display | Verify projects render horizontally on page load. |
| Manual | Carousel navigation | Click prev/next arrows to ensure the scroll position transitions smoothly. |
| Manual | Mobile swiping | Verify that swipe touch gestures move slides and snap cleanly on mobile viewports. |
| Manual | JS-disabled verification | Turn off JS in browser developer tools and verify the carousel remains interactive. |

## Migration / Rollout
No database migration or rollout configurations needed. Pure frontend change.

## Open Questions
None.
