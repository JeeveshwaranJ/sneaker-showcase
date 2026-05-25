import CarouselSection from "@/components/sections/CarouselSection";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import ProductDetailSection from "@/components/sections/ProductDetailSection";
import CustomizerSection from "@/components/sections/CustomizerSection";
import InfiniteGallery from "@/components/sections/InfiniteGallery";
import CampaignSection from "@/components/sections/CampaignSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative w-full bg-[#f8f8f8]">
      <CustomCursor />
      <CarouselSection />
      <CollectionShowcase />
      <ProductDetailSection />
      <CustomizerSection />
      <InfiniteGallery />
      <CampaignSection />
      <FinalCTASection />
    </main>
  );
}
