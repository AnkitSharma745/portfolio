import type { ComponentPropsWithoutRef } from "react";

export default function CustomOl(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="mb-6 ml-4 list-inside list-decimal space-y-2 text-foreground/80"
      {...props}
    />
  );
}
