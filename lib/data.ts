export type ArchivedProject = {
  title: string;
  description: string;
  tags: string[];
  github: string;
};

export const projects: ArchivedProject[] = [
  {
    title: "LaunchProof",
    description:
      "A bounded MCP rehearsal system for launch-contract checks, x402 test payments and chain-backed service evidence.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Solidity", "MCP", "x402"],
    github: "https://github.com/Kevincruz2005/LaunchProof",
  },
  {
    title: "Wardens Protocol",
    description:
      "A multi-agent testnet protocol exploring paid verification, adversarial challenges and collateral trust state.",
    tags: ["Rust", "Odra", "Casper", "TypeScript", "Bun", "x402"],
    github: "https://github.com/Kevincruz2005/wardens",
  },
  {
    title: "NitroGate — The Netflix of Web3",
    description:
      "An omnichain video-streaming concept with pay-per-second sessions, state channels, cross-chain USDC and ENS creator identity.",
    tags: ["Next.js", "TypeScript", "Yellow Network", "Circle CCTP", "ENS"],
    github: "https://github.com/Kevincruz2005/ETHGlobal-HackMoney2026",
  },
  {
    title: "DBANK — Decentralized Bank",
    description:
      "A decentralized banking application exploring deposits, compound-interest behavior and an Internet Computer backend.",
    tags: ["Motoko", "ICP", "DFX", "JavaScript", "Blockchain"],
    github: "https://github.com/Kevincruz2005",
  },
  {
    title: "Movie Rental System",
    description:
      "A rental-management application with a relational schema, Java/JDBC data access and PostgreSQL workflows.",
    tags: ["Java", "JDBC", "PostgreSQL", "Desktop"],
    github: "https://github.com/Kevincruz2005/Movie-Rental-System",
  },
  {
    title: "Secure RESTful Backend",
    description:
      "A backend study centered on REST endpoints, JWT authentication and clean service boundaries.",
    tags: ["Go", "REST API", "JWT", "Security"],
    github: "https://github.com/Kevincruz2005",
  },
  {
    title: "Heap Memory Allocator",
    description:
      "Low-level allocation work inside a small 32-bit operating-system study, including aligned block-table heap management.",
    tags: ["C", "x86 Assembly", "Memory", "QEMU"],
    github: "https://github.com/Kevincruz2005/Simple-Operating-System",
  },
  {
    title: "Electronics Rental System",
    description:
      "A rental-platform interface with authentication, database integration and REST-style data management.",
    tags: ["React", "Next.js", "Supabase"],
    github: "https://github.com/Kevincruz2005/Hobbyist",
  },
  {
    title: "Simple Graphics Renderer",
    description:
      "A lightweight C and SDL image-rendering experiment focused on parsing pixel data and presenting a native surface.",
    tags: ["C", "SDL", "Graphics", "Binary Parsing"],
    github: "https://github.com/Kevincruz2005/Image_Rendering",
  },
  {
    title: "Fake News Detector",
    description:
      "A browser-extension experiment for content analysis and OCR-assisted text inspection.",
    tags: ["JavaScript", "Gemini API", "OCR", "Browser Extension"],
    github: "https://github.com/Kevincruz2005/AI_news-verify",
  },
  {
    title: "Typing Speed Test",
    description:
      "A Java desktop application for measuring typing speed and accuracy across practice sessions.",
    tags: ["Java", "Swing", "Desktop"],
    github: "https://github.com/Kevincruz2005/Typing_Speed_Tester",
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Backend & APIs",
    description: "Typed service boundaries, validation, authentication, payment flows and fail-closed decision logic.",
    items: ["TypeScript", "Node.js", "Express", "Java", "Go", "REST", "MCP"],
  },
  {
    number: "02",
    title: "Systems programming",
    description: "Memory, paging, interrupts, disk access and byte-level rendering beneath application frameworks.",
    items: ["C", "x86 Assembly", "Heap allocation", "Paging", "SDL2", "QEMU"],
  },
  {
    number: "03",
    title: "Data & persistence",
    description: "Relational models, migrations, canonical evidence and explicit database-versus-proof boundaries.",
    items: ["PostgreSQL", "Prisma", "JDBC", "SQL", "Supabase"],
  },
  {
    number: "04",
    title: "Cloud & delivery",
    description: "Reproducible builds, containerized services, CI checks and observable deployment workflows.",
    items: ["Docker", "Azure Container Apps", "Vercel", "GitHub Actions", "Linux", "Jenkins"],
  },
  {
    number: "05",
    title: "Agentic & AI systems",
    description: "Service discovery, agent orchestration, bounded tool execution and verifiable service evidence.",
    items: ["MCP", "Agent orchestration", "Structured evidence", "Challenge flows", "LLM integration"],
  },
  {
    number: "06",
    title: "Blockchain infrastructure",
    description: "Testnet smart contracts, payment handshakes, cross-chain liquidity and on-chain trust state.",
    items: ["Solidity", "Rust / Odra", "X Layer", "Casper", "x402", "Yellow", "Circle CCTP", "ENS"],
  },
  {
    number: "07",
    title: "Frontend engineering",
    description: "Accessible interfaces that expose complex system state without obscuring the underlying evidence.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Accessibility", "Responsive UI"],
  },
];

export const milestones = [
  {
    label: "Foundation",
    title: "Relational and application systems",
    copy: "Built Java/JDBC and full-stack applications to understand data flow, state and authentication from interface to database.",
  },
  {
    label: "Below the interface",
    title: "Operating-system and renderer exploration",
    copy: "Moved into C, assembly, allocation, paging, interrupts and SDL to understand what higher-level runtimes normally hide.",
  },
  {
    label: "Distributed trust",
    title: "Payment and blockchain protocols",
    copy: "Explored state channels, cross-chain liquidity, testnet smart contracts, agent payments and adversarial verification.",
  },
  {
    label: "Current focus",
    title: "Reliable backend and agent infrastructure",
    copy: "Now concentrating on systems that make failure explicit: bounded execution, observable deployments and independently checkable evidence.",
  },
];
