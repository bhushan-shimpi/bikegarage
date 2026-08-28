import React from 'react';
import { Award, Calendar, Users, Wrench } from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';

export const TrustBar: React.FC = () => {
  return (
    <section className="bg-transparent border-y border-white/10 py-3 sm:py-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Compact 4-column bar with transparent background and animated counters */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-6">
          
          {/* Stat 1: 30+ Years Exp */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] group-hover:scale-110 transition-all">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-sm sm:text-xl lg:text-2xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors leading-tight">
                <AnimatedNumber value={30} suffix="+" duration={1600} />
              </span>
              <span className="text-[8px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mt-0.5 leading-tight">
                Years Exp.
              </span>
            </div>
          </div>

          {/* Stat 2: 1994 Est. Since */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] group-hover:scale-110 transition-all">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-sm sm:text-xl lg:text-2xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors leading-tight">
                <AnimatedNumber value={1994} duration={1800} />
              </span>
              <span className="text-[8px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mt-0.5 leading-tight">
                Est. Since
              </span>
            </div>
          </div>

          {/* Stat 3: 10,000+ Customers */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] group-hover:scale-110 transition-all">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-sm sm:text-xl lg:text-2xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors leading-tight">
                <AnimatedNumber value={10000} formatWithCommas={true} suffix="+" duration={2000} />
              </span>
              <span className="text-[8px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mt-0.5 leading-tight">
                Happy Riders
              </span>
            </div>
          </div>

          {/* Stat 4: 100% Genuine Care */}
          <div className="flex flex-col items-center text-center gap-1 sm:gap-2 group">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#F5B900] shrink-0 group-hover:border-[#F5B900] group-hover:scale-110 transition-all">
              <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-sm sm:text-xl lg:text-2xl font-black text-white font-sans tracking-tight block group-hover:text-[#F5B900] transition-colors leading-tight">
                <AnimatedNumber value={100} suffix="%" duration={1600} />
              </span>
              <span className="text-[8px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mt-0.5 leading-tight">
                Genuine Spares
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
