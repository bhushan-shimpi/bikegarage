import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Phone, X, Calendar, ChevronRight } from "lucide-react";

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/", emoji: "🏠" },
    { name: "Services", path: "/services", emoji: "🔧" },
    {
      name: "Restoration Form",
      path: "/restoration-form",
      emoji: "🏍️",
      badge: "New",
    },
    { name: "About Us", path: "/about", emoji: "🏆" },
    { name: "Gallery", path: "/gallery", emoji: "📷" },
    { name: "Enquire", path: "/book-appointment", emoji: "📅" },
    { name: "Contact Us", path: "/contact", emoji: "📍" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40"
            : "bg-[#000000] border-b border-[#1E1E1E]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo — on mobile show image only (logo already has brand text inside) */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group select-none"
            >
              <img
                src="/images/logo.png"
                alt="Chaudhari Auto"
                className="h-9 sm:h-10 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              {/* Brand text: hidden on xs, visible on sm+ */}
              <div className="hidden sm:flex flex-col">
                <span className="text-sm lg:text-base font-black tracking-tight text-white uppercase font-sans leading-none">
                  CHAUDHARI AUTO
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
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `text-sm font-semibold transition-colors relative py-1.5 tracking-wide group flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#F5B900]"
                        : "text-neutral-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-[#F5B900]/15 text-[#F5B900] text-[9px] font-black uppercase tracking-wider border border-[#F5B900]/30 leading-none">
                          {link.badge}
                        </span>
                      )}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#F5B900] transition-all duration-200 ${
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <a
                href="tel:+917387448878"
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
                href="tel:+917387448878"
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
                <span
                  className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
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
                <img
                  src="/images/logo.png"
                  alt="Chaudhari Auto"
                  className="h-9 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-white uppercase leading-tight">
                    CHAUDHARI AUTO
                  </span>
                  <span className="text-[9px] font-black text-[#F5B900] tracking-[0.2em] uppercase mt-0.5">
                    PAHUR • 1994
                  </span>
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
                  end={link.path === "/"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                      isActive
                        ? "bg-[#F5B900] text-black shadow-md shadow-[#F5B900]/20"
                        : "text-neutral-300 hover:bg-[#1A1A1A] hover:text-white border border-transparent hover:border-[#2A2A2A]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="text-base">{link.emoji}</span>
                        <span>{link.name}</span>
                      </div>
                      {!isActive && (
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Bottom Staff Link */}
            <div className="px-4 py-4 border-t border-[#1E1E1E] bg-[#0A0A0A]">
              <Link
                to="/garage/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center text-xs text-neutral-500 hover:text-neutral-300 py-1 transition-colors"
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
