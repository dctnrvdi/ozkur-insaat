import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type StatItem = { label: string; value: string };
type ServiceItem = { title: string; desc: string };

export default async function Home() {
  const [content, featured] = await Promise.all([
    prisma.siteContent.findUnique({ where: { id: "main" } }),
    prisma.project.findFirst({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const stats = ((content?.stats as StatItem[]) ?? []).filter((s) => s.label || s.value);
  const services = ((content?.services as ServiceItem[]) ?? []).filter((s) => s.title);

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end">
        <MediaFrame
          src={content?.heroImage ?? ""}
          alt="Özkur İnşaat"
          label="Hero Görseli"
          className="absolute inset-0"
          focus="center 68%"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative container-px pb-24 w-full text-white">
          <Reveal>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[0.95] max-w-3xl mb-8">
              {content?.heroTitle ?? "Yaşam alanınız için daha fazla mekân"}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-lg text-white/80 text-lg mb-10">
              {content?.heroSubtitle}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projeler"
                className="inline-flex items-center rounded-pill bg-white text-foreground px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-105"
              >
                Projelerimizi İnceleyin
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center rounded-pill border border-white/40 text-white px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Bize Ulaşın
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      {stats.length > 0 && (
        <section className="border-b border-border">
          <div className="container-px grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((s) => (
              <div key={s.label} className="py-10 px-4 text-center md:text-left">
                <div className="font-display font-extrabold text-3xl md:text-4xl mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PROJECT */}
      {featured && (
        <section className="py-28">
          <div className="container-px">
            <Reveal>
              <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
                <div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                    Öne Çıkan Proje
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl mt-3 max-w-lg">
                    {featured.title}
                  </h2>
                </div>
                <Link
                  href="/projeler"
                  className="text-sm font-semibold border-b border-foreground pb-0.5"
                >
                  Tüm Projeler →
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Link
                href={`/projeler/${featured.slug}`}
                className="group grid md:grid-cols-2 gap-10 items-center"
              >
                <MediaFrame
                  src={featured.coverImage}
                  alt={featured.title}
                  label={featured.title}
                  className="aspect-[4/5] rounded-lg transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div>
                  <p className="text-muted text-lg leading-relaxed mb-8">
                    {featured.summary}
                  </p>
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div>
                      <div className="text-xs text-muted uppercase tracking-wide mb-1">Konum</div>
                      <div className="font-display font-bold text-lg">{featured.location}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted uppercase tracking-wide mb-1">Tip</div>
                      <div className="font-display font-bold text-lg">{featured.category}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted uppercase tracking-wide mb-1">Durum</div>
                      <div className="font-display font-bold text-lg">{featured.status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted uppercase tracking-wide mb-1">Yıl</div>
                      <div className="font-display font-bold text-lg">{featured.year}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-pill bg-foreground text-background px-6 py-3 text-sm font-semibold transition-transform group-hover:scale-105">
                    Projeyi İncele
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* SERVICES */}
      {services.length > 0 && (
        <section className="py-28 bg-surface">
          <div className="container-px">
            <Reveal>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                Hizmetlerimiz
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl mt-3 mb-14 max-w-xl">
                Fikirden anahtar teslimine tam kapsamlı inşaat çözümleri
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 80}>
                  <div className="bg-background p-10 h-full">
                    <div className="text-sm text-muted mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display font-bold text-xl mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted leading-relaxed">{service.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-28">
        <div className="container-px">
          <Reveal>
            <div className="rounded-lg bg-foreground text-background p-12 md:p-20 text-center">
              <h2 className="font-display font-bold text-3xl md:text-5xl max-w-2xl mx-auto mb-6">
                Projenizi birlikte hayata geçirelim
              </h2>
              <p className="text-background/70 max-w-lg mx-auto mb-10">
                Arazi etüdünden anahtar teslimine, sürecin her adımında
                yanınızdayız.
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center rounded-pill bg-accent text-accent-ink px-8 py-4 text-sm font-semibold transition-transform hover:scale-105"
              >
                Hemen İletişime Geçin
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
