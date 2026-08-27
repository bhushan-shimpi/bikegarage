import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B0B0B] text-white overflow-hidden">
      {/* ─── MOBILE COMPOSITION (< sm / 640px) ─── */}
      <div className="block sm:hidden w-full">
        {/* Top Part: Large Motorcycle Hero Image */}
        <div className="relative w-full h-[240px] xs:h-[270px] overflow-hidden bg-[#0B0B0B]">
          <img
            src="/images/hero-bike.jpg"
            alt="Royal Enfield Classic 350 motorcycle at Chaudhari Auto Centre"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center brightness-105 contrast-105"
          />
          {/* Bottom fade into content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Bottom Part: Content */}
        <div className="px-5 xs:px-6 pt-3 pb-5 flex flex-col">
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

      {/* ─── DESKTOP / TABLET: 2-PART COMPOSITION (>= sm / 640px) ─── */}
      <div className="hidden sm:block relative">
        {/* Subtle warm ambient glow behind the bike */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* ─── PART 1: Left Content Side (5 cols) ─── */}
            <div className="lg:col-span-5 flex flex-col justify-center z-10">
              {/* Eyebrow */}
              <p className="text-[#F5B900] text-xs lg:text-sm font-bold uppercase tracking-[0.22em] mb-2.5">
                TRUSTED BIKE SERVICE SINCE 1994
              </p>

              {/* Main Heading */}
              <h1
                className="font-black uppercase tracking-tight text-white font-sans mb-3.5"
                style={{
                  fontSize: 'clamp(2.6rem, 4.2vw, 4.2rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                }}
              >
                EXPERT CARE<br />FOR YOUR BIKE
              </h1>

              {/* Supporting Text with Marathi line */}
              <p className="text-neutral-200 text-sm lg:text-base font-medium leading-relaxed mb-1.5 max-w-lg">
                Professional two-wheeler service, repair &amp; restoration in Pahur.
              </p>
              <p className="text-neutral-400 text-xs lg:text-[13px] leading-relaxed mb-6 max-w-lg">
                Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
              </p>

              {/* Inline Action Buttons */}
              <div className="flex flex-row items-center gap-3.5">
                <Link to="/book-appointment">
                  <button
                    type="button"
                    className="min-h-[48px] px-6 lg:px-7 py-3 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] active:scale-[0.98] text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#F5B900]/20 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">BOOK A SERVICE</span>
                  </button>
                </Link>

                <a
                  href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-6 lg:px-7 py-3 rounded-xl bg-[#141414] hover:bg-[#1f1f1f] active:scale-[0.98] text-white border border-neutral-700/80 hover:border-neutral-500 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span className="whitespace-nowrap">WHATSAPP US</span>
                </a>
              </div>
            </div>

            {/* ─── PART 2: Right Large Motorcycle Visual (7 cols) ─── */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/80 group">
                <img
                  src="/images/hero-bike.jpg"
                  alt="Royal Enfield Classic 350 motorcycle at Chaudhari Auto Centre"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                {/* Subtle luxury edge vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
