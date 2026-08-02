import { Award, BookOpen, MapPin, Radar, University } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { certifications, education, profile, summaryParagraphs } from "@/lib/data";

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
          title="Full-stack development with a strong backend focus."
        />

        <div className="about-layout">
          <Reveal className="about-statement">
            <div className="about-statement-header">
              <Radar aria-hidden="true" />
              <span>Executive summary</span>
            </div>
            {summaryParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </Reveal>

          <Reveal className="education-file" delay={0.08}>
            <div className="education-file-topline">
              <div className="education-file-label">Education</div>
              <University aria-hidden="true" />
            </div>
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
            <dl>
              <div>
                <dt>Period</dt>
                <dd>{education.period}</dd>
              </div>
              <div>
                <dt>CGPA</dt>
                <dd>{education.cgpa}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd><MapPin aria-hidden="true" /> {profile.location}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd><BookOpen aria-hidden="true" /> {education.status}</dd>
              </div>
            </dl>
            <div className="education-coursework">
              <span>Relevant coursework</span>
              <ul>
                {education.coursework.map((course) => <li key={course}>{course}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="journey" aria-labelledby="certifications-heading">
          <div className="journey-intro">
            <p className="eyebrow">Certifications</p>
            <Award aria-hidden="true" />
            <h3 id="certifications-heading">Training and credentials.</h3>
          </div>
          <ol>
            {certifications.map((certification, index) => (
              <li key={certification}>
                <span className="journey-marker" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="journey-label">Certification</span>
                  <h4>{certification}</h4>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
