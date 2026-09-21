import { prisma } from "@/lib/prisma";
import SiteContentForm from "@/components/admin/SiteContentForm";
import { updateSiteContent } from "@/app/admin/actions";

export default async function AdminContent() {
  let content = await prisma.siteContent.findUnique({ where: { id: "main" } });
  if (!content) {
    content = await prisma.siteContent.create({ data: { id: "main" } });
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-10">Site İçeriği</h1>
      <SiteContentForm content={content} action={updateSiteContent} />
    </div>
  );
}
