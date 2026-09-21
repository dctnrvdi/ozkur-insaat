export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  status: "Devam Ediyor" | "Tamamlandı" | "Planlama";
  year: string;
  summary: string;
  description: string[];
  coverImage: string;
  gallery: string[];
  stats: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
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
    coverImage: "/projects/liva-orman-konaklari/cover.jpg",
    gallery: [
      "/projects/liva-orman-konaklari/1.jpg",
      "/projects/liva-orman-konaklari/2.jpg",
      "/projects/liva-orman-konaklari/3.jpg",
      "/projects/liva-orman-konaklari/4.jpg",
    ],
    stats: [
      { label: "Konum", value: "İzmir" },
      { label: "Tip", value: "Konut" },
      { label: "Durum", value: "Devam Ediyor" },
      { label: "Yıl", value: "2026" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
