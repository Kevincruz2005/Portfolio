import { Trophy } from "lucide-react";
import type { ArchivedProject } from "@/lib/data";

export function ProjectRecognition({ project }: { project: ArchivedProject }) {
  if (!project.recognition) return null;

  const { placement, event, prize } = project.recognition;

  return (
    <div className="project-recognition">
      <div>
        <span className="project-recognition-placement">
          <Trophy aria-hidden="true" />
          {placement}
        </span>
        <span className="project-recognition-event">{event}</span>
      </div>
      <span className="project-recognition-prize">
        <strong>{prize}</strong>
        <small>prize</small>
      </span>
    </div>
  );
}
