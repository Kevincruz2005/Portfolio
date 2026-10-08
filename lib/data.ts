export type ArchivedProject = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  recognition?: {
    placement: string;
    event: string;
    prize: string;
  };
};

export const profile = {
  name: "Kevin Cruz T",
  role: "Software Engineer | Full-Stack (Backend-Focused)",
  location: "Chennai, Tamil Nadu",
  phone: "8072716200",
  email: "kevintom2024@gmail.com",
  portfolio: "https://kevin-portfolio-taupe.vercel.app",
  linkedin: "https://www.linkedin.com/in/kevin-cruz-32a8642ba",
  github: "https://github.com/Kevincruz2005",
  summary:
    "Full-Stack Developer with a strong backend focus, hands-on experience in database-driven application. Proficient in Java, SQL, and modern web technologies with hands-on experience using PostgreSQL, Docker, and clean software design principles. Seeking Software Engineer or Full-Stack Internship opportunities.",
} as const;

export const summaryParagraphs = [
  "Full-Stack Developer with a strong backend focus, hands-on experience in database-driven application.",
  "Proficient in Java, SQL, and modern web technologies with hands-on experience using PostgreSQL, Docker, and clean software design principles.",
  "Seeking Software Engineer or Full-Stack Internship opportunities.",
] as const;

export const projects: ArchivedProject[] = [
  {
    title: "Precedence",
    description:
      "Cross-chain lending protocol that verifies transaction order on Ethereum Sepolia and Creditcoin to establish lender priority over shared collateral.",
    tags: ["Solidity", "TypeScript", "Next.js", "Attestcoin", "Foundry"],
    github: "https://github.com/ChaseBP/precedence",
    recognition: {
      placement: "3rd Place",
      event: "BUIDL CTC 2026 Fall",
      prize: "$2,000",
    },
  },
  {
    title: "Automated Video Rendering Pipeline",
    description:
      "Built a self-hosted automated video rendering pipeline using n8n workflows and FFmpeg for media processing, video merging, audio integration, and automated export generation.",
    tags: ["n8n", "FFmpeg", "Docker"],
    github: profile.github,
  },
  {
    title: "NitroGate",
    description:
      "Built a pay-per-second Web3 video streaming platform with real-time USDC micropayments via state channels and cross-chain bridging. Won $25 hackathon prize.",
    tags: ["Next.js", "Circle CCTP", "Yellow Network", "Wagmi"],
    github: profile.github,
  },
  {
    title: "Custom Heap Memory Allocator in C",
    description:
      "Implemented a dynamic heap memory allocator with block splitting and fragmentation handling.",
    tags: ["C"],
    github: profile.github,
  },
  {
    title: "Electronics Rental System",
    description:
      "Developed a rental platform with authentication, database integration, and REST-style data management.",
    tags: ["React", "Supabase"],
    github: profile.github,
  },
  {
    title: "Fake News Detector Browser Extension",
    description:
      "Built a browser extension to detect fake news using content analysis and OCR-based text extraction.",
    tags: ["JavaScript", "Gemini API", "OCR Reader"],
    github: profile.github,
  },
  {
    title: "Movie Rental System",
    description:
      "Built a rental management system with relational database schema, CRUD operations, and transaction handling.",
    tags: ["Java Swing", "JDBC", "PostgreSQL", "NeonDB"],
    github: profile.github,
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Programming Languages",
    items: ["Java", "C", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    number: "02",
    title: "Backend Frameworks & Libraries",
    items: ["Node.js", "Express", "Spring Boot", "REST APIs"],
  },
  {
    number: "03",
    title: "Frontend",
    items: ["React.js"],
  },
  {
    number: "04",
    title: "Databases",
    items: ["PostgreSQL", "MySQL"],
  },
  {
    number: "05",
    title: "Cloud & DevOps",
    items: ["Linux", "AWS", "Docker"],
  },
  {
    number: "06",
    title: "Automation & Workflow",
    items: ["n8n"],
  },
  {
    number: "07",
    title: "Tools & Other",
    items: ["Git", "GitHub", "Supabase", "Maven", "NeonDB"],
  },
];

export const certifications = [
  "Complete Full-Stack Web Development Bootcamp by Dr. Angela Yu from Udemy",
  "Database Programming with SQL from Oracle Academy",
  "Programming with PL/SQL from Oracle Academy",
] as const;

export const education = {
  degree: "Bachelor in Computer Science and Engineering",
  institution: "Loyola ICAM College of Engineering and Technology",
  period: "2023–2027",
  cgpa: "7.68",
  status: "Currently Pursuing 6th Semester",
  coursework: [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Database Management Systems",
    "Machine Learning",
    "Object Oriented Software Engineering",
    "Web Technologies",
  ],
} as const;
