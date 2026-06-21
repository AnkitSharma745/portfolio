import type { ComponentPropsWithoutRef } from "react";

export default function CustomUl(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="mb-6 ml-4 list-inside list-disc space-y-2 text-foreground/80"
      {...props}
    />
  );
}
