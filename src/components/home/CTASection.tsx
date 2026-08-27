import React from 'react';
import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="bg-[#F5B900] text-black py-7 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: Icon + Content */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-black/10 flex items-center justify-center text-black shrink-0">
              <Bike className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black font-sans">
                NEED TWO-WHEELER SERVICE OR RESTORATION?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-black/85 mt-0.5">
                Send your bike service inquiry now and get prompt estimates from our master mechanics in Pahur.
              </p>
            </div>
          </div>

          {/* Right: Black Button */}
          <div className="shrink-0">
            <Link to="/inquiry">
              <button className="px-6 py-3 rounded-md bg-black hover:bg-neutral-900 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95">
                Send Enquiry
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
