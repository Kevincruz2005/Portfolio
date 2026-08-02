import type { Metadata } from "next";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kevin Cruz T by email, phone, LinkedIn, GitHub or the portfolio message form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
