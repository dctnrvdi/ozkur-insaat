"use client";

import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
};

export default function Uploader({ value, onChange, accept = "image/*,video/*", label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Yükleme başarısız");
      const data = await res.json();
      onChange(data.secure_url);
    } catch {
      setError("Yükleme başarısız oldu, tekrar dene.");
    } finally {
      setUploading(false);
    }
  }

  const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(value) || value.includes("/video/upload/");

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}
      <div className="border border-dashed border-border rounded-md p-4">
        {value ? (
          <div className="mb-3 relative rounded-md overflow-hidden bg-surface aspect-video">
            {isVideo ? (
              <video src={value} className="w-full h-full object-cover" controls />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="w-full h-full object-cover" />
            )}
          </div>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-sm font-semibold rounded-pill bg-foreground text-background px-4 py-2 disabled:opacity-50"
          >
            {uploading ? "Yükleniyor…" : value ? "Değiştir" : "Dosya Seç"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-sm text-muted hover:text-foreground"
            >
              Kaldır
            </button>
          )}
        </div>
        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
