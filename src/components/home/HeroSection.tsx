import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[440px] lg:min-h-[500px] flex items-center bg-[#0B0B0B] overflow-hidden">
      {/* Background Image with local instant loading & dark overlay */}
      <div className="absolute inset-0 z-0 bg-[#0E0E0E]">
        <img
          src="/images/hero-bike.jpg"
          alt="Chaudhari Auto Bike Workshop"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-right lg:object-center brightness-90 contrast-125 transition-opacity duration-300"
        />
        {/* Dark gradient overlay for instant readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent lg:via-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-12 sm:pt-9 sm:pb-14 lg:pt-10 lg:pb-16 w-full">
        <div className="max-w-xl">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none font-sans mb-2.5">
            EXPERT CARE <br />
            FOR YOUR BIKE
          </h1>

          {/* Subtitle */}
          <div className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#F5B900] mb-3">
            CHAUDHARI AUTO, PAHUR
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-3 max-w-md">
            Professional two-wheeler service, repair, and complete bike restoration since 1994.
          </p>

          <p className="text-[11px] sm:text-xs text-[#F5B900] font-medium mb-6">
            Regular servicing पासून Complete Bike Restoration पर्यंत — ३० वर्षांची अखंड विश्वासार्हता!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/inquiry">
              <button className="px-5 py-2.5 rounded-md bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95">
                Send Enquiry
              </button>
            </Link>

            <a
              href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto,%20I%20want%20to%20inquire%20about%20bike%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-md bg-transparent hover:bg-white/10 text-white border border-white/60 font-bold text-xs uppercase tracking-wider transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
