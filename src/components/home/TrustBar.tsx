import React from 'react';
import { Award, Calendar, Users, Wrench } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    { stat: '30+', label: 'Years Experience', icon: Award },
    { stat: '1994', label: 'Trusted Since', icon: Calendar },
    { stat: '1000+', label: 'Customers Served', icon: Users },
    { stat: 'Bike', label: 'Restoration Experts', icon: Wrench },
  ];

  return (
    <section className="bg-[#121212] border-y border-[#222222] py-5 sm:py-8">
      {/* Scrollable single row on mobile, static grid on desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row overflow-x-auto gap-4 sm:gap-8 md:grid md:grid-cols-4 md:overflow-visible scrollbar-hide pb-1 sm:pb-0">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-2.5 group min-w-[110px] sm:min-w-0 shrink-0 md:shrink"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-xl sm:text-3xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors">
                    {item.stat}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-400 block mt-0.5 whitespace-nowrap">
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
