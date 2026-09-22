import Link from "next/link";
import CreditMarquee from "./CreditMarquee";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-px py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="font-display font-extrabold text-xl mb-4">
            Özkur İnşaat
          </div>
          <p className="text-background/70 max-w-sm text-sm leading-relaxed">
            Konut, villa ve karma kullanım projelerinde mühendislik
            disipliniyle mimari zarafeti bir araya getiriyoruz.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold mb-4 text-background/50 uppercase tracking-wide">
            Kurumsal
          </div>
          <nav className="flex flex-col gap-3 text-sm">
            <Link href="/hakkimizda" className="text-background/80 hover:text-background">
              Hakkımızda
            </Link>
            <Link href="/hizmetler" className="text-background/80 hover:text-background">
              Hizmetler
            </Link>
            <Link href="/projeler" className="text-background/80 hover:text-background">
              Projeler
            </Link>
            <Link href="/iletisim" className="text-background/80 hover:text-background">
              İletişim
            </Link>
          </nav>
        </div>

        <div>
          <div className="text-sm font-semibold mb-4 text-background/50 uppercase tracking-wide">
            İletişim
          </div>
          <div className="flex flex-col gap-3 text-sm text-background/80">
            <a href="tel:+900000000000" className="hover:text-background">
              +90 (000) 000 00 00
            </a>
            <a href="mailto:info@ozkurinsaat.com" className="hover:text-background">
              info@ozkurinsaat.com
            </a>
            <span>İzmir, Türkiye</span>
          </div>
        </div>
      </div>

      <div className="container-px py-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/50">
        <span>© {new Date().getFullYear()} Özkur İnşaat. Tüm hakları saklıdır.</span>
        <span>ozkurinsaat.com</span>
      </div>

      <CreditMarquee />
    </footer>
  );
}
