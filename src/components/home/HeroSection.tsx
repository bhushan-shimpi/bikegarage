import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, MapPin, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B0B0B] overflow-hidden text-white -mt-14 sm:-mt-16">
      {/* ─── MOBILE LAYOUT ─── */}
      <div className="block sm:hidden">
        {/* Full-bleed hero image with strong gradient overlay */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src="/images/hero-bike.jpg"
            alt="Chaudhari Auto Centre Motorcycle Workshop"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105 brightness-90"
          />
          {/* Bottom-heavy fade so text underneath stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-transparent" />

          {/* Floating badge on the image */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-[#F5B900]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-[#F5B900] uppercase tracking-wider">Open Today</span>
          </div>

          {/* Rating chip */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/20">
            <Star className="w-3 h-3 fill-[#F5B900] text-[#F5B900]" />
            <span className="text-[10px] font-bold text-white">4.9 • 200+ Reviews</span>
          </div>
        </div>

        {/* Mobile content below image */}
        <div className="px-4 pt-4 pb-8">
          {/* Location line */}
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#F5B900] shrink-0" />
            <span className="text-[11px] text-neutral-400 font-medium">Pahur, Jalgaon, Maharashtra</span>
          </div>

          {/* Tagline pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full border border-[#F5B900]/40 bg-[#F5B900]/10">
            <span className="text-[10px] font-black text-[#F5B900] uppercase tracking-widest">
              CHAUDHARI AUTO CENTRE • PAHUR
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-[2rem] font-black uppercase tracking-tight text-white leading-[1.05] font-sans mb-2">
            EXPERT CARE<br />FOR YOUR BIKE
          </h1>

          {/* Yellow sub-tagline */}
          <div className="text-sm font-extrabold uppercase tracking-wider text-[#F5B900] mb-3">
            Trusted Bike Service Since 1994
          </div>

          {/* Marathi text */}
          <p className="text-[12px] text-neutral-400 leading-relaxed mb-5">
            Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
          </p>

          {/* CTA Buttons — single row */}
          <div className="flex gap-2.5 mb-5">
            <Link to="/book-appointment" className="flex-1">
              <button className="w-full py-3 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#F5B900]/25 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Book Appointment</span>
              </button>
            </Link>

            <a
              href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-[#0D2318] hover:bg-emerald-800 text-emerald-400 border border-emerald-900 hover:border-emerald-600 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Quick trust pills */}
          <div className="flex flex-wrap gap-2">
            {['30+ Yrs Experience', 'Genuine Parts', 'All Bike Models', 'Same Day Service'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-[#161616] border border-[#2A2A2A] text-[10px] font-semibold text-neutral-400 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT ─── */}
      <div className="hidden sm:block relative">
        {/* Desktop full background image */}
        <div className="absolute inset-0 z-0 bg-[#0E0E0E]">
          <img
            src="/images/hero-bike.jpg"
            alt="Chaudhari Auto Centre Bike Workshop"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-right lg:object-center brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent lg:via-black/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Desktop Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="max-w-xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded border border-[#F5B900]/40 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-wider">
              <span>CHAUDHARI AUTO CENTRE</span>
              <span>•</span>
              <span>PAHUR</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none font-sans mb-3">
              EXPERT CARE <br />
              FOR YOUR BIKE
            </h1>

            <div className="text-base font-bold uppercase tracking-wider text-[#F5B900] mb-3">
              Trusted Bike Service Since 1994
            </div>

            <p className="text-sm text-neutral-300 font-medium leading-relaxed mb-6 max-w-lg">
              Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
            </p>

            <div className="flex flex-row items-center gap-3">
              <Link to="/book-appointment">
                <button className="px-6 py-3 rounded-lg bg-[#F5B900] hover:bg-[#DFA500] text-black font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Book Appointment</span>
                </button>
              </Link>

              <a
                href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-transparent hover:bg-white/10 text-white border border-white/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
