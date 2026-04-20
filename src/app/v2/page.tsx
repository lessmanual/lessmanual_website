import { HeaderV2 } from "@/components/v2/HeaderV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { ArekBadgeV2 } from "@/components/v2/ArekBadgeV2";
import { StackStrip } from "@/components/v2/StackStrip";
import { ProductsV2 } from "@/components/v2/ProductsV2";
import { LiveEmailGenerator } from "@/components/v2/LiveEmailGenerator";
import { TestimonialsV2 } from "@/components/v2/TestimonialsV2";
import { WhoWeAreCard } from "@/components/v2/WhoWeAreCard";
import { ProcessV2 } from "@/components/v2/ProcessV2";
import { ROICalculator } from "@/components/v2/ROICalculator";
import { PricingV2 } from "@/components/v2/PricingV2";
import { FinalCTAV2 } from "@/components/v2/FinalCTAV2";
import { FooterV2 } from "@/components/v2/FooterV2";

export default function V2Home() {
  return (
    <>
      <HeaderV2 />
      <main>
        <HeroV2 />
        <ArekBadgeV2 />
        <StackStrip />
        <ProductsV2 />
        <LiveEmailGenerator />
        <TestimonialsV2 />
        <WhoWeAreCard />
        <ProcessV2 />
        <ROICalculator />
        <PricingV2 />
        <FinalCTAV2 />
      </main>
      <FooterV2 />
    </>
  );
}
