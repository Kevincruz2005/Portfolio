import { ArrowUpRight, Folder, Github } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section className="section project-archive-section" aria-labelledby="projects-heading">
      <div className="page-shell">
        <SectionHeading
          as="h1"
          id="projects-heading"
          index="01"
          eyebrow="Projects"
          title="Projects and experiments."
          description="A compact archive of backend systems, low-level work, automation and prototypes. Every entry leads directly to GitHub."
        />

        <div className="project-archive-grid">
          {projects.map((project, index) => (
            <Reveal key={`${project.title}-${index}`} className="project-archive-reveal">
              <article className="project-archive-card">
                <header>
                  <Folder aria-hidden="true" />
                  <span>Project {String(index + 1).padStart(2, "0")}</span>
                </header>

                <div className="project-archive-copy">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <ul aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>

                <footer>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub source for ${project.title} — opens in a new tab`}
                  >
                    <Github aria-hidden="true" />
                    View on GitHub
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
