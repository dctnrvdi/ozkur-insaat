import MediaFrame from "@/components/MediaFrame";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ValueItem = { title: string; desc: string };

export default async function Hakkimizda() {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } });
  const values = ((content?.values as ValueItem[]) ?? []).filter((v) => v.title);

  return (
    <>
      <section className="pt-40 pb-20 container-px">
        <Reveal>
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            Hakkımızda
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
            {content?.aboutTitle ?? "Güvenle inşa ediyor, kalıcı değer yaratıyoruz"}
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-24">
        <Reveal>
          <MediaFrame
            src={content?.aboutImage ?? ""}
            alt="Özkur İnşaat şantiye"
            label="Kurumsal Görsel"
            className="aspect-[21/9] rounded-lg"
          />
        </Reveal>
      </section>

      <section className="container-px pb-28 grid md:grid-cols-2 gap-16">
        <Reveal>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Hikayemiz</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{content?.aboutIntro}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">Misyonumuz</h2>
          <p className="text-muted leading-relaxed whitespace-pre-line">{content?.aboutMission}</p>
        </Reveal>
      </section>

      {values.length > 0 && (
        <section className="py-24 bg-surface">
          <div className="container-px">
            <Reveal>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-lg">
                Bizi biz yapan değerler
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="bg-background p-8 h-full">
                    <h3 className="font-display font-bold text-lg mb-3">{v.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
