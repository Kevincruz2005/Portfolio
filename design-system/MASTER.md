# Kevin Cruz Portfolio — Master Design System

## Direction

An immersive engineering portfolio: the homepage uses a seamless black, full-viewport 3D environment with high-contrast recruiter copy and a restrained violet interaction signal. Supporting routes use the same dark editorial product language—floating capsule navigation, soft bordered surfaces, serif headings and plain UI copy.

The homepage is intentionally more cinematic than the archive routes, but its primary content remains ordinary semantic HTML above the WebGL layer. Motion is interruptible and reduced-motion users receive static transitions with no cursor light.

## Foundations

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--void` | `#070708` | Page background |
| `--carbon` | `#0D0D10` | Deep surface |
| `--raised` | `#141418` | Elevated surface |
| `--signal` | `#A78BFA` | Primary violet accent |
| `--signal-bright` | `#C4B5FD` | Focus, icons and emphasis |
| `--bone` | `#F6F4F0` | Primary text and light actions |
| `--secondary` | `#AAA9B1` | Secondary text |
| `--quiet` | `#8D8C95` | Tertiary labels |
| `--border` | `rgba(255,255,255,0.09)` | Component edges |
| `--surface` | `rgba(17,17,21,0.92)` | Shared cards and forms |

Violet is used sparingly for focus, icon wells, status dots and selected words. Primary actions use a warm near-white surface with dark text; decorative color never carries meaning alone.

### Typography

- Display: DM Serif Display, 400, large editorial headlines.
- Body/UI: Inter, 400–700, 16px minimum body copy.
- Technical metadata: JetBrains Mono, 400–600, uppercase labels only.
- Immersive homepage: Inter, 400–700, with a two-line `clamp()` headline.
- Desktop text measure: 60–72 characters; mobile: 35–60 characters.
- Heading scale: `clamp()` based, with no clipped words at 200% zoom.

All fonts use `next/font` so they are self-hosted and do not create third-party runtime requests.

### Spacing and geometry

- Base rhythm: 4/8px.
- Content width: 1200px maximum, responsive gutters of 20/32/48px.
- Section rhythm: 80px mobile, 120–144px desktop.
- Corners: full pills for actions and labels; 16–28px for cards, forms and floating navigation.
- Depth: low-contrast borders, dark surfaces and soft shadows; glass effects are limited to navigation and small overlays.
- Z-index scale: 0 / 10 / 20 / 40 / 50.

## Information hierarchy

1. Sticky restrained navigation and résumé access shared across routes.
2. Home: role, value proposition, project action, résumé and interactive 3D environment.
3. Projects: compact archive cards with a single GitHub action.
4. About: engineering direction, education and journey.
5. Capabilities grouped by engineering function; no percentages.
6. Contact: an SMTP-backed email form with visible delivery feedback.

The site uses `/projects`, `/about`, `/capabilities`, and `/contact` as real pages rather than anchor targets on one long document.

## Components

### Buttons and links

- Minimum target: 44×44px, with at least 8px separation.
- Primary: near-white surface with dark text and a fully rounded silhouette.
- Secondary: transparent dark surface with a subtle white border.
- Hover: short lift or a controlled surface inversion; never a large glow.
- Pressed: no layout shift; use opacity/background state.
- Focus: 2px `--signal-bright` outline with 3px offset.

### Navigation

- Floating at the top in one rounded translucent shell.
- Desktop uses visible text links; mobile uses a native button disclosure.
- Mobile button exposes `aria-expanded`, `aria-controls`, and closes on Escape or link selection.
- The current section is indicated by a quiet filled pill and text weight, never colour alone.

### Project archive

- Compact responsive cards echo the older archive styling requested by the portfolio owner.
- Every card contains a title, short description, technology tags and exactly one GitHub link.
- GitHub profile URLs may be used as explicit archive fallbacks when a dedicated project repository is unavailable.
- No project system diagrams, live-demo buttons, proof visualizations or hover-hidden content.

### Email contact

- Name, reply email and message fields use visible labels and native form semantics.
- The check action validates email format and unlocks the message field without claiming inbox ownership or deliverability.
- SMTP credentials remain server-only; the API validates length, escapes HTML and includes a honeypot.
- Disabled, sending, success and error states remain understandable without colour alone.

## Motion

- Primary system: Motion imported from `motion/react`.
- Global policy: `<MotionConfig reducedMotion="user">`.
- Signature sequence: Spline scene reveal, left-copy entrance, quiet live-status float and spring-smoothed cursor light.
- Entrances: opacity + short translate, 240–800ms, once per section.
- Micro-interactions: 150–240ms.
- Scroll progress: transform-only scale.
- No boot sequence, scroll hijacking, autoplay video, bouncing, or paragraph-by-paragraph animation.
- `prefers-reduced-motion` removes entrance transforms, cursor lighting and smooth scrolling while keeping content visible.

Anime.js was evaluated for SVG drawing, timelines, and staggered nodes. It is intentionally not installed because Motion's SVG `pathLength` and CSS keyframes cover the single signature sequence without a second runtime.

## Responsive behavior

- Mobile-first; every route is validated at 360×800, 390×844, 768×1024, 1280×720, and 1440×900.
- No horizontal scroll at 200% zoom.
- Project cards move from three columns to two and then one readable column.
- Desktop keeps the scene across the viewport with its subject biased right; widths at or below 900px place the copy before the scene in normal reading order.
- At 580px and below, actions stack full width and secondary feature metadata is hidden.
- Cursor lighting responds only to mouse input and is disabled for reduced motion.

## Accessibility and performance gates

- WCAG 2.2 AA target.
- Semantic landmarks and sequential heading hierarchy.
- Skip link, visible focus, descriptive external-link labels, and decorative SVGs hidden from assistive technology.
- Contrast: body text ≥4.5:1; non-text/focus boundaries ≥3:1.
- Server Components by default; Client Components only for navigation, reveal/progress, contact behavior and the interactive hero.
- WebGL is confined to the homepage Spline scene and loaded client-side with an explicit loading state. There are no runtime GitHub API calls or particle engines.
- Metadata, canonical URL, JSON-LD, robots, sitemap, favicon, and generated OG artwork are required.

## Anti-patterns

- No copyrighted Marvel/Netflix assets, logos, dialogue, character depictions, or soundtrack.
- No invented metrics, employment, clients, testimonials, awards, or proficiency scores.
- No fake terminal, fake deliverability verification, hidden essential content, emoji icons, or hover-only affordances.
- No gradient panels, oversized empty hero, inconsistent card geometries, or decorative skill-logo cloud. The only gradient is the homepage display-text treatment.
