import React from 'react';
import { Calendar, Search, Calculator, Wrench, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Book / Enquire',
      desc: 'Send an enquiry or pick an appointment slot on our website with your bike model and preferred time.',
      icon: Calendar,
    },
    {
      number: '02',
      title: 'Bike Inspection',
      desc: 'Drop off your bike at our Pahur centre for a detailed 24-point physical and diagnostic inspection.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Get Estimate',
      desc: 'Transparent pricing breakdown shared with you over phone/WhatsApp before any work starts.',
      icon: Calculator,
    },
    {
      number: '04',
      title: 'Service / Repair',
      desc: 'Master bike mechanics carry out precision work with genuine OEM spare parts and tools.',
      icon: Wrench,
    },
    {
      number: '05',
      title: 'Bike Delivery',
      desc: 'Post-service test ride, quality assurance check, foam wash, and on-time bike handover.',
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#121212] border-y border-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
            Simple & Transparent Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white font-sans mt-1">
            HOW IT WORKS
          </h2>
          <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />
          <p className="text-xs sm:text-sm text-neutral-400 mt-3">
            Getting your two-wheeler serviced at Chaudhari Auto Centre is effortless, transparent, and completely reliable.
          </p>
        </div>

        {/* Steps: Horizontal on Desktop, Vertical Timeline on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#181818] border border-[#2B2B2B] rounded-xl p-5 flex flex-col justify-between hover:border-[#F5B900] transition-all duration-300 group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black font-sans text-neutral-600 group-hover:text-[#F5B900] transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#222222] border border-[#333333] flex items-center justify-center text-[#F5B900] group-hover:bg-[#F5B900] group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-[#F5B900] transition-colors mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
