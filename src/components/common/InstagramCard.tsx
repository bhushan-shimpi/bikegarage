import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

interface InstagramCardProps {
  followersCount?: number;
  handle?: string;
  linkUrl?: string;
  className?: string;
}

export const InstagramCard: React.FC<InstagramCardProps> = ({
  followersCount = 1400000,
  handle = '@chaudhari_auto_pahur',
  linkUrl = 'https://www.instagram.com/chaudhari_auto_pahur/',
  className = '',
}) => {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block w-full max-w-[280px] xs:max-w-[300px] aspect-[1/1.7] rounded-[32px] p-7 text-white text-center shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 select-none overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(180deg, #3754db 0%, #8736bb 28%, #d82973 52%, #f25537 76%, #ffb648 100%)',
        boxShadow:
          '0 20px 45px -10px rgba(216, 41, 115, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.18)',
      }}
      aria-label="Follow @chaudhari_auto_pahur on Instagram"
    >
      {/* Glossy top reflective glare */}
      <div className="absolute -top-24 -left-24 w-56 h-56 bg-white/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Diagonal animated shimmer sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Card Content arranged vertically */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-2">
        {/* Top: Live Instagram Camera Icon */}
        <div className="pt-3 flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[26px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </div>
            {/* Ambient pulse halo behind icon */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-75 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
          </div>
        </div>

        {/* Bottom Section: Follower Counter & Instagram Label */}
        <div className="pb-2 flex flex-col items-center w-full">
          {/* Animated Number Counter */}
          <div className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] font-sans">
            <AnimatedNumber
              value={followersCount}
              formatWithCommas={true}
              suffix="+"
              duration={2200}
            />
          </div>

          {/* Instagram Label */}
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mt-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] font-sans">
            Instagram
          </div>

          {/* Handle / Tap pill */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/25 text-[11px] font-bold text-white tracking-wide uppercase group-hover:bg-black/40 group-hover:border-white/40 transition-all">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>{handle}</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </a>
  );
};
