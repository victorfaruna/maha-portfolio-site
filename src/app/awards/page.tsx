import type { Metadata } from "next";
import AwardsFellowshipsPage from "./AwardsFellowshipsPage";

export const metadata: Metadata = {
  title: "Awards & Fellowships | Maha Jouini",
  description:
    "Recognition and fellowships for Maha Jouini's work advancing responsible AI, ethical technology, digital inclusion, and women's leadership across Africa and globally.",
};

export default function Page() {
  return <AwardsFellowshipsPage />;
}
