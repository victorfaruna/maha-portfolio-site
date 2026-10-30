import type { ReactNode } from "react";
import { getPageMetadata } from "@/lib/site-metadata";

export const metadata = getPageMetadata("/about");

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
