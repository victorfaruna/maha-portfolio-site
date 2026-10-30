import { getPageMetadata } from "@/lib/site-metadata";
import AwardsFellowshipsPage from "./AwardsFellowshipsPage";

export const metadata = getPageMetadata("/awards");

export default function Page() {
  return <AwardsFellowshipsPage />;
}
