import Image from "next/image";
import { assetExists } from "@/lib/media";

export default function MediaFrame({
  src,
  alt,
  className = "",
  label,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const exists = assetExists(src);

  if (!exists) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-surface-2 via-surface to-foreground/10 flex items-center justify-center ${className}`}
      >
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] [background-size:16px_16px]" />
        <span className="relative text-xs font-medium tracking-wide text-muted uppercase text-center px-6">
          {label ?? alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className="object-cover"
      />
    </div>
  );
}
