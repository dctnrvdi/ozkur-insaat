import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL ve ADMIN_PASSWORD ortam değişkenlerini ayarlamadan seed çalıştıramazsınız."
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Admin" },
  });
  console.log(`Admin kullanıcı hazır: ${email}`);

  await prisma.siteContent.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      stats: [
        { label: "Yıllık Tecrübe", value: "15+" },
        { label: "Tamamlanan Proje", value: "40+" },
        { label: "Mühendislik Standardı", value: "%100" },
        { label: "Şantiye Takibi", value: "7/24" },
      ],
      services: [
        {
          title: "Konut Projeleri",
          desc: "Modern yaşam alanları tasarlayan, ihtiyaca özel konut ve site projeleri.",
        },
        {
          title: "Villa & Rezidans",
          desc: "Doğayla uyumlu, kişiye özel tasarlanmış müstakil villa ve rezidans çözümleri.",
        },
        {
          title: "Proje Yönetimi",
          desc: "Zemin etüdünden anahtar teslimine, uçtan uca süreç ve şantiye yönetimi.",
        },
        {
          title: "Mimari Danışmanlık",
          desc: "3D görselleştirme ve mimari danışmanlıkla fikirden inşaata net bir yol haritası.",
        },
      ],
      aboutIntro:
        "Özkur İnşaat, konut ve karma kullanım projelerinde mühendislik titizliğini mimari duyarlılıkla birleştirmek amacıyla kuruldu. Her projede; zemin etüdünden malzeme seçimine, statik hesaplardan iç mekân detaylarına kadar süreci uçtan uca yönetiyoruz.",
      aboutMission:
        "Her ölçekteki projede aynı titizlikle çalışarak; güvenli, sürdürülebilir ve estetik açıdan güçlü yapılar ortaya koymak. Müşterilerimizle kurduğumuz şeffaf iletişim, projelerimizin temelini oluşturur.",
      values: [
        { title: "Mühendislik Disiplini", desc: "Her projede statik, zemin ve malzeme analizini titizlikle yürütüyoruz." },
        { title: "Zamanında Teslim", desc: "Şantiye planlaması ve kaynak yönetimiyle taahhütlerimize sadık kalıyoruz." },
        { title: "Şeffaf Süreç", desc: "Müşterilerimizi projenin her aşamasında düzenli olarak bilgilendiriyoruz." },
        { title: "Sürdürülebilirlik", desc: "Enerji verimli malzeme ve tasarım tercihleriyle geleceğe yatırım yapıyoruz." },
      ],
    },
  });
  console.log("Site içeriği hazır.");

  await prisma.project.upsert({
    where: { slug: "liva-orman-konaklari" },
    update: {},
    create: {
      slug: "liva-orman-konaklari",
      title: "Liva Orman Konakları",
      location: "İzmir",
      category: "Konut",
      status: "Devam Ediyor",
      year: "2026",
      summary:
        "Doğayla iç içe, ormana bakan konaklardan oluşan; huzuru ve modern yaşamı bir arada sunan konut projesi.",
      description: [
        "Liva Orman Konakları, doğal dokuyu koruyan bir yerleşim planı ile ormana bakan geniş teraslar, yüksek tavanlar ve bol doğal ışık alan yaşam alanları sunar.",
        "Proje; malzeme seçiminden peyzaj kurgusuna kadar her detayda Özkur İnşaat'ın mühendislik disiplinini ve mimari duyarlılığını yansıtır.",
      ],
      coverImage: "",
      gallery: [],
      order: 0,
    },
  });
  console.log("Örnek proje hazır.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
