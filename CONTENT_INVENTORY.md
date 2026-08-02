# Portfolio content inventory

Audit date: 2026-08-02. Revised after local review to reflect Kevin's preference for a broad GitHub archive, restored email contact, real multi-page routes, and the calm environmental branch.

| Existing content | Source | Decision | Verification / rewrite status |
| --- | --- | --- | --- |
| Kevin Cruz; backend-focused software engineer | `app/layout.tsx`, supplied brief | Reuse | Presented in a ten-second recruiter scan over the interactive hero |
| Full-stack, systems, AI and blockchain positioning | `lib/data.ts`, repositories, supplied brief | Reuse | Reframe as supporting capabilities, not competing titles |
| Chennai, India | Supplied brief | Reuse | User-provided fact |
| B.E. CSE, Loyola-ICAM College of Engineering and Technology, 2023–2027 | Supplied brief | Reuse | User-provided fact |
| GitHub profile | Existing terminal and supplied brief | Reuse | Verified: `https://github.com/Kevincruz2005` |
| LinkedIn profile | Existing terminal and supplied brief | Reuse | Retain supplied URL |
| Existing portfolio URL | GitHub repository homepage and supplied brief | Reuse | Canonical: `https://kevin-portfolio-taupe.vercel.app` |
| LaunchProof | `Kevincruz2005/LaunchProof` | Restore as compact archive card | GitHub is the only outbound action |
| Wardens Protocol | `Kevincruz2005/wardens` | Restore as compact archive card | GitHub is the only outbound action |
| NitroGate | `Kevincruz2005/ETHGlobal-HackMoney2026` | Restore as compact archive card | GitHub is the only outbound action |
| Simple Operating System / heap allocator | `Kevincruz2005/Simple-Operating-System` | Restore as compact archive card | Presented under Heap Memory Allocator with a GitHub link only |
| Image renderer | `Kevincruz2005/Image_Rendering` | Restore as compact archive card | GitHub is the only outbound action |
| DBank | Original `lib/data.ts` | Restore as archive card | GitHub profile fallback is acceptable per explicit user direction |
| Movie Rental System | `Kevincruz2005/Movie-Rental-System` | Restore as archive card | GitHub is the only outbound action |
| Hobbyist | `Kevincruz2005/Hobbyist` | Restore as archive card | Included as a broad archive entry rather than a verified case study |
| Fake News Detector | `Kevincruz2005/AI_news-verify` | Restore as archive card | Included as a broad archive entry rather than a verified case study |
| Typing Speed Tester | `Kevincruz2005/Typing_Speed_Tester` | Restore as archive card | GitHub is the only outbound action |
| Secure RESTful Backend | Original `lib/data.ts` | Restore as archive card | GitHub profile fallback is acceptable per explicit user direction |
| Automated Video Rendering Pipeline | Supplied brief only | Exclude | No matching public/local repository evidence found |
| Skill percentages | `lib/data.ts` | Exclude | Invented proficiency scores are prohibited |
| Generic terminal hero and command interaction | `components/terminal.tsx` | Exclude | Delays core content and includes unnecessary lead-capture behavior |
| Email contact form | Original `components/contact.tsx`, `/api/contact` | Restore and harden | Preserve check/unlock interaction; remove fake delay, validate/escape on server and use SMTP environment variables |
| GitHub login page | `/login`, `/api/auth` | Exclude | Unlinked from the public portfolio and irrelevant to recruiter goals |
| Résumé file | `public/Kevin_Cruz_Resume.pdf` | Replace | Existing file is 101-byte plain-text placeholder, not a PDF; replace with a verified-content résumé and no invented email |
| Email address | Environment-variable references only | Intentionally omit | No public value is present in repository, GitHub profile, or supplied brief |
| Existing green/blue cyber terminal and robot styling | Prior branches | Replace | Use a calm teal, cream, green, and coral environmental system across every route |
| Supplied environmental landscape | Owner-supplied implementation brief and image URL | Add to homepage | Next Image plus original CSS hills, mist, birds, leaves, pointer depth, scroll movement, and reduced-motion states |
| Supplied stacked editorial cards | Owner-supplied brief and HTML reference | Adapt for projects | Retain all 11 projects and GitHub-only actions inside a scroll-linked full-screen stack |
| Site architecture | Original single page plus user review | Replace | Use `/projects`, `/about`, `/capabilities`, and `/contact` endpoints with a shared shell |
| Existing metadata | `app/layout.tsx` | Replace and expand | Add route canonicals, Open Graph, Twitter, Person JSON-LD, robots, multi-route sitemap and icon |

## Conflicts and boundaries

- Kevin explicitly prefers an inclusive project archive even when a dedicated repository is missing. Those entries use GitHub profile fallbacks and are not framed as verified engineering case studies.
- The contact UI can be previewed without credentials, but delivery requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_EMAIL` in the deployment environment.

- The old portfolio claims database optimisation and distributed-architecture specialisation without supporting project evidence. The redesign uses narrower, evidenced wording.
- Wardens documentation links some proof paths through another repository namespace. The portfolio links Kevin's repository and treats testnet documentation as project evidence without making individual/team ownership claims.
- NitroGate's README contains hackathon-style product claims. The portfolio repeats only architectural facts visible in its source/README and does not claim awards, judging outcomes, users or revenue.
- LaunchProof is explicitly testnet-first and not a certification or decentralized oracle; that boundary remains visible.
- No availability status is claimed because none was explicitly confirmed.
