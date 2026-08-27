import React from 'react';
import { Award, Calendar, Users, Wrench } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    { stat: '30+', label: 'Years Exp.', icon: Award },
    { stat: '1994', label: 'Est. Since', icon: Calendar },
    { stat: '1000+', label: 'Customers', icon: Users },
    { stat: 'Bike', label: 'Restoration', icon: Wrench },
  ];

  return (
    <section className="bg-[#121212] border-y border-[#222222] py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Always 4 columns — compact on mobile */}
        <div className="grid grid-cols-4 gap-2 sm:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-1.5 sm:gap-2.5 group"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] transition-colors">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-base sm:text-3xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors leading-tight">
                    {item.stat}
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-neutral-400 block mt-0.5 leading-tight">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
