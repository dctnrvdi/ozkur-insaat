import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Özkur İnşaat | Kaliteli Yaşam Alanları",
  description:
    "Özkur İnşaat; konut, villa ve karma kullanım projelerinde mühendislik disipliniyle mimari zarafeti bir araya getirir.",
  metadataBase: new URL("https://ozkurinsaat.com"),
  openGraph: {
    title: "Özkur İnşaat",
    description:
      "Konut, villa ve karma kullanım projelerinde mühendislik disipliniyle mimari zarafeti bir araya getiren inşaat firması.",
    url: "https://ozkurinsaat.com",
    siteName: "Özkur İnşaat",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
