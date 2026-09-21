import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/app/admin/actions";

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-10">{project.title}</h1>
      <ProjectForm project={project} action={boundUpdate} />
    </div>
  );
}
