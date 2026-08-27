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
    <section className="bg-transparent border-y border-white/10 py-2.5 sm:py-4">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Compact 4-column bar with transparent background */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center gap-1 sm:gap-2 group"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] transition-colors">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <span className="text-sm sm:text-xl lg:text-2xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors leading-tight">
                    {item.stat}
                  </span>
                  <span className="text-[8px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mt-0.5 leading-tight">
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
