import React from 'react';
import { Award, Calendar, Users, Wrench } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      stat: '30+',
      label: 'Years Experience',
      icon: Award,
    },
    {
      stat: '1994',
      label: 'Trusted Since',
      icon: Calendar,
    },
    {
      stat: '1000+',
      label: 'Customers Served',
      icon: Users,
    },
    {
      stat: 'Bike',
      label: 'Restoration Experts',
      icon: Wrench,
    },
  ];

  return (
    <section className="bg-[#121212] border-y border-[#222222] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors">
                    {item.stat}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mt-0.5">
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
