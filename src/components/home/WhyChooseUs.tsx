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
import { ScrollReveal } from '../common/ScrollReveal';

export const WhyChooseUs: React.FC = () => {
  const points = [
    { title: '30+ Years Experience', icon: Award },
    { title: 'Trusted Since 1994', icon: Calendar },
    { title: 'Master Mechanics', icon: Wrench },
    { title: '100% Genuine Spares', icon: ShieldCheck },
    { title: 'Transparent Pricing', icon: Tag },
    { title: 'Complete Bike Care', icon: Bike },
    { title: 'Restoration Mastery', icon: Sparkles },
    { title: 'Customer Satisfaction', icon: ThumbsUp },
  ];

  return (
    <section className="bg-[#0B0B0B] py-16 lg:py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & 8 Points Grid */}
          <ScrollReveal direction="left" className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F5B900] animate-ping" />
                Pahur's Premier Two-Wheeler Hub
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white font-sans mt-1">
                WHY CHOOSE US?
              </h2>
              <div className="w-12 h-1 bg-[#F5B900] mt-2 rounded-full" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              With over 30 years in Pahur, we treat every commuter bike—like Hero, Honda, Yamaha, KTM, and more, as well as vintage 2-strokes—with master craftsmanship, genuine spares, and complete transparency.
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-2">
              {points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#222222] hover:border-[#F5B900]/50 hover:bg-[#181818] hover:translate-x-1 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F5B900]/10 text-[#F5B900] flex items-center justify-center shrink-0 group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-neutral-200 group-hover:text-white transition-colors">
                      {point.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right Column: Motorcycle technician working on bike */}
          <ScrollReveal direction="right" className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#222222] group">
              <OptimizedImage
                src="/images/why-choose-us.jpg"
                alt="Motorcycle technician performing engine repair and assembly at Chaudhary Auto Pahur"
                className="w-full h-80 sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/85 backdrop-blur-md rounded-xl border border-white/10 text-xs">
                <span className="text-[#F5B900] font-bold block uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Pahur Workshop Service Bay
                </span>
                <span className="text-neutral-300">
                  Dedicated engine reboring, electrical scanning & chassis alignment benches
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
