import React from 'react';
import { Calendar, Search, Calculator, Wrench, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Book / Enquire',
      desc: 'Send an enquiry or pick an appointment slot with your bike model and preferred time.',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'Bike Inspection',
      desc: 'Drop off your bike at our Pahur centre for a detailed 24-point physical inspection.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Get Estimate',
      desc: 'Transparent pricing breakdown shared over phone/WhatsApp before any work starts.',
      icon: Calculator,
    },
    {
      number: '04',
      title: 'Service / Repair',
      desc: 'Master bike mechanics carry out precision work with genuine OEM spare parts.',
      icon: Wrench,
    },
    {
      number: '05',
      title: 'Bike Delivery',
      desc: 'Final test ride, quality assurance check, foam wash, and on-time bike handover.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-10 sm:py-16 bg-[#121212] border-y border-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#F5B900]">
              Simple &amp; Transparent Process
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white font-sans mt-0.5 sm:mt-1">
              HOW IT WORKS
            </h2>
            <div className="w-10 h-0.5 sm:w-12 sm:h-1 bg-[#F5B900] mx-auto mt-1.5 sm:mt-2 rounded-full" />
            <p className="text-[11px] sm:text-sm text-neutral-400 mt-2 sm:mt-3">
              Getting your two-wheeler serviced at Chaudhari Auto is effortless, transparent, and reliable.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── MOBILE: Compact Mini-List (< md) ─── */}
        <div className="block md:hidden space-y-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 60}>
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#181818] border border-[#282828] active:border-[#F5B900]/40 transition-colors"
              >
                {/* Step badge with Icon */}
                <div className="w-9 h-9 rounded-lg bg-[#222222] border border-[#333333] flex items-center justify-center text-[#F5B900] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Step Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#F5B900] tracking-wider">
                      STEP {step.number}
                    </span>
                    <span className="text-neutral-500 text-[10px]">•</span>
                    <h3 className="text-xs font-bold uppercase text-white tracking-tight truncate">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>

        {/* ─── DESKTOP: 5-Column Cards (>= md) ─── */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 lg:gap-5 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 100}>
                <div className="relative bg-[#181818] border border-[#2B2B2B] rounded-xl p-4 lg:p-5 flex flex-col justify-between hover:border-[#F5B900] transition-all duration-300 group h-full">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl lg:text-3xl font-black font-sans text-neutral-600 group-hover:text-[#F5B900] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-[#222222] border border-[#333333] flex items-center justify-center text-[#F5B900] group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xs lg:text-sm font-bold uppercase tracking-tight text-white group-hover:text-[#F5B900] transition-colors mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[11px] lg:text-xs text-neutral-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
