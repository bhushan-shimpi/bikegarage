import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { ServicesOverview } from '../../components/home/ServicesOverview';
import { RestorationHighlight } from '../../components/home/RestorationHighlight';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { OwnerAchievementSection } from '../../components/home/OwnerAchievementSection';
import { GallerySection } from '../../components/home/GallerySection';
import { HowItWorks } from '../../components/home/HowItWorks';
import { InstagramHighlight } from '../../components/home/InstagramHighlight';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { CTASection } from '../../components/home/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0B0B0B] text-white">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats & Social Cards Showcase */}
      <InstagramHighlight />

      {/* 3. Services */}
      <ServicesOverview />

      {/* 4. Bike Restoration */}
      <RestorationHighlight />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Owner / Business Achievement (Awards) */}
      <OwnerAchievementSection />

      {/* 7. Workshop & Restoration Gallery */}
      <GallerySection />

      {/* 8. How It Works */}
      <HowItWorks />

      {/* 8. Customer Reviews */}
      <TestimonialsSection />

      {/* 9. Final CTA Banner */}
      <CTASection />
    </div>
  );
};
