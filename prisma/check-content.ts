import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const content = await prisma.siteContent.findUnique({ where: { id: "main" } });
  console.log("--- SiteContent (main) ---");
  console.log("heroImage:", JSON.stringify(content?.heroImage));
  console.log("heroTitle:", content?.heroTitle);
  console.log("updatedAt:", content?.updatedAt);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
