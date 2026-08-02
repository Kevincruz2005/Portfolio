"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";

const cardColours = ["#f6f1dd", "#c7e99d", "#ffb3a4", "#d9e8d4"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function Projects() {
  const storyRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const currentRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    const currentLabel = currentRef.current;
    if (!story || !stage || !currentLabel) return;

    const cards = Array.from(
      story.querySelectorAll<HTMLElement>(".project-stack-card"),
    );
    const words = Array.from(
      story.querySelectorAll<HTMLElement>(".project-background-word"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let target = 0;
    let current = 0;
    let frame = 0;
    let displayedIndex = 0;

    const readScroll = () => {
      const rect = story.getBoundingClientRect();
      const distance = story.offsetHeight - window.innerHeight;
      target = distance > 0 ? clamp(-rect.top / distance, 0, 1) : 0;
    };

    const render = () => {
      current += (target - current) * 0.095;
      if (Math.abs(target - current) < 0.0001) current = target;

      const scene = current * (projects.length - 1);
      stage.style.setProperty("--project-progress", current.toFixed(4));

      cards.forEach((card, index) => {
        const delta = index - scene;
        const capped = clamp(delta, -1.45, 1.7);
        const y = capped < 0 ? capped * 158 : capped * 82;
        const rotation = capped < 0 ? capped * 6.5 : capped * 8;
        const scale =
          capped < 0
            ? 1 - Math.min(Math.abs(capped), 1) * 0.08
            : 1 - Math.min(capped, 1) * 0.05;
        const opacity =
          delta < -0.84
            ? clamp((delta + 1.2) / 0.36, 0, 1)
            : delta > 1.28
              ? clamp((1.68 - delta) / 0.4, 0, 1)
              : 1;

        card.style.transform = `translate3d(-50%, calc(-50% + ${y}%), 0) rotate(${rotation}deg) scale(${scale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = String(100 - Math.round(Math.abs(delta) * 12) + index);
      });

      words.forEach((word, index) => {
        const direction = index === 1 ? 1 : -1;
        const x = scene * (3.5 + index * 1.25) * direction;
        const y = -scene * (4 + index * 1.8);
        word.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      const nextIndex = Math.round(scene);
      if (nextIndex !== displayedIndex) {
        displayedIndex = nextIndex;
        currentLabel.textContent = String(nextIndex + 1).padStart(2, "0");
      }

      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      readScroll();
      if (!reducedMotion.matches) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    reducedMotion.addEventListener("change", start);
    start();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  const storyHeight = `${Math.max(430, 125 + (projects.length - 1) * 68)}svh`;

  return (
    <section
      ref={storyRef}
      className="project-scroll-story"
      style={{ "--project-story-height": storyHeight } as CSSProperties}
      aria-labelledby="projects-heading"
    >
      <div ref={stageRef} className="project-scroll-stage">
        <div className="project-story-intro">
          <p>Résumé project archive</p>
          <h1 id="projects-heading">Projects.</h1>
          <span>Scroll to move through the stack</span>
        </div>

        <div className="project-background-type" aria-hidden="true">
          <span className="project-background-word project-background-word-one">
            PROJECT
          </span>
          <span className="project-background-word project-background-word-two">
            ARCHIVE
          </span>
          <span className="project-background-word project-background-word-three">
            WORK
          </span>
        </div>

        <div className="project-card-stack">
          {projects.map((project, index) => (
            <article
              className="project-stack-card project-archive-card"
              key={`${project.title}-${index}`}
              style={{ backgroundColor: cardColours[index % cardColours.length] }}
            >
              <header className="project-stack-heading">
                <p>Project / {String(index + 1).padStart(2, "0")}</p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </header>

              <footer className="project-stack-footer">
                <div>
                  <ul aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub profile for ${project.title} — opens in a new tab`}
                  >
                    <Github aria-hidden="true" />
                    GitHub
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className="project-side-mark" aria-hidden="true">
          <strong>KC.</strong>
          <span>GitHub archive</span>
        </div>

        <div className="project-scroll-index" aria-hidden="true">
          <span ref={currentRef}>01</span>
          <i />
          <span>{String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
