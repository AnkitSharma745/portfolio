"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();

  return (
    <div className="mt-20 pt-10 border-t border-border/50">
      <h3 className="text-2xl font-bold mb-8">Comments</h3>
      <Giscus
        id="comments"
        repo="ankitsharma745/portfolio"
        repoId="R_kgDONQ_2_w" // Replace with your actual repo ID
        category="General"
        categoryId="DIC_kwDONQ_2_84CkZ_u" // Replace with your actual category ID
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
