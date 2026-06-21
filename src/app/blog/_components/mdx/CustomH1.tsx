import type { ComponentPropsWithoutRef } from "react";

export default function CustomH1(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className="mb-6 mt-12 text-3xl font-bold text-foreground md:text-4xl"
      {...props}
    />
  );
}
