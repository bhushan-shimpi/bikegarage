import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, Star, MapPin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#0B0B0B] overflow-hidden text-white">

      {/* ─── MOBILE: Full-screen overlay hero ─── */}
      <div className="block sm:hidden relative w-full" style={{ minHeight: '88vh' }}>
        {/* Background image fills entire mobile section */}
        <img
          src="/images/hero-bike.jpg"
          alt="Chaudhari Auto Centre Motorcycle Workshop"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark gradient: heavy at bottom so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

        {/* All content overlaid on image */}
        <div className="relative z-10 flex flex-col justify-between h-full" style={{ minHeight: '88vh' }}>

          {/* Top chips row */}
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-[#F5B900]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] font-bold text-[#F5B900] uppercase tracking-wider">Open Today</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
              <Star className="w-3 h-3 fill-[#F5B900] text-[#F5B900] shrink-0" />
              <span className="text-[10px] font-bold text-white">4.9 • 200+ Reviews</span>
            </div>
          </div>

          {/* Bottom content sits at the bottom of the full-screen hero */}
          <div className="px-4 pb-8 pt-6">
            {/* Location */}
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#F5B900] shrink-0" />
              <span className="text-xs text-neutral-300 font-medium">Pahur, Jalgaon, Maharashtra</span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.4rem] font-black uppercase tracking-tight text-white leading-[1.0] font-sans mb-2 drop-shadow-lg">
              EXPERT CARE<br />FOR YOUR BIKE
            </h1>

            {/* Yellow tagline */}
            <div className="text-sm font-extrabold uppercase tracking-widest text-[#F5B900] mb-3">
              Trusted Since 1994 — Pahur
            </div>

            {/* Marathi text */}
            <p className="text-[12px] text-neutral-300 leading-relaxed mb-5 max-w-xs">
              Regular servicing पासून Complete Bike Restoration पर्यंत — तुमच्या Bike ची संपूर्ण काळजी एकाच ठिकाणी.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-5">
              <Link to="/book-appointment" className="flex-1">
                <button className="w-full py-3.5 rounded-2xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#F5B900]/30 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Book Appointment</span>
                </button>
              </Link>
              <a
                href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/60 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2">
              {['30+ Yrs', 'Genuine Parts', 'All Bikes', 'Same Day'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[10px] font-semibold text-white/70 uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP: Side-by-side image + content ─── */}
      <div className="hidden sm:block relative">
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="max-w-xl">
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
