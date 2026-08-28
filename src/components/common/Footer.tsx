import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1C1C1C] text-neutral-400 pt-10 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#1C1C1C]">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Chaudhari Auto Centre Logo"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-base font-black text-white uppercase tracking-tight font-sans">
                  CHAUDHARI AUTO CENTRE
                </span>
                <span className="text-xs font-black tracking-[0.25em] text-[#F5B900] uppercase mt-0.5">
                  PAHUR • EST. 1994
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 leading-relaxed text-xs pr-4">
              Trusted two-wheeler bike service, repair and complete bike restoration centre in Pahur, Maharashtra since 1994.
            </p>
            <p className="text-[11px] text-[#F5B900] font-medium">
              ३० वर्षांची अखंड परंपरा — प्रामाणिक सेवा, दर्जेदार काम आणि अमूल्य विश्वास!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/" className="hover:text-[#F5B900] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  Bike Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F5B900] transition-colors">
                  About Us (Since 1994)
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-[#F5B900] transition-colors">
                  Book / Enquire
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5B900] transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3.5">
              Workshop Contact
            </h4>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Phone className="w-3.5 h-3.5 text-[#F5B900] shrink-0" />
              <a href="tel:+919822000000" className="hover:text-white">
                +91 98220 00000
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Mail className="w-3.5 h-3.5 text-[#F5B900] shrink-0" />
              <a href="mailto:chaudhariautopahur@gmail.com" className="hover:text-white">
                chaudhariautopahur@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-[#F5B900] shrink-0 mt-0.5" />
              <span>Main Road, Near Bus Stand, Pahur, Dist. Jalgaon, Maharashtra 424205</span>
            </div>

            {/* Social Icons row */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://wa.me/919822000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-[#1C1C1C] hover:bg-[#25D366] hover:text-white flex items-center justify-center text-neutral-300 transition-all hover:scale-110"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Instagram Official Icon with gradient */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                title="Follow Chaudhari Auto on Instagram"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center transition-all hover:scale-110 shadow-md shadow-pink-900/30"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <span className="text-[11px] text-neutral-400 font-medium ml-1">
                @chaudhariautocentre
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 text-center text-neutral-500 text-[11px]">
          © 2026 Chaudhari Auto Centre, Pahur. All Rights Reserved. Trusted Bike Service Since 1994.
        </div>
      </div>
    </footer>
  );
};
