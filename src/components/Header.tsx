"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/projeler", label: "Projeler" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledState, setScrolledState] = useState(false);
  const [open, setOpen] = useState(false);

  // Sadece anasayfada, en üstteyken tam ekran koyu hero görseli/videosu var —
  // diğer sayfaların en üstü açık renkli olduğu için orada her zaman koyu
  // (scrolled) stil kullanılır, aksi halde beyaz yazılar beyaz zeminde kaybolur.
  const scrolled = isHome ? scrolledState : true;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolledState(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-px flex items-center justify-between h-20">
        <Link
          href="/"
          className={`font-display font-extrabold text-lg tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          Özkur İnşaat
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/iletisim"
          className="hidden md:inline-flex items-center rounded-pill bg-foreground text-background px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
        >
          Bize Ulaşın
        </Link>

        <button
          aria-label="Menüyü aç"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden flex flex-col gap-1.5 p-2 ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          <span className="w-6 h-0.5 bg-current" />
          <span className="w-6 h-0.5 bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col container-px py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/iletisim"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center rounded-pill bg-foreground text-background px-5 py-2.5 text-sm font-semibold"
            >
              Bize Ulaşın
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
