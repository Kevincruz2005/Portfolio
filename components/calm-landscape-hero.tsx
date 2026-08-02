"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const LANDSCAPE_IMAGE =
  "https://cdn.pixabay.com/photo/2026/04/28/22/56/22-56-09-389_1280.png";

const leaves = [
  { left: "24%", top: "43%", size: 30, delay: "-2s", duration: "12s", rotate: 18 },
  { left: "39%", top: "57%", size: 42, delay: "-8s", duration: "16s", rotate: -24 },
  { left: "51%", top: "45%", size: 24, delay: "-5s", duration: "13s", rotate: 45 },
  { left: "64%", top: "56%", size: 34, delay: "-10s", duration: "18s", rotate: 25 },
  { left: "75%", top: "47%", size: 20, delay: "-3s", duration: "14s", rotate: -30 },
  { left: "85%", top: "60%", size: 27, delay: "-7s", duration: "17s", rotate: 50 },
];

export function CalmLandscapeHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    let scrollTarget = 0;
    let scrollCurrent = 0;
    let animationFrame = 0;

    const readScroll = () => {
      const rect = hero.getBoundingClientRect();
      const distance = hero.offsetHeight - window.innerHeight;
      scrollTarget = distance > 0
        ? Math.min(Math.max(-rect.top / distance, 0), 1)
        : 0;
    };

    const renderScroll = () => {
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.09;
      if (Math.abs(scrollTarget - scrollCurrent) < 0.0001) {
        scrollCurrent = scrollTarget;
      }
      stage.style.setProperty("--hero-scroll", scrollCurrent.toFixed(4));
      animationFrame = window.requestAnimationFrame(renderScroll);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        event.pointerType !== "mouse" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      hero.style.setProperty("--mouse-x", x.toFixed(3));
      hero.style.setProperty("--mouse-y", y.toFixed(3));
    };

    const resetPointer = () => {
      hero.style.setProperty("--mouse-x", "0");
      hero.style.setProperty("--mouse-y", "0");
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    readScroll();
    animationFrame = window.requestAnimationFrame(renderScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
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
          <g className="calm-bird calm-bird-one">
            <path d="M9 38C15 31 22 31 29 37C36 30 44 29 52 36" />
          </g>
          <g className="calm-bird calm-bird-two">
            <path d="M72 56C77 51 82 51 87 55C92 50 97 50 102 54" />
          </g>
          <g className="calm-bird calm-bird-three">
            <path d="M125 26C130 20 136 20 141 25C146 20 152 20 157 24" />
          </g>
        </svg>
      </div>

      <div className="calm-mist calm-mist-one" aria-hidden="true" />
      <div className="calm-mist calm-mist-two" aria-hidden="true" />
      <div className="calm-back-hill" aria-hidden="true" />
      <div className="calm-middle-hill" aria-hidden="true" />
      <div className="calm-front-hill" aria-hidden="true" />

      <div className="calm-leaf-layer" aria-hidden="true">
        {leaves.map((leaf, index) => (
          <span
            className={`calm-leaf calm-leaf-${index + 1}`}
            key={`${leaf.left}-${leaf.top}`}
            style={
              {
                "--leaf-left": leaf.left,
                "--leaf-top": leaf.top,
                "--leaf-size": `${leaf.size}px`,
                "--leaf-delay": leaf.delay,
                "--leaf-duration": leaf.duration,
                "--leaf-rotation": `${leaf.rotate}deg`,
              } as CSSProperties
            }
          >
            <span />
          </span>
        ))}
      </div>

      <div className="calm-hero-content">
        <p className="calm-hero-eyebrow">
          <span aria-hidden="true" />
          Backend · systems · infrastructure
        </p>

        <h1 id="calm-hero-title">
          <span>Thoughtful systems</span>
          {" "}
          <span>grow into reliable</span>
          {" "}
          <span>infrastructure.</span>
        </h1>

        <p className="calm-hero-description">
          I build backend, systems and agent infrastructure with clear boundaries,
          observable failures and evidence another engineer can verify.
        </p>

        <div className="calm-hero-actions" aria-label="Portfolio actions">
          <Link className="calm-button calm-button-coral" href="/projects">
            Browse projects
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link className="calm-button calm-button-cream" href="/contact">
            Start a conversation
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <footer className="calm-home-footer">
        <div className="calm-home-brand">
          <span className="calm-home-mark" aria-hidden="true">
            <svg viewBox="0 0 44 44" fill="none">
              <rect x="2.5" y="2.5" width="39" height="39" rx="10" />
              <path d="M22 35V12" />
              <path d="M22 22C16.5 22 12 18.5 12 13C17.5 13 22 16.5 22 22Z" />
              <path d="M22 29C27.5 29 32 25.5 32 20C26.5 20 22 23.5 22 29Z" />
            </svg>
          </span>
          <span>
            <strong>Kevin Cruz</strong>
            <small>Chennai, India</small>
          </span>
        </div>

        <p>Backend, systems and reliable infrastructure.</p>

        <nav className="calm-home-links" aria-label="Social links">
          <a href="https://github.com/Kevincruz2005" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-cruz-32a8642ba/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </footer>

          <div className="calm-scroll-cue" aria-hidden="true">
            <span>Scroll to explore</span>
            <i />
          </div>
        </div>
      </section>

      <section className="calm-home-continuation" aria-labelledby="calm-continuation-title">
        <div className="calm-continuation-shell">
          <p className="calm-continuation-kicker">Built from the inside out</p>
          <div className="calm-continuation-heading">
            <h2 id="calm-continuation-title">
              From low-level memory to reliable agent infrastructure.
            </h2>
            <p>
              I work across the layers where software has to be understandable,
              observable and useful to the next engineer who touches it.
            </p>
          </div>

          <div className="calm-continuation-grid">
            <article>
              <span>01</span>
              <h3>Clear boundaries</h3>
              <p>Typed interfaces, explicit state and failure paths that stay visible.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Systems thinking</h3>
              <p>From allocation and rendering to data, APIs and distributed trust.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Verifiable outcomes</h3>
              <p>Evidence another engineer can inspect instead of claims they must trust.</p>
            </article>
          </div>

          <Link className="calm-button calm-button-coral calm-continuation-link" href="/projects">
            Enter the project archive
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
