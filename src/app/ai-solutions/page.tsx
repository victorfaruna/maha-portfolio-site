import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AiSolutionsExperience } from "./AiSolutionsExperience";

export default function AiSolutionsPage() {
  return (
    <>
      <Navbar solid noBorder mobileMenuFont="sans" />
      <AiSolutionsExperience />
      <Footer />
    </>
  );
}
