## Exploration: Featured Projects Carousel (No-JS)

### Current State
Currently, `src/components/organisms/Projects.tsx` fetches projects from Supabase and maps them using `projects.map(...)` into a static wrapping flexbox container (`flex flex-wrap justify-center gap-8`). All projects are displayed simultaneously on the page in a grid/flex layout.

### Affected Areas
- `src/components/organisms/Projects.tsx` — Replace the grid layout with a pure CSS carousel container, navigation buttons (arrows), and sliding viewport.
- `src/app/globals.css` — Add utility styles for the carousel, such as hiding scrollbars (`scrollbar-none`), styling snap alignment, or supporting active slide layout if needed.

### Approaches
1. **Approach 1: CSS Scroll Snap with Anchor Links (Hash Navigation)**
   - Description: The carousel container uses `overflow-x-auto snap-x snap-mandatory scroll-smooth`. Each slide has an `id` (e.g. `slide-N`). Arrow links target `#slide-N-1` and `#slide-N+1`.
   - Pros:
     - Very simple to implement dynamically (works for any number of projects from the DB).
     - Responsive and native feeling on mobile (supports swipe gestures naturally).
     - Smooth animations powered by the browser via `scroll-behavior: smooth`.
   - Cons:
     - Clicking the arrows updates the URL hash (e.g., `/#slide-2`), which might pollute the browser history and can cause the page to scroll vertically if not positioned carefully.
   - Effort: Low

2. **Approach 2: Pure CSS Carousel using Checkbox / Radio Inputs**
   - Description: Uses hidden radio buttons (`<input type="radio">`) corresponding to each slide, and navigation arrows built as labels (`<label for="slide-X">`). CSS rules toggle slide visibility/transform position based on selector state (e.g., `#radio-1:checked ~ .slides-container { transform: translateX(0); }`).
   - Pros:
     - Does not pollute the URL hash.
     - Fully customizable animations and slide positions.
   - Cons:
     - Highly complex to make dynamic because controls (labels) for slide N must dynamically reference the indexes of the previous/next radio button. In pure CSS, sibling selectors require inputs to be siblings or ancestors of the slides, making CSS styling complex and brittle.
     - Doesn't support native touch swipe gestures as cleanly as Scroll Snap.
   - Effort: High

### Recommendation
**Approach 1 (CSS Scroll Snap with Anchor Links)** is recommended. It is highly robust, works natively with dynamic lists fetched from Supabase, supports swipe gestures on mobile out-of-the-box, and uses standard web platform features. We can mitigate URL hash pollution and page jumps by keeping the slides inline and styling the buttons elegantly.

### Risks
- **Page Jump on Hash Navigation**: If the slide elements are not fully aligned with the viewport, clicking `#slide-N` might scroll the entire page. We must ensure the snap targets are sized and aligned correctly.
- **Scrollbar Visibility**: We need custom CSS classes to hide scrollbars on different browsers (Webkit, Firefox, IE) to maintain a premium look.

### Ready for Proposal
Yes — The orchestrator will present these findings and proceed to the Proposal phase.
