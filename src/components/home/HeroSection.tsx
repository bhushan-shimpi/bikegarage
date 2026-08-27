import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B0B0B] text-white overflow-hidden">
      {/* ─── DEDICATED MOBILE LAYOUT (< sm / 640px) ─── */}
      <div className="block sm:hidden w-full">
        {/* Motorcycle Visual Hero — Positioned higher to eliminate empty top black gap */}
        <div className="relative w-full h-[220px] xs:h-[240px] overflow-hidden bg-[#0B0B0B]">
          <img
            src="/images/hero-bike.jpg"
            alt="Royal Enfield Classic 350 motorcycle at Chaudhari Auto Centre"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[center_32%] scale-105 brightness-110 contrast-105"
          />
          {/* Subtle directional fade at bottom into the content area */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Mobile Content Area — Tightened vertical padding */}
        <div className="px-5 xs:px-6 pt-2 pb-5 flex flex-col">
          {/* Eyebrow */}
          <p className="text-[#F5B900] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            TRUSTED BIKE SERVICE SINCE 1994
          </p>

          {/* Main Heading */}
          <h1
            className="font-black uppercase tracking-tight text-white font-sans mb-2.5"
            style={{
              fontSize: 'clamp(2.35rem, 11vw, 3.25rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.03em',
            }}
          >
            EXPERT CARE<br />FOR YOUR BIKE
          </h1>

          {/* Supporting Text with Marathi line */}
          <p className="text-neutral-200 text-sm font-medium leading-relaxed mb-1">
            Professional two-wheeler service, repair &amp; restoration in Pahur.
          </p>
          <p className="text-neutral-400 text-xs xs:text-[13px] leading-relaxed mb-4">
            Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
          </p>

          {/* Single-Row CTA Buttons on Mobile */}
          <div className="flex flex-row items-center gap-2 xs:gap-3 w-full">
            <Link to="/book-appointment" className="flex-1">
              <button
                type="button"
                className="w-full min-h-[46px] px-2 xs:px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] active:scale-[0.98] text-black font-extrabold text-[11px] xs:text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#F5B900]/20 flex items-center justify-center gap-1.5 xs:gap-2"
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
              <MessageSquare className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#25D366] shrink-0" />
              <span className="whitespace-nowrap">WHATSAPP US</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP / TABLET COMPOSITION (>= sm / 640px) ─── */}
      <div className="hidden sm:flex relative min-h-[500px] lg:min-h-[550px] xl:min-h-[580px] items-center w-full">
        {/* Full-width motorcycle image with directional linear gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hero-bike.jpg"
            alt="Royal Enfield Classic 350 motorcycle at Chaudhari Auto Centre"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[72%_32%] lg:object-[right_28%] scale-105 brightness-110 contrast-105"
          />

          {/* Left-to-right directional gradient: dark on left for text readability, clear on right for bike details */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #0B0B0B 0%, rgba(11,11,11,0.96) 28%, rgba(11,11,11,0.80) 45%, rgba(11,11,11,0.22) 68%, transparent 92%)',
            }}
          />

          {/* Edge fades for seamless top/bottom integration */}
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0B0B0B]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
        </div>

        {/* Content container — aligned left, vertically centered */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-10 lg:py-14">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <p className="text-[#F5B900] text-xs lg:text-sm font-bold uppercase tracking-[0.22em] mb-2.5">
              TRUSTED BIKE SERVICE SINCE 1994
            </p>

            {/* Main Heading */}
            <h1
              className="font-black uppercase tracking-tight text-white font-sans mb-3.5"
              style={{
                fontSize: 'clamp(3rem, 5.2vw, 4.8rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
              }}
            >
              EXPERT CARE<br />FOR YOUR BIKE
            </h1>

            {/* Supporting Text with Marathi line */}
            <p className="text-neutral-200 text-base lg:text-lg font-medium leading-relaxed mb-1 max-w-lg">
              Professional two-wheeler service, repair &amp; restoration in Pahur.
            </p>
            <p className="text-neutral-400 text-xs lg:text-sm leading-relaxed mb-6 max-w-lg">
              Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
            </p>

            {/* Inline Action Buttons */}
            <div className="flex flex-row items-center gap-4">
              <Link to="/book-appointment">
                <button
                  type="button"
                  className="min-h-[46px] px-7 py-3 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] active:scale-[0.98] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#F5B900]/20 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">BOOK A SERVICE</span>
                </button>
              </Link>

              <a
                href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] px-7 py-3 rounded-xl bg-black/40 hover:bg-white/10 active:scale-[0.98] text-white border border-white/25 hover:border-white/50 font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="whitespace-nowrap">WHATSAPP US</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
