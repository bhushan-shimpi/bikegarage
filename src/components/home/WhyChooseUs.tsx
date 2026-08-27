import React from 'react';
import { Check } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';

export const WhyChooseUs: React.FC = () => {
  const points = [
    'Experienced & Certified Bike Mechanics',
    'Fast Same-Day Service Delivery',
    'Specialized Motorcycle Tools & Jigs',
    'Nut-and-Bolt Restoration Mastery',
  ];

  return (
    <section className="bg-[#0B0B0B] py-16 lg:py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & 4 Checkmarks */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white font-sans">
                WHY CHOOSE US?
              </h2>
              <div className="w-12 h-1 bg-[#F5B900] mt-2 rounded-full" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              With over 30 years in Pahur, we treat every bike—from everyday commuters to high-power superbikes and vintage 2-strokes—with master craftsmanship.
            </p>

            <div className="space-y-4 pt-2">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#F5B900] text-black flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-neutral-200">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Motorcycle technician working on bike */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#222222]">
              <OptimizedImage
                src="/images/why-choose-us.jpg"
                alt="Motorcycle repair and engine assembly at Chaudhari Auto"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur rounded-lg border border-white/10 text-xs">
                <span className="text-[#F5B900] font-bold block uppercase">Pahur Workshop Service Bay</span>
                <span className="text-neutral-300">Dedicated engine reboring, electrical scanning & chassis alignment benches</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
