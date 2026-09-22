import Link from "next/link";
import CreditMarquee from "./CreditMarquee";

type FooterProps = {
  phone?: string;
  email?: string;
  address?: string;
};

export default function Footer({
  phone = "+90 (000) 000 00 00",
  email = "info@ozkurinsaat.com",
  address = "İzmir, Türkiye",
}: FooterProps) {
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
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
            <a href={phoneHref} className="hover:text-background">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hover:text-background">
              {email}
            </a>
            <span>{address}</span>
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
