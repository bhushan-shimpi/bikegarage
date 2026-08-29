import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const ServiceAreaSection: React.FC = () => {
  const nearbyTowns = [
    { name: 'Pahur (पहूर)', role: 'Primary Workshop Hub', distance: '0 km', desc: 'Full servicing, engine bay, ramp, and restoration centre on Main Road.' },
    { name: 'Jamner (जामनेर)', role: 'Taluka Headquarters', distance: '14 km', desc: 'Frequent daily servicing drop-offs and commuter bike tune-ups.' },
    { name: 'Shendurni (शेंदुर्णी)', role: 'Nearby Hub', distance: '18 km', desc: 'Regular customers for periodic service and chain/brake repairs.' },
    { name: 'Vakod (वाकोद)', role: 'Local Belt', distance: '10 km', desc: 'Quick turnaround for oil changes, minor repairs, and electrical checks.' },
    { name: 'Neri (नेरी)', role: 'Jalgaon Route', distance: '20 km', desc: 'Popular service stop for commuter motorcycles on the Jalgaon-Pahur road.' },
    { name: 'Fagne (फागणे)', role: 'Adjoining Belt', distance: '8 km', desc: 'Routine general service, clutch overhaul, and filter replacements.' },
  ];

  const regionalSpecialties = [
    {
      title: 'Complete 100cc & 150cc Bike Restoration',
      desc: 'Riders across Jalgaon, Bhusawal, Pachora, and Chalisgaon bring classic Splendors, Pulsars, and 2-stroke Yamaha RX100s for oven baked paint, ceramic coating, and factory rebuilds.',
    },
    {
      title: 'Full Engine Overhaul & Reboring',
      desc: 'Specialized engine rebuilds, crankshaft balancing, and cylinder boring using 100% genuine Hero, Bajaj, Honda, and Yamaha OEM spares with prior cost confirmation.',
    },
    {
      title: 'Open 7 Days with Online Booking',
      desc: 'Open Monday through Sunday from 9:00 AM to 8:00 PM so outstation riders can schedule weekend drop-offs and track work progress via WhatsApp job sheets.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#0E0E0E] text-white border-y border-[#202020] relative overflow-hidden" id="service-area">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F5B900]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full border border-[#F5B900]/30 bg-[#F5B900]/10 text-[#F5B900] text-xs font-black uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>REGIONAL SERVICE COVERAGE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-sans">
              SERVING RIDERS IN PAHUR, JAMNER &amp; JALGAON DISTRICT
            </h2>
            <div className="w-12 h-1 bg-[#F5B900] mx-auto mt-2 rounded-full" />

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto mt-3 leading-relaxed">
              Located on Main Road near Bus Stand in Pahur, Chaudhary Auto is the trusted two-wheeler garage for riders across Taluka Jamner and neighboring towns in the Jalgaon district.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column: Nearby Towns Grid + Regional Restoration Draw */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Immediate Towns Grid */}
          <ScrollReveal direction="left" className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Immediate Service Radius
              </span>
              <span className="text-[11px] text-neutral-400">Pahur &amp; Adjoining Tehsils</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nearbyTowns.map((town, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#F5B900]/50 transition-colors shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-white font-sans">
                        {town.name}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-[#F5B900] bg-[#F5B900]/10 px-2 py-0.5 rounded-full border border-[#F5B900]/20">
                        {town.distance}
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-neutral-400 block mb-1.5">
                      {town.role}
                    </span>

                    <p className="text-xs text-neutral-300 leading-snug">
                      {town.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Column: Why Riders Across Jalgaon District Visit Us */}
          <ScrollReveal direction="right" className="lg:col-span-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border border-[#292929] shadow-xl space-y-5">
              <div className="border-b border-neutral-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Wider District Destination
                </span>
                <h3 className="text-base sm:text-lg font-black uppercase text-white font-sans mt-1">
                  Why Outstation Riders Choose Pahur
                </h3>
              </div>

              <div className="space-y-4">
                {regionalSpecialties.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5B900] shrink-0" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-300 pl-3.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
                <Link to="/contact" className="w-full sm:flex-1">
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5B900] hover:bg-[#E5AC00] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </button>
                </Link>

                <Link to="/book-appointment" className="w-full sm:flex-1">
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#222222] hover:bg-[#2c2c2c] text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
