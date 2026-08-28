import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
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
      value: 30,
      formatWithCommas: false,
      suffix: '+',
      label: 'Years of Experience',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-black text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#E1306C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Combined Grid: 2x2 Stats on Left + 3 Social Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ─── LEFT COLUMN: 2x2 Dark Rounded Stat Cards ─── */}
          <div className="lg:col-span-6 w-full">
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 gap-3.5 sm:gap-5 w-full">
                {darkStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#242424] hover:bg-[#2B2B2B] border border-[#333333] hover:border-[#F5B900]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col items-center justify-center text-center shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="text-2xl xs:text-3xl sm:text-4xl font-black text-[#F5B900] font-sans tracking-tight leading-none group-hover:scale-105 transition-transform drop-shadow-[0_2px_8px_rgba(245,185,0,0.25)]">
                      <AnimatedNumber
                        value={item.value}
                        formatWithCommas={item.formatWithCommas}
                        suffix={item.suffix}
                        duration={2000}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-300 mt-2.5 sm:mt-3 leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ─── RIGHT COLUMN: 3 Vertical Social Media Cards ─── */}
          <div className="lg:col-span-6 w-full">
            <ScrollReveal direction="right">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
                
                {/* 1. YouTube Card */}
                <a
                  href="https://www.instagram.com/_rcvlogs_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-between aspect-[1/1.65] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 text-white text-center shadow-xl transition-all duration-500 hover:scale-105 select-none overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(180deg, #FFAAA6 0%, #FF8585 45%, #FF7070 100%)',
                    boxShadow: '0 15px 35px -10px rgba(255, 112, 112, 0.45)',
                  }}
                  aria-label="YouTube Channel"
                >
                  {/* Subtle top glare */}
                  <div className="absolute -top-16 -left-16 w-36 h-36 bg-white/25 rounded-full blur-xl pointer-events-none" />

                  {/* Icon at Top */}
                  <div className="pt-2 sm:pt-4">
                    <div className="w-12 h-8 sm:w-16 sm:h-11 rounded-xl sm:rounded-2xl bg-red-600 flex items-center justify-center shadow-md shadow-red-700/30 group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-y-[5px] sm:border-y-[7px] border-y-transparent border-l-[9px] sm:border-l-[13px] border-l-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="pb-1 sm:pb-2 flex flex-col items-center">
                    <div className="text-base xs:text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow font-sans leading-tight">
                      <AnimatedNumber
                        value={2110000}
                        formatWithCommas={true}
                        suffix="+"
                        duration={2000}
                      />
                    </div>
                    <div className="text-xs xs:text-sm sm:text-lg font-bold text-white tracking-wide mt-0.5 sm:mt-1 font-sans">
                      YouTube
                    </div>
                  </div>
                </a>

                {/* 2. Instagram Card (Highlighted) */}
                <a
                  href="https://www.instagram.com/chaudhari_auto_pahur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-between aspect-[1/1.65] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 text-white text-center shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 select-none overflow-hidden animate-insta-card"
                  style={{
                    background:
                      'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
                    boxShadow: '0 20px 45px -10px rgba(216, 41, 115, 0.55)',
                  }}
                  aria-label="Follow @chaudhari_auto_pahur on Instagram"
                >
                  {/* Subtle top glare */}
                  <div className="absolute -top-16 -left-16 w-36 h-36 bg-white/25 rounded-full blur-xl pointer-events-none" />

                  {/* Diagonal shimmer sheen on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Icon at Top */}
                  <div className="pt-1.5 sm:pt-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-10 h-10 sm:w-16 sm:h-16 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                      <circle cx="12" cy="12" r="4.2" />
                      <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                    </svg>
                  </div>

                  {/* Bottom Text */}
                  <div className="pb-1 sm:pb-2 flex flex-col items-center">
                    <div className="text-base xs:text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow font-sans leading-tight">
                      <AnimatedNumber
                        value={1400000}
                        formatWithCommas={true}
                        suffix="+"
                        duration={2200}
                      />
                    </div>
                    <div className="text-xs xs:text-sm sm:text-lg font-bold text-white tracking-wide mt-0.5 sm:mt-1 font-sans">
                      Instagram
                    </div>
                  </div>
                </a>

                {/* 3. Facebook Card */}
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-between aspect-[1/1.65] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 text-white text-center shadow-xl transition-all duration-500 hover:scale-105 select-none overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(180deg, #BBE4F9 0%, #68B4FA 35%, #2563EB 75%, #1D4ED8 100%)',
                    boxShadow: '0 15px 35px -10px rgba(37, 99, 235, 0.45)',
                  }}
                  aria-label="Facebook Page"
                >
                  {/* Subtle top glare */}
                  <div className="absolute -top-16 -left-16 w-36 h-36 bg-white/25 rounded-full blur-xl pointer-events-none" />

                  {/* Icon at Top */}
                  <div className="pt-2 sm:pt-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#0866FF] flex items-center justify-center shadow-md shadow-blue-800/30 group-hover:scale-110 transition-transform">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white mt-1"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="pb-1 sm:pb-2 flex flex-col items-center">
                    <div className="text-base xs:text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow font-sans leading-tight">
                      <AnimatedNumber
                        value={2250000}
                        formatWithCommas={true}
                        suffix="+"
                        duration={2400}
                      />
                    </div>
                    <div className="text-xs xs:text-sm sm:text-lg font-bold text-white tracking-wide mt-0.5 sm:mt-1 font-sans">
                      Facebook
                    </div>
                  </div>
                </a>

              </div>
            </ScrollReveal>

            {/* Direct Profile Links Bar below the social cards */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
              <a
                href="https://www.instagram.com/chaudhari_auto_pahur/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181818] hover:bg-[#222222] border border-[#E1306C]/40 text-neutral-200 hover:text-white font-bold transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                <span>@chaudhari_auto_pahur</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>

              <a
                href="https://www.instagram.com/_rcvlogs_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181818] hover:bg-[#222222] border border-[#F5B900]/40 text-neutral-200 hover:text-white font-bold transition-colors"
              >
                <Sparkles className="w-3 h-3 text-[#F5B900]" />
                <span>@_rcvlogs_ (Owner Moto Vlogs)</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
