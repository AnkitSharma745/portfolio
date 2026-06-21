import type { ComponentPropsWithoutRef } from "react";

export default function CustomP(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="mb-6 text-lg leading-relaxed text-foreground/80"
      {...props}
    />
  );
}
