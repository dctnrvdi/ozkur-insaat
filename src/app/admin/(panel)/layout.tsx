import Link from "next/link";
import { logout } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/projeler", label: "Projeler" },
  { href: "/admin/icerik", label: "Site İçeriği" },
];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="w-64 shrink-0 bg-foreground text-background flex flex-col">
        <div className="p-6 border-b border-background/10">
          <div className="font-display font-extrabold text-lg">Özkur İnşaat</div>
          <div className="text-xs text-background/50 mt-1">Yönetim Paneli</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 rounded-md text-sm font-medium text-background/80 hover:bg-background/10 hover:text-background transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-background/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="block px-4 py-2.5 rounded-md text-sm font-medium text-background/60 hover:bg-background/10 hover:text-background transition-colors"
          >
            Siteyi Görüntüle ↗
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium text-background/60 hover:bg-background/10 hover:text-background transition-colors"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 md:p-12">{children}</div>
      </main>
    </div>
  );
}
