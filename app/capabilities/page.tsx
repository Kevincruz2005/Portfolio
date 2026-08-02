import type { Metadata } from "next";
import { Skills } from "@/components/skills";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Kevin Cruz T — technical skills in programming, backend, frontend, databases, cloud, automation and development tools.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return <Skills />;
}
