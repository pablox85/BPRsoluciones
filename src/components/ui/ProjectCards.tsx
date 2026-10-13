"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Project = {
  category: string;
  title: string;
  description: string;
  backTitle: string;
  backDescription: string;
  accent: string;
};

export function ProjectCards({ projects }: { projects: Project[] }) {
  const [flippedProject, setFlippedProject] = useState<string | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          {...project}
          isFlipped={flippedProject === project.title}
          onFlip={() =>
            setFlippedProject((current) =>
              current === project.title ? null : project.title,
            )
          }
        />
      ))}
    </div>
  );
}
