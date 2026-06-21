import { isValidElement } from "react";
import type { ReactNode } from "react";

export function getTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return getTextContent(children.props.children);
  }
  return "";
}
