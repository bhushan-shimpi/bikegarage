import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation } from 'lucide-react';

export const HomeContactSnippet: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#0B0B0B] text-white" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                Visit Our Workshop
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-wide text-white font-sans mt-1">
                CONTACT & LOCATION
              </h2>
              <div className="w-12 h-1 bg-[#F5B900] mt-2 rounded-full" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Conveniently located on the main road in Pahur. Bring your bike for routine servicing, breakdown diagnosis, or vintage restoration consultation.
            </p>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                <MapPin className="w-5 h-5 text-[#F5B900] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Chaudhari Auto</span>
                  <span className="text-neutral-400">Pahur, Pahur Peth, Tal. Jamner, Dist. Jalgaon, Maharashtra 424205</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                  <Phone className="w-4 h-4 text-[#F5B900] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Call Helpline</span>
                    <a href="tel:+917387448878" className="font-bold text-white hover:text-[#F5B900]">
                      +91 73874 48878
                    </a>
                    <span className="text-neutral-500 mx-1">/</span>
                    <a href="tel:+919503853143" className="font-bold text-white hover:text-[#F5B900]">
                      +91 95038 53143
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                  <Clock className="w-4 h-4 text-[#F5B900] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Working Hours</span>
                    <span className="font-bold text-white">9:00 AM – 8:00 PM (Daily)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:+917387448878"
                className="px-5 py-2.5 rounded-lg bg-[#F5B900] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#DFA500] transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>

              <a
                href="https://wa.me/917387448878?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://maps.google.com/?q=Pahur,Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#181818] border border-[#333333] text-neutral-200 font-bold text-xs uppercase tracking-wider hover:text-white hover:border-neutral-400 transition-colors flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#F5B900]" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right: Google Maps Embed Frame */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#2B2B2B] shadow-2xl h-80 sm:h-96 w-full bg-[#1A1A1A] relative">
              <iframe
                title="Chaudhari Auto Pahur Location"
                src="https://maps.google.com/maps?q=20.713726,75.682441&t=&z=17&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
