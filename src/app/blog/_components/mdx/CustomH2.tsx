import type { ComponentPropsWithoutRef } from "react";

export default function CustomH2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="group mb-5 mt-10 flex items-center gap-2 text-2xl font-bold text-foreground md:text-3xl"
      {...props}
    >
      <span className="-ml-6 mr-2 text-primary opacity-0 transition-opacity group-hover:opacity-100">
        #
      </span>
      {props.children}
    </h2>
  );
}
