import type { Metadata } from "next";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Kevin Cruz a direct email message from his portfolio.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
