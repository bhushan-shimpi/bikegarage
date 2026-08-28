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
      followers: 23000,
      linkUrl: 'https://www.instagram.com/chaudhari_auto_pahur/',
      bgGradient:
        'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
      shadowColor: 'rgba(216, 41, 115, 0.4)',
      isInstagram: true,
    },
    {
      platform: 'Instagram',
      handle: '@_rcvlogs_',
      followers: 35000,
      linkUrl: 'https://www.instagram.com/_rcvlogs_/',
      bgGradient:
        'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
      shadowColor: 'rgba(216, 41, 115, 0.4)',
      isInstagram: true,
    },
    {
      platform: 'Facebook',
      handle: 'Chaudhari Auto',
      followers: 12596,
      linkUrl: 'https://www.facebook.com/search/top?q=chaudhari%20auto%20pahur',
      bgGradient:
        'linear-gradient(180deg, #BBE4F9 0%, #68B4FA 35%, #2563EB 75%, #1D4ED8 100%)',
      shadowColor: 'rgba(37, 99, 235, 0.4)',
      isInstagram: false,
    },
  ];

  return (
    <section className="my-5 sm:my-8 lg:my-10 bg-[#0B0B0B] text-white relative">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 relative z-10">
        
        {/* Equal 2-Column Split: 50% Stats on Left + 50% Social on Right (NO awkward center gap) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-stretch">
          
          {/* ─── LEFT: 2x2 Dark Rounded Stat Cards (Fills left 50% evenly) ─── */}
          <div className="w-full h-full">
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 h-full">
                {darkStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#181818] hover:bg-[#202020] border border-[#272727] hover:border-[#F5B900]/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center shadow-sm transition-all duration-300 hover:scale-[1.02] group min-h-[66px] sm:min-h-[72px]"
                  >
                    <div className="text-base sm:text-lg lg:text-xl font-black text-[#F5B900] font-sans tracking-tight leading-none group-hover:scale-105 transition-transform drop-shadow-[0_2px_6px_rgba(245,185,0,0.2)]">
                      <AnimatedNumber
                        value={item.value}
                        formatWithCommas={item.formatWithCommas}
                        suffix={item.suffix}
                        duration={1800}
                      />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-300 mt-1 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ─── RIGHT: 3 Social Media Cards (Fills right 50% evenly, perfectly aligned) ─── */}
          <div className="w-full h-full">
            <ScrollReveal direction="right">
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 h-full">
                {socialCards.map((card, idx) => (
                  <a
                    key={idx}
                    href={card.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col items-center justify-between h-[138px] sm:h-[148px] rounded-xl sm:rounded-2xl p-2 sm:p-2.5 text-white text-center shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 select-none overflow-hidden"
                    style={{
                      background: card.bgGradient,
                      boxShadow: `0 8px 22px -6px ${card.shadowColor}`,
                    }}
                    aria-label={`Follow ${card.handle} on ${card.platform}`}
                  >
                    {/* Subtle top reflective glare */}
                    <div className="absolute -top-8 -left-8 w-20 h-20 bg-white/20 rounded-full blur-md pointer-events-none" />

                    {/* Diagonal shimmer sheen on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                    {/* Icon at Top */}
                    <div className="pt-0.5">
                      {card.isInstagram ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow group-hover:scale-110 transition-transform"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                          <circle cx="12" cy="12" r="4.2" />
                          <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0866FF] flex items-center justify-center shadow-sm shadow-blue-800/30 group-hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white mt-0.5">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Followers Count & Label */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs xs:text-sm sm:text-base font-black text-white tracking-tight drop-shadow font-sans leading-none">
                        <AnimatedNumber
                          value={card.followers}
                          formatWithCommas={true}
                          suffix="+"
                          duration={1800}
                        />
                      </div>
                      <div className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold text-white tracking-wide mt-0.5 font-sans leading-none">
                        {card.platform}
                      </div>
                    </div>

                    {/* Handle Pill at Bottom */}
                    <div className="w-full pb-0.5 px-0.5">
                      <div className="px-1.5 py-0.5 rounded-full bg-black/35 backdrop-blur-sm border border-white/20 text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-white truncate group-hover:bg-black/50 transition-colors leading-none">
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
