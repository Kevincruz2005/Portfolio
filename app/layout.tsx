import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { education, profile } from "@/lib/data";
import "./globals.css";

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const canonicalUrl = "https://kevin-portfolio-taupe.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: {
    default: `${profile.name} — Software Engineer | Full-Stack (Backend-Focused)`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "Java",
    "SQL",
    "PostgreSQL",
    "Docker",
    "React.js",
    "Chennai",
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "profile",
    url: canonicalUrl,
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#075458",
  width: "device-width",
  initialScale: 1,
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: canonicalUrl,
  image: `${canonicalUrl}/opengraph-image`,
  jobTitle: profile.role,
  email: profile.email,
  telephone: profile.phone,
  homeLocation: { "@type": "Place", name: profile.location },
  affiliation: {
    "@type": "EducationalOrganization",
    name: education.institution,
  },
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={body.variable}
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
