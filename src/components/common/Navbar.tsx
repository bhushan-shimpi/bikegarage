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
    { name: 'Inquiry / Quote', path: '/inquiry' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#000000] border-b border-[#222222] py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo matching exact reference design */}
          <Link to="/" className="flex flex-col group">
            <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase font-sans leading-none">
              CHAUDHARI AUTO
            </span>
            <span className="text-xs font-black tracking-[0.25em] text-[#F5B900] uppercase mt-0.5 leading-none">
              PAHUR
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
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

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/garage/login"
              className="text-xs text-neutral-400 hover:text-[#F5B900] px-2 py-1 rounded transition-colors"
              title="Staff Portal"
            >
              Garage Portal
            </Link>
            <a
              href="tel:+919822000000"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#F5B900] hover:bg-[#DFA500] text-black font-extrabold text-xs tracking-wider uppercase shadow-sm transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 fill-black" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Buttons */}
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
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative ml-auto w-3/4 max-w-xs bg-[#0F0F0F] h-full border-l border-[#262626] p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                <div className="flex flex-col">
                  <span className="text-base font-black text-white uppercase">CHAUDHARI AUTO</span>
                  <span className="text-[10px] font-black text-[#F5B900] tracking-widest uppercase">PAHUR</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#F5B900] text-black font-bold'
                          : 'text-neutral-300 hover:bg-[#1A1A1A]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] space-y-3">
              <a
                href="tel:+919822000000"
                className="w-full py-2.5 rounded bg-[#F5B900] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 fill-black" />
                <span>Call Now: +91 98220 00000</span>
              </a>
              <Link
                to="/garage/login"
                className="block text-center text-xs text-neutral-400 hover:text-[#F5B900]"
              >
                Garage Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
