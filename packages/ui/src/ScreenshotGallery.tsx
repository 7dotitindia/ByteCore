import Image from "next/image";
import type { Screenshot } from "@bytescope/content";

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  if (screenshots.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {screenshots.map((shot, i) => (
        <div key={i} className="relative aspect-[16/10] overflow-hidden bg-border">
          <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
