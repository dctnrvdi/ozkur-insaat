import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [projectCount, publishedCount] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
  ]);

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-1">Panel</h1>
      <p className="text-sm text-muted mb-10">Özkur İnşaat yönetim paneline hoş geldin.</p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="text-xs text-muted uppercase tracking-wide mb-2">Toplam Proje</div>
          <div className="font-display font-extrabold text-3xl">{projectCount}</div>
        </div>
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="text-xs text-muted uppercase tracking-wide mb-2">Yayında</div>
          <div className="font-display font-extrabold text-3xl">{publishedCount}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/projeler/yeni"
          className="inline-flex items-center rounded-pill bg-foreground text-background px-6 py-3 text-sm font-semibold"
        >
          + Yeni Proje Ekle
        </Link>
        <Link
          href="/admin/icerik"
          className="inline-flex items-center rounded-pill border border-border px-6 py-3 text-sm font-semibold"
        >
          Site İçeriğini Düzenle
        </Link>
      </div>
    </div>
  );
}
