import React from 'react';
import { Wrench, ShieldCheck, CheckCircle, Tag } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const items = [
    {
      title: 'Experienced Bike Mechanics',
      subtitle: 'Skilled two-wheeler specialists',
      icon: Wrench,
    },
    {
      title: 'Quality Bike Care',
      subtitle: 'Best service for your motorcycle & scooter',
      icon: ShieldCheck,
    },
    {
      title: 'Genuine Spare Parts',
      subtitle: 'We use only genuine two-wheeler parts',
      icon: CheckCircle,
    },
    {
      title: 'Transparent Pricing',
      subtitle: 'Honest quotes & zero hidden charges',
      icon: Tag,
    },
  ];

  return (
    <section className="bg-[#121212] border-b border-[#222222] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full border border-[#F5B900] flex items-center justify-center text-[#F5B900] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    {item.subtitle}
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
