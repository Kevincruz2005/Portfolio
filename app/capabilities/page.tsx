import type { Metadata } from "next";
import { Skills } from "@/components/skills";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Kevin Cruz's backend, systems, data, cloud, AI and blockchain capabilities.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return <Skills />;
}
