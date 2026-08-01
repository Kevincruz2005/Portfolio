import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const canonicalUrl = "https://kevin-portfolio-taupe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: {
    default: "Kevin Cruz — Backend-Focused Software Engineer",
    template: "%s — Kevin Cruz",
  },
  description:
    "Kevin Cruz builds backend, systems and verifiable digital infrastructure—from operating-system internals to agent payments and chain-backed service evidence.",
  applicationName: "Kevin Cruz Portfolio",
  authors: [{ name: "Kevin Cruz", url: "https://github.com/Kevincruz2005" }],
  creator: "Kevin Cruz",
  keywords: [
    "Kevin Cruz",
    "backend software engineer",
    "systems programming",
    "agent infrastructure",
    "blockchain engineer",
    "Chennai software engineer",
    "Next.js portfolio",
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "profile",
    url: canonicalUrl,
    title: "Kevin Cruz — Systems that hold up under pressure",
    description:
      "Backend architecture, systems programming, automation and verifiable digital infrastructure.",
    siteName: "Kevin Cruz Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kevin Cruz, backend-focused software engineer — systems that hold up under pressure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Cruz — Backend-Focused Software Engineer",
    description: "Systems that hold up under pressure.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kevin Cruz",
  url: canonicalUrl,
  image: `${canonicalUrl}/opengraph-image`,
  jobTitle: "Backend-Focused Software Engineer",
  homeLocation: { "@type": "Place", name: "Chennai, India" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Loyola-ICAM College of Engineering and Technology",
  },
  sameAs: [
    "https://github.com/Kevincruz2005",
    "https://www.linkedin.com/in/kevin-cruz-32a8642ba/",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
