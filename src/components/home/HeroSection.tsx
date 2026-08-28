import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B0B0B] text-white overflow-hidden">
      {/* ─── DEDICATED MOBILE LAYOUT (< sm / 640px) ─── */}
      <div className="block sm:hidden w-full">
        {/* Motorcycle Visual Hero */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0B0B0B]">
          <img
            src="/images/hero-bike-mobile.jpg"
            alt="Royal Enfield Meteor 350 motorcycle at Chaudhari Auto Centre"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-contain object-center"
          />
          {/* Subtle directional fade at bottom into the content area */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
        </div>

        {/* Mobile Content Area */}
        <div className="px-5 xs:px-6 pt-1 pb-4 flex flex-col">
          {/* Live Workshop Open Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] xs:text-[11px] font-bold uppercase tracking-wider self-start animate-fade-in-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>LIVE: WORKSHOP OPEN TODAY</span>
          </div>

          {/* Eyebrow */}
          <p className="text-[#F5B900] text-xs font-bold uppercase tracking-[0.2em] mb-1.5 animate-fade-in-up">
            TRUSTED BIKE SERVICE SINCE 1994
          </p>

          {/* Main Heading */}
          <h1
            className="font-black uppercase tracking-tight text-white font-sans mb-2 animate-fade-in-up"
            style={{
              fontSize: 'clamp(2.2rem, 10.5vw, 3rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.03em',
              animationDelay: '100ms',
            }}
          >
            EXPERT CARE<br />FOR YOUR BIKE
          </h1>

          {/* Supporting Text with Marathi line */}
          <p className="text-neutral-200 text-sm font-medium leading-relaxed mb-1 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Professional two-wheeler service, repair &amp; restoration in Pahur.
          </p>
          <p className="text-neutral-400 text-xs xs:text-[13px] leading-relaxed mb-3.5 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
          </p>

          {/* Single-Row CTA Buttons on Mobile */}
          <div className="flex flex-row items-center gap-2 xs:gap-3 w-full animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link to="/book-appointment" className="flex-1">
              <button
                type="button"
                className="w-full min-h-[46px] px-2 xs:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] active:scale-[0.98] text-black font-extrabold text-[11px] xs:text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#F5B900]/20 flex items-center justify-center gap-1.5 xs:gap-2 relative overflow-hidden group"
              >
                <Calendar className="w-3.5 h-3.5 xs:w-4 xs:h-4 shrink-0" />
                <span className="whitespace-nowrap">BOOK A SERVICE</span>
              </button>
            </Link>

            <a
              href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[46px] px-2 xs:px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] active:scale-[0.98] text-white border border-neutral-700/80 hover:border-neutral-500 font-bold text-[11px] xs:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 xs:gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#25D366] shrink-0 animate-pulse" />
              <span className="whitespace-nowrap">WHATSAPP US</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP / TABLET COMPOSITION (>= sm / 640px) ─── */}
      <div className="hidden sm:flex relative min-h-[440px] lg:min-h-[490px] xl:min-h-[530px] items-center w-full">
        {/* Full-width motorcycle image positioned towards the right */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hero-bike.jpg"
            alt="Royal Enfield Meteor 350 motorcycle at Chaudhari Auto Centre"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[78%_center] lg:object-[82%_center] xl:object-[86%_center] brightness-105 contrast-105"
          />

          {/* Left-to-right directional gradient: dark on left for text readability, warm & open on right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #0B0B0B 0%, rgba(11,11,11,0.92) 26%, rgba(11,11,11,0.60) 42%, rgba(11,11,11,0.12) 62%, transparent 80%)',
            }}
          />

          {/* Subtle edge fades for seamless top/bottom integration */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0B0B0B]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
        </div>

        {/* Content container — aligned left, max-w-lg to prevent overlap with bike on right */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-6 lg:py-8 xl:py-10">
          <div className="max-w-lg lg:max-w-xl">
            {/* Live Workshop Open Status Pill on Desktop */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>LIVE: WORKSHOP OPEN TODAY • ACCEPTING APPOINTMENTS</span>
            </div>

            {/* Eyebrow */}
            <p className="text-[#F5B900] text-xs lg:text-sm font-bold uppercase tracking-[0.22em] mb-2 animate-fade-in-up">
              TRUSTED BIKE SERVICE SINCE 1994
            </p>

            {/* Main Heading */}
            <h1
              className="font-black uppercase tracking-tight text-white font-sans mb-3 animate-fade-in-up"
              style={{
                fontSize: 'clamp(2.8rem, 4.8vw, 4.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                animationDelay: '100ms',
              }}
            >
              EXPERT CARE<br />FOR YOUR BIKE
            </h1>

            {/* Supporting Text with Marathi line */}
            <p className="text-neutral-200 text-base lg:text-lg font-medium leading-relaxed mb-1 max-w-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Professional two-wheeler service, repair &amp; restoration in Pahur.
            </p>
            <p className="text-neutral-400 text-xs lg:text-sm leading-relaxed mb-5 max-w-md animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
            </p>

            {/* Inline Action Buttons */}
            <div className="flex flex-row items-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Link to="/book-appointment">
                <button
                  type="button"
                  className="min-h-[46px] px-7 py-3 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] active:scale-[0.98] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#F5B900]/20 flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 shrink-0 group-hover:rotate-12 transition-transform" />
                  <span className="whitespace-nowrap">BOOK A SERVICE</span>
                </button>
              </Link>

              <a
                href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] px-7 py-3 rounded-xl bg-black/40 hover:bg-white/10 active:scale-[0.98] text-white border border-white/25 hover:border-white/50 font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-sm flex items-center justify-center gap-2 group"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0 group-hover:scale-110 transition-transform animate-pulse" />
                <span className="whitespace-nowrap">WHATSAPP US</span>
              </a>
            </div>

            {/* Live Stats Pill with Animated Numbers */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-5 lg:gap-6 text-xs text-neutral-300 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <div className="flex items-center gap-2">
                <span className="text-[#F5B900] font-black text-base lg:text-lg font-sans">
                  <AnimatedNumber value={30} suffix="+" duration={1600} />
                </span>
                <span className="text-neutral-400 text-[10px] lg:text-[11px] uppercase tracking-wider font-bold">
                  Yrs in Pahur
                </span>
              </div>
              <span className="text-neutral-700">|</span>
              <div className="flex items-center gap-2">
                <span className="text-[#F5B900] font-black text-base lg:text-lg font-sans">
                  <AnimatedNumber value={10000} formatWithCommas={true} suffix="+" duration={2000} />
                </span>
                <span className="text-neutral-400 text-[10px] lg:text-[11px] uppercase tracking-wider font-bold">
                  Happy Riders
                </span>
              </div>
              <span className="text-neutral-700">|</span>
              <div className="flex items-center gap-1.5 text-[#F5B900] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#F5B900]" />
                <span className="text-white font-black text-sm">4.9/5</span>
                <span className="text-neutral-400 text-[10px] lg:text-[11px] uppercase tracking-wider font-bold">
                  Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
