# Research and source ledger

Current branch review date: 2026-08-02. References informed composition and interaction only; third-party branding, copy, and component source were not copied into the portfolio.

## Owner-supplied visual references

| Reference | Use |
| --- | --- |
| [Stax](https://www.stax.best/) | Pill navigation, restrained action geometry, consistent surfaces, and editorial spacing. |
| Environmental portfolio brief | Defined the calm coral-sky, teal-hill, cream-type direction and responsive motion requirements. Kevin’s own portfolio copy and navigation replace all example content. |
| Scroll-driven stacked-card brief and HTML demo | Defined the sticky stage, direct scroll mapping, card rise/rotate/settle behavior, background typography, progress index, and reduced-motion requirement. The implementation was rewritten as semantic React using Kevin’s projects and palette. |

## Landscape asset

The homepage uses the owner-supplied image URL:

`https://cdn.pixabay.com/photo/2026/04/28/22/56/22-56-09-389_1280.png`

It is loaded through Next Image and extended with original CSS layers. The image is not repackaged or presented as artwork created in this repository.

## Implementation references

| Source | Use |
| --- | --- |
| [Motion for React](https://motion.dev/docs/react) | Shared route reveals, scroll progress, and user reduced-motion policy. |
| [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image) | Responsive landscape delivery and optimization. |
| [Next.js metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) | Metadata, generated social artwork, favicon, robots, and sitemap. |
| [Next.js Font](https://nextjs.org/docs/app/api-reference/components/font) | Self-hosted DM Sans. |
| [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) | Direct, dependency-free interpolation for the project stack and home scroll progress. |

## Accessibility references

| Source | Use |
| --- | --- |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | AA semantics, contrast, focus, motion, and target-size requirements. |
| [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) | Body and small-metadata color decisions. |
| [Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) | Static project-grid and landscape fallbacks for reduced motion. |
| [Disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) | Mobile navigation semantics and Escape behavior. |

## Portfolio evidence sources

- Owner-supplied résumé data — source of truth for the original personal, project, education, certification and skill claims. Precedence's additional sources are recorded below. The ATS-formatted derivative is generated from [`resume/KevinCruz_Resume.html`](resume/KevinCruz_Resume.html).
- [Kevin’s GitHub profile](https://github.com/Kevincruz2005)

## Precedence — added 2026-10-08

Source snapshot: [ChaseBP/precedence at `119c822`](https://github.com/ChaseBP/precedence/tree/119c822a28d5b4a856bac8689d18ba33238dec7e). The repository was inspected locally before adding portfolio content.

| Portfolio claim / finding | Evidence |
| --- | --- |
| Cross-chain lending and lender priority over shared collateral | [Root README, sections 1 and 4](https://github.com/ChaseBP/precedence/blob/119c822a28d5b4a856bac8689d18ba33238dec7e/README.md): source-chain capital locks are ordered by verified `(blockHeight, txIndex)` on Creditcoin. |
| Ethereum Sepolia and Creditcoin | README deployment records and `contracts/deployments/`; these are testnets, not a claim of mainnet operation. |
| Solidity / Foundry | `contracts/foundry.toml`; `contracts/src/sepolia/PriorityVault.sol`; `contracts/src/creditcoin/AttestationGate.sol`. |
| TypeScript / Next.js | `precedence/package.json`, application routes and `precedence/sdk/src/`. |
| Attestcoin proof integration | `worker/src/proof.ts` and `worker/src/settle-race.ts`; `AttestationGate.sol` calls `verifyAndEmit` and derives the source transaction index from the proof. |
| Architecture | Sepolia capital-lock vault → separate TypeScript proof worker → Creditcoin verification and priority contracts. Next.js command centre and TypeScript SDK provide application routes and shared settlement rules. The inspected app configuration proxies API requests from Vercel to a separate backend. |
| Major implemented features | Proof-ordered lender priority, ERC-1155 claim positions, automatic refunds for outpaced bids, seniority-based repayments, and a deterministic default/unwind path. See `ClaimToken.sol`, `PriorityEngine.sol`, `PriorityVault.sol`, SDK domain modules and README. The card uses only a concise description rather than reproducing every feature. |
| Repository URL | `https://github.com/ChaseBP/precedence`, supplied by Kevin and successfully inspected. |
| Published app | `https://precedence-beige.vercel.app`, linked by the root README. Read-only check on 2026-10-08 returned HTTP 200 with the PRECEDENCE page title. Its `/api/config` endpoint returned HTTP 502; link label is “View app”, without a claim that the backend or all interactive flows are currently operational. |
| Recognition | Kevin supplied **3rd Place — BUIDL CTC 2026 Fall** and **$2,000**. These are attributed to the project; no personal share of the prize is claimed. |
| Individual contributions | The inspected 183-commit history credits ChaseBP, and the project README refers to a team without a contribution breakdown. Kevin's association is established by his request; specific individual implementation work and team size are omitted. |

No performance, test-count, production-readiness, mainnet, legal-enforceability, or personal-authorship metrics are added to the portfolio. The existing résumé downloads are unchanged. At Kevin's subsequent request, the GitHub and “View app” buttons were removed from Precedence's card; the URLs above remain research evidence only.
