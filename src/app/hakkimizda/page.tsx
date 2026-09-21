import MediaFrame from "@/components/MediaFrame";
import Reveal from "@/components/Reveal";

const VALUES = [
  {
    title: "Mühendislik Disiplini",
    desc: "Her projede statik, zemin ve malzeme analizini titizlikle yürütüyoruz.",
  },
  {
    title: "Zamanında Teslim",
    desc: "Şantiye planlaması ve kaynak yönetimiyle taahhütlerimize sadık kalıyoruz.",
  },
  {
    title: "Şeffaf Süreç",
    desc: "Müşterilerimizi projenin her aşamasında düzenli olarak bilgilendiriyoruz.",
  },
  {
    title: "Sürdürülebilirlik",
    desc: "Enerji verimli malzeme ve tasarım tercihleriyle geleceğe yatırım yapıyoruz.",
  },
];

export default function Hakkimizda() {
  return (
    <>
      <section className="pt-40 pb-20 container-px">
        <Reveal>
          <span className="text-xs font-semibold text-accent uppercase tracking-widest">
            Hakkımızda
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
            Güvenle inşa ediyor, kalıcı değer yaratıyoruz
          </h1>
        </Reveal>
      </section>

      <section className="container-px pb-24">
        <Reveal>
          <MediaFrame
            src="/hakkimizda-cover.jpg"
            alt="Özkur İnşaat şantiye"
            label="Kurumsal Görsel"
            className="aspect-[21/9] rounded-lg"
          />
        </Reveal>
      </section>

      <section className="container-px pb-28 grid md:grid-cols-2 gap-16">
        <Reveal>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">
            Hikayemiz
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            Özkur İnşaat, konut ve karma kullanım projelerinde mühendislik
            titizliğini mimari duyarlılıkla birleştirmek amacıyla kuruldu.
            Her projede; zemin etüdünden malzeme seçimine, statik hesaplardan
            iç mekân detaylarına kadar süreci uçtan uca yönetiyoruz.
          </p>
          <p className="text-muted leading-relaxed">
            Amacımız sadece bina inşa etmek değil; sakinlerinin yıllarca
            gurur duyacağı, doğayla uyumlu ve uzun ömürlü yaşam alanları
            üretmek.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-6">
            Misyonumuz
          </h2>
          <p className="text-muted leading-relaxed">
            Her ölçekteki projede aynı titizlikle çalışarak; güvenli,
            sürdürülebilir ve estetik açıdan güçlü yapılar ortaya koymak.
            Müşterilerimizle kurduğumuz şeffaf iletişim, projelerimizin
            temelini oluşturur.
          </p>
        </Reveal>
      </section>

      <section className="py-24 bg-surface">
        <div className="container-px">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-lg">
              Bizi biz yapan değerler
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="bg-background p-8 h-full">
                  <h3 className="font-display font-bold text-lg mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
