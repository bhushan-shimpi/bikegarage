import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { PageBanner } from '../../components/common/PageBanner';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col justify-between">
      <div>
        {/* Top Banner */}
        <PageBanner title="CONTACT US" breadcrumb="Contact Us" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Get In Touch */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-xl font-black uppercase text-gray-900 font-sans tracking-tight">
                  Get In Touch
                </h2>

                <div className="space-y-5 text-xs text-gray-700">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Phone</span>
                      <a href="tel:+911234567890" className="text-gray-600 hover:text-black mt-0.5 block">
                        +91 12345 67890 / 98220 00000
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Email</span>
                      <a href="mailto:chaudhariautopahur@gmail.com" className="text-gray-600 hover:text-black mt-0.5 block">
                        chaudhariautopahur@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Address</span>
                      <span className="text-gray-600 mt-0.5 block">
                        Pahur, Jalgaon, Maharashtra - 425101
                      </span>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFF9E6] border border-[#F5B900] flex items-center justify-center text-[#DFA500] shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block">Working Hours</span>
                      <span className="text-gray-600 mt-0.5 block">
                        Mon - Sat: 9:00 AM - 7:00 PM <br />
                        Sunday: 9:00 AM - 2:00 PM
                      </span>
                    </div>
                  </div>

                  {/* Follow Us */}
                  <div className="pt-2">
                    <span className="font-bold text-gray-900 block mb-2">Follow Us</span>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://wa.me/919822000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#F5B900] hover:text-black flex items-center justify-center text-gray-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#F5B900] hover:text-black flex items-center justify-center text-gray-600 transition-colors"
                      >
                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#F5B900] hover:text-black flex items-center justify-center text-gray-600 transition-colors"
                      >
                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Map matching reference image */}
              <div className="lg:col-span-7">
                <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-gray-300 shadow-inner">
                  <iframe
                    title="Chaudhari Auto Pahur Location Map"
                    src="https://maps.google.com/maps?q=Pahur,%20Jalgaon,%20Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                  {/* Pin overlay card */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded shadow border border-gray-200 text-xs">
                    <span className="font-bold text-gray-900 block">Chaudhari Auto, Pahur</span>
                    <span className="text-[11px] text-gray-500">Main Road, Pahur 425101</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dark Banner matching reference image */}
      <div className="bg-[#111111] text-white py-6 border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wide text-white font-sans">
              Have Any Questions?
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Call us or WhatsApp us anytime. We are here to help you!
            </p>
          </div>

          <a
            href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto,%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-md bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};
