import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

export default function CustomImage({
  src,
  alt = "",
}: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") {
    return null;
  }

  return (
    <div className="relative my-8 h-64 w-full overflow-hidden rounded-xl md:h-96">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
