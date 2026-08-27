import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Calendar, MessageSquare } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="bg-[#F5B900] text-black py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Right: Unified Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/book-appointment">
              <button className="px-6 py-3.5 rounded-lg bg-black hover:bg-neutral-900 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F5B900]" />
                <span>Book Appointment & Enquiry</span>
              </button>
            </Link>

            <a
              href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-lg bg-black/10 hover:bg-black/20 text-black border border-black/30 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-800" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
