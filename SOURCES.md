# Research and source ledger

Research date: 2026-08-01. Internet material was treated as untrusted reference material. No commands from third-party pages were executed. Kexsio and 21st.dev code was not copied. After local review, the detailed case-file direction was replaced by the owner's preferred compact project archive and multi-page navigation; this ledger retains evaluated references even when the final revision rejected them.

## Product-design reference

| Reference | Evaluation and use |
| --- | --- |
| [Stax](https://www.stax.best/) | Owner-supplied visual reference. Its consistent pill navigation, restrained bordered actions, editorial serif/sans hierarchy, rounded surfaces and generous spacing informed the portfolio-wide component refresh. No Stax branding, imagery, content or source code was copied. |

## 21st.dev shortlist

| Reference | Creator | License | Evaluation and use |
| --- | --- | --- | --- |
| [Bento Grid](https://21st.dev/community/components/aliimam/bento-grid) | Ali Imam | Not clearly stated on component page | Inspiration only. The final revision uses a simpler equal-card archive grid; demo data, images and component code were not used. |
| [Magnetic](https://21st.dev/community/components/motion-primitives/magnetic) | Julien Thibeaut / Motion Primitives | Not clearly stated on component page | Inspiration only. A much smaller pointer-only 1px response is used for primary actions; touch and reduced-motion users receive a static state. No component code copied. |
| [Text Reveal](https://21st.dev/community/components/daiwiikharihar17147/text-reveal) | Dev Projects | Not clearly stated on component page | Inspiration only. Essential text remains immediately available; section entrances use opacity and a short translate rather than per-character choreography. |
| [Feature Spotlight](https://21st.dev/community/components/ravikatiyar/feature-spotlight/default) | Ravi Katiyar | Not clearly stated on component page | Evaluated, then rejected in the final owner-directed revision because project visualizations and detailed case anatomy were removed. |

## Uiverse shortlist

Uiverse states that published UI elements use the MIT License. Every selected detail was rewritten in semantic React/CSS, uses portfolio tokens, works without hover, and has a visible focus state.

| Reference | Creator | License | Evaluation and use |
| --- | --- | --- | --- |
| [Pulse Pill Button](https://uiverse.io/uiverse-astronaut/horrible-bulldog-87) | uiverse-astronaut | MIT | Adapted only as the concept of a contained signal indicator; pill styling and chartreuse palette were not used. |
| [Button](https://uiverse.io/satyamchaudharydev/purple-rat-85) | satyamchaudharydev | MIT | Adapted as a restrained directional CTA micro-interaction. Fixed dimensions, generic colours and hover-only behavior were removed. |
| [Card](https://uiverse.io/alexruix/itchy-mole-56) | Alex Ruiz | MIT | Used as inspiration for revealing a border/action state. All case-study content stays visible without hover and cards use sharp editorial geometry. |
| [Loader](https://uiverse.io/adamgiebl/stale-puma-26) | Adam Giebl / mrhyddenn | MIT | Evaluated, then rejected: the portfolio has no async experience that warrants a loader or loading screen. |

## Kexsio shortlist

The pages do not expose clear per-component licensing or author attribution in the accessible preview. They were used only as visual/composition references; no source or prompt was copied.

| Reference | Creator | License | Evaluation and use |
| --- | --- | --- | --- |
| [Scroll-Driven Stacked Service Cards](https://www.kexsio.com/animations?preview=UhYyehAkgl1SYlM4WIKJ) | Not exposed | Unclear | Evaluated, then rejected. Projects remain an ordinary equal-card grid with normal document flow. |
| [Premium Card Stack & Resizing Mosaic](https://www.kexsio.com/animations?preview=DrJQ3loh7w666b7MP2Ta) | Not exposed | Unclear | Informed the initial direction, then was simplified into a predictable three/two/one-column archive. |
| [Minimal Reflective Nav Bar](https://www.kexsio.com/animations?preview=ZbT6UyjTX9SoTS5bTUs1) | Not exposed | Unclear | Inspired the quiet sticky navigation, now used to move between real page routes; reflective/glass effects were removed. |
| [Cinematic Motion Board](https://www.kexsio.com/animations?preview=OChhuGg7b7HKuxfv5Fc5) | Not exposed | Unclear | Inspired controlled sequencing and filmic framing. Implemented independently with original SVG linework and CSS grain. |

## Animation and framework references

| Source | Creator / license | Technique | Decision |
| --- | --- | --- | --- |
| [Motion for React](https://motion.dev/docs/react) and [MotionConfig](https://www.motion.dev/docs/react-motion-config) | Motion / package license | `motion/react`, scroll progress, SVG paths, reduced-motion policy | Used as the primary animation system. |
| [Motion useReducedMotion](https://motion.dev/docs/react-use-reduced-motion) | Motion / package license | Runtime response to user motion preference | Applied through `MotionConfig`; pointer response additionally checks the same media preference, and CSS makes radar traces static in reduced-motion mode. |
| [Anime.js SVG utilities](https://animejs.com/documentation/svg/), [timeline](https://animejs.com/documentation/timeline/), and [stagger](https://animejs.com/documentation/utilities/stagger/) | Anime.js / MIT | SVG line drawing, sequencing and point staggering | Researched, not installed. Motion and CSS provide the single signature sequence with less runtime. |
| [Next.js metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) | Vercel / documentation | Metadata API, generated OG, favicon, robots and sitemap | Implemented with App Router conventions. |
| [Next.js Font](https://nextjs.org/docs/app/api-reference/components/font) | Vercel / documentation | Self-hosted optimized fonts | Implemented with `next/font`. |
| [Spline React integration](https://github.com/splinetool/react-spline) | Spline / package repository | Official React wrapper and `onLoad` callback | Implemented for the client-loaded homepage scene with `@splinetool/react-spline` and `@splinetool/runtime`. |

## Supplied 3D scene

The homepage uses `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`, supplied explicitly by the portfolio owner in the implementation brief. The scene is embedded as a live Spline runtime asset; it is not copied, repackaged, or presented as an original model created in this repository.

## Accessibility references

| Source | Use |
| --- | --- |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | AA contrast targets and semantic content checks |
| [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | Minimum pointer target and spacing validation |
| [Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Persistent keyboard focus indicators |
| [Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) | Reduced-motion behavior and rejection of parallax |
| [Disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) | Mobile navigation semantics and Escape behavior; implemented with native button/list markup rather than `menu` roles |

## Portfolio evidence sources

- [Kevin's GitHub profile](https://github.com/Kevincruz2005)
- [LaunchProof repository](https://github.com/Kevincruz2005/LaunchProof) and its checked-in architecture documentation
- [Wardens repository](https://github.com/Kevincruz2005/wardens)
- [NitroGate repository](https://github.com/Kevincruz2005/ETHGlobal-HackMoney2026)
- [Simple Operating System repository](https://github.com/Kevincruz2005/Simple-Operating-System)
- [Image Rendering repository](https://github.com/Kevincruz2005/Image_Rendering)
- [Movie Rental System repository](https://github.com/Kevincruz2005/Movie-Rental-System)
