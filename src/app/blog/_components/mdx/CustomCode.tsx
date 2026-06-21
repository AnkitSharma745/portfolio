import type { ComponentPropsWithoutRef } from "react";

export default function CustomCode(props: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-secondary-foreground"
      {...props}
    />
  );
}
