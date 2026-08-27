import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Book / Enquire', path: '/book-appointment' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#000000] border-b border-[#222222] py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <img
              src="/images/logo.png"
              alt="Chaudhari Auto Centre Logo"
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-white uppercase font-sans leading-none">
                CHAUDHARI AUTO CENTRE
              </span>
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.25em] text-[#F5B900] uppercase mt-1 leading-none">
                PAHUR • EST. 1994
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-semibold transition-colors relative py-1 tracking-wide ${
                    isActive
                      ? 'text-[#F5B900]'
                      : 'text-neutral-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5B900] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919822000000"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs tracking-wider uppercase shadow-sm transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 fill-black" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Buttons: Call & Hamburger Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:+919822000000"
              className="px-3 py-1.5 rounded bg-[#F5B900] text-black font-bold text-xs flex items-center gap-1"
            >
              <Phone className="w-3 h-3 fill-black" />
              <span>Call</span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-neutral-300 hover:text-white bg-[#1A1A1A] border border-[#333333] rounded"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative ml-auto w-4/5 max-w-xs bg-[#0F0F0F] h-full border-l border-[#262626] p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/logo.png"
                    alt="Chaudhari Auto Centre"
                    className="h-9 w-auto object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white uppercase leading-tight">CHAUDHARI AUTO CENTRE</span>
                    <span className="text-[9px] font-black text-[#F5B900] tracking-widest uppercase mt-0.5 leading-none">PAHUR</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Touch Target Navigation Links */}
              <div className="flex flex-col gap-1.5 mt-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3.5 py-3 rounded-lg text-sm font-bold tracking-wide transition-colors ${
                        isActive
                          ? 'bg-[#F5B900] text-black'
                          : 'text-neutral-200 hover:bg-[#1A1A1A]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#262626] space-y-3">
              <a
                href="tel:+919822000000"
                className="w-full py-3 rounded-lg bg-[#F5B900] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-4 h-4 fill-black" />
                <span>Call: +91 98220 00000</span>
              </a>

              <Link
                to="/garage/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center text-[11px] text-neutral-500 hover:text-neutral-300 py-1"
              >
                Garage Staff Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
