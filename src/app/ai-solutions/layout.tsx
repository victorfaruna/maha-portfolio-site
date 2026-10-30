import type { ReactNode } from "react";
import { getPageMetadata } from "@/lib/site-metadata";

export const metadata = getPageMetadata("/ai-solutions");

export default function AiSolutionsLayout({ children }: { children: ReactNode }) {
  return children;
}
