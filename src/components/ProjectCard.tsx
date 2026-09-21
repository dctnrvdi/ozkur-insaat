import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projeler/${project.slug}`}
      className="group block rounded-lg overflow-hidden border border-border bg-background transition-shadow hover:shadow-xl"
    >
      <MediaFrame
        src={project.coverImage}
        alt={project.title}
        label={project.title}
        className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wide mb-2">
          <span>{project.category}</span>
          <span className="text-muted">•</span>
          <span className="text-muted normal-case font-medium">{project.location}</span>
        </div>
        <h3 className="font-display font-bold text-xl mb-1">{project.title}</h3>
        <p className="text-sm text-muted line-clamp-2">{project.summary}</p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-foreground">
          Projeyi İncele
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
