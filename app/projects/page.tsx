import type { Metadata } from "next";
import { Projects } from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Kevin Cruz's compact GitHub project archive.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
