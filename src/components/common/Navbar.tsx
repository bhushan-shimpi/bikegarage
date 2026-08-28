import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, X, MessageCircle, Calendar, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/', emoji: '🏠' },
    { name: 'Services', path: '/services', emoji: '🔧' },
    { name: 'About Us', path: '/about', emoji: '🏆' },
    { name: 'Book / Enquire', path: '/book-appointment', emoji: '📅' },
    { name: 'Contact Us', path: '/contact', emoji: '📍' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40'
            : 'bg-[#000000] border-b border-[#1E1E1E]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo — on mobile show image only (logo already has brand text inside) */}
            <Link to="/" className="flex items-center gap-2.5 group select-none">
              <img
                src="/images/logo.png"
                alt="Chaudhari Auto Centre"
                className="h-9 sm:h-10 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              {/* Brand text: hidden on xs, visible on sm+ */}
              <div className="hidden sm:flex flex-col">
                <span className="text-sm lg:text-base font-black tracking-tight text-white uppercase font-sans leading-none">
                  CHAUDHARI AUTO CENTRE
                </span>
                <span className="text-[9px] lg:text-[10px] font-black tracking-[0.25em] text-[#F5B900] uppercase mt-0.5 leading-none">
                  PAHUR • EST. 1994
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition-colors relative py-1.5 tracking-wide group ${
                      isActive ? 'text-[#F5B900]' : 'text-neutral-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#F5B900] transition-all duration-200 ${
                          isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Instagram Official link */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow Chaudhari Auto on Instagram"
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] hover:scale-110 active:scale-95 text-white flex items-center justify-center transition-all shadow-sm hover:shadow-[0_0_15px_rgba(225,48,108,0.5)]"
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

              <a
                href="https://wa.me/919822000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1A1A1A] hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs tracking-wide border border-[#2E2E2E] hover:border-emerald-600 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+919822000000"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs tracking-wider uppercase shadow-sm transition-all active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 fill-black" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile right: Book pill + Call icon + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Book pill — visible on sm, hidden on xs */}
              <Link
                to="/book-appointment"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5B900] text-black font-extrabold text-[10px] uppercase tracking-wider"
              >
                <Calendar className="w-3 h-3" />
                <span>Book</span>
              </Link>

              {/* Call icon button */}
              <a
                href="tel:+919822000000"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black transition-all active:scale-95 shadow-md shadow-[#F5B900]/20"
                aria-label="Call Workshop"
              >
                <Phone className="w-4 h-4 fill-black" />
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col items-center justify-center w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#333] text-white hover:border-[#F5B900]/50 transition-all gap-[5px] px-[10px]"
                aria-label="Toggle navigation"
              >
                <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div
            ref={drawerRef}
            className="absolute top-0 right-0 w-[82%] max-w-xs h-full bg-[#0D0D0D] border-l border-[#2A2A2A] flex flex-col z-10 shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E1E1E] bg-[#0A0A0A]">
              <div className="flex items-center gap-2.5">
                <img src="/images/logo.png" alt="Chaudhari Auto Centre" className="h-9 w-auto object-contain" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-white uppercase leading-tight">CHAUDHARI AUTO</span>
                  <span className="text-[9px] font-black text-[#F5B900] tracking-[0.2em] uppercase mt-0.5">PAHUR • 1994</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-neutral-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                      isActive
                        ? 'bg-[#F5B900] text-black shadow-md shadow-[#F5B900]/20'
                        : 'text-neutral-300 hover:bg-[#1A1A1A] hover:text-white border border-transparent hover:border-[#2A2A2A]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="text-base">{link.emoji}</span>
                        <span>{link.name}</span>
                      </div>
                      {!isActive && <ChevronRight className="w-4 h-4 text-neutral-500" />}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Bottom CTAs */}
            <div className="px-4 py-5 border-t border-[#1E1E1E] space-y-2.5 bg-[#0A0A0A]">
              <div className="flex items-center justify-center gap-2 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Workshop Open • Pahur</span>
              </div>
              <a
                href="tel:+919822000000"
                className="w-full py-3 rounded-xl bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-4 h-4 fill-black" />
                <span>Call: +91 98220 00000</span>
              </a>
              <a
                href="https://wa.me/919822000000?text=Hello%20Chaudhari%20Auto%20Centre,%20I%20want%20to%20inquire%20about%20bike%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#0D2318] hover:bg-emerald-800 text-emerald-400 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-900 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4]/25 via-[#E1306C]/25 to-[#FD1D1D]/25 hover:from-[#833AB4]/40 hover:via-[#E1306C]/40 hover:to-[#FD1D1D]/40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#E1306C]/40 transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-[#E1306C]"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
                </svg>
                <span>Follow on Instagram</span>
              </a>
              <Link
                to="/garage/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center text-[11px] text-neutral-600 hover:text-neutral-400 pt-1 transition-colors"
              >
                Garage Staff Login →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
