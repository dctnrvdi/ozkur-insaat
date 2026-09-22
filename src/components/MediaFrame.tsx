import Image from "next/image";
import { assetExists } from "@/lib/media";

// Çağıran taraf kendi position (absolute/fixed/sticky/static) class'ı
// verdiyse, bileşenin varsayılan "relative" class'ıyla çakışıp konumlandırmayı
// bozmaması için "relative" eklenmez.
function positionClass(className: string) {
  return /\b(absolute|fixed|sticky|static|relative)\b/.test(className)
    ? ""
    : "relative";
}

export default function MediaFrame({
  src,
  alt,
  className = "",
  label,
  priority,
  sizes,
  focus = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
  // Dikey/farklı oranlı görsellerin geniş bantlarda nereden kırpılacağını
  // ayarlamak için (örn. "center 65%", "top", "50% 30%").
  focus?: string;
}) {
  const exists = assetExists(src);
  const posClass = positionClass(className);

  if (!exists) {
    return (
      <div
        className={`${posClass} overflow-hidden bg-gradient-to-br from-surface-2 via-surface to-foreground/10 flex items-center justify-center ${className}`}
      >
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] [background-size:16px_16px]" />
        <span className="relative text-xs font-medium tracking-wide text-muted uppercase text-center px-6">
          {label ?? alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`${posClass} overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className="object-cover"
        style={{ objectPosition: focus }}
      />
    </div>
  );
}
