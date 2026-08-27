import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { TrustBar } from '../../components/home/TrustBar';
import { ServicesOverview } from '../../components/home/ServicesOverview';
import { RestorationHighlight } from '../../components/home/RestorationHighlight';
import { PremiumServiceChecklist } from '../../components/home/PremiumServiceChecklist';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { HowItWorks } from '../../components/home/HowItWorks';
import { ProjectsShowcase } from '../../components/home/ProjectsShowcase';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { HomeContactSnippet } from '../../components/home/HomeContactSnippet';
import { CTASection } from '../../components/home/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0B0B0B] text-white">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust Stats */}
      <TrustBar />

      {/* 3. Services (12 Motorcycle Services, 2 columns on mobile) */}
      <ServicesOverview />

      {/* 4. Bike Restoration (Signature Specialty) */}
      <RestorationHighlight />

      {/* 5. Premium Bike Service (10-Point Checklist) */}
      <PremiumServiceChecklist />

      {/* 6. Why Choose Us (8 Value Props) */}
      <WhyChooseUs />

      {/* 7. How It Works (5-Step Timeline) */}
      <HowItWorks />

      {/* 8. Our Projects */}
      <ProjectsShowcase />

      {/* 9. Customer Reviews */}
      <TestimonialsSection />

      {/* 10. Contact / Location with Map */}
      <HomeContactSnippet />

      {/* 11. Final CTA Banner */}
      <CTASection />
    </div>
  );
};
