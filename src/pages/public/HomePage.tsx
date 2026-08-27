import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { TrustBar } from '../../components/home/TrustBar';
import { ServicesOverview } from '../../components/home/ServicesOverview';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { CTASection } from '../../components/home/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0B0B0B]">
      <HeroSection />
      <TrustBar />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};
