import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/app/admin/actions";

export default function NewProject() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-10">Yeni Proje</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
