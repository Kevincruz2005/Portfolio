import {
  Blocks,
  Bot,
  Braces,
  CloudCog,
  CodeXml,
  Database,
  Microchip,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
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
          title="What I use to build."
          description="Languages, infrastructure and tooling grouped by the work they help me deliver."
        />

        <div className="capability-grid">
          {capabilities.map((capability, index) => {
            const Icon = icons[index];
            return (
              <Reveal
                key={capability.title}
                className="capability-item"
                delay={Math.min(index * 0.035, 0.16)}
              >
                <div className="capability-index">
                  <span>{capability.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <ul aria-label={`${capability.title} technologies`}>
                  {capability.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
