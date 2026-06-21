import type { ComponentPropsWithoutRef } from "react";

export default function CustomH3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="mb-4 mt-8 text-xl font-bold text-foreground md:text-2xl"
      {...props}
    />
  );
}
