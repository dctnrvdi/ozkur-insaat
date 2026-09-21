import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject, moveProject } from "@/app/admin/actions";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display font-bold text-2xl mb-1">Projeler</h1>
          <p className="text-sm text-muted">{projects.length} proje</p>
        </div>
        <Link
          href="/admin/projeler/yeni"
          className="inline-flex items-center rounded-pill bg-foreground text-background px-6 py-3 text-sm font-semibold"
        >
          + Yeni Proje
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="flex items-center gap-4 bg-background border border-border rounded-lg p-4"
          >
            <div className="flex flex-col gap-1 shrink-0">
              <form action={moveProject.bind(null, project.id, "up")}>
                <button
                  type="submit"
                  disabled={i === 0}
                  className="w-7 h-7 flex items-center justify-center rounded border border-border text-xs disabled:opacity-30"
                >
                  ↑
                </button>
              </form>
              <form action={moveProject.bind(null, project.id, "down")}>
                <button
                  type="submit"
                  disabled={i === projects.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded border border-border text-xs disabled:opacity-30"
                >
                  ↓
                </button>
              </form>
            </div>

            <div className="w-20 h-16 rounded-md overflow-hidden bg-surface shrink-0">
              {project.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.coverImage} alt="" className="w-full h-full object-cover" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{project.title}</h3>
                {!project.published && (
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-muted/20 text-muted shrink-0">
                    Taslak
                  </span>
                )}
              </div>
              <p className="text-xs text-muted mt-0.5">
                {project.category} • {project.location} • {project.status}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/admin/projeler/${project.id}`}
                className="text-sm font-semibold border-b border-foreground"
              >
                Düzenle
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deleteProject(project.id);
                }}
              >
                <button type="submit" className="text-sm text-red-600 font-semibold">
                  Sil
                </button>
              </form>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-20 text-muted text-sm">
            Henüz proje eklenmedi.
          </div>
        )}
      </div>
    </div>
  );
}
