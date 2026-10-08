import {
  Blocks,
  Bot,
  Braces,
  CloudCog,
  CodeXml,
  Database,
  Microchip,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { capabilities } from "@/lib/data";

const icons = [Braces, Microchip, Database, CloudCog, Bot, Blocks, CodeXml];

export function Skills() {
  return (
    <section
      id="capabilities"
      className="section capabilities-section"
      aria-labelledby="capabilities-heading"
    >
      <div className="capabilities-atmosphere" aria-hidden="true">
        <span>BUILD</span>
        <span>SYSTEMS</span>
        <i />
      </div>

      <div className="page-shell">
        <SectionHeading
          as="h1"
          id="capabilities-heading"
          index="03"
          eyebrow="Capabilities"
          title="Technical skills."
          description="Programming languages, frameworks, databases, cloud tools and development workflow."
        />

        <div className="capability-grid">
          {capabilities.map((capability, index) => {
            const Icon = icons[index];
            return (
              <article
                key={capability.title}
                className="capability-item"
              >
                <div className="capability-index">
                  <span>{capability.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h2>{capability.title}</h2>
                <ul aria-label={`${capability.title} technologies`}>
                  {capability.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
