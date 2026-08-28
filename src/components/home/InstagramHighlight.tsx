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
      value: 30,
      formatWithCommas: false,
      suffix: '+',
      label: 'Years of Experience',
    },
  ];

  const socialCards = [
    {
      platform: 'Instagram',
      handle: '@chaudhari_auto_pahur',
      tag: 'Workshop',
      followers: 23000,
      linkUrl: 'https://www.instagram.com/chaudhari_auto_pahur/',
      bgGradient:
        'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
      shadowColor: 'rgba(216, 41, 115, 0.45)',
      isInstagram: true,
    },
    {
      platform: 'Instagram',
      handle: '@_rcvlogs_',
      tag: 'Owner Vlogs',
      followers: 35000,
      linkUrl: 'https://www.instagram.com/_rcvlogs_/',
      bgGradient:
        'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
      shadowColor: 'rgba(216, 41, 115, 0.45)',
      isInstagram: true,
    },
    {
      platform: 'Facebook',
      handle: 'Chaudhari Auto',
      tag: 'Official Page',
      followers: 12596,
      linkUrl: 'https://www.facebook.com/search/top?q=chaudhari%20auto%20pahur',
      bgGradient:
        'linear-gradient(180deg, #BBE4F9 0%, #68B4FA 35%, #2563EB 75%, #1D4ED8 100%)',
      shadowColor: 'rgba(37, 99, 235, 0.45)',
      isInstagram: false,
    },
  ];

  return (
    <section className="py-6 sm:py-9 bg-black text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#E1306C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* Main Combined Grid: 2x2 Stats on Left + 3 Social Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          
          {/* ─── LEFT COLUMN: 2x2 Dark Rounded Stat Cards (Compact & Enhanced) ─── */}
          <div className="lg:col-span-5 w-full">
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

          {/* ─── RIGHT COLUMN: 3 Compact Social Media Cards (2 Instagram + 1 Facebook) ─── */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <ScrollReveal direction="right">
              <div className="grid grid-cols-3 gap-2 sm:gap-3.5 w-full max-w-xl">
                {socialCards.map((card, idx) => (
                  <a
                    key={idx}
                    href={card.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center justify-between h-[180px] xs:h-[195px] sm:h-[215px] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 text-white text-center shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 select-none overflow-hidden"
                    style={{
                      background: card.bgGradient,
                      boxShadow: `0 12px 28px -8px ${card.shadowColor}`,
                    }}
                    aria-label={`Follow ${card.handle} on ${card.platform}`}
                  >
                    {/* Subtle top glare */}
                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/25 rounded-full blur-lg pointer-events-none" />

                    {/* Diagonal shimmer sheen on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                    {/* Icon at Top */}
                    <div className="pt-1">
                      {card.isInstagram ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-7 h-7 sm:w-10 sm:h-10 text-white drop-shadow group-hover:scale-110 transition-transform"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                          <circle cx="12" cy="12" r="4.2" />
                          <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                        </svg>
                      ) : (
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#0866FF] flex items-center justify-center shadow-md shadow-blue-800/30 group-hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 text-white mt-0.5">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Followers Count & Label */}
                    <div className="flex flex-col items-center px-1">
                      <div className="text-sm xs:text-base sm:text-xl font-black text-white tracking-tight drop-shadow font-sans leading-tight">
                        <AnimatedNumber
                          value={card.followers}
                          formatWithCommas={true}
                          suffix="+"
                          duration={2000}
                        />
                      </div>
                      <div className="text-[11px] xs:text-xs sm:text-sm font-bold text-white tracking-wide mt-0.5 font-sans">
                        {card.platform}
                      </div>
                    </div>

                    {/* Handle Pill at Bottom */}
                    <div className="w-full pb-0.5 px-0.5">
                      <div className="px-1.5 py-0.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 text-[9px] xs:text-[10px] sm:text-[11px] font-bold text-white truncate group-hover:bg-black/50 transition-colors">
                        {card.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
