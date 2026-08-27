import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1C1C1C] text-neutral-400 pt-12 pb-16 lg:pb-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#1C1C1C]">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex flex-col">
              <span className="text-base font-black text-white uppercase tracking-tight font-sans">
                CHAUDHARI AUTO
              </span>
              <span className="text-xs font-black tracking-[0.25em] text-[#F5B900] uppercase">
                PAHUR
              </span>
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
                <Link to="/inquiry" className="hover:text-[#F5B900] transition-colors">
                  Send Enquiry / Quote
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5B900] transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Two-Wheeler Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3.5">
              Bike Services
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  General Bike Service
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  Engine Repair & Rebuild
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  Brake Service & Disc Tuning
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  Carburetor & FI Tuning
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  Foam Washing & Detailing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  Complete Bike Restoration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3.5">
              Workshop Contact
            </h4>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Phone className="w-3.5 h-3.5 text-[#F5B900] shrink-0" />
              <a href="tel:+919822000000" className="hover:text-white">
                +91 98220 00000 / 12345 67890
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
              <span>Main Road, Near Old Bus Stand, Pahur, Maharashtra - 425101</span>
            </div>

            {/* Social Icons row */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://wa.me/919822000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded bg-[#1C1C1C] hover:bg-[#F5B900] hover:text-black flex items-center justify-center text-neutral-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded bg-[#1C1C1C] hover:bg-[#F5B900] hover:text-black flex items-center justify-center text-neutral-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded bg-[#1C1C1C] hover:bg-[#F5B900] hover:text-black flex items-center justify-center text-neutral-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 text-center text-neutral-500 text-[11px]">
          © 2024 Chaudhari Auto, Pahur. All Rights Reserved. Two-Wheeler Workshop Established 1994.
        </div>
      </div>
    </footer>
  );
};
