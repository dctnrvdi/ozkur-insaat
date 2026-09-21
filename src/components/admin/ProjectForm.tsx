"use client";

import { useState } from "react";
import Uploader from "./Uploader";
import GalleryUploader from "./GalleryUploader";
import type { Project } from "@prisma/client";

export default function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: (formData: FormData) => void;
}) {
  const [coverImage, setCoverImage] = useState(project?.coverImage ?? "");
  const [videoUrl, setVideoUrl] = useState(project?.videoUrl ?? "");
  const [gallery, setGallery] = useState<string[]>(project?.gallery ?? []);

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="videoUrl" value={videoUrl} />
      <input type="hidden" name="gallery" value={gallery.join(",")} />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Proje Adı</label>
          <input
            name="title"
            required
            defaultValue={project?.title}
            className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Konum</label>
          <input
            name="location"
            defaultValue={project?.location}
            className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Kategori</label>
          <input
            name="category"
            defaultValue={project?.category}
            placeholder="Konut, Villa, Ticari…"
            className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Durum</label>
          <select
            name="status"
            defaultValue={project?.status ?? "Devam Ediyor"}
            className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent bg-background"
          >
            <option>Planlama</option>
            <option>Devam Ediyor</option>
            <option>Tamamlandı</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Yıl</label>
          <input
            name="year"
            defaultValue={project?.year}
            className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2 pt-8">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={project?.published ?? true}
            className="w-4 h-4"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Sitede yayında
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Kısa Özet</label>
        <textarea
          name="summary"
          rows={2}
          defaultValue={project?.summary}
          className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Detaylı Açıklama <span className="text-muted font-normal">(her paragraf yeni satırda)</span>
        </label>
        <textarea
          name="description"
          rows={5}
          defaultValue={project?.description.join("\n")}
          className="w-full rounded-sm border border-border px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      <Uploader value={coverImage} onChange={setCoverImage} accept="image/*" label="Kapak Görseli" />
      <Uploader value={videoUrl} onChange={setVideoUrl} accept="video/*" label="Proje Videosu (opsiyonel)" />
      <GalleryUploader values={gallery} onChange={setGallery} label="Galeri" />

      <button
        type="submit"
        className="inline-flex items-center rounded-pill bg-foreground text-background px-7 py-3.5 text-sm font-semibold"
      >
        Kaydet
      </button>
    </form>
  );
}
