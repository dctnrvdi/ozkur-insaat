import { notFound } from "next/navigation";
import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import Reveal from "@/components/Reveal";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="pt-40 pb-14 container-px">
        <Reveal>
          <Link href="/projeler" className="text-sm text-muted hover:text-foreground">
            ← Tüm Projeler
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wide mt-6 mb-4">
            <span>{project.category}</span>
            <span className="text-muted">•</span>
            <span className="text-muted normal-case font-medium">
              {project.location}
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl max-w-3xl leading-[1.05]">
            {project.title}
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-16">
        <Reveal>
          <MediaFrame
            src={project.coverImage}
            alt={project.title}
            label={project.title}
            className="aspect-[16/9] rounded-lg"
            priority
          />
        </Reveal>
      </section>

      <section className="container-px pb-24 grid md:grid-cols-[2fr_1fr] gap-16">
        <Reveal>
          <div className="space-y-4">
            {project.description.map((p) => (
              <p key={p} className="text-muted leading-relaxed text-lg">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="border border-border rounded-lg p-8 grid grid-cols-2 gap-6 h-fit">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-xs text-muted uppercase tracking-wide mb-1">
                  {stat.label}
                </div>
                <div className="font-display font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {project.gallery.length > 0 && (
        <section className="container-px pb-28">
          <Reveal>
            <h2 className="font-display font-bold text-2xl mb-8">Galeri</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {project.gallery.map((img, i) => (
              <Reveal key={img} delay={i * 80}>
                <MediaFrame
                  src={img}
                  alt={`${project.title} görsel ${i + 1}`}
                  label={`Galeri ${i + 1}`}
                  className="aspect-[4/3] rounded-lg"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="container-px pb-28">
        <Reveal>
          <div className="rounded-lg bg-foreground text-background p-12 md:p-16 text-center">
            <h2 className="font-display font-bold text-2xl md:text-4xl max-w-xl mx-auto mb-6">
              Bu proje hakkında bilgi almak ister misiniz?
            </h2>
            <Link
              href="/iletisim"
              className="inline-flex items-center rounded-pill bg-accent text-accent-ink px-8 py-4 text-sm font-semibold transition-transform hover:scale-105"
            >
              İletişime Geçin
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
