import { HoldingPage } from "@/components/HoldingPage";
import OriginalHome from "./page.original";

/**
 * Temporary holding page mode.
 * Set SHOW_HOLDING_PAGE to false once payment is settled to instantly restore the full site.
 */
const SHOW_HOLDING_PAGE = true;

export default function Home() {
  if (SHOW_HOLDING_PAGE) {
    return <HoldingPage />;
  }

  return <OriginalHome />;
}
