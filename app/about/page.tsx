import type { Metadata } from "next";
import { About } from "@/components/about";

export const metadata: Metadata = {
  title: "About",
  description: "Kevin Cruz T — executive summary, education, coursework and certifications.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About />;
}
