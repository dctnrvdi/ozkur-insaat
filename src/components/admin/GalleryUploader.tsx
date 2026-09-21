"use client";

import { useRef, useState } from "react";
import { uploadToCloudinary } from "@/lib/uploadClient";

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
  const [progress, setProgress] = useState<{ current: number; total: number; percent: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList) {
    setUploading(true);
    setError(null);
    const list = Array.from(files);
    const uploaded: string[] = [];
    try {
      for (let i = 0; i < list.length; i++) {
        setProgress({ current: i + 1, total: list.length, percent: 0 });
        const url = await uploadToCloudinary(list[i], (percent) =>
          setProgress({ current: i + 1, total: list.length, percent })
        );
        uploaded.push(url);
      }
      onChange([...values, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bazı dosyalar yüklenemedi, tekrar dene.");
      if (uploaded.length) onChange([...values, ...uploaded]);
    } finally {
      setUploading(false);
      setProgress(null);
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

      {uploading && progress && (
        <div className="mb-3 rounded-md bg-surface p-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-4 w-4 rounded-full border-2 border-border border-t-foreground animate-spin" />
            <span className="text-sm font-medium">
              Yükleniyor… ({progress.current}/{progress.total}) %{progress.percent}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-foreground transition-all duration-200"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-sm font-semibold rounded-pill bg-foreground text-background px-4 py-2 disabled:opacity-50"
      >
        {uploading ? "Yükleniyor…" : "Görsel Ekle"}
      </button>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
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
