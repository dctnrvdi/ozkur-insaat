import Link from "next/link";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

type ServiceItem = { title: string; desc: string };

export default async function Hizmetler() {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } });
  const services = ((content?.services as ServiceItem[]) ?? []).filter((s) => s.title);

  return (
    <>
      <section className="pt-40 pb-20 container-px">
        <Reveal>
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            Hizmetlerimiz
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
            Fikirden anahtar teslimine tam kapsamlı çözümler
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-28">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="border border-border rounded-lg p-10 h-full">
                <div className="text-sm text-muted mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="font-display font-bold text-2xl mb-4">{service.title}</h2>
                <p className="text-muted leading-relaxed">{service.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-28 container-px">
        <Reveal>
          <div className="rounded-lg bg-foreground text-background p-12 md:p-16 text-center">
            <h2 className="font-display font-bold text-2xl md:text-4xl max-w-xl mx-auto mb-6">
              Projeniz için görüşmek ister misiniz?
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
