"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { capabilities, education, profile, projects } from "@/lib/data";

const LANDSCAPE_IMAGE =
  "https://cdn.pixabay.com/photo/2026/04/28/22/56/22-56-09-389_1280.png";

const leaves = [
  { left: "24%", top: "43%", size: 30, rotate: 18 },
  { left: "39%", top: "57%", size: 42, rotate: -24 },
  { left: "64%", top: "56%", size: 34, rotate: 25 },
  { left: "85%", top: "60%", size: 27, rotate: 50 },
];

const featuredProjects = projects.slice(0, 3);
const coreSkills = ["Java", "SQL", "PostgreSQL", "Docker", "React.js", "Spring Boot"];

export function CalmLandscapeHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let animationFrame = 0;

    const renderScroll = () => {
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.12;
      if (Math.abs(scrollTarget - scrollCurrent) < 0.0005) scrollCurrent = scrollTarget;
      stage.style.setProperty("--hero-scroll", scrollCurrent.toFixed(4));
      if (scrollCurrent !== scrollTarget) {
        animationFrame = window.requestAnimationFrame(renderScroll);
      } else {
        animationFrame = 0;
      }
    };

    const requestRender = () => {
      if (!animationFrame && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(renderScroll);
      }
    };

    const readScroll = () => {
      const rect = hero.getBoundingClientRect();
      const distance = hero.offsetHeight - window.innerHeight;
      scrollTarget = distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 0;
      requestRender();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion.matches) return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--mouse-x", x.toFixed(3));
      hero.style.setProperty("--mouse-y", y.toFixed(3));
    };

    const resetPointer = () => {
      hero.style.setProperty("--mouse-x", "0");
      hero.style.setProperty("--mouse-y", "0");
    };

    const handleMotionChange = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      scrollCurrent = reducedMotion.matches ? 0 : scrollTarget;
      stage.style.setProperty("--hero-scroll", scrollCurrent.toFixed(4));
      resetPointer();
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    reducedMotion.addEventListener("change", handleMotionChange);
    readScroll();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="calm-hero" aria-labelledby="calm-hero-title">
        <div ref={stageRef} className="calm-hero-stage">
          <div className="calm-sky" aria-hidden="true" />
          <div className="calm-landscape" aria-hidden="true">
            <Image
              className="calm-landscape-image"
              src={LANDSCAPE_IMAGE}
              alt=""
              fill
              sizes="100vw"
              preload
              draggable={false}
            />
            <div className="calm-landscape-colour" />
            <div className="calm-sun" />
            <svg className="calm-birds" viewBox="0 0 180 80" fill="none">
              <path d="M9 38C15 31 22 31 29 37C36 30 44 29 52 36" />
              <path d="M72 56C77 51 82 51 87 55C92 50 97 50 102 54" />
              <path d="M125 26C130 20 136 20 141 25C146 20 152 20 157 24" />
            </svg>
          </div>
          <div className="calm-mist calm-mist-one" aria-hidden="true" />
          <div className="calm-mist calm-mist-two" aria-hidden="true" />
          <div className="calm-back-hill" aria-hidden="true" />
          <div className="calm-middle-hill" aria-hidden="true" />
          <div className="calm-front-hill" aria-hidden="true" />

          <div className="calm-leaf-layer" aria-hidden="true">
            {leaves.map((leaf) => (
              <span
                className="calm-leaf"
                key={`${leaf.left}-${leaf.top}`}
                style={{
                  "--leaf-left": leaf.left,
                  "--leaf-top": leaf.top,
                  "--leaf-size": `${leaf.size}px`,
                  "--leaf-rotation": `${leaf.rotate}deg`,
                } as CSSProperties}
              />
            ))}
          </div>

          <div className="calm-hero-content">
            <p className="calm-hero-eyebrow">
              <span aria-hidden="true" />
              {profile.name} · {profile.location}
            </p>
            <h1 id="calm-hero-title">
              <span>Software Engineer.</span>
              {" "}
              <span>Full-stack,</span>
              {" "}
              <span>backend-focused.</span>
            </h1>
            <p className="calm-hero-description">
              I build database-driven applications, REST APIs, automation workflows,
              and full-stack products using modern web technologies and clean software
              design principles.
            </p>
            <ul className="calm-hero-skills" aria-label="Core technical skills">
              {coreSkills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
            <div className="calm-hero-actions" aria-label="Portfolio actions">
              <Link className="calm-button calm-button-coral" href="/projects">
                Browse projects
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <footer className="calm-home-footer">
            <div className="calm-home-brand">
              <span className="calm-home-mark" aria-hidden="true">KC</span>
              <span><strong>{profile.name}</strong><small>{profile.role}</small></span>
            </div>
            <p><MapPin aria-hidden="true" /> {profile.location}</p>
            <nav className="calm-home-links" aria-label="Social links">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
            </nav>
          </footer>
        </div>
      </section>

      <section className="home-evidence" aria-labelledby="featured-work-heading">
        <div className="page-shell">
          <div className="home-proof-strip" aria-label="Recruiter quick view">
            <div><span>Target</span><strong>Software Engineer / Full-Stack Internship</strong></div>
            <div><span>Education</span><strong>{education.degree}</strong></div>
            <div><span>Focus</span><strong>Backend · databases · automation</strong></div>
          </div>

          <header className="home-section-heading">
            <div><p className="eyebrow">Selected evidence / 01</p><h2 id="featured-work-heading">Featured projects.</h2></div>
            <p>Three builds that show the range of the current résumé, from automated media infrastructure to payments and low-level memory management.</p>
          </header>

          <div className="home-featured-grid">
            {featuredProjects.map((project, index) => (
              <article className="home-project-card" key={project.title}>
                <span>0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="home-capability-summary">
            <div>
              <p className="eyebrow">Technical range / 02</p>
              <h2>Tools organised by the work they support.</h2>
            </div>
            <div className="home-capability-list">
              {capabilities.slice(0, 4).map((capability) => (
                <div key={capability.title}>
                  <span>{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="home-next-step">
            <div>
              <p className="eyebrow">Continue / 03</p>
              <h2>Inspect the full project archive or start a conversation.</h2>
            </div>
            <div>
              <Link className="calm-button calm-button-coral" href="/projects">View all projects <ArrowRight aria-hidden="true" /></Link>
              <Link className="calm-button calm-button-cream" href="/contact">Contact me <ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
