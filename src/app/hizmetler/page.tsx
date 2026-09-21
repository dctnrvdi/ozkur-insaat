import Link from "next/link";
import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    title: "Konut Projeleri",
    desc: "Site ve apartman ölçeğinde, ihtiyaca özel planlanmış konut projeleri geliştiriyoruz. Ortak alan tasarımından daire planlarına kadar yaşam kalitesini önceliklendiriyoruz.",
    points: ["Kentsel dönüşüm", "Toplu konut", "Karma kullanım siteleri"],
  },
  {
    title: "Villa & Rezidans",
    desc: "Doğayla uyumlu arsalarda, kişiye özel mimari çözümlerle müstakil villa ve rezidans projeleri hayata geçiriyoruz.",
    points: ["Kişiye özel mimari tasarım", "Peyzaj entegrasyonu", "Akıllı ev altyapısı"],
  },
  {
    title: "Proje ve Şantiye Yönetimi",
    desc: "Zemin etüdünden anahtar teslimine kadar tüm süreci; bütçe, zaman ve kalite kontrolüyle uçtan uca yönetiyoruz.",
    points: ["Zemin etüdü ve ruhsat süreçleri", "Taşeron ve tedarik yönetimi", "Kalite kontrol ve denetim"],
  },
  {
    title: "Mimari Danışmanlık",
    desc: "3D görselleştirme ve teknik danışmanlıkla, fikir aşamasından uygulama projesine net bir yol haritası sunuyoruz.",
    points: ["3D görselleştirme", "İç mekân tasarımı", "Statik ve mekanik proje koordinasyonu"],
  },
];

export default function Hizmetler() {
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
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="border border-border rounded-lg p-10 h-full">
                <div className="text-sm text-muted mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="font-display font-bold text-2xl mb-4">
                  {service.title}
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
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
