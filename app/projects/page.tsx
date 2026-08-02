import type { Metadata } from "next";
import { Projects } from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Kevin Cruz T — six software projects from the current résumé.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
