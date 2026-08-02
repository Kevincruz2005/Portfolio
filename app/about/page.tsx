import type { Metadata } from "next";
import { About } from "@/components/about";

export const metadata: Metadata = {
  title: "About",
  description: "About Kevin Cruz, his engineering direction and education.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About />;
}
