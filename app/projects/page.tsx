import type { Metadata } from "next";
import { Projects } from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Kevin Cruz T — seven software projects, led by Precedence: 3rd Place at BUIDL CTC 2026 Fall, with a $2,000 prize.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
