import type { Metadata } from "next";
import OpenSourcePage from "@/views/OpenSourcePage/OpenSourcePage";

import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Open Source | Ankit Sharma",
  description:
    "My contributions to the open source community and projects I've helped improve.",
});

export default function Page() {
  return <OpenSourcePage />;
}
