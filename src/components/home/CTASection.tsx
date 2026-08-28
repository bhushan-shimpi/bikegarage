import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Calendar, MessageSquare } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const CTASection: React.FC = () => {
  return (
    <section className="bg-[#F5B900] text-black py-8 sm:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Icon + Content */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center text-black shrink-0">
                <Bike className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black font-sans">
                  NEED TWO-WHEELER SERVICE OR RESTORATION?
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-black/85 mt-0.5">
                  Book a service slot or submit your inquiry to get an honest estimate from master mechanics in Pahur.
                </p>
              </div>
            </div>

            {/* Right: Unified Action Buttons in ONE ROW on mobile */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto shrink-0">
              <Link to="/book-appointment" className="flex-1 md:flex-initial">
                <button className="w-full px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-lg bg-black hover:bg-neutral-900 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5B900] shrink-0" />
                  <span>Book Appointment</span>
                </button>
              </Link>

              <a
                href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-lg bg-black/10 hover:bg-black/20 text-black border border-black/30 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-800 shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
