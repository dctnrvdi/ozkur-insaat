import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Iletisim() {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } });

  const phone = content?.contactPhone ?? "+90 (000) 000 00 00";
  const email = content?.contactEmail ?? "info@ozkurinsaat.com";
  const address = content?.contactAddress ?? "İzmir, Türkiye";
  const hours = content?.contactHours ?? "Pazartesi – Cuma, 09:00 – 18:00";
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <section className="pt-40 pb-20 container-px">
        <Reveal>
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            İletişim
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
            Projenizi konuşalım
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-28 grid md:grid-cols-2 gap-16">
        <Reveal>
          <form
            action={`https://formsubmit.co/${email}`}
            method="POST"
            className="space-y-5"
          >
            <input type="hidden" name="_subject" value="Yeni İletişim Formu — ozkurinsaat.com" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Ad Soyad
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="phone">
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  E-posta
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="message">
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center rounded-pill bg-foreground text-background px-7 py-3.5 text-sm font-semibold transition-transform hover:scale-105"
            >
              Mesajı Gönder
            </button>
          </form>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-surface rounded-lg p-10 h-fit space-y-8">
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-2">
                Telefon
              </div>
              <a href={phoneHref} className="text-lg font-display font-semibold">
                {phone}
              </a>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-2">
                E-posta
              </div>
              <a href={`mailto:${email}`} className="text-lg font-display font-semibold">
                {email}
              </a>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wide mb-2">
                Ofis
              </div>
              <p className="text-lg font-display font-semibold">{address}</p>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted uppercase tracking-wide mb-2">
                Çalışma Saatleri
              </div>
              <p className="text-sm text-muted">{hours}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
