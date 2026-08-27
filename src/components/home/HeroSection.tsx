import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B0B0B] overflow-hidden text-white">
      {/* Mobile Top Image */}
      <div className="block sm:hidden relative h-56 w-full overflow-hidden">
        <img
          src="/images/hero-bike.jpg"
          alt="Chaudhari Auto Centre Motorcycle Workshop"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
      </div>

      {/* Desktop Background Image with Overlay */}
      <div className="hidden sm:block absolute inset-0 z-0 bg-[#0E0E0E]">
        <img
          src="/images/hero-bike.jpg"
          alt="Chaudhari Auto Centre Bike Workshop"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-right lg:object-center brightness-90 contrast-125 transition-opacity duration-300"
        />
        {/* Dark gradient overlay for crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent lg:via-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 w-full">
        <div className="max-w-xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded border border-[#F5B900]/40 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-wider">
            <span>CHAUDHARI AUTO CENTRE</span>
            <span>•</span>
            <span>PAHUR</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none font-sans mb-3">
            EXPERT CARE <br />
            FOR YOUR BIKE
          </h1>

          {/* Subtitle / Tagline */}
          <div className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#F5B900] mb-3">
            Trusted Bike Service Since 1994
          </div>

          {/* Marathi Supporting Text */}
          <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed mb-6 max-w-lg">
            Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link to="/book-appointment" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#F5B900] hover:bg-[#DFA500] text-black font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Book Appointment / Enquiry</span>
              </button>
            </Link>

            <a
              href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-transparent hover:bg-white/10 text-white border border-white/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
