"use client";

import { useRef, useState } from "react";

export default function GalleryUploader({
  values,
  onChange,
  label,
}: {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList) {
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        if (res.ok) {
          const data = await res.json();
          uploaded.push(data.secure_url);
        }
      }
      onChange([...values, ...uploaded]);
    } finally {
      setUploading(false);
    }
  }

  function remove(i: number) {
    onChange(values.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const next = [...values];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
        {values.map((url, i) => (
          <div key={url + i} className="relative rounded-md overflow-hidden aspect-square bg-surface border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-2 py-1">
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} className="text-white text-xs px-1">←</button>
                <button type="button" onClick={() => move(i, 1)} className="text-white text-xs px-1">→</button>
              </div>
              <button type="button" onClick={() => remove(i)} className="text-white text-xs px-1">Sil</button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-sm font-semibold rounded-pill bg-foreground text-background px-4 py-2 disabled:opacity-50"
      >
        {uploading ? "Yükleniyor…" : "Görsel Ekle"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
