import type { ComponentPropsWithoutRef } from "react";
import CopyButton from "@/components/CopyButton";
import { getTextContent } from "./getTextContent";

export default function CustomPre(props: ComponentPropsWithoutRef<"pre">) {
  const codeText = getTextContent(props.children);

  return (
    <div className="group relative">
      <pre
        className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#1e1e1e] p-4 font-mono text-sm text-[#d4d4d4]"
        {...props}
      />
      <CopyButton text={codeText} />
    </div>
  );
}
