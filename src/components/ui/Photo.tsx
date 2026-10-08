import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/photos";

// Every photo on the site: 3:2, hairline border, 6px radius, no shadow.
export function Photo({
  name,
  sizes = "(min-width: 1024px) 560px, 100vw",
  priority = false,
  className = "",
}: {
  name: PhotoKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const p = photos[name];
  return (
    <div className={`relative aspect-[3/2] overflow-hidden rounded-md border border-line bg-surface-2 ${className}`}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
