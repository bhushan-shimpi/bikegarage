import React from 'react';
import { SEO } from '../../components/common/SEO';
import { HeroSection } from '../../components/home/HeroSection';
import { ServicesOverview } from '../../components/home/ServicesOverview';
import { RestorationHighlight } from '../../components/home/RestorationHighlight';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { OwnerAchievementSection } from '../../components/home/OwnerAchievementSection';
import { GallerySection } from '../../components/home/GallerySection';
import { HowItWorks } from '../../components/home/HowItWorks';
import { InstagramHighlight } from '../../components/home/InstagramHighlight';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { HomeContactSnippet } from '../../components/home/HomeContactSnippet';
import { CTASection } from '../../components/home/CTASection';

export const HomePage: React.FC = () => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'MotorcycleRepairShop',
    '@id': 'https://chaudhariauto.com/#business',
    name: 'Chaudhary Auto',
    alternateName: ['Chaudhari Auto Centre', 'Chaudhary Auto Pahur'],
    url: 'https://chaudhariauto.com/',
    logo: 'https://chaudhariauto.com/logo.png',
    image: 'https://chaudhariauto.com/images/hero-bike.jpg',
    telephone: '+91-7387448878',
    email: 'chaudhariautopahur@gmail.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Main Road, Near Bus Stand',
      addressLocality: 'Pahur',
      addressRegion: 'Maharashtra',
      postalCode: '424205',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.7078,
      longitude: 75.7196,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Pahur' },
      { '@type': 'City', name: 'Jamner' },
      { '@type': 'AdministrativeArea', name: 'Jalgaon' },
    ],
  };

  return (
    <div className="bg-[#0B0B0B] text-white">
      <SEO
        title="Bike Service & Repair in Pahur, Jamner"
        description="Chaudhary Auto is a premier bike garage in Pahur, Taluka Jamner, Dist. Jalgaon offering expert bike servicing, repair, engine work, and complete restoration."
        canonicalPath="/"
        jsonLd={homeSchema}
      />
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

      {/* 9. Location & Contact Information */}
      <HomeContactSnippet />

      {/* 10. Final CTA Banner */}
      <CTASection />
    </div>
  );
};
