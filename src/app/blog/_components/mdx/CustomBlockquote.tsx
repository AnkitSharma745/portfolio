import type { ComponentPropsWithoutRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function CustomBlockquote(
  props: ComponentPropsWithoutRef<"blockquote">,
) {
  return (
    <blockquote className="relative my-8 rounded-r-xl border-l-4 border-primary bg-secondary/20 py-2 pl-6 italic text-foreground/80">
      <FaQuoteLeft className="absolute left-2 top-2 text-xl text-primary/20" />
      {props.children}
    </blockquote>
  );
}
