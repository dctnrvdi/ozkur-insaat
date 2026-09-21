"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth, signOut } from "@/lib/auth";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Yetkisiz");
}

function slugify(text: string) {
  const trMap: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
    ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
  };
  return text
    .split("")
    .map((c) => trMap[c] ?? c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const gallery = String(formData.get("gallery") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const last = await prisma.project.findFirst({ orderBy: { order: "desc" } });

  await prisma.project.create({
    data: {
      slug: slugify(title) || `proje-${Date.now()}`,
      title,
      location: String(formData.get("location") ?? ""),
      category: String(formData.get("category") ?? ""),
      status: String(formData.get("status") ?? "Devam Ediyor"),
      year: String(formData.get("year") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      description,
      coverImage: String(formData.get("coverImage") ?? ""),
      gallery,
      videoUrl: String(formData.get("videoUrl") ?? "") || null,
      published: formData.get("published") === "on",
      order: (last?.order ?? -1) + 1,
    },
  });

  revalidatePath("/admin/projeler");
  revalidatePath("/");
  revalidatePath("/projeler");
  redirect("/admin/projeler");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const gallery = String(formData.get("gallery") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const updated = await prisma.project.update({
    where: { id },
    data: {
      title,
      location: String(formData.get("location") ?? ""),
      category: String(formData.get("category") ?? ""),
      status: String(formData.get("status") ?? "Devam Ediyor"),
      year: String(formData.get("year") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      description,
      coverImage: String(formData.get("coverImage") ?? ""),
      gallery,
      videoUrl: String(formData.get("videoUrl") ?? "") || null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/projeler");
  revalidatePath("/");
  revalidatePath("/projeler");
  revalidatePath(`/projeler/${updated.slug}`);
  redirect("/admin/projeler");
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projeler");
  revalidatePath("/");
  revalidatePath("/projeler");
}

export async function moveProject(id: string, direction: "up" | "down") {
  await requireAuth();
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const idx = projects.findIndex((p) => p.id === id);
  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapIdx < 0 || swapIdx >= projects.length) return;

  const a = projects[idx];
  const b = projects[swapIdx];
  await prisma.$transaction([
    prisma.project.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.project.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  revalidatePath("/admin/projeler");
  revalidatePath("/");
  revalidatePath("/projeler");
}

export async function updateSiteContent(
  _prevState: { success?: boolean } | undefined,
  formData: FormData
) {
  await requireAuth();

  function parseList(name: string) {
    try {
      return JSON.parse(String(formData.get(name) ?? "[]"));
    } catch {
      return [];
    }
  }

  await prisma.siteContent.upsert({
    where: { id: "main" },
    update: {
      heroTitle: String(formData.get("heroTitle") ?? ""),
      heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
      heroImage: String(formData.get("heroImage") ?? ""),
      stats: parseList("stats"),
      services: parseList("services"),
      aboutTitle: String(formData.get("aboutTitle") ?? ""),
      aboutIntro: String(formData.get("aboutIntro") ?? ""),
      aboutMission: String(formData.get("aboutMission") ?? ""),
      aboutImage: String(formData.get("aboutImage") ?? ""),
      values: parseList("values"),
      contactPhone: String(formData.get("contactPhone") ?? ""),
      contactEmail: String(formData.get("contactEmail") ?? ""),
      contactAddress: String(formData.get("contactAddress") ?? ""),
      contactHours: String(formData.get("contactHours") ?? ""),
    },
    create: {
      id: "main",
      heroTitle: String(formData.get("heroTitle") ?? ""),
      heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
      heroImage: String(formData.get("heroImage") ?? ""),
      stats: parseList("stats"),
      services: parseList("services"),
      aboutTitle: String(formData.get("aboutTitle") ?? ""),
      aboutIntro: String(formData.get("aboutIntro") ?? ""),
      aboutMission: String(formData.get("aboutMission") ?? ""),
      aboutImage: String(formData.get("aboutImage") ?? ""),
      values: parseList("values"),
      contactPhone: String(formData.get("contactPhone") ?? ""),
      contactEmail: String(formData.get("contactEmail") ?? ""),
      contactAddress: String(formData.get("contactAddress") ?? ""),
      contactHours: String(formData.get("contactHours") ?? ""),
    },
  });

  revalidatePath("/admin/icerik");
  revalidatePath("/");
  revalidatePath("/hakkimizda");
  revalidatePath("/hizmetler");
  revalidatePath("/iletisim");

  return { success: true };
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}
