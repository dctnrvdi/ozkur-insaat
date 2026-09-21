"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label = "Kaydet" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-pill bg-foreground text-background px-7 py-3.5 text-sm font-semibold disabled:opacity-50"
    >
      {pending && (
        <span className="h-4 w-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
      )}
      {pending ? "Kaydediliyor…" : label}
    </button>
  );
}
