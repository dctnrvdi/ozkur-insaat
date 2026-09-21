import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export default async function Projeler() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <section className="pt-40 pb-20 container-px">
        <Reveal>
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            Projeler
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
            Hayata geçirdiğimiz yaşam alanları
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20 text-muted text-sm">
            Yakında burada yeni projelerimizi paylaşacağız.
          </div>
        )}
      </section>
    </>
  );
}
