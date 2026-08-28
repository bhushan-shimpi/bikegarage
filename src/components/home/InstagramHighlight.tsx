import React from 'react';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { ScrollReveal } from '../common/ScrollReveal';

export const InstagramHighlight: React.FC = () => {
  const darkStats = [
    {
      value: 10000,
      formatWithCommas: true,
      suffix: '+',
      label: 'Happy Customers',
    },
    {
      value: 30000,
      formatWithCommas: true,
      suffix: '+',
      label: 'Hours of Work',
    },
    {
      value: 4000,
      formatWithCommas: true,
      suffix: '+',
      label: 'Projects Handled',
    },
    {
      value: 8,
      formatWithCommas: false,
      suffix: '+',
      label: 'Years of Experience',
    },
  ];

  return (
    <section className="py-6 sm:py-9 bg-black text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#E1306C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* Main Combined Grid: 2x2 Stats on Left + 2 Instagram Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          
          {/* ─── LEFT COLUMN: 2x2 Dark Rounded Stat Cards (Compact) ─── */}
          <div className="lg:col-span-6 w-full">
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
                {darkStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#202020] hover:bg-[#272727] border border-[#2F2F2F] hover:border-[#F5B900]/50 rounded-xl sm:rounded-2xl p-3 sm:p-4.5 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#F5B900] font-sans tracking-tight leading-none group-hover:scale-105 transition-transform drop-shadow-[0_2px_6px_rgba(245,185,0,0.2)]">
                      <AnimatedNumber
                        value={item.value}
                        formatWithCommas={item.formatWithCommas}
                        suffix={item.suffix}
                        duration={1800}
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-neutral-300 mt-1.5 sm:mt-2 leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ─── RIGHT COLUMN: 2 Compact Instagram Cards (Workshop & Owner) ─── */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full max-w-[420px]">
                
                {/* 1. Workshop Instagram Card */}
                <a
                  href="https://www.instagram.com/chaudhari_auto_pahur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-between h-[180px] xs:h-[195px] sm:h-[215px] rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-white text-center shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 select-none overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
                    boxShadow: '0 12px 30px -8px rgba(216, 41, 115, 0.45)',
                  }}
                  aria-label="Follow @chaudhari_auto_pahur on Instagram"
                >
                  {/* Subtle top glare */}
                  <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/25 rounded-full blur-lg pointer-events-none" />

                  {/* Diagonal shimmer sheen on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                  {/* Icon at Top */}
                  <div className="pt-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 sm:w-11 sm:h-11 text-white drop-shadow group-hover:scale-110 transition-transform"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                      <circle cx="12" cy="12" r="4.2" />
                      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                    </svg>
                  </div>

                  {/* Followers Count & Label */}
                  <div className="flex flex-col items-center">
                    <div className="text-base sm:text-xl font-black text-white tracking-tight drop-shadow font-sans leading-tight">
                      <AnimatedNumber
                        value={12596}
                        formatWithCommas={true}
                        suffix="+"
                        duration={2000}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white tracking-wide mt-0.5 font-sans">
                      Instagram
                    </div>
                  </div>

                  {/* Handle Pill at Bottom */}
                  <div className="w-full pb-0.5">
                    <div className="px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 text-[10px] sm:text-[11px] font-bold text-white truncate group-hover:bg-black/50 transition-colors">
                      @chaudhari_auto_pahur
                    </div>
                  </div>
                </a>

                {/* 2. Owner Instagram Card */}
                <a
                  href="https://www.instagram.com/_rcvlogs_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-between h-[180px] xs:h-[195px] sm:h-[215px] rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-white text-center shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 select-none overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
                    boxShadow: '0 12px 30px -8px rgba(216, 41, 115, 0.45)',
                  }}
                  aria-label="Follow @_rcvlogs_ on Instagram"
                >
                  {/* Subtle top glare */}
                  <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/25 rounded-full blur-lg pointer-events-none" />

                  {/* Diagonal shimmer sheen on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                  {/* Icon at Top */}
                  <div className="pt-1">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 sm:w-11 sm:h-11 text-white drop-shadow group-hover:scale-110 transition-transform"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                      <circle cx="12" cy="12" r="4.2" />
                      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                    </svg>
                  </div>

                  {/* Followers Count & Label */}
                  <div className="flex flex-col items-center">
                    <div className="text-base sm:text-xl font-black text-white tracking-tight drop-shadow font-sans leading-tight">
                      <AnimatedNumber
                        value={12596}
                        formatWithCommas={true}
                        suffix="+"
                        duration={2000}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white tracking-wide mt-0.5 font-sans">
                      Instagram
                    </div>
                  </div>

                  {/* Handle Pill at Bottom */}
                  <div className="w-full pb-0.5">
                    <div className="px-2 py-0.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 text-[10px] sm:text-[11px] font-bold text-white truncate group-hover:bg-black/50 transition-colors">
                      @_rcvlogs_ (Owner)
                    </div>
                  </div>
                </a>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
