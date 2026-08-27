import React from 'react';
import {
  Award,
  Calendar,
  Wrench,
  ShieldCheck,
  Tag,
  Bike,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';

export const WhyChooseUs: React.FC = () => {
  const points = [
    { title: '30+ Years of Experience', icon: Award },
    { title: 'Trusted Since 1994', icon: Calendar },
    { title: 'Experienced Mechanics', icon: Wrench },
    { title: 'Quality Spare Parts', icon: ShieldCheck },
    { title: 'Transparent Pricing', icon: Tag },
    { title: 'Complete Bike Care', icon: Bike },
    { title: 'Restoration Expertise', icon: Sparkles },
    { title: 'Customer Satisfaction', icon: ThumbsUp },
  ];

  return (
    <section className="bg-[#0B0B0B] py-16 lg:py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & 8 Points Grid */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Pahur's Premier Two-Wheeler Hub
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white font-sans mt-1">
                WHY CHOOSE US?
              </h2>
              <div className="w-12 h-1 bg-[#F5B900] mt-2 rounded-full" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              With over 30 years in Pahur, we treat every bike—from everyday commuters to high-power superbikes and vintage 2-strokes—with master craftsmanship, genuine spares, and complete transparency.
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-2">
              {points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#222222] hover:border-[#F5B900]/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-200">
                      {point.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Motorcycle technician working on bike */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#222222]">
              <OptimizedImage
                src="/images/why-choose-us.jpg"
                alt="Motorcycle repair and engine assembly at Chaudhari Auto"
                className="w-full h-80 sm:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur rounded-lg border border-white/10 text-xs">
                <span className="text-[#F5B900] font-bold block uppercase">
                  Pahur Workshop Service Bay
                </span>
                <span className="text-neutral-300">
                  Dedicated engine reboring, electrical scanning & chassis alignment benches
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
