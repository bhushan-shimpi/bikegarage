import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { ServicesOverview } from '../../components/home/ServicesOverview';
import { RestorationHighlight } from '../../components/home/RestorationHighlight';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { HowItWorks } from '../../components/home/HowItWorks';
import { ProjectsShowcase } from '../../components/home/ProjectsShowcase';
import { InstagramHighlight } from '../../components/home/InstagramHighlight';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { CTASection } from '../../components/home/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0B0B0B] text-white">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Services */}
      <ServicesOverview />

      {/* 4. Bike Restoration */}
      <RestorationHighlight />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Our Projects */}
      <ProjectsShowcase />

      {/* 8. Live Instagram Community Highlight */}
      <InstagramHighlight />

      {/* 9. Customer Reviews */}
      <TestimonialsSection />

      {/* 10. Final CTA Banner */}
      <CTASection />
    </div>
  );
};
