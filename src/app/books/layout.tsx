import type { ReactNode } from "react";
import { getPageMetadata } from "@/lib/site-metadata";

export const metadata = getPageMetadata("/books");

export default function BooksLayout({ children }: { children: ReactNode }) {
  return children;
}
