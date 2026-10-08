# Kevin Cruz Portfolio — Master Design System

## Direction

A calm environmental engineering portfolio. The visual language combines warm illustrated landscape tones with deep teal product surfaces, concise recruiter-readable copy, and an editorial project archive. The result should feel crafted and memorable without obscuring project evidence or navigation.

The homepage begins with a sticky landscape stage and continues into recruiter evidence: a quick-view summary, three featured résumé projects, capabilities, and contact paths. The project route is a scroll-driven stack of paper-like cards with a static reduced-motion fallback. Supporting pages remain quieter and use the same palette, pill navigation, typography, and action geometry.

## Foundations

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--dark-teal` | `#075458` | Primary page and landscape foreground |
| `--deep-teal` | `#06494D` | Deep surfaces and card ink |
| `--cream` | `#F6F1DD` | Primary text and warm project paper |
| `--green` | `#76CF6A` | Landscape life, rules, and small signals |
| `--signal-bright` | `#C7E99D` | Pale-green icon wells and emphasis |
| `--coral` | `#FF907D` | Primary actions and progress indicators |
| `--border` | `rgba(246,241,221,.16)` | Quiet component edges |
| `--surface` | `rgba(6,73,77,.88)` | Shared route cards and forms |

Cream and pale-green text meet AA contrast on teal. Small card metadata uses solid deep teal rather than reduced opacity so it remains readable on every paper colour.

### Typography

- Family: DM Sans, 400–700, self-hosted through `next/font`.
- Headlines: 600–700 with tight tracking and compact line-height.
- Body: 400–500 with 1.6–1.75 line-height.
- Interface labels: 600–700, uppercase only for short metadata.
- Text remains ordinary semantic HTML; decorative archive typography is hidden from assistive technology.

### Spacing and geometry

- Base rhythm: 4/8px.
- Content width: 1200px maximum with responsive gutters.
- Navigation and actions: full pills with a 44px minimum target.
- Supporting route surfaces: 16–28px corners.
- Project cards: intentionally square, sharp paper sheets with no border.
- Shadows remain diffuse and low saturation.

## Information hierarchy

1. Fixed capsule navigation and résumé access.
2. Landscape, role, value proposition, and primary actions.
3. Three featured projects and a capability summary on the homepage.
4. Projects as a scroll-driven archive with one clearly labelled GitHub profile action.
5. About, capabilities, and direct email contact on separate endpoints.

## Signature components

### Landscape stage

- The stage sticks for the first desktop scroll chapter while the parent section provides the scroll distance.
- The source landscape begins below the navigation so its figure is never covered.
- CSS hills, mist, leaves, birds, and pointer depth extend the artwork.
- Scroll progress moves layers at different rates and gently reduces foreground-copy prominence.
- Mobile uses an extended natural-flow composition to protect content and footer spacing.

### Project archive

- Six semantic `article` elements represent the projects in the current résumé.
- A sticky viewport stage moves through the cards with scroll-linked translation, rotation, scale, and opacity.
- Reduced-motion users receive a two-column static grid that becomes one column on mobile.
- Each card contains its title, description, technologies, and a large index.
- The archive header links to the GitHub profile once; cards do not imply unverified repository-level URLs.
- Oversized background type gives the route an editorial signature without affecting reading order.

### Buttons and navigation

- Minimum interactive target: 44×44px.
- Primary actions use coral with dark-teal ink.
- Secondary actions use transparent teal with a cream border.
- Hover behavior is a short lift or surface inversion, with no exaggerated glow.
- Focus uses a visible coral outline and offset.

### Contact

- Visible labels and native form semantics.
- Inline errors identify the affected field and are programmatically associated with it.
- The email check validates syntax and unlocks the message field without making a deliverability claim.
- A copy-email action complements mail, phone, GitHub, and LinkedIn fallbacks.
- SMTP credentials stay server-only; the endpoint validates, escapes, rate-limits, caps payload size, and includes a honeypot.

## Responsive behavior

- Validated at widths of 375, 430, 768, 1024, 1440, and 1920px.
- No horizontal scroll.
- Animated project cards remain viewport-constrained; the reduced-motion grid uses two desktop columns and one mobile column.
- Home actions stack on mobile; the landscape remains above the copy and the footer remains below it.
- Supporting route grids reduce to one column without changing component language.

## Motion and accessibility

- Landscape and project motion use lightweight interpolation and stop requesting frames once settled.
- `prefers-reduced-motion` removes complex landscape effects and converts the project archive to a static grid.
- Semantic landmarks, sequential headings, skip link, visible focus, descriptive external-link labels, and decorative `aria-hidden` layers are required.
- WCAG 2.2 AA is the target; automated serious and critical Axe findings block completion.

## Boundaries

- No fake metrics, employment, clients, awards, proficiency percentages, or deliverability claims.
- No project diagrams, live-demo buttons, or hidden proof panels.
- No copyrighted franchise assets or branding.
- No WebGL, particle engine, autoplay media, or scroll hijacking.
- The background image is the owner-supplied landscape recorded in `SOURCES.md`.
