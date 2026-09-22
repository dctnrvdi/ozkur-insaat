import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } });

  return (
    <>
      <Header logo={content?.logo ?? ""} />
      <main>{children}</main>
      <Footer
        phone={content?.contactPhone}
        email={content?.contactEmail}
        address={content?.contactAddress}
      />
    </>
  );
}
