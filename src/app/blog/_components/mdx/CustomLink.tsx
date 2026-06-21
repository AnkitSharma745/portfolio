import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export default function CustomLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isInternalLink = href.startsWith("/") || href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link
        href={href}
        className="font-medium text-primary hover:underline"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary hover:underline"
      {...props}
    >
      {children}
    </a>
  );
}
