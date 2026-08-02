import { BookOpen, MapPin, Radar, University } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { milestones } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <div className="about-atmosphere" aria-hidden="true">
        <span className="about-sun" />
        <span className="about-contour about-contour-one" />
        <span className="about-contour about-contour-two" />
        <strong>Origin / direction</strong>
      </div>

      <div className="page-shell">
        <SectionHeading
          as="h1"
          id="about-heading"
          index="02"
          eyebrow="About"
          title="Building software from the inside out."
        />

        <div className="about-layout">
          <Reveal className="about-statement">
            <div className="about-statement-header">
              <Radar aria-hidden="true" />
              <span>Operating principle</span>
            </div>
            <p>
              My work keeps moving toward the same question: <strong>what has to
              remain true when the easy path fails?</strong>
            </p>
            <p>
              That question led from Java and relational applications into memory
              allocation, paging and interrupts—then into agent payments, bounded
              execution, chain-backed evidence and cloud delivery.
            </p>
            <p>
              I prefer systems with explicit boundaries, observable failure modes
              and claims that another engineer can verify.
            </p>
          </Reveal>

          <Reveal className="education-file" delay={0.08}>
            <div className="education-file-topline">
              <div className="education-file-label">Education</div>
              <University aria-hidden="true" />
            </div>
            <h3>B.E. Computer Science and Engineering</h3>
            <p>Loyola-ICAM College of Engineering and Technology</p>
            <dl>
              <div>
                <dt>Period</dt>
                <dd>2023–2027</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd><MapPin aria-hidden="true" /> Chennai, India</dd>
              </div>
              <div>
                <dt>Current direction</dt>
                <dd><BookOpen aria-hidden="true" /> Backend, systems and reliable infrastructure</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="journey" aria-labelledby="journey-heading">
          <div className="journey-intro">
            <p className="eyebrow">Engineering journey</p>
            <h3 id="journey-heading">How my focus changed over time.</h3>
          </div>
          <ol>
            {milestones.map((milestone, index) => (
              <li key={milestone.label}>
                <span className="journey-marker" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="journey-label">{milestone.label}</span>
                  <h4>{milestone.title}</h4>
                  <p>{milestone.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
