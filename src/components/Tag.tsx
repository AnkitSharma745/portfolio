// components/Tag.tsx
import React from "react";

interface TagProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  color: string; // Hex or Tailwind-compatible hex (e.g. "#6C63FF")
}

export default function Tag({ icon, children, color }: TagProps) {
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1"
      style={{
        backgroundColor: `${color}1A`, // ~10% opacity
        color,
      }}
    >
      {icon} {children}
    </span>
  );
}
