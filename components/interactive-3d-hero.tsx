"use client";

import { useState, type PointerEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { Application } from "@splinetool/runtime";
import "@splinetool/runtime";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function Interactive3DHero() {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  const smoothX = useSpring(cursorX, { stiffness: 130, damping: 25, mass: 0.25 });
  const smoothY = useSpring(cursorY, { stiffness: 130, damping: 25, mass: 0.25 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left - 250);
    cursorY.set(event.clientY - bounds.top - 250);
  };

  const hideCursorLight = () => {
    cursorX.set(-1000);
    cursorY.set(-1000);
  };

  const markSceneLoaded = (application: Application) => {
    void application;
    setSceneLoaded(true);
  };

  return (
    <section
      className="immersive-hero"
      aria-labelledby="immersive-hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={hideCursorLight}
    >
      <div
        className={sceneLoaded ? "immersive-scene-stage is-loaded" : "immersive-scene-stage"}
        role="img"
        aria-label="Interactive 3D robot scene"
      >
        <div className="immersive-scene-transform">
          <Spline
            className="immersive-spline-canvas"
            scene={SCENE_URL}
            onLoad={markSceneLoaded}
          />
        </div>
      </div>

      <motion.div
        className="immersive-cursor-light"
        aria-hidden="true"
        style={{ x: smoothX, y: smoothY }}
      />

      <div className="immersive-copy">
        <div className="immersive-eyebrow">
          <span aria-hidden="true" />
          Backend · systems · immersive
        </div>

        <h1 id="immersive-hero-title" className="immersive-title">
          <span>Systems.</span>
          {" "}
          <span>Endure.</span>
        </h1>

        <p className="immersive-description">
          I build backend, systems and agent infrastructure that stays explicit
          when payments, memory, networks or trust fail.
        </p>

        <div className="immersive-actions" aria-label="Portfolio actions">
          <Link className="immersive-button immersive-button-primary" href="/projects">
            Browse projects
            <ArrowRight aria-hidden="true" />
          </Link>
          <a
            className="immersive-button immersive-button-secondary"
            href="/Kevin_Cruz_Resume.pdf"
            download
          >
            View résumé
          </a>
        </div>

        <div className="immersive-features" aria-label="Engineering focus">
          <div>
            <strong>Backend</strong>
            <span>APIs &amp; infrastructure</span>
          </div>
          <span className="immersive-feature-separator" aria-hidden="true" />
          <div>
            <strong>Systems</strong>
            <span>Low-level engineering</span>
          </div>
        </div>
      </div>

      <div className="immersive-live-status" aria-live="polite">
        <span className="immersive-live-icon" aria-hidden="true">
          <span />
        </span>
        <span>
          <strong>{sceneLoaded ? "Live 3D environment" : "Loading environment"}</strong>
          <small>Move your cursor to interact</small>
        </span>
      </div>

      {!sceneLoaded ? (
        <div className="immersive-loader" role="status" aria-live="polite">
          <span className="immersive-loader-ring" aria-hidden="true" />
          <span>Loading 3D scene</span>
        </div>
      ) : null}
    </section>
  );
}
